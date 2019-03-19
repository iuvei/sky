const getDwdArr = arr => {
  // 所有的定位胆都需要单独计算一个位置参数
  // 只要当前行有值，就取当前行的2次方数，和即为位置数组
  let c = 0
  arr.forEach((x, i) => {
    if (x.length) {
      c += Math.pow(2, i)
    }
  })
  return [c.toString()].concat(arr.filter(x => x.length))
}
export default getDwdArr
