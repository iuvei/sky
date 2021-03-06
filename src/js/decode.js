const decodeEvent = (str, key = '0') => {
  const valArr = str.split(''),
    keyArr = key.split('') // 固定‘0’
  if (valArr.length % 2 !== 0) {
    return ''
  }
  const tempArr = valArr.map(item => parseInt(item, 16))
  const resArr = []
  for (let i = 0; i < tempArr.length; i += 2) {
    resArr.push((tempArr[i] << 4) | tempArr[i + 1])
  }
  for (let i = 0; i < resArr.length; i++) {
    for (let j = keyArr.length - 1; j >= 0; j--) {
      // console.log(resArr[i])
      resArr[i] = resArr[i] ^ keyArr[j].charCodeAt()
    }
  }
  const final = resArr.map(item => String.fromCharCode(item))
  return final.join('')
}
export default decodeEvent
