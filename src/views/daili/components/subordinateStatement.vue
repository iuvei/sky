<template>
  <div class="subordinateStatement_main_body">
    <publicHead :title="funcName"
                :type="1"
                :timeText="chooseTimeText"
                @chooseTimeShow="changeState"></publicHead>
    <yd-layout class="subordinateStatement_main_content">
      <yd-infinitescroll :callback="scrollGetData"
                         ref="ISCom">
        <yd-list theme="4"
                 slot="list">
          <div class="title_wrap">
            <p>账号</p>
            <p>类型</p>
            <p>报表人数</p>
            <p>盈利</p>
          </div>
          <yd-list-item class="rows_wrap"
                        v-for="(item, index) in baseData"
                        :key="index"
                        @click.native="optionShow(item)">
            <p slot="other">{{item.username}}</p>
            <p slot="other">{{item.actype}}</p>
            <p slot="other">{{item.active_count}}</p>
            <p slot="other">{{item.yingli_price}}</p>
          </yd-list-item>
          <!-- <p class="else_word" v-show="baseData!=0" @click="getMoreData">{{hasPage?'查看更多':'已显示全部数据'}}</p> -->
          <!-- <p class="else_word">查看更多</p> -->
          <div class="empty"
               v-show="baseData==0">
            <img src="../../../img/bet_record/noRecords.png"
                 alt="">
            <p>暂无记录</p>
          </div>
        </yd-list>
        <span slot="doneTip"
              style="font-size:1.125rem">已显示全部数据</span>
        <img style="width:1.5rem;height:1.5rem"
             slot="loadingTip"
             src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
      </yd-infinitescroll>
    </yd-layout>
    <yd-actionsheet :items="timeOptions"
                    v-model="choosedTime"
                    class="changePeriod"></yd-actionsheet>
    <yd-actionsheet :items="agencyOptions"
                    v-model="chooseAgency"
                    class="choose_agency_type"
                    cancel="取消"></yd-actionsheet>
  </div>
