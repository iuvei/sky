const templates = {
  wanfas: [
    '前一直选',
    '前二直选',
    '前三直选',
    '前二和值',
    '前三和值',
    '前四和值',
    '双面盘',
    '牛牛',
    '冠亚和',
    '前三大小单双',
    '前三特选',
    '大小单双'
  ],
  wanfaFuns: [
    'q1zx',
    'q2zx',
    'q3zx',
    'q2hz',
    'q3hz',
    'q4hz',
    'smp',
    'nn',
    'lhd',
    'gyh',
    'q3dxds',
    'q3tx',
    'dxds'
  ],
  normal: [
    '冠军({0})',
    '亚军({0})',
    '季军({0})',
    '四名({0})',
    '五名({0})',
    '六名({0})',
    '七名({0})',
    '八名({0})',
    '九名({0})',
    '十名({0})'
  ],
  official: [
    '冠军',
    '亚军',
    '季军',
    '第四名',
    '第五名',
    '第六名',
    '第七名',
    '第八名',
    '第九名',
    '第十名'
  ],
  pk10: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
  dxds: ['大', '小', '单', '双'],
  qstx: ['全大', '全小', '全单', '全双'],
  lhd: ['冠军', '亚军', '季军', '四名', '五名'],
  lhd_data: [
    ['0v1', '1v0'],
    ['0v2', '2v0'],
    ['0v3', '3v0'],
    ['0v4', '4v0'],
    ['1v2', '2v1'],
    ['1v3', '3v1'],
    ['1v4', '4v1'],
    ['2v3', '3v2'],
    ['2v4', '4v2'],
    ['3v4', '4v3']
  ],
  smp: ['大', '小', '单', '双', '龙', '虎'],
  smp2: ['冠军', '亚军', '季军', '第四名', '第五名'],
  gyh: [
    '大',
    '小',
    '单',
    '双',
    '中',
    '和',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19'
  ],
  niuniu: [
    '牛一',
    '牛二',
    '牛三',
    '牛四',
    '牛五',
    '牛六',
    '牛七',
    '牛八',
    '牛九',
    '牛牛',
    '无牛',
    '有牛',
    '牛大',
    '牛小',
    '牛单',
    '牛双'
  ],
  q2hz: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19],
  q3hz: [
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27
  ],
  q4hz: [
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33
  ]
}

// String.format 实现类似C++中format功能, 便于字符串处理
String.prototype.format = function(args) {
  let result = this
  if (args.length > 0) {
    if (args.length === 1 && typeof args == 'object') {
      for (const key in args) {
        const reg = new RegExp('(\\{' + key + '\\})', 'g')
        result = result.replace(reg, args[key])
      }
    } else {
      for (let i = 0; i < args.length; i++) {
        const reg = new RegExp('(\\{' + i + '\\})', 'g')
        if (args[i] === undefined || args[i] == null) {
          result = result.replace(reg, 'null')
        } else {
          result = result.replace(reg, args[i])
        }
      }
    }
  }
  return result
}

