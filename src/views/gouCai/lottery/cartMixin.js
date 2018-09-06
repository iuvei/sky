import { RenderTypes } from '~/js/touzhu/commonTypes'
import danshiUtil from '~/js/touzhu/danshi.util'
import {
  getTwoBalls,
  getThreeBalls,
  getFourBalls,
  getFiveBalls
} from '~/js/touzhu/touzhu.lhc'
export default {
  data() {
    return {
      randomBetData: {}
    }
  },
  methods: {
    dataSetToBet(dataSource) {
      console.log(dataSource)
    },
    addLHCDataToCart(randomBetData) {
      // '二连肖','三连肖','四连肖','五连肖',,'二连尾', '三连尾','四连尾', '五连尾',  '三中二/三','三全中','二全中', '二中特','特串','四全中',
      const _arr = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
        _betData = randomBetData
      // 合肖 自选不中
      if ([8, 21].includes(_betData.playid)) {
        let _arr2 = _betData.arr2[0]
        if (_arr2.includes(' ')) {
          _arr2 = _arr2.split(' ').join('+')
        }
        if (_arr2.includes('|')) {
          _arr2 = _arr2.split('|').join('+')
        }
        _betData.arr2 = [_arr2]
        this.addToCart(_betData)
      } else if (_arr.includes(_betData.playid)) {
        this.processLHCData1(_betData)
        _betData.arr.forEach((x, i) => {
          const _arr2 = _betData.arr2[i]
          const obj = {
            arr: x,
            arr2: _arr2.split(' ').join('+'),
            formatShowStr: x,
            formatValueStr: _betData.arr2[i],
            formatedStr: `${x
              .split(' ')
              .map(y => `<span style='color:red'>${y}</span>`)
              .join(' ')}`,
            totalPrice: _betData.unitPrice,
            peilvStr: _betData.peilv,
            zhushu: 1
          }
          const _obj = Object.assign({}, _betData)
          this.addDataToCart(Object.assign(_obj, obj))
        })
      } else {
        _betData.dataSet.forEach(x => {
          const obj = {
            arr: [x.name],
            arr2: [x.value],
            formatShowStr: x.name,
            formatValueStr: x.value,
            formatedStr: `<span style='color:red'>${x.name}</span>`,
            totalPrice: _betData.unitPrice,
            peilvStr: x.peilv,
            zhushu: 1
          }
          const _obj = Object.assign({}, _betData)
          this.addDataToCart(Object.assign(_obj, obj))
        })
      }
    },
    betDataToCart(randomBetData) {
      if (randomBetData.peilvType === RenderTypes.LHC) {
        this.addLHCDataToCart(randomBetData)
      } else {
        this.addDataToCart(randomBetData)
      }
    },
    addDataToCart(calcBetData) {
      // 单行多赔率和多行多赔率的需要单独添加到购物车
      if (
        calcBetData.type === 1 &&
        (calcBetData.peilvType === RenderTypes.MUTI_ROW_MUTI_PEILV ||
          calcBetData.peilvType === RenderTypes.SINGLE_ROW_MUTI_PEILV)
      ) {
        calcBetData.filteredData.forEach(row => {
          row.data.forEach(item => {
            const obj = {
              arr: [item.name],
              arr2: [item.value],
              formatShowStr: item.name,
              formatValueStr: item.value,
              formatedStr: `${
                row.name === '' ? '号码' : row.name
              }(<span style='color:red'>${item.name}</span>)`,
              totalPrice: calcBetData.unitPrice,
              peilvStr: item.peilv,
              zhushu: 1
            }

            const _obj = Object.assign({}, calcBetData)
            this.addToCart(Object.assign(_obj, obj))
          })
        })
      } else if (
        danshiUtil.isSingleMode(calcBetData.js_tag, calcBetData.playid)
      ) {
        if (calcBetData.danshiExcl.length) {
          calcBetData.danshiExcl.split(',').forEach(item => {
            const obj = {
              arr: [item],
              arr2: [item],
              formatedStr: `号码(<span style='color:red'>${item
                .split('|')
                .join(' ')}</span>)`,
              totalPrice: calcBetData.unitPrice,
              peilvStr: calcBetData.peilv,
              zhushu: 1
            }

            const _obj = Object.assign({}, calcBetData)
            this.addToCart(Object.assign(_obj, obj))
          })
        }
      } else {
        this.addToCart(calcBetData)
      }
    },
    // 获取随机的bet数据
    getCalcBetData(randomBetData) {
      // 单式
      if (danshiUtil.isSingleMode(randomBetData.js_tag, randomBetData.playid)) {
        return Object.assign(randomBetData, {
          unitPrice: 2,
          formatedStr: `号码(${randomBetData.arr2
            .split('|')
            .map(x => `<span style='color:red'>${x}</span>`)
            .join(' ')})`,
          totalPrice: 2, // ,
          peilvStr: randomBetData.peilv
        })
      }

      // 单行多赔率
      // 格式化后的文字
      let formatedStr = ''
      if (randomBetData.peilvType === RenderTypes.SINGLE_ROW_MUTI_PEILV) {
        formatedStr =
          (randomBetData.filteredData[0].name === '' ? '号码' : '') + '( '
        randomBetData.arr.forEach((x, i) => {
          if (x.length) {
            formatedStr +=
              x
                .split('|')
                .map(x => `${`<span style="color:red">${x}</span>`}`)
                .join(',') + (i === randomBetData.arr.length - 1 ? '' : ',')
          }
        })
        formatedStr += ' )'
      }
      // 多行单赔率
      if (randomBetData.peilvType === RenderTypes.MUTI_ROW_SINGLE_PEILV) {
        formatedStr = randomBetData.formatShowStr
        const values = randomBetData.dataSet.map(x => x.value).join('|')
        randomBetData.dataSet = [
          {
            checked: true,
            name: randomBetData.formatShowStr, // betData.formatShowStr,
            peilv: randomBetData.peilv, // betData.peilv,
            value: values
          }
        ]
      }
      // 多行多赔率
      if (
        randomBetData.peilvType === RenderTypes.MUTI_ROW_MUTI_PEILV ||
        randomBetData.peilvType === RenderTypes.DWD
      ) {
        randomBetData.filteredData.forEach(item => {
          const name = item.name.length ? item.name : '号码'
          formatedStr += `${name}(${item.data
            .map(y => `<span style='color:red'>${y.name}</span>`)
            .join(',')})`
        })
      }
      // 单行单赔率
      if (randomBetData.peilvType === RenderTypes.SINGLE_ROW_SINGLE_PEILV) {
        randomBetData.filteredData.forEach(item => {
          const name = item.name.length ? item.name : '号码'
          formatedStr += `${name}(${item.data
            .map(y => `<span style='color:red'>${y.name}</span>`)
            .join(',')})`
        })
      }
      let peilvStr = []
      if (randomBetData.peilv && randomBetData.peilv.includes('|')) {
        randomBetData.filteredData.forEach(x => {
          x.data.forEach(y => {
            peilvStr.push(y.peilv)
          })
        })
        peilvStr = peilvStr.join('|')
      } else {
        peilvStr = randomBetData.peilv
      }

      if (
        randomBetData.peilvType === RenderTypes.SSC ||
        randomBetData.peilvType === RenderTypes.LHC
      ) {
        randomBetData.filteredData.forEach(item => {
          formatedStr += `${item.name}(${item.data
            .map(y => `<span style='color:red'>${y.name}</span>`)
            .join(',')})`
        })
        if (randomBetData.peilvType === RenderTypes.LHC && randomBetData.pl) {
          peilvStr = randomBetData.pl
        }
      }
      return Object.assign(randomBetData, {
        unitPrice: 2,
        formatedStr,
        totalPrice: randomBetData.zhushu * 2,
        peilvStr
      })
    },
    // 从传来的数据中获取赔率最大的
    getMaxPeilvFromBetData(randomBetData) {
      if (
        randomBetData.peilvType === RenderTypes.SSC ||
        randomBetData.peilvType === RenderTypes.LHC
      ) {
        if (randomBetData.pl) {
          randomBetData.peilv = randomBetData.pl
          return randomBetData.pl
        }
        if (randomBetData.peilv) {
          if (randomBetData.peilv.includes('|')) {
            const peilvs = randomBetData.peilv.split('|')
            return peilvs[peilvs.length - 1]
          } else {
            return randomBetData.peilv
          }
        }
      }

      if (randomBetData && randomBetData.dataSet) {
        return Math.max(...randomBetData.dataSet.map(x => x.peilv))
      } else {
        return 1
      }
    },
    // 处理六合彩的特殊数据
    processLHCData1(betData) {
      // const towArr = ['二连肖', '二连尾', '2连尾', '二全中', '二中特', '特串'],
      //   threeArr = ['三连肖', '三连尾', '3连尾', '三中二/三', '三全中'],
      //   fourArr = ['四连肖', '四连尾', '4连尾', '四全中'],
      //   fiveArr = ['五连肖', '五连尾', '5连尾']
      const towArr = [22, 26, 32, 33, 34],
        threeArr = [23, 27, 30, 31],
        fourArr = [24, 28, 35],
        fiveArr = [25, 29]

      if (towArr.includes(betData.playid)) {
        betData.arr = getTwoBalls(betData.formatValueStr.split(' '))
        betData.arr2 = getTwoBalls(betData.arr2[0].split('|'))
      }
      if (threeArr.includes(betData.playid)) {
        betData.arr = getThreeBalls(betData.formatValueStr.split(' '))
        betData.arr2 = getThreeBalls(betData.arr2[0].split('|'))
      }
      if (fourArr.includes(betData.playid)) {
        betData.arr = getFourBalls(betData.formatValueStr.split(' '))
        betData.arr2 = getFourBalls(betData.arr2[0].split('|'))
      }
      if (fiveArr.includes(betData.playid)) {
        betData.arr = getFiveBalls(betData.formatValueStr.split(' '))
        betData.arr2 = getFiveBalls(betData.arr2[0].split('|'))
      }
    },
    keyboardPressed1(val) {
      this.auto = val
    },
    keyboardPressed2(val) {
      this.chaseBeiShu = val
    },
    hideKeyboardHandle1() {
      this.hideKeyboard1 = true
      if (this.showBottom === false) {
        this.showBottom = true
      }
    },
    hideKeyboardHandle2() {
      this.hideKeyboard2 = true
      if (this.showBottom === false) {
        this.showBottom = true
      }
    }
  }
}
