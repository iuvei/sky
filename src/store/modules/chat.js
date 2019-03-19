import getGuid from '../../js/getGuid'
import dayjs from 'dayjs'
// console.log()
const state = {
  isFocus: false,
  isEmoji: false,
  isChatRouter: false,
  wsGlobalConfig: {
    UserToken: ''
  }
}

const mutations = {
  MODIFY_FIELD(state, obj) {
    Object.keys(obj).forEach(k => {
      state[k] = obj[k]
    })
  },
  MutationsModifyWsConfig(state, obj) {
    Object.keys(obj).forEach(k => {
      state.wsGlobalConfig[k] = obj[k]
    })
  }
}
const getComonStruct = rootState => ({
  name: rootState.chatRoom.username,
  vip: rootState.chatRoom.vip || 0,
  head: rootState.userinfo.accountInfo.head_icon || rootState.defautHeadPicture,
  time: dayjs().format('YYYY-MM-DD HH:mm:ss')
})

const actions = {
  actionsConnsvr({ rootState }) {
    return {
      action: 'connsvr',
      Drivce: 'WAP',
      Room: rootState.chatRoom.isHall ? '' : rootState.chatRoom.room,
      User: rootState.chatRoom.talk_data
    }
  },
  actionsSpeak({ state, rootState }, data) {
    const comonStruct = getComonStruct(rootState)
    return {
      group: 'USER',
      action: 'TALK',
      msg: data,
      code: getGuid(),
      UserToken: state.wsGlobalConfig.UserToken,
      ...comonStruct
    }
  },
  itemUserBet({ rootState }, data) {
    const comonStruct = getComonStruct(rootState)
    return {
      group: 'USER_BET',
      ...comonStruct,
      ...data
    }
  },
  /**
   * 投注
   *
   * @param { Object} { state }
   * @param { String } data 投注数据，加密后的字符串
   * @returns
   */
  bet({ state }, data) {
    return {
      action: 'TOUZHU',
      code: getGuid(),
      UserToken: state.wsGlobalConfig.UserToken,
      p: data
    }
  },

  /**
   * 跟单
   *
   * @param { Object} { state }
   * @param { String } data 投注数据，加密后的字符串
   * @returns
   */
  follow({ state }, data) {
    return {
      action: 'TOUZHU_GD',
      code: getGuid(),
      UserToken: state.wsGlobalConfig.UserToken,
      p: data
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
