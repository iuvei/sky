<template>
  <div class="head-box">
    <img class="head-bg"
         src="../../img/grabhongbao/hbhead.jpg"
         alt="">
    <a href="javascript:void(0)"
       @click="goBack()"
       class="back-icon"><img src="../../img/shouye/back.png"
           alt=""></a>
    <div class="title">{{tit}}</div>
    <div style="width:4rem;"
         class="principle"><i v-show="isRule"
         @click="goRule()">规则</i></div>
  </div>
</template>
<script>
export default {
  name: "grabHead",
  props: ["tit", "isRule"],
  data() {
    return {
      isrule: true
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    goRule() {
      this.$router.push("/grabhb/grabhbrule");
      this.isrule = false;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../css/resources.scss";
.head-box {
  position: relative;
  .head-bg {
    display: inline-block;
    width: 100%;
    position: absolute;
    z-index: -100;
  }
  width: 100%;
  display: flex;
  height: poTorem(83px);
  justify-content: space-between;
  align-items: center;
  font-size: poTorem(20px);
  color: #fff;
  .back-icon {
    width: poTorem(45px);
    height: poTorem(25px);
    display: flex;
    justify-content: center;
    img {
      width: poTorem(25px);
    }
  }
  .principle {
    text-align: center;
    display: flex;
    justify-content: center;
  }
}
</style>

