class CalcLhc {
  constructor() {
    this.tag_js = 'lhc'
  }
  calcBetNum(playid, ba) {
    const towArr = [22, 26, 32, 33, 34],
      threeArr = [23, 27, 30, 31],
      fourArr = [24, 28, 35],
      fiveArr = [25, 29]

    if (towArr.includes(playid)) {
      return this.getTwoBalls(ba).length
    } else if (threeArr.includes(playid)) {
      return this.getThreeBalls(ba).length
    } else if (fourArr.includes(playid)) {
      return this.getFourBalls(ba).length
    } else if (fiveArr.includes(playid)) {
      return this.getFiveBalls(ba).length
    } else if (playid === 8) {
      return ba.length >= 2 ? 1 : 0
    } else if (playid === 21) {
      return ba.length >= 6 ? 1 : 0
    } else {
      return ba.length
    }
  }

  //  2全中 特串... 2连
  getTwoBalls(balls) {
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
  getThreeBalls(balls) {
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
  getFourBalls(balls) {
    const arr = balls
    const arrLen = arr.length
    const return_obj = []
    for (let i = 0; i < arrLen - 3; i++) {
      for (let k = i + 1; k < arrLen - 2; k++) {
        for (let j = k + 1; j < arrLen - 1; j++) {
          for (let l = j + 1; l < arrLen; l++) {
            if (
              i !== k &&
              i !== j &&
              i !== l &&
              k !== j &&
              k !== l &&
              j !== l
            ) {
              return_obj.push(
                arr[i] + ' ' + arr[k] + ' ' + arr[j] + ' ' + arr[l]
              )
            }
          }
        }
      }
    }
    return return_obj
  }

  //   5个号码为一注拆分 五连
  getFiveBalls(balls) {
    const arr = balls
    const arrLen = arr.length
    const return_obj = []
    for (let i = 0; i < arrLen - 4; i += 1) {
      for (let j = i + 1; j < arrLen - 3; j += 1) {
        for (let k = j + 1; k < arrLen - 2; k += 1) {
          for (let m = k + 1; m < arrLen - 1; m += 1) {
            for (let n = m + 1; n < arrLen; n += 1) {
              return_obj.push(
                arr[i] +
                  ' ' +
                  arr[j] +
                  ' ' +
                  arr[k] +
                  ' ' +
                  arr[m] +
                  ' ' +
                  arr[n]
              )
            }
          }
        }
      }
    }
    return return_obj
  }

  checkArrIs(arr, regx) {
    return arr.every(item => regx.test(item))
  }

  // processLHCData(betData) {
  //   const towArr = [22, 26, 32, 33, 34],
  //     threeArr = [23, 27, 30, 31],
  //     fourArr = [24, 28, 35],
  //     fiveArr = [25, 29]

  //   if (towArr.includes(betData.playid)) {
  //     betData.arr = this.getTwoBalls(betData.formatValueStr.split(' '))
  //     betData.arr2 = this.getTwoBalls(betData.arr2[0].split('|'))
  //   }
  //   if (threeArr.includes(betData.playid)) {
  //     betData.arr = this.getThreeBalls(betData.formatValueStr.split(' '))
  //     betData.arr2 = this.getThreeBalls(betData.arr2[0].split('|'))
  //   }
  //   if (fourArr.includes(betData.playid)) {
  //     betData.arr = this.getFourBalls(betData.formatValueStr.split(' '))
  //     betData.arr2 = this.getFourBalls(betData.arr2[0].split('|'))
  //   }
  //   if (fiveArr.includes(betData.playid)) {
  //     betData.arr = this.getFiveBalls(betData.formatValueStr.split(' '))
  //     betData.arr2 = this.getFiveBalls(betData.arr2[0].split('|'))
  //   }
  // }
}

export default new CalcLhc()
