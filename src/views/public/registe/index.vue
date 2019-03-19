<template>
  <div class="registe">
    <registe
      v-show="visible==0"
      @listenVal="sendVal"
    ></registe>
    <transition
      name="animate-enter"
      mode="out-in"
    >
      <demo-account v-if="visible==1"></demo-account>
    </transition>
    <transition
      name="animate-enter"
      mode="out-in"
    >
      <success v-if="visible==2"></success>
    </transition>
  </div>
</template>
<script>
import registe from "./components/registe";
import success from "./components/success";
import demoAccount from "./components/demoAccount";
export default {
  data() {
    return {
      // 0 注册页面 1试玩页面 2成功页面
      visible: 0,
      success: false
    };
  },
  watch: {
    $route: "change"
  },
  components: {
    registe,
    demoAccount,
    success
  },
  methods: {
    sendVal(type) {
      this.visible = type;
      if (type === 2) {
        setTimeout(() => {
          this.$router.push("/home");
        }, 2000);
      }
    },
    change() {
      this.visible = 0;
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (to.query.user === "guest") {
        vm.visible = 1;
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.registe {
  background-color: #fff;
  padding: 0;
  .animate-enter-enter-active {
    transition: all 0.25s ease;
  }
  .animate-enter-enter {
    transform: translateX(100%);
  }
}
</style>
