//  随机一注主程序
function randomNum(dataSource, max, str, type) {
  dataSource.forEach(item => {
    item.data.forEach(ele => {
      //  全部置为未选中
      ele.checked = false
      if (ele.cards) { // 扑克数据不一致
        ele.cards.forEach(n => {
          n.checked = false
        })
      }
    })
  })
  const arr = str.split('|'),
    arr3 = []
  dataSource.forEach((item, index) => {
    if (type === 1) {
      // 可重复 且包含了计算双面玩法多行不同max
      for (let i = 0; i < arr[index]; i++) {
        const a = parseInt(Math.random() * max, 10)
        if (item.data[0].cards && item.data.length === 1) {
          item.data[0].cards[a].checked = true
        } else {
          item.data[a].checked = true
        }
      }
    } else if (type === 2) {
      // 不重复
      const arr2 = []
      while (arr2.length < arr[index]) {
        const a = parseInt(Math.random() * max, 10)
        if (arr3.indexOf(a) === -1) {
          arr3.push(a)
          arr2.push(a)
        }
      }
      arr2.forEach(i => {
        // item.data[i].checked = true
        if (item.data[0].cards) {
          item.data[0].cards[i].checked = true
        } else {
          item.data[i].checked = true
        }
      })
    }
  })
  return dataSource
}
//  针对双面玩法多行不同max值
function assemStr(str) {
  const arr = str.split('|')
  const a = parseInt(Math.random() * arr.length, 10)
  let b
  const newArr = arr.map((item, index) => {
    if (index === a) {
      b = item
      return 1
    } else {
      return 0
    }
  })
  return {
    str: newArr.join('|'),
    max: b
  }
}
// 单式专用
function singleCalc(arr, type, num) { // type 1为多行可重复，2为不重复
  const dataArr = []
  if (type === 1) {
    arr.forEach(item => {
      const a = parseInt(Math.random() * item.data.length, 10)
      dataArr.push(item.data[a].name)
    })
    return dataArr.sort((a, b) => a - b).join('|')
  } else {
    const arr2 = [], arr3 = []
    if (arr.length > 1) {
      arr.forEach((item, index) => {
        while (arr2.length < index + 1) {
          const a = parseInt(Math.random() * item.data.length, 10)
          if (arr2.indexOf(a) === -1) {
            arr2.push(a)
            arr3.push(item.data[a].name)
          }
        }
      })
      return arr3.sort((a, b) => a - b).join('|')
    } else {
      while (arr2.length < num) {
        const a = parseInt(Math.random() * arr[0].data.length, 10)
        if (arr2.indexOf(a) === -1) {
          arr2.push(a)
        }
      }
      arr2.forEach(item => {
        arr3.push(arr[0].data[item].name)
      })
      return arr3.sort((a, b) => a - b).join('|')
    }
  }
}
function randomBet(betData) {
  const cart = Object.assign({}, betData)
  cart.dataSource = JSON.parse(JSON.stringify(cart.dataSource))
  cart.gameid *= 1
  let dataArr = []
  const sscArr = [1, 4, 5, 18, 23, 33],
    lhcArr = [14, 39, 48, 49],
    k3Arr = [6, 7, 8, 9, 20, 25, 35, 41, 42, 43, 44, 45, 46],
    pk10Arr = [2, 19, 24, 34, 47],
    syxwArr = [10, 11, 12, 13, 21, 26, 36],
    sandiArr = [3, 15, 16, 40],
    pcddArr = [17, 22, 27, 37, 38],
    xyqxArr = [56],
    xypkArr = [54]
  if (sscArr.includes(cart.gameid)) {
    const arr1 = [1], // 1|1|1|1|1
      arr2 = [83], // 5
      arr3 = [84], // 1|3
      arr4 = [85], // 2|1
      arr5 = [86, 91, 98], // 1|2
      arr6 = [87, 88, 93, 100, 33, 115], // 1|1
      arr7 = [3, 89, 94, 96], // 1|1|1|1 89，96为4注
      arr8 = [90, 97], // 4
      arr9 = [92, 99, 10, 24, 106, 119, 37, 43, 45, 47, 49, 51], // 2
      arr10 = [5, 7, 19, 21, 101, 103], // 1|1|1 7,21,103为3注
      arr11 = [8, 22, 104], // 1 max为28
      arr12 = [
        9,
        16,
        17,
        23,
        30,
        31,
        105,
        112,
        113,
        118,
        122,
        36,
        40,
        42,
        44,
        46,
        48,
        50
      ], // 1
      arr13 = [8, 32, 114], // 1 max为3
      arr14 = [26, 108, 52, 12], // 3
      arr15 = [117, 121, 35], // 1 max为19
      arr16 = [39], // 1 max为17
      arr17 = [128], // 1 双面盘 4|5|4|4|4|4|4
      arr18 = [52, 131], // 1 max为16
      arr19 = [41], // 1 10|10|10|10|10
      arr20 = [129], // 1 3|3|3|3|3|3|3|3|3|3
      arr21 = [2, 4, 6, 20, 34, 95, 102, 116], // 单式
      arr22 = [11, 25, 107, 38, 120], // 组三 2
      arr23 = [13, 27, 109] // 组六 3
    if (arr1.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '1|1|1|1|1', 1)
    } else if (arr2.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '5', 2)
    } else if (arr3.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '1|3', 2)
    } else if (arr4.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '2|1', 2)
    } else if (arr5.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '1|2', 2)
    } else if (arr6.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '1|1', 2)
    } else if (arr7.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '1|1|1|1', 1)
    } else if (arr8.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '4', 2)
    } else if (arr9.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '2', 2)
    } else if (arr10.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '1|1|1', 1)
    } else if (arr11.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 28, '1', 1)
    } else if (arr12.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '1', 1)
    } else if (arr13.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 3, '1', 1)
    } else if (arr14.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '3', 2)
    } else if (arr15.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 19, '1', 1)
    } else if (arr16.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 17, '1', 1)
    } else if (arr17.includes(cart.playid)) {
      const myObj = assemStr('4|5|4|4|4|4|4')
      dataArr = randomNum(cart.dataSource, myObj.max, myObj.str, 1)
    } else if (arr18.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 16, '1', 1)
    } else if (arr19.includes(cart.playid)) {
      const myObj = assemStr('10|10|10|10|10')
      dataArr = randomNum(cart.dataSource, 10, myObj.str, 1)
    } else if (arr20.includes(cart.playid)) {
      const myObj = assemStr('3|3|3|3|3|3|3|3|3|3')
      dataArr = randomNum(cart.dataSource, 3, myObj.str, 1)
    } else if (arr21.includes(cart.playid)) {
      dataArr = singleCalc(cart.dataSource, 1)
    } else if (arr22.includes(cart.playid)) {
      const tempArr = singleCalc(cart.dataSource, 2, 2).split('|')
      tempArr.push(tempArr[1])
      dataArr = tempArr.join('|')
    } else if (arr23.includes(cart.playid)) {
      dataArr = singleCalc(cart.dataSource, 2, 3)
    }
  } else if (lhcArr.includes(cart.gameid)) {
    const arr1 = [1, 36, 10, 11, 12, 13, 14, 15, 16], // 1
      arr2 = [2], // 1 max20
      arr3 = [5], // 1 max15
      arr4 = [3], // 1 max3
      arr5 = [4, 6, 7, 17], // 1 max12
      arr6 = [9], // 1 max5
      arr7 = [18], // 1 max10
      arr8 = [19], // 1 max4
      arr9 = [20], // 1 max8
      arr10 = [21], // 6
      arr11 = [8], // 2~11 max12
      arr12 = [22], // 2 max12
      arr13 = [23], // 3 max12
      arr14 = [24], // 4 max12
      arr15 = [25], // 5 max12
      arr16 = [26], // 2 max10
      arr17 = [27], // 3 max10
      arr18 = [28], // 4 max10
      arr19 = [29], // 5 max10
      arr20 = [30, 31], // 3
      arr21 = [32, 33, 34], // 2
      arr22 = [35] // 4
    if (arr1.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 49, '1', 1)
    } else if (arr2.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 20, '1', 1)
    } else if (arr3.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 15, '1', 1)
    } else if (arr4.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 3, '1', 1)
    } else if (arr5.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 12, '1', 1)
    } else if (arr6.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 5, '1', 1)
    } else if (arr7.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '1', 1)
    } else if (arr8.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 4, '1', 1)
    } else if (arr9.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 8, '1', 1)
    } else if (arr10.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 49, '6', 2)
    } else if (arr11.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 12, parseInt(Math.random() * 9 + 2, 10) + '', 2)
    } else if (arr12.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 12, '2', 2)
    } else if (arr13.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 12, '3', 2)
    } else if (arr14.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 12, '4', 2)
    } else if (arr15.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 12, '5', 2)
    } else if (arr16.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '2', 2)
    } else if (arr17.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '3', 2)
    } else if (arr18.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '4', 2)
    } else if (arr19.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '5', 2)
    } else if (arr20.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 50, '3', 2)
    } else if (arr21.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 50, '2', 2)
    } else if (arr22.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 50, '4', 2)
    }
  } else if (k3Arr.includes(cart.gameid)) {
    const arr1 = [1], // 1 max20
      arr2 = [14], // 1 4|4|4|4
      arr3 = [5, 10], // 1|2 max6
      arr4 = [15], // 1 1|6
      arr5 = [7] // 1 max6
    if (arr1.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 20, '1', 1)
    } else if (arr2.includes(cart.playid)) {
      const a = assemStr('4|4|4|4')
      dataArr = randomNum(cart.dataSource, a.max, a.str, 1)
    } else if (arr3.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 6, '1|2', 2)
    } else if (arr4.includes(cart.playid)) {
      const a = assemStr('1|6')
      dataArr = randomNum(cart.dataSource, a.max, a.str, 1)
    } else if (arr5.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 6, '1', 1)
    }
  } else if (syxwArr.includes(cart.gameid)) {
    const arr1 = [1, 6, 11], // 1|1|1
      arr2 = [3, 8, 13, 32], // 3
      arr3 = [5, 10, 15, 46], // 1|2
      arr4 = [16, 21, 45, 20, 25], // 1|1 不重复
      arr5 = [18, 23, 31], // 2
      arr7 = [26, 27, 28, 30], // 1
      arr8 = [29], // 11|11|11|11|11  任选1
      arr9 = [33], // 4
      arr10 = [34], // 5
      arr11 = [35], // 6
      arr12 = [36], // 7
      arr13 = [37], // 8
      arr14 = [47], // 1|3
      arr15 = [48], // 1|4
      arr16 = [49], // 1|5
      arr17 = [50], // 1|6
      arr18 = [51], // 1|7
      arr19 = [56], // 6|4|4|4|4|4  蛋疼玩法
      arr20 = [54], // 2|2|2|2|2|2|2|2|2|2 任选1
      arr21 = [57], // 1 max16
      arr22 = [2, 7, 12, 17, 22], // 单式
      arr23 = [4, 9, 14, 40], // 三 3
      arr24 = [19, 24, 39], // 二 2
      arr25 = [38], // 11任选1
      arr26 = [41], // 11任选4
      arr27 = [42], // 11任选5
      arr28 = [43], // 11任选6
      arr29 = [44] // 11任选7
    if (arr1.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 11, '1|1|1', 2)
    } else if (arr2.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 11, '3', 2)
    } else if (arr3.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 11, '1|2', 2)
    } else if (arr4.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 11, '1|1', 2)
    } else if (arr5.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 11, '2', 2)
    } else if (arr7.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 11, '1', 1)
    } else if (arr8.includes(cart.playid)) {
      const str = assemStr('11|11|11|11|11')
      dataArr = randomNum(cart.dataSource, str.max, str.str, 1)
    } else if (arr9.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 11, '4', 2)
    } else if (arr10.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 11, '5', 2)
    } else if (arr11.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 11, '6', 2)
    } else if (arr12.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 11, '7', 2)
    } else if (arr13.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 11, '8', 2)
    } else if (arr14.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 11, '1|3', 2)
    } else if (arr15.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 11, '1|4', 2)
    } else if (arr16.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 11, '1|5', 2)
    } else if (arr17.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 11, '1|6', 2)
    } else if (arr18.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 11, '1|7', 2)
    } else if (arr19.includes(cart.playid)) {
      //  理解错了，并不蛋疼
      const str = assemStr('6|4|4|4|4|4')
      dataArr = randomNum(cart.dataSource, str.max, str.str, 1)
    } else if (arr20.includes(cart.playid)) {
      const str = assemStr('2|2|2|2|2|2|2|2|2|2')
      dataArr = randomNum(cart.dataSource, str.max, str.str, 1)
    } else if (arr21.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 16, '1', 1)
    } else if (arr22.includes(cart.playid)) {
      dataArr = singleCalc(cart.dataSource, 2)
    } else if (arr23.includes(cart.playid)) {
      dataArr = singleCalc(cart.dataSource, 2, 3)
    } else if (arr24.includes(cart.playid)) {
      dataArr = singleCalc(cart.dataSource, 2, 2)
    } else if (arr25.includes(cart.playid)) {
      dataArr = singleCalc(cart.dataSource, 2, 1)
    } else if (arr26.includes(cart.playid)) {
      dataArr = singleCalc(cart.dataSource, 2, 4)
    } else if (arr27.includes(cart.playid)) {
      dataArr = singleCalc(cart.dataSource, 2, 5)
    } else if (arr28.includes(cart.playid)) {
      dataArr = singleCalc(cart.dataSource, 2, 6)
    } else if (arr29.includes(cart.playid)) {
      dataArr = singleCalc(cart.dataSource, 2, 7)
    }
  } else if (pk10Arr.includes(cart.gameid)) {
    const arr1 = [1], // 1
      arr2 = [2], // 1|1 不重复
      arr3 = [4], // 1|1|1 不重复
      arr4 = [6, 15], // 10|10|10|10|10|10|10|10|10|10 任选1
      arr5 = [7], // 1 max23
      arr6 = [14], // 6|6|6|6|6|4|4|4|4|4
      arr7 = [3, 5] // 不重复，2
    if (arr1.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '1', 1)
    } else if (arr2.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '1|1', 2)
    } else if (arr3.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '1|1|1', 2)
    } else if (arr4.includes(cart.playid)) {
      const str = assemStr('10|10|10|10|10|10|10|10|10|10')
      dataArr = randomNum(cart.dataSource, str.max, str.str, 1)
    } else if (arr5.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 23, '1', 1)
    } else if (arr6.includes(cart.playid)) {
      const str = assemStr('6|6|6|6|6|4|4|4|4|4')
      dataArr = randomNum(cart.dataSource, str.max, str.str, 1)
    } else if (arr7.includes(cart.playid)) {
      dataArr = singleCalc(cart.dataSource, 2)
    }
  } else if (sandiArr.includes(cart.gameid)) {
    const arr1 = [1], // 1|1|1
      arr2 = [3], // 1 max28
      arr3 = [4, 10, 11, 14], // 2
      arr4 = [5], // 3
      arr5 = [6], // 1 max26
      arr6 = [7], // 1 max22
      arr7 = [8, 9], // 1|1
      arr8 = [13], // 1
      arr9 = [26], // 6|5|4|4|4 任选1
      arr10 = [27], // 3|3|3 任选1
      arr11 = [12], // 10|10|10 任选1
      arr12 = [2] // 单式
    if (arr1.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '1|1|1', 1)
    } else if (arr2.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 28, '1', 1)
    } else if (arr3.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '2', 2)
    } else if (arr4.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '3', 2)
    } else if (arr5.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 26, '1', 1)
    } else if (arr6.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 22, '1', 1)
    } else if (arr7.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '1|1', 1)
    } else if (arr8.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '1', 1)
    } else if (arr9.includes(cart.playid)) {
      const str = assemStr('6|5|4|4|4')
      dataArr = randomNum(cart.dataSource, str.max, str.str, 1)
    } else if (arr10.includes(cart.playid)) {
      const str = assemStr('3|3|3')
      dataArr = randomNum(cart.dataSource, str.max, str.str, 1)
    } else if (arr11.includes(cart.playid)) {
      const str = assemStr('10|10|10')
      dataArr = randomNum(cart.dataSource, str.max, str.str, 1)
    } else if (arr12.includes(cart.playid)) {
      dataArr = singleCalc(cart.dataSource, 2)
    }
  } else if (pcddArr.includes(cart.gameid)) {
    const arr1 = [3], // 1, max14
      arr2 = [1], // 1 max28
      arr3 = [2] // 3 max28
    if (arr1.includes(cart.playid)) {
      const str = assemStr('10|4')
      dataArr = randomNum(cart.dataSource, str.max, str.str, 1)
    } else if (arr2.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 28, '1', 1)
    } else if (arr3.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 28, '3', 2)
    }
  } else if (xyqxArr.includes(cart.gameid)) {
    const arr1 = [1], // 10|10|10|10
      arr2 = [2], // 四行任选两行
      arr3 = [3], // 四行任选三行
      arr4 = [4], // 1|1|1|1
      arr5 = [5], // 2
      arr6 = [6], // 3
      arr7 = [7], // 4|4
      arr8 = [8], // 4|4|4|4
      arr9 = [10, 12], // 4|4|4
      arr10 = [9, 11] // 1|1
    if (arr1.includes(cart.playid)) {
      const str = assemStr('10|10|10|10')
      dataArr = randomNum(cart.dataSource, str.max, str.str, 1)
    } else if (arr2.includes(cart.playid)) {
      const str = assemStr('10|10|10|10'),
        randomPos = parseInt(Math.random() * 3, 10),
        temp = str.str.split('|'),
        pos = str.str.split('|').indexOf('1')
      temp.splice(pos, '1')
      const newStr = temp.map((item, index) => {
        if (item !== 1 && randomPos === index) {
          return 1
        } else {
          return item
        }
      })
      newStr.splice(pos, 0, 1)
      dataArr = randomNum(cart.dataSource, str.max, newStr.join('|'), 1)
    } else if (arr3.includes(cart.playid)) {
      const str = assemStr('10|10|10|10'),
        newArr = str.str.split('|').map(item => Number(item === '0'))
      dataArr = randomNum(cart.dataSource, str.max, newArr.join('|'), 1)
    } else if (arr4.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '1|1|1|1', 1)
    } else if (arr5.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '2', 2)
    } else if (arr6.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 10, '3', 2)
    } else if (arr7.includes(cart.playid)) {
      const str = assemStr('4|4')
      dataArr = randomNum(cart.dataSource, str.max, str.str, 1)
    } else if (arr8.includes(cart.playid)) {
      const str = assemStr('4|4|4|4')
      dataArr = randomNum(cart.dataSource, str.max, str.str, 1)
    } else if (arr9.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 4, '1|1|1', 1)
    } else if (arr10.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 4, '1|1', 1)
    }
  } else if (xypkArr.includes(cart.gameid)) {
    const arr1 = [1],
      arr2 = [2, 3, 7],
      arr3 = [4],
      arr4 = [5, 6],
      arr5 = [8],
      arr6 = [9],
      arr7 = [10],
      arr8 = [11],
      arr9 = [12]
    if (arr1.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 5, '1', 1)
    } else if (arr2.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 13, '1', 1)
    } else if (arr3.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 11, '1', 1)
    } else if (arr4.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 4, '1', 1)
    } else if (arr5.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 13, '2', 2)
    } else if (arr6.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 13, '3', 2)
    } else if (arr7.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 13, '4', 2)
    } else if (arr8.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 13, '5', 2)
    } else if (arr9.includes(cart.playid)) {
      dataArr = randomNum(cart.dataSource, 13, '6', 2)
    }
  }
  console.log(dataArr)
  return dataArr
}
export { randomBet }
