import { RenderTypes } from './commonTypes'
import {
  getTwoBalls,
  getThreeBalls,
  getFourBalls,
  getFiveBalls
} from '~/js/touzhu/touzhu.lhc'
const lhcUtil = {
  specialProcess(playid, peilv, bettingArr) {
    let pl = ''
    if (playid === 8) {
      if (peilv.length && typeof peilv === 'string') {
        const bl = bettingArr.length
        if (bl >= 2) {
          const _len = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
          // _index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
          if (_len.includes(bl)) {
            pl = peilv.split('|')[_len.findIndex(x => x === bl)]
          }
        } else {
          pl = ''
        }
      }
    }
    if (playid === 21) {
      if (peilv.length && typeof peilv === 'string') {
        const bl = bettingArr.length
        if (bl >= 6) {
          const _len = [6, 7, 8, 9, 10, 11]
          // _index = [0, 1, 2, 3, 4, 5]
          if (_len.includes(bl)) {
            pl = peilv.split('|')[_len.findIndex(x => x === bl)]
          }
        } else {
          pl = ''
        }
      }
    }
    return pl
  },
  calcZhushu(secondWanfa, playid, bettingArr) {
    if (secondWanfa === 16) {
      return bettingArr.length > 5 ? 1 : 0
    } else if (secondWanfa === 17 || secondWanfa === 19) {
      if (
        playid === 22 ||
        playid === 26 ||
        playid === 32 ||
        playid === 34 ||
        playid === 33
      ) {
        return getTwoBalls(bettingArr).length
      } else if (
        playid === 23 ||
        playid === 27 ||
        playid === 31 ||
        playid === 30
      ) {
        return getThreeBalls(bettingArr).length
      } else if (playid === 24 || playid === 28 || playid === 35) {
        return getFourBalls(bettingArr).length
      } else if (playid === 25 || playid === 29) {
        return getFiveBalls(bettingArr).length
      }
    } else if (secondWanfa === 11) {
      if (playid === 8) {
        return bettingArr.length >= 2 ? 1 : 0
        // this.hexiaoPeilvProcess()
      } else if (playid === 7) {
        return bettingArr.length
      }
    } else {
      return bettingArr.length
    }
  },
  // 处理时时彩随机数据
  getDataSource(randomDataSouce, betData) {
    const oneDimArr = [],
      twoDimArr = [],
      oneDimValuesArr = [],
      twoDimNamesArr = [],
      towDimValuesArr = []
    const formatShowStr = ''
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

    let _peilv = betData.peilv
    if (betData.title === '连选必中') {
      if (Array.isArray(_peilv)) {
        _peilv = _peilv[0]
      }
    }

    const _pl = this.specialProcess(
      betData.playid,
      betData.peilvs,
      towDimValuesArr[0].split('|')
    )

    console.log(_pl)
    const _zhushu = this.calcZhushu(
      betData.secondWanfa,
      betData.playid,
      betData.bettingArr
    )

    return {
      type: 1, // 双面玩法,0为官方玩法
      peilv: _peilv,
      pl: _pl,
      peilvType: RenderTypes.LHC, // 0 为单赔率,1为多赔率
      formatValueStr: oneDimValuesArr.join(' '),
      // peilvType === 0 ? twoDimNamesArr.join(' ') : oneDimValuesArr.join(' '),
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

export { lhcUtil }
