const { RenderTypes } = require('./commonTypes')

// 根据名称获取计算注数的方法
const getCalcFuncByName = name => {
  switch (name) {
    case '三星直选复式':
    case '三星_直选复式':
      return 'calc_3x_zhxfs'
    case '三星直选单式':
    case '三星_直选单式':
      return 'calc_3x_zhxds'
    case '三星直选和值':
    case '三星_直选和值':
      return 'calc_3x_zhxhz'
    case '组三复式':
    case '三星_组三复式':
      return 'calc_3x_zu3fs'
    case '组六复式':
    case '三星_组六复式':
      return 'calc_3x_zu6fs'
    case '组三和值':
    case '三星_组三和值':
      return 'calc_3x_zu3hz'
    case '组六和值':
    case '三星_组六和值':
      return 'calc_3x_zu6hz'
    case '前二直选复式':
      return 'calc_2x_q2zhxfs'
    case '前二组选复式':
      return 'calc_2x_q2zuxfs'
    case '后二直选复式':
      return 'calc_2x_h2zhxfs'
    case '后二组选复式':
      return 'calc_2x_h2zuxfs'
    case '一码不定位':
      return 'calc_bdw_1mbdw'
    case '二码不定位':
      return 'calc_bdw_2mbdw'
    case '定位胆':
      return 'calc_dwd_dwd'
    case '双面盘':
      return 'calc_smp'
    case '龙虎斗':
      return 'calc_lhd'
  }
}

const getCalcFuncByPlayID = playid => {
  switch (playid) {
    case 1: // 三星直选复式
      return 'calc_3x_zhxfs'
    case 2: // 三星直选单式
      return 'calc_3x_zhxds'
    case 3: // 三星直选和值
      return 'calc_3x_zhxhz'
    case 4: // 组三复式
      return 'calc_3x_zu3fs'
    case 5: // 组六复式
      return 'calc_3x_zu6fs'
    case 6: // 	组三和值
      return 'calc_3x_zu3hz'
    case 7: // 组六和值
      return 'calc_3x_zu6hz'
    case 8: // 前二直选复式
      return 'calc_2x_q2zhxfs'
    case 10: // 前二组选复式
      return 'calc_2x_q2zuxfs'
    case 9: // '后二直选复式':
      return 'calc_2x_h2zhxfs'
    case 11: // '后二组选复式':
      return 'calc_2x_h2zuxfs'
    case 13: // '一码不定位':
      return 'calc_bdw_1mbdw'
    case 14: // '二码不定位':
      return 'calc_bdw_2mbdw'
    case 12: // '定位胆': 数字盘
      return 'calc_dwd_dwd'
    case 26: // '双面盘':
      return 'calc_smp'
    case 27: // '龙虎斗':
      return 'calc_lhd'
  }
}

/**
 * 根据玩法返回其玩法的显示类型
 * @param {string} name 玩法
 */
const getRenderTypeByName = name => {
  if (
    name.includes('三星直选和值') ||
    name.includes('组三和值') ||
    name.includes('组六和值')
  ) {
    return RenderTypes.SINGLE_ROW_MUTI_PEILV
  }
  if (
    name.includes('三星直选复式') ||
    name.includes('前二直选复式') ||
    name.includes('后二直选复式')
  ) {
    return RenderTypes.MUTI_ROW_SINGLE_PEILV
  }
  if (name.includes('双面盘') || name.includes('龙虎斗')) {
    return RenderTypes.MUTI_ROW_MUTI_PEILV
  }
  if (name.includes('定位胆')) {
    return RenderTypes.DWD
  }
  return RenderTypes.SINGLE_ROW_SINGLE_PEILV
}

const getRenderTypeByPlayID = playid => {
  switch (playid) {
    case 3: // 三星直选和值
    case 6: // 组三和值
    case 7: // 组六和值
      return RenderTypes.SINGLE_ROW_MUTI_PEILV
    case 1: // 三星直选复式
    case 8: // 前二直选复式
    case 9: // 后二直选复式
      return RenderTypes.MUTI_ROW_SINGLE_PEILV

    case 26: // 双面盘
    case 27: // 龙虎斗
      return RenderTypes.MUTI_ROW_MUTI_PEILV
    case 12: // 数字盘 定位胆
      return RenderTypes.DWD
    default:
      return RenderTypes.SINGLE_ROW_SINGLE_PEILV
  }
}

