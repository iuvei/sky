<template>
  <!-- 投注界面 -->
  <div class="allPlay-betting">
    <!-- {{gameKey}}<br> {{game}}
    <br>{{selectedKey}} -->

    <!-- 一般的数组结构-->
    <div v-if="renderType === 'Array'"
         class="one-game one-game-multi">
      <yd-flexbox v-for="(el,line) in game"
                  :key="line"
                  class="betting-group betting-row gl-wrap">
        <yd-flexbox-item>{{getItem(el.k)}}</yd-flexbox-item>
        <div class="is-betting"
             v-one-html="renderHtml(line,el)"
             @click="selectBet(line,el)"></div>
      </yd-flexbox>
    </div>
    <!-- 一般的数组结构 如 独赢 主客和-->
    <div v-if="renderType === '1X2'"
         class="one-game one-game-multi">
      <yd-flexbox v-for="(el,line) in game"
                  :key="line"
                  class="betting-group betting-row gl-wrap">
        <yd-flexbox-item>{{getItem(el.k)}}</yd-flexbox-item>
        <div class="is-betting"
             v-one-html="renderHtml(line,el)"
             @click="selectBet(line,el)"></div>
      </yd-flexbox>
    </div>
    <!-- 一般的数组结构 如 单双-->
    <div v-if="renderType === 'TGOE'"
         class="one-game one-game-multi">
      <yd-grids-group :rows="renderCol"
                      class="betting-row">
        <yd-grids-item v-for="(el,line) in game"
                       :key="line">
          <div slot="else"
               class="gl-wrap">
            <div>{{getItem(el.k)}}</div>
            <div class="is-betting"
                 v-one-html="renderHtml(line,el)"
                 @click="selectBet(line,el)"></div>
          </div>
        </yd-grids-item>
      </yd-grids-group>
    </div>

    <!-- 一般的object结构 如 让球 主客队 -->
    <div v-if="renderType === 'Object'"
         class="one-game one-game-single">
      <!-- <div class="wanfa-title" v-html="getTitle(gameKey)"></div> -->
      <div v-for="line in resolveObj.row"
           :key="line"
           class="betting-group">
        <yd-flexbox v-for="col in resolveObj.keys"
                    :key="col"
                    class="betting-row">
          <yd-flexbox-item>{{getItem(col)}}</yd-flexbox-item>
          <div class="is-betting"
               v-one-html="renderHtml(col,line-1,game[col][line-1])"
               @click="selectBet(col,line-1,game[col][line-1])"></div>
        </yd-flexbox>
      </div>
    </div>
    <!-- 一般的object结构 如 大小 -->
    <div v-if="renderType === 'GL'"
         class="one-game one-game-multi">
      <yd-grids-group v-for="line in resolveObj.row"
                      :key="line"
                      rows="2"
                      class="betting-group betting-row">
        <yd-grids-item v-for="col in resolveObj.keys"
                       :key="col">
          <div slot="else"
               class="gl-wrap">
            <div>{{getItem(col)}}</div>
            <div class="is-betting"
                 v-one-html="renderHtml(col,line-1,game[col][line-1])"
                 @click="selectBet(col,line-1,game[col][line-1])"></div>
          </div>
        </yd-grids-item>
      </yd-grids-group>
    </div>

    <!-- 二级json，带副标题 -->
    <div v-if="renderType === 'twoLevels'"
         class="one-game one-game-multi">
      <!-- <div class="wanfa-title" v-html="getTitle(gameKey)"></div> -->
      <div v-for="(row, idx) in game"
           :key="row">
        <div v-html="getSubTitle(idx)"
             class="sub-title"></div>
        <yd-flexbox v-for="(col,twoKey) in row"
                    :key="twoKey"
                    class="betting-row gl-wrap">
          <yd-flexbox-item>{{getItem(col.k)}}</yd-flexbox-item>
          <div class="is-betting"
               v-one-html="renderHtml(idx,twoKey,col)"
               @click="selectBet(idx,twoKey,col)"></div>
        </yd-flexbox>
        <!-- <yd-grids-group rows="2">
          <yd-grids-item v-for="(col,twoKey) in row" :key="twoKey">
            <div slot="else" class="is-betting" v-one-html="renderHtml(idx,twoKey,col)" @click="selectBet(idx,twoKey,col)"></div>
          </yd-grids-item>
        </yd-grids-group> -->
      </div>
    </div>

    <!-- 二级json，带副标题 如 波胆-->
    <div v-if="renderType === 'TCS'"
         class="one-game one-game-multi">
      <yd-flexbox class="tcs-header">
        <yd-flexbox-item>1</yd-flexbox-item>
        <yd-flexbox-item>X</yd-flexbox-item>
        <yd-flexbox-item>2</yd-flexbox-item>
      </yd-flexbox>
      <yd-flexbox>
        <yd-flexbox-item class="tcs-wrap">
          <div class="is-betting"
               v-for="(el, idx) in game.H"
               :key="idx"
               v-one-html="renderHtml('H',idx,el)"
               @click="selectBet('H',idx,el)"></div>
        </yd-flexbox-item>
        <yd-flexbox-item class="tcs-wrap">
          <div class="is-betting"
               v-for="(el, idx) in game.X"
               :key="idx"
               v-one-html="renderHtml('X',idx,el)"
               @click="selectBet('X',idx,el)"></div>
        </yd-flexbox-item>
        <yd-flexbox-item class="tcs-wrap">
          <div class="is-betting"
               v-for="(el, idx) in game.V"
               :key="idx"
               v-one-html="renderHtml('V',idx,el)"
               @click="selectBet('V',idx,el)"></div>
        </yd-flexbox-item>
      </yd-flexbox>
      <yd-flexbox class="tcs-footer">
        <yd-flexbox-item>
          其他
        </yd-flexbox-item>
        <yd-flexbox-item>
          &nbsp;
        </yd-flexbox-item>
        <yd-flexbox-item class="tcs-wrap">
          <div class="is-betting"
               v-one-html="renderHtml('O',0,game.O[0])"
               @click="selectBet('O',0,game.O[0])"></div>
        </yd-flexbox-item>
      </yd-flexbox>
    </div>

    <!-- 三级json，带副标题 如 独赢&进球大/小-->
    <div v-if="renderType === 'threeLevels'"
         class="one-game one-game-multi">
      <div v-for="line in resolveObj.row"
           :key="line">
        <yd-flexbox class="tcs-header">
          <yd-flexbox-item v-for="team in resolveObj.subTitleKey"
                           :key="team">{{getSubTitle(team)}}</yd-flexbox-item>
        </yd-flexbox>
        <yd-flexbox>
          <yd-flexbox-item v-for="k1 in resolveObj.subTitleKey"
                           :key="k1"
                           class="tcs-wrap">
            <div v-for="k2 in resolveObj.keys"
                 :key="k2"
                 class="is-betting"
                 v-one-html="renderHtml(k1,k2,line-1,game[k1][k2][line-1])"
                 @click="selectBet(k1,k2,line-1,game[k1][k2][line-1])"></div>
          </yd-flexbox-item>
        </yd-flexbox>
      </div>
    </div>

    <!-- 有三级，四级json，带副标题,特别的UI -->
    <div v-if="renderType === '15M'"
         class="one-game one-game-multi">
      <!-- <div class="wanfa-title" v-html="getTitle(gameKey)"></div> -->
      <div v-for="k1 in resolveObj.subTitleKey"
           :key="k1">
        <div v-for="k2 in resolveObj.keys"
             :key="k2">
          <div v-html="getSubTitle(k1,k2)"
               class="sub-title"></div>
          <template v-if="k2 == '1X2'">
            <yd-flexbox v-for="(el,line) in game[k1][k2]"
                        :key="line"
                        class="betting-row gl-wrap">
              <yd-flexbox-item>{{getItem(el.k)}}</yd-flexbox-item>
              <div class="is-betting"
                   v-one-html="renderHtml(k1,k2,line,el)"
                   @click="selectBet(k1,k2,line,el)"></div>
            </yd-flexbox>
          </template>
          <template v-if="k2 == 'HC'">
            <div v-for="(arr, k3) in game[k1][k2]"
                 :key="k3">
              <yd-flexbox v-for="(el, line) in arr"
                          :key="line"
                          class="betting-row">
                <yd-flexbox-item>{{getItem(k3)}}</yd-flexbox-item>
                <div class="is-betting"
                     v-one-html="renderHtml(k1,k2,k3,line,el)"
                     @click="selectBet(k1,k2,k3,line,el)"></div>
              </yd-flexbox>
            </div>
          </template>
          <template v-if="k2 == 'GL'">
            <yd-flexbox v-for="(el, line) in game[k1][k2].OV"
                        :key="line"
                        class="betting-row">
              <yd-flexbox-item>大</yd-flexbox-item>
              <div class="is-betting"
                   v-one-html="renderHtml(k1,k2,'OV',line,el)"
                   @click="selectBet(k1,k2,'OV',line,el)"></div>
              <yd-flexbox-item>小</yd-flexbox-item>
              <div class="is-betting"
                   v-one-html="renderHtml(k1,k2,'UN',line,game[k1][k2].UN[line])"
                   @click="selectBet(k1,k2,'UN',line,game[k1][k2].UN[line])"></div>
            </yd-flexbox>
          </template>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { playPMs, BTLists, getItem } from "./allPlay.const.js";
