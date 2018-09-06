// 创建于2017-2-15 作者：Atin
function checkArrIs(arr, regx) {
  return arr.every(item => regx.test(item))
}
// 去除数组中的重复值
function repeatArr(arr) {
  const res = []
  const jsons = {}
  for (let i = 0; i < arr.length; i++) {
    if (!jsons[arr[i]]) {
      res.push(arr[i])
      jsons[arr[i]] = 1
    }
  }
  return res
}
// 用于11选5注数计算的JS文件
function Calc_Zhushu_Obj() {
  // 三码 前三直选复式
  this.calc_3m_q3zhxfs = function(ba) {
    // if (ba.length !== 3) {
    //   return 0
    // }
    if (ba.length < 3) {
      return 0
    }
    const ba0 = ba[0].split('|')
    const ba1 = ba[1].split('|')
    const ba2 = ba[2].split('|')
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba2, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    let num = 0
    for (const i in ba0) {
      for (const j in ba1) {
        for (const k in ba2) {
          if (ba2[k] !== ba1[j] && ba2[k] !== ba0[i] && ba1[j] !== ba0[i]) {
            num++
          }
        }
      }
    }
    return num
  }

  // 三码 前三直选单式
  this.calc_3m_q3zhxds = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    let num = 0
    for (const k in ba) {
      const len = ba[k].split(/[\/\|]/)
      console.log(len)
      if (
        len.length === 3 &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++
      }
    }
    return num
  }

  // 三码 前三组选复式
  this.calc_3m_q3zuxfs = function(ba) {
    const num = ba.length
    if (
      num < 3 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    switch (num) {
      case 3:
        return 1
      case 4:
        return 4
      case 5:
        return 10
      case 6:
        return 20
      case 7:
        return 35
      case 8:
        return 56
      case 9:
        return 84
      case 10:
        return 120
      case 11:
        return 165
    }
    return 0
  }

  // 三码 前三组选单式
  this.calc_3m_q3zuxds = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    let num = 0
    for (const k in ba) {
      const len = ba[k].split(/[\/\|]/)
      if (
        len.length === 3 && len[0] !== len[1] && len[1] !== len[2] && len[2] !== len[0] &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++
      }
    }
    return num
  }

  // 三码 前三组选胆拖
  this.calc_3m_q3zuxdt = function(ba) {
    if (ba.length < 2) {
      return 0
    }
    const ba1 = ba[0].split('|')
    const ba2 = ba[1].split('|')
    if (
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba2, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    if (ba1.length === 2 && ba2.length !== 0) {
      return ba2.length
    } else {
      switch (ba2.length) {
        case 2:
          return 1
        case 3:
          return 3
        case 4:
          return 6
        case 5:
          return 10
        case 6:
          return 15
        case 7:
          return 21
        case 8:
          return 28
        case 9:
          return 36
        case 10:
          return 45
      }
      return 0
    }
  }

  // 三码 中三直选复式
  this.calc_3m_z3zhxfs = function(ba) {
    // if (ba.length !== 3) {
    //   return 0
    // }
    if (ba.length < 3) {
      return 0
    }
    const ba0 = ba[0].split('|')
    const ba1 = ba[1].split('|')
    const ba2 = ba[2].split('|')
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba2, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    let num = 0
    for (const i in ba0) {
      for (const j in ba1) {
        for (const k in ba2) {
          if (ba2[k] !== ba1[j] && ba2[k] !== ba0[i] && ba1[j] !== ba0[i]) {
            num++
          }
        }
      }
    }
    return num
  }

  // 三码 中三直选单式
  this.calc_3m_z3zhxds = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    let num = 0
    for (const k in ba) {
      const len = ba[k].split(/[\/\|]/)
      if (
        len.length === 3 &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++
      }
    }
    return num
  }

  // 三码 中三组选复式
  this.calc_3m_z3zuxfs = function(ba) {
    const num = ba.length
    if (
      num < 3 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    switch (num) {
      case 3:
        return 1
      case 4:
        return 4
      case 5:
        return 10
      case 6:
        return 20
      case 7:
        return 35
      case 8:
        return 56
      case 9:
        return 84
      case 10:
        return 120
      case 11:
        return 165
    }
    return 0
  }

  // 三码 中三组选单式
  this.calc_3m_z3zuxds = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    let num = 0
    for (const k in ba) {
      const len = ba[k].split(/[\/\|]/)
      if (
        len.length === 3 &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++
      }
    }
    return num
  }

  // 三码 中三组选胆拖
  this.calc_3m_z3zuxdt = function(ba) {
    if (ba.length < 2) {
      return 0
    }
    const ba1 = ba[0].split('|')
    const ba2 = ba[1].split('|')
    if (
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba2, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    if (ba1.length === 2 && ba2.length !== 0) {
      return ba2.length
    } else {
      switch (ba2.length) {
        case 2:
          return 1
        case 3:
          return 3
        case 4:
          return 6
        case 5:
          return 10
        case 6:
          return 15
        case 7:
          return 21
        case 8:
          return 28
        case 9:
          return 36
        case 10:
          return 45
      }
      return 0
    }
  }

  // 三码 后三直选复式
  this.calc_3m_h3zhxfs = function(ba) {
    // if (ba.length !== 3) {
    //   return 0
    // }
    const ba0 = ba[0].split('|')
    const ba1 = ba[1].split('|')
    const ba2 = ba[2].split('|')
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba2, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    let num = 0
    for (const i in ba0) {
      for (const j in ba1) {
        for (const k in ba2) {
          if (ba2[k] !== ba1[j] && ba2[k] !== ba0[i] && ba1[j] !== ba0[i]) {
            num++
          }
        }
      }
    }
    return num
  }

  // 三码 后三直选单式
  this.calc_3m_h3zhxds = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    let num = 0
    for (const k in ba) {
      const len = ba[k].split(/[\/\|]/)
      if (
        len.length === 3 &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++
      }
    }
    return num
  }

  // 三码 后三组选复式
  this.calc_3m_h3zuxfs = function(ba) {
    const num = ba.length
    if (
      num < 3 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    switch (num) {
      case 3:
        return 1
      case 4:
        return 4
      case 5:
        return 10
      case 6:
        return 20
      case 7:
        return 35
      case 8:
        return 56
      case 9:
        return 84
      case 10:
        return 120
      case 11:
        return 165
    }
    return 0
  }

  // 三码 后三组选单式
  this.calc_3m_h3zuxds = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    let num = 0
    for (const k in ba) {
      const len = ba[k].split(/[\/\|]/)
      if (
        len.length === 3 &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++
      }
    }
    return num
  }

  // 三码 后三组选胆拖
  this.calc_3m_h3zuxdt = function(ba) {
    if (ba.length < 2) {
      return 0
    }
    const ba1 = ba[0].split('|')
    const ba2 = ba[1].split('|')
    if (
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba2, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    if (ba1.length === 2 && ba2.length !== 0) {
      return ba2.length
    } else {
      switch (ba2.length) {
        case 2:
          return 1
        case 3:
          return 3
        case 4:
          return 6
        case 5:
          return 10
        case 6:
          return 15
        case 7:
          return 21
        case 8:
          return 28
        case 9:
          return 36
        case 10:
          return 45
      }
      return 0
    }
  }
  // 二码 前二直选复式
  this.calc_2m_q2zhxfs = function(ba) {
    if (ba.length < 2) {
      return 0
    }
    const ba0 = ba[0].split('|')
    const ba1 = ba[1].split('|')
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    let num = 0
    for (const i in ba0) {
      for (const j in ba1) {
        if (ba1[j] !== ba0[i]) {
          num++
        }
      }
    }
    return num
  }
  // 二码 前二直选单式
  this.calc_2m_q2zhxds = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    let num = 0
    for (const k in ba) {
      const len = ba[k].split(/[\/\|]/)
      if (
        len.length === 2 &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++
      }
    }
    return num
  }
  // 二码 前二组选复式
  this.calc_2m_q2zuxfs = function(ba) {
    if (
      ba.length < 2 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    switch (ba.length) {
      case 2:
        return 1
      case 3:
        return 3
      case 4:
        return 6
      case 5:
        return 10
      case 6:
        return 15
      case 7:
        return 21
      case 8:
        return 28
      case 9:
        return 36
      case 10:
        return 45
      case 11:
        return 55
    }
  }
  // 二码 前二组选单式
  this.calc_2m_q2zuxds = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    let num = 0
    for (const k in ba) {
      const len = ba[k].split(/[\/\|]/)
      if (
        len.length === 2 && len[0] !== len[1] &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++
      }
    }
    return num
  }
  // 二码 前二组选胆拖
  this.calc_2m_q2zuxdt = function(ba) {
    if (ba.length < 2) {
      return 0
    }
    const ba1 = ba[1].split('|')
    if (!checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)) {
      return 0
    }
    return ba1.length
  }

  // 二码 后二直选复式
  this.calc_2m_h2zhxfs = function(ba) {
    if (ba.length < 2) {
      return 0
    }
    const ba0 = ba[0].split('|')
    const ba1 = ba[1].split('|')
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    let num = 0
    for (const i in ba0) {
      for (const j in ba1) {
        if (ba1[j] !== ba0[i]) {
          num++
        }
      }
    }
    return num
  }
  // 二码 后二直选单式
  this.calc_2m_h2zhxds = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    let num = 0
    for (const k in ba) {
      const len = ba[k].split(/[\/\|]/)
      if (
        len.length === 2 &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++
      }
    }
    return num
  }
  // 二码 后二组选复式
  this.calc_2m_h2zuxfs = function(ba) {
    if (
      ba.length < 2 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    switch (ba.length) {
      case 2:
        return 1
      case 3:
        return 3
      case 4:
        return 6
      case 5:
        return 10
      case 6:
        return 15
      case 7:
        return 21
      case 8:
        return 28
      case 9:
        return 36
      case 10:
        return 45
      case 11:
        return 55
    }
  }
  // 二码 后二组选单式
  this.calc_2m_h2zuxds = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    let num = 0
    for (const k in ba) {
      const len = ba[k].split(/[\/\|]/)
      if (
        len.length === 2 &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++
      }
    }
    return num
  }
  // 二码 后二组选胆拖
  this.calc_2m_h2zuxdt = function(ba) {
    if (ba.length < 2 || ba[0] === '') {
      return 0
    }
    const ba1 = ba[1].split('|')
    if (!checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)) {
      return 0
    }
    return ba1.length
  }
  // 不定位  前三位
  this.calc_bdw_q3w = function(ba) {
    if (
      ba.length < 1 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    return ba.length
  }
  // 不定位  中三位
  this.calc_bdw_z3w = function(ba) {
    if (
      ba.length < 1 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    return ba.length
  }
  // 不定位  后三位
  this.calc_bdw_h3w = function(ba) {
    if (
      ba.length < 1 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    return ba.length
  }

  // 定位胆
  this.calc_dwd_dwd = function(ba) {
    if (ba.length < 2) {
      return 0
    }

    let num = 0
    for (let i = 1; i < ba.length; i++) {
      const child_arr = ba[i].split('|')
      if (checkArrIs(child_arr, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)) {
        num += child_arr.length
      }
    }
    return num
  }
  // 任选复式 任选一中一
  this.calc_rxfs_rx1z1 = function(ba) {
    if (
      ba.length < 1 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    return ba.length
  }

  // 任选复式 任选二中二
  this.calc_rxfs_rx2z2 = function(ba) {
    if (
      ba.length < 2 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    switch (ba.length) {
      case 2:
        return 1
      case 3:
        return 3
      case 4:
        return 6
      case 5:
        return 10
      case 6:
        return 15
      case 7:
        return 21
      case 8:
        return 28
      case 9:
        return 36
      case 10:
        return 45
      case 11:
        return 55
    }
  }

  // 任选复式 任选三中三
  this.calc_rxfs_rx3z3 = function(ba) {
    if (
      ba.length < 3 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    switch (ba.length) {
      case 3:
        return 1
      case 4:
        return 4
      case 5:
        return 10
      case 6:
        return 20
      case 7:
        return 35
      case 8:
        return 56
      case 9:
        return 84
      case 10:
        return 120
      case 11:
        return 165
    }
  }
  // 任选复式 任选四中四
  this.calc_rxfs_rx4z4 = function(ba) {
    if (
      ba.length < 4 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    switch (ba.length) {
      case 4:
        return 1
      case 5:
        return 5
      case 6:
        return 15
      case 7:
        return 35
      case 8:
        return 70
      case 9:
        return 126
      case 10:
        return 210
      case 11:
        return 330
    }
  }
  // 任选复式 任选五中五
  this.calc_rxfs_rx5z5 = function(ba) {
    if (
      ba.length < 5 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    switch (ba.length) {
      case 5:
        return 1
      case 6:
        return 6
      case 7:
        return 21
      case 8:
        return 56
      case 9:
        return 126
      case 10:
        return 252
      case 11:
        return 462
    }
  }
  // 任选复式 任选六中五
  this.calc_rxfs_rx6z5 = function(ba) {
    if (
      ba.length < 6 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    switch (ba.length) {
      case 6:
        return 1
      case 7:
        return 7
      case 8:
        return 28
      case 9:
        return 84
      case 10:
        return 210
      case 11:
        return 462
    }
  }
  // 任选复式 任选七中五
  this.calc_rxfs_rx7z5 = function(ba) {
    if (
      ba.length < 7 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    switch (ba.length) {
      case 7:
        return 1
      case 8:
        return 8
      case 9:
        return 36
      case 10:
        return 120
      case 11:
        return 330
    }
  }
  // 任选复式 任选八中五
  this.calc_rxfs_rx8z5 = function(ba) {
    if (
      ba.length < 8 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    switch (ba.length) {
      case 8:
        return 1
      case 9:
        return 9
      case 10:
        return 45
      case 11:
        return 165
    }
  }

  // 任选单式 任选一中一
  this.calc_rxds_rx1z1 = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    let num = 0
    for (const i in ba) {
      const len = ba[i].split(/[\|\/]/)
      if (
        len.length === 1 &&
        checkArrIs(len, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++
      }
    }
    return num
  }
  // 任选单式 任选二中二
  this.calc_rxds_rx2z2 = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    let num = 0
    for (const i in ba) {
      const len = ba[i].split(/[\|\/]/)
      if (len.length !== 2) break
      const resBalls = repeatArr(len)
      if (
        resBalls.length === 2 &&
        checkArrIs(resBalls, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++
      }
    }
    return num
  }
  // 任选单式 任选三中三
  this.calc_rxds_rx3z3 = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    let num = 0
    for (const i in ba) {
      const len = ba[i].split(/[\|\/]/)
      if (len.length !== 3) break
      const resBalls = repeatArr(len)
      if (
        resBalls.length === 3 &&
        checkArrIs(resBalls, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++
      }
    }
    return num
  }
  // 任选单式 任选四中四
  this.calc_rxds_rx4z4 = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    let num = 0
    for (const i in ba) {
      const len = ba[i].split(/[\|\/]/)
      if (len.length !== 4) break
      const resBalls = repeatArr(len)
      if (
        resBalls.length === 4 &&
        checkArrIs(resBalls, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++
      }
    }
    return num
  }
  // 任选单式 任选五中五
  this.calc_rxds_rx5z5 = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    let num = 0
    for (const i in ba) {
      const len = ba[i].split(/[\|\/]/)
      if (len.length !== 5) break
      const resBalls = repeatArr(len)
      if (
        resBalls.length === 5 &&
        checkArrIs(resBalls, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++
      }
    }
    return num
  }
  // 任选单式 任选六中五
  this.calc_rxds_rx6z5 = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    let num = 0
    for (const i in ba) {
      const len = ba[i].split(/[\|\/]/)
      if (len.length !== 6) break
      const resBalls = repeatArr(len)
      if (
        resBalls.length === 6 &&
        checkArrIs(resBalls, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++
      }
    }
    return num
  }
  // 任选单式 任选七中五
  this.calc_rxds_rx7z5 = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    let num = 0
    for (const i in ba) {
      const len = ba[i].split(/[\|\/]/)
      if (len.length !== 7) break
      const resBalls = repeatArr(len)
      if (
        resBalls.length === 7 &&
        checkArrIs(resBalls, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++
      }
    }
    return num
  }
  // 任选单式 任选八中五
  this.calc_rxds_rx8z5 = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    let num = 0
    for (const i in ba) {
      const len = ba[i].split(/[\|\/]/)
      if (len.length !== 8) break
      const resBalls = repeatArr(len)
      if (
        resBalls.length === 8 &&
        checkArrIs(resBalls, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
      ) {
        num++
      }
    }
    return num
  }
  // 任选胆拖 任选二中二
  this.calc_rxdt_rx2z2 = function(ba) {
    if (ba.length < 2) {
      return 0
    }
    if (!ba[0].length) return 0
    const ba1 = ba[1].split(/[\|\/]/)
    if (
      ba1.length < 1 ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    return ba1.length
  }
  // 任选胆拖 任选三中三
  this.calc_rxdt_rx3z3 = function(ba) {
    // if (ba.length !== 2) {
    //   return 0
    // }
    if (ba.length < 2) {
      return 0
    }
    const ba0 = ba[0].split('|')
    const ba1 = ba[1].split('|')
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    if (ba0.length === 2) {
      return ba1.length
    } else {
      if (ba1.length < 2) {
        return 0
      }
      let num = 0
      for (let m = ba1.length; m > 0; m--) {
        num += m - 1
      }
      return num
    }
  }
  // 任选胆拖 任选四中四
  this.calc_rxdt_rx4z4 = function(ba) {
    if (ba.length < 2) {
      return 0
    }
    const ba0 = ba[0].split('|')
    const ba1 = ba[1].split('|')
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    if (ba0.length + ba1.length < 4) {
      return 0
    }
    switch (ba0.length) {
      case 1: {
        let k = 0
        const n = ba1.length - 2 // 胆码固定1求  则拖码3求为一注
        const num = []
        for (let i = n; i > 0; i--) {
          num[k] = (k + 1) * i
          k++
        }
        let result = 0
        for (const i in num) {
          result += num[i]
        }
        return result
      }
      case 2: {
        const n = ba1.length - 1 // 胆码固定2码  则拖码2个球为一注
        const num = []
        let result = 0
        for (let i = n, j = 0; i > 0; i--) {
          num[j] = i
          j++
        }
        for (const i in num) {
          result += num[i]
        }
        return result
      }
      case 3:
        return ba1.length
    }
    return 0
  }
  // 任选胆拖 任选五中五
  this.calc_rxdt_rx5z5 = function(ba) {
    if (ba.length < 2) {
      return 0
    }
    const ba0 = ba[0].split('|')
    const ba1 = ba[1].split('|')
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    if (ba0.length + ba1.length < 5) {
      return 0
    }
    switch (ba0.length) {
      case 1:
        switch (ba1.length) {
          case 4:
            return 1
          case 5:
            return 5
          case 6:
            return 15
          case 7:
            return 35
          case 8:
            return 70
          case 9:
            return 126
          case 10:
            return 210
        }
        break
      case 2: {
        // 拖码3个球为一注
        let k = 0
        const n = ba1.length - 2 // 胆码固定2求  则拖码3求为一注
        const num = []
        for (let i = n; i > 0; i--) {
          num[k] = (k + 1) * i
          k++
        }
        let result = 0
        for (const i in num) {
          result += num[i]
        }
        return result
      }
      case 3: {
        const n = ba1.length - 1 // 胆码固定3码  则拖码2个球为一注
        const num = []
        let result = 0
        for (let i = n, j = 0; i > 0; i--) {
          num[j] = i
          j++
        }
        for (const i in num) {
          result += num[i]
        }
        return result
      }
      case 4:
        return ba1.length
    }
  }
  // 任选胆拖 任选六中五
  this.calc_rxdt_rx6z5 = function(ba) {
    if (ba.length < 2) {
      return 0
    }
    const ba0 = ba[0].split('|')
    const ba1 = ba[1].split('|')
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    if (ba0.length + ba1.length < 6) {
      return 0
    }
    switch (ba0.length) {
      case 1:
        switch (ba1.length) {
          case 5:
            return 1
          case 6:
            return 6
          case 7:
            return 21
          case 8:
            return 56
          case 9:
            return 126
          case 10:
            return 252
        }
        break
      case 2:
        switch (ba1.length) {
          case 4:
            return 1
          case 5:
            return 5
          case 6:
            return 15
          case 7:
            return 35
          case 8:
            return 70
          case 9:
            return 126
        }
        break
      case 3:
        switch (ba1.length) {
          case 3:
            return 1
          case 4:
            return 4
          case 5:
            return 10
          case 6:
            return 20
          case 7:
            return 35
          case 8:
            return 56
        }
        break
      case 4:
        switch (ba1.length) {
          case 2:
            return 1
          case 3:
            return 3
          case 4:
            return 6
          case 5:
            return 10
          case 6:
            return 15
          case 7:
            return 21
        }
        break
      case 5:
        return ba1.length
    }
  }
  // 任选胆拖 任选七中五
  this.calc_rxdt_rx7z5 = function(ba) {
    if (ba.length < 2) {
      return 0
    }
    const ba0 = ba[0].split('|')
    const ba1 = ba[1].split('|')
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    if (ba0.length + ba1.length < 7) {
      return 0
    }
    switch (ba0.length) {
      case 1:
        switch (ba1.length) {
          case 6:
            return 1
          case 7:
            return 7
          case 8:
            return 28
          case 9:
            return 84
          case 10:
            return 210
        }
        break
      case 2:
        switch (ba1.length) {
          case 5:
            return 1
          case 6:
            return 6
          case 7:
            return 21
          case 8:
            return 56
          case 9:
            return 126
        }
        break
      case 3:
        switch (ba1.length) {
          case 4:
            return 1
          case 5:
            return 5
          case 6:
            return 15
          case 7:
            return 35
          case 8:
            return 70
        }
        break
      case 4:
        switch (ba1.length) {
          case 3:
            return 1
          case 4:
            return 4
          case 5:
            return 10
          case 6:
            return 20
          case 7:
            return 35
        }
        break
      case 5:
        switch (ba1.length) {
          case 2:
            return 1
          case 3:
            return 3
          case 4:
            return 6
          case 5:
            return 10
          case 6:
            return 15
        }
        break
      case 6:
        return ba1.length
    }
  }
  // 任选胆拖 任选八中五
  this.calc_rxdt_rx8z5 = function(ba) {
    if (ba.length < 2) {
      return 0
    }
    const ba0 = ba[0].split('|')
    const ba1 = ba[1].split('|')
    if (
      !checkArrIs(ba0, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/) ||
      !checkArrIs(ba1, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      return 0
    }
    if (ba0.length + ba1.length < 8) {
      return 0
    }
    switch (ba0.length) {
      case 1:
        switch (ba1.length) {
          case 7:
            return 1
          case 8:
            return 8
          case 9:
            return 36
          case 10:
            return 120
        }
        break
      case 2:
        switch (ba1.length) {
          case 6:
            return 1
          case 7:
            return 7
          case 8:
            return 28
          case 9:
            return 84
        }
        break
      case 3:
        switch (ba1.length) {
          case 5:
            return 1
          case 6:
            return 6
          case 7:
            return 21
          case 8:
            return 56
        }
        break
      case 4:
        switch (ba1.length) {
          case 4:
            return 1
          case 5:
            return 5
          case 6:
            return 15
          case 7:
            return 35
        }
        break
      case 5:
        switch (ba1.length) {
          case 3:
            return 1
          case 4:
            return 4
          case 5:
            return 10
          case 6:
            return 20
        }
        break
      case 6:
        switch (ba1.length) {
          case 2:
            return 1
          case 3:
            return 3
          case 4:
            return 6
          case 5:
            return 10
        }
        break
      case 7:
        return ba1.length
    }
  }

  this.calc_dwd_dxds = function(ba) {
    if (ba.length < 2 || ba[1] === '') {
      return 0
    }
    let zhushu = 0
    for (let i = 1, len = ba.length; i < len; i += 1) {
      const res = ba[i].split(/[\|\/]/)
      if (checkArrIs(res, /^([0-3])$/)) {
        zhushu += res.length
      }
    }
    return zhushu
  }

  this.calc_sum_dxds = function(ba) {
    if (ba.length < 1 || !checkArrIs(ba, /^([0-5])$/)) {
      return 0
    } else {
      return ba.length
    }
  }
  // 龙虎斗
  this.calc_lhd = function(ba) {
    if (Array.isArray(ba)) return ba.length
    return 0
  }

  this.calc_q5z1 = function(ba) {
    if (
      ba.length < 1 ||
      !checkArrIs(ba, /^(([0][1-9]|[1][0-1])|([1-9]|[1][0-1]))$/)
    ) {
      console.log(ba)
      return 0
    } else {
      return ba.length
    }
  }

  // 牛牛
  this.calc_nn = ba => Array.isArray(ba) ? ba.length : 0

  // 双面盘
  this.calc_smp = ba => Array.isArray(ba) ? ba.length : 0
  // END CLASS
}

// 还能再牛逼一点嘛？？？
export { Calc_Zhushu_Obj }
