const danshiArr = [
  2,
  4,
  7,
  9,
  12,
  14,
  17,
  19,
  22,
  24,
  38,
  39,
  40,
  41,
  42,
  43,
  44
]

const getPlaceHolder = playid => {
  switch (playid) {
    case 2:
    case 4:
    case 7:
    case 9:
    case 12:
    case 14:
    case 40:
      return '1 2 3'

    case 17:
    case 19:
    case 22:
    case 24:
    case 39:
      return '1 2'

    case 38:
      return '1'

    case 41:
      return '1 2 3 4'

    case 42:
      return '1 2 3 4 5'

    case 43:
      return '1 2 3 4 5 6'

    case 44:
      return '1 2 3 4 5 6 7'
  }
}

export default { danshiArr, getPlaceHolder }