import max from "lodash/max";
import forEach from "lodash/forEach";

const icons = [
  require("img/football/p_up.png"),
  require("img/football/p_down.png"),
  require("img/football/lock-dist.png")
];
const twoLevels = [
  "TCS",
  "HTCS",
  "1X2BTS",
  "1X2FG",
  "DCBTS",
  "DCFTS",
  "WM",
  "FLG"
];
const threeLevels = ["1X2GL", "DCGL", "GLTGOE", "GLFTS", "GLBTS"];
// m15:有三级四级json，特别的渲染方式
const m15 = ["15M"];
// unUse:不使用的数据结构
// TNC: {
//   OV: {
//     k: '13',
//     p: 0.00
//   },
//   EQU: {
//     k: '13',
//     p: 0.00
//   },
//   UN: {
//     k: '13',
//     p: 0.00
//   }
// }
const unUse = ["TNC", "2WCIP", "3WHC"];
// 普通玩法
// const basePlay = [
//   ...['H1X2', 'HHC', 'HGL', 'HTGOE', 'HTCS', 'HTG'],
//   ...['1X2', 'HC', 'GL', 'TGOE', 'TCS', 'TG', 'HFT']
// ]
export default {
  name: "allPlay_betting",
  props: ["gameKey", "game"],
  data() {
    return {
      // bet_obj => path => { bet_txt, bet_data }
      // bet_obj: {}
    };
  },
  computed: {
    ...mapGetters("football", ["schedule_id"]),
    ...mapState("football", [
      "money",
      "sport_id",
      "gameType",
      "playType",
      "allPlayTeam",
      "bet_obj",
      "multiSelected"
    ]),
    // 综合过关
    isMulti() {
      // 旧版是this.gameType === 3
      return this.playType === 4;
    },
    // 选中的投注
    selectedKey: {
      get() {
        return this.multiSelected;
      },
      set(selectedKey) {
        // 底部信息
        let bet_txt = "";
        const bet_data = selectedKey.map(el => {
          const bet_obj = this.bet_obj[el];
          bet_txt = bet_obj.bet_txt;
          return bet_obj.bet_data;
        });

        if (this.isMulti) {
          bet_txt = selectedKey.length;
        }
        const params = {
          multiSelected: selectedKey,
          footer: !!selectedKey.length,
          min_stake: this.allPlayTeam.min_stake,
          max_stake: this.allPlayTeam.max_stake,
          bet_txt,
          bet_data
        };
        this.modifyFootballField(params);
      }
    },

    /**
     * 解析对象为多少行，多少列
     * isThreeLevels 是否渲染成带副标题的多个table，为true时，subTitleKey 才有值，第一层关键字，数组类型
     * keys 最后的关键字,数组类型
     * row  行数,数字类型
     */
    resolveObj() {
      let keys = Object.keys(this.game);
      let lengths = keys.map(el => this.game[el].length);
      const isThreeLevels = !Array.isArray(this.game[keys[0]]);
      let subTitleKey = "";
      if (isThreeLevels) {
        subTitleKey = keys;
        keys = Object.keys(this.game[keys[0]]);
        lengths = subTitleKey.map(sub =>
          max(keys.map(el => this.game[sub][el].length))
        );
      }

      return {
        isThreeLevels,
        subTitleKey,
        keys,
        row: max(lengths)
      };
    },
    // 定制一行放几列
    renderCol() {
      const type = this.gameKey;
      switch (type) {
        case "1X2":
        case "H1X2":
          return 3;

        default:
          return 2;
      }
    },
    /**
     * 定制渲染类型
     */
    renderType() {
      if (["TCS", "HTCS"].includes(this.gameKey)) return "TCS";
      if (["TGOE", "HTGOE"].includes(this.gameKey)) return "TGOE";
      if (
        [
          "GL",
          "HGL",
          "GLH",
          "HGLH",
          "GLV",
          "HGLV",
          "GLHT1",
          "GLHT2",
          "GLQ1",
          "GLQ2",
          "GLQ3",
          "GLQ4",
          "TGL",
          "TGLH",
          "TGLV",
          "GLS1",
          "GLS2",
          "GLS3",
          "GLS4",
          "GLS5",
          "GLHHT1",
          "GLHHT2",
          "GLVHT1",
          "GLVHT2",
          "GLHQ1",
          "GLHQ2",
          "GLHQ3",
          "GLHQ4",
          "GLVQ1",
          "GLVQ2",
          "GLVQ3",
          "GLVQ4"
        ].includes(this.gameKey)
      ) {
        return "GL";
      }
      if (["1X2", "H1X2"].includes(this.gameKey)) return "1X2";
      if (twoLevels.includes(this.gameKey)) return "twoLevels";
      if (threeLevels.includes(this.gameKey)) return "threeLevels";
      if (m15.includes(this.gameKey)) return "15M";
      if (unUse.includes(this.gameKey)) return "Array";

      // Object.prototype.toString.call(this.game)  => [object Array]
      const type = Array.isArray(this.game) ? "Array" : "Object";
      return type;
    }
  },
  directives: {
    oneHtml: {
      bind(el, { value }) {
        if (!value) return;
        el.innerHTML = value.html;
        // 添加选中样式
        el.classList[value.selected ? "add" : "remove"]("selected");

        // 处理没赔率的情况
        if (!value.data || !(value.data.p * 1)) {
          el.innerHTML = `<img src="${icons[2]}" style="width: 1.2rem;">`;
          el.classList = "is-betting lock-dist-bg";
        }
      },
      update(el, { value, oldValue }) {
        if (
          !value ||
          (value.selected === oldValue.selected &&
            value.data.p === oldValue.data.p)
        ) {
          return;
        }
        let img = "";
        // 赔率上升下降
        const last_p = oldValue.data.p * 1;
        const cur_p = value.data.p * 1;
        if (value.path === oldValue.path && cur_p > last_p) {
          img = `<img src="${icons[0]}" class="pv-float">`;
        } else if (value.path === oldValue.path && cur_p < last_p) {
          img = `<img src="${icons[1]}" class="pv-float">`;
        }
        // console.error(cur_p , last_p);

        el.innerHTML = value.html + img;
        // 添加选中样式
        el.classList[value.selected ? "add" : "remove"]("selected");

        // 处理没赔率的情况
        if (!value.data || !(value.data.p * 1)) {
          el.innerHTML = `<img src="${icons[2]}" style="width: 1.2rem;">`;
          el.classList = "is-betting lock-dist-bg";
        }
      }
    }
  },
  activated() {},
  deactivated() {},
  methods: {
    ...mapActions("football", ["modifyFootballField"]),
    /**
     * 渲染15M，4级json 时计算需渲染多少行
     */
    getLine(data) {
      let arr = [];
      forEach(data, el => (arr = [...arr, el.length]));
      return max(arr) || 0;
    },
    getTitle(key) {
      const item = getItem(playPMs, key);
      let str = item.name;
      if (item.target) {
        str += " - <i class='subTitle-orange'>" + item.target + "</i>";
      }
      str +=
        " -（主）— <i class='subTitle-orange'>" + this.allPlayTeam.h + "</i>";
      str +=
        "VS（客）— <i class='subTitle-orange'>" + this.allPlayTeam.v + "</i>";
      return str;
    },
    getSubTitle(key, subKey) {
      let title = getItem(BTLists, key).name;
      if (subKey) title += " - " + getItem(playPMs, subKey).name;
      return title;
    },
    // 模板里使用
    getItem(k) {
      if (["H", "V", "X"].includes(k)) {
        return this.allPlayTeam[k.toLowerCase()] || "和局";
      }
      let topTxt = getItem(BTLists, k).name;
      switch (this.gameKey) {
        case "WM":
          switch (k) {
            case "0-0":
              topTxt = k;
              break;
            case "o":
              topTxt = "任何进球和局";
              break;
            default:
              topTxt = "净胜" + k + "球";
              break;
          }
          break;
        case "FLG":
          topTxt = topTxt || "无进球";
          break;
      }
      topTxt = topTxt || k;
      return topTxt;
    },
    /**
     * 参数 arg = 当前全路径 + 当前要渲染的data
     * 返回对象 { path, data , html, select, selected }
     */
    renderHtml(...arg) {
      // console.error(this.gameKey + ":" + JSON.stringify(arg));
      const data = arg.pop();
      if (!data) return { data: 0, select: false };

      // 替换最后一位索引值为k值
      arg[arg.length - 1] = data.k;

      const path =
        this.schedule_id + "||" + this.gameKey + "||" + arg.join("||");
      const exist = this.multiSelected.indexOf(path);
      let html = "";
      const select = data.p > 0;
      const selected = select && exist !== -1;
      let k = data.k;

      // 计算下注数据，关键参数  team  subkey
      let team =
        arg[arg.length - 3] || arg[arg.length - 2] || arg[arg.length - 1];
      team = (typeof team === "string" && team !== data.k && team) || "";
      let subkey = arg[arg.length - 2] || arg[arg.length - 1];
      subkey =
        (typeof subkey === "string" &&
          subkey !== team &&
          team !== "" &&
          subkey) ||
        "";

      const idx = subkey || team || k;
      let topTxt = getItem(BTLists, idx).name || k;
      if (!select && exist !== -1) {
        const selectedKey = JSON.parse(JSON.stringify(this.multiSelected));
        selectedKey.splice(exist, 1);
        this.selectedKey = selectedKey;
      }

      // 让球特别处理k值
      if (
        [
          "HC",
          "HHC",
          "HCHT1",
          "HCHT2",
          "HCQ1",
          "HCQ2",
          "HCQ3",
          "HCQ4",
          "GHC",
          "SHC",
          "HCS1",
          "HCS2",
          "HCS3",
          "HCS4",
          "HCS5"
        ].includes(this.gameKey) ||
        ["HC", "HHC"].includes(subkey)
      ) {
        k = k.includes("-") ? k.substr(1) : "";
      }

      switch (this.gameKey) {
        case "1X2FG":
        case "HTCS":
        case "TCS":
        case "DCFTS":
        case "DCBTS":
        case "1X2BTS":
          topTxt = getItem(BTLists, k).name || k;
          html = `<div class="top-txt">${topTxt}</div>`;
          if (
            (["TCS", "HTCS"].includes(this.gameKey) && k === "o") ||
            ["1X2FG", "DCBTS", "DCFTS"].includes(this.gameKey)
          ) {
            html = "";
          }
          html += `<div class="bottom-txt"><span class="pl-color">${
            data.p
          }</span></div>`;
          break;
        case "FLG":
          // topTxt = getItem(BTLists, k).name || '无进球'
          html = `<div class="top-txt">${topTxt}</div>`;
          html += `<div class="bottom-txt"><span class="pl-color">${
            data.p
          }</span></div>`;
          break;
        case "WM":
          switch (k) {
            case "0-0":
              topTxt = k;
              break;
            case "o":
              topTxt = "任何进球和局";
              break;
            default:
              topTxt = "净胜" + k + "球";
              break;
          }
          // html = `<div class="top-txt">${topTxt}</div>`
          html += `<div class="bottom-txt"><span class="pl-color">${
            data.p
          }</span></div>`;
          break;
        case "GLTGOE":
        case "GLFTS":
        case "GLBTS":
        case "GLH":
        case "GLV":
        case "HGLH":
        case "HGLV":
        case "TNC":
        case "2WCIP":
        case "3WHC":
        case "1X2GL":
        case "DCGL":
        case "HGL":
        case "GL":
        case "HHC":
        case "HC":
        case "HCHT1":
        case "HCHT2":
        case "HCQ1":
        case "HCQ2":
        case "HCQ3":
        case "HCQ4":
        case "GHC":
        case "SHC":
        case "HCS1":
        case "HCS2":
        case "HCS3":
        case "HCS4":
        case "HCS5":
          html = `<div class="top-txt k-color">${k}</div>`;
          html += `<div class="bottom-txt"><span class="pl-color">${
            data.p
          }</span></div>`;
          break;
        case "15M":
          // 15M 独赢 不要显示 left_k
          if (subkey !== "1X2") html += `<div class="top-txt">${k}</div>`;
          html += `<div class="bottom-txt"><span class="pl-color">${
            data.p
          }</span></div>`;
          break;
        default:
          // html = `<div class="top-txt">${topTxt}</div>`
          html += `<div class="bottom-txt"><span class="pl-color">${
            data.p
          }</span></div>`;
          break;
      }

      // 计算下注信息
      const bet_txt =
        ((team && data.k !== team && getItem(BTLists, team).name) || "") +
        " " +
        ((subkey && data.k !== subkey && getItem(BTLists, subkey).name) || "") +
        " " +
        ((data.k && getItem(BTLists, data.k).name) || k);
      // const is_all_method = basePlay.includes(this.gameKey) ? '' : 1
      const bet_data = {
        history_id: this.allPlayTeam.history_id,
        k: data.k,
        p: data.p,
        play_method: this.gameKey,
        price: this.money,
        schedule_id: this.allPlayTeam.schedule_id,
        sport_id: this.sport_id,
        team_score: this.allPlayTeam.team_score,
        team,
        subkey,
        is_all_method: 1,
        bet_odds: 1
      };

      return {
        path,
        data,
        html,
        select,
        selected,
        bet_txt,
        bet_data
      };
    },
    selectBet(...arg) {
      // console.error(arg);
      const allArg = Object.assign([], arg);
      const data = arg.pop();
      if (!data) return;

      // 替换最后一位索引值为k值
      arg[arg.length - 1] = data.k;

      const path =
        this.schedule_id + "||" + this.gameKey + "||" + arg.join("||");
      const select = data.p > 0;
      if (!select) {
        return;
        // this.$dialog.toast({
        //   mes: '赔率异常'
        // })
      }

      // 同一场赛事只能投一注
      const schedule_id = this.allPlayTeam.schedule_id;
      let selectedKey = JSON.parse(JSON.stringify(this.multiSelected));
      const idx = selectedKey.findIndex(el => el.includes(schedule_id));
      // 综合过关
      if (this.isMulti) {
        if (idx !== -1 && selectedKey[idx] === path) selectedKey.splice(idx, 1);
        else if (idx !== -1 && selectedKey[idx] !== path) {
          selectedKey.splice(idx, 1, path);
        } else selectedKey.push(path);
      } else {
        selectedKey = idx !== -1 && selectedKey[idx] === path ? [] : [path];
      }

      // 先保存当前选中的下注信息
      const big_data = this.renderHtml(...allArg);
      const bet_obj = JSON.parse(JSON.stringify(this.bet_obj));
      bet_obj[path] = {
        hg_id: this.allPlayTeam.hg_id,
        bet_txt: big_data.bet_txt,
        bet_data: big_data.bet_data
      };
      this.modifyFootballField({ bet_obj });

      this.selectedKey = selectedKey;
    }
  }
};
</script>
<style lang="scss">
@import "~css/resources.scss";
.allPlay-betting {
  .lock-dist-bg {
    background-color: #f9f7f6;
  }
  .subTitle-orange {
    color: $mainColor;
  }
  .left_k {
    padding-right: 0.3rem;
  }
  .k-color {
    color: #2cab3f;
  }
  // .pl-color {
  //   color: #c51919;
  // }
  .pv-float {
    width: 0.6rem;
    position: absolute;
    right: 1rem;
    top: 46%;
  }
  // .is-betting .bottom-txt {
  //   line-height: 1.5rem;
  // }
  .is-betting .top-txt {
    width: 100%;
    // line-height: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    /* autoprefixer: off */
    // -webkit-box-orient: vertical;
    /* autoprefixer: on */
  }
  .is-betting.selected {
    .pl-color,
    .k-color {
      color: #ffffff;
    }
  }
  .yd-grids-item .selected {
    transform: scaleY(0.97);
    // transform: translateY(-0.5px);
  }
  div[class^="yd-grids-"] {
    background-color: transparent;
    &::before,
    .yd-grids-item:after {
      border-bottom: none;
    }
    .yd-grids-item::before {
      border-right: none;
    }
  }
}
</style>
<style lang="scss" scoped>
.allPlay-betting {
  user-select: none;
  text-align: left;
  font-size: 1rem;
  // padding: 0 0.7rem 0.7rem;
  // &:first-of-type {
  //   padding-top: 0.7rem;
  // }
  .betting-group:nth-child(even) {
    background-color: #f9f8f6;
  }
  .betting-row {
    padding: 0.7rem 1rem;
  }
  .tcs-header {
    text-align: center;
    background-color: #f9f8f6;
    padding: 0.7rem;
  }
  .tcs-footer {
    text-align: center;
    background-color: #f9f8f6;
  }
  .tcs-wrap {
    align-self: start;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.7rem;
    .is-betting {
      margin-top: 0.7rem;
    }
  }
  .gl-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
  }
  .is-betting {
    width: 6rem;
    border: 1px solid #d2d2d2;
    // box-shadow: 0px 0px 0px 1px #d2d2d2 inset;
    border-radius: 0.2rem;
    position: relative;
    text-align: center;
    min-height: 3rem;
    font-size: 1rem;
    color: #676767;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .is-betting.selected {
    background-color: #ef0404;
    color: #ffffff;
    font-weight: 600;
    border-color: #ef0404;
    // box-shadow: 0px 0px 0px 1px #ef0404 inset;
  }
  .yd-grids-item:nth-child(n + 2),
  .yd-flexbox-item:nth-child(n + 2) {
    padding-left: 1rem !important;
  }
  .one-game-multi {
    // border-left: 1px solid #b2b2b2;
    // border-top: 1px solid #b2b2b2;
    // border-right: 1px solid #b2b2b2;
    // box-shadow: 0px 0px 0.3rem #b2b2b2;
    .yd-grids-item {
      padding: 0;
    }
  }
  .one-game-single {
    // border: 1px solid #b2b2b2;
    // box-shadow: 0px 0px 0.3rem #b2b2b2;
    .yd-flexbox {
      // border-top: 1px solid #dddddd;
      // .yd-flexbox-item:nth-child(n + 2) {
      //   border-left: 1px solid #dddddd;
      // }
    }
  }
  .one-game {
    .wanfa-title {
      color: #313131;
      line-height: 2rem;
      font-size: 1.2rem;
      padding: 0.5rem 1rem;
      background-color: #f5f5f5;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
    }
    .sub-title {
      color: #313131;
      line-height: 2rem;
      font-size: 1.2rem;
      // border-top: 1px solid #dddddd;
      text-align: left;
      padding: 0.5rem 1rem;
      background-color: #f9f8f6;
    }
    .wanfa-title + div .sub-title {
      border-top: 1px solid #dddddd;
    }
  }
}
</style>
