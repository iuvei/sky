<template>
  <!-- 投注界面 -->
  <div class="betting">
    <div class="betting_left" v-if="switchs=='双面玩法'">
      <ul>
        <!-- <li v-for="(item,index) in guanfangList" v-if="switchs=='官方玩法'" :key="index" @click="changeList(item, index)" :class="{flag:index == actives}">
          {{item.name}}
        </li> -->
        <li v-for="(item,index) in shuangmianList" :key="index" @click="changeList(item, index)" :class="{flag:index == actives}">
          {{item.name}}
        </li>
      </ul>
      <div @click="clickCart" style="display:flex">
        <div class="pk10_drag">
          <i class="spots" v-show="cartNumber>0">
            {{cartNumber}}
          </i>
        </div>
      </div>
    </div>
    <div class="betting_right" v-if="switchs=='双面玩法'">
      <div class="select" @click="changeGameType(modelTitle)" v-show="![6,7,14,15].includes(curPlayItem.playid)">
        <span>{{title}}</span>
        <span class="icon"></span>
      </div>
      <span v-if="![7].includes(curPlayItem.playid)" :class="[{'by_right':[6,14,15].includes(curPlayItem.playid)},'odds']">(赔率：{{peilv || '- '}})</span>
      <div class="betting_con">

        <div class="con_item" v-for="(item,index) in dataSet" :key="index" v-if="![3, 5].includes(curPlayItem.playid)">
          <span v-if="item.data[0].playid != 7">{{item.name}}</span>
          <ul>
            <li @click.stop="filter(item, ball)" v-for="(ball, ball_index) in item.data" :key="ball_index" style="position:relative" :data-val="ball.value" :class="{'shift_line' : curPlayItem.playid == 7 && ball_index == 5}">
              <div class="ball" ref="ballOptions" :class="[{choosed: ball.checked}]">{{ball.name}}</div>
              <div class="peilv_num" v-if="peilvs.length">{{ball.peilv}}</div>
              <input type="checkbox" v-model="ball.checked">
            </li>
          </ul>
        </div>
        <!-- 单式 -->
        <div class="con_item" v-if="[3, 5].includes(curPlayItem.playid)">
          <div class="danshi">
            <p>{{curPlayItem.play_title}}</p>
            <textarea autofocus cols="30" rows="8" :placeholder="'例如：' + myPlaceholder" v-model="danshiExcl"></textarea>
            <p class="caution">注意：</p>
            <p>每个号码之间请用空格隔开，每一注号码之间请用一个逗号[,]隔开</p>
          </div>
        </div>
      </div>
    </div>
    <bet-area :curPlayItem="curPlayItem" :dataSet="dataSet" v-if="switchs=='官方玩法'" :placeholder="myPlaceholder" v-model="danshiExcl" @chooseBall="filter"></bet-area>
    <!-- 弹窗 -->
    <div class="modle">
      <yd-popup v-model="show1" position="center" width="90%">
        <div class="modle_title">
          <span>{{modelTitle}}</span>
          <i class="icon" @click="show1=!show1"></i>
        </div>
        <div class="time_line_box">
          <yd-timeline class="time_line_wrap">
            <yd-timeline-item v-for="(item,index) in player.submenu" :key="index">
              <span>{{item.name}}</span>
              <ul>
                <li style="width:unset;padding:0 3px" @click="specific(items,'',index,indexs,item)" v-for="(items,indexs) in item.playlist" :key="indexs" :class="{wanfa: indexs==wanfaIndex&&index==parentWanfa}" :title="items.wanfa">{{items.playname}}</li>
              </ul>
            </yd-timeline-item>
          </yd-timeline>
        </div>
      </yd-popup>
    </div>
  </div>
