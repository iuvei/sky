import { LocalCache, SessionCache } from '../server/store.util'
import { KEY_GAMEPLAYCONFIG, KEY_ODDS, KEY_GAMES } from './commType'

// class Games {
//   constructor() {
//     this.cache = new SessionCache()
//   }

//   get() {
//     return this.cache.get(KEY_GAMES)
//   }

//   getLottery() {
//     const games = this.get()
//     if (games) {
//       return games.filter(
//         game =>
//           game.type === 1 && game.js_tag !== 'sport_key' && game.enable === 1
//       )
//     }
//     return []
//   }
//   set(games) {
//     this.cache.set(KEY_GAMES, games, 1000 * 60 * 60 * 24)
//   }
// }

// class GamePlayConfig {
//   constructor() {
//     this.cache = new LocalCache()
//   }
//   get() {
//     return this.cache.get(KEY_GAMEPLAYCONFIG)
//   }
//   set(configs) {
//     this.cache.set(KEY_GAMEPLAYCONFIG, configs, 1000 * 60 * 60 * 24)
//   }
//   getByTag(jsTag) {
//     const configs = this.get()
//     if (configs) {
//       return configs.find(x => x.js_tag === jsTag)
//     }
//     return {}
//   }
//   setByTag(jsTag, config) {
//     const configs = this.get() || []
//     const index = configs.findIndex(x => x.js_tag === jsTag)
//     if (index > -1) {
//       config.js_tag = jsTag
//       configs[index] = config
//     }
//     this.set(configs)
//   }
// }

class Odd {
  constructor() {
    this.cache = new LocalCache()
  }
  get() {
    return this.cache.get(KEY_ODDS)
  }
  set(configs) {
    this.cache.set(KEY_ODDS, configs, 1000 * 60 * 60 * 24)
  }
  getByGameId(gameid) {
    const configs = this.get()
    if (configs) {
      return configs.filter(x => x.gameid === gameid)
    }
    return []
  }

  getByPlayId(gameid, playid) {
    const configs = this.getByGameId(gameid)
    if (configs) {
      return configs.find(x => x.playid === playid)
    }
    return null
  }
}

export { Games, GamePlayConfig, Odd }
