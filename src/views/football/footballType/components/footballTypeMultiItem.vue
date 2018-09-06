<template>
  <!-- 投注界面 -->
  <div class="footballMulti-betting">
    <!-- {{hhcData}}<br> {{hglData}}
    <br>
    <br>{{selectedKey}} -->

    <!-- 半场-->
    <div class="one-game one-game-single" v-if="Object.keys(hhcData).length || Object.keys(hglData).length">
      <yd-flexbox class="wanfa-title">
        <div class="orange">{{game.team_score}}</div>
        <yd-flexbox-item>
          <span class="orange">上半场</span>
          {{game.rolling_time || moment(game.begin_time)}}
        </yd-flexbox-item>
        <div class="fixed-width">让球</div>
        <div class="fixed-width">大/小</div>
      </yd-flexbox>
      <yd-flexbox>
        <yd-flexbox-item class="vhcenter">
          <div class="team">{{game.h}} {{game.is_neutral?'[中]':'[主]'}}</div>
          <div class="team">{{game.v}}</div>
        </yd-flexbox-item>
        <div class="fixed-width">
          <!-- 让球 -->
          <div :class="['is-betting', 'column',{selected: selectedKey.includes([gameKey+'-'+game.schedule_id,'HHC',idx,el.k].join('||'))}]" v-for="(el,idx) in hhcData" :key="el" @click="selectBet('HHC',idx,el.k)">
            <p class="one-color-green" v-if="el.k && el.k.includes('-')">{{el.k.replace('-','')}}</p>
            <p>{{el.p || '/'}}</p>
            <i class="pl-float" v-one-html="el.p"></i>
          </div>
        </div>
        <div class="fixed-width">
          <!-- 大小 -->
          <yd-flexbox :class="['is-betting',{selected: selectedKey.includes([gameKey+'-'+game.schedule_id,'HGL',idx,el.k].join('||'))}]" v-for="(el,idx) in hglData" :key="el" @click.native="selectBet('HGL',idx,el.k)">
            <p style="padding-left:0.2rem;">{{idx === 'OV'?'大':'小'}}</p>
            <yd-flexbox-item>
              <p class="one-color-green">{{el.k}}</p>
              <p>{{el.p || '/'}}</p>
            </yd-flexbox-item>

            <i class="pl-float" v-one-html="el.p"></i>
          </yd-flexbox>
        </div>
      </yd-flexbox>
      <div class="wanfa-title" @click="allGame()">
        所有玩法
        <img src="~img/football/more-game.png" alt="" style="width: .8rem;transform: rotateZ(-90deg);">
      </div>
    </div>

    <!-- 全场 -->
    <div class="one-game one-game-single" v-if="Object.keys(hcData).length || Object.keys(glData).length">
      <yd-flexbox class="wanfa-title">
        <div class="orange">{{game.team_score}}</div>
        <yd-flexbox-item>{{game.rolling_time || moment(game.begin_time)}}</yd-flexbox-item>
        <div class="fixed-width">让球</div>
        <div class="fixed-width">大/小</div>
      </yd-flexbox>
      <yd-flexbox>
        <yd-flexbox-item class="vhcenter">
          <div class="team">{{game.h}} {{game.is_neutral?'[中]':'[主]'}}</div>
          <div class="team">{{game.v}}</div>
        </yd-flexbox-item>
        <div class="fixed-width">
          <!-- 让球 -->
          <div :class="['is-betting column',{selected: selectedKey.includes([gameKey+'-'+game.schedule_id,'HC',idx,el.k].join('||'))}]" v-for="(el,idx) in hcData" :key="el" @click="selectBet('HC',idx,el.k)">
            <p class="one-color-green" v-if="el.k && el.k.includes('-')">{{el.k.replace('-','')}}</p>
            <p>{{el.p || '/'}}</p>
            <i class="pl-float" v-one-html="el.p"></i>
          </div>
        </div>
        <div class="fixed-width">
          <!-- 大小 -->
          <yd-flexbox :class="['is-betting',{selected: selectedKey.includes([gameKey+'-'+game.schedule_id,'GL',idx,el.k].join('||'))}]" v-for="(el,idx) in glData" :key="el" @click.native="selectBet('GL',idx,el.k)">
            <p style="padding-left:0.2rem;">{{idx === 'OV'?'大':'小'}}</p>
            <yd-flexbox-item>
              <p class="one-color-green">{{el.k}}</p>
              <p>{{el.p || '/'}}</p>
            </yd-flexbox-item>

            <i class="pl-float" v-one-html="el.p"></i>
          </yd-flexbox>
        </div>
      </yd-flexbox>
      <div class="wanfa-title" @click="allGame()">
        所有玩法
        <img src="~img/football/more-game.png" alt="" style="width: .8rem;transform: rotateZ(-90deg);">
      </div>
    </div>

  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { playPMs, BTLists, getItem } from './allPlay/allPlay.const.js'
