const template_normal = [
  {
    name: '',
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  }
]
const template_smp = [
  {
    name: '总和值',
    options: ['大', '小', '单', '双', '尾大', '尾小'],
    values: [0, 1, 2, 3, 4, 5]
  },
  {
    name: '后二和值',
    options: ['大', '小', '单', '双'],
    values: [6, 7, 8, 9]
  },
  {
    name: '号码一',
    options: ['大', '小', '单', '双'],
    values: [10, 11, 12, 13]
  },
  {
    name: '号码二',
    options: ['大', '小', '单', '双'],
    values: [14, 15, 16, 17]
  },
  {
    name: '号码三',
    options: ['大', '小', '单', '双'],
    values: [18, 19, 20, 21]
  },
  {
    name: '号码四',
    options: ['大', '小', '单', '双'],
    values: [22, 23, 24, 25]
  },
  {
    name: '号码五',
    options: ['大', '小', '单', '双'],
    values: [26, 27, 28, 29]
  }
]
const template_nn = [
  {
    name: '',
    options: [
      '牛一',
      '牛二',
      '牛三',
      '牛四',
      '牛五',
      '牛六',
      '牛七',
      '牛八',
      '牛九',
      '牛牛',
      '无牛',
      '有牛',
      '牛大',
      '牛小',
      '牛单',
      '牛双'
    ]
  }
]
const template_lhd = [
  {
    name: '一位、二位',
    options: ['龙', '虎']
  },
  {
    name: '一位、三位',
    options: ['龙', '虎']
  },
  {
    name: '一位、四位',
    options: ['龙', '虎']
  },
  {
    name: '一位、五位',
    options: ['龙', '虎']
  },
  {
    name: '二位、三位',
    options: ['龙', '虎']
  },
  {
    name: '二位、四位',
    options: ['龙', '虎']
  },
  {
    name: '二位、五位',
    options: ['龙', '虎']
  },
  {
    name: '三位、四位',
    options: ['龙', '虎']
  },
  {
    name: '三位、五位',
    options: ['龙', '虎']
  },
  {
    name: '四位、五位',
    options: ['龙', '虎']
  }
]

const getFields = (playid, arr) => {
  let _arr = []
  if (playid === 54) {
    _arr = template_lhd
  } else if (playid === 56) {
    _arr = template_smp
  } else if (playid === 57) {
    _arr = template_nn
  } else {
    _arr = arr.map(x => ({
      name: x,
      options: template_normal[0].options,
      values: template_normal[0].values
    }))
  }
  return _arr
}

export default getFields
