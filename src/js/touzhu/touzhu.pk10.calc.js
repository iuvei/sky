const { RenderTypes } = require('./commonTypes')

function checkArrIs(arr, regx) {
  return arr.every(item => regx.test(item))
}
function Calc_Zhushu_Obj() {
  // 前一 直选复式
  this.calc_q1_zxfs = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }
  // 前二 直选复式
  this.calc_q2_zxfs = function(ba) {
    if (ba.length < 2) {
      return 0
    }
    let zhushu = 0
    const balls1 = ba[0].split('|')
    const balls2 = ba[1].split('|')
    if (
      !checkArrIs(balls1, /^(([0][1-9]|[1][0])|([1-9]|[1][0]))$/) ||
      !checkArrIs(balls2, /^(([0][1-9]|[1][0])|([1-9]|[1][0]))$/)
    ) {
      return 0
    }

    for (let i = 0; i < balls1.length; i++) {
      for (let j = 0; j < balls2.length; j++) {
        if (balls1[i] !== balls2[j]) {
          zhushu++
        }
      }
    }
    return zhushu
  }
  // 前二  直选单式 ~~~~~暂时没有
  this.calc_q2_zxds = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    }
    let zhushu = 0
    for (let i = 0; i < ba.length; i++) {
      const balls = ba[i].split(/[\|\/]/)
      if (
        balls.length === 2 &&
        checkArrIs(balls, /^(([0][1-9]|[1][0])|([1-9]|[1][0]))$/) &&
        balls[0] !== balls[1]
      ) {
        zhushu++
      }
    }
    return zhushu
  }

  // 前三 直选复式
  this.calc_q3_zxfs = function(ba) {
    if (ba.length < 3) {
      return 0
    }
    let zhushu = 0
    const balls1 = ba[0].split('|')
    const balls2 = ba[1].split('|')
    const balls3 = ba[2].split('|')
    if (
      !checkArrIs(balls1, /^(([0][1-9]|[1][0])|([1-9]|[1][0]))$/) ||
      !checkArrIs(balls2, /^(([0][1-9]|[1][0])|([1-9]|[1][0]))$/) ||
      !checkArrIs(balls3, /^(([0][1-9]|[1][0])|([1-9]|[1][0]))$/)
    ) {
      return 0
    }
    for (let i = 0; i < balls1.length; i++) {
      for (let j = 0; j < balls2.length; j++) {
        for (let n = 0; n < balls3.length; n++) {
          if (
            balls1[i] !== balls2[j] &&
            balls3[n] !== balls1[i] &&
            balls2[j] !== balls3[n]
          ) {
            zhushu++
          }
        }
      }
    }
    return zhushu
  }

  // 前三 直选单式
  this.calc_q3_zxds = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    }
    let zhushu = 0
    for (let i = 0; i < ba.length; i++) {
      const balls = ba[i].split(/[\|\/]/)
      for (let k = 0; k < balls.length; k++) {
        if (balls[k] === '') {
          return 0
        }
      }
      if (
        balls.length === 3 &&
        checkArrIs(balls, /^(([0][1-9]|[1][0])|([1-9]|[1][0]))$/)
      ) {
        if (
          balls[0] !== balls[1] &&
          balls[1] !== balls[2] &&
          balls[0] !== balls[2]
        ) {
          zhushu++
        }
      }
    }
    return zhushu
  }
  // 定位胆
  this.calc_dwd = function(ba) {
    if (ba.length < 2) {
      return 0
    }
    let zhushu = 0
    for (let i = 1; i < ba.length; i++) {
      const subballs = ba[i].split('|')
      for (const k in subballs) {
        if (
          subballs !== '' &&
          parseInt(subballs[k]) > 0 &&
          parseInt(subballs[k]) <= 10
        ) {
          zhushu++
        }
      }
    }
    return zhushu
  }

  /* 自定义玩法 */
  // 前二和值
  this.calc_q2_hz = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    return ba.length
  }
  // 前三和值
  this.calc_q3_hz = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    return ba.length
  }
  // 前四和值
  this.calc_q4_hz = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    return ba.length
  }

  // 定位大小单双
  this.calc_all_dxds = function(ba) {
    if (ba.length < 2 || ba[1] === '') {
      return 0
    }
    let zhushu = 0
    for (let i = 1; i < ba.length; i += 1) {
      const res = ba[i].split('|')
      zhushu += res.length
    }
    return zhushu
  }

  // 前三总大小单双
  this.calc_q3_dxds = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  // 前三特选
  this.calc_q3_qtx = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  // 龙虎斗
  this.calc_whjx = function(ba) {
    if (ba.length < 0 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }
  /* END 自定玩法 */

  // 双面盘
  this.calc_smp = ba => {
    if (ba.length < 2) {
      return 0
    }
    let zhushu = 0
    for (let i = 1; i < ba.length; i++) {
      const subballs = ba[i].split('|')
      for (const k in subballs) {
        if (
          subballs !== '' &&
          parseInt(subballs[k]) >= 0 &&
          parseInt(subballs[k]) <= 10
        ) {
          zhushu++
        }
      }
    }
    return zhushu
  }

  // 冠亚和
  this.calc_gyh = ba => ba.length

  // 牛牛
  this.calc_nn = ba => ba.length
}

