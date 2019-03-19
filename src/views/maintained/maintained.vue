<template>
  <div class="maintained_main_body">
    <div class="maintained_head">系统维护</div>
    <div class="maintained_main_content">
      <p>预计升级维护时间为</p>
      <p>
        <span>{{maintained.data.btime}}</span></br>
        <span>至</span></br>
        <span>{{maintained.data.etime}}</span></br>
      </p>
      <p>
        <!-- <a href="javaScript:void(0)" -->
        <a :href="sysinfo.data.service_url">联系客服</a>
        <!-- @click="openbigwin">联系客服</a> -->
      </p>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      maintainedTime: "22:00~6:00"
    };
  },
  computed: {
    ...mapState(["maintained", "sysinfo"])
  },
  methods: {
    ...mapActions(["getServiceUrl"]),
    async openbigwin() {
      const url = await this.getServiceUrl();
      window.location.href = url;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../css/resources.scss";
.maintained_main_body {
  padding: 0;
  height: 100%;
  @include column;
  .maintained_head {
    height: 3rem;
    width: 100%;
    background-color: $mainColor;
    line-height: 3rem;
    font-size: 1.25rem;
    color: #fff;
    text-align: center;
    font-weight: 600;
  }
  .maintained_main_content {
    width: 100%;
    flex: 1;
    background: url(~img/maintained_clock.png) no-repeat center -1rem,
      url(~img/maintained_bg.jpg) no-repeat left top;
    background-size: 100%, 100% 100%;
    @include column;
    justify-content: flex-end;
    p {
      font-size: poTorem(24px);
      height: 3rem;
      line-height: 3rem;
      &:nth-child(n-2) {
        color: $mainColor;
      }
      &:nth-child(2) {
        height: auto;
        text-align: center;
      }
      &:nth-child(3) {
        color: #fff;
        background-color: #00b8ee;
        border-radius: 2rem;
        padding: 0 2rem;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>


