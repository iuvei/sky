import getFields from '../../../gouCai/lottery/pk10/components/fields'
import { CalcObj } from '~/js/touzhu/touzhu.pk10.calc'
import getDwdArr from '~/js/touzhu/util'
import labelUtil from '~/js/touzhu/getLabels'
class PK10 {
  getPlaceHolder(playid) {
    switch (playid) {
      case 3:
        return '1 2'
      case 5:
        return '1 2 3'
    }
  }
  getShowType(rowName, name) {
    // 1为圆球， 2为方框，3为中方框，4为大方框
    if (name === '三同号通选') {
      return 4
    } else if (rowName === '单选') return 3
    else if (rowName === '复选') return 3
    return 2
  }

  getValue(obj, i, j) {
    return obj.values ? obj.values[j] : i * obj.options.length + j
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

  // 计算注数
  calcBetNumber(playid, one, two, danshiExcl = '') {
    // 计算单式
    if ([3, 5].includes(playid)) {
      danshiExcl = danshiExcl
        .split(' ')
        .join('|')
        .split(',')
      return CalcObj.get(playid).calcFunc(danshiExcl)
    }
    if ([1, 7].includes(playid)) {
      return CalcObj.get(playid).calcFunc(one)
    } else if ([2, 4].includes(playid)) {
      return CalcObj.get(playid).calcFunc(two)
    } else if ([6, 14, 15].includes(playid)) {
      two = getDwdArr(two).filter(x => x.length)
      return CalcObj.get(playid).calcFunc(two)
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
    if ([3, 5].includes(playid)) {
      // 单式
      return labelUtil.getDanshiLabels(danshiStr)
    } else if ([2, 4, 6, 14, 15].includes(playid)) {
      // 单行，显示label
      return labelUtil.getLabels(dataSet, ',', true)
    } else if ([7].includes(playid)) {
      return labelUtil.getLabels(dataSet, ',', false, true)
    } else {
      return labelUtil.getLabels(dataSet)
    }
  }

  getSubmitData(dataSet, playid, price, danshiExcl = '') {
    // 如果是单式
    if ([3, 5].includes(playid) && danshiExcl.length) {
      const arr = danshiExcl.split(',')
      const _arr = arr.map(x => `${playid}#${price}#${x.replace(/\s/g, '|')}`)
      return JSON.stringify(_arr).replace('/\\/g', '')
    } else {
      const obj = this.getCheckedBalls(dataSet)
      let arr = []
      if ([1, 7].includes(playid)) {
        arr = obj.one.map(x => `${playid}#${price}#${x}`)
      } else if ([2, 4].includes(playid)) {
        obj.two = obj.two.join('+')
        arr = [`${playid}#${price}#${obj.two}`]
      } else {
        const zhushu = getDwdArr(obj.two).filter(x => x.length)
        arr = [`${playid}#${price}#${zhushu.join('+')}`]
      }
      return JSON.stringify(arr).replace('/\\/g', '')
    }
  }

  // 组装提交数据
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

export default new PK10()
