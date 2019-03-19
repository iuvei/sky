import decode from './decode'
const Zlib = require('./inflate.min.js')

// const base64toArray = str => {
//   let c, fragment, i, op, n, v, il
//   const table = [
//     62,
//     -1,
//     -1,
//     -1,
//     63,
//     52,
//     53,
//     54,
//     55,
//     56,
//     57,
//     58,
//     59,
//     60,
//     61,
//     -1,
//     -1,
//     -1,
//     -2,
//     -1,
//     -1,
//     -1,
//     0,
//     1,
//     2,
//     3,
//     4,
//     5,
//     6,
//     7,
//     8,
//     9,
//     10,
//     11,
//     12,
//     13,
//     14,
//     15,
//     16,
//     17,
//     18,
//     19,
//     20,
//     21,
//     22,
//     23,
//     24,
//     25,
//     -1,
//     -1,
//     -1,
//     -1,
//     -1,
//     -1,
//     26,
//     27,
//     28,
//     29,
//     30,
//     31,
//     32,
//     33,
//     34,
//     35,
//     36,
//     37,
//     38,
//     39,
//     40,
//     41,
//     42,
//     43,
//     44,
//     45,
//     46,
//     47,
//     48,
//     49,
//     50,
//     51
//   ]
//   const table_length = table.length
//   const decoded = new Array((((table_length + 2) / 3) | 0) * 4)
//   c = n = op = 0

//   for (i = 0, il = str.length; i < il; ++i) {
//     v = (str.charCodeAt(i) & 0xff) - 43
//     if (v < 0 || v >= table_length) {
//       continue
//     }
//     fragment = table[v]
//     if (fragment < 0) {
//       continue
//     }
//     switch (n) {
//       case 0:
//         c = (fragment & 0x03f) << 2
//         ++n
//         break
//       case 1:
//         c |= (fragment & 0x030) >> 4
//         decoded[op++] = c
//         c = (fragment & 0x00f) << 4
//         ++n
//         break
//       case 2:
//         c |= (fragment & 0x03c) >> 2
//         decoded[op++] = c
//         c = (fragment & 0x003) << 6
//         ++n
//         break
//       case 3:
//         c |= fragment & 0x03f
//         decoded[op++] = c
//         n = 0
//     }
//   }
//   decoded.length = op

//   return decoded
// }
const stringToByteArray = str => {
  const array = new (window.Uint8Array !== undefined ? Uint8Array : Array)(
      str.length
    ),
    il = str.length
  for (let i = 0; i < il; ++i) {
    array[i] = str.charCodeAt(i) & 0xff
  }
  return array
}
const decompress = str => {
  const res = decode(str)
  const compressed = stringToByteArray(res)
  const inflate = new Zlib.Zlib.Inflate(compressed)
  const plain = inflate.decompress()
  const tempArr = Array.from(plain)
  const chunk = 8 * 1024
  let string = '',
    i
  for (i = 0; i < tempArr.length / chunk; i++) {
    string += String.fromCharCode.apply(
      null,
      tempArr.slice(i * chunk, (i + 1) * chunk)
    )
  }
  string += String.fromCharCode.apply(null, tempArr.slice(i * chunk))
  return string
  // const _str = String.fromCharCode.apply(null, plain)
  // return _str
}
export default decompress
