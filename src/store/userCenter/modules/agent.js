import http from '../../../../server/http'
import { GET_DEFAULT_TIPS } from '../mutation-type'

const state = {
  stepTips: { a: 1 }
}

const mutations = {
  [GET_DEFAULT_TIPS](state, data) {
    state.stepTips = data
  }
}

const actions = {
  // 获取代理DNS列表
  async getEnomLIplist() {
    return await http({ ac: 'getEnomLIplist' })
  },
  // 指定下级的交易明细
  async getChildTradLog({ commit }, params) {
    return await http({ ac: 'getChildTradLog', ...params })
  },
  // 下级的所有充值记录
  async getNextPayPriceList({ commit }, params) {
    return await http({ ac: 'getNextPayPriceList', ...params })
  },
  // 下级的提款情况
  async getNextGetPriceList({ commit }, params) {
    return await http({ ac: 'getNextGetPriceList', ...params })
  },
  // 代理报表 总数据
  async getDailiStaticData({ commit }, params) {
    return await http({ ac: 'getDailiStaticData', ...params })
  },
  // 下级列表
  async getChlidStatic({ commit }, params) {
    return await http({ ac: 'getChlidStatic', ...params })
  },
  // 下级所有投注记录
  async getDailiTouzhuLog({ commit }, params) {
    return await http({ ac: 'getDailiTouzhuLog', ...params })
  },

  // 创建邀请码
  async createJoinCode({ commit }, params) {
    // console.log();
    return await http({ ac: 'createJoinCode', ...params })
  },
  // 获取用户邀请码的列表
  async getUserJoinCodeList({ commit }, params) {
    return await http({ ac: 'getUserJoinCodeList', ...params })
  },
  // 获取可用域名列表
  async getUsefulEnomList() {
    return await http({ ac: 'getUsefulEnomList' })
  },
  // 获取域名列表
  async getUserEnomList({ commit }, params) {
    return await http({ ac: 'getUserEnomList', ...params })
  },
  // 获取代理说明
  async getAgentInfo({ commit }, params) {
    return await http({ ac: 'getSpecialContent', ...params })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}