<template>
  <div class='chat-window'>
    <!-- 锁屏 滚屏 小工具 -->
    <div class="msg-fixed-tool scroll-lock"
         v-show="isShowTool">
      <MsgScrollBtn v-model="isLockScreen"
                    :lock="false">滚屏</MsgScrollBtn>
      <MsgScrollBtn v-model="isLockScreen"
                    :lock="true">锁屏</MsgScrollBtn>
    </div>
    <!-- 聊天主体 -->
    <div class="message-wrapper"
         @scroll="scrollEvent"
         ref="wrap">
      <div class="message"
           v-get-dom-height="{fn:getMsgPositionByHeight,lock:isLockScreen}"
           ref="message">
        <MessageItem v-for="(item,key) in showMsg"
                     :data="item"
                     :key="key"
                     @follow="follow"
                     class="message-item"> </MessageItem>
      </div>
    </div>
    <!-- 未读提示 -->
    <div class="msg-fixed-tool read-new"
         v-show="readNew">
      <MsgReadNew :num="readNew"
                  @click.native="toBottomByRead"></MsgReadNew>
    </div>
    <!-- 跟单弹框 -->
    <FollowDialog :showFollow="showFollow"
                  :followItem="followItem"
                  @toggleShowFollow="toggleShowFollow"
                  v-if="followItem"></FollowDialog>
  </div>
</template>
<script >
// import WS from "./js/websocket.js";
// import Message from "./js/mixin.js";
import MessageItem from "./messageItem";
import MsgScrollBtn from "./components/MsgScrollBtn";
import MsgReadNew from "./components/MsgReadNew";
import { mapState, mapActions, mapGetters } from "vuex";
import getDomHeight from "./directives/getDomHeight.js";
import FollowDialog from "../components/follow";

