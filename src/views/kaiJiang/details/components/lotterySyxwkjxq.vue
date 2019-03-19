<template>
  <yd-infinitescroll :callback="_callback"
                     ref="infinitescrollDemo">
    <yd-list theme="1"
             slot="list"
             class="yd_list">
      <ul>
        <li class="title">
          <span>期号</span>
          <span>开奖号码</span>
          <span>跨度</span>
          <span>重号个数</span>
          <span>总和值</span>
        </li>
        <li v-for="(item, index) in list"
            v-if="index >= 0"
            :key="index">
          <span>{{(item.qishu+'').substr(-4)}}期</span>
          <span class="kaijiang">
            {{item.balls ? item.balls.split('+').join('&nbsp; '):'正在开奖'}}
          </span>
          <span>{{item.balls ? getSpanning(item.balls):'-'}}</span>
          <span>{{item.balls ? repeatArr[index]:'-'}}</span>
          <span>
            {{item.balls ? getSumVal(item.balls)[0]:'-'}}{{item.balls ? getSumVal(item.balls)[1]:''}}
          </span>
        </li>
      </ul>
    </yd-list>
    <!-- 数据全部加载完毕显示 -->
    <span slot="doneTip">不要在拉了,没有数据啦~~</span>
    <img slot="loadingTip"
         src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
  </yd-infinitescroll>
</template>
<script>
export default {
  props: ["datas"],
  data() {
    return {
      pullUp: false,
      routeLists: {},
      list: [],
      balls: [],
      content: [],
      val: "",
      pageid: 0,
      repeatArr: []
    };
  },
  components: {},
  activated() {
    // this.routeLists = this.routes;
    // resetRouteParams(this, "11x5");
  },

  filters: {},
  mounted() {
    // this.routeList = this.$route.params
    this.getData(this.datas.name_tag);
    this.name = this.datas.name_tag;
  },
  watch: {
    datas(val) {
      this.list = [];
      this.pageid = 0;
      this.getData(val.name_tag);
    },
    list(newval, oldval) {
      if (newval !== oldval && newval.length) {
        this.getBatchRepeatTimes();
      }
    }
  },
  methods: {
    getSumVal(balls) {
      if (balls) {
        const sum = (typeof balls === "string" ? balls.split("+") : balls)
          .map(x => Number(x))
          .reduce((a, b) => a + b);
        const arr = [];
        arr.push(sum > 29 ? "大" : "小");
        arr.push(sum % 2 === 0 ? "双" : "单");
        return arr;
      } else {
        return ["", ""];
      }
    },
    getSpanning(numbers) {
      if (!numbers || !numbers.length) return 0;
      const _arr = typeof numbers === "string" ? numbers.split("+") : numbers,
        max = Math.max(..._arr),
        min = Math.min(..._arr);
      return max - min;
    },
    getRepeatTimes(item) {
      const index = this.list.findIndex(x => x.qishu === item.qishu) + 1;
      if (index === this.list.length) return 0;
      const next = this.list[index];
      const _balls_cur = item.balls.length
          ? typeof item.balls === "string"
            ? item.balls.split("+")
            : item.balls
          : [], // 当前
        _balls_prev =
          typeof next.balls === "string" ? next.balls.split("+") : next.balls; // 当前的上1
      let count = 0;
      for (let i = 0; i < _balls_cur.length; i++) {
        if (_balls_prev.includes(_balls_cur[i])) {
          count += 1;
        }
      }
      return count;
    },
    getBatchRepeatTimes() {
      const arr = [];
      this.list.forEach(item => {
        const c = this.getRepeatTimes(item);
        arr.push(c);
      });
      this.repeatArr = arr;
    },
    getData(name) {
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "getKjCpLog",
        tag: name,
        date: 0,
        pcount: 20,
        pageid: this.pageid
      }).then(response => {
        this.$dialog.loading.close();
        const _list = response;
        if (this.pullUp) this.list = [...this.list, ..._list];
        else this.list = _list;
        if (_list.length < 20 || this.pageid == 19) {
          /* 所有数据加载完毕 */
          this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.loadedDone");
          return;
        }
        /* 单次请求数据完毕 */
        this.pullUp = false;
        this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
      });
    },
    _callback() {
      this.pullUp = true;
      this.pageid++;
      this.getData(this.name);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.yd_list {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  > ul {
    @include column;
    > li {
      width: 100%;
      height: poTorem(35px);
      @include between;
      span {
        @include center;
        height: poTorem(35px);
        font-size: 0.9rem;
        color: #535353;
        border-top: poTorem(1px) solid rgb(221, 221, 221);
        border-right: poTorem(1px) solid rgb(221, 221, 221);
      }
      span:nth-child(1) {
        width: 17%;
      }
      span:nth-child(2) {
        width: 38%;
      }
      span:nth-child(3) {
        width: 11%;
      }
      span:nth-child(4) {
        width: 18%;
      }
      span:nth-child(5) {
        width: 16%;
        border-right: 0 solid rgb(221, 221, 221);
      }
      .kaijiang {
        color: #eb3349;
      }
    }
  }
}
.yd-list ul li:nth-child(odd) {
  background: #fff;
}
.yd-list ul li:nth-child(even) {
  background: rgb(238, 238, 238);
}
</style>
