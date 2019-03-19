<template>
  <transition enter-active-class="animated slideInDown"
              leave-active-class="animated slideOutUp">

    <div class="model_bet"
         v-if="show">
      <div class="model_bg"></div>
      <div class="con">
        <div class="con_model"
             ref="con_model"
             :class="{'mt': hideKeyboard}">
          <div class="title">
            <span class="title_top">{{gameName}}</span>
            <span class="qishi">第
              <i>{{qishu}}</i>期</span>
            <div @click="close"
                 class="close"
                 v-if="hasDirectBet"></div>
          </div>
          <div class="txt"
               v-if="betData.type == 1 && label"
               v-html="label">
          </div>
          <div class="input"
               @click="inputFocus($event)">
            <p style="font-size: 1.25rem;width: 35%">单注金额：</p>
            <input type="text"
                   v-model="unitPrice"
                   placeholder="请输入金额"
                   maxlength="6"
                   disabled>
            <p>
              <span v-for="(item, index) in unit"
                    :key="index"
                    :class="{active: val==index}"
                    @click="chooseUnit(index)">{{item}}</span>
            </p>
          </div>
          <ul class="choose_price">
            <li v-for="(item, index) in priceNum"
                :key="index"
                :class="{choosed_price: indexes==index}"
                @click="choosePrice(item, index)">¥{{item}}</li>
          </ul>
          <div class="append">
            <div class="top">
              <div class="total_num">
                <p class="tag">总注数</p>
                <p class="info_num">
                  <span>{{betNumber}}</span>注</p>
              </div>
              <div class="total_num">
                <p class="tag">总金额</p>
                <p class="info_num">
                  <span>{{totalPrice}}</span>元</p>
              </div>
            </div>
            <p class="bottom">若中奖，单注最高中：
              <span>{{unitMaxPrice}}</span>元</p>
          </div>
          <div class="add"
               v-if="!hasDirectBet">
            <span @click="close">取消</span>
            <span style="color:#00a0e9"
                  @click="toCart">确定</span>
          </div>
          <div class="add"
               v-if="hasDirectBet">
            <span @click="toCart">加入购物车</span>
            <span style="color:#00a0e9"
                  :class="{'direct_bet': submitting}"
                  @click="directBet">{{submitting?'提交中':'一键购买'}}</span>
          </div>
        </div>
        <keyboard :thinSkin="true"
                  :num="unitPrice"
                  @keyboardPressed="keyboardPressed"
                  :hide="hideKeyboard"
                  @hideKeyboard="hideKeyboardHandle">
          <span></span>
        </keyboard>
      </div>
    </div>
  </transition>

