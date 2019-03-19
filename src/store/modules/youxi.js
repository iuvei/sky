import { SET_GMGAME_TAG } from '../mutation-type'
import http from '../../../server/http'
const state = {
  tag: '',
  forceTag: '',
  searchView: false
};

const mutations = {
  [SET_GMGAME_TAG](state, tag) {
    state.tag = tag;
  },
  MODIFY_FIELD(state, obj) {
    Object.keys(obj).map(k => (state[k] = obj[k]))
  }
};

const actions = {
  // 修改 单属性
  modifyField({ commit }, item) {
    commit('MODIFY_FIELD', item)
  },
  // 获取游戏平台列表
  async GetIndexWebgame({ commit }, param) {
    const ret =
      (await http({
        ac: 'GetIndexWebgame',
        ...param
      })) || []
    return ret
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
