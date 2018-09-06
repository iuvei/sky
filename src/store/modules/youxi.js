import {
    SET_GMGAME_TAG
  } from '../mutation-type'

const state = {
  tag: '',
  searchView: false
}

const mutations = {
  [SET_GMGAME_TAG](state, tag) {
    state.tag = tag
  },
  MODIFY_FIELD(state, obj) {
    Object.keys(obj).map(k => state[k] = obj[k])
  }
}

const actions = {
  // 修改 单属性
  modifyField({ commit }, item) {
    commit('MODIFY_FIELD', item)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}