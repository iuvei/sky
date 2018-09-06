<template>
  <div class="recharge_main_body">
    <publicHead :title="funcName" :type="5"></publicHead>
    <p class="choose_titile" v-show="false">
      <span></span>
      <span>请选择充值方式</span>
    </p>
    <yd-cell-group class="pay_option">
      <yd-cell-item arrow v-for="(item, index) in payType" :key="index" @click.native="goToNext(item)">
        <span slot="left">
          <img :src="'/assets/recharge/'+item.icon" alt="">
        </span>
        <span slot="left">{{item.name}}</span>
      </yd-cell-item>
    </yd-cell-group>
  </div>
</template>
<script>
import publicHead from "./publicHead";
import { mapState } from "vuex";
export default {
  components: {
    publicHead,
  },
  data() {
    return {
      funcName: "充值中心",
      styleType: 0,
      rechargeSum: [10, 100, 300, 500, 1000, 3000, 5000, 10000],
      active: -1,
      money: "",
      wetchat1: [],
      wetchat2: [],
      QQWallet1: [],
      QQWallet2: [],
      aliPay1: [],
      aliPay2: [],
      stateImgIndex1: 0,
      stateImgIndex2: -1,
      stateImgIndexQQ1: 0,
      stateImgIndexQQ2: -1,
      stateImgIndexAliPay1: 0,
      stateImgIndexAliPay2: -1,
      stateImgIndexTransfer: 0,
      // imgSrc1: require("../../../../img/recharge/default_state.png"),
      // imgSrc2: require("../../../../img/recharge/choosed_state.png"),
      transfer: [
        {
          bank: "中国工商银行",
          name: "曾秋平",
          branch: "来宾武宣支行",
        },
        {
          bank: "中国招商银行",
          name: "梁继伟",
          branch: "绵阳分行营业部",
        },
      ],
      choosedBank: false,
      bankName: "选择银行卡",
      anyBanks: [],
      payType: [],
    };
  },
  computed: {
    ...mapState({
      user_price: store => store.userinfo.accountInfo.price,
      username: store => store.userinfo.accountInfo.username,
    }),
  },
  mounted() {
    this.getPayTypeByUtype();
  },
  methods: {
    getPayTypeByUtype() {
      this.$dialog.loading.open("正在加载中···");
      this.$ajax("request", {
        ac: "getPayTypeByUtype",
      }).then(res => {
        this.payType = res.sort((a, b) => {
          return a.sort - b.sort;
        });
        // console.log(this.payType);
        this.$dialog.loading.close();
      });
    },
    goToNext(rechargeType) {
      this.$router.push({
        name: "chongzhiqueren",
        params: {
          rechargeType,
        },
        query: {
          payType: rechargeType.id,
          funcName: rechargeType.name,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
@import "../../../../css/common.scss";
.recharge_main_body {
  height: 100%;
  background-color: #f2f3f4;
  .next_step {
    width: 100%;
    background-color: #ff7c34;
    font-size: poTorem(18px);
    color: #fff;
    text-align: center;
    height: poTorem(48px);
    line-height: poTorem(48px);
    position: fixed;
    bottom: 0;
  }
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
        // width: poTorem(241px);
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
        width: poTorem(67px);
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
    font-size: poTorem(17px);
    color: #707070;
    height: poTorem(45px);
    line-height: poTorem(45px);
    // background-color: #efeff4;
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
  .pay_option {
    img {
      width: poTorem(59px);
      height: poTorem(39px);
      padding: 0 poTorem(10px);
    }
    span {
      font-size: poTorem(18px);
      color: #414141;
    }
  }
  .way_tab {
    margin-bottom: poTorem(57px);
    .wetchat_option {
      @include between;
      padding: 0 poTorem(20px);
      height: poTorem(79px);
      border-bottom: 1px solid #ddd;
      .first_row {
        font-size: poTorem(15px);
        color: #434343;
      }
      .second_row {
        font-size: poTorem(13px);
        color: #7d7d7d;
      }
      img {
        width: poTorem(39px);
        height: poTorem(39px);
      }
      .tag {
        font-size: poTorem(14px);
        color: #7d7d7d;
      }
      .content {
        font-size: poTorem(15px);
        color: #434343;
      }
      .tag p,
      .content p {
        height: poTorem(45px);
        line-height: poTorem(45px);
      }
    }
    .transfer_option {
      height: poTorem(145px);
    }
    .choose_card_btn {
      @include center;
      padding-top: poTorem(20px);
      .choose_card {
        width: poTorem(202px);
        height: poTorem(34px);
        border: 1px solid #d0d0d0;
        font-size: poTorem(15px);
        text-align: center;
        line-height: poTorem(34px);
        border-radius: poTorem(6px);
        color: #70706e;
      }
    }
  }
}
</style>


