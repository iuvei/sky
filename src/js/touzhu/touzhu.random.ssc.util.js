import { RenderTypes } from './commonTypes'
import {
  Calc_Zhushu_Obj,
  getCalcFuncByPlayID,
  getRenderTypeByPlayID
} from '~/js/touzhu/touzhu.ssc.calc'
import danshiUtil from '~/js/touzhu/danshi.util'
import getDwdArr from './util'
const zhushuFunc = new Calc_Zhushu_Obj()

const sscUtil = {
  bettingArr: [], // 传给公共方法的数组，可作为特殊玩法共用数组
  buyBall: [], // 拼接管道符之后的所有球号数组
  wanwei: [], // 万
  qianwei: [], // 千
  baiwei: [], // 百
  shiwei: [], // 十
  gewei: [], //  个
  sanchong: [], // 三重号
  sichong: [], // 四重号
  erchong: [], // 二重号
  danhao: [], // 单号
  getDataSource(randomDataSouce, betData) {
    const playids = [128, 129, 130, 131, 41]
    if (danshiUtil.isSingleMode(betData.js_tag, betData.playid)) {
      return this.getSingleModeData(randomDataSouce, betData)
    } else if (playids.includes(betData.playid)) {
      return this.getDataSpecial(randomDataSouce, betData)
    } else {
      return this.getData(randomDataSouce, betData)
    }
  },
  // 处理时时彩单式数据
  getSingleModeData(randomDataSouce, betData) {
    // const obj = this.getData([randomDataSouce], betData)
    // obj.danshiExcl = randomDataSouce
    // return obj
    return {
      type: 1,
      peilv: betData.peilv,
      peilvType: RenderTypes.SSC, // 0 为单赔率,1为多赔率
      peilvTypeStr: RenderTypes.SSC.toString(),
      formatValueStr: '',
      arr: randomDataSouce,
      arr2: randomDataSouce,
      randomDataSouce,
      wanfa: betData.wanfa, // 玩法
      zhushu: 1, // 注数
      gameid: betData.gameid,
      playid: betData.playid,
      dataSet: randomDataSouce, // oneDimArr, // 数据源,已选中的一维数组
      player: betData.player,
      js_tag: betData.js_tag,
      danshiExcl: randomDataSouce,
      filteredData: randomDataSouce // 已经选中的项数组 二维数组
    }
  },
  // 处理时时彩随机数据 官方玩法
  getData(randomDataSouce, betData) {
    const oneDimArr = [],
      twoDimArr = [],
      oneDimValuesArr = [],
      twoDimNamesArr = [],
      towDimValuesArr = [],
      formatShowStr = ''
    randomDataSouce.forEach(item => {
      const filteredData = item.data.filter(x => x.checked)
      oneDimArr.push(...filteredData)
      if (filteredData.length) {
        const obj = Object.assign({}, item)
        obj.data = filteredData
        twoDimArr.push(obj)
      }
      const filters = filteredData.map(x =>
        x.name.toString().replace(/\s/g, '')
      )
      const values = filteredData.map(x =>
        x.value.toString().replace(/\s/g, '')
      )
      oneDimValuesArr.push(...filters)
      twoDimNamesArr.push(filters.join('|'))
      towDimValuesArr.push(values.join('|'))
    })
    const zhushu = this.calcBetNumber(betData.playid, towDimValuesArr)
    return {
      type: 1,
      peilv: betData.peilv,
      peilvType: RenderTypes.SSC, // 0 为单赔率,1为多赔率
      peilvTypeStr: RenderTypes.SSC.toString(),
      formatValueStr: '',
      arr: twoDimNamesArr,
      arr2: towDimValuesArr,
      formatShowStr,
      wanfa: betData.wanfa, // 玩法
      zhushu, // 注数
      gameid: betData.gameid,
      playid: betData.playid,
      dataSet: oneDimArr, // 数据源,已选中的一维数组
      player: betData.player,
      js_tag: betData.js_tag,
      filteredData: twoDimArr // 已经选中的项数组 二维数组
    }
  },
  // 处理时时彩的特殊类型 双面玩法
  getDataSpecial(randomDataSouce, betData) {
    const oneDimArr = [],
      twoDimArr = [],
      oneDimValuesArr = [],
      twoDimNamesArr = [],
      towDimValuesArr = []
    let formatShowStr = ''
    const peilvType = getRenderTypeByPlayID(betData.playid)
    randomDataSouce.forEach(item => {
      const filteredData = item.data.filter(x => x.checked)
      oneDimArr.push(...filteredData)
      if (filteredData.length) {
        const obj = Object.assign({}, item)
        obj.data = filteredData
        twoDimArr.push(obj)
      }
      const filters = filteredData.map(x =>
        x.name.toString().replace(/\s/g, '')
      )
      const values = filteredData.map(x =>
        x.value.toString().replace(/\s/g, '')
      )
      oneDimValuesArr.push(...filters)
      twoDimNamesArr.push(filters.join('|'))
      towDimValuesArr.push(values.join('|'))
    })

    if (peilvType === RenderTypes.MUTI_ROW_SINGLE_PEILV) {
      twoDimNamesArr.forEach((x, i) => {
        if (x.length) {
          formatShowStr += `${
            randomDataSouce[i].name
          }(<span style="color:red">${x}</span>) `
        }
      })
      formatShowStr = formatShowStr.trim()
    }
    const _zhushu = this.calcBetNumber2(
      betData.playid,
      oneDimValuesArr,
      towDimValuesArr
    )
    console.log('zhshu:' + _zhushu)
    return {
      type: 1, // 双面玩法,0为官方玩法
      peilv: betData.peilv,
      peilvType, // 0 为单赔率,1为多赔率
      formatValueStr:
        peilvType === 0 ? twoDimNamesArr.join(' ') : oneDimValuesArr.join(' '),
      arr: twoDimNamesArr,
      arr2: towDimValuesArr,
      formatShowStr,
      // 定位胆专用取值
      dwdValuesArr:
        peilvType === RenderTypes.DWD ? getDwdArr(towDimValuesArr) : [],
      wanfa: betData.wanfa, // 玩法
      zhushu: _zhushu, // 注数
      gameid: betData.gameid,
      playid: betData.playid,
      js_tag: betData.js_tag,
      dataSet: oneDimArr, // 数据源,已选中的一维数组
      filteredData: twoDimArr // 已经选中的项数组 二维数组
    }
  },
  // this.calcZhushu(
  //   this.curPlayItem.playid,
  //   oneDimValuesArr,
  //   towDimValuesArr
  // );
  calcBetNumber2(playid, oneDimValuesArr, towDimValuesArr) {
    const func = getCalcFuncByPlayID(playid)
    if ([129, 131].includes(playid)) {
      return zhushuFunc[func](oneDimValuesArr)
    } else if ([41, 128].includes(playid)) {
      towDimValuesArr = getDwdArr(towDimValuesArr).filter(x => x.length)
      return zhushuFunc[func](towDimValuesArr)
    } else {
      return zhushuFunc[func](oneDimValuesArr)
    }
  },
  // 计算特殊的注数
  calcBetNumber(playid, arr) {
    console.log(playid)
    // 和值
    // if([8,22,35,59,65,104,117])
    switch (playid) {
      case 89: // 后四-直选组合
        return zhushuFunc.calc_4x_zxzh(arr)
      case 96: // 前四 直选组合
        return zhushuFunc.calc_4x_zxzh(arr)
      // 后三组合 // 前三组合
      case 7:
      case 21:
      case 103:
        return zhushuFunc.calc_h3_zh(arr)
      case 8: // 直选和值
      case 22:
      case 104:
        return zhushuFunc.calc_h3_zxhz(arr)
      case 9: //	直选跨度
      case 23:
      case 105:
        return zhushuFunc.calc_h3_zxkd(arr)
      case 10: // 组三复式
      case 24:
      case 106:
        return zhushuFunc.calc_h3_z3fs(arr[0].split('|'))
      case 16: //	组选包胆
      case 30:
      case 112:
        return zhushuFunc.calc_h3_zuxbd(arr)
      case 35: // 后二直选和值
      case 117:
        return zhushuFunc.calc_q2_zhxhz(arr)
      case 36: // 后二直选跨度
      case 118:
        return zhushuFunc.calc_q2_zxkd(arr)
      case 39: // 后二组选和值
      case 121:
        return zhushuFunc.calc_q2_zuxhz(arr)
      case 40: // 后二组选包胆
      case 122:
        return zhushuFunc.calc_q2_zuxbd(arr)
      default:
        return 1
    }
  }
}
export { sscUtil }
