<template>
  <!-- 投注界面 -->
  <div class="betting">
    <div class="betting_left" v-if="switchs=='双面玩法'">
      <ul>
        <li v-for="(item,index) in guanfangList" v-if="switchs=='官方玩法'" :key="item.menuid" @click="changeList(item,index)" :class="{flag:index==actives}">
          {{item.name}}
        </li>
        <li v-for="(item,index) in shuangmianList" v-if="switchs=='双面玩法'" :key="item.menuid" @click="changeList(item,index)" :class="{flag:index==actives}">
          {{item.name}}
        </li>
      </ul>
      <div @click="clickCart" style="display:flex">
        <div class="sandi_drag">
          <i class="spots" v-show="cartNumber>0">
            {{cartNumber}}
          </i>
        </div>
      </div>
    </div>
    <div class="betting_right" v-if="switchs=='双面玩法'">
      <div class="select" v-if="switchs=='官方玩法'" @click="changeGameType(modelTitle)">
        <span>{{title}}</span>
        <span class="icon"></span>
      </div>
      <span v-if="getIsShowSinglePeilv" :class="[{'by_right':title=='定位胆'},'odds']">( 赔率：{{peilv ? peilv : '-.- '}})</span>
      <div class="betting_con">

        <div class="con_item" v-for="(item,index) in dataSet" :key="index" v-if="curPlayItem.playid != 2">
          <span>{{item.name}}</span>
          <ul>
            <li @click.stop="filter(item, ball)" v-for="(ball, indexs) in item.data" :key="indexs" style="position:relative" :data-val="ball.value" class="ball">
              <div class="ball" ref="ballOptions" :class="[{choosed: ball.checked}]">{{ball.name}}</div>
              <div class="peilv_num" v-if="peilvs.length">{{ball.peilv}}</div>
              <label for=""><input type="checkbox" v-model="ball.checked"></label>
            </li>
          </ul>
        </div>
        <!-- 单式 -->
        <div class="con_item" v-if="curPlayItem.playid==2">
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
      <yd-popup v-if="show1" v-model="show1" position="center" width="90%">
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
import { mapActions, mapState } from 'vuex'
import { RenderTypes } from '~/js/touzhu/commonTypes'
import { Calc_Zhushu_Obj } from '~/js/touzhu/touzhu.3d.calc'
import {
  getCalcFuncByPlayID,
  getRenderTypeByPlayID,
  getCalcDataByName
} from '~/js/touzhu/touzhu.3d.util'
import api from '../../../../../../api/betting'
import oddMixin from '../../oddMixin'
import danshiUtil from '~/js/touzhu/danshi.util'
import randomUtil from '~/js/touzhu/touzhu.random.danshi'
import { setTimeout } from 'timers'
import betArea from '../../../components/betArea'
const zhushuFunc = new Calc_Zhushu_Obj()
const lhd_template = [
  {
    name: '百、十',
    options: [
      { name: '龙', checked: false, value: 0 },
      { name: '虎', checked: false, value: 1 },
      { name: '和', checked: false, value: 2 }
    ]
  },
  {
    name: '百、个',
    options: [
      { name: '龙', checked: false, value: 3 },
      { name: '虎', checked: false, value: 4 },
      { name: '和', checked: false, value: 5 }
    ]
  },
  {
    name: '拾、个',
    options: [
      { name: '龙', checked: false, value: 6 },
      { name: '虎', checked: false, value: 7 },
      { name: '和', checked: false, value: 8 }
    ]
  }
]

const smp_template = [
  {
    name: '总和值',
    options: [
      { name: '大', checked: false, value: 0 },
      { name: '小', checked: false, value: 1 },
      { name: '单', checked: false, value: 2 },
      { name: '双', checked: false, value: 3 },
      { name: '尾大', checked: false, value: 4 },
      { name: '尾小', checked: false, value: 5 }
    ]
  },
  {
    name: '后二和值',
    options: [
      { name: '大', checked: false, value: 6 },
      { name: '小', checked: false, value: 7 },
      { name: '单', checked: false, value: 8 },
      { name: '双', checked: false, value: 9 },
      { name: '中', checked: false, value: 10 }
    ]
  },
  {
    name: '百位',
    options: [
      { name: '大', checked: false, value: 11 },
      { name: '小', checked: false, value: 12 },
      { name: '单', checked: false, value: 13 },
      { name: '双', checked: false, value: 14 }
    ]
  },
  {
    name: '十位',
    options: [
      { name: '大', checked: false, value: 15 },
      { name: '小', checked: false, value: 16 },
      { name: '单', checked: false, value: 17 },
      { name: '双', checked: false, value: 18 }
    ]
  },
  {
    name: '个位',
    options: [
      { name: '大', checked: false, value: 19 },
      { name: '小', checked: false, value: 20 },
      { name: '单', checked: false, value: 21 },
      { name: '双', checked: false, value: 22 }
    ]
  }
]

