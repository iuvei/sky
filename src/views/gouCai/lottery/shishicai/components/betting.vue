<template>
  <!-- 投注界面 -->
  <div class="betting">
    <sidebar v-if="isDoublePlay"
             :menuList="shuangmianList"
             @changeList="changeList"></sidebar>

    <div class="betting_right"
         v-if="switchs=='双面玩法'">
      <div class="select"
           @click="changeGameType(modelTitle)"
           v-show="title!='定位胆'"
           v-if="switchs == '官方玩法'">
        <span>{{title}}</span>
        <span class="icon"></span>
      </div>
      <span :class="[{'by_right':curPlayItem.playid=='41'},'odds']"
            v-if="![128,129,131,18,32,114].includes(curPlayItem.playid)">(赔率：{{peilv}})</span>
      <div class="betting_con">
        <div class="con_item"
             v-for="(item,index) in dataSet"
             :key="index"
             v-if="![128,129,131,41,18,32,114].includes(curPlayItem.playid) && !danshiArr.includes(curPlayItem.playid)">
          <span>{{item.name}}</span>
          <ul ref="ballOptions">
            <li class="sm"
                @click="clickBall(item, ball)"
                v-for="(ball,indexs) in item.data"
                :key="indexs"
                v-setChoosed="ball.checked"
                :class="{'choosed': ball.checked}">
              <label for=""><input type="checkbox"
                       v-model="ball.checked"></label>
              <div class="ball"
                   :class="[{'choosed': ball.checked}]">{{ball.name}}</div>
              <div class="peilv_num"
                   v-if="[18,32,114].includes(curPlayItem.playid)">{{ball.peilv}}</div>
            </li>
          </ul>
        </div>
        <div class="con_item"
             v-for="(item,index) in dataSet"
             :key="index"
             v-if="[128,129,131,41,18,32,114].includes(curPlayItem.playid) && !danshiArr.includes(curPlayItem.playid)">
          <span>{{item.name}}</span>
          <ul :class="{'lhd':curPlayItem.playid===129}">
            <li class="sm"
                @click="clickBall(item, ball)"
                v-for="(ball, indexs) in item.data"
                :key="indexs"
                :data-val="ball.value ">
              <div class="ball"
                   :class="[{'choosed': ball.checked}]">{{ball.name}}</div>
              <div class="peilv_num"
                   v-if="peilvs.length">{{ball.peilv}}</div>
              <label for=""><input type="checkbox"
                       v-model="ball.checked"></label>
            </li>
          </ul>
        </div>
        <div class="con_item"
             v-if="danshiArr.includes(curPlayItem.playid)">
          <div class="danshi">
            <p>{{curPlayItem.play_title}}</p>
            <textarea autofocus
                      cols="30"
                      rows="8"
                      :placeholder="'例如：' + myPlaceholder"
                      v-model="danshiExcl"></textarea>
            <p class="caution">注意：</p>
            <p>每个号码之间请用空格隔开，每一注号码之间请用一个逗号[,]隔开</p>
          </div>
        </div>
      </div>
      <div class="betting_right_bottom"
           v-show="optionIsShow">
        <yd-checkbox-group v-model="checkboxVal"
                           class="checkbox_wrap">
          <yd-checkbox val="万位"></yd-checkbox>
          <yd-checkbox val="千位"></yd-checkbox>
          <yd-checkbox val="百位"></yd-checkbox>
          <yd-checkbox val="十位"></yd-checkbox>
          <yd-checkbox val="个位"></yd-checkbox>
        </yd-checkbox-group>
      </div>
    </div>
    <bet-area :curPlayItem="curPlayItem"
              :dataSet="dataSet"
              v-if="switchs=='官方玩法'"
              :placeholder="myPlaceholder"
              v-model="danshiExcl"
              @chooseBall="clickBall"></bet-area>
    <!-- 弹窗 -->
    <div class="modle"
         v-if="player && player.submenu">
      <yd-popup v-if="show1"
                v-model="show1"
                position="center"
                width="90%">
        <div class="modle_title">
          <span>{{modelTitle}}</span>
          <i class="icon"
             @click="show1=!show1"></i>
        </div>
        <div class="time_line_box">
          <yd-timeline class="time_line_wrap">
            <yd-timeline-item v-for="(item,index) in player.submenu"
                              :key="index">
              <span>{{item.name}}</span>
              <ul>
                <li @click="specific(items,'',index,indexs,item)"
                    v-for="(items,indexs) in item.playlist"
                    :key="indexs"
                    :class="{wanfa: indexs==wanfaIndex&&index==parentWanfa}">{{items.playname}}</li>
              </ul>
            </yd-timeline-item>
          </yd-timeline>
        </div>

      </yd-popup>
    </div>
  </div>
</template>
<script>
const template_smp = [
  {
    name: "总和值",
    options: ["大", "小", "单", "双"]
  },
  {
    name: "后二和值",
    options: ["大", "小", "单", "双", "中"]
  },
  {
    name: "万位",
    options: ["大", "小", "单", "双"]
  },
  {
    name: "千位",
    options: ["大", "小", "单", "双"]
  },
  {
    name: "百位",
    options: ["大", "小", "单", "双"]
  },
  {
    name: "十位",
    options: ["大", "小", "单", "双"]
  },
  {
    name: "个位",
    options: ["大", "小", "单", "双"]
  }
];

