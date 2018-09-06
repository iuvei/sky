/**
 * 添加快捷方式
 */

import * as types from '../mutation-type'
import allQuicks from './quick.const'

const state = {
  tip: localStorage.getItem('vuex_tip') ? JSON.parse(localStorage.getItem('vuex_tip')) : true,
  // addQuicks: localStorage.getItem('vuex_addQuicks') && localStorage.getItem('vuex_addQuicks') !== 'undefined' ? JSON.parse(localStorage.getItem('vuex_addQuicks')) : allQuicks.slice(0, 6)
  addQuicks: allQuicks.slice(0, 6)
}

const getters = {
  cacheKey(state, getters, rootState) {
    const uid = rootState.userinfo.accountInfo && rootState.userinfo.accountInfo.uid
    let cacheKey = 'vuex_addQuicks'
    if (uid)cacheKey += '_' + uid
    return cacheKey
  },
  getAddQuicks(state, getters) {
    let data = state.addQuicks
    const cacheKey = getters.cacheKey
    const cacheValue = localStorage.getItem(cacheKey)
    if (cacheValue && cacheValue !== 'undefined') {
      data = JSON.parse(cacheValue)
    } else {
      data = allQuicks.slice(0, 6)
    }
    return data
  }
}

const actions = {
  modifyField({ commit }, item) {
    commit('MODIFY_FIELD', item)
  },
  saveQuick({ commit, getters }, params) {
    state.tip = false
    localStorage.setItem('vuex_tip', JSON.stringify(false))
    localStorage.setItem(getters.cacheKey, JSON.stringify(params))
    commit(types.SAVE_QUICK, params)
  }
}

const mutations = {
  MODIFY_FIELD(state, obj) {
    Object.keys(obj).map(k => state[k] = obj[k])
  },
  [types.SAVE_QUICK](state, params) {
    state.addQuicks = params
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}