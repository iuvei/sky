// 3D  排列3  计算注数 文件
function checkArrIs(arr, regx) {
  return arr.every(item => regx.test(item))
}
function Calc_Zhushu_Obj() {
  // 三星直选复式
  this.calc_3x_zhxfs = function(balls) {
    // return 0;
    if (
      balls.length !== 3 ||
      balls[0] === '' ||
      balls[1] === '' ||
      balls[2] === ''
    ) {
      return 0
    }
    const ba0 = balls[0].split('|')
    const ba1 = balls[1].split('|')
    const ba2 = balls[2].split('|')
    const c = ba0.concat(ba1).concat(ba2)
    if (c.join('').length) return ba0.length * ba1.length * ba2.length
    return 0
  }

  // 三星 直选单式
  this.calc_3x_zhxds = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    }
    let zhushu = 0
    for (let i = 0; i < ba.length; i++) {
      const balls = ba[i].split(/[\|\/]/)
      if (!checkArrIs(balls, /^([0-9]|[0][0-9])$/) || balls.length !== 3) {
        return 0
      } else {
        zhushu++
      }
    }
    return zhushu
  }

  // 三星 和值  牛逼的存在
  this.calc_3x_zhxhz = function(balls) {
    if (balls.length < 1 || balls[0] === '') {
      return 0
    } else {
      return balls.length
    }
  }

  // 三星 组三复式
  this.calc_3x_zu3fs = function(ba) {
    if (ba.length < 2) {
      return 0
    }
    switch (ba.length) {
      case 2:
        return 2
      case 3:
        return 6
      case 4:
        return 12
      case 5:
        return 20
      case 6:
        return 30
      case 7:
        return 42
      case 8:
        return 56
      case 9:
        return 72
      case 10:
        return 90
    }
    return 0
  }

  // 三星 组六复式
  this.calc_3x_zu6fs = function(ba) {
    if (ba.length < 3) {
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
    }
    return 0
  }
  // 三星 组三和值
  this.calc_3x_zu3hz = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  // 三星 组六和值
  this.calc_3x_zu6hz = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  // 二星  前二直选复式
  this.calc_2x_q2zhxfs = function(ba) {
    if (ba.length < 2) {
      return 0
    }
    if (ba[0].length === 0 || ba[1].length === 0) return 0
    const ba0 = ba[0].split('|')
    const ba1 = ba[1].split('|')
    return ba0.length * ba1.length
  }

  // 二星 后二直选复式
  this.calc_2x_h2zhxfs = function(ba) {
    if (ba.length < 2) {
      return 0
    }
    if (ba[0].length === 0 || ba[1].length === 0) return 0
    const ba0 = ba[0].split('|')
    const ba1 = ba[1].split('|')
    return ba0.length * ba1.length
  }

  // 二星 前二组选复式
  this.calc_2x_q2zuxfs = function(ba) {
    if (ba.length < 2) {
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
    }
    return 0
  }
  // 二星 后二组选复式
  this.calc_2x_h2zuxfs = function(ba) {
    if (ba.length < 2) {
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
    }
    return 0
  }

  // 定位胆
  this.calc_dwd_dwd = function(ba) {
    if (ba.length < 1) {
      return 0
    }
    if (ba[0].length === 0 && ba[1].length === 0 && ba[2].length === 0) {
      return 0
    }
    let num = 0
    for (const i in ba) {
      if (!ba[i].length) continue
      const len = ba[i].split('|')
      if (len[0] !== '?') {
        num += len.length
      }
    }
    return num
  }

  // 不定位 一码
  this.calc_bdw_1mbdw = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  // 不定位 二码
  this.calc_bdw_2mbdw = function(ba) {
    if (ba.length < 2) {
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
    }
    return 0
  }

  // 大小单双 前二
  this.calc_dxds_q2dxds = function(ba) {
    if (ba.length !== 2) {
      return 0
    } else {
      const ba0 = ba[0].split('|')
      const ba1 = ba[1].split('|')
      return ba0.length * ba1.length
    }
  }

  // 大小单双 后二
  this.calc_dxds_h2dxds = function(ba) {
    if (ba.length !== 2) {
      return 0
    } else {
      const ba0 = ba[0].split('|')
      const ba1 = ba[1].split('|')
      return ba0.length * ba1.length
    }
  }

  // 对子通选
  this.calc_dztx = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return 1
    }
  }

  // 对子单选
  this.calc_dzdx = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  // 顺子通选
  this.calc_sztx = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return 1
    }
  }

  // 顺子单选
  this.calc_szdx = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  // 豹子通选
  this.calc_bztx = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return 1
    }
  }

  // 豹子单选
  this.calc_bzdx = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  // 龙虎斗
  this.calc_lhd = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  // 定位大小单双
  this.calc_dw_dxds = function(ba) {
    if (ba.length < 2 || ba[1] === '') {
      return 0
    } else {
      let zhushu = 0
      for (let i = 1, len = ba.length; i < len; i += 1) {
        const res_balls = ba[i].split('|')
        zhushu += res_balls.length
      }
      return zhushu
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

  // 双面盘
  this.calc_smp = function(ba) {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  // END FUNCTION calc_zhushu_obj
}

const calc = new Calc_Zhushu_Obj()

const CalcObj = new Map([
  [1, { name: '三星直选复式', calcFn: calc.calc_3x_zhxfs }],
  [2, { name: '三星直选单式', calcFn: calc.calc_3x_zhxds }],
  [3, { name: '三星 和值', calcFn: calc.calc_3x_zhxhz }],
  [4, { name: '三星 组三复式', calcFn: calc.calc_3x_zu3fs }],
  [5, { name: '三星 组六复式', calcFn: calc.calc_3x_zu6fs }],
  [6, { name: '三星 组三和值', calcFn: calc.calc_3x_zu3hz }],
  [7, { name: '三星 组六和值', calcFn: calc.calc_3x_zu6hz }],
  [8, { name: '二星  前二直选复式', calcFn: calc.calc_2x_q2zhxfs }],
  [9, { name: '二星 后二直选复式', calcFn: calc.calc_2x_h2zhxfs }],
  [10, { name: '二星 前二组选复式', calcFn: calc.calc_2x_q2zuxfs }],
  [11, { name: '二星 后二组选复式', calcFn: calc.calc_2x_h2zuxfs }],
  [12, { name: '定位胆 数字盘', calcFn: calc.calc_dwd_dwd }],
  [13, { name: '不定位 一码', calcFn: calc.calc_bdw_1mbdw }],
  [14, { name: '不定位 二码', calcFn: calc.calc_bdw_2mbdw }],
  // [15, { name: '三星直选复式', calcFn: calc.calc_3x_zhxfs }],
  // [16, { name: '三星直选复式', calcFn: calc.calc_3x_zhxfs }],
  // [17, { name: '三星直选复式', calcFn: calc.calc_3x_zhxfs }],
  [26, { name: '双面盘', calcFn: calc.calc_smp }],
  [27, { name: '龙虎斗', calcFn: calc.calc_lhd }]
])

export { Calc_Zhushu_Obj, CalcObj }
