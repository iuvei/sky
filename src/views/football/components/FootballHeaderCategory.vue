<template>
  <AppModel :show="show"
            @close="()=>{this.$emit('close')}">
    <ul class="group"
        v-show="show">
      <li v-html="renderStr"
          @click="userBalanceClick"></li>
      <li v-for="(item, key) in data"
          :key="key"
          :class="{active: key==active}"
          @click="switchs(key,item)">
        <i :class="item.class"></i> {{item.label}}
      </li>
    </ul>
  </AppModel>

</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "FontballHeaderCategory",
  props: ["show"],
  data() {
    return {
      active: "",
      data: [
        // { label: "按联盟排序", class: "league", value: 1 },
        // { label: "按时间排序", class: "time", value: 0 },
        { label: "筛选联赛", class: "sift" },
        { label: "投注记录", class: "record" },
        { label: "体育规则", class: "rule" },
        { label: "比赛结果", class: "race" }
      ]
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.userinfo.isLogin,
      userBalance: state => state.userinfo.accountInfo.price
    }),
    renderStr() {
      let s = "余额:";
      if (!this.isLogin) {
        s += '请<span class="color-red clickArea">[登录]</span>';
        return s;
      }
      s += `<span class="color-red clickArea">￥${this.userBalance}</span>`;
      return s;
    }
  },
  methods: {
    ...mapActions("football", [
      "changeTitle",
      "modifyFootballField",
      "queryComputed"
    ]),
    ...mapActions(["setBetRecordsType"]),
    switchs(key, item) {
      this.$emit("close");
      this.active = key;
      switch (item.class) {
        case "league":
          this.modifyFootballField({ order: 1 });
          this.queryComputed(["reset", "getData"]);
          break;
        case "time":
          this.modifyFootballField({ order: 0 });
          this.queryComputed(["reset", "getData"]);
          // let order = item.value;
          // this.bus.$emit("order-click", order);
          break;
        case "sift":
          this.$router.push("/football/league");
          break;
        case "record":
          this.setBetRecordsType(1);
          this.$router.push({ name: "goucaijilu" });
          break;
        case "rule":
          this.$router.push("/football/rule");
          break;
        case "race":
          this.$router.push("/football/race");
          break;

        default:
          break;
      }
      // console.log(item);
      return;
      // this.changeTitle(item);
    },
    userBalanceClick({ target }) {
      if (target.classList.contains("clickArea")) {
        if (!this.isLogin) {
          return this.$router.push({
            path: "/login",
            query: { redirect: this.$route.fullPath }
          });
        }

        this.isShowPrice = !this.isShowPrice;
      }
    }
  }
};
</script>

<style>
.color-red {
  color: #eb3349;
}
.color-blue {
  color: #54baea;
}
</style>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
@mixin bgurl($url) {
  background: url("~img/football/"+$url) no-repeat;
  background-size: poTorem(25px) poTorem(20px);
}

.group {
  position: fixed;
  min-width: 10rem;
  right: 0;
  background: #fff;
  z-index: 21;
  li {
    @include start;
    height: poTorem(50px);
    padding-left: 0.7rem;
    margin: 0 poTorem(4px);
    border-bottom: 1px solid #ddd;
    background: #fff;
    font-size: poTorem(18px);
    color: #535353;
    i {
      width: poTorem(24px);
      height: poTorem(20px);
      margin-right: poTorem(8px);
    }
  }
  .active {
    // color: red;
    // background: no-repeat right bottom url(~img/football/title-active.png);
    // background-size: poTorem(23px) poTorem(23px);
  }
}
.league {
  @include bgurl("league.png");
}
.time {
  @include bgurl("tiem.png");
}
.sift {
  @include bgurl("sift.png");
}
.record {
  @include bgurl("record.png");
}
.rule {
  @include bgurl("rule.png");
}
.race {
  @include bgurl("result.png");
}
</style>


