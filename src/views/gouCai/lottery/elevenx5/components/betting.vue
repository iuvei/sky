<template>
  <!-- 投注界面 -->
  <div class="betting">
    <div class="betting_left" v-if="switchs=='双面玩法'">
      <ul>
        <li v-for="(item,index) in guanfangList" v-if="switchs=='官方玩法'" :key="index" @click="changeList(item,index)" :class="{flag:index==actives}">
          {{item.name}}
        </li>
        <li v-for="(item,index) in shuangmianList" v-if="switchs=='双面玩法'" :key="index" @click="changeList(item,index)" :class="{flag:index==actives}">
          {{item.name}}
        </li>
      </ul>
      <div @click="clickCart" style="display:flex">
        <div class="syxw_drag">
          <i class="spots" v-show="cartNumber>0">
            {{cartNumber}}
          </i>
        </div>
      </div>
    </div>
    <div class="betting_right" v-if="switchs=='双面玩法'">
      <div class="select" @click="changeGameType(modelTitle)" v-if="![54,29,56,57,46,32].includes(curPlayItem.playid)">
        <span>{{title}}</span>
        <span class="icon"></span>
      </div>
      <span v-if="![56,57].includes(curPlayItem.playid)" :class="[{'by_right':[29,46,32].includes(curPlayItem.playid)},'odds']">(赔率：{{peilv}})</span>
      <div class="betting_con">
        <div class="con_item" v-for="(item,index) in dataSet" :key="index" v-if="!danshiArr.includes(curPlayItem.playid)">
          <span>{{item.name.replace('|2',"").replace("|11","")}}</span>
          <ul :class="{smp:item.name.includes('总和值') ,lhd:[54].includes(curPlayItem.playid)} ">
            <li @click.stop="filter(item, items) " v-for="(items, indexs) in item.data " :key="indexs " style="position:relative" :data-val="items.value ">
              <div class="ball " ref="ballOptions " :class="[{choosed:items.checked}] ">{{items.name}}</div>
              <div class="peilv_num " v-if="peilvs.length ">{{items.peilv}}</div>
              <label for=" "><input type="checkbox " v-model="items.checked "></label>
            </li>
          </ul>
        </div>
        <!-- 单式 -->
        <div class="con_item" v-if="danshiArr.includes(curPlayItem.playid)">
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
    <div class="modle ">
      <yd-popup v-if="show1" v-model="show1 " position="center" width="90% ">
        <div class="modle_title ">
          <span>{{modelTitle}}</span>
          <i class="icon " @click="show1=!show1 "></i>
        </div>
        <div class="time_line_box ">
          <yd-timeline class="time_line_wrap ">
            <yd-timeline-item v-for="(item,index) in player.submenu " :key="index ">
              <span>{{item.name}}</span>
              <ul>
                <li style="width:unset;padding:0 3px " @click="specific(items, '',index,indexs,item) " v-for="(items,indexs) in item.playlist " :key="indexs " :class="{wanfa: indexs==wanfaIndex&&index==parentWanfa} " :title="items.wanfa ">{{items.playname}}</li>
              </ul>
            </yd-timeline-item>
          </yd-timeline>
        </div>
      </yd-popup>
    </div>
  </div>
</template>
<script>
const template_normal = [
  {
    name: '',
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  }
]
const template_smp = [
  {
    name: '总和值',
    options: ['大', '小', '单', '双', '尾大', '尾小'],
    values: [0, 1, 2, 3, 4, 5]
  },
  {
    name: '后二和值',
    options: ['大', '小', '单', '双'],
    values: [6, 7, 8, 9]
  },
  {
    name: '号码一',
    options: ['大', '小', '单', '双'],
    values: [10, 11, 12, 13]
  },
  {
    name: '号码二',
    options: ['大', '小', '单', '双'],
    values: [14, 15, 16, 17]
  },
  {
    name: '号码三',
    options: ['大', '小', '单', '双'],
    values: [18, 19, 20, 21]
  },
  {
    name: '号码四',
    options: ['大', '小', '单', '双'],
    values: [22, 23, 24, 25]
  },
  {
    name: '号码五',
    options: ['大', '小', '单', '双'],
    values: [26, 27, 28, 29]
  }
]
const template_nn = [
  {
    name: '',
    options: [
      '牛一',
      '牛二',
      '牛三',
      '牛四',
      '牛五',
      '牛六',
      '牛七',
      '牛八',
      '牛九',
      '牛牛',
      '无牛',
      '有牛',
      '牛大',
      '牛小',
      '牛单',
      '牛双'
    ]
  }
]
const template_lhd = [
  {
    name: '一位、二位',
    options: ['龙', '虎']
  },
  {
    name: '一位、三位',
    options: ['龙', '虎']
  },
  {
    name: '一位、四位',
    options: ['龙', '虎']
  },
  {
    name: '一位、五位',
    options: ['龙', '虎']
  },
  {
    name: '二位、三位',
    options: ['龙', '虎']
  },
  {
    name: '二位、四位',
    options: ['龙', '虎']
  },
  {
    name: '二位、五位',
    options: ['龙', '虎']
  },
  {
    name: '三位、四位',
    options: ['龙', '虎']
  },
  {
    name: '三位、五位',
    options: ['龙', '虎']
  },
  {
    name: '四位、五位',
    options: ['龙', '虎']
  }
]

