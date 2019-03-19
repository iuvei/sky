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
        target: 'http://www.pyhongxing.com/request',
        // target: 'http://app.zjgguolong.com/request',
        // target: 'http://client.sg04.com/request',
        // target: 'http://qat-web.bxvip.co/request',
        // target: 'http://qawap.sg04.com/request',
        // target: 'http://699679.com/request', // 679业主正式站，慎用！！！
        // target: 'https://193a.cc/request',
        changeOrigin: true,
        secure: false,
        '/request': '/request'
      }
    }
  }
}
