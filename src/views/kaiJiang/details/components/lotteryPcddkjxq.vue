<template>
  <yd-infinitescroll :callback="_callback"
                     ref="infinitescrollDemo">
    <yd-list theme="1"
             slot="list"
             class="yd_list">
      <ul class="thelist_list">
        <li>
          <div class="issue">期号</div>
          <div class="number_r">开奖号码</div>
          <div>大小单双</div>
          <div>色波</div>
        </li>
      </ul>
      <ul class="thelist_list"
          v-for="(item,index) in list"
          :key="index"
          v-if="index >= 0">
        <li>
          <div class="issue">{{(item.qishu+'').substr(-4)}}期</div>
          <div class="number_r">
            <span v-for="(items,indexs) in item.balls.split('+')"
                  :key="indexs"
                  :style="{color:`${ballToColor(parseInt(items))}`}">
              <i class="and_such"
                 v-if="indexs == 1 && item != ''">+</i>
              <i class="and_such"
                 v-if="indexs == 2 && item != ''">+</i>
              <i class="and_such"
                 v-if="indexs == 3 && item != ''">=</i>
              {{items == '' ? '正在开奖' : items}}
            </span>
          </div>
          <div>{{item.balls.length ? gyh(item.balls).join('') : '-'}}</div>
          <div>{{item.balls.length ? gyhsb(item.balls).join('') : '-'}}</div>
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
import { BallToColorpcdd } from "../../../../js/pcddcolor";
export default {
  props: ["indexFlag", "datas"],
  data() {
    return {
      pullUp: false,
      routeList: {},
      list: [],
      pageid: 0,
      balls: [],
      timer: Function,
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
    gyh(balls) {
      const arr = [];
      let _balls = balls;
      if (typeof _balls === "string") {
        _balls = balls.split("+");
      }
      const sum =
        parseInt(_balls[0]) + parseInt(_balls[1]) + parseInt(_balls[2]);
      arr.push(sum > 13 ? "大" : "小");
      arr.push(sum % 2 == 0 ? "双" : "单");
      return arr;
    },
    gyhsb(balls) {
      const arr = [];
      let _balls = balls;
      if (typeof _balls === "string") {
        _balls = balls.split("+");
      }
      const sum =
        parseInt(_balls[0]) + parseInt(_balls[1]) + parseInt(_balls[2]);
      switch (sum) {
        case 3:
        case 6:
        case 9:
        case 12:
        case 15:
        case 18:
        case 21:
        case 24:
          arr.push("红");
          break;
        case 2:
        case 5:
        case 8:
        case 11:
        case 17:
        case 20:
        case 23:
        case 26:
          arr.push("蓝");
          break;
        case 0:
        case 13:
        case 14:
        case 27:
          arr.push("无");
          break;
        default:
          arr.push("绿");
          break;
      }
      // arr.push(sum != 0 && sum % 3 == 0 ? "红" : "");
      // arr.push(sum == 1 ? "绿" : "");
      // arr.push(sum == 4 ? "绿" : "");
      // arr.push(sum == 7 ? "绿" : "");
      // arr.push(sum == 10 ? "绿" : "");
      // arr.push(sum == 16 ? "绿" : "");
      // arr.push(sum == 19 ? "绿" : "");
      // arr.push(sum == 22 ? "绿" : "");
      // arr.push(sum == 25 ? "绿" : "");
      // arr.push(sum == 5 ? "蓝" : "");
      // arr.push(sum == 8 ? "蓝" : "");
      // arr.push(sum == 11 ? "蓝" : "");
      // arr.push(sum == 17 ? "蓝" : "");
      // arr.push(sum == 20 ? "蓝" : "");
      // arr.push(sum == 23 ? "蓝" : "");
      // arr.push(sum == 26 ? "蓝" : "");
      // arr.push(sum == 0 ? "无" : "");
      // arr.push(sum == 13 ? "无" : "");
      // arr.push(sum == 14 ? "无" : "");
      // arr.push(sum == 27 ? "无" : "");
      return arr;
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
          this.$dialog.loading.close();
          return;
        }
        /* 单次请求数据完毕 */
        this.pullUp = false;
        this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
      });
    },
    ballToColor(number) {
      return BallToColorpcdd(number);
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
  display: flex;
  flex-direction: column;
  width: 100%;
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
        width: 16%;
        border-top: poTorem(1px) solid rgb(221, 221, 221);
        border-left: poTorem(1px) solid rgb(221, 221, 221);
        font-size: 0.9rem;
        color: rgb(103, 99, 99);
        border-collapse: collapse;
      }
      .issue {
        width: 16%;
        border-left: 0 solid rgb(221, 221, 221);
      }
      .number_r {
        width: 52%;
        span {
          &:nth-child(1),
          &:nth-child(2),
          &:nth-child(3) {
            color: #e33939 !important;
          }
          .and_such {
            color: #e33939;
          }
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
