<template>
  <!-- 投注界面 -->
  <div class="footballMulti-betting">
    <!-- {{hcData}}<br> {{glData}}
    <br>
    <br>{{selectedKey}} -->

    <!-- 全场 -->
    <div class="one-game one-game-single"
         v-if="hcData.filter(el=>el).length || glData.filter(el=>el).length">
      <yd-flexbox class="wanfa-title">
        <div class="orange">{{game.team_score}}</div>
        <yd-flexbox-item>{{game.rolling_time || moment(game.begin_time)}}</yd-flexbox-item>
        <div class="fixed-width">{{sport_id==2003?'独赢':'让球'}}</div>
        <div class="fixed-width">{{sport_id==2003?'让盘':'大/小'}}</div>
      </yd-flexbox>
      <yd-flexbox>
        <yd-flexbox-item class="vhcenter">
          <div class="team">{{game.h}} {{game.is_neutral?'[中]':'[主]'}}</div>
          <div class="team">{{game.v}}</div>
        </yd-flexbox-item>
        <div class="fixed-width">
          <!-- 让球 独赢-->
          <div :class="['is-betting column',{'lock-dist-bg': !el || !(el.p*1)},{selected: ifSelected(el, idx, 0)}]"
               v-for="(el,idx) in hcData"
               :key="el"
               @click="selectBet(el, idx, 0)">
            <template v-if="el && el.p && el.p !='/'">
              <p class="one-color-green"
                 v-if="el.k && el.k.includes('-')">{{el.k.replace('-','')}}</p>
              <p>{{getOdds(el.p)}}</p>
              <!-- el.p || '/' -->
              <i class="pl-float"
                 v-one-html="el.p"></i>
            </template>
            <template v-else>
              <img src="~img/football/lock-dist.png"
                   style="width: 1.2rem;" />
            </template>
          </div>
        </div>
        <div class="fixed-width">
          <!-- 大小 让盘-->
          <yd-flexbox :class="['is-betting',{'lock-dist-bg': !el || !(el.p*1)},{selected: ifSelected(el, idx, 1)}]"
                      v-for="(el,idx) in glData"
                      :key="el"
                      @click.native="selectBet(el, idx, 1)">
            <template v-if="el && el.p && el.p !='/'">
              <p v-if="sport_id!==2003"
                 style="padding:0 0.2rem;">{{idx === 0 ?'大':'小'}}</p>
              <yd-flexbox-item>
                <p class="one-color-green">{{getK(el.k)}}</p>
                <p>{{getOdds(el.p)}}</p>
              </yd-flexbox-item>
              <i class="pl-float"
                 v-one-html="el.p"></i>
            </template>
            <template v-else>
              <img src="~img/football/lock-dist.png"
                   style="width: 1.2rem;" />
            </template>
          </yd-flexbox>
        </div>
      </yd-flexbox>
      <div class="wanfa-title"
           @click="allGame()">
        <!-- v-if="!isMulti" -->
        所有玩法（{{game.all_bet_cnt * 1 || 0}}）
        <img src="~img/football/more-game.png"
             alt=""
             style="width: .8rem;transform: rotateZ(-90deg);">
      </div>
    </div>

  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
// import { playPMs, BTLists, getItem } from './allPlay/allPlay.const.js'
import dayjs from "dayjs";