</template>
<script>
const template1_normal = [
  {
    name: '',
    options: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
]
const template_gyh = [
  {
    name: '冠亚和',
    options: [
      '大',
      '小',
      '单',
      '双',
      '中',
      '和',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19'
    ]
  }
]

const templates_smp = [
  {
    name: '冠军',
    options: ['大', '小', '单', '双', '龙', '虎'],
    values: [0, 1, 2, 3, 4, 5]
  },
  {
    name: '亚军',
    options: ['大', '小', '单', '双', '龙', '虎'],
    values: [0, 1, 2, 3, 4, 5]
  },
  {
    name: '季军',
    options: ['大', '小', '单', '双', '龙', '虎'],
    values: [0, 1, 2, 3, 4, 5]
  },
  {
    name: '第四名',
    options: ['大', '小', '单', '双', '龙', '虎'],
    values: [0, 1, 2, 3, 4, 5]
  },
  {
    name: '第五名',
    options: ['大', '小', '单', '双', '龙', '虎'],
    values: [0, 1, 2, 3, 4, 5]
  },
  {
    name: '第六名',
    options: ['大', '小', '单', '双'],
    values: [0, 1, 2, 3]
  },
  {
    name: '第七名',
    options: ['大', '小', '单', '双'],
    values: [0, 1, 2, 3]
  },
  {
    name: '第八名',
    options: ['大', '小', '单', '双'],
    values: [0, 1, 2, 3]
  },
  {
    name: '第九名',
    options: ['大', '小', '单', '双'],
    values: [0, 1, 2, 3]
  },
  {
    name: '第十名',
    options: ['大', '小', '单', '双'],
    values: [0, 1, 2, 3]
  }
]

import { mapActions, mapState } from 'vuex'
import { BallUtil, DataUtil, CalcUtil, ChoseBall } from '~/js/pk10.util'
import { RenderTypes } from '~/js/touzhu/commonTypes'
import {
  Calc_Zhushu_Obj,
  getRenderTypeByPlayID,
  getCalcFuncByPlayID
} from '~/js/touzhu/touzhu.pk10.calc'
import api from '../../../../../../api/betting'
import oddMixin from '../../oddMixin'
import danshiUtil from '~/js/touzhu/danshi.util'
import randomUtil from '~/js/touzhu/touzhu.random.danshi'
import betArea from '../../../components/betArea'
let zhushuFunc = new Calc_Zhushu_Obj()
export default {
  name: 'pk10_betting',
  props: ['routeList'],
  components: {
    betArea
  },
  data() {
    return {
      danshiExcl: '',
      playList: Array,
      guanfangList: [],
      shuangmianList: [],
      title: '直选复式',
      modelTitle: '',
      show1: false,
      heights: '',
      player: {},
      playersChl: {},
      ballsList: [],
      actives: 0,
      // switchs: '官方玩法',
      switchs: this.$route.params.play_type ? '双面玩法' : '官方玩法',
      peilv: '',
      peilvs: [],
      parentWanfa: 0,
      wanfaIndex: 0,
      curPlayItem: {},
      wanfa: {},
      dataSet: [],
      zhushu: 0,
      odds: [],
      myPlaceholder: ''
    }
  },
  activated() {
    if (this.$route.params.isHome) {
      this.switchs =
        this.$route.params.play_type === 0 ? '官方玩法' : '双面玩法'
      this.getData(this.$route.params.js_tag)
    }
    this.zhushu = 0
    this.clearBalls()
    this.setOdds()
    this.danshiExcl = ''
  },
  deactivated() {
    this.resetData()
  },
  methods: {
    danshiZhushuCacl(val) {
      let danshiExcl = val.split(' ').join('|')
      switch (this.curPlayItem.playid) {
        case 3:
          this.zhushu = zhushuFunc.calc_q2_zxds(danshiExcl.split(','))
          break
        case 5:
          this.zhushu = zhushuFunc.calc_q3_zxds(danshiExcl.split(','))
          break
      }
    },
    clickCart() {
      if (this.cart.length) {
        this.$router.push('/shopCart')
      } else {
        this.$dialog.toast({ mes: '您的购物车空空如也' })
      }
    },
    resetData() {
      this.zhushu = 0
      this.setBetNumber(0)
      if (this.dataSet && this.dataSet.length) {
        this.dataSet.forEach(item => {
          item.data.forEach(x => (x.checked = false))
        })
      }
    },
    clearBalls() {
      this.resetData()
    },
    async getData(tag) {
      let playConfig = await api.getGamePlayConfig(tag)
      if (playConfig && Array.isArray(playConfig)) {
        this.playList = playConfig
        this.setPlayConfig(playConfig)
        this.guanfangList = playConfig.filter(x => x.showofficial === 0)
        this.shuangmianList = playConfig.filter(x => x.showofficial === 1)

        // 从彩种获取默认玩法 ，0为官方 1为双面
        const defaultPlay = this.$route.params.play_type
        this.player =
          defaultPlay === 0 ? this.guanfangList : this.shuangmianList
        this.playSwitch(defaultPlay ? '双面玩法' : '官方玩法')
        if (!this.$route.params.hasOwnProperty('wanfa')) {
          this.player && this.changeList(this.player[0])
        } else {
          this.findItemByWanfa(this.$route.params.wanfa)
        }
      }
    },
    getDwdArr(arr) {
      //所有的定位胆都需要单独计算一个位置参数
      //只要当前行有值，就取当前行的2次方数，和即为位置数组
      let c = 0
      arr.forEach((x, i) => {
        if (x.length) {
          c += Math.pow(2, i)
        }
      })
      return [c.toString()].concat(arr)
    },
    // 计算注数
    calcZhushu(playid, oneDimValuesArr, twoDimNamesArr, towDimValuesArr) {
      let func = getCalcFuncByPlayID(playid)
      if ([1, 7].includes(playid)) {
        //playName.includes("前一") || playName.includes("冠亚和")) {
        this.zhushu = zhushuFunc[func](oneDimValuesArr)
      } else if ([2, 4].includes(playid)) {
        //(playName.includes("前二") || playName.includes("前三")) {
        this.zhushu = zhushuFunc[func](twoDimNamesArr)
      } else if (
        [6, 14, 15].includes(playid)
        // playName.includes("定位胆") ||
        // playName.includes("数字盘") ||
        // playName.includes("双面盘")
      ) {
        towDimValuesArr = this.getDwdArr(towDimValuesArr).filter(x => x.length)
        this.zhushu = zhushuFunc[func](towDimValuesArr)
      }
    },
    clickHandle() {
      console.log('clickHandle')
      // 单行多赔率
      let oneDimArr = [],
        twoDimArr = [],
        oneDimValuesArr = [],
        twoDimNamesArr = [],
        towDimValuesArr = [],
        dataSet = []
      let formatStr = '',
        formatShowStr = ''
      let peilvType = getRenderTypeByPlayID(this.curPlayItem.playid)
      this.dataSet.forEach(item => {
        let filteredData = item.data.filter(x => x.checked)
        oneDimArr.push.apply(oneDimArr, filteredData)
        if (filteredData.length) {
          let obj = Object.assign({}, item)
          obj.data = filteredData
          twoDimArr.push(obj)
        }
        let filters = filteredData.map(x =>
          x.name.toString().replace(/\s/g, '')
        )
        let values = filteredData.map(x =>
          x.value.toString().replace(/\s/g, '')
        )
        oneDimValuesArr.push.apply(oneDimValuesArr, filters)
        twoDimNamesArr.push(filters.join('|'))
        towDimValuesArr.push(values.join('|'))
      })
      this.calcZhushu(
        this.curPlayItem.playid,
        oneDimValuesArr,
        twoDimNamesArr,
        towDimValuesArr
      )
      if (peilvType === RenderTypes.MUTI_ROW_SINGLE_PEILV) {
        twoDimNamesArr.forEach((x, i) => {
          if (x.length) {
            formatShowStr += `${
              this.dataSet[i].name
            }(<span style="color:red">${x}</span>) `
          }
        })
        formatShowStr = formatShowStr.trim()
        dataSet = [
          {
            pielv: this.peilv,
            name: formatShowStr
          }
        ]
      } else {
        dataSet = oneDimArr
      }

      this.setBetData({
        type: this.switchs == '官方玩法' ? 0 : 1,
        peilv: this.peilv,
        peilvType: peilvType, // 0 为单赔率,1为多赔率
        formatValueStr:
          peilvType == 0 ? twoDimNamesArr.join(' ') : oneDimValuesArr.join(' '),
        arr: twoDimNamesArr,
        arr2: towDimValuesArr,
        formatShowStr: formatShowStr,
        //定位胆专用取值
        dwdValuesArr:
          peilvType == RenderTypes.DWD ? this.getDwdArr(towDimValuesArr) : [],
        wanfa: this.title, // 玩法
        zhushu: this.zhushu, //注数
        gameid: this.routeList.lotter_id,
        playid: this.curPlayItem.playid,
        dataSource: this.dataSet,
        danshiExcl: this.danshiExcl, //单式专用
        js_tag: this.$store.state.betting.js_tag,
        dataSet: oneDimArr, // 数据源,已选中的一维数组
        filteredData: twoDimArr //已经选中的项数组 二维数组
      })
    },
    // 选择号码
    filter(item, val2) {
      setTimeout(this.clickHandle)
    },
    changeList(val, num) {
      // 添加类名
      this.actives = num
      this.modelTitle = val.name
      val &&
        val.submenu[0] &&
        val.submenu[0].playlist.length &&
        this.specific(val.submenu[0].playlist[0], '显示', 0, 0)
      this.resetData()
      this.wanfa = val
    },
    specific(val, txt, p, i) {
      this.show1 = false
      switch (val.playid) {
        case 3:
          this.myPlaceholder = '1 2'
          break
        case 5:
          this.myPlaceholder = '1 2 3'
          break
      }
      this.danshiExcl = ''
      this.resetData()
      this.curPlayItem = val
      this.parentWanfa = p
      this.wanfaIndex = i
      this.description(
        `<b>范例</b>：${val.play_fanli}<br><br><b>玩法说明</b>：${
          val.play_shuoming
        }`
      )
      this.playersChl = val.content.split('+')
      this.title = val.playname
      this.setBallList(val.playid)
      // txt != '显示' && (this.show1 = !this.show1)
      this.setBetNumber(0)

      this.setDataSet()
      this.odds.length && this.setEachDataPeilv(val.playid)
    },
    setBallList(playid) {
      let _arr = []
      if (
        [1, 2, 3, 4, 5, 6, 15].includes(playid)
        // wanfa.includes("直选") ||
        // wanfa.includes("定位胆") ||
        // wanfa.includes("数字盘")
      ) {
        _arr = this.playersChl.map(x => {
          return {
            name: x,
            options: template1_normal[0].options,
            values: template1_normal[0].values
          }
        })
      } else if ([14].includes(playid)) {
        //双面盘
        this.playersChl.forEach((item, index) => {
          let _item = {
            name: item,
            options: templates_smp[index].options,
            values: templates_smp[index].values
          }
          _arr.push(_item)
        })
      } else if ([7].includes(playid)) {
        //冠亚和
        _arr = template_gyh
      }
      this.playersChl = _arr
    },
    changeGameType(val) {
      this.show1 = !this.show1
      this.player = this.playList.filter(item => item.name == val)[0] || {}
      // this.playList.map((item, index) => {
      //   item.name == val && (this.player = item)
      // })
    },
    // 初始化数据源
    setDataSet() {
      let columns = this.playersChl
      let _dataSet = []
      columns.forEach((item, index) => {
        let _d = []
        item.options.forEach((x, i) => {
          _d.push({
            name: x,
            checked: false,
            peilv: '-',
            playid: this.curPlayItem.playid,
            value:
              item.values && item.values.length
                ? item.values[i]
                : index * item.options.length + i //从0开始
          })
        })
        _dataSet.push({
          name: item.name,
          data: _d
        })
      })
      this.dataSet = _dataSet
    },
    ...mapActions([
      'description',
      'playSwitch',
      'setBetNumber',
      'setBetOdd',
      'setBetOdds',
      'setBetUOdds',
      'setPlayConfig',
      'setBetData',
      'clearCart',
      'showOfficial'
    ])
  },
  watch: {
    danshiExcl(val) {
      this.zhushu = 0
      this.danshiZhushuCacl(val)
    },
    switch: function(val) {
      this.switchs = val
      if (this.isFromBetHistory) return
      if (this.switchs == '双面玩法') {
        this.changeList(this.shuangmianList[0], 0)
      } else {
        this.changeList(this.guanfangList[0], 0)
      }
    },
    zhushu: {
      handler(val) {
        this.setBetNumber(val)
        if (
          danshiUtil.isSingleMode(
            this.routeList.js_tag,
            this.curPlayItem.playid
          ) &&
          val > 0
        ) {
          let dataSet = randomUtil.createDataSource(
            this.routeList.js_tag,
            this.curPlayItem.playid
          )
          this.dataSet = dataSet
          this.clickHandle()
        }
      },
      deep: true
    },
    async '$route.params'(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === 'pk10' &&
        oldVal &&
        (oldVal.js_tag && oldVal.js_tag === 'pk10')
      ) {
        const _playItem = this.curPlayItem
        this.clearBalls()
        this.setOdds()
        this.setBetNumber(0)
        this.clearCart()
        this.setBetData({})
        if (newVal.isHome) {
          await this.getData(this.$route.params.js_tag)
          this.findItemByWanfa(_playItem.wanfa)
        }
      }
    }
  },
  computed: {
    ...mapState({
      switch: state => state.betting.switch,
      betNumber: state => state.betting.betNumber,
      cartNumber: state => state.betting.cartNumber,
      cart: state => state.betting.cart
    })
  },
  mixins: [oddMixin]
}
</script>
<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
.betting {
  @include between;
  align-items: stretch;
  flex: 1;
  margin-top: poTorem(30px);
  .betting_left {
    width: 25%;
    background: #f2f3f4;
    @include column;
    overflow: scroll;
    .pk10_drag {
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
      overflow: scroll;
      li {
        outline: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        margin: auto;
        @include center;
        width: 90%;
        height: poTorem(50px);
        background: url(~img/goucai/morenzhuangtai.png) no-repeat;
        background-size: contain;
        background-position: center;
        font-size: poTorem(16px);
        color: #535353;
        font-weight: 900;
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
  }
  .betting_con {
    @include column;
    width: 100%;
    .con_item {
      width: 100%;
      @include column;
      border-bottom: poTorem(1px) solid #dbdbdb;
      padding: 0 poTorem(18px);
      margin-top: poTorem(5px);
      &:last-child {
        border-bottom: none;
      }
      span {
        align-self: flex-start;
        color: #707070;
        font-size: poTorem(16px);
      }
      ul {
        @include start;
        flex-wrap: wrap;
        margin-bottom: poTorem(10px);
        justify-content: flex-start;
        li {
          outline: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          @include center;
          width: poTorem(45px);
          flex-wrap: wrap;
          border-radius: 50%;
          background: #fff;
          margin-left: poTorem(10px);
          margin-top: poTorem(10px);
          font-size: poTorem(20px);
          font-weight: 900;
          color: #e33939;
          margin-right: 0.7rem;
          .ball {
            border: 0.0625rem solid #dbdbdb;
            line-height: poTorem(40px);
            text-align: center;
            font-size: poTorem(20px);
            color: #e33939;
            height: poTorem(45px);
            width: poTorem(45px);
            border-radius: 50%;
            transition: background-color 0.2s ease;
          }
          input {
            opacity: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            border: none;
          }
          > .choosed {
            background-color: #e33939;
            color: #fff;
            border: none;
          }
          .peilv_num {
            padding-top: 0.5rem;
            color: #535353;
            font-size: poTorem(12px);
          }
        }
        .shift_line {
          margin-right: 9rem;
        }
        .choosed {
          background-color: #e33939;
          color: #fff !important;
          border: poTorem(1px) solid #e33939 !important;
        }
      }
      ul.smp {
        justify-content: center;
        li {
          outline: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          margin-bottom: poTorem(20px);
          position: relative;
          span {
            position: absolute;
            bottom: -1.4rem;
            left: 0;
            display: block;
            text-align: center;
            width: 100%;
            user-select: none;
          }
        }
        li.choosed {
          background-color: #e33939;
          color: #fff !important;
          border: poTorem(1px) solid #e33939 !important;
        }
      }
      .danshi {
        width: 100%;
        height: 100%;
        p {
          font-size: poTorem(16px);
          color: #535353;
        }
        .caution {
          color: #ff7c34;
        }
        textarea {
          width: 100%;
          height: 100%;
          font-size: 1rem;
          letter-spacing: poTorem(2px);
          padding: poTorem(5px) poTorem(10px);
          border: poTorem(1px) solid #d3d3d3;
          border-radius: poTorem(5px);
          margin-bottom: poTorem(30px);
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
