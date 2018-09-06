<template>
  <div class="addNewDomain_main_body">
    <publicHead :title="funcName" :type="5"></publicHead>
    <div class="addNewDomain_main_content">
      <yd-cell-group class="form_ipt">
        <yd-cell-item>
          <span slot="left">域名地址</span>
          <input slot="right" type="text" placeholder="请输入域名，不用带http://" v-model="domainAdd">
        </yd-cell-item>
        <yd-cell-item @click.native="invitationCodeShow=true">
          <span slot="left">邀请码</span>
          <span slot="left">{{vcode==0?'不填':'必填'}}</span>
          <img slot="right" src="../../../img/daili/arrow_down.png" alt="" class="img">
        </yd-cell-item>
        <yd-cell-item @click.native="parseIPShow=true">
          <span slot="left">IP地址</span>
          <span slot="left">{{IP}}</span>
          <img slot="right" src="../../../img/daili/arrow_down.png" alt="" class="img">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">域名备注</span>
          <input slot="right" type="text" placeholder="请输入域名备注" v-model="remark">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">验证码</span>
          <div slot="right" class="verify1">
            <div class="verify1_input">
              <input type="text" placeholder="请输入验证码" v-model="verifyNum">
            </div>
            <div class="verify1_img">
              <!-- 123 -->
              <img :src="verifyImg" alt="" @click="getVerify(randomNum())">
            </div>
          </div>
        </yd-cell-item>
      </yd-cell-group>
      <p class="btn">
        <button @click="submitData">立即添加</button>
      </p>
    </div>
    <yd-actionsheet :items="invitationCode" v-model="invitationCodeShow" class="changePeriod"></yd-actionsheet>
    <yd-actionsheet :items="parseOptions" v-model="parseIPShow" class="changePeriod"></yd-actionsheet>
  </div>
</template>
<script>
import publicHead from "../../huiYuan/components/moreService/publicHead";
import { mapActions } from "vuex";
export default {
  components: {
    publicHead,
  },
  data() {
    return {
      funcName: "添加域名",
      verifyImg: "",
      verifyNum: "",
      isShow: true,
      domainAdd: "",
      remark: "",
      vcode: "",
      IPIndex: 0,
      IP: "请选择IP地址",
      invitationCode: [
        {
          label: "不填",
          callback: () => {
            this.vcode = 0;
          },
        },
        {
          label: "必填",
          callback: () => {
            this.vcode = 1;
          },
        },
      ],
      invitationCodeShow: false,
      parseIPShow: false,
      parseOptions: [
        {
          label: "369caidns1.bxvip.com",
          callback: () => {
            this.IP = "369caidns1.bxvip.com";
            this.IPIndex = 1;
          },
        },
        {
          label: "369caidns2.bxvip.co",
          callback: () => {
            this.IP = "369caidns2.bxvip.com";
            this.IPIndex = 2;
          },
        },
        {
          label: "369caidns3.bxvip.co",
          callback: () => {
            this.IP = "369caidns3.bxvip.com";
            this.IPIndex = 3;
          },
        },
        {
          label: "369caidns4.bxvip.co",
          callback: () => {
            this.IP = "369caidns4.bxvip.com";
            this.IPIndex = 4;
          },
        },
      ],
    };
  },
  mounted() {
    if (this.$route.params.ip) {
      this.domainAdd = this.$route.params.enom;
      this.vcode = this.$route.params.param_type;
      this.IP = this.$route.params.ip;
      this.remark = this.$route.params.remark;
    }
    this.getVerify(this.randomNum());
    this.getEnomLIplist().then(res => {
      if (!res) return;
      this.parseOptions = res.map(v => {
        return {
          label: v.ip,
          callback: () => {
            this.clickEnomLIpList(v);
          },
        };
      });
    });
  },
  methods: {
    ...mapActions("agent", ["getEnomLIplist"]),
    clickEnomLIpList(v) {
      console.log(v);
      this.IP = v.ip;
      this.IPIndex = v.id;
    },
    getVerify(i) {
      this.$ajax("request", {
        ac: "getVerifyImage"
      }).then(res => {
        this.verifyImg = res.img;
        this.$dialog.loading.close();
      });
    },
    randomNum() {
      return Math.floor(Math.random() * 10000) + "";
    },
    submitData() {
      this.$ajax("request", {
        ac: "addNewUserEnom",
        enom: this.domainAdd,
        remark: this.remark,
        ptype: this.vcode,
        ip: this.IPIndex,
      }).then(res => {
        this.$dialog.alert({ mes: "添加成功" });
        this.$router.push("/agency/openAccount");
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.addNewDomain_main_body {
  height: 100%;
  background-color: #eee;
  .addNewDomain_main_content {
    // height: poTorem(688px);
    padding: poTorem(20px);
    .form_ipt {
      overflow: hidden;
      border: poTorem(1px) solid #bfbfbf;
      border-radius: poTorem(5px);
      height: auto;
      .verify1 {
        display: flex;
        align-items: center;
        width: 100%;
      }
      .verify1_input {
        width: 60%;
      }
      .verify1_img {
        text-indent: 0;
        flex: 1;
        // height: poTorem(32px);
        img {
          width: 100%;
        }
      }
    }
    .tips {
      margin: poTorem(26px) 0;
      text-align: center;
      font-size: poTorem(13px);
      color: #7d7d7d;
    }
    .btn {
      margin-top: poTorem(60px);
      text-align: center;
      button {
        width: poTorem(300px);
        height: poTorem(40px);
        font-size: poTorem(16px);
        line-height: poTorem(16px);
        color: #fff;
        background-color: #ff7c34;
        border-radius: poTorem(5px);
        outline: none;
        border: none;
      }
    }
  }
}
</style>


