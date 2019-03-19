<template>
  <div class="sysNotice_main_body">
    <publicHead :title="funcName"
                :type="5"></publicHead>
    <div class="sysNotice_main_content">
      <div class="long_line"></div>
      <div class="notice_box"
           v-for="(item, index) in allData"
           :key="index">
        <img src="../../../img/shouye/system_notice.png"
             alt="">
        <div class="notice_bord">
          <div class="notice_up">
            <p>系统公告</p>
            <p style="word-break: break-all;"
               v-html="decodeEvent(item.content)">{{}}</p>
          </div>
          <p class="notice_down"> [ 系统公告 ] {{formatDate(item.send_time)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import publicHead from "../../huiYuan/components/moreService/publicHead";
import decodeEvent from "../decode";
export default {
  components: {
    publicHead
  },
  data() {
    return {
      funcName: "系统公告",
      allData: []
    };
  },
  mixins: [decodeEvent],
  activated() {
    this.$nextTick(() => {
      const _this = document.getElementsByClassName("long_line")[0],
        _that = document.getElementsByClassName("sysNotice_main_content")[0],
        _it = document.getElementsByClassName("personal_center_head")[0];
      if (_that.clientHeight < window.innerHeight - _it.clientHeight) {
        _this.style.height = window.innerHeight - _it.clientHeight + "px";
      } else {
        _this.style.height = _that.clientHeight + "px";
      }
    });
    this.allData = this.$route.params.message;
  },
  methods: {
    formatDate(t) {
      const date = new Date(t * 1000);
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let minute = date.getMinutes();
      let second = date.getSeconds();
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.sysNotice_main_body {
  .sysNotice_main_content {
    height: auto;
    position: relative;
    .long_line {
      position: absolute;
      left: poTorem(50px);
      top: 0;
      height: 100%;
      width: 0;
      border: poTorem(1px) solid #d5d5d5;
    }
    .notice_box {
      width: 100%;
      position: relative;
      padding: poTorem(10px) poTorem(20px) 0 0;
      text-align: right;
      img {
        width: poTorem(40px);
        height: poTorem(40px);
        position: absolute;
        left: poTorem(30px);
        top: 30%;
      }
      .notice_bord {
        text-align: left;
        display: inline-block;
        width: 80%;
        // height: poTorem(147px);
        border: poTorem(1px) solid #d4d4d4;
        border-radius: poTorem(4px);
        background-color: #fff;
        .notice_up {
          padding: poTorem(10px);
          > p {
            &:first-child {
              color: #e12626;
              font-size: poTorem(15px);
            }
            &:last-child {
              font-size: poTorem(13px);
              color: #1e1e1e;
              word-wrap: break-word;
            }
          }
        }
        .notice_down {
          padding: poTorem(10px);
          border-top: poTorem(1px) solid #d4d4d4;
        }
      }
    }
  }
}
</style>


