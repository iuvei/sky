const cacheKey = 'cache'

class LocalCache {
  constructor() {
    let store = localStorage.getItem(cacheKey)
    if (!store) {
      store = {}
      this.store = store
    } else {
      this.store = JSON.parse(store)
    }
  }

  set(key, value, expire) {
    this.store[key] = {
      expire: new Date().getTime() + expire,
      value
    }
    localStorage.setItem(cacheKey, JSON.stringify(this.store))
  }

  get(key) {
    const data = this.store[key]
    if (!data) {
      return null
    }
    if (data.expire < new Date().getTime()) {
      delete this.store[key]
      localStorage.setItem(cacheKey, JSON.stringify(this.store))
    } else {
      return data.value
    }
  }
}

class SessionCache {
  constructor() {
    let store = sessionStorage.getItem(cacheKey)
    if (!store) {
      store = {}
      this.store = store
    } else {
      this.store = JSON.parse(store)
    }
  }

  set(key, value) {
    // if (typeof value !== 'string') value = JSON.stringify(value)
    this.store[key] = value
    sessionStorage.setItem(cacheKey, JSON.stringify(this.store))
  }

  get(key) {
    const data = this.store[key]
    if (!data) {
      return null
    }
    return data
  }
}

export { LocalCache, SessionCache }
