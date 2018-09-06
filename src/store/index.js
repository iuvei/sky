import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-type'
import trend from './modules/trend'
import betting from './modules/betting'
import quick from './modules/quick'
import youxi from './modules/youxi'
import football from './modules/football'
import userCenter from './userCenter/index'
// import ResLoader from '../../server/resLoader'
import http from '../../server/http'
import ajaxs from '../../server/ajax'
import ReqLoader from '../../server/reqLoader'
Vue.use(Vuex)

let timeI
export default new Vuex.Store({
  name: 'h5_vue_store',
  namespaced: true,
  modules: {
    betting,
    trend,
    football,
    quick,
    youxi,
    ...userCenter
  },
  state: {
    // 预加载所有媒体资源
    resources: [
      'https://avatars1.githubusercontent.com/u/6128107?v=4'
      // 'http://static.ydcss.com/uploads/ydui/1.jpg',
      // 'http://static.ydcss.com/uploads/ydui/2.jpg',
      // 'http://static.ydcss.com/uploads/ydui/3.jpg'
    ],
    loader: {
      percent: 0,
      total: 0,
      percentComplete: false,
      errText: null
    },
    userinfo: {
      accountInfo: {},
      isLogin: false
    },
    // 系统的基本信息
    sysinfo: {},
    //  系统提示信息的状态
    sysState: false,
    //  系统提示信息的内容
    sysContent: '',
    // 首页是否显示引导图
    guideIsshow: false,
    // ios嵌套
    isnested: false,
    // 维护状态
    maintained: {
      msg: 0
    },
    userFlag: {
      redGift: 0,
      message: 0,
      feedback: 0,
      welfare: 0,
      safety: 0,
      jymm: 0,
      yhk: 0,
      zsxm: 0,
      mbwt: 1,
      yx: 0,
      sj: 0,
      wx: 0,
      qq: 0
    },
    betRecordsType: 0,
    vcode: '' // 验证码
  },
  // getters,
  mutations: {
    [types.REQ_LOADER](state, requests) {
      const loader = new ReqLoader({
        requests,
        onStart(total) {
          console.log('start:' + total)
        },
        onProgress(current, total) {
          const percent = current / total
          state.loader.percent = percent
        },
        onComplete(boolen) {
          state.loader.total = boolen
        },
        onErr(err) {
          state.loader.errText = err
        }
      })
      loader.start()
    },
    /**
     * 页面预加载
     */
    // [types.RES_LOADER](state) {
    //   const loader = new ResLoader({
    //     resources: state.resources,
    //     onStart(total) {
    //       console.log('start:' + total)
    //     },
    //     onProgress(current, total) {
    //       const percent = current / total
    //       state.loader.percent = percent
    //     },
    //     onComplete(boolen) {
    //       state.loader.total = boolen
    //     },
    //     onErr(err) {
    //       state.loader.errText = err
    //     }
    //   })
    //   loader.start()
    // },
    /** 储存用户信息 */
    [types.GET_USERINFO](state, anyData) {
      const arr = ['last_get_price', 'price']
      arr.forEach(key => {
        if (anyData.accountInfo.hasOwnProperty(key)) {
          if (key === 'price') {
            console.log(
              'GET_USERINFO',
              Number(anyData.accountInfo[key]).toFixed(2)
            )
          }
          anyData.accountInfo[key] = Number(anyData.accountInfo[key]).toFixed(2)
        }
      })

      // state.userinfo = anyData
      Object.assign(state.userinfo, anyData)
      if (anyData.accountInfo.tkpass_ok === 0) {
        state.userFlag.jymm = 1
      } else {
        state.userFlag.jymm = 0
      }
      if (anyData.accountInfo.email === '') {
        state.userFlag.yx = 1
      } else {
        state.userFlag.yx = 0
      }
      if (anyData.accountInfo.wechat === '') {
        state.userFlag.wx = 1
      } else {
        state.userFlag.wx = 0
      }
      if (anyData.accountInfo.real_name === '') {
        state.userFlag.zsxm = 1
      } else {
        state.userFlag.zsxm = 0
      }
      if (anyData.accountInfo.question_1 === '0') {
        state.userFlag.mbwt = 1
      } else {
        state.userFlag.mbwt = 0
      }
      if (anyData.accountInfo.qq === '') {
        state.userFlag.qq = 1
      } else {
        state.userFlag.qq = 0
      }
      if (anyData.accountInfo.phone === '') {
        state.userFlag.sj = 1
      } else {
        state.userFlag.sj = 0
      }
      if (anyData.accountInfo.bank_typename === '') {
        state.userFlag.yhk = 1
      } else {
        state.userFlag.yhk = 0
      }
    },
    // 刷新余额
    [types.SET_BALANCE](state, balance) {
      state.userinfo.accountInfo.price = Number(balance).toFixed(2)
    },
    // 设置消息状态
    [types.SET_USER_FLAG](state, flag) {
      // 红包
      state.userFlag.redGift = 1 & flag ? 1 : 0
      // 未读信息
      state.userFlag.message = 2 & flag ? 1 : 0
      // 意见反馈
      state.userFlag.feedback = 4 & flag ? 1 : 0
      // 签到福利
      state.userFlag.welfare = 8 & flag ? 1 : 0
      // 安全设置
      state.userFlag.safety = 16 & flag ? 1 : 0
    },
    //  储存系统信息
    [types.SET_SYSINFO](state, sys) {
      state.sysinfo = sys
    },
    // 修改系统信息弹窗提示
    [types.SET_SYSSTATE](state, sysState) {
      state.sysState = sysState
    },
    // 修改系统提示信息内容
    [types.SET_SYSCONTENT](state, syscontent) {
      state.sysContent = syscontent
    },
    // 修改 用户信息单属性
    [types.SET_USERINFO_FIELD](state, { key, value }) {
      state.userinfo.accountInfo[key] = value
    },
    // 改变引导图状态
    [types.SET_GUIDE_STATE](state, guide) {
      state.guideIsshow = guide
    },
    // ios如果嵌套
    [types.SET_NESTED](state) {
      state.isnested = true
    },
    // 修改用户信息
    MODIFY_USER_FIELD(state, obj) {
      Object.keys(obj).map(k => state.userinfo.accountInfo[k] = obj[k])
    },
    // 修改维护状态
    [types.SET_MAINTAINED](state, main) {
      state.maintained = main
    },
    // 设置投注记录类型
    [types.SET_BETRECORDSTYPE](state, data) {
      state.betRecordsType = data
    },
    [types.SET_VCODE](state, code) {
      state.vcode = code
    }
  },
  actions: {
    // 设置投注记录类型
    async setBetRecordsType({ commit }, data) {
      commit(types.SET_BETRECORDSTYPE, data)
    },
    reqLoader({ commit }, requests) {
      commit(types.REQ_LOADER, requests)
    },
    // resLoader({ commit }) {
    //   commit(types.RES_LOADER)
    // },
    // 设置余额
    setBalance({ commit }, str) {
      commit(types.SET_BALANCE, str)
    },
    // 账号登录
    async userLogin({ commit, dispatch }, { encodeUserStr, request }) {
      const res = await http({ ac: 'userLogin', ...request })
      commit('GET_USERINFO', {
        accountInfo: res,
        isLogin: true
      })
      localStorage.setItem('expire', new Date().getTime())
      localStorage.setItem('autoToken', encodeUserStr)
      localStorage.setItem('userIndex', res.uid)
      // const _time = localStorage.getItem('lastLoginTime')
      // localStorage.setItem(
      //   'lastLoginTime',
      //   (_time ? _time + ',' : '') + new Date().getTime()
      // )
      // 登陆后显示引导图
      const it = JSON.parse(localStorage.getItem('guide'))
      commit('SET_GUIDE_STATE', it !== null ? it : true)
      return true
      // return dispatch('flushPrice')
    },
    // 试玩登录
    async regGuestUser({ dispatch, commit, state }) {
      commit('SET_USERINFO_FIELD', { isLogin: false })
      const res = await http({
        ac: 'regGuestUser',
        tg_code: state.sysinfo.bind_param
      })
      localStorage.setItem('expire', new Date().getTime())
      localStorage.setItem('autoToken', res.code)
      localStorage.setItem('userIndex', res.uid)
      return dispatch('encodeLogin')
    },
    // 正式注册
    async regUser({ dispatch, commit }, request) {
      commit('SET_USERINFO_FIELD', { isLogin: false })
      const res = await http({ ac: 'regUser', ...request })
      localStorage.setItem('expire', new Date().getTime())
      localStorage.setItem('autoToken', res.code)
      localStorage.setItem('userIndex', res.uid)
      return dispatch('encodeLogin')
    },
    // 自动登录
    async encodeLogin({ commit, dispatch }) {
      const res = await http({
        ac: 'encodeLogin',
        code: localStorage.getItem('autoToken'),
        uid: localStorage.getItem('userIndex')
      })
      if (!Array.isArray(res) && res) {
        commit('GET_USERINFO', {
          accountInfo: res,
          isLogin: true
        })
      } else {
        return
      }
      // 开启余额定时刷新
      dispatch('flushPrice')
      return true
    },
    // 自动刷新余额和消息状态
    async flushPrice({ commit }) {
      // if (timeI) {
      //   clearTimeout(timeI)
      // }
      const res = await ajaxs(
        {
          ac: 'flushPrice'
        },
        false
      ).catch(() => {
        // clearTimeout(timeI)
      })
      if (!res || !res.hasOwnProperty('price')) {
        return false
      }
      // 刷新金额
      commit('MODIFY_USER_FIELD', {
        price: Number(res.price).toFixed(2),
        last_get_price: Number(res.last_get_price).toFixed(2),
        real_name: res.real_name
      })
      // 刷新用户消息状态
      commit(types.SET_USER_FLAG, res.user_flag)
      // timeI = setTimeout(() => {
      //   dispatch('flushPrice')
      // }, 10000)
      return true
    },
    // 更新余额
    async updatePrice({ commit }, price) {
      console.log('updatePrice1', price)
      commit('MODIFY_USER_FIELD', {
        price: Number(price).toFixed(2)
      })
      console.log('updatePrice2', Number(price).toFixed(2))
    },
    // 用户退出
    async userLogout({ commit }) {
      await http({ ac: 'userLogout' })
      commit('GET_USERINFO', { accountInfo: {}, isLogin: false })
      clearTimeout(timeI)
      // 后续优化
      // localStorage.clear()
      localStorage.removeItem('autoToken')
      localStorage.removeItem('userIndex')
      localStorage.removeItem('expire')
      return true
    },
    // 用于用户修改密码后续处理
    async afterCorrectPW({ commit }) {
      commit('GET_USERINFO', { accountInfo: {}, isLogin: false })
      clearTimeout(timeI)
      // 后续优化
      // localStorage.clear()
      localStorage.removeItem('autoToken')
      localStorage.removeItem('userIndex')
      localStorage.removeItem('expire')
      return true
    },
    // 写入验证码
    async setVcode({ commit }, code) {
      commit(types.SET_VCODE, code)
    }
  }
})
