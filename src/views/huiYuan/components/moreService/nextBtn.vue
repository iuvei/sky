<template>
  <div>
    <p class="next_step" v-show="nextBtnIsShow">下一步</p>
  
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.next_step {
  width: 100%;
  background-color: #ff7c34;
  font-size: poTorem(18px);
  color: #fff;
  text-align: center;
  height: poTorem(48px);
  line-height: poTorem(48px);
  position: absolute;
  bottom: 0;
}
</style>


