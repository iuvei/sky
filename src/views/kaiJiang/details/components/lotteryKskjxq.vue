<template>
    <yd-infinitescroll :callback="_callback" ref="infinitescrollDemo">
        <yd-list theme="1" slot="list">
            <ul class="thelist_list">
                <li>
                    <div class="issue">期号</div>
                    <div class="number">开奖号码</div>
                    <div>和值</div>
                    <div>大小</div>
                    <div>单双</div>
                    <div class="state">状态</div>
                </li>
            </ul>
            <ul class="thelist_list" v-for="(item,index) in list" :key="index" v-if="index >= 0">
                <li>
                    <div class="issue">{{(item.qishu+'').substr(-4)}}期</div>
                    <div class="number">
                        <span v-for="(items,indexs) in item.balls.split('+')" :key="indexs">{{items == '' ? '正在开奖' : items}}</span>
                    </div>
                    <div>{{ item.balls ? ballsh(item.balls).join('') : '-'}}</div>
                    <div>{{ item.balls ? getSumVal(item.balls)[0] : '-' }}</div>
                    <div>{{ item.balls ? getSumVal(item.balls)[1] : '-' }}</div>
                    <div class="state">{{ item.balls ? returnRules(item.balls.split('+')):'-'}}</div>
                </li>
            </ul>
        </yd-list>
        <!-- 数据全部加载完毕显示 -->
        <span slot="doneTip">不要在拉了,没有数据啦~~</span>
        <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
    </yd-infinitescroll>
</template>
<script>
import { trend_get } from '../../../../../api/user'
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  props: ['indexFlag', 'datas'],
  data() {
    return {
      pullUp: false,
      routeLists: {},
      list: [],
      balls: [],
      content: [],
      val: '',
      name: '',
      pageid: 0,
      playList: Array
    }
  },
  mounted() {
    // this.routeList = this.$route.params;
    this.getData(this.datas.name_tag)
    this.name = this.datas.name_tag
  },
  computed() {},
  watch: {
    datas(val) {
      this.list = []
      this.pageid = 0
      this.getData(val.name_tag)
    }
  },
  filters: {},
  methods: {
    greet(val) {
      this.val = val
    },
    ballsh(balls) {
      let arr = [],
        _balls = balls
      if (typeof _balls === 'string') {
        _balls = balls.split('+')
      }
      let sum = parseInt(_balls[0]) + parseInt(_balls[1]) + parseInt(_balls[2])
      arr.push(sum)
      return arr
    },
    getSumVal(balls) {
      if (balls) {
        let sum = (typeof balls === 'string' ? balls.split('+') : balls)
          .map(x => parseInt(x))
          .reduce((a, b) => a + b)
        let arr = []
        arr.push(sum > 10 ? '大' : '小')
        arr.push(sum % 2 === 0 ? '双' : '单')
        return arr
      } else {
        return ['', '']
      }
    },
    returnRules(val) {
      let arr = val.slice(0, 3)
      let sortArr = arr.sort()
      let newArr = new Set(sortArr)
      if (newArr.size == 3) {
        let abc =
          Number(sortArr[0]) + 1 == sortArr[1] &&
          Number(sortArr[1]) + 1 == sortArr[2]
        let isExist1 =
          sortArr.includes('8') &&
          sortArr.includes('9') &&
          sortArr.includes('0')
        let isExist2 =
          sortArr.includes('1') &&
          sortArr.includes('9') &&
          sortArr.includes('0')
        if (abc || isExist1 || isExist2) {
          return '顺子'
        } else {
          return '三不同'
        }
      } else if (newArr.size == 2) {
        return '二同号'
      } else if (newArr.size == 1) {
        return '豹子'
      }
    },
    getData(name) {
      this.$dialog.loading.open(' ')
      this.$ajax('request', {
        ac: 'getKjCpLog',
        tag: name,
        date: 0,
        pcount: 20,
        pageid: this.pageid
      }).then(response => {
        this.$dialog.loading.close()
        const _list = response
        if (this.pullUp) this.list = [...this.list, ..._list]
        else this.list = _list
        if (_list.length < 20 || this.pageid == 19) {
          /* 所有数据加载完毕 */
          this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
          return
        }
        /* 单次请求数据完毕 */
        this.pullUp = false
        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
      })
    },
    _callback() {
      this.pullUp = true
      this.pageid++
      this.getData(this.name)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.yd-list {
  margin: 0;
  padding: 0;
  .thelist_list {
    li {
      display: flex;
      width: 100%;
      flex-wrap: nowrap;
      height: poTorem(35px);
      line-height: poTorem(35px);
      div {
        width: poTorem(40px);
        @include public;
        border-top: poTorem(1px) solid rgb(221, 221, 221);
        border-left: poTorem(1px) solid rgb(221, 221, 221);
        font-size: poTorem(14px);
        color: rgb(103, 99, 99);
        border-collapse: collapse;
      }
      .issue {
        width: poTorem(80px);
        border-left: 0 solid rgb(221, 221, 221);
      }
      .number {
        width: poTorem(180px);
        span {
          margin: poTorem(7px);
          color: #e33939;
        }
      }
      .state {
        width: poTorem(90px);
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