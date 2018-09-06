export default{
  methods: {
        // 电子游戏试玩/获取游戏链接
    async toOpenTry(item, tag) {
      this.gmurl = await this.$ajax('request', {
        ac: 'GetWebGameUrl',
        gameid: item.id ? item.id : item.gameid,
        tag
      })
      if (this.gmurl) {
        window.open(this.gmurl, '_blank', 'width:100%;height:100%;')
        this.$dialog.confirm({
          title: ' ',
          mes: '确认退出游戏？',
          opts: [
            {
              txt: '确定',
              color: true,
              callback: () => {
                this.$ajax('request', {
                  ac: 'flushPrice',
                  click: 1
                })
                this.$dialog.toast({ mes: '退出游戏成功', timeout: 500 })
              }
            }
          ]
        })
      } else {
        this.$dialog.alert({ mes: '游戏不存在！' })
      }
    }
  }
}