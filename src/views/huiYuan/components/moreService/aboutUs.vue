<template>
  <div class="aboutUs_main_body">
    <publicHead :title="funcName" :type="5"></publicHead>
    <!-- <p class="version_num">版本号V1.0.3.25</p> -->
    <p class="version_num">版本号{{edition}}</p>
    <div class="qrcode_box">
      <p>官方网址：</p>
      <div class="qrcode">
        <img :src="sysinfo.aboutus_qrcode" alt="">
      </div>
      <p>扫描二维码即可分享给好友</p>
    </div>
  </div>
</template>
<script>
import publicHead from './publicHead'
import { mapState } from 'vuex'
import version from '../../../../../config/edition.json'
export default {
  components: {
    publicHead
  },
  activated() {
    console.log(version.edition)
  },
  data() {
    return {
      funcName: '关于我们'
    }
  },
  computed: {
    ...mapState(['sysinfo']),
    edition() {
      return (version && version.edition) || ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.aboutUs_main_body {
  background-color: #fff;
  .version_num {
    margin-top: poTorem(60px);
    text-align: center;
    font-size: poTorem(18px);
  }
  p {
    color: #656565;
  }
  .qrcode_box {
    padding: poTorem(40px);
    p {
      &:first-child {
        text-align: left;
      }
      &:last-child {
        text-align: center;
      }
      font-size: poTorem(15px);
    }
    .qrcode {
      text-align: center;
      margin: poTorem(40px) 0;
      img {
        width: poTorem(170px);
      }
    }
  }
}
</style>


