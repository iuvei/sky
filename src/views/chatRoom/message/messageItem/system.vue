<template>
  <div class='system'>
    <div class="info">
      <span class="red">【{{item.name}} {{item.qishu}} 期】</span>
      <span class="black">距离封盘时间还有{{item.stopless}}秒，请抓紧时间投注</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "system",
  props: ["item"]
};
</script>
<style lang='scss' scoped>
.system {
  .info {
    margin-left: 3.75rem;
    margin-right: 3.75rem;
    padding: 0.5rem 0.9375rem;
    background: #e6e6e6;
    border-radius: 0.25rem 0.25rem 0.25rem 0.125rem;
    font-size: 0.875rem;
  }
  .red {
    color: #e33939;
    font-weight: bold;
  }
  .black {
    color: #434343;
  }
}
</style>