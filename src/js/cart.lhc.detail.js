import { shengxiao, wuxing, weishu, bose } from './xglhc.data.2017'

export default function getLhcCartDetail(playid, label) {
  switch (playid) {
    case 3: // 特色波
    case 19: // 七色波
      return bose[label]
    case 7: // 特肖
    case 8: // 和肖
    case 17: // 平特一肖
    case 22:
    case 23:
    case 24:
    case 25:
      return shengxiao[label]
    case 9: // 五行
      return wuxing[label]
    case 26:
    case 27:
    case 28:
    case 29:
      return weishu[label]
    default:
      return ''
  }
}
