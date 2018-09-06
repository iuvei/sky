import * as types from '../mutation-type'
/**
 *开奖页面
 */
const state = {}

const actions = {}

const mutations = {
  [types.THE_LOTTERY](state, { boolen }) {
    state = boolen
  }
}

export default {
  state,
  actions,
  mutations
}