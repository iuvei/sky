<template>
  <div class="trend_head">
    <ul ref="container">
      <li>
        <span>开奖结果</span>
      </li>
      <li v-for="(item,index) in digits" :key="index" @click='light(index)' :class="{'active':$store.state.trend.trendval==index}">
        <span>{{item}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      gameName: state => state.trend.gameName,
      gameId: state => state.trend.gameId,
      digits: state => state.trend.digits
    })
  },
  updated() {
    this.$nextTick(() => {
      this.changeNavWidth();
    });
  },
  methods: {
    ...mapActions(["setTrendval"]),
    light: function(index) {
      this.setTrendval(index);
    },
    setDigitItemWidth(container) {
      let arr = [],
        spans = container.getElementsByTagName("SPAN");
      for (let i = 0; i < spans.length; i++) {
        arr.push(spans[i]);
      }
      arr.map(
        item => (item.style.width = document.body.clientWidth / 4 + "px")
      );
    },
    changeNavWidth() {
      let container = this.$refs.container,
        len = this.digits.length;
      if (len === 3) {
        container.classList.add("head-four");
        container.style.width = document.body.clientWidth + "px";
        this.setDigitItemWidth(container);
      }
      if (len > 3) {
        container.classList.remove("head-four");
        container.parentElement.classList.add("muti");
        container.style.width =
          document.body.clientWidth / 4 * (len + 1) + "px";
        this.setDigitItemWidth(container);
      }
    },
    handleResize() {
      this.changeNavWidth();
    }
  },
  mounted() {
    this.changeNavWidth();
  },
  activated() {
    let container = this.$refs.container,
      eventName =
        "orientationchange" in window ? "orientationchange" : "resize";
    window.addEventListener(eventName, this.handleResize);
  },
  deactivated() {
    let eventName =
      "orientationchange" in window ? "orientationchange" : "resize";
    window.removeEventListener(eventName, this.handleResize);
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";

.container {
  position: fixed;
  // top:3rem;
  width: 100%;
  top: poTorem(48px);
  height: poTorem(44px);
  overflow: hidden;
}

.head-four {
  width: 100%;
  span {
    width: 25%;
  }
}
.muti {
  width: 100%;
}
.trend_head {
  z-index: 21;
  overflow-x: scroll;
  background: #fff;
  padding: 0;
  position: fixed;
  left: 0;
  ul {
    display: block;
  }
  span,
  li {
    text-align: center;
    color: #666;
    box-sizing: border-box;
    height: poTorem(44px);
    line-height: poTorem(44px);
    font-size: poTorem(16px);
    font-weight: bold;
    float: left;
    position: relative;
    background: #fff;
    list-style: none;
    display: block;
  }
  span {
    border-bottom: 1px solid #f3f3f3;
  }
  .active > span {
    color: #f93;
    border-bottom: 2px solid #f93;
  }
}
</style>
<style>
.echart .echart_con {
  /* margin-top: 2.75rem !important; */
}
</style>

