import { to } from '~/js/functions'
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['flushPrice']),
    ...mapActions('youxi', ['modifyField']),
    // 方法一: 先获取电子游戏登录链接,再弹出窗口登录
    async wxts(gmurl) {
      // 区别首页进入游戏还是平台进入游戏
      // if (this.shibie === 1) {
      //   window.open(this.gmurl, '_blank', 'width:100%;height:100%;')
      //   this.$dialog.confirm({
      //     title: '<p>温馨提示:</p>',
      //     mes:
      //       '<p style="margin-top: 5px;">确定退出游戏</p><p style="color:red;margin-top: 15px;font-size: 13px">注:如未出现游戏窗口,请检查是否设置了拦截弹窗!</p>',
      //     opts: [
      //       {
      //         txt: '确定',
      //         color: true,
      //         callback: () => {
      //           this.flushPrice({ click: 1 })
      //           this.$dialog.toast({
      //             mes: '已退出游戏,并刷新余额',
      //             timeout: 900
      //           })
      //         }
      //       }
      //     ]
      //   })
      // } else {
      // 担心用户不会设置 (浏览器默认拦截弹出式窗口),所以添加这个弹窗点击直接登录
      this.$dialog.confirm({
        title: '<p>温馨提示:</p>',
        mes:
          '<p>点击确定按钮将跳转游戏</p><p style="color:red;margin-top: 15px;font-size: 13px">注:捕鱼类游戏可能需要手动刷新金额</p>',
        opts: [
          {
            txt: '取消',
            color: false,
            callback: () => {}
          },
          {
            txt: '确定',
            color: true,
            callback: () => {
              window.open(gmurl, '_blank', 'width:100%;height:100%;')
            }
          }
        ]
      })
      // }
    },
    async toOpenTry(item, tag) {
      this.$dialog.loading.open(' ')
      tag = item.tag || tag
      this.modifyField({ forceTag: tag })
      const [err, gmurl] = await to(
        this.$ajax('request', {
          ac: 'GetWebGameUrl',
          gameid: item.id ? item.id : item.gameid,
          tag
        })
      )
      this.$dialog.loading.close()
      if (err) {
        return
      }
      if (gmurl) {
        this.gmurl = gmurl
        this.shibie = item.shibie || ''
        await this.wxts(this.gmurl)
      }
    }

    // 方法二: 先弹出空链接窗口,再去获取链接替换进去
    // async toOpenTry(item, tag) {
    //   const newWin = window.open('', '_blank', 'width:100%;height:100%;')
    //   this.gmurl = await this.$ajax('request', {
    //     ac: 'GetWebGameUrl',
    //     gameid: item.id ? item.id : item.gameid,
    //     tag
    //   })
    //   if (this.gmurl) {
    //     console.error('this.gmurls', this.gmurl)
    //     newWin.location.href = this.gmurl
    //   } else {
    //     this.$dialog.alert({ mes: '游戏不存在!' })
    //   }
    // }
  }
}
