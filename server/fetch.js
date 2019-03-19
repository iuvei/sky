// import axios from 'axios'
import router from '../src/router'
import store from '../src/store'
import * as types from '../src/store/mutation-type'
import md5 from 'js-md5'
import encode from '../src/js/encode'
import cacheExpired from './cacheApi'
import clientCache from './clientCache'
import _encodeKey from './encodeKey'
const cachedKeys = Object.keys(cacheExpired)

const qs = require('qs')
// 结果为null '' {} [] 返回为false
const transform = data => {
  const type = JSON.stringify(data)
  return !(!type || type === '{}' || type === '[]' || type === 'null')
}
// 20030 聊天室不可用
// 41012 银行卡为空
let vue = window.vue

const getCacheKey = params => {
  const seriazeKeys = ['getPeilvNoLogin', 'getGamePlayConfig']
  if (seriazeKeys.includes(params.ac)) {
    // return qs.stringify(params).replace('&client_type=1&edition=v1.0.0', '')
    return qs.stringify({
      ac: params.ac,
      js_tag: params.js_tag
    })
  }
  return params.ac
}

// 拦截请求
// const interceptors = params => {
//   let cachedData = null
//   const hasKey = params.hasOwnProperty('ac') && cachedKeys.includes(params.ac)

//   if (hasKey) cachedData = clientCache.getItem(params.ac)
//   if (cachedData && !clientCache.dataIsExpried(params.ac)) {
//     window.$nuxt.$Spin.hide()
//     // return cache.getDataByKey(params.ac);
//     // console.log('getfrom cache', params.ac);
//     return Promise.resolve(cachedData)
//   }
// }

// 处理参数
const processPrarams = obj => {
  if (store.state.userinfo.isLogin) {
    obj.token = store.state.userinfo.accountInfo.token
    obj.uid = store.state.userinfo.accountInfo.uid
    obj.sessionkey = store.state.userinfo.accountInfo.session_key
  }
  obj.client_type = 1
  obj.edition = 'v1.0.0'
  // 是否显示加载动画
  if (obj.loading) vue.$dialog.loading.open(' ')
  delete obj.loading
  return obj
}

// 加密
const encodePrams = obj => {
  obj = processPrarams(obj)
  // console.log(JSON.stringify(obj))
  if (obj.ac === 'userSubmitTouzhu') {
    // console.warn(qs.stringify(obj))
  }
  const params = qs.stringify(obj)
  console.warn(obj)
  // console.warn(
  //   'p=' +
  //     `DEX${encode(params, _encodeKey)}${md5(
  //       decodeURIComponent(params) + '&encode=' + _encodeKey
  //     )}`.toUpperCase()
  // )
  // return params
  return (
    'p=' +
    `DEX${encode(params, _encodeKey)}${md5(
      decodeURIComponent(params) + '&encode=' + _encodeKey
    )}`.toUpperCase()
  )
}
// 20028 登录时不可进入聊天室
// 20030 未登录时不可进入聊天室
// 41012 银行卡列表为空
// 40020 45000 50003
const whiteList = [20028, 20030]
// 接收消息
const processResponse = (res, params, isShowErr, resolve, reject) => {
  vue.$dialog.loading.close()
  // 后端定义登录超时返回40000
  if (res.msg === 0) {
    // clientCache.setItem(getCacheKey(params), res.data)
    clientCache.setItem(getCacheKey(params), res.data)
    resolve(transform(res.data) ? res.data : 0) // 接口有可能返回空数据，表示无记录，设置0标识符
  } else if (res.msg === 40000) {
    vue.$dialog.toast({ mes: '登录超时，请重新登录' })
    store.commit(types.GET_USERINFO, { accountInfo: {}, isLogin: false })
    // localStorage.clear()
    localStorage.removeItem('autoToken')
    localStorage.removeItem('userIndex')
    localStorage.removeItem('expire')
    router.replace({
      path: '/login',
      query: { redirect: router.currentRoute.fullPath }
    })
  } else if (whiteList.includes(res.msg)) {
    resolve(res)
  } else if (res.msg === 41012) {
    resolve(transform(res.data) ? res.data : 0)
  } else if (res.msg === 40020) {
    router.replace('/forbiddenIP')
    store.commit(types.SET_MAINTAINED, { msg: 40020 })
    resolve(res.data)
  } else if (res.msg === 45000) {
    // router.replace('/maintained')
    store.commit(types.SET_MAINTAINED, res)
    resolve(res)
  } else if (res.msg === 50003) {
    store.commit('football/MODIFY_FIELD', { maintained: res.data })
    router.push('/football/maintained')
    resolve([])
  } else if (res.msg === 20004) { // 业主关闭提款功能
    window.vue.$dialog.toast({ mes: res.param })
    resolve(res)
  } else {
    if (isShowErr) {
      window.vue.$dialog.toast({ mes: res.param })
    }
    reject(res.data || res.param)
  }
}

export default (params, isShowErr = true, path = 'request') => {
  // 拦截请求
  let cachedData = null
  const key = getCacheKey(params),
    hasKey =
      (params.hasOwnProperty('ac') && cachedKeys.includes(params.ac)) ||
      clientCache.hasKey(key)

  if (hasKey) {
    cachedData = clientCache.getItem(key)
    // console.log('hasKey', hasKey, key, cachedData)
  }
  if (cachedData && !clientCache.dataIsExpried(key)) {
    // console.warn('I\'m come from cache', qs.stringify(params))
    return Promise.resolve(cachedData)
  }

  // 检测网络
  // if (navigator.connection) {
  //   const conn = navigator.connection
  //   if (conn.rtt === 0) {
  //     return Promise.reject('当前网络状况异常,请检查您的网络连接')
  //   } else {
  //     switch (conn.effectiveType) {
  //       case '3g':
  //       case '2g':
  //         return Promise.reject(
  //           '当前网络连接较慢,请使用WIFI或者到信号比较好的地方使用'
  //         )
  //     }
  //   }
  // }
  // 不通过拦截，正常返回
  return new Promise((resolve, reject) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    headers.append('BXVIP-UA', 'wap')
    vue = window.vue
    if (store.state.maintained.msg === 45000) {
      return
    }
    const postData = encodePrams(params)
    const url = `/${path}`
    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'same-origin', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'BXVIP-UA': 'wap',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      redirect: 'follow', // manual, *follow, error
      // referrer: 'no-referrer', // no-referrer, *client
      body: postData // body data type must match "Content-Type" header
    })
      .then(response => response.json()) // parses response to JSON
      .catch(err => {
        vue.$dialog.loading.close()
        vue.$dialog.toast({ mes: '网络断开' })
        console.log(err)
        reject(err)
      })
      .then(response =>
        processResponse(response, params, isShowErr, resolve, reject)
      )
  })
}
