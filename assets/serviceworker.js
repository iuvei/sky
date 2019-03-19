// import version from '../config/edition.json'
const edtion = process.env.edition
const list = ['index.html']
self.addEventListener('install', event => {
  caches.open(edtion).then(cache => cache.addAll(list))
})

self.addEventListener('fetch', event => {
  if (event.request.method === 'POST') {
    const newObj = {}

    event.request
      .clone()
      .formData()
      .then(formData => {
        for (const pair of formData.entries()) {
          const key = pair[0]
          const value = pair[1]
          newObj[key] = value
        }
        console.log(formData, newObj)
      })

    return fetch(event.request)
  } else {
    // 如果是get请求，放入缓存
    // 先返回后更新

    // console.log(event.request)
    // return fetch(event.request)
    event.responWith(
      caches.open(edtion).then(cache =>
        cache.match(event.request).then(res => {
          const fetchPromise = fetch(event.request).then(reqRes => {
            cache.put(event.request, reqRes.clone())
            return reqRes
          })
          return res || fetchPromise
        })
      )
    )
  }
  // event.responWith(
  //   caches.match(event.request).then(res => {
  //     console.log(res)
  //     if (res) return res
  //     return fetch(event.request)
  //   })
  // )
})
