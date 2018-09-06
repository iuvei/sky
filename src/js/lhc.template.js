/**
 * 目标： 构建六合彩投注UI的规则 号码属性
 * shidx (0 - 11): 传入的本命年生肖 ， 为防止本地时间出错而导致的页面错乱， 核心数据以后台的数据为准。
 * 六合彩的规则本是固定的 ， 大部分数据可以写成固定的 ， 只需要计算和生肖相关的数据即可。
 * */
const selectBalls = function(shidx) {
  /* 色波， 五星，头尾数， 大小单双 -- 固定属性
    生肖的号码 -- 根据年份计算
   * */
  const default_color = {
    red: {
      name: '红波',
      color: 'red',
      val: 0,
      balls: [
        '01',
        '02',
        '07',
        '08',
        '12',
        '13',
        '18',
        '19',
        '23',
        '24',
        '29',
        '30',
        '34',
        '35',
        '40',
        '45',
        '46'
      ]
    },
    blue: {
      name: '蓝波',
      color: 'blue',
      val: 1,
      balls: [
        '03',
        '04',
        '09',
        '10',
        '14',
        '15',
        '20',
        '25',
        '26',
        '31',
        '36',
        '37',
        '41',
        '42',
        '47',
        '48'
      ]
    },
    green: {
      name: '绿波',
      color: 'green',
      val: 2,
      balls: [
        '05',
        '06',
        '11',
        '16',
        '17',
        '21',
        '22',
        '27',
        '28',
        '32',
        '33',
        '38',
        '39',
        '43',
        '44',
        '49'
      ]
    }
  }
  /*
   天肖, 兔,马,猴,猪,牛,龙  -- 地肖, 鼠,虎,蛇,羊,鸡,狗
   家肖, 羊,马,牛,猪,狗,鸡  -- 野肖, 猴,蛇,龙,兔,虎,鼠
   前肖,鼠,牛,虎,兔,龙,蛇     -- 后肖,马,羊,猴,鸡,狗,猪
   * */
  const default_shengxiao = {
    ba_0: { name: '鼠', idx: 0, val: 1, tian: 1, jia: 1, qian: 0, balls: [] },
    ba_1: { name: '牛', idx: 1, val: 2, tian: 0, jia: 0, qian: 0, balls: [] },
    ba_2: { name: '虎', idx: 2, val: 3, tian: 1, jia: 1, qian: 0, balls: [] },
    ba_3: { name: '兔', idx: 3, val: 4, tian: 0, jia: 1, qian: 0, balls: [] },
    ba_4: { name: '龙', idx: 4, val: 5, tian: 0, jia: 1, qian: 0, balls: [] },
    ba_5: { name: '蛇', idx: 5, val: 6, tian: 1, jia: 1, qian: 0, balls: [] },
    ba_6: { name: '马', idx: 6, val: 7, tian: 0, jia: 0, qian: 0, balls: [] },
    ba_7: { name: '羊', idx: 7, val: 8, tian: 1, jia: 0, qian: 0, balls: [] },
    ba_8: { name: '猴', idx: 8, val: 9, tian: 0, jia: 1, qian: 0, balls: [] },
    ba_9: { name: '鸡', idx: 9, val: 10, tian: 1, jia: 0, qian: 0, balls: [] },
    ba_10: {
      name: '狗',
      idx: 10,
      val: 11,
      tian: 1,
      jia: 0,
      qian: 0,
      balls: []
    },
    ba_11: { name: '猪', idx: 11, val: 12, tian: 0, jia: 0, qian: 0, balls: [] }
  }

  // const default_wuxing = {
  //   ba_0: {
  //     name: '金',
  //     idx: 0,
  //     val: 1,
  //     balls: ['03', '04', '17', '18', '25', '26', '33', '34', '47', '48']
  //   },
  //   ba_1: {
  //     name: '木',
  //     idx: 1,
  //     val: 2,
  //     balls: ['07', '08', '15', '16', '29', '30', '37', '38', '45', '46']
  //   },
  //   ba_2: {
  //     name: '水',
  //     idx: 2,
  //     val: 3,
  //     balls: ['05', '06', '13', '14', '21', '22', '35', '36', '43', '44']
  //   },
  //   ba_3: {
  //     name: '火',
  //     idx: 3,
  //     val: 4,
  //     balls: ['01', '02', '09', '10', '23', '24', '31', '32', '39', '40']
  //   },
  //   ba_4: {
  //     name: '土',
  //     idx: 4,
  //     val: 5,
  //     balls: ['11', '12', '19', '20', '27', '28', '41', '42', '49']
  //   }
  // }

  const wuxing = {
    wuxing_jin: {
      name: '金',
      idx: 0,
      val: 1,
      balls: [4, 5, 18, 19, 26, 27, 34, 35, 48, 49]
    },
    wuxing_mu: {
      name: '木',
      idx: 1,
      val: 2,
      balls: [1, 8, 9, 16, 17, 30, 31, 38, 39, 46, 47]
    },
    wuxing_shui: {
      name: '水',
      idx: 2,
      val: 3,
      balls: [6, 7, 14, 15, 22, 23, 36, 37, 44, 45]
    },
    wuxing_huo: {
      name: '火',
      idx: 3,
      val: 4,
      balls: [2, 3, 10, 11, 24, 25, 32, 33, 40, 41]
    },
    wuxing_tu: {
      name: '土',
      idx: 4,
      val: 5,
      balls: [12, 13, 20, 21, 28, 29, 42, 43]
    }
  }

  const resShengxiao = function() {
    for (const k in default_shengxiao) {
      let start_balls = shidx - default_shengxiao[k].idx + 1 // 计算生肖位置开始号码
      if (start_balls < 0) {
        start_balls = 12 + start_balls
      }
      // 输出生肖对应的号码
      for (let i = start_balls; i < 50; i += 12) {
        if (i === 0) {
          continue
        }
        const theball = i > 9 ? i + '' : '0' + i
        default_shengxiao[k].balls.push(theball)
      }
    }
    return default_shengxiao
  }

  // 计算色波
  const calcColor = function(name) {
    for (const k in default_color) {
      for (const idx in default_color[k].balls) {
        if (name === default_color[k].balls[idx]) {
          return default_color[k].color
        }
      }
    }
  }
  // 计算五行
  const calcWuxing = function(name) {
    const default_wuxing = wuxing
    for (const k in default_wuxing) {
      for (const idx in default_wuxing[k].balls) {
        if (name === default_wuxing[k].balls[idx]) {
          return default_wuxing[k].val
        }
      }
    }
  }
  // 计算大小 0大 1小
  const calcBig = function(val) {
    return val > 24 ? 0 : 1
  }
  // 计算单双  0 单 1双
  const calcSingle = function(val) {
    return val % 2 === 0 ? 1 : 0
  }
  // 计算和大小 0 大  1小
  const calcSumBig = function(name) {
    const sum = Number(name[0]) + Number(name[1])
    return sum > 6 ? 0 : 1
  }
  // 计算和单双 0 单  1双
  const calcSumSingle = function(name) {
    const sum = parseInt(name[0]) + parseInt(name[1])
    return sum % 2 > 0 ? 0 : 1
  }
  // 计算头数
  const calcTouShu = function(name) {
    return parseInt(name[0])
  }
  // 计算尾数
  const calcWeishu = function(name) {
    return parseInt(name[1])
  }
  // 计算生肖
  const calcShengxiao = function(val) {
    let res = shidx + 1 - val % 12
    if (res < 0) {
      res = shidx + 1 - res
    }
    return res
  }

  /*	color: 0/红, 1/蓝, 2/绿;  wuxing: 0/金, 1/木, 2/水, 3/火, 4/土;  big: 0/大, 1/小;  single: 0/单, 1/双;
   sum_big:  0/和大, 1/和小; sum_single: 0/和单, 1/和双; toushu: 0-4; weishu: 0-9; shengxiao: 0-11;
   ba_0:  {name: '01', val: 1, color: '', wuxing: '', big: 1, single: 0, sum_big: 1, sum_single: 0, toushu: 0, weishu: 1, shengxiao: ''},
   * */
  const resBalls = function() {
    const default_balls = {}
    for (let i = 0; i < 49; i += 1) {
      const name = i > 8 ? i + 1 + '' : '0' + (i + 1)
      const val = i + 1
      default_balls['ba_' + i] = {} // 开始创建数据
      default_balls['ba_' + i].name = name // 修饰球
      default_balls['ba_' + i].val = val // 真值 传上去的号码球
      default_balls['ba_' + i].idx = i // 添加-赔率下标 - 特码专属
      default_balls['ba_' + i].color = calcColor(name) // 色波
      default_balls['ba_' + i].wuxing = calcWuxing(name) // 五行
      default_balls['ba_' + i].big = calcBig(val) // 大小
      default_balls['ba_' + i].single = calcSingle(val) // 单双
      default_balls['ba_' + i].sum_big = calcSumBig(name) // 和大小
      default_balls['ba_' + i].sum_single = calcSumSingle(name) // 和单双
      default_balls['ba_' + i].toushu = calcTouShu(name) // 头数
      default_balls['ba_' + i].weishu = calcWeishu(name) // 尾数
      default_balls['ba_' + i].shengxiao = calcShengxiao(val) // 生肖
    }
    return default_balls
  }

  //	需要返回的数据:  生肖、号码、 五行、  色波
  return {
    shengxiao: resShengxiao(),
    balls: resBalls(),
    wuxing,
    color: default_color
  }
}
export { selectBalls }
