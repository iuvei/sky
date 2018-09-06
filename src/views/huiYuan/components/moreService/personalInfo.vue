<template>
  <div class="personalInfo_main_body">
    <publicHead :title="funcName" :type="3" @changeTab="changePage" v-if="isAdvance"></publicHead>
    <publicHead :title="name" :type="5" v-else></publicHead>
    <div class="main_content">
      <div v-show="tabNum==0">
        <div class="person_info">
          <span>头像</span>
          <div @click="isShowOptions=true">
            <!-- <div @click="aaa"> -->
            <img :src="head_icon" alt="">
            <img :src="img" alt="">
          </div>
        </div>
        <yd-cell-group class="personal_info_form">
          <yd-cell-item>
            <span slot="left">真实姓名</span>
            <span slot="right">{{userInfo.accountInfo.real_name?userInfo.accountInfo.real_name:'未设置'}}</span>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">手机号</span>
            <span slot="right">{{userInfo.accountInfo.phone?userInfo.accountInfo.phone:'未绑定'}}</span>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">QQ</span>
            <span slot="right">{{userInfo.accountInfo.qq?userInfo.accountInfo.qq:'未绑定'}}</span>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">微信</span>
            <span slot="right">{{userInfo.accountInfo.wechat?userInfo.accountInfo.wechat:'未绑定'}}</span>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">邮箱</span>
            <span slot="right">{{userInfo.accountInfo.email?userInfo.accountInfo.email:'未绑定'}}</span>
          </yd-cell-item>
        </yd-cell-group>
      </div>
      <div v-show="tabNum==1">
        <div class="user_info">
          <img :src="head_icon" alt="">
          <div>
            <p class="userInfo">
              <span style="vertical-align:-webkit-baseline-middle">{{username}}</span>
              <!-- <span class="vip_degree">
                <img src="../../../../img/personal_center/degree.png" alt="">
                <i style="vertical-align:-webkit-baseline-middle">VIP{{data.vip}}</i>
              </span> -->
            </p>
            <p class="userInfo">
              <span>等级：<i class="vip_degree" style="font-style: italic;font-weight:600">LV.{{data.prevVip}}</i>&nbsp;&nbsp;成长值：<i class="vip_degree">{{data.exp}}</i></span>
              <!-- <span class="vip_degree">成长值：{{data.exp}}分</span> -->
            </p>
          </div>
          <p class="degree_detail">距离下一级还需要 {{data.nextExp - data.exp}} 成长值</p>
          <div class="degree_line_box">
            <span>LV.{{data.prevVip}}</span>
            <yd-progressbar type="line" :progress="progress" trail-width="6" stroke-width="6" trail-color="#FFA800" stroke-color="#ccc" class="degree_line"></yd-progressbar>
            <span class="speed">{{parseInt(progress * 100)}}%</span>
            <span>LV.{{data.nextVip}}</span>
          </div>
        </div>
        <div class="one_tag" @click="$router.push('/moreService/growinginfo')">
          <span>成长明细及规则</span>
          <span></span>
        </div>
        <div class="reward">
          <p>您共获得的奖励：</p>
          <div class="info">
            <span v-for="(i,key) in riselist" :key="key">{{i.info}} <i>{{i.reward}}</i></span>
            <!-- <span>等级彩金 <i>30</i></span><span>周俸禄 <i>0</i></span><span>月俸禄 <i>10</i></span> -->
          </div>
          <div class="one_tag" @click="$router.push('/moreService/personalgrade')">
            <span>等级奖励记录</span>
            <span></span>
          </div>
        </div>
        <div class="gift">
          <div class="one_tag" @click="$router.push('/moreService/personaltask')">
            <span>任务礼包</span>
            <span></span>
            <span>查看全部</span>
          </div>
          <div class="item" v-for="(i,key) in data.task_list" :key="key" v-if="key<2"  @click="tofulfil(i.tag,i.status)">
            <i></i>
            <p>{{i.title}}</p>
            <p>+{{i.addexp}} 成长值</p>
            <span :style="(i.status==1)?'background-color: #22AD38':'background-color: #ccc'">{{i.status==1?'已完成':'未完成'}}</span>
          </div>
          <!-- <div class="item">
            <i></i>
            <p>设置交易密码</p>
            <p>+20 成长值</p>
            <span :style="tkpass?'background-color: #22AD38':'background-color: #ccc'">{{tkpass?'已完成':'未完成'}}</span>
          </div>
          <div class="item">
            <i></i>
            <p>绑定银行卡</p>
            <p>+20 成长值</p>
            <span :style="bank?'background-color: #22AD38':'background-color: #ccc'">{{bank?'已完成':'未完成'}}</span>
          </div> -->
        </div>
        <!-- <div class="degree_title">
          <span>等级</span>
          <span>头衔</span>
          <span>成长积分</span>
        </div>
        <div class="degree_intro" v-for="(item, index) in data.rise_list" :key="index">
          <span>vip{{item.ranks}}</span>
          <span>{{item.title}}</span>
          <span>{{item.score}}</span>
        </div> -->
      </div>
    </div>
    <yd-actionsheet :items="personalOptions" v-model="isShowOptions" class="personal_options" cancel="取消"></yd-actionsheet>
    <input type="file" @change="getHeadImage" id="call_camera" v-show="false" accept="image/*">
  </div>
