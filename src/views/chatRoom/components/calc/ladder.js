import labelUtil from '~/js/touzhu/getLabels'
const labels = ['左', '右', '三', '四', '单', '双', '单3', '双3', '单4', '双4']

class Ladder {
  getBalls(playid, odds) {
    // console.error('获取号码 %s', ...arguments)
    const data = labels.map((name, idx) => ({
      name,
      playid,
      peilv: odds[idx] || '-',
      value: idx,
      checked: false
    }))
    return [{ name: '', data }]
  }
  getSubmitData(dataSet, playid, price) {
    // console.error('提交数据 %s', ...arguments)
    const values = dataSet[0].data.filter(el => el.checked)
    const arr = values.map(el => `${playid}#${price}#${el.value}`)
    return JSON.stringify(arr).replace('/\\/g', '')
  }

  // 获取显示球
  getShowLabels(dataSet) {
    return labelUtil.getLabels(dataSet, ',', false, true)
  }

  /**
   * 组装提交数据
   *
   * @param {Object} { gameid, dataSet, danshiExcl, playid, price, qishu, token }
   * @returns Object 提交的数据
   * @memberof ladder
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

export default new Ladder()