export default {
  name: "footballMulti_betting",
  props: ["gameKey", "game", "leagueName"],
  data() {
    return {
      // path => bet_data
      // bet_obj:{}
    };
  },
  computed: {
    ...mapState("football", [
      "money",
      "sport_id",
      // "gameType",
      "playType",
      "bet_obj",
      "multiSelected",
      "bet_odds"
    ]),
    // 综合过关
    isMulti() {
      // 旧版是this.gameType === 3
      return this.playType === 4;
    },
    // 让球或独赢
    hcData() {
      let data = this.game.bet_data.HC || {};
      data = [data.H && data.H[0], data.V && data.V[0]];
      if (this.sport_id === 2003) {
        data = this.winData;
      }
      return data;
    },
    // 大小或让盘
    glData() {
      let data = this.game.bet_data.GL || {};
      data = [data.OV && data.OV[0], data.UN && data.UN[0]];
      if (this.sport_id === 2003) {
        data = this.shcData;
      }
      return data;
    },
    // 独赢
    winData() {
      const data = this.game.bet_data["1X2"] || ["", ""];
      data.sort((a, b) => a.k > b.k);
      return data;
    },
    // 让盘
    shcData() {
      let data = this.game.bet_data.SHC || {};
      data = [data.H && data.H[0], data.V && data.V[0]];
      return data;
    },
    palyKeys() {
      let palyKeys = ["HC", "GL"];
      if (this.sport_id === 2003) palyKeys = ["1X2", "SHC"];
      return palyKeys;
    },
    // 选中的投注
    selectedKey: {
      get() {
        return this.multiSelected;
      },
      set(selectedKey) {
        // console.error('selectedKey:',selectedKey)
        // 底部信息
        let bet_txt = "";
        if (this.isMulti) {
          bet_txt = selectedKey.length;
        } else if (selectedKey[0]) {
          const path = selectedKey[0].split("||");
          const arg = path.slice(1, path.length);
          let data = this.game.bet_data[arg[0]];
          // 1X2数组结构
          if (["1X2"].includes(arg[0])) {
            data = data.filter(el => el.k === arg[1])[0] || {};
          } else {
            data = data[arg[1]][0] || {};
          }
          switch (arg[0]) {
            case "HHC":
            case "HC":
            case "SHC":
              bet_txt = this.game[arg[1].toLowerCase()];
              if (data.k && data.k.includes("-")) {
                bet_txt += data.k.replace("-", "");
              }
              break;
            case "HGL":
            case "GL":
              bet_txt = arg[1] === "OV" ? "大" : "小";
              bet_txt += data.k;
              break;
            case "1X2":
              bet_txt = this.game[arg[1].toLowerCase()];
              break;
          }
        }

        const bet_data = selectedKey.map(el => this.bet_obj[el].bet_data);

        const params = {
          allPlay_schedule_id_prefix:
            this.gameKey + "-" + this.game.schedule_id,
          footer: !!selectedKey.length,
          min_stake: this.game.min_stake,
          max_stake: this.game.max_stake,
          bet_txt,
          bet_data,
          multiSelected: selectedKey
        };
        // console.error(params);
        this.modifyFootballField(params);
      }
    }
  },
  directives: {
    oneHtml: {
      // bind(el, { value, oldValue }, vnode) {
      // },
      update(el, { value, oldValue }) {
        const className = el.classList;
        className.remove("p_up", "p_down");
        if (value && oldValue && value > oldValue) {
          className.add("pl-up");
        } else if (value && oldValue && value < oldValue) {
          className.add("pl-down");
        }
      }
    }
  },
  activated() {},
  deactivated() {},
  methods: {
    ...mapActions("football", ["modifyFootballField"]),
    // 处理让盘里的k值
    getK(k) {
      if (this.sport_id === 2003) {
        if (k.includes("-")) return k.replace("-", "");
        return "";
      }
      return k;
    },
    // if mt == HC or GL
    // if hk > 1 eur = hk+1
    // 欧洲盘处理
    getOdds(p) {
      if (this.bet_odds == 1 && this.playType === 0 && p > 1) {
        return (p * 1 + 1).toFixed(2);
      }
      return p || "/";
    },
    ifSelected(data, idx, index) {
      // el && selectedKey.includes([gameKey+'-'+game.schedule_id,'HC',idx&&'V'||'H',el.k].join('||'))
      // el && selectedKey.includes([gameKey+'-'+game.schedule_id,'GL',idx&&'UN'||'OV',el.k].join('||'))
      if (!data || !(data.p * 1)) return;
      const palyKey = this.palyKeys[index];
      let teamKey = "";
      switch (palyKey) {
        case "HC":
        case "SHC":
          teamKey = (idx && "V") || "H";
          break;
        case "GL":
          teamKey = (idx && "UN") || "OV";
          break;
        case "1X2":
          teamKey = this.winData[idx].k;
          break;
      }
      let path = [this.gameKey + "-" + this.game.schedule_id, palyKey, teamKey];
      if (teamKey !== data.k) {
        path = [...path, data.k];
      }
      path = path.join("||");
      const selected = data && this.selectedKey.includes(path);
      return selected;
    },
    moment(t) {
      return dayjs(t).format("MM/DD HH:mm");
    },
    allGame() {
      // return this.$dialog.toast({
      //   mes: '暂未开放，敬请期待！',
      //   timeout: 1000
      // })
      const [allPlay_schedule_id_prefix, allPlayTeam] = [
        this.gameKey + "-" + this.game.schedule_id,
        this.game
      ];
      allPlayTeam.league_name = this.leagueName;
      this.modifyFootballField({ allPlay_schedule_id_prefix, allPlayTeam });
      this.$router.push("/football/allPlay");
    },
    selectBet(data, idx, index) {
      if (!data || !(data.p * 1)) return;
      const palyKey = this.palyKeys[index];
      let teamKey = "";
      let arg = [];
      switch (palyKey) {
        case "HC":
        case "SHC":
          teamKey = (idx && "V") || "H";
          break;
        case "GL":
          teamKey = (idx && "UN") || "OV";
          break;
        case "1X2":
          teamKey = this.winData[idx].k;
          break;
      }
      arg = [palyKey, teamKey];
      if (teamKey !== data.k) {
        arg = [...arg, data.k];
      }

      // 'HC',idx&&'V'||'H', el&&el.k|| 'nodata'
      // 'GL',idx&&'UN'||'OV',el&&el.k|| 'nodata'
      // console.error(arg);
      // const data = this.game.bet_data[arg[0]][arg[1]][0]
      const schedule_id = this.game.schedule_id;
      // console.error(schedule_id);
      const path = this.gameKey + "-" + schedule_id + "||" + arg.join("||");
      // let select = data.p > 0
      // if (!select) {
      //   return this.$dialog.toast({
      //     mes: '赔率异常'
      //   })
      // }
      // 同一场赛事只能投一注
      let selectedKey = JSON.parse(JSON.stringify(this.multiSelected));
      const idx_2 = selectedKey.findIndex(el => el.includes(schedule_id));
      // 综合过关
      if (this.isMulti) {
        if (idx_2 !== -1 && selectedKey[idx_2] === path) {
          selectedKey.splice(idx_2, 1);
        } else if (idx_2 !== -1 && selectedKey[idx_2] !== path) {
          selectedKey.splice(idx_2, 1, path);
        } else selectedKey.push(path);
      } else {
        selectedKey = idx_2 !== -1 && selectedKey[idx_2] === path ? [] : [path];
      }

      // 先保存当前选中的下注信息
      const bet_obj = JSON.parse(JSON.stringify(this.bet_obj));
      bet_obj[path] = {};
      bet_obj[path].bet_data = {
        bet_odds: (this.playType === 0 && this.bet_odds) || 0,
        history_id: this.game.history_id,
        k: data.k,
        p: data.p,
        play_method: arg[0],
        price: this.money,
        schedule_id: this.game.schedule_id,
        sport_id: this.sport_id,
        team: arg[1] === data.k ? "" : arg[1],
        team_score: this.game.team_score
      };
      this.modifyFootballField({ bet_obj });

      this.selectedKey = selectedKey;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~css/resources.scss";
.footballMulti-betting {
  user-select: none;
  text-align: left;
  font-size: 1rem;
  // padding: 0 0.7rem 0.7rem;
  // &:first-of-type {
  //   padding-top: 0.7rem;
  // }
  .lock-dist-bg {
    background-color: #f9f7f6;
  }
  .orange {
    color: $mainColor;
  }
  .pl-float {
    width: 1rem;
    height: 1rem;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background-repeat: no-repeat;
    background-size: 80% auto;
  }
  .pl-up {
    background-image: url(~img/football/p_up.png);
  }
  .pl-down {
    background-image: url(~img/football/p_down.png);
  }
  .is-betting.selected {
    background-color: #ef0404;
    color: #ffffff;
    font-weight: 600;
    border-color: #ef0404 !important;
    .one-color-green {
      color: #ffffff;
    }
  }
  .fixed-width {
    width: 6rem;
    text-align: center;
  }
  .vhcenter {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .team {
    padding: 1rem 0.7rem;
  }
  .is-betting {
    position: relative;
    margin: 1rem 0.5rem;
    // line-height: 2rem;
    min-height: 3rem;
    font-size: 1rem;
    border: 1px solid #dddddd;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.2rem;
  }
  .column {
    flex-direction: column;
  }
  .one-game-single {
    box-shadow: 0px 0px 0.3rem #b2b2b2;
    .yd-flexbox {
      // border-top: 1px solid #dddddd;
    }
  }
  .one-game {
    margin-bottom: 0.7rem;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    .wanfa-title {
      color: #313131;
      line-height: 2rem;
      font-size: 1.2rem;
      padding: 0.7rem;
      background-color: #f5f5f5;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      text-align: center;
    }
  }
}
</style>
