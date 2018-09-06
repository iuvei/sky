<template>
  <div>
    <keep-alive>
    <router-view class="personal_route"></router-view>
    </keep-alive>
    <!-- <p class="next_step" v-show="nextBtnIsShow">下一步</p> -->
  </div>
</template>
<script>
export default {
  name: "moreService",
  data() {
    return {
      nextBtnIsShow: true,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.personal_route {
  height: 100%;
}
</style>


