<template>
  <div class="shop_car">
    <div :class="[{'car_head_pig':isfestival},'car_head']">
      <div @click="$router.back()">
        <span class="icon"></span>
      </div>
      <span class="title">购物车</span>
      <span></span>
    </div>
    <div class="con">
      <count-down @activedData="getQishu"
                  @toNextQi="showTips"></count-down>
      <div class="chase">
        <span class="chases"
              @click="$router.back()">
          <i class="icon_add"></i>
          <span>添加注单</span>
        </span>
        <span class="chases"
              @click="addRandom">
          <i class="icon_chose"></i>
          <span>机选1注</span>
        </span>
        <span class="intelligent chases"
              @click="toChase"
              v-if="speed==1">
          <i class="icon_zhui"></i>
          <span>智能追号</span>
        </span>
      </div>
    </div>
    <div class="shop_content_wrap">
      <div class="shows">
        <ul>
          <template v-for="(item, index) in cart">
            <li :key="index">
              <span class="title">{{item.wanfa}}</span>
              <div class="haoma">
                <span v-html="item.formatedStr"
                      @click="showDetail(item)">
                </span>
                <span class="unit-price">
                  <input type="tel"
                         v-model.number="item.unitPrice"
                         v-digital
                         maxlength="7"> 元
                </span>
              </div>
              <div class="odds">
                <span>共
                  <i>{{item.zhushu}}</i>注
                </span>
                <span>&nbsp;赔率：
                  <i class="price"
                     v-if="item.peilvType.toString() == 'Symbol(SSC)'">{{item.peilv}}</i>
                  <i class="price"
                     v-else>{{item.peilvStr}}</i>
                </span>
              </div>
              <span class="icon"
                    @click="del(item)"></span>
            </li>
          </template>
        </ul>

      </div>
      <div class="protocol">
        <yd-checkbox class="checkbox"
                     v-model="isAgree"
                     @click.native.prevent="showAggrement($event)"
                     color="#fff">我已阅读并同意
          <span>《{{sysinfo.web_title}}服务协议》</span>
        </yd-checkbox>
      </div>
    </div>
    <div class="normal_chase">
      <div class="chase_rows">
        <p v-if="speed == 1">
          <span>追</span>
          <input type="number"
                 @click="zhuiqi($event)"
                 v-model="auto"
                 v-numberOnly
                 @blur="inputblur">
          <span>期</span>
        </p>
        <p>
          <span>投</span>
          <input type="number"
                 @click="toubei"
                 v-model="chaseBeiShu"
                 v-numberOnly
                 @blur="inputblur">
          <span>倍</span>
        </p>
      </div>
      <div class="chase_options"
           v-show="showSecond && optionIsShow">
        <p v-for="(item, index) in qishuOption"
           :key="index"
           :class="{'qishu_choosed': index==qishuVal}"
           @click="chooseQishu(item, index)">{{item}}期</p>
      </div>
      <div class="chase_options"
           v-show="showSecond && !optionIsShow">
        <p v-for="(item, index) in beishuOption"
           :key="index"
           :class="{'qishu_choosed': index==beishuVal}"
           @click="chooseBeishu(item, index)">{{item}}倍</p>
      </div>
      <div style="padding-top:0.9rem"
           class="hahaha"
           v-show="showSecond">
        <yd-checkbox class="checkbox"
                     v-model="isStop"
                     color="#fff">中奖后停止追号</yd-checkbox>
      </div>
    </div>
    <div class="shop_bottom"
         v-show="showBottom">
      <div class="left">
        <span @click="clearAction">
          <i class="icon"></i>清空</span>
        <div class="total-price"
             :class="{'line':Number(totalPrice).toFixed(2).length > 8}">
          <div>共
            <i>{{zhushu}}</i> 注</div>
          <div>
            <i>{{totalPrice}}</i>元</div>
        </div>
      </div>
      <div class="right"
           @click="submitBetting"
           :class="{disable: submitting}">
        {{submitting?'正在提交':'确认投注'}}
      </div>
    </div>

    <yd-popup v-model="showWindow"
              position="center"
              width="90%"
              v-if="detail.wanfa">
      <div class="pop">
        <h2>{{detail.wanfa}}</h2>
        <div class="content">
          <p v-html="detail.formatedStr"></p>
        </div>
        <div class="pop-bottom">
          <span @click="showWindow = false">取消</span>
          <span @click="showWindow = false">确定</span>
        </div>
      </div>
    </yd-popup>
    <keyboard :key="key1"
              @doAction="submitBetting"
              :relative="true"
              :title="qsTitle"
              :num="auto"
              @keyboardPressed="keyboardPressed1"
              :hide="hideKeyboard1"
              @hideKeyboard="hideKeyboardHandle1">
      <span :class="{grey: submitting}"
            @click="submitBetting">{{submitting ? "正在提交": "确认投注"}}</span>
    </keyboard>
    <keyboard :key="key2"
              @doAction="submitBetting"
              :relative="true"
              :title="bsTitle"
              :num="chaseBeiShu"
              @keyboardPressed="keyboardPressed2"
              :hide="hideKeyboard2"
              @hideKeyboard="hideKeyboardHandle2">
      <span :class="{grey: submitting}"
            @click="submitBetting">{{submitting ? "正在提交": "确认投注"}}</span>
    </keyboard>
    <yd-popup v-model="tipShow"
              position="center"
              width="80%">
      <div class="tips_r">
        <p>温馨提示</p>
        <p>当期已截止投注，是否保留到下一期？</p>
        <p>
          <button @click="clearAndClose">清空</button>
          <button @click="saveToNext">保留</button>
        </p>
      </div>
    </yd-popup>
  </div>

