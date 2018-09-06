module.exports = {
  runtimeConfig: {
    experimentalFeatures: {
      featureFoo: false,
      featureBar: true
    },

    thirdPartyApiKey: 'abcdefg123456'
  },

  publicPath: '/assets/',

  devServer: {
    port: 8100,
    proxy: {
      '/request': {
        // target: 'http://app.zjgguolong.com/request',
        target: 'http://client.sg04.com/request',
        // target: 'http://qawap.sg04.com/request',
        // target: 'http://699679.com/request', // 679业主正式站，慎用！！！
        changeOrigin: true,
        secure: false,
        '/request': '/request'
      },
      '/ac': {
        target: 'http://client.sg04.com/request/ac/getCPLogInfo',
        changeOrigin: true,
        secure: false,
        '/ac': '/ac'
      },
      '/api': {
        target: 'http://m.94flash.com/index.php/api/request',
        changeOrigin: true,
        secure: false,
        '/api': '/api'
      }
    }
  }
}
