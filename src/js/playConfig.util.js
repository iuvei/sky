const getConfigByPlayid = (vueInstance, playid) => {
  // 未登陆不加载赔率
  if (!vueInstance.$store.state.userinfo.isLogin) {
    if (vueInstance.setBetOdd) {
      vueInstance.setBetOdd('')
    }
    return
  }
  const odds = vueInstance.$store.state.betting.odds
  if (odds && odds.length) {
    const odd = odds.find(x => x.playid === playid)
    if (odd) {
      vueInstance.peilv = odd.peilv
      vueInstance.setBetOdd(odd.peilv)
    }
  }
}

const getConfigByGameid = (vueInstance, gameid, playid) => {
  // 未登陆不加载赔率
  if (!vueInstance.$store.state.userinfo.isLogin) {
    if (vueInstance.setBetOdd) {
      vueInstance.setBetOdd('')
    }
    return new Promise(resolve => resolve())
  }
  const odds = vueInstance.$store.state.betting.odds
  if (odds && odds.length) {
    const oddItem = odds.find(x => x.id === gameid)
    if (oddItem && oddItem.data && oddItem.data.length) {
      const odd = oddItem.data.find(x => x.playid === playid)
      if (odd) {
        vueInstance.peilv = odd.peilv
        if (vueInstance.setBetOdd) {
          vueInstance.setBetOdd(odd.peilv)
        }
        if (odd.peilv.includes('|')) {
          vueInstance.peilvs = odd.peilv.split('|')
        } else {
          vueInstance.peilvs = []
        }
      }
    }
  }

  return new Promise(resolve => resolve())
  // return vueInstance.peilvs
}

/**
 * 获取彩种赔率配置
 * @param {object} vueInstance
 * @param {number} gameid
 */
const setGamePeilvConfig = (vueInstance, gameid) => {
  const _this = vueInstance
  function getPeilvs(instance, id) {
    return instance.$ajax('request', {
      ac: 'getPeilvConfig',
      gameid: id
    })
  }
  // 未登陆不加载赔率
  if (!_this.$store.state.userinfo.isLogin) {
    _this.setBetOdd('')
    return new Promise(resolve => {
      resolve()
    })
  }
  const odds = _this.$store.state.betting.odds
  _this.setBetOdd('')
  // 如果有彩种ID，没有加载赔率
  if ((!odds || !odds.length) && gameid) {
    // 新创建赔率数组，并push当前赔率到数组中
    _this.$dialog.loading.open(' ')
    return getPeilvs(_this, gameid).then(res => {
      _this.setBetOdds({
        id: gameid,
        data: res
      })
      _this.$dialog.loading.close()
    })
  } else if (odds && odds.length && gameid) {
    // 如果有彩种ID，并且已经加载有赔率
    const _odd = odds.find(x => x.id === gameid)
    if (_odd) {
      _this.setBetOdd(_odd)
      return new Promise(resolve => {
        resolve()
      })
    } else {
      _this.$dialog.loading.open(' ')
      return getPeilvs(_this, gameid).then(res => {
        _this.setBetOdds({
          id: gameid,
          data: res
        })
        _this.$dialog.loading.close()
      })
    }
  }
}

export { getConfigByPlayid, getConfigByGameid, setGamePeilvConfig }
