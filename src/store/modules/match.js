import http from '~/../server/http'
/**
 * 竞彩
 */
const state = {
  maintained: {}, // 维护状态
  jingcai_id: '2101',
  selectedKeys: [], // 选中的投注
  bet_obj: {}, // 下注数据 key=>bet_data
  multiple: 10, // 投注倍数
  matchShow: false, // 弹窗投注显示标识
  oneMatch: {}, // 一个比赛信息
  gameList: [], // 竞彩列表
  betDetail: {}, // 下注明细
  gameType: '-1', // 大分类
  gameTypeMap: [
    {
      title: '混合投注',
      value: '-1',
      renderKey: ['WDL', 'HCWDL'],
      max_dg: 8,
      bet: 'mix_bet',
      popup: 'mix_popup', // 公用弹窗
      cart: 'mix_cart' // 公用购物车
    },
    {
      title: '胜负平',
      value: '0',
      renderKey: ['WDL'],
      max_dg: 8,
      bet: 'win_bet',
      popup: '',
      cart: 'win_cart'
    },
    {
      title: '让球胜负平',
      value: '1',
      renderKey: ['HCWDL'],
      max_dg: 8,
      bet: 'hcwin_bet',
      popup: '',
      cart: 'hcwin_cart'
    },
    {
      title: '比分',
      value: '2',
      renderKey: ['TCS'],
      max_dg: 4,
      bet: 'clickCommonBet', // 公用模板bet
      popup: 'score_popup',
      cart: 'mix_cart'
    },
    {
      title: '总进球',
      value: '3',
      renderKey: ['TG'],
      max_dg: 6,
      bet: 'total_bet',
      popup: 'mix_popup',
      cart: 'mix_cart'
    },
    {
      title: '半全场',
      value: '4',
      renderKey: ['HFT'],
      max_dg: 4,
      bet: 'clickCommonBet',
      popup: 'mix_popup',
      cart: 'mix_cart'
    },
    {
      title: '单关固定',
      value: '5',
      renderKey: ['HFT', 'TCS', 'TG'], // 后端返回
      max_dg: 6, // 比分，半全场，胜负平最多4关
      bet: 'clickCommonBet',
      popup: 'mix_popup',
      cart: 'mix_cart'
    }
  ],
  playType: [], // 过关方式
  playTypeMap: [
    {
      title: '单关',
      key: '1x1',
      value: '0'
    },
    {
      title: '2串1',
      key: '2x1',
      value: '1'
    },
    {
      title: '3串1',
      key: '3x1',
      value: '2'
    },
    {
      title: '4串1',
      key: '4x1',
      value: '3'
    },
    {
      title: '5串1',
      key: '5x1',
      value: '4'
    },
    {
      title: '6串1',
      key: '6x1',
      value: '5'
    },
    {
      title: '7串1',
      key: '7x1',
      value: '6'
    },
    {
      title: '8串1',
      key: '8x1',
      value: '7'
    }
  ],
  // 对应玩法支持多少关
  dgMap: [
    { key: 'WDL', num: 8 },
    { key: 'HCWDL', num: 8 },
    { key: 'TG', num: 6 },
    { key: 'TCS', num: 4 },
    { key: 'HFT', num: 4 }
  ],
  staticSports: [
    { jingcai_id: 2101, name: '竞彩足球', sport_key: 'FT' },
    { jingcai_id: 2102, name: '竞彩篮球', sport_key: 'BK' }
  ]
}

const getters = {
  curJingcai({ jingcai_id, staticSports }) {
    return staticSports.find(el => ~~el.jingcai_id === ~~jingcai_id)
  },
  curGameData({ gameTypeMap, gameType }) {
    return gameTypeMap.find(el => el.value * 1 === gameType * 1)
  },
  curPopup(state, { curGameData }) {
    return curGameData.popup
  },
  curBet(state, { curGameData }) {
    return curGameData.bet
  },
  curCarBet(state, { curGameData }) {
    return curGameData.cart
  },
  curRenderKey(state, { curGameData }) {
    return curGameData.renderKey
  },
  curMaxDG(state, { curGameData }) {
    return curGameData.max_dg
  },
  // 没有单场吗
  noDG(state, { bet_data }) {
    return bet_data.some(el => !el.is_dg)
  },
  // 最大过关数
  maxDG({ dgMap }, { bet_data, matchNum, curMaxDG }) {
    const max_dg = bet_data.map(
      el => dgMap.find(dg => dg.key === el.play_method).num
    )
    return Math.min(matchNum, curMaxDG, ...max_dg)
  },
  // 选中的match_id
  matchDiff({ selectedKeys }) {
    const arr = selectedKeys.map(el => el.split('||')[0]).filter(el => el)
    return Array.from(new Set(arr))
  },
  matchNum(state, { matchDiff }) {
    return matchDiff.length
  },
  // 整合gameList
  scheduleList({ gameList }) {
    return gameList.reduce((f, c) => [...f, ...c.scheduleList], [])
  },
  // 过关方式 请求接口用的格式
  play_type({ playType, playTypeMap }) {
    return playType.map(type => playTypeMap.find(el => el.value === type).key)
  },
  // 下注数据 请求接口用的格式
  bet_data({ bet_obj, selectedKeys }) {
    return selectedKeys.map(k => bet_obj[k])
  }
}

