<template>
  <div class="chase">
    <div :class="[{'chase_head_pig':isfestival},'chase_head']">
      <span class="icon"
            @click="goBack"></span>
      <span class="title"
            v-if="tipShow">设置方案</span>
      <span v-if="!tipShow"
            class="chase_options">
        <i v-for="(item, index) in head_options"
           :key="index"
           :class="{choosed: headIndex == index}"
           @click="headIndex=index">{{item}}</i>
      </span>
      <span></span>
    </div>
    <count-down @activedData="getIssuNum"></count-down>
    <div class="tabs"
         v-show="!tipShow">
      <div class="ordinary">
        <div class="head">
          <!-- 智能追号 -->
          <span>追号<input type="number"
                   v-model="qishu"
                   placeholder="20"
                   @change="changeQishu">期数</span>
          <span v-show="firstShow && headIndex == 2">全程最低盈利率{{Math.round(lowestPercent)}}%</span>
          <span v-show="thirdShow && headIndex == 2">全程最低盈利{{Math.round(lowestPrice)}}元</span>
          <span v-show="secondShow && headIndex == 2">前{{beforeQiShu}}期{{beforeLowestPercent}}%之后盈利率{{afterLowestPercent}}%</span>
          <!-- 翻倍追号 -->
          <span v-if="headIndex == 1">翻数<input type="number"
                   v-model="fanshu"
                   placeholder="1"
                   @change="changeFanshu"></span>
          <!-- 平倍追号 -->
          <span v-if="headIndex != 2">起始倍数<input type="number"
                   v-model="specialBeishu"
                   placeholder="1"
                   @change="createPlan(specialBeishu)"></span>
        </div>
        <div class="fanshu"
             v-if="headIndex==1">
          <span v-for="num in 3"
                :key="num"
                @click="changeFanshu(num)"
                :class="{'fanshuChoosed': fanshu == num}">{{num}}番</span>
        </div>
        <div :class="[{'need_arrow': headIndex==2},'change_plan']">
          <div class="plan_row">
            <span>注单选择:</span>
            <p @click="chooseZhushu = true">
              <span v-html="zhudan && zhudan.length && zhudan[0].formatedStr ? zhudan[0].formatedStr : '无'"
                    class="cart_content"></span>
              <img :src="require('../../../img/daili/arrow_down.png')"
                   alt="">
            </p>
            <span></span>
          </div>
          <span @click="popWinShow"
                v-if="headIndex == 2">修改方案</span>
        </div>
        <div class="title"
             style="height: auto;line-height: 1rem;">
          <span style="padding: .5rem;">序号</span>
          <span style="padding: .5rem;">期号</span>
          <span>倍数</span>
          <span>金额</span>
          <span style="text-align:center">中奖盈利</span>
          <span>盈利率</span>
        </div>
        <div class="title animated"
             v-for="(item, index) in planData"
             :key="index">
          <span>{{index + 1}}</span>
          <span>{{(issueNum + index + '').slice(-4)}}</span>
          <p>
            <span @click='reduce(index)'>-</span>
            <input type="number"
                   @blur="changeBeishu(item.beishu, index)"
                   readonly="readonly"
                   v-model="item.beishu"
                   placeholder="1">
            <span @click='add(index)'>+</span>
          </p>
          <!-- <span>{{item.beishu}}</span> -->
          <span>{{(Math.round(item.jine*100)) / 100}}</span>
          <span style="text-align:center"
                v-yingli>
            <i>{{Math.round(item.yingli * 100) / 100}}</i>
          </span>
          <span v-yingli>
            <i>{{Math.round(item.yinglilv)}}</i>%</span>
        </div>
      </div>
    </div>
    <div class="bottom"
         v-show="!tipShow">
      <div class="left zhuihao_xiazhu">
        <yd-checkbox v-model="checkbox1"
                     class="checkbox"
                     color="#fff"></yd-checkbox>
        <div>
          <span>中奖后停止追号</span>
          <span>共
            <i>{{planData.length}}</i>期
            <i>{{totalPrice}}</i>元</span>
        </div>
      </div>
      <!-- <div class="right" @click="submitBetting">
        确认投注
      </div> -->
      <div class="right"
           @click="submitBetting"
           :class="{disable: submitting}">
        {{submitting?'正在提交':'确认追号'}}
      </div>
    </div>
    <div class="plan_page"
         v-show="tipShow">
      <div class="panel_up">
        <div class="plan_row">
          <span>起始期号:</span>
          <p class="first_row"
             @click="openQishu">
            {{issueNum + qiShuIndex}}
            <img :src="require('../../../img/daili/arrow_down.png')"
                 alt="">
          </p>
          <span>期</span>
        </div>
        <div class="plan_row">
          <span>连续追号:</span>
          <p>
            <span @click='qishu -= 1'>-</span>
            <input type="number"
                   v-model="qishu"
                   placeholder="10">
            <span @click='qishu += 1'>+</span>
          </p>
          <span>期</span>
        </div>
        <div class="plan_row">
          <span>起始倍数:</span>
          <p>
            <span @click='beginBeiShu -= 1'>-</span>
            <input type="number"
                   v-model="beginBeiShu"
                   placeholder="1">
            <span @click='beginBeiShu += 1'>+</span>
          </p>
          <span>倍</span>
        </div>
        <!-- <div class="plan_row">
          <span>注单选择:</span>
          <p @click="chooseZhushu = true">
            <span v-html="cart[zhudan[0]].formatedStr ? cart[zhudan[0]].formatedStr : 0" class="cart_content"></span>
            <img :src="require('../../../img/daili/arrow_down.png')" alt="">
          </p>
          <span></span>
        </div> -->
      </div>
      <div class="expect_get">
        <p class="expect_get_txt">预期盈利：</p>
        <div class="expect_get_content">
          <p>
            <span @click="chooseType1(firstVal)"
                  :class="[{'checked': firstVal}, 'radio_option']"></span>
            <span>全程最低盈利率</span>
            <input type="number"
                   :disabled="!firstVal"
                   placeholder="30"
                   v-model="planLowestPercent">
            <span>%</span>
          </p>
          <p>
            <span @click="chooseType2(secondVal)"
                  :class="[{'checked': secondVal}, 'radio_option']"></span>
            <span>前</span>
            <input type="number"
                   :disabled="!secondVal"
                   placeholder="5"
                   v-model="planBeforeQiShu">
            <span>期</span>
            <input type="number"
                   :disabled="!secondVal"
                   placeholder="50"
                   v-model="planBeforeLowestPercent">
            <span>%</span>
          </p>
          <p>
            <span>之后盈利率</span>
            <input type="number"
                   :disabled="!secondVal"
                   placeholder="20"
                   v-model="planAfterLowestPercent">
            <span>%</span>
          </p>
          <p>
            <span @click="chooseType3(thirdVal)"
                  :class="[{'checked': thirdVal}, 'radio_option']"></span>
            <span>全程最低盈利</span>
            <input type="number"
                   :disabled="!thirdVal"
                   placeholder="30"
                   v-model="planLowestPrice">
            <span>元</span>
          </p>
        </div>
      </div>
      <div class="create_button"
           @click="changePlan">
        生成追号
      </div>
    </div>
    <yd-popup v-model="chooseQishu"
              position="center"
              width="90%"
              class="chooseQishu_pop">
      <div class="wrap">
        <p v-for="(item, index) in 10"
           :key="item"
           :class="{'choosed': index==qiShuIndex}"
           @click="chooseIssueNum(index)">{{issueNum + index}}</p>
      </div>
    </yd-popup>
    <yd-popup v-model="chooseZhushu"
              position="center"
              width="90%"
              class="chooseZhushu_pop">
      <div class="wrap">
        <!-- <p v-for="(item, index) in cart" :key="index" @click="chooseZhu(item, index)" :class="{'choosed': zhudanIndex.includes(index)}">
          <span v-html="item.formatedStr ? item.formatedStr : ''"></span>
        </p> -->
        <p v-for="(item, index) in cart"
           :key="index"
           @click="chooseZhu(item, index)"
           :class="{'choosed': zhudanIndex == index}">
          <span v-html="item.formatedStr ? item.formatedStr : ''"></span>
        </p>
      </div>
    </yd-popup>
  </div>