</template>
<script>
import publicHead from "../../huiYuan/components/moreService/publicHead";
import { mapState, mapActions } from "vuex";
// import { getDate, getMonday, getMonth } from "../../../js/agencyDate";
export default {
  components: {
    publicHead
  },
  computed: {
    ...mapState("member", ["st_timeData"])
  },
  data() {
    return {
      funcName: "下级报表",
      chooseTimeText: "今天",
      choosedTime: false,
      chooseAgency: false,
      userinfo: "",
      userID: "", // 给后台的id值
      hasPage: false, //  是否显示加载更多
      pageID: 0, //  给后台页码值
      listNum: 0, //  数据总量
      isFirst: 1, //  是否是首次请求
      type: 0,
      baseData: [],
      superiorArr: [], // 可返回的层级
      cengjiNum: 0, // 当前所在的代理层级
      timeOptions: [
        {
          label: "今天",
          callback: () => {
            this.chooseTimeText = "今天";
            this.type = 0;
            this.pageID = 0;
            this.isFirst = 1;
            this.getBaseData(0);
          }
        },
        {
          label: "昨天",
          callback: () => {
            this.chooseTimeText = "昨天";
            this.type = 1;
            this.pageID = 0;
            this.isFirst = 1;
            this.getBaseData(1);
          }
        },
        {
          label: "本周",
          callback: () => {
            this.chooseTimeText = "本周";
            this.type = 2;
            this.pageID = 0;
            this.isFirst = 1;
            this.getBaseData(2);
          }
        },
        {
          label: "本月",
          callback: () => {
            this.chooseTimeText = "本月";
            this.type = 3;
            this.pageID = 0;
            this.isFirst = 1;
            this.getBaseData(3);
          }
        },
        {
          label: "上月",
          callback: () => {
            this.chooseTimeText = "上月";
            this.type = 4;
            this.pageID = 0;
            this.isFirst = 1;
            this.getBaseData(4);
          }
        }
      ],
      agencyOptions: []
    };
  },
  mounted() {
    this.superiorArr.push(this.$store.state.userinfo.accountInfo.uid);
    this.initTimeData();
    this.getBaseData();
  },
  methods: {
    ...mapActions("agent", ["getChlidStatic"]),
    initTimeData() {
      this.timeOptions = Array.from(this.st_timeData).map(v => ({
        val: v[0],
        label: v[1],
        callback: item => {
          this.chooseTimeText = item.label;
          this.type = item.val;
          this.pageID = 0;
          this.isFirst = 1;
          this.getBaseData(0);
        }
      }));
    },
    changeState() {
      this.choosedTime = true;
    },
    togetChlidStatic() {
      this.getChlidStatic();
    },
    scrollGetData() {
      let s, e;

      this.$ajax("request", {
        ac: "getChlidStatic",
        username: "",
        user_id: this.userID,
        bdate: s,
        edate: e,
        count: 20,
        pageid: this.pageID
      }).then(res => {
        if (res == 0) {
          this.$refs.ISCom.$emit("ydui.infinitescroll.loadedDone");
        } else {
          const _list = res;
          this.baseData = [...this.baseData, ..._list];
          this.$refs.ISCom.$emit("ydui.infinitescroll.finishLoad");
        }
        this.pageID++;
      });
    },
    getBaseData() {
      // this.$dialog.loading.open("正在加载中···");
      this.getChlidStatic({
        username: "",
        user_id: this.userID,
        lasttime: this.type
        // user_type: '',
      }).then(res => {
        this.baseData = res;
        this.pageID++;
        this.$dialog.loading.close();
      });
    },
    optionShow(n) {
      if (n.actype == "会员") {
        return;
      }
      if (n.active_count) {
        if (n.tuijian == this.$store.state.userinfo.accountInfo.uid) {
          this.agencyOptions = [
            {
              label: "someone",
              callback: () => {}
            },
            {
              label: "查看报表",
              callback: () => {
                this.$router.push({
                  name: "dailibaobiao",
                  params: {
                    username: n.username,
                    userID: n.uid
                  }
                });
              }
            },
            {
              label: "查看下级",
              callback: () => {
                this.superiorArr.push(n.uid);
                console.log(this.superiorArr);
                this.userID = n.uid;
                this.pageID = 0;
                //  重置页码
                this.isFirst = 1;
                // 重置为首次请求
                this.getBaseData(this.type);
                this.$refs.ISCom.$emit("ydui.infinitescroll.reInit");
              }
            }
          ];
        } else {
          this.agencyOptions = [
            {
              label: "someone",
              callback: () => {}
            },
            {
              label: "查看报表",
              callback: () => {
                this.$router.push({
                  name: "dailibaobiao",
                  params: {
                    username: n.username,
                    userID: n.uid
                  }
                });
              }
            },
            {
              label: "查看下级",
              callback: () => {
                this.superiorArr.push(n.uid);
                console.log(this.superiorArr);
                this.userID = n.uid;
                // 重置页码
                this.pageID = 0;
                // 重置为首次请求
                this.isFirst = 1;
                this.cengjiNum++;
                this.getBaseData(this.type);
                this.$refs.ISCom.$emit("ydui.infinitescroll.reInit");
              }
            },
            {
              label: "查看上级",
              callback: () => {
                this.superiorArr.length == 2
                  ? (this.userID = "")
                  : (this.userID = this.superiorArr.splice(-2, 1)[0]);
                console.log(this.superiorArr);
                //  重置页码
                this.pageID = 0;
                // 重置为首次请求
                this.isFirst = 1;
                this.cengjiNum--;
                this.getBaseData(this.type);
                this.$refs.ISCom.$emit("ydui.infinitescroll.reInit");
              }
            }
          ];
        }
      } else {
        if (n.tuijian == this.$store.state.userinfo.accountInfo.uid) {
          this.agencyOptions = [
            {
              label: "someone",
              callback: () => {}
            },
            {
              label: "查看报表",
              callback: () => {
                this.$router.push({
                  name: "dailibaobiao",
                  params: {
                    username: n.username,
                    userID: n.uid
                  }
                });
              }
            }
          ];
        } else {
          this.agencyOptions = [
            {
              label: "someone",
              callback: () => {}
            },
            {
              label: "查看报表",
              callback: () => {
                this.$router.push({
                  name: "dailibaobiao",
                  params: {
                    username: n.username,
                    userID: n.uid
                  }
                });
              }
            },
            {
              label: "查看上级",
              callback: () => {
                this.superiorArr.length == 2
                  ? (this.userID = "")
                  : (this.userID = this.superiorArr.splice(-2, 1)[0]);
                console.log(this.superiorArr);
                //  重置页码
                this.pageID = 0;
                // 重置为首次请求
                this.isFirst = 1;
                this.cengjiNum--;
                this.getBaseData(this.type);
                this.$refs.ISCom.$emit("ydui.infinitescroll.reInit");
              }
            }
          ];
        }
      }
      this.agencyOptions[0].label = n.username;
      this.userinfo = n;
      this.chooseAgency = true;
    },
    getMoreData() {
      /** 判断数据是否全部加载完毕 */
      if (this.baseData.length != this.listNum) {
        this.isFirst = 0; // 只要点击了加载更多就已经不是第一次请求数据
        this.pageID++;
        this.getBaseData(this.type);
      } else {
        this.hasPage = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.subordinateStatement_main_body {
  .subordinateStatement_main_content {
    height: poTorem(688px);
    background-color: #f7f7f7;
    .title_wrap {
      @include around;
      height: poTorem(40px);
      font-size: poTorem(15px);
      color: #626262;
      border-bottom: poTorem(1px) solid #d3d3d3;
      p {
        width: poTorem(100px);
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .rows_wrap {
      font-size: poTorem(14px);
      height: poTorem(45px);
      background-color: #fff;
      p {
        width: poTorem(100px);
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:nth-child(2) {
          color: #00a0e9;
        }
        &:last-child {
          color: $mainColor;
        }
        &:nth-child(3),
        &:nth-child(4) {
          color: #959595;
        }
      }
    }
    .else_word {
      font-size: poTorem(15px);
      color: #626262;
      text-align: center;
      background-color: #fff;
      line-height: poTorem(45px);
    }
    .empty {
      background-color: #fff;
      height: poTorem(648px);
      @include column;
      justify-content: center;
      img {
        width: poTorem(93px);
      }
      p {
        width: poTorem(400px);
        text-align: center;
        font-size: poTorem(14px);
        height: poTorem(20px);
        line-height: poTorem(20px);
        color: #bfbfbf;
        font-weight: 700;
      }
      button {
        width: poTorem(93px);
        padding: 5px 0 5px 0;
        font-size: 14px;
        text-align: center;
        font-weight: 700;
        border-radius: 5px;
        color: #fff;
        background-color: #f93;
        outline: none;
        border: none;
      }
    }
  }
}
</style>