</template>
<script>
import { mapState, mapActions } from "vuex";
import { RenderTypes } from "~/js/touzhu/commonTypes";
import { randomBet } from "~/js/random/randomBet";
import countDown from "./countDown";
import cartMixin from "./cartMixin";
import { sscUtil } from "~/js/touzhu/touzhu.random.ssc.util";
import { k3Util } from "~/js/touzhu/touzhu.random.k3.util";
import { pcddUtil } from "~/js/touzhu/touzhu.random.pcdd.util";
import { elevenx5Util } from "~/js/touzhu/touzhu.random.11x5.util";
import { threeDUtil } from "~/js/touzhu/touzhu.random.3d.util";
import { lhcUtil } from "~/js/touzhu/touzhu.random.lhc.util";
import { pk10Util } from "~/js/touzhu/touzhu.random.pk10.util";
import { QXCUtil } from "~/js/touzhu/touzhu.random.qxc.util";
import { xypkUtil } from "~/js/touzhu/touzhu.random.xypk.util";
import api from "../../../../api/betting";
import { to } from "~/js/functions";
import danshiUtil from "~/js/touzhu/danshi.util";
import keyboard from "../components/keyboard";
import { randomFormtoken } from "~/js/user/gsfunc";

const tags = ["ssc", "k3", "3d", "pcdd", "11x5", "lhc", "pk10", "qxc", "xypk"];
const utils = [
  sscUtil,
  k3Util,
  threeDUtil,
  pcddUtil,
  elevenx5Util,
  lhcUtil,
  pk10Util,
  QXCUtil,
  xypkUtil
];

