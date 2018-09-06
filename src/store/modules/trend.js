/**
 * 走势图状态
 */
import * as types from '../mutation-type'

const state = {
  trendval: 0,
  gameName: '',
  gameId: '',
  digits: [],
  trendData: [],
  numbers: [],
  color: '',
  speed: 0
}
const actions = {
  setTrendval({ commit }, id) {
    commit(types.TREND_INDEX, { id })
  },
  // 清除已选择彩种
  clearGameTrend({ commit }) {
    commit(types.TREND_CLEAR_CURRENT)
  },
  // 设置当前彩种走势
  setGameTrend({ commit }, game) {
    commit(types.TREND_SET_CURRENT, { game })
  },
  // 设置当前彩种位数
  setGameDigits({ commit }, digits) {
    commit(types.TREND_SET_DIGIT, { digits })
  },
  // 设置走势数据
  setTrendData({ commit }, data) {
    commit(types.TREND_SET_DATA, { data })
  },
  // 设置彩票走势位数
  setGameNumbers({ commit }, numbers) {
    commit(types.TREND_SET_NUMBERS, { numbers })
  },
  // 设置走势图颜色
  setTrendColor({ commit }, color) {
    commit(types.TREND_SET_COLOR, { color })
  }
}

const mutations = {
  [types.TREND_INDEX](state, { id }) {
    state.trendval = id
  },
  // 清除已选择彩种
  [types.TREND_CLEAR_CURRENT](state) {
    state.gameName = ''
    state.gameId = ''
  },
  // 设置当前彩种走势
  [types.TREND_SET_CURRENT](state, { game }) {
    state.gameName = game.game_name
    state.gameId = game.game_id
    state.js_tag = game.js_tag
    state.name_tag = game.tag
    state.speed = game.speed
  },
  // 设置当前彩种位数
  [types.TREND_SET_DIGIT](state, { digits }) {
    state.digits = digits
  },
  // 设置走势数据
  [types.TREND_SET_DATA](state, { data }) {
    state.trendData = data
  },
  // 设置彩票走势位数
  [types.TREND_SET_NUMBERS](state, { numbers }) {
    state.numbers = numbers
  },
  // 设置走势图颜色
  [types.TREND_SET_COLOR](state, { color }) {
    state.color = color
  }
}

export default {
  state,
  actions,
  mutations
}
