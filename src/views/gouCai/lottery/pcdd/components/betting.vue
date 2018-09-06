<template>
  <!-- 投注界面 -->
  <div class="betting">
    <div class="betting_left">
      <ul>
        <li v-for="(item,index) in playList" :key="index" @click="changeList(item,index)" :class="{flag:index==actives}">
          {{item.name}}
        </li>
      </ul>
      <div @click="clickCart" style="display:flex">
        <div class="pcdd_drag">
          <i class="spots" v-show="cartNumber>0">
            {{cartNumber}}
          </i>
        </div>
      </div>
    </div>
    <div class="betting_right">
      <div class="select" style="height: 0; opacity: 0;" @click="changeGameType(modelTitle)" v-show="!['定位胆','双面盘'].includes(modelTitle)">
        <span>{{title}}</span>
        <span class="icon"></span>
      </div>
      <span v-if="isSinglePeilv" class="by_right odds">( 赔率：{{peilv ? peilv : '-.- '}})</span>
      <div class="betting_con">
        <div style="height:.7rem;"></div>
        <div class="con_item" v-for="(col, i) in dataSet" :key="i">

          <!-- <template> -->
          <span>{{col.name}}</span>
          <ul class="pcdd">
            <li v-for="(item, index) in col.data" :key="index" :data-val="item.value">
              <div @click="clickBall(item)" :class="{'choosed' : item.checked}">
                {{item.name}}
                <input type="checkbox" v-model="item.checked">
              </div>
              <div v-if="!isSinglePeilv">{{(peilvs.length && peilvs[index]) ? item.peilv : '-.-'}}</div>
            </li>
          </ul>
          <!-- </template> -->
        </div>
      </div>
    </div>
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
import { RenderTypes } from '~/js/touzhu/commonTypes'
import { mapActions, mapState } from 'vuex'
import {
  Calc_Zhushu_Obj,
  getRenderTypeByPlayID
} from '~/js/touzhu/touzhu.pcdd.calc'
import api from '../../../../../../api/betting'
import oddMixin from '../../oddMixin'
import { setTimeout } from 'timers'
const dataMap_Blend = [
  {
    name: '特码大小单双',
    options: [
      '大',
      '小',
      '单',
      '双',
      '大单',
      '小单',
      '大双',
      '小双',
      '极大',
      '极小'
    ]
  },
  {
    name: '色波/豹子',
    options: ['红波', '绿波', '蓝波', '豹子']
  }
]

const dataMap_Number = [
  {
    name: '',
    options: [0, 27]
  }
]

