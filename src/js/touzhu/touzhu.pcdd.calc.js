const { RenderTypes } = require('./commonTypes')

function checkArrIs(arr, regx) {
  return arr.every(item => regx.test(item))
}
// 用于PC蛋蛋注数计算的JS文件
function Calc_Zhushu_Obj() {
  this.calc_tema = function(ba) {
    if (ba.length < 1 || !checkArrIs(ba, /[0-9]/)) {
      return 0
    } else {
      return ba.length
    }
  }

  this.calc_temab3 = function(ba) {
    // if (ba.length < 3 || ba[2] === '') {
    //   return 0
    // } else {
    //   return 1
    // }
    return Array.isArray(ba) ? ba.length > 2 ? 1 : 0 : 0
  }

  this.calc_hh = function(ba) {
    if (ba.length < 1 || !checkArrIs(ba, /^([0-9])$/)) {
      return 0
    } else {
      return ba.length
    }
  }

  this.calc_bs = function(ba) {
    if (ba.length < 1 || !checkArrIs(ba, /^([0-2])$/)) {
      return 0
    } else {
      return ba.length
    }
  }

  this.calc_bz = function(ba) {
    if (parseInt(ba[0]) === 0) {
      return 1
    } else {
      return 0
    }
  }

  this.calc_dwd = function(ba) {
    if (ba.length < 2) {
      return 0
    } else {
      let zhushu = 0
      for (let i = 1, len = ba.length; i < len; i += 1) {
        const res = ba[i].split('|')
        if (checkArrIs(res, /^([0-9])$/)) {
          zhushu += res.length
        }
      }
      return zhushu
    }
  }

  this.calc_dw_dxds = function(ba) {
    if (ba.length < 2) {
      return 0
    } else {
      let zhushu = 0
      for (let i = 1, len = ba.length; i < len; i += 1) {
        const res = ba[i].split('|')
        if (checkArrIs(res, /^([0-3])$/)) {
          zhushu += res.length
        }
      }
      return zhushu
    }
  }

  this.calc_tmdxds = function(ba) {
    if (ba.length < 1) {
      return 0
    } else {
      return ba.length
    }
  }
}

/**
 * 根据玩法返回其玩法的显示类型
 * @param {string} name 玩法
 */
const getRenderTypeByName = name => {
  if (name.includes('包三')) {
    return RenderTypes.SINGLE_ROW_MUTI_PEILV
  }
  if (name.includes('特码')) {
    return RenderTypes.SINGLE_ROW_SINGLE_PEILV
  }
  if (name.includes('混合')) {
    return RenderTypes.SINGLE_ROW_MUTI_PEILV
  }
}

const getRenderTypeByPlayID = playid => {
  switch (playid) {
    case 1: // 特码
      return RenderTypes.SINGLE_ROW_MUTI_PEILV
    case 2: // 包三
      return RenderTypes.SINGLE_ROW_SINGLE_PEILV
    case 3: // 混合
      return RenderTypes.SINGLE_ROW_MUTI_PEILV
  }
}

export { Calc_Zhushu_Obj, getRenderTypeByName, getRenderTypeByPlayID }
