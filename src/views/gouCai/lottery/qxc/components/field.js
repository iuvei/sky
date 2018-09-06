// 8 定位
// 7 和值组合
const tpml1 = ['大', '小', '单', '双']
const tpml2 = ['大单', '小单', '大双', '小双']
const tmml3 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
// 获取渲染列表
function getRenderRowList(playItem) {
  const playid = playItem.playid
  if ([1, 2, 3, 4, 8].includes(playid)) {
    return ['千位', '百位', '十位', '个位']
  } else if ([7].includes(playid)) {
    return ['和值', '组合']
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
