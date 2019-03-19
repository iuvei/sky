const { RenderTypes } = require('./commonTypes')

// 用于安徽快三注数计算的JS文件
function checkArrIs(arr, regx) {
  return arr.every(item => regx.test(item))
}

function Calc_Zhushu_Obj() {
  // 和值
  this.calc_sum = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    }
    return ba.length
  }

  // 三同号 通选
  this.calc_3thtx = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    }
    return ba.length
  }

  // 三同号 复选
  this.calc_3thdx = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    }
    return ba.length
  }

  // 三不同号 标准
  this.calc_3bthbz = function(ba) {
    const len = ba.length
    if (len < 3) {
      return 0
    }
    switch (len) {
      case 3:
        return 1
      case 4:
        return 4
      case 5:
        return 10
      case 6:
        return 20
    }
  }

  // 三不同号 胆拖
  this.calc_3bthdt = function(ba) {
    if (ba.length < 2 || ba[1] === '') {
      return 0
    }
    const danma = ba[0].split('|') // 胆码
    const tuoma = ba[1].split('|') // 拖码
    if (!checkArrIs(danma, /[1-6]/) || !checkArrIs(tuoma, /[1-6]/)) {
      return 0
    }
    if (danma.length === 2) {
      return tuoma.length
    } else if (danma.length === 1) {
      const n = tuoma.length
      return n * ((n - 1) / 2)
    }
    return 0
  }

  // 三连号 通选
  this.calc_3lhtx = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    }
    return ba.length
  }

  // 二同号 复选
  this.calc_2thfx = function(ba) {
    if (!checkArrIs(ba, /[1-6][1-6]/)) {
      return 0
    }
    return ba.length
  }

  // 二同号 单选
  this.calc_2thdx = function(ba) {
    if (ba.length < 2) {
      return 0
    }

    const tonghao = ba[0].split('|')
    if (!checkArrIs(tonghao, /[1-6][1-6]/)) {
      return 0
    }

    const th_length = tonghao.length
    const btonghao = ba[1].split('|')
    if (!checkArrIs(btonghao, /[1-6]/)) {
      return 0
    }
    const bth_length = btonghao.length
    return th_length * bth_length
  }

  // 二不同号 标准
  this.calc_2bthbz = function(ba) {
    if (!checkArrIs(ba, /[1-6]/)) {
      return 0
    }
    const len = ba.length
    if (len < 2) {
      return 0
    }
    return len * ((len - 1) / 2)
  }

  // 二不同号 胆拖
  this.calc_2bthdt = function(ba) {
    if (ba.length < 2) {
      return 0
    }
    const ba0 = ba[0].split('|')
    if (!checkArrIs(ba0, /^[1-6]$/)) {
      return 0
    }
    const ba1 = ba[1].split('|')
    if (!checkArrIs(ba1, /^[1-6]$/)) {
      return 0
    }
    return ba1.length
  }

  // 任选一
  this.calc_rx1m = function(ba) {
    if (ba.length < 1) {
      return 0
    } else {
      return ba.length
    }
  }

  // 总大小单双
  this.calc_hz_dxds = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  this.calc_dwdxds = function(ba) {
    if (ba.length !== 3) {
      return 0
    }
    let zhushu = 0
    for (let i = 0; i < ba.length; i++) {
      if (ba[i] !== '?') {
        const res = ba[i].split(/[\|\/]/)
        if (checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
          zhushu += res.length
        }
      }
    }
    return zhushu
  }
  // END CLASS
}

const getCalcFuncByPlayID = playid => {
  switch (playid) {
    case 1: // 和值
      return 'calc_sum'
    case 15: // 三同号
      return 'calc_3thtx'
    case 5: // 三不同号
      return 'calc_3bthdt'
    case 7: // 二同号
      return 'calc_2thfx'
    case 10: // 二不同号
      return 'calc_2bthdt'
    case 14: // 两面玩法 双面盘
      return 'calc_sum'
  }
}

const calcFunc = new Calc_Zhushu_Obj()

const CalcObj = new Map([
  [1, { name: '和值', calcFunc: calcFunc.calc_sum }],
  [5, { name: '三不同号', calcFunc: calcFunc.calc_3bthdt }],
  [7, { name: '二同号', calcFunc: calcFunc.calc_sum }],
  [10, { name: '二不同号', calcFunc: calcFunc.calc_2bthdt }],
  [14, { name: '两面玩法 双面盘', calcFunc: calcFunc.calc_sum }],
  [15, { name: '三同号', calcFunc: calcFunc.calc_3thtx }]
])

/**
 * 根据玩法返回其玩法的显示类型
 * @param {string} name 玩法
 */
const getRenderTypeByName = name => {
  if (name.includes('和值')) {
    return RenderTypes.SINGLE_ROW_MUTI_PEILV
  }
  if (name.includes('三同号')) {
    return RenderTypes.SINGLE_ROW_MUTI_PEILV
  }
  if (name.includes('三不同号')) {
    // 胆拖
    return RenderTypes.MUTI_ROW_SINGLE_PEILV
  }
  if (name.includes('二同号')) {
    return RenderTypes.SINGLE_ROW_SINGLE_PEILV
  }
  if (name.includes('二不同号')) {
    return RenderTypes.MUTI_ROW_SINGLE_PEILV
  }
  if (name.includes('两面玩法')) {
    return RenderTypes.MUTI_ROW_MUTI_PEILV
  }
}

const getRenderTypeByPlayID = playid => {
  switch (playid) {
    case 1: // 和值
    case 15: // 三同号
      return RenderTypes.SINGLE_ROW_MUTI_PEILV
    case 5: // 三不同号
    case 10: // 二不同号
      return RenderTypes.MUTI_ROW_SINGLE_PEILV
    case 7: // 二同号
      return RenderTypes.SINGLE_ROW_SINGLE_PEILV
    case 14: // 两面玩法 双面盘
      return RenderTypes.MUTI_ROW_MUTI_PEILV
  }
}

// 根据玩法类型取得其显示类型

export {
  CalcObj,
  Calc_Zhushu_Obj,
  getCalcFuncByPlayID,
  getRenderTypeByName,
  getRenderTypeByPlayID
}
