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
          <span>千位</span>
          <span>百位</span>
          <span>十位</span>
          <span>个位</span>
          <span>总和</span>
          <span>大小</span>
          <span>单双</span>
        </li>
        <li v-for="(item, index) in list"
            v-if="index >= 0"
            :key="index">
          <span class="issue">{{(item.qishu+'').substr(-4)}}期</span>
          <span class="kaijiang">
            {{item.balls ? item.balls.split('+').join('&nbsp; '):'正在开奖'}}
          </span>
          <span>{{item.balls ? returnStateqxc(item.balls.split('+')[0]):'-'}}</span>
          <span>{{item.balls ? returnStateqxc(item.balls.split('+')[1]):'-'}}</span>
          <span>{{item.balls ? returnStateqxc(item.balls.split('+')[2]):'-'}}</span>
          <span>{{item.balls ? returnStateqxc(item.balls.split('+')[3]):'-'}}</span>
          <span>{{item.balls ? getSumValzh(item.balls.split('+')).join(''):'-'}}</span>
          <span>{{item.balls ? getSumValdx(item.balls.split('+')).join(''):'-'}}</span>
          <span>{{item.balls ? getSumValds(item.balls.split('+')).join(''):'-'}}</span>

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
      list: [],
      balls: [],
      content: [],
      val: "",
      pageid: 0,
      repeatArr: []
    };
  },
  components: {},
  activated() {},

  filters: {},
  mounted() {
    this.getData(this.datas.name_tag);
    this.name = this.datas.name_tag;
  },
  watch: {
    datas(val) {
      this.list = [];
      this.pageid = 0;
      this.getData(val.name_tag);
    }
    // list(newval, oldval) {
    //     if (newval !== oldval && newval.length) {
    //         this.getBatchRepeatTimes()
    //     }
    // }
  },
  methods: {
    returnStateqxc(val) {
      let a, b;
      val > 4 ? (a = "大") : (a = "小");
      val % 2 == 0 ? (b = "双") : (b = "单");
      return a + b;
    },
    ballqxczh(balls) {
      const arr = [];
      let _balls = balls;
      if (typeof _balls === "string") {
        _balls = balls.split("+");
      }
      const sum =
        parseInt(_balls[0]) +
        parseInt(_balls[1]) +
        parseInt(_balls[2]) +
        parseInt(_balls[3]);
      arr.push(sum);
      return arr;
    },
    getSumValzh(balls) {
      if (balls) {
        const sum = (typeof balls === "string" ? balls.split("+") : balls)
          .map(x => Number(x))
          .reduce((a, b) => a + b);
        const arr = [];
        arr.push(sum);
        return arr;
      } else {
        return [""];
      }
    },
    getSumValdx(balls) {
      if (balls) {
        const sum = (typeof balls === "string" ? balls.split("+") : balls)
          .map(x => Number(x))
          .reduce((a, b) => a + b);
        const arr = [];
        arr.push(sum > 18 ? "大" : "小");
        return arr;
      } else {
        return [""];
      }
    },
    getSumValds(balls) {
      if (balls) {
        const sum = (typeof balls === "string" ? balls.split("+") : balls)
          .map(x => Number(x))
          .reduce((a, b) => a + b);
        const arr = [];
        arr.push(sum % 2 === 0 ? "双" : "单");
        return arr;
      } else {
        return [""];
      }
    },
    // getBatchRepeatTimes() {
    //     let arr = []
    //     this.list.forEach(item => {
    //         let c = this.getRepeatTimes(item)
    //         arr.push(c)
    //     })
    //     this.repeatArr = arr
    // },
    getData(name) {
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "getKjCpLog",
        tag: name,
        date: "",
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
        // flex: 0 0 poTorem(46px);
        height: poTorem(35px);
        font-size: poTorem(14px);
        color: #535353;
        border-top: poTorem(1px) solid rgb(221, 221, 221);
        border-right: poTorem(1px) solid rgb(221, 221, 221);
      }
      span:nth-child(1) {
        width: 16%;
      }
      span:nth-child(2) {
        width: 23%;
      }
      span:nth-child(3) {
        flex: 1;
      }
      span:nth-child(4) {
        flex: 1;
      }
      span:nth-child(5) {
        flex: 1;
      }
      span:nth-child(6) {
        flex: 1;
      }
      span:nth-child(7) {
        flex: 1;
      }
      span:nth-child(8) {
        flex: 1;
      }
      span:nth-child(9) {
        flex: 1;
        border-right: 0 solid rgb(221, 221, 221);
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
