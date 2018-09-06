import axios from 'axios'

const instance = axios.create()

function createAPI(baseURL) {
  return function(conf) {
    conf = conf || {}
    const res = Object.assign({}, {
      url: conf.url,
      baseURL,
      method: conf.method
    }, conf.opts)
    return instance(res)
  }
}

function convertRESTAPI(url, opts) {
  if (!opts || !opts.path) return url

  const pathKeys = Object.keys(opts.path)

  pathKeys.forEach(key => {
    const r = new RegExp('(:' + key + '|{' + key + '})', 'g')
    url = url.replace(r, opts.path[key])
  })

  return url
}

export {
  createAPI,
  convertRESTAPI
}