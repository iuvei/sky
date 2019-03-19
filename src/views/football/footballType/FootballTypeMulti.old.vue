<template>
  <yd-layout class="multi-play">
    <yd-pullrefresh :callback="refreshData"
                    :show-init-tip="false"
                    ref="pullrefresh_ref"
                    class="refresh">
      <yd-infinitescroll :callback="loadMore"
                         ref="loadMore_ref">

        <yd-accordion accordion
                      class="yd-list"
                      slot="list">
          {{this.selectedKey}}<br>
          <AppEmpty v-if="!gameList.length"></AppEmpty>
          <yd-accordion-item v-for="(league, league_index) in gameList"
                             :key="league_index"
                             :title="league.league_name">
            <div v-for="(game, game_index) in league.schedule"
                 :key="game_index + '-' + game.schedule_id"
                 class="one-game">
              <div class="one-game-header">
                <yd-flexbox class="one-game-header-title">
                  <yd-flexbox-item>{{game.h}}{{game.is_neutral}} {{game.is_neutral?'[中]':'[主]'}}</yd-flexbox-item>
                  <div>{{game.team_score || 'vs'}}</div>
                  <yd-flexbox-item>{{game.v}}</yd-flexbox-item>
                </yd-flexbox>
                <p class="one-game-header-time">{{game.is_corner?'角球盘':''}} {{game.rolling_time || moment(game.begin_time)}}</p>
              </div>

              <yd-flexbox class="one-table">
                <div class="one-table-left">独赢</div>
                <yd-flexbox-item v-one-html="renderHtml(game_index, game, 0, 0)"
                                 class="select-btn"
                                 @click.native="selectBet(game_index, game, 0, 0)">
                </yd-flexbox-item>
                <yd-flexbox-item v-one-html="renderHtml(game_index, game, 0, 1)"
                                 class="select-btn"
                                 @click.native="selectBet(game_index,game, 0, 1)">
                </yd-flexbox-item>
                <yd-flexbox-item v-one-html="renderHtml(game_index, game, 0, 2)"
                                 class="select-btn"
                                 @click.native="selectBet(game_index, game, 0 , 2)">
                </yd-flexbox-item>
                <div class="one-table-right">
                  <div class="border-bottom-no">
                    <yd-badge :class="!bet_obj[game_index + '-' + game.schedule_id] || !bet_obj[game_index + '-' + game.schedule_id].half ? 'bage-active' : 'bage-default'"
                              @click.native="halfClick(game_index + '-' + game.schedule_id, false)">全场</yd-badge>
                  </div>
                </div>
              </yd-flexbox>

              <yd-flexbox class="one-table">
                <div class="one-table-left">让球</div>
                <yd-flexbox-item v-one-html="renderHtml(game_index, game, 1, 0)"
                                 class="select-btn"
                                 @click.native="selectBet(game_index, game, 1, 0)">
                </yd-flexbox-item>
                <yd-flexbox-item class="select-btn"> &nbsp; </yd-flexbox-item>
                <yd-flexbox-item v-one-html="renderHtml(game_index, game, 1, 2)"
                                 class="select-btn"
                                 @click.native="selectBet(game_index, game, 1, 2)">
                </yd-flexbox-item>
                <div class="one-table-right">
                  <yd-badge :class="bet_obj[game_index + '-' + game.schedule_id] && bet_obj[game_index + '-' + game.schedule_id].half ? 'bage-active' : 'bage-default'"
                            @click.native="halfClick(game_index + '-' + game.schedule_id, true)">半场</yd-badge>
                </div>
              </yd-flexbox>

              <yd-flexbox class="one-table">
                <div class="one-table-left">大小</div>
                <yd-flexbox-item v-one-html="renderHtml(game_index, game, 2, 3)"
                                 class="select-btn"
                                 @click.native="selectBet(game_index, game, 2, 3)">
                </yd-flexbox-item>
                <yd-flexbox-item class="select-btn"> &nbsp; </yd-flexbox-item>
                <yd-flexbox-item v-one-html="renderHtml(game_index, game, 2, 4)"
                                 class="select-btn"
                                 @click.native="selectBet(game_index, game, 2, 4)">
                </yd-flexbox-item>
                <div @click="allGame(game_index + '-' + game.schedule_id,game)"
                     class="one-table-right">
                  <div class="border-bottom-no more-game-open">
                    <p>所有</p>
                    <p>玩法</p>
                    <img src="~img/football/more-game.png"
                         alt=""
                         style="width: .8rem">
                  </div>
                </div>
              </yd-flexbox>

              <yd-flexbox class="one-table">
                <div class="one-table-left">单双</div>
                <yd-flexbox-item v-one-html="renderHtml(game_index, game, 3, 5)"
                                 class="select-btn"
                                 @click.native="selectBet(game_index, game, 3, 5)">
                </yd-flexbox-item>
                <yd-flexbox-item class="select-btn"> &nbsp; </yd-flexbox-item>
                <yd-flexbox-item v-one-html="renderHtml(game_index, game, 3, 6)"
                                 class="select-btn"
                                 @click.native="selectBet(game_index, game, 3, 6)">
                </yd-flexbox-item>
                <div @click="allGame(game_index + '-' + game.schedule_id,game)"
                     class="one-table-right">

                </div>
              </yd-flexbox>
            </div>

          </yd-accordion-item>

        </yd-accordion>

        <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
      </yd-infinitescroll>
    </yd-pullrefresh>
  </yd-layout>
