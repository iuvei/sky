<template>
  <div class="bullfight_body">
    <div class="cont">
      <!-- 赛车 -->
      <div class="racing" :class="isbg?'beg':''" v-show="!isOver">
        <img class="start" src="../../../../../img/game/car/start.png" alt="" :style="{transform:'translateX(' + bgPositionX + 'rem)'}">
        <img class="end" src="../../../../../img/game/car/end.png" alt="" :style="{transform:'translateX(' + endPositionX + 'rem)'}">
        <ul class="carbox">
          <li class="car" :id="key+1" :class="item.speed?'speed c'+(key-0+1):'c'+(key-0+1)" v-for="(item,key) in carArr" :key="key" :style="{top:(3.3+key*0.52)+'rem',right:item.Eright+'rem'}">
            <span class="l_tyre" :class="isStart?'tyre':''"></span>
            <span class="r_tyre" :class="isStart?'tyre':''"></span>
          </li>
        </ul>
        <div class="count" v-show="!isStart">{{count}}</div>
        <div class="light">
          <img src="../../../../../img/game/car/red_light.png" v-if="!isStart">
          <img src="../../../../../img/game/car/green_light.png" v-else>
        </div>
      </div>
      <div class="champion" :class="isOver?'show':''">
        <div class="num1"></div>
        <div class="num2"></div>
        <div class="num3"></div>
        <div class="sort">
          <div :class="isOver?'scale'+(key+1)+ ' sort'+item+' st'+(key+1):'sort'+item+' st'+(key+1)" v-for="(item,key) in sortData" :key="key"></div>
        </div>
        <div class="colour" :class="isOver?'land':''"></div>
        <div class="lamp">
          <div class="lamp_1"></div>
          <div class="lamp_2"></div>
          <div class="lamp_3"></div>
          <div class="lamp_4"></div>
        </div>
      </div>
      <div class="heads_top">
        <div class="tit">
          <div class="qishu">第
            <span> {{nextQishu && ((nextQishu * 1 - 1) +'').padStart(4,'0') || ''}} </span>期</div>
          <ul class="niu">
            <li>{{ niuniu(data,0) }}</li>
            <li>{{ niuniu(data,1) }}</li>
            <li>{{ niuniu(data,2) }}</li>
            <li>{{ niuniu(data,3) }}</li>
            <li>{{ niuniu(data,4) }}</li>
            <li>{{ niuniu(data,5) }}</li>
          </ul>
        </div>
        <div class="balls">
          <ul>
            <li v-for="(i,key) in data" :key="key" :style="{'backgroundColor': getColor(i*1)}">{{i*1}}</li>
          </ul>
          <div @click="openHistory">
            <span>历史开奖</span>
            <span class="icon" :class="{'slidedown': isOpen}"></span>
          </div>
        </div>
      </div>
      <!-- 历史开奖 -->
      <div class="heads_bottom">
        <yd-accordion>
          <yd-accordion-item ref="accor" :auto="false">
            <div class="history">
              <ul>
                <li class="title">
                  <span>期号</span>
                  <span>开奖号码</span>
                  <span>庄</span>
                  <span>闲一</span>
                  <span>闲二</span>
                  <span>闲三</span>
                  <span>闲四</span>
                  <span>闲五</span>
                </li>
                <li v-for="(item,key) in kjBalls" :key="key">
                  <span>{{item.qishu.toString().slice(-4)}}</span>
                  <span class="kaijiang">{{item.balls.length ==10 ? item.balls.join(',') : '正在开奖'}}</span>
                  <span>{{item.balls.length ? niuniu(item.balls,0) : '-'}}</span>
                  <span>{{item.balls.length ? niuniu(item.balls,1) : '-'}}</span>
                  <span>{{item.balls.length ? niuniu(item.balls,2) : '-'}}</span>
                  <span>{{item.balls.length ? niuniu(item.balls,3) : '-'}}</span>
                  <span>{{item.balls.length ? niuniu(item.balls,4) : '-'}}</span>
                  <span>{{item.balls.length ? niuniu(item.balls,5) : '-'}}</span>
                </li>
              </ul>
            </div>
          </yd-accordion-item>
        </yd-accordion>
        <!-- 倒计时完成后 -->
        <div class="times">
          <div class="jiezhi">
            第
            <i>{{nextQishu}}</i>期{{closeIsShow?'截止时间':'已封盘'}}:
          </div>
          <div class="haoma">
            <app-count-down ref="openless" v-model="openless_leftTime" :time="openless" timetype="second" done-text="正在开奖" format="{%h}:{%m}:{%s}" :callback="_openCallback"></app-count-down>
          </div>
          <div class="haoma" v-html="renderStr" @click="userBalanceClick"></div>
        </div>
      </div>
      <canvas id="canvas" :width="canvasWidth" :height="canvasHeight" style="margin-top:1.875rem" @click="sele()"></canvas>
      <div class="niuniu" :style="'height:'+canvasHeight*0.67+'px'">
        <div class="box" :class="items.class" v-for="(items,key) in resultList" :key="key" @click="canvas(key)" :style="'height:'+(canvasHeight*items.h)+'px'">
          <p>{{items.title}}</p>
          <div class="poker">
            <div class="item" :class="isOver?'sy':''" v-for="(item,key) in items.data" :key="key">
              <!-- <span :class="'poker'+item+'-'+ (key==4?'4':key+1)"></span> -->
              <span :class="'poker'+item+'-'+items.color[key]"></span>
              <img src="../../../../../img/game/brand.png" alt="">
            </div>
            <span class="niu" :class="'niu'+items.niu+'_'+items.result" v-show="isOver"></span>
            <span class="res" :class="isOver?'show res_'+items.result:'res_'+items.result" v-if="!key==0"></span>
          </div>
        </div>
      </div>
    </div>
    <!-- 下注 -->
    <game-bets :betNum="betNum" @resetBetnum="resets"></game-bets>
  </div>
