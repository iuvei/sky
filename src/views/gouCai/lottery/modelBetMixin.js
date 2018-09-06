// 一键投注
import { mapActions, mapState } from 'vuex'
import { RenderTypes } from '~/js/touzhu/commonTypes'
import danshiUtil from '~/js/touzhu/danshi.util'
import { randomFormtoken } from '~/js/user/gsfunc'
import { to } from '~/js/functions'
import api from '../../../../api/betting'
export default {
  data() {
    return {
      submitting: false,
      auto: 1,
      stop: 1,
      chaseBeiShu: 1,
      cart: []
    }
  },
  methods: {
    ...mapActions([
      'setCartNumber',
      'clearCart',
      'deleteItemFromCart',
      'addToCart',
      'flushPrice',
      'setQishu',
      'setBetData'
    ]),
    getCart(val) {
      const _cart = Object.assign([], val)
      _cart.forEach((x, index) => x.id = index)
      this.cart = _cart.reverse()
    },
    async directBet() {
      if (this.submitting) {
        return false
      }
      this.clearCart()
      this.cart = []
      if (this.userBalance * 1 < this.totalCartPrice) {
        this.submitting = false
        this.$dialog.confirm({
          mes: '余额不足，是否立即充值？',
          opts: () => {
            this.$router.push('/moreService/Nrecharge')
          }
        })
        return false
      }
      if (
        this.unitPrice === 0 ||
        (typeof this.unitPrice === 'string' && !this.unitPrice.length) ||
        Number.isNaN(this.unitPrice)
      ) {
        this.$dialog.alert({ mes: '请填写单注金额' })
        return false
      }

      if (this.calcBetData.peilvType === RenderTypes.LHC) {
        this.addLHCDataToCart()
      } else {
        // this.addToCart(this.calcBetData);
        this.addDataToCart(this.calcBetData)
      }

      if (!this.cart.length) {
        this.getCart(this.$store.state.betting.cart)
      }
      console.log('cartlength', this.cart.length)
      await this.submitBetting()
    },

    async submitBetting() {
      const data = this.getSubmitData()
      console.log('data', data)
      if (!data || !data.data || !data.data.length) {
        this.$dialog.toast({ mes: '您的购物车空空如也' })
        this.submitting = false
        return false
      }
      if (this.userBalance * 1 < this.totalCartPrice) {
        this.submitting = false
        this.$dialog.confirm({
          mes: '余额不足，是否立即充值？',
          opts: () => {
            this.$router.push('/moreService/Nrecharge')
          }
        })
        return false
      }
      console.log('data.data', JSON.stringify(data.data))
      const [err, result] = await to(
        api.userSubmitBet({
          gameid: data.gameid,
          qishu: data.qishu,
          data: JSON.stringify(data.data).replace('/\\/g', ''),
          auto: data.auto,
          stop: data.stop,
          multiple: data.multiple,
          form_unique_token: randomFormtoken()
        })
      )
      if (err) {
        this.clearCart()
        this.submitting = false
      }

      if (result && result.take) {
        this.auto = 1
        this.stop = 1
        this.chaseBeiShu = 1
        this.unitPrice = ''
        this.flushPrice()
        this.clearCart()
        this.$dialog.toast({
          mes: `投注成功,余额：${result.less}元`
        })
        this.submitting = false
        this.$emit('close', false)
        this.$emit('clearAll')
        this.setBetData({})
      }
    },
    getSubmitData() {
      this.submitting = true
      const data = {
        gameid: this.cart[0].gameid || this.$store.state.betting.gameId,
        qishu: this.qishu,
        auto: 1,
        multiple: '1',
        stop: 1,
        ver: this.ver,
        data: []
      }

      this.cart.forEach(item => {
        if (danshiUtil.isSingleMode(item.js_tag, item.playid)) {
          this.processDanshiCartData(item, data.data)
        } else if (item.peilvType === RenderTypes.SSC) {
          this.processSSCCartData(item, data.data)
        } else if (item.peilvType === RenderTypes.LHC) {
          this.processLHCCartData(item, data.data)
        } else if (item.peilvType === RenderTypes.SINGLE_ROW_SINGLE_PEILV) {
          item.arr2.forEach(x => {
            if (x.length) {
              const values = x.split('|')
              const str = `${item.playid}#${item.unitPrice}#${values.join('+')}`
              data.data.push(str)
            }
          })
        } else if (
          item.peilvType === RenderTypes.MUTI_ROW_MUTI_PEILV ||
          item.peilvType === RenderTypes.SINGLE_ROW_MUTI_PEILV
        ) {
          item.arr2
            .filter(x => typeof x === 'string' ? x.length : x > -1)
            .map(x => x.toString())
            .forEach(x =>
              x.split('|').forEach(y => {
                const str = `${item.playid}#${item.unitPrice}#${y}`
                data.data.push(str)
              })
            )
        } else {
          // 多行
          let values = item.arr2.filter(x => x.length).join('+')
          // 定位胆
          if (item.peilvType === RenderTypes.DWD) {
            values = item.dwdValuesArr.filter(x => x.length).join('+')
          }
          const str = `${item.playid}#${item.unitPrice}#${values}`
          data.data.push(str)
        }
        // playid#单价unitprice#  行用加号分隔，每个号用竖线分隔
      })
      console.log('data1', data)
      return data
    },
    processDanshiCartData(item, container) {
      if (item.danshiExcl && item.danshiExcl.length) {
        let data = Array.isArray(item.arr2) ? item.arr2[0] : item.arr2
        data = data.includes(' ') ? data.split(' ').join('|') : data
        container.push(`${item.playid}#${item.totalPrice}#${data}`)
      }
    },
    processSSCCartData(item, container) {
      // 单式
      if (item.danshiExcl && item.danshiExcl.length) {
        let data = Array.isArray(item.arr2) ? item.arr2[0] : item.arr2
        data = data.includes(' ') ? data.split(' ').join('|') : data
        container.push(`${item.playid}#${item.unitPrice}#${data}`)
      } else if (item.arr2.length === 1) {
        // 单行
        const values = []
        item.arr2.forEach(x => {
          if (x.includes('|')) {
            values.push(...x.split('|'))
          } else {
            values.push(x)
          }
        })
        container.push(`${item.playid}#${item.unitPrice}#${values.join('+')}`)
      } else {
        // 多行
        let values = item.arr2.join('+')
        // 定位胆
        if (item.peilvType === RenderTypes.DWD) {
          values = item.dwdValuesArr.filter(x => x.length).join('+')
        }
        const str = `${item.playid}#${item.unitPrice}#${values}`
        container.push(str)
      }
    },
    // 处理六合彩数据
    processLHCCartData(item, container) {
      if ([8, 21].includes(item.playid)) {
        const str = `${item.playid}#${item.unitPrice}#${item.arr2[0]
          .split('|')
          .join('+')}`
        container.push(str)
      } else {
        const str = `${item.playid}#${item.unitPrice}#${item.arr2}`
        console.log(str)
        container.push(str)
      }
    }
  },
  computed: {
    ...mapState({
      sysinfo: state => state.sysinfo,
      qishu: state => state.betting.qishu,
      betData: state => state.betting.betData,
      speed: state => state.betting.speed,
      userBalance: state => state.userinfo.accountInfo.price
    }),
    zhushu() {
      if (this.cart.length) {
        let c = 0
        this.cart.forEach(x => {
          c += x.zhushu
        })
        this.setCartNumber(c)
        return c * (Number.isNaN(this.auto) ? 1 : Number(this.auto))
      } else {
        this.setCartNumber(0)
        return 0
      }
    },
    totalCartPrice() {
      if (this.cart.length) {
        let c = 0
        this.cart.forEach(x => {
          const _totalPrice = x.zhushu * x.unitPrice
          x.totalPrice = _totalPrice
          c += _totalPrice * this.auto * this.chaseBeiShu
        })
        return c.toFixed(2)
      } else return 0
    },
    hasDirectBet() {
      const a =
      ['tzyx', 'xync', 'xypk', 'pkniuniu', 'qxc'].includes(this.$store.state.betting.js_tag) ||
        this.nameTag.includes('ff') ||
        this.nameTag.includes('sf') ||
        this.nameTag.includes('wf') ||
        (this.switches === '双面玩法' &&
          !['k3', 'lhc', 'tzyx', 'xync', 'xypk', 'pkniuniu', 'qxc'].includes(this.$store.state.betting.js_tag))
      return a
    }
  }
}
