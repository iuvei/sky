import {
  getCalcFuncByPlayID,
  getRenderTypeByPlayID,
  Calc_Zhushu_Obj
} from '~/js/touzhu/touzhu.k3.calc'
import { RenderTypes } from './commonTypes'
const zhushuFunc = new Calc_Zhushu_Obj()
const k3Util = {
  // 计算注数
  calcZhushu(playid, oneDimValuesArr, twoDimNamesArr) {
    const func = getCalcFuncByPlayID(playid)
    if (
      [1, 15, 7, 14].includes(playid)
      // "和值") //"三同号")//"二同号")//"两面玩法")
    ) {
      this.zhushu = zhushuFunc[func](oneDimValuesArr)
    } else {
      this.zhushu = zhushuFunc[func](twoDimNamesArr)
    }
  },
  // 处理时时彩随机数据
  getDataSource(randomDataSouce, betData) {
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
    this.calcZhushu(betData.playid, oneDimValuesArr, twoDimNamesArr)
    // this.setBetNumber(oneDimArr.length);

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

    // 快三统一是双面玩法
    return {
      type: 1, // 双面玩法,0为官方玩法
      peilv: betData.peilv,
      peilvType, // 0 为单赔率,1为多赔率
      formatValueStr:
        peilvType === 0 ? twoDimNamesArr.join(' ') : oneDimValuesArr.join(' '),
      arr: twoDimNamesArr,
      arr2: towDimValuesArr,
      formatShowStr,
      wanfa: betData.wanfa, // 玩法
      zhushu: 1, // 注数
      gameid: betData.gameid,
      playid: betData.playid,
      dataSet: oneDimArr, // 数据源,已选中的一维数组
      filteredData: twoDimArr // 已经选中的项数组 二维数组
    }
  }
}

export { k3Util }
