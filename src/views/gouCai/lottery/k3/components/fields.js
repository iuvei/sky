// 和值
const template_hz = [
  {
    name: '',
    option: [
      '大',
      '小',
      '单',
      '双',
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
      18
    ]
  }
]
// 复选
const template_fx = [
  {
    name: '复选',
    option: ['1 1', '2 2', '3 3', '4 4', '5 5', '6 6'],
    values: [1, 2, 3, 4, 5, 6]
  }
]
// 胆拖
const template_dt = [
  {
    name: '胆码',
    option: [1, 2, 3, 4, 5, 6],
    values: [1, 2, 3, 4, 5, 6]
  },
  {
    name: '拖码',
    option: [1, 2, 3, 4, 5, 6],
    values: [1, 2, 3, 4, 5, 6]
  }
]
// 三同号
const template_sth = [
  {
    name: '通选',
    option: ['三同号通选']
  },
  {
    name: '单选',
    option: ['1 1 1', '2 2 2', '3 3 3', '4 4 4', '5 5 5', '6 6 6'],
    values: [1, 2, 3, 4, 5, 6]
  }
]
// 双面盘
const template_smp = [
  {
    name: '号码一',
    option: ['大', '小', '单', '双']
  },
  {
    name: '号码二',
    option: ['大', '小', '单', '双']
  },
  {
    name: '号码三',
    option: ['大', '小', '单', '双']
  },
  {
    name: '混合',
    option: ['半顺', '红号', '大红', '小红']
  }
]

const map = new Map([
  [1, { template: template_hz, typeNum: 0 }],
  [7, { template: template_fx, typeNum: 1 }],
  [5, { template: template_dt, typeNum: 0 }],
  [10, { template: template_dt, typeNum: 0 }],
  [15, { template: template_sth, typeNum: 1 }],
  [14, { template: template_smp, typeNum: 0 }]
])

const getFields = playid => map.get(playid)

export default getFields
