import { getRenderTypeByPlayID } from '~/js/touzhu/touzhu.pcdd.calc'
import { RenderTypes } from './commonTypes'

const pcddUtil = {
  calcZhushu(playid, arr) {
    if (playid === 2) return arr.length > 2 ? 1 : 0
    if ([1, 3].includes(playid)) {
      return arr.length
    } else return 0
  },
  // 处理时时彩随机数据
  getDataSource(randomDataSouce, betData) {
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
        const name = randomDataSouce[i].name.length
          ? randomDataSouce[i].name
          : '号码'
        if (x.length) {
          formatShowStr += `${name}(<span style="color:red">${x}</span>) `
        }
      })
      formatShowStr = formatShowStr.trim()
    }
    const _zhushu = this.calcZhushu(betData.playid, oneDimValuesArr)
    // PC蛋蛋没有多玩法
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
      zhushu: _zhushu, // 注数
      gameid: betData.gameid,
      playid: betData.playid,
      dataSet: oneDimArr, // 数据源,已选中的一维数组
      filteredData: twoDimArr // 已经选中的项数组 二维数组
    }
  }
}

export { pcddUtil }
