export default {
  createDataSource(jstag, playid) {
    let dataSet = []
    // 时时彩
    switch (jstag) {
      case 'ssc':
        if ([2].includes(playid)) {
          // 五星直选
          dataSet = this.getMutiRowDataSet(playid, 5, 9, 0, [
            '万位',
            '千位',
            '百位',
            '十位',
            '个位'
          ])
        } else if ([4, 73, 95].includes(playid)) {
          // 四星
          dataSet = this.getMutiRowDataSet(playid, 4, 9, 0, [
            '千位',
            '百位',
            '十位',
            '个位'
          ])
        } else if ([6, 20, 64, 102].includes(playid)) {
          // 三星
          // [4, 6, 20, 34, 58, 64, 73, 95, 102, 116]
          dataSet = this.getMutiRowDataSet(playid, 3, 9, 0, [
            '百位',
            '十位',
            '个位'
          ])
        } else if (
          [11, 13, 25, 27, 38, 61, 67, 69, 107, 109, 120].includes(playid)
        ) {
          // 组选
          dataSet = this.getSingleRowDataSet(playid, 9, 0)
        } else if ([34, 58, 116].includes(playid)) {
          // 二星
          dataSet = this.getMutiRowDataSet(playid, 2, 9, 0, ['十位', '个位'])
        }
        break
      case 'pk10':
        if ([3].includes(playid)) {
          dataSet = this.getMutiRowDataSet(playid, 2, 10, 1, ['冠军', '亚军'])
        } else if ([5].includes(playid)) {
          dataSet = this.getMutiRowDataSet(playid, 3, 10, 1, [
            '冠军',
            '亚军',
            '季军'
          ])
        }
        break
      case '11x5':
        // 前三
        if ([2, 7, 12].includes(playid)) {
          dataSet = this.getMutiRowDataSet(playid, 3, 11, 1, [
            '第一位',
            '第二位',
            '第三位'
          ])
        } else if ([17, 22].includes(playid)) {
          // 前二
          dataSet = this.getMutiRowDataSet(playid, 2, 11, 1, [
            '第一位',
            '第二位'
          ])
        } else if (
          [4, 9, 14, 19, 24, 38, 39, 40, 41, 42, 43, 3, 44].includes(playid)
        ) {
          dataSet = this.getSingleRowDataSet(playid, 11, 1)
        }
        break
      case '3d':
        if ([2].includes(playid)) {
          dataSet = this.getMutiRowDataSet(playid, 3, 9, 0, [
            '百位',
            '十位',
            '个位'
          ])
        }
        break
    }
    return dataSet
  },
  getMutiRowDataSet(playid, row, column, start = 0, label = '号码') {
    const arr = []
    for (let i = 0; i < row; i++) {
      const _arr = []
      for (let j = start; j <= column; j++) {
        _arr.push({
          checked: false,
          value: j,
          name: j,
          peilv: '',
          playid
        })
      }
      arr.push({
        name: Array.isArray(label) ? label[i] : label,
        data: _arr
      })
    }
    return arr
  },
  getSingleRowDataSet(playid, column, start = 0) {
    return this.getMutiRowDataSet(playid, 1, column, start)
  }
}