</template>

<script>
import get from "lodash/get";
import debounce from "lodash/debounce";
import reduce from "lodash/reduce";
import { mapActions, mapState } from "vuex";
import dayjs from "dayjs";

const icons = [
  require("img/football/p_up.png"),
  require("img/football/p_down.png")
];
export default {
  name: "footballTypeMulti",
  data() {
    return {
      pullRefresh: true, // 标识符： 刷新  加载下一页
      next_time: "", // 时间分页
      league_id_current: "", // 联赛id多个以逗号隔开
      fields: ["1X2", "HC", "GL", "TGOE"], // 独赢  让球  大小  单双
      l_fields: ["H", "X", "V", "OV", "UN", "Odd", "Even"], // 最后的字段名或者关键字查找
      selectedKey: [], // game_index  +  schedule_id  保证唯一id
      gameList: [], // 列表大对象
      bet_obj: {} // 对应数据格式如下
      // bet_obj: {
      //   ...schedule_id: {half:false},
      //   ...selectedKey: bet_data
      // }
    };
  },
  computed: {
    ...mapState("football", ["allPlay_schedule_id_prefix"]),
    ...mapState("football", [
      "footer",
      "gameType",
      "playTypeMap",
      "playType",
      "sport_id",
      "money",
      "leagueList",
      "timeCount",
      "zhgg_preview",
      "bet_data"
    ])
  },
  mounted() {
    this.getGameList();
  },
  activated() {
    this.getGameList();
  },
  beforeDestroy() {},
  watch: {
    gameType() {
      // 清除下注
      this.pullRefresh = true;
      this.modifyFootballField({ footer: false });
      // this.selectedKey = [];
      this.bet_obj = {};
      this.gameList = [];
      this.league_id_current = "";
      this.getGameList();
    },
    // selectedKey  bet_data  保持一致
    bet_data(bet_data) {
      if (bet_data.length === 0) {
        this.selectedKey = [];
        return;
      }

      if (bet_data.length !== this.selectedKey.length) {
        bet_data.map(item => {
          const { is_all_method, play_method, schedule_id, team, k } = item;
          const key =
            (is_all_method ? this.allPlay_schedule_id_prefix : schedule_id) +
            play_method +
            (team || k);
          if (this.bet_obj[key]) {
            this.selectedKey = [...this.selectedKey, key];
          }
        });

        console.error(this.selectedKey);

        this.selectedKey.map((el, index) => {
          const flag = bet_data.some(item => el.includes(item.schedule_id));
          if (!flag) {
            this.selectedKey.splice(index, 1);
          }
        });
      }
    },
    selectedKey() {
      // console.log(v)
    },
    // 当前的联盟
    gameList(v) {
      const data = v.map(e => e.league_id);
      this.league_id_current = data.join(",");
    },
    "timeCount.getData"() {
      // console.log("getData-mulit");
      if (this.zhgg_preview) {
        this.pullRefresh = true;
        this.getGameList();
      }
    }
  },
  directives: {
    oneHtml: {
      bind(el, { value }) {
        if (!value) return;
        el.innerHTML = value.html;
        // 添加选中样式
        el.classList[value.selected ? "add" : "remove"]("selected");
      },
      update(el, { value, oldValue }) {
        let img = "";
        if (
          !value ||
          (value.selected === oldValue.selected &&
            value.data.p === oldValue.data.p)
        ) {
          return;
        }

        // 赔率上升下降
        const last_p = oldValue.data.p * 1;
        const cur_p = value.data.p * 1;
        if (oldValue.half === value.half && cur_p > last_p) {
          img = `<img src="${icons[0]}" class="pv">`;
        } else if (oldValue.half === value.half && cur_p < last_p) {
          img = `<img src="${icons[1]}" class="pv">`;
        }
        // console.error(cur_p , last_p);

        el.innerHTML = value.html + img;

        // 添加选中样式
        el.classList[value.selected ? "add" : "remove"]("selected");
      }
    }
  },
  methods: {
    ...mapActions("football", [
      "modifyFootballField",
      "queryComputed",
      "getSportMobileGameList"
    ]),
    moment(t) {
      return dayjs(t).format("MM/DD HH:mm");
    },
    // 独赢  0
    // 让球  1  负号在哪边就显示在哪边   另一边不显示让球
    // 大小  2
    // 单双  3
    // 返回对象 { html, data, select, selected, path, half, bet_txt, bet_data }
    renderHtml(game_index, game, type, l_type) {
      let field = this.fields[type];
      const l_field = this.l_fields[l_type];
      let data = game.bet_data || {};
      let html = "";
      let bet_txt = "";
      let select = true;
      const schedule_id = game_index + "-" + game.schedule_id;
      const half = this.bet_obj[schedule_id] && this.bet_obj[schedule_id].half;
      if (half) field = "H" + field;
      const path = schedule_id + field + l_field;
      let realPath = [schedule_id, field];

      data = data[field];
      switch (type) {
        case 0:
        case 3:
          data = data || [];
          const index = data.findIndex(el => el.k === l_field);
          data = data[index];
          realPath = [...realPath, index];
          break;
        case 1:
        case 2:
          data = data || {};
          data = data[l_field];
          realPath = [...realPath, l_field];
          break;
      }
      data = data || {};
      // console.error(data)
      // console.error(realPath)

      if (!data || !data.p || data.p === "/") {
        select = false;
        html = `<p class="one-row-font">/</p>`;
      } else {
        let k = ""; // 下注描述： 队名  或  大小  单双
        let str = "";
        switch (type) {
          case 0:
            switch (l_type) {
              case 0:
                bet_txt = game.h;
                break;
              case 1:
                bet_txt = "和局";
                break;
              case 2:
                bet_txt = game.v;
                break;
            }

            html = `<p class="one-row-font">${data.p}</p>`;

            break;
          case 1:
            switch (l_type) {
              case 0:
                k = Math.abs(data.k);
                k = k > 0 ? k : "";
                bet_txt = game.h + k;
                break;
              case 2:
                k = Math.abs(data.k);
                k = k > 0 ? k : "";
                bet_txt = game.v + k;
                break;
            }

            str = data.k.includes("-")
              ? `<p class="one-color-green">${data.k.replace("-", "")}</p>${
                data.p
              }`
              : "";
            if (!str) str = `<p class="one-row-font">${data.p}</p>`;
            html = `${str}`;

            break;
          case 2:
            switch (l_type) {
              case 3:
                bet_txt = "大" + data.k;
                break;
              case 4:
                bet_txt = "小" + data.k;
                break;
            }

            html = `<div class="yd-flexbox yd-flexbox-horizontal">
                <p style="padding:0 0 0 .2rem">${l_type === 3 ? "大" : "小"}</p>
                <div class="yd-flexbox-item yd-flexbox-item-center"><p class="one-color-green">${
  data.k
}</p>${data.p}</div>
            </div>`;

            break;
          case 3:
            switch (l_type) {
              case 5:
                bet_txt = "单";
                break;
              case 6:
                bet_txt = "双";
                break;
            }

            html = `<p class="one-row-font">${data.p}</p>`;
            break;
        }
      }
      const bet_data = {
        history_id: game.history_id,
        k: data.k,
        p: data.p,
        play_method: field,
        price: this.money,
        schedule_id: game.schedule_id,
        sport_id: this.sport_id,
        team: type === 0 || type === 3 ? "" : l_field,
        team_score: game.team_score
      };
      // { html, bet_txt, data, select, selected, path,  half, bet_data };
      const selected = select && this.selectedKey.includes(path) && this.footer;
      this.$set(this.bet_obj, path, {
        bet_txt,
        data,
        select,
        half,
        bet_data,
        realPath
      });

      return {
        html,
        data,
        half,
        select,
        path,
        selected
      };
    },
    selectBet(game_index, { schedule_id, min_stake, max_stake }, type, l_type) {
      schedule_id = game_index + "-" + schedule_id;
      let field = this.fields[type];
      const l_field = this.l_fields[l_type];
      const half = this.bet_obj[schedule_id] && this.bet_obj[schedule_id].half;
      if (half) field = "H" + field;
      const path = schedule_id + field + l_field;
      const data = this.bet_obj[path];
      // console.error(data);
      if (!data.select) return;

      const isIndex = this.selectedKey.findIndex(el =>
        el.includes(schedule_id)
      );

      // 综合过关
      if (this.gameType === 3) {
        if (isIndex !== -1 && this.selectedKey[isIndex] === path) {
          this.selectedKey.splice(isIndex, 1);
        } else if (isIndex !== -1 && this.selectedKey[isIndex] !== path) {
          this.selectedKey.splice(isIndex, 1);
          this.selectedKey.push(path);
        } else this.selectedKey.push(path);
      } else {
        this.selectedKey =
          isIndex !== -1 && this.selectedKey[isIndex] === path ? [] : [path];
      }

      // 底部信息
      const params = {
        min_stake,
        max_stake,
        footer: !!this.selectedKey.length,
        bet_txt: data.bet_txt,
        bet_data: [data.bet_data]
      };
      if (this.gameType === 3) {
        // 计算下注描述，赔率， 下注数据
        params.bet_txt = this.selectedKey.length;
        params.bet_data = reduce(
          this.selectedKey,
          (sun, item) => [...sun, get(this.bet_obj, item).bet_data],
          []
        );
      }
      this.modifyFootballField(params);
    },
    halfClick(schedule_id, b) {
      if (!this.bet_obj[schedule_id]) this.$set(this.bet_obj, schedule_id, {});
      this.$set(this.bet_obj[schedule_id], "half", b);
    },
    allGame(allPlay_schedule_id_prefix, allPlayTeam) {
      // return this.$dialog.toast({
      //   mes: "暂未开放，敬请期待！",
      //   timeout: 1000
      // });
      this.modifyFootballField({ allPlay_schedule_id_prefix, allPlayTeam });
      this.$router.push("/football/allPlay");
    },
    refreshData() {
      this.pullRefresh = true;
      this.getGameList();
      // this.$dialog.toast({ mes: "下拉刷新", timeout: 1000 });
      // setTimeout(() => {
      //   this.$refs.pullrefresh_ref.$emit("ydui.pullrefresh.finishLoad");
      // }, 3000);
    },
    loadMore() {
      this.pullRefresh = false;
      this.getGameList();
      // this.$dialog.toast({ mes: "上拉加载更多", timeout: 1000 });
      // setTimeout(() => {
      //   this.$refs.loadMore_ref.$emit("ydui.infinitescroll.finishLoad");

      //   // 所有数据加载完毕
      //   // this.$refs.loadMore_ref.$emit('ydui.infinitescroll.loadedDone');
      // }, 3000);
    },
    getGameList: debounce(async function() {
      const params = {};
      // {loading: true,
      //   ac: "getSportMobileGameList",
      //   sport_id: this.sport_id,
      //   game_type: this.gameType, // 滚球  今日   早盘   综合过关   冠军
      //   play_group: this.playTypeMap[this.playType].value, // 独赢/让分/大小   波胆    半场/全场    总入球
      //   // league_id: this.league_id_current, // 联赛id
      //   order: this.order // 时间排序     联赛排序
      //   // start_time: this.next_time
      // };
      if (this.pullRefresh) {
        params.league_id = this.league_id_current;
        params.start_time = "";
      } else {
        params.league_id = "";
        params.start_time = this.next_time;
      }

      // t: u d e  赔率:  涨  跌  平
      // 1X2 : 独赢    HC:让球  GL：大小   TGOE：单双
      // 对应半场，前面+H
      const data = (await this.getSportMobileGameList(params)) || {};
      this.next_time = data.next_time;
      let gameList = data.result || [];
      // console.error(gameList);
      if (this.pullRefresh) {
        this.$refs.pullrefresh_ref &&
          this.$refs.pullrefresh_ref.$emit("ydui.pullrefresh.finishLoad");
        this.$refs.loadMore_ref &&
          this.$refs.loadMore_ref.$emit("ydui.infinitescroll.reInit");
      } else {
        this.$refs.loadMore_ref.$emit("ydui.infinitescroll.finishLoad");
        if (!gameList.length) {
          this.$refs.loadMore_ref.$emit("ydui.infinitescroll.loadedDone");
        }
        gameList = [...this.gameList, ...gameList];
      }

      this.gameList = gameList;
      this.queryComputed(["reset"]);

      this.$nextTick(this.updateSelected);
    }, 500),
    // 更新选中数据
    updateSelected() {
      const bet_data = Object.assign([], this.bet_data);
      this.selectedKey.map((el, index) => {
        if (!this.bet_obj[el].select) {
          this.selectedKey.splice(index, 1);
          bet_data.splice(index, 1);
        }
      });
      this.modifyFootballField({ bet_data });
    }
  }
};
</script>

