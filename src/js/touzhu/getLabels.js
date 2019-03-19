const getLabels = function(
  dataSet,
  spliter = ',',
  needLabel = false,
  mulitLine = false
) {
  let arr = [],
    str = ''
  dataSet.forEach(x => {
    const balls = x.data.filter(y => y.checked)
    if (balls.length) {
      // 显示label
      if (needLabel) {
        if (!mulitLine) {
          // 单行
          str += `${x.name.split('|')[0]}(${balls
            .map(z => z.name)
            .join(spliter)})`
        } else {
          // 多行
          // debugger
          arr = arr.concat(balls.map(z => `${x.name.split('|')[0]}(${z.name})`))
        }
      } else {
        // 不显示label
        if (!mulitLine) {
          // 单行
          str += `${balls.map(z => z.name).join(spliter)},`
        } else {
          arr = arr.concat(balls.map(z => z.name))
        }
      }
    }
  })
  if (str.length) {
    arr.push(str.endsWith(',') ? str.substring(0, str.length - 1) : str)
  }
  return arr
}

const getMultiLineLabels = function(dataSet) {
  const arr = []
  dataSet.forEach(x => {
    const balls = x.data.filter(y => y.checked)
    if (balls.length) {
      arr.push(`${x.name.split('|')[0]}(${balls.map(z => z.name).join(',')})`)
    }
  })
  return arr
}

// 单式
const getDanshiLabels = function(str) {
  return str.split(',').map(x => `号码(${x})`)
}

export default {
  getLabels,
  getMultiLineLabels,
  getDanshiLabels
}
