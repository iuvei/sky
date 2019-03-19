import getFields from '../../../gouCai/lottery/puke/components/fields'
import { Pukecalc_zhushu } from '~/js/touzhu/touzhu.puke.calc'
// import labelUtil from '~/js/touzhu/getLabels'
const calczhushu = new Pukecalc_zhushu()
class PUKE {
  getValue(obj, i, j) {
    return obj.values ? obj.values[j] : i * obj.options.length + j
  }

  // 获取选球数据
  getBalls(playid, odds, columns = []) {
    columns = getFields(playid, columns)
    return columns.map((item, i) => ({
      name: item.name || '',
      data: item.data,
      checked: false,
      peilv: odds && odds.length ? odds[i] : '-',
      playid,
      value: item.value
    }))
  }

  // 计算注数
  calcBetNumber(playid, one) {
    // 计算单式
    const len = one.length
    if ([1, 2, 3, 4, 5, 6, 7].includes(playid)) {
      return calczhushu.calc_danchengzhu(len)
    } else if ([8].includes(playid)) {
      return calczhushu.calc_renxuantwo(len)
    } else if ([9].includes(playid)) {
      return calczhushu.calc_renxuanthree(len)
    } else if ([10].includes(playid)) {
      return calczhushu.calc_renxuanfour(len)
    } else if ([11].includes(playid)) {
      return calczhushu.calc_renxuanfive(len)
    } else {
      return calczhushu.clac_renxunasix(len)
    }
  }

  // 取球函数
  getValues(arr) {
    return arr.filter(x => x.checked)
  }

  // 获取选中球
  getCheckedBalls(dataSet, playid) {
    let one = [] // 任选一，单选，包选的投注
    const two = [] // 任选二及以上的投注
    one.push(this.getValues(dataSet))
    one = one.reduce((a, b) => a.concat(b))
    if (playid > 7) {
      one.forEach(x => two.push(x.value))
    }

    return {
      one,
      two
    }
  }

  // 获取显示球
  getShowLabels(dataSet, playid) {
    if ([5, 6].includes(playid)) {
      const arr = ['黑桃', '红心', '梅花', '方块']
      dataSet.forEach((x, i) => x.name = arr[i])
    }

    if (!dataSet[0].name.length) {
      dataSet.forEach(x => {
        x.name = Array.isArray(x.data)
          ? x.data.map(y => y.replace('card_', '')).join(' ')
          : x.data.replace('card_', '')
      })
    }
    if (playid > 7) {
      return [
        dataSet
          .filter(x => x.checked)
          .map(x => x.name)
          .join(',')
      ]
    }
    return dataSet.filter(x => x.checked).map(x => x.name)
  }

  /**
   * 计算提交数据
   * 单赔率是一行，多赔率需要单独拆分每一注
   * @param { Array } dataSet 数据源
   * @param { Number } playid 玩法ID
   * @param { Number } price 投注单价
   * @returns String 计算后的投注字符串
   * @memberof 11x5
   */
  // ["1#50#4", "1#50#3", "1#50#2", "1#50#1", "1#50#0"]
  getSubmitData(dataSet, playid, price) {
    const obj = this.getCheckedBalls(dataSet, playid)
    let arr = []
    if ([1, 2, 3, 4, 5, 6, 7].includes(playid)) {
      arr = obj.one.map(x => `${playid}#${price}#${x.value}`)
    } else {
      arr = [`${playid}#${price}#${obj.two.join('+')}`]
    }
    return JSON.stringify(arr).replace('/\\/g', '')
  }

  /**
   * 组装提交数据
   *
   * @param {Object} { gameid, dataSet, danshiExcl, playid, price, qishu, token }
   * @returns Object 提交的数据
   * @memberof 11x5
   */
  assemblyBetData({ gameid, dataSet, playid, price, qishu, token }) {
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

export default new PUKE()
