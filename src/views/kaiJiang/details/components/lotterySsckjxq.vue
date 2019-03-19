<template>
  <yd-infinitescroll :callback="_callback"
                     ref="infinitescrollDemo">
    <yd-list theme="1"
             slot="list">
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
          <span class="Colorno"
                v-for="(items,indexs) in item.balls.split('+')"
                :key="indexs">{{items == '' ? '正在开奖' : items}}</span>
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
          <li>{{items.balls ? returnState(items.balls.split('+')[0]):'-'}}</li>
          <li>{{items.balls ? returnState(items.balls.split('+')[1]):'-'}}</li>
          <li>{{items.balls ? returnState(items.balls.split('+')[2]):'-'}}</li>
          <li>{{items.balls ? returnState(items.balls.split('+')[3]):'-'}}</li>
          <li>{{items.balls ? returnState(items.balls.split('+')[4]):'-'}}</li>
          <li>{{items.balls ? returnRules(items.balls.split('+')):'-'}}</li>
          <li>{{items.balls ? returnBehind(items.balls.split('+')):'-'}}</li>
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
        { text: "万位" },
        { text: "千位" },
        { text: "百位" },
        { text: "十位" },
        { text: "个位" },
        { text: "前三" },
        { text: "后三" }
      ]
    };
  },
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
    }
  },
  filters: {},
  methods: {
    greet(val) {
      this.val = val;
    },
    returnState(val) {
      let a, b;
      val > 4 ? (a = "大") : (a = "小");
      val % 2 == 0 ? (b = "双") : (b = "单");
      return a + b;
    },
    returnRules(val) {
      const arr = val.slice(0, 3);
      const sortArr = arr.sort();
      const newArr = new Set(sortArr);
      if (newArr.size == 3) {
        const abc =
          Number(sortArr[0]) + 1 == sortArr[1] &&
          Number(sortArr[1]) + 1 == sortArr[2];
        const isExist1 =
          sortArr.includes("8") &&
          sortArr.includes("9") &&
          sortArr.includes("0");
        const isExist2 =
          sortArr.includes("1") &&
          sortArr.includes("9") &&
          sortArr.includes("0");
        if (abc || isExist1 || isExist2) {
          return "顺子";
        } else {
          return "组六";
        }
      } else if (newArr.size == 2) {
        return "组三";
      } else if (newArr.size == 1) {
        return "豹子";
      }
    },
    returnBehind(val) {
      const arr = val.slice(2, 5);
      const sortArr = arr.sort();
      const newArr = new Set(sortArr);
      if (newArr.size == 3) {
        const abc =
          Number(sortArr[0]) + 1 == sortArr[1] &&
          Number(sortArr[1]) + 1 == sortArr[2];
        const isExist1 =
          sortArr.includes("8") &&
          sortArr.includes("9") &&
          sortArr.includes("0");
        const isExist2 =
          sortArr.includes("1") &&
          sortArr.includes("9") &&
          sortArr.includes("0");
        if (abc || isExist1 || isExist2) {
          return "顺子";
        } else {
          return "组六";
        }
      } else if (newArr.size == 2) {
        return "组三";
      } else if (newArr.size == 1) {
        return "豹子";
      }
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
.yd-list {
  overflow: hidden;
  margin: 0;
  padding: 0;
  min-width: 20rem;
  .left {
    float: left;
    list-style: none;
    width: 15.7%;
    li {
      width: 100%;
      height: poTorem(35px);
      font-size: poTorem(14px);
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
        width: 100%;
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
    width: 36.3%;
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
        font-size: 0.9rem;
        color: rgb(226, 35, 35);
        margin: 0.43rem;
      }
    }
    .title {
      height: poTorem(35px);
      @include around;
      border-top: poTorem(1px) solid rgb(221, 221, 221);
      border-right: poTorem(1px) solid rgb(221, 221, 221);
      span {
        display: inline-block;
        width: 100%;
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
    width: 48%;
    overflow: auto;
    ul {
      @include between;
      width: 235%;
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
