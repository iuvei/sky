<template>
  <yd-infinitescroll :callback="_callback"
                     ref="infinitescrollDemo">
    <yd-list theme="1"
             slot="list"
             class="yd_list">
      <ul class="thelist_list">
        <li class="title">
          <div class="issue">期号</div>
          <div class="number">开奖号码</div>
          <div>和值</div>
          <div>跨度</div>
          <div>百位</div>
          <div>十位</div>
          <div>个位</div>
        </li>
      </ul>
      <ul class="thelist_list"
          v-for="(item,index) in list"
          :key="index"
          v-if="index >= 0">
        <li>
          <div class="issue">{{(item.qishu+'').substr(-4)}}期</div>
          <div class="number">
            <span v-for="(item,index) in item.balls.split('+')"
                  :key="index">{{item == '' ? '正在开奖' : item }}</span>
          </div>
          <div>{{item.balls ? ballsh(item.balls).join(''):'-'}}</div>
          <div>{{item.balls ? getSpanning(item.balls):'-'}}</div>
          <div>{{item.balls ? returnState(item.balls.split('+')[0]):'-'}}</div>
          <div>{{item.balls ? returnState(item.balls.split('+')[1]):'-'}}</div>
          <div>{{item.balls ? returnState(item.balls.split('+')[2]):'-'}}</div>
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
  props: ["indexFlag", "datas"],
  data() {
    return {
      pullUp: false,
      routeList: {},
      list: [],
      pageid: 0,
      balls: [],
      content: [],
      val: ""
    };
  },
  mounted() {
    this.routeList = this.$route.params;
    this.getData(this.datas.name_tag);
    this.name = this.datas.name_tag;
  },
  watch: {
    datas(val) {
      this.list = [];
      this.pageid = 0;
      this.getData(val.name_tag);
    }
  },
  filters: {},

  methods: {
    greet(val) {
      this.val = val;
    },
    ballsh(balls) {
      const arr = [];
      let _balls = balls;
      if (typeof _balls === "string") {
        _balls = balls.split("+");
      }
      const sum =
        parseInt(_balls[0]) + parseInt(_balls[1]) + parseInt(_balls[2]);
      arr.push(sum);
      return arr;
    },
    getSpanning(numbers) {
      if (!numbers || !numbers.length) return 0;
      const _arr = (typeof numbers === "string" ? numbers.split("+") : numbers)
        .map(x => parseInt(x))
        .sort((a, b) => a - b);
      return _arr[_arr.length - 1] - _arr[0];
    },
    returnState(val) {
      let a, b;
      val > 4 ? (a = "大") : (a = "小");
      val % 2 == 0 ? (b = "双") : (b = "单");
      return a + b;
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
  margin: 0;
  padding: 0;
  .thelist_list {
    display: flex;
    width: 100%;
    height: 100%;
    li {
      display: flex;
      width: 100%;
      flex-wrap: nowrap;
      height: poTorem(35px);
      line-height: poTorem(35px);
      div {
        @include public;
        width: 14%;
        border-top: poTorem(1px) solid rgb(221, 221, 221);
        border-left: poTorem(1px) solid rgb(221, 221, 221);
        font-size: 0.9rem;
        color: rgb(103, 99, 99);
        border-collapse: collapse;
      }
      .issue {
        width: 20%;
        border-left: 0 solid rgb(221, 221, 221);
      }
      .number {
        width: 44%;
        span {
          margin: 0.5rem;
          color: #e33939;
        }
      }
    }
  }
}
.yd-list ul:nth-child(odd) {
  background: #fff;
}
.yd-list ul:nth-child(even) {
  background: rgb(238, 238, 238);
}
</style>
