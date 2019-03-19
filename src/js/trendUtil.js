const GameType = {
  SSC: Symbol(), // 时时彩
  PK10: Symbol(), // PK10
  K3: Symbol(), // 快3
  TEN1C5: Symbol(), // 11选5
  DPC: Symbol(), // 低频彩 （福彩3D 排列三 ）
  PCDD: Symbol(), // PC蛋蛋 （新加披28 分分28 ）
  SIXHC: Symbol(), // 六合彩
  PL3: Symbol(), // 排列三
  XYNC: Symbol() //  幸运农场
}

const gameMap = {
  ssc: {
    gameName: '时时彩,11选5',
    gameDigits: ['万位', '千位', '百位', '十位', '个位']
  },
  ssl: {
    gameName: '时时乐,福彩3D,排列3',
    gameDigits: ['百位', '十位', '个位']
  },
  tm: {
    gameName: '28',
    gameDigits: ['特码1', '特码2', '特码3']
  },
  kThree: {
    gameName: '快三,排列三',
    gameDigits: ['百位', '十位', '个位']
  },
  pkShi: {
    gameName: 'PK拾,幸运飞艇',
    gameDigits: [
      '第一位',
      '第二位',
      '第三位',
      '第四位',
      '第五位',
      '第六位',
      '第七位',
      '第八位',
      '第九位',
      '第十位'
    ]
  },
  sixCai: {
    gameName: '六合彩,香港',
    gameDigits: [
      '第一位',
      '第二位',
      '第三位',
      '第四位',
      '第五位',
      '第六位',
      '第七位'
    ]
  }
}

/*
* 根据接口数据转换趋势数据
*
*/
function trendDataToView(list) {
  if (!list || !list.length) return []
  let number = 0
  const trendData = []

  // 先取得数字位数
  for (const item in list[0]) {
    number = parseInt(item.split('_')[1]) + 1
  }
  // 期数_数字
  for (let c = 0; c < number; c++) {
    trendData.push([])
    list.forEach(item => {
      const qishu = item.qishu.slice(-2),
        num = item['ba_' + c]
      trendData[c].push(`${qishu}_${num}`)
    })
  }
  return trendData
}

// 根据彩票名称获取彩票类型
function getTrendTypeByName(name) {
  if (name && typeof name === 'string') {
    if (name.indexOf('时时彩') >= 0) {
      return GameType.SSC
    }
    if (
      name.indexOf('PK拾') >= 0 ||
      name.indexOf('PK10') >= 0 ||
      name.indexOf('幸运飞艇') >= 0
    ) {
      return GameType.PK10
    }
    if (name.indexOf('快三') >= 0) {
      return GameType.K3
    }
    if (name.indexOf('排列三') >= 0) {
      return GameType.PL3
    }
    if (name.indexOf('11选5') >= 0) {
      return GameType.TEN1C5
    }
    if (name.indexOf('六合彩') >= 0 || name.indexOf('⑥合彩') >= 0) {
      return GameType.SIXHC
    }
    if (name.indexOf('福彩') >= 0 || name.indexOf('排列三') >= 0) {
      return GameType.DPC
    }
    if (name.indexOf('28') >= 0) {
      return GameType.PCDD
    }
    if (name.indexOf('幸运农场') >= 0) {
      return GameType.XYNC
    }
  }
  return GameType.SSC
}

// 根据数字返回依次数组
function getArrayByNum(num, startZero) {
  if (num > 0) {
    const arr = []
    for (let c = startZero ? 0 : 1; c <= num; c++) {
      arr.push(c)
    }
    return arr
  } else return []
}

// 根据彩票类型获取彩票位数
function getTrendDigitByType(gameType) {
  switch (gameType) {
    case GameType.SSC:
    case GameType.DPC:
    case GameType.PCDD:
    case GameType.PL3:
      return getArrayByNum(9, true)
    case GameType.PK10:
      return getArrayByNum(10)
    case GameType.K3:
      return getArrayByNum(6)
    case GameType.TEN1C5:
      return getArrayByNum(11)
    case GameType.XYNC:
      return getArrayByNum(20)
  }
}

// 根据彩票名称获取彩票位数
function getTrendDigitByName(gameName) {
  return getTrendDigitByType(getTrendTypeByName(gameName))
}

// 简单处理期数，取最后三位
function getSimplePeriod(list) {
  if (!list || !list.length) return []
  return list.map(item => {
    item.qishu = item.qishu.slice(-4)
    return item
  })
}

// 根据彩票名称获取位数
function findDigitsByName(gameName) {
  const map = gameMap
  let game = null
  for (const item in map) {
    const name = map[item].gameName
      .split(',')
      .find(name => gameName.includes(name))
    if (name) {
      game = map[item]
    }
  }
  return game ? game.gameDigits : ''
}

export {
  GameType,
  trendDataToView,
  getTrendTypeByName,
  getTrendDigitByType,
  getTrendDigitByName,
  getSimplePeriod,
  findDigitsByName
}
