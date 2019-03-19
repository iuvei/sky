import calc from '../calc/index'
import { mapActions, mapState } from 'vuex'

import encode from '~/js/encode'
import _encodeKey from '../../../../../server/encodeKey'
import md5 from 'js-md5'
import qs from 'qs'
import { randomFormtoken } from '~/js/user/gsfunc'
// import WS from '../../message/js/websocket'
// import game from '../../../../../api/game'

const playObj = {
  k3: { instance: calc.k3, betArea: 'BetAreaK3' },
  '11x5': { instance: calc.eleventx5, betArea: 'BetAreaNormal' },
  ssc: { instance: calc.ssc, betArea: 'BetAreaNormal' },
  '3d': { instance: calc.d3, betArea: 'BetAreaNormal' },
  xypk: { instance: calc.puke, betArea: 'BetAreaPuke' },
  pk10: { instance: calc.pk10, betArea: 'BetAreaNormal' },
  pcdd: { instance: calc.pcdd, betArea: 'BetAreaNormal' },
  pkniuniu: { instance: calc.pkniuniu, betArea: 'BetAreaK3' },
  lhc: { instance: calc.lhc, betArea: 'BetAreaLhc' },
  tzyx: { instance: calc.ladder, betArea: 'BetAreaLadder' },
  xync: { instance: calc.luckyFarm, betArea: 'BetAreaLuckyFarm' },
  qxc: { instance: calc.qxc, betArea: 'BetAreaNormal' }
}

export default {
  methods: {
    ...mapActions(['setBetNumber', 'updatePrice']),
    ...mapActions('chat', ['bet']),

    /**
     * 获取选中球的显示值
     *
     * @returns
     */
    getLabels() {
      return this.instance.getShowLabels(
        this.dataSet,
        this.playItem.playid,
        this.danshiExcl
      )
    },

    /**
     * 点击购买
     *
     * @param {Number} price 价格
     * @param {Function} callback 投注后回调
     */
    async buy(price) {
      if (this.submitting) return
      this.submitting = true
      const betData = this.assemblyBetData(price)

      const params = qs.stringify(betData)
      // console.log('ccccc', params)
      const encodeData = `DEX${encode(params, _encodeKey)}${md5(
        decodeURIComponent(params) + '&encode=' + _encodeKey
      )}`.toUpperCase()

      const sendData = await this.bet(encodeData)
      this.$ws.sendMessage(sendData)

      const showInfo = Object.assign(betData, {
        code: sendData.code,
        labels: this.getLabels(),
        playname: this.playItem.wanfa || this.playItem.playname,
        gamename: this.gameItem.game_name,
        zhushu: this.betNumber,
        price
      })
      // console.warn('showInfo', showInfo)
      this.bus.$emit('sendBetInfo', {
        info: showInfo,
        key: 0
      })
      // Bet.buy_socket(betData, callback)
    },

    buyCallback(res) {
      // debugger
      // console.warn(res)
      this.bus.$emit('sendBetInfo', { key: res.data ? 1 : 2, info: res })
      this.submitting = false
      const isOk = res && res.data && !res.error,
        isSameUesr = res.UserToken === this.userToken
      // 这里有问题
      if (isOk && isSameUesr) {
        const { take, less } = res.data && res.data.self
        if (take) {
          this.updatePrice(less)
          this.$dialog.toast({
            mes: `投注成功,余额：${less}元`
          })
          this.setBetNumber(0)
          this.clearDataSet() // 清空选球
          // this.clearInput() // 清空价格
          this.danshiExcl = ''
        } else {
          this.$dialog.toast({
            mes: `${res.param}`
          })
        }
      }
      if (res.error || !res.data) {
        this.$dialog.toast({
          mes: res.msg || res.param
        })
      }
    },

    getDataSet(playid) {
      const _this = this
      if (_this.gameItem.js_tag === 'pcdd') {
        return _this.instance.getBalls(
          playid,
          _this.playOdds,
          _this.playItem.playname.split('+')
        )
      }
      if (!_this.playItem) return []
      return _this.instance.getBalls(
        playid,
        _this.playOdds,
        _this.playItem.content.split('+') || [_this.playItem.playname]
      )
    },

    clearDataSet() {
      this.dataSet.forEach(x => {
        // puke清空选择
        if (this.gameItem.game_id === 54) {
          x.checked = false
        } else {
          x.data.forEach(y => y.checked = false)
          if (x.actions) x.actions.forEach(y => y.checked = false)
        }
      })
    },

    mutex(name, curItem, callback = null) {
      if (!curItem) return
      const _this = this
      if (this.gameItem.game_id !== 54) {
        this.instance.mutex(_this.dataSet, name, curItem)
      }
      if (callback) callback(name, curItem)
    },

    calcBetNumber(playid, one, two) {
      return this.instance.calcBetNumber(
        playid,
        one,
        two,
        this.danshiExcl || ''
      )
    },

    // clickBallHandle(row, ball = null) {
    clickBallHandle() {
      const balls = this.instance.getCheckedBalls(this.dataSet)

      const betNumber = this.calcBetNumber(
        this.playItem.playid,
        balls.one,
        balls.two
      )
      this.setBetNumber(betNumber)
    },

    /**
     * 处理多个0的情况,只需要一个0
     *
     * @param {string} num
     * @returns processed string
     */
    processZero(num) {
      let _peilv = num
      if (/\.000/.test(num)) {
        _peilv = num.substring(0, num.length - 2)
      } else if (/\.00[1-9]/.test(num)) {
        _peilv = num
      } else if (/\.00/.test(num)) {
        _peilv = num.substring(0, num.length - 1)
      } else if (/\.[0-9][1-9]0/.test(num)) {
        _peilv = num.substring(0, num.length - 1)
      } else if (/\.[1-9]00/.test(num)) {
        _peilv = num.substring(0, num.length - 2)
      }

      return _peilv
    },

    getBetArea() {
      if (this.$route.name !== 'liaotianshi') return ''
      return (this.playObj || playObj[this.gameItem.js_tag]).betArea
    },

    assemblyBetData(price) {
      // console.error('getData', this.getData(dataSet, playid, price))
      return {
        ac: 'userSubmitTouzhu',
        ver: 'v1.0.0',
        client_type: 1,
        token: this.userinfo.token,
        sessionkey: this.userinfo.session_key,
        uid: this.userinfo.uid,
        gameid: this.gameItem.game_id,
        qishu: this.qishu,
        data: this.instance.getSubmitData(
          this.dataSet,
          this.playItem.playid,
          price,
          this.danshiExcl
        ),
        auto: 1,
        stop: 1,
        multiple: 1,
        form_unique_token: randomFormtoken(),
        is_dj: 1,
        voucher: 0
      }
    }
  },

  computed: {
    ...mapState({
      userToken: state => state.chat.wsGlobalConfig.UserToken,
      betNumber: state => state.betting.betNumber
    }),
    playObj() {
      return playObj[this.gameItem.js_tag]
    },
    instance() {
      return playObj[this.gameItem.js_tag].instance
    }
  },
  mounted() {
    // WS.oncallback('TOUZHU_RESP', this.buyCallback)
    this.$ws.oncallback('TOUZHU_STATUS', this.buyCallback)
    this.$ws.oncallback('TOUZHU_RESP', this.buyCallback)
  },
  watch: {
    danshiExcl(val) {
      this.setBetNumber(0)
      const betNumber = this.instance.calcBetNumber(
        this.playItem.playid,
        null,
        null,
        val
      )
      this.setBetNumber(betNumber)
    }
  }
}
