<template>

  <yd-layout class="waves-play">
    <yd-pullrefresh :callback="refreshData" :show-init-tip="false" ref="pullrefresh_ref" class="refresh">
      <yd-infinitescroll :callback="loadMore" ref="loadMore_ref">

        <yd-accordion accordion class="yd-list" slot="list">
          <yd-accordion-item title="阿尔及利亚甲组联赛" open>
            <div class="one-game">
              <div class="one-game-header">
                <yd-flexbox class="one-game-header-title">
                  <yd-flexbox-item>A队</yd-flexbox-item>
                  <div>vs</div>
                  <yd-flexbox-item>B对</yd-flexbox-item>
                </yd-flexbox>
                <p class="one-game-header-time">02/02 16:20</p>
              </div>
              <yd-flexbox class="one-table">
                <div class="one-table-left">主</div>
                <yd-flexbox-item>
                  <yd-flexbox>
                    <yd-flexbox-item class="one-table-content border-bottom-yes">
                      <yd-grids-group :rows="5" item-height="3rem">
                        <yd-grids-item v-for="n in 10" :key="n">
                          <div slot="else" :class="['select-btn', {selected: selected === n}]" @click="select(n)">
                            <p>{{n}}</p>
                            {{n}}
                          </div>
                        </yd-grids-item>
                      </yd-grids-group>
                    </yd-flexbox-item>
                    <yd-flexbox-item></yd-flexbox-item>
                  </yd-flexbox>
                </yd-flexbox-item>
              </yd-flexbox>

              <yd-flexbox class="one-table">
                <div class="one-table-left">客</div>
                <yd-flexbox-item>
                  <yd-flexbox>
                    <yd-flexbox-item class="one-table-content border-bottom-yes">
                      <yd-grids-group :rows="5" item-height="3rem">
                        <yd-grids-item v-for="n in 10" :key="n">
                          <div slot="else" :class="['select-btn', {selected: selected === n}]" @click="select(n)">
                            <p>{{n}}</p>
                            {{n}}
                          </div>
                        </yd-grids-item>
                      </yd-grids-group>
                    </yd-flexbox-item>
                    <yd-flexbox-item align="top">
                      <div :class="['one-table-right-tag select-btn', {selected: selected === 'other'}]" @click="select('other')">
                        <div>其他</div>
                        17
                      </div>
                    </yd-flexbox-item>
                  </yd-flexbox>
                </yd-flexbox-item>
              </yd-flexbox>

              <yd-flexbox class="one-table">
                <div class="one-table-left">平</div>
                <yd-flexbox-item>
                  <yd-flexbox>
                    <yd-flexbox-item class="one-table-content border-bottom-no">
                      <yd-grids-group :rows="5" item-height="3rem">
                        <yd-grids-item v-for="n in 5" :key="n">
                          <div slot="else" :class="['select-btn', {selected: selected === n}]" @click="select(n)">
                            <p>{{n}}</p>
                            {{n}}
                          </div>
                        </yd-grids-item>
                      </yd-grids-group>
                    </yd-flexbox-item>
                    <yd-flexbox-item class="no-border-top"></yd-flexbox-item>
                  </yd-flexbox>
                </yd-flexbox-item>
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
import debounce from 'lodash/debounce'
import { mapActions, mapState } from 'vuex'
import http from '../../../../server/http'
import dayjs from 'dayjs'
const icons = [
  require('img/football/p_up.png'),
  require('img/football/p_down.png')
]
export default {
  name: 'footballTypeWaves',
  data() {
    return {
      selected: '',
      pullRefresh: true, // 标识符： 刷新  加载下一页
      next_time: '', // 时间分页
      league_id_current: '', // 联赛id多个以逗号隔开
      order: 0, // 0时间排序     1联赛排序
      fields: ['1X2', 'HC', 'GL', 'TGOE'], // 独赢  让球  大小  单双
      l_fields: ['H', 'X', 'V', 'OV', 'UN', 'Odd', 'Even'], // 最后的字段名或者关键字查找
      selectedKey: '', // 简写的路径
      realPath: '', // 完整的路径
      gameList: [] // 列表大对象
    }
  },
  computed: {
    ...mapState('football', [
      'footer',
      'gameType',
      'playTypeMap',
      'playType',
      'sport_id',
      'money',
      'leagueList'
    ])
  },
  mounted() {
    // console.error(11111)
    this.getGameList()
  },
  activated() {
    // console.error(2222)
    this.getGameList()
  },
  methods: {
    ...mapActions('football', [
      'modifyFootballField',
      'getSportMobileGameList'
    ]),
    select(n) {
      this.selected = this.selected === n ? '' : n
      this.modifyFootballField({ footer: !!this.selected })
    },
    refreshData() {
      // this.pullRefresh = true;
      this.bus.$emit('countDown-init')
    },
    loadMore() {
      this.pullRefresh = false
      this.getGameList()
    },
    getGameList: debounce(async function() {
      // 清除下注
      this.selectedKey = ''
      this.modifyFootballField({ footer: false })

      let params = {
        loading: true,
        ac: 'getSportMobileGameList',
        sport_id: this.sport_id,
        game_type: this.gameType, // 滚球  今日   早盘   综合过关   冠军
        play_group: this.playTypeMap[this.playType].value, // 独赢/让分/大小   波胆    半场/全场    总入球
        // league_id: this.league_id_current, // 联赛id
        order: this.order // 时间排序     联赛排序
        // start_time: this.next_time
      }
      if (this.pullRefresh) {
        params.league_id = this.league_id_current
        params.start_time = ''
      } else {
        params.league_id = ''
        params.start_time = this.next_time
      }

      // t: u d e  赔率:  涨  跌  平
      // 1X2 : 独赢    HC:让球  GL：大小   TGOE：单双
      // 对应半场，前面+H
      let data = (await http(params)) || {}
      this.next_time = data.next_time
      let gameList = data.result || []
      // console.error(gameList);
      if (this.pullRefresh) {
        this.$refs.pullrefresh_ref.$emit('ydui.pullrefresh.finishLoad')
        this.$refs.loadMore_ref &&
          this.$refs.loadMore_ref.$emit('ydui.infinitescroll.reInit')
      } else {
        this.$refs.loadMore_ref.$emit('ydui.infinitescroll.finishLoad')
        if (!gameList.length)
          this.$refs.loadMore_ref.$emit('ydui.infinitescroll.loadedDone')
        gameList = this.gameList.concat(gameList)
      }

      this.gameList = gameList
    }, 500)
  }
}
</script>