</template>
<script>
import { resetRouteParams } from '~/js/util'
import gameBets from '../../gameBets'
import { pk10bjys } from '~/js/pk10color'
import { setInterval, setTimeout } from 'timers'
import {
  POINT_CONVERSION_COMPRESSED,
  SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG
} from 'constants'
import countDownMixin from '../../countDownMixin'
import oddMixin from '../../oddMixin'
import { mapActions, mapState } from 'vuex'
import api from "~/../api/betting";
let countDown
let anima
let sortss
let timer
export default {
  data() {
    return {
      gameName: 'PK10牛牛',
      isOpen: false,
      routeLists: {},
      nexts: Object,
      balls: [],
      kjBalls: [],
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      resultList: [
        {
          title: '庄',
          class: 'zhuang',
          data: [1, 2, 3, 4, 5],
          niu: '0',
          result: 'w',
          h: 0.67,
          color:[1,2,3,4,2]
        },
        {
          title: '闲一',
          class: 'xian1',
          data: [2, 3, 4, 5, 6],
          niu: '0',
          result: 't',
          h: 0.37,
          color:[1,2,3,4,2]
        },
        {
          title: '闲二',
          class: 'xian2',
          data: [3, 4, 5, 6, 7],
          niu: '0',
          result: 't',
          h: 0.3,
          color:[1,2,3,4,2]
        },
        {
          title: '闲三',
          class: 'xian3',
          data: [4, 5, 6, 7, 8],
          niu: '0',
          result: 't',
          h: 0.25,
          color:[1,2,3,4,2]
        },
        {
          title: '闲四',
          class: 'xian4',
          data: [5, 6, 7, 8, 9],
          niu: '0',
          result: 't',
          h: 0.3,
          color:[1,2,3,4,2]
        },
        {
          title: '闲五',
          class: 'xian5',
          data: [6, 7, 8, 9, 10],
          niu: '0',
          result: 't',
          h: 0.37,
          color:[1,2,3,4,2]
        }
      ],
      carArr: [],
      isStart: false,
      bgPositionX: 0,
      endPositionX: -25,
      count: 0,
      isOver: false,
      sortData: [1, 2, 3],
      time: 0,
      n: 0,
      canvasWidth: 0,
      canvasHeight: 0,
      arr: [],
      isbg: false,
      kjCpLog: [],
      cplogList: [],
      timer: Function,
      qishu: 0,
      closeIsShow: false,
      niu: [
        '无牛',
        '牛一',
        '牛二',
        '牛三',
        '牛四',
        '牛五',
        '牛六',
        '牛七',
        '牛八',
        '牛九',
        '牛牛'
      ],
      betNum: []
    }
  },
  components: {
    gameBets
  },
  created() {
    this.routeLists = this.routes
  },
  mixins: [countDownMixin, oddMixin],
  activated() {
    this.getData();
    this.setOdds()
    this.routeLists = this.$route.params
    resetRouteParams(this, 'pkniuniu')
    let name_tag =
      this.$route.params.name_tag || this.$store.state.betting.name_tag
    name_tag && this.getOpened(name_tag) && this.getHistory(name_tag)
    clearInterval(this.resTimer)
    this.randomBallTimer = setInterval(() => {
      this.ballFromBet()
    }, 500)
    this.cars()
    this.resize()
    window.addEventListener('resize', this.resize)

    this.clearBalls()
    this.zhushu = 0
    this.setOdds()
    this.danshiExcl = ''
    window.clearInterval(sortss)
    window.clearInterval(anima)
    window.clearInterval(countDown)
  },
  deactivated() {
    clearInterval(this.$refs.openless.timer)
    clearInterval(this.resTimer)
    clearInterval(this.randomBallTimer)
    window.clearInterval(countDown)
    window.clearInterval(anima)
    window.clearInterval(sortss)
    this.isbg = false
    this.sortData = []
    this.time = 0
    this.bgPositionX = 0
    this.endPositionX = -25
    this.isOver = false
    this.isStart = false
    if (this.dataSet && this.dataSet.length) {
      this.dataSet.forEach(item => {
        item.data.forEach(x => (x.checked = false))
      })
    }
    this.betNum = []
    this.cars()
    this.resize()
  },
  watch: {
    '$route.params'(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === 'pkniuniu' &&
        (oldVal && oldVal.js_tag == newVal.js_tag)
      ) {
        // clearInterval(this.$refs.stopless.timer);
        clearInterval(this.$refs.openless.timer)
        clearInterval(this.resTimer)

        this.routeLists = newVal
        this.setBetCurent(newVal)
        resetRouteParams(this, 'pkniuniu')
        this.getOpened(newVal.name_tag)
        this.getHistory(newVal.name_tag)
        this.setBetData({})
        this.clearCart()
      }
    },
    balls() {
      for (let i = 0; i < this.balls.length; i++) {
        this.balls[i] = this.balls[i] * 1
      }
    },
    kjBalls() {
      let _this = this
      for (let i = 0; i < _this.kjBalls.length; i++) {
        for (let n = 0; n < _this.kjBalls[i].balls.length; n++) {
          _this.kjBalls[i].balls[n] = _this.kjBalls[i].balls[n] * 1
        }
      }
    },
    isOver() {
      if (!this.isOver) {
        this.reset()
      } else {
        window.setTimeout(() => {
          this.isOver = false
        }, 4000)
      }
    }
  },
  methods: {
    ...mapActions([
      'setBetCurent',
      'setQishu',
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
    ]),
    resets() {
      this.betNum = []
      this.resize()
    },
    async getData(tag = this.js_tag || 'pkniuniu') {
      let config = (await api.getGamePlayConfig(tag)) || [];
      config = (config[0] && config[0].submenu) || [];
      config = (config[0] && config[0].playlist) || [];
      config = (config[0] && config[0]) || {};
      // console.error(config);
      this.playid = config.playid;
      this.description(
        `<b>范例</b>：${config.play_fanli}<br><br><b>玩法说明</b>：${
          config.play_shuoming
        }`
      );
    },
    // 开始倒计时
    countDown() {
      let _this = this
      window.clearInterval(sortss)
      window.clearInterval(anima)
      window.clearInterval(countDown)
      countDown = window.setInterval(function() {
        if (_this.count < 0) {
          _this.isStart = true
        }
        _this.count--
      }, 1000)
    },
    star() {
      this.isStart = true
      this.isbg = true
      this.bgPositionX = 10
      this.cars()
      this.begin()
      this.init()
      this.addEventListener()
    },
    // 定义汽车
    cars() {
      this.carArr = []
      for (let i = 0; i < 10; i++) {
        let car = {}
        car.id = i //汽车号
        car.Sright = i * 0.28 //初始位置
        car.Eright = i * 0.28 //初始位置
        car.speed = false //加速
        this.carArr.push(car)
      }
    },
    // 重置
    reset() {
      this.isOver = false
      this.cars()
    },
    init() {
      anima = window.setInterval(this.begin, 5000)
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
    // 开始
    begin() {
      // this.bgPositionX+=100
      for (let i = 0; i < 10; i++) {
        this.carArr[i].Sright = this.carArr[i].Eright
        this.carArr[i].Eright = Math.random() * 12 + 4
        if (this.carArr[i].Sright + 1 + 1 > this.carArr[i].Eright) {
          this.carArr[i].speed = false
        } else {
          this.carArr[i].speed = true
        }
      }
    },
    // 结束倒计时
    downTime() {
      window.clearInterval(anima)
      let beg = document.querySelector('.racing')
      let arr = []
      for (let i = 0; i < 10; i++) {
        arr.push(Math.random() * 12 + 4)
      }
      arr.sort(function(a, b) {
        return b - a
      })
      // console.log(arr)
      // console.log(this.carArr)
      // console.log(this.balls)
      for (let i = 0; i < 10; i++) {
        this.carArr[this.balls[i] * 1 - 1].Sright = this.carArr[
          this.balls[i] * 1 - 1
        ].Eright
        this.carArr[this.balls[i] * 1 - 1].Eright = arr[i]
        if (
          this.carArr[this.balls[i] * 1 - 1].Sright + 1 + 1 >
          this.carArr[this.balls[i] * 1 - 1].Eright
        ) {
          this.carArr[this.balls[i] * 1 - 1].speed = false
        } else {
          this.carArr[this.balls[i] * 1 - 1].speed = true
        }
      }
      window.setTimeout(() => {
        // setTimeout(() => {
        //   this.isbg = false;
        // }, 200);
        this.isbg = false
        this.endPositionX += 10
        if (beg) {
          beg.style.backgroundPositionX += '5rem'
        }
        for (let i = 0; i < 10; i++) {
          this.carArr[i].Eright = this.carArr[i].Eright + 30
          this.carArr[i].speed = true
        }
        window.setTimeout(() => {
          window.clearInterval(anima)
          // window.clearInterval(timer);
          this.data = this.balls
          this.sortData = []
          for (let i = 0; i < 3; i++) {
            this.sortData.push(this.data[i])
          }
          this.bgPositionX = 0
          this.endPositionX = -25
          this.isOver = true
          this.isStart = false
          this.cars()
          this.compare()
          window.clearInterval(sortss)
        }, 1000)
      }, 5000)
    },
    // 牛牛算法
    result(arr) {
      // console.log(arr)
      let _arr = arr
      for (let i = 0; i < _arr.length - 2; i++) {
        for (let j = i + 1; j < _arr.length - 1; j++) {
          for (let k = j + 1; k < _arr.length; k++) {
            if ((_arr[i] + _arr[j] + _arr[k]) % 10 == 0) {
              _arr.splice(k, 1)
              _arr.splice(j, 1)
              _arr.splice(i, 1)
              for (let n = 0; n < _arr.length; n++) {
                if ((_arr[0] + _arr[1]) % 10 == 0) {
                  // console.log('牛牛')
                  return 10
                } else {
                  // console.log('牛'+(_arr[0]+_arr[1])%10)
                  return (_arr[0] + _arr[1]) % 10
                }
              }
            }
          }
        }
      }
      // console.log('没牛')
      return 0
    },
    niuniu(data, n) {
      let _data = data.slice(n, n + 5)
      return this.niu[this.result(_data)]
    },
    //结果
    compare() {
      let _data = this.data
      for (let i = 0; i < 6; i++) {
        this.resultList[i].data = _data.slice(i, i + 5)
        this.resultList[i].niu = this.result(_data.slice(i, i + 5))
        for (let j = 0; j < 5; j++) {
          this.resultList[i].color[j] = parseInt(Math.random()*4+1)
        }
      }
      // let _resultList = this.resultList
      for (let i = 1; i < this.resultList.length; i++) {
        if (this.resultList[i].niu > this.resultList[0].niu) {
          this.resultList[i].result = 'w'
        } else {
          this.resultList[i].result = 't'
        }
      }
      // console.log(this.resultList)
    },
    // 排序
    addEventListener() {
      let cars = document.getElementsByClassName('car')
      let _this = this
      let compares = function(prop) {
        return function(obj1, obj2) {
          let val1 = obj1[prop]
          let val2 = obj2[prop]
          if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1)
            val2 = Number(val2)
          }
          if (val1 < val2) {
            return -1
          } else if (val1 > val2) {
            return 1
          } else {
            return 0
          }
        }
      }
      sortss = window.setInterval(function() {
        let sortCar = []
        let newData = []
        for (let i = 0; i < cars.length; i++) {
          sortCar.push({
            left: cars[i].offsetLeft,
            id: i + 1
          })
        }
        sortCar.sort(compares('left'))
        for (let j = 0; j < sortCar.length; j++) {
          newData.push(sortCar[j].id)
        }
        _this.data = newData
      }, 500)
    },
    openHistory() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.$refs.accor.openItem()
      } else {
        this.$refs.accor.closeItem()
      }
    },
    getColor(val) {
      return pk10bjys(val)
    },
    _closeCallback() {
      // this.openless = 20;
    },
    sele() {
      let p = this.getEventPosition(event)
      let cass = document.getElementById('canvas')
      let cxtx = cass.getContext('2d')
      cxtx.clearRect(0, 0, cass.width, cass.height)
      let n = 0
      this.arr.forEach(function(v, i) {
        cxtx.beginPath()
        cxtx.moveTo(v.spot1.x, v.spot1.y)
        cxtx.lineTo(v.spot2.x, v.spot2.y)
        cxtx.lineTo(v.spot3.x, v.spot3.y)
        cxtx.lineTo(v.spot4.x, v.spot4.y)
        cxtx.stroke()
        if (p && cxtx.isPointInPath(p.x, p.y)) {
          n = i
        }
      })
      this.canvas(n)
    },
    getEventPosition(ev) {
      let x, y
      if (ev.layerX || ev.layerX == 0) {
        x = ev.layerX
        y = ev.layerY
      } else if (ev.offsetX || ev.offsetX == 0) {
        x = ev.offsetX
        y = ev.offsetY
      }
      return { x: x, y: y }
    },
    canvas(num) {
      let _this = this
      if (num == 0) {
        return
      }
      let a = this.betNum.indexOf(num)
      if (a > -1) {
        this.betNum.splice(a, 1)
      } else {
        this.betNum.push(num)
      }
      let items = document.querySelector('.niuniu').querySelectorAll('.box')
      let cass = document.getElementById('canvas')
      let cxtx = cass.getContext('2d')
      cxtx.clearRect(0, 0, cass.width, cass.height)
      this.arr.forEach(function(v, i) {
        if (i == 0) {
          cxtx.beginPath()
          cxtx.moveTo(v.spot1.x, v.spot1.y)
          cxtx.lineTo(v.spot2.x, v.spot2.y)
          cxtx.lineTo(v.spot3.x, v.spot3.y)
          cxtx.lineTo(v.spot4.x, v.spot4.y)
          cxtx.stroke()
          for (let i = 0; i < items.length; i++) {
            items[i].style.color = '#666'
          }
          return
        }
        for (let n = 0; n < _this.betNum.length; n++) {
          if (i == _this.betNum[n]) {
            cxtx.beginPath()
            cxtx.strokeStyle = '#ccc'
            cxtx.fillStyle = '#eb3349'
            cxtx.moveTo(v.spot1.x, v.spot1.y)
            cxtx.lineTo(v.spot2.x, v.spot2.y)
            cxtx.lineTo(v.spot3.x, v.spot3.y)
            cxtx.lineTo(v.spot4.x, v.spot4.y)
            cxtx.stroke()
            cxtx.fill()
            // for (let i = 0; i < items.length; i++) {
            //   items[i].style.color = "#666";
            // }
            let obj = document.querySelector('.xian' + i)
            obj.style.color = '#fff'
          }
        }
        // if (i == num) {
        //   cxtx.beginPath();
        //   cxtx.strokeStyle = "#ccc";
        //   cxtx.fillStyle = "#eb3349";
        //   cxtx.moveTo(v.spot1.x, v.spot1.y);
        //   cxtx.lineTo(v.spot2.x, v.spot2.y);
        //   cxtx.lineTo(v.spot3.x, v.spot3.y);
        //   cxtx.lineTo(v.spot4.x, v.spot4.y);
        //   cxtx.stroke();
        //   cxtx.fill();
        //   for (let i = 0; i < items.length; i++) {
        //     items[i].style.color = "#666";
        //   }
        //   let obj = document.querySelector(".xian" + i);
        //   obj.style.color = "#fff";
        // }
        cxtx.beginPath()
        cxtx.moveTo(v.spot1.x, v.spot1.y)
        cxtx.lineTo(v.spot2.x, v.spot2.y)
        cxtx.lineTo(v.spot3.x, v.spot3.y)
        cxtx.lineTo(v.spot4.x, v.spot4.y)
        cxtx.stroke()
      })
    },
    resize() {
      let items = document.querySelectorAll('.niuniu .box')
      for (let i = 0; i < items.length; i++) {
        items[i].style.color = '#666'
      }
      const clientWidth = document.body.clientWidth
      this.canvasWidth = clientWidth
      this.canvasHeight = clientWidth / 768 * 538
      this.arr = [
        {
          spot1: { x: this.canvasWidth * 0.365, y: 0 },
          spot2: { x: this.canvasWidth * 0.635, y: 0 },
          spot3: { x: this.canvasWidth * 0.635, y: this.canvasHeight * 0.67 },
          spot4: { x: this.canvasWidth * 0.365, y: this.canvasHeight * 0.67 }
        }, //庄
        {
          spot1: { x: 0, y: 0 },
          spot2: { x: this.canvasWidth * 0.365, y: 0 },
          spot3: { x: this.canvasWidth * 0.365, y: this.canvasHeight * 0.37 },
          spot4: { x: 0, y: this.canvasHeight * 0.37 }
        }, //闲1
        {
          spot1: { x: 0, y: this.canvasHeight * 0.37 },
          spot2: { x: this.canvasWidth * 0.365, y: this.canvasHeight * 0.37 },
          spot3: { x: this.canvasWidth * 0.365, y: this.canvasHeight * 0.67 },
          spot4: { x: 0, y: this.canvasHeight }
        }, //闲2
        {
          spot1: { x: this.canvasWidth * 0.365, y: this.canvasHeight * 0.67 },
          spot2: { x: this.canvasWidth * 0.635, y: this.canvasHeight * 0.67 },
          spot3: { x: this.canvasWidth, y: this.canvasHeight },
          spot4: { x: 0, y: this.canvasHeight }
        }, //闲3
        {
          spot1: { x: this.canvasWidth * 0.635, y: this.canvasHeight * 0.37 },
          spot2: { x: this.canvasWidth, y: this.canvasHeight * 0.37 },
          spot3: { x: this.canvasWidth, y: this.canvasHeight },
          spot4: { x: this.canvasWidth * 0.635, y: this.canvasHeight * 0.67 }
        }, //闲4
        {
          spot1: { x: this.canvasWidth * 0.635, y: 0 },
          spot2: { x: this.canvasWidth, y: 0 },
          spot3: { x: this.canvasWidth, y: this.canvasHeight * 0.37 },
          spot4: { x: this.canvasWidth * 0.635, y: this.canvasHeight * 0.37 }
        } //闲5
      ]
      this.$nextTick(() => {
        let cass = document.getElementById('canvas')
        let cxtx = cass.getContext('2d')
        cxtx.clearRect(0, 0, cass.width, cass.height)
        // 闲1
        cxtx.strokeStyle = '#ccc' //绘制线颜色
        cxtx.fillStyle = '#ccc'
        let xian1 = cxtx.rect(
          0,
          0,
          this.canvasWidth * 0.365,
          this.canvasHeight * 0.37
        )
        cxtx.stroke()
        // // 庄
        cxtx.beginPath()
        cxtx.strokeStyle = '#ccc'
        cxtx.fillStyle = '#ccc'
        let zhuang = cxtx.strokeRect(
          this.canvasWidth * 0.365,
          0,
          this.canvasWidth * 0.27,
          this.canvasHeight * 0.67
        )
        // // 闲5
        cxtx.beginPath()
        cxtx.strokeStyle = '#ccc'
        cxtx.fillStyle = '#ccc'
        let xian5 = cxtx.strokeRect(
          this.canvasWidth * 0.635,
          0,
          this.canvasWidth * 0.365,
          this.canvasHeight * 0.37
        )
        // // 闲2
        cxtx.beginPath()
        cxtx.lineStyle = 'blue'
        let xian2 = cxtx.moveTo(0, this.canvasHeight * 0.37)
        cxtx.lineTo(this.canvasWidth * 0.365, this.canvasHeight * 0.37)
        cxtx.lineTo(this.canvasWidth * 0.365, this.canvasHeight * 0.67)
        cxtx.lineTo(0, this.canvasHeight)
        cxtx.stroke()
        // // 闲4
        cxtx.beginPath()
        cxtx.lineStyle = 'blue'
        let xian4 = cxtx.moveTo(
          this.canvasWidth * 0.635,
          this.canvasHeight * 0.37
        )
        cxtx.lineTo(this.canvasWidth, this.canvasHeight * 0.37)
        cxtx.lineTo(this.canvasWidth, this.canvasHeight)
        cxtx.lineTo(this.canvasWidth * 0.635, this.canvasHeight * 0.67)
        cxtx.stroke()
        // // 闲3
        cxtx.beginPath()
        cxtx.lineStyle = 'red'
        let xian3 = cxtx.moveTo(
          this.canvasWidth * 0.365,
          this.canvasHeight * 0.67
        )
        cxtx.lineTo(this.canvasWidth * 0.635, this.canvasHeight * 0.67)
        cxtx.lineTo(this.canvasWidth, this.canvasHeight)
        cxtx.lineTo(0, this.canvasHeight)
        cxtx.stroke()
      })
    }
  }
}
</script>