// 计算投注算法
function BallUtil() {
  // 前一 直选复式
  this.add_q1zx = data => {
    const balls = data[0].sort()
    return [{ balls: balls.toString().replace(/,/g, ' '), output: balls }]
  }

  // 前二 直选复式
  this.add_q2zx = data => {
    let balls = ''
    data.forEach(item => {
      if (item.length > 0) {
        if (balls.length > 0) {
          balls += ' '
        }
        item = item.sort()
        item.forEach((x, i) => balls += (i > 0 ? '|' : '') + x)
      }
    })
    return [{ balls, output: balls.split(' ') }]
  }

  // 前三 直选复式
  this.add_q3zx = data => this.add_q2zx(data)

  // 定位胆
  this.add_dwd = data => {
    const outputs = templates.normal
    let balls = ''
    let output = ''
    let pos = 0 // 位置数判断
    let i = 0
    data.forEach(item => {
      if (item.length > 0) {
        pos += Math.pow(2, i)
        if (balls.length > 0) {
          balls += ' '
          output += ' '
        }
        let child = ''
        item = item.sort()
        item.forEach((x, i) => {
          child += (i > 0 ? '|' : '') + x
          output += outputs[i].format([child])
        })
        balls += child
        i++
      }
    })
    return [{ balls: pos + ' ' + balls, output }]
  }

  // 定位大小单双
  this.add_dxds = data => {
    const outputs = templates.normal
    const output_balls = templates.dxds
    let balls = ''
    let output = ''
    let pos = 0 // 位置数判断
    let c = 0
    data.forEach((item, index) => {
      let balls_child = '',
        output_child = ''
      if (item.length > 0) {
        pos += Math.pow(2, c)
        const pre = balls.length ? ' ' : ''
        balls += pre
        output += pre
        item = item.map(x => output_balls.indexOf(x))
        item.sort()
        item.forEach((x, i) => {
          balls_child += (i > 0 ? '|' : '') + x
          output_child += (i > 0 ? '|' : '') + output_balls[x]
        })
        balls += balls_child
        output += outputs[index].format([output_child])
        c++
      }
    })

    return [{ balls: pos + ' ' + balls, output }]
  }

  // 前三大小单双
  this.add_q3dxds = data => {
    let balls = '',
      output = ''
    const outputs = templates.dxds

    data = data.sort()
    data.forEach(item => {
      const pre = balls.length ? ' ' : ''
      balls += pre + item
      output += pre + outputs[item]
    })

    return [{ balls, output }]
  }

  // 前三特选
  this.add_q3tx = data => {
    let balls = '',
      output = ''
    const outputs = templates.qstx
    data = data.sort()
    data.forEach(item => {
      const pre = balls.length ? ' ' : ''
      balls += pre + item
      output += pre + outputs[item]
    })

    return [{ balls, output }]
  }

  // 龙虎斗
  this.add_whjx = data => {
    let balls = '',
      output = ''
    const outputs = templates.lhd
    data.forEach(item => {
      const pre = balls.length ? ' ' : ''
      balls += pre + item
      output += pre + `<font>${outputs[item[0]]}</font>VS${outputs[item[2]]}`
    })

    return [{ balls, output }]
  }

  // 双面盘
  this.add_smp = data => {
    let balls = '',
      output = ''
    const obj = {}
    data.forEach(item => {
      // 根据数字获取在哪一行
      const rowIndex =
        item <= 6
          ? 0
          : item % 6 === 0 ? parseInt(item / 6) - 1 : parseInt(item / 6)
      // 根据数字获取在第几位
      const columnIndex =
        item <= 6
          ? item - 1
          : item % 6 === 0 ? 5 : item - 6 * parseInt(item / 6) - 1
      const pre = balls.length ? ' ' : ''
      balls += pre + item
      const key = templates.normal[rowIndex].replace('({0})', '')
      if (!obj[key]) {
        obj[key] = ''
      }
      obj[key] += templates.smp[columnIndex]
    })
    for (const item in obj) {
      const pre = output.length ? ' ' : ''
      output += pre + `${item}(${obj[item]})`
    }
    return [{ balls, output }]
  }

  // 冠亚和
  this.add_gyh = data => {
    let balls = '',
      output = ''
    const outputs = templates.gyh
    data.forEach(item => {
      const pre = balls.length ? ' ' : ''
      balls += pre + item
      output += pre + outputs[item]
    })
    // 返回的balls 是从0到22，看情况返回从1开始或者返回包含汉字的数组
    return [{ balls, output }]
  }

  // 牛牛
  this.add_nn = data => {
    let balls = '',
      output = ''
    const outputs = templates.niuniu
    data.forEach(item => {
      const pre = balls.length ? ' ' : ''
      balls += pre + item
      output += pre + outputs[item]
    })
    return [{ balls, output }]
  }

  // 前二和值
  this.add_q2_hz = data => {
    const return_obj = []
    data.forEach(item => {
      const c = templates.q2hz[item]
      return_obj.push({ balls: c + '', output: c, jj_index: c - 3 })
    })
    return return_obj
  }

  // 前三和值
  this.add_q3_hz = data => {
    const return_obj = []
    data.forEach(item => {
      const c = templates.q3hz[item]
      return_obj.push({ balls: c + '', output: c, jj_index: c - 6 })
    })
    return return_obj
  }

  // 前四和值
  this.add_q4_hz = data => {
    const return_obj = []
    data.forEach(item => {
      const c = templates.q4hz[item]
      return_obj.push({ balls: c + '', output: c, jj_index: c - 9 })
    })
    return return_obj
  }
}

