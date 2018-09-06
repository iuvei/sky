const { RenderTypes } = require('./commonTypes')

// 根据名称获取计算注数的方法
const getCalcFuncByName = name => {
  switch (name) {
    case '前三直选复式':
      return 'calc_3m_q3zhxfs'
    case '前三直选单式':
      return 'calc_3m_q3zhxds'
    case '前三组选复式':
      return 'calc_3m_q3zuxfs'
    case '前三组选单式':
      return 'calc_3m_q3zuxds'
    case '前三组选胆拖':
      return 'calc_3m_q3zuxdt'
    case '中三直选复式':
      return 'calc_3m_z3zhxfs'
    case '中三直选单式':
      return 'calc_3m_z3zhxds'
    case '中三组选复式':
      return 'calc_3m_z3zuxfs'
    case '中三组选单式':
      return 'calc_3m_z3zuxds'
    case '中三组选胆拖':
      return 'calc_3m_z3zuxdt'
    case '后三直选复式':
      return 'calc_3m_h3zhxfs'
    case '后三直选单式':
      return 'calc_3m_h3zhxds'
    case '后三组选复式':
      return 'calc_3m_h3zuxfs'
    case '后三组选单式':
      return 'calc_3m_h3zuxds'
    case '后三组选胆拖':
      return 'calc_3m_h3zuxdt'
    case '前二直选复式':
      return 'calc_2m_q2zhxfs'
    case '前二直选单式':
      return 'calc_2m_q2zhxds'
    case '前二组选复式':
      return 'calc_2m_q2zuxfs'
    case '前二组选单式':
      return 'calc_2m_q2zuxds'
    case '前二组选胆拖':
      return 'calc_2m_q2zuxdt'
    case '后二直选复式':
      return 'calc_2m_h2zhxfs'
    case '后二直选单式':
      return 'calc_2m_h2zhxds'
    case '后二组选复式':
      return 'calc_2m_h2zuxfs'
    case '后二组选单式':
      return 'calc_2m_h2zuxds'
    case '后二组选胆拖':
      return 'calc_2m_h2zuxdt'
    case '前三位':
    case '不定位-前三位':
      return 'calc_bdw_q3w'
    case '中三位':
    case '不定位-中三位':
      return 'calc_bdw_z3w'
    case '后三位':
    case '不定位-后三位':
      return 'calc_bdw_h3w'
    case '定位胆':
    case '双面盘':
      return 'calc_dwd_dwd'
    case '任选复式_任选一中一':
    case '任选一中一(复式)':
      return 'calc_rxfs_rx1z1'
    case '任选复式_任选二中二':
    case '任选二中二(复式)':
      return 'calc_rxfs_rx2z2'
    case '任选复式_任选三中三':
    case '任三复式':
      return 'calc_rxfs_rx3z3'
    case '任选四中四(复式)':
    case '任选复式_任选四中四':
      return 'calc_rxfs_rx4z4'
    case '任选复式_任选五中五':
      return 'calc_rxfs_rx5z5'
    case '任选六中五(复式)':
    case '任选复式_任选六中五':
      return 'calc_rxfs_rx6z5'
    case '任选复式_任选七中五':
    case '任选七中五(复式)':
      return 'calc_rxfs_rx7z5'
    case '任选复式_任选八中五':
    case '任选八中五(复式)':
      return 'calc_rxfs_rx8z5'
    case '任选单式_任选一中一':
    case '任选一中一(单式)':
      return 'calc_rxds_rx1z1'
    case '任选单式_任选二中二':
    case '任选二中二(单式)':
      return 'calc_rxds_rx2z2'
    case '任选单式_任选三中三':
    case '任选三中三(单式)':
      return 'calc_rxds_rx3z3'
    case '任选单式_任选四中四':
    case '任选四中四(单式)':
      return 'calc_rxds_rx4z4'
    case '任选单式_任选五中五':
    case '任选五中五(单式)':
      return 'calc_rxds_rx5z5'
    case '任选单式_任选六中五':
    case '任选六中五(单式)':
      return 'calc_rxds_rx6z5'
    case '任选单式_任选七中五':
    case '任选七中五(单式)':
      return 'calc_rxds_rx7z5'
    case '任选单式_任选八中五':
    case '任选八中五(单式)':
      return 'calc_rxds_rx8z5'
    case '任选胆拖_任选二中二':
      return 'calc_rxdt_rx2z2'
    case '任选胆拖_任选三中三':
    case '任三胆拖':
      return 'calc_rxdt_rx3z3'
    case '任选胆拖_任选四中四':
      return 'calc_rxdt_rx4z4'
    case '任选胆拖_任选五中五':
      return 'calc_rxdt_rx5z5'
    case '任选胆拖_任选六中五':
      return 'calc_rxdt_rx6z5'
    case '任选胆拖_任选七中五':
      return 'calc_rxdt_rx7z5'
    case '任选胆拖_任选八中五':
      return 'calc_rxdt_rx8z5'
    case '综合定位胆':
      return 'calc_sum_dxds'
    case '龙虎斗':
      return 'calc_lhd'
    case 'calc_q5z1':
      return 'calc_q5z1'
    case '牛牛':
      return 'calc_nn'
  }
}

