const template1_normal = [
  {
    name: '',
    options: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
]
const template_gyh = [
  {
    name: '冠亚和',
    options: [
      '大',
      '小',
      '单',
      '双',
      '中',
      '和',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19'
    ]
  }
]

const templates_smp = [
  {
    name: '冠军',
    options: ['大', '小', '单', '双', '龙', '虎'],
    values: [0, 1, 2, 3, 4, 5]
  },
  {
    name: '亚军',
    options: ['大', '小', '单', '双', '龙', '虎'],
    values: [0, 1, 2, 3, 4, 5]
  },
  {
    name: '季军',
    options: ['大', '小', '单', '双', '龙', '虎'],
    values: [0, 1, 2, 3, 4, 5]
  },
  {
    name: '第四名',
    options: ['大', '小', '单', '双', '龙', '虎'],
    values: [0, 1, 2, 3, 4, 5]
  },
  {
    name: '第五名',
    options: ['大', '小', '单', '双', '龙', '虎'],
    values: [0, 1, 2, 3, 4, 5]
  },
  {
    name: '第六名',
    options: ['大', '小', '单', '双'],
    values: [0, 1, 2, 3]
  },
  {
    name: '第七名',
    options: ['大', '小', '单', '双'],
    values: [0, 1, 2, 3]
  },
  {
    name: '第八名',
    options: ['大', '小', '单', '双'],
    values: [0, 1, 2, 3]
  },
  {
    name: '第九名',
    options: ['大', '小', '单', '双'],
    values: [0, 1, 2, 3]
  },
  {
    name: '第十名',
    options: ['大', '小', '单', '双'],
    values: [0, 1, 2, 3]
  }
]

const getFields = (playid, arr) => {
  let _arr = []
  if (
    [1, 2, 3, 4, 5, 6, 15].includes(playid)
    // wanfa.includes("直选") ||
    // wanfa.includes("定位胆") ||
    // wanfa.includes("数字盘")
  ) {
    _arr = arr.map(x => ({
      name: x,
      options: template1_normal[0].options,
      values: template1_normal[0].values
    }))
  } else if ([14].includes(playid)) {
    // 双面盘
    arr.forEach((item, index) => {
      const _item = {
        name: item,
        options: templates_smp[index].options,
        values: templates_smp[index].values
      }
      _arr.push(_item)
    })
  } else if ([7].includes(playid)) {
    // 冠亚和
    _arr = template_gyh
  }
  return _arr
}

export default getFields
