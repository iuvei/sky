<template>
  <div class="bindingBankcard_main_body">
    <publicHead :title="funcName" :type="5"></publicHead>
    <div class="main_content">
      <p>请如实填写您的出款银行资料，以免有心人士窃取</p>
      <p>卡号信息</p>
      <yd-cell-item>
        <span slot="left">开户人姓名：</span>
        <input slot="right" type="text" placeholder="请输入开户名" v-model="realName">
      </yd-cell-item>
      <yd-cell-item type="label">
        <span slot="left">开户银行：</span>
        <select slot="right" v-model="selectedBank" v-show="selectedBank!==-1">
          <option value="0">请选择银行卡</option>
          <option :value="item.index" v-for="(item, index) in bankType" :key="index">{{item.bank}}</option>
        </select>
        <input slot="right" type="text" placeholder="输入其他银行" v-model="more_bank" v-if="selectedBank===-1">
        <div slot="right" @click="resetSelect">
          <span class="right-icon"></span>
        </div>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">银行卡账号：</span>
        <input slot="right" type="text" :placeholder="bankNumTxt" v-model="bankNum" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/">
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">开户省/市：</span>
        <input slot="right" type="text" placeholder="请输入省/市" v-model="province">
      </yd-cell-item>
      <!-- <yd-cell-item>
        <span slot="left">开户银行省份：</span>
        <input slot="right" type="text" placeholder="请输入省份" v-model="province">
      </yd-cell-item> -->
      <!-- <yd-cell-item>
        <span slot="left">开户银行城市：</span>
        <input slot="right" type="text" placeholder="请输入城市" v-model="city">
      </yd-cell-item> -->
      <yd-cell-item>
        <span slot="left">开户行详细地址：</span>
        <input slot="right" type="text" placeholder="请输入详细地址" v-model="address">
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">交易密码：</span>
        <autofocusInput slot="left" ref="dealPW"></autofocusInput>
      </yd-cell-item>
      <div v-show="!tkpass_ok" class="note">亲爱的用户，由于您没有设置过交易密码，将被设置成默认交易密码。</div>
      <p class="btn">
        <button @click="submitData">{{btnTXT}}</button>
      </p>
    </div>
  </div>
