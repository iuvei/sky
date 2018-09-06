import calc from '../../views/gouCai/lottery/qxc/components/calc'
import { RenderTypes } from './commonTypes'
const QXCUtil = {
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
  calcZhushu(playid, singleRow, mutilRow) {
    // 一定位(类似定位胆)
    if ([1, 2, 3, 4, 8].includes(playid)) {
      mutilRow = this.getDwdArr(mutilRow).filter(x => x.length)
      return calc(playid, mutilRow)
    } else if ([5, 6].includes(playid)) {
      // 二字现  三字现
      return calc(playid, singleRow)
    } else if ([7].includes(playid)) {
      return calc(playid, singleRow)
    } else if ([9, 10, 11, 12].includes(playid)) {
      return calc(playid, mutilRow)
    }
    return 0
  },
  /**
   * 构造七星彩数据源
   *
   * @param {array or string} randomDataSouce
   * @param {object} betData
   * @returns
   */
  getDataSource(randomDataSouce, betData) {
    const oneDimArr = [],
      twoDimArr = [],
      oneDimValuesArr = [],
      twoDimNamesArr = [],
      towDimValuesArr = []
    let formatShowStr = ''
    let peilvType = RenderTypes.MUTI_ROW_SINGLE_PEILV

    randomDataSouce.forEach(item => {
      const filteredData = item.data.filter(x => x.checked)
      filteredData.forEach(y => {
        oneDimArr.push(JSON.parse(JSON.stringify(y)))
        oneDimValuesArr.push(y.value)
      })
      if (filteredData.length) {
        twoDimArr.push({ name: item.name, data: filteredData })
      }

      // oneDimValuesArr.push(
      //   filteredData.map(x => x.name.toString().replace(/\s/g, '')).join('|')
      // )
      towDimValuesArr.push(
        filteredData.map(x => x.value.toString().replace(/\s/g, '')).join('|')
      )

      const filters = filteredData.map(x =>
        x.name.toString().replace(/\s/g, '')
      )
      twoDimNamesArr.push(filters.join('|'))
    })

    // const _zhushu = this.calcZhushu(
    //   betData.playid,
    //   oneDimValuesArr,
    //   towDimValuesArr
    // )

    if (peilvType === RenderTypes.MUTI_ROW_SINGLE_PEILV) {
      twoDimNamesArr.forEach((x, i) => {
        if (x.length) {
          formatShowStr += `${
            betData.dataSource[i].name
          }(<span style="color:red">${x}</span>) `
        }
      })
      formatShowStr = formatShowStr.trim()
    }

    if ([1, 2, 3, 4, 8].includes(betData.playid)) {
      peilvType = RenderTypes.DWD
    } else if ([7].includes(betData.playid)) {
      peilvType = RenderTypes.MUTI_ROW_MUTI_PEILV
    } else if ([9, 10, 11, 12].includes(betData.playid)) {
      peilvType = RenderTypes.MUTI_ROW_SINGLE_PEILV
    } else {
      peilvType = RenderTypes.SINGLE_ROW_SINGLE_PEILV
    }

    return {
      type: betData.type, // 1为双面玩法,0为官方玩法
      peilv: betData.peilv,
      peilvType, // 0 为单赔率,1为多赔率
      formatValueStr:
        peilvType === 0 ? twoDimNamesArr.join(' ') : oneDimValuesArr.join(' '),
      arr: twoDimNamesArr,
      arr2: towDimValuesArr,
      formatShowStr,
      dwdValuesArr: [1, 2, 3, 4, 8].includes(betData.playid)
        ? this.getDwdArr(towDimValuesArr)
        : '', // 定位胆专用取值
      wanfa: betData.wanfa,
      zhushu: 1, // 注数
      gameid: betData.gameid,
      playid: betData.gameid.playid,
      js_tag: betData.gameid.js_tag,
      danshiExcl: '', // 单式专用
      dataSet: oneDimArr, // 数据源,已选中的一维数组
      filteredData: twoDimArr, // 已经选中的项数组 二维数组
      dataSource: betData.dataSource
    }
  }
}

export { QXCUtil }
