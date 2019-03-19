<template>
  <div class="bad_network">
    <img src="../../../../../img/no_response.png" alt="">
    <p>亲！网络好像有问题，请检查您的网络，或重新刷新！</p>
    <button @click="refresh">刷新</button>
  </div>
</template>
<script>
  export default {
    name: 'noResponse',
    data() {
      return {

      }
    },
    methods: {
      refresh() {
        this.$emit('newRequest')
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
  .bad_network {
    height: 100%;
    background-color: #fff;
    padding: 2rem;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    text-align: center;
    img {
      width: 80%;
    }
    p {
      font-size: 1.2rem;
      color: #a6a6a6;
      padding: 2rem 0;
    }
    button {
      color: #666;
      outline: none;
      display: inline-block;
      border: poTorem(1px) solid #999;
      border-radius: poTorem(10px);
      width: poTorem(200px);
      height: poTorem(52px);
      font-size: poTorem(24px);
      line-height: poTorem(50px);
      font-weight: 500;
      text-align: center;
    }
  }
</style>