</template>
<script>
import publicHead from './publicHead'
import autofocusInput from './autofocusInput'
import { validate } from '~/js/user/gsfunc'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    publicHead,
    autofocusInput
  },
  mixins: [validate],
  data() {
    return {
      funcName: '绑定银行卡',
      cardContent: '',
      bankType: [],
      selectedBank: '0',
      bankNum: '',
      // card_sheng: "",
      bankNumTxt: '请输入银行卡账号',
      province: '',
      // city: "",
      address: '',
      PW: '',
      more_bank: '',
      btnTXT: '立即绑定',
      alertTXT: '添加成功',
      httpSign: 'addUserBankCard',
      realName: ''
    }
  },
  computed: {
    ...mapState({
      userinfo: state => state.userinfo,
      tkpass_ok: state => state.userinfo.accountInfo.tkpass_ok,
      real_name: state => state.userinfo.accountInfo.real_name
    })
  },
  deactivated() {
    this.funcName = '绑定银行卡'
    this.bankNumTxt = '请输入银行卡账号'
    this.selectedBank = '0'
    this.btnTXT = '立即绑定'
  },
  methods: {
    ...mapActions(['encodeLogin']),
    initModify() {
      this.cardContent = this.$route.params
      console.log(this.cardContent)
      this.address = this.cardContent.address
      this.selectedBank = this.cardContent.bank_type
      this.bankNum = this.cardContent.card_num
      this.bankNumTxt = this.cardContent.card_num
      // this.bankNumTxt = this.cardContent.card_num.replace(
      //   /(\d{4})\w+(\d{4})/,
      //   '$1 **** **** $2'
      // )
      this.more_bank = this.cardContent.bank_typename
      this.province = this.cardContent.card_sheng
      this.city = this.cardContent.card_shi
      this.httpSign = 'updateUserBankCard'
      this.funcName = '修改银行卡'
      this.btnTXT = '立即修改'
      this.alertTXT = '修改成功'
    },
    resetSelect() {
      if (this.selectedBank === -1) this.selectedBank = 1
    },
    getSubmitDataRule() {
      return [
        {
          name: 'realName',
          validator: true,
          message: '请输入开户名'
        },
        {
          name: 'selectedBank',
          validator: '{{value}}!=0',
          message: '请选择银行卡'
        },
        {
          name: 'bankNum',
          validator: /^(\d{10,20})$/,
          message: '请输入正确银行卡账号'
        },
        { name: 'province', validator: true, message: '请输入省/市' },
        // { name: "province", validator: true, message: "请输入省份" },
        // { name: "city", validator: true, message: "请输入城市" },
        // { name: "address", validator: true, message: "请输入详情地址" },
        {
          name: 'PW',
          validator: /^[0-9]{4}$/,
          message: '请输入纯数字交易密码'
        }
      ]
    },
    submitData() {
      // 匹配10-20位卡号
      // if (!/^(\d{10,20})$/.test(this.bankNum)) {
      //   this.$dialog.alert({ mes: '请输入正确的银行卡号' })
      //   return
      // }
      this.PW =
        this.$refs.dealPW.first +
        this.$refs.dealPW.second +
        this.$refs.dealPW.third +
        this.$refs.dealPW.forth

      let err = this.MixinValidate(this.getSubmitDataRule())
      if (err) {
        this.$dialog.toast({ mes: err.message })
        return
      }
      this.$ajax('request', {
        ac: this.httpSign,
        id: this.cardContent.id,
        type: this.selectedBank,
        card_num: this.bankNum || this.cardContent.card_num,
        card_sheng: this.province,
        // card_shi: this.city,
        more_bank: this.more_bank,
        address: this.address,
        tk_pass: this.PW,
        realname: this.realName
      })
        .then(res => {
          this.$dialog.toast({ mes: this.alertTXT })
          // this.$router.push("/moreService/bankcardManage");
          return this.encodeLogin()
        })
        .then(res => {
          if (this.$route.query.rent) {
            this.$router.replace('/moreService/NgetCash')
          } else {
            this.$router.back()
          }
        })
    }
  },
  activated() {
    // if (!this.real_name) {
    //   this.$dialog.alert({ mes: "请先设置真实姓名" });
    //   this.$router.push({
    //     name: "xiugaizhenshixingming",
    //     params: { from: "bind" },
    //   });
    //   return;
    // }
    // // 没设置交易密码
    // if (!this.tkpass_ok) {
    //   this.$dialog.alert({ mes: "请先设置交易密码" });
    //   this.$router.push({
    //     name: "xiugaijiaoyimima",
    //     params: { from: "bind" },
    //   });
    //   return;
    // }
    this.bankNum = ''
    this.province = ''
    this.address = ''
    this.$refs.dealPW.first = ''
    this.$refs.dealPW.second = ''
    this.$refs.dealPW.third = ''
    this.$refs.dealPW.forth = ''
    this.$dialog.loading.open('正在加载中···')
    this.$ajax('request', {
      ac: 'getBankCardList'
    }).then(res => {
      this.realName = this.userinfo.accountInfo.real_name
      this.bankType = res.map(v => ({ index: v.id, bank: v.name }))
      // this.bankType.unshift({ index: 0, bank: "请选择银行类型" });
      this.bankType.push({ index: -1, bank: '其他银行' })
      // console.log(this.$route);
      this.selectedBank = '0'
      if (this.$route.params.id) {
        this.initModify()
      }
      this.$dialog.loading.close()
    })
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
input,
select {
  height: poTorem(20px);
  font-size: poTorem(16px);
}
.bindingBankcard_main_body {
  .main_content {
    background-color: #fff;
    height: poTorem(688px);
    padding: poTorem(20px) poTorem(10px);
    p {
      &:first-child {
        margin-bottom: poTorem(23px);
        font-size: poTorem(14px);
        color: #515151;
        text-align: center;
      }
      &:nth-child(2) {
        font-size: poTorem(18px);
        line-height: poTorem(18px);
        color: #515151;
        padding-left: poTorem(5px);
        border-left: poTorem(5px) solid #ff7c34;
      }
    }
    .note {
      margin-top: poTorem(23px);
      font-size: poTorem(14px);
      color: #515151;
      // text-align: center;
    }
    .right-icon::after {
      margin-left: 0.05rem;
      margin-right: -0.08rem;
      display: block;
      font-family: YDUI-INLAY;
      font-size: poTorem(18px);
      color: #c9c9c9;
      content: "\E608";
    }
    .btn {
      margin-top: poTorem(60px);
      text-align: center;
      button {
        width: poTorem(300px);
        height: poTorem(40px);
        font-size: poTorem(16px);
        line-height: poTorem(16px);
        color: #fff;
        background-color: #ff7c34;
        border-radius: poTorem(5px);
        outline: none;
        border: none;
      }
    }
  }
}
</style>