const getCalcFuncByName = name => {
  if (name.includes('前一')) {
    return 'calc_q1_zxfs'
  }
  if (name.includes('前二')) {
    return 'calc_q2_zxfs'
  }
  if (name.includes('前三')) {
    return 'calc_q3_zxfs'
  }
  if (name.includes('数字盘') || name.includes('定位胆')) {
    return 'calc_dwd'
  }
  if (name.includes('冠亚和')) {
    return 'calc_gyh'
  }
  if (name.includes('双面盘')) {
    return 'calc_smp'
  }
}

const getCalcFuncByPlayID = playid => {
  // if (name.includes('前一')) {
  //   return 'calc_q1_zxfs'
  // }
  // if (name.includes('前二')) {
  //   return 'calc_q2_zxfs'
  // }
  // if (name.includes('前三')) {
  //   return 'calc_q3_zxfs'
  // }
  // if (name.includes('数字盘') || name.includes('定位胆')) {
  //   return 'calc_dwd'
  // }
  // if (name.includes('冠亚和')) {
  //   return 'calc_gyh'
  // }
  // if (name.includes('双面盘')) {
  //   return 'calc_smp'
  // }
  switch (playid) {
    // 前一直选
    case 1:
      return 'calc_q1_zxfs'
    // 前二直选复式
    case 2:
      return 'calc_q2_zxfs'
    // 3 前二直选单式
    // 前三直选
    case 4:
      return 'calc_q3_zxfs'
    // 5 前三直选单式
    // 定位胆
    case 6:
      return 'calc_dwd'
    // 冠亚和
    case 7:
      return 'calc_gyh'
    // 双面盘
    case 14:
      return 'calc_smp'
    // 数字盘
    case 15:
      return 'calc_dwd'
  }
}

const calcFunc = new Calc_Zhushu_Obj()

const CalcObj = new Map([
  [1, { name: '前一', calcFunc: calcFunc.calc_q1_zxfs }],
  [2, { name: '前二直选复式', calcFunc: calcFunc.calc_q2_zxfs }],
  [3, { name: '前二直选单式', calcFunc: calcFunc.calc_q2_zxds }],
  [4, { name: '前三直选复式', calcFunc: calcFunc.calc_q3_zxfs }],
  [5, { name: '前三直选单式', calcFunc: calcFunc.calc_q3_zxds }],
  [6, { name: '定位胆', calcFunc: calcFunc.calc_dwd }],
  [7, { name: '冠亚和', calcFunc: calcFunc.calc_gyh }],
  [14, { name: '双面盘', calcFunc: calcFunc.calc_smp }],
  [15, { name: '数字盘', calcFunc: calcFunc.calc_dwd }]
])
/**
 * 根据玩法返回其玩法的显示类型
 * @param {string} name 玩法
 */
const getRenderTypeByName = name => {
  if (name.includes('前一')) {
    return RenderTypes.SINGLE_ROW_SINGLE_PEILV
  }
  if (name.includes('前二')) {
    return RenderTypes.MUTI_ROW_SINGLE_PEILV
  }
  if (name.includes('前三')) {
    return RenderTypes.MUTI_ROW_SINGLE_PEILV
  }
  if (name.includes('定位胆') || name.includes('数字盘')) {
    return RenderTypes.DWD
  }
  if (name.includes('冠亚和')) {
    return RenderTypes.SINGLE_ROW_MUTI_PEILV
  }
  if (name.includes('双面盘')) {
    return RenderTypes.DWD
  }
}

const getRenderTypeByPlayID = playid => {
  // if (name.includes('前一')) {
  //   return RenderTypes.SINGLE_ROW_SINGLE_PEILV
  // }
  // if (name.includes('前二')) {
  //   return RenderTypes.MUTI_ROW_SINGLE_PEILV
  // }
  // if (name.includes('前三')) {
  //   return RenderTypes.MUTI_ROW_SINGLE_PEILV
  // }
  // if (name.includes('定位胆') || name.includes('数字盘')) {
  //   return RenderTypes.DWD
  // }
  // if (name.includes('冠亚和')) {
  //   return RenderTypes.SINGLE_ROW_MUTI_PEILV
  // }
  // if (name.includes('双面盘')) {
  //   return RenderTypes.DWD
  // }
  switch (playid) {
    // 前一直选
    case 1:
      return RenderTypes.SINGLE_ROW_SINGLE_PEILV
    // 前二直选复式
    case 2:
      return RenderTypes.MUTI_ROW_SINGLE_PEILV
    // 3 前二直选单式 break
    // 前三直选
    case 4:
      return RenderTypes.MUTI_ROW_SINGLE_PEILV
    // 5 前三直选单式
    // 定位胆
    case 6:
      return RenderTypes.DWD
    // 冠亚和
    case 7:
      return RenderTypes.SINGLE_ROW_MUTI_PEILV
    // 双面盘
    case 14:
      return RenderTypes.DWD
    // 数字盘
    case 15:
      return RenderTypes.DWD
  }
}

export {
  CalcObj,
  Calc_Zhushu_Obj,
  getCalcFuncByName,
  getCalcFuncByPlayID,
  getRenderTypeByName,
  getRenderTypeByPlayID
}
