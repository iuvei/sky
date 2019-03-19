/**
 * 自选排序
 */

import optionalList from './optionalist'
const state = {
  menus: optionalList
}

const getters = {
  cacheKey(state, getters, rootState) {
    const uid = rootState.userinfo.accountInfo && rootState.userinfo.accountInfo.uid
    let cacheKey = 'vuex_zixuanPaixu'
    if (uid) cacheKey += '_' + uid
    return cacheKey
  },
  getMenus(state, getters) {
    let data = state.menus
    const cacheKey = getters.cacheKey
    const cacheValue = localStorage.getItem(cacheKey)
    if (cacheValue && cacheValue !== '[]') {
      data = JSON.parse(cacheValue)
    } else {
      data = optionalList
    }
    return data
  }
}

const actions = {
  modifyField({ commit }, item) {
    commit('MODIFY_FIELD', item)
  },
  saveMenu({ commit, getters }, params) {
    state.tip = false
    localStorage.setItem(getters.cacheKey, JSON.stringify(params))
    commit('MODIFY_FIELD', { menus: params })
  }
}

const mutations = {
  MODIFY_FIELD(state, obj) {
    Object.keys(obj).map(k => state[k] = obj[k])
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}