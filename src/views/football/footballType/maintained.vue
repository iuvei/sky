<template>
  <div class="maintained_main_body">
    <div class="maintained_main_content">
      <div style="text-align:center">
        <img src="~img/football/maintained.png" alt="" style="width:80%">
      </div>
      <div class="p1">抱歉！系统正在维护，暂停下注！如有什么疑问请联系客服！</div>
      <div class="p2">
        预计维护时间:
        <span>{{maintained.data && maintained.data.maintenance_time}}</span>
      </div>

      <!-- <p>
        <a :href="sysinfo.service_url">联系客服</a>
      </p> -->
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("football", ["maintained", "sysinfo"])
  }
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.maintained_main_body {
  padding: 0;
  height: 100%;
  // @include column;
  .maintained_main_content {
    width: 100%;
    flex: 1;
    padding: 1rem 0;
    background-size: 100%;
    // @include column;
    justify-content: start;
    align-items: left;
    .p1 {
      font-size: poTorem(20px);
      line-height: 2rem;
      color: #666666;
      padding: 0.5rem 1rem;
    }
    .p2 {
      padding: 0.5rem 1rem;
      font-size: poTorem(20px);
      line-height: 2rem;
      span {
        color: #ff7c34;
      }
    }
  }
}
</style>


