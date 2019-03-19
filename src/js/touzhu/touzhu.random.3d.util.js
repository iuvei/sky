import {
  getRenderTypeByPlayID,
  getCalcFuncByPlayID
} from '~/js/touzhu/touzhu.3d.util'
import { Calc_Zhushu_Obj } from '~/js/touzhu/touzhu.3d.calc'
import { RenderTypes } from './commonTypes'
import danshiUtil from '~/js/touzhu/danshi.util'
import getDwdArr from './util'
const zhushuFunc = new Calc_Zhushu_Obj()
const threeDUtil = {
  // 计算注数
  calcZhushu(playid, oneDimValuesArr, twoDimNamesArr, towDimValuesArr) {
    const func = getCalcFuncByPlayID(playid) // getCalcFuncByName(playName),
    let param = oneDimValuesArr
    if (playid === 12) {
      param = towDimValuesArr // 定位胆
    } else if (
      playid === 1 || // "三星直选复式"
      playid === 8 || // 前二直选复式
      playid === 9 // 后二直选复式
    ) {
      param = twoDimNamesArr
    }
    return zhushuFunc[func](param)
    // this.setBetNumber(zhushu);
  },
  /**
   * 处理3D单式数据
   *
   * @param {string} randomDataSouce
   * @param {object} betData
   * @returns object
   */
  getSingleModeData(randomDataSouce, betData) {
    return {
      type: 1,
      peilv: betData.peilv,
      peilvType: RenderTypes.SINGLE_ROW_SINGLE_PEILV, // 0 为单赔率,1为多赔率
      peilvTypeStr: RenderTypes.SINGLE_ROW_SINGLE_PEILV.toString(),
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
  /**
   * 获取3D随机数据
   *
   * @param {array} randomDataSouce
   * @param {object} betData
   * @returns
   */
  getDataSource(randomDataSouce, betData) {
    if (danshiUtil.isSingleMode(betData.js_tag, betData.playid)) {
      return this.getSingleModeData(randomDataSouce, betData)
    }

    // 单行多赔率
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
    const _zhushu = this.calcZhushu(
      betData.playid,
      oneDimValuesArr,
      twoDimNamesArr,
      towDimValuesArr
    )
    return {
      type: betData.type,
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
      dataSet: oneDimArr, // 数据源,已选中的一维数组
      filteredData: twoDimArr // 已经选中的项数组 二维数组
    }
  }
}

export { threeDUtil }