export default {
  name: 'pcdd_betting',
  props: ['routeList'],
  data() {
    return {
      playList: Array,
      title: '直选复式',
      modelTitle: '',
      show1: false,
      heights: '',
      player: {},
      playersChl: {}, //球列
      actives: 0,
      peilv: '',
      peilvs: [],
      curPlayItem: {},
      wanfa: {},
      zhushu: 0,
      dataSet: [],
      odds: [],
      data_blend: dataMap_Blend, //混合
      data_Number: dataMap_Number //特码,包三
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
    this.zhushu = 0
    this.clearBalls()
    this.setOdds()
  },
  deactivated() {
    if (this.dataSet && this.dataSet.length) {
      this.dataSet.forEach(item => {
        item.data.forEach(x => (x.checked = false))
      })
    }
  },
  methods: {
    clickCart() {
      if (this.cart.length) {
        this.$router.push('/shopCart')
      } else {
        this.$dialog.toast({ mes: '您的购物车空空如也' })
      }
    },
    clearBalls() {
      this.zhushu = 0
      if (this.dataSet && this.dataSet.length) {
        this.dataSet.forEach(x => x.data.forEach(y => (y.checked = false)))
      }
      this.setBetNumber(0)
    },
    resetData() {
      this.dataSet.forEach(item => {
        item.data.forEach(x => {
          x.checked = false
        })
      })
    },
    async getData(tag) {
      const playConfig = await api.getGamePlayConfig(tag)
      if (playConfig && Array.isArray(playConfig)) {
        this.playList = playConfig
        this.setPlayConfig(playConfig)
        this.player = playConfig
        if (this.isFromBetHistory) this.findItemByWanfa(this.historeyWanfa)
        else this.changeList(playConfig[0], 0)
      }
    },
    //计算注数
    calcZhushu(playid, arr) {
      if (playid === 2) {
        this.zhushu = arr.length > 2 ? 1 : 0
      } else if ([1, 3].includes(playid)) {
        this.zhushu = arr.length
      } else this.zhushu = 0
    },
    // 获取赔率类型 1为 多赔率，0为单赔率
    getPeilvType() {
      return this.curPlayItem.playid === 2 ? 0 : 1
    },
    clickHandle() {
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
      this.calcZhushu(this.curPlayItem.playid, oneDimValuesArr, twoDimNamesArr)

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

      //PC蛋蛋没有多玩法
      this.setBetData({
        type: 1, //双面玩法,0为官方玩法
        peilv: this.peilv,
        peilvType: peilvType, // 0 为单赔率,1为多赔率
        formatValueStr:
          peilvType == 0 ? twoDimNamesArr.join(' ') : oneDimValuesArr.join(' '),
        arr: twoDimNamesArr,
        arr2: towDimValuesArr,
        formatShowStr: formatShowStr,
        wanfa: this.title, // 玩法
        zhushu: this.zhushu, //注数
        gameid: this.routeList.lotter_id,
        dataSource: this.dataSet,
        js_tag: this.$store.state.betting.js_tag,
        playid: this.curPlayItem.playid,
        dataSet: oneDimArr, // 数据源,已选中的一维数组
        filteredData: twoDimArr //已经选中的项数组 二维数组
      })
    },
    // 选择号码
    clickBall(item) {
      setTimeout(() => {
        this.mutex(item)
      })
      setTimeout(this.clickHandle)
    },
    //号码选择互斥
    mutex(curItem) {
      //包三最多只能选三个
      if (this.curPlayItem.playid === 2) {
        const arr = this.dataSet[0].data.filter(x => x.checked)
        if (arr.length > 3) {
          arr.filter(x => x.name != curItem.name)[0].checked = false
        }
      }
    },
    changeList(val, num) {
      this.actives = num
      this.modelTitle = val.name
      val &&
        val.submenu[0] &&
        val.submenu[0].playlist.length &&
        this.specific(val.submenu[0].playlist[0], '显示', 0, 0)
      this.resetData()
      // 720分辨率的手机适配
      if (document.body.clientWidth * window.devicePixelRatio <= 720) {
        document.querySelector('.betting_con').style.marginBottom =
          this.playersChl.length > 2 ? '4rem' : ''
      }
      this.wanfa = val
    },
    specific(val, txt, p, i) {
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
      this.setBetNumber(0)
      txt != '显示' && (this.show1 = !this.show1)
      this.setBallList(val.playid)
      this.odds.length && this.setEachDataPeilv(val.playid)
    },
    setBallList(playid) {
      if (playid === 3) {
        this.playersChl = this.data_blend
      } else {
        this.playersChl = this.data_Number
      }
      this.setDataSet()
    },
    setDataSet() {
      let columns = this.playersChl
      let _dataSet = []
      columns.forEach((item, index) => {
        let _d = []
        //如果是纯数字，先转化为数字序列
        if (
          item.options.length == 2 &&
          item.options.every(x => !Number.isNaN(x))
        ) {
          let startIndex = item.options[0],
            endIndex = item.options[1]
          item.options = []
          for (let c = startIndex; c <= endIndex; c++) {
            item.options.push(c)
          }
        }
        item.options.forEach((x, i) => {
          _d.push({
            name: x,
            checked: false,
            peilv: '-',
            value: index ? columns[index - 1].options.length + i : i // 从0开始
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
      'clearCart'
    ])
  },
  watch: {
    show1: function(val) {
      val == false && (this.heights = '0px')
    },
    zhushu(val) {
      this.setBetNumber(val)
    },
    '$route.params'(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === 'pcdd' &&
        oldVal &&
        (oldVal.js_tag && oldVal.js_tag === 'pcdd')
      ) {
        this.setBetNumber(0)
        this.clearCart()
        this.setBetData({})
        this.clearBalls()
        this.setOdds()
        if (newVal.isHome) {
          this.getData(this.$route.params.js_tag)
        }
      }
    }
  },
  computed: {
    // 区分显示单行赔率还是多行赔率
    isSinglePeilv() {
      return this.title.includes('包三')
    },
    ...mapState({
      betNumber: state => state.betting.betNumber,
      cart: state => state.betting.cart,
      cartNumber: state => state.betting.cartNumber
    })
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
    .pcdd_drag {
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
      }
      .flag {
        @include center;
        background: url(~img/goucai/xuanzhong.png) no-repeat;
        background-size: contain;
        background-position: center;
        font-size: poTorem(16px);
        color: #e13939;
      }
    }
  }
  .betting_right {
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
        @include around;
        width: 100%;
        flex-wrap: wrap;
        margin-bottom: poTorem(10px);
        li {
          outline: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          @include around;
          width: poTorem(45px);
          background: #fff;
          margin-left: poTorem(10px);
          margin-top: poTorem(10px);
          font-size: poTorem(20px);
          font-weight: 900;
          color: #e33939;
        }
        .choosed {
          background-color: #e33939 !important;
          color: #fff !important;
          border: poTorem(1px) solid #e33939 !important;
        }
      }
      .pcdd {
        justify-content: flex-start;
        li {
          outline: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          margin-bottom: poTorem(16px);
          flex-wrap: wrap;
          margin: 1rem 0.7rem;
          > div {
            position: relative;
            width: poTorem(45px);
            height: poTorem(45px);
            line-height: poTorem(43px);
            text-align: center;
          }
          > div:nth-child(1) {
            border-radius: 50%;
            border: poTorem(1px) solid #dbdbdb;
          }
          > div:nth-child(2) {
            height: 1rem;
            line-height: 2rem;
            user-select: none;
            color: #707070;
            font-size: poTorem(14px);
          }
          label,
          input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            border: none;
          }
        }
        li.choosed {
          background-color: #e33939;
          color: #fff !important;
          border: poTorem(1px) solid #e33939 !important;
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
