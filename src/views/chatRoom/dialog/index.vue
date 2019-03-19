<template>
  <mt-popup class="popupBox box-top"
            v-model="show"
            :close-on-masker="false"
            position="center">
    <div><img src="../../../img/chatRoom/dialog-loading.png"></div>
    <div class="txt">正在连接服务器</div>
  </mt-popup>
</template>

<script>
export default {
  name: "chatroom_more",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      show: this.value
    };
  },
  methods: {},

  watch: {
    value(val) {
      this.show = val;
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes changehovertree {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(-180deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
.popupBox {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  width: 312px;
  height: 10rem;
  padding: 1rem 0;
  background: #fff;
  border-radius: 5px;
  img {
    width: 2.9375rem;
    animation: changehovertree 2s linear infinite;
  }
  .txt {
    font-size: 1.25rem;
    color: #434343;
  }
}
</style>
