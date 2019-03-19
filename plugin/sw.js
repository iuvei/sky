const edition = process.env.edition

function getTemplate(arr) {
  const template = `
const edtion = '${edition}'
const list = [${arr}]
self.addEventListener('install', event => {
  self.skipWaiting();
  caches.open(edtion).then(cache => cache.addAll(list))
})

self.addEventListener('activate', function(event) {
  var cacheWhitelist = [edtion];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method === 'POST') {
    const newObj = {}

    //event.request
    //  .clone()
    //  .formData()
    //  .then(formData => {
    //    for (const pair of formData.entries()) {
    //      const key = pair[0]
    //      const value = pair[1]
    //      newObj[key] = value
    //    }
    //    // console.log(formData, newObj)
    //  })

    // return fetch(event.request)
    event.respondWith(
      fetch(event.request)
    );
  } else {
    // 如果是get请求，放入缓存
    // 先返回后更新
    // if(event.request.url.includes('.js')){console.log(event.request.url)}
    if (!event.request.url.startsWith(self.location.origin)) {
      if (
        event.request.url.includes('.png') ||
        event.request.url.includes('.jpg')
      ) {
        return fetch(event.request)
      }
    } else {
      event.respondWith(
        caches.open(edtion).then(cache =>
          cache.match(event.request.url).then(res => {
            // const cros = event.request.url.endsWith('.ttf') ? 'cors':'no-cors'
            var request = new Request(event.request.url, {mode: 'cors'});
            const fetchPromise = fetch(request).then(reqRes => {
              // 如果是上传图片，不缓存
              if(!event.request.url.toLowerCase().includes('upload')){
                // 1. 响应状态码为200；避免缓存304、404、50x等常见的结果
                // 2. 响应类型为basic或者cors；即只缓存同源、或者正确地跨域请求结果；避免缓存错误的响应（error）和不正确的跨域请求响应（opaque）
                if(reqRes.status === 200 && (reqRes.type === 'basic' || reqRes.type === 'cors'))
                  cache.put(event.request, reqRes.clone())
              }
              return reqRes
            })
            return res || fetchPromise
          })
        )
      )
    }
  }
})
`
  return template
}

function RegisterServiceWorkerPlugin(options = {}) {}

RegisterServiceWorkerPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', (compilation, callback) => {
    // Create a header string for the generated file:
    // let filelist = 'In this build:\n\n'

    // Loop through all compiled assets,
    // adding a new line item for each filename.
    // for (const filename in compilation.assets) {
    //   filelist += '- ' + filename + '\n'
    // }
    // const filelist = Array.from(compilation.assets).join(',')
    // let filelist = ''
    // for (const filename in compilation.assets) {
    //   filelist += '"' + filename + '",'
    // }
    // filelist = filelist.substring(0, filelist.length - 1)
    // Insert this list into the Webpack build as a new file asset:
    const filelist = ['"index.html"']
    const template = getTemplate(filelist)
    // const template = ['index.html']
    compilation.assets['sw.js'] = {
      source() {
        return template
      },
      size() {
        // return filelist.length
        return template.length
      }
    }

    callback()
  })
}

module.exports = RegisterServiceWorkerPlugin
