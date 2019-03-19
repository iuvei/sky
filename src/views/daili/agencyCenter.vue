<template>
  <div class="agencyCenter_main_body">
    <publicHead :title="funcName"
                :type="5"></publicHead>
    <div class="agencyCenter_main_content"
         v-if="show">
      <div class="bg_wall">
        <img src="../../img/daili/agency_center.jpg"
             alt="">
      </div>
      <yd-grids-group :rows="3"
                      class="func_part">
        <yd-grids-item v-for="(item, index) in gridsData"
                       :key="index">
          <router-link :to="item.path"
                       class="pieces_content"
                       slot="else">
            <img :src="item.src"
                 alt="">
            <div class="word">
              <p>{{item.text1}}</p>
            </div>
          </router-link>
        </yd-grids-item>
      </yd-grids-group>
    </div>
    <div class="apply_agent"
         v-if="!show">
      <h3>什么是代理？</h3>
      <p>可获得的返点,等于自身返点与下级返点的差值,如自身返点5,下级返点3,你将能获得下级投注金额2%的返点,如下级投注100元,你将获得2元.点击下级开户,可查看自身返点,也可为下级设置返点.</p>
      <h3>申请代理有什么好处？</h3>
      <p>可获得的返点,等于自身返点与下级返点的差值,如自身返点5,下级返点3,你将能获得下级投注金额2%的返点,如下级投注100元,你将获得2元.点击下级开户,可查看自身返点,也可为下级设置返点.</p>
      <p v-if="!checking">
        <button @click="applyAgent">立即申请</button>
      </p>
      <p v-if="checking"
         class="checking">审核时间24小时之内给以回复，请注意接收信息</p>
    </div>
  </div>
</template>
<script>
import publicHead from "../huiYuan/components/moreService/publicHead";
import { mapState } from "vuex";
export default {
  components: {
    publicHead
  },
  data() {
    return {
      funcName: "代理中心",
      show: true,
      checking: false,
      gridsData: [
        {
          text1: "代理说明",
          path: "/agency/agencyIntro",
          src: require("../../img/daili/agency_intro.png")
        },
        {
          text1: "代理报表",
          path: "/agency/agencyStatement",
          src: require("../../img/daili/agency_statement.png")
        },
        {
          text1: "下级报表",
          path: "/agency/subordinateStatement",
          src: require("../../img/daili/next_stage.png")
        },
        {
          text1: "下级开户",
          path: "/agency/openAccount",
          src: require("../../img/daili/open_account.png")
        },
        {
          text1: "下级管理",
          path: "/agency/subordinateManage",
          src: require("../../img/daili/member_manage.png")
        },
        {
          text1: "投注明细",
          path: "/agency/agencyBetting",
          src: require("../../img/daili/bet_details.png")
        },
        {
          text1: "交易明细",
          path: "/agency/agencyDeals",
          src: require("../../img/daili/deals_details.png")
        }
      ]
    };
  },
  activated() {
    if (this.level == 0) {
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "isDailiVerify"
      }).then(res => {
        this.$dialog.loading.close();
        this.checking = res;
      });
      this.show = false;
      this.funcName = "申请代理";
    } else {
      this.show = true;
      this.funcName = "代理中心";
    }
  },
  methods: {
    applyAgent() {
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "ApplyDaili"
      }).then(() => {
        this.$dialog.alert({ mes: "提交申请成功，24小时内审核回复" });
        this.checking = true;
        this.$dialog.loading.close();
      });
    }
  },
  computed: {
    ...mapState({
      level: state => state.userinfo.accountInfo.level
    })
  }
};
</script>
<style lang="scss" scoped>
@import "../../css/resources.scss";
.agencyCenter_main_body {
  .agencyCenter_main_content {
    height: 100%;
    background-color: #eee;
    .bg_wall {
      height: poTorem(160px);
      width: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .func_part {
      background-color: #fff;
      .pieces_content {
        padding: poTorem(20px);
        height: poTorem(120px);
        @include column;
        img {
          width: poTorem(23px);
          height: poTorem(23px);
        }
        .word {
          display: inline-block;
          p {
            line-height: poTorem(27px);
            font-size: poTorem(16px);
            color: #000;
          }
        }
      }
    }
  }
  .apply_agent {
    height: 100%;
    padding: poTorem(20px) poTorem(10px);
    h3 {
      font-size: poTorem(28px);
      text-align: center;
      color: $mainColor;
    }
    p {
      font-size: poTorem(18px);
      color: #555;
      text-align: center;
      padding-bottom: 2rem;
      button {
        font-size: poTorem(24px);
        border: none;
        outline: none;
        color: #fff;
        width: 60%;
        height: 2.5rem;
        line-height: 2.5rem;
        border-radius: poTorem(5px);
        text-align: center;
        background-color: $mainColor;
      }
    }
    .checking {
      color: #e33939;
    }
  }
}
</style>