<style lang="scss">
.multi-play {
  background-color: #fff;
  .yd-list-loading svg {
    width: 2rem;
    height: 2rem;
  }
  .yd-badge {
    font-size: 1rem;
  }
  .yd-accordion {
    margin-bottom: 4rem;
  }
  .one-row-font {
    line-height: 3rem;
  }
  .one-color-green {
    color: #22ac38;
  }
  .bage-default {
    background-color: #ffffff;
    color: #000000;
  }
  .bage-active {
    background-color: $mainColor;
    color: #fff;
  }
  .yd-accordion-head {
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    background-color: #f6f6f6;
    .yd-accordion-title {
      color: #000000;
      font-size: 1.2rem;
    }
  }
  .one-game {
    border: 1px solid #d2d2d2;
    border-radius: 0.3rem;
    margin: 1rem 0.5rem 0;
    text-align: center;
    &:last-child {
      margin: 1rem 0.5rem;
    }
    .one-game-header {
      color: #313131;
      padding: 0.3rem 0;
      background-color: #f6f6f6;
      .one-game-header-title {
        font-size: 1rem;
      }
      .one-game-header-time {
        font-size: 0.8rem;
      }
    }
    .one-table {
      font-size: 1rem;
      border-top: 1px solid #d2d2d2;
      & > .yd-flexbox-item:before,
      .one-table-left:before {
        content: "";
        position: absolute;
        z-index: 0;
        top: 0;
        right: 0;
        height: 100%;
        border-right: 1px solid #d9d9d9;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
      }
      .one-table-left {
        position: relative;
        width: 5rem;
        height: 3rem;
        line-height: 3rem;
      }
      .one-table-right {
        position: relative;
        width: 5rem;
        height: 3rem;
        line-height: 3rem;
        & .border-bottom-no {
          position: absolute;
          left: -1px;
          right: 0;
          border-bottom: 4px solid #fff;
        }
        & .border-bottom-no.more-game-open {
          background-color: #ffffff;
          line-height: 1.5rem;
          bottom: -2.8rem;
        }
      }
      .select-btn {
        position: relative;
        width: 100%;
        height: 3rem;
        line-height: 1.5rem;
        font-size: 0.9rem;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
      }
      .select-btn.selected {
        color: #e33939;
        border-color: #e33939;
        border-top: 1px solid #e33939;
        border-bottom: 1px solid #e33939;
        left: -1px;
      }
      .pv {
        width: 0.6rem;
        position: absolute;
        right: 0.2rem;
        top: 1.2rem;
      }
    }
  }
}
</style>
