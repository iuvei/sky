<template>
  <div class="personalMessageInfo_main_body">
    <publicHead :title="funcName"
                :type="5"></publicHead>
    <h5>{{allData.title}}</h5>
    <span>{{sendTime(allData.sendtime)}}</span>
    <p>{{allData.content}}</p>
  </div>
</template>
<script>
import publicHead from "./publicHead";
export default {
  components: {
    publicHead
  },
  data() {
    return {
      funcName: "消息详情",
      allData: ""
    };
  },
  activated() {
    if (this.$route.params.title) {
      this.allData = this.$route.params;
    }
    console.log(this.allData);
  },
  methods: {
    sendTime(j) {
      const timestamp = j * 1000;
      const assignTime = new Date(timestamp),
        y = assignTime.getFullYear(),
        M = assignTime.getMonth() + 1,
        d = assignTime.getDate(),
        h = assignTime.getHours(),
        m = assignTime.getMinutes(),
        s = assignTime.getSeconds(),
        add0 = m => m > 9 ? m : "0" + m;
      return (
        y +
        "-" +
        add0(M) +
        "-" +
        add0(d) +
        " " +
        add0(h) +
        ":" +
        add0(m) +
        ":" +
        add0(s)
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.personalMessageInfo_main_body {
  // padding: 1rem;
  height: 100%;
  background-color: #f2f2f2;
  h5 {
    font-size: 1.1rem;
    line-height: 2rem;
    text-align: center;
  }
  span {
    display: block;
    font-size: 0.8rem;
    line-height: 1.5rem;
    text-align: center;
  }
  p {
    font-size: 1.1rem;
    line-height: 2rem;
    margin-top: 1rem;
    text-indent: 2em;
    word-break: normal;
    white-space: pre-wrap;
    word-wrap: break-word;
    padding: 0 1rem;
  }
}
</style>


