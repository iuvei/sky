<template>
  <div class='system'>
    <div class="info">
      {{item.msg}}
    </div>
  </div>
</template>
<script>
export default {
  name: "warning",
  props: ["item"]
};
</script>
<style lang='scss' scoped>
.system {
  .info {
    margin-left: 1.875rem;
    margin-right: 1.875rem;
    padding: 0.5rem 0.9375rem;
    background: #e6e6e6;
    border-radius: 0.25rem 0.25rem 0.25rem 0.125rem;
    color: red;
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