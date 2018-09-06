/*  猴哥，给我来一棒子！！！！*/
//  2全中 特串... 2连
function getTwoBalls(balls) {
  const arr = balls
  const arrLen = arr.length
  const return_obj = []
  for (let i = 0; i < arrLen - 1; i++) {
    for (let k = i + 1; k < arrLen; k++) {
      if (i !== k) {
        return_obj.push(arr[i] + ' ' + arr[k])
      }
    }
  }
  return return_obj
}

//  3全中 中二 三连
function getThreeBalls(balls) {
  const arr = balls
  const arrLen = arr.length
  const return_obj = []
  for (let i = 0; i < arrLen - 2; i++) {
    for (let k = i + 1; k < arrLen - 1; k++) {
      for (let j = k + 1; j < arrLen; j++) {
        if (i !== k && i !== j && k !== j) {
          return_obj.push(arr[i] + ' ' + arr[k] + ' ' + arr[j])
        }
      }
    }
  }
  return return_obj
}

//  四全中数组拆分 四连
function getFourBalls(balls) {
  const arr = balls
  const arrLen = arr.length
  const return_obj = []
  for (let i = 0; i < arrLen - 3; i++) {
    for (let k = i + 1; k < arrLen - 2; k++) {
      for (let j = k + 1; j < arrLen - 1; j++) {
        for (let l = j + 1; l < arrLen; l++) {
          if (i !== k && i !== j && i !== l && k !== j && k !== l && j !== l) {
            return_obj.push(arr[i] + ' ' + arr[k] + ' ' + arr[j] + ' ' + arr[l])
          }
        }
      }
    }
  }
  return return_obj
}

//   5个号码为一注拆分 五连
function getFiveBalls(balls) {
  const arr = balls
  const arrLen = arr.length
  const return_obj = []
  for (let i = 0; i < arrLen - 4; i += 1) {
    for (let j = i + 1; j < arrLen - 3; j += 1) {
      for (let k = j + 1; k < arrLen - 2; k += 1) {
        for (let m = k + 1; m < arrLen - 1; m += 1) {
          for (let n = m + 1; n < arrLen; n += 1) {
            return_obj.push(
              arr[i] + ' ' + arr[j] + ' ' + arr[k] + ' ' + arr[m] + ' ' + arr[n]
            )
          }
        }
      }
    }
  }
  return return_obj
}

//  哎 没钱没文化 不高又不帅  不上进还不成熟稳重 既然连鸡巴都不大一点....这人生....
export { getTwoBalls, getThreeBalls, getFourBalls, getFiveBalls }
