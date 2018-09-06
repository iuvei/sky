/** 获取单日日期 0或不传为今天 -1为昨天*/
function getDate(dates) {
  const dd = new Date()
  const n = dates || 0
  dd.setDate(dd.getDate() + n)
  const y = dd.getFullYear()
  let m = dd.getMonth() + 1
  let d = dd.getDate()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  const day = y + '-' + m + '-' + d
  return day
}
/** 获取一周起始日 s为开始 e为结束 0或不传为本周 -1为上周*/
function getMonday(type, dates) {
  const now = new Date()
  const nowTime = now.getTime()
  let day = now.getDay()
  const longTime = 24 * 60 * 60 * 1000
  const n = longTime * 7 * (dates || 0)
  let dd
  if (type === 's') {
    dd = nowTime - (day - 1) * longTime + n
  }
  if (type === 'e') {
    dd = nowTime + (7 - day) * longTime + n
  }
  dd = new Date(dd)
  const y = dd.getFullYear()
  let m = dd.getMonth() + 1
  let d = dd.getDate()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  day = y + '-' + m + '-' + d
  return day
}
/** 获取一月起始日 s为开始 e为结束 0或不传为本月 -1为上月 */
function getMonth(type, months) {
  const d = new Date()
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  if (Math.abs(months) > 12) {
    months = months % 12
  }
  if (months) {
    if (month + months > 12) {
      year++
      month = (month + months) % 12
    } else if (month + months < 1) {
      year--
      month = 12 + month + months
    } else {
      month = month + months
    }
  }
  month = month < 10 ? '0' + month : month
  // const date = d.getDate()
  const firstday = year + '-' + month + '-01'
  let lastday = ''
  if (month === '01' || month === '03' || month === '05' || month === '07' || month === '08' || month === '10' || month === '12') {
    lastday = year + '-' + month + '-' + 31
  } else if (month === '02') {
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
      lastday = year + '-' + month + '-' + 29
    } else {
      lastday = year + '-' + month + '-' + 28
    }
  } else {
    lastday = year + '-' + month + '-' + 30
  }
  let day = ''
  if (type === 's') {
    day = firstday
  } else {
    day = lastday
  }
  return day
}
export { getDate, getMonday, getMonth }