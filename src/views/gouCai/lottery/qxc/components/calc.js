/**
 * 判断数组里每个值是否符合正则
 *
 * @param {*} arr 数组，要判断数组里每个值是否符合正则
 * @param {*} regx 正则
 * @returns true or false
 */
function checkArrIs(arr, regx) {
  return arr.every(item => regx.test(item))
}

/**
 * 三字现
 *
 * @param {*} arr
 * @returns
 */
function calc_3zx(arr) {
  const num = arr.length
  if (num < 3 || !checkArrIs(arr, /^[0-9]$/)) {
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

/**
 * 二字现
 *
 * @param {*} arr
 * @returns
 */
function calc_2zx(arr) {
  if (arr.length < 2 || !checkArrIs(arr, /^[0-9]$/)) {
    return 0
  }
  switch (arr.length) {
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

/**
 * 二位
 *
 * @param {*} arr
 * @returns
 */
function clac_2w(arr) {
  if (arr.length < 2) {
    return 0
  }
  const ba0 = arr[0].split('|')
  const ba1 = arr[1].split('|')
  if (!checkArrIs(ba0, /^[0-9]$/) || !checkArrIs(ba1, /^[0-9]$/)) {
    return 0
  }
  const num = ba0.length * ba1.length
  // for (const i in ba0) {
  //   for (const j in ba1) {
  //     if (ba1[j] !== ba0[i]) {
  //       num++
  //     }
  //   }
  // }
  return num
}

/**
 * 三位
 *
 * @param {*} arr
 * @returns
 */
function clac_3w(arr) {
  if (arr.length < 3) {
    return 0
  }

  const ba0 = arr[0].split('|')
  const ba1 = arr[1].split('|')
  const ba2 = arr[2].split('|')
  if (
    !checkArrIs(ba0, /^([0-9]|[1][0-1])$/) ||
    !checkArrIs(ba1, /^([0-9]|[1][0-1])$/) ||
    !checkArrIs(ba2, /^([0-9]|[1][0-1])$/)
  ) {
    return 0
  }
  const num = ba0.length * ba1.length * ba2.length
  // for (const i in ba0) {
  //   for (const j in ba1) {
  //     for (const k in ba2) {
  //       if (ba2[k] !== ba1[j] && ba2[k] !== ba0[i] && ba1[j] !== ba0[i]) {
  //         num++
  //       }
  //     }
  //   }
  // }

  return num
}

function calc_dwd(arr, limit = 1) {
  if (arr.length < 2) {
    return 0
  }
  if (limit === 2 && arr.length < 3) {
    return 0
  }
  if (limit === 3 && arr.length < 4) {
    return 0
  }
  if (limit === 4 && arr.length < 5) {
    return 0
  }

  let num = 0
  for (let i = 1; i < arr.length; i++) {
    const child_arr = arr[i].split('|')
    if (checkArrIs(child_arr, /^[0-9]$/)) {
      num += child_arr.length
    }
  }
  return num
}

/**
 * 任选复式  任选二中二
 */
function calc_2DFS(balls) {
  // val balls = CommonUtils.getStrArr(balls)
  // val len = balls.length
  if (balls.length < 3) return 0

  let a = 0
  let b = 0
  let c = 0
  let d = 0
  if (balls[1].length) {
    const res = balls[1].split('|')
    a = checkArrIs(res, /^([0-9]|[0][0-9])$/) ? res.length : 0
  }
  if (balls[2].length) {
    const res = balls[2].split('|')
    b = checkArrIs(res, /^([0-9]|[0][0-9])$/) ? res.length : 0
  }
  if (balls.length === 3) {
    return a * (b + c + d) + b * (c + d) + c * d
  }
  if (balls[3].length) {
    const res = balls[3].split('|')
    if (checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
      c = res.length
    }
  }
  if (balls.length === 4) {
    return a * (b + c + d) + b * (c + d) + c * d
  }
  if (balls[4].length) {
    const res = balls[4].split('|')
    if (checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
      d = res.length
    }
  }
  return a * (b + c + d) + b * (c + d) + c * d
}

/**
 * 任选复式  任选三中三
 */
function calc_3DFS(balls) {
  // let balls = CommonUtils.getStrArr(balls)
  // let len = balls.length
  if (balls.length < 4) {
    return 0
  }
  let a = 0
  let b = 0
  let c = 0
  let d = 0
  if (balls[0].length) {
    const res = balls[0].split('|')
    a = checkArrIs(res, /^([0-9]|[0][0-9])$/) ? res.length : 0
  }
  if (balls[1].length) {
    const res = balls[1].split('|')
    b = checkArrIs(res, /^([0-9]|[0][0-9])$/) ? res.length : 0
  }
  if (balls[2].length) {
    const res = balls[2].split('|')
    c = checkArrIs(res, /^([0-9]|[0][0-9])$/) ? res.length : 0
  }
  if (balls.length === 4) {
    return a * b * (c + d) + a * c * d + b * c * d
  }
  if (balls[4].length) {
    const res = balls[4].split('|')
    if (checkArrIs(res, /^([0-9]|[0][0-9])$/)) {
      d = res.length
    }
  }
  return a * b * (c + d) + a * c * d + b * c * d
}

/**
 * 任选复式  任选四中四
 */
function calc_4DFS(balls) {
  if (balls.length < 5) {
    return 0
  }
  let a = 0
  let b = 0
  let c = 0
  let d = 0
  if (balls[1].length) {
    const res = balls[1].split('|')
    a = checkArrIs(res, /^([0-9]|[0][0-9])$/) ? res.length : 0
  }
  if (balls[2].length) {
    const res = balls[2].split('|')
    b = checkArrIs(res, /^([0-9]|[0][0-9])$/) ? res.length : 0
  }
  if (balls[3].length) {
    const res = balls[3].split('|')
    c = checkArrIs(res, /^([0-9]|[0][0-9])$/) ? res.length : 0
  }
  if (balls[4].length) {
    const res = balls[4].split('|')
    d = checkArrIs(res, /^([0-9]|[0][0-9])$/) ? res.length : 0
  }
  return a * b * c * d
}

/**
 * 计算七星彩注数
 *
 * @export 计算七星彩注数
 * @param {Number} playid 玩法ID
 * @param {Array} arr 数组
 * @returns {Number} 注数，不成注返回0
 */
export default function calcBetQuantity(playid, arr) {
  // const _arr = Array.isArray(arr)
  //   ? arr.filter(x => x.checked)
  //   : arr.hasOwnProperty('data')
  //     ? arr.data.filter(x => x.checked)
  //     : []
  console.log('calcBetQuantity')
  switch (playid) {
    case 7: // 和值组选
      return arr.length
    case 9: // 前二大小单双
    case 11: // 后二大小单双
      return clac_2w(arr)
    case 5: // 二字现
      return calc_2zx(arr)
    case 10: // 前三大小单双
    case 12: // 后三大小单双
      return clac_3w(arr)
    case 6: // 三字现
      return calc_3zx(arr)
    case 2:
      return calc_2DFS(arr)
    case 3:
      return calc_3DFS(arr)
    case 4:
      return calc_4DFS(arr)
    case 8: // 定位大小单双
    default:
      // 定位胆  二定复式 三定复式 四定复式
      return calc_dwd(arr, playid)
  }
}
