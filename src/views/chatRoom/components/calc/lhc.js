import { getFields } from '../../../gouCai/lottery/lhc/components/field'
import CalcObj from '../../../gouCai/lottery/lhc/components/calc'
import labelUtil from '~/js/touzhu/getLabels'

const towArr = [22, 26, 32, 33, 34],
  threeArr = [23, 27, 30, 31],
  fourArr = [24, 28, 35],
  fiveArr = [25, 29]

class LHC {
  showActions(playid) {
    return [1, 36, 10, 11, 12, 13, 14, 15, 16].includes(playid)
  }

  /**
   * 获取选球类型
   * 1为圆球， 2为方框，3为中方框，4为大方框
   * @param { String } rowName 行名称
   * @param { String } name 球名称
   * @returns { Number } 球的显示类型
   * @memberof LHC
   */
  getShowType(playid) {
    const [arr0, arr1, arr2, arr4] = [
      [3],
      [2, 5, 19, 20, 4, 6],
      [1, 36, 10, 11, 12, 13, 14, 15, 16, 21, 30, 31, 32, 33, 34, 35],
      // [18, 26, 27, 28, 29],
      [9]
    ]
    if (arr0.includes(playid)) {
      return 0
    } else if (arr1.includes(playid)) {
      return 1
    } else if (arr2.includes(playid)) {
      return 2
    } else if (arr4.includes(playid)) {
      return 4
    } else return 3
  }

  getValue(obj, i, j) {
    return obj.values ? obj.values[j] : i * obj.option.length + j
  }

  getNumbers(obj, j) {
    return obj.numbers ? obj.numbers[j] : ''
  }
  /**
   * 获取选球数据
   *
   * @param { Number } playid 玩法ID
   * @param { Array } odds 赔率数组
   * @param { Array } columns 行名称数组
   * @returns { Array } 选球模板数据源
   * @memberof LHC
   */
  getBalls(playid, odds, columns = []) {
    columns = getFields(playid, columns)
    console.log('columns', columns)
    return columns.map((item, i) => ({
      name: item.name,
      data: (item.options || item.option).map((x, index) => ({
        name: x.name || x,
        checked: false,
        peilv: odds && odds.length > 2 ? odds[index] : '-',
        playid,
        type: this.getShowType(playid), // 1为圆球， 2为方框，3为中方框，4为大方框
        value: this.getValue(item, i, index),
        numbers: this.getNumbers(item, index)
      }))
    }))
  }

  /**
   * 号码选择互斥
   *
   * @param { Array } dataSet 数据源
   * @param { Sring } name 行上的名称
   * @param { Object } curItem 当前选中的球
   * @memberof LHC
   */
  mutex(dataSet, name, curItem) {
    const arr = dataSet[0].data.filter(x => x.checked)
    if ([8, 21].includes(curItem.playid)) {
      if (arr.length > 11) {
        arr.filter(x => x.name !== curItem.name)[0].checked = false
      }
    } else if (curItem.playid >= 30 && curItem.playid <= 35) {
      if (arr.length > 10) {
        arr.filter(x => x.name !== curItem.name)[0].checked = false
      }
    } else if (curItem.playid > 21 && curItem.playid < 30) {
      if (arr.length > 6) {
        arr.filter(x => x.name !== curItem.name)[0].checked = false
      }
    }
  }

  /**
   * 计算注数
   *
   * @param { Number } playid 玩法ID
   * @param { Array } one 一维数组
   * @param { Array } two 二维数组
   * @returns Number 计算的出的注数
   * @memberof LHC
   */
  calcBetNumber(playid, one) {
    return CalcObj.calcBetNum(playid, one)
  }

  /**
   * 取球函数
   *
   * @param { Array } arr
   * @returns 选中球的值
   * @memberof LHC
   */
  getValues(arr) {
    return arr.filter(x => x.checked).map(x => x.value)
  }

  /**
   * 取球函数
   *
   * @param { Array } arr
   * @returns 选中球的名称
   * @memberof LHC
   */
  getLabels(arr) {
    return arr.filter(x => x.checked).map(x => x.name)
  }

  /**
   * 获取选中球
   *
   * @param { Array } dataSet 数据源
   * @param { Number } playid 玩法ID
   *  @param { Boolean } isGetLabel 是否是获取名称，默认是获取值
   * @returns 一维数组放one 二维数组放two,一般是胆拖
   * @memberof LHC
   */
  getCheckedBalls(dataSet, playid, isGetLabel = false) {
    let one = []
    dataSet.forEach(x => {
      one.push(isGetLabel ? this.getLabels(x.data) : this.getValues(x.data))
    })
    one = one.reduce((a, b) => a.concat(b))
    let two = []

    if (towArr.includes(playid)) {
      two = CalcObj.getTwoBalls(one)
    }
    if (threeArr.includes(playid)) {
      two = CalcObj.getThreeBalls(one)
    }
    if (fourArr.includes(playid)) {
      two = CalcObj.getFourBalls(one)
    }
    if (fiveArr.includes(playid)) {
      two = CalcObj.getFiveBalls(one)
    }
    return {
      one,
      two
    }
  }

  // 获取显示球
  getShowLabels(dataSet, playid) {
    const obj = this.getCheckedBalls(dataSet, playid, true)
    if ([8, 21].includes(playid)) {
      // 单行,不显示label，单赔率
      return labelUtil.getLabels(dataSet, ',', false)
    } else if (
      [22, 26, 32, 33, 34, 23, 27, 30, 31, 24, 28, 35, 25, 29].includes(playid)
    ) {
      // if ([1, 2, 3, 4, 5, 6, 7,9,10,11,12,13,14,15,16,17,18,19,20,22,23,24,25,26,27,28,29 36].includes(playid)) {

      // }
      // return labelUtil.getLabels(dataSet, ',', false, true)
      return obj.two
    } else return labelUtil.getLabels(dataSet, ',', false, true)
  }

  /**
   * 计算提交数据
   *
   * @param { Array } dataSet 数据源
   * @param { Number } playid 玩法ID
   * @param { Number } price 投注单价
   * @returns String 计算后的投注字符串
   * @memberof LHC
   */
  getSubmitData(dataSet, playid, price) {
    let arr = []
    const obj = this.getCheckedBalls(dataSet, playid)
    if (obj.two.length) {
      arr = obj.two.map(x => `${playid}#${price}#${x.replace(/\s/g, '+')}`)
    } else if ([8, 21].includes(playid)) {
      arr = [`${playid}#${price}#${obj.one.join('+')}`]
    } else {
      arr = obj.one.map(x => `${playid}#${price}#${x}`)
    }
    return JSON.stringify(arr).replace('/\\/g', '')
  }

  /**
   * 组装提交数据
   *
   * @param {Object} { gameid, dataSet, playid, price, qishu, token }
   * @returns Object
   * @memberof LHC
   */
  assemblyBetData({ gameid, dataSet, playid, price, qishu, token }) {
    // console.error('getData', this.getData(dataSet, playid, price))
    return {
      gameid,
      qishu,
      data: this.getSubmitData(dataSet, playid, price),
      auto: 1,
      stop: 1,
      multiple: 1,
      form_unique_token: token
    }
  }
}

export default new LHC()