import dayjs from 'dayjs'

export default {
  name: 'footballMulti_betting',
  props: ['gameKey', 'game'],
  data() {
    return {
      // path => bet_data
      // bet_obj:{}
    }
  },
  computed: {
    ...mapState('football', [
      'money',
      'sport_id',
      'gameType',
      'bet_obj',
      'multiSelected'
    ]),
    hhcData() {
      return this.game.bet_data.HHC || {}
    },
    hglData() {
      return this.game.bet_data.HGL || {}
    },
    hcData() {
      return this.game.bet_data.HC || {}
    },
    glData() {
      return this.game.bet_data.GL || {}
    },
    // 选中的投注
    selectedKey: {
      get() {
        return this.multiSelected
      },
      set(selectedKey) {
        // console.error('selectedKey:',selectedKey)
        // 底部信息
        let bet_txt = ''
        if (this.gameType === 3) {
          bet_txt = selectedKey.length
        } else if (selectedKey[0]) {
          const path = selectedKey[0].split('||')
          const arg = path.slice(1, path.length)
          let data = this.game.bet_data[arg[0]][arg[1]] || {}
          switch (arg[0]) {
            case 'HHC':
            case 'HC':
              bet_txt = this.game[arg[1].toLowerCase()]
              if (data.k && data.k.includes('-')) {
                bet_txt += data.k.replace('-', '')
              }
              break
            case 'HGL':
            case 'GL':
              bet_txt = arg[1] === 'OV' ? '大' : '小'
              bet_txt += data.k
              break
          }
        }

        let bet_data = selectedKey.map(el => this.bet_obj[el].bet_data)

        let params = {
          allPlay_schedule_id_prefix:
            this.gameKey + '-' + this.game.schedule_id,
          footer: !!selectedKey.length,
          min_stake: this.game.min_stake,
          max_stake: this.game.max_stake,
          bet_txt,
          bet_data,
          multiSelected: selectedKey
        }
        // console.error(params);
        this.modifyFootballField(params)
      }
    }
  },
  directives: {
    oneHtml: {
      // bind(el, { value, oldValue }, vnode) {
      // },
      update(el, { value, oldValue }, vnode) {
        let className = el.classList
        className.remove('p_up', 'p_down')
        if (value && oldValue && value > oldValue) {
          className.add('pl-up')
        } else if (value && oldValue && value < oldValue) {
          className.add('pl-down')
        }
      }
    }
  },
  activated() {},
  deactivated() {},
  methods: {
    ...mapActions('football', ['modifyFootballField']),
    moment(t) {
      return dayjs(t).format('MM/DD HH:mm')
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
      this.modifyFootballField({ allPlay_schedule_id_prefix, allPlayTeam });
      this.$router.push("/football/allPlay");
    },
    selectBet(...arg) {
      // console.error(arg);
      const data = this.game.bet_data[arg[0]][arg[1]]
      const schedule_id = this.game.schedule_id
      // console.error(schedule_id);
      const path = this.gameKey + '-' + schedule_id + '||' + arg.join('||')
      let select = data.p > 0
      if (!select) {
        return this.$dialog.toast({
          mes: '赔率异常'
        })
      }
      // 同一场赛事只能投一注
      let selectedKey = JSON.parse(JSON.stringify(this.multiSelected))
      let idx = selectedKey.findIndex(el => el.includes(schedule_id))
      // 综合过关
      if (this.gameType === 3) {
        if (idx !== -1 && selectedKey[idx] === path) selectedKey.splice(idx, 1)
        else if (idx !== -1 && selectedKey[idx] !== path) {
          selectedKey.splice(idx, 1, path)
        } else selectedKey.push(path)
      } else {
        selectedKey = idx !== -1 && selectedKey[idx] === path ? [] : [path]
      }

      // 先保存当前选中的下注信息
      let bet_obj = JSON.parse(JSON.stringify(this.bet_obj))
      bet_obj[path] = {}
      bet_obj[path].bet_data = {
        history_id: this.game.history_id,
        k: data.k,
        p: data.p,
        play_method: arg[0],
        price: this.money,
        schedule_id: this.game.schedule_id,
        sport_id: this.sport_id,
        team: arg[1],
        team_score: this.game.team_score
      }
      this.modifyFootballField({ bet_obj })

      this.selectedKey = selectedKey
    }
  }
}
</script>

<style lang="scss" scoped>
.footballMulti-betting {
  user-select: none;
  text-align: left;
  font-size: 1rem;
  // padding: 0 0.7rem 0.7rem;
  &:first-of-type {
    padding-top: 0.7rem;
  }
  .orange {
    color: #ff7c34;
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
    color: #ef0404;
    border-color: #ef0404 !important;
    .one-color-green {
      color: #ef0404;
    }
  }
  .fixed-width {
    width: 6rem;
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
    }
  }
}
</style>
