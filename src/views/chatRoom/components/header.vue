<template>
  <div class="header chatroom-games-slider">
    <yd-slider class="slider"
               :callback="vuetouch">
      <yd-slider-item class="lottery-item"
                      v-for="(data,idx) in datas"
                      :key="idx"
                      :tag='data.tag'>
        <div class="chatroom-games-slider-item">
          <div class="icon">
            <img :src="data.icon"
                 alt="">
          </div>
          <div class="content">
            <div class="content_top">
              <span class="game_name">{{data.game_name}}</span>
              <span v-for="(items,indexs) in data.prev"
                    v-if="indexs == 0"
                    :key="indexs">第<i>{{items.qishu}}</i>期</span>
            </div>
            <div class="content_middle">
              <span v-if="['ssc', 'qxc'].includes(data.js_tag)"
                    v-for="(items,indexs) in data.prev[0].balls"
                    :key="indexs"
                    :class="[{active:  items == ''},classFun(data.js_tag)]">
                {{items == '' ? '正在开奖...' : items}}
              </span>
              <span v-if="data.js_tag=='k3'"
                    v-for="(items,indexs) in data.prev[0].balls"
                    :key="indexs"
                    :class="[{active: items == ''},classFun(data.js_tag),`kt${items}`]">
                {{items == '' ? '正在开奖...' : ''}}
              </span>
              <span v-if="['pk10', 'pkniuniu'].includes(data.js_tag)"
                    v-for="(items,indexs) in data.prev[0].balls"
                    :style="{background:`${pk10bjys(parseInt(items))}`}"
                    :key="indexs"
                    :class="[{active: items == ''},classFun(data.js_tag),'pk10']">
                {{items == '' ? '正在开奖...' : items}}
              </span>
              <span v-if="data.js_tag=='lhc'"
                    v-for="(items,indexs) in data.prev[0].balls"
                    :style="{background:`${ballToColor(parseInt(items))}`}"
                    :key="indexs"
                    :class="[{active:  items == ''},classFun(data.js_tag)]">
                <i v-if="indexs == 5 && items != ''">+</i>
                {{items == '' ? '正在开奖...' : items}}
              </span>
              <span v-if="data.js_tag=='pcdd'"
                    v-for="(items,indexs) in data.prev[0].balls"
                    :style="{background:`${pcddcolor(parseInt(items),indexs)}`}"
                    :key="indexs"
                    :class="[{['color-ball-'+items]: indexs === 3},{active: items == ''},classFun(data.js_tag)]">
                <i v-if="indexs == 2 && items != ''">=</i>
                <i v-if="indexs == 1 && items != ''">+</i>
                <i v-if="indexs == 0 && items != ''">+</i>
                {{ items == '' ? '正在开奖...' : items }}
              </span>
              <span v-if="data.js_tag=='11x5'"
                    v-for="(items,indexs) in data.prev[0].balls"
                    :key="indexs"
                    :class="[{active: items == ''},classFun(data.js_tag)]">
                {{items == '' ? '正在开奖...' : items}}
              </span>
              <span v-if="data.js_tag=='3d'"
                    v-for="(items,indexs) in data.prev[0].balls"
                    :key="indexs"
                    :class="[{active: items == ''},classFun(data.js_tag)]">
                {{items == '' ? '正在开奖...' : items}}
              </span>
              <span v-if="data.js_tag=='tzyx'"
                    :class="{'tzyx':data.js_tag=='tzyx'}">
                <span v-ds>{{returnz(data.prev[0].balls[0])}}</span>
                <span v-ds>{{returnsz(data.prev[0].balls[1])}}</span>
                <span v-ds>{{returny(data.prev[0].balls[2])}}</span>
              </span>
              <span v-if="data.js_tag=='xync'"
                    class="xync">
                <span class="Colorno"
                      v-for="(items,indexs) in data.prev[0].balls"
                      :key="indexs">
                  <img :src="require('../../../img/xync_background/lucky_ball_'+ items +'.png')"
                       alt="图片">
                </span>
              </span>
              <span v-if="data.js_tag=='xypk'"
                    class="xync">
                <span class="Colorno"
                      v-for="(items,indexs) in data.prev[0].balls"
                      :key="indexs">
                  <img v-if="items"
                       :src="require('~/img/xingyunpuke/puke_'+ items +'.png')"
                       alt="图片"
                       style="margin: 0; height: 1.8rem;">
                </span>
              </span>
            </div>
          </div>
        </div>

      </yd-slider-item>
    </yd-slider>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { BallToColor2, BallToColorpcdd } from "../../../js/xglhc.data.2017";
import { pk10bjys } from "../../../js/pk10color";
// import vueTouch from "~/js/directives/touch";
import dayjs from "dayjs";

const thArr = ["0"],
  thszArr = ["1"];