export default {
  name: "shopCar",
  components: {
    countDown,
    keyboard
  },
  data() {
    return {
      tipShow: false,
      qishuVal: Number,
      beishuVal: Number,
      chaseBeiShu: 1,
      isAgree: true,
      timer: {},
      showAgg: false,
      showWindow: false,
      showBottom: true,
      showSecond: false,
      shopCart: [],
      detail: {},
      auto: 1,
      stop: 1,
      multiple: "",
      ver: "v1.0.0",
      isStop: true,
      cart: [],
      qishuOption: [5, 8, 10, 15, 20],
      beishuOption: [5, 10, 20, 50, 100],
      optionIsShow: true, // 追号期数倍数选择项
      isLowFrequency: false,
      sourceHeight: 0,
      heightTimer: null,
      submitting: false,
      hideKeyboard1: true,
      hideKeyboard2: true,
      key1: "key1",
      key2: "key2",
      qsTitle: "请输入追期数",
      bsTitle: "请输入倍数",
      newestQishu: "",
      inputMaxL: 7
    };
  },
  methods: {
    clearAndClose() {
      this.tipShow = false;
      this.clearCart();
    },
    saveToNext() {
      this.tipShow = false;
      this.setQishu(this.newestQishu);
      this.$dialog.toast({ mes: "已成功保留到下一期" });
    },
    inputblur() {
      document.activeElement.blur();
      const isSafari = navigator.userAgent.toLowerCase().includes("safari");
      if (isSafari) {
        this.showBottom = true;
      }
    },
    resizeHandle() {
      this.resizeThrottler(this);
    },
    resizeThrottler(_this) {
      if (!_this.resizeTimeout) {
        _this.resizeTimeout = window.setTimeout(() => {
          _this.resizeTimeout = null;
          if (
            _this.showBottom === false &&
            window.innerHeight === _this.sourceHeight
          ) {
            _this.showBottom = true;
          }
          // The actualResizeHandler will execute at a rate of 15fps
        }, 66);
      }
    },
    hideKeyboard() {
      this.showBottom = true;
      this.hideKeyboard1 = true;
      this.hideKeyboard2 = true;
    },
    addRandom() {
      const obj = Object.assign({}, this.betData);
      obj.dataSource = JSON.parse(JSON.stringify(obj.dataSource));
      const randomData = randomBet(obj);
      let randomBetData = {};

      if (tags.includes(this.betData.js_tag)) {
        const index = tags.findIndex(x => x === this.betData.js_tag);
        if (index > -1) {
          randomBetData = utils[index].getDataSource(randomData, this.betData);
        }
      }
      // 梯子 幸运农场 随机一注
      if (["tzyx", "xync"].includes(this.betData.js_tag)) {
        let idx_2 = "";
        if (this.betData.js_tag === "tzyx") {
          // let tzSelected = this.$store.state.betting.tzSelected
          idx_2 = Math.floor(Math.random() * 10);
          this.updateField({ tzSelected: [idx_2] });
        } else if (this.betData.js_tag === "xync") {
          const playId = this.betData.playid;
          let ncSelected = this.$store.state.betting.ncSelected[playId] || [];
          ncSelected = JSON.parse(JSON.stringify(ncSelected));
          const maxNum = this.betData.dataSource[0].data.length;
          const idx = Math.floor(Math.random() * maxNum);
          idx_2 = Math.floor(Math.random() * maxNum);

          ncSelected[playId === 1 ? idx : 0] = idx_2 + ""; // rowValue + '|'+ idx_2

          // 只要一注
          ncSelected.fill("")[playId === 1 ? idx : 0] = idx_2 + "";
          // console.error('随机一注', ncSelected)

          this.updateField({ ncSelected: { [playId]: ncSelected } });
        }
        return this.$nextTick(() => {
          const _betData = Object.assign({}, this.betData);
          this.betDataToCart(this.getCalcBetData(_betData));
        });
      }
      const _betData = this.getCalcBetData(randomBetData);
      this.betDataToCart(_betData);
    },
    toChase() {
      if (!this.cart || !this.cart.length) {
        this.$dialog.toast({ mes: "您的购物车空空如也" });
        return false;
      }
      this.$router.push("/chase");
    },
    getCart(val) {
      const _cart = Object.assign([], val);
      _cart.forEach((x, index) => (x.id = index));
      this.cart = _cart.reverse();
    },
    zhuiqi() {
      document.activeElement.blur();
      this.showSecond = true;
      this.showBottom = false;
      this.optionIsShow = true;
      this.qishuVal = -1;
      if (!this.showBottom) {
        this.hideKeyboard1 = false;
        this.hideKeyboard2 = true;
      }
    },
    toubei() {
      document.activeElement.blur();
      this.showSecond = true;
      this.showBottom = false;
      this.optionIsShow = false;
      this.beishuVal = -1;
      if (!this.showBottom) {
        this.hideKeyboard2 = false;
        this.hideKeyboard1 = true;
      }
    },
    chooseQishu(n, i) {
      console.log(n);
      this.qishuVal = i;
      this.auto = n;
    },
    chooseBeishu(n, i) {
      this.beishuVal = i;
      this.chaseBeiShu = n;
    },
    getQishu(qishu) {
      // this.setQishu(qishu)
      this.newestQishu = qishu;
    },
    showTips() {
      if (this.cart.length > 0) {
        this.tipShow = true;
      }
    },
    showDetail(item) {
      this.detail = item;
      this.showWindow = !this.showWindow;
    },
    checkCartData() {
      if (!this.cart || !this.cart.length) {
        this.$dialog.toast({ mes: "您的购物车空空如也" });
        return false;
      }
      if (!this.isAgree) {
        this.$dialog.alert({ mes: "请先阅读并同意服务协议" });
        return false;
      }
      for (let i = 0, len = this.cart.length; i < len; i++) {
        const _cartitem = this.cart[i];
        if (
          typeof _cartitem.totalPrice === "string" &&
          !_cartitem.totalPrice.length
        ) {
          this.$dialog.alert({ mes: "请输入正确的金额" });
          return false;
        }
      }
      if (isNaN(this.auto) || !(this.auto >= 1 && this.auto <= 20)) {
        this.$dialog.alert({ mes: "请输入正确的期数" });
        return false;
      }
      if (
        isNaN(this.chaseBeiShu) ||
        !(this.chaseBeiShu >= 1 && this.chaseBeiShu <= 5000)
      ) {
        this.$dialog.alert({ mes: "请输入正确的倍数" });
        return false;
      }
      return true;
    },
    // submitPrepare() {

    // },
    async submitBetting() {
      if (this.newestQishu != this.qishu) {
        this.tipShow = true;
        return;
      }
      if (this.submitting) {
        return false;
      }
      if (!this.checkCartData()) {
        return false;
      }
      const data = this.getSubmitData();
      console.log(data);
      if (!data || !data.data || !data.data.length) {
        this.$dialog.toast({ mes: "您的购物车空空如也" });
        this.submitting = false;
        return false;
      }
      if (this.userBalance * 1 < this.totalPrice) {
        this.submitting = false;
        this.$dialog.confirm({
          mes: "余额不足，是否立即充值？",
          opts: () => {
            this.$router.push("/moreService/Nrecharge");
          }
        });
        return false;
      }
      const [err, result] = await to(
        api.userSubmitBet({
          gameid: data.gameid,
          qishu: data.qishu,
          data: JSON.stringify(data.data).replace("/\\/g", ""),
          auto: data.auto,
          stop: data.stop,
          multiple: data.multiple,
          form_unique_token: randomFormtoken()
        })
      );
      if (err || result) {
        this.submitting = false;
      }

      if (result && result.take) {
        this.auto = 1;
        this.stop = 1;
        this.chaseBeiShu = 1;

        this.updatePrice(result.less);
        this.clearCart();
        this.$dialog.toast({
          mes: `投注成功,余额：${result.less}元`
        });
        this.$router.back();
      }
    },
    getSubmitData() {
      this.submitting = true;
      const data = {
        gameid: this.cart[0].gameid,
        qishu: this.qishu,
        auto: Number.isNaN(this.auto) ? 1 : this.auto,
        multiple: this.getBeishu(this.chaseBeiShu),
        stop: Number(this.isStop),
        ver: this.ver,
        data: []
      };
      this.cart.forEach(item => {
        if (danshiUtil.isSingleMode(item.js_tag, item.playid)) {
          this.processDanshi(item, data.data);
        } else if (item.peilvType == RenderTypes.SSC) {
          this.processSSCData(item, data.data);
        } else if (item.peilvType == RenderTypes.LHC) {
          this.processLHCData(item, data.data);
        } else if (item.peilvType === RenderTypes.SINGLE_ROW_SINGLE_PEILV) {
          item.arr2.forEach(x => {
            if (x.length) {
              const values = x.split("|");
              const str = `${item.playid}#${item.unitPrice}#${values.join(
                "+"
              )}`;
              data.data.push(str);
            }
          });
        } else if (
          item.peilvType === RenderTypes.MUTI_ROW_MUTI_PEILV ||
          item.peilvType === RenderTypes.SINGLE_ROW_MUTI_PEILV
        ) {
          item.arr2
            .filter(x => (typeof x === "string" ? x.length : x > -1))
            .map(x => x.toString())
            .forEach(x =>
              x.split("|").forEach(y => {
                const str = `${item.playid}#${item.unitPrice}#${y}`;
                data.data.push(str);
              })
            );
        } else {
          // 多行
          let values = item.arr2.filter(x => x.length).join("+");
          // 定位胆
          if (item.peilvType === RenderTypes.DWD) {
            values = item.dwdValuesArr.filter(x => x.length).join("+");
          }
          const str = `${item.playid}#${item.unitPrice}#${values}`;
          data.data.push(str);
        }
        // playid#单价unitprice#  行用加号分隔，每个号用竖线分隔
      });
      return data;
    },
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
          values = item.dwdValuesArr.filter(x => x.length).join("+");
        }
        const str = `${item.playid}#${item.unitPrice}#${values}`;
        container.push(str);
      }
    },
    // 处理六合彩数据
    processLHCData(item, container) {
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
    showAggrement(event) {
      if (event.x > document.body.clientWidth / 2) {
        this.$router.push("/agreement");
      } else {
        this.isAgree = !this.isAgree;
      }
    },
    del(item) {
      this.deleteItemFromCart(item);
    },
    clearAction() {
      if (this.cart.length) {
        this.$dialog.confirm({
          title: "确认清除",
          mes: "请问是否确认清空购物车？",
          opts: () => {
            this.clearCart();
          }
        });
      }
    },
    getBeishu(num) {
      if (Number.isNaN(num)) {
        this.$dialog.alert({ mes: "请输入数字" });
        return false;
      }
      let str = "";
      for (let i = 1; i <= this.auto; i++) {
        str += num;
        if (i < this.auto) str += "|";
      }
      return str;
    },

    numberKeydown(e) {
      const val = e.target.value;
      // if (e.keyCode >= 65 && e.keyCode <= 90) {
      //   console.log(e.key, e.keyCode)
      //   e.target.value = val.replace(/[a-zA-z]+/g, '')
      //   console.log(e.target.value)
      //   return false
      // }

      if (e.keyCode === 8 || e.keyCode === 46) {
        return true;
      }
      // if (e.key === 'e' || e.key === 'E') {
      //   e.target.value = val.replace(/[a-zA-z]+/g, '')
      //   console.log(e.target.value)
      //   return false
      // }
      if (e.key === ".") {
        console.log(val);
        if (val.includes(".")) {
          return false;
        }
        return true;
      }
      if (isNaN(e.key)) {
        e.target.value = val.replace(/[a-zA-z]+/g, "");
        console.log(e.target.value);
        return false;
      }

      // if (val.includes('.')) {
      //   let c = val.split('.')[1]
      //   if (c.length > 1) {
      //     e.target.value = val.substring(0, val.length - 1)
      //     return false
      //   } else return true
      // }
      // return true
      // /^\d+(.\d(\d)?)?$/
      // if ((val = Number(val.toString().match(/^\d+(?:\.\d{0,2})?/)))) {

      console.log(val);
      if (val === Number(val.toString().match(/^\d+(\.|(\.\d(\d)?)?)$/))) {
        return true;
      }
      return false;
    },
    ...mapActions([
      "setCartNumber",
      "clearCart",
      "deleteItemFromCart",
      "addToCart",
      "flushPrice",
      "setQishu",
      "updatePrice",
      "updateField"
    ])
  },
  activated() {
    // this.sourceHeight = window.innerHeight;
    this.submitting = false;
    this.newestQishu = this.qishu;
    this.hideKeyboard1 = true;
    this.hideKeyboard2 = true;
    this.showAgg = false;
    this.auto = 1;
    this.chaseBeiShu = 1;
    // if (Number.isNaN(this.auto)) this.auto = 1
    // if (Number.isNaN(this.stop)) this.stop = 1
    if (!this.cart.length) {
      this.getCart(this.$store.state.betting.cart);
    }
    this.optionIsShow = false;
    this.showSecond = false;
    this.showBottom = true;
    this.sourceHeight = window.innerHeight;
    window.addEventListener("resize", this.resizeHandle, false);
    if (isNaN(this.auto) || !(this.auto >= 1 && this.auto <= 20)) {
      this.auto = 1;
    }
    if (
      isNaN(this.chaseBeiShu) ||
      !(this.chaseBeiShu >= 1 && this.chaseBeiShu <= 5000)
    ) {
      this.chaseBeiShu = 1;
    }
  },
  deactivated() {
    this.showAgg = false;
    // window.removeEventListener("resize");
    window.removeEventListener("resize", this.resizeHandle, false);
  },
  watch: {
    chaseBeiShu(val) {
      if (val > 5000) {
        this.$dialog.alert({ mes: "最多追加5000倍" });
        this.chaseBeiShu = 5000;
      }
    },
    auto(val) {
      if (val > 20) {
        this.$dialog.alert({ mes: "最多追号20期" });
        this.auto = 20;
      }
    },
    isStop(val) {
      this.stop = Number(val);
      console.log(this.stop);
    },
    "$store.state.betting.cart": "getCart"
  },
  computed: {
    ...mapState({
      sysinfo: state => state.sysinfo,
      qishu: state => state.betting.qishu,
      betData: state => state.betting.betData,
      speed: state => state.betting.speed,
      userBalance: state => state.userinfo.accountInfo.price
    }),
    ...mapState(['isfestival']),
    zhushu() {
      if (this.cart.length) {
        let c = 0;
        this.cart.forEach(x => {
          c += x.zhushu;
        });
        this.setCartNumber(c);
        return c * (Number.isNaN(this.auto) ? 1 : Number(this.auto));
      } else {
        this.setCartNumber(0);
        return 0;
      }
    },
    totalPrice() {
      if (this.cart.length) {
        let c = 0;
        this.cart.forEach(x => {
          const _totalPrice =
            x.zhushu *
            Number(x.unitPrice.toString().match(/^\d+(?:\.\d{0,2})?/)); // x.unitPrice
          x.totalPrice = _totalPrice;
          c += _totalPrice * this.auto * this.chaseBeiShu;
        });
        return c.toFixed(2);
      } else return 0;
    }
  },
  directives: {
    numberOnly: {
      bind(el) {
        el.handler = function() {
          let c = Number(el.value.replace(/\D+/, ""));
          if (c > 1000000) {
            c = Number((c + "").substring(0, 5));
          }
          el.value = c;
        };
        el.addEventListener("input", el.handler);
      },
      unbind(el) {
        el.removeEventListener("input", el.handler);
      }
    },
    digital: {
      bind(el) {
        el.handler = function() {
          let _val = el.value;
          _val = _val.toString().match(/^\d+(?:\.\d{0,2})?/);
          el.value = _val;
        };
        el.addEventListener("input", el.handler);
      },
      // update(el) {
      //   // el.value = Number(el.value.toString().match(/^\d+(?:\.\d{0,2})?/))
      //   // el.value = Number(el.value.toString().match(/^\d+(\.|(\.\d(\d)?)?)$/))
      // },
      unbind(el) {
        el.removeEventListener("input", el.handler);
      }
    }
  },
  mixins: [cartMixin]
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.shop_car {
  padding: 0;
  @include column;
  justify-content: flex-start;
  background: #f2f3f4;
  top: 0;
  bottom: 0;
  .car_head {
    width: 100%;
    height: poTorem(48px);
    background: url(~img/shouye/nav_bg.png) no-repeat;
    background-size: cover;
    @include between;
    &.car_head_pig {
      @include pigbg;
    }
    span {
      @include center;
      width: poTorem(90px);
      color: #fff;
      font-size: poTorem(23px);
    }
    .icon {
      background: url(~img/shouye/back.png) no-repeat;
      background-size: poTorem(20px) poTorem(20px);
      height: poTorem(20px);
      margin-left: poTorem(20px);
    }
  }
  .con {
    width: 100%;
    .times {
      @include center;
      height: poTorem(38px);
      background: #f2f3f4;
      font-size: poTorem(14px);
      color: #515253;
      i,
      > span > span {
        color: #e45557;
      }
      > span > div {
        display: inline-block;
        color: #e45557;
      }
    }
    .chase {
      @include between;
      height: poTorem(60px);
      background: #fff;
      padding: 0 poTorem(20px);
      .intelligent {
        span {
          color: #df0300;
        }
      }
      .chases {
        margin: 0 7px;
        @include center;
        width: poTorem(110px);
        height: poTorem(40px);
        background: #f5f6f7;
        border-radius: poTorem(5px);
        font-size: poTorem(16px);
        color: #6c6d6e;
        border: poTorem(1px) solid #e7e8e8;
        span {
          width: poTorem(65px);
          margin-left: poTorem(3px);
        }
        .icon_add {
          background: url(~img/goucai/fanhuigoucai.png) no-repeat;
          background-size: cover;
          width: poTorem(20px);
          height: poTorem(20px);
          display: inline-block;
        }
        .icon_chose {
          background: url(~img/goucai/tianjia.png) no-repeat;
          background-size: cover;
          width: poTorem(15px);
          height: poTorem(15px);
          display: inline-block;
        }
        .icon_zhui {
          background: url(~img/goucai/zhineng.png) no-repeat;
          background-size: cover;
          width: poTorem(15px);
          height: poTorem(15px);
          display: inline-block;
        }
      }
    }
  }
  .ticket {
    // position: absolute;
    width: poTorem(390px);
    height: poTorem(12px);
    background: url(~img/goucai/chupiaokou.png) no-repeat;
    background-size: contain;
  }
  .shop_content_wrap {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: scroll;
    position: relative;
    width: 100%;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .shows {
    padding: 1rem;
    // flex: 1;
    min-height: 18rem;
    position: relative;
    @include column;
    background: url("~img/goucai/ticket_bg.png") center center no-repeat;
    background-size: 100% 100%;
    ul {
      overflow: scroll;
      // background: #fff;
      width: poTorem(379px);
      padding: poTorem(20px);
      padding-top: poTorem(12px);
      // border-left: poTorem(1px) solid #e9eaeb;
      // border-right: poTorem(1px) solid #e9eaeb;
      li {
        @include column;
        align-items: flex-start;
        position: relative;
        // padding-left: poTorem(20px);
        padding: poTorem(10px) 0;
        border-bottom: poTorem(1px) dashed #ddd;
        &:last-child {
          border-bottom: none;
          padding-bottom: poTorem(5px);
        }
        .title {
          color: #515254;
          font-size: poTorem(18px);
        }
        .haoma {
          margin: poTorem(10px) 0;
          display: flex;
          justify-items: center;
          justify-content: space-between;
          width: 84%;
          > span {
            // color: #df0300;
            font-size: poTorem(16px);
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 10rem;
            white-space: nowrap;
          }
          .unit-price {
            display: flex;
            justify-items: center;
            i,
            input {
              width: 4rem;
              border: none;
              border-bottom: poTorem(1px) solid #ccc;
              font-size: 1.2rem;
              color: #df0300;
              display: inline-block;
              text-align: center;
            }
          }
        }
        .odds {
          color: #909192;
          font-size: poTorem(16px);
          display: flex;
          justify-items: center;
          i {
            color: #df0300;
            margin: 0 poTorem(3px);
          }
          .price {
            color: #7f8082;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 10rem;
            white-space: nowrap;
          }
          > span:nth-child(2) {
            display: flex;
            justify-items: center;
          }
        }
        .icon {
          background: url(~img/goucai/shanchu.png) no-repeat;
          background-size: contain;
          width: poTorem(20px);
          height: poTorem(20px);
          position: absolute;
          right: poTorem(10px);
          top: poTorem(40px);
        }
      }
    }
  }
  .normal_chase {
    border-top: poTorem(1px) solid #ddd;
    // height: 5rem;
    animation: all 0.3s linear;
    background: #fff;
    width: 100%;
    padding: poTorem(14px) poTorem(20px);
    .chase_rows {
      @include around;
      p {
        font-size: poTorem(17px);
        color: #7d7d7d;
        input {
          border: poTorem(1px) solid #d3d3d3;
          outline: none;
          width: poTorem(85px);
          height: poTorem(30px);
          border-radius: poTorem(5px);
          text-align: center;
        }
      }
    }
    .chase_options {
      @include between;
      padding-top: poTorem(15px);
      p {
        width: poTorem(52px);
        height: poTorem(28px);
        border: poTorem(1px) solid #ccc;
        border-radius: poTorem(3px);
        text-align: center;
        font-size: poTorem(16px);
        color: #7d7d7d;
        line-height: poTorem(26px);
      }
      .qishu_choosed {
        border: poTorem(1px) solid #e33939;
      }
    }
  }
  .shop_bottom {
    border-top: 1px solid #d3d4d5;
    @include between;
    // position: fixed;
    // z-index: 20;
    // bottom: 0;
    width: 100%;
    height: poTorem(57px);
    background: #fff;
    font-size: poTorem(20px);
    color: #606062;
    .left {
      @include between;
      i {
        color: #df0300;
      }
      span {
        @include between;
        .icon {
          background: url(~img/goucai/qingkong2.png) no-repeat;
          background-size: contain;
          width: poTorem(20px);
          height: poTorem(20px);
          display: flex;
          margin: 0 poTorem(3px);
        }
        &:first-child {
          display: flex;
          border-right: poTorem(1px) solid #dededf;
          text-align: center;
          margin-right: poTorem(15px);
          width: poTorem(80px);
          height: poTorem(24px);
          justify-content: center;
          > i {
            display: inline;
          }
          // padding: 0 poTorem(15px);
          // border-right: poTorem(1px) solid #dededf;
          // margin-right: poTorem(15px);
        }
        &:last-child {
          i {
            margin: 0px poTorem(5px);
          }
        }
      }
      .total-price {
        display: flex;
        &.line {
          flex-wrap: wrap;
        }
      }
    }
    .right {
      @include center;
      color: #fff;
      background: #e02827;
      height: 100%;
      // padding: 0px poTorem(20px);
      width: poTorem(100px);
      text-align: center;
      justify-content: center;
      font-weight: bold;
      &.disable {
        background: lightgray;
      }
    }
  }
}
.pop {
  border-radius: poTorem(6px);
  h2 {
    text-align: center;
    font-size: 1.2rem;
    font-weight: normal;
    line-height: 3;
  }
  .content {
    display: flex;
    justify-content: center;
    min-height: 8rem;
    p {
      font-size: 1rem;
      padding: 1rem 0;
      width: 90%;
      line-height: 1.8;
      // margin: 1rem 0;
      border-top: poTorem(1px) dashed rgb(223, 223, 223);
    }
  }

  .pop-bottom {
    border-top: poTorem(1px) solid rgb(223, 223, 223);
    display: flex;
    flex-wrap: nowrap;
    justify-items: center;
    span {
      width: 50%;
      text-align: center;
      line-height: 3;
      font-size: 1.2rem;
      flex: 1;
    }
    span:first-child {
      border-right: 1px solid rgb(223, 223, 223);
    }
    span:last-child {
      color: rgb(2, 159, 234);
    }
  }
}
.grey {
  color: rgb(200, 200, 200) !important;
}
</style>
<style lang="scss">
@import "../../../css/resources.scss";
.protocol,
.hahaha {
  .checkbox {
    input[type="checkbox"]:checked + .yd-checkbox-icon {
      border-color: #ccc;
    }
    border-color: #ccc;
    .yd-checkbox-icon {
      background-color: #fff;
      border-color: rgb(204, 204, 204);
      i {
        border-color: #f00;
      }
    }
  }
}
.tips_r {
  padding-top: 0.5rem;
  border-radius: 0.25rem;
  p {
    text-align: center;
    line-height: 2rem;
    &:first-child {
      font-size: 1.5rem;
      color: #e33939;
    }
    &:nth-child(2) {
      line-height: 6rem;
      font-size: 1rem;
      color: #535353;
    }
    &:nth-child(3) {
      width: 100%;
      border-top: poTorem(1px) solid #ddd;
      button {
        outline: none;
        border: none;
        height: 3rem;
        width: 49%;
        line-height: 2rem;
        font-size: 1rem;
        // border-radius: 0.25rem;
        color: #535353;
        &:first-child {
          border-right: poTorem(1px) solid #ddd;
        }
      }
    }
  }
}
</style>
