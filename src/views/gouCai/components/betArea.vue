<template>
  <div class="bet-area">
    <div class="con_item"
         v-for="(item,index) in dataSet"
         :key="index">
      <!-- 快捷操作-->
      <div class="head"
           v-if="!isDanshi">
        <span class="arrow">{{setArrowTitle(item)}}</span>
        <span data-v="1"
              :class="[{'by_right':modelTitle=='连码'},'odds']"
              v-if="peilvIsShow && ![1,8,21,30,33].includes(curPlayItem.playid) && js_tag=='lhc'">(赔率：{{peilv.length>0?peilv:'-'}})</span>
        <span data-v="2"
              class="odds"
              v-if="[21,8].includes(curPlayItem.playid) && js_tag=='lhc'">(赔率：{{pl==0?"0.0":pl}})</span>
        <span data-v="2"
              class="odds"
              v-if="[30,33].includes(curPlayItem.playid) && js_tag=='lhc'">(赔率：{{lianmaTxt}})</span>
        <div class="actions"
             v-if="([1, 36, 10, 11, 12, 13, 14, 15, 16].includes(curPlayItem.playid) && js_tag=='lhc') || js_tag!='lhc' && !isDanma(item.name)">
          <span v-for="(action, i) in item.actions"
                @click="doAction(action, item)"
                :class="{'active': action.checked && action.label !='清'}">{{action.label}}</span>
        </div>
      </div>
      <ul class="balls"
          v-if="!isDanshi && js_tag!='lhc'"
          :class="{'elex5': item.data.length === 11}">
        <li @click.stop="clickBall(item, ball)"
            v-for="(ball, ball_index) in item.data"
            :key="ball_index"
            style="position:relative"
            :data-val="ball.value"
            :class="{'shift_line' : curPlayItem.playid == 7 && ball_index == 5}">
          <div class="ball"
               ref="ballOptions"
               :class="[{choosed: ball.checked}]">{{ball.name}}</div>
          <input type="checkbox"
                 v-model="ball.checked">
        </li>
      </ul>
    </div>
    <div class="betting_right"
         v-if="js_tag=='lhc'">
      <div class="betting_con">
        <!-- 循环投注页面 -->
        <div class="con_item"
             v-for="(item,index) in dataSet"
             :key="index">
          <ul :class="{'around':[3].includes(curPlayItem.playid)}">
            <!-- 其他 -->
            <li @click="clickBall(item, ball, indexs)"
                v-for="(ball, indexs) in item.data"
                :key="indexs"
                :class="[{l_ball:typeNum==3},{xxl_ball: typeNum==0},{xl_ball: typeNum==4},{s_ball:typeNum==2}, {m_ball:typeNum==1}]">
              <input type="checkbox"
                     v-model="ball.checked"
                     v-show="false">
              <div ref="ballOptions"
                   v-setChoosed="ball.checked"
                   :class="[{medium_box:typeNum==3},{big_box: typeNum==0},{xxl_box: typeNum==4},{lottery_options:typeNum==2}, {square_box:typeNum==1, 'choosed': ball.checked}]">
                <span>{{ball.name}}</span>
                <div v-if="[0, 3, 4].includes(typeNum)"
                     :class="{grid:[3,9].includes(curPlayItem.playid) && isSupportGridLayout,wxgrid:[9].includes(curPlayItem.playid) && !isSupportGridLayout,flexgrid:[3].includes(curPlayItem.playid) && !isSupportGridLayout}">
                  <span v-for="(item, index) in ball.balls "
                        :key="index ">{{item}}</span>
                </div>
              </div>
              <div class="peilv_num "
                   v-if="!peilvIsShow ">{{Array.isArray(peilvs) && peilvs.length && peilvs.length > 0 ? peilvs[indexs] : '-'}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 单式 -->
    <div class="con_item"
         v-if="isDanshi && js_tag!='lhc'">
      <span class="arrow">{{curPlayItem.playname}}</span>
      <div class="danshi">
        <p>{{curPlayItem.play_title}}</p>
        <textarea autofocus
                  cols="30"
                  rows="8"
                  :placeholder="'例如：' + myPlaceholder"
                  v-model="danshiExcl"
                  @focus="shopShow=false"
                  @blur="shopShow=true"></textarea>
        <p class="caution">注意：</p>
        <p>每个号码之间请用空格隔开，每一注号码之间请用一个逗号[,]隔开</p>
      </div>
    </div>
    <div @click="clickCart"
         class="shop_icon"
         v-show="shopShow">
      <div class="_drag">
        <i class="spots"
           v-show="cartNumber>0">
          {{cartNumber > 99 ? '99+' : cartNumber}}
        </i>
      </div>
    </div>
    <div style="height: 3rem"></div>
  </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import danshiUtil from "~/js/touzhu/danshi.util";
export default {
  name: "BetArea",
  props: [
    "curPlayItem",
    "dataSet",
    "placeholder",
    "peilvIsShow",
    "modelTitle",
    "peilv",
    "typeNum",
    "peilvs",
    "pl",
    "isSupportGridLayout"
  ],
  data() {
    return {
      myPlaceholder: "",
      danshiExcl: "",
      shopShow: true
    };
  },
  directives: {
    setChoosed: {
      update(el, { value }) {
        if (value && el.classList && !el.classList.contains("choosed")) {
          el.classList.add("choosed");
        }
      }
    }
  },
  methods: {
    // 号码选择互斥
    mutex_11x5(name, curItem) {
      if (name.indexOf("胆码") != -1 || name.indexOf("拖码") != -1) {
        // 互斥的号码一般为胆拖，两行
        const arr1 = this.dataSet[0].data.filter(x => x.checked),
          arr2 = this.dataSet[1].data.filter(x => x.checked);

        // 如果是第一行点击，则第二行球消失
        if (name == this.dataSet[0].name) {
          arr1.forEach(item => {
            const index = arr2.findIndex(x => x.name === item.name);
            if (index >= 0) arr2[index].checked = !arr2[index].checked;
          });
          // 胆码最多只能选择三个或者两个
          if (curItem.playid == 51 && arr1.length > 7) {
            arr1.filter(x => x.name != curItem.name)[0].checked = false;
          } else if (curItem.playid == 50 && arr1.length > 6) {
            arr1.filter(x => x.name != curItem.name)[0].checked = false;
          } else if (curItem.playid == 49 && arr1.length > 5) {
            arr1.filter(x => x.name != curItem.name)[0].checked = false;
          } else if (curItem.playid == 48 && arr1.length > 4) {
            arr1.filter(x => x.name != curItem.name)[0].checked = false;
          } else if (curItem.playid == 47 && arr1.length > 3) {
            arr1.filter(x => x.name != curItem.name)[0].checked = false;
          } else if (curItem.playid == 46 && arr1.length > 2) {
            arr1.filter(x => x.name != curItem.name)[0].checked = false;
          } else if (curItem.playid == 45 && arr1.length > 1) {
            arr1.filter(x => x.name != curItem.name)[0].checked = false;
          } else if ([5, 10, 15].includes(curItem.playid) && arr1.length > 2) {
            arr1.filter(x => x.name != curItem.name)[0].checked = false;
          } else if ([20, 25].includes(curItem.playid) && arr1.length > 1) {
            arr1.filter(x => x.name != curItem.name)[0].checked = false;
          }
        }
        // 如果是第二行点击，则第一行球消失
        if (name == this.dataSet[1].name) {
          arr2.forEach(item => {
            const index = arr1.findIndex(x => x.name === item.name);
            if (index >= 0) arr1[index].checked = !arr1[index].checked;
          });
        }
      }
    },
    mutex_ssc(name, curItem) {
      if ([16, 30, 112, 122, 40].includes(this.curPlayItem.playid)) {
        // 互斥的号码一般为胆拖，两行
        const arr1 = this.dataSet[0].data.filter(x => x.checked);

        if (arr1.length > 1) {
          arr1.find(x => x.name != curItem.name).checked = false;
        }
      }
    },
    // 设置箭头标题
    setArrowTitle(item) {
      if (!item) return "";
      if (this.dataSet && this.dataSet.length === 1) {
        return this.curPlayItem.playname;
      }
      return item.name.split("|")[0];
    },
    clickCart() {
      if (this.cart.length) {
        this.$router.push("/shopCart");
      } else {
        this.$dialog.toast({ mes: "您的购物车空空如也" });
      }
    },
    // 点击快捷选球
    doAction(action, row) {
      row.actions.forEach(x => {
        x.checked = false;
      });
      action.checked = true;
      // console.log(action, arr)
      row.data.forEach(x => {
        x.checked = false;
        // 互斥，胆拖胆码清空
        if (
          [5, 10, 15, 20, 25, 45, 46, 47, 48, 49, 50, 51].includes(
            this.curPlayItem.playid
          ) &&
          this.js_tag === "11x5" &&
          action.label != "清"
        ) {
          this.dataSet[0].data.forEach(x => (x.checked = false));
        }
        switch (action.label) {
          case "全":
            x.checked = true;
            break;
          case "大":
            if (this.action_big(x.value)) x.checked = true;
            break;
          case "小":
            if (this.action_small(x.value)) x.checked = true;
            break;
          case "单":
            if (x.value % 2 !== 0) x.checked = true;
            break;
          case "双":
            if (x.value % 2 === 0) x.checked = true;
            break;
        }
      });
      this.$emit("chooseBall", null, null);
    },
    // 选择大 3d,ssc, 0到9，pk10 1到10 11x5 11选5 1到11
    action_big(value) {
      switch (this.js_tag) {
        case "ssc":
        case "qxc":
          return value > 4;
        case "pk10":
        case "11x5":
          return value > 5;
        case "3d":
          if ([3, 6].includes(this.curPlayItem.playid)) {
            return value > 13;
          } else if (this.curPlayItem.playid === 7) {
            return value > 12;
          } else return value > 4;
        case "lhc":
          return value > 24;
      }
    },
    // 选择小
    action_small(value) {
      switch (this.js_tag) {
        case "ssc":
        case "qxc":
          return value < 5;
        case "pk10":
        case "11x5":
          return value < 6;
        case "3d":
          if ([3, 6].includes(this.curPlayItem.playid)) {
            return value < 14;
          } else if (this.curPlayItem.playid === 7) {
            return value < 13;
          } else return value < 5;
        case "lhc":
          return value < 25;
      }
    },
    // 选择球
    clickBall(item, ball) {
      ball.checked = !ball.checked;
      if (this.js_tag === "11x5") this.mutex_11x5(item.name, ball);
      if (this.js_tag === "ssc") this.mutex_ssc(item.name, ball);
      this.linkToFastSelect(item);
      this.$emit("chooseBall", item, ball);
    },
    // 清除球和单式输入框
    clearBalls() {
      this.dataSet.forEach(x => {
        x.data.forEach(y => {
          y.checked = false;
        });
        x.actions.forEach(y => {
          y.checked = false;
        });
      });
      this.danshiExcl = "";
    },
    // 联动快捷选项
    linkToFastSelect(row) {
      const chckedItems = row.data.filter(x => x.checked),
        isMutilSelect = chckedItems.length >= row.data.length / 2;
      console.log(chckedItems);
      if (row.data.every(x => x.checked)) {
        this.clickFastSelect(row.actions, "全");
      } else if (row.data.every(x => !x.checked)) {
        this.clickFastSelect(row.actions, "清");
      } else if (chckedItems.every(x => x.value % 2 === 0) && isMutilSelect) {
        this.clickFastSelect(row.actions, "双");
      } else if (chckedItems.every(x => x.value % 2 !== 0) && isMutilSelect) {
        this.clickFastSelect(row.actions, "单");
      } else if (
        chckedItems.every(x => this.action_big(x.value)) &&
        isMutilSelect
      ) {
        this.clickFastSelect(row.actions, "大");
      } else if (
        chckedItems.every(x => this.action_small(x.value)) &&
        isMutilSelect
      ) {
        this.clickFastSelect(row.actions, "小");
      } else this.clickFastSelect(row.actions);
    },
    // 选择快捷选项
    clickFastSelect(actions, label) {
      actions.forEach(x => (x.checked = false));
      if (label) {
        actions.find(x => x.label === label).checked = true;
      }
    },
    // 设置快捷选项数据
    setFastSelect(dataSet) {
      if (dataSet.length && !dataSet[0].actions) {
        dataSet.forEach(x => {
          x.actions = [
            { label: "全", checked: false },
            { label: "大", checked: false },
            { label: "小", checked: false },
            { label: "单", checked: false },
            { label: "双", checked: false },
            { label: "清", checked: false }
          ];
        });
      }
    },
    // 是否是胆码
    isDanma(name) {
      if (this.$route.name !== "liaotianshi") return false;
      return (
        (this.isDantuo && name.includes("胆")) ||
        (this.js_tag == "ssc" &&
          [18, 32, 114].includes(this.curPlayItem.playid))
      );
    }
  },
  computed: {
    ...mapState({
      js_tag: state => state.betting.js_tag,
      cartNumber: state => state.betting.cartNumber,
      cart: state => state.betting.cart
    }),
    isDanshi() {
      return danshiUtil.isSingleMode(this.js_tag, this.curPlayItem.playid);
    },
    // 是否是胆拖
    isDantuo() {
      return (
        this.curPlayItem.wanfa.includes("胆拖") ||
        this.curPlayItem.wanfa.includes("包胆")
      );
    },
    // 六合彩连码下特殊显示的文字赔率
    lianmaTxt() {
      return this.curPlayItem.playid == 33
        ? `${this.peilvs[0] || "-"}(中特)/${this.peilvs[1] || "-"}(中二)`
        : `${this.peilvs[0] || "-"}(三中二)/${this.peilvs[1] || "-"}(三中二三)`;
    }
  },
  watch: {
    placeholder(val) {
      if (val) this.myPlaceholder = val;
    },
    danshiExcl(val) {
      this.$emit("input", val);
    },
    dataSet(val) {
      this.setFastSelect(val);
    }
  },
  beforeMount() {
    this.setFastSelect(this.dataSet);
  },
  activated() {
    this.setFastSelect(this.dataSet);
    this.bus.$on("clearBalls", this.clearBalls);
    this.$nextTick(() => {
      this.dataSet.forEach(x => x.actions.forEach(y => (y.checked = false)));
    });
  },
  deactivated() {
    this.bus.$off("clearBalls");
  }
};
</script>

<style lang="scss" scoped>
@import "../../../css/resources.scss";
.bet-area {
  background: rgb(243, 243, 243);
  width: 100%;
  padding: 0.85rem;
  flex: 1;
  display: block;
  overflow-y: scroll;
  .betting_right {
    // max-height: poTorem(517px);
    flex: 1;
    display: block;
    overflow: scroll;
    .select {
      @include center;
      width: poTorem(240px);
      height: poTorem(39px);
      border: poTorem(1px) solid #eaeaea;
      border-radius: poTorem(5px);
      font-size: poTorem(16px);
      color: #434343;
      position: relative;
      margin: 0 auto;
      margin-top: poTorem(15px);
      .icon {
        position: absolute;
        background: url(~img/goucai/sanjiao.png) no-repeat;
        background-size: contain;
        width: poTorem(29px);
        height: poTorem(14px);
        right: 0px;
      }
    }
    .odds {
      color: #535353;
      margin: poTorem(10px) 0 0px 0;
      font-size: poTorem(14px);
      display: block;
      text-align: center;
    }
    .by_right {
      text-align: right;
    }
    .betting_right_bottom {
      position: fixed;
      bottom: poTorem(65px);
      width: 100%;
    }
  }
  .betting_con {
    @include column;
    width: 100%;
    .con_item {
      width: 100%;
      @include column;
      border-bottom: poTorem(1px) solid #dbdbdb;
      // padding: 0 poTorem(10px);
      margin-top: poTorem(5px);
      &:last-child {
        border-bottom: none;
      }
      > span {
        align-self: flex-start;
        color: #707070;
        font-size: poTorem(16px);
      }
      ul {
        @include around;
        justify-content: flex-start;
        flex-wrap: wrap;
        // padding: poTorem(20px) 0;
        &.around {
          @include start;
        }
        li {
          position: relative;
          outline: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          @include column;
          padding: poTorem(5px) poTorem(5px);
          color: #707070;
          // margin-right: 0.4rem;
          .big_box,
          .medium_box,
          .xxl_box {
            background-color: #fff;
            color: #e33939;
            width: poTorem(165px);
            height: poTorem(100px);
            border: poTorem(1px) solid #dbdbdb;
            border-radius: poTorem(5px);
            text-align: center;
            > div {
              display: flex;
              justify-content: space-around;
              > span {
                font-size: 0.9rem;
              }
            }
            > div.grid {
              display: grid;
              grid-template-columns: repeat(5, 1fr);
              grid-gap: poTorem(3px);
              padding: 0 2px;
            }
            > div.flexgrid {
              justify-content: flex-start;
              flex-wrap: wrap;
              > span {
                padding: 0.3rem poTorem(8px);
              }
            }
            > div.wxgrid {
              justify-content: flex-start;
              flex-wrap: wrap;
              > span {
                // padding: 0.1rem poTorem(2px);
                display: inline-block;
                width: poTorem(21px);
                height: poTorem(21px);
              }
            }
            > span {
              font-size: poTorem(18px);
              display: block;
              // padding: 4px 0;
            }
            p {
              @include start;
              flex-wrap: wrap;
              padding: 0 poTorem(10px);
              span {
                display: inline-block;
                width: poTorem(25px);
                font-size: poTorem(16px);
              }
            }
          }
          .big_box {
            height: 7rem;
            > p {
              font-size: 1rem;
              text-align: justify;
              line-height: 1.6;
            }
          }
          .medium_box,
          .xxl_box {
            width: poTorem(165px);
            height: poTorem(50px);
            p {
              @include around;
              padding: 0;
              span {
                width: auto;
                // font-size: poTorem(12px);
              }
            }
          }
          .xxl_box {
            // width: poTorem(130px);
            height: poTorem(88px);
            p > span:first-child {
              padding: 0 1px;
            }
            > p {
              text-align: center;
              // padding: 0 8px;
              line-height: 1.5;
            }
          }
          .medium_box {
            width: poTorem(115px);
          }
          div {
            text-align: center;
          }
          .lottery_options {
            width: poTorem(45px);
            height: poTorem(45px);
            border-radius: 50%;
            background: #fff;
            // margin-left: poTorem(26px);
            // margin-top: poTorem(10px);
            border: poTorem(1px) solid #dbdbdb;
            font-size: poTorem(22px);
            line-height: poTorem(43px);
            color: #e33939;
            font-weight: 900;
          }
          .square_box {
            width: poTorem(70px);
            height: poTorem(40px);
            border: poTorem(1px) solid #dbdbdb;
            border-radius: poTorem(5px);
            font-size: poTorem(18px);
            line-height: poTorem(38px);
            color: #e33939;
            background-color: #fff;
          }
          > .choosed {
            background-color: #e33939;
            color: #fff;
            border: none;
          }
          .peilv_num {
            padding-top: 0.5rem;
            font-weight: 900;
            color: #535353;
          }
          label {
            width: 100%;
            height: 100%;
            position: absolute;
            opacity: 0;
            input {
              width: 100%;
              height: 100%;
              border: none;
            }
          }
        }
        .s_ball {
          padding-right: 1.5rem;
          // &:nth-child(5n) {
          //   padding-right: 0;
          // }
        }
        .m_ball {
          padding-right: 1.2rem;
          // &:nth-child(4n) {
          //   padding-right: 0;
          // }
        }
        .l_ball {
          padding-right: 0.4rem;
          // &:nth-child(3n) {
          //   padding-right: 0;
          // }
        }
        .xl_ball {
          padding-right: 0.9rem;
          // &:nth-child(2n) {
          //   padding-right: 0;
          // }
        }
        .xxl_ball {
          padding: 0 0.8rem;
          // &:nth-child(2) {
          //   padding-right: 0;
          // }
        }
      }
    }
  }
  .head {
    @include center;
    justify-content: flex-start;
  }
  .arrow {
    @include center;
    background: url(~img/goucai/morenzhuangtai.png) no-repeat;
    width: 24%;
    height: poTorem(50px);
    background-size: contain;
    background-position: center;
    font-size: poTorem(16px);
    // color: #e13939;
    color: #666;
    // margin-right: poTorem(20px);
    margin-right: poTorem(10px);
  }
  .actions {
    flex: 1;
    background: rgb(220, 220, 220);
    border-radius: poTorem(20px);
    @include center;
    padding: poTorem(3px) 0;
    > span {
      width: poTorem(34px);
      height: poTorem(34px);
      display: inline-block;
      color: #666;
      background: #fff;
      border-radius: 50%;
      font-size: poTorem(18px);
      line-height: poTorem(34px);
      text-align: center;
      margin: 0 poTorem(2px);
      border: 1px solid #ccc;
      &.active {
        background: #e33939;
        color: #fff;
      }
    }
  }
  .balls {
    @include center;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 4px 0;
    &.elex5 {
      justify-content: flex-start;
      .ball {
        margin: poTorem(8px) poTorem(10px);
      }
    }
    > li {
      position: relative;
    }
    .ball {
      width: poTorem(42px);
      height: poTorem(42px);
      margin: poTorem(8px) poTorem(13px);
      background: #fff;
      border-radius: 50%;
      border: 1px solid #999;
      color: #e33939;
      font-size: poTorem(18px);
      line-height: poTorem(42px);
      text-align: center;
      transition: all 0.2s ease;
      &.choosed {
        background: #e33939;
        border: 1px solid #e33939;
        color: #fff;
      }
    }
    input {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
  .danshi {
    color: #666;
    font-size: 1rem;
    .caution {
      color: #ff7d32;
    }
    textarea {
      border-radius: 4px;
      border: 1px solid #a0a0a0;
      width: 100%;
      margin: 10px 0;
      padding: poTorem(6px);
    }
  }
  .shop_icon {
    display: flex;
    position: fixed;
    bottom: 3.5625rem;
    left: 1.3rem;
    ._drag {
      position: relative;
      box-shadow: #555 0 0 poTorem(10px);
      border-radius: 50%;
      width: poTorem(60px);
      height: poTorem(60px);
      background: #fff url(~img/goucai/gouwuche.png) no-repeat;
      background-size: poTorem(30px) poTorem(30px);
      background-position: center;
      .spots {
        position: absolute;
        @include center;
        width: poTorem(24px);
        height: poTorem(24px);
        background: #e03a3a;
        display: flex;
        border-radius: 50%;
        font-weight: bolder;
        color: #fff;
        right: 0;
        top: 0;
      }
    }
  }
}
</style>
