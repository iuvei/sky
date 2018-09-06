<template>
  <yd-infinitescroll :callback="_callback" ref="infinitescrollDemo">
    <yd-list theme="1" slot="list">
      <ul class="thelist_list">
        <li class="title">
          <div class="issue">期号</div>
          <div class="number">开奖号码</div>
          <div class="form_form">形态</div>
        </li>
      </ul>
      <ul class="thelist_list" v-for="(item,index) in list" :key="index" v-if="index >= 0">
        <li>
          <div class="issue">{{(item.qishu+'').substr(-4)}}期</div>
          <div class="number" v-if="item.balls.length > 1">
            <span class="Colorno" v-for="(items,indexs) in item.balls.split('+')" :key="indexs">
              <img :src="require('../../../../img/xingyunpuke/puke_'+ items +'.png')" alt="图片">
            </span>
          </div>
          <div class="number" v-else>正在开奖</div>
          <div class="form_form">{{item.balls ? _pokerNumStatus(item.balls.split('+')):'-'}}</div>
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
    directives: {},
    data() {
        return {
            pullUp: false,
            list: [],
            pageid: 0,
            balls: [],
            content: []
        }
    },
    mounted() {
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
        //扑克牌开奖号码状态
        _pokerNumStatus(ballsArr) {
            let ballStatus = '';  //开奖后的状态
        let dxArr = [];  //扑克解析大小数组
        let hsArr = []; //解析后花色数组
        // 扑克状态:  同花顺->豹子->同花->顺子->对子->单张

        if (Array.isArray(ballsArr)&&ballsArr.length == 3){

            for (let i = 0; i < ballsArr.length; i++){

                let balls = parseInt(ballsArr[i], 10);
                let dx = parseInt((balls/4) + 1);
                let color = (balls%4);
                dxArr.push(dx);
                hsArr.push(color);
            }
            dxArr.sort(function(a,b){return a-b})
            hsArr.sort(function(a,b){return a-b})
            //同花顺
            if(((1==(dxArr[0]*1) && 12==(dxArr[1]*1) && 13==(dxArr[2]*1)) || ((dxArr[0]+1 == dxArr[1] && dxArr[1]+1 == dxArr[2]))) && (hsArr[0] == hsArr[1] && hsArr[0] == hsArr[2])){
              ballStatus = '同花顺';
              return ballStatus;
            }
            //豹子
            else if(dxArr[0] == dxArr[1] && dxArr[0] == dxArr[2]){
                ballStatus = '豹子';
                return ballStatus;
            }
            //同花
            else if((hsArr[0] == hsArr[1] && hsArr[0] == hsArr[2])){
              ballStatus = '同花';
              return  ballStatus;
            } 
            //QKA顺子或普通顺子
            else if(((1==(dxArr[0]*1) && 12==(dxArr[1]*1) && 13==(dxArr[2]*1)) || ((dxArr[0]+1 == dxArr[1] && dxArr[1]+1 == dxArr[2])))){
                ballStatus = '顺子';
                return ballStatus;
            }

            //对子
            else if(dxArr[0] == dxArr[1] || dxArr[1]==dxArr[2] || dxArr[0]==dxArr[2]){
                ballStatus = '对子'
            }
            else{
              ballStatus = '单张'
            }
            
            return ballStatus;
        }else{
          return '-'
        }
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
@import '~css/resources.scss';
.yd-list {
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
                width: 18%;
                border-left: 0 solid rgb(221, 221, 221);
            }
            .number {
                width: 36%;
                display: flex;
                justify-content: center;
                text-align: center;
                .Colorno {
                    margin: 0.2rem;
                    img {
                        width: 1.6rem;
                        height: 1.8rem;
                        background-size: contain;
                    }
                }
            }
            .form_form {
                width: 15%;
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
