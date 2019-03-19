const lhd_template = [
  {
    name: '百、十',
    options: [
      { name: '龙', checked: false, value: 0 },
      { name: '虎', checked: false, value: 1 },
      { name: '和', checked: false, value: 2 }
    ]
  },
  {
    name: '百、个',
    options: [
      { name: '龙', checked: false, value: 3 },
      { name: '虎', checked: false, value: 4 },
      { name: '和', checked: false, value: 5 }
    ]
  },
  {
    name: '拾、个',
    options: [
      { name: '龙', checked: false, value: 6 },
      { name: '虎', checked: false, value: 7 },
      { name: '和', checked: false, value: 8 }
    ]
  }
]

const smp_template = [
  {
    name: '总和值',
    options: [
      { name: '大', checked: false, value: 0 },
      { name: '小', checked: false, value: 1 },
      { name: '单', checked: false, value: 2 },
      { name: '双', checked: false, value: 3 },
      { name: '尾大', checked: false, value: 4 },
      { name: '尾小', checked: false, value: 5 }
    ]
  },
  {
    name: '后二和值',
    options: [
      { name: '大', checked: false, value: 6 },
      { name: '小', checked: false, value: 7 },
      { name: '单', checked: false, value: 8 },
      { name: '双', checked: false, value: 9 },
      { name: '中', checked: false, value: 10 }
    ]
  },
  {
    name: '百位',
    options: [
      { name: '大', checked: false, value: 11 },
      { name: '小', checked: false, value: 12 },
      { name: '单', checked: false, value: 13 },
      { name: '双', checked: false, value: 14 }
    ]
  },
  {
    name: '十位',
    options: [
      { name: '大', checked: false, value: 15 },
      { name: '小', checked: false, value: 16 },
      { name: '单', checked: false, value: 17 },
      { name: '双', checked: false, value: 18 }
    ]
  },
  {
    name: '个位',
    options: [
      { name: '大', checked: false, value: 19 },
      { name: '小', checked: false, value: 20 },
      { name: '单', checked: false, value: 21 },
      { name: '双', checked: false, value: 22 }
    ]
  }
]

const template_default = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  template_sum = [0, 27],
  template_zu6 = [3, 24],
  template_zu3 = [1, 26]

const getTemplateByRange = template => {
  const arr = []
  if (!template.length && template.length !== 2) {
    return []
  }
  for (let i = template[0]; i <= template[1]; i++) {
    arr.push(i)
  }
  return arr
}

const getFields = (playid, arr) => {
  let ballsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const ballsList2 = ['大', '小', '单', '双']
  switch (playid) {
    case 26: // 双面盘
      return smp_template
    case 27: // 龙虎斗
      return lhd_template
    case 15: // 单双
    case 16:
      ballsList = ballsList2
      return
    case 3: // 三星直选和值
      ballsList = getTemplateByRange(template_sum)
      break
    case 7: // 组六和值
      ballsList = getTemplateByRange(template_zu6)
      break
    case 6: // 组三和值
      ballsList = getTemplateByRange(template_zu3)
      break
    default:
      ballsList = template_default
      break
  }
  return arr.map(x => ({
    name: x,
    options: ballsList,
    values: ballsList
  }))
}

export default getFields
