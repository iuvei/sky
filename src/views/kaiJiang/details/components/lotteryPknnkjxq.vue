<template>
  <yd-infinitescroll :callback="_callback" ref="infinitescrollDemo">
    <yd-list theme="1" slot="list" class="yd_list">
      <ul class="left">
        <li class="title">
          <span>期号</span>
        </li>
        <li v-for="(items, indexs) in list" :key="indexs">{{(items.qishu+'').substr(-4)}}期</li>
      </ul>
      <ul class="left_number">
        <li class="title">
          <span>开奖号码</span>
        </li>
        <li v-for="(item,index) in list" :key="index">
          <span class="Colorno" v-for="(items,indexs) in item.balls.split('+')" :key="indexs">{{items == '' ? '正在开奖' : items}}</span>
        </li>
      </ul>
      <div class="right">
        <ul>
          <li v-for="(item,index) in dataprev" :key="index">{{item.text}}</li>
        </ul>
        <ul class="content" v-for="(items,indexs) in list" :key="indexs">
          <li>{{items.balls ? _caculateNiuNiuStatues(items.balls.split('+').slice(0, 5)):'-'}}</li>
          <li>{{items.balls ? _caculateNiuNiuStatues(items.balls.split('+').slice(1, 6)):'-'}}</li>
          <li>{{items.balls ? _caculateNiuNiuStatues(items.balls.split('+').slice(2, 7)):'-'}}</li>
          <li>{{items.balls ? _caculateNiuNiuStatues(items.balls.split('+').slice(3, 8)):'-'}}</li>
          <li>{{items.balls ? _caculateNiuNiuStatues(items.balls.split('+').slice(4, 9)):'-'}}</li>
          <li>{{items.balls ? _caculateNiuNiuStatues(items.balls.split('+').slice(5, 10)):'-'}}</li>
        </ul>
      </div>
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
            list: [],
            pageid: 0,
            routeList: [],
            content: [],
            val: '',
            dataprev: [
                { text: '庄' },
                { text: '闲一' },
                { text: '闲二' },
                { text: '闲三' },
                { text: '闲四' },
                { text: '闲五' }
            ]
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
        //计算五个号码所组成的牛牛值
        _caculateNiuNiuStatues(ballsArr) {
            let niuniuBallStatue = ''
            let ballResult = null //判断是否找到符合条件的
            let niuniuBall1 = '' //符合条件的号码
            let niuniuBall2 = '' //符合条件的号码
            let niuniuBall3 = '' //符合条件的号码
            let niuniuBall4 = '' //剩下2个号码
            let niuniuBall5 = '' //剩下2个号码
            for (let i = 0; i < ballsArr.length; i++) {
                for (let j = i + 1; j < ballsArr.length; j++) {
                    for (let k = j + 1; k < ballsArr.length; k++) {
                        ballResult =
                            (parseInt(ballsArr[i], 10) +
                                parseInt(ballsArr[j], 10) +
                                parseInt(ballsArr[k], 10)) %
                                10 ==
                            0
                                ? true
                                : false
                        if (ballResult) {
                            niuniuBall1 = ballsArr[i]
                            niuniuBall2 = ballsArr[j]
                            niuniuBall3 = ballsArr[k]
                            break
                        } else {
                            continue
                        }
                    }
                    if (ballResult) {
                        break
                    } else {
                        continue
                    }
                }
                if (ballResult) {
                    break
                } else {
                    continue
                }
            }
            if (niuniuBall1 != '' && niuniuBall2 != '' && niuniuBall3 != '') {
                //符合条件的号码
                for (let i = 0; i < ballsArr.length; i++) {
                    if (
                        ballsArr[i] != niuniuBall1 &&
                        ballsArr[i] != niuniuBall2 &&
                        ballsArr[i] != niuniuBall3
                    ) {
                        if (niuniuBall4 == '') {
                            niuniuBall4 = ballsArr[i]
                            continue
                        } else {
                            niuniuBall5 = ballsArr[i]
                            break
                        }
                    }
                }
                let niuniuIdx =
                    (parseInt(niuniuBall4, 10) + parseInt(niuniuBall5, 10)) % 10
                switch (niuniuIdx) {
                    case 0:
                        niuniuBallStatue = '牛牛'
                        break
                    case 1:
                        niuniuBallStatue = '牛一'
                        break
                    case 2:
                        niuniuBallStatue = '牛二'
                        break
                    case 3:
                        niuniuBallStatue = '牛三'
                        break
                    case 4:
                        niuniuBallStatue = '牛四'
                        break
                    case 5:
                        niuniuBallStatue = '牛五'
                        break
                    case 6:
                        niuniuBallStatue = '牛六'
                        break
                    case 7:
                        niuniuBallStatue = '牛七'
                        break
                    case 8:
                        niuniuBallStatue = '牛八'
                        break
                    case 9:
                        niuniuBallStatue = '牛九'
                        break
                    default:
                        break
                }
            } else {
                // 没有符合条件
                niuniuBallStatue = '无牛'
            }
            return niuniuBallStatue
        },
        getData(name) {
            this.$dialog.loading.open(' ')
            this.$ajax('request', {
                ac: 'getKjCpLog',
                tag: name,
                date: '',
                pcount: 20,
                pageid: this.pageid
            }).then(response => {
                this.$dialog.loading.close()
                const _list = response
                if (this.pullUp) this.list = [...this.list, ..._list]
                else this.list = _list
                if (_list.length < 20 || this.pageid == 19) {
                    /* 所有数据加载完毕 */
                    this.$refs.infinitescrollDemo.$emit(
                        'ydui.infinitescroll.loadedDone'
                    )
                    return
                }
                /* 单次请求数据完毕 */
                this.pullUp = false
                this.$refs.infinitescrollDemo.$emit(
                    'ydui.infinitescroll.finishLoad'
                )
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
@import '../../../../css/resources.scss';
.yd_list {
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
        width: 57%;
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
                margin: poTorem(2px);
            }
        }
        .title {
            height: poTorem(35px);
            @include around;
            border-top: poTorem(1px) solid rgb(221, 221, 221);
            border-right: poTorem(1px) solid rgb(221, 221, 221);
            span {
                display: inline-block;
                width: poTorem(150px);
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
        width: 27.3%;
        ul {
            @include between;
            width: 310%;
            li {
                flex: 1;
                text-align: center;
                height: poTorem(35px);
                font-size: poTorem(14px);
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