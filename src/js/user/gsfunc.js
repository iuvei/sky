/**
 *
 * @param {any} r 校验规则
 * @param {any} v 校验的值
 * @return {boolean} true 返回error
 */
const checkField = (r, v) => {
  // 非空判断
  if (!v) return true
  // 正则判断
  if (typeof r === 'object') {
    return !r.test(v)
  }
  // 大小比较
  if (typeof r === 'string') {
    if (r.includes('{{value}}')) {
      // console.log(!eval(r.replace('{{value}}', v)))
      return !eval(r.replace('{{value}}', v))
    }
    return r !== v
  }
}

export const validate = {
  methods: {
    MixinValidate(rule, data = this) {
      // console.log(data)
      return rule.find(field => checkField(field.validator, data[field.name]))
    }
  }
}

export const getBase64 = async baseData =>
  await fetch(baseData)
    .then(res => res.blob())
    .then(blob => URL.createObjectURL(blob))

export const createImg = (b64, onsuccess, onerror) => {
  const img = new Image()
  img.onerror = onerror
  img.onload = function onload() {
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    canvas.toBlob(onsuccess)
  }

  img.src = b64
}

export const createNewB64 = (b64, onsuccess, onerror) => {
  const img = new Image()
  img.width = 200
  img.height = 200
  img.onerror = onerror
  const cvs = document.createElement('canvas')
  cvs.width = img.width
  cvs.height = img.height
  img.onload = () => {
    window.EXIF.getData(img, function() {
      const orientation = window.EXIF.getTag(this, 'Orientation')
      console.log('Orientation:' + orientation)
      const ctx = cvs.getContext('2d')
      ctx.clearRect(0, 0, 200, 200)
      // ctx.drawImage(img, 0, 0, 200, 200)
      // console.log(dataUrl)
      switch (orientation) {
        case 3:
          ctx.rotate((180 * Math.PI) / 180)
          ctx.drawImage(img, -200, -200, 200, 200)
          break
        case 6:
          ctx.rotate((90 * Math.PI) / 180)
          ctx.drawImage(img, 0, -200, 200, 200)
          break
        case 8:
          ctx.rotate((270 * Math.PI) / 180)
          ctx.drawImage(img, -200, 0, 200, 200)
          break
        case 2:
          ctx.translate(200, 0)
          ctx.scale(-1, 1)
          ctx.drawImage(img, 0, 0, 200, 200)
          break
        case 4:
          ctx.translate(200, 0)
          ctx.scale(-1, 1)
          ctx.rotate((180 * Math.PI) / 180)
          ctx.drawImage(img, -200, -200, 200, 200)
          break
        case 5:
          ctx.translate(200, 0)
          ctx.scale(-1, 1)
          ctx.rotate((90 * Math.PI) / 180)
          ctx.drawImage(img, 0, -200, 200, 200)
          break
        case 7:
          ctx.translate(200, 0)
          ctx.scale(-1, 1)
          ctx.rotate((270 * Math.PI) / 180)
          ctx.drawImage(img, -200, 0, 200, 200)
          break
        default:
          ctx.drawImage(img, 0, 0, 200, 200)
      }
      const dataUrl = cvs.toDataURL('image/jpeg', 0.6)
      onsuccess(dataUrl)
    })
  }
  img.src = b64
}
// 校验令牌，32-50位，大小写字母、数字
export const randomFormtoken = () => {
  const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-',
    tokenLen = Math.random() * 18 + 32
  let token = ''
  for (let i = 0; i < tokenLen; i++) {
    const tokenPos = Math.random() * chars.length + 1
    token += chars.charAt(tokenPos)
  }
  return token
}
