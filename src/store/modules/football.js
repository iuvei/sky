import {
  FOOTBALL_SET_SPORT_ID,
  FOOTBALL_SET_SPORT_MAP,
  FOOTBALL_SET_TITLE,
  FOOTBALL_SET_LEAGUE_LIST,
  FOOTBALL_QUERY_COMPUTED,
  FOOTBALL_SET_PLAY,
  FOOTBALL_SET_IS_BETTER
} from '../mutation-type'
import http from '../../../server/http'
import reduce from 'lodash/reduce'
import get from 'lodash/get'
import compact from 'lodash/compact'

const getSportMobileGameListRequest = () => ({
  date: '',
  start_time: '',
  end_time: ''
})
const getSportMobileGameList = () => ({
  start_time: '',
  end_time: ''
})

/**
 *体彩
 */
// champion冠军 today今日赛事 early 早盘 parlay 综合 inPlay滚球
const state = {
  sub_route: '/football/multi',
  showList: true, // 新版页面默认显示列表
  render_one_league: {}, // 渲染一个联盟的比赛
  bet_obj: {}, // 让球/大小 专用  path => bet_data
  multiSelected: [], // 让球/大小 专用
  min_stake: 1, // 最小投注金额
  max_stake: 100, // 最大投注金额
  maintained: {}, // 维护状态
  football: 'xu',
  computed: false,
  footer: false,
  zhgg_preview: true, // 综合过关预览
  is_better: true, // 自动接收较佳赔率
  money: 2, // 默认下注金额
  bet_txt: '', // 下注描述
  bet_pl: '', // 下注赔率
  bet_data: [], // 下注数据
  payment_methods: 0, //  余额支付   代金券支付
  sportTypeMap: [],
  sport_id: '',
  gameTypeMap: [
    { label: '滚球', field: 'inPlay', playType: 0 },
    { label: '今日赛事', field: 'today', playType: 0 },
    { label: '早盘', field: 'early', playType: 0 },
    { label: '综合投注', field: 'parlay', playType: 0 },
    { label: '冠军', field: 'champion', playType: 4 }
  ],
  // 对应 map 对象的下标
  gameType: 1,
  playTypeMap: [
    { title: '让球/大小', path: '/football/multi', value: 0 },
    { title: '波胆(全)', path: '/football/waves', value: 1 },
    { title: '波胆(半)', path: '/football/htcs', value: 1 },
    { title: '半场/全场', path: '/football/fmatch', value: 2 },
    { title: '总入球', path: '/football/total', value: 3 },
    { title: '冠军', path: '/football/champion', value: 4 }
  ],
  // 对应 map 对象的value
  playType: 0,
  allPlayTeam: {}, // 进入所有玩法，需保存当前球队信息
  allPlay_schedule_id_prefix: '',
  allPlaySelectedKey: {},
  allPlayType: 0,
  allPlayTypes: [
    {
      title: '所有盘口',
      value: 0
    },
    {
      title: '让球&大小盘口',
      value: 1
    },
    {
      title: '上半场盘口',
      value: 2
    },
    {
      title: '比分盘口',
      value: 3
    },
    {
      title: '主盘口',
      value: 4
    },
    {
      title: '进球盘口',
      value: 5
    },
    {
      title: '其他盘口',
      value: 6
    }
  ],
  leagueList: [],
  leagueIds: '',
  order: 0,
  status: 0,
  lasttime: '',
  timeCount: {
    second: 16,
    reset: 0,
    getData: 0
  }
}

const getters = {
  getPl(state) {
    let pl = reduce(state.bet_data, (sum, el) => sum * el.p, 1)
    if (!state.bet_data.length) {
      pl = 0
    }
    pl = pl.toFixed(2)
    return pl
  },
  schedule_id(state) {
    const prefix =
      state.allPlay_schedule_id_prefix || state.allPlayTeam.schedule_id
    return prefix
  },
  getAllPlaySelected(state, getters) {
    const prefix = getters.schedule_id
    return state.allPlaySelectedKey[prefix]
  }
}

