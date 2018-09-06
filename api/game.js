import axios from '../server/axios'
import http from '../server/http'
import difference from 'lodash/difference'
import api from './betting'
import { PROXY, KEY_GAMES } from './commType'

import { Games, GamePlayConfig, Odd } from './store.util'

export default {
  /**
   * 获取所有彩种,从接口取
   *
   * @returns promise
   */
  async getGameListAtin() {
    const res = await axios(PROXY, {
      ac: 'getGameListAtin',
      tag: null
    })
    return res
  },
  /**
   * 获取所有彩种
   *
   * @returns promise
   */
  async getGameList() {
    if (!this) return []
    const _games = new Games()
    let games = _games.get(KEY_GAMES)
    if (!games || !games.length) {
      games = await this.getGameListAtin()
      _games.set(games)
    }
    return games || []
  },
  async getLotteries() {
    const games = await this.getGameList()
    if (games && games.length) {
      return games.filter(x => x.enable === 1 && x.type === 1)
    }
    return []
  },
  getPleyConfigTags() {
    const games = new Games().getLottery(),
      configs = new GamePlayConfig().get()
    let tags = []
    // 如果在缓存中存在,则取交集
    if (
      Array.isArray(games) &&
      games.length &&
      Array.isArray(configs) &&
      configs.length
    ) {
      tags = difference(games.map(x => x.js_tag), configs.map(x => x.js_tag))
      tags = Array.from(new Set(tags))
    } else if (!configs || (Array.isArray(configs) && !configs.length)) {
      // 如果缓存不存在,则重新获取
      tags = Array.from(new Set(games.map(x => x.js_tag)))
    }
    return tags
  },
  async getGamePlayConfigs() {
    const configs = []
    const tags = this.getPleyConfigTags()
    return await Promise.all(tags.map(x => api.getGamesPlayConfig(x))).then(
      results => {
        if (
          Array.isArray(results) &&
          results.length &&
          results.length === tags.length
        ) {
          results.forEach(x => {
            if (x && x.list && Array.isArray(x.list)) {
              x.js_tag = x.list[0].js_tag
              configs.push(x)
            }
          })
          new GamePlayConfig().set(configs)
        }
        return results
      }
    )
  },
  getOddsPromiseAll(_games) {
    const odds = new Odd().get()
    const games = Object.assign([], _games).filter(
      x => x.enable === 1 && x.type === 1
    )
    // 如果在缓存中存在,则取交集
    if (games.length && Array.isArray(odds) && odds.length) {
      const _diff = difference(
        games.map(x => x.game_id),
        odds.map(x => x.gameid)
      )
      return Promise.all(_diff.map(x => api.getUnLoginGameOdds(x)))
    } else if (!odds || (Array.isArray(odds) && !odds.length)) {
      // 如果缓存不存在,则重新获取
      return Promise.all(games.map(x => api.getUnLoginGameOdds(x.game_id)))
    }
  },

  async getUnloginOdds(games) {
    let odds = []
    if (Array.isArray(games) && games.length) {
      const results = await this.getOddsPromiseAll(games)

      if (Array.isArray(results) && results.length) {
        results.forEach(x => {
          if (Array.isArray(x) && x.length) {
            odds = odds.concat(x)
          }
        })
        new Odd().set(odds)
        return odds
      }
      return []
      // await this.getOddsPromiseAll(games).then(results => {
      //   if (Array.isArray(results) && results.length) {
      //     results.forEach(x => {
      //       if (Array.isArray(x) && x.length) {
      //         odds = odds.concat(x)
      //       }
      //     })
      //   }
      //   new Odd().set(odds)
      //   return results
      // })
    }
    return []
  },
  // 获取系统信息
  async getSysinfo() {
    const sysinfo = await http({
      ac: 'getSysInfo',
      // enom: 'client.sg04.com'
      enom: location.host
    })
    if (sysinfo) {
      sysinfo.service_url = sysinfo.service_url
        .replace(/\\\\u0026/g, '&')
        .replace(/\&amp\;/g, '&')
      document.title = sysinfo.web_title || '维护中···'
      window.vue.$store.commit('SET_SYSINFO', sysinfo)
      // this.$store.commit("SET_SYSINFO", sysinfo);
    }
    return sysinfo
  }
}
