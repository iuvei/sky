import axios from '../server/axios'
import http from '../server/http'
import { PROXY } from './commType'
import { Odd, GamePlayConfig } from './store.util'

export default {
  /**
   * 获取玩法配置
   *
   * @param {string} jsTag
   * @returns promise
   */
  async getGamePlayConfig(jsTag) {
    // 如果有缓存，先取缓存
    const config = new GamePlayConfig().getByTag(jsTag)
    // 先调用接口查看是否有更新
    const isUpdated = await this.getPlayConfigUpdate(
      jsTag,
      (config ? config.timestamp : 0) || 0
    )

    // 如果需要更新，则取接口更新
    if (isUpdated) {
      const _config = await this.getGamesPlayConfig(jsTag)
      // 获取数据后更新缓存
      if (_config) {
        new GamePlayConfig().setByTag(jsTag, _config)
      }
      // 更新后返回
      return _config.list || []
    } else {
      // 如果不需要更新，则返回缓存
      if (config && config.list && config.list.length) {
        return config.list
      } else {
        // 如果缓存没有，则重新请求接口获取，并写入缓存
        const _config = await this.getGamesPlayConfig(jsTag)
        if (_config) {
          new GamePlayConfig().setByTag(jsTag, _config)
        }
        // 更新后返回
        return _config.list || []
      }
    }
  },
  async getGamesPlayConfig(jsTag) {
    const config = await axios(PROXY, {
      ac: 'getGamePlayConfig',
      js_tag: jsTag
    }).catch(err => {
      console.log(`彩种：${jsTag} 没有玩法 错误:${err}`)
      return []
    })
    return config
  },
  /**
   * 获取历史开奖数据
   * @param {string} jstag
   * @returns promise
   */
  getHistoryOpen(jstag) {
    return axios(PROXY, {
      ac: 'getKjCpLog',
      date: 0,
      tag: jstag
    })
  },
  /**
   * 获取下期开奖截止时间
   *
   * @param {string} jstag
   * @returns promise
   */
  getNextStop(jstag) {
    return axios(PROXY, {
      ac: 'getCplogList',
      tag: jstag
    })
  },
  /**
   * 获取登陆后的赔率
   *
   * @param {number} gameid
   * @param {object} [options=null]
   * @returns promise
   */
  getLogondGameOdds(gameid, options = null) {
    return axios(PROXY, {
      ac: 'getPeilvConfig',
      gameid,
      ...options
    })
  },
  /**
   * 获取未登陆的赔率
   * @param {any} gameid
   * @param {any} [options=null]
   * @returns
   */
  getUnLoginOdds(gameid) {
    const odds = new Odd().get() // this.getFromCache(KEY_ODDS)
    if (odds && odds.length) {
      return odds.filter(x => x.gameid === gameid)
    } else {
      return this.getUnLoginGameOdds(gameid)
    }
  },
  async getUnLoginGameOdds(gameid, options = null) {
    return await http({
      ac: 'getPeilvNoLogin',
      gameid,
      bind_param: window.vue.$store.state.sysinfo.bind_param,
      ...options
    }).catch(err => {
      console.log(`彩种：${gameid} 没有玩法 错误:${err}`)
      return []
    })
  },
  async getUnloginGameOdd(gameid, playid) {
    const odds = await this.getUnLoginOdds(gameid)
    if (odds.length) {
      return odds.find(x => x.playid === playid)
    }
  },
  /**
   * 用户提交投注
   *
   * @param {object} [options=null]
   * @returns promise
   */
  userSubmitBet(options = null) {
    return http({
      ac: 'userSubmitTouzhu',
      ver: 'v1.0.0',
      client_type: 1,
      ...options
    })
  },
  /**
   * 刷新登陆用户的金额
   *
   * @returns promise
   */
  flushPrice() {
    return axios(PROXY, {
      ac: 'flushPrice'
    })
  },
  /**
   * 更新玩法配置，前端自行存储成功更新的第一条数据的timestamp作为下次访问此接口的last_time参数
   *
   * @param {number} [lasttime=0]
   * @returns promise
   */
  async getPlayConfigUpdate(jsTag, lasttime = 0) {
    const res = await axios(PROXY, {
      ac: 'getPlayConfigUpdate',
      last_time: lasttime,
      js_tag: jsTag
    })
    if (res) {
      return res.update === 1
    }
  }
}
