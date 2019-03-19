<template>
  <div class="echart">
    <div class="echart_con">
      <div>
        <div class="echart_aside"
             v-if="data && data.length"
             ref="echart_left_con">
          <span>期数</span>
          <ul>
            <li v-for="(item, index) in data"
                :key="index">
              {{item.qishu}}
            </li>
          </ul>
        </div>
        <div class="echart_right">
          <ul class="echart_right_head">
            <li v-for="(item, index) in dataHead"
                :key="index">
              {{item}}
            </li>
          </ul>
          <div class="echart_right_con"
               ref="echart_right_con">
            <ul v-for="(item,index) in list"
                :key="index">
                <li v-for="(listItem, listItemIndex) in item"
                    :key="listItemIndex"
                    :class="[listItem.length > 0 ? 'activeClass' : '']">
                  <div v-if="listItem.length > 0">
                    <div class="ball">
                      {{listItem[0]}}
                    </div>
                  </div>
                  <span v-else>{{listItem}}</span>
                </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="echart_bottom"
           v-if="data && data.length">
        <ul>
          <li class="miss">平均<br>遗漏</li>
          <li v-for="(item,index) in eachList.aveArry"
              :key="index">
            {{item}}
          </li>
        </ul>
        <ul>
          <li class="miss">最大<br>遗漏</li>
          <li v-for="(item,index) in eachList.maxArry"
              :key="index">
            {{item}}
          </li>
        </ul>
      </div>

    </div>
    <canvas ref="cv"
            id="cv"
            v-show="!needLine"></canvas>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { getSimplePeriod } from '~/js/trendUtil';

// 封装一个折线图的函数


