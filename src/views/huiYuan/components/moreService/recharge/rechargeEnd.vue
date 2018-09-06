<template>
  <div>
    <publicHead :title="funcName" :type="5" @dontGoBack="controlShow"></publicHead>
    <RechargePayByWei v-if="showView===3" :manData="manData" @backstep="specialShow=true" @toSuccess="toSuccess"></RechargePayByWei>
    <RechargePayByOnline v-if="showView===2" :manData="manData" @backstep="specialShow=true" @toSuccess="toSuccess"></RechargePayByOnline>
    <RechargePaySuccess v-if="showView===200" :money="money" @backstep="toFirstStep"></RechargePaySuccess>
  </div>
</template>
<script>
import publicHead from '../publicHead'
import Component from './index'
import { mapState, mapMutations, mapActions } from 'vuex'
import { randomFormtoken } from '~/js/user/gsfunc'
import { PayConnect } from '~/js/PayConnect'
import { setTimeout } from 'timers'
import axios from 'axios'

export default {
  components: {
    publicHead,
    ...Component
  },
  sockets: {
    connect() {
      console.log('socket connected')
    }
  },
  // directives: { ...Directives },
  computed: {
    ...mapState({
      user_price: store => store.userinfo.accountInfo.price,
      username: store => store.userinfo.accountInfo.username
    })
  },
  data() {
    return {
      specialShow: true,
      funcName: '充值',
      weiView: [],
      manBankView: [],
      onlineView: [],
      showView: 0,
      manData: {},
      paySuccess: false,
      payType: '', // 13银联 5支付宝 3微信 11QQ 15转账 1在线支付
      rechargeSum: [10, 100, 300, 500, 1000, 3000, 5000, 10000],
      dynamicFormData: {},
      active: -1,
      money: '',
      temp: 0,
      // 定义QQ 微信 支付宝的map映射
      mapType: new Map([[3, 0], [5, 1], [11, 2]])
    }
  },
  activated() {
    this.payType = parseInt(this.$route.query.payType)
    this.funcName = this.$route.query.funcName
    // this.getPayData()
    this.getDefaultTips()
    this.manData = this.$route.params.manData
    this.money = this.manData.money
    this.showView = this.$route.params.showView
  },
  methods: {
    ...mapMutations(['SET_BALANCE']),
    ...mapActions(['flushPrice']),
    ...mapActions('recharge', ['getDefaultTips']),
    toSuccess() {
      this.temp = this.showView
      this.showView = 200
    },
    toFirstStep() {
      this.specialShow = true
      this.showView = this.temp
    },
    controlShow() {
      if (!this.specialShow) {
        this.showView = this.temp
        this.specialShow = true
      } else {
        this.$router.back()
      }
    },
    dealPayData(res) {
      switch (this.payType) { // 13银联 5支付宝 3微信 11QQ 15转账 1在线支付
        case 1:
          this.onlineView = res
          this.showView = 1
          break
        case 15:
          this.manBankView = res
          this.showView = 2
          break
        default:
          this.weiView = res
          this.showView = 3
          break
      }
    },
    getPayData() {
      this.$dialog.loading.open(' ')
      this.$ajax('request', {
        ac: 'getPayDataByUtype',
        type: this.payType,
        https:window.location.protocol.indexOf('https')==0?'1':'0'
      }).then(res => {
        this.dealPayData(res)
        this.$dialog.loading.close()
      })
    },
    viewItemClick(item) {
      if (!this.money) {
        this.$dialog.alert({ mes: '请输入正确充值金额！' })
        return
      }
      this.temp = this.showView
      this.specialShow = false
      switch (this.payType) {
        case 1:
          // this.manData = item;
          // this.submitPayThrid(
          //   Object.assign({ type: 1, subtype: item.id }, item)
          // )
          this.submitPayThrid({ type: 1, subtype: item.id }, item)
          break
        case 15:
          item.money = this.money
          this.manData = item
          break
        // case 13:
        //   this.submitPayThrid({ type: item.type, thrid_id: item.id })
        //   break;
        default:
          this.viewWeiGoPay(item)
          break
      }
    },
    // 三方支付
    submitPayThrid(params, passItem) {
      console.log('params', params, passItem)
      // const _this = this
      if (
        passItem.hasOwnProperty('is_socket') &&
        [1, 2].includes(passItem.is_socket)
      ) {
        this.$dialog.loading.open(' ')
        if (passItem.is_socket === 1) {
          this.doWebScoketPay(passItem)
        } else if (passItem.is_socket === 2) {
          this.doHttpPay(passItem)
        }

        return
      } else {
        this.$dialog.loading.open(' ')
        let request = {
          ac: 'submitPayThrid',
          price: this.money,
          form_unique_token: randomFormtoken(),
          ...params
        }
        this.$ajax('request', request).then(res => {
          let data = res.data.split('&').map(r => {
            let obj = r.split('=>')
            return { [obj[0]]: obj[1] }
          })
          console.log(res)
          this.dynamicFormData = {
            url: res.url.replace(/\\\//g, '/'),
            method: res.method,
            data: Object.assign(...data),
            qrcode: res.qrcode,
            money: res.price,
            showQrcode: true,
            show: true,
            dingdan: res.dingdan
          }
          this.$dialog.loading.close()
        })
      }
    },
    viewWeiGoPay(item) {
      console.log(this.mapType.get(this.payType), this.payType)
      if (item.man) {
        item.money = this.money
        item.weiType = this.mapType.get(this.payType)
        this.manData = item
        console.log(item)
      } else {
        this.specialShow = true

        this.submitPayThrid({ type: item.type, thrid_id: item.id }, item)
      }
    },
    showWeiMan1() {
      this.specialShow = false
      this.showView = 3
      this.manData = this.dynamicFormData
      this.manData.weiType = this.mapType.get(this.payType)
    },

    chooseSum(a, b) {
      this.money = a
      this.active = b
    },
    async refreshUserinfo() {
      this.$dialog.loading.open('正在刷新')
      let res = await this.flushPrice()
      if (res) {
        this.$dialog.loading.open('刷新成功')
      }
      setTimeout(() => {
        this.$dialog.loading.close()
      }, 500)
    },

    // 开始 WebSocket 支付请求
    doWebScoketPay(passItem) {
      const _this = this
      const config = {
        errorRepeatTime: 30,
        url: `ws://${passItem.url}`, // 'ws://23.100.88.43:9000', //params.url,
        data: passItem.data || passItem.socket_data,
        price: _this.money,
        callback: event => {
          this.afterWebSocketConnet(event)
        },
        errorCallback: event => {
          let i = 0
          let _this = this
          setTimeout(() => {
            config.errorRepeatTime--
            new PayConnect(config)
          }, 2000)
        },
        afterErrorCallback: () => {
          _this.$dialog.toast({ mes: '该通道连接超时，请选择其他通道' })
          _this.$dialog.loading.close()
        }
      }

      let conn = new PayConnect(config)
    },

    // 开始 Http post 支付请求
    doHttpPay(passItem) {
      const _this = this
      const params = `data=${passItem.data || passItem.socket_data}&price=${
          _this.money
        }`,
        header = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      console.log('doHttpPay', params)
      axios.post(passItem.url, params, header).then(result => {
        console.log(result)
        _this.postToPay(result, _this)
      })
    },
    // WebSocket请求处理后置操作
    afterWebSocketConnet(evt) {
      const _this = this
      _this.$dialog.loading.close()
      // console.log('Received Message: ' + evt.data)
      if (evt && evt.data) {
        let data = JSON.parse(evt.data)
        if (data.msg === 0 && data.data) {
          // let _data = data.data.data.split('&').map(r => {
          //   let obj = r.split('=>')
          //   return { [obj[0]]: obj[1] }
          // })
          // // console.log(res)
          // const res = data.data
          // _this.dynamicFormData = {
          //   url: res.url.replace(/\\\//g, '/'),
          //   method: res.method,
          //   data: Object.assign(..._data),
          //   qrcode: res.qrcode,
          //   money: res.price,
          //   showQrcode: true,
          //   show: true,
          //   dingdan: res.dingdan
          // }
          // console.log(
          //   'this.dynamicFormData',
          //   JSON.stringify(this.dynamicFormData)
          // )
          _this.postToPay(data, _this)
        } else {
          _this.$dialog.toast({
            mes: data.param
          })
        }
      }
    },
    // 跨域构造post参数并提交
    postToPay(response, _this) {
      if (response.data.msg === 0) {
        const res = response.data.data
        // const res = data.data
        let _data = res.data.split('&').map(r => {
          let obj = r.split('=>')
          return { [obj[0]]: obj[1] }
        })

        _this.dynamicFormData = {
          url: res.url.replace(/\\\//g, '/'),
          method: res.method,
          data: Object.assign(..._data),
          qrcode: res.qrcode,
          money: res.price,
          showQrcode: true,
          show: true,
          dingdan: res.dingdan
        }
        console.log(
          'this.dynamicFormData',
          JSON.stringify(this.dynamicFormData)
        )
      } else {
        _this.$dialog.toast({
          mes: response.data.param
        })
      }
      this.$dialog.loading.close()
      // console.log(res)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
.rechargeStep_main_body {
  .rechargeStep_main_content {
    background-color: #f3f3f3;
    height: poTorem(688px);
    .account_info {
      padding: poTorem(5px);
      @include between;
      // background-color: #efeff4;
      height: poTorem(45px);
      span {
        font-size: 17px;
        color: #707070;
      }
      .red {
        color: #e33939;
      }
      .black {
        color: #313131;
      }
      img {
        width: poTorem(19px);
        vertical-align: bottom;
      }
    }
    .choose_sum {
      background-color: #fff;
      padding: poTorem(5px);
      .type_sum {
        font-size: 18px;
        color: #707070;
        height: poTorem(35px);
        line-height: poTorem(35px);
        input {
          text-align: center;
          width: poTorem(180px);
          height: poTorem(28px);
          border: none;
          border-bottom: 1px solid #a4a4a4;
          // margin: 0 poTorem(20px);
        }
      }
      .recharge_sum {
        margin-top: poTorem(15px);
        @include around;
        flex-wrap: wrap;
        p {
          font-size: poTorem(14px);
          color: #767675;
          text-align: center;
          line-height: poTorem(34px);
          border: 1px solid #eee;
          border-radius: poTorem(3px);
          width: poTorem(90px);
          height: poTorem(36px);
          margin-bottom: poTorem(11px);
          margin-right: poTorem(3px);
        }
        .selected {
          background-color: #f54d42;
          color: #fff;
        }
      }
    }
    .choose_titile {
      font-size: poTorem(14px);
      color: #707070;
      height: poTorem(35px);
      line-height: poTorem(32px);
      background-color: #f3f3f3;
      padding: 0 poTorem(5px);
      span {
        display: inline-block;
        &:first-child {
          height: poTorem(15px);
          width: poTorem(15px);
          border: poTorem(2px) solid #e33939;
          border-radius: 50%;
          vertical-align: middle;
        }
        &:last-child {
          vertical-align: middle;
        }
      }
    }
    .bank_transfer {
      .transfer_parts {
        background-color: #fff;
        padding: poTorem(20px);
        font-size: poTorem(15px);
        color: #535353;
        p {
          line-height: poTorem(30px);
          span {
            &:first-child {
              display: inline-block;
              width: poTorem(100px);
            }
            &:nth-child(3) {
              display: inline-block;
              width: poTorem(53px);
              height: poTorem(23px);
              line-height: poTorem(21px);
              border: poTorem(1px) solid #ff7c34;
              border-radius: poTorem(12px);
              text-align: center;
              color: #ff7c34;
              margin-left: poTorem(10px);
            }
          }
          .bank_name {
            width: poTorem(178px);
            height: poTorem(27px);
            line-height: poTorem(25px);
            border: poTorem(1px) solid #bababa;
            display: inline-block;
            border-radius: poTorem(3px);
            text-align: center;
          }
          input {
            border: poTorem(1px) solid #bababa;
            border-radius: poTorem(3px);
            outline: none;
            font-size: poTorem(13px);
            text-align: center;
            width: poTorem(178px);
            height: poTorem(27px);
            line-height: poTorem(25px);
          }
          .deposit_num {
            width: poTorem(94px);
          }
        }
      }
      .choosed_type {
        position: relative;
        font-size: poTorem(15px);
        color: #535353;
        line-height: poTorem(30px);
        height: poTorem(30px);
        span {
          display: inline-block;
          line-height: poTorem(28px);
          height: poTorem(30px);
          width: 100%;
          border: none;
          outline: none;
          border-top: poTorem(1px) solid #e3e3e3;
          border-bottom: poTorem(1px) solid #e3e3e3;
          text-align: center;
          background-color: #fff;
        }
        img {
          width: poTorem(13px);
          position: absolute;
          top: poTorem(8px);
          right: poTorem(50px);
        }
      }
    }
    .transfer_tips {
      padding: poTorem(10px) poTorem(20px);
      background-color: #fff;
      font-size: poTorem(15px);
      color: #535353;
      text-align: center;
      img {
        width: poTorem(15px);
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
    }
    .transfer_btn {
      padding-top: poTorem(100px);
      @include center;
      margin-bottom: poTorem(8px);
      span {
        display: inline-block;
        width: poTorem(118px);
        height: poTorem(35px);
        font-size: poTorem(18px);
        color: #fff;
        text-align: center;
        background-color: #ff7c34;
        border-radius: poTorem(5px);
        line-height: poTorem(35px);
        &:first-child {
          margin-right: poTorem(5px);
        }
        &:last-child {
          margin-left: poTorem(5px);
        }
      }
    }
  }
}
</style>


