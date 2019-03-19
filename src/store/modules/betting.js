import * as types from '../mutation-type'
/**
 *购彩页面
 */
const state = {
  history: [],
  next: [],
  description: '',
  switch: '双面玩法',
  betNumber: 0, // 投注数
  gameName: '',
  gameId: 0,
  odds: [], // 登陆后的赔率集合
  unLoginOdds: [], // 未登录的赔率集合
  odd: 0,
  name_tag: '',
  speed: 0, // 高低频判断
  js_tag: '',
  playConfigs: [], // 玩法集合
  qishu: '', // 期数
  countDownNumber: 0, // 倒计时时间
  betData: {}, // 当前下注的内容{wanfa, values,labels,peilvs,formats}
  cart: [], // 购物车数据
  cartNumber: 0, // 购物车内购彩数量
  modelShow: false, // 下注确认弹窗是否显示，控制selectgame组件是否可唤醒
  officialOption: true, // 判断是否显示官方双面切换按钮
  closeIsShow: true, // 是否能投注
  tzSelected: [], // 梯子选中的投注
  ncSelected: {}, // 农场选中的投注
  game: {}, // 当前彩种
  curPlayItem: {}, // 当前玩法
  betDetailParams: {}, // 投注详情参数
  betMenu: null // 双面玩法设置左边的菜单项，用于再来一注
}

const actions = {
  showOfficial({ commit }, bool) {
    commit(types.CHANGE_OFFICIAL, bool)
  },
  modelBetShow({ commit }, bool) {
    commit(types.SET_MODELBET, bool)
  },
  description({ commit }, str) {
    commit(types.PLAY_DESCRIPTION, { str })
  },
  playSwitch({ commit }, str) {
    commit(types.PLAY_SWITCH, { str })
  },
  // 设置投注数
  setBetNumber({ commit }, number) {
    commit(types.BET_SET_NUMBER, { number })
  },
  // 设置赔率
  setBetOdds({ commit }, odds) {
    commit(types.BET_SET_ODDS, { odds })
  },
  setBetUOdds({ commit }, odds) {
    commit(types.BET_SET_UODDS, { odds })
  },
  // 设置赔率
  setBetOdd({ commit }, odd) {
    commit(types.BET_SET_ODD, { odd })
  },
  // 设置当前游戏
  setBetCurent({ commit }, game) {
    commit(types.BET_SET_CURRENT, { game })
  },
  // 设置玩法
  setPlayConfig({ commit }, config) {
    commit(types.BET_SET_PLAYCONFIG, { config })
  },
  // 设置期数
  setQishu({ commit }, qishu) {
    commit(types.BET_SET_QISHU, { qishu })
  },
  // 设置倒计时
  setCountDown({ commit }, number) {
    commit(types.BET_SET_COUNTDOWN, { number })
  },
  // 设置当前投注的内容
  setBetData({ commit }, bettingData) {
    commit(types.BET_SET_BETTING, { bettingData })
  },
  // // 清空当前投注的内容
  // clearBetData({ commit }) {
  //   commit(types.BET_CLEAR_BETTING)
  // },
  // 设置购物车数据
  addToCart({ commit }, bettingData) {
    commit(types.BET_ADD_TO_CART, { bettingData })
  },
  // 清空购物车
  clearCart({ commit }) {
    commit(types.BET_CLEAR_CART)
  },
  // 设置购物车数量
  setCartNumber({ commit }, cartNumber) {
    commit(types.BET_SET_CART_NUMBER, { cartNumber })
  },
  // 从购物车清除数据
  deleteItemFromCart({ commit }, item) {
    commit(types.BET_DELETE_FROM_CART, { item })
  },
  // 停止下注
  setCloseBet({ commit }, bool) {
    commit(types.SET_CLOSE_BET, bool)
  },
  updateField({ commit }, item) {
    commit('UPDATE_FIELD', item)
  },
  setPlayItem({ commit }, item) {
    commit(types.SET_PLAYITEM, item)
  },
  setGame({ commit }, game) {
    commit(types.SET_GAME, game)
  },
  setBetDetailParams({ commit }, params) {
    commit(types.SET_BETDETAILPARAMS, params)
  },
  // 双面玩法设置左边的菜单项，用于再来一注
  setBetMenu({ commit }, item) {
    commit(types.SET_BETMENU, item)
  }
}

const mutations = {
  UPDATE_FIELD(state, item) {
    Object.keys(item).map(k => state[k] = item[k])
  },
  [types.SET_CLOSE_BET](state, bool) {
    state.closeIsShow = bool
  },
  [types.CHANGE_OFFICIAL](state, bool) {
    state.officialOption = bool
  },
  [types.SET_MODELBET](state, bool) {
    state.modelShow = bool
  },
  [types.PLAY_DESCRIPTION](state, { str }) {
    state.description = str
  },
  [types.PLAY_SWITCH](state, { str }) {
    state.switch = str
  },
  [types.BET_SET_NUMBER](state, { number }) {
    state.betNumber = number
  },
  [types.BET_SET_ODDS](state, { odds }) {
    if (!state.odds) {
      state.odds = []
    } else {
      const index = state.odds.findIndex(x => x.id === odds.id)
      if (index === -1) {
        state.odds.push(odds)
      } else {
        state.odds.splice(index, 1)
        state.odds.push(odds)
      }
    }
  },
  [types.BET_SET_UODDS](state, { odds }) {
    if (!state.unLoginOdds) {
      state.unLoginOdds = []
    } else {
      const index = state.unLoginOdds.findIndex(x => x.id === odds.id)
      if (index === -1) {
        state.unLoginOdds.push(odds)
      } else {
        state.unLoginOdds.splice(index, 1)
        state.unLoginOdds.push(odds)
      }
    }
  },
  [types.BET_SET_ODD](state, { odd }) {
    state.odd = odd
  },
  [types.BET_SET_CURRENT](state, { game }) {
    // console.log(game)
    state.gameName = game.game_name
    state.gameId = game.lotter_id
    state.js_tag = game.js_tag ? game.js_tag : ''
    state.name_tag = game.name_tag ? game.name_tag : ''
    state.speed = game.speed ? game.speed : ''
    // state.play_type = game.play_type ? game.play_type : '0'
  },
  [types.BET_SET_PLAYCONFIG](state, { config }) {
    state.playConfigs = config
  },
  [types.BET_SET_QISHU](state, { qishu }) {
    state.qishu = qishu
  },
  [types.BET_SET_COUNTDOWN](state, { number }) {
    state.countDownNumber = number
  },
  [types.BET_SET_BETTING](state, { bettingData }) {
    state.betData = bettingData
  },
  [types.BET_ADD_TO_CART](state, { bettingData }) {
    state.cart.push(bettingData)
  },
  [types.BET_CLEAR_CART](state) {
    state.cart = []
    state.tzSelected = []
    state.ncSelected = {}
  },
  [types.BET_SET_CART_NUMBER](state, { cartNumber }) {
    state.cartNumber = cartNumber
  },
  [types.BET_DELETE_FROM_CART](state, { item }) {
    const index = state.cart.findIndex(y => y.id === item.id)
    if (index > -1) {
      state.cart.splice(index, 1)
    }
  },
  [types.SET_PLAYITEM](state, item) {
    state.curPlayItem = item
  },
  [types.SET_GAME](state, game) {
    state.game = game
  },
  [types.SET_BETDETAILPARAMS](state, params) {
    state.betDetailParams = params
  },
  // 双面玩法设置左边的菜单项，用于再来一注
  [types.SET_BETMENU](state, item) {
    state.betMenu = item
  }
}

export default {
  state,
  actions,
  mutations
}
