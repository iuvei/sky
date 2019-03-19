import labelUtil from '~/js/touzhu/getLabels'
const dataMap_Special = [
  {
    name: '特码大小单双',
    options: [
      '大',
      '小',
      '单',
      '双',
      '大单',
      '小单',
      '大双',
      '小双',
      '极大',
      '极小'
    ]
  },
  {
    name: '色波/豹子',
    options: ['红波', '绿波', '蓝波', '豹子']
  }
]

const dataMap_Number = [
  {
    name: '',
    options: [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27
    ]
  }
]
class PCDD {
  getValue(obj, i, j) {
    return obj.values ? obj.values[j] : i * 10 + j
  }

  setValue(j) {
    return 10 + j
  }

  // 获取选球数据
  getBalls(playid, odds, columns) {
    if (playid === 3) {
      columns = dataMap_Special
    } else {
      columns = dataMap_Number
    }
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
  mutex(dataSet, curItem) {
    // 包三最多只能选三个
    if (curItem.playid === 2) {
      const arr = dataSet[0].data.filter(x => x.checked)
      if (arr.length > 3) {
        arr.filter(x => x.name !== curItem.name)[0].checked = false
      }
    }
  }

  // 计算注数
  calcBetNumber(playid, one) {
    console.log(one)
    if (playid === 2) {
      return one.length > 2 ? 1 : 0
    } else if ([1, 3].includes(playid)) {
      return one.length
    }
    return 0
  }

  // 取球函数
  getValues(arr) {
    return arr
      .filter(x => x.checked)
      .map(x => x.value.toString().replace(/\s/g, ''))
  }
  // "2#5#1+4+9"
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
  getShowLabels(dataSet, playid) {
    if ([1, 3].includes(playid)) {
      // 多行显示
      return labelUtil.getLabels(dataSet, ',', false, true)
    }
    return labelUtil.getLabels(dataSet, ',', false)
  }

  getSubmitData(dataSet, playid, price) {
    const obj = this.getCheckedBalls(dataSet)
    let arr = []
    if (playid === 2) {
      obj.one = obj.one.join('+')
      arr = [`${playid}#${price}#${obj.one}`]
    } else {
      obj.one.map(x => arr.push(`${playid}#${price}#${x}`))
    }
    return JSON.stringify(arr).replace('/\\/g', '')
  }

  // 组装提交数据
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

export default new PCDD()
