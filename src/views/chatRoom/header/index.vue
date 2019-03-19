<template>
  <div class='top'>
    <TopHeader></TopHeader>
    <TagCountDown></TagCountDown>
  </div>
</template>
<script>
import TopHeader from "./header";
import TagCountDown from "../components/header";
export default {
  name: "ChatTop",
  components: {
    TopHeader,
    TagCountDown
  }
};
</script>
<style lang='scss' scoped>
.top {
  position: absolute;
  top: 0;
  width: 25.875rem;
}
</style>