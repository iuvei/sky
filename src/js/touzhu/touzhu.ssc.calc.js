const { RenderTypes } = require('./commonTypes')
const pos_count = 0
function checkArrIs(arr, regx) {
  return arr.every(item => regx.test(item))
}
function contains(arr, obj) {
  return arr.includes(obj)
}
function Calc_Zhushu_Obj() {
  // 五星直选复式
  this.calc_5x_zxfs = function(ba) {
    if (ba.length !== 5) {
      return 0
    }
    const num = []
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split('|')
      if (checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        num[i] = res.length
      } else {
        return 0
      }
    }
    return num[0] * num[1] * num[2] * num[3] * num[4]
  }

  // 五星直选单式
  this.calc_5x_zxds = function(ba) {
    let zhushu = 0
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/)
      if (checkArrIs(res, /^([0-9]|[0][0-9])$/) && res.length === 5) {
        zhushu++
      }
    }
    return zhushu
  }

  /* start at 2017-07-10 am */
  // 五星直选组合
  this.calc_5x_zxzh = function(ba) {
    if (ba.length !== 5) {
      return 0
    }
    const zhushu = 5
    const temp_arr = []
    for (let i = 0; i < 5; i += 1) {
      const res = ba[i].split('|')
      if (!checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        return 0
      }
      temp_arr.push(res.length)
    }
    return (
      zhushu *
      temp_arr[0] *
      temp_arr[1] *
      temp_arr[2] *
      temp_arr[3] *
      temp_arr[4]
    )
  }

  // 五星组选120
  this.calc_5x_zx120 = function(ba) {
    if (ba.length < 5 || !checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
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

      default:
        return 0
    }
  }

  // 五星 组选60
  this.calc_5x_zx60 = function(ba) {
    if (ba.length !== 2) {
      return 0
    }
    const balls1 = ba[0].split('|')
    const balls2 = ba[1].split('|')
    if (
      !checkArrIs(balls1, /^([0-9]|[0][0-9])$/) ||
      !checkArrIs(balls2, /^([0-9]|[0][0-9])$/)
    ) {
      return 0
    }
    let zhushu = 0
    // 循环二重号码球
    for (let i = 0; i < balls1.length; i += 1) {
      // 判断该二重号是否与单号重复
      let temp_length = 0,
        sub_zhushu = 0
      if (contains(balls2, balls1[i])) {
        temp_length = balls2.length - 1
      } else {
        temp_length = balls2.length
      }
      // 计算单号球个数
      switch (temp_length) {
        case 3:
          sub_zhushu = 1
          break
        case 4:
          sub_zhushu = 4
          break
        case 5:
          sub_zhushu = 10
          break
        case 6:
          sub_zhushu = 20
          break
        case 7:
          sub_zhushu = 35
          break
        case 8:
          sub_zhushu = 56
          break
        case 9:
          sub_zhushu = 84
          break
        default:
          sub_zhushu = 0
          break
      }
      zhushu += sub_zhushu
    }
    return zhushu
  }

  // 五星组选30
  this.calc_5x_zx30 = function(ba) {
    if (ba.length !== 2) {
      return 0
    }
    const balls1 = ba[0].split('|')
    const balls2 = ba[1].split('|')
    if (
      !checkArrIs(balls1, /^([0-9]|[0][0-9])$/) ||
      !checkArrIs(balls2, /^([0-9]|[0][0-9])$/)
    ) {
      return 0
    }
    let zhushu = 0
    // 循环单号号码球
    for (let i = 0; i < balls2.length; i += 1) {
      let temp_length = 0,
        sub_zhushu = 0
      if (contains(balls1, balls2[i])) {
        temp_length = balls1.length - 1
      } else {
        temp_length = balls1.length
      }
      // 计算双重号号球个数
      switch (temp_length) {
        case 2:
          sub_zhushu = 1
          break
        case 3:
          sub_zhushu = 3
          break
        case 4:
          sub_zhushu = 6
          break
        case 5:
          sub_zhushu = 10
          break
        case 6:
          sub_zhushu = 15
          break
        case 7:
          sub_zhushu = 21
          break
        case 8:
          sub_zhushu = 28
          break
        case 9:
          sub_zhushu = 36
          break
        default:
          sub_zhushu = 0
          break
      }
      zhushu += sub_zhushu
    }
    return zhushu
  }

  // 组选20
  this.calc_5x_zx20 = function(ba) {
    if (ba.length !== 2) {
      return 0
    }
    const balls1 = ba[0].split('|')
    const balls2 = ba[1].split('|')
    if (
      !checkArrIs(balls1, /^([0-9]|[0][0-9])$/) ||
      !checkArrIs(balls2, /^([0-9]|[0][0-9])$/)
    ) {
      return 0
    }
    let zhushu = 0
    // 循环三重号码球
    for (let i = 0; i < balls1.length; i += 1) {
      let temp_length = 0,
        sub_zhushu = 0
      if (contains(balls2, balls1[i])) {
        temp_length = balls2.length - 1
      } else {
        temp_length = balls2.length
      }
      // 计算不同号号球个数
      switch (temp_length) {
        case 2:
          sub_zhushu = 1
          break
        case 3:
          sub_zhushu = 3
          break
        case 4:
          sub_zhushu = 6
          break
        case 5:
          sub_zhushu = 10
          break
        case 6:
          sub_zhushu = 15
          break
        case 7:
          sub_zhushu = 21
          break
        case 8:
          sub_zhushu = 28
          break
        case 9:
          sub_zhushu = 36
          break
        default:
          sub_zhushu = 0
          break
      }
      zhushu += sub_zhushu
    }
    return zhushu
  }

  // 五星 组选10
  this.calc_5x_zx10 = function(ba) {
    if (ba.length !== 2) {
      return 0
    }
    const balls1 = ba[0].split('|')
    const balls2 = ba[1].split('|')
    if (
      !checkArrIs(balls1, /^([0-9]|[0][0-9])$/) ||
      !checkArrIs(balls2, /^([0-9]|[0][0-9])$/)
    ) {
      return 0
    }
    let zhushu = 0
    for (let i = 0; i < balls1.length; i += 1) {
      if (contains(balls2, balls1[i])) {
        zhushu += balls2.length - 1
      } else {
        zhushu += balls2.length
      }
    }
    return zhushu
  }

  // 五星 组选5
  this.calc_5x_zx5 = function(ba) {
    if (ba.length !== 2) {
      return 0
    }
    const balls1 = ba[0].split('|')
    const balls2 = ba[1].split('|')
    if (
      !checkArrIs(balls1, /^([0-9]|[0][0-9])$/) ||
      !checkArrIs(balls2, /^([0-9]|[0][0-9])$/)
    ) {
      return 0
    }
    let zhushu = 0
    for (let i = 0; i < balls1.length; i += 1) {
      if (contains(balls2, balls1[i])) {
        zhushu += balls2.length - 1
      } else {
        zhushu += balls2.length
      }
    }
    return zhushu
  }

  /* end at 2017-07-10 pm */

  // 四星直选复式f
  this.calc_4x_zxfs = function(ba) {
    if (ba.length !== 4) {
      return 0
    }
    const num = []
    for (let i = 0; i < ba.length; i++) {
      const k = ba[i].split('|')
      if (checkArrIs(k, /^([0-9]|[0][0-9])$/)) {
        num[i] = k.length
      } else {
        return 0
      }
    }
    return num[0] * num[1] * num[2] * num[3]
  }

  // 四星直选单式
  this.calc_4x_zxds = function(ba) {
    let zhushu = 0
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/)
      if (checkArrIs(res, /^([0-9]|[0][0-9])$/) && res.length === 4) {
        zhushu++
      }
    }
    return zhushu
  }

  /* start at 2017-07-10 pm */

  // 四星直选组合
  this.calc_4x_zxzh = function(ba) {
    if (ba.length !== 4) {
      return 0
    }
    const zhushu = 4
    const temp_arr = []
    for (let i = 0; i < 4; i += 1) {
      const res = ba[i].split('|')
      if (!checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        return 0
      }
      temp_arr.push(res.length)
    }
    return zhushu * temp_arr[0] * temp_arr[1] * temp_arr[2] * temp_arr[3]
  }

  // 四星组选24
  this.calc_4x_zx24 = function(ba) {
    const len = ba.length
    if (len < 4 || !checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0
    }
    switch (len) {
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
      default:
        return 0
    }
  }

  // 四星 组选12
  this.calc_4x_zx12 = function(ba) {
    const len = ba.length
    if (len !== 2) {
      return 0
    }
    const balls1 = ba[0].split('|')
    const balls2 = ba[1].split('|')
    if (
      !checkArrIs(balls1, /^([0-9]|[0][0-9])$/) ||
      !checkArrIs(balls2, /^([0-9]|[0][0-9])$/)
    ) {
      return 0
    }
    let zhushu = 0
    for (let i = 0; i < balls1.length; i += 1) {
      let temp_len = 0,
        sub_zhushu = 0
      if (contains(balls2, balls1[i])) {
        temp_len = balls2.length - 1
      } else {
        temp_len = balls2.length
      }
      switch (temp_len) {
        case 2:
          sub_zhushu = 1
          break
        case 3:
          sub_zhushu = 3
          break
        case 4:
          sub_zhushu = 6
          break
        case 5:
          sub_zhushu = 10
          break
        case 6:
          sub_zhushu = 15
          break
        case 7:
          sub_zhushu = 21
          break
        case 8:
          sub_zhushu = 28
          break
        case 9:
          sub_zhushu = 36
          break
        default:
          sub_zhushu = 0
          break
      }
      zhushu += sub_zhushu
    }
    return zhushu
  }

  // 四星组选6
  this.calc_4x_zx6 = function(ba) {
    if (ba.length < 2 || !checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0
    }
    const len = ba.length
    switch (len) {
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
      default:
        return 0
    }
  }

  // 四星 组选4
  this.calc_4x_zx4 = function(ba) {
    if (ba.length !== 2) {
      return 0
    }
    const balls1 = ba[0].split('|')
    const balls2 = ba[1].split('|')
    if (
      !checkArrIs(balls1, /^([0-9]|[0][0-9])$/) ||
      !checkArrIs(balls2, /^([0-9]|[0][0-9])$/)
    ) {
      return 0
    }
    let zhushu = 0
    for (let i = 0; i < balls1.length; i += 1) {
      let sub_zhushu = 0
      if (contains(balls2, balls1[i])) {
        sub_zhushu = balls2.length - 1
      } else {
        sub_zhushu = balls2.length
      }
      zhushu += sub_zhushu
    }
    return zhushu
  }

  /* end at 2017-07-10 pm */

  // 三星直选复式
  this.calc_h3_zxfs = function(ba) {
    if (ba.length !== 3) {
      return 0
    }
    const num = []
    for (let i = 0; i < ba.length; i++) {
      const k = ba[i].split('|')
      if (checkArrIs(k, /^([0-9]|[0][0-9])$/)) {
        num[i] = k.length
      }
    }
    return num[0] * num[1] * num[2]
  }

  // 三星直选单式
  this.calc_h3_zxds = function(ba) {
    let zhushu = 0
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/)
      if (checkArrIs(res, /^([0-9]|[0][0-9])$/) && res.length === 3) {
        zhushu++
      }
    }
    return zhushu
  }

  // 后三组合
  this.calc_h3_zh = function(ba) {
    if (ba.length !== 3) {
      return 0
    }
    const num = []
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/)
      if (checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        num[i] = res.length
      } else {
        return 0
      }
    }
    return num[0] * num[1] * num[2] * 3
  }

  // 直选和值
  this.calc_h3_zxhz = function(ba) {
    let zhushu = 0
    for (let i = 0; i < ba.length; i++) {
      const value = parseInt(ba[i])
      if (value >= 0 && value <= 27) {
        let n = 0
        if (value <= 13) {
          n = value + 2
        } else if (value > 13) {
          n = 29 - value
        }
        if (n === 12) {
          zhushu += 63
        } else if (n === 13) {
          zhushu += 69
        } else if (n === 14) {
          zhushu += 73
        } else if (n === 15) {
          zhushu += 75
        } else {
          zhushu += n * ((n - 1) / 2)
        }
      }
    }
    return zhushu
  }

  // 直选跨度
  this.calc_h3_zxkd = function(ba) {
    let zhushu = 0
    for (let i = 0; i < ba.length; i++) {
      const value = parseInt(ba[i])
      switch (value) {
        case 0:
          zhushu += 10
          break
        case 1:
        case 9:
          zhushu += 54
          break
        case 2:
        case 8:
          zhushu += 96
          break
        case 3:
        case 7:
          zhushu += 126
          break
        case 4:
        case 6:
          zhushu += 144
          break
        case 5:
          zhushu += 150
      }
    }
    return zhushu
  }

  // 组三复式
  this.calc_h3_z3fs = function(ba) {
    const n = ba.length
    let zhushu = 0
    switch (n) {
      case 2:
        zhushu = 2
        break
      case 3:
        zhushu = 6
        break
      case 4:
        zhushu = 12
        break
      case 5:
        zhushu = 20
        break
      case 6:
        zhushu = 30
        break
      case 7:
        zhushu = 42
        break
      case 8:
        zhushu = 56
        break
      case 9:
        zhushu = 72
        break
      case 10:
        zhushu = 90
        break
    }
    return zhushu
  }

  // 组三单式
  this.calc_h3_z3ds = function(ba) {
    // console.log('组三单式： ')
    // console.log(ba)
    let zhushu = 0
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/)
      if (res.length === 3 && checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        const a = res[0] * 1,
          b = res[1] * 1,
          c = res[2] * 1
        if (
          (a === b && a !== c) ||
          (a === c && a !== b) ||
          (b === c && a !== b)
        ) {
          zhushu++
        }
      }
    }
    return zhushu
  }

  // 组六复式
  this.calc_h3_z6fs = function(ba) {
    const n = ba.length
    switch (n) {
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

  // 组六单式
  this.calc_h3_z6ds = function(ba) {
    let zhushu = 0
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/)
      if (res.length === 3 && checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        if (
          res[0] * 1 !== res[1] * 1 &&
          res[1] * 1 !== res[2] * 1 &&
          res[0] * 1 !== res[2] * 1
        ) {
          zhushu++
        }
      }
    }
    return zhushu
  }

  // 混合组选
  this.calc_h3_hhzx = function(ba) {
    let zhushu = 0
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/)
      if (res.length === 3 && checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        if (res[0] !== res[1] || res[0] !== res[2] || res[1] !== res[2]) {
          // 不包含豹子
          zhushu++
        }
      }
    }
    return zhushu
  }

  // 组选和值
  this.calc_h3_zuxhz = function(ba) {
    let zhushu = 0
    for (let i = 0; i < ba.length; i++) {
      const value = parseInt(ba[i])
      switch (value) {
        case 1:
        case 26:
          zhushu += 1
          break
        case 2:
        case 3:
        case 24:
        case 25:
          zhushu += 2
          break
        case 4:
        case 23:
          zhushu += 4
          break
        case 5:
        case 22:
          zhushu += 5
          break
        case 6:
        case 21:
          zhushu += 6
          break
        case 7:
        case 20:
          zhushu += 8
          break
        case 8:
        case 19:
          zhushu += 10
          break
        case 9:
        case 18:
          zhushu += 11
          break
        case 10:
        case 17:
          zhushu += 13
          break
        case 11:
        case 12:
        case 16:
        case 15:
          zhushu += 14
          break
        case 13:
        case 14:
          zhushu += 15
          break
      }
    }
    return zhushu
  }

  // 组选包胆
  this.calc_h3_zuxbd = function(ba) {
    if (ba.length !== 1 || !checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0
    }
    return 54
  }

  // 和值尾数
  this.calc_h3_sumws = function(ba) {
    if (ba.length < 1 || !checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0
    } else {
      return ba.length
    }
  }

  // 特殊号
  this.calc_h3_tsh = function(ba) {
    if (ba.length < 1 || !checkArrIs(ba, /^([0-2])$/)) {
      return 0
    }
    return ba.length
  }

  // 前二直选复式
  this.calc_q2_zxfs = function(ba) {
    if (ba.length !== 2) {
      return 0
    }
    const ba_0 = ba[0].split('|')
    const ba_1 = ba[1].split('|')
    if (
      checkArrIs(ba_0, /^([0-9]|[0][0-9])$/) &&
      checkArrIs(ba_1, /^([0-9]|[0][0-9])$/)
    ) {
      return ba_0.length * ba_1.length
    } else {
      return 0
    }
  }

  // 前二直选单式
  this.calc_q2_zxds = function(ba) {
    let zhushu = 0
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/)
      if (res.length === 2 && checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        zhushu++
      }
    }
    return zhushu
  }

  // 前二直选和值
  this.calc_q2_zhxhz = function(ba) {
    let zhushu = 0
    for (let i = 0; i < ba.length; i++) {
      const value = parseInt(ba[i])
      if (value < 10) {
        zhushu += value + 1
      } else if (value < 19) {
        zhushu += 19 - value
      }
    }
    return zhushu
  }

  // 前二 直选跨度
  this.calc_q2_zxkd = function(ba) {
    let zhushu = 0
    if (!checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0
    }
    for (let i = 0; i < ba.length; i++) {
      const value = parseInt(ba[i])
      switch (value) {
        case 0:
          zhushu += 10
          break
        case 1:
          zhushu += 18
          break
        case 2:
          zhushu += 16
          break
        case 3:
          zhushu += 14
          break
        case 4:
          zhushu += 12
          break
        case 5:
          zhushu += 10
          break
        case 6:
          zhushu += 8
          break
        case 7:
          zhushu += 6
          break
        case 8:
          zhushu += 4
          break
        case 9:
          zhushu += 2
          break
      }
    }
    return zhushu
  }

  // 前二 组选复式
  this.calc_q2_zuxfs = function(ba) {
    const count = ba.length
    if (!checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0
    }
    switch (count) {
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

  // 前二 组选单式
  this.calc_q2_zuxds = function(ba) {
    let zhushu = 0
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/)
      if (
        res.length === 2 &&
        checkArrIs(res, /^([0-9]|[0][0-9])$/) &&
        res[0] * 1 !== res[1] * 1
      ) {
        zhushu++
      }
    }
    return zhushu
  }

  // 前二 组选和值
  this.calc_q2_zuxhz = function(ba) {
    let zhushu = 0
    for (let i = 0; i < ba.length; i++) {
      const value = parseInt(ba[i])
      switch (value) {
        case 1:
        case 2:
        case 16:
        case 17:
          zhushu += 1
          break
        case 3:
        case 4:
        case 14:
        case 15:
          zhushu += 2
          break
        case 5:
        case 6:
        case 12:
        case 13:
          zhushu += 3
          break
        case 7:
        case 8:
        case 10:
        case 11:
          zhushu += 4
          break
        case 9:
          zhushu += 5
          break
      }
    }
    return zhushu
  }

  // 前二 组选包胆
  this.calc_q2_zuxbd = function(ba) {
    if (ba.length !== 1 || !checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0
    } else {
      return 9
    }
  }

  // 定位胆
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

  // 三星 不定位 3中1码
  this.calc_bdw_31m = function(ba) {
    if (ba.length < 1 || !checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0
    } else {
      return ba.length
    }
  }

  // 三星 不定位 3中2码
  this.calc_bdw_32m = function(ba) {
    if (!checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0
    }
    const n = ba.length
    return n * ((n - 1) / 2)
  }
  // 三星 不定位 3中3码
  this.calc_bdw_33m = function(ba) {
    if (!checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0
    }
    const n = ba.length
    switch (n) {
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

  // 前二 大小单双
  this.calc_q2_dxds = function(ba) {
    if (ba.length !== 2) {
      return 0
    }
    let zhushu = 1
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/)
      if (checkArrIs(res, /[0-3]/)) {
        zhushu *= res.length
      } else {
        return 0
      }
    }
    return zhushu
  }

  // 后二 大小单双
  this.calc_h2_dxds = function(ba) {
    if (ba.length !== 2) {
      return 0
    }
    let zhushu = 1
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/)
      if (checkArrIs(res, /[0-3]/)) {
        zhushu *= res.length
      } else {
        return 0
      }
    }
    return zhushu
  }

  // 前三 大小单双
  this.calc_q3_dxds = function(ba) {
    if (ba.length !== 3) {
      return 0
    }
    let zhushu = 1
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/)
      if (checkArrIs(res, /[0-3]/)) {
        zhushu *= res.length
      } else {
        return 0
      }
    }
    return zhushu
  }

  // 后三 大小单双
  this.calc_h3_dxds = function(ba) {
    if (ba.length !== 3) {
      return 0
    }
    let zhushu = 1
    for (let i = 0; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/)
      if (checkArrIs(res, /[0-3]/)) {
        zhushu *= res.length
      } else {
        return 0
      }
    }
    return zhushu
  }

  // 任二 直选复式
  this.calc_r2_zxfs = function(ba) {
    // console.log(ba)
    const len = ba.length
    if (len < 3) return 0

    let a = 0,
      b = 0,
      c = 0,
      d = 0,
      e = 0
    if (ba[1]) {
      const res = ba[1].split(/[\|\/]/)
      if (checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        a = res.length
      }
    }
    if (ba[2]) {
      const res = ba[2].split(/[\|\/]/)
      if (checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        b = res.length
      }
    }
    if (ba[3]) {
      const res = ba[3].split(/[\|\/]/)
      if (checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        c = res.length
      }
    }
    if (ba[4]) {
      const res = ba[4].split(/[\|\/]/)
      if (checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        d = res.length
      }
    }
    if (ba[5]) {
      const res = ba[5].split(/[\|\/]/)
      if (checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        e = res.length
      }
    }
    return a * (b + c + d + e) + b * (c + d + e) + c * (d + e) + d * e
  }

  // 任二 直选单式
  this.calc_r2_zxds = function(ba) {
    let zhushu = 0,
      pos_count
    if (ba.length < 2) {
      return 0
    }
    for (let i = 1; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/)
      if (res.length === 2 && checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        zhushu++
      }
    }
    return zhushu * pos_count
  }

  // 任二 直选和值
  this.calc_r2_zxhz = function(ba) {
    // console.log('数据:')
    // console.log(ba)
    // 24 3 5 7 9/33
    let zhushu = 0
    if (ba.length < 2) {
      return 0
    }
    for (let i = 1; i < ba.length; i++) {
      const sub_arr = [ba[i]]
      if (!checkArrIs(sub_arr, /^(([0-9]|[1][0-8])|([0][0-9]))$/)) {
        return 0
      }
      const value = parseInt(ba[i])
      switch (value) {
        case 0:
        case 18:
          zhushu += 1
          break
        case 1:
        case 17:
          zhushu += 2
          break
        case 2:
        case 16:
          zhushu += 3
          break
        case 3:
        case 15:
          zhushu += 4
          break
        case 4:
        case 14:
          zhushu += 5
          break
        case 5:
        case 13:
          zhushu += 6
          break
        case 6:
        case 12:
          zhushu += 7
          break
        case 7:
        case 11:
          zhushu += 8
          break
        case 8:
        case 10:
          zhushu += 9
          break
        case 9:
          zhushu += 10
          break
      }
    }
    return zhushu
  }

  // 任二 组选复式
  this.calc_r2_zuxfs = function(ba) {
    let zhushu = 0
    if (ba.length < 3) {
      return 0
    }

    for (let i = 1; i < ba.length; i++) {
      const value = parseInt(ba[i])
      if (value >= 0 && value <= 9) {
        zhushu++
      }
    }
    return zhushu * ((zhushu - 1) / 2)
  }

  // 任二 组选单式
  this.calc_r2_zuxds = function(ba) {
    let zhushu = 0
    if (ba.length < 2) {
      return 0
    }
    for (let i = 1; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/)
      if (res.length === 2 && checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        if (res[0] !== res[1]) {
          zhushu++
        }
      }
    }
    return zhushu
  }

  // 任二 组选和值
  this.calc_r2_zuxhz = function(ba) {
    let zhushu = 0
    if (ba.length < 2) {
      return 0
    }
    for (let i = 1; i < ba.length; i++) {
      const value = parseInt(ba[i])
      switch (value) {
        case 1:
        case 2:
        case 16:
        case 17:
          zhushu += 1
          break
        case 3:
        case 4:
        case 14:
        case 15:
          zhushu += 2
          break
        case 5:
        case 6:
        case 12:
        case 13:
          zhushu += 3
          break
        case 7:
        case 8:
        case 10:
        case 11:
          zhushu += 4
          break
        case 9:
          zhushu += 5
          break
      }
    }
    return zhushu
  }

  // 任三 直选复式
  this.calc_r3_zxfs = function(ba) {
    const len = ba.length
    if (len < 4) {
      return 0
    }
    let a = 0,
      b = 0,
      c = 0,
      d = 0,
      e = 0
    if (ba[1]) {
      const res = ba[1].split(/[\|\/]/)
      if (checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        a = res.length
      }
    }
    if (ba[2]) {
      const res = ba[2].split(/[\|\/]/)
      if (checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        b = res.length
      }
    }
    if (ba[3]) {
      const res = ba[3].split(/[\|\/]/)
      if (checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        c = res.length
      }
    }
    if (ba[4]) {
      const res = ba[4].split(/[\|\/]/)
      if (checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        d = res.length
      }
    }
    if (ba[5]) {
      const res = ba[5].split(/[\|\/]/)
      if (checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        e = res.length
      }
    }
    //		console.log(a+' '+b+' '+c+' '+d+' '+e);
    return (
      a * b * (c + d + e) +
      a * c * (d + e) +
      a * d * e +
      b * c * (d + e) +
      b * d * e +
      c * d * e
    )
  }

  // 任三 直选单式
  this.calc_r3_zxds = function(ba) {
    let zhushu = 0
    if (ba.length < 2) {
      return 0
    }
    for (let i = 1; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/)
      if (res.length === 3 && checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        zhushu++
      }
    }
    return zhushu * pos_count
  }

  // 任三 直选和值
  this.calc_r3_zxhz = function(ba) {
    let zhushu = 0
    if (ba.length < 2) {
      return 0
    }
    for (let i = 1; i < ba.length; i++) {
      const value = parseInt(ba[i])
      if (value >= 0 && value <= 27) {
        let n = 0
        if (value <= 13) {
          n = value + 2
        } else if (value > 13) {
          n = 29 - value
        }
        if (n === 12) {
          zhushu += 63
        } else if (n === 13) {
          zhushu += 69
        } else if (n === 14) {
          zhushu += 73
        } else if (n === 15) {
          zhushu += 75
        } else {
          zhushu += n * ((n - 1) / 2)
        }
      }
    }
    return zhushu
  }

  // 任三 组三复式
  this.calc_r3_zu3fs = function(ba) {
    let zhushu = 0
    const len = ba.length
    if (len < 3) {
      return 0
    }
    switch (len - 1) {
      case 2:
        zhushu = 2
        break
      case 3:
        zhushu = 6
        break
      case 4:
        zhushu = 12
        break
      case 5:
        zhushu = 20
        break
      case 6:
        zhushu = 30
        break
      case 7:
        zhushu = 42
        break
      case 8:
        zhushu = 56
        break
      case 9:
        zhushu = 72
        break
      case 10:
        zhushu = 90
        break
    }
    return zhushu
  }

  // 任三 组三单式
  this.calc_r3_zu3ds = function(ba) {
    let zhushu = 0
    if (ba.length < 2 || ba[0] < 7) {
      return 0
    }
    for (let i = 1; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/)
      if (res.length === 3 && checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        const a = res[0] * 1,
          b = res[1] * 1,
          c = res[2] * 1
        if (
          (a === b && a !== c) ||
          (a === c && a !== b) ||
          (b === c && a !== b)
        ) {
          zhushu++
        }
      }
    }
    return zhushu * pos_count
  }

  // 任三 组六复式
  this.calc_r3_zu6fs = function(ba) {
    const len = ba.length
    let zhushu = 0
    if (len < 4) {
      return 0
    }
    switch (len - 1) {
      case 3:
        zhushu = 1
        break
      case 4:
        zhushu = 4
        break
      case 5:
        zhushu = 10
        break
      case 6:
        zhushu = 20
        break
      case 7:
        zhushu = 35
        break
      case 8:
        zhushu = 56
        break
      case 9:
        zhushu = 84
        break
      case 10:
        zhushu = 120
        break
    }
    return zhushu
  }

  // 任三 组六单式
  this.calc_r3_zu6ds = function(ba) {
    if (ba.length < 2) {
      return
    }
    let zhushu = 0
    for (let i = 1; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/)
      if (res.length === 3 && checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        if (res[0] !== res[1] && res[0] !== res[2] && res[1] !== res[2]) {
          zhushu++
        }
      }
    }
    return zhushu
  }

  // 任三 混合组选
  this.calc_r3_hhzx = function(ba) {
    // return 0;
    // console.log('任三-混合组选：')
    // console.log(ba)
    if (ba.length < 2 || ba[1] === '') {
      return 0
    }
    let zhushu = 0
    for (let i = 1; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/)
      if (res.length === 3 && checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        if (res[0] !== res[1] || res[0] !== res[2] || res[1] !== res[2]) {
          zhushu++
        }
      }
    }
    return zhushu
  }

  // 任三 组选和值
  this.calc_r3_zuxhz = function(ba) {
    // console.log(ba)
    if (ba.length < 2) {
      return 0
    }
    let zhushu = 0
    for (let i = 1; i < ba.length; i++) {
      const value = parseInt(ba[i])
      switch (value) {
        case 1:
        case 26:
          zhushu += 1
          break
        case 2:
        case 3:
        case 24:
        case 25:
          zhushu += 2
          break
        case 4:
        case 23:
          zhushu += 4
          break
        case 5:
        case 22:
          zhushu += 5
          break
        case 6:
        case 21:
          zhushu += 6
          break
        case 7:
        case 20:
          zhushu += 8
          break
        case 8:
        case 19:
          zhushu += 10
          break
        case 9:
        case 18:
          zhushu += 11
          break
        case 10:
        case 17:
          zhushu += 13
          break
        case 11:
        case 12:
        case 16:
        case 15:
          zhushu += 14
          break
        case 13:
        case 14:
          zhushu += 15
          break
      }
    }
    return zhushu
  }

  // 任四 直选复式
  this.calc_r4_zxfs = function(ba) {
    const len = ba.length
    if (len < 5) {
      return 0
    }

    let a = 0,
      b = 0,
      c = 0,
      d = 0,
      e = 0
    if (ba[1]) {
      const res = ba[1].split(/[\|\/]/)
      if (checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        a = res.length
      }
    }
    if (ba[2]) {
      const res = ba[2].split(/[\|\/]/)
      if (checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        b = res.length
      }
    }
    if (ba[3]) {
      const res = ba[3].split(/[\|\/]/)
      if (checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        c = res.length
      }
    }
    if (ba[4]) {
      const res = ba[4].split(/[\|\/]/)
      if (checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        d = res.length
      }
    }
    if (ba[5]) {
      const res = ba[5].split(/[\|\/]/)
      if (checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        e = res.length
      }
    }
    return (
      a * b * c * d +
      a * b * c * e +
      a * c * d * e +
      b * c * d * e +
      a * b * d * e
    )
  }

  // 任四 直选单式
  this.calc_r4_zxds = function(ba) {
    if (ba.length < 2) {
      return 0
    }
    let zhushu = 0
    for (let i = 1; i < ba.length; i++) {
      const res = ba[i].split(/[\|\/]/)
      if (res.length === 4 && checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
        zhushu++
      }
    }
    return zhushu * pos_count
  }

  // 任四 组选24
  this.calc_r4_zux24 = function(ba) {
    const len = ba.length
    const resBalls = ba.slice(1)
    if (len < 5 || !checkArrIs(resBalls, /^([0-9]|[0][0-9])$/)) {
      return 0
    }
    switch (len - 1) {
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
  }

  // 任四 组选12
  this.calc_r4_zux12 = function(ba) {
    //		console.log("数据测试");
    //		console.log(ba);
    const len = ba.length
    // const resBalls = ba.slice(1)
    if (len < 3) {
      return 0
    }
    const ball1 = ba[1].split('|') // 2重号数组
    const ball2 = ba[2].split('|') // 单号数组
    let zhushu = 0
    for (let i = 0; i < ball1.length; i++) {
      const ball1_value = parseInt(ball1[i])
      if (ball1_value >= 0 && ball1_value <= 9) {
        let n = 0
        for (let j = 0; j < ball2.length; j++) {
          const ball2_value = parseInt(ball2[j])
          if (
            ball2_value >= 0 &&
            ball2_value <= 9 &&
            ball2_value !== ball1_value
          ) {
            n++
          }
        }
        zhushu += n * ((n - 1) / 2)
      }
    }
    return zhushu
  }

  // 任四 组选6
  this.calc_r4_zux6 = function(ba) {
    const len = ba.length
    const resBalls = ba.slice(1)
    if (len < 3 || !checkArrIs(resBalls, /^([0-9]|[0][0-9])$/)) {
      return 0
    }
    let n = 0
    for (let i = 1; i < ba.length; i++) {
      const value = parseInt(ba[i])
      if (value >= 0 && value <= 9) {
        n++
      }
    }
    return n * ((n - 1) / 2)
  }

  // 任四 组选4
  this.calc_r4_zux4 = function(ba) {
    //		console.log("任性--XXxxxxfsdfoo")
    //		console.log(ba);
    const len = ba.length
    // const resBalls = ba.slice(1)
    if (len < 3) {
      return 0
    }
    const balls_1 = ba[1].split('|') // 三重号
    const balls_2 = ba[2].split('|') // 单号
    //		console.log(balls_1);
    //		console.log(balls_2);
    if (
      !checkArrIs(balls_1, /^([0-9]|[0][0-9])$/) ||
      !checkArrIs(balls_2, /^([0-9]|[0][0-9])$/)
    ) {
      return 0
    }
    let zhushu = 0
    for (let i = 0; i < balls_1.length; i++) {
      const ball1_v = parseInt(balls_1[i])
      if (ball1_v >= 0 && ball1_v <= 9) {
        let n = 0
        for (let j = 0; j < balls_2.length; j++) {
          const ball2_v = parseInt(balls_2[j])
          if (ball2_v >= 0 && ball2_v <= 9 && ball2_v !== ball1_v) {
            n++
          }
        }
        zhushu += n
      }
    }
    //		console.log("pp"+zhushu+" "+zhushu*pos_count);
    return zhushu
  }

  // 南拳劈腿
  this.calc_dw_dxds = function(ba) {
    if (ba.length !== 5) {
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

  // 侧妃之争
  this.calc_cfzz = function(ba) {
    if (ba.length < 1 || !checkArrIs(ba, /[0-9]/)) {
      return 0
    } else {
      return ba.length
    }
  }

  // 侍寝之牌
  this.calc_sqzp = function(ba) {
    if (ba.length !== 5) {
      return 0
    }
    let zhushu = 0
    for (let i = 0; i < ba.length; i++) {
      if (ba[i] !== '?') {
        const res = ba[i].split(/[\|\/]/)
        if (checkArrIs(res, /[0-9]/)) {
          zhushu += res.length
        }
      }
    }
    return zhushu
  }

  this.calc_qw_yffs = function(ba) {
    if (!checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0
    } else {
      return ba.length
    }
  }

  this.calc_qw_hscs = function(ba) {
    if (!checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0
    } else {
      return ba.length
    }
  }

  this.calc_qw_sykt = function(ba) {
    if (!checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0
    } else {
      return ba.length
    }
  }

  this.calc_qw_sjfc = function(ba) {
    if (!checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0
    } else {
      return ba.length
    }
  }

  this.calc_qw_wgfd = function(ba) {
    if (!checkArrIs(ba, /^([0-9]|[0][0-9])$/)) {
      return 0
    } else {
      return ba.length
    }
  }

  // 和值大小单双
  this.calc_hzdxds = function(ba) {
    if (!checkArrIs(ba, /^([0-3])$/)) {
      return 0
    } else {
      return ba.length
    }
  }

  // 尾数大小单双
  this.calc_hwdxds = function(ba) {
    if (!checkArrIs(ba, /^([0-3])$/)) {
      return 0
    } else {
      return ba.length
    }
  }

  // 牛牛
  this.calc_nn = function(arr) {
    return Array.isArray(arr) ? arr.length : 0
  }

  // 双面盘
  this.calc_smp = function(arr) {
    return Array.isArray(arr) ? arr.length : 0
  }

  // 龙虎斗
  this.calc_lhd = function(arr) {
    return Array.isArray(arr) ? arr.length : 0
  }

  // END CLASS
}

const getCalcFuncByName = name => {
  if (name.includes('龙虎斗')) {
    return 'calc_lhd'
  }
  if (name.includes('定位胆')) {
    return 'calc_dwd'
  }
  if (name.includes('牛牛')) {
    return 'calc_nn'
  }
  if (name.includes('双面盘')) {
    return 'calc_smp'
  }
}

const getCalcFuncByPlayID = playid => {
  switch (playid) {
    case 41: // 定位胆 数字盘
      return 'calc_dwd'
    case 128: // 双面盘
      return 'calc_smp'
    case 129: // 龙虎斗
      return 'calc_lhd'
    case 130: // 趣味
      return 'calc_qw'
    case 131: // 牛牛
      return 'calc_nn'
  }
}

const getRenderTypeByName = name => {
  if (name.includes('牛牛')) {
    return RenderTypes.SINGLE_ROW_MUTI_PEILV
  }
  if (name.includes('定位胆')) {
    return RenderTypes.DWD
  }
  if (name.includes('龙虎斗')) {
    return RenderTypes.MUTI_ROW_MUTI_PEILV
  }
  if (name.includes('双面盘')) {
    return RenderTypes.MUTI_ROW_MUTI_PEILV
  }
}

const getRenderTypeByPlayID = playid => {
  switch (playid) {
    case 41: // 定位胆 数字盘
      return RenderTypes.DWD
    case 128: // 双面盘
      return RenderTypes.MUTI_ROW_MUTI_PEILV
    case 129: // 龙虎斗
      return RenderTypes.MUTI_ROW_MUTI_PEILV
    case 130: // 趣味
      return RenderTypes.SINGLE_ROW_MUTI_PEILV
    case 131: // 牛牛
    case 18: // 特殊号
    case 32: // 特殊号
    case 114: // 特殊号
      return RenderTypes.SINGLE_ROW_MUTI_PEILV
    default:
      return RenderTypes.SSC
  }
}

const calc = new Calc_Zhushu_Obj()

const CalcObj = new Map([
  [1, { name: '直选复式', wanfa: '五星直选复式', clacFn: calc.calc_5x_zxfs }],
  [2, { name: '直选单式', wanfa: '五星直选单式', clacFn: calc.calc_5x_zxds }],
  [3, { name: '直选复式', wanfa: '四星直选复式', clacFn: calc.calc_4x_zxfs }],
  [4, { name: '直选单式', wanfa: '四星直选单式', clacFn: calc.calc_4x_zxds }],
  [5, { name: '后三复选', wanfa: '后三组选复式', clacFn: calc.calc_h3_zxfs }],
  [6, { name: 'XX单式', fanfa: 'XX单式', clacFn: calc.calc_h3_zxds }],
  [7, { name: '后三组合', wanfa: '后三组合', clacFn: calc.calc_h3_zh }],
  [8, { name: '直选和值', wanfa: '后三直选和值', clacFn: calc.calc_h3_zxhz }],
  [9, { name: '直选跨度', wanfa: '后三直选跨度', clacFn: calc.calc_h3_zxkd }],
  [10, { name: '组三复式', wanfa: '后三组三复式', clacFn: calc.calc_h3_z3fs }],
  [11, { name: 'XX单式', wanfa: 'XX单式', clacFn: calc.calc_h3_z3ds }],
  [12, { name: '组六复式', wanfa: '后三组六复式', clacFn: calc.calc_h3_z6fs }],
  [13, { name: '组六单式', wanfa: '后三组六单式', clacFn: calc.calc_h3_z6ds }],
  [16, { name: '组选包胆', wanfa: '后三组选包胆', clacFn: calc.calc_h3_zuxbd }],
  [17, { name: '和值尾数', wanfa: '后三和值尾数', clacFn: calc.calc_h3_sumws }],
  [18, { name: '特殊号', wanfa: '后三特殊号', clacFn: calc.calc_h3_tsh }],
  [19, { name: '直选复式', wanfa: '前三直选复式', clacFn: calc.calc_h3_zxfs }],
  [20, { name: '直选单式', wanfa: '前三直选单式', clacFn: calc.calc_h3_zxds }],
  [21, { name: '前三组合', wanfa: '前三组合', clacFn: calc.calc_h3_zh }],
  [22, { name: '直选和值', wanfa: '前三直选和值', clacFn: calc.calc_h3_zxhz }],
  [23, { name: '直选跨度', wanfa: '前三直选跨度', clacFn: calc.calc_h3_zxkd }],
  [24, { name: '组三复式', wanfa: '前三组三复式', clacFn: calc.calc_h3_z3fs }],
  [25, { name: '组三单式', wanfa: '前三组三单式', clacFn: calc.calc_h3_z3ds }],
  [26, { name: '组六复式', wanfa: '前三组六复式', clacFn: calc.calc_h3_z6fs }],
  [27, { name: '组六单式', wanfa: '前三组六单式', clacFn: calc.calc_h3_z6ds }],
  [30, { name: '组选包胆', wanfa: '前三组选包胆', clacFn: calc.calc_h3_zuxbd }],
  [31, { name: '和值尾数', wanfa: '前三和值尾数', clacFn: calc.calc_h3_sumws }],
  [32, { name: '特殊号', wanfa: '前三特殊号', clacFn: calc.calc_h3_tsh }],
  [33, { name: '直选复式', wanfa: '前二直选复式', clacFn: calc.calc_q2_zxfs }],
  [34, { name: '直选单式', wanfa: '前二直选单式', clacFn: calc.calc_q2_zxds }],
  [35, { name: '直选和值', wanfa: '前二直选和值', clacFn: calc.calc_q2_zhxhz }],
  [36, { name: '直选跨度', wanfa: '前二直选跨度', clacFn: calc.calc_q2_zxkd }],
  [37, { name: '组选复式', wanfa: '前二组选复式', clacFn: calc.calc_q2_zuxfs }],
  [38, { name: '组选单式', wanfa: '前二组选单式', clacFn: calc.calc_q2_zuxds }],
  [39, { name: '组选和值', wanfa: '前二组选和值', clacFn: calc.calc_q2_zuxhz }],
  [40, { name: '组选包胆', wanfa: '前二组选包胆', clacFn: calc.calc_q2_zuxbd }],
  [41, { name: '数字盘', wanfa: '数字盘', clacFn: calc.calc_dwd }],
  [42, { name: '前三一码', wanfa: '前三一码', clacFn: calc.calc_bdw_31m }],
  [43, { name: '前三二码', wanfa: '前三二码', clacFn: calc.calc_bdw_32m }],
  [44, { name: '后三一码', wanfa: '后三一码', clacFn: calc.calc_bdw_31m }],
  [45, { name: '后三二码', wanfa: '后三二码', clacFn: calc.calc_bdw_32m }],
  [46, { name: '前四一码', wanfa: '前四一码', clacFn: calc.calc_bdw_31m }],
  [47, { name: '前四二码', wanfa: '前四二码', clacFn: calc.calc_bdw_32m }],
  [48, { name: '后四一码', wanfa: '后四一码', clacFn: calc.calc_bdw_31m }],
  [49, { name: '后四二码', wanfa: '后四二码', clacFn: calc.calc_bdw_32m }],
  [50, { name: '五星一码', wanfa: '五星一码', clacFn: calc.calc_bdw_31m }],
  [51, { name: '五星二码', wanfa: '五星二码', clacFn: calc.calc_bdw_32m }],
  [52, { name: '五星三码', wanfa: '五星三码', clacFn: calc.calc_bdw_33m }],

  [53, { name: '五星三码XX', wanfa: '五星三码', clacFn: calc.calc_q2_dxds }],
  [54, { name: '五星三码XX', wanfa: '五星三码', clacFn: calc.calc_h2_dxds }],
  [55, { name: '五星三码XX', wanfa: '五星三码', clacFn: calc.calc_q3_dxds }],
  [56, { name: '五星三码XX', wanfa: '五星三码', clacFn: calc.calc_h3_dxds }],

  [
    82,
    {
      name: '五星直选组合',
      wanfa: '五星直选组合',
      clacFunc: calc.calc_5x_zxzh
    }
  ],
  [83, { name: '组选120', wanfa: '五星-组选120', clacFn: calc.calc_5x_zx120 }],
  [84, { name: '组选60', wanfa: '五星-组选60', clacFn: calc.calc_5x_zx60 }],
  [85, { name: '组选30', wanfa: '五星-组选30', clacFn: calc.calc_5x_zx30 }],
  [86, { name: '组选20', wanfa: '五星-组选20', clacFn: calc.calc_5x_zx20 }],
  [87, { name: '组选10', wanfa: '五星-组选10', clacFn: calc.calc_5x_zx10 }],
  [88, { name: '组选5', wanfa: '五星-组选5', clacFn: calc.calc_5x_zx5 }],
  [89, { name: '后四组合', wanfa: '后四-直选组合', clacFn: calc.calc_4x_zxzh }],
  [90, { name: '组选24', wanfa: '后四-组选24', clacFn: calc.calc_4x_zx24 }],
  [91, { name: '组选12', wanfa: '后四-组选12', clacFn: calc.calc_4x_zx12 }],
  [92, { name: '组选6', wanfa: '后四-组选6', clacFn: calc.calc_4x_zx6 }],
  [93, { name: '组选4', wanfa: '后四-组选4', clacFn: calc.calc_4x_zx4 }],
  [94, { name: '直选复式', wanfa: '前四-直选复式', clacFn: calc.calc_4x_zxfs }],
  [95, { name: '直选单式', wanfa: '前四-直选单式', clacFn: calc.calc_4x_zxds }],
  [96, { name: '前四组合', wanfa: '前四-直选组合', clacFn: calc.calc_4x_zxzh }],
  [97, { name: '组选24', wanfa: '前四-组选24', clacFn: calc.calc_4x_zx24 }],
  [98, { name: '组选12', wanfa: '前四-组选12', clacFn: calc.calc_4x_zx12 }],
  [99, { name: '组选6', wanfa: '前四-组选6', clacFn: calc.calc_4x_zx6 }],
  [100, { name: '组选4', wanfa: '前四-组选4', clacFn: calc.calc_4x_zx4 }],
  [101, { name: '直选复式', wanfa: '中三直选复式', clacFn: calc.calc_h3_zxfs }],
  [102, { name: '直选单式', wanfa: '中三直选单式', clacFn: calc.calc_h3_zxds }],
  [103, { name: '中三组合', wanfa: '中三组合', clacFn: calc.calc_h3_zh }],
  [104, { name: '直选和值', wanfa: '中三直选和值', clacFn: calc.calc_h3_zxhz }],
  [105, { name: '直选跨度', wanfa: '中三直选跨度', clacFn: calc.calc_h3_zxkd }],
  [106, { name: '组三复式', wanfa: '中三组三复式', clacFn: calc.calc_h3_z3fs }],
  [107, { name: '组三单式', wanfa: '中三组三单式', clacFn: calc.calc_h3_z3ds }],
  [108, { name: '组六复式', wanfa: '中三组六复式', clacFn: calc.calc_h3_z6fs }],
  [109, { name: '组六单式', wanfa: '中三组六单式', clacFn: calc.calc_h3_z6ds }],
  [
    112,
    { name: '组选包胆', wanfa: '中三组选包胆', clacFn: calc.calc_h3_zuxbd }
  ],
  [
    113,
    { name: '和值尾数', wanfa: '中三和值尾数', clacFn: calc.calc_h3_sumws }
  ],
  [114, { name: '特殊号', wanfa: '中三特殊号', clacFn: calc.calc_h3_tsh }],
  [115, { name: '直选复式', wanfa: '后二直选复式', clacFn: calc.calc_q2_zxfs }],
  [116, { name: '直选单式', wanfa: '后二直选单式', clacFn: calc.calc_q2_zxds }],
  [
    117,
    { name: '直选和值', wanfa: '后二直选和值', clacFn: calc.calc_q2_zhxhz }
  ],
  [118, { name: '直选跨度', wanfa: '后二直选跨度', clacFn: calc.calc_q2_zxkd }],
  [
    119,
    { name: '组选复式', wanfa: '后二组选复式', clacFn: calc.calc_q2_zuxfs }
  ],
  [
    120,
    { name: '组选单式', wanfa: '后二组选单式', clacFn: calc.calc_q2_zuxds }
  ],
  [
    121,
    { name: '组选和值', wanfa: '后二组选和值', clacFn: calc.calc_q2_zuxhz }
  ],
  [
    122,
    { name: '组选包胆', wanfa: '后二组选包胆', clacFn: calc.calc_q2_zuxbd }
  ],
  [128, { name: '双面盘', wanfa: '双面盘', clacFn: calc.calc_smp }],
  [129, { name: '龙虎斗', wanfa: '龙虎斗', clacFn: calc.calc_lhd }],
  [130, { name: '趣味', wanfa: '趣味', clacFn: calc.calc_qw }],
  [131, { name: '牛牛', wanfa: '牛牛', clacFn: calc.calc_nn }]
])

const isDanshi = function(playid) {
  return [
    2,
    4,
    6,
    11,
    13,
    20,
    25,
    27,
    34,
    38,
    58,
    61,
    64,
    67,
    69,
    73,
    95,
    102,
    107,
    109,
    116,
    120
  ].includes(playid)
}

export {
  isDanshi,
  CalcObj,
  Calc_Zhushu_Obj,
  getCalcFuncByName,
  getRenderTypeByName,
  getCalcFuncByPlayID,
  getRenderTypeByPlayID
}
