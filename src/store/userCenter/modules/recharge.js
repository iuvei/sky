import http from '../../../../server/http'
import { GET_DEFAULT_TIPS } from '../mutation-type'

const state = {
  stepTips: {}
}

const mutations = {
  [GET_DEFAULT_TIPS](state, data) {
    state.stepTips = data
  }
}

const actions = {
  // 获得提示语句
  async getDefaultTips({ state, commit }) {
    if (Object.keys(state.stepTips).length) return
    const res = await http({ ac: 'getDefaultTips' })
    if (res) commit('GET_DEFAULT_TIPS', res)
  },
  // 提现基本信息
  async getTkPriceWhere() {
    return await http({ ac: 'getTkPriceWhere' })
  },
  // 创建优惠码
  async getTkPrice({ commit }, params) {
    return await http({ ac: 'getTkPrice', ...params })
  },
  // 提款记录列表
  async drawingsRecord() {
    return await http({ ac: 'drawingsRecord' })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