</template>
<script>
import publicHead from "../moreService/publicHead";
import { mapState, mapActions, mapMutations } from "vuex";
import { createImg, createNewB64 } from "~/js/user/gsfunc";
import { to } from '~/js/functions'
export default {
  components: {
    publicHead,
  },
  computed: {
    ...mapState({
      userInfo: state => state.userinfo,
      username: state => state.userinfo.accountInfo.username,
      // head_icon: store => store.userinfo.accountInfo.head_icon,
      tkpass() {
        return this.$store.state.userinfo.accountInfo.tkpass_ok;
      },
      bank() {
        return this.$store.state.userinfo.accountInfo.bank_typename != "";
      },
    }),
    head_icon() {
      let iconUrl = this.$store.state.userinfo.accountInfo.head_icon
      if(iconUrl !== '') {
        return iconUrl
      } else {
        let defaultIcon = require("../../../../img/head_icon.png")
        return defaultIcon
      }
    }
  },
  data() {
    return {
      name:"个人信息",
      funcName: {
        l: "个人信息",
        r: "等级头衔",
      },
      data:[],
      riselist:[],
      progress: 0,
      tabNum: 0,
      img: require("../../../../img/bet_record/arrow.png"),
      headImg: "",
      isShowOptions: false,
      isAdvance: true,
      personalOptions: [
        {
          label: "拍照",
          callback: () => {
            let el = document.getElementById("call_camera");
            el.captrue = "camera";
            el.click();
          },
        },
        {
          label: "从相册选择",
          callback: () => {
            let el = document.getElementById("call_camera");
            el.click();
          },
        },
      ],
    };
  },
  activated() {
    this.isAdvance = this.$store.state.sysinfo.event_rise == 1 ? true : false //判断用户晋级活动是否开放
    if(this.$route.params.direct) {
      this.tabNum = 1
    } else {
      this.tabNum = 0
    }
    this.getData()
  },
  methods: {
    ...mapActions("member", ["UploadUserHeadIconByBase64", "updateUserInfo"]),
    ...mapMutations(["SET_USERINFO_FIELD"]),
    aaa() {
      let el = document.getElementById("call_camera");
      el.captrue = "camera";
      el.click();
    },
    changePage(i) {
      this.tabNum = i;
    },
    compares (prop) {
      return function (obj1, obj2) {
        let val1 = obj1[prop];
        let val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1);
          val2 = Number(val2);
        }
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }            
      } 
    },
    // 用户晋级活动数据
    getData (){
      if(!this.isAdvance) return
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "GetUserEventRiseInfo",
      }).then(res => {
        console.log(res)
        this.data = res
        this.riselist = res.rise_list && res.rise_list.length ? res.rise_list.sort(this.compares('stor')) : []
        console.log(this.riselist)
        this.progress = (res.exp/res.nextExp).toFixed(2)
        this.$dialog.loading.close();
      });
    },
    // 上传头像后返回文件名，需前端再调用用户信息
    uploadHeadImg(base64) {
      let imgurl;
      this.UploadUserHeadIconByBase64({
        img: base64,
      })
        .then(res => {
          imgurl = res;
          let request = {
            type: 8,
            icon: res,
          };
          return this.updateUserInfo(request);
        })
        .then(res => {
          this.$dialog.loading.close()
          this["SET_USERINFO_FIELD"]({ key: "head_icon", value: res });
          this.$dialog.alert({ mes: "上传头像成功" });
        });
    },
    bigImg2Base64(base64) {
      createNewB64(
        base64,
        ret => {
          this.uploadHeadImg("data-png-" + ret.split("base64,")[1]);
        },
        () => {
          this.$dialog.alert({ mes: "上传图片失败" });
        }
      );
    },
    getHeadImage(val) {
      this.$dialog.loading.open(" ")
      let files = val.target.files;
      if (files.length !== 1) {
        if (files.length > 1)
          this.$dialog.alert({ mes: "一次只能上传一张图片" });
          this.$dialog.loading.close()
        return;
      }
      // console.log(val, files[0]);
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = e => {
        if (files[0].size < 200 * 1024) {
          this.uploadHeadImg("data-png-" + reader.result.split("base64,")[1]);
        } else {
          this.bigImg2Base64(reader.result);
        }
      };
    },
    tofulfil(tag,i){
      if(i == 1) {
        return
      }
      if(tag == 'sign'){
        this.$router.push('/moreService/signIn')
      }else if(tag == 'realname'){
        this.$router.push('/moreService/correctRealName')
      }else if(tag == 'wechat'){
        this.$router.push('/moreService/bindingWechat')
      }else if(tag == 'qq'){
        this.$router.push('/moreService/bindingQQ')
      }else if(tag == 'email'){
        this.$router.push('/moreService/bindingEmail')
      }else if(tag == 'question'){
        this.$router.push('/moreService/correctQuestion')
      }else if(tag == 'bank'){
        this.$router.push('/moreService/bankcardManage')
      } else if(tag == 'phone'){
        this.$router.push('/moreService/bindingCellphone')
      }
    }
  },
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.personalInfo_main_body {
  .main_content {
    height: 100%;
    background-color: #eee;
    .user_info {
      background: url(../../../../img/grade_bg.png) no-repeat;
      background-size: cover;
      height: poTorem(178px);
      // width: poTorem(414px);
      overflow: hidden;
      margin-bottom: poTorem(15px);
      img {
        border-radius: 50%;
        width: poTorem(58px);
        height: poTorem(58px);
        // border: 2px solid #fff;
        margin: poTorem(18px) poTorem(20px) 0;
        float: left;
      }
      div {
        padding: poTorem(20px) 0;
        // width: poTorem(310px);
        // vertical-align: middle;
        // display: inline-block;
        line-height: poTorem(20px);
        font-size: poTorem(15px);
        color: #fff;
        font-weight: 700;
        // float: left;
        .userInfo {
          line-height: 1.5rem;
        }
        .vip_degree {
          color: #ffea00;
          display: inline-block;
          img {
            width: poTorem(20px);
            height: poTorem(23px);
            margin: 0;
            margin-right: poTorem(5px);
            padding: 0;
            border: none;
          }
        }
      }
      .degree_detail {
        font-size: poTorem(15px);
        color: #fff;
        text-align: center;
        // padding-left: poTorem(30px);
      }
      .degree_line_box {
        position: relative;
        @include around;
        width: 100%;
        padding: 0 poTorem(20px);
        .degree_line {
          display: inline-block;
          width: 70%;
          border-radius: poTorem(10px);
        }
        .speed {
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%,-50%);
          font-size: 0.8rem;
        }
      }
    }
    .one_tag {
      height: poTorem(40px);
      font-size: poTorem(16px);
      color: #333;
      background-color: #fff;
      line-height: poTorem(40px);
      padding: 0 poTorem(20px);
      span{
        display: inline-block;
        color: #626367;
        &:nth-child(2){
          background: url('../../../../img/grade_r.png') no-repeat;
          background-size: 100%;
          margin-top: poTorem(12px);
          width: poTorem(15px);
          height: poTorem(15px);
          float: right;
        }
        &:nth-child(3){
          float: right;
          margin-right: poTorem(5px);
        }
      }
    }
    .reward {
      padding-left: poTorem(20px);
      background-color: #fff;
      margin-top: poTorem(15px);
      font-size: poTorem(16px);
      p {
        color: #959595;
        line-height: poTorem(40px);
      }
      .one_tag {
        padding: 0;
        padding-right: poTorem(20px);
      }
      .info {
        height: poTorem(40px);
        border-bottom: 1px solid #ccc;
        padding-right: poTorem(20px);
        color: #5b5b5c;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        span {
          display: inline-block;
          line-height: poTorem(40px);
          &:nth-child(2){
            text-align: center;
          }
          &:nth-child(3){
            text-align: right;
          }
          i {
            color: #E34141;
          }
        }
      }
    }
    .gift {
      padding-left: poTorem(20px);
      background-color: #fff;
      margin-top: poTorem(15px);
      font-size: poTorem(16px);
      .one_tag {
        padding: 0;
        padding-right: poTorem(20px);
      }
      .item {
        color: #5b5b5c;
        border-top: 1px solid #ccc;
        position: relative;
        padding: poTorem(5px) 0;
        padding-left: poTorem(35px);
        i {
          display: inline-block;
          width: poTorem(25px);
          height: poTorem(25px);
          background: url('../../../../img/grade_gift.png') no-repeat;
          background-size: 100%;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
        span {
          display: inline-block;
          width: poTorem(70px);
          height: poTorem(25px);
          line-height: poTorem(25px);
          color: #fff;
          text-align: center;
          position: absolute;
          top: 50%;
          right: poTorem(20px);
          transform: translateY(-50%);
          border-radius: poTorem(5px);
        }
        p{
          line-height: poTorem(25px);
          &:nth-child(3){
            color: #959595;
          }
        }
      }
    }
    .degree_title {
      height: poTorem(41px);
      @include around;
      font-size: poTorem(18px);
      color: #626367;
      position: relative;
      span {
        width: poTorem(100px);
        text-align: center;
      }
      &:after {
        content: "";
        position: absolute;
        z-index: 1;
        bottom: 0;
        left: 0;
        width: 100%;
        border-bottom: 1px solid #b2b2b2;
        transform: scaleY(0.5);
        transform-origin: 0 0;
      }
    }
    .person_info {
      @include between;
      padding: 0 poTorem(20px);
      margin: poTorem(20px) 0;
      background-color: #fff;
      span {
        font-size: poTorem(16px);
        color: #383838;
      }
      div {
        height: poTorem(65px);
        line-height: poTorem(65px);
        @include center;
        img {
          &:first-child {
            width: poTorem(58px);
            height: poTorem(58px);
            border-radius: 50%;
          }
          &:last-child {
            width: poTorem(20px);
            height: poTorem(20px);
            // vertical-align: middle;
          }
        }
      }
    }
    .degree_intro {
      span {
        float: left;
        width: 33.333%;
        background-color: #fff;
        text-align: center;
        font-size: 1.1rem;
        line-height: 2.2rem;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        color: #565656;
        &:nth-child(3n) {
          border-right: none;
        }
      }
    }
  }
}
</style>