const template_nn = [
  {
    name: "",
    options: [
      "牛一",
      "牛二",
      "牛三",
      "牛四",
      "牛五",
      "牛六",
      "牛七",
      "牛八",
      "牛九",
      "牛牛",
      "无牛",
      "有牛",
      "牛大",
      "牛小",
      "牛单",
      "牛双"
    ]
  }
];

const template_lhd = [
  {
    name: "万、千",
    options: ["龙", "虎", "和"]
  },
  {
    name: "万、百",
    options: ["龙", "虎", "和"]
  },
  {
    name: "万、拾",
    options: ["龙", "虎", "和"]
  },
  {
    name: "万、个",
    options: ["龙", "虎", "和"]
  },
  {
    name: "千、百",
    options: ["龙", "虎", "和"]
  },
  {
    name: "千、十",
    options: ["龙", "虎", "和"]
  },
  {
    name: "千、个",
    options: ["龙", "虎", "和"]
  },
  {
    name: "百、十",
    options: ["龙", "虎", "和"]
  },
  {
    name: "百、个",
    options: ["龙", "虎", "和"]
  },
  {
    name: "拾、个",
    options: ["龙", "虎", "和"]
  }
];

import { mapActions, mapState } from "vuex";
import {
  Calc_Zhushu_Obj,
  getRenderTypeByPlayID,
  getCalcFuncByPlayID
} from "~/js/touzhu/touzhu.ssc.calc";

