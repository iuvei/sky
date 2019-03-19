<template>
  <div class="forbidden_page">
    <div class="head">
      <img :src="iconUrl"
           alt="">
    </div>
    <div class="body">
      <div class="up">
        <img src="../../img/weizhi.png"
             alt="">
      </div>
      <p>非常抱歉给您带来了不便··</p>
      <p>由于您的IP所在地不在我们的服务区范围内</p>
      <p>我们暂时无法为您服务</p>
      <p>如有误判，请点击联系在线客服，谢谢！</p>
      <div class="btn">
        <p>
          <img src="../../img/kefu.png"
               alt="">
          <a href="#"
             @click="openbigwin">在线客服</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "forbiddenPage",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      serviceUrl: state => state.sysinfo.service_url,
      iconUrl: state => state.sysinfo.phone_logo
    })
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
.forbidden_page {
  .head {
    height: poTorem(48px);
    background: url(~img/phone_header.png) no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    img {
      height: 100%;
    }
  }
  .body {
    padding: 3rem;
    .up {
      display: flex;
      justify-content: center;
      img {
        height: 10rem;
      }
    }
    > p {
      text-align: center;
      font-size: 0.9rem;
      color: #8a8a8a;
      font-weight: 500;
      line-height: poTorem(24px);
      &:nth-child(2) {
        font-size: 1.2rem;
        color: #d81616;
        margin: 1rem;
      }
      &:nth-child(5) {
        padding-bottom: 1.5rem;
        margin-bottom: 2.5rem;
        border-bottom: poTorem(1px) solid #ddd;
      }
    }
    .btn {
      width: 100%;
      display: flex;
      justify-content: center;
      > p {
        line-height: 3rem;
        width: 90%;
        border: poTorem(1px) solid #d81616;
        border-radius: poTorem(10px);
        background-color: #faeae7;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: poTorem(30px);
          margin-right: 1rem;
        }
        a {
          color: #d81616;
          font-size: 1.2rem;
        }
      }
    }
  }
}
</style>

