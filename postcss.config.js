module.exports = {
  plugins: [
    require('autoprefixer')({
      remove: false, // 不移除老式过时css属性
      browsers: [
        '> 1%',
        'last 2 versions',
        'not ie <= 8',
        'iOS >= 6',
        'Android > 4.1',
        'Firefox > 20'
      ]
    })
  ]
}
