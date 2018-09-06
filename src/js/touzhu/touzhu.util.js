function secondsFormat(s) {
  const day = Math.floor(s / (24 * 3600))
  let hour = Math.floor((s - day * 24 * 3600) / 3600)
  let minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60)
  let second = s - day * 24 * 3600 - hour * 3600 - minute * 60
  if (day > 0 || hour > 0) {
    hour = Math.floor(s / 3600)
    minute = Math.floor((s - hour * 3600) / 60)
    second = s - hour * 3600 - minute * 60
    hour = hour < 10 ? '0' + hour : hour
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
    return [hour, minute, second]
  }
  if (day <= 0 && hour <= 0) {
    minute = Math.floor(s / 60)
    second = s - minute * 60
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
    return ['00', minute, second]
  }
}

export { secondsFormat }
