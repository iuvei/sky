<template>
  <yd-infinitescroll :callback="_callback"
                     ref="infinitescrollDemo">
    <yd-list theme="1"
             slot="list"
             class="yd_list">
      <ul class="left">
        <li class="title">
          <span>期号</span>
        </li>
        <li v-for="(items, indexs) in list"
            :key="indexs">{{(items.qishu+'').substr(-4)}}期</li>
      </ul>
      <ul class="left_number">
        <li class="title">
          <span>开奖号码</span>
        </li>
        <li v-for="(item,index) in list"
            :key="index">
          <!-- <span class="Colorno" v-for="(items,indexs) in item.balls.split('+')" :key="indexs" :class="[{active: items == ''},`kt${items}`]">
            {{items == '' ? '正在开奖' : items}}
          </span> -->

          <span class="Colorno"
                v-for="(items,indexs) in item.balls.split('+')"
                :key="indexs"
                v-if="item.balls.length > 1">
            <img :src="require('../../../../img/xync_background/lucky_ball_'+ items +'.png')"
                 alt="图片">
          </span>
          <span v-else>正在开奖</span>
        </li>
      </ul>
      <div class="right">
        <ul>
          <li v-for="(item,index) in dataprev"
              :key="index">{{item.text}}</li>
        </ul>
        <ul class="content"
            v-for="(items,indexs) in list"
            :key="indexs">
          <li>{{items.balls ? ballxyzh((items.balls)).join(''):'-'}}</li>
          <li>{{items.balls ? returnState(items.balls).join(''):'-'}}</li>
          <li>{{items.balls ? returnStateds(items.balls).join(''):'-'}}</li>

          <li>尾{{items.balls ? returnStatewdx(items.balls).join(''):'-'}}</li>
          <li>{{items.balls ? ballxylh(items.balls).join(''):'-'}}</li>
        </ul>
      </div>
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
      list: [],
      pageid: 0,
      routeList: [],
      content: [],
      val: "",
      dataprev: [
        { text: "总和" },
        { text: "大小" },
        { text: "单双" },
        { text: "尾数" },
        { text: "龙虎" }
      ]
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
    ballxyzh(balls) {
      const arr = [];
      let _balls = balls;
      if (typeof _balls === "string") {
        _balls = balls.split("+");
      }
      const sum =
        parseInt(_balls[0]) +
        parseInt(_balls[1]) +
        parseInt(_balls[2]) +
        parseInt(_balls[3]) +
        parseInt(_balls[4]) +
        parseInt(_balls[5]) +
        parseInt(_balls[6]) +
        parseInt(_balls[7]);
      arr.push(sum);
      return arr;
    },
    returnState(balls) {
      if (balls) {
        const sum = (typeof balls === "string" ? balls.split("+") : balls)
          .map(x => parseInt(x))
          .reduce((a, b) => a + b);
        const arr = [];
        arr.push(sum > 84 ? "大" : "小");
        return arr;
      } else {
        return [""];
      }
    },
    returnStateds(balls) {
      if (balls) {
        const sum = (typeof balls === "string" ? balls.split("+") : balls)
          .map(x => parseInt(x))
          .reduce((a, b) => a + b);
        const arr = [];
        arr.push(sum % 2 === 0 ? "双" : "单");
        return arr;
      } else {
        return [""];
      }
    },
    returnStatewdx(balls) {
      if (balls) {
        const sum = (typeof balls === "string" ? balls.split("+") : balls)
          .map(x => parseInt(x))
          .reduce((a, b) => a + b);
        const arr = [],
          w = sum + "",
          wdx = parseInt(w[w.length - 1], 10);
        arr.push(wdx > 4 ? "大" : "小");
        return arr;
      } else {
        return [""];
      }
    },
    ballxylh(balls) {
      const arr = [];
      let _balls = balls;
      if (typeof _balls === "string") {
        _balls = balls.split("+");
      }
      const sumw = parseInt(_balls[0]),
        suma = parseInt(_balls[7]);
      arr.push(sumw > suma ? "龙" : "虎");
      return arr;
    },
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
  overflow: hidden;
  margin: 0;
  padding: 0;
  .left {
    float: left;
    list-style: none;
    width: 16%;
    li {
      width: 100%;
      height: poTorem(35px);
      font-size: 0.9rem;
      line-height: poTorem(35px);
      color: rgb(103, 99, 99);
      text-align: center;
      border-top: poTorem(1px) solid rgb(221, 221, 221);
      border-right: poTorem(1px) solid rgb(221, 221, 221);
    }
    .title {
      height: poTorem(35px);
      @include around;
      border-top: poTorem(1px) solid rgb(221, 221, 221);
      border-right: poTorem(1px) solid rgb(221, 221, 221);
      span {
        display: inline-block;
        width: poTorem(65px);
        line-height: poTorem(35px);
        &:first-child {
          align-self: flex-end;
        }
        &:last-child {
          align-self: flex-start;
        }
      }
    }
  }
  .left_number {
    float: left;
    list-style: none;
    overflow: auto;
    width: 52%;
    li {
      width: 100%;
      height: poTorem(35px);
      font-size: 0.9rem;
      line-height: poTorem(35px);
      color: rgb(103, 99, 99);
      text-align: center;
      border-top: poTorem(1px) solid rgb(221, 221, 221);
      border-right: poTorem(1px) solid rgb(221, 221, 221);
      .Colorno {
        img {
          margin-top: 0.25rem;
          width: 1.6rem;
          height: 1.6rem;
        }
      }
    }
    .title {
      height: poTorem(35px);
      @include around;
      border-top: poTorem(1px) solid rgb(221, 221, 221);
      border-right: poTorem(1px) solid rgb(221, 221, 221);
      span {
        display: inline-block;
        line-height: poTorem(35px);
        &:first-child {
          align-self: flex-end;
        }
        &:last-child {
          align-self: flex-start;
        }
      }
    }
  }
  .right {
    float: right;
    overflow: auto;
    width: 32%;
    ul {
      @include between;
      width: 170%;
      li {
        flex: 1;
        text-align: center;
        height: poTorem(35px);
        font-size: 0.9rem;
        line-height: poTorem(35px);
        color: #666;
        border-top: poTorem(1px) solid rgb(221, 221, 221);
        border-right: poTorem(1px) solid rgb(221, 221, 221);
      }
    }
    .content {
      li {
        height: poTorem(35px);
        line-height: poTorem(35px);
      }
    }
  }
}

.left li:nth-child(odd) {
  background: #fff;
}

.left_number li:nth-child(odd) {
  background: #fff;
}

.left li:nth-child(even) {
  background: rgb(238, 238, 238);
}

.left_number li:nth-child(even) {
  background: rgb(238, 238, 238);
}

.right ul:nth-child(odd) {
  background: #fff;
}

.right ul:nth-child(even) {
  background: rgb(238, 238, 238);
}
</style>
