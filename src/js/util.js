/**
 * 当路由参数丢失时从存储找回并重新设置
 * @param {object} vueInstance 当前组件上的vue实例
 * @param {string} js_tag 当前组件的彩种
 */
const resetRouteParams = (vueInstance, js_tag) => {
  const routeCache = localStorage.getItem('otherwise')
  const params = JSON.parse(routeCache)
  if (vueInstance.$route.params.hasOwnProperty('js_tag')) {
    vueInstance.routeLists = vueInstance.$route.params
    localStorage.setItem('otherwise', JSON.stringify(vueInstance.routeLists))
  } else {
    if (!params || params.js_tag !== js_tag) {
      vueInstance.$router.push('/home')
    } else {
      vueInstance.routeLists = params
    }
  }
}

// const formatBetData = (wanfa, data, template, source, peilvs = []) => {
//   // 如果是单行单赔率
//   // 如果是单行多赔率
//   if (template && template.length && Array.isArray(template)) {
//     // 对照数据和模板取出模板值
//     // data.forEach((item,index)=>{
//     //   if(template.indexOf())
//     // })
//     // 对照赔率取出赔率值
//   }
//   // 如果是多行单赔率

//   return {
//     wanfa,
//     values: data,
//     labels: [],
//     peilvs: []
//   }
// }

const getMaxPeilv = peilvs => {
  if (peilvs && peilvs.length) {
    if (peilvs.includes('|')) {
      return Math.max(...peilvs.split('|'))
    } else {
      return peilvs
    }
  }
  return peilvs
}

export { resetRouteParams, getMaxPeilv }