</template>
<script>
import countDown from "./countDown";
import { RenderTypes } from "~/js/touzhu/commonTypes";
import { mapState, mapActions } from "vuex";
import cartMixin from "./cartMixin";

import api from "../../../../api/betting";
import { to } from "~/js/functions";
import danshiUtil from "~/js/touzhu/danshi.util";
import { randomFormtoken } from "~/js/user/gsfunc";
export default {
  directives: {
    yingli: el => {
      // yingli: {
      //   componentUpdated(el) {
      // console.log(el.children[0].innerText)
      window.setTimeout(() => {
        if (el.children[0].innerText > 0) {
          el.style.color = "#e33939";
        } else {
          el.style.color = "#22ac38";
        }
      }, 100);
      // }
    }
  },
  computed: {
    ...mapState({
      cart: state => state.betting.cart,
      userBalance: state => state.userinfo.accountInfo.price
    }),
    ...mapState(['isfestival'])
  },
  components: {
    countDown
  },
  data() {
    return {
      checkbox1: true,
      planData: [],
      lowestPercent: 30,
      qishu: 10,
      tipShow: false,
      planQiShu: 10,
      oneMulPrice: 2, // 单倍金额
      beginBeiShu: 1, // 初始倍数
      lossPercent: 3.25, // 赔率
      issueNum: 36689, // 期数
      perZhushu: 0, //  单期单倍注数
      totalZhushu: 0, //  总注数
      totalPrice: 0, //  总投入
      firstVal: true,
      secondVal: false,
      thirdVal: false,
      firstShow: true,
      secondShow: false,
      thirdShow: false,
      planLowestPercent: 30,
      planLowestPrice: 30,
      planBeforeQiShu: 5,
      planBeforeLowestPercent: 50,
      planAfterLowestPercent: 20,
      beforeQiShu: 5,
      beforeLowestPercent: 50,
      afterLowestPercent: 20,
      lowestPrice: 30,
      ver: "v1.0.0",
      stop: 1,
      submitting: false,
      pageTitle: "智能追号",
      chooseQishu: false,
      qiShuIndex: 0,
      chooseZhushu: false,
      zhudan: [],
      // zhudanIndex: [],
      zhudanIndex: 0,
      allZhudan: [],
      zhuShuIndex: "",
      head_options: ["平倍追号", "翻倍追号", "智能追号"],
      headIndex: 0,
      specialBeishu: 1,
      fanshu: 1
    };
  },
  activated() {
    this.headIndex = 0;
    // this.zhudan = [this.cart[0]]
    // this.zhudanIndex = [0]
    this.zhudanIndex = 0;
    this.zhudan = [this.cart[0]];
    // const i = this.cart.length;
    // while (i > 0) {
    //   i--
    //   this.zhudanIndex.push(i)
    // }
    this.specialBeishu = 1;
    this.calculateBasicData(this.zhudan);
  },
  methods: {
    calculateBasicData(arr) {
      if (!arr.length) {
        this.planData.splice(0);
        return;
      }
      let P = 0,
        T = 0,
        N = 0; // P 总投入 T 总获益 N 总注数
      arr.forEach(item => {
        const a = item.totalPrice / item.zhushu;
        P += item.totalPrice;
        N += item.zhushu;

        const arr = item.peilvStr.replace(/\-/g, "1").split("|");
        let earn = 0;
        arr.forEach(m => {
          earn += a * m * item.zhushu;
        });
        T += earn;
      });
      this.perZhushu = N;
      // this.totalPrice = P
      this.lossPercent = Math.round((T / P) * 1000) / 1000;
      this.oneMulPrice = Math.round(P * 100) / 100;
      this.qishu = 10;
      this.lowestPercent = 30;
      // this.specialBeishu = 1
      this.createPlan(this.specialBeishu);
    },
    changeFanshu(num) {
      this.qishu = 10;
      if (typeof num === "number") {
        console.log(num);
        this.fanshu = num;
      }
      if (this.fanshu > 1) {
        this.createPlan(this.specialBeishu);
      }
    },
    goBack() {
      if (this.tipShow) {
        this.tipShow = false;
      } else {
        this.$router.back();
      }
    },
    chooseZhu(n, i) {
      this.zhudanIndex = i;
      this.zhudan = [this.cart[this.zhudanIndex]];
      // if(this.zhudanIndex.includes(i)) {
      //   let a = this.zhudanIndex.indexOf(i)
      //   this.zhudanIndex.splice(a, 1)
      //   this.zhudan.splice(a, 1)
      // } else {
      //   this.zhudanIndex.push(i)
      //   this.zhudan.push(n)
      // }
      this.calculateBasicData(this.zhudan);
      this.chooseZhushu = false;
    },
    chooseIssueNum(i) {
      this.qiShuIndex = i;
      this.chooseQishu = false;
    },
    openQishu() {
      this.chooseQishu = true;
    },
    getIssuNum(val) {
      this.issueNum = val;
    },
    popWinShow() {
      // this.planQiShu = this.qishu;
      // this.planLowestPercent = this.lowestPercent;
      // this.planLowestPrice = this.lowestPrice;
      // this.planBeforeQiShu = this.beforeQiShu;
      // this.planBeforeLowestPercent = this.beforeLowestPercent;
      // this.planAfterLowestPercent = this.afterLowestPercent;
      // this.beginBeiShu = this.planData[0].beishu;
      this.firstVal = this.firstShow;
      this.secondVal = this.secondShow;
      this.thirdVal = this.thirdShow;
      this.tipShow = true;
    },
    chooseType1(val) {
      if (!val) {
        this.firstVal = !this.firstVal;
        this.secondVal = false;
        this.thirdVal = false;
      }
    },
    chooseType2(val) {
      if (!val) {
        this.firstVal = false;
        this.secondVal = !this.secondVal;
        this.thirdVal = false;
      }
    },
    chooseType3(val) {
      if (!val) {
        this.firstVal = false;
        this.secondVal = false;
        this.thirdVal = !this.thirdVal;
      }
    },
    add(i) {
      this.planData[i].beishu += 1;
      this.planData[i].beishu > 5000
        ? this.$dialog.alert({ mes: "最大不可超过5000倍" })
        : "";
      this.changeBeishu();
    },
    reduce(i) {
      let a = this.planData[i].beishu;
      a -= 1;
      if (a < 1) {
        this.$dialog.alert({ mes: "倍数不能小于1" });
        a += 1;
        this.planData[i].beishu = a;
      } else {
        this.planData[i].beishu = a;
      }
      this.changeBeishu();
    },
    // add() {
    //   this.qishu += 1;
    // },
    // reduce() {
    //   this.qishu -= 1;
    // },
    // reduceBeishu() {
    //   this.beginBeiShu -= 1
    // },
    // addBeishu() {
    //   this.beginBeiShu += 1
    // },
    inputBeiShu(val) {
      if (val > 5000) {
        this.$dialog.alert({ mes: "最大不可超过5000倍" });
        // this.planData[i].beishu = 100
        return;
      }
      this.changeBeishu(1);
    },
    // 修改追号方案执行
    changePlan() {
      // planLowestPercent beforeQiShu beforeLowestPercent afterLowestPercent lowestPrice beginBeiShu
      this.qishu = this.planQiShu;
      this.issueNum += this.qiShuIndex;
      this.firstShow = this.firstVal;
      this.secondShow = this.secondVal;
      this.thirdShow = this.thirdVal;
      if (this.firstVal) {
        this.lowestPercent = this.planLowestPercent - 0;
        this.createPlan(this.beginBeiShu - 0);
      } else if (this.thirdVal) {
        this.lowestPrice = this.planLowestPrice - 0;
        const beishu = Math.ceil(
          this.lowestPrice / (this.oneMulPrice * (this.lossPercent - 1))
        );
        this.createPlan(beishu);
      } else {
        this.beforeLowestPercent = this.planBeforeLowestPercent - 0;
        this.beforeQiShu = this.planBeforeQiShu - 0;
        this.afterLowestPercent = this.planAfterLowestPercent - 0;
        this.lowestPercent = this.beforeLowestPercent - 0;
        this.createPlan(this.beginBeiShu - 0);
      }
      this.tipShow = false;
      // this.lowestPercent = this.
    },
    //  改变倍数的计算方法
    changeBeishu() {
      this.totalZhushu = 0;
      if (this.secondShow) {
        this.secondShow = !this.secondShow;
        this.firstShow = true;
      }
      const arr1 = [],
        arr2 = [];
      for (let i = 0; i < this.planData.length; i++) {
        const a = this.oneMulPrice,
          b = this.lossPercent,
          n = this.planData[i].beishu,
          P = i == 0 ? 0 : this.planData[i - 1].jine;
        this.planData[i].jine = P + a * n;
        this.planData[i].yingli = a * n * b - (P + a * n);
        this.planData[i].yinglilv = ((a * n * b) / (P + a * n) - 1) * 100;
        arr1.push(this.planData[i].yinglilv);
        arr2.push(this.planData[i].yingli);
        this.totalZhushu += this.perZhushu * this.planData[i].beishu;
      }
      arr1.sort((a, b) => a - b);
      arr2.sort((a, b) => a - b);
      this.totalPrice = this.planData.length && this.planData.slice(-1)[0].jine;
      if (this.headIndex == 2) {
        this.lowestPercent = arr1[0];
        this.lowestPrice = arr2[0];
      }
    },
    changeQishu() {
      const beishu = this.planData.length ? this.planData[0].beishu : 1;
      if (!this.qishu || this.qishu < 1) {
        // this.planData.splice(0)
        this.qishu = 0;
        // this.createPlan(beishu)
      } else {
        // this.planData.splice(0)
        this.createPlan(beishu);
      }
    },
    //  智能追号初始化生成方案 oneMulPrice lossPercent issueNum
    createPlan(num) {
      this.planData.splice(0);
      const arr1 = [],
        arr2 = [];
      this.totalZhushu = 0;
      for (let i = 0; i < this.qishu; i++) {
        if (i == 0) {
          this.planData.push({
            qishu: this.issueNum,
            beishu: num,
            jine: this.oneMulPrice * num,
            yingli: this.oneMulPrice * num * (this.lossPercent - 1),
            yinglilv: (this.lossPercent - 1) * 100
          });
        } else {
          const a = this.oneMulPrice,
            b = this.lossPercent,
            P = this.planData[i - 1].jine;
          let v = this.lowestPercent;
          let beishu;
          if (this.headIndex == 0) {
            beishu = num;
          } else if (this.headIndex == 1) {
            beishu = this.planData[i - 1].beishu * this.fanshu;
          } else {
            if (this.firstShow) {
              beishu = ((v / 100 + 1) * P) / (a * ((b * 100 - v) / 100 - 1));
            } else if (this.thirdShow) {
              beishu = (this.lowestPrice + P) / (a * (b - 1));
            } else if (this.secondShow) {
              this.beforeQiShu > i
                ? (v = this.beforeLowestPercent)
                : (v = this.afterLowestPercent);
              beishu = ((v / 100 + 1) * P) / (a * ((b * 100 - v) / 100 - 1));
            }
          }
          const n = Math.ceil(beishu);
          if (n > 5000) {
            this.$dialog.toast({
              mes: "当前最多生成" + i + "期",
              timeout: 1000
            });
            this.qishu = i;
            break;
          } else {
            this.planData.push({
              qishu: this.issueNum + i,
              beishu: n,
              jine: P + a * n,
              yingli: a * n * b - (a * n + P),
              yinglilv: ((a * n * b - (a * n + P)) / (P + a * n)) * 100
            });
          }
        }
        this.totalZhushu += this.perZhushu * this.planData[i].beishu;
        arr1.push(this.planData[i].yinglilv);
        arr2.push(this.planData[i].yingli);
      }
      arr1.sort((a, b) => a - b);
      arr2.sort((a, b) => a - b);
      this.totalPrice = this.planData.length && this.planData.slice(-1)[0].jine;
      if (this.headIndex == 2) {
        this.lowestPercent = arr1.length ? arr1[0] : 0;
        this.lowestPrice = arr2.length ? arr2[0] : 0;
      }
    },
    // 平倍追号初始化生成方案
    createMultiplePlan() {},
    // 翻数追号初始化生成方案
    async submitBetting() {
      // console.log(this.$store.state.betting.js_tag)
      // return
      if (this.submitting) return;
      this.submitting = true;
      const data = this.getSubmitData();
      console.log(data);
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
          ver: data.ver,
          multiple: data.multiple,
          client_type: 1,
          form_unique_token: randomFormtoken()
        })
      );
      if (err || result) {
        this.submitting = false;
      }
      if (result && result.take) {
        // const _this = this;
        // 清空购物车 less是账户剩下多少钱 take是花了多少钱
        // if (result.less && result.take) {
        // this.auto = 1
        // this.stop = 1
        // this.chaseBeiShu = 1

        // this.flushPrice()
        this.updatePrice(result.less);
        this.clearCart();
        this.$dialog.toast({
          mes: `投注成功,余额：${result.less}元`
        });
        this.$router.go(-2);
        // }
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
    getSubmitData() {
      this.submitting = true;
      const data = {
        gameid: this.cart[0].gameid,
        qishu: this.issueNum,
        auto: this.qishu,
        multiple: "",
        stop: Number(this.checkbox1),
        ver: this.ver,
        data: []
      };
      this.zhudan.forEach(item => {
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
      const chaseArr = [];
      this.planData.forEach(item => {
        chaseArr.push(item.beishu);
      });
      data.multiple = chaseArr.join("|");
      return data;
    },
    ...mapActions([
      "setCartNumber",
      "clearCart",
      "setBalance",
      "flushPrice",
      "updatePrice"
    ])
  },
  watch: {
    headIndex(val) {
      this.qishu = 10;
      if (val == 0) {
        this.createPlan(1);
      } else if (val == 1) {
        this.createPlan(this.specialBeishu);
      } else {
        this.createPlan(1);
      }
    },
    // fanshu(val) {
    //   this.qishu = 10
    //   this.createPlan(this.specialBeishu)
    // },
    qishu(val) {
      if (val > 20) {
        this.qishu = 20;
        this.$dialog.toast({ mes: "最多可追20期" });
      }
    },
    // planData(val) {
    //   console.log(val)
    // },
    planLowestPercent(val) {
      if (val > this.planData[0].yinglilv) {
        this.$dialog.alert({
          mes: "当前可设置最大盈利率为" + this.planData[0].yinglilv + "%"
        });
        this.planLowestPercent = this.planData[0].yinglilv;
      }
    },
    checkbox1(val) {
      if (val) {
        this.stop = 1;
      } else {
        this.stop = 0;
      }
    }
  },
  mixins: [cartMixin]
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.chase {
  justify-content: flex-start;
  padding: 0;
  background: #f2f3f4;
  position: fixed;
  top: 0;
  bottom: 0;
  .chase_head {
    width: 100%;
    height: poTorem(48px);
    background: url(~img/shouye/nav_bg.png) no-repeat;
    background-size: cover;
    @include between;
    &.chase_head_pig {
      @include pigbg;
    }
    .chase_options {
      line-height: 2rem;
      width: 70%;
      font-size: 1.125rem;
      border: poTorem(1px) solid #fff;
      border-radius: 0.25rem;
      i {
        display: inline-block;
        text-align: center;
        width: 33.4%;
        height: 100%;
        border-right: poTorem(1px) solid #fff;
        &:last-child {
          border: none;
        }
      }
      .choosed {
        background-color: #fff;
        color: $mainColor;
      }
    }
    span {
      @include center;
      width: poTorem(95px);
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
  .times {
    @include center;
    width: 100%;
    height: poTorem(38px);
    background: #f2f3f4;
    font-size: poTorem(14px);
    color: #515253;
    i {
      color: #e45557;
    }
  }
  .tabs {
    width: 100%;
    overflow: scroll;
    flex: 1;
    .ordinary {
      background-color: #feffff;
      margin-bottom: poTorem(57px);
      .head {
        @include around;
        padding: poTorem(15px) 0;
        // background: #f5f6f7;
        font-size: poTorem(16px);
        color: #808082;
        // span {
        //   &:last-child {
        //     // margin-left: poTorem(20px);
        //   }
        // }
        input {
          text-align: center;
          width: poTorem(60px);
          height: poTorem(28px);
          background: #fff;
          margin: 0 poTorem(10px);
          border-radius: poTorem(5px);
          border: poTorem(1px) solid #d3d4d5;
          font-size: poTorem(15px);
        }
      }
      .fanshu {
        @include start;
        color: $mainColor;
        span {
          text-align: center;
          font-size: 1rem;
          height: poTorem(30px);
          line-height: poTorem(28px);
          display: inline-block;
          width: 15%;
          border: poTorem(1px) solid $mainColor;
          border-radius: poTorem(3px);
          margin: 0 0 1rem 1rem;
        }
        .fanshuChoosed {
          color: #fff;
          background-color: $mainColor;
          border: none;
          line-height: poTorem(30px);
        }
      }
      .change_plan {
        font-size: poTorem(18px);
        color: #00a0ea;
        line-height: poTorem(40px);
        background-color: #f5f6f7;
        @include around;
        .plan_row {
          width: 74%;
          @include around;
          font-size: poTorem(16px);
          color: #535353;
          height: poTorem(30px);
          line-height: poTorem(30px);
          &:first-child,
          &:last-child {
            > p {
              display: block;
              // text-align: center;
            }
          }
          > p {
            position: relative;
            @include between;
            width: 50%;
            height: poTorem(30px);
            line-height: poTorem(28px);
            background-color: #fff;
            border: poTorem(1px) solid #d3d3d3;
            border-radius: poTorem(5px);
            img {
              position: absolute;
              top: poTorem(5px);
              right: poTorem(5px);
              width: poTorem(20px);
              height: poTorem(20px);
            }
            input {
              width: poTorem(100px);
              font-size: poTorem(18px);
              border: none;
              outline: none;
              text-align: center;
            }
            > span {
              display: inline-block;
              font-weight: 400;
              // text-align: center;
              text-indent: 1rem;
              width: poTorem(40px);
              height: 100%;
              line-height: poTorem(28px);
              font-size: 1.5rem;
              &:first-child {
                border-right: poTorem(1px) solid #ddd;
              }
              &:last-child {
                border-left: poTorem(1px) solid #ddd;
              }
            }
            .cart_content {
              display: inline-block;
              width: 100%;
              font-size: 1rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              border: none !important;
            }
          }
          > span {
            font-weight: 500;
            &:last-child {
              display: inline-block;
              width: 1rem;
            }
          }
        }
      }
      .need_arrow {
        &::after {
          margin-left: 0.05rem;
          margin-right: 0.625rem;
          display: block;
          font-family: YDUI-INLAY;
          content: "\E608";
        }
      }
      .title {
        // padding: 0 poTorem(10px);
        @include between;
        width: 100%;
        height: poTorem(40px);
        line-height: poTorem(40px);
        &:nth-child(odd) {
          background-color: #feffff;
        }
        &:nth-child(even) {
          background-color: #f5f6f7;
        }
        // &:nth-child(2) {
        //   border-top: poTorem(1px) solid #eee;
        // }
        // &:last-child {
        //   border-bottom: poTorem(1px) solid #eee;
        // }
        > span {
          display: inline-block;
          // border-right: poTorem(1px) solid #eee;
          font-size: poTorem(16px);
          height: 100%;
          width: 22%;
          text-align: center;
          color: #535353;
          &:first-child {
            width: 10%;
          }
          &:nth-child(2) {
            width: 10%;
          }
          &:nth-child(3) {
            width: 20%;
          }
        }
        p {
          @include center;
          width: 20%;
          // height: 100%;
          font-size: poTorem(16px);
          color: #535353;
          // border-right: poTorem(1px) solid #eee;
          border: poTorem(1px) solid #ddd;
          border-radius: poTorem(3px);
          input {
            width: poTorem(40px);
            // height: poTorem(23px);
            font-size: poTorem(18px);
            // line-height: poTorem(23px);
            border: none;
            outline: none;
            text-align: center;
            // background: #fff;
          }
          > span {
            display: inline-block;
            text-align: center;
            width: poTorem(30px);
            // height: poTorem(25px);
            line-height: poTorem(25px);
            font-size: 1rem;
            &:first-child {
              border-right: poTorem(1px) solid #ddd;
            }
            &:last-child {
              border-left: poTorem(1px) solid #ddd;
            }
          }
        }
      }
    }
  }
  .plan_page {
    padding: 0 poTorem(20px);
    .panel_up {
      .plan_row {
        @include between;
        font-size: poTorem(20px);
        color: #535353;
        height: poTorem(60px);
        line-height: poTorem(60px);
        // &:first-child, &:last-child {
        //   >p {
        //     display: block;
        //     text-align: center;
        //   }
        // }
        &:first-child {
          > p {
            display: block;
            text-align: center;
          }
        }
        > p {
          position: relative;
          @include between;
          width: 70%;
          height: poTorem(40px);
          line-height: poTorem(40px);
          background-color: #fff;
          border: poTorem(1px) solid #d3d3d3;
          border-radius: poTorem(5px);
          img {
            position: absolute;
            top: poTorem(10px);
            right: poTorem(10px);
            width: poTorem(20px);
            height: poTorem(20px);
          }
          input {
            width: poTorem(100px);
            font-size: poTorem(18px);
            border: none;
            outline: none;
            text-align: center;
          }
          > span {
            display: inline-block;
            text-align: center;
            width: poTorem(40px);
            height: 100%;
            line-height: poTorem(38px);
            font-size: 1.5rem;
            &:first-child {
              border-right: poTorem(1px) solid #ddd;
            }
            &:last-child {
              border-left: poTorem(1px) solid #ddd;
            }
          }
          .cart_content {
            display: inline-block;
            width: 100%;
            font-size: 1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            border: none !important;
          }
        }
        > span {
          &:last-child {
            display: inline-block;
            width: 1rem;
          }
        }
      }
    }
    .expect_get {
      width: 100%;
      @include between;
      font-size: poTorem(20px);
      color: #535353;
      // padding: 0 poTorem(20px);
      .expect_get_txt {
        width: 28%;
        @include center;
        align-items: flex-start;
        height: poTorem(200px);
        padding: 0;
      }
      .expect_get_content {
        width: 72%;
        p {
          line-height: poTorem(60px);
          .radio_option {
            width: poTorem(20px);
            height: poTorem(20px);
            display: inline-block;
            border-radius: 50%;
            border: poTorem(1px) solid #ddd;
            background-color: #fff;
            vertical-align: middle;
          }
          .checked {
            border: none;
            background: url(../../../img/goucai/choosed.png);
            background-size: contain;
          }
          input {
            font-size: poTorem(20px);
            text-align: center;
            border: poTorem(1px) solid #ccc;
            border-radius: poTorem(3px);
            outline: none;
            background-color: #fff;
            width: poTorem(60px);
            line-height: poTorem(30px);
          }
          &:nth-child(3) {
            padding-left: poTorem(20px);
          }
        }
      }
    }
    .create_button {
      margin-top: poTorem(20px);
      width: 100%;
      height: poTorem(40px);
      font-size: poTorem(20px);
      color: #fff;
      background-color: $mainColor;
      text-align: center;
      line-height: poTorem(40px);
      border-radius: poTorem(5px);
    }
  }
  .chooseQishu_pop {
    .wrap {
      width: 100%;
      padding: poTorem(20px);
      @include between;
      flex-wrap: wrap;
      p {
        width: 45%;
        height: poTorem(40px);
        border-radius: poTorem(3px);
        line-height: poTorem(40px);
        text-align: center;
        margin-bottom: poTorem(20px);
        color: #333;
        font-size: poTorem(20px);
        border: poTorem(1px) solid #d3d3d3;
      }
      .choosed {
        border: none;
        background: url(~img/goucai/chase_choosed.png) left top no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .chooseZhushu_pop {
    .wrap {
      width: 100%;
      padding: 1.25rem;
      p {
        background: url(~img/goucai/default.png) right 0.5rem no-repeat;
        background-size: 1.25rem 1.25rem;
        // text-align: center;
        font-size: 1rem;
        color: #333;
        line-height: 2.5rem;
        border-bottom: poTorem(1px) dashed #d3d3d3;
      }
      .choosed {
        background: url(~img/goucai/zhudan_choosed.png) right 0.5rem no-repeat;
        background-size: 1.25rem 1.25rem;
      }
    }
  }
  .bottom {
    @include between;
    width: 100%;
    height: poTorem(57px);
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    font-size: poTorem(20px);
    color: #606062;
    border-top: 1px solid #d3d4d5;
    .left {
      @include between;
      div {
        @include column;
        font-size: poTorem(16px);
        i {
          color: #e23032;
          margin: 0 poTorem(3px);
        }
      }
    }
    .right {
      @include center;
      color: #fff;
      background: #e02827;
      height: 100%;
      padding: 0px poTorem(20px);
      font-weight: bold;
    }
    .disable {
      background-color: #eee;
    }
  }
  // .tips {
  //   // padding-top: poTorem(10px);
  //   background-color: #edeeef;
  //   > p {
  //     text-align: center;
  //     padding: poTorem(10px) poTorem(20px);
  //     font-size: poTorem(16px);
  //     color: #535353;
  //     &:last-child {
  //       @include around;
  //       border-top: poTorem(1px) solid #d3d3d3;
  //       padding: 0;
  //       button {
  //         line-height: poTorem(50px);
  //         width: 50%;
  //         outline: none;
  //         border: none;
  //         color: #535353;
  //         &:last-child {
  //           color: #00a0e9;
  //           border-left: poTorem(1px) solid #d3d3d3;
  //         }
  //       }
  //     }
  //   }
  //   .expect_get {
  //     @include between;
  //     font-size: poTorem(16px);
  //     color: #535353;
  //     padding: 0 poTorem(20px);
  //     .expect_get_txt {
  //       @include center;
  //       height: poTorem(150px);
  //       padding: 0;
  //     }
  //     .expect_get_content {
  //       p {
  //         line-height: poTorem(30px);
  //         .radio_option {
  //           width: poTorem(16px);
  //           height: poTorem(16px);
  //           display: inline-block;
  //           border-radius: 50%;
  //           border: poTorem(1px) solid #ddd;
  //           background-color: #fff;
  //           vertical-align: middle;
  //         }
  //         .checked {
  //           border: none;
  //           background: url(../../../img/goucai/choosed.png);
  //           background-size: contain;
  //         }
  //         input {
  //           text-align: center;
  //           border: poTorem(1px) solid #ccc;
  //           border-radius: poTorem(3px);
  //           outline: none;
  //           background-color: #fff;
  //           width: poTorem(30px);
  //         }
  //         &:nth-child(3) {
  //           padding-left: poTorem(20px);
  //         }
  //       }
  //     }
  //   }
  // }
}
</style>
<style lang="scss">
.zhuihao_xiazhu {
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
.chooseZhushu_pop {
  .yd-popup-center {
    max-height: 80%;
    overflow: scroll;
  }
}
</style>