<style lang="scss">
.waves-play {
  // padding-top: 3.25rem;
  .yd-accordion-head {
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    background-color: #f6f6f6;
    .yd-accordion-title {
      color: #000000;
      font-size: 1rem;
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
        font-size: 0.9rem;
      }
      .one-game-header-time {
        font-size: 0.6rem;
      }
    }
    .one-table {
      border-top: 1px solid #d2d2d2;
      &:last-child .no-border-top {
        width: 100%;
        border-top: 2px solid #ffffff;
        top: -1.5rem;
      }
      .yd-flexbox-item {
        position: relative;
      }
      .one-table-left {
        width: 2rem;
      }
      .one-table-content {
        flex: 5;
        border-left: 1px solid #d2d2d2;
        border-right: 1px solid #d2d2d2;
        [class^="yd-grids-"]:before {
          border-bottom: none;
        }
      }
      .select-btn.one-table-right-tag {
        height: 3rem;
        border-bottom: 1px solid #d2d2d2;
      }
      .select-btn {
        width: 100%;
        height: 100%;
        line-height: 1.5rem;
        font-size: 0.8rem;
        border: 1px solid transparent;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
      }
      .select-btn.selected {
        color: #e33939;
        border-color: #e33939;
      }
    }

    .border-bottom-no .yd-grids-item:after {
      border-bottom: none;
    }
    .border-bottom-yes .yd-grids-item {
      &:after {
        transform: scaleY(1);
        border-color: #d2d2d2;
      }
      &:nth-child(n + 6):after {
        border-bottom: none;
      }
    }
  }
}
</style>
