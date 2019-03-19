const template_smp = [
  {
    name: '总和值',
    options: ['大', '小', '单', '双']
  },
  {
    name: '后二和值',
    options: ['大', '小', '单', '双', '中']
  },
  {
    name: '万位',
    options: ['大', '小', '单', '双']
  },
  {
    name: '千位',
    options: ['大', '小', '单', '双']
  },
  {
    name: '百位',
    options: ['大', '小', '单', '双']
  },
  {
    name: '十位',
    options: ['大', '小', '单', '双']
  },
  {
    name: '个位',
    options: ['大', '小', '单', '双']
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
    name: '万、千',
    options: ['龙', '虎', '和']
  },
  {
    name: '万、百',
    options: ['龙', '虎', '和']
  },
  {
    name: '万、拾',
    options: ['龙', '虎', '和']
  },
  {
    name: '万、个',
    options: ['龙', '虎', '和']
  },
  {
    name: '千、百',
    options: ['龙', '虎', '和']
  },
  {
    name: '千、十',
    options: ['龙', '虎', '和']
  },
  {
    name: '千、个',
    options: ['龙', '虎', '和']
  },
  {
    name: '百、十',
    options: ['龙', '虎', '和']
  },
  {
    name: '百、个',
    options: ['龙', '虎', '和']
  },
  {
    name: '拾、个',
    options: ['龙', '虎', '和']
  }
]

// 18 32 114
const template_tsh = [
  {
    name: '特殊号',
    options: ['豹子', '顺子', '对子']
  }
]

const getTemplate = playid => {
  if (playid === 128) return template_smp
  if (playid === 129) return template_lhd
  if (playid === 131) return template_nn
  if ([114, 18, 32].includes(playid)) return template_tsh
  return [0]
}

const getArray = (number, flag) =>
  new Array(number).fill(0).map((x, i) => flag ? i + 1 : i)

function getValues(playid) {
  if ([117, 35, 59].includes(playid)) {
    // 二星直选和值
    return getArray(19)
  } else if ([8, 22, 104].includes(playid)) {
    // 三星直选和值
    return getArray(28)
  } else if ([39, 121, 131].includes(playid)) {
    // 二星组选和值
    return getArray(17, true)
  } else if ([18, 32, 114].includes(playid)) return [0, 1, 2]
  // 特殊号
  // 其他
  else return getArray(10)
}

const getFields = (playid, arr) => {
  const template = getTemplate(playid),
    values = getValues(playid)

  if (template[0].options) {
    return template.map(x => ({
      name: x.name,
      options: x.options,
      values
    }))
  } else {
    return arr.map(x => ({
      name: x,
      options: values,
      values
    }))
  }
}

export default getFields
