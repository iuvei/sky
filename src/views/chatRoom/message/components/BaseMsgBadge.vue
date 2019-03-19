<template>
  <span class='msg-badge'>
    <slot></slot>
  </span>
</template>
<script>
export default {
  name: "BaseMsgBadge"
};
</script>
<style lang='scss' scoped>
.msg-badge {
  height: 1.25rem;
  min-width: 1.875rem;
  padding: 0.126rem 0.3125rem;
  line-height: 1rem;
  border-radius: 0.125rem;
  font-size: 0.75rem;
  background-color: #04be02;
  color: #fff;
}
.level {
  background-color: #3cc479;
  color: #fff;
}
.rate {
  background-color: #e6e6e6;
  color: #5e5e5e;
}
</style>