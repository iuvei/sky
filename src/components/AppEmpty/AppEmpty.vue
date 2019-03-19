<template>
  <div class="empty">
    <img src="~img/bet_record/noRecords.png" alt="">
    <p>暂无记录</p>
    <slot name="other"></slot>
  </div>
</template>

<script>
export default {
  name: "AppEmpty"
};
</script>

<style lang="scss" scoped>
.empty {
  text-align: center;
  padding-top: 50%;
  // height: 100%;
  // padding-bottom: 40%;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  img {
    width: 7rem;
  }
  p {
    font-size: 1rem;
    height: 1rem;
    line-height: 1rem;
    color: #bfbfbf;
    font-weight: 700;
  }
}
</style>


