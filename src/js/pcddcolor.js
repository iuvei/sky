// pcdd号码转颜色
function BallToColorpcdd(_ball) {
  switch (parseInt(_ball)) {
    case 3:
    case 6:
    case 9:
    case 12:
    case 15:
    case 18:
    case 21:
    case 24:
      return '#e33939'
    case 2:
    case 5:
    case 8:
    case 11:
    case 17:
    case 20:
    case 23:
    case 26:
      return '#00a0e9'
    case 0:
    case 13:
    case 14:
    case 27:
      return '#707070'
    default:
      return '#32b16c'
  }
}
export { BallToColorpcdd }
