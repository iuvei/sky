module.exports = {
  runtimeConfig: {
    experimentalFeatures: {
      featureFoo: false,
      featureBar: true
    },

    thirdPartyApiKey: 'abcdefg123456'
  },

  publicPath: '/',

  devServer: {
    port: 8100,
    proxy: {
      '/request': {
        target: 'http://app.zjgguolong.com/request',
        changeOrigin: true,
        secure: false,
        '/request': '/request'
      },
      '/ac': {
        target: 'http://m.94flash.com/index.php/request/request/ac/getCPLogInfo',
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