import { RenderTypes } from "~/js/touzhu/commonTypes";
import api from "../../../../../../api/betting";
import oddMixin from "../../oddMixin";
import randomUtil from "~/js/touzhu/touzhu.random.danshi";
import danshiUtil from "~/js/touzhu/danshi.util";
import betArea from "../../../components/betArea";
import sidebar from "../../../components/sideBar";
import getDwdArr from "~/js/touzhu/util";
const zhushuFunc = new Calc_Zhushu_Obj();
export default {
  name: "ssc_betting",
  props: ["routeList"],
  directives: {
    setChoosed: {
      update(el, { value }) {
        if (value && el.classList && !el.classList.contains("choosed")) {
          el.classList.add("choosed");
        }
      }
    }
  },
  components: {
    sidebar,
    betArea
  },
  data() {
    return {
      myPlaceholder: "",
      playList: Array,
      guanfangList: [],
      shuangmianList: [],
      title: "直选复式",
      modelTitle: "",
      show1: false,
      heights: "",
      player: {},
      childPlayer: {},
      playersChl: {},
      ballsList: [],
      bettingArr: [], // 传给公共方法的数组，可作为特殊玩法共用数组
      buyBall: [], // 拼接管道符之后的所有球号数组
      wanwei: [], // 万
      qianwei: [], // 千
      baiwei: [], // 百
      shiwei: [], // 十
      gewei: [], //  个
      sanchong: [], // 三重号
      sichong: [], // 四重号
      erchong: [], // 二重号
      danhao: [], // 单号
      secondWanfa: "",
      middle: 0,

      // switchs: this.$route.params.play_type ? '双面玩法' : '官方玩法',
      peilv: "",
      peilvs: [],
      parentWanfa: 0,
      wanfaIndex: 0,
      checkboxVal: [],
      zhushu: 0,
      minCheckCount: 0,
      pos_count: 0,
      selectedRow: [],
      showArr: "",
      curPlayItem: {},
      dataSet: [],
      playid: 0,
      danshiExcl: "",
      odds: [],
      danshiArr: [
        2,
        4,
        6,
        11,
        13,
        20,
        25,
        27,
        34,
        38,
        58,
        61,
        64,
        67,
        69,
        73,
        95,
        102,
        107,
        109,
        116,
        120
      ]
    };
  },
  activated() {
    if (this.$route.params.isHome) {
      this.getData(this.$route.params.js_tag);
    }
    this.zhushu = 0;
    this.clearBalls();
    this.setOdds();
    this.danshiExcl = "";
  },
  deactivated() {},
  methods: {
    danshiZhushuCacl(val) {
      const danshiExcl = val.split(" ").join("|");
      switch (this.playid) {
        case 2:
          this.zhushu = zhushuFunc.calc_5x_zxds(danshiExcl.split(","));
          break;
        case 4:
        case 95:
          this.zhushu = zhushuFunc.calc_4x_zxds(danshiExcl.split(","));
          break;
        case 6:
        case 20:
        case 102:
          this.zhushu = zhushuFunc.calc_h3_zxds(danshiExcl.split(","));
          break;
        case 11:
        case 25:
        case 107:
          this.zhushu = zhushuFunc.calc_h3_z3ds(danshiExcl.split(","));
          break;
        case 13:
        case 27:
        case 109:
          this.zhushu = zhushuFunc.calc_h3_z6ds(danshiExcl.split(","));
          break;
        case 34:
        case 116:
          this.zhushu = zhushuFunc.calc_q2_zxds(danshiExcl.split(","));
          break;
        case 38:
        case 120:
          this.zhushu = zhushuFunc.calc_q2_zuxds(danshiExcl.split(","));
          break;
        case 58:
          this.zhushu = zhushuFunc.calc_r2_zxds(danshiExcl.split(","));
          break;
        case 61:
          this.zhushu = zhushuFunc.calc_r2_zuxds(danshiExcl.split(","));
          break;
        case 64:
          this.zhushu = zhushuFunc.calc_r3_zxds(danshiExcl.split(","));
          break;
        case 67:
          this.zhushu = zhushuFunc.calc_r3_zu3ds(danshiExcl.split(","));
          break;
        case 69:
          this.zhushu = zhushuFunc.calc_r3_zu6ds(danshiExcl.split(","));
          break;
        case 73:
          this.zhushu = zhushuFunc.calc_r4_zxds(danshiExcl.split(","));
          break;
      }
    },
    clickCart() {
      if (this.cart.length) {
        this.$router.push("/shopCart");
      } else {
        this.$dialog.toast({ mes: "您的购物车空空如也" });
      }
    },
    async getData(tag) {
      const playConfig = await api.getGamePlayConfig(tag);
      if (!playConfig.length) {
        this.$dialog.toast({ mes: "当前彩种已关闭" });
        return;
      }
      if (playConfig && Array.isArray(playConfig)) {
        this.playList = playConfig;
        this.setPlayConfig(playConfig);
        this.guanfangList = playConfig.filter(x => x.showofficial === 0);
        this.shuangmianList = playConfig.filter(x => x.showofficial === 1);

        // 从彩种获取默认玩法 ，0为官方 1为双面
        let defaultPlay = this.$route.params.play_type;
        if (defaultPlay === undefined) {
          defaultPlay = this.switchs === "官方玩法" ? 0 : 1;
        }
        this.player =
          defaultPlay === 0 ? this.guanfangList : this.shuangmianList;
        this.playSwitch(defaultPlay ? "双面玩法" : "官方玩法");

        if (this.isFromBetHistory) {
          this.findItemByWanfa(this.historeyWanfa);
        } else this.player && this.changeList(this.player[0]);
      }
    },
    // 删除选球
    removeBalls(arr, val) {
      const index = arr.indexOf(val);
      arr.splice(index, 1);
    },
    // 将大小单双转换为数字
    translateNum(arr) {
      return arr.map(item =>
        item == "大" || item == "豹子"
          ? 0
          : item == "小" || item == "顺子"
            ? 1
            : item == "单" || item == "对子"
              ? 2
              : item == "双"
                ? 3
                : item
      );
    },
    // 封装组成选球的数组的方法
    assembleBalls(val1, val2, type) {
      // console.log(this.playid)
      if (this.playersChl.length == 1) {
        const baodanArr = [16, 30, 112, 40, 122];
        if (baodanArr.includes(this.playid)) {
          if (this.dataSet && this.dataSet.length) {
            this.dataSet.forEach(x => {
              x.data.forEach(y => {
                if (y.name != val2) {
                  y.checked = false;
                }
              });
            });
          }
          if (this.bettingArr && this.bettingArr.length) {
            this.bettingArr.splice(0);
          }
        }
        if (type == 1) {
          this.bettingArr.push(val2);
        } else {
          this.removeBalls(this.bettingArr, val2);
        }
        this.bettingArr = this.translateNum(this.bettingArr);
      } else {
        switch (val1) {
          case "万位":
            type == 1
              ? this.wanwei.push(val2)
              : this.removeBalls(this.wanwei, val2);
            this.wanwei = this.translateNum(this.wanwei);
            break;
          case "千位":
            type == 1
              ? this.qianwei.push(val2)
              : this.removeBalls(this.qianwei, val2);
            this.qianwei = this.translateNum(this.qianwei);
            break;
          case "百位":
            type == 1
              ? this.baiwei.push(val2)
              : this.removeBalls(this.baiwei, val2);
            this.baiwei = this.translateNum(this.baiwei);
            break;
          case "十位":
            type == 1
              ? this.shiwei.push(val2)
              : this.removeBalls(this.shiwei, val2);
            this.shiwei = this.translateNum(this.shiwei);
            break;
          case "个位":
          case "各位":
            type == 1
              ? this.gewei.push(val2)
              : this.removeBalls(this.gewei, val2);
            this.gewei = this.translateNum(this.gewei);
            break;
          case "四重号":
            type == 1
              ? this.sichong.push(val2)
              : this.removeBalls(this.sichong, val2);
            break;
          case "三重号":
            type == 1
              ? this.sanchong.push(val2)
              : this.removeBalls(this.sanchong, val2);
            break;
          case "二重号":
            type == 1
              ? this.erchong.push(val2)
              : this.removeBalls(this.erchong, val2);
            break;
          case "单号":
            type == 1
              ? this.danhao.push(val2)
              : this.removeBalls(this.danhao, val2);
            break;
        }
        this.bettingArr.splice(0, 5);
        this.wanwei.length
          ? this.bettingArr.splice(0, 5, this.wanwei.join("|"))
          : "";
        this.qianwei.length
          ? this.bettingArr.splice(1, 4, this.qianwei.join("|"))
          : "";
        this.baiwei.length
          ? this.bettingArr.splice(2, 3, this.baiwei.join("|"))
          : "";
        this.shiwei.length
          ? this.bettingArr.splice(3, 2, this.shiwei.join("|"))
          : "";
        this.gewei.length
          ? this.bettingArr.splice(4, 1, this.gewei.join("|"))
          : "";
        this.sichong.length
          ? this.bettingArr.splice(0, 2, this.sichong.join("|"))
          : "";
        this.sanchong.length
          ? this.bettingArr.splice(0, 2, this.sanchong.join("|"))
          : "";
        this.erchong.length
          ? this.title == "组选10"
            ? this.bettingArr.splice(1, 1, this.erchong.join("|"))
            : this.bettingArr.splice(0, 2, this.erchong.join("|"))
          : "";
        this.danhao.length
          ? this.bettingArr.splice(1, 1, this.danhao.join("|"))
          : "";
      }
      // console.log(this.bettingArr)
    },
    // 选择号码
    filter(val) {
      // if (!val2.checked) {
      //   this.assembleBalls(val1.name, val2.name)
      // } else {
      //   this.assembleBalls(val1.name, val2.name, 1)
      // }
      if (this.dataSet.length === 1) {
        this.bettingArr =
          val.length &&
          val[0].data.map(item => (item.checked ? item.value : ""));
      } else {
        this.bettingArr = val.map(item =>
          item.data.map(n => (n.checked ? n.value : "")).join("|")
        );
      }
      switch (this.playid) {
        case 1:
          this.zhushu = zhushuFunc.calc_5x_zxfs(this.bettingArr);
          break;
        case 82:
          this.zhushu = zhushuFunc.calc_5x_zxzh(this.bettingArr);
          break;
        case 83:
          this.zhushu = zhushuFunc.calc_5x_zx120(this.bettingArr);
          break;
        case 84:
          this.zhushu = zhushuFunc.calc_5x_zx60(this.bettingArr);
          break;
        case 85:
          this.zhushu = zhushuFunc.calc_5x_zx30(this.bettingArr);
          break;
        case 86:
          this.zhushu = zhushuFunc.calc_5x_zx20(this.bettingArr);
          break;
        case 87:
          this.zhushu = zhushuFunc.calc_5x_zx10(this.bettingArr);
          break;
        case 88:
          this.zhushu = zhushuFunc.calc_5x_zx5(this.bettingArr);
          break;
        case 3:
          this.zhushu = zhushuFunc.calc_4x_zxfs(this.bettingArr);
          break;
        case 89:
          this.zhushu = zhushuFunc.calc_4x_zxzh(this.bettingArr);
          break;
        case 90:
          this.zhushu = zhushuFunc.calc_4x_zx24(this.bettingArr);
          break;
        case 91:
          this.zhushu = zhushuFunc.calc_4x_zx12(this.bettingArr);
          break;
        case 92:
          this.zhushu = zhushuFunc.calc_4x_zx6(this.bettingArr);
          break;
        case 93:
          this.zhushu = zhushuFunc.calc_4x_zx4(this.bettingArr);
          break;
        case 94:
          this.zhushu = zhushuFunc.calc_4x_zxfs(this.bettingArr);
          break;
        case 96:
          this.zhushu = zhushuFunc.calc_4x_zxzh(this.bettingArr);
          break;
        case 97:
          this.zhushu = zhushuFunc.calc_4x_zx24(this.bettingArr);
          break;
        case 98:
          this.zhushu = zhushuFunc.calc_4x_zx12(this.bettingArr);
          break;
        case 99:
          this.zhushu = zhushuFunc.calc_4x_zx6(this.bettingArr);
          break;
        case 100:
          this.zhushu = zhushuFunc.calc_4x_zx4(this.bettingArr);
          break;
        case 5:
        case 19:
        case 101:
          this.zhushu = zhushuFunc.calc_h3_zxfs(this.bettingArr);
          break;
        case 7:
        case 21:
        case 103:
          this.zhushu = zhushuFunc.calc_h3_zh(this.bettingArr);
          break;
        case 8:
        case 22:
        case 104:
          this.zhushu = zhushuFunc.calc_h3_zxhz(this.bettingArr);
          break;
        case 9:
        case 23:
        case 105:
          this.zhushu = zhushuFunc.calc_h3_zxkd(this.bettingArr);
          break;
        case 10:
        case 24:
        case 106:
          this.zhushu = zhushuFunc.calc_h3_z3fs(this.bettingArr);
          break;
        case 12:
        case 26:
        case 108:
          this.zhushu = zhushuFunc.calc_h3_z6fs(this.bettingArr);
          break;
        case 16:
        case 30:
        case 112:
          this.zhushu = zhushuFunc.calc_h3_zuxbd(this.bettingArr);
          break;
        case 17:
        case 31:
        case 113:
          this.zhushu = zhushuFunc.calc_h3_sumws(this.bettingArr);
          break;
        case 18:
        case 32:
        case 114:
          this.zhushu = zhushuFunc.calc_h3_tsh(this.bettingArr);
          break;
        case 33:
        case 115:
          this.zhushu = zhushuFunc.calc_q2_zxfs(this.bettingArr);
          break;
        case 35:
        case 117:
          this.zhushu = zhushuFunc.calc_q2_zhxhz(this.bettingArr);
          break;
        case 36:
        case 118:
          this.zhushu = zhushuFunc.calc_q2_zxkd(this.bettingArr);
          break;
        case 37:
        case 119:
          this.zhushu = zhushuFunc.calc_q2_zuxfs(this.bettingArr);
          break;
        case 39:
        case 121:
          this.zhushu = zhushuFunc.calc_q2_zuxhz(this.bettingArr);
          break;
        case 40:
        case 122:
          this.zhushu = zhushuFunc.calc_q2_zuxbd(this.bettingArr);
          break;
        case 42:
          this.zhushu = zhushuFunc.calc_bdw_31m(this.bettingArr);
          break;
        case 43:
          this.zhushu = zhushuFunc.calc_bdw_32m(this.bettingArr);
          break;
        case 44:
          this.zhushu = zhushuFunc.calc_bdw_31m(this.bettingArr);
          break;
        case 45:
          this.zhushu = zhushuFunc.calc_bdw_32m(this.bettingArr);
          break;
        case 46:
          this.zhushu = zhushuFunc.calc_bdw_31m(this.bettingArr);
          break;
        case 47:
          this.zhushu = zhushuFunc.calc_bdw_32m(this.bettingArr);
          break;
        case 48:
          this.zhushu = zhushuFunc.calc_bdw_31m(this.bettingArr);
          break;
        case 49:
          this.zhushu = zhushuFunc.calc_bdw_32m(this.bettingArr);
          break;
        case 50:
          this.zhushu = zhushuFunc.calc_bdw_31m(this.bettingArr);
          break;
        case 51:
          this.zhushu = zhushuFunc.calc_bdw_32m(this.bettingArr);
          break;
        case 52:
          this.zhushu = zhushuFunc.calc_bdw_33m(this.bettingArr);
          break;
        case 53:
          this.zhushu = zhushuFunc.calc_q2_dxds(this.bettingArr);
          break;
        case 54:
          this.zhushu = zhushuFunc.calc_h2_dxds(this.bettingArr);
          break;
        case 55:
          this.zhushu = zhushuFunc.calc_q3_dxds(this.bettingArr);
          break;
        case 56:
          this.zhushu = zhushuFunc.calc_h3_dxds(this.bettingArr);
          break;
      }
    },
    needCountUnit() {
      this.bettingArr.splice(0, 1);
      let positionNum = 0;
      this.checkboxVal.forEach(item => {
        switch (item) {
          case "万位":
            positionNum += Math.pow(2, 0);
            break;
          case "千位":
            positionNum += Math.pow(2, 1);
            break;
          case "百位":
            positionNum += Math.pow(2, 2);
            break;
          case "十位":
            positionNum += Math.pow(2, 3);
            break;
          case "个位":
            positionNum += Math.pow(2, 4);
            break;
        }
      });
      this.bettingArr.unshift(positionNum);
    },
    changeList(val) {
      // 添加类名

      if (val) {
        this.modelTitle = val.name ? val.name : "";
        this.specific(val.submenu[0].playlist[0], "显示", 0, 0, val.submenu[0]);
      }
    },
    specific(val, txt, p, i, childPlayer) {
      this.danshiExcl = "";
      this.childPlayer = childPlayer;
      this.curPlayItem = val;
      switch (val.playid) {
        case 2:
          this.myPlaceholder = "1 2 3 4 5";
          break;
        case 4:
        case 95:
          this.myPlaceholder = "1 2 3 4";
          break;
        case 6:
        case 20:
        case 102:
        case 13:
        case 27:
        case 109:
          this.myPlaceholder = "0 1 2";
          break;
        case 11:
        case 25:
        case 107:
          this.myPlaceholder = "1 1 2";
          break;
        case 34:
        case 38:
        case 116:
        case 120:
          this.myPlaceholder = "1 2";
          break;
      }
      // 初始化选球数组
      this.bettingArr = [];
      this.wanwei = [];
      this.wanwei = [];
      this.qianwei = [];
      this.baiwei = [];
      this.shiwei = [];
      this.gewei = [];
      this.sanchong = [];
      this.erchong = [];
      this.danhao = [];
      this.sichong = [];
      this.checkboxVal = [];
      this.zhushu = 0;
      this.setBetNumber(0);

      this.secondWanfa = childPlayer.menuid; // 设置玩法的第二层名称，由此判断选球方式

      this.parentWanfa = p;
      this.wanfaIndex = i;
      // this.peilv = val.peilv.includes("|")? val.peilv.replace();
      this.description(
        `<b>范例</b>：${val.play_fanli}<br><br><b>玩法说明</b>：${
          val.play_shuoming
        }`
      );
      this.playersChl = val.content.split("+");
      this.title = val.playname;
      console.log("title", this.title);
      this.playid = val.playid;
      // 判断时时彩玩法类型
      const arrlist1 = [117, 35, 59];
      const arrlist2 = [121, 39, 62];
      if (val.playname == "直选和值") {
        if (arrlist1.includes(val.playid)) {
          this.arryList(19, true);
        } else {
          this.arryList(28, true);
        }
      } else if (val.playname == "组选和值") {
        if (arrlist2.includes(val.playid)) {
          this.arryList(17, false);
        } else {
          this.arryList(26, false);
        }
      } else if (val.wanfa.indexOf("大小单双") > 0) {
        this.arryList(null, "单双");
      } else if (val.playname == "特殊号") {
        this.arryList(null, "特殊");
      } else {
        this.arryList(10, true);
      }
      txt != "显示" && (this.show1 = !this.show1);
      this.selectedRow = [];

      if (this.curPlayItem.playid == 128) {
        this.playersChl = template_smp;
      }
      if (this.curPlayItem.playid == 129) {
        this.playersChl = template_lhd;
      }
      if (this.curPlayItem.playid == 131) {
        this.playersChl = template_nn;
      }

      this.setDataSet();
      this.odds.length && this.setEachDataPeilv(val.playid);
    },
    // 玩法列表
    arryList(number, flag) {
      let arr = new Array(number),
        i = arr.length;
      if (flag == "单双") {
        arr = ["大", "小", "单", "双"];
      } else if (flag == "特殊") {
        arr = ["豹子", "顺子", "对子"];
      } else {
        if (flag) {
          while (i--) {
            arr[i] = i;
          }
        } else {
          while (i--) {
            arr[i] = i + 1;
          }
        }
      }
      this.ballsList = arr;
    },
    changeGameType(val) {
      this.show1 = !this.show1;
      this.playList.forEach(item => {
        item.name == val && (this.player = item);
      });
    },
    returnRXZhushu() {
      const checkcount = this.checkboxVal.length;
      let pos_count;

      if (this.minCheckCount == 2) {
        switch (checkcount) {
          case 2:
            pos_count = 1;
            break;
          case 3:
            pos_count = 3;
            break;
          case 4:
            pos_count = 6;
            break;
          case 5:
            pos_count = 10;
            break;
          default:
            pos_count = 0;
            break;
        }
      } else if (this.minCheckCount == 3) {
        switch (checkcount) {
          case 3:
            pos_count = 1;
            break;
          case 4:
            pos_count = 4;
            break;
          case 5:
            pos_count = 10;
            break;
        }
      } else if (this.minCheckCount == 4) {
        if (checkcount == 4) {
          pos_count = 1;
        } else if (checkcount == 5) {
          pos_count = 5;
        } else {
          pos_count = 0;
        }
      }
      return pos_count;
    },
    clearBalls() {
      this.bettingArr = [];
      this.wanwei = [];
      this.wanwei = [];
      this.qianwei = [];
      this.baiwei = [];
      this.shiwei = [];
      this.gewei = [];
      this.sanchong = [];
      this.erchong = [];
      this.danhao = [];
      this.sichong = [];
      this.checkboxVal = [];
      this.zhushu = 0;
      this.setBetNumber(0);
      this.$refs.ballOptions &&
        this.$refs.ballOptions.forEach(item => {
          const nodes = item.childNodes;
          for (let i = 0, len = nodes.length; i < len; i++) {
            nodes[i].classList.remove("choosed");
          }
        });
      if (this.dataSet && this.dataSet.length) {
        this.dataSet.forEach(x => {
          x.data.forEach(y => (y.checked = false));
        });
      }
    },
    // 初始化数据源
    setDataSet() {
      const columns = this.playersChl;
      const _dataSet = [];
      let count = 0;
      columns.forEach((item, index) => {
        const _d = [];
        let list = this.ballsList;
        if (this.isSpecial) {
          list = item.options ? item.options : this.ballsList;
          count += list.length;
        }
        list.forEach((x, i) => {
          let val = !isNaN(x)
            ? x
            : item.options
              ? index * item.options.length + i
              : index + i;
          if (this.isSpecial) {
            val = item.options ? count - item.options.length + i : i;
            // item.values && item.values.length
            //   ? item.values[i]
            //   : item.options ? index * item.options.length + i : index + i
          }
          _d.push({
            name: x,
            checked: false,
            peilv: "-",
            playid: this.curPlayItem.playid,
            value: val // 从0开始
          });
        });
        _dataSet.push({
          name: typeof item === "string" ? item : item.name,
          data: _d
        });
      });
      this.dataSet = _dataSet;
    },
    clickBall() {
      const _this = this;
      setTimeout(() => {
        // _this.filter(row, item)
        _this.clickHandle();
      });
    },
    calcZhushu(playid, oneDimValuesArr, towDimValuesArr) {
      const func = getCalcFuncByPlayID(playid);
      if ([129, 131].includes(playid)) {
        this.zhushu = zhushuFunc[func](oneDimValuesArr);
      } else if ([41].includes(playid)) {
        towDimValuesArr = getDwdArr(towDimValuesArr).filter(x => x.length);
        this.zhushu = zhushuFunc[func](towDimValuesArr);
      } else {
        this.zhushu = zhushuFunc[func](oneDimValuesArr);
      }
      // this.setBetNumber(this.zhushu);
    },
    // 双面玩法
    clickHandle() {
      const oneDimArr = [],
        twoDimArr = [],
        oneDimValuesArr = [],
        twoDimNamesArr = [],
        towDimValuesArr = [];
      let formatShowStr = "";

      const peilvType = getRenderTypeByPlayID(this.curPlayItem.playid);
      this.dataSet.forEach(item => {
        const filteredData = item.data.filter(x => x.checked);
        oneDimArr.push(...filteredData);
        if (filteredData.length) {
          const obj = Object.assign({}, item);
          obj.data = filteredData;
          twoDimArr.push(obj);
        }
        const filters = filteredData.map(x =>
          x.name.toString().replace(/\s/g, "")
        );
        const values = filteredData.map(x =>
          x.value.toString().replace(/\s/g, "")
        );
        oneDimValuesArr.push(...filters);
        twoDimNamesArr.push(filters.join("|"));
        towDimValuesArr.push(values.join("|"));
      });
      if (this.isDoublePlay) {
        this.calcZhushu(
          this.curPlayItem.playid,
          oneDimValuesArr,
          towDimValuesArr
        );
      } else {
        this.filter(twoDimArr);
      }

      if (peilvType === RenderTypes.MUTI_ROW_SINGLE_PEILV) {
        twoDimNamesArr.forEach((x, i) => {
          if (x.length) {
            formatShowStr += `${
              this.dataSet[i].name
            }(<span style="color:red">${x}</span>) `;
          }
        });
        formatShowStr = formatShowStr.trim();
      }

      this.setBetData({
        type: this.switchs == "双面玩法" ? 1 : 0, // 双面玩法,0为官方玩法
        peilv: this.peilv,
        peilvType, // 0 为单赔率,1为多赔率
        formatValueStr:
          peilvType == 0 ? twoDimNamesArr.join(" ") : oneDimValuesArr.join(" "),
        arr: twoDimNamesArr,
        arr2: towDimValuesArr,
        formatShowStr,
        // 定位胆专用取值
        dwdValuesArr:
          peilvType == RenderTypes.DWD ? getDwdArr(towDimValuesArr) : [],
        // wanfa: this.title, // 玩法
        wanfa: this.curPlayItem.wanfa
          ? this.curPlayItem.wanfa
          : this.modelTitle + this.title.replace(this.modelTitle, ""),
        zhushu: this.zhushu, // 注数
        gameid: this.$route.params.lotter_id,
        playid: this.curPlayItem.playid,
        js_tag: this.$store.state.betting.js_tag,
        danshiExcl: this.danshiExcl, // 单式专用
        dataSet: oneDimArr, // 数据源,已选中的一维数组
        filteredData: twoDimArr, // 已经选中的项数组 二维数组
        dataSource: this.dataSet
      });
    },
    ...mapActions([
      "description",
      "playSwitch",
      "setBetNumber",
      "setBetOdds",
      "setBetUOdds",
      "setBetOdd",
      "setBetData",
      "clearCart",
      "showOfficial",
      "setPlayConfig"
    ])
  },
  watch: {
    danshiExcl(val) {
      this.zhushu = 0;
      this.danshiZhushuCacl(val);
    },
    async "$route.params"(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === "ssc" &&
        oldVal &&
        oldVal.js_tag &&
        oldVal.js_tag === "ssc"
      ) {
        const _playItem = this.curPlayItem;
        this.clearBalls();
        this.setOdds();
        this.setBetNumber(0);
        this.clearCart();
        this.setBetData({});
        if (newVal.isHome) {
          this.getData(this.$route.params.js_tag);
          this.findItemByWanfa(_playItem.wanfa);
        }
      }
    },
    show1(val) {
      val == false && (this.heights = "0px");
    },
    switch() {
      // this.switchs = val
      if (this.isFromBetHistory) return;
      if (this.switchs == "双面玩法") {
        this.changeList(this.shuangmianList[0], 0);
      } else {
        this.changeList(this.guanfangList[0], 0);
      }
    },
    zhushu: {
      handler(val) {
        this.setBetNumber(val);

        if (
          danshiUtil.isSingleMode(
            this.routeList.js_tag,
            this.curPlayItem.playid
          ) &&
          val > 0
        ) {
          const dataSet = randomUtil.createDataSource(
            this.routeList.js_tag,
            this.curPlayItem.playid
          );
          this.dataSet = dataSet;
          this.clickHandle();
        }
      },
      deep: true
    },
    checkboxVal() {
      if (this.secondWanfa == 27) {
        this.minCheckCount = 2;
        if (this.playid == 57) {
          this.zhushu = zhushuFunc.calc_r2_zxfs(this.bettingArr);
        } else if (this.playid == 59) {
          this.bettingArr.length ? "" : this.bettingArr.push(0);
          this.needCountUnit();
          this.zhushu =
            zhushuFunc.calc_r2_zxhz(this.bettingArr) * this.returnRXZhushu();
        }
      } else if (this.secondWanfa == 28) {
        this.minCheckCount = 2;
        if (this.playid == 60) {
          this.bettingArr.length ? "" : this.bettingArr.push(0);
          this.needCountUnit();
          this.zhushu =
            zhushuFunc.calc_r2_zuxfs(this.bettingArr) * this.returnRXZhushu();
        } else if (this.title == 62) {
          this.bettingArr.length ? "" : this.bettingArr.push(0);
          this.needCountUnit();
          this.zhushu =
            zhushuFunc.calc_r2_zuxhz(this.bettingArr) * this.returnRXZhushu();
        }
      } else if (this.secondWanfa == 29) {
        this.minCheckCount = 3;
        if (this.playid == 63) {
          this.zhushu = zhushuFunc.calc_r3_zxfs(this.bettingArr);
        } else if (this.playid == 65) {
          this.bettingArr.length ? "" : this.bettingArr.push(0);
          this.needCountUnit();
          this.zhushu =
            zhushuFunc.calc_r3_zxhz(this.bettingArr) * this.returnRXZhushu();
        }
      } else if (this.secondWanfa == 30) {
        this.minCheckCount = 3;
        if (this.playid == 66) {
          this.bettingArr.length ? "" : this.bettingArr.push(0);
          this.needCountUnit();
          this.zhushu =
            zhushuFunc.calc_r3_zu3fs(this.bettingArr) * this.returnRXZhushu();
        } else if (this.playid == 68) {
          this.bettingArr.length ? "" : this.bettingArr.push(0);
          this.needCountUnit();
          this.zhushu =
            zhushuFunc.calc_r3_zu6fs(this.bettingArr) * this.returnRXZhushu();
        } else if (this.playid == 71) {
          this.bettingArr.length ? "" : this.bettingArr.push(0);
          this.needCountUnit();
          this.zhushu =
            zhushuFunc.calc_r3_zuxhz(this.bettingArr) * this.returnRXZhushu();
        }
      } else if (this.secondWanfa == 31) {
        this.minCheckCount = 4;
        if (this.playid == 72) {
          this.zhushu = zhushuFunc.calc_r4_zxfs(this.bettingArr);
        }
      } else if (this.secondWanfa == 32) {
        this.minCheckCount = 4;
        if (this.title == 74) {
          this.bettingArr.length ? "" : this.bettingArr.push(0);
          this.needCountUnit();
          this.zhushu =
            zhushuFunc.calc_r4_zux24(this.bettingArr) * this.returnRXZhushu();
        } else if (this.title == 75) {
          this.bettingArr.length ? "" : this.bettingArr.push(0);
          this.needCountUnit();
          this.zhushu =
            zhushuFunc.calc_r4_zux6(this.bettingArr) * this.returnRXZhushu();
        } else if (this.title == 76) {
          this.bettingArr.length ? "" : this.bettingArr.push(0);
          this.needCountUnit();
          this.zhushu =
            zhushuFunc.calc_r4_zux12(this.bettingArr) * this.returnRXZhushu();
        } else if (this.title == 77) {
          this.bettingArr.length ? "" : this.bettingArr.push(0);
          this.needCountUnit();
          this.zhushu =
            zhushuFunc.calc_r4_zux4(this.bettingArr) * this.returnRXZhushu();
        }
      }
      // this.setBetNumber(this.zhushu);
    }
  },
  computed: {
    ...mapState({
      switch: state => state.betting.switch,
      cartNumber: state => state.betting.cartNumber,
      cart: state => state.betting.cart
    }),
    switchs() {
      return this.switch;
    },
    optionIsShow() {
      return (
        (this.secondWanfa == 27 && this.playid == 59) ||
        (this.secondWanfa == 29 && this.playid == 65) ||
        this.secondWanfa == 28 ||
        this.secondWanfa == 30 ||
        this.secondWanfa == 32
      );
    },
    isSpecial() {
      if (this.curPlayItem && this.curPlayItem.playid) {
        return [128, 129, 131, 18, 32, 114].includes(this.curPlayItem.playid);
      } else {
        return false;
      }
    },
    isDoublePlay() {
      return this.switchs === "双面玩法";
    }
  },
  mixins: [oddMixin]
};
</script>
<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
.betting {
  @include between;
  align-items: stretch;
  flex: 1;
  margin-top: poTorem(30px);
  overflow: scroll;

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
      padding: 0 poTorem(18px) 0 poTorem(24px);
      margin-top: poTorem(5px);
      &:last-child {
        border-bottom: none;
      }
      span {
        align-self: flex-start;
        color: #707070;
        font-size: poTorem(16px);
      }
      ul {
        &.lhd {
          justify-content: space-around;
        }
        @include start;
        width: 100%;
        flex-wrap: wrap;
        margin-bottom: poTorem(10px);
        li {
          position: relative;
          outline: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          @include center;
          width: poTorem(45px);
          height: poTorem(45px);
          border-radius: 50%;
          background: #fff;
          margin-left: poTorem(16px);
          margin-top: poTorem(10px);
          border: poTorem(1px) solid #dbdbdb;
          font-size: poTorem(20px);
          font-weight: 900;
          color: #e33939;
        }
        li.sm {
          height: auto;
          border-radius: unset;
          border: none;
          flex-wrap: wrap;
          .ball {
            display: inline-block;
            border: poTorem(1px) solid #dbdbdb;
            line-height: poTorem(43px);
            text-align: center;
            font-size: poTorem(20px);
            color: #e33939;
            height: poTorem(45px);
            width: poTorem(45px);
            border-radius: 50%;
            transition: background-color 0.2s ease;
          }
          .peilv_num {
            color: #707070;
            font-size: poTorem(12px);
          }
          > label {
            width: 100%;
            height: 100%;
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            input {
              opacity: 0;
              width: 100%;
              height: 100%;
              border: none;
            }
          }
          .choosed {
            background-color: #e33939;
            color: #fff !important;
            border: none;
          }
        }
      }
      .danshi {
        width: 100%;
        height: 100%;
        p {
          font-size: poTorem(16px);
          color: #535353;
        }
        .caution {
          color: $mainColor;
        }
        textarea {
          width: 100%;
          height: 100%;
          font-size: 1rem;
          letter-spacing: poTorem(2px);
          padding: poTorem(5px) poTorem(10px);
          border: poTorem(1px) solid #d3d3d3;
          border-radius: poTorem(5px);
          margin-bottom: poTorem(30px);
        }
      }
    }
  }
}
</style>