// window.WS = WS;
export default {
  name: "window",
  components: {
    MessageItem,
    MsgScrollBtn,
    MsgReadNew,
    FollowDialog
  },

  directives: {
    getDomHeight
  },
  data() {
    return {
      heigthArr: [],
      readNew: 0,
      showTool: false,
      screenScroll: false,
      isLockScreen: false,
      // 未读信息标识
      documentActive: true,
      // 全局弹框
      clearCartModal: {},
      // 错误标识
      readMsgByMe: [],
      readMsgByServer: [],
      user: {},
      followItem: null,
      showFollow: false,
      showMsg: [],
      message: [],
      lastTimeOut: 0
    };
  },
  computed: {
    ...mapState("chat", ["isFocus", "isEmoji", "isChatRouter"]),
    ...mapState(["chatRoom"]),
    ...mapGetters({
      games: "games"
    }),
    isShowTool() {
      if (this.isFocus) return false;
      return this.showTool;
    }
  },
  methods: {
    ...mapActions("chat", ["actionsConnsvr", "actionsSpeak", "itemUserBet"]),
    debounce(time, fn) {
      // var last;
      return () => {
        const ctx = this,
          args = arguments;
        clearTimeout(this.lastTimeOut);
        this.lastTimeOut = setTimeout(() => {
          console.log("object set");
          fn.apply(ctx, args);
        }, time * 1000);
      };
    },
    async scrollEvent(event) {
      if (this.heigthArr.length === 0) return;
      // 防抖
      this.debounce(1, () => {
        this.do(event);
      })();
      await this.$Throttle.promise(0.3);
      this.do(event);
    },
    do(event) {
      const idx = this.heigthArr.findIndex(
        item => item >= event.target.scrollTop + event.target.clientHeight - 20
      );
      console.log(idx);
      if (~idx && this.message[idx].unRead) {
        this.message.forEach((item, index) => {
          if (item.unRead && index <= idx) {
            this.message[index].unRead = false;
            this.readNew && (this.readNew -= 1);
          }
        });
      }
    },
    getMsgPositionByHeight(heigthArr) {
      this.heigthArr = heigthArr;
      // console.log("object", heigthArr);
    },
    // 滑动到底部
    toBottom(sys = false) {
      // 锁屏状态
      if (this.isLockScreen) {
        if (sys) return;
        this.readNew += 1;
        return;
      }
      this.toBottomByRead();
    },
    toBottomByRead() {
      setTimeout(() => {
        const children = this.$refs.message.children;
        if (children.length) {
          children[children.length - 1].scrollIntoView();
          this.readNew = 0;
        }
        this.hasScroll();
      }, 200);
    },
    hasScroll() {
      if (
        !this.showTool &&
        this.$refs.wrap.scrollHeight > this.$refs.wrap.clientHeight
      ) {
        this.showTool = true;
      }
    },
    optimizeMessage() {
      const len = this.message.length;
      if (len > 0 && len < 200) {
        this.showMsg = this.message;
      } else if (len >= 200 && len < 600) {
        this.showMsg = this.message.slice(len - 200, len);
      } else {
        this.message = this.message.splice(-200);
        this.showMsg = this.message;
      }
      // this.showMsg
    },
    // 他人说话
    dealTalkOther(data) {
      this.message.push(
        Object.assign(data, { group: "TALK_OTHER", unRead: this.isLockScreen })
      );
      this.optimizeMessage();
      this.toBottom();
    },
    isEnable(tag) {
      const games = this.games;
      return !games.map(x => x.game_id).includes(tag);
    },
    // 他人投注
    dealBoardcast(data) {
      const res = data.data;
      if (!res.boardcast) {
        return;
      }
      if (this.isEnable(res.boardcast.gameid)) return;
      const gameInfo = this.games.find(
        item => item.game_id == res.boardcast.gameid
      );
      res.group = "OTHER_BET";
      res.gameName = gameInfo.game_name;
      res.boardcast.list.forEach(item => {
        const obj = JSON.parse(JSON.stringify(res));
        obj.boardcast.self = item;
        if (this.isLockScreen) {
          obj.unRead = true;
        }
        this.message.push(obj);
      });
      this.optimizeMessage();
      if (this.isLockScreen) {
        this.readNew += res.boardcast.list.length - 1;
      }
      this.toBottom();
    },
    async dealUserSpeak(str) {
      const msg = await this.actionsSpeak(str);
      this.$ws.sendMessage(msg);
      msg.success = false;
      // console.log(speak);
      this.message.push(msg);
      this.optimizeMessage();
      this.toBottom(true);
    },

    dealUserResp(res) {
      const len = this.message.length;
      let dist;
      for (let i = len - 1; i > -1; i--) {
        if (this.message[i].code === res.code) {
          dist = this.message[i];
          break;
        }
      }
      switch (res.error) {
        case 0:
          // dist.success = true;
          this.$set(dist, "success", true);
          break;
        case 101:
          dist.group = "RM";
          break;
        case 17300:
          this.$set(dist, "success", false);
          break;
      }
      // unRead:
      this.optimizeMessage();
    },
    dealTouzhuResp(res) {
      this.message.forEach(item => {
        if (item.code === res.code) {
          item.success = true;
        }
      });
      // this.optimizeMessage();
    },
    dealWarning(res) {
      res.group = "WARNING";
      this.message.push(res);
      this.optimizeMessage();
      this.toBottom(true);
      console.log(res);
    },
    async dealBetInfo(res) {
      switch (res.key) {
        case 0:
          console.log(res);
          const data = await this.itemUserBet(res.info);
          res.info.labels.forEach(item => {
            const obj = JSON.parse(JSON.stringify(data));
            obj.self = item;
            obj.success = false;
            this.message.push(obj);
          });
          this.optimizeMessage();
          this.toBottom(true);
          return;
        case 1:
          console.log(1);
          res.info.error = 0;
          this.dealTouzhuResp(res.info);
          return;
        case 2:
          console.log(2);
          return;
      }
    },
    follow(item) {
      this.followItem = item;
      this.showFollow = true;
    },
    toggleShowFollow(show) {
      this.showFollow = show;
    },
    triggerGameCountDown(item) {
      this.message.push({
        group: "SYSTEM",
        ...item
      });
      this.optimizeMessage();
      this.toBottom(true);
      console.log(item);
    },
    fromShouYe() {
      this.isLockScreen = false;
      this.readNew = 0;
      this.message = [];
      this.optimizeMessage();
      // console.log(123);
    },
    async init() {
      // 发送、接受 信息

      // 他人说话
      this.$ws.oncallback("TALK_Boardcast", this.dealTalkOther);
      // 自己说话
      this.$ws.oncallback("TALK_RESP", this.dealUserResp);
      // 他人投注
      this.$ws.oncallback("Boardcast", this.dealBoardcast);
      // this.$ws.oncallback("TOUZHU_RESP", this.dealTouzhuOther);
      // 安全提示
      this.$ws.oncallback("Warning", this.dealWarning);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
      this.bus.$on("sendMessage", this.dealUserSpeak);
      this.bus.$on("sendBetInfo", this.dealBetInfo);
      this.bus.$on("triggerGameCountDown", this.triggerGameCountDown);
      this.bus.$on("shouYe", this.fromShouYe);
      this.bus.$on("chatReset", this.fromShouYe);
      this.toBottom();
    });
  },
  watch: {
    isFocus(val) {
      if (this.isLockScreen) return;
      if (val) {
        const $vm = this.$refs.wrap;
        if ($vm.scrollTop + $vm.clientHeight + 10 > $vm.scrollHeight) {
          this.toBottom();
        }
      }
    },
    isEmoji(val) {
      if (val) {
        this.toBottom();
      }
    }
  }
};
</script>
<style lang="scss" >
@import "./chat.scss";
</style>