/**
 * 根据玩法名称获取要计算注数的数据，只能应付纯数字的情况
 * @param {string} name 玩法名称
 * @param {array} columns 多列的话，列的数组
 * @param {array} arr1 默认为betting.vue里的多行数据容器
 * @param {array} arr2 默认为betting.vue里的单行数据容器
 * @param {string} val1 多行中单行的行头标题
 * @param {string} val2 当前选中的数据
 */
const getCalcDataByName = (name, columns, arr1, arr2, val1, val2) => {
  // 记录数据
  const logMutiData = (columns, arr) => {
    const str = []
    columns.forEach((item, index) => {
      if (arr[index].length) {
        str.push(item + '(' + arr[index] + ')')
      }
    })
    console.log(str)
  }

  const getMutiData = (columns, arr1, val1, val2) => {
    const index1 = columns.findIndex(x => x === val1),
      _arr = arr1[index1],
      index2 = _arr.indexOf(val2)
    if (index2 === -1) {
      _arr.push(val2)
    } else {
      _arr.splice(index2, 1)
    }
    arr1[index1] = _arr.sort((a, b) => a - b)

    arr1 = arr1.map(x => x.join('|'))

    // 显示当前数据
    logMutiData(columns, arr1)
    return arr1
  }

  const getSingleData = (arr, val) => {
    const index = arr.indexOf(val)
    if (index === -1) {
      arr.push(val)
    } else {
      arr.splice(index, 1)
    }
    return arr.sort((a, b) => a - b)
  }

  switch (name) {
    case '三星直选复式':
    case '三星_直选复式':
    case '前二直选复式':
    case '后二直选复式':
    case '定位胆':
      return getMutiData(columns, arr1, val1, val2)
    case '三星_直选和值':
    case '三星直选和值':
    case '组三复式':
    case '三星_组三复式':
    case '组六复式':
    case '三星_组六复式':
    case '组三和值':
    case '三星_组三和值':
    case '组六和值':
    case '三星_组六和值':
    case '前二组选复式':
    case '后二组选复式':
    case '一码不定位':
    case '二码不定位':
    case '前二大小单双':
    case '后二大小单双':
    case '双面盘':
    case '龙虎斗':
      return getSingleData(arr2, val2)
  }
}

const getCalcDataByPlayID = (playid, columns, arr1, arr2, val1, val2) => {
  // 记录数据
  // const logMutiData = (columns, arr) => {
  //   const str = []
  //   columns.forEach((item, index) => {
  //     if (arr[index].length) {
  //       str.push(item + '(' + arr[index] + ')')
  //     }
  //   })
  //   console.log(str)
  // }

  const getMutiData = (columns, arr1, val1, val2) => {
    const index1 = columns.findIndex(x => x === val1),
      _arr = arr1[index1],
      index2 = _arr.indexOf(val2)
    if (index2 === -1) {
      _arr.push(val2)
    } else {
      _arr.splice(index2, 1)
    }
    arr1[index1] = _arr.sort((a, b) => a - b)

    arr1 = arr1.map(x => x.join('|'))

    // 显示当前数据
    // logMutiData(columns, arr1)
    return arr1
  }

  const getSingleData = (arr, val) => {
    const index = arr.indexOf(val)
    if (index === -1) {
      arr.push(val)
    } else {
      arr.splice(index, 1)
    }
    return arr.sort((a, b) => a - b)
  }

  switch (playid) {
    case 1: // '三星直选复式':
    case 8: // '前二直选复式':
    case 9: // '后二直选复式':
    case 12: // '定位胆': 数字盘
      return getMutiData(columns, arr1, val1, val2)
    case 3: // '三星_直选和值':
    case 4: // '组三复式':
    case 5: // '组六复式':
    case 6: // '组三和值':
    case 7: // '组六和值':
    case 10: // '前二组选复式':
    case 11: // '后二组选复式':
    case 13: // '一码不定位':
    case 14: // '二码不定位':
    case 15: // '前二大小单双':
    case 16: // '后二大小单双':
    case 26: // '双面盘':
    case 27: // '龙虎斗':
      return getSingleData(arr2, val2)
  }
}

export {
  getCalcFuncByName,
  getCalcFuncByPlayID,
  getRenderTypeByName,
  getCalcDataByName,
  getRenderTypeByPlayID,
  getCalcDataByPlayID
}