const mutations = {
  MODIFY_FIELD(state, obj) {
    Object.keys(obj).map(k => (state[k] = obj[k]))
  }
}
const actions = {
  // 修改 单属性
  updateField({ commit }, item) {
    commit('MODIFY_FIELD', item)
  },
  // 获取我的(竟彩)注单列表
  async getJingcaiUserBetList({ commit, state }, request = {}) {
    const ret =
      (await http({
        ...request,
        ac: 'getJingcaiUserBetList',
        // date: request.date, // 空值今天|-1=全部
        jingcai_id: state.jingcai_id, // 2101=足球|2102=籃球
        limit: request.limit || 10, // 每页条数
        next: request.next || 0
      })) || {}
    return ret
  },

  // 获取(竟彩)注单详情
  async getJingcaiUserBetDetail({ commit, state }, request = {}) {
    const ret =
      (await http({
        ac: 'getJingcaiUserBetDetail',
        jingcai_id: state.jingcai_id,
        bet_record_id: request.bet_record_id
      })) || {}
    return ret
  },
  // 获取(竟彩)注單串關詳情
  async getJingcaiUserBetParlayDetail({ commit, state }, request = {}) {
    const ret =
      (await http({
        ac: 'getJingcaiUserBetParlayDetail',
        jingcai_id: state.jingcai_id,
        bet_record_id: request.bet_record_id,
        limit: 10,
        next: request.next || 0
      })) || {}
    return ret
  },
  // 赛事列表
  async getJingcaiGameList({ dispatch, state, getters }, request = {}) {
    dispatch('updateField', { gameList: [] })
    const ret =
      (await http({
        ac: 'getJingcaiGameList',
        jingcai_id: state.jingcai_id,
        game_type: state.gameType,
        date: request.date || '',
        loading: true
      })) || {}
    dispatch('updateField', { gameList: ret.result })

    // 更新bet_obj selectedKeys
    let bet_obj = Object.assign({}, state.bet_obj)
    let selectedKeys = Object.assign([], state.selectedKeys)
    const { scheduleList } = getters
    selectedKeys.map((_k, idx) => {
      const [match_id, play_method, k] = _k.split('||')
      const oneMatch = scheduleList.find(el => el.match_id === ~~match_id)
      // 找不到赛事信息 删除当前key
      if (oneMatch === undefined) {
        selectedKeys.splice(idx, 1)
      } else {
        const bet = oneMatch.bet_data[play_method].find(el => el.k === k)
        bet_obj[_k].p = bet.p
      }
    })
    dispatch('updateField', { bet_obj, selectedKeys })

    return ret
  },
  // 下注前明细
  async getJingcaiBetDetail({ commit, state, getters }, request = {}) {
    commit('MODIFY_FIELD', { betDetail: {} })
    if (state.gameType === '-1' && getters.matchNum < 2) {
      return window.vue.$dialog.toast({ mes: '请至少选择两场比赛' })
    }
    if (
      state.gameType !== '-1' &&
      ((getters.matchNum < 2 && getters.noDG) ||
        (getters.matchNum < 1 && !getters.noDG))
    ) {
      return window.vue.$dialog.toast({
        mes: '请至少选择两场比赛或选择一场单关比赛'
      })
    }
    if (!state.playType.length) {
      return window.vue.$dialog.toast({ mes: '请选择过关方式' })
    }
    if (
      (state.game_type === '-1' && getters.matchNum < 2) ||
      getters.matchNum < 1
    ) {
      return
    }
    const ret =
      (await http({
        ac: 'getJingcaiBetDetail',
        jingcai_id: state.jingcai_id,
        times: state.multiple,
        dan: '',
        game_type: state.gameType,
        play_type: getters.play_type.join(','),
        data: JSON.stringify(getters.bet_data),
        loading: true
      })) || {}
    commit('MODIFY_FIELD', { betDetail: ret })
    return ret
  },
  // 下注
  async betting({ state, getters, rootState }) {
    if (!state.betDetail.end_time || state.betDetail.end_time < new Date()) {
      return window.vue.$dialog.toast({
        mes: '比赛信息已过期，请重新选择比赛！'
      })
    }
    if (state.gameType === '-1' && getters.matchNum < 2) {
      return window.vue.$dialog.toast({ mes: '请至少选择两场比赛' })
    }
    if (
      state.gameType !== '-1' &&
      ((getters.matchNum < 2 && getters.noDG) ||
        (getters.matchNum < 1 && !getters.noDG))
    ) {
      return window.vue.$dialog.toast({
        mes: '请至少选择两场比赛或选择一场单关比赛'
      })
    }
    if (!state.playType.length) {
      return window.vue.$dialog.toast({ mes: '请选择过关方式' })
    }
    if (!getters.bet_data.length || state.betDetail.price <= 0) {
      return window.vue.$dialog.toast({ mes: '请投注' })
    }

    // 判断登陆
    if (!rootState.userinfo.isLogin) {
      return window.vue.$dialog.confirm({
        title: '温馨提示',
        mes: '您未登录，请先登录',
        opts: () => {
          window.vue.$router.push({
            path: '/login',
            query: { redirect: window.vue.$route.fullPath }
          })
        }
      })
    }

    // 余额是否充足
    if (rootState.userinfo.accountInfo.price < state.betDetail.price) {
      return window.vue.$dialog.confirm({
        mes: '余额不足，是否立即充值？',
        opts: () => {
          window.vue.$router.push('/moreService/Nrecharge')
        }
      })
    }

    const params = {
      loading: true,
      ac: 'betJingcai',
      jingcai_id: state.jingcai_id,
      times: state.multiple,
      dan: '',
      game_type: state.gameType,
      play_type: getters.play_type.join(','),
      data: JSON.stringify(getters.bet_data)
    }
    return (await http(params)) || {}
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
