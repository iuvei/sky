<template>
  <div class="getCash_main_body">
    <publicHead :title="funcName" :type="6"></publicHead>
    <div class="getCash_main_content other-block">
      <div class="people_info">
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">收款姓名</span>
            <span slot="right">{{allData.real_name}}</span>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">账户余额</span>
            <span slot="right">¥{{allData.price}}</span>
          </yd-cell-item>
        </yd-cell-group>
      </div>
      <div class="get_cash_info">
        <p class="title">消费比例</p>
        <div class="info_detail">
          <div>
            <p class="option_name">
              <span>提款需达投注量：</span>
              <span>{{allData.price_rq}}</span>
            </p>
            <p class="option_name">
              <span>是否可以提款：</span>
              <span>{{allData.tk_where?'是':'否'}}</span>
            </p>
          </div>
          <div>
            <p class="option_name">
              <span>已达投注量：</span>
              <span>{{allData.tz_count}}</span>
            </p>
            <p class="option_name">
              <span>手续费：</span>
              <span>今日还可免费
                <i class="free_times">{{allData.price_fee_count}}</i>次</span>
            </p>
          </div>
        </div>
      </div>
      <div class="bank_info">
        <yd-cell-group>
          <yd-cell-item type="label" arrow>
            <span slot="left">收款银行：</span>
            <select slot="right" v-model="choosedBank" @change="changeVal">
              <option :value="item.id" v-for="(item, index) in allData.banklist" :key="index">{{item.bank_typename}}</option>
            </select>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">收款账号：</span>
            <input slot="right" type="text" placeholder="请输入收款账号" v-model="bankCard" readonly>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">提款金额：</span>
            <input slot="right" type="number" :placeholder="`最小提款金额为${allData.min_take}元`" v-model="cashNum">
          </yd-cell-item>
          <yd-cell-item class="deal_pw">
            <span slot="left">交易密码：</span>
            <autofocusInput slot="left" ref="pwIpt"></autofocusInput>
          </yd-cell-item>
        </yd-cell-group>
      </div>
      <p class="service_charge">提款手续费：
        <span class="detail">{{totalCast}}元 （行政费：{{allData.xz_take}}元 + 手续费：{{allData.get_take}}元+ 扣除：{{allData.youhui}}元)</span>
      </p>
      <p class="confirmBtn" @click="popWinShowFunc">确认</p>
      <yd-popup v-model="popWinShow" position="center" width="80%" class="getCash_pop_win">
        <p class="title">提示</p>
        <p class="need_reduce">此次提款需要扣除手续费：
          <span class="deduct">{{totalCast}}</span>元
        </p>
        <p class="finally">最终将获得:
          <span class="get">{{cashNum-totalCast}}</span>元，您确定需要提款吗?</p>
        <p class="btn_box">
          <span @click="popWinShow=false">取消</span>
          <span @click="submitData">确定</span>
        </p>
      </yd-popup>
    </div>
  </div>
