<template >
  <div class="bank_transfer">
    <p class="choose_titile">
      <span></span>
      <span>银行转账信息</span>
    </p>
    <div class="transfer_parts">
      <p>
        <span>开户行网点</span>
        <span>{{manData.bank_home}}</span>
      </p>
      <p>
        <span>收款人</span>
        <span class="cash_receiver">{{manData.real_name}}</span>
        <span v-clipboard:copy="manData.real_name"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError">复制</span>
      </p>
      <p>
        <span>银行</span>
        <span>{{manData.bank_type}}</span>
      </p>
      <p>
        <span>账号</span>
        <span>{{manData.bank_card}}</span>
        <span v-clipboard:copy="manData.bank_card"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError">复制</span>
      </p>
    </div>
    <p class="choose_titile">
      <span></span>
      <span>请确认填写转账金额与时间</span>
    </p>
    <div class="transfer_parts">
      <p>
        <span>存入金额</span>
        <input type="text"
               placeholder=""
               v-model="manData.money"
               disabled>
      </p>
      <p>
        <yd-cell-group>
          <yd-cell-item arrow
                        class="time-cell">
            <span slot="left">存款时间</span>
            <yd-datetime ref="time"
                         v-model="time"
                         slot="right"
                         :start-date="startLimitTime"
                         :end-date="endLimitTime"></yd-datetime>
          </yd-cell-item>
        </yd-cell-group>
      </p>
    </div>
    <p class="choose_titile">
      <span></span>
      <span>存款人</span>
    </p>
    <div class="transfer_parts">
      <p>
        <span>存款人姓名</span>
        <input type="text"
               placeholder="请输入存款人姓名"
               v-model="card_name"
               class="card_name">
      </p>

    </div>
    <!-- <div class="transfer-type-group">
      <div class="transfer-type-item icon-normal" v-for="(n,i) in transferOptions" :key="i" :class="{'icon-active':transferKey===i}" @click="transferItrmClick(i,n)">
        <span class="icon "></span>
        <span>{{n.label}}</span>
      </div>
    </div> -->

    <p class="transfer_tips choose_titile">
      <img src="../../../../../img/recharge/transfer_tips.png"
           alt="">
      <span>{{manData.pc_tip}}</span>
    </p>
    <div class="a_btn">
      <button @click="submit">我已转账</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { randomFormtoken } from "~/js/user/gsfunc";
import dayjs from "dayjs";
export default {
  props: ["manData"],
  data() {
    return {
      money: "",
      card_name: "",
      bankCard: "",
      bankAddress: "",
      transferKey: 0,
      transferTypeNum: 1,
      showType: 1,
      time: new Date().format("yyyy-MM-dd hh:mm"),
      // endLimitTime: new Date().format("yyyy-MM-dd") + ' 23:59',
      transferOptions: [
        {
          label: "网银转账",
          callback: () => {
            this.transferType = "网银转账";
            this.transferTypeNum = 1;
            this.showType = 1;
          }
        },
        {
          label: "ATM自动柜员机",
          callback: () => {
            this.transferType = "ATM自动柜员机";
            this.transferTypeNum = 2;
            this.showType = 2;
          }
        },
        {
          label: "ATM现金入款",
          callback: () => {
            this.transferType = "ATM现金入款";
            this.transferTypeNum = 3;
            this.showType = 2;
          }
        },
        {
          label: "银行柜台转账",
          callback: () => {
            this.transferType = "银行柜台转账";
            this.transferTypeNum = 4;
            this.showType = 2;
          }
        },
        {
          label: "手机银行转账",
          callback: () => {
            this.transferType = "手机银行转账";
            this.transferTypeNum = 5;
            this.showType = 1;
          }
        },
        {
          label: "其他",
          callback: () => {
            this.transferType = "其他";
            this.transferTypeNum = 6;
            this.showType = 3;
          }
        }
      ]
    };
  },
  computed: {
    text() {
      return [
        this.titleTxt[this.manData.weiType],
        this.titleTxt[this.manData.weiType],
        this.step2Txt[this.manData.weiType]
      ];
    },
    startLimitTime() {
      return dayjs(Date.now() - 48 * 60 * 60 * 1000).format("YYYY-MM-DD 00:00");
    },
    endLimitTime() {
      return new Date().format("yyyy-MM-dd") + " 23:59";
    },
    ...mapState({
      real_name: state => state.userinfo.accountInfo.real_name
    })
  },
  methods: {
    transferItrmClick(i, n) {
      this.transferKey = i;
      n.callback();
    },
    onCopy() {
      this.$dialog.alert({ mes: "复制成功" });
    },
    onError() {
      this.$dialog.alert({ mes: "复制失败" });
    },
    submit() {
      if (!this.card_name) {
        this.$dialog.alert({ mes: "请输入存款人姓名" });
        return;
      }
      this.$ajax("request", {
        ac: "submitPayCompany",
        pay_id: this.manData.id,
        price: this.manData.money,
        type: this.manData.type,
        card_name: this.card_name,
        time: this.time + ":00",
        form_unique_token: randomFormtoken()
      }).then(() => {
        this.$emit("toSuccess");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
@import "../../../style/field.scss";
.bank_transfer {
  .transfer_parts {
    background-color: #fff;
    padding: poTorem(20px);
    font-size: poTorem(16px);
    color: #535353;
    .cash_receiver {
      display: inline-block;
      width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: bottom;
    }
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
          border: poTorem(1px) solid $mainColor;
          border-radius: poTorem(12px);
          text-align: center;
          color: $mainColor;
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
        height: poTorem(28px);
        width: poTorem(178px);
        border: poTorem(1px) solid #bababa;
        border-radius: poTorem(3px);
        outline: none;
        font-size: poTorem(16px);
        text-align: center;
        line-height: poTorem(25px);
      }
      .card_name {
        height: poTorem(37px);
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
  .transfer_tips {
    padding: poTorem(10px) poTorem(20px);
    background-color: #fff;
    font-size: poTorem(15px);
    color: #535353;
    // text-align: center;
    img {
      width: poTorem(15px);
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
  }
  .choose_titile {
    font-size: poTorem(16px);
    color: #707070;
    height: poTorem(35px);
    line-height: poTorem(32px);
    background-color: #f3f3f3;
    padding: 0 poTorem(6px) 0 poTorem(20px);
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
      background-color: $mainColor;
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
  .transfer-type-group {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: poTorem(10px) poTorem(40px);
    font-size: poTorem(15px);
    color: #535353;
    border-top: poTorem(1px) solid #d9d9d9;
    .transfer-type-item {
      @include start;
      width: poTorem(167px);
      height: poTorem(30px);
      .icon {
        width: poTorem(20px);
        height: poTorem(20px);
        margin-right: poTorem(8px);
      }
    }
    .icon-normal .icon {
      background: url("../../../../../img/recharge/default_state.png") no-repeat
        center center;
      background-size: contain;
    }
    .icon-active .icon {
      background: url("../../../../../img/recharge/choosed_state.png") no-repeat
        center center;
      background-size: contain;
    }
  }
}
</style>


<style lang="scss">
@import "../../../../../css/resources.scss";
.bank_transfer {
  .transfer_parts {
    .time-cell {
      padding-left: 0;
      padding-top: poTorem(10px);
      .yd-cell-left {
        flex-basis: poTorem(100px);
        font-size: poTorem(15px);
        color: #535353;
      }
      .yd-cell-right {
        .yd-datetime-input {
          font-size: poTorem(18px);
          color: #535353;
        }
      }
    }
  }
  .a_btn {
    margin-bottom: poTorem(40px);
  }
}
</style>
