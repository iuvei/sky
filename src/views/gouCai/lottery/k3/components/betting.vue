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
        <div class="k3_drag">
          <i class="spots" v-show="cartNumber>0">
            {{cartNumber}}
          </i>
        </div>
      </div>
    </div>
    <div class="betting_right">
      <span :class="[{'by_right':[5,7,10].includes(curPlayItem.playid)},'odds']" v-show="peilvIsShow">(赔率：{{peilv.length > 0 ? peilv:'-'}})</span>
      <div class="betting_con">
        <div class="con_item" v-for="(item,index) in dataSet" :key="index">
          <span>{{item.name}}</span>
          <ul :class="{sbth:[5,10].includes(curPlayItem.playid)}">
            <li @click.stop="filter(item, items)" v-for="(items, indexs) in item.data" :key="indexs" style="position:relative" :data-val="items.value">
              <div ref="ballOptions" :class="[{small_box:typeNum==0},{big_box: typeNum==1},{max_box: items.name=='三同号通选'}, {choosed:items.checked}]">{{items.name}}</div>
              <div class="peilv_num" v-if="peilvs.length">{{items.peilv}}</div>
              <label for=""><input type="checkbox" v-model="items.checked"></label>
            </li>
          </ul>
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
                <li @click="specific(items,'',index,indexs,item.name)" v-for="(items,indexs) in item.playlist" :key="indexs" :class="{wanfa: indexs==wanfaIndex&&index==parentWanfa}">{{items.playname}}</li>
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
import axios from 'axios'
import {
  Calc_Zhushu_Obj,
  getCalcFuncByPlayID,
  getRenderTypeByPlayID
} from '~/js/touzhu/touzhu.k3.calc'
import { RenderTypes } from '~/js/touzhu/commonTypes'
import api from '../../../../../../api/betting'
import oddMixin from '../../oddMixin'
let zhushuFunc = new Calc_Zhushu_Obj()
export default {
  name: 'k3_betting',
  props: ['routeList'],
  data() {
    return {
      dataSet: [],
      curPlayItem: {},
      playList: Array,
      optionsList: [],
      title: '直选复式',
      modelTitle: '',
      show1: false,
      heights: '',
      peilv: [],
      // hunhe: ["半顺", "红号", "大红", "小红"],
      player: {},
      playersChl: {},
      ballsList: [],
      peilvs: [],
      bettingArr: [], // 传给公共方法的数组，可作为特殊玩法共用数组
      buyBall: [], // 拼接管道符之后的所有球号数组
      danma: [], //  胆码
      tuoma: [], //  拖码
      secondWanfa: '',
      actives: 0,
      parentWanfa: 0,
      wanfaIndex: 0,
      zhushu: 0,
      typeNum: 0, // 0:纯数字选球 1:小方块 2:中方块 3:大方块
      allPeilv: [],
      specialPeilv: [],
      santong: false,
      odds: []
    }
  },
  activated() {
    if (this.$route.params.isHome) {
      this.getData(this.$route.params.js_tag)
    }
    this.clearBalls()
    this.zhushu = 0
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
    clearBalls() {
      this.zhushu = 0
      // this.setBetNumber(0)
      this.bettingArr = []
      if (this.dataSet && this.dataSet.length) {
        this.dataSet.forEach(item => {
          item.data.forEach(x => (x.checked = false))
        })
      }
    },
    clickCart() {
      if (this.cart.length) {
        this.$router.push('/shopCart')
      } else {
        this.$dialog.toast({ mes: '您的购物车空空如也' })
      }
    },
    async getData(tag) {
      let configs = await api.getGamePlayConfig(tag)
      if (configs && configs != 0) {
        this.playList = configs
        this.player = configs
        if (this.isFromBetHistory) this.findItemByWanfa(this.historeyWanfa)
        else this.changeList(configs[0], 0)
      }
    },
    //号码选择互斥
    mutex(name, curItem) {
      if ([5, 10].includes(curItem.playid)) {
        //互斥的号码一般为胆拖，两行
        let arr1 = this.dataSet[0].data.filter(x => x.checked),
          arr2 = this.dataSet[1].data.filter(x => x.checked)

        // 如果是第一行点击，则第二行球消失
        if (name == this.dataSet[0].name) {
          arr1.forEach(item => {
            var index = arr2.findIndex(x => x.name === item.name)
            if (index >= 0) arr2[index].checked = !arr2[index].checked
          })
          //胆码最多只能选择三个或者两个
          if (curItem.playid == 5 && arr1.length > 2)
            arr1.filter(x => x.name != curItem.name)[0].checked = false

          if (curItem.playid == 10 && arr1.length > 1)
            arr1.filter(x => x.name != curItem.name)[0].checked = false
        }
        // 如果是第二行点击，则第一行球消失
        if (name == this.dataSet[1].name) {
          arr2.forEach(item => {
            var index = arr1.findIndex(x => x.name === item.name)
            if (index >= 0) arr1[index].checked = !arr1[index].checked
          })
          //拖胆最多只能选择5个
          if (arr2.length > 5) {
            if (curItem.checked) {
              if (curItem.name == 1) arr2[1].checked = false
              else arr2[0].checked = false
            }
          }
        }
      }
    },
    // 计算注数
    calcZhushu(playid, oneDimValuesArr, twoDimNamesArr) {
      let func = getCalcFuncByPlayID(playid)
      if (
        [1, 15, 7, 14].includes(playid)
        //"和值" "三同号" "二同号" "两面玩法"
      ) {
        this.zhushu = zhushuFunc[func](oneDimValuesArr)
      } else {
        this.zhushu = zhushuFunc[func](twoDimNamesArr)
      }
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

      //快三统一是双面玩法
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
        playid: this.curPlayItem.playid,
        dataSet: oneDimArr, // 数据源,已选中的一维数组
        dataSource: this.dataSet,
        js_tag: this.$store.state.betting.js_tag,
        filteredData: twoDimArr //已经选中的项数组 二维数组
      })
    },
    // 选择号码
    filter(item, val2) {
      val2.checked = !val2.checked
      this.mutex(item.name, val2)
      setTimeout(this.clickHandle)
    },
    changeList(val, num) {
      // 添加类名
      this.curPlayItem = val
      // this.title = val.playname
      this.actives = num
      this.modelTitle = val.name
      this.specific(
        val.submenu[0].playlist[0],
        '显示',
        0,
        0,
        val.submenu[0].name
      )
      this.setBetData({})
    },
    specific(val, txt, p, i) {
      this.curPlayItem = val
      // 初始化选球数组
      this.bettingArr = []
      this.setBetNumber(0)
      this.santong = false
      this.title = val.wanfa //设置玩法的第二层名称，由此判断选球方式
      this.parentWanfa = p
      this.wanfaIndex = i
      this.description(
        `<b>范例</b>：${val.play_fanli}<br><br><b>玩法说明</b>：${
          val.play_shuoming
        }`
      )
      this.setBallList(val.playid)
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
    // 初始化数据源
    setDataSet() {
      let columns = this.playersChl
      let _dataSet = []
      columns.forEach((item, index) => {
        let _d = []
        item.option.forEach((x, i) => {
          _d.push({
            name: x,
            checked: false,
            peilv: '-',
            playid: this.curPlayItem.playid,
            value:
              item.values && item.values.length
                ? item.values[i]
                : index * item.option.length + i //从0开始
          })
        })
        _dataSet.push({
          name: item.name,
          data: _d
        })
      })
      this.dataSet = _dataSet
    },
    setBallList(playid) {
      switch (playid) {
        case 1: //和值
          this.typeNum = 0
          this.playersChl = [
            {
              name: '',
              option: [
                '大',
                '小',
                '单',
                '双',
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18
              ]
            }
          ]
          break
        case 7:
          this.typeNum = 1
          this.playersChl = [
            {
              name: '复选',
              option: ['1 1', '2 2', '3 3', '4 4', '5 5', '6 6'],
              values: [1, 2, 3, 4, 5, 6]
            }
          ]

          break
        case 5: //胆拖
        case 10:
          this.typeNum = 0
          this.playersChl = [
            {
              name: '胆码',
              option: [1, 2, 3, 4, 5, 6],
              values: [1, 2, 3, 4, 5, 6]
            },
            {
              name: '拖码',
              option: [1, 2, 3, 4, 5, 6],
              values: [1, 2, 3, 4, 5, 6]
            }
          ]
          break
        case 15: //	三同号
          this.typeNum = 1
          this.playersChl = [
            {
              name: '通选',
              option: ['三同号通选']
            },
            {
              name: '单选',
              option: ['1 1 1', '2 2 2', '3 3 3', '4 4 4', '5 5 5', '6 6 6'],
              values: [1, 2, 3, 4, 5, 6]
            }
          ]
          break
        case 14: //双面盘
          this.typeNum = 0
          this.playersChl = [
            {
              name: '号码一',
              option: ['大', '小', '单', '双']
            },
            {
              name: '号码二',
              option: ['大', '小', '单', '双']
            },
            {
              name: '号码三',
              option: ['大', '小', '单', '双']
            },
            {
              name: '混合',
              option: ['半顺', '红号', '大红', '小红']
            }
          ]
          break
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
      'clearCart',
      'setBetData'
    ])
  },
  watch: {
    zhushu(val) {
      this.setBetNumber(val)
    },
    '$route.params'(newVal, oldVal) {
      const flag =
        newVal &&
        newVal.js_tag === 'k3' &&
        oldVal &&
        (oldVal.js_tag && oldVal.js_tag === 'k3')
      if (flag) {
        this.clearBalls()
        this.setOdds()
        this.setBetNumber(0)
        this.clearCart()
        this.setBetData({})
        if (newVal.isHome) {
          this.getData(this.$route.params.js_tag)
        }
      }
    }
  },
  computed: {
    ...mapState({
      odds: state => state.betting.odds,
      cart: state => state.betting.cart,
      cartNumber: state => state.betting.cartNumber
    }),
    peilvIsShow() {
      return [5, 7, 10].includes(this.curPlayItem.playid)
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
    .k3_drag {
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
        flex-wrap: wrap;
        padding: poTorem(20px) 0;
        &.sbth {
          justify-content: flex-start;
          padding: poTorem(20px) 0 0 1rem;
        }
        li {
          outline: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          @include column;
          padding: poTorem(5px);
          color: #707070;
          > label {
            width: 100%;
            height: 100%;
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            input {
              opacity: 0;
              width: 0;
              height: 0;
              border: none;
            }
          }
          .big_box,
          .small_box,
          .max_box {
            width: poTorem(72px);
            height: poTorem(32px);
            border: poTorem(1px) solid #dbdbdb;
            border-radius: poTorem(5px);
            line-height: poTorem(30px);
            text-align: center;
            font-size: poTorem(20px);
            font-weight: 900;
            color: #e33939;
            transition: background-color 0.2s ease;
          }
          div {
            text-align: center;
          }
          .small_box {
            width: poTorem(53px);
            height: poTorem(32px);
          }
          .max_box {
            width: poTorem(120px);
            height: poTorem(36px);
            line-height: poTorem(36px);
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
