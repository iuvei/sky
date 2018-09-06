import { RenderTypes } from '~/js/touzhu/commonTypes'

const bettingMixin = {
  methods: {
    clickHandle() {
      // curItem.checked = !curItem.checked
      // 单行多赔率
      const oneDimArr = [],
        twoDimArr = [],
        oneDimValuesArr = [],
        twoDimNamesArr = [],
        towDimValuesArr = []
      // dataSet = []
      const formatShowStr = ''
      this.dataSet.forEach(item => {
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
      this.filter()
      let _peilv = this.peilv
      if (this.title === '连选必中') {
        if (Array.isArray(_peilv)) {
          _peilv = _peilv[0]
        }
      }

      this.setBetData({
        type: 1, // 双面玩法,0为官方玩法
        peilv: _peilv,
        peilvs: this.peilv,
        pl: this.pl,
        peilvType: RenderTypes.LHC, // 0 为单赔率,1为多赔率
        formatValueStr: oneDimValuesArr.join(' '),
        arr: twoDimNamesArr,
        arr2: towDimValuesArr,
        formatShowStr,
        wanfa: this.title, // 玩法
        zhushu: this.zhushu, // 注数
        secondWanfa: this.secondWanfa,
        bettingArr: this.bettingArr,
        gameid: this.routeList.lotter_id,
        playid: this.curPlayItem.playid,
        dataSource: this.dataSet,
        js_tag: this.$store.state.betting.js_tag,
        dataSet: oneDimArr, // 数据源,已选中的一维数组
        filteredData: twoDimArr // 已经选中的项数组 二维数组
      })
    },
    setDataSet() {
      const columns = this.playersChl

      const _dataSet = []
      columns.forEach(item => {
        const _d = []
        this.ballsList.forEach((x, i) => {
          if (typeof x === 'string') {
            _d.push({
              name: x,
              checked: false,
              peilv: '-',
              playid: this.curPlayItem.playid,
              value: !isNaN(x) ? x : i // 从1开始
            })
          } else {
            _d.push(
              Object.assign(
                {
                  checked: false,
                  peilv: '-',
                  playid: this.curPlayItem.playid,
                  value: x.val,
                  price: ''
                },
                x
              )
            )
          }
        })
        _dataSet.push({
          name: item,
          data: _d
        })
      })
      this.dataSet = _dataSet
    }
  }
}

export { bettingMixin }
