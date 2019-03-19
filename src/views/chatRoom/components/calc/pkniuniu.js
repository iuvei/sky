import labelUtil from '~/js/touzhu/getLabels'
const dataMap = [
  {
    name: '牛牛',
    options: ['闲一', '闲二', '闲三', '闲四', '闲五']
  }
]
class PKNIUNIU {
  getValue(obj, i, j) {
    return obj.values ? obj.values[j] : i * obj.options.length + j
  }

  // 获取选球数据
  getBalls(playid, odds, columns) {
    columns = dataMap
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
  calcBetNumber(playid, one) {
    console.log(one)
    return one.length
  }

  // 取球函数
  getValues(arr) {
    return arr
      .filter(x => x.checked)
      .map(x => x.value.toString().replace(/\s/g, ''))
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
  getShowLabels(dataSet) {
    return labelUtil.getLabels(dataSet, ',', false, true)
  }

  getSubmitData(dataSet, playid, price) {
    const obj = this.getCheckedBalls(dataSet)
    const arr = []
    obj.one.map(x => arr.push(`${playid}#${price}#${x}`))
    // ["1#5#0","1#5#1"]
    console.log(arr)
    return JSON.stringify(arr).replace('/\\/g', '')
  }

  // 组装提交数据
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

export default new PKNIUNIU()
