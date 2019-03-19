import getFields from '../../../gouCai/lottery/elevenx5/components/fields'
import { CalcObj } from '~/js/touzhu/touzhu.11x5.calc'
import getDwdArr from '~/js/touzhu/util'
import danshiUtil from '../../../gouCai/lottery/elevenx5/components/danshi.util'
import labelUtil from '~/js/touzhu/getLabels'
class Elevenx5 {
  getValue(obj, i, j) {
    return obj.values ? obj.values[j] : i * obj.options.length + j
  }

  showActions(playid) {
    return ![54, 56, 57].includes(playid)
  }

  // 获取选球数据
  getBalls(playid, odds, columns = []) {
    columns = getFields(playid, columns)
    return columns.map((item, i) => ({
      name: item.name,
      data: item.options.map((x, index) => ({
        name: x.name || x,
        checked: false,
        peilv: odds && odds.length > 2 ? odds[index] : '-',
        playid,
        type: 2, // 1为圆球， 2为方框，3为中方框，4为大方框
        value: this.getValue(item, i, index)
      }))
    }))
  }

  // 号码选择互斥
  mutex(dataSet, name, curItem) {
    if (name.indexOf('胆码') !== -1 || name.indexOf('拖码') !== -1) {
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
        if (curItem.playid === 51 && arr1.length > 7) {
          arr1.filter(x => x.name !== curItem.name)[0].checked = false
        } else if (curItem.playid === 50 && arr1.length > 6) {
          arr1.filter(x => x.name !== curItem.name)[0].checked = false
        } else if (curItem.playid === 49 && arr1.length > 5) {
          arr1.filter(x => x.name !== curItem.name)[0].checked = false
        } else if (curItem.playid === 48 && arr1.length > 4) {
          arr1.filter(x => x.name !== curItem.name)[0].checked = false
        } else if (curItem.playid === 47 && arr1.length > 3) {
          arr1.filter(x => x.name !== curItem.name)[0].checked = false
        } else if (curItem.playid === 46 && arr1.length > 2) {
          arr1.filter(x => x.name !== curItem.name)[0].checked = false
        } else if (curItem.playid === 45 && arr1.length > 1) {
          arr1.filter(x => x.name !== curItem.name)[0].checked = false
        }
      }
      // 如果是第二行点击，则第一行球消失
      if (name === dataSet[1].name) {
        arr2.forEach(item => {
          const index = arr1.findIndex(x => x.name === item.name)
          if (index >= 0) arr1[index].checked = !arr1[index].checked
        })
      }
    }
  }

  // 计算注数
  calcBetNumber(playid, one, two, danshiExcl = '') {
    // 计算单式
    if (danshiUtil.danshiArr.includes(playid)) {
      danshiExcl = danshiExcl
        .split(' ')
        .join('|')
        .split(',')
      return CalcObj.get(playid).calcFn(danshiExcl)
    }
    if ([3, 8, 13, 18, 23].includes(playid)) {
      return CalcObj.get(playid).calcFn(one)
    } else if ([1, 6, 11, 16, 21].includes(playid)) {
      return CalcObj.get(playid).calcFn(two)
    } else if (
      [5, 10, 15, 20, 25, 45, 46, 47, 48, 49, 50, 51].includes(playid)
    ) {
      return CalcObj.get(playid).calcFn(two)
    } else if ([26, 27, 28].includes(playid)) {
      return CalcObj.get(playid).calcFn(one)
    } else if ([29].includes(playid)) {
      // 定位胆单独处理
      two = getDwdArr(two).filter(x => x.length)
      return CalcObj.get(playid).calcFn(two)
    } else {
      return CalcObj.get(playid).calcFn(one)
    }
  }

  // 取球函数
  getValues(arr) {
    return arr.filter(x => x.checked).map(x => x.value)
  }

  // 获取选中球
  getCheckedBalls(dataSet) {
    let one = []
    dataSet.forEach(x => {
      one.push(this.getValues(x.data))
    })
    one = one.reduce((a, b) => a.concat(b))
    const two =
      dataSet.length > 1
        ? [...dataSet.map(x => this.getValues(x.data).join('|'))]
        : []

    return {
      one,
      two
    }
  }

  // 获取显示球
  getShowLabels(dataSet, playid, danshiStr = '') {
    if (danshiUtil.danshiArr.includes(playid)) {
      return labelUtil.getDanshiLabels(danshiStr)
    } else {
      if ([56, 57].includes(playid)) {
        return labelUtil.getLabels(dataSet, ',', true, true)
      } else if (dataSet.length === 1) {
        // 单行不显示
        return labelUtil.getLabels(dataSet)
      } else {
        // 多行显示
        return labelUtil.getLabels(dataSet, ',', true)
      }
      // else if ([16, 18, 21, 25, 29, 46, 54, 1].includes(playid)) {
      //   return labelUtil.getLabels(dataSet, ',', true)
      // } else if ([23, 26, 27, 28].includes(playid)) {
      //   return labelUtil.getLabels(dataSet, ',', false)
      // }
      // else return labelUtil.getLabels(dataSet)
    }
  }

  /**
   * 获取单式提示信息
   * @param { Number } playid 玩法ID
   * @returns String 单式 placeholder
   * @memberof Elevenx5
   */
  getPlaceHolder(playid) {
    console.log('getPlaceHolder', danshiUtil.getPlaceHolder(playid))
    return danshiUtil.getPlaceHolder(playid)
  }

  /**
   * 计算提交数据
   * 单赔率是一行，多赔率需要单独拆分每一注
   * @param { Array } dataSet 数据源
   * @param { Number } playid 玩法ID
   * @param { Number } price 投注单价
   * @param { String } danshiExcl 单式字符串
   * @returns String 计算后的投注字符串
   * @memberof 11x5
   */
  getSubmitData(dataSet, playid, price, danshiExcl = '') {
    // 如果是单式
    if (danshiUtil.danshiArr.includes(playid) && danshiExcl.length) {
      const arr = danshiExcl.split(',')
      const _arr = arr.map(x => `${playid}#${price}#${x.replace(/\s/g, '|')}`)
      return JSON.stringify(_arr).replace('/\\/g', '')
    } else {
      const obj = this.getCheckedBalls(dataSet)
      let arr = []
      if ([29].includes(playid)) {
        // 定位胆
        const two = getDwdArr(obj.two).filter(x => x.length)
        arr = [`${playid}#${price}#${two.reduce((a, b) => a + '+' + b)}`]
      } else if ([54, 56, 57].includes(playid)) {
        // 双面盘是多赔率，需要拆成每一注
        arr = obj.one.map(x => `${playid}#${price}#${x}`)
      } else if (obj.two.length) {
        arr = [`${playid}#${price}#${obj.two.reduce((a, b) => a + '+' + b)}`]
      } else if ([1, 6, 11, 16, 21].includes(playid)) {
        // 多行每行多个相同号码
        const str = obj.two.reduce((a, b) => a + '+' + b)
        arr = [`${playid}#${price}#${str}`]
      } else {
        arr = [`${playid}#${price}#${obj.one.join('+')}`]
      }
      return JSON.stringify(arr).replace('/\\/g', '')
    }
  }

  /**
   * 组装提交数据
   *
   * @param {Object} { gameid, dataSet, danshiExcl, playid, price, qishu, token }
   * @returns Object 提交的数据
   * @memberof 11x5
   */
  assemblyBetData({
    gameid,
    dataSet,
    danshiExcl,
    playid,
    price,
    qishu,
    token
  }) {
    // console.error('getData', this.getData(dataSet, playid, price))
    return {
      gameid,
      qishu,
      data: this.getSubmitData(dataSet, playid, price, danshiExcl),
      auto: 1,
      stop: 1,
      multiple: 1,
      form_unique_token: token
    }
  }
}

export default new Elevenx5()
