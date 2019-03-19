<template>
  <div class="lottery_lists">
    <ul>
      <li>
        <div @click="toOpen()">
          <div class="big_box">
            <div class="icon">
              <!-- <img :src="sysinfo.upload_url + '/' + sysinfo.website  + '/Uploads/cpicon/' + data.tag + '.png' " alt="图呢"> -->
              <img :src="data.icon"
                   alt="图呢">
            </div>
            <div class="content">
              <div class="content_top">
                <span class="game_name">{{data.game_name}}</span>
              </div>
              <div class="content_middle">
                <span v-if="['ssc', 'qxc'].includes(data.js_tag)"
                      v-for="(items,indexs) in balls"
                      :key="indexs"
                      :class="[{active:  items == ''},classFun(data.js_tag)]">
                  {{items == '' ? '正在开奖...' : items}}
                </span>
                <span v-if="data.js_tag=='k3'"
                      v-for="(items,indexs) in balls"
                      :key="indexs"
                      :class="[{active: items == ''},classFun(data.js_tag),`kt${items}`]">
                  {{items == '' ? '正在开奖...' : ''}}
                </span>
                <span v-if="['pk10', 'pkniuniu'].includes(data.js_tag)"
                      v-for="(items,indexs) in balls"
                      :style="{background:`${pk10bjys(parseInt(items))}`}"
                      :key="indexs"
                      :class="[{active: items == ''},classFun(data.js_tag),'pk10']">
                  {{items == '' ? '正在开奖...' : items}}
                </span>
                <span v-if="data.js_tag=='lhc'"
                      v-for="(items,indexs) in balls"
                      :style="{background:`${ballToColor(parseInt(items))}`}"
                      :key="indexs"
                      :class="[{active:  items == ''},classFun(data.js_tag)]">
                  <i v-if="indexs == 5 && items != ''">+</i>
                  {{items == '' ? '正在开奖...' : items}}
                </span>
                <span v-if="data.js_tag=='pcdd'"
                      v-for="(items,indexs) in balls"
                      :style="{background:`${pcddcolor(parseInt(items),indexs)}`}"
                      :key="indexs"
                      :class="[{['color-ball-'+items]: indexs === 3},{active: items == ''},classFun(data.js_tag)]">
                  <i v-if="indexs == 2 && items != ''">=</i>
                  <i v-if="indexs == 1 && items != ''">+</i>
                  <i v-if="indexs == 0 && items != ''">+</i>
                  {{ items == '' ? '正在开奖...' : items }}
                </span>
                <span v-if="data.js_tag=='11x5'"
                      v-for="(items,indexs) in balls"
                      :key="indexs"
                      :class="[{active: items == ''},classFun(data.js_tag)]">
                  {{items == '' ? '正在开奖...' : items}}
                </span>
                <span v-if="data.js_tag=='3d'"
                      v-for="(items,indexs) in balls"
                      :key="indexs"
                      :class="[{active: items == ''},classFun(data.js_tag)]">
                  {{items == '' ? '正在开奖...' : items}}
                </span>
                <span v-if="data.js_tag=='tzyx'"
                      :class="{'tzyx':data.js_tag=='tzyx'}">
                  <span v-ds>{{returnz(balls[0])}}</span>
                  <span v-ds>{{returnsz(balls[1])}}</span>
                  <span v-ds>{{returny(balls[2])}}</span>
                </span>
                <span v-if="data.js_tag=='xync'"
                      class="xync">
                  <span class="Colorno"
                        v-for="(items,indexs) in balls"
                        :key="indexs">
                    <img :src="require('../../../img/xync_background/lucky_ball_'+ items +'.png')"
                         alt="图片">
                  </span>
                </span>
                <span v-if="data.js_tag=='xypk'"
                      class="xync">
                  <span class="Colorno"
                        v-for="(items,indexs) in balls"
                        :key="indexs">
                    <img :src="require('../../../img/xingyunpuke/puke_'+ items +'.png')"
                         alt="图片"
                         style="margin: 0; height: 1.8rem;">
                  </span>
                </span>
              </div>
              <div class="content_bottom">
                <span v-for="(items,indexs) in data.prev"
                      v-if="indexs == 0"
                      :key="indexs">第{{items.qishu}}期</span>
                <span class="right_time"
                      v-if="data.length !=0">{{data.prev[0].opentime | dateFrm}}</span>
              </div>
            </div>
            <div class="triangle">
              <img :src="icon_src"
                   alt="">
            </div>
          </div>
        </div>
      </li>

    </ul>
  </div>

</template>
<script>
import { mapState } from "vuex";
import { BallToColor2, BallToColorpcdd } from "../../../js/xglhc.data.2017";
import { pk10bjys } from "../../../js/pk10color";
import dayjs from "dayjs";

const thArr = ["0"],
  thszArr = ["1"];
export default {
  props: {
    tag: String,
    datas: Object,
    indexs: Number
  },
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
      data: [],
      balls: Array,
      timer: Function,
      content: "",
      changeRed: 0,
      icon_src: require("../../../../src/img/right_jiantou.png")
    };
  },
  computed: {
    ...mapState({
      sysinfo: state => state.sysinfo
    })
  },
  mounted() {
    this.data = this.datas;
    this.balls = this.data.prev[0].balls.split("+");
  },
  methods: {
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
    toOpen() {
      // if (this.data.enable === 2) {
      //     this.$dialog.toast({ mes: "该彩种正在维护中" });
      // } else {
      this.$router.push({
        name: "kjxq",
        params: {
          lotter_id: this.data.gameid,
          name_tag: this.data.tag,
          game_name: this.data.game_name,
          js_tag: this.data.js_tag,
          speed: this.data.speed,
          enable: this.data.enable,
          yearid: this.data.yearid
        }
      });
      // }
    },
    getKjCpLog_get() {
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "getKjCpLog",
        tag: "",
        date: ""
      }).then(res => {
        this.data = res;
        this.balls = res.prev[0].balls.split("+");
        this.$dialog.loading.close();
      });
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
    }
  },
  watch: {
    datas(val) {
      this.data = val;
      this.balls = this.data.prev[0].balls.split("+");
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources";
.lottery_lists {
  background-color: #fff;
  > ul {
    .big_box {
      display: flex;
      width: 100%;
      min-height: poTorem(90.3px);
      border-bottom: solid 1px #dbdbdb;
      justify-content: space-around;
      align-items: center;
      .icon {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: poTorem(70px);
        img {
          width: poTorem(58px);
          height: poTorem(58px);
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
          span {
            margin: poTorem(3px);
            width: poTorem(28px);
            height: poTorem(28px);
            border-radius: 50%;
            // background: #f33;
            color: #fff;
            text-align: center;
            line-height: poTorem(28px);
            font-size: poTorem(16px);
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
            // div {
            //   width: 1.8rem;
            //   height: 1.8rem;
            //   margin-left: poTorem(10px);
            //   // padding-left: poTorem(7px);
            //   border: poTorem(1px) solid rgb(221, 221, 221);
            //   border-radius: 50%;
            //   text-align: center;
            //   line-height: poTorem(26.8px);
            // }
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
            background: #fff !important;
            color: #666;
            width: 100%;
            text-align: left;
            font-size: poTorem(18px);
          }
        }
        .content_top {
          font-size: poTorem(14px);
          margin-top: poTorem(10px);
          span:last-child {
            color: #525252;
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
