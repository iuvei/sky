// 8 定位
// 7 和值组合
const tpml1 = ['大', '小', '单', '双']
const tpml2 = ['大单', '小单', '大双', '小双']
const tmml3 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
// const tpml_nomrmal = ['千位', '百位', '十位', '个位']
// const values = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// 获取渲染列表
function getRenderRowList(playItem) {
  const playid = playItem.playid
  if ([1, 2, 3, 4, 8].includes(playid)) {
    return ['千位', '百位', '十位', '个位']
  } else if ([7].includes(playid)) {
    return ['总和值', '组合']
  } else if ([9].includes(playid)) {
    return ['千位', '百位'] // 前二
  } else if ([10].includes(playid)) {
    return ['千位', '百位', '十位'] // 前三
  } else if ([11].includes(playid)) {
    return ['十位', '个位'] // 后二
  } else if ([12].includes(playid)) {
    return ['百位', '十位', '个位'] // 后三
  } else if (playItem.content.length) {
    playItem.content.split('+')
  } else {
    return [playItem.playname]
  }
}

function getRowList(playid, arr) {
  if ([1, 2, 3, 4, 8].includes(playid)) {
    return ['千位', '百位', '十位', '个位']
  } else if ([7].includes(playid)) {
    return ['总和值', '组合']
  } else if ([9].includes(playid)) {
    return ['千位', '百位'] // 前二
  } else if ([10].includes(playid)) {
    return ['千位', '百位', '十位'] // 前三
  } else if ([11].includes(playid)) {
    return ['十位', '个位'] // 后二
  } else if ([12].includes(playid)) {
    return ['百位', '十位', '个位'] // 后三
  } else {
    return arr
  }
}

function getTemplate(rows, tpml) {
  return rows.map(x =>
    Object.assign(
      {},
      {
        name: x,
        options: tpml
      }
    )
  )
}

export function getField(playItem) {
  // const playid = playitem.playid
  const rows = getRenderRowList(playItem)
  let arr = []
  switch (playItem.playid) {
    case 7:
      arr = getTemplate(rows, tpml1)
      arr[1].options = tpml2
      return arr
    case 11:
    case 12:
    case 10:
    case 9:
    case 8:
      return getTemplate(rows, tpml1)
    default:
      return getTemplate(rows, tmml3)
  }
}

// const rowMap = new Map([
//   [1, { name: '一定位', rows: tpml_nomrmal}], 定位胆 一个一注
//   [2, { name: '二定复式', rows:tpml_nomrmal}], 定位胆 两行 两个一注
//   [3, { name: '三定复式', rows:tpml_nomrmal}], 定位胆 三行 三个一注
//   [4, { name: '四定复式', rows:tpml_nomrmal}], 定位胆 四行 四个一注
//   [5, { name: '二字现', rows:tpml_nomrmal} ], 一行 两个一注 +号连接
//   [6, { name: '三字现', rows:tpml_nomrmal} }], 一行 三个一注 +号连接
//   [7, { name: '和值组选', wanfa: '和值组选', template: '' }], 定位胆 一个一注
//   [8, { name: '定位大小单双', wanfa: '定位大小单双', template: '' }], 定位胆 一个一注
//   [10, { name: '前三大小单双', wanfa: '前三大小单双', template: '' }], 多行，每行必选 + |
//   [12, { name: '后三大小单双', wanfa: '后三大小单双', template: '' }] 多行，每行必选 + |
// ])

export function getFields(playid, arr) {
  const rows = getRowList(playid, arr)
  switch (playid) {
    case 7:
      arr = getTemplate(rows, tpml1)
      arr[1].options = tpml2
      return arr
    case 11:
    case 12:
    case 10:
    case 9:
    case 8:
      return getTemplate(rows, tpml1)
    default:
      return getTemplate(rows, tmml3)
  }
}
