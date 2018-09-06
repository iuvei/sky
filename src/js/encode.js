
const encodeStr = (str, key) => {
  const strArr = unescape(str).split(''),
    keyArr = key.split('')

  for (let i = 0; i < strArr.length; i++) {
    for (let j = 0; j < keyArr.length; j++) {
      strArr[i] =
        ((strArr[i].charCodeAt && strArr[i].charCodeAt()) || strArr[i]) ^
        keyArr[j].charCodeAt()
    }
  }
  let result = ''
  for (let i = 0; i < strArr.length; i++) {
    const c = strArr[i]
    result += c.toString(16).padStart(2, '0')
  }
  return result.toUpperCase()

  // strArr
  //   .map(x => {
  //     keyArr.map(y => {
  //       x = (typeof x === 'string' ? x.charCodeAt() : x) ^ y.charCodeAt()
  //       return y
  //     })
  //     return x.toString(16).padStart(2, '0')
  //   })
  //   .join('')
  //   .toUpperCase()
}
export default encodeStr