<style lang="scss">
@function poTorem($px) {
  @return $px / 16px * 1rem;
}
.bullfight_body {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  top: poTorem(48px);
  .racing {
    height: poTorem(150px);
    background: url(../../../../../img/game/car/bg1.png);
    // background-position-x: 0px;
    background-size: auto 100%;
    overflow: hidden;
    position: relative;
    transition: all 0.5s linear;
    &.beg {
      animation: beg 10s linear infinite;
    }
    @keyframes beg {
      from {
        background-position-x: 0rem;
      }
      to {
        background-position-x: 500rem;
      }
    }
    .car {
      display: inline-block;
      width: 3rem;
      height: 1rem;
      position: absolute;
      transition: all 5s linear;
      span {
        display: inline-block;
        width: 0.6rem;
        height: 0.6rem;
        background: url(../../../../../img/game/car/tyre.png) no-repeat;
        background-size: 100%;
        position: absolute;
      }
      .l_tyre {
        top: 0.35rem;
        left: 0.25rem;
      }
      .r_tyre {
        top: 0.32rem;
        left: 2.05rem;
      }
      .tyre {
        animation: rotate 1s linear infinite;
      }
      @keyframes lamp_1 {
        0% {
          transform: rotate(-40deg);
        }
        50% {
          transform: rotate(40deg);
        }
        100% {
          transform: rotate(-40deg);
        }
      }
      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(-720deg);
        }
      }
      @keyframes feng {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      @keyframes fire {
        from {
          background: url(../../../../../img/game/car/fire1.png) no-repeat;
          background-size: 100%;
        }
        to {
          background: url(../../../../../img/game/car/fire2.png) no-repeat;
          background-size: 100%;
        }
      }
      i {
        display: inline-block;
        position: absolute;
      }
      &.speed {
        &::before {
          content: "";
          display: inline-block;
          width: 3rem;
          height: 1.6rem;
          background: url(../../../../../img/game/car/feng.png) no-repeat;
          background-size: 100%;
          animation: feng 0.3s linear infinite;
          position: absolute;
          top: -0.5rem;
          left: -0.3rem;
        }
        &::after {
          content: "";
          display: inline-block;
          width: 1.8rem;
          height: 0.8rem;
          background: url(../../../../../img/game/car/fire1.png) no-repeat;
          background-size: 100%;
          animation: fire 0.3s linear infinite;
          position: absolute;
          top: 0.2rem;
          right: -1.8rem;
        }
      }
    }
    .c1 {
      background: url(../../../../../img/game/car/car_1.png) no-repeat;
      background-size: 100%;
    }
    .c2 {
      background: url(../../../../../img/game/car/car_2.png) no-repeat;
      background-size: 100%;
    }
    .c3 {
      background: url(../../../../../img/game/car/car_3.png) no-repeat;
      background-size: 100%;
    }
    .c4 {
      background: url(../../../../../img/game/car/car_4.png) no-repeat;
      background-size: 100%;
    }
    .c5 {
      background: url(../../../../../img/game/car/car_5.png) no-repeat;
      background-size: 100%;
    }
    .c6 {
      background: url(../../../../../img/game/car/car_6.png) no-repeat;
      background-size: 100%;
    }
    .c7 {
      background: url(../../../../../img/game/car/car_7.png) no-repeat;
      background-size: 100%;
    }
    .c8 {
      background: url(../../../../../img/game/car/car_8.png) no-repeat;
      background-size: 100%;
    }
    .c9 {
      background: url(../../../../../img/game/car/car_9.png) no-repeat;
      background-size: 100%;
    }
    .c10 {
      background: url(../../../../../img/game/car/car_10.png) no-repeat;
      background-size: 100%;
    }
    .start {
      height: 60%;
      position: absolute;
      bottom: 0.4rem;
      right: 2.6rem;
    }
    .end {
      height: 68%;
      position: absolute;
      bottom: 0.4rem;
      right: 2.6rem;
      transition: all 0.2s linear;
    }
    .count {
      width: 15rem;
      height: 4rem;
      background: url(../../../../../img/game/car/num_bg.png) no-repeat;
      background-size: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      line-height: 4rem;
      color: #fff;
      text-align: center;
      font-size: 4rem;
      font-weight: 600;
    }
    .light {
      display: inline-block;
      img {
        position: absolute;
        top: poTorem(5px);
        right: 0;
        width: poTorem(50px);
      }
    }
  }
  .champion {
    // height: poTorem(150px);
    background: url(../../../../../img/game/car/stage.png) no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    position: relative;
    visibility: hidden;
    &.show {
      visibility: visible;
      height: poTorem(150px);
    }
    .sort {
      > div {
        position: absolute;
      }
      .scale1 {
        // animation: scale1 2s linear infinite;
        transform: translateX(-50%) scale(1.6) !important;
        transition: transform 2s linear;
      }
      .scale2 {
        // animation: scale2 2s linear infinite;
        transform: translateX(-165%) scale(1.3) !important;
        transition: transform 2s linear;
      }
      .scale3 {
        // animation: scale3 2s linear infinite;
        transform: translateX(65%) scale(1.3) !important;
        transition: transform 2s linear;
      }
      @keyframes scale1 {
        from {
          transform: translateX(-50%) !important;
        }
        to {
          transform: translateX(-50%) scale(1.6) !important;
        }
      }
      @keyframes scale2 {
        from {
          transform: translateX(-165%) !important;
        }
        to {
          transform: translateX(-165%) scale(1.3) !important;
        }
      }
      @keyframes scale3 {
        from {
          transform: translateX(65%) !important;
        }
        to {
          transform: translateX(65%) scale(1.3) !important;
        }
      }
      .st1 {
        width: 5rem;
        height: 2.8rem;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
        transform-origin: center;
        // -webkit-box-reflect: below;
      }
      .st2 {
        width: 5rem;
        height: 2.85rem;
        top: 50%;
        left: 42%;
        transform: translateX(-165%);
      }
      .st3 {
        width: 5rem;
        height: 2.85rem;
        top: 50%;
        left: 58%;
        transform: translateX(65%);
      }
      .sort1 {
        background: url(../../../../../img/game/car/front_car_1.png) no-repeat;
        background-size: 100%;
      }
      .sort2 {
        background: url(../../../../../img/game/car/front_car_2.png) no-repeat;
        background-size: 100%;
      }
      .sort3 {
        background: url(../../../../../img/game/car/front_car_3.png) no-repeat;
        background-size: 100%;
      }
      .sort4 {
        background: url(../../../../../img/game/car/front_car_4.png) no-repeat;
        background-size: 100%;
      }
      .sort5 {
        background: url(../../../../../img/game/car/front_car_5.png) no-repeat;
        background-size: 100%;
      }
      .sort6 {
        background: url(../../../../../img/game/car/front_car_6.png) no-repeat;
        background-size: 100%;
      }
      .sort7 {
        background: url(../../../../../img/game/car/front_car_7.png) no-repeat;
        background-size: 100%;
      }
      .sort8 {
        background: url(../../../../../img/game/car/front_car_8.png) no-repeat;
        background-size: 100%;
      }
      .sort9 {
        background: url(../../../../../img/game/car/front_car_9.png) no-repeat;
        background-size: 100%;
      }
      .sort10 {
        background: url(../../../../../img/game/car/front_car_10.png) no-repeat;
        background-size: 100%;
      }
    }
    .colour {
      width: 100%;
      height: 100%;
      background: url(../../../../../img/game/car/colour_bar.png) no-repeat;
      background-size: 100%;
      position: absolute;
      top: -100%;
      left: 0;
      transition: all 2s linear;
    }
    .colour.land {
      top: 100%;
    }
    .lamp {
      .lamp_1 {
        width: 2rem;
        height: 5rem;
        background: url(../../../../../img/game/car/lamp.png) no-repeat;
        background-size: 100%;
        position: absolute;
        left: 18%;
        bottom: -0.4rem;
        transform: rotate(-45deg);
        transform-origin: bottom;
        animation: lamp_1 1.5s linear infinite;
      }
      .lamp_2 {
        width: 2rem;
        height: 5rem;
        background: url(../../../../../img/game/car/lamp.png) no-repeat;
        background-size: 100%;
        position: absolute;
        left: 38%;
        bottom: -0.4rem;
        transform: rotate(45deg);
        transform-origin: bottom;
        animation: lamp_2 1.5s linear infinite;
      }
      .lamp_3 {
        width: 2rem;
        height: 5rem;
        background: url(../../../../../img/game/car/lamp.png) no-repeat;
        background-size: 100%;
        position: absolute;
        left: 58%;
        bottom: -0.4rem;
        transform: rotate(-45deg);
        transform-origin: bottom;
        animation: lamp_3 1.5s linear infinite;
      }
      .lamp_4 {
        width: 2rem;
        height: 5rem;
        background: url(../../../../../img/game/car/lamp.png) no-repeat;
        background-size: 100%;
        position: absolute;
        left: 78%;
        bottom: -0.4rem;
        transform: rotate(45deg);
        transform-origin: bottom;
        animation: lamp_4 1.5s linear infinite;
      }
      @keyframes lamp_1 {
        0% {
          transform: rotate(-45deg);
        }
        50% {
          transform: rotate(45deg);
        }
        100% {
          transform: rotate(-45deg);
        }
      }
      @keyframes lamp_2 {
        0% {
          transform: rotate(45deg);
        }
        50% {
          transform: rotate(-45deg);
        }
        100% {
          transform: rotate(45deg);
        }
      }
      @keyframes lamp_3 {
        0% {
          transform: rotate(-45deg);
        }
        50% {
          transform: rotate(45deg);
        }
        100% {
          transform: rotate(-45deg);
        }
      }
      @keyframes lamp_4 {
        0% {
          transform: rotate(45deg);
        }
        50% {
          transform: rotate(-45deg);
        }
        100% {
          transform: rotate(45deg);
        }
      }
    }
    .num1 {
      width: 3.5rem;
      height: 2.4rem;
      background: url(../../../../../img/game/car/1st.png) no-repeat;
      background-size: 100%;
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translateX(-50%);
    }
    .num2 {
      width: 3rem;
      height: 2rem;
      background: url(../../../../../img/game/car/2nd.png) no-repeat;
      background-size: 100%;
      position: absolute;
      top: 20%;
      left: 28%;
      transform: translateX(-50%);
    }
    .num3 {
      width: 3rem;
      height: 2rem;
      background: url(../../../../../img/game/car/3rd.png) no-repeat;
      background-size: 100%;
      position: absolute;
      top: 20%;
      left: 72%;
      transform: translateX(-50%);
    }
  }
  .cont {
    height: 100%;
    overflow: auto;
    position: relative;
  }
  .heads_top {
    width: 100%;
    background-color: #eee;
    padding: 0 poTorem(10px);
    .tit {
      height: poTorem(50px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .qishu {
        display: inline-block;
        line-height: poTorem(50px);
        font-size: poTorem(15px);
        span {
          color: #eb3349;
        }
      }
      .niu {
        display: inline-block;
        display: flex;
        justify-content: space-between;
        align-items: center;
        li {
          color: #535353;
          background: #fff;
          border: 1px solid #d2d3d5;
          margin: 0 0.1875rem;
          width: 2.4rem;
          height: 1.6rem;
          font-size: 0.9rem;
          text-align: center;
          line-height: 1.6rem;
          &:first-child {
            margin-right: 1rem;
          }
        }
      }
    }
    .balls {
      height: poTorem(40px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        li {
          text-align: center;
          font-size: 1rem;
          color: #fff;
          width: 1.5rem;
          height: 1.75rem;
          background-size: contain;
          margin-right: 0.3rem;
          line-height: 1.8125rem;
        }
      }
      div {
        width: 5.375rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          color: #535353;
          font-size: 1rem;
        }
        .icon {
          background: url(~img/goucai/arrow.png);
          height: poTorem(16px);
          width: poTorem(16px);
          background-size: contain;
          transition: transform 0.3s linear;
        }
        .icon.slidedown {
          transform: rotate(180deg) translateZ(0);
        }
      }
    }
  }
  .heads_bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 15rem;
    background: #eeeeee;
    width: 100%;
    z-index: 15;
    left: 0px;
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .yd-accordion {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      div {
        width: 100%;
      }
    }
    .history {
      display: block;
      z-index: 11;
      ul {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: space-between;
        overflow: scroll;
        li {
          padding: 0 2%;
          // width: 100%;
          height: 1.875rem;
          font-size: 0.9rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &:nth-child(even) {
            background-color: #eee;
          }
          .kaijiang {
            color: #eb3349;
            width: poTorem(140px);
            text-align: center;
          }
          span {
            width: poTorem(50px);
            padding: 0 poTorem(5px);
            text-align: center;
            &:nth-child(2) {
              width: poTorem(150px);
            }
          }
        }
      }
    }
    // .times {
    //   background-color: #eee;
    //   font-size: 0.875rem;
    //   color: #535353;
    //   height: 1.875rem;
    //   padding: 0 0.625rem;
    //   border-bottom: 0.0625rem solid #e9e9ea;
    //   .jiezhi {
    //     i {
    //       margin: 0 0.1875rem;
    //     }
    //   }
    //   .haoma {
    //     display: flex;
    //     justify-content: left;
    //     align-items: center;
    //     margin-left: 0.8rem;
    //     >span {
    //       display: inline-block;
    //       height: 1.5625rem;
    //       width: 5.4rem;
    //       background: url(../../../../../img/goucai/timestamp.png) no-repeat;
    //       background-size: 5.4rem 1.5625rem;
    //       color: #fff !important;
    //       line-height: 1.5625rem;
    //       text-align: center;
    //       letter-spacing: 0.125rem;
    //       >span {
    //         color: #fff !important;
    //         >span {
    //           color: #fff !important;
    //         }
    //       }
    //     }
    //   }
    // }
    .times {
      background-color: #eee;
      font-size: poTorem(14px);
      color: #535353;
      height: poTorem(30px);
      padding: 0 poTorem(10px);
      border-bottom: poTorem(1px) solid #e9e9ea;
      .jiezhi {
        i {
          margin: 0 poTorem(3px);
        }
      }
      .balance {
        span {
          color: #eb3349;
          margin: 0 poTorem(3px);
        }
      }
    }
  }
  .niuniu {
    margin-top: 1.875rem;
    position: absolute;
    width: 100%;
    z-index: 10;
    top: 15rem;
    > div {
      position: relative;
      color: #666;
      p {
        font-size: 1.3rem;
        text-align: center;
        line-height: 2rem;
        font-weight: 600;
        margin-top: poTorem(5px);
      }
      &:nth-child(1) {
        p {
          color: #ccc;
          position: absolute;
          top: 50%;
          width: 100%;
          font-family: serif;
          font-size: 4rem;
          line-height: 5rem;
          text-align: center;
        }
        .poker {
          // margin-left: 0.4rem;
          margin-top: 1rem;
        }
      }
      &:nth-child(3) {
        .poker {
          // height: 0;
        }
      }
      &:nth-child(4) {
        .poker {
          // margin-left: 0.6rem;
        }
      }
      &:nth-child(5) {
        .poker {
          // height: 0;
        }
      }
      .poker {
        position: relative;
        width: 6rem;
        height: 3.2rem;
        margin: 0 auto;
        // display: flex;
        // justify-content: space-between;
        // align-items: center;
        .item.sy {
          transform: rotateY(-180deg) translateZ(-2px);
        }
        .item {
          width: 2rem;
          height: 3.2rem;
          position: absolute;
          top: 0;
          transform-style: preserve-3d;
          transition: all 1s;
          span,
          img {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
          }
          span {
            transform: rotateY(-180deg) translateZ(1px);
          }
          &:nth-child(1) {
            left: 0rem;
            transition: all 1s;
            z-index: 1;
          }
          &:nth-child(2) {
            left: 1rem;
            transition: all 1s 0.1s;
            z-index: 2;
          }
          &:nth-child(3) {
            left: 2rem;
            transition: all 1s 0.2s;
            z-index: 3;
          }
          &:nth-child(4) {
            left: 3rem;
            transition: all 1s 0.3s;
            z-index: 4;
          }
          &:nth-child(5) {
            left: 4rem;
            transition: all 1s 0.4s;
            z-index: 5;
          }
        }
        span {
          position: absolute;
          display: inline-block;
        }
        .rotate {
          transform: rotateY(180deg);
        }
        .niu {
          top: 55%;
          left: 50%;
          transform: translateX(-50%) translateZ(10px);
          width: 2.5rem;
          height: 1.5rem;
          z-index: 100;
          position: absolute;
        }
        .res {
          top: 0.3rem;
          // right: 0.7rem;
          width: 0rem;
          height: 0rem;
          transition: all 1s;
          visibility: hidden;
          z-index: 100;
          right: -15%;
          position: absolute;
          transform: translateZ(10px);
          &.show {
            width: 2.5rem;
            height: 2.5rem;
            visibility: visible;
          }
        }
        .niu0_t {
          background: url(../../../../../img/game/n0-t.png) no-repeat;
          background-size: 100%;
        }
        .niu0_w {
          background: url(../../../../../img/game/n0-w.png) no-repeat;
          background-size: 100%;
        }
        .niu1_t {
          background: url(../../../../../img/game/n1-t.png) no-repeat;
          background-size: 100%;
        }
        .niu1_w {
          background: url(../../../../../img/game/n1-w.png) no-repeat;
          background-size: 100%;
        }
        .niu2_t {
          background: url(../../../../../img/game/n2-t.png) no-repeat;
          background-size: 100%;
        }
        .niu2_w {
          background: url(../../../../../img/game/n2-w.png) no-repeat;
          background-size: 100%;
        }
        .niu3_t {
          background: url(../../../../../img/game/n3-t.png) no-repeat;
          background-size: 100%;
        }
        .niu3_w {
          background: url(../../../../../img/game/n3-w.png) no-repeat;
          background-size: 100%;
        }
        .niu4_t {
          background: url(../../../../../img/game/n4-t.png) no-repeat;
          background-size: 100%;
        }
        .niu4_w {
          background: url(../../../../../img/game/n4-w.png) no-repeat;
          background-size: 100%;
        }
        .niu5_t {
          background: url(../../../../../img/game/n5-t.png) no-repeat;
          background-size: 100%;
        }
        .niu5_w {
          background: url(../../../../../img/game/n5-w.png) no-repeat;
          background-size: 100%;
        }
        .niu6_t {
          background: url(../../../../../img/game/n6-t.png) no-repeat;
          background-size: 100%;
        }
        .niu6_w {
          background: url(../../../../../img/game/n6-w.png) no-repeat;
          background-size: 100%;
        }
        .niu7_t {
          background: url(../../../../../img/game/n7-t.png) no-repeat;
          background-size: 100%;
        }
        .niu7_w {
          background: url(../../../../../img/game/n7-w.png) no-repeat;
          background-size: 100%;
        }
        .niu8_t {
          background: url(../../../../../img/game/n8-t.png) no-repeat;
          background-size: 100%;
        }
        .niu8_w {
          background: url(../../../../../img/game/n8-w.png) no-repeat;
          background-size: 100%;
        }
        .niu9_t {
          background: url(../../../../../img/game/n9-t.png) no-repeat;
          background-size: 100%;
        }
        .niu9_w {
          background: url(../../../../../img/game/n9-w.png) no-repeat;
          background-size: 100%;
        }
        .niu10_t {
          background: url(../../../../../img/game/n10-t.png) no-repeat;
          background-size: 100%;
        }
        .niu10_w {
          background: url(../../../../../img/game/n10-w.png) no-repeat;
          background-size: 100%;
        }
        .res_w {
          background: url(../../../../../img/game/w.png) no-repeat;
          background-size: 100%;
        }
        .res_t {
          background: url(../../../../../img/game/t.png) no-repeat;
          background-size: 100%;
        }
        $name1: "1-1", "2-1", "3-1", "4-1", "5-1", "6-1", "7-1", "8-1", "9-1",
          "10-1";
        $name2: "1-2", "2-2", "3-2", "4-2", "5-2", "6-2", "7-2", "8-2", "9-2",
          "10-2";
        $name3: "1-3", "2-3", "3-3", "4-3", "5-3", "6-3", "7-3", "8-3", "9-3",
          "10-3";
        $name4: "1-4", "2-4", "3-4", "4-4", "5-4", "6-4", "7-4", "8-4", "9-4",
          "10-4";
        @each $n in $name1 {
          .poker#{$n} {
            background: url("../../../../../img/game/"+$n+".png") no-repeat;
            background-size: 100% 100%;
          }
        }
        @each $n in $name2 {
          .poker#{$n} {
            background: url("../../../../../img/game/"+$n+".png") no-repeat;
            background-size: 100% 100%;
          }
        }
        @each $n in $name3 {
          .poker#{$n} {
            background: url("../../../../../img/game/"+$n+".png") no-repeat;
            background-size: 100% 100%;
          }
        }
        @each $n in $name4 {
          .poker#{$n} {
            background: url("../../../../../img/game/"+$n+".png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
    .xian1 {
      width: 36.5%;
      // height: 6.68rem;
      border-left: none;
      display: inline-block;
    }
    .zhuang {
      display: inline-block;
      width: 27%;
      // height: 12.2rem;
      position: absolute;
      top: 0;
      left: 36.5%;
    }
    .xian5 {
      width: 36.5%;
      // height: 6.68rem;
      display: inline-block;
      float: right;
    }
    .xian2 {
      width: 36.5%;
      // height: 0;
      display: inline-block;
      position: absolute;
      top: 55%;
      left: 0;
    }
    .xian4 {
      width: 36.5%;
      // height: 0;
      display: inline-block;
      position: absolute;
      top: 55%;
      right: 0;
    }
    .xian3 {
      width: 27%;
      // height: 5.86rem;
      margin: 0 auto;
      position: absolute;
      top: 100%;
      left: 36.5%;
      z-index: 1;
      .res {
        // right:-0.8rem !important;
      }
    }
  }
  canvas {
    border-bottom: 1px solid #ccc;
    //   position: absolute;
  }
}
</style>
