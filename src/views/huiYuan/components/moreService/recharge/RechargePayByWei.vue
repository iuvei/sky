<template>
  <div class="confirm_man_info">
    <p class="choose_titile">
      <span></span>
      <span>{{(text[0]||"")+ (manData.man ? '转账信息' : '第三方转账信息')}}</span>
    </p>
    <p class="account_num" v-show="manData.man">
      <input type="text" :placeholder="'请输入'+text[1]" v-model="account">
    </p>
    <div class="man_info">
      <p v-if="!manData.man">
        <span>订单号：{{manData.dingdan}}</span>
      </p>
      <p>
        <span>充值金额：
          <i style="color:#e33939">{{manData.money}}</i>元</span>
      </p>
      <p class="account" v-if="manData.man && manData.show">
        <span>收款账号：
          <i style="color:#fc7c34">{{manData.account}}</i>
        </span>
        <button v-clipboard:copy="manData.account" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</button>
      </p>
      <p v-if="!manData.show">
        <span>收款人：</span>
        <span>{{manData.name}}</span>
      </p>
      <p class="account_img">
        <img :src="qrcode" alt="">
      </p>
      <p class="btn_group">
        <span @click="confirmPersonal">上一步</span>
        <span @click="submit">立即充值</span>
        <!-- <a :href="qrcode"></a> -->
      </p>
      <div class="step">扫码步骤：</div>
      <div class="step" v-html="decode(stepTips[text[3]])"></div>
      <!-- <div v-html="str"></div> -->
      <!-- <p>1.先输入{{text[1]}}，后点击“立即充值”将自动为您下载二维码并保存，同时打开{{text[2]}}</p>
      <p>2.请在{{text[2]}}中打开“扫一扫”</p>
      <p>3.在扫一扫中点击右上角，选择“从相册选取二维码”，选取保存的图片</p>
      <p>4.输入您欲充值的金额并进行转账。如充值未到账，请联系在线客服</p> -->
      <!-- <a href="weixin://">1234</a> -->
      <!-- <a href="mqqapi://">1234</a> -->
      <!-- <a href="alipay://">1234</a> -->
      <a :href="schemes" v-show="false" ref='schemes'></a>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { randomFormtoken } from '~/js/user/gsfunc'
import { setTimeout } from 'timers'
export default {
  props: ['manData'],
  data() {
    return {
      account: '',
      // str: "<div>123</div>",
      titleTxt: ['微信', '支付宝', 'QQ'],
      step1Txt: ['微信账号', '支付宝账号', 'QQ号码'],
      step2Txt: ['微信', '支付宝', 'QQ'],
      stepAjax: ['weixin_step', 'alipay_step', 'qq_step', 'bank_step'],
      schemesArr: [
        'weixin://',
        'alipayqr://platformapi/startapp?saId=10000007',
        'mqqwpa://im/chat?chat_type=wpa&version=1&src_type=web&web_src=b.qq.com'
      ]
      // typeMapTip: new map([]),
    }
  },
  computed: {
    ...mapState('recharge', ['stepTips']),
    ...mapState('member', ['fileService']),
    schemes() {
      return this.schemesArr[this.manData.weiType]
    },
    text() {
      return [
        this.titleTxt[this.manData.weiType] || '',
        this.titleTxt[this.manData.weiType] || '',
        this.step2Txt[this.manData.weiType] || '',
        this.stepAjax[this.manData.weiType] || ''
      ]
    },
    qrcode() {
      return this.manData.man == 1 ? this.manData.qrcode : this.manData.url
      // : `${this.fileService}/Uploads/qrcode/${this.manData.qrcode}`;
    }
  },
  mounted() {
    // console.log(this.text);
    if (localStorage['step-' + this.text[3]]) {
      this.account = localStorage['step-' + this.text[3]]
    }
  },
  methods: {
    download(url, cb, name = '') {
      const aLink = document.createElement('a')
      aLink.download = name
      aLink.href = url
      // aLink.target = '_blank'

      if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
        cb && cb()
        // setTimeout(() => {
        //   aLink.click()
        // }, 1000)
      } else {
        aLink.click()
        // aLink.dispatchEvent(new MouseEvent('click', {}))
        cb && cb()
      }
    },
    decode(html) {
      var temp = document.createElement('div')
      temp.innerHTML = html
      var output = temp.innerText || temp.textContent
      temp = null
      // return html.replace(/(\r\n)|(\n)/g, "<br>");
      return output === 'undefined' ? '' : output
    },
    onCopy() {
      this.$dialog.alert({ mes: '复制成功' })
    },
    onError() {
      this.$dialog.alert({ mes: '复制失败' })
    },
    confirmPersonal() {
      // this.$emit('backstep')
      this.$router.back()
    },
    /**
     * man 为 1 时, show为 0 或1
     * man 为 0 是, qrcode为 0 或1
     */
    submit() {
      localStorage['step-' + this.text[3]] = this.account
      if (!this.account && this.manData.show !== true) {
        this.$dialog.toast({ mes: '请输入账号' })
        return false
      }
      // console.log(this.$refs.schemes)
      // if (this.account && this.manData.show) {
      if (this.manData.man) {
        this.$ajax('request', {
          ac: 'submitPayQrcode',
          client_type: 1,
          id: this.manData.id,
          price: this.manData.money,
          type: this.manData.type,
          account: this.account,
          form_unique_token: randomFormtoken()
        }).then(res => {
          //debugger
          // if (res) {
          //   this.$emit('toSuccess')
          // }
          this.$dialog.alert({
            mes: '订单已提交成功，请勿重复提交！如未打开app请手动扫码'
          })
        })
      }
      this.download(
        this.qrcode,
        () => {
          setTimeout(() => {
            this.$refs.schemes.click()
          }, 1000)
        },
        'qrcode'
      )

      // return 这里return的话就无法生成订单了
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
.confirm_man_info {
  background-color: #fff;
  .account_num {
    input {
      outline: none;
      border: none;
      border-bottom: poTorem(1px) solid #f3f3f3;
      width: 100%;
      height: poTorem(40px);
      font-size: poTorem(15px);
      text-indent: 2rem;
      line-height: poTorem(40px);
    }
  }
  .man_info {
    padding: poTorem(20px);
    p {
      font-size: poTorem(15px);
      color: #535353;
      line-height: poTorem(30px);
      &:nth-child(n + 7) {
        text-indent: 2rem;
      }
    }
    .step {
      font-size: poTorem(15px);
      color: #535353;
      line-height: poTorem(30px);
    }
    .account {
      @include between;
      button {
        &:last-child {
          display: inline-block;
          width: poTorem(53px);
          height: poTorem(23px);
          line-height: poTorem(21px);
          border: poTorem(1px) solid #ff7c34;
          border-radius: poTorem(12px);
          text-align: center;
          color: #ff7c34;
        }
      }
    }
    .account_img {
      text-align: center;
      padding: poTorem(20px);
      img {
        width: poTorem(150px);
        height: poTorem(150px);
      }
    }
    .btn_group {
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
</style>