export default {
  directives: {
    ds: el => {
      if (el.innerHTML == "单") {
        el.style.color = "#fff";
        el.style.background = "#019fe9";
      } else if (el.innerHTML == "双") {
        el.style.color = "#fff";
        el.style.background = "#e43838";
      } else if (el.innerHTML == "左" || el.innerHTML == "右") {
        el.style.background = "#dcdcdc";
      } else if (el.innerHTML == "3" || el.innerHTML == "4") {
        el.style.color = "#fff";
        el.style.background = "#626262";
      }
    }
  },
  filters: {
    dateFrm(opentime) {
      return dayjs(opentime * 1000).format("YYYY-MM-DD HH:mm");
    }
  },
  data() {
    return {
      datas: [],
      refreshTimer: Function,
      balls: Array,
      icon_src: require("../../../../src/img/right_jiantou.png"),
      content: "",
      changeRed: 0,
      curItem: null,
      showTimer: 0,
      curNext: null,
      nexts: [],
      itemIndex: 1,
      toggleGameTimer: 0
    };
  },
  computed: {
    ...mapState({
      sysinfo: state => state.sysinfo
    }),
    ...mapGetters({
      games: "games"
    })
  },
  // mounted() {
  //   this.$dialog.loading.open(" ");
  //   this.getKjCpLog_get();
  // },
  activated() {
    // this.getKjCpLog_get();
    // this.callback();
  },
  deactivated() {
    clearInterval(this.refreshTimer);
    clearInterval(this.showTimer);
  },
  methods: {
    vuetouch(s) {
      // console.log(s, e, index);
      this.curItem = this.datas[s];
      console.log(this.curItem.game_name);
    },
    returnz(val) {
      if (thArr.includes(val)) {
        return "左";
      } else if (thszArr.includes(val)) {
        return "右";
      }
    },
    returnsz(val) {
      if (thArr.includes(val)) {
        return "3";
      } else if (thszArr.includes(val)) {
        return "4";
      }
    },
    returny(val) {
      if (thArr.includes(val)) {
        return "单";
      } else if (thszArr.includes(val)) {
        return "双";
      }
    },
    classFun(val) {
      val == "11x5" && (val = "eleven");
      val == "3d" && (val = "sand");
      return val;
    },
    ballToColor(number) {
      return BallToColor2(number);
    },
    pk10bjys(number) {
      return pk10bjys(number);
    },
    pcddcolor(number, index) {
      if (index !== 3) return "";
      return BallToColorpcdd(number);
    },
    async getKjCpLog_get() {
      // let games = await api.getGameList();
      const games = this.games;
      this.$ajax("request", {
        ac: "getKjCpLog",
        tag: "",
        date: 0
      }).then(res => {
        if (games && Array.isArray(res)) {
          res.map(x => {
            const game = games.find(y => y.game_id === x.gameid);
            if (game) {
              ({ ...x } = {
                enable: game.enable,
                speed: game.speed
              });
            }
          });
          res.forEach(item => {
            const game = games.find(x => x.game_id === item.gameid);
            if (game) {
              item.enable = game.enable;
              item.speed = game.speed;
            }
          });
        }
        this.datas = res;
        res.forEach(item => {
          item.prev[0].balls = item.prev[0].balls.split("+");
        });
        this.$dialog.loading.close();
      });
    },
    callback() {
      this.refreshTimer = setInterval(() => {
        this.getKjCpLog_get();
      }, 30000);
    },
    getCplogList(tag) {
      // console.log("i am getCplogList");
      this.$ajax("request", {
        ac: "getCplogList",
        tag
      }).then(res => {
        // debugger;
        const isOk =
          res &&
          Array.isArray(res) &&
          res.length &&
          res[0].next &&
          Array.isArray(res[0].next) &&
          res[0].next.length;
        if (isOk) {
          this.nexts = res[0].next;
          this.curNext =
            this.nexts[0].stopless === 0 ? this.nexts[1] : this.nexts[0];
        }
      });
    },
    doCountDown() {
      this.showTimer = setInterval(() => {
        if (!this.curNext) return;
        const stopless = 30,
          curNext = this.curNext,
          nexts = this.nexts;
        if (curNext.stopless) {
          nexts.forEach(x => {
            x.stopless--;
          });

          if (curNext.stopless === stopless) {
            // console.log(`距离${this.curItem.game_name}开奖还有${stopless}秒`);
            this.bus.$emit("triggerGameCountDown", {
              name: this.curItem.game_name,
              stopless,
              qishu: curNext.qishu
            });
          }
          if (curNext.stopless === 0) {
            const next = nexts.find(x => x.qishu === this.curNext.qishu + 1);
            if (next) this.curNext = next;
            else {
              this.getCplogList(this.curItem.tag);
            }
          }
        }
        // console.log(
        //   this.curNext.stopless,
        //   this.curNext.qishu,
        //   this.curItem.game_name
        // );
      }, 1000);
    },
    // 获取开奖结果回调
    kjCallback(res) {
      const games = this.games;
      if (res && "getKjCpLog_List" in res) {
        let list = res.getKjCpLog_List;

        if (Array.isArray(list) && list.length) {
          // 过滤当前系统中未开启和不存在的彩种
          const tags = games.map(x => x.tag);
          list = list.filter(x => tags.includes(x.tag));

          list.forEach(item => {
            const game = games.find(x => x.game_id === item.gameid);
            if (game) {
              item.enable = game.enable;
              item.speed = game.speed;
            }
            item.prev[0].balls = item.prev[0].balls.split("+");
          });
          this.datas = list;
          if (!this.curItem || this.curItem.tag !== this.datas[0].tag) {
            this.curItem = this.datas[0];
          }
        }
      }
    }
  },
  watch: {
    curItem(val, oldVal) {
      if (val && val !== oldVal) {
        clearInterval(this.showTimer);
        clearTimeout(this.toggleGameTimer);
        this.toggleGameTimer = setTimeout(() => {
          this.getCplogList(val.tag);
          this.doCountDown();
        }, 1000);
      }
    }
  },
  mounted() {
    this.$ws.oncallback("getKjCpLog", this.kjCallback);
  }
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";

.header {
  width: 100%;
  position: relative;
  display: -webkit-box;
  flex-wrap: nowrap;
  overflow-x: auto;
}
.slider {
  height: 6rem;
}
.lottery-item {
  z-index: 0;
  width: 96vw;
  background-color: #ebe9ea;
  margin: 0 2vw;
  border-radius: poTorem(5px);
  height: poTorem(78px);
}
</style>
<style lang="scss">
@import "../../../css/resources.scss";
.chatroom-games-slider {
  .yd-slider-pagination {
    display: none;
  }
  .yd-slider-item {
    z-index: 0;
    width: 96vw;
    background-color: #ebe9ea;
    margin: 0 2vw;
    border-radius: 0.3125rem;
    height: 4.875rem;
    .chatroom-games-slider-item {
      display: flex;
      width: 100%;
      justify-content: space-around;
      align-items: center;
      .icon {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: poTorem(70px);
        img {
          width: poTorem(50px);
          height: poTorem(50px);
          border-radius: 50%;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        flex: 1;
        .content_middle {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          margin-bottom: poTorem(10px);
          background: #ebe9ea;
          span {
            margin: poTorem(3px);
            width: poTorem(28px);
            height: poTorem(28px);
            color: #fff;
            text-align: center;
            line-height: poTorem(28px);
            font-size: poTorem(16px);
            background: #ebe9ea;
          }
          .ssc,
          .qxc,
          .eleven,
          .sand {
            background: url(~img/balls.png);
            background-size: contain;
            color: rgb(236, 11, 11);
            border-radius: 0;
            width: poTorem(31px);
            height: poTorem(31px);
            line-height: poTorem(28px);
          }
          .pk10 {
            margin: poTorem(3px);
            width: poTorem(24px);
            height: poTorem(28px);
            line-height: poTorem(30px);
            text-align: center;
            border-radius: 0;
            margin-top: poTorem(5px);
          }
          .lhc {
            position: relative;
            &:last-child {
              margin-left: poTorem(15px);
            }
            i {
              position: absolute;
              right: poTorem(-26px);
              color: #939496;
              margin: 0 poTorem(10px);
              font-size: poTorem(20px);
              font-weight: bolder;
            }
          }
          @each $animal in 1, 2, 3, 4, 5, 6 {
            .kt#{$animal} {
              background: url("~img/saizi_0#{$animal}.png");
              background-size: contain;
              border-radius: 0;
            }
          }
          .pcdd {
            position: relative;
            margin-right: poTorem(10px);
            &:nth-child(1),
            &:nth-child(2),
            &:nth-child(3) {
              background: #a8a9aa;
            }
            i {
              position: absolute;
              right: poTorem(-24px);
              color: #939496;
              margin: 0 poTorem(10px);
              font-size: poTorem(18px);
              font-weight: bolder;
            }
          }
          .tzyx {
            display: inline-block;
            @include around;
            width: 50%;
            .left_to {
              background: #e3e1e1;
            }
            .red {
              background: rgba(28, 27, 27, 0.897);
            }
            .right {
              background: #e33939;
            }
            .right_to {
              background: #00a0eb;
            }
          }
          .xync {
            display: inline-block;
            width: 100%;
            @include start;
            .Colorno {
              display: inline-block;
              img {
                margin-top: 0.25rem;
                width: 1.6rem;
                height: 1.6rem;
              }
            }
          }
          .active {
            background: #ebe9ea !important;
            color: #666;
            width: 100%;
            text-align: left;
            font-size: poTorem(18px);
          }
        }
        .content_top {
          font-size: poTorem(14px);
          margin-top: poTorem(10px);
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding-right: poTorem(10px);
          span:last-child {
            i {
              color: #eb344a;
            }
          }
        }
        .content_bottom {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          height: poTorem(22px);
          line-height: poTorem(18px);
          font-size: poTorem(14px);
          color: #959595;
          .right_time {
            margin-left: poTorem(4px);
          }
        }
      }
      .triangle {
        width: 1rem;
        justify-content: center;
        flex-direction: column;
        font-size: poTorem(13px);
        img {
          width: poTorem(7px);
          height: poTorem(15px);
          color: #959595;
        }
      }
    }
  }
}
</style>

