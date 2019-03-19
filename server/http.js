import axios from 'axios'
import router from '../src/router'
import store from '../src/store'
import * as types from '../src/store/mutation-type'
import md5 from 'js-md5'
import encode from '../src/js/encode'

const qs = require('qs')
// 结果为null '' {} [] 返回为false
const transform = data => {
  const type = JSON.stringify(data)
  return !(!type || type === '{}' || type === '[]')
}
const whiteList = [41012]
export default (obj, isShowErr = true, strings = 'request') =>
  new Promise((resolve, reject) => {
    if (store.state.maintained.msg === 45000) {
      return
    }
    if (store.state.userinfo.isLogin) {
      obj.token = store.state.userinfo.accountInfo.token
      obj.uid = store.state.userinfo.accountInfo.uid
      obj.sessionkey = store.state.userinfo.accountInfo.session_key
    }
    obj.client_type = 1
    obj.edition = 'v1.0.0'
    // 是否显示加载动画
    if (obj.loading) window.vue.$dialog.loading.open(' ')
    delete obj.loading
    console.log(JSON.stringify(obj))
    const params = qs.stringify(obj)
    const postData =
      'p=' +
      `DEX${encode(params, 'bx20180701')}${md5(
        decodeURIComponent(params) + '&encode=bx20180701'
      )}`.toUpperCase()
    axios
      .post(`/${strings}`, postData, {
        headers: { 'BXVIP-UA': 'wap' }
      })
      .then(res => {
        window.vue.$dialog.loading.close()
        // 后端定义登录超时返回40000
        if (res.data.msg === 40000) {
          window.vue.$dialog.toast({ mes: '登录超时，请重新登录' })
          store.commit(types.GET_USERINFO, { accountInfo: {}, isLogin: false })
          // localStorage.clear()
          localStorage.removeItem('autoToken')
          localStorage.removeItem('userIndex')
          localStorage.removeItem('expire')
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
        } else if (res.data.msg === 40020) {
          router.replace('/forbiddenIP')
          store.commit(types.SET_MAINTAINED, { msg: 40020 })
          resolve(res.data.data)
        } else if (res.data.msg === 45000) {
          // router.replace('/maintained')
          store.commit(types.SET_MAINTAINED, res.data)
          resolve(res.data.data)
        } else if (res.data.msg === 50003) {
          store.commit('football/MODIFY_FIELD', { maintained: res.data })
          router.push('/football/maintained')
          resolve([])
        } else if (
          res.data.msg !== 40000 &&
          res.data.msg !== 0 &&
          res.data.msg !== 45000 &&
          !whiteList.includes(res.data.msg)
        ) {
          // 后台验证不通过的提示信息统一弹窗提示 如有冲突可修改
          if (isShowErr) {
            window.vue.$dialog.toast({ mes: res.data.param })
          }
          reject(res.data)
        } else {
          resolve(transform(res.data.data) ? res.data.data : 0) // 接口有可能返回空数据，表示无记录，设置0标识符
        }
      })
      .catch(err => {
        window.vue.$dialog.loading.close()
        window.vue.$dialog.toast({ mes: '网络断开' })
        console.log(err)
        reject(err)
      })
  })
