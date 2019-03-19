<template>
  <div class="recommand_box">
    <publicHead :title="funcName"
                :type="5"></publicHead>
    <div class="recommand">
      <div class="download_box">
        <span class="downaddr">下载地址</span>
        <span class="link">http://upload.bxvip588.com/sg04/Uploads/qrcode/fa5be9091f631c3a5dbc7cad2a3e86f7.png</span>
        <button v-clipboard:copy="'http://upload.bxvip588.com/sg04/Uploads/qrcode/fa5be9091f631c3a5dbc7cad2a3e86f7.png'"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError">复制</button>
      </div>
      <div class="fenxiang_box social-share">
        <div class="qq_btn"
             @click="shareToqq()">
          <img src="../../../../../src/img/more_settings/QQ.png"
               alt="">
          <div class="share_content">
            <p>复制下载链接，</p>
            <p>并打开QQ推送给好友</p>
          </div>
        </div>
        <div class="weixin_btn"
             @click="shareToWx()">
          <img src="../../../../../src/img/more_settings/weixin.png"
               alt="">
          <div class="social-share">
            <div class="share_content"
                 data-sites="weibo,qq,qzone,tencent">
              <p> 复制下载链接，</p>
              <p>并打开微信推送给好友</p>
            </div>
          </div>
        </div>
      </div>
      <p class="sao_tit">扫一扫，下载APP</p>
      <div class="vscode_box">
        <div class="title">
          <span class="apple">
            <img src="../../../../../src/img/more_settings/ios.png"
                 alt="">
            <span>苹果二维码</span>
          </span>
          <span class="android">
            <img src="../../../../../src/img/more_settings/android.png"
                 alt="">
            <span>安卓二维码</span>
          </span>
        </div>
        <div class="vscode">
          <span class="apple_vs"
                href="http://upload.bxvip588.com/sg04/Uploads/qrcode/fa5be9091f631c3a5dbc7cad2a3e86f7.png">
            <img src="http://upload.bxvip588.com/sg04/Uploads/qrcode/fa5be9091f631c3a5dbc7cad2a3e86f7.png"
                 alt="iphoneVscode">
          </span>
          <span class="android_vs"
                href="http://upload.bxvip588.com/sg04/Uploads/qrcode/fa5be9091f631c3a5dbc7cad2a3e86f7.png">
            <img src="http://upload.bxvip588.com/sg04/Uploads/qrcode/fa5be9091f631c3a5dbc7cad2a3e86f7.png"
                 alt="androidVscode">
          </span>
        </div>
        <div class="save_btn">
          <span class="save_andriod">
            <!-- <img src="../../../../../src/img/more_settings/save.png"> -->
            <span>长按二维码保存</span>
          </span>
          <span class="save_apple">
            <!-- <img src="../../../../../src/img/more_settings/save.png"> -->
            <span>长按二维码保存</span>
          </span>
        </div>
      </div>
      <div class="use_intro">
        <p class="tit">使用说明：</p>
        <p>1、复制下载链接转发给好友即可下载！</p>
        <p>2、分享下载链接，并打开QQ或者微信推送给好友！</p>
        <p>3、保存二维码至手机相册！</p>
      </div>
      <!-- <yd-popup v-model="show1" position="center" width="50%" height:"20%">
                    <div style="background-color:#fff;">
                        <p style="text-align: center;">
                            请您确认是否已安装此APP！
                            <yd-button @click.native="show1 = false">确认</yd-button>
                        </p>
                    </div>
                </yd-popup> -->
      <!-- <vue-qr  :logoSrc="config.logo" :text="config.value" :size="400" :margin="0"></vue-qr> -->
      <!-- <vue-qr text="Hello world!" :autoColor='true' :bgSrc="config.logo" :logoSrc="config.logo" :size="400" :margin="0" style="margin-top:30px" :dotScale="0.35"></vue-qr> -->
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
      funcName: "推荐好友",
      config: {
        value: "www.baidu.com",
        logo:
          "http://upload.bxvip588.com/sg04/Uploads/qrcode/fa5be9091f631c3a5dbc7cad2a3e86f7.png"
      }
      // show1:false
    };
  },
  mounted() {},
  methods: {
    shareToqq() {
      const share = {
        title: "aaa",
        desc: "bbb",
        share_url: "http://www.baidu.com",
        download_url: ""
      };
      // const d = new Date();
      // const t0 = d.getTime();
      const u = navigator.userAgent;
      const url_scheme =
        "//share/to_fri?src_type=web&version=1&file_type=news&share_id=1103437993&title=" +
        btoa(share.title) +
        "&thirdAppDisplayName=5o6M5LiK55CG5bel5aSn&url=" +
        btoa(share.share_url) +
        "&description=" +
        btoa(share.desc);
      if (/MicroMessenger/gi.test(u)) {
        // 引导用户在浏览器中打开
        alert("请在浏览器中打开");
        return;
      }

      if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        this.$dialog.alert({ mes: "请确认已安装此App" });
        setTimeout(() => {
          location.assign("mqqapi:" + url_scheme);
          setTimeout(() => {
            location.assign("timapi:" + url_scheme);
          }, 1000);
        }, 2000);
      } else if (u.indexOf("iPhone") > -1) {
        this.$dialog.alert({ mes: "请确认已安装此App" });
        setTimeout(() => {
          location.assign("mqqapi:" + url_scheme);
          setTimeout(() => {
            location.assign("timapi:" + url_scheme);
          }, 1000);
        }, 2000);
      }
    },

    openApp() {},

    shareToWx() {
      this.$dialog.alert({ mes: "请确认已安装此App" });
      setTimeout(() => {
        window.location.replace(
          "weixin://dl/business/?ticket=t59a2235a3662135bfb0e8f7edccc22c5#wechat_redirect#wechat_redirect"
        );
      }, 2000);
    },
    saveCode() {
      const a = document.getElementsByClassName("apple")[0];
      console.log(a);
      a.onclick();
    },
    downloadClick() {},
    onCopy() {
      this.$dialog.alert({ mes: "复制成功" });
    },

    onError(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../css/resources.scss";
@import "../../../../css/common.scss";
.recommand {
  width: 100%;
  .sao_tit {
    width: 100%;
    height: poTorem(60px);
    line-height: poTorem(60px);
    font-size: poTorem(20px);
    text-align: center;
    font-family: "SimHei";
    font-weight: bold;
    color: #000;
  }
  .vscode_box {
    width: 95%;
    margin-left: 2.5%;
    border: 1px solid #ddd;
    .title {
      height: poTorem(41px);
      line-height: poTorem(41px);
      text-align: center;
      border-bottom: 1px solid #ddd;
      font-size: poTorem(18px);
      color: #414141;
      .apple {
        float: left;
        height: poTorem(41px);
        width: 50%;
        border-right: 1px solid #ddd;
        span {
          float: right;
          height: poTorem(40px);
          line-height: poTorem(40px);
          margin-right: poTorem(30px);
        }
      }
      .android {
        float: left;
        height: poTorem(41px);
        width: 50%;
        span {
          float: right;
          height: poTorem(40px);
          line-height: poTorem(40px);
          margin-right: poTorem(30px);
        }
      }
      img {
        float: left;
        width: poTorem(30px);
        margin-top: poTorem(4px);
        margin-left: poTorem(30px);
      }
    }
    .vscode {
      width: 100%;
      height: poTorem(166px);
      line-height: poTorem(166px);
      border-bottom: 1px solid #ddd;
      .apple_vs {
        display: inline-block;
        width: 50%;
        height: 100%;
        // line-height: poTorem(166px);
        text-align: center;
        border-right: 1px solid #ddd;
        img {
          display: inline-block;
          width: poTorem(170px);
          height: poTorem(150px);
          margin-top: poTorem(10px);
        }
      }
      .android_vs {
        display: inline-block;
        width: 49%;
        height: 100%;
        // line-height: poTorem(160px);
        text-align: center;
        img {
          display: inline-block;
          width: poTorem(170px);
          height: poTorem(150px);
          margin-top: poTorem(10px);
        }
      }
    }
    .save_btn {
      height: poTorem(48px);
      line-height: poTorem(48px);
      .save_apple,
      .save_andriod {
        float: left;
        width: 50%;
        height: poTorem(48px);
        text-align: center;
        border-right: 1px solid #ddd;
        img {
          float: left;
          margin-left: poTorem(30px);
          margin-top: poTorem(10px);
          width: poTorem(30px);
        }
        span {
          display: inline-block;
          font-size: poTorem(15px);
          color: #414141;
        }
      }
      .save_apple {
        border: none;
        text-align: center;
      }
    }
  }
  .use_intro {
    width: 90%;
    margin-left: 5%;
    margin-top: poTorem(20px);
    p {
      font-size: poTorem(16px);
      color: #414141;
    }
    .tit {
      color: #000;
      font-size: poTorem(15px);
      font-weight: bold;
    }
  }
  .download_box {
    font-style: "SimHei";
    font-size: poTorem(15px);
    width: 95%;
    border: 1px solid #ddd;
    height: poTorem(40px);
    line-height: poTorem(40px);
    margin: poTorem(10px);
    .downaddr {
      float: left;
      background-color: #f3f3f3;
      width: poTorem(80px);
      height: poTorem(38px);
      line-height: poTorem(38px);
      border-right: 1px solid #ddd;
      text-align: center;
    }
    .link {
      float: left;
      // display: inline-block;
      overflow-x: hidden;
      width: poTorem(195px);
      padding-left: poTorem(10px);
    }
    button {
      display: inline-block;
      height: poTorem(23px);
      margin-left: poTorem(30px);
      line-height: poTorem(23px);
      width: poTorem(60px);
      outline: none;
      border: 1px solid $mainColor;
      border-radius: 15px;
      color: $mainColor;
    }
  }
  .fenxiang_box {
    width: 100%;
    margin-top: poTorem(15px);
    font-family: "SimHei";
    font-size: poTorem(10px);
    display: flex;
    justify-content: space-between;
    padding: 0 poTorem(10px);
    color: #fff;
    .qq_btn {
      display: inline-block;
      height: poTorem(45px);
      line-height: poTorem(45px);
      width: poTorem(190px);
      background-color: #35ace2;
      .share_content {
        width: poTorem(190px);
        height: poTrem(40px);
        padding-top: poTorem(3px);
        p {
          height: poTorem(20px);
          line-height: poTorem(20px);
          padding-left: poTorem(40px);
        }
      }
      img {
        float: left;
        height: poTorem(25px);
        margin-top: poTorem(10px);
        margin-left: poTorem(3px);
      }
    }
    .weixin_btn {
      display: inline-block;
      height: poTorem(45px);
      line-height: poTorem(45px);
      width: poTorem(190px);
      color: #fffefe;
      padding-right: poTorem(5px);
      padding-bottom: poTorem(5px);
      background-color: #47c55c;
      .share_content {
        height: poTrem(40px);
        width: poTorem(190px);
        padding-top: poTorem(3px);
        p {
          height: poTorem(20px);
          line-height: poTorem(20px);
          padding-left: poTorem(40px);
        }
      }
      img {
        float: left;
        height: poTorem(25px);
        margin-top: poTorem(10px);
        margin-left: poTorem(3px);
      }
    }
  }
}
</style>