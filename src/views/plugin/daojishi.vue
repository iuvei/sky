<template>
  <span :changeName="changeName"
        :endTime="endTime"
        :callback="callback"
        :endText="endText">
    <slot>
      {{content}}
    </slot>
  </span>
</template>
<script>
function secondsFormat(s) {
  const day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整
  let hour = Math.floor((s - day * 24 * 3600) / 3600);
  let minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
  let second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
  if (day > 0 || hour > 0) {
    hour = Math.floor(s / 3600);
    minute = Math.floor((s - hour * 3600) / 60);
    second = s - hour * 3600 - minute * 60;
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    return hour + ":" + minute + ":" + second;
  }
  if (day <= 0 && hour <= 0) {
    minute = Math.floor(s / 60);
    second = s - minute * 60;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    return "00:" + minute + ":" + second;
  }
}
export default {
  data() {
    return {
      timer: Function,
      content: "",
      arrLength: 0,
      dada: 0
    };
  },
  props: {
    endTime: {
      type: Array,
      default: ""
    },
    endText: {
      type: String,
      default: "已结束"
    },
    callback: {
      type: Function,
      default: ""
    },
    changeName: {
      type: String
    }
  },
  mounted() {
    this.countdowm(this.endTime[0].jiezhitime);
  },
  watch: {
    endTime(val) {
      clearInterval(this.timer);
      this.countdowm(val[0].jiezhitime);
    }
  },
  methods: {
    countdowm(timestamp) {
      const self = this;
      let t = timestamp;
      self.timer = setInterval(() => {
        t--;
        if (t > 0) {
          self.content = secondsFormat(t);
        } else {
          clearInterval(self.timer);
          self._callback();
        }
      }, 1000);
    },
    _callback() {
      this.countdowm(this.endTime[2].jiezhitime - this.endTime[1].jiezhitime);
    }
  }
};
</script>
<style lang="scss" scoped>
span {
  color: #f32043;
}
</style>
