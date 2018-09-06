const xglhc_shengxiao = []
xglhc_shengxiao[1] = '鸡'
xglhc_shengxiao[2] = '猴'
xglhc_shengxiao[3] = '羊'
xglhc_shengxiao[4] = '马'
xglhc_shengxiao[5] = '蛇'
xglhc_shengxiao[6] = '龙'
xglhc_shengxiao[7] = '兔'
xglhc_shengxiao[8] = '虎'
xglhc_shengxiao[9] = '牛'
xglhc_shengxiao[10] = '鼠'
xglhc_shengxiao[11] = '猪'
xglhc_shengxiao[0] = '狗'

// 号码转生肖
function ballToShengxiao(_ball) {
  const idx = parseInt(_ball) % 12
  return xglhc_shengxiao[idx]
}

// 号码转吉凶
function BallToJiXiong(_ball) {
    // 兔、龙、蛇、马、羊、鸡
  const _sx = ballToShengxiao(_ball)
  switch (_sx) {
    case '兔':
    case '龙':
    case '蛇':
    case '马':
    case '羊':
    case '鸡':
      return '吉'
    default:
      return '凶'
  }
}

// 号码转家禽/猛兽
function BallToQinShou(_ball) {
    // 牛、马、羊、鸡、狗、猪
  const _sx = ballToShengxiao(_ball)
  switch (_sx) {
    case '牛':
    case '马':
    case '羊':
    case '鸡':
    case '狗':
    case '猪':
      return '家禽'
    default:
      return '野兽'
  }
}

// 号码转阴阳
function BallToYinYang(_ball) {
    // 鼠、龙、蛇、马、狗、猪
  const _sx = ballToShengxiao(_ball)
    // 鼠、龙、蛇、马、狗、猪
  switch (_sx) {
    case '鼠':
    case '龙':
    case '蛇':
    case '马':
    case '狗':
    case '猪':
      return '阴'
    default:
      return '阳'
  }
}

// 号码转单双笔
function BallToDanShuang(_ball) {
    // 鼠、龙、马、蛇、鸡、猪
  const _sx = ballToShengxiao(_ball)
  switch (_sx) {
    case '鼠':
    case '龙':
    case '马':
    case '蛇':
    case '鸡':
    case '猪':
      return '单笔'
    default:
      return '双笔'
  }
}

// 号码转天地
function BallToTianDi(_ball) {
    // 兔、马、猴、猪、牛、龙
  const _sx = ballToShengxiao(_ball)
  switch (_sx) {
    case '兔':
    case '马':
    case '猴':
    case '猪':
    case '牛':
    case '龙':
      return '天'
    default:
      return '地'
  }
}

// 号码转黑白
function BallToHeiBai(_ball) {
    // 鼠、牛、虎、鸡、狗、猪
  const _sx = ballToShengxiao(_ball)
  switch (_sx) {
    case '鼠':
    case '牛':
    case '虎':
    case '鸡':
    case '狗':
    case '猪':
      return '白边'
    default:
      return '黑中'
  }
}

// 号码转男女
function BallToNanNv(_ball) {
    // 兔、蛇、羊、鸡、猪
  const _sx = ballToShengxiao(_ball)
  switch (_sx) {
    case '兔':
    case '蛇':
    case '羊':
    case '鸡':
    case '猪':
      return '女肖'
    default:
      return '男肖'
  }
}

// 号码转颜色
function BallToColor(_ball) {
  switch (parseInt(_ball)) {
    case 1:
    case 2:
    case 7:
    case 8:
    case 12:
    case 13:
    case 18:
    case 19:
    case 23:
    case 24:
    case 29:
    case 30:
    case 34:
    case 35:
    case 40:
    case 45:
    case 46:
      return '红'
    case 3:
    case 4:
    case 9:
    case 10:
    case 14:
    case 15:
    case 20:
    case 25:
    case 26:
    case 31:
    case 36:
    case 37:
    case 41:
    case 42:
    case 47:
    case 48:
      return '蓝'
    default:
      return '绿'
  }
}

// 号码转颜色
function BallToColor2(_ball) {
  switch (parseInt(_ball)) {
    case 1:
    case 2:
    case 7:
    case 8:
    case 12:
    case 13:
    case 18:
    case 19:
    case 23:
    case 24:
    case 29:
    case 30:
    case 34:
    case 35:
    case 40:
    case 45:
    case 46:
      return 'red'
    case 3:
    case 4:
    case 9:
    case 10:
    case 14:
    case 15:
    case 20:
    case 25:
    case 26:
    case 31:
    case 36:
    case 37:
    case 41:
    case 42:
    case 47:
    case 48:
      return 'blue'
    default:
      return 'green'
  }
}

// pcdd号码转颜色
function BallToColorpcdd(_ball) {
  switch (parseInt(_ball)) {
    case 3:
    case 6:
    case 9:
    case 12:
    case 15:
    case 18:
    case 21:
    case 24:
    case '=':
      return '#e33939'
    case 2:
    case 5:
    case 8:
    case 11:
    case 17:
    case 20:
    case 23:
    case 26:
      return '#00a0e9'
    case 0:
    case 13:
    case 14:
    case 27:
    case '+':
      return '#707070'
    default:
      return '#32b16c'
  }
}

// 号码转五行
function BallToWuXing(_ball) {
  const _idx = parseInt(_ball)
    // 金   02     03     16     17     24     25     32     33     46     47
    // 木   06     07     14     15     28     29     36     37     44     45
    // 水   04     05     12     13     20     21     34     35     42     43
    // 火   01     08     09     22     23     30     31     38     39
    // 土   10     11     18     19     26     27     40     41     48     49
  switch (_idx) {
    case 2:
    case 3:
    case 16:
    case 17:
    case 24:
    case 25:
    case 32:
    case 33:
    case 46:
    case 47:
      return '金'
    case 6:
    case 7:
    case 14:
    case 15:
    case 28:
    case 29:
    case 36:
    case 37:
    case 44:
    case 45:
      return '木'
    case 4:
    case 5:
    case 12:
    case 13:
    case 20:
    case 21:
    case 34:
    case 35:
    case 42:
    case 43:
      return '水'
    case 1:
    case 8:
    case 9:
    case 22:
    case 23:
    case 30:
    case 31:
    case 38:
    case 39:
      return '火'
    default:
      return '土'
  }
}

// 号码转合大小
function BallsToDaXiao(balls) {
  let sum = 0
  if (balls.length !== 7) {
    balls = balls.split(/[s\;\,\|]/)
    if (balls.length !== 7) {
      return null
    }
  }

  for (const k in balls) {
    sum += parseInt(balls[k])
  }

  if (sum > 175) {
    return '大'
  } else {
    return '小'
  }
}
export {
    BallToColorpcdd,
    BallToColor2,
    BallToColor,
    BallToWuXing,
    BallToHeiBai,
    BallToTianDi,
    BallToNanNv,
    BallToDanShuang,
    BallToYinYang,
    BallToQinShou,
    BallToJiXiong,
    BallsToDaXiao,
    ballToShengxiao
}
