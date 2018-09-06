<template>
  <yd-infinitescroll :callback="_callback" ref="infinitescrollDemo">
    <yd-list theme="1" slot="list" class="yd_list">
      <ul class="thelist_list">
        <li class="title">
          <div class="issue">期号</div>
          <div class="number">开奖号码</div>
        </li>
      </ul>
      <ul class="thelist_list" v-for="(item,index) in list" :key="index" v-if="index >= 0">
        <li>
          <div class="issue">{{(item.qishu+'').substr(-4)}}期</div>
          <div class="number" v-if="item.balls.length > 1">
            <span v-ds>{{returnz(item.balls.split('+')[0])}}</span>
            <span v-ds>{{returnsz(item.balls.split('+')[1])}}</span>
            <span v-ds>{{returny(item.balls.split('+')[2])}}</span>
          </div>
          <div class="number" v-else>正在开奖</div>
        </li>
      </ul>
    </yd-list>
    <!-- 数据全部加载完毕显示 -->
    <span slot="doneTip">不要在拉了,没有数据啦~~</span>
    <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
  </yd-infinitescroll>
</template>
<script>
import { trend_get } from "../../../../../api/user";
import { mapState } from "vuex";
const thArr = ["0"],
  thszArr = ["1"];
export default {
  props: ["indexFlag", "datas"],
  directives: {
    ds: el => {
      if (el.innerHTML == "单") {
        el.style.color = "#fff";
        el.style.background = "#019fe9";
      } else if (el.innerHTML == "双") {
        el.style.color = "#fff";
        el.style.background = "#e43838";
      } else if (el.innerHTML == "左" || el.innerHTML == "右") {
        el.style.background = "#dcdcdc";
      } else if (el.innerHTML == "3" || el.innerHTML == "4") {
        el.style.color = "#fff";
        el.style.background = "#626262";
      }
    }
  },
  data() {
    return {
      pullUp: false,
      list: [],
      pageid: 0,
      balls: [],
      content: []
    };
  },
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
  },
  filters: {},

  methods: {
    returnz(val) {
      if (thArr.includes(val)) {
        return "左";
      } else if (thszArr.includes(val)) {
        return "右";
      }
    },
    returnsz(val) {
      if (thArr.includes(val)) {
        return "3";
      } else if (thszArr.includes(val)) {
        return "4";
      }
    },
    returny(val) {
      if (thArr.includes(val)) {
        return "单";
      } else if (thszArr.includes(val)) {
        return "双";
      }
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
  margin: 0;
  padding: 0;
  .thelist_list {
    display: flex;
    width: 100%;
    height: 100%;
    border-bottom: poTorem(1px) solid rgb(221, 221, 221);
    li {
      display: flex;
      width: 100%;
      flex-wrap: nowrap;
      height: poTorem(35px);
      line-height: poTorem(35px);
      div {
        @include public;
        border-right: poTorem(1px) solid rgb(221, 221, 221);
        font-size: poTorem(14px);
        color: rgb(103, 99, 99);
        border-collapse: collapse;
      }
      .issue {
        //  width: poTorem(80px);
        width: 16%;
        border-left: 0 solid rgb(221, 221, 221);
      }
      .number {
        width: 46%;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1.6rem;
          height: 1.6rem;
          margin-left: poTorem(10px);
          border: poTorem(1px) solid rgb(221, 221, 221);
          border-radius: 50%;
          text-align: center;
          line-height: 1.6rem;
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