import { mapActions, mapState } from 'vuex'
import { Calc_Zhushu_Obj } from '~/js/touzhu/touzhu.11x5.calc'
import { RenderTypes } from '~/js/touzhu/commonTypes'
import api from '../../../../../../api/betting'
import {
  getCalcFuncByPlayID,
  getCalcDataByPlayID,
  getRenderTypeByPlayID
} from '~/js/touzhu/touzhu.11x5.util'
import oddMixin from '../../oddMixin'
import danshiUtil from '~/js/touzhu/danshi.util'
import randomUtil from '~/js/touzhu/touzhu.random.danshi'
const zhushuFunc = new Calc_Zhushu_Obj()
import betArea from '../../../components/betArea'
export default {
  name: 'eleventxfive_betting',
  props: ['routeList'],
  components: {
    betArea
  },
  data() {
    return {
      playList: Array,
      guanfangList: [],
      shuangmianList: [],
      danshiArr: [
        2,
        4,
        7,
        9,
        12,
        14,
        17,
        19,
        22,
        24,
        38,
        39,
        40,
        41,
        42,
        43,
        44
      ],
      title: '直选复式',
      modelTitle: '',
      show1: false,
      heights: '',
      player: {},
      playersChl: [],
      actives: 0,
      switchs: this.$route.params.play_type ? '双面玩法' : '官方玩法', //'官方玩法',
      peilv: '',
      peilvs: [],
      parentWanfa: 0,
      wanfaIndex: 0,
      curPlayItem: {},
      wanfa: {},
      dataSet: [],
      zhushu: 0,
      odds: [],
      danshiExcl: '',
      myPlaceholder: ''
    }
  },
  activated() {
    if (this.$route.params.isHome) {
      this.getData(this.$route.params.js_tag)
    }

    this.clearBalls()
    this.zhushu = 0
    this.setOdds()
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
        case 7:
        case 12:
          this.zhushu = zhushuFunc.calc_3m_q3zhxds(danshiExcl.split(','))
          break
        case 4:
        case 9:
        case 14:
          this.zhushu = zhushuFunc.calc_3m_q3zuxds(danshiExcl.split(','))
          break
        case 17:
        case 22:
          this.zhushu = zhushuFunc.calc_2m_q2zhxds(danshiExcl.split(','))
          break
        case 19:
        case 24:
          this.zhushu = zhushuFunc.calc_2m_q2zuxds(danshiExcl.split(','))
          break
        case 38:
          this.zhushu = zhushuFunc.calc_rxds_rx1z1(danshiExcl.split(','))
          break
        case 39:
          this.zhushu = zhushuFunc.calc_rxds_rx2z2(danshiExcl.split(','))
          break
        case 40:
          this.zhushu = zhushuFunc.calc_rxds_rx3z3(danshiExcl.split(','))
          break
        case 41:
          this.zhushu = zhushuFunc.calc_rxds_rx4z4(danshiExcl.split(','))
          break
        case 42:
          this.zhushu = zhushuFunc.calc_rxds_rx5z5(danshiExcl.split(','))
          break
        case 43:
          this.zhushu = zhushuFunc.calc_rxds_rx6z5(danshiExcl.split(','))
          break
        case 44:
          this.zhushu = zhushuFunc.calc_rxds_rx7z5(danshiExcl.split(','))
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
        this.dataSet.forEach(item => {
          item.data.forEach(x => (x.checked = false))
        })
      }
      this.zhushu = 0
      this.setBetNumber(0)
    },
    //号码选择互斥
    mutex(name, curItem) {
      if (name.indexOf('胆码') != -1 || name.indexOf('拖码') != -1) {
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
          if (curItem.playid == 51 && arr1.length > 7)
            arr1.filter(x => x.name != curItem.name)[0].checked = false
          else if (curItem.playid == 50 && arr1.length > 6)
            arr1.filter(x => x.name != curItem.name)[0].checked = false
          else if (curItem.playid == 49 && arr1.length > 5)
            arr1.filter(x => x.name != curItem.name)[0].checked = false
          else if (curItem.playid == 48 && arr1.length > 4)
            arr1.filter(x => x.name != curItem.name)[0].checked = false
          else if (curItem.playid == 47 && arr1.length > 3)
            arr1.filter(x => x.name != curItem.name)[0].checked = false
          else if (curItem.playid == 46 && arr1.length > 2)
            arr1.filter(x => x.name != curItem.name)[0].checked = false
          else if (curItem.playid == 45 && arr1.length > 1)
            arr1.filter(x => x.name != curItem.name)[0].checked = false
        }
        // 如果是第二行点击，则第一行球消失
        if (name == this.dataSet[1].name) {
          arr2.forEach(item => {
            var index = arr1.findIndex(x => x.name === item.name)
            if (index >= 0) arr1[index].checked = !arr1[index].checked
          })
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
    calcZhushu(playid, oneDimValuesArr, towDimValuesArr) {
      let func = getCalcFuncByPlayID(playid)
      if ([3, 8, 13, 18, 23].includes(playid)) {
        //playName.includes("组选复式")) {
        this.zhushu = zhushuFunc[func](oneDimValuesArr)
      } else if ([1, 6, 11, 16, 21].includes(playid)) {
        //(playName.includes("直选复式")) {
        this.zhushu = zhushuFunc[func](towDimValuesArr)
      } else if (
        [5, 10, 15, 20, 25, 45, 46, 47, 48, 49, 50, 51].includes(playid)
      ) {
        //(playName.includes("胆拖")) {
        this.zhushu = zhushuFunc[func](towDimValuesArr)
      } else if ([26, 27, 28].includes(playid)) {
        //(playName.includes("不定位")) {
        this.zhushu = zhushuFunc[func](oneDimValuesArr)
      } else if ([29].includes(playid)) {
        //(playName.includes("定位胆") || playName.includes("双面盘")) {
        towDimValuesArr = this.getDwdArr(towDimValuesArr).filter(x => x.length)
        this.zhushu = zhushuFunc[func](towDimValuesArr)
      } else {
        this.zhushu = zhushuFunc[func](oneDimValuesArr)
      }
    },
    clickHandle() {
      // 单行多赔率
      let oneDimArr = [],
        twoDimArr = [],
        oneDimValuesArr = [],
        twoDimNamesArr = [],
        towDimValuesArr = [],
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

      if (
        !danshiUtil.isSingleMode(this.routeList.js_tag, this.curPlayItem.playid)
      ) {
        this.calcZhushu(
          this.curPlayItem.playid,
          oneDimValuesArr,
          towDimValuesArr
        )
      }

      if (peilvType === RenderTypes.MUTI_ROW_SINGLE_PEILV) {
        twoDimNamesArr.forEach((x, i) => {
          if (x.length) {
            formatShowStr += `${
              this.dataSet[i].name
            }(<span style="color:red">${x}</span>) `
          }
        })
        formatShowStr = formatShowStr.trim()
      }
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
        // 定位胆专用取值
        dwdValuesArr:
          peilvType === RenderTypes.DWD ? this.getDwdArr(towDimValuesArr) : [],
        gameid: this.routeList.lotter_id,
        playid: this.curPlayItem.playid,
        dataSource: this.dataSet,
        js_tag: this.$store.state.betting.js_tag,
        danshiExcl: this.danshiExcl,
        dataSet: oneDimArr, // 数据源,已选中的一维数组
        filteredData: twoDimArr //已经选中的项数组 二维数组
      })
    },
    resetData() {
      if (this.dataSet && this.dataSet.length) {
        this.dataSet.forEach(x => x.data.forEach(y => (y.checked = false)))
      }
    },
    async getData(tag) {
      console.log(tag)
      let config = await api.getGamePlayConfig(tag)
      console.log(config)
      if (config && config != 0) {
        this.playList = config
        this.setPlayConfig(config)
        this.guanfangList = config.filter(x => x.showofficial === 0)
        this.shuangmianList = config.filter(x => x.showofficial === 1)

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
    // 选择号码
    filter(item, val2) {
      if (item && val2 && !item.hasOwnProperty('actions')) {
        val2.checked = !val2.checked
        this.mutex(item.name, val2)
      }

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
      // getConfigByGameid(this, this.routeList.lotter_id, val.playid);
      switch (val.playid) {
        case 2:
        case 4:
        case 7:
        case 9:
        case 12:
        case 14:
        case 40:
          this.myPlaceholder = '1 2 3'
          break
        case 17:
        case 19:
        case 22:
        case 24:
        case 39:
          this.myPlaceholder = '1 2'
          break
        case 38:
          this.myPlaceholder = '1'
          break
        case 41:
          this.myPlaceholder = '1 2 3 4'
          break
        case 42:
          this.myPlaceholder = '1 2 3 4 5'
          break
        case 43:
          this.myPlaceholder = '1 2 3 4 5 6'
          break
        case 44:
          this.myPlaceholder = '1 2 3 4 5 6 7'
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
      txt != '显示' && (this.show1 = !this.show1)
      this.setBallList(val)
      this.setBetNumber(0)
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
    setBallList(val) {
      let _arr = [],
        playid = val.playid
      if (playid === 54) {
        _arr = template_lhd
      } else if (playid === 56) {
        _arr = template_smp
      } else if (playid === 57) {
        _arr = template_nn
      } else {
        _arr = this.playersChl.map(x => {
          return {
            name: x,
            options: template_normal[0].options,
            values: template_normal[0].values
          }
        })
      }
      this.playersChl = _arr
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
    show1: function(val) {
      val == false && (this.heights = '0px')
    },
    switch: function(val) {
      this.switchs = val
      if (this.isFromBetHistory) return
      if (this.shuangmianList.length || this.guanfangList.length) {
        if (this.switchs == '双面玩法') {
          this.changeList(this.shuangmianList[0], 0)
        } else {
          this.changeList(this.guanfangList[0], 0)
        }
      }
    },
    zhushu(val) {
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
    async '$route.params'(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === '11x5' &&
        oldVal &&
        (oldVal.js_tag && oldVal.js_tag === '11x5')
      ) {
        const _playItem = this.curPlayItem
        this.setOdds()
        this.setBetNumber(0)
        this.clearBalls()
        this.clearCart()
        this.setBetData({})
        if (newVal.isHome) {
          this.getData(this.$route.params.js_tag)
          this.findItemByWanfa(_playItem.wanfa)
        }
      }
    }
  },
  computed: {
    ...mapState({
      switch: state => state.betting.switch,
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
  align-items: stretch;
  flex: 1;
  margin-top: poTorem(30px);
  .betting_left {
    width: 25%;
    background: #f2f3f4;
    @include column;
    .syxw_drag {
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
        width: 100%;
        @include around;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin-bottom: poTorem(10px);
        &.lhd {
          justify-content: space-around;
        }
        li {
          outline: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          @include center;
          margin-right: 0.7rem;
          width: poTorem(45px);
          flex-wrap: wrap;
          background: #fff;
          margin-left: poTorem(10px);
          margin-top: poTorem(10px);
          font-size: poTorem(20px);
          font-weight: 900;
          color: #e33939;
          .ball {
            border: poTorem(1px) solid #dbdbdb;
            line-height: poTorem(43px);
            text-align: center;
            font-size: 1.125rem;
            color: #e33939;
            height: poTorem(45px);
            width: poTorem(45px);
            border-radius: 50%;
            transition: background-color 0.2s ease;
          }
          > label {
            width: 100%;
            height: 100%;
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            user-select: none;
            input {
              opacity: 0;
              width: 0;
              height: 0;
              border: none;
            }
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
          font-size: poTorem(18px);
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
          width: poTorem(100px);
          height: poTorem(32px);
        }
        > .choosed {
          background-color: #e33939;
          color: #fff;
          border: none;
        }
        .peilv_num {
          padding-top: 0.5rem;
          font-size: poTorem(14px);
          color: #535353;
        }
        .choosed {
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