</template>
<script>
import { mapActions, mapState } from "vuex";
import { RenderTypes } from "~/js/touzhu/commonTypes";
import keyboard from "../components/keyboard";
import {
  getTwoBalls,
  getThreeBalls,
  getFourBalls,
  getFiveBalls
} from "~/js/touzhu/touzhu.lhc";
import danshiUtil from "~/js/touzhu/danshi.util";
import modelBetMixin from "./modelBetMixin";
export default {
  props: {
    show: Boolean
  },
  mixins: [modelBetMixin],
  components: {
    keyboard
  },
  data() {
    return {
      shows: false,
      unitPrice: "", // 单注金额
      isActive: true,
      unit: ["元", "角"],
      unitNumber: [1, 0.1], // 元和角对应值
      val: 0, // 当前选择的是元还是角
      indexes: -1,
      hideKeyboard: false,
      priceNum: [50, 100, 200, 500], // 每注金额
      submitting: false,
      label: ""
    };
  },
  computed: {
    // 总价格
    totalPrice() {
      const unitPrice = Number.isNaN(this.unitPrice)
        ? 0
        : Number(this.unitPrice);
      if (this.val === 0) {
        return (unitPrice * this.betNumber * this.unitNumber[this.val]).toFixed(
          2
        );
      } else {
        return (unitPrice * this.betNumber * this.unitNumber[this.val]).toFixed(
          2
        );
      }
    },
    // 计算单注最大盈利
    unitMaxPrice() {
      // 六合彩连选必中取最小赔率
      if (
        this.betData.js_tag === "lhc" &&
        [22, 23, 24, 25, 26, 27, 28, 29].includes(this.betData.playid)
      ) {
        const minPeilv = Math.min(
          ...this.betData.dataSet.map(x => x.peilv * 1)
        );
        return (
          Number(this.unitPrice) *
          minPeilv *
          this.unitNumber[this.val]
        ).toFixed(2);
      }

      const maxPeilv = this.getMaxPeilvFromBetData();
      const unitPrice = Number.isNaN(this.unitPrice)
        ? 0
        : Number(this.unitPrice);
      if (!isNaN(maxPeilv)) {
        if (this.val === 0) {
          return (unitPrice * maxPeilv * this.unitNumber[this.val]).toFixed(2);
        }
        return (unitPrice * maxPeilv * this.unitNumber[this.val]).toFixed(2);
      }
      return 0;
    },
    calcBetData() {
      // 单行多赔率
      // 格式化后的文字
      let formatedStr = "";
      if (this.betData.peilvType == RenderTypes.SINGLE_ROW_MUTI_PEILV) {
        formatedStr = this.betData.filteredData[0].name || "号码";
        formatedStr += "( ";
        this.betData.arr.forEach((x, i) => {
          if (x.length) {
            formatedStr +=
              x
                .split("|")
                .map(x => `${`<span style="color:red">${x}</span>`}`)
                .join(",") + (i == this.betData.arr.length - 1 ? "" : ",");
          }
        });
        formatedStr += " )";
      }
      // 多行单赔率
      if (this.betData.peilvType == RenderTypes.MUTI_ROW_SINGLE_PEILV) {
        formatedStr = this.betData.formatShowStr;
        const values = this.betData.dataSet.map(x => x.value).join("|");
        this.betData.dataSet = [
          {
            checked: true,
            name: this.betData.formatShowStr,
            peilv: this.betData.peilv,
            value: values
          }
        ];
      }
      // 多行多赔率
      if (
        this.betData.peilvType == RenderTypes.MUTI_ROW_MUTI_PEILV ||
        this.betData.peilvType == RenderTypes.DWD
      ) {
        this.betData.filteredData.forEach(item => {
          formatedStr += `${item.name}(${item.data
            .map(y => `<span style='color:red'>${y.name}</span>`)
            .join(",")})`;
        });
      }
      // 单行单赔率
      if (this.betData.peilvType == RenderTypes.SINGLE_ROW_SINGLE_PEILV) {
        this.betData.filteredData.forEach(item => {
          formatedStr += `${item.name || "号码"}(${item.data
            .map(y => `<span style='color:red'>${y.name}</span>`)
            .join(",")})`;
        });
      }
      let peilvStr = [];
      if (this.betData.peilv && this.betData.peilv.includes("|")) {
        this.betData.filteredData.forEach(x => {
          x.data.forEach(y => {
            peilvStr.push(y.peilv);
          });
        });
        peilvStr = peilvStr.join("|");
      } else {
        peilvStr = this.betData.peilv;
      }

      if (
        this.betData.peilvType === RenderTypes.SSC ||
        this.betData.peilvType === RenderTypes.LHC
      ) {
        this.betData.filteredData.forEach(item => {
          formatedStr += `${item.name}(${item.data
            .map(y => `<span style='color:red'>${y.name}</span>`)
            .join(",")})`;
        });
        if (this.betData.peilvType === RenderTypes.LHC && this.betData.pl) {
          peilvStr = this.betData.pl;
        }
      }
      return Object.assign(
        {
          unitPrice:
            this.val === 0 ? this.unitPrice : (this.unitPrice / 10).toFixed(2),
          formatedStr,
          totalPrice: this.totalPrice,
          peilvStr
        },
        this.betData
      );
    },
    ...mapState({
      betNumber: state => state.betting.betNumber, // 注数
      // odds: state => state.betting.odds, // 赔率
      gameName: state => state.betting.gameName,
      gameid: state => state.betting.gameId,
      nameTag: state => state.betting.name_tag,
      qishu: state => state.betting.qishu,
      betData: state => state.betting.betData,
      switches: state => state.betting.switch
    })
  },
  methods: {
    processDanshi(item, container) {
      if (item.danshiExcl && item.danshiExcl.length) {
        let data = Array.isArray(item.arr2) ? item.arr2[0] : item.arr2;
        data = data.includes(" ") ? data.split(" ").join("|") : data;
        container.push(`${item.playid}#${item.totalPrice}#${data}`);
      }
    },
    processSSCData(item, container) {
      // 单式
      if (item.danshiExcl && item.danshiExcl.length) {
        let data = Array.isArray(item.arr2) ? item.arr2[0] : item.arr2;
        data = data.includes(" ") ? data.split(" ").join("|") : data;
        container.push(`${item.playid}#${item.unitPrice}#${data}`);
      } else if (item.arr2.length === 1) {
        // 单行
        const values = [];
        item.arr2.forEach(x => {
          x.includes("|") ? values.push(...x.split("|")) : values.push(x);
        });
        container.push(`${item.playid}#${item.unitPrice}#${values.join("+")}`);
      } else {
        // 多行
        let values = item.arr2.join("+");
        // 定位胆
        if (item.peilvType === RenderTypes.DWD) {
          values = item.dwdValuesArr.filter(x => x).join("+");
        }
        const str = `${item.playid}#${item.unitPrice}#${values}`;
        container.push(str);
      }
    },
    // 处理六合彩数据
    processLHCDatas(item, container) {
      if ([8, 21].includes(item.playid)) {
        const str = `${item.playid}#${item.unitPrice}#${item.arr2[0]
          .split("|")
          .join("+")}`;
        container.push(str);
      } else {
        const str = `${item.playid}#${item.unitPrice}#${item.arr2}`;
        console.log(str);
        container.push(str);
      }
    },
    // 处理六合彩的特殊数据
    processLHCData(betData) {
      const towArr = [22, 26, 32, 33, 34],
        threeArr = [23, 27, 30, 31],
        fourArr = [24, 28, 35],
        fiveArr = [25, 29];

      if (towArr.includes(betData.playid)) {
        betData.arr = getTwoBalls(betData.formatValueStr.split(" "));
        betData.arr2 = getTwoBalls(betData.arr2[0].split("|"));
      }
      if (threeArr.includes(betData.playid)) {
        betData.arr = getThreeBalls(betData.formatValueStr.split(" "));
        betData.arr2 = getThreeBalls(betData.arr2[0].split("|"));
      }
      if (fourArr.includes(betData.playid)) {
        betData.arr = getFourBalls(betData.formatValueStr.split(" "));
        betData.arr2 = getFourBalls(betData.arr2[0].split("|"));
      }
      if (fiveArr.includes(betData.playid)) {
        betData.arr = getFiveBalls(betData.formatValueStr.split(" "));
        betData.arr2 = getFiveBalls(betData.arr2[0].split("|"));
      }
    },

    inputFocus(event) {
      if (event.srcElement.tagName === "INPUT") {
        if (this.hideKeyboard) this.hideKeyboard = false;
      }
    },
    hideKeyboardHandle() {
      this.hideKeyboard = true;
    },
    // 从传来的数据中获取赔率最大的
    getMaxPeilvFromBetData() {
      if (
        danshiUtil.isSingleMode(this.betData.js_tag, this.betData.playid) ||
        this.betData.singlePl
      ) {
        return this.betData.peilv;
      }
      if (
        this.betData.peilvType === RenderTypes.SSC ||
        this.betData.peilvType === RenderTypes.LHC
      ) {
        if (this.betData.pl) {
          this.betData.peilv = this.betData.pl;
          return this.betData.pl;
        }
        if (this.betData.peilv) {
          if (this.betData.peilv.includes("|")) {
            const peilvs = this.betData.peilv.split("|");
            return Math.max(...peilvs.map(x => Number(x)));
          } else {
            return this.betData.peilv;
          }
        }
      }

      if (this.betData && this.betData.dataSet) {
        return this.betData.dataSet.length
          ? Math.max(...this.betData.dataSet.map(x => x.peilv))
          : 1;
        // return Math.max(...this.betData.dataSet.map(x => x.peilv))
      } else {
        return 1;
      }
    },
    addLHCDataToCart() {
      const _arr = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
        _betData = this.calcBetData;
      if (
        // 合肖 自选不中
        [8, 21].includes(this.calcBetData.playid)
      ) {
        let _arr2 = _betData.arr2[0];
        if (_arr2.includes(" ")) {
          _arr2 = _arr2.split(" ").join("+");
        }
        if (_arr2.includes("|")) {
          _arr2 = _arr2.split("|").join("+");
        }
        this.calcBetData.arr2 = [_arr2];
        this.addToCart(this.calcBetData);
      } else if (_arr.includes(this.calcBetData.playid)) {
        this.processLHCData(this.calcBetData);
        _betData.arr.forEach((x, i) => {
          const _arr2 = _betData.arr2[i];
          const obj = {
            arr: x,
            arr2: _arr2.split(" ").join("+"),
            formatShowStr: x,
            formatValueStr: _betData.arr2[i],
            formatedStr: `${x
              .split(" ")
              .map(y => `<span style='color:red'>${y}</span>`)
              .join(" ")}`,
            totalPrice: _betData.unitPrice,
            peilvStr: _betData.peilv,
            zhushu: 1
          };
          const _obj = Object.assign({}, _betData);
          this.addToCart(Object.assign(_obj, obj));
        });
      } else {
        this.calcBetData.dataSet.forEach(x => {
          const obj = {
            arr: [x.name],
            arr2: [x.value],
            formatShowStr: x.name,
            formatValueStr: x.value,
            formatedStr: `<span style='color:red'>${x.name}</span>`,
            totalPrice: this.calcBetData.unitPrice,
            peilvStr: x.peilv,
            zhushu: 1
          };
          const _obj = Object.assign({}, this.calcBetData);
          this.addToCart(Object.assign(_obj, obj));
        });
      }
    },
    addDataToCart(calcBetData) {
      // 单行多赔率和多行多赔率的需要单独添加到购物车
      if (
        calcBetData.type === 1 &&
        (calcBetData.peilvType === RenderTypes.MUTI_ROW_MUTI_PEILV ||
          calcBetData.peilvType === RenderTypes.SINGLE_ROW_MUTI_PEILV)
      ) {
        calcBetData.filteredData.forEach(row => {
          row.data.forEach(item => {
            const obj = {
              arr: [item.name],
              arr2: [item.value],
              formatShowStr: item.name,
              formatValueStr: item.value,
              formatedStr: `${
                row.name === "" ? "号码" : row.name
              }(<span style='color:red'>${item.name}</span>)`,
              totalPrice: calcBetData.unitPrice,
              peilvStr: item.peilv,
              zhushu: 1
            };

            const _obj = Object.assign({}, calcBetData);
            this.addToCart(Object.assign(_obj, obj));
          });
        });
      } else if (
        danshiUtil.isSingleMode(calcBetData.js_tag, calcBetData.playid)
      ) {
        // 如果是单式
        if (calcBetData.danshiExcl.length) {
          calcBetData.danshiExcl.split(",").forEach(item => {
            const obj = {
              arr: [item],
              arr2: [item],
              formatedStr: `号码(<span style='color:red'>${item}</span>)`,
              totalPrice: calcBetData.unitPrice,
              peilvStr: calcBetData.peilv,
              zhushu: 1
            };

            const _obj = Object.assign({}, calcBetData);
            this.addToCart(Object.assign(_obj, obj));
          });
        }
      } else {
        this.addToCart(calcBetData);
      }
    },
    toCart() {
      if (
        this.unitPrice === 0 ||
        (typeof this.unitPrice === "string" && !this.unitPrice.length) ||
        Number.isNaN(this.unitPrice)
      ) {
        this.$dialog.alert({ mes: "请填写单注金额" });
        return false;
      }
      if (this.calcBetData.peilvType == RenderTypes.LHC) {
        this.addLHCDataToCart();
      } else {
        // this.addToCart(this.calcBetData);
        this.addDataToCart(this.calcBetData);
      }

      this.$router.push("/shopcart");
    },
    close() {
      this.$emit("close", false);
      this.hideKeyboard = false;
      this.submitting = false;
    },
    transformBoard() {
      this.hideKeyboard = !this.hideKeyboard;
    },
    choosePrice(n, i) {
      this.indexes = i;
      this.unitPrice = n;
    },
    keyboardPressed(val) {
      this.unitPrice = val;
    },
    chooseUnit(i) {
      this.val = i;
    },
    ...mapActions(["addToCart", "clearCart", "flushPrice"])
  },
  created() {
    this.label = this.calcBetData && this.calcBetData.formatedStr;
  },
  activated() {
    this.unitPrice = "";
    this.val = 0;
    this.indexes = -1;
    this.hideKeyboard = false;
  },
  deactivated() {
    this.shows = false;
  },
  watch: {
    show(val) {
      this.shows = val;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.txt {
  font-size: 1rem;
  height: 3rem;
  line-height: 3rem;
  padding: 0 1.25rem;
  width: 100%;
  text-align: left;
  white-space: normal;
  word-wrap: break-word;
  overflow-y: scroll;
  line-height: 1.5;
  &.single-row {
    padding-top: poTorem(6px);
  }
}
.animated {
  animation-duration: 0.3s;
}
.model_bet {
  top: 0;
  bottom: 0;
  width: 100%;
  position: fixed;
  z-index: 11111;
  .con {
    position: fixed;
    z-index: 1600;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    @include column;
    .con_model {
      transition: margin-top 0.3s ease;
      animation: all 0.2s linear;
      background: #fff;
      width: 90%;
      margin: poTorem(50px) 0 poTorem(10px);
      .input {
        @include between;
        padding: 0 5%;
        height: poTorem(52px);
        width: 100%;
        position: relative;
        p {
          width: 20%;
          font-size: poTorem(16px);
          color: #414141;
          span {
            font-size: poTorem(17px);
            display: inline-block;
            width: 50%;
            height: poTorem(30px);
            line-height: poTorem(30px);
            border: poTorem(1px) solid #a5a5a5;
            text-align: center;
            float: left;
          }
          .active {
            background-color: #e33939;
            color: #fff;
            border: none;
          }
        }
        input {
          border: poTorem(1px) solid #a5a5a5;
          color: #000;
          border-radius: poTorem(3px);
          display: flex;
          height: poTorem(32px);
          width: 40%;
          font-size: poTorem(16px);
          text-align: center;
          // -webkit-text-fill-color: #000;
          &::-webkit-input-placeholder {
            color: #b5b5b5;
            font-size: poTorem(16px);
          }
          // &:disabled {
          //   color: #000;
          //   opacity: 1;
          // }
        }
      }
      .choose_price {
        position: relative;
        @include between;
        flex-wrap: nowrap;
        padding: 0 poTorem(10px);
        padding-bottom: poTorem(10px);
        width: 100%;
        &:after {
          content: "";
          position: absolute;
          z-index: 3;
          bottom: 0;
          left: 0;
          width: 100%;
          border-bottom: poTorem(1px) solid #a5a5a5;
          transform: scaleY(0.5);
        }
        li {
          width: 20%;
          color: #767675;
          font-size: poTorem(18px);
          font-weight: 600;
          height: poTorem(28px);
          line-height: poTorem(26px);
          border: poTorem(1px) solid #a5a5a5;
          margin: poTorem(5px) poTorem(10px);
          border-radius: poTorem(3px);
          text-align: center;
        }
        .choosed_price {
          background-color: #e33939;
          color: #fff;
          border: none;
        }
      }
      .append {
        .top {
          @include around;
          padding: poTorem(4px) poTorem(30px);
          .total_num {
            @include column;
            color: #7d7d7d;
            font-size: poTorem(20px);
            height: poTorem(50px);
            width: 50%;
            &:first-child {
              border-right: poTorem(1px) solid #a5a5a5;
            }
            .tag {
              font-size: poTorem(16px);
              font-weight: bold;
              color: #b5b5b5;
            }
            .info_num {
              font-size: poTorem(17px);
              color: #414141;
              font-weight: 400;
              span {
                color: #e33939;
              }
            }
          }
        }
        .bottom {
          color: #414141;
          text-align: center;
          font-size: 1.125rem;
          padding: poTorem(4px) poTorem(15px);
          span {
            color: #22ac38;
          }
        }
      }
      .add {
        @include between;
        border-top: poTorem(1px) solid #bfbfbf;
        span {
          @include center;
          height: poTorem(62px);
          font-size: poTorem(20px);
          font-weight: 400;
          &:first-child {
            flex: 1;
            color: #898989;
            border-right: poTorem(1px) solid #bfbfbf;
          }
        }
        span {
          &:last-child {
            flex: 1;
            color: #00a0e9;
          }
        }
        .direct_bet {
          background: rgb(223, 223, 223);
        }
      }
      .title {
        @include column;
        position: relative;
        .title_top {
          color: #434343;
          font-size: poTorem(20px);
          font-weight: 400;
          padding-top: poTorem(15px);
        }
        .qishi {
          font-size: 1rem;
          color: #7d7d7d;
          width: 85%;
          text-align: center;
          padding-bottom: poTorem(5px);
          border-bottom: poTorem(1px) dashed #bfbfbf;
          i {
            color: #e33939;
            margin: 0 poTorem(3px);
          }
        }
        .close {
          position: absolute;
          width: poTorem(18px);
          height: poTorem(18px);
          background: url(~img/goucai/close.png) no-repeat;
          background-size: contain;
          right: poTorem(8px);
          top: poTorem(8px);
        }
      }
    }
    .con_model.mt {
      margin-top: 6rem;
    }
  }
  .model_bg {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1500;
    right: 0;
    background: #000;
    opacity: 0.3;
  }
}
</style>
<style>
.txt > span.red {
  color: #e33939;
}
</style>

