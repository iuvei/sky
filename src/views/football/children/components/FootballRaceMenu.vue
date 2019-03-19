<template>
  <div class="race-menu">
    <div class="left"
         @click="left"></div>
    <div class="date">{{unixStamp.format('yyyy-MM-dd')}} {{unixStamp.format('W')}}</div>
    <div class="right"
         @click="right"></div>
  </div>
</template>
<script>
export default {
  name: "FootballRaceMenu",
  props: ["unixStamp"],
  data() {
    return {};
  },
  computed: {},

  methods: {
    left() {
      this.$emit(
        "date",
        new Date(this.unixStamp.setDate(this.unixStamp.getDate() - 1))
      );
    },
    right() {
      if (
        new Date(new Date().format("yyyy-MM-dd")).getTime() <
        new Date(this.unixStamp).getTime()
      ) {
        return "";
      }
      this.$emit(
        "date",
        new Date(this.unixStamp.setDate(this.unixStamp.getDate() + 1))
      );
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.race-menu {
  @include around;
  .date {
    font-size: poTorem(18px);
    color: #313131;
  }
  .left,
  .right {
    flex-basis: poTorem(50px);
    text-align: center;
  }
  .left {
    text-align: right;
    &::after {
      display: inline-block;
      content: " ";
      height: poTorem(15px);
      width: poTorem(15px);
      transform: rotate(135deg);
      background: transparent;
      border-right: 2px solid #313131;
      border-bottom: 2px solid #313131;
    }
  }
  .right {
    text-align: left;
    &::after {
      display: inline-block;
      content: " ";
      height: poTorem(15px);
      width: poTorem(15px);
      transform: rotate(-45deg);
      background: transparent;
      border-right: 2px solid #313131;
      border-bottom: 2px solid #313131;
    }
  }
}
</style>



