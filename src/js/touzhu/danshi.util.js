export default {
  isSingleMode(jstag, playid) {
    // 时时彩
    if (
      jstag === 'ssc' &&
      [
        2,
        4,
        6,
        11,
        13,
        20,
        25,
        27,
        34,
        38,
        58,
        61,
        64,
        67,
        69,
        73,
        95,
        102,
        107,
        109,
        116,
        120
      ].includes(playid)
    ) { return true } else if (jstag === 'pk10' && [3, 5].includes(playid)) {
      return true
    } else if (jstag === '3d' && [2].includes(playid)) {
      return true
    } else if (
      jstag === '11x5' &&
      [2, 4, 7, 9, 12, 14, 17, 19, 22, 24, 38, 39, 40, 41, 42, 43, 44].includes(
        playid
      )
    ) {
      return true
    }

    return false
  }
}