</template>
<script>
import publicHead from './publicHead'
import autofocusInput from './autofocusInput'
import { validate } from '~/js/user/gsfunc'
import { randomFormtoken } from '~/js/user/gsfunc'
import { mapActions, mapState } from 'vuex'
window.randomFormtoken = randomFormtoken
export default {
  components: {
    publicHead,
    autofocusInput
  },
  data() {
    return {
      funcName: '提款',
      allData: '',
      bankCard: '',
      choosedBank: '',
      cashNum: '',
      popWinShow: false,
      tk_pass: 0
    }
  },
  computed: {
    totalCast() {
      return (
        this.allData.xz_take * 1 +
        this.allData.get_take * 1 +
        this.allData.youhui * 1
      )
    },
    ...mapState({
      bank_typename: state => state.userinfo.accountInfo.bank_typename
    })
  },
  mixins: [validate],
  async activated() {
    // if (!this.bank_typename) {
    //   this.$router.push("/moreService/bindingBankcard");
    //   return;
    // }
    await this.togetTkPriceWhere()
    this.cashNum = ''
  },

  methods: {
    ...mapActions('recharge', ['getTkPriceWhere', 'getTkPrice']),
    togetTkPriceWhere() {
      this.getTkPriceWhere().then(res => {
        if (!res) {
          this.$router.replace({
            path: '/moreService/bindingBankcard',
            query: { rent: true }
          })
          return
        }
        this.allData = res
        this.choosedBank = res.bink_id
        this.bankCard = res.banklist.find(v => v.id == res.bink_id).card
        this.$dialog.loading.close()
      })
    },
    changeVal(n) {
      this.bankCard = this.allData.banklist[n.target.selectedIndex].card
    },
    popWinShowFunc() {
      let err = this.checkRequest()
      if (err) {
        return this.$dialog.toast({ mes: err.message })
      }
      // if (this.allData.price_rq * 1 > this.allData.tz_count * 1) {
      //   this.$dialog.toast({ mes: '当前投注量未完成，不可提现' })
      //   return
      // } else 
      if (this.totalCast * 1 > this.cashNum * 1) {
        this.$dialog.toast({ mes: '提现金额不可小于手续费' })
        return
      }
      this.popWinShow = true
    },
    checkRequest() {
      this.tk_pass =
        this.$refs.pwIpt.first +
        this.$refs.pwIpt.second +
        this.$refs.pwIpt.third +
        this.$refs.pwIpt.forth
      // console.log(`{{value}}<=${this.allData.max_take}`);
      let rule = [
        {
          name: 'cashNum',
          validator: true,
          message: '请输入提款金额'
        },
        {
          name: 'cashNum',
          validator: `{{value}}<=${this.allData.max_take}`,
          message: `最大提款金额为${this.allData.max_take}元`
        },
        {
          name: 'cashNum',
          validator: /^[0-9]*[1-9][0-9]*$/,
          message: '提款金额必须为整数'
        },
        { name: 'choosedBank', validator: true, message: '请选择银行卡' },
        {
          name: 'tk_pass',
          validator: /^[0-9]{4}$/,
          message: '请输入纯数字交易密码'
        }
      ]
      return this.MixinValidate(rule)
    },
    async submitData() {
      let request = {
        bankid: this.choosedBank,
        price: this.cashNum,
        tk_pass: this.tk_pass,
        form_unique_token: randomFormtoken()
      }
      this.getTkPrice(request)
        .then(res => {
          // this.$router.replace("/moreService/drawingsRecord");
          this.$router.replace({
            name: 'success',
            params: {
              price: this.cashNum
            }
          })
        })
        .finally(() => {
          this.popWinShow = false
        })
    }
  }
  // beforeRouteEnter(t, f, n) {
  //   n(vm => {

  //   });
  // },
}
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
@import "../../../../css/common.scss";
input,
select {
  height: poTorem(20px);
  line-height: poTorem(18px);
  font-size: poTorem(16px);
  color: #555;
}
.getCash_main_body {
  flex: 1;
  // height: 100%;
  // position: relative;
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
  .getCash_main_content {
    height: 100%;
    background-color: #eee;
    // text-align: center;
    .get_cash_info {
      &:after {
        content: "";
        width: 100%;
        border-bottom: 1px solid #b2b2b2;
        transform: scaleY(0.5);
      }
      // height: poTorem(80px);
      padding: poTorem(10px);
      background-color: #fff;
      margin-top: poTorem(20px);
      .title {
        font-size: poTorem(15px);
        color: #2d2d2d;
        height: poTorem(30px);
        line-height: poTorem(30px);
      }
      .info_detail {
        @include around;
        .option_name {
          span {
            font-size: poTorem(14px);
            &:first-child {
              color: #b5b5b5;
            }
            &:nth-child(2) {
              color: #2d2d2d;
            }
            .free_times {
              color: #e33939;
            }
          }
        }
      }
    }
    .bank_info {
      margin-top: poTorem(20px);
      select {
        font-size: poTorem(16px);
      }
      input {
        font-size: poTorem(16px);
      }
    }
    .confirmBtn {
      width: poTorem(300px);
      height: poTorem(36px);
      background-color: #ff7c34;
      line-height: poTorem(36px);
      font-size: poTorem(18px);
      color: #fff;
      text-align: center;
      margin: auto;
    }
    .service_charge {
      font-size: poTorem(12px);
      padding: poTorem(20px);
      color: #2f2f2f;
      .detail {
        color: #e33939;
      }
    }
    .getCash_pop_win {
      text-align: center;
      .title {
        font-size: 1.1rem;
        color: #171717;
      }
      .need_reduce,
      .finally {
        font-size: poTorem(14px);
        color: #595959;
        padding: poTorem(10px) 0;
        .deduct {
          color: #e33939;
        }
        .get {
          color: #090;
        }
      }
      .btn_box {
        border-top: poTorem(1px) solid #ccc;
        height: poTorem(40px);
        width: 100%;
        // line-height: poTorem(40px);
        span {
          display: inline-block;
          width: 49%;
          height: poTorem(40px);
          line-height: poTorem(40px);
          font-size: poTorem(20px);
          &:first-child {
            color: #1d86fe;
            border-right: poTorem(1px) solid #ccc;
          }
          &:last-child {
            color: #ff443a;
          }
        }
      }
    }
  }
}
</style>


