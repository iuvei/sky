<template>
  <div class="youxi">
    <heads></heads>
  </div>
</template>
<script>
import heads from "./heads";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      data: []
    };
  },
  components: {
    heads
  },
  // beforeRouteLeave(to, from, next) {
  //   this.$dialog.confirm({
  //     title: '<p>温馨提示:</p>',
  //     mes: '<p style="color: #e33939">确认退出游戏？</p>',
  //     opts: [
  //       {
  //         txt: '取消',
  //         color: false,
  //         callback: () => {
  //           next(false)
  //         }
  //       },
  //       {
  //         txt: '确定',
  //         color: true,
  //         callback: () => {
  //           // this.flushPrice({click: 1})
  //           this.$dialog.toast({
  //             mes: '退出游戏成功',
  //             timeout: 500
  //           })
  //           next()
  //         }
  //       }
  //     ]
  //   })
  // },
  deactivated() {
    this.modifyField({ forceTag: "" });
  },
  methods: {
    ...mapActions("youxi", ["modifyField"]),
    ...mapActions(["flushPrice"])
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.youxi {
  width: 100%;
  height: 100%;
}
</style>
