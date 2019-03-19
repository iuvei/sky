<template>
  <i @click="click">{{second}}</i>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "FootballTime",
  data() {
    return {
      second: 30,
      timer: 0,
      lockMark: false,
      a: 2
    };
  },
  computed: {
    ...mapState("football", ["timeCount"])
  },
  methods: {
    ...mapActions("football", ["queryComputed"]),
    click() {
      if (this.timer) {
        this.lockMark = true;
        this.second = this.timeCount.second;
        this.queryComputed(["getData"]);
        return;
      }
      this.timeStart();
    },
    timeStart() {
      this.second = this.timeCount.second;
      if (this.timer) return;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.lockMark) return;
        if (this.second === 0) {
          this.lockMark = true;
          this.queryComputed(["getData"]);
          this.second = 0;
          // this.second = this.timeCount.second;
        } else {
          this.second--;
        }
      }, 1000);
    }
  },
  activated() {
    this.timeStart();
  },
  deactivated() {
    clearInterval(this.timer);
    this.timer = 0;
    // this.timer = clearInterval(this.timer);
  },
  mounted() {
    this.click();
  },
  watch: {
    "timeCount.reset"() {
      this.lockMark = false;
      this.second = this.timeCount.second;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>


