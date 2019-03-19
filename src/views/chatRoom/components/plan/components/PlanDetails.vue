<template>
  <div class="planDetails">
    <ul class="thelist_list">
      <li>
        <div class="issue">期号</div>
        <div>号码</div>
        <div class="number">
          <p>{{activePlan.name}}</p>购彩计划
        </div>
        <div>
          <p>当前</p>成本
        </div>
        <div>
          <p>累计</p>成本
        </div>
        <div>
          <p>盈利</p>亏损
        </div>
        <div>
          <p>开奖</p>时间
        </div>
      </li>
    </ul>
    <ul class="thelist_list_xq"
        v-if="this.dataList.length">
      <li class="thelist_list_xq_li"
          v-for="(el,index) in dataList"
          :key="index">
        <div class="issue">{{(el.qishu+'').substr(-4)}}</div>

        <!-- <div :class="{ active: el.kj_balls === '' }">{{el.kj_balls ? el.kj_balls : '待开'}}</div>
        <div class="number">
          <span>{{el.balls}}</span>
        </div> -->
        <div class="numballs">
          <span class="numballs_box"
                :class="{ activespan: el.kj_balls === el.balls }">
            <span :class="{numballs_span: !el.kj_balls}">{{el.kj_balls ? el.kj_balls : '待开'}}</span>
            <i v-if="el.kj_balls === el.balls">中</i>
          </span>
        </div>
        <div class="number">
          <span class="numballs_box"
                :class="{ activespan: el.kj_balls === el.balls }">
            <span>{{el.balls}}</span>
            <i v-if="el.kj_balls === el.balls">中</i>
          </span>
        </div>

        <div>{{el.price}}</div>
        <div>{{el.alltz}}</div>
        <div class="profit_loss">
          <span v-if="el.allwin>0">{{el.allwin}}</span>
          <span class="profit_loss_fs"
                v-else>{{el.allwin}}</span>
        </div>
        <div>{{el.jiezhitime}}</div>
      </li>
    </ul>
    <ul class="prompt_the_user"
        v-else>
      <li>此彩种暂无计划!</li>
    </ul>
  </div>
</template>
<script>
import debounce from "lodash/debounce";
export default {
  props: ["activePlan", "gameId"],
  data() {
    return {
      dataList: []
    };
  },

  mounted() {
    // this.getTouzhuPlanTable_get();
  },
  watch: {
    gameId() {
      this.getTouzhuPlanTable_get();
    },
    activePlan(curVal) {
      if (curVal) {
        this.getTouzhuPlanTable_get();
      }
    }
  },
  created() {},
  components: {},
  methods: {
    getTouzhuPlanTable_get: debounce(function() {
      this.dataList = [];
      if (!this.gameId || !this.activePlan.type) return;
      this.$ajax("request", {
        ac: "getTouzhuPlanTable",
        gameid: this.gameId,
        type: this.activePlan.type
      }).then(res => {
        this.dataList = res;
      });
    }, 100)
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.planDetails {
  width: 100%;
  height: calc(100% - 3rem);
  font-size: 1rem;
  margin-top: poTorem(48px);
  .thelist_list,
  .thelist_list_xq {
    li {
      display: flex;
      width: 100%;
      flex-wrap: nowrap;
      height: poTorem(55px);
      div {
        width: 14.2%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
        border-top: poTorem(1px) solid rgb(221, 221, 221);
        border-left: poTorem(1px) solid rgb(221, 221, 221);
        font-size: 0.9rem;
        border-collapse: collapse;
      }
      .issue {
        border-left: 0 solid rgb(221, 221, 221);
      }
      .number {
        width: 23%;
      }
      .numballs {
        .numballs_span {
          color: #e53939;
        }
      }
      .activespan {
        display: flex;
        justify-content: center;
        flex-direction: column;
        // align-items: center;
        text-align: center;
        position: relative;
        i {
          position: absolute;
          height: poTorem(45px);
          color: #e53939;
          margin-left: 25px;
          font-style: normal;
        }
        span {
          width: poTorem(28px);
          height: poTorem(28px);
          line-height: poTorem(26px);
          border: poTorem(1px) solid red;
          border-radius: 50%;
        }
      }
    }
  }
  .thelist_list li:nth-child(1) {
    background-color: #f0f0f0;
  }
  .thelist_list_xq {
    .thelist_list_xq_li {
      height: poTorem(45px);
      color: rgb(103, 99, 99);
      .profit_loss {
        color: #e53939;
        .profit_loss_fs {
          color: #009feb;
        }
      }
    }
    .active {
      color: #e53939 !important;
    }
  }
  .prompt_the_user {
    text-align: center;
    margin-top: 10rem;
    font-size: 1.6rem;
    font-weight: 500;
    color: #ccc;
    font-style: italic;
  }
}
</style>
