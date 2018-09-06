import instance from './instance'
import { } from '../util'


/** 免费试玩 */
function demo_get(opts) {
  return instance({
    method: 'get',
    url: '/demo',
    opts
  })
}

/** 用于走势 */
function trend_get(opts) {
  return instance({
    method: 'get',
    url: '/trend',
    opts
  })
}

/** 得到彩票登录信息 */
function getCPLogInfo_get(opts) {
  return instance({
    method: 'get',
    url: '/getCPLogInfo',
    opts
  })
}

/** 公告信息 */
function getSystemNotice_get(opts) {
  return instance({
    method: 'get',
    url: '/getSystemNotice',
    opts
  })
}

/** 开奖排行榜 */
function userWinList_get(opts) {
  return instance({
    method: 'get',
    url: '/userWinList',
    opts
  })
}

/** 获得详细彩种信息 */
function lottery_get(opts) {
  return instance({
    method: 'get',
    url: '/lottery',
    opts
  })
}

/** 用于开奖 */
function getCPLoglnfo_get(opts) {
  return instance({
    method: 'get',
    url: '/getCPLoglnfo',
    opts
  })
}

export {
  demo_get,
  trend_get,
  getCPLogInfo_get,
  getSystemNotice_get,
  userWinList_get,
  lottery_get,
  getCPLoglnfo_get
}
