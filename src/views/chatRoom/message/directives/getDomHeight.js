export default {
  componentUpdated(el, { value }, vnode, oldVnode) {
    if (vnode.children.length === oldVnode.children.length) {
      return
    }
    console.log(vnode.children[0])
    if (value.lock) {
      let height = 0
      const arr = vnode.children.map(item => {
        height += item.elm.clientHeight
        return height
      })
      value.fn(arr)
    }
  }
}
