<template>
  <div class='msg-read-new'>
    <div class="num">{{num}}</div>
    <div class="icon">
    </div>
  </div>
</template>
<script>
export default {
  name: "MsgReadNew",
  props: ["num"]
};
</script>
<style lang='scss' scoped>
.msg-read-new {
  position: fixed;
  z-index: 10;
  top: -4.125rem;
  right: 1.25rem;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.5rem;
    width: 1.5rem;
    border: 0.0625rem solid #d7d7d6;
    border-radius: 50%;
  }
  .num {
    position: relative;
    top: 10px;
    background-color: #ff7c34;
    color: #fff;
    z-index: 100;
  }
  .icon {
    position: relative;
    border: 0.0625rem solid #d7d7d6;
    background-color: #fff;
    &::before {
      content: " ";
      display: block;
      position: absolute;
      height: 0.625rem;
      width: 0.625rem;
      top: 0.9375rem;
      transform: rotate(45deg);
      top: 0.3125rem;
      background-color: #fff;
      border-right: 0.01rem solid #69b6db;
      border-bottom: 0.01rem solid #69b6db;
    }
  }
}
</style>