<template>
    <yd-infinitescroll :callback="_callback" ref="infinitescrollDemo">
        <yd-list theme="1" slot="list">
            <ul class="thelist_list">
                <li>
                    <div class="issue">期号</div>
                    <div class="number">开奖号码</div>
                    <div class="and_several">冠亚军和</div>
                    <div>大小</div>
                    <div>单双</div>
                </li>
            </ul>
            <ul class="thelist_list" v-for="(item,index) in list" :key="index" v-if="index >= 0">
                <li>
                    <div class="issue">{{(item.qishu+'').substr(-4)}}期</div>
                    <div class="number">
                        <span v-for="(items,indexs) in item.balls.split('+')" :key="indexs">
                            {{items == '' ? '正在开奖' : items }}
                        </span>
                    </div>
                    <div class="and_several">{{item.balls ? gyh(item.balls).join('') : '-'}}</div>
                    <div> {{item.balls ? gyhdx(item.balls).join('') : '-'}}</div>
                    <div> {{item.balls ? gyhds(item.balls).join('') : '-'}}</div>
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
export default {
  props: ['indexFlag', 'datas'],
  data() {
    return {
      pullUp: false,
      routeList: {},
      list: [],
      pageid: 0,
      balls: [],
      content: [],
      val: ''
    }
  },
  mounted() {
    this.routeList = this.$route.params
    this.getData(this.datas.name_tag)
    this.name = this.datas.name_tag
  },
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
    gyh(balls) {
      let arr = [],
        _balls = balls
      if (typeof _balls === 'string') {
        _balls = balls.split('+')
      }
      let sum = parseInt(_balls[0]) + parseInt(_balls[1])
      arr.push(sum)
      return arr
    },
    gyhdx(balls) {
      let arr = [],
        _balls = balls
      if (typeof _balls === 'string') {
        _balls = balls.split('+')
      }
      let sum = parseInt(_balls[0]) + parseInt(_balls[1])

      let shape = '小'
      if (sum > 2 && sum < 9) {
        shape = '小'
      } else if (sum > 8 && sum < 14) {
        shape = '中'
      } else {
        shape = '大'
      }

      arr.push(shape)
      return arr
    },
    gyhds(balls) {
      let arr = [],
        _balls = balls
      if (typeof _balls === 'string') {
        _balls = balls.split('+')
      }
      let sum = parseInt(_balls[0]) + parseInt(_balls[1])
      arr.push(sum === 11 ? '和' : sum % 2 == 0 ? '双' : '单')
      return arr
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
        border-top: poTorem(1px) solid rgb(221, 221, 221);
        border-left: poTorem(1px) solid rgb(221, 221, 221);
        font-size: poTorem(13px);
        color: rgb(103, 99, 99);
        border-collapse: collapse;
        width: poTorem(60px);
      }
      .issue {
        width: poTorem(85px);
        border-left: 0 solid #fff;
      }
      .number {
        width: poTorem(365px);
        span {
          color: #e33939;
        }
      }
      .and_several {
        width: poTorem(110px);
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