const mutations = {
  [FOOTBALL_SET_SPORT_MAP](state, data) {
    state.sportTypeMap = data
  },
  [FOOTBALL_SET_TITLE](state, data) {
    state.gameType = data.key
    state.playType = data.item.playType
  },
  [FOOTBALL_SET_SPORT_ID](state, item) {
    state.sport_id = item
  },
  [FOOTBALL_SET_PLAY](state, item) {
    state.playType = item
  },
  [FOOTBALL_SET_IS_BETTER](state, item) {
    state.is_better = item
  },
  // array 直接覆盖
  // object 两种操作 单个删除或单个添加
  [FOOTBALL_SET_LEAGUE_LIST](state, data) {
    // state.gameType = item
    if (Array.isArray(data)) {
      state.leagueList = data
    } else {
      if (data.type === 'del') {
        state.leagueList.splice(state.leagueList.indexOf(data.val), 1)
      }
      if (data.type === 'add') {
        state.leagueList.push(data.val)
      }
    }
  },
  // 自动查询标识
  [FOOTBALL_QUERY_COMPUTED](state, arr) {
    state.timeCount.second = state.gameType ? '180' : '30'
    if (state.gameType === 3 && !state.zhgg_preview) {
      state.timeCount.second = 10
    }
    arr.forEach(k => {
      state.timeCount[k] = state.timeCount[k] + 1
    })
  },
  MODIFY_FIELD(state, obj) {
    Object.keys(obj).map(k => state[k] = obj[k])
  }
}
const actions = {
  // 修改 单属性
  modifyFootballField({ commit }, item) {
    commit('MODIFY_FIELD', item)
  },
  // 请求数据表示
  queryComputed({ commit }, value) {
    commit('FOOTBALL_QUERY_COMPUTED', value)
  },
  // 切换头部
  changeTitle({ commit }, data) {
    commit('FOOTBALL_SET_TITLE', data)
  },
  // 设置筛选联盟数据
  setSportLeagueList({ commit }, data) {
    commit('FOOTBALL_SET_LEAGUE_LIST', data)
  },
  // 初始化sport_id
  // async initSportId({ commit }) {
  //   const ret =
  //     await http({
  //       ac: 'getSportMetaList'
  //     }) || []
  //   commit('FOOTBALL_SET_SPORT_MAP', ret)
  //   const item = ret.filter(item => item.sport_key === 'FT')[0] || {}
  //   commit('FOOTBALL_SET_SPORT_ID', item.sport_id)
  // },
  // 下注
  async betting({ dispatch, state, rootState, getters }) {
    if (!state.bet_data.length) { return window.vue.$dialog.toast({ mes: '请投注' }) }
    if (state.gameType === 3 && (state.bet_txt < 3 || state.bet_txt > 10)) { return window.vue.$dialog.toast({ mes: '不符合串关要求' }) }
    if (!state.money) return window.vue.$dialog.toast({ mes: '请输入金额' })
    if (state.money < state.min_stake || state.money > state.max_stake) {
      return window.vue.$dialog.toast({
        mes:
          '请输入投注金额在' +
          state.min_stake +
          ' - ' +
          state.max_stake +
          '之间'
      })
    }
    if (getters.getPl === 'NaN' || getters.getPl < 0) { return window.vue.$dialog.toast({ mes: '赔率异常' }) }

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

    // 修改金额
    const bet_data = JSON.parse(JSON.stringify(state.bet_data))
    bet_data.map(el => el.price = state.money)
    await dispatch('modifyFootballField', { bet_data })

    // 刷新选中投注的赔率 普通玩法 所有玩法
    let hg_ids = bet_data.map(el => {
      const { is_all_method, schedule_id } = el
      if (is_all_method) {
        const path = state.multiSelected.filter(item => item.includes(schedule_id))[0]
        return state.bet_obj[path].hg_id
      }
      return ''
    })
    hg_ids = compact(hg_ids)
    if (hg_ids.length) {
      await Promise.all(hg_ids.map(hg_id => dispatch('getSportAllBetMethod', { hg_id, game_type: 0 })))
    } else {
      await dispatch('getSportGameData')
    }

    const params = {
      loading: true,
      ac: 'betSport',
      game_type: state.gameType,
      is_better: state.is_better * 1,
      data: JSON.stringify(state.bet_data),
      payment_methods: state.payment_methods
    }
    return await http(params)
  },
  // 獲取聯盟列表
  async getSportLeagueList({ commit, state }, params) {
    const ret = await http({
      ac: 'getSportLeagueList',
      sport_id: state.sport_id,
      game_type: state.gameType,
      play_group: state.playType,
      ...params
    })
    return ret
  },
  // 获取体育赛事列表
  async getSportMatchList({ commit, state }, type = 5) {
    const ret = await http({
      ac: 'getSportMatchList',
      sport_id: state.sport_id,
      game_type: type
    })
    // console.error(Object.keys(ret))
    if (ret && ret.length === undefined) {
      return Object.assign(
        ...Object.keys(ret).map(r => {
          if (ret[r].length === 0) {
            return { [r]: 0 }
          }
          if (r === 'worldCup') return ''
          return { [r]: ret[r][0].game_cnt }
        })
      )
    } else {
      return Object.assign(
        ...Object.keys(state.gameTypeMap).map(v => ({ [v]: 0 }))
      )
    }
  },
  // 获取体育比赛结果列表
  async getRaceResList({ commit, state }, { type, start_time }) {
    // console.log(type, start_time)
    // return race
    const ret = await http({
      ac: 'getRaceResList',
      sport_id: state.sport_id,
      result_type: type,
      start_time: start_time.getTime()
    })
    return ret
  },
  // 获取体育赛事列表
  async getSportMobileGameList({ commit, state }, request = {}) {
    request = Object.assign(getSportMobileGameListRequest(), request)
    const ret = await http({
      ac: 'getSportMobileGameList',
      sport_id: state.sport_id,
      game_type: state.gameType,
      play_group: state.playTypeMap[state.playType].value,
      league_id: state.leagueIds || request.league_id,
      order: state.order,
      date: '',
      start_time: request.start_time,
      end_time: request.end_time,
      loading: true
    })
    return ret
  },
  // 获取指定赛事普通玩法最新数据
  async getSportGameData({ dispatch, state, getters }, request = {}) {
    let bet_data = JSON.parse(JSON.stringify(state.bet_data))
    let hg_ids = []
    const schedule_ids = bet_data.map(el => {
      const { is_all_method, schedule_id } = el
      if (is_all_method) {
        const path = state.multiSelected.filter(item => item.includes(schedule_id))[0]
        hg_ids = [...hg_ids, state.bet_obj[path].hg_id]
      }
      return schedule_id
    }).join(',')

    if (hg_ids.length) {
      await Promise.all(hg_ids.map(hg_id => dispatch('getSportAllBetMethod', { hg_id, game_type: 0 })))
    }

    const bet_data_new =
      await http({
        loading: true,
        ac: 'getSportGameData',
        schedule_id: schedule_ids || request.schedule_id,
        game_type: state.gameType,
        play_group: state.playTypeMap[state.playType].value
      }) || []
    // console.error(bet_data_new)

    // 刷新当前投注赔率
    bet_data = bet_data.map(item => {
      const { is_all_method, schedule_id, play_method, team, k } = item
      if (!is_all_method) {
        let item_new =
        bet_data_new.filter(item => item.schedule_id === schedule_id)[0] || {}
        item_new = item_new.bet_data || {}
        item_new = item_new[play_method] || []
        item_new = (team && item_new[team]) || item_new
        item_new = item_new.filter(item => item.k === k)[0] || {}
        item.p = item_new.p
        // console.error(item_new.p)
      }
      return item
    })

    await dispatch('modifyFootballField', { bet_data })

    return bet_data_new
  },
  // 获取我的注单列表
  async getUserBetslip({ commit, state }, request = {}) {
    request = Object.assign(getSportMobileGameList(), request)
    const ret = await http({
      ac: 'getUserBetslip',
      status: state.status,
      sport_id: state.sport_id,
      // game_type: state.gameType,
      // play_group: state.playTypeMap[state.playType].value,
      start_time: request.start_time,
      end_time: request.end_time,
      lasttime: state.lasttime
    })
    return ret
  },

  // 特定赛事的所有玩法
  async getSportAllBetMethod({ dispatch, state }, request = {}) {
    const bet_data_new =
      await http({
        loading: true,
        ac: 'getSportAllBetMethod',
        sport_key: 'FT',
        hg_id: request.hg_id || state.allPlayTeam.hg_id,
        game_type: request.game_type || state.gameType,
        play_group: state.allPlayType
      }) || {}

    const id = state.allPlayTeam.schedule_id
    const multiSelected = state.multiSelected
    let bet_data = JSON.parse(JSON.stringify(state.bet_data))
    // 刷新当前投注赔率
    bet_data = bet_data.map(item => {
      const { schedule_id, is_all_method, k } = item
      if (id === schedule_id && is_all_method) {
        let path = multiSelected.filter(el => el.includes(schedule_id))[0]
        if (path) {
          path = path.split('||')
          path.shift() // 去掉第一位的schedule_id
          path.pop() // 去掉最后一位的k
          let item_new = bet_data_new.bet_data || {}
          item_new = get(item_new, path)
          if (item_new) {
            const p =
              item_new.p ||
              (item_new.filter(el => el.k === k)[0] &&
                item_new.filter(el => el.k === k)[0].p)
            item.p = p
            // console.error(p)
          }
        }
      }

      return item
    })
    await dispatch('modifyFootballField', { bet_data })

    return bet_data_new
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