const getCalcFuncByPlayID = playid => {
  switch (playid) {
    case 1: // '前三直选复式':
      return 'calc_3m_q3zhxfs'
    case 2: // '前三直选单式':
      return 'calc_3m_q3zhxds'
    case 3: // '前三组选复式':
      return 'calc_3m_q3zuxfs'
    case 4: // '前三组选单式':
      return 'calc_3m_q3zuxds'
    case 5: // '前三组选胆拖':
      return 'calc_3m_q3zuxdt'
    case 6: // '中三直选复式':
      return 'calc_3m_z3zhxfs'
    case 7: // '中三直选单式':
      return 'calc_3m_z3zhxds'
    case 8: // '中三组选复式':
      return 'calc_3m_z3zuxfs'
    case 9: // '中三组选单式':
      return 'calc_3m_z3zuxds'
    case 10: // '中三组选胆拖':
      return 'calc_3m_z3zuxdt'
    case 11: // '后三直选复式':
      return 'calc_3m_h3zhxfs'
    case 12: // '后三直选单式':
      return 'calc_3m_h3zhxds'
    case 13: // '后三组选复式':
      return 'calc_3m_h3zuxfs'
    case 14: // '后三组选单式':
      return 'calc_3m_h3zuxds'
    case 15: // '后三组选胆拖':
      return 'calc_3m_h3zuxdt'
    case 16: // '前二直选复式':
      return 'calc_2m_q2zhxfs'
    case 17: // '前二直选单式':
      return 'calc_2m_q2zhxds'
    case 18: // '前二组选复式':
      return 'calc_2m_q2zuxfs'
    case 19: // '前二组选单式':
      return 'calc_2m_q2zuxds'
    case 20: // '前二组选胆拖':
      return 'calc_2m_q2zuxdt'
    case 21: // '后二直选复式':
      return 'calc_2m_h2zhxfs'
    case 22: // '后二直选单式':
      return 'calc_2m_h2zhxds'
    case 23: // '后二组选复式':
      return 'calc_2m_h2zuxfs'
    case 24: // '后二组选单式':
      return 'calc_2m_h2zuxds'
    case 25: // '后二组选胆拖':
      return 'calc_2m_h2zuxdt'
    case 26: // '不定位-前三位':
      return 'calc_bdw_q3w'
    case 27: // '不定位-中三位':
      return 'calc_bdw_z3w'
    case 28: // '不定位-后三位':
      return 'calc_bdw_h3w'
    case 29:
      // case 56: // '定位胆': 双面盘
      return 'calc_dwd_dwd'
    case 30: // '任选复式_任选一中一':
      return 'calc_rxfs_rx1z1'
    case 31: // '任选二中二(复式)':
      return 'calc_rxfs_rx2z2'
    case 32: // '任选复式_任选三中三':
      return 'calc_rxfs_rx3z3'
    case 33: // '任选复式_任选四中四':
      return 'calc_rxfs_rx4z4'
    case 34: // '任选复式_任选五中五':
      return 'calc_rxfs_rx5z5'
    case 35: // '任选复式_任选六中五':
      return 'calc_rxfs_rx6z5'
    case 36: // '任选七中五(复式)':
      return 'calc_rxfs_rx7z5'
    case 37: // '任选复式_任选八中五':
      return 'calc_rxfs_rx8z5'
    case 38: // '任选单式_任选一中一':
      return 'calc_rxds_rx1z1'
    case 39: // '任选单式_任选二中二':
      return 'calc_rxds_rx2z2'
    case 40: // '任选单式_任选三中三':
      return 'calc_rxds_rx3z3'
    case 41: // '任选单式_任选四中四':
      return 'calc_rxds_rx4z4'
    case 42: // '任选单式_任选五中五':
      return 'calc_rxds_rx5z5'
    case 43: // '任选单式_任选六中五':
      return 'calc_rxds_rx6z5'
    case 44: // '任选单式_任选七中五':
      return 'calc_rxds_rx7z5'
    // case 44: // '任选单式_任选八中五':
    //   return 'calc_rxds_rx8z5'
    case 45: // '任选胆拖_任选二中二':
      return 'calc_rxdt_rx2z2'
    case 46: // '任选胆拖_任选三中三':
      return 'calc_rxdt_rx3z3'
    case 47: // '任选胆拖_任选四中四':
      return 'calc_rxdt_rx4z4'
    case 48: // '任选胆拖_任选五中五':
      return 'calc_rxdt_rx5z5'
    case 49: // '任选胆拖_任选六中五':
      return 'calc_rxdt_rx6z5'
    case 50: // '任选胆拖_任选七中五':
      return 'calc_rxdt_rx7z5'
    case 51: // '任选胆拖_任选八中五':
      return 'calc_rxdt_rx8z5'
    // case 29: // '综合定位胆':
    //   return 'calc_sum_dxds'
    case 54: // '龙虎斗':
      return 'calc_lhd'
    case 57: // '牛牛':
      return 'calc_nn'
    case 56:
      return 'calc_smp'
    // case 'calc_q5z1':
    //   return 'calc_q5z1'
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

  switch (name) {
    case '前三直选复式':
    case '前三组选胆拖':
    case '中三直选复式':
    case '中三组选胆拖':
    case '后三直选复式':
    case '后三组选胆拖':
    case '任三胆拖':
    case '前二直选复式':
    case '前二组选胆拖':
    case '后二直选复式':
    case '后二组选胆拖':
    case '定位胆':
    case '任选胆拖_任选二中二':
    case '任选胆拖_任选四中四':
    case '任选胆拖_任选五中五':
    case '任选胆拖_任选六中五':
    case '任选胆拖_任选七中五':
    case '任选胆拖_任选八中五':
      return getMutiData(columns, arr1, val1, val2)
    case '前三组选复式':
    case '中三组选复式':
    case '后三组选复式':
    case '任三复式':
    case '前二组选复式':
    case '后二组选复式':
    case '前三位':
    case '中三位':
    case '后三位':
    case '不定位-前三位':
    case '不定位-中三位':
    case '不定位-后三位':
    case '任选一中一(复式)':
    case '任选二中二(复式)':
    case '任选四中四(复式)':
    case '任选六中五(复式)':
    case '任选七中五(复式)':
    case '任选八中五(复式)':
    case '任选一中一':
    case '任选二中二':
    case '任选四中四':
    case '任选五中五':
    case '任选六中五':
    case '任任选七中五':
    case '任选八中五':
      return getSingleData(arr2, val2)
    case '前三直选单式':
      return 'calc_3m_q3zhxds'
    case '前三组选单式':
      return 'calc_3m_q3zuxds'
    case '中三直选单式':
      return 'calc_3m_z3zhxds'
    case '中三组选单式':
      return 'calc_3m_z3zuxds'
    case '后三直选单式':
      return 'calc_3m_h3zhxds'
    case '后三组选单式':
      return 'calc_3m_h3zuxds'
    case '前二直选单式':
      return 'calc_2m_q2zhxds'
    case '前二组选单式':
      return 'calc_2m_q2zuxds'
    case '后二直选单式':
      return 'calc_2m_h2zhxds'
    case '后二组选单式':
      return 'calc_2m_h2zuxds'
    case '任选复式_任选一中一':
      return 'calc_rxfs_rx1z1'
    case '任选复式_任选二中二':
      return 'calc_rxfs_rx2z2'
    case '任选复式_任选三中三':
    case '任选复式_三中三':
      return 'calc_rxfs_rx3z3'
    case '任选复式_任选四中四':
      return 'calc_rxfs_rx4z4'
    case '任选复式_任选五中五':
      return 'calc_rxfs_rx5z5'
    case '任选复式_任选六中五':
      return 'calc_rxfs_rx6z5'
    case '任选复式_任选七中五':
      return 'calc_rxfs_rx7z5'
    case '任选复式_任选八中五':
      return 'calc_rxfs_rx8z5'
    case '任选单式_任选一中一':
      return 'calc_rxds_rx1z1'
    case '任选单式_任选二中二':
      return 'calc_rxds_rx2z2'
    case '任选单式_任选三中三':
      return 'calc_rxds_rx3z3'
    case '任选单式_任选四中四':
      return 'calc_rxds_rx4z4'
    case '任选单式_任选五中五':
      return 'calc_rxds_rx5z5'
    case '任选单式_任选六中五':
      return 'calc_rxds_rx6z5'
    case '任选单式_任选七中五':
      return 'calc_rxds_rx7z5'
    case '任选单式_任选八中五':
      return 'calc_rxds_rx8z5'
    case '综合定位胆':
      return 'calc_sum_dxds'
    case '龙虎斗':
      return 'calc_lhd'
    case 'calc_q5z1':
      return 'calc_q5z1'
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
    case 1: // '前三直选复式':
    case 5: // '前三组选胆拖':
    case 6: // '中三直选复式':
    case 10: // '中三组选胆拖':
    case 11: // '后三直选复式':
    case 15: // '后三组选胆拖':
    case 46: // '任三胆拖':
    case 16: // '前二直选复式':
    case 20: // '前二组选胆拖':
    case 21: // '后二直选复式':
    case 25: // '后二组选胆拖':
    case 29: // '定位胆':
    case 45: // ?'任选胆拖_任选二中二':
    case 47: // '任选胆拖_任选四中四':
    case 48: // '任选胆拖_任选五中五':
    case 49: // '任选胆拖_任选六中五':
    case 50: // '任选胆拖_任选七中五':
    case 51: // '任选胆拖_任选八中五':
      return getMutiData(columns, arr1, val1, val2)
    case 3: // '前三组选复式':
    case 8: // '中三组选复式':
    case 13: // '后三组选复式':
    case 32: // '任三复式':
    case 18: // '前二组选复式':
    case 23: // '后二组选复式':
    case 26: // '不定位-前三位':
    case 27: // '不定位-中三位':
    case 28: // '不定位-后三位':
    case 30: // '任选一中一(复式)':
    case 31: // '任选二中二(复式)':
    case 33: // '任选四中四(复式)':
    case 34: // '任选五中五(复式)':
    case 35: // '任选六中五(复式)':
    case 36: // '任选七中五(复式)':
    case 37: // '任选八中五(复式)':
      return getSingleData(arr2, val2)
    case '前三直选单式':
      return 'calc_3m_q3zhxds'
    case '前三组选单式':
      return 'calc_3m_q3zuxds'
    case '中三直选单式':
      return 'calc_3m_z3zhxds'
    case '中三组选单式':
      return 'calc_3m_z3zuxds'
    case '后三直选单式':
      return 'calc_3m_h3zhxds'
    case '后三组选单式':
      return 'calc_3m_h3zuxds'
    case '前二直选单式':
      return 'calc_2m_q2zhxds'
    case '前二组选单式':
      return 'calc_2m_q2zuxds'
    case '后二直选单式':
      return 'calc_2m_h2zhxds'
    case '后二组选单式':
      return 'calc_2m_h2zuxds'
    case '任选复式_任选一中一':
      return 'calc_rxfs_rx1z1'
    case '任选复式_任选二中二':
      return 'calc_rxfs_rx2z2'
    case '任选复式_任选三中三':
    case '任选复式_三中三':
      return 'calc_rxfs_rx3z3'
    case '任选复式_任选四中四':
      return 'calc_rxfs_rx4z4'
    case '任选复式_任选五中五':
      return 'calc_rxfs_rx5z5'
    case '任选复式_任选六中五':
      return 'calc_rxfs_rx6z5'
    case '任选复式_任选七中五':
      return 'calc_rxfs_rx7z5'
    case '任选复式_任选八中五':
      return 'calc_rxfs_rx8z5'
    case '任选单式_任选一中一':
      return 'calc_rxds_rx1z1'
    case '任选单式_任选二中二':
      return 'calc_rxds_rx2z2'
    case '任选单式_任选三中三':
      return 'calc_rxds_rx3z3'
    case '任选单式_任选四中四':
      return 'calc_rxds_rx4z4'
    case '任选单式_任选五中五':
      return 'calc_rxds_rx5z5'
    case '任选单式_任选六中五':
      return 'calc_rxds_rx6z5'
    case '任选单式_任选七中五':
      return 'calc_rxds_rx7z5'
    case '任选单式_任选八中五':
      return 'calc_rxds_rx8z5'
    case '综合定位胆':
      return 'calc_sum_dxds'
    case '龙虎斗':
      return 'calc_lhd'
    case 'calc_q5z1':
      return 'calc_q5z1'
  }
}

/**
 * 根据玩法返回其玩法的显示类型
 * @param {string} name 玩法
 */
const getRenderTypeByName = name => {
  if (name.includes('直选复式')) {
    return RenderTypes.MUTI_ROW_SINGLE_PEILV
  } else if (name.includes('组选复式')) {
    return RenderTypes.SINGLE_ROW_SINGLE_PEILV
  } else if (name.includes('胆拖')) {
    return RenderTypes.MUTI_ROW_SINGLE_PEILV
  } else if (name.includes('不定位')) {
    return RenderTypes.SINGLE_ROW_SINGLE_PEILV
  } else if (name.includes('定位胆')) {
    return RenderTypes.DWD
  } else if (name.includes('任选复式')) {
    return RenderTypes.SINGLE_ROW_SINGLE_PEILV
  } else if (name.includes('单式')) {
    return RenderTypes.SINGLE_ROW_SINGLE_PEILV
  } else if (name.includes('双面盘')) {
    return RenderTypes.MUTI_ROW_MUTI_PEILV
  } else if (name.includes('牛牛')) {
    return RenderTypes.SINGLE_ROW_MUTI_PEILV
  } else if (name.includes('龙虎斗')) {
    return RenderTypes.SINGLE_ROW_MUTI_PEILV
  } else if (name.includes('任三复式')) {
    return RenderTypes.SINGLE_ROW_MUTI_PEILV
  } else if (name.includes('任三胆拖')) {
    return RenderTypes.MUTI_ROW_SINGLE_PEILV
  }
}

const getRenderTypeByPlayID = playid => {
  switch (playid) {
    // 直选复式
    case 1:
    case 6:
    case 11:
    case 16:
    case 21:
      return RenderTypes.MUTI_ROW_SINGLE_PEILV
    // 组选复式
    case 3:
    case 8:
    case 13:
    case 18:
    case 23:
      return RenderTypes.SINGLE_ROW_SINGLE_PEILV
    //  胆拖
    case 5:
    case 10:
    case 15:
    case 20:
    case 25:
    case 45:
    case 46: // 任三胆拖
    case 47:
    case 48:
    case 49:
    case 50:
    case 51:
      return RenderTypes.MUTI_ROW_SINGLE_PEILV
    // 不定位
    case 26:
    case 27:
    case 28:
      return RenderTypes.SINGLE_ROW_SINGLE_PEILV
    // 定位胆
    case 29:
      return RenderTypes.DWD
    // 任选复式
    case 30:
    case 31:
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
      return RenderTypes.SINGLE_ROW_SINGLE_PEILV
    // 单式
    case 2:
    case 4:
    case 7:
    case 9:
    case 12:
    case 14:
    case 17:
    case 19:
    case 22:
    case 24:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 54: // 龙虎斗
      return RenderTypes.SINGLE_ROW_SINGLE_PEILV
    // 双面盘
    case 56:
      return RenderTypes.MUTI_ROW_MUTI_PEILV

    case 57: // 牛牛
      return RenderTypes.SINGLE_ROW_MUTI_PEILV
    case 32: // 任三复式
      return RenderTypes.SINGLE_ROW_SINGLE_PEILV
  }
}

export {
  getCalcFuncByName,
  getCalcFuncByPlayID,
  getCalcDataByName,
  getRenderTypeByName,
  getCalcDataByPlayID,
  getRenderTypeByPlayID
}
