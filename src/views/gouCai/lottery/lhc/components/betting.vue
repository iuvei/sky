<template>
  <!-- 投注界面 -->
  <div class="betting">
    <div class="betting_left" v-if='false'>
      <ul>
        <li v-for="(item,index) in playList" :key="index" @click="changeList(item,index)" :class="{flag:index==actives}">
          {{item.name}}
        </li>
      </ul>
      <div @click="clickCart" style="display:flex">
        <div class="lhc_drag">
          <i class="spots" v-show="cartNumber>0">
            {{cartNumber}}
          </i>
        </div>
      </div>
    </div>
    <div class="betting_right" v-if='false'>
      <div class="select" @click="changeGameType(modelTitle)" v-show="title!='五行' && title!='自选不中'">
        <span>{{title}}</span>
        <span class="icon"></span>
      </div>
      <span data-v="1" :class="[{'by_right':modelTitle=='连码'},'odds']" v-show="peilvIsShow && ![1,8,21,30,33].includes(curPlayItem.playid)">(赔率：{{peilv.length>0?peilv:'-'}})</span>
      <span data-v="2" class="odds" v-if="[21,8].includes(curPlayItem.playid)">(赔率：{{pl==0?"0.0":pl}})</span>
      <span data-v="2" class="odds" v-if="[30,33].includes(curPlayItem.playid)">(赔率：{{peilv}})</span>
      <div class="betting_con">
        <!-- 循环投注页面 -->
        <div class="con_item" v-for="(item,index) in dataSet" :key="index">
          <ul :class="{'around':[3].includes(curPlayItem.playid)}">
            <!-- 其他 -->
            <li @click="clickBall(item, ball, indexs)" v-for="(ball, indexs) in item.data" :key="indexs">
              <label><input type="checkbox" v-model="ball.checked"></label>
              <div ref="ballOptions" v-setChoosed="ball.checked" :class="[{medium_box:typeNum==3},{big_box: typeNum==0},{xxl_box: typeNum==4},{lottery_options:typeNum==2}, {square_box:typeNum==1, 'choosed': ball.checked}]">
                <span>{{ball.name}}</span>
                <div v-if="[0, 3, 4].includes(typeNum)" :class="{grid:[3,9].includes(curPlayItem.playid) && isSupportGridLayout,wxgrid:[9].includes(curPlayItem.playid) && !isSupportGridLayout,flexgrid:[3].includes(curPlayItem.playid) && !isSupportGridLayout}">
                  <span v-for="(item, index) in ball.balls " :key="index ">{{item}}</span>
                </div>
              </div>
              <div class="peilv_num " v-show="!peilvIsShow ">{{peilvs.length > 0 ? peilvs[indexs] : '-'}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <bet-area :curPlayItem="curPlayItem" :dataSet="dataSet" @chooseBall="clickBall" :peilvIsShow="peilvIsShow" :modelTitle="modelTitle" :peilv="peilv" :typeNum="typeNum" :peilvs="peilvs" :isSupportGridLayout="isSupportGridLayout" :pl="pl"></bet-area>
    <!-- 弹窗 -->
    <div class="modle ">
      <yd-popup v-if="show1" v-model="show1" position="center" width="90%">
        <div class="modle_title">
          <span>{{modelTitle}}</span>
          <i class="icon" @click="show1=!show1"></i>
        </div>
        <div class="time_line_box">
          <yd-timeline class="time_line_wrap">
            <yd-timeline-item v-for="(item,index) in player.submenu " :key="index ">
              <span>{{item.name}}</span>
              <ul>
                <li @click="specific(items, '',index,indexs,item) " v-for="(items,indexs) in item.playlist " :key="indexs " :class="{wanfa: indexs==wanfaIndex&&index==parentWanfa} ">{{items.playname}}</li>
              </ul>
            </yd-timeline-item>
          </yd-timeline>
        </div>
      </yd-popup>
    </div>
  </div>
</template>
<script>
import sortBy from 'lodash/sortby'
import { mapActions, mapState } from 'vuex'
import { setGamePeilvConfig, getConfigByGameid } from '~/js/playConfig.util'
import { selectBalls } from '~/js/lhc.template'
import * as calcFuncs from '~/js/touzhu/touzhu.lhc'
import axios from 'axios'
import { bettingMixin } from './bettingMixin'
import oddMixin from '../../oddMixin'
import api from '../../../../../../api/betting'
import { setTimeout } from 'timers'
import betArea from '../../../components/betArea'
export default {
  name: 'lhc_betting',
  props: ['routeList'],
  components: {
    betArea
  },
  data() {
    return {
      isSupportGridLayout: false,
      playList: Array,
      optionsList: [],
      title: '直选复式',
      modelTitle: '',
      show1: false,
      heights: '',
      pl: '',
      peilv: [],
      peilvs: [],
      dataSet: [],
      curPlayItem: {},
      player: {},
      playersChl: {},
      ballsList: [],
      switchs: '官方玩法',
      bettingArr: [], // 传给公共方法的数组，可作为特殊玩法共用数组
      buyBall: [], // 拼接管道符之后的所有球号数组
      tebanbanbo: [
        '红大单',
        '红小单',
        '红大双',
        '红小双',
        '蓝大单',
        '蓝小单',
        '蓝大双',
        '蓝小双',
        '绿大单',
        '绿小单',
        '绿大双',
        '绿小双'
      ], // 特半半波
      tebanbo: [
        '红大',
        '红小',
        '红单',
        '红双',
        '蓝大',
        '蓝小',
        '蓝单',
        '蓝双',
        '绿大',
        '绿小',
        '绿单',
        '绿双'
      ], // 特半波
      temasebo: [], // 特码色波
      temashuangmian: [
        '特大',
        '特双',
        '特小单',
        '特地肖',
        '特小',
        '特大单',
        '特小双',
        '特前肖',
        '特大尾',
        '特大双',
        '特合单',
        '特后肖',
        '特小尾',
        '特合大',
        '特合双',
        '特家肖',
        '特单',
        '特合小',
        '特天肖',
        '特野肖'
      ], // 特码双面
      temaweishu: [
        '0头',
        '1头',
        '2头',
        '3头',
        '4头',
        '1尾',
        '2尾',
        '3尾',
        '4尾',
        '5尾',
        '6尾',
        '7尾',
        '8尾',
        '9尾',
        '0尾'
      ], //  特码尾数
      shengxiao: [], // 共用生肖
      wuxing: [], // 五行
      weishu: [
        { name: '0尾', balls: ['10', '20', '30', '40'], value: 0 },
        { name: '1尾', balls: ['01', '11', '21', '31', '41'], value: 1 },
        { name: '2尾', balls: ['02', '12', '22', '32', '42'], value: 2 },
        { name: '3尾', balls: ['03', '13', '23', '33', '43'], value: 3 },
        { name: '4尾', balls: ['04', '14', '24', '34', '44'], value: 4 },
        { name: '5尾', balls: ['05', '15', '25', '36', '45'], value: 5 },
        { name: '6尾', balls: ['06', '16', '26', '36', '46'], value: 6 },
        { name: '7尾', balls: ['07', '17', '27', '37', '47'], value: 7 },
        { name: '8尾', balls: ['08', '18', '28', '38', '48'], value: 8 },
        { name: '9尾', balls: ['09', '19', '29', '39', '49'], value: 9 }
      ], // 单纯尾数
      zongxiao: ['2肖', '3肖', '4肖', '5肖', '6肖', '7肖', '总肖单', '总肖双'], // 总肖
      secondWanfa: '',
      actives: 0,
      parentWanfa: 0,
      wanfaIndex: 0,
      zhushu: 0,
      odds: [],
      typeNum: 0, // 0:纯数字选球 1:小方块 2:中方块 3:大方块
      allPeilv: []
    }
  },
  directives: {
    setChoosed: {
      update(el, { value }) {
        if (value && el.classList && !el.classList.contains('choosed')) {
          el.classList.add('choosed')
        }
      }
    }
  },
  mounted() {
    this.isSupportGridLayout = CSS.supports('display', 'grid')
    this.getData(this.$route.params.js_tag)
  },
  activated() {
    if (this.$route.params.isHome) {
      this.getData(this.$route.params.js_tag)
    }
    this.zhushu = 0
    this.optionsList = selectBalls(10)
    this.clearBalls()
    this.setOdds()
  },
  deactivated() {
    if (this.dataSet.length) {
      this.dataSet.forEach(item => {
        item.data.forEach(x => (x.checked = false))
      })
    }
  },
  methods: {
    clickBall(val1, val2, i) {
      const _this = this
      setTimeout(function() {
        _this.setSelectLimit(val2)
        // _this.filter(val1, val2, i)
        _this.clickHandle()
      })
    },
    clickCart() {
      if (this.cart.length) {
        this.$router.push('/shopCart')
      } else {
        this.$dialog.toast({ mes: '您的购物车空空如也' })
      }
    },
    async getData(tag) {
      let playConfig = await api.getGamePlayConfig(tag)
      if (playConfig && Array.isArray(playConfig)) {
        this.playList = playConfig
        this.setPlayConfig(playConfig)
        //六合彩只有官方玩法
        this.player = playConfig
        this.playSwitch('官方玩法')
        if (this.isFromBetHistory) {
          this.findItemByWanfa(this.historeyWanfa)
        } else this.changeList(this.player[0])
      }
    },
    // 选择号码
    filter(val1, val2, i) {
      this.bettingArr.splice(0)
      this.dataSet.forEach((item, index) => {
        item.data.forEach((n, i) => {
          if (n.checked) {
            this.bettingArr.push(n.value)
          }
        })
      })
      if (this.secondWanfa == 16) {
        this.zhushu = this.bettingArr.length > 5 ? 1 : 0
      } else if (
        this.secondWanfa == 17 ||
        this.secondWanfa == 19 ||
        this.secondWanfa == 20
      ) {
        if (
          this.playid == 22 ||
          this.playid == 26 ||
          this.playid == 32 ||
          this.playid == 34 ||
          this.playid == 33
        ) {
          this.zhushu = calcFuncs.getTwoBalls(this.bettingArr).length
        } else if (
          this.playid == 23 ||
          this.playid == 27 ||
          this.playid == 31 ||
          this.playid == 30
        ) {
          this.zhushu = calcFuncs.getThreeBalls(this.bettingArr).length
        } else if (
          this.playid == 24 ||
          this.playid == 28 ||
          this.playid == 35
        ) {
          this.zhushu = calcFuncs.getFourBalls(this.bettingArr).length
        } else if (this.playid == 25 || this.playid == 29) {
          this.zhushu = calcFuncs.getFiveBalls(this.bettingArr).length
        }
      } else if (this.secondWanfa == 11) {
        if (this.playid == 8) {
          this.zhushu = this.bettingArr.length >= 2 ? 1 : 0
          // this.hexiaoPeilvProcess();
        } else if (this.playid == 7) {
          this.zhushu = this.bettingArr.length
        }
      } else {
        this.zhushu = this.bettingArr.length
      }
      this.specialProcess()
      // console.log(this.bettingArr)

      this.bettingArr = this.bettingArr.map(x => {
        if (x.toString().includes('|')) {
          x = x
            .split('|')
            .map(x => Number(x))
            .sort((a, b) => a - b)
            .join('|')
        }
        return x
      })

      if (this.playersChl.length == 1 || this.playersChl == '') {
        this.bettingArr = this.bettingArr.sort((a, b) => a - b)
      }
    },
    specialProcess() {
      if (
        [8, 21].includes(this.playid) &&
        this.peilv.length &&
        typeof this.peilv === 'string'
      ) {
        let bl = this.bettingArr.length,
          _len = []
        if (this.playid == 8) {
          _len = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        } else if (this.playid == 21) {
          _len = [6, 7, 8, 9, 10, 11]
        }

        if (_len.includes(bl)) {
          let index = _len.findIndex(x => x == bl)
          this.pl = this.peilv.split('|')[index]
        } else {
          this.pl = ''
        }
      }
    },
    changeList(val, num) {
      //初始化选球
      this.$nextTick(() => {
        if (this.$refs.ballOptions) {
          this.$refs.ballOptions.forEach(item => {
            item.classList.remove('choosed')
          })
        }
      })
      // 添加类名
      this.actives = num
      this.modelTitle = val.name
      this.specific(val.submenu[0].playlist[0], '显示', 0, 0, val.submenu[0])
    },
    specific(val, txt, p, i, submenu) {
      this.curPlayItem = val
      // 初始化选球数组
      this.bettingArr = []
      this.zhushu = 0
      this.setBetNumber(0)

      this.secondWanfa = submenu.menuid //设置玩法的第二层名称，由此判断选球方式
      this.playid = val.playid
      this.parentWanfa = p
      this.wanfaIndex = i
      this.description(
        `<b>范例</b>：${val.play_fanli}<br><br><b>玩法说明</b>：${
          val.play_shuoming
        }`
      )
      this.playersChl = [submenu.name]
      this.title = val.playname
      let arrlist = [
        1,
        36,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        21,
        30,
        31,
        32,
        33,
        34,
        35
      ]
      if (arrlist.includes(val.playid)) {
        this.typeNum = 2
        let arr = [],
          a = this.optionsList.balls
        for (const key in a) {
          arr.push(a[key])
        }
        this.ballsList = arr
      } else {
        if (val.playid == 4) {
          this.typeNum = 1
          this.ballsList = this.tebanbo
        } else if (val.playid == 6) {
          this.typeNum = 1
          this.ballsList = this.tebanbanbo
        } else if (val.playid == 3) {
          this.typeNum = 0
          let arr = [],
            a = this.optionsList.color
          for (const key in a) {
            arr.push(a[key])
          }
          this.ballsList = arr
        } else if (val.playid == 2) {
          this.typeNum = 1
          this.ballsList = this.temashuangmian
        } else if (val.playid == 5) {
          this.typeNum = 1
          this.ballsList = this.temaweishu
        } else if (val.playid == 18 || (val.playid > 25 && val.playid < 30)) {
          this.typeNum = 3
          this.ballsList = this.weishu
        } else if (val.playid == 19) {
          this.typeNum = 1
          this.ballsList = ['红波', '蓝波', '绿波', '和局']
        } else if (val.playid == 20) {
          this.typeNum = 1
          this.ballsList = this.zongxiao
        } else if (val.playid == 9) {
          this.typeNum = 4
          let arr = [],
            a = this.optionsList.wuxing
          for (const key in a) {
            arr.push(a[key])
          }
          arr.forEach(
            x =>
              (x.balls = x.balls.map(
                y => (y < 10 ? '0' + Number(y) : y.toString())
              ))
          )

          this.ballsList = sortBy(arr, item => item.idx)
        } else {
          this.typeNum = 3
          let arr = [],
            a = this.optionsList.shengxiao
          for (const key in a) {
            arr.push(a[key])
          }
          console.log(arr)
          this.ballsList = arr
        }
      }
      this.$nextTick(() => {
        // dom更新后初始化选球
        this.$refs.ballOptions &&
          this.$refs.ballOptions.forEach(item => {
            item.classList.remove('choosed')
          })
      })
      txt != '显示' && (this.show1 = !this.show1)

      this.setDataSet()
      this.odds.length && this.setEachDataPeilv(val.playid)
    },
    changeGameType(val) {
      this.show1 = !this.show1
      this.playList.map((item, index) => {
        item.name == val && (this.player = item)
      })
    },
    clearBalls() {
      this.bettingArr = []
      this.zhushu = 0
      this.setBetNumber(0)
      this.$refs.ballOptions &&
        this.$refs.ballOptions.forEach(item => {
          item.classList.remove('choosed')
        })
      if (this.dataSet && this.dataSet.length) {
        this.dataSet.forEach(x => x.data.forEach(y => (y.checked = false)))
      }
    },
    //判断不同玩法的限制个数
    setSelectLimit(curItem) {
      const arr = this.dataSet[0].data.filter(x => x.checked)
      if (this.playid == 8) {
        if (arr.length > 11) {
          arr.filter(x => x.name != curItem.name)[0].checked = false
        }
      }
      if (this.secondWanfa == 16 || this.secondWanfa == 19) {
        if (arr.length > 11) {
          arr.filter(x => x.name != curItem.name)[0].checked = false
        }
      } else if (this.secondWanfa == 17 || this.secondWanfa == 20) {
        if (arr.length > 6 && this.playid > 21 && this.playid < 30) {
          arr.filter(x => x.name != curItem.name)[0].checked = false
        }
      }
    },
    ...mapActions([
      'description',
      'playSwitch',
      'setBetNumber',
      'setBetOdds',
      'setBetUOdds',
      'setBetOdd',
      'setQishu',
      'setBetData',
      'clearCart',
      'setPlayConfig'
    ])
  },
  watch: {
    async '$route.params'(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === 'lhc' &&
        oldVal &&
        (oldVal.js_tag && oldVal.js_tag === 'lhc')
      ) {
        const _playItem = this.curPlayItem
        this.setOdds()
        this.clearBalls()
        this.setBetNumber(0)
        this.clearCart()
        this.setBetData({})
        if (newVal.isHome) {
          await this.getData(this.$route.params.js_tag)
          this.findItemByWanfa(_playItem.wanfa)
        }
      }
    },
    zhushu: {
      handler(val) {
        this.setBetNumber(val)
      },
      deep: true
    }
  },
  computed: {
    ...mapState({
      odds: state => state.betting.odds,
      cart: state => state.betting.cart,
      cartNumber: state => state.betting.cartNumber
    }),
    peilvIsShow() {
      if ([21, 8, 30, 33].includes(this.curPlayItem.playid)) {
        return true
      }
      return this.peilv && this.peilv.length && !this.peilv.includes('|')
    }
  },
  mixins: [bettingMixin, oddMixin]
}
</script>
<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
.betting {
  @include between;
  flex: 1;
  align-items: stretch;
  margin-top: poTorem(30px);
  .betting_left {
    width: 25%;
    background: #f2f3f4;
    @include column;
    .lhc_drag {
      position: relative;
      box-shadow: #555 0 0 poTorem(10px);
      border-radius: 50%;
      width: poTorem(60px);
      height: poTorem(60px);
      background: #fff url(~img/goucai/gouwuche.png) no-repeat;
      background-size: poTorem(30px) poTorem(30px);
      background-position: center;
      .spots {
        position: absolute;
        @include center;
        width: poTorem(18px);
        height: poTorem(18px);
        background: #e03a3a;
        display: flex;
        border-radius: 50%;
        font-weight: bolder;
        color: #fff;
        right: poTorem(8px);
        top: poTorem(8px);
      }
    }
    ul {
      flex: 1;
      width: 90%;
      overflow-y: auto;
      li {
        outline: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        margin: auto;
        @include center;
        width: 94%;
        height: poTorem(50px);
        background: url(~img/goucai/morenzhuangtai.png) no-repeat;
        background-size: contain;
        background-position: center;
        font-size: poTorem(16px);
        color: #535353;
        font-weight: 900;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .flag {
        @include center;
        background: url(~img/goucai/xuanzhong.png) no-repeat;
        width: 90%;
        height: poTorem(50px);
        background-size: contain;
        background-position: center;
        font-size: poTorem(16px);
        color: #e13939;
      }
    }
  }
  .betting_right {
    // max-height: poTorem(517px);
    flex: 1;
    display: block;
    overflow: scroll;
    .select {
      @include center;
      width: poTorem(240px);
      height: poTorem(39px);
      border: poTorem(1px) solid #eaeaea;
      border-radius: poTorem(5px);
      font-size: poTorem(16px);
      color: #434343;
      position: relative;
      margin: 0 auto;
      margin-top: poTorem(15px);
      .icon {
        position: absolute;
        background: url(~img/goucai/sanjiao.png) no-repeat;
        background-size: contain;
        width: poTorem(29px);
        height: poTorem(14px);
        right: 0px;
      }
    }
    .odds {
      color: #535353;
      margin: poTorem(10px) 0 0px 0;
      font-size: poTorem(14px);
      display: block;
      text-align: center;
    }
    .by_right {
      text-align: right;
    }
    .betting_right_bottom {
      position: fixed;
      bottom: poTorem(65px);
      width: 100%;
    }
  }
  .betting_con {
    @include column;
    width: 100%;
    .con_item {
      width: 100%;
      @include column;
      border-bottom: poTorem(1px) solid #dbdbdb;
      padding: 0 poTorem(10px);
      margin-top: poTorem(5px);
      &:last-child {
        border-bottom: none;
      }
      > span {
        align-self: flex-start;
        color: #707070;
        font-size: poTorem(16px);
      }
      ul {
        @include around;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: poTorem(20px) 0;
        &.around {
          @include around;
        }
        li {
          position: relative;
          outline: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          @include column;
          padding: poTorem(5px) poTorem(10px);
          color: #707070;
          margin-right: 0.4rem;
          .big_box,
          .medium_box,
          .xxl_box {
            color: #e33939;
            width: poTorem(205px);
            height: poTorem(100px);
            border: poTorem(1px) solid #dbdbdb;
            border-radius: poTorem(5px);
            text-align: center;
            > div {
              display: flex;
              justify-content: space-around;
              > span {
                font-size: 0.9rem;
              }
            }
            > div.grid {
              display: grid;
              grid-template-columns: repeat(5, 1fr);
              grid-gap: poTorem(3px);
              padding: 0 2px;
            }
            > div.flexgrid {
              justify-content: flex-start;
              flex-wrap: wrap;
              > span {
                padding: 0.3rem poTorem(8px);
              }
            }
            > div.wxgrid {
              justify-content: flex-start;
              flex-wrap: wrap;
              > span {
                // padding: 0.1rem poTorem(2px);
                display: inline-block;
                width: poTorem(21px);
                height: poTorem(21px);
              }
            }
            > span {
              font-size: poTorem(18px);
              display: block;
              padding: 4px 0;
            }
            p {
              @include start;
              flex-wrap: wrap;
              padding: 0 poTorem(10px);
              span {
                display: inline-block;
                width: poTorem(25px);
                font-size: poTorem(16px);
              }
            }
          }
          .big_box {
            height: 7rem;
            > p {
              font-size: 1rem;
              text-align: justify;
              line-height: 1.6;
            }
          }
          .medium_box,
          .xxl_box {
            width: poTorem(115px);
            height: poTorem(50px);
            p {
              @include around;
              padding: 0;
              span {
                width: auto;
                // font-size: poTorem(12px);
              }
            }
          }
          .xxl_box {
            // width: poTorem(130px);
            height: poTorem(88px);
            p > span:first-child {
              padding: 0 1px;
            }
            > p {
              text-align: center;
              // padding: 0 8px;
              line-height: 1.5;
            }
          }
          div {
            text-align: center;
          }
          .lottery_options {
            width: poTorem(45px);
            height: poTorem(45px);
            border-radius: 50%;
            background: #fff;
            // margin-left: poTorem(26px);
            // margin-top: poTorem(10px);
            border: poTorem(1px) solid #dbdbdb;
            font-size: poTorem(22px);
            line-height: poTorem(43px);
            color: #e33939;
            font-weight: 900;
          }
          .square_box {
            width: poTorem(70px);
            height: poTorem(40px);
            border: poTorem(1px) solid #dbdbdb;
            border-radius: poTorem(5px);
            font-size: poTorem(18px);
            line-height: poTorem(38px);
            color: #e33939;
          }
          > .choosed {
            background-color: #e33939;
            color: #fff;
            border: none;
          }
          .peilv_num {
            padding-top: 0.5rem;
            font-weight: 900;
            color: #535353;
          }
          label {
            width: 100%;
            height: 100%;
            position: absolute;
            opacity: 0;
            input {
              width: 100%;
              height: 100%;
              border: none;
            }
          }
        }
      }
    }
  }
  // 弹窗
  .modle {
    .modle_title {
      @include center;
      width: 100%;
      color: #535353;
      height: poTorem(50px);
      border-bottom: (1px) dashed #dbdbdb;
      font-size: poTorem(20px);
      position: relative;
    }
    .icon {
      position: absolute;
      right: poTorem(10px);
      background: url(~img/goucai/close.png) no-repeat;
      background-size: contain;
      width: poTorem(18px);
      height: poTorem(18px);
    }
    .time_line_box {
      .time_line_wrap {
        .wanfa {
          color: #eb384d;
          border-color: #eb384d;
        }
      }
    }
  }
}
</style>
