import encode from '../src/js/encode'
import cacheExpried from './cacheApi'
import _encodeKey from './encodeKey'
const seriazeKeys = ['getPeilvNoLogin', 'getGamePlayConfig']

const keys = Object.keys(cacheExpried)

const hasSortKeys = key => seriazeKeys.some(x => key.includes(x))

const getExpreidDate = key => {
  let expried = cacheExpried[key]
  if (!expried) expried = cacheExpried[seriazeKeys.find(x => key.includes(x))]
  if (!expried) return null
  return new Date().getTime() + expried * 1000
}

class ClientStorage {
  getItem = key => {
    const obj = localStorage.getItem(encode(key, _encodeKey))
    // const obj = localStorage.getItem(key)
    if (obj) {
      return JSON.parse(obj).data
    }
    return null
  }

  dataIsExpried = key => {
    const obj = localStorage.getItem(encode(key, _encodeKey))
    // const obj = localStorage.getItem(key)
    if (!obj) return true
    else return new Date().getTime() > JSON.parse(obj).expried
  }

  // hasKey = key => localStorage.hasOwnProperty(key)
  hasKey = key => localStorage.hasOwnProperty(encode(key, _encodeKey))

  setItem = (key, data) => {
    // console.warn('cache setItem', key)
    if (!keys.includes(key) && !hasSortKeys(key)) return
    if (this.dataIsExpried(key)) {
      localStorage.setItem(
        // key,
        encode(key, _encodeKey),
        JSON.stringify({
          expried: getExpreidDate(key),
          data
        })
      )
    }
  }
}

export default new ClientStorage()
