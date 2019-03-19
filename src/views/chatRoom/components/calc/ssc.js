import getFields from '../../../gouCai/lottery/shishicai/components/fields'
import { CalcObj } from '~/js/touzhu/touzhu.ssc.calc'
import danshiUtil from '~/js/touzhu/danshi.util'
import getDwdArr from '~/js/touzhu/util'
import labelUtil from '~/js/touzhu/getLabels'
class SSC {
  getValue(obj, i, j) {
    return obj.values ? obj.values[j] : i * obj.option.length + j
  }

  /**
   * 是否显示快捷选球
   *
   * @param { Number } playid 玩法ID
   * @returns Boolean
   * @memberof SSC
   */
  showActions(playid) {
    // debugger
    if (
      [18, 32, 114, 128, 129, 130, 131, 30, 44, 16, 122, 40].includes(playid)
    ) {
      return false
    }
    return true
  }

  /**
   * 获取选球数据
   *
   * @param { Number } playid 玩法ID
   * @param { Array } odds 赔率数组
   * @returns { Array } 选球模板数据源
   * @memberof SSC
   */
  getBalls(playid, odds, columns = []) {
    columns = getFields(playid, columns)
    return columns.map((item, i) => ({
      name: item.name,
      data: (item.options || item.option).map((x, index) => ({
        name: x.name || x,
        checked: false,
        peilv: odds && odds.length > 2 ? odds[index] : '-',
        playid,
        type: 2, // 1为圆球， 2为方框，3为中方框，4为大方框
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
   * @memberof SSC
   */
  mutex(dataSet, name, curItem) {
    // 组选包胆只能选一个
    if ([16, 30, 112, 122, 40].includes(curItem.playid)) {
      dataSet[0].data
        .filter(x => x.value !== curItem.value && x.checked)
        .forEach(x => x.checked = false)
    }
    // return true
  }

  /**
   * 计算注数
   *
   * @param { Number } playid 玩法ID
   * @param { Array } one 一维数组
   * @param { Array } two 二维数组
   * @param { String } danshiExcl 单式字符串
   * @returns Number 计算的出的注数
   * @memberof SSC
   */
  calcBetNumber(playid, one, two, danshiExcl = '') {
    // 计算单式
    if (danshiUtil.isSingleMode('ssc', playid)) {
      danshiExcl = danshiExcl
        .split(' ')
        .join('|')
        .split(',')
      return CalcObj.get(playid).clacFn(danshiExcl)
    }
    if ([128, 129, 131].includes(playid)) {
      return CalcObj.get(playid).clacFn(one)
    } else if ([41].includes(playid)) {
      // 定位胆 数字盘
      two = getDwdArr(two).filter(x => x.length)
      return CalcObj.get(playid).clacFn(two)
    } else if (two.length) {
      return CalcObj.get(playid).clacFn(two)
    } else {
      return CalcObj.get(playid).clacFn(one)
    }
  }

  /**
   * 取球函数
   * 获取选中球抽象
   * @param { Array } arr
   * @returns 选中球的值
   * @memberof SSC
   */
  getValues(arr) {
    return arr.filter(x => x.checked).map(x => x.value)
  }

  /**
   * 获取选中球
   *
   * @param { Array } dataSet 数据源
   * @returns 一维数组放one 二维数组放two,一般是胆拖,多行每行相同数据也放two
   * @memberof SSC
   */
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
    // const arr = []
    if (danshiUtil.isSingleMode('ssc', playid)) {
      return labelUtil.getDanshiLabels(danshiStr)
    } else {
      if ([128, 129].includes(playid)) {
        return labelUtil.getLabels(dataSet, ',', true, true)
      } else if ([131].includes(playid)) {
        return labelUtil.getLabels(dataSet, ',', false, true)
      } else if (dataSet.length === 1) {
        return labelUtil.getLabels(dataSet)
      } else {
        // 多行显示
        return labelUtil.getLabels(dataSet, ',', true)
      }
    }
  }

  /**
   * 获取单式提示信息
   * @param { Number } playid 玩法ID
   * @returns String 单式 placeholder
   * @memberof Elevenx5
   */
  getPlaceHolder(playid) {
    switch (playid) {
      case 2:
        return '1 2 3 4 5'
      case 4:
      case 95:
        return '1 2 3 4'
      case 6:
      case 20:
      case 102:
      case 13:
      case 27:
      case 109:
        return '0 1 2'
      case 11:
      case 25:
      case 107:
        return '1 1 2'
      case 34:
      case 38:
      case 116:
      case 120:
        return '1 2'
    }
  }

  /**
   * 计算提交数据
   *
   * @param { Array } dataSet 数据源
   * @param { Number } playid 玩法ID
   * @param { Number } price 投注单价
   * @param { String } danshiExcl 单式字符串
   * @returns String 计算后的投注字符串
   * @memberof 11x5
   */
  getSubmitData(dataSet, playid, price, danshiExcl = '') {
    // 如果是单式
    if (danshiUtil.isSingleMode('ssc', playid) && danshiExcl.length) {
      const arr = danshiExcl.split(',')
      const _arr = arr.map(x => `${playid}#${price}#${x.replace(/\s/g, '|')}`)
      return JSON.stringify(_arr).replace('/\\/g', '')
    } else {
      const obj = this.getCheckedBalls(dataSet)
      let arr = []
      if ([41].includes(playid)) {
        const two = getDwdArr(obj.two).filter(x => x.length)
        arr = [`${playid}#${price}#${two.reduce((a, b) => a + '+' + b)}`]
      } else if ([128, 129, 18, 32, 114, 131].includes(playid)) {
        // 双面盘是多赔率，需要拆成每一注
        // 18 32 114特殊号
        arr = obj.one.map(x => `${playid}#${price}#${x}`)
      } else if (obj.two.length) {
        arr = [`${playid}#${price}#${obj.two.reduce((a, b) => a + '+' + b)}`]
      } else if ([1, 6, 11, 21].includes(playid)) {
        // 多行每行多个相同号码 如：五星直选复式
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

export default new SSC()
