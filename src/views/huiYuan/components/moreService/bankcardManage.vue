<template>
  <div class="bankcardManage_main_body">
    <publicHead :title="funcName" :type="5"></publicHead>
    <div class="main_content">
      <router-link to='/moreService/bindingBankcard'>
        <yd-cell-item arrow class="add-card" @click="go">
          <div class="to_binding" slot="right">
            <span>
              <img src="../../../../img/security_center/add_bankcard.png" alt="">
            </span>
            <span>添加银行卡</span>
          </div>
        </yd-cell-item>
      </router-link>
      <div class="bank_card_list">
        <div v-for="(item, index) in cardList" :key="index" :class="[{'active': cardIndex==index}, 'bank_lists']" @click="callMenu(item, index)">
          <img :src="`/assets/recharge/bank/${item.bank_type>30?'-1':item.bank_type}.png`" alt="" class="bank_card">
          <img :src="require('../../../../img/security_center/default_mark.png')" alt="" class="default_mark" v-show="item.is_default==1">

          <div class="info">
            <div class="img">
              <img :src="`/assets/recharge/bank_logo/${item.bank_type>30?'-1':item.bank_type}.png`" alt="">
            </div>
            <div class="txt">
              <div>{{item.bank_typename}}</div>
              <div>储蓄卡</div>
            </div>
          </div>
          <p>{{item.card_num.substr(0,4)+' **** **** ' + item.card_num.substr(-4)}}</p>
        </div>
      </div>
    </div>
    <yd-actionsheet :items="cardOptions" v-model="isShowOptions" cancel="取消"></yd-actionsheet>
    <yd-popup v-model="popIsShow" position="center" width="80%" class="password_win">
      <p>请输入交易安全码</p>
      <input type="tel" v-model="dealPW">
      <p>
        <button @click="popIsShow=false">取消</button>
        <button @click="deleteCard">确定</button>
      </p>
    </yd-popup>
  </div>
</template>
<script>
import publicHead from './publicHead'
export default {
  components: {
    publicHead,
  },
  data() {
    return {
      funcName: '银行卡',
      cardList: [],
      bgImgSrc: '',
      cardOptions: [],
      isShowOptions: false,
      cardContent: '',
      cardIndex: 0,
      popIsShow: false,
      dealPW: '',
    }
  },
  activated() {
    this.$dialog.loading.open('正在加载中···')
    this.dealPW = ''
    this.getData()
  },
  methods: {
    go() {
      this.$router.push('/moreService/bindingBankcard')
    },

    getData() {
      this.$ajax('request', {
        ac: 'getUserBankCard',
      }).then(res => {
        this.cardList = res
        this.$dialog.loading.close()
      })
    },
    callMenu(a, i) {
      this.isShowOptions = true
      this.cardContent = a
      this.cardIndex = i
      console.log(i)
      let m = [
        {
          label: '设为默认银行卡',
          callback: () => {
            this.$dialog.loading.open('正在加载中···')
            this.$ajax('request', {
              ac: 'setUserBankDefault',
              id: this.cardContent.id,
            }).then(res => {
              this.$dialog.alert({ mes: '修改成功!' })
              for (let i = 0; i < this.cardList.length; i++) {
                this.cardList[i].is_default = 0
              }
              this.cardList[this.cardIndex].is_default = 1
              this.$dialog.loading.close()
            })
          },
        },
        {
          label: '修改',
          callback: () => {
            this.$router.push({
              name: 'bangdingyinhangka',
              params: this.cardContent,
            })
          },
        },
        {
          label: '解除绑定',
          callback: () => {
            this.popIsShow = true
          },
        },
      ]
      if (a.is_default == 1) {
        m.shift()
        this.cardOptions = m
      } else {
        this.cardOptions = m
      }
    },
    deleteCard() {
      if (this.dealPW == '') {
        this.$dialog.alert({ mes: '安全码不能为空' })
      } else {
        this.$ajax('request', {
          ac: 'delUserBankCard',
          id: this.cardContent.id,
          tk_pass: this.dealPW,
        }).then(res => {
          this.popIsShow = false
          this.$dialog.loading.open('正在加载中···')
          this.dealPW = ''
          this.cardList.splice(this.cardIndex,1)
          this.$dialog.loading.close()
          // this.getData()
        })
      }
    },
  },
  watch: {
    dealPW(value, old) {
      if (value.length > 4) {
        this.dealPW = old
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.bankcardManage_main_body {
  .main_content {
    height: 100%;
    padding-bottom: 1rem;
    background-color: #1d1d1d;
    .add-card {
      height: poTorem(50px);
      .to_binding {
        width: 100%;
        text-align: left;
        font-size: poTorem(20px);
        color: #fff;
        span {
          img {
            width: poTorem(14px);
            height: poTorem(15px);
          }
        }
      }
    }

    .bank_card_list {
      @include center;
      flex-wrap: wrap;
      .bank_lists {
        height: poTorem(94px);
        width: 90%;
        position: relative;
        margin-top: poTorem(20px);
        transition: all 0.1s linear;
        p {
          position: absolute;
          right: poTorem(20px);
          top: poTorem(40px);
          font-size: poTorem(18px);
          color: #fff;
        }
        .bank_card {
          width: 100%;
          height: 100%;
        }
        .default_mark {
          position: absolute;
          top: 0;
          right: 0;
          width: poTorem(40px);
          height: poTorem(40px);
        }
        .info {
          position: absolute;
          top: poTorem(10px);
          left: poTorem(12px);
          display: flex;
          .img {
            height: poTorem(40px);
            width: poTorem(40px);
            margin-right: poTorem(10px);
            img {
              width: poTorem(40px);
            }
          }
          .txt {
            color: #accecd;
            div:nth-child(1) {
              font-size: poTorem(18px);
            }
            div:nth-child(2) {
              font-size: poTorem(14px);
            }
          }
        }
      }
      .active {
        border: 1px dashed #fff;
        border-radius: poTorem(5px);
        width: 94%;
        height: poTorem(100px);
      }
    }
  }
}
.password_win {
  input {
    text-align: center;
    text-security: disc;
    -webkit-text-security: disc;
    -mox-text-security: disc;
  }
}
</style>