// 根据玩法类型返回渲染数据
function DataUtil() {
  // 单行数据
  function singleLineSelect(tpl, arr, value) {
    const tplIndex = tpl.indexOf(value),
      itemIndex = arr.indexOf(tplIndex)
    if (itemIndex === -1) {
      arr.push(tplIndex)
    } else {
      arr.splice(itemIndex, 1)
    }
    return arr
  }
  // 前一直选
  this.q1zx = (arr, value) => {
    const itemIndex = arr.indexOf(value)
    if (itemIndex === -1) {
      arr.push(value)
    } else {
      arr.splice(itemIndex, 1)
    }
    return arr
  }
  // 前二复选
  this.q2zx = (arr, value) => {
    const itemIndex = arr.indexOf(value)
    if (itemIndex === -1) {
      arr.push(value)
    } else {
      arr.splice(itemIndex, 1)
    }
    return arr
  }
  // 前三复选
  this.q3zx = (arr, value) => {
    const itemIndex = arr.indexOf(value)
    if (itemIndex === -1) {
      arr.push(value)
    } else {
      arr.splice(itemIndex, 1)
    }
    return arr
  }
  // 前三大小单双
  this.q3dxds = (arr, value) => singleLineSelect(templates.dxds, arr, value)
  // 前三特选
  this.q3tx = (arr, value) => singleLineSelect(templates.qstx, arr, value)
  // 龙虎斗
  this.lhd = (arr, value) => {
    const itemIndex = arr.indexOf(value)
    if (itemIndex === -1) {
      arr.push(value)
    } else {
      arr.splice(itemIndex, 1)
    }
    return arr
  }
  // 定位大小单双
  this.official = (arr1, arr2, label, value) => {
    const _arr = arr2[arr1.indexOf(label)],
      itemIndex = _arr.indexOf(value)
    if (itemIndex === -1) {
      _arr.push(value)
    } else {
      _arr.splice(itemIndex, 1)
    }
    return arr2
  }
  // 双面盘
  this.smp = (arr, label, value) => {
    const tpl = templates.smp2,
      tpl2 = templates.smp,
      index = tpl.indexOf(label),
      num = tpl2.indexOf(value),
      realIndex = index * 6 + num,
      realNum = realIndex + 1
    if (arr.includes(realNum)) {
      arr.splice(realIndex, 1)
    } else {
      arr[realIndex] = realNum
    }
    return arr
  }

  // 冠亚和
  this.gyh = (arr, value) =>
    singleLineSelect(templates.gyh, arr, value).sort((a, b) => a - b)

  // 牛牛
  this.nn = (arr, value) =>
    singleLineSelect(templates.niuniu, arr, value).sort((a, b) => a - b)

  // 前二和值
  this.q2hz = (arr, value) =>
    singleLineSelect(templates.q2hz, arr, value).sort((a, b) => a - b)

  // 前三和值
  this.q3hz = (arr, value) =>
    singleLineSelect(templates.q3hz, arr, value).sort((a, b) => a - b)

  // 前四和值
  this.q4hz = (arr, value) =>
    singleLineSelect(templates.q4hz, arr, value).sort((a, b) => a - b)
}
// 计算注数工具类
function CalcUtil() {
  // 工具方法
  const checkArrIs = (arr, regx) => arr.every(item => regx.test(item))
  // 前一 直选复式
  this.calc_q1zx = ba => {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }
  // 前二 直选复式
  this.calc_q2zx = ba => {
    if (ba.length < 2) {
      return 0
    }
    let zhushu = 0
    const balls1 = ba[0].split('|')
    const balls2 = ba[1].split('|')
    if (
      !checkArrIs(balls1, /[0-1][0-9]/) ||
      !checkArrIs(balls2, /[0-1][0-9]/)
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
  this.calc_q2_zxds = ba => {
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
  this.calc_q3zx = ba => {
    if (ba.length < 3) {
      return 0
    }
    let zhushu = 0
    const balls1 = ba[0].split('|')
    const balls2 = ba[1].split('|')
    const balls3 = ba[2].split('|')
    if (
      !checkArrIs(balls1, /[0-1][0-9]/) ||
      !checkArrIs(balls2, /[0-1][0-9]/) ||
      !checkArrIs(balls3, /[0-1][0-9]/)
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
  this.calc_q3_zxds = ba => {
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
  this.calc_dwd = ba => {
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
  this.calc_q2hz = ba => {
    if (ba.length < 1) {
      return 0
    }
    return ba.length
  }
  // 前三和值
  this.calc_q3hz = ba => {
    if (ba.length < 1) {
      return 0
    }
    return ba.length
  }
  // 前四和值
  this.calc_q4hz = ba => {
    if (ba.length < 1) {
      return 0
    }
    return ba.length
  }

  // 定位大小单双
  this.calc_dxds = ba => {
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
  this.calc_q3dxds = ba => {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  // 前三特选
  this.calc_q3tx = ba => {
    if (ba.length < 1 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }

  // 龙虎斗
  this.calc_lhd = ba => {
    if (ba.length < 0 || ba[0] === '') {
      return 0
    } else {
      return ba.length
    }
  }
  /* END 自定玩法 */

  // 双面盘
  this.calc_smp = ba => ba.length

  // 冠亚和
  this.calc_gyh = ba => ba.length

  // 牛牛
  this.calc_nn = ba => ba.length
}

const getFunc = wanfa => {
  let _wanfa = ''
  for (let i = 0; i < templates.wanfas.length; i++) {
    if (wanfa.includes(templates.wanfas[i])) {
      _wanfa = templates.wanfaFuns[i]
      break
    }
  }
  if (wanfa.includes('定位胆') || wanfa.includes('数字盘')) {
    _wanfa = 'dwd'
  }
  return _wanfa
}

const getAddFunc = wanfa => 'add_' + getFunc(wanfa)
const getCalcFunc = wanfa => 'calc_' + getFunc(wanfa)
const getWanfa = (wanfa, arr1, arr2, val1, val2) => {
  // for (let i = 0; i < this.templates.wanfas.length; i++) {
  //   if (wanfa.includes(this.templates.wanfas[i])) {
  //     arr = new DataUtil()[this.templates.wanfaFuns[i]](this.arr3, val2)
  //     break
  //   }
  // }
  // if (wanfa.includes('定位胆') || wanfa.includes('数字盘')) {
  //   arr = new DataUtil().official(this.arr1, this.arr2, val1, val2)
  // }
  // return arr
  if (wanfa.includes('定位胆') || wanfa.includes('数字盘')) {
    return new DataUtil().official(this.arr1, this.arr2, val1, val2)
  } else {
    return new DataUtil()[this.getFunc(wanfa)](arr2, val2)
  }
}

const ChoseBall = (arr, wanfa, val, e) => {
  const cList = e.srcElement.classList,
    isSelected = cList.contains('choosed'),
    addFunc = getAddFunc(wanfa),
    calcFunc = getCalcFunc(wanfa),
    data = new BallUtil()[addFunc](arr),
    calcUtil = new CalcUtil()

  let zhushu = 0
  if (isSelected) {
    cList.remove('choosed')
  } else {
    cList.add('choosed')
  }

  console.log(`rules_data,before:${JSON.stringify(data)}`)
  for (let i = 0; i < data.length; i++) {
    zhushu += calcUtil[calcFunc](data[i].balls.split(/[\,\s\;]/))
  }
  console.log(`rules_data,after:${JSON.stringify(data)}`)
  console.log(`注数:${zhushu}`)
  return zhushu
}

export { templates, BallUtil, DataUtil, CalcUtil, ChoseBall, getWanfa }