export default {
  name: 'trendList',
  props: ['lotterid'],
  data() {
    return {
      data: [],
      // dataHead: [],
      canvasList: [],
      canvasHeigh: '',
      canvasWidth: '',
      canvaskuan: 0
    };
  },
  watch: {
    trendval() {
      this.canvasList = this.data.map(item => item[`ba_${this.trendval}`]);
      this.drawLine(this.canvasList);
    },

    lotterid(val) {
      console.log(val);
      this.getData();
    }
  },
  methods: {
    ...mapActions(['setGameTrend']),
    /** 开始画线 */
    getBrokenLine(ctx, cv, data, color, widths, hei, startWithZero) {
      const fontSize = document.documentElement.style.fontSize.replace('px', '');
      const pl = fontSize * 4.0625;
      const pt = fontSize * 2;
      const padding = widths / 2; // 边距
      let x0 = padding, // 原点x轴坐标
        y0 = cv.height - padding; // 原点y轴坐标

      // 中断（坐标轴和折线的）连接
      ctx.stroke();
      ctx.beginPath();

      // 开始绘制起点
      const d0 = parseInt(data[0]) > 0 ? parseInt(data[0]) : startWithZero ? 0 : 1;
      if (startWithZero) {
        x0 = (d0 === 0 ? 0 : widths * d0) + widths / 2 + pl;
      } else {
        x0 = (d0 === 1 ? 0 : widths * (d0 - 1)) + widths / 2 + pl;
      }
      y0 = hei / 2 + pt;
      ctx.moveTo(x0 - 1, y0);
      //   console.log('2222', x0, y0);
      for (let i = 1; i < data.length; i++) {
        // 判断是0开头还是1开头
        if (!startWithZero) {
          const c0 = parseInt(data[i]) > 0 ? parseInt(data[i]) : 1;
          const pointX = c0 === 1 ? widths / 2 : widths * (c0 - 1) + widths / 2;
          let pointY = hei * i + hei / 2;
          pointY -= i > 20 ? i > 30 ? 3 : 1 : 0; // 设置偏移值
          ctx.lineTo(pointX + pl - 1, pointY + pt);
        } else {
          const c0 = parseInt(data[i]) > 0 ? parseInt(data[i]) : 0;
          const pointX = c0 === 0 ? widths / 2 : widths * c0 + widths / 2;
          let pointY = hei * i + hei / 2;
          // 设置偏移值
          if (i > 20) {
            pointY = pointY - 2;
          }
          if (i > 30) {
            pointY = pointY - 3;
          }
          ctx.lineTo(pointX - 1 + pl, pointY + pt);
        }
      }

      ctx.strokeStyle = color;
      ctx.stroke();
      // ctx.scale(0.5, 0.5)
    },
    drawLine(canvasList) {
      const cv = this.$refs.cv;

      const fontSize = document.documentElement.style.fontSize.replace(
        'px',
        ''
      );

      cv.height = this.$refs.echart_right_con.offsetHeight * 2 + fontSize * 12;
      cv.style.height =
        this.$refs.echart_right_con.offsetHeight + fontSize * 6 + 'px';

      cv.width =
        (this.$refs.echart_right_con.offsetWidth +
          this.$refs.echart_left_con.offsetWidth) *
        2;
      cv.style.width =
        this.$refs.echart_right_con.offsetWidth +
        this.$refs.echart_left_con.offsetWidth +
        'px';

      const ctx = cv.getContext('2d');
      ctx.scale(2, 2); // 放大画布消除模糊
      ctx.lineWidth = 2;
      if (this.canvaskuan === false) {
        this.canvaskuan = this.$refs.echart_right_con.firstChild.firstChild.offsetWidth;
      }
      if (this.canvasUnitHeight === false) {
        this.canvasUnitHeight = this.$refs.echart_right_con.firstChild.firstChild.offsetHeight;
      }
      if (this.canvaskuan > 1) {
        this.getBrokenLine(
          ctx,
          cv,
          canvasList,
          '#e33939',
          this.canvaskuan,
          this.canvasUnitHeight,
          this.dataHead[0] === 0
        );
      }
    },
    clearRect() {
      if (this.$refs && this.$refs.cv) {
        const cv = this.$refs.cv;
        cv.height = this.$refs.echart_right_con.offsetHeight * 2;
        cv.width = this.$refs.echart_right_con.offsetWidth * 2;
        const ctx = cv.getContext('2d');
        ctx.clearRect(20, 20, cv.width, cv.height);
      }
    },
    /* 准备画布 */
    prepareCanvas(canvasList) {
      /** 获得html字根大小 否则刷新高度会计算错误 */
      const htmlFont = parseFloat(document.documentElement.style.fontSize);
      /** 获得高度并作画 */
      this.$nextTick(() => {
        this.canvasHeigh =
          this.$refs.echart_right_con &&
          this.$refs.echart_right_con.offsetHeight / htmlFont;
        this.canvasWidth =
          this.$refs.echart_right_con &&
          this.$refs.echart_right_con.offsetWidth / htmlFont;
        this.canvaskuan =
          this.$refs.echart_right_con.firstChild.firstChild &&
          this.$refs.echart_right_con.firstChild.firstChild.offsetWidth > 1 &&
          this.$refs.echart_right_con.firstChild.firstChild.offsetWidth;
        this.canvasUnitHeight =
          this.$refs.echart_right_con.firstChild.firstChild &&
          this.$refs.echart_right_con.firstChild.firstChild.offsetHeight > 1 &&
          this.$refs.echart_right_con.firstChild.firstChild.offsetHeight;

        this.canvasHeigh > 0 && this.$nextTick(() => this.drawLine(canvasList));
      });
    },
    getTrendData() {
      return this.$ajax('request', {
        ac: 'getTrenlistData',
        gameid: this.lotterid, // this.gameId,
        pageid: 0
        // count: 40
      });
    },
    /** 得到数据 */
    getData() {
      this.clearRect();
      // 获取数据
      this.$dialog.loading.open('');

      this.getTrendData().then(res => {
        this.$dialog.loading.close();
        this.data = getSimplePeriod(res.list);
        this.canvasList = [];
        this.data.forEach(item => {
          /** 画图图标添加*/
          this.canvasList.push(item[`ba_${this.trendval}`]);
        });

        this.prepareCanvas(this.canvasList);
      });
    },
    /* 横竖屏时的判断 */
    handleResize() {
      // console.log(window.screen.orientation)
      this.clearRect();
      this.$dialog.loading.open('');
      this.prepareCanvas(this.canvasList);
      this.$dialog.loading.close();
    }
  },
  /** 进入走势来不及获取高度重新画图 */

  computed: {
    needLine() {
      return this.lotterid === 52;
    },
    ...mapState({
      gameName: state => state.trend.gameName,
      // gameId: state => state.trend.gameId,
      trendval: state => state.trend.trendval,
      digits: state => state.trend.digits,
      dataHead_odd: state => state.trend.numbers,
      dataHead() {
        if (this.lotterid === 52) {
          return this.dataHead_odd.slice(
            this.trendval * 10,
            this.trendval * 10 + 10
          );
        }
        return this.dataHead_odd;
      }
    }),
    /** 循环标签 */
    list() {
      if (!this.dataHead || !this.dataHead.length) return []
      if (!this.data || !this.data.length) return []

      const dataArry = this.data,
        datalength = dataArry.length;
      let listArry = []
      if (this.lotterid == 52) {
        this.dataHead.forEach((item, index) => {
          listArry[index] = dataArry.map(n => {
            for (const key in n) {
              if (n[key] == item) {
                return [item, true]
              }
            }
            return item
          })
        })

        // 处理要显示的标签名
        listArry = listArry.map(el => {
          let num = 1
          el.reduceRight((pre, cur, idx, arr) => {
            num++
            if (!Array.isArray(arr[arr.length - 1])) {
              arr[arr.length - 1] = 1
            }
            if (!Array.isArray(cur)) {
              arr[idx] = num
            } else {
              num = 0
            }
            return cur
          })
          return el
        })
      } else {
        // 如果是1开头的
        if (this.dataHead[0] == 1) {
          for (
            let index = 1;
            index <= this.dataHead.length;
            index++
          ) {
            listArry[index - 1] = []
            let number = 0

            /** 二维数组里分别添加数据 */
            for (let j = 0; j < datalength; j++) {
              number++
              /** 有中奖值则添加，无则重新赋值递增 */
              if (dataArry[j][`ba_${this.trendval}`] == index) {
                const c = index
                number = 0
                listArry[c == 0 ? c : c - 1][j] = [index, true]
              } else {
                listArry[index - 1][j] = number
              }
            }
          }
        } else {
          // 如果是0开头的
          for (let index = 0; index < this.dataHead.length; index++) {
            listArry[index] = []
            let number = 0
            /** 二维数组里分别添加数据 */
            for (let j = 0; j < datalength; j++) {
              number++
              /** 有中奖值则添加，无则重新赋值递增 */
              if (dataArry[j][`ba_${this.trendval}`] == index) {
                number = 0
                listArry[index][j] = [index, true]
              } else {
                listArry[index][j] = number
              }
            }
          }
        }

        // 将数倒过来 如果是1开头的
        if (this.dataHead[0] == 1) {
          for (
            let index = 1;
            index <= this.dataHead.length;
            index++
          ) {
            let number = 0
            for (let j = datalength - 1; j >= 0; j--) {
              number++
              if (dataArry[j][`ba_${this.trendval}`] == index) {
                number = 0
              } else listArry[index - 1][j] = number
            }
          }
        } else {
          // 如果是0开头的
          for (let index = 0; index < this.dataHead.length; index++) {
            let number = 0
            /** 二维数组里分别添加数据 */
            for (let j = datalength - 1; j >= 0; j--) {
              number++
              /** 有中奖值则添加，无则重新赋值递增 */
              if (dataArry[j][`ba_${this.trendval}`] == index) {
                number = 0
              } else {
                listArry[index][j] = number
              }
            }
          }
        }
      }
      return listArry
    },
    /** 最大遗漏值、平均遗漏值 */
    eachList() {
      const aveArry = [],
        maxArry = [];
      /** 一层循环拿到有几个数组 */
      for (let index = 0; index < this.list.length; index++) {
        let sum = 0;
        let max = Array.isArray(this.list[index][0]) ? 0 : this.list[index][0];

        /** 二层循环取出中奖到值 */
        for (let j = 0; j < this.list[index].length; j++) {
          /** 取最大值 */
          this.list[index][j] > max &&
            !this.list[index][j][0] &&
            (max = this.list[index][j]);
          /** 如果数组大于1即为中奖值--取平均值 */
          this.list[index][j].length > 1 &&
            ((this.list[index][j][0] === index ||
              this.list[index][j][0] === index + 11) &&
              sum++);

          if (this.dataHead[0] === 1) {
            this.list[index][j].length > 1 &&
              (this.list[index][j][0] === index + 1 && sum++);
          }
        }
        maxArry.push(max);
        aveArry.push(
          Math.round(sum !== 0 ? this.list[index].length / (sum + 1) : 0) // 平均遗漏算法
        );
      }
      return {
        aveArry,
        maxArry
      };
    }
  },
  mounted() {
    if (this.lotterid) {
      // this.dataHead = this.numbers
      this.getData();
    }
  },
  activated() {
    const eventName =
      'orientationchange' in window ? 'orientationchange' : 'resize';
    window.addEventListener(eventName, this.handleResize);
  },
  deactivated() {
    const eventName =
      'orientationchange' in window ? 'orientationchange' : 'resize';
    window.removeEventListener(eventName, this.handleResize);
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
@mixin public {
  box-sizing: border-box;
  height: poTorem(32px);
  line-height: poTorem(32px);
  border: 1px solid #f3f3f3;
  text-align: center;
  color: #333;
  font-size: poTorem(16px);
  display: inline-block;
  width: poTorem(65px);
}
.echart {
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
  overflow-y: scroll;

  position: relative;
  .echart_con {
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    // margin-top: 2.5rem;
    // margin-bottom: poTorem(48px);
    .echart_bottom {
      display: flex;
      flex-direction: column;
      ul {
        height: poTorem(32px);
        display: flex;
        color: #000;
        .miss {
          text-align: center;
          font-size: poTorem(15px);
          width: poTorem(65px);
          border-left: 1px solid #f3f3f3;
          border-bottom: 1px solid #f3f3f3;
          border-right: 1px solid #f3f3f3;
          line-height: poTorem(16px);
        }
        li:not(.miss) {
          flex: 1;
          @include center;
          font-size: poTorem(16px);
          // color: #999;
          border-bottom: 1px solid #f3f3f3;
          border-right: 1px solid #f3f3f3;
        }
      }
    }
    div {
      display: flex;
      width: 100%;
      .echart_aside {
        width: poTorem(65px);
        display: flex;
        flex-direction: column;
        span {
          @include public;
          // height: poTorem(40px);
          // line-height: poTorem(40px);
          height: 2rem;
          line-height: 2rem;
          border: none;
          border-top: 1px solid #f3f3f3;
          border-left: 1px solid #f3f3f3;
          border-right: 1px solid #f3f3f3;
        }
        ul {
          display: flex;
          flex-direction: column;
          border-left: 1px solid #f3f3f3;
          border-top: 1px solid #f3f3f3;
          border-right: 1px solid #f3f3f3;
          li {
            @include public;
            border: none;

            border-bottom: 1px solid #f3f3f3;
          }
        }
      }
      .echart_right {
        flex: 1;
        display: flex;
        flex-direction: column;
        .echart_right_head {
          display: flex;
          border-top: 1px solid #f3f3f3;
          li {
            flex: 1;
            // height: poTorem(40px);
            // line-height: poTorem(40px);
            height: 2rem;
            line-height: 2rem;
            text-align: center;
            color: #333;
            font-size: poTorem(16px);
            border-bottom: 1px solid #f3f3f3;
            border-right: 1px solid #f3f3f3;
          }
        }
        .echart_right_con {
          display: flex;
          ul {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            li {
              flex: 1;
              height: poTorem(32px);
              line-height: poTorem(32px);
              text-align: center;
              color: #999;
              font-size: poTorem(16px);
              border-right: 1px solid #f3f3f3;
              border-bottom: 1px solid #f3f3f3;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .activeClass {
              > div {
                position: relative;
                justify-content: center;
                align-items: center;
              }
              .ball {
                width: poTorem(27px);
                height: poTorem(27px);
                line-height: poTorem(27px);
                display: inline-block;
                background: #e33939;
                border-radius: 50%;
                color: #fff;
                font-weight: bold;
                z-index: 12;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
        }
      }
    }
  }
  .echart,
  .echart_con {
    -webkit-overflow-scrolling: auto;
    z-index: 11111;
  }
  #myChart,
  #cv {
    position: absolute;
    // top: poTorem(40px);
    display: block;
    // z-index: 11111;
    // margin-left: poTorem(66px);
    -webkit-overflow-scrolling: auto;
    top: 0;
    left: 0;
    transform: translate3d(0, 0, 0);
  }
}
</style>
