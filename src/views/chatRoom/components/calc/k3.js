import getFields from '../../../gouCai/lottery/k3/components/fields'
import { CalcObj } from '~/js/touzhu/touzhu.k3.calc'
import labelUtil from '~/js/touzhu/getLabels'
class K3 {
  /**
   * 获取选球类型
   * 1为圆球， 2为方框，3为中方框，4为大方框
   * @param { String } rowName 行名称
   * @param { String } name 球名称
   * @returns { Number } 球的显示类型
   * @memberof K3
   */
  getShowType(rowName, name) {
    if (name === '三同号通选') {
      return 4
    } else if (rowName === '单选') return 3
    else if (rowName === '复选') return 3
    return 2
  }

  getValue(obj, i, j) {
    return obj.values ? obj.values[j] : i * obj.option.length + j
  }

  /**
   * 获取选球数据
   *
   * @param { Number } playid 玩法ID
   * @param { Array } odds 赔率数组
   * @returns { Array } 选球模板数据源
   * @memberof K3
   */
  getBalls(playid, odds) {
    let columns = []
    columns = getFields(playid, columns)
    return columns.template.map((item, i) => ({
      name: item.name,
      data: (item.options || item.option).map((x, index) => ({
        name: x.name || x,
        checked: false,
        peilv: odds && odds.length > 2 ? odds[index] : '-',
        playid,
        type: this.getShowType(item.name, x.name || x), // 1为圆球， 2为方框，3为中方框，4为大方框
        value: this.getValue(item, i, index)
      }))
    }))
  }

  /**
   * 号码选择互斥
   *
   * @param { Array } dataSet 数据源
   * @param { Sring } name 行上的名称
   * @param { Object } curItem 当前选中的球
   * @memberof K3
   */
  mutex(dataSet, name, curItem) {
    if ([5, 10].includes(curItem.playid)) {
      // 互斥的号码一般为胆拖，两行
      const arr1 = dataSet[0].data.filter(x => x.checked),
        arr2 = dataSet[1].data.filter(x => x.checked)

      // 如果是第一行点击，则第二行球消失
      if (name === dataSet[0].name) {
        arr1.forEach(item => {
          const index = arr2.findIndex(x => x.name === item.name)
          if (index >= 0) arr2[index].checked = !arr2[index].checked
        })
        // 胆码最多只能选择三个或者两个
        if (curItem.playid === 5 && arr1.length > 2) {
          arr1.filter(x => x.name !== curItem.name)[0].checked = false
        }

        if (curItem.playid === 10 && arr1.length > 1) {
          arr1.filter(x => x.name !== curItem.name)[0].checked = false
        }
      }
      // 如果是第二行点击，则第一行球消失
      if (name === dataSet[1].name) {
        arr2.forEach(item => {
          const index = arr1.findIndex(x => x.name === item.name)
          if (index >= 0) arr1[index].checked = !arr1[index].checked
        })
        // 拖胆最多只能选择5个
        if (arr2.length > 5) {
          if (curItem.checked) {
            if (curItem.name === 1) arr2[1].checked = false
            else arr2[0].checked = false
          }
        }
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
   * @memberof K3
   */
  calcBetNumber(playid, one, two) {
    // const func = getCalcFuncByPlayID(playid)
    if (
      [1, 15, 7, 14].includes(playid)
      // "和值" "三同号" "二同号" "两面玩法"
    ) {
      return CalcObj.get(playid).calcFunc(one)
    } else {
      return CalcObj.get(playid).calcFunc(two)
    }
  }

  /**
   * 取球函数
   * 获取选中球抽象
   * @param { Array } arr
   * @returns 选中球的值
   * @memberof K3
   */
  getValues(arr) {
    return arr.filter(x => x.checked).map(x => x.value)
  }

  /**
   * 获取选中球
   *
   * @param { Array } dataSet 数据源
   * @returns 一维数组放one 二维数组放two,一般是胆拖
   * @memberof K3
   */
  getCheckedBalls(dataSet) {
    let one = []
    if (dataSet.length === 1) one = this.getValues(dataSet[0].data)
    else {
      one = dataSet.reduce((x, y) => {
        const _one = this.getValues(x.data)
        // console.log(x.data, _one)
        if (y) return _one.concat(this.getValues(y.data))
        return _one
      })
    }
    const two =
      dataSet.length > 1
        ? [
          this.getValues(dataSet[0].data).join('|'),
          this.getValues(dataSet[1].data).join('|')
        ]
        : []

    return {
      one,
      two
    }
  }

  // 获取显示球
  getShowLabels(dataSet, playid) {
    const arr = []
    if ([1, 15].includes(playid)) {
      return labelUtil.getLabels(dataSet, ',', false, true)
    } else if ([5, 10].includes(playid)) {
      // 显示label ，单行
      return labelUtil.getLabels(dataSet, ',', true)
    } else if ([15].includes(playid)) {
      // 不显示label ，单行
      return labelUtil.getLabels(dataSet, ',', false)
    }
    const _arr = labelUtil.getLabels(dataSet)
    arr.push(_arr.join(' '))
    return arr
  }

  /**
   * 计算提交数据
   *
   * @param { Array } dataSet 数据源
   * @param { Number } playid 玩法ID
   * @param { Number } price 投注单价
   * @returns String 计算后的投注字符串
   * @memberof K3
   */
  getSubmitData(dataSet, playid, price) {
    const obj = this.getCheckedBalls(dataSet)
    let arr = []
    if ([1, 15, 7, 14].includes(playid)) {
      arr = obj.one.map(x => `${playid}#${price}#${x}`)
    } else if (obj.two.length) {
      arr = [`${playid}#${price}#${obj.two[0]}+${obj.two[1]}`]
    }
    return JSON.stringify(arr).replace('/\\/g', '')
  }

  /**
   * 组装提交数据
   *
   * @param {Object} { gameid, dataSet, playid, price, qishu, token }
   * @returns Object
   * @memberof K3
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

export default new K3()
