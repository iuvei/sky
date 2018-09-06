import { Calc_Zhushu_Obj } from '~/js/touzhu/touzhu.11x5.calc'
import { RenderTypes } from './commonTypes'
import {
  getCalcFuncByPlayID,
  getRenderTypeByPlayID
} from '~/js/touzhu/touzhu.11x5.util'
import danshiUtil from '~/js/touzhu/danshi.util'
const zhushuFunc = new Calc_Zhushu_Obj()
const elevenx5Util = {
  /**
   * 所有的定位胆都需要单独计算一个位置参数
   * 只要当前行有值，就取当前行的2次方数，和即为位置数组
   * @param {array} arr
   * @returns
   */
  getDwdArr(arr) {
    let c = 0
    arr.forEach((x, i) => {
      if (x.length) {
        c += Math.pow(2, i)
      }
    })
    return [c.toString()].concat(arr)
  },
  /**
   * 计算注数
   *
   * @param {number} playid
   * @param {array} oneDimValuesArr
   * @param {array} towDimValuesArr
   * @returns
   */
  calcZhushu(playid, oneDimValuesArr, towDimValuesArr) {
    const func = getCalcFuncByPlayID(playid)
    let betNumber = 0
    if ([3, 8, 13, 18, 23].includes(playid)) {
      // playName.includes("组选复式")) {
      betNumber = zhushuFunc[func](oneDimValuesArr)
    } else if ([1, 6, 11, 16, 21].includes(playid)) {
      // (playName.includes("直选复式")) {
      betNumber = zhushuFunc[func](towDimValuesArr)
    } else if (
      [5, 10, 15, 20, 25, 45, 46, 47, 48, 49, 50, 51].includes(playid)
    ) {
      // (playName.includes("胆拖")) {
      betNumber = zhushuFunc[func](towDimValuesArr)
    } else if ([26, 27, 28].includes(playid)) {
      // (playName.includes("不定位")) {
      betNumber = zhushuFunc[func](oneDimValuesArr)
    } else if ([29].includes(playid)) {
      // (playName.includes("定位胆") || playName.includes("双面盘")) {
      towDimValuesArr = this.getDwdArr(towDimValuesArr).filter(x => x.length)
      betNumber = zhushuFunc[func](towDimValuesArr)
    } else {
      betNumber = zhushuFunc[func](oneDimValuesArr)
    }
    return betNumber
  },
  /**
   * 设置11选5的单式随机一注数据
   *
   * @param {string} randomDataSouce
   * @param {object} betData
   * @returns
   */
  getSingleModeData(randomDataSouce, betData) {
    return {
      type: 1,
      peilv: betData.peilv,
      peilvType: betData.peilvType, // 0 为单赔率,1为多赔率
      peilvTypeStr: betData.peilvType.toString(),
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
   * 构造11选5数据源
   *
   * @param {array or string} randomDataSouce
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
      towDimValuesArr
    )

    return {
      type: betData.type, // 双面玩法,0为官方玩法
      peilv: betData.peilv,
      peilvType, // 0 为单赔率,1为多赔率
      formatValueStr:
        peilvType === 0 ? twoDimNamesArr.join(' ') : oneDimValuesArr.join(' '),
      arr: twoDimNamesArr,
      arr2: towDimValuesArr,
      formatShowStr,
      // 定位胆专用取值
      dwdValuesArr:
        peilvType === RenderTypes.DWD ? this.getDwdArr(towDimValuesArr) : [],
      wanfa: betData.wanfa, // 玩法
      zhushu: _zhushu, // 注数
      gameid: betData.gameid,
      playid: betData.playid,
      dataSet: oneDimArr, // 数据源,已选中的一维数组
      filteredData: twoDimArr // 已经选中的项数组 二维数组
    }
  }
}

export { elevenx5Util }
