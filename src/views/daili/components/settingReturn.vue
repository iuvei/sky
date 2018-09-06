<template>
  <div class="settingReturn_main_body">
    <img :src="baseData.src" alt="">
    <p class="lottery_name">{{baseData.name}}</p>
    <div class="setting_box">
      <p>
        <input type="number" v-model="returnPercent" @blur="overflow">
        <span @click="reduce"></span>
        <span @click="increase"></span>
      </p>
      <p class="intro">自身返点{{baseData.percent}}可为下级设置返点0-{{baseData.percent}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["baseData"],
  data() {
    return {
      returnPercent: "",
    };
  },
  mounted() {
    this.returnPercent = this.baseData.percent;
  },
  methods: {
    increase() {
      this.returnPercent = (this.returnPercent * 10 + 1) / 10;
      if (this.returnPercent > this.baseData.percent - 0) {
        this.returnPercent = this.baseData.percent;
      } else if (this.returnPercent < 0) {
        this.returnPercent = 0;
      }
    },
    reduce() {
      this.returnPercent = (this.returnPercent * 10 - 1) / 10;
      if (this.returnPercent > this.baseData.percent - 0) {
        this.returnPercent = this.baseData.percent;
      } else if (this.returnPercent < 0) {
        this.returnPercent = 0;
      }
    },
    overflow() {
      if (this.returnPercent < 0) {
        this.returnPercent = 0;
      } else if (this.returnPercent > this.baseData.percent - 0) {
        this.returnPercent = this.baseData.percent;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.settingReturn_main_body {
  @include between;
  padding: poTorem(10px);
  border: poTorem(1px) solid #eee;
  border-radius: poTorem(5px);
  img {
    width: poTorem(53px);
    height: poTorem(53px);
  }
  .lottery_name {
    font-size: poTorem(15px);
    color: #000;
  }
  .setting_box {
    p {
      input {
        width: poTorem(100px);
        height: poTorem(33px);
        border: poTorem(1px) solid #909090;
        border-radius: poTorem(5px);
        outline: none;
        text-align: center;
      }
      span {
        display: inline-block;
        width: poTorem(48px);
        height: poTorem(33px);
        vertical-align: top;
        border: poTorem(1px) solid #eee;
        // float: right;
        &:nth-child(2) {
          background: url(../../../img/daili/orange_left.png) center center
            no-repeat;
          background-size: poTorem(20px) poTorem(20px);
          // border-right: none;
          border-top-left-radius: poTorem(5px);
          border-bottom-left-radius: poTorem(5px);
        }
        &:last-child {
          background: url(../../../img/daili/orange_right.png) center center
            no-repeat;
          background-size: poTorem(20px) poTorem(20px);
          border-top-right-radius: poTorem(5px);
          border-bottom-right-radius: poTorem(5px);
        }
      }
    }
    .intro {
      margin-top: poTorem(6px);
      font-size: poTorem(10px);
      color: #909090;
      text-align: center;
    }
  }
}
</style>


