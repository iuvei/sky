import { pukecalc_zhushu } from '~/js/touzhu/touzhu.puke.calc'
import {
  getCalcFuncByPlayID,
  getRenderTypeByPlayID
} from '~/js/touzhu/touzhu.puke.util'
// import { RenderTypes } from './commonTypes'
const zhushuFunc = new pukecalc_zhushu()
const xypkUtil = {
  // 计算注数
  calcZhushu(playid, oneDimValuesArr) {
    const func = getCalcFuncByPlayID(playid),
      param = oneDimValuesArr
    this.zhushu = zhushuFunc[func](param.length)
  },
  // 处理时时彩随机数据
  getDataSource(randomDataSouce, betData) {
    // 单行多赔率
    const oneDimArr = [],
      twoDimArr = [],
      oneDimValuesArr = [],
      twoDimNamesArr = [],
      towDimValuesArr = [],
      formatShowStr = ''
    const peilvType = getRenderTypeByPlayID(betData.playid)
    let filteredData = []
    randomDataSouce.forEach(item => {
      if (betData.playid === 1) {
        filteredData = item.data.filter(x => x.checked)
      } else {
        filteredData = item.data[0].cards.filter(x => x.checked)
      }
      oneDimArr.push(filteredData)
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
      oneDimValuesArr.push(filters)
      twoDimNamesArr.push(filters.join('|'))
      towDimValuesArr.push(values.join('|'))
    })
    this.calcZhushu(
      betData.playid,
      oneDimValuesArr,
      twoDimNamesArr,
      towDimValuesArr
    )
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

export { xypkUtil }