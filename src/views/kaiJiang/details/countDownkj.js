import api from '../../../../api/betting';
export default {
  data() {
    return {
      openless: 0
    };
  },
  methods: {
    // 获取历史
    async getHistory(tag) {
      const prevData = await api.getHistoryOpen(tag);
      if (prevData && Array.isArray(prevData) && prevData.length) {
        this.balls =
          prevData[0].balls && prevData[0].balls.length
            ? prevData[0].balls.split('+')
            : [];
        this.nexts = prevData;
      }
    },
    // 获取开奖倒计时时间
    async getOpened(tag) {
      const nextData = await api.getNextStop(tag);
      if (nextData && Array.isArray(nextData) && nextData.length) {
        this.nexts = nextData[0].next;
        this.setQishu(this.nexts[0].qishu);
        this.openless = nextData[0].next[0].openless;
        this.$nextTick(() => {
          clearInterval(this.$refs.openless.timer);
          this.$refs.openless.run();
        });
        if (nextData[0].next[0].openless > 0) {
          this.closeIsShow = true;
        }
      }
    },
    // 完成后
    _openCallback() {
      clearInterval(this.resTimer);
      this.balls = [];
      // 需要可以立即开奖
      this.getHistory(this.routeLists.name_tag).then(() => {
        if (!this.balls.length) {
          this.resTimer = setInterval(() => {
            this.getHistory(this.routeLists.name_tag).then(() => {
              if (this.balls.length) {
                clearInterval(this.resTimer);
              }
            });
          }, 5000);
        }
      });
      this.getOpened(this.routeLists.name_tag);
    }
  }
};
