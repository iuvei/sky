<template>
  <div>
    <keep-alive>
      <router-view class="red_route"></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'red-index',
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.red_route {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>


