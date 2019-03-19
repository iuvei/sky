<template>
  <div class="downloadApp_main_body">
    <publicHead :title="funcName"></publicHead>
    <div class="content">
      <div class="box">
        <img src="../../../../img/downloadApp/appIcon.png"
             alt="">
      </div>
      <div class="box">
        <p>下载好彩彩票APP</p>
        <p>已有1000000用户选择安装，感谢信任！</p>
      </div>
      <div class="box">
        <div class="select_sys">
          <span>
            <img src="../../../../img/downloadApp/IOS.png"
                 alt="">
          </span>
          <a href="https://itunes.apple.com/cn/app/id1331282994">点击下载IOS版</a>
        </div>
        <div class="select_sys">
          <span>
            <img src="../../../../img/downloadApp/android.png"
                 alt="">
          </span>
          <a href="http://appandroid.0567x.com/haocaiaa.apk">点击下载Android版</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import publicHead from "../moreService/publicHead";
export default {
  components: {
    publicHead
  },
  data() {
    return {
      funcName: "APP下载"
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.downloadApp_main_body {
  background-color: #fff;
  height: 100%;
  .content {
    padding-top: poTorem(64px);
    .box {
      width: 100%;
      text-align: center;
      margin-bottom: poTorem(20px);
      p {
        width: 100%;
        &:first-child {
          letter-spacing: poTorem(2px);
          font-size: 1.17rem;
          color: #333;
          font-weight: 900;
          height: poTorem(26px);
          line-height: poTorem(26px);
        }
        &:last-child {
          letter-spacing: poTorem(1px);
          font-size: 0.85rem;
          color: #999;
          font-weight: 700;
          height: poTorem(19px);
          line-height: poTorem(19px);
        }
      }
      .select_sys {
        margin: auto;
        width: poTorem(253px);
        height: poTorem(61px);
        border: 1px solid #d8d6e2;
        border-radius: poTorem(5px);
        margin-bottom: poTorem(20px);
        text-align: left;
        span {
          text-align: center;
          display: inline-block;
          &:first-child {
            width: poTorem(60px);
            height: poTorem(59px);
            border-right: 1px solid #d8e6e2;
            img {
              width: poTorem(40px);
              height: poTorem(40px);
              margin-top: poTorem(10px);
            }
          }
        }
        a {
          text-align: center;
          width: poTorem(190px);
          line-height: poTorem(59px);
          float: right;
          font-size: 1rem;
          font-weight: 700;
        }
      }
    }
  }
}
</style>