export default {
  name: 'fc3d_betting',
  props: ['routeList'],
  components: {
    betArea
  },
  data() {
    return {
      dataSet: [],
      playList: Array,
      guanfangList: [],
      shuangmianList: [],
      title: '直选复式',
      modelTitle: '',
      show1: false,
      heights: '',
      player: {},
      playersChl: {},
      template_default: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      template_sum: [0, 27],
      template_zu6: [3, 24],
      template_zu3: [1, 26],
      ballsList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      ballsList2: ['大', '小', '单', '双'],
      actives: 0, //当前是双面玩法还是官方玩法左侧玩法列表
      switchs: this.$route.params.play_type ? '双面玩法' : '官方玩法',
      peilv: '',
      peilvs: [],
      parentWanfa: 0,
      wanfaIndex: 0,
      curPlayItem: {},
      wanfa: {},
      danshiExcl: '',
      odds: [],
      zhushu: 0,
      myPlaceholder: ''
    }
  },
  mounted() {
    // this.getData(this.$route.params.js_tag)
  },
  activated() {
    if (this.$route.params.isHome) {
      this.getData(this.$route.params.js_tag)
    }
    // this.getData(this.routeList.js_tag || this.$route.params.js_tag)
    this.setOdds()
    this.clearBalls()
    this.zhushu = 0
    this.danshiExcl = ''
  },
  deactivated() {
    if (this.dataSet && this.dataSet.length) {
      this.dataSet.forEach(item => {
        item.data.forEach(x => (x.checked = false))
      })
    }
  },
  methods: {
    danshiZhushuCacl(val) {
      let danshiExcl = val.split(' ').join('|')
      switch (this.curPlayItem.playid) {
        case 2:
          this.zhushu = zhushuFunc.calc_3x_zhxds(danshiExcl.split(','))
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
    clearBalls() {
      if (this.dataSet && this.dataSet.length) {
        this.dataSet.forEach(x => x.data.forEach(y => (y.checked = false)))
      }
      this.zhushu = 0
      this.setBetNumber(0)
    },
    getTemplateByRange(template) {
      let arr = []
      if (!template.length && template.length !== 2) {
        return []
      }
      for (let i = template[0]; i <= template[1]; i++) {
        arr.push(i)
      }
      return arr
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
      let func = getCalcFuncByPlayID(playid), //getCalcFuncByName(playName),
        param = oneDimValuesArr
      if (playid === 12) {
        param = towDimValuesArr //定位胆
      } else if (
        playid === 1 || //"三星直选复式"
        playid === 8 || //前二直选复式
        playid === 9 //后二直选复式
      ) {
        param = twoDimNamesArr
      }
      this.zhushu = zhushuFunc[func](param)
    },
    clickHandle() {
      // debugger
      // 单行多赔率
      let oneDimArr = [],
        twoDimArr = [],
        oneDimValuesArr = [],
        twoDimNamesArr = [],
        towDimValuesArr = [],
        dataSet = []
      let formatStr = '',
        formatShowStr = ''
      let yiweiArr = []
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
      if (
        !danshiUtil.isSingleMode(this.routeList.js_tag, this.curPlayItem.playid)
      ) {
        this.calcZhushu(
          this.curPlayItem.playid,
          oneDimValuesArr,
          twoDimNamesArr,
          towDimValuesArr
        )
      }

      //this.setBetNumber(oneDimArr.length);

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
        js_tag: this.$store.state.betting.js_tag,
        playid: this.curPlayItem.playid,
        dataSource: this.dataSet,
        danshiExcl: this.danshiExcl,
        dataSet: oneDimArr, // 数据源,已选中的一维数组
        filteredData: twoDimArr //已经选中的项数组 二维数组
      })
    },
    // 选择号码
    filter(val1, val2) {
      setTimeout(this.clickHandle)
    },
    changeList(val, num) {
      // 添加类名
      this.actives = num
      if (val) this.modelTitle = val.name
      val &&
        val.submenu[0] &&
        val.submenu[0].playlist.length &&
        this.specific(val.submenu[0].playlist[0], '显示', 0, 0)

      this.wanfa = val
    },
    specific(val, txt, p, i) {
      switch (val.playid) {
        case 2:
          this.myPlaceholder = '1 2 3'
          break
      }
      this.danshiExcl = ''
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
      this.setBetNumber(0)
      txt != '显示' && (this.show1 = !this.show1)
      this.setBallList(val.playid)
      this.setDataSet()
      this.odds.length && this.setEachDataPeilv(this.curPlayItem.playid)
    },
    setBallList(playid) {
      switch (playid) {
        case 26: // 双面盘
          this.playersChl = smp_template
          return
        case 27: // 龙虎斗
          this.playersChl = lhd_template
          return
        case 15: //单双
        case 16:
          this.ballsList = this.ballsList2
          return
        case 3: //三星直选和值
          this.ballsList = this.getTemplateByRange(this.template_sum)
          break
        case 7: //组六和值
          this.ballsList = this.getTemplateByRange(this.template_zu6)
          break
        case 6: //组三和值
          this.ballsList = this.getTemplateByRange(this.template_zu3)
          break
        default:
          this.ballsList = this.template_default
          break
      }
      let _arr = []
      _arr = this.playersChl.map(x => {
        return {
          name: x,
          options: this.ballsList,
          values: this.ballsList
        }
      })
      this.playersChl = _arr
    },
    changeGameType(val) {
      this.show1 = !this.show1
      this.playList.map((item, index) => {
        item.name == val && (this.player = item)
      })
    },
    // 初始化数据源
    setDataSet() {
      let columns = this.playersChl,
        _dataSet = [],
        arr = [26, 27]
      let bool = arr.includes(this.curPlayItem.playid)
      columns.forEach((item, index) => {
        let _d = []
        item.options &&
          item.options.forEach((x, i) => {
            _d.push({
              name: x.name || x,
              checked: false,
              peilv: '-',
              playid: this.curPlayItem.playid,
              value: bool ? x.value : x
              // item.values && item.values.length
              //   ? item.values[i]
              //   : index * item.options.length + i //从0开始
            })
          })

        // if (item.data) {
        //   item.data.forEach(el => (el.checked = false));
        //   _d = item.data;
        // }

        _dataSet.push({
          name: item.name,
          data: _d
        })
        //_dataSet.push(Object.assign({},item));
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
      'clearCart',
      'setBetData',
      'showOfficial'
    ])
  },
  watch: {
    danshiExcl(val) {
      this.zhushu = 0
      this.danshiZhushuCacl(val)
    },
    async '$route.params'(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === '3d' &&
        oldVal &&
        (oldVal.js_tag && oldVal.js_tag === '3d')
      ) {
        const _playItem = this.curPlayItem
        this.setOdds()
        this.clearBalls()
        this.setBetNumber(0)
        this.setBetData(0)
        this.clearCart()
        if (newVal.isHome) {
          await this.getData(this.$route.params.js_tag)
          this.findItemByWanfa(_playItem.wanfa)
        }
      }
    },
    show1: function(val) {
      val == false && (this.heights = '0px')
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
    }
  },
  computed: {
    text() {
      return this.$route.params
    },
    ...mapState({
      switch: state => state.betting.switch,
      // zhushu: state => state.betting.betNumber,
      cart: state => state.betting.cart,
      cartNumber: state => state.betting.cartNumber
    }),
    getIsShowSinglePeilv() {
      let result = true
      if (this.peilvs.length) return false
      let playids = [3, 6, 7, 26, 27]
      return !playids.includes(this.curPlayItem.playid)
    }
  },
  mixins: [oddMixin]
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
    .sandi_drag {
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
        width: 90%;
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
        li {
          @include center;
          width: poTorem(48px);
          height: poTorem(48px);
          border-radius: 50%;
          background: #fff;
          margin-left: poTorem(16px);
          margin-top: poTorem(10px);
          border: poTorem(1px) solid #dbdbdb;
          font-size: poTorem(22px);
          color: #e33939;
          font-weight: 900;
        }
        li.ball {
          border: none;
          height: auto;
          flex-wrap: wrap;
          > div:nth-child(1) {
            @include center;
            width: poTorem(48px);
            height: poTorem(48px);
            border-radius: 50%;
            background: #fff;
            // margin-left: poTorem(26px);
            // margin-top: poTorem(10px);
            border: poTorem(1px) solid #dbdbdb;
            font-size: poTorem(22px);
            color: #e33939;
            font-weight: 900;
          }
          > div:nth-child(2) {
            width: 100%;
            height: 2rem;
            line-height: 2rem;
            text-align: center;
            font-size: poTorem(12px);
            color: #707070;
          }
          > label {
            width: 100%;
            height: 100%;
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            input {
              opacity: 0;
              width: 100%;
              height: 100%;
              border: none;
            }
          }
        }
        li.lhd-item {
          width: 100%;
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-evenly;
          border: none;
          margin: 0;
          align-items: center;
          padding: 1.6rem 0;
          > span {
            padding: 0 1.1rem;
            line-height: 2;
            border: 1px solid #ccc;
            border-radius: 4px;
            align-self: unset;
            color: #e33939;
            user-select: none;
          }
          > span:nth-child(2) {
            border-radius: 50%;
            width: 2rem;
            height: 2rem;
            line-height: 2rem;
            text-align: center;
            padding: 0;
            color: #707070;
          }
        }
        .choosed {
          background-color: #e33939 !important;
          color: #fff !important;
          border: poTorem(1px) solid #e33939 !important;
        }
      }
      ul.smp {
        justify-content: center;
        li {
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
