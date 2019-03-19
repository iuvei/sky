<template>
  <div class="match-cart">
    <Mheader title='投注单'></Mheader>
    <div @click="$router.back()" class="add-btn">+ 添加/编辑赛事</div>

    <div class="other-block match-list-wrap">
      <div class="match-list-content">
        <p v-if="!game_list.length">暂无投注内容，返回投1注吧：）</p>
        <yd-flexbox v-for="oneMatch in game_list" :key='oneMatch.match_id' class="one-match">
          <yd-flexbox-item>
            <component :is="curCarBet" :oneMatch='oneMatch' :popupShowClick='(oneMatch)=>popupShowClick(oneMatch)' :getItem="getItem" :updateField="updateField"></component>
          </yd-flexbox-item>
          <yd-icon @click.native="delClick(oneMatch.match_id)" class="clear" name="error-outline"></yd-icon>
        </yd-flexbox>
      </div>

      <yd-flexbox class="match-protocol">
        <yd-flexbox-item style="text-align:left;">
          <yd-checkbox class="checkbox" v-model="isAgree" @click.native.prevent="showAggrement($event)" color="#fff">
            我已阅读并同意
            <span class="site-color">《{{sysinfo.web_title}}服务协议》</span>
          </yd-checkbox>
        </yd-flexbox-item>
        <p @click="delAllClick" class="clear-all">清空所有</p>
      </yd-flexbox>
    </div>

    <p class="end-time">
      您已选{{matchNum}}场比赛，截止投注时间：{{dayjs(betDetail.end_time)}}
    </p>

    <Mfooter page="cart"></Mfooter>

    <CommonPopup></CommonPopup>

  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { getItem } from './components/allPlay.const.js'
import dayjs from 'dayjs'
import debounce from 'lodash/debounce'
import Mheader from './components/header'
import Mfooter from './components/footer'
import CommonPopup from './components/commonPopup'
import Mix_cart from './components/mix_cart'
import Win_cart from './components/win_bet'
import Hcwin_cart from './components/hcwin_bet'

export default {
  name: 'match-cart',
  components: {
    Mheader,
    Mfooter,
    CommonPopup,
    Mix_cart,
    Win_cart,
    Hcwin_cart
  },
  data() {
    return {
      isAgree: true,
      matchDiff_copy: [] // matchDiff 的备份
    }
  },
  computed: {
    ...mapState({
      sysinfo: state => state.sysinfo
    }),
    ...mapGetters('match', [
      'matchNum',
      'matchDiff',
      'curCarBet',
      'scheduleList'
    ]),
    ...mapState('match', [
      'gameType',
      'playType',
      'multiple',
      'betDetail',
      'selectedKeys',
      'gameList'
    ]),
    // 赛事资讯
    game_list() {
      // return this.betDetail.game_list || []
      return this.matchDiff_copy
        .map(match_id => this.fetchMatch(match_id))
        .filter(el => el && el.match_id)
    },
    // 串关内容
    detail() {
      return this.betDetail.detail || []
    }
  },
  watch: {
    playType(n, o) {
      if (n.join(',') !== o.join()) {
        this.fetchDetail()
      }
    },
    multiple: 'fetchDetail',
    selectedKeys: 'fetchDetail'
  },
  activated() {
    this.matchDiff_copy = this.matchDiff
    this.fetchDetail()
  },
  methods: {
    ...mapActions('match', ['getJingcaiBetDetail', 'updateField']),
    getItem,
    dayjs(time) {
      return dayjs(time).format('MM-DD HH:mm')
    },
    fetchDetail: debounce(function() {
      if (this.$route.path === '/match/cart') {
        this.getJingcaiBetDetail()
      }
    }, 300),
    showAggrement(event) {
      if (event.x > document.body.clientWidth / 2) {
        this.$router.push('/agreement')
      } else {
        this.isAgree = !this.isAgree
      }
    },
    // 从列表取对应比赛信息
    fetchMatch(match_id) {
      return this.scheduleList.find(match => match.match_id == match_id)
    },
    popupShowClick(oneMatch) {
      this.updateField({ matchShow: true, oneMatch })
    },
    delClick(match_id) {
      const selectedKeys = this.selectedKeys.filter(
        el => !el.includes(match_id)
      )
      this.updateField({ selectedKeys })
      this.matchDiff_copy = this.matchDiff
    },
    delAllClick() {
      this.$dialog.confirm({
        title: '清空确认',
        mes: '确定清空投注单？',
        opts: () => {
          this.updateField({ selectedKeys: [], playType: [], bet_obj: [] })
          this.matchDiff_copy = this.matchDiff
          // this.$router.back()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~css/resources.scss';
.match-cart {
  font-size: 1rem;
  text-align: center;
  background-color: #f6f6f6;
  .add-btn {
    margin: 0.7rem auto;
    border: 1px solid #b3b3b3;
    border-radius: 0.2rem;
    padding: 0.6rem 6rem;
    background-color: #ffffff;
    color: #353535;
  }
  .match-list-wrap {
    @include center;
    flex-direction: column;
    background-image: url('~img/goucai/ticket_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-color: #ffffff;
    padding: 1.6rem;
    .match-list-content {
      width: 100%;
      flex: 1;
      overflow-y: auto;
      .clear {
        width: 3rem;
        color: #dbdbdb;
        text-align: right;
        font-size: 1.8rem !important;
      }
    }
    .one-match {
      padding: 0.7rem 0;
      border-bottom: 0.0625rem dashed #ddd;
    }
    .clear-all {
      color: #bababa;
      text-align: right;
    }
  }
  .end-time {
    color: #333131;
    font-size: 1.1rem;
    padding: 0.7rem 0;
  }
}
</style>

<style lang="scss">
.match-cart {
  .is-betting {
    position: relative;
    &.selected {
      background-color: #ef0404;
      color: #ffffff;
    }
  }
  .match-protocol {
    width: 100%;
    padding-top: 0.7rem;
    .checkbox {
      input[type='checkbox']:checked + .yd-checkbox-icon {
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
    .yd-checkbox-text {
      font-size: 0.8rem;
      vertical-align: 0.2rem;
    }
    .site-color {
      color: #528880;
    }
  }
}
</style>
