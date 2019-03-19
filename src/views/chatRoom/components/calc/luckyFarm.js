import labelUtil from '~/js/touzhu/getLabels'
// 双面盘 下注标签名
const labels_1 = [
  '总和大',
  '总和小',
  '总和单',
  '总和双',
  '总和尾大',
  '总和尾小',
  '龙',
  '虎'
]
const labels_2 = ['大', '小', '单', '双', '尾大', '尾小', '合数单', '合数双']
// 第1-8球 下注标签名
const labels_3 = [
  '1 号',
  '2 号',
  '3 号',
  '4 号',
  '5 号',
  '6 号',
  '7 号',
  '8 号',
  '9 号',
  '10 号',
  '11 号',
  '12 号',
  '13 号',
  '14 号',
  '15 号',
  '16 号',
  '17 号',
  '18 号',
  '19 号',
  '20 号',
  '大',
  '小',
  '单',
  '双',
  '尾大',
  '尾小',
  '合数单',
  '合数双',
  '东',
  '南',
  '西',
  '北',
  '中',
  '发',
  '白'
]

// 下注主体结构
const mainStructure = {
  1: [
    {
      name: '总和',
      data: [{ name: '总和大', checked: false, value: 0 }]
    },
    {
      name: '第一球',
      data: []
    },
    {
      name: '第二球',
      data: []
    },
    {
      name: '第三球',
      data: []
    },
    {
      name: '第四球',
      data: []
    },
    {
      name: '第五球',
      data: []
    },
    {
      name: '第六球',
      data: []
    },
    {
      name: '第七球',
      data: []
    },
    {
      name: '第八球',
      data: []
    }
  ],
  2: [
    {
      name: '第一球',
      data: []
    }
  ],
  3: [
    {
      name: '第二球',
      data: []
    }
  ],
  4: [
    {
      name: '第三球',
      data: []
    }
  ],
  5: [
    {
      name: '第四球',
      data: []
    }
  ],
  6: [
    {
      name: '第五球',
      data: []
    }
  ],
  7: [
    {
      name: '第六球',
      data: []
    }
  ],
  8: [
    {
      name: '第七球',
      data: []
    }
  ],
  9: [
    {
      name: '第八球',
      data: []
    }
  ]
}

function initBetTxt() {
  Object.keys(mainStructure).forEach(pid => {
    mainStructure[pid].forEach(page => {
      let data = page.name === '总和' ? labels_1 : labels_2
      if (pid !== '1') {
        data = labels_3
      }
      let uid = 0
      page.data = data.map(option => ({
        name: option,
        checked: false,
        value: uid++
      }))
    })
  })
}
initBetTxt()
class Ladder {
  constructor() {
    this.mainStructure = mainStructure
  }
  getBalls(playid, odds) {
    // console.error('获取号码 %s', ...arguments)
    const balls = this.mainStructure[playid].map(item => {
      item.data.map((el, idx) => {
        el.playid = playid
        el.peilv = odds[idx] || odds[0] || '-'
        return el
      })
      return item
    })
    return balls
  }
  getSubmitData(dataSet, playid, price) {
    // console.error('提交数据 %s', ...arguments)
    const values = dataSet.map(item =>
      item.data
        .filter(el => el.checked)
        .map(el => el.value)
        .join('|')
    )
    let arr = []
    if (playid === 1) {
      const dwd_idx = values.reduce((f, el, idx) => (el ? 2 ** idx : 0) + f, 0)
      const value = dwd_idx + '+' + values.filter(el => el).join('+')
      arr = [`${playid}#${price}#${value}`]
    } else {
      arr = values
        .filter(el => el)
        .join('|')
        .split('|')
        .map(el => `${playid}#${price}#${el}`)
    }
    return JSON.stringify(arr).replace('/\\/g', '')
  }

  // 获取显示球
  getShowLabels(dataSet) {
    if (dataSet.length === 1) {
      return labelUtil.getLabels(dataSet, ',', false, true)
    }
    return labelUtil.getLabels(dataSet, ',', true, true)
  }

  /**
   * 组装提交数据
   *
   * @param {Object} { gameid, dataSet, playid, price, qishu, token }
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
