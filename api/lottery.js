import axios from '../server/axios'
import { PROXY } from './commType'

export default {
  async getUserWinList() {
    const cache = JSON.parse(sessionStorage.getItem('winlist'))
    if (cache && new Date().getTime() - cache.expire < 900000) {
      return cache
    } else {
      const res = await axios(PROXY, {
        ac: 'userWinList'
      })
      const a = {
        res,
        expire: new Date().getTime()
      }
      sessionStorage.setItem('winlist', JSON.stringify(a))
      // console.log('set session')
      return a
    }
  }
}
