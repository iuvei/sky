import http from '../../../../server/fetch';
import { GET_DEFAULT_TIPS, SWITCH_SHAKE, SWITCH_SOUND } from '../mutation-type';

const state = {
  fileService: 'http://upload.bxvip588.com/qtcai',
  stepTips: '',
  st_timeData: new Map([
    ['0', '今天'],
    ['1', '昨天'],
    ['2', '本周'],
    ['3', '本月'],
    ['4', '上月']
  ]),
  shakingSwitch: true,
  touchSound: false
};

const mutations = {
  [GET_DEFAULT_TIPS](state, data) {
    state.stepTips = data;
  },
  [SWITCH_SHAKE](state, bool) {
    state.shakingSwitch = bool;
  },
  [SWITCH_SOUND](state, bool) {
    state.touchSound = bool;
  }
};

const actions = {
  // 头像上传
  async UploadUserHeadIconByBase64({ commit }, params) {
    return await http({ ac: 'UploadUserHeadIconByBase64', ...params });
  },
  // 头像上传信息
  async updateUserInfo({ commit }, params) {
    return await http({ ac: 'updateUserInfo', ...params });
  },
  switchShake({ commit }, bool) {
    commit('SWITCH_SHAKE', bool);
  },
  switchSound({ commit }, bool) {
    commit('SWITCH_SOUND', bool);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
