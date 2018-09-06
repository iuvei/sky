// function getBgImg(type) {
//   console.log(typeof type, type)
//   if (type === 1) {
//     const img = require('~/img/phone_header.png')
//     return { backgroundImage: `url(${img})` }
//   }
// }
// // img/phone_header.png
// export default type => ({
//   bgImg() {
//     console.log(type)
//     return getBgImg(type)
//   }
// })

// img/phone_header.png
export default {
  bgImg(type) {
    // if (type === 1) {
    //   const img = require('~/img/phone_header.png')
    //   return { backgroundImage: `url(${img})` }
    // }
    let img = ''
    switch (type) {
      case 1:
        img = require('~/img/phone_header.png')
        return { backgroundImage: `url(${img})` }
      default:
        break
    }
  }
}
