<template>
  <div class="openAccount_main_body">
    <publicHead :title="funcName" :type="5"></publicHead>
    <div class="openAccount_main_content">
      <yd-tab class="betRecord" :callback="getData" v-model="tabActive">
        <yd-tab-panel label="返点设置" :tabkey="0" :active="swicthToSecond==0">
          <div class="title">
            <p class="type">
              <span :class="[{'active':typeIndex==index}, 'default']" v-for="(item, index) in titleData" :key="index" @click="chooseType(index)">{{item}}</span>
            </p>
            <p class="check_table" @click="$router.push('/agency/returnRateTable')">点击查看返点赔率表</p>
          </div>
          <div class="lottery_rate">
            <settingReturn v-for="(item, index) in listData" :key="index" :baseData="item" :ref="item.ref"></settingReturn>
          </div>
          <div class="bottom">
            <!-- <p class="chooseDomain" @click="isShow=true">{{domainTxt}}</p> -->
            <p class="createCode" @click="createCode">创建邀请码</p>
          </div>
          <yd-actionsheet :items="domainOptions" v-model="isShow" class="changePeriod"></yd-actionsheet>
        </yd-tab-panel>
        <yd-tab-panel label="邀请码管理" :tabkey="1" :active="swicthToSecond==1">
          <div class="title">
            <p class="type">
              <span :class="[{'active':centerTypeIndex==index}, 'default']" v-for="(item, index) in titleData" :key="index" @click="centerType(index)">{{item}}</span>
            </p>
            <p class="check_table" @click="$router.push('/agency/returnRateTable')">点击查看返点赔率表</p>
          </div>
          <div v-for="(item, index) in invitationCode" :key="index" class="owned_code">
            <p class="text">{{item.param}}</p>
            <p class="funcBtn" v-clipboard:copy="item.param" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</p>
            <!-- <p class="domain_name">{{item.link}}</p>
            <p class="funcBtn" v-clipboard:copy="item.link" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</p> -->
            <p class="funcBtn" @click="openDetail(item)">详情</p>
            <p class="create_time">{{item.time}}</p>
          </div>
          <p class="no_invitation_code" v-show="!invitationCode.length">暂无数据</p>
          <p class="no_invitation_code" v-show="invitationCode.length">已显示全部</p>
        </yd-tab-panel>
        <yd-tab-panel label="域名管理" :tabkey="2" :active="swicthToSecond==2">
          <div class="third_head">
            <p @click="thirdIsShow=true">{{thirdTxt}}</p>
            <p @click="$router.push('/agency/addNewDomain')">+ 添加域名</p>
          </div>
          <div v-for="(item, index) in domainData" :key="index" class="alive_domain">
            <p>{{item.enom}}</p>
            <p>{{item.bind_param}}</p>
             <!-- 0=审核通过 1=拒绝 2=待审核  -->
            <p>{{item.status==1?'拒绝':item.status==2?'待审核':'审核通过'}}</p>
            <p @click="showYaoQingMaOption(item)" :class="{'enable': !(!item.bind_param && item.status == 4)}">{{!item.bind_param && item.status == 4 ? '设置赔率' : ''}}</p>
          </div>
          <p class="no_invitation_code" v-show="!domainOptions2.length">暂无数据</p>
          <p class="no_invitation_code" v-show="domainOptions2.length">已显示全部</p>
        </yd-tab-panel>
      </yd-tab>
      <yd-actionsheet :items="domainOptions2" v-model="thirdIsShow" class="changePeriod"></yd-actionsheet>
      <yd-actionsheet :items="domainOptions3" v-model="yaoqingmaIsShow" class="changePeriod"></yd-actionsheet>
      <yd-popup v-model="show" position="center" width="90%" class="pop_win">
        <p class="title">详情</p>
        <p class="content_intro">创建于{{filledContent.time}} 已注册：{{filledContent.reg_count}}人</p>
        <div class="content_box">
          <div class="left">
            <p>
              <span>时时彩：</span>
              <span>{{filledContent.fp_ssc}}</span>
            </p>
            <p>
              <span>11选5：</span>
              <span>{{filledContent.fp_11x5}}</span>
            </p>
            <p>
              <span>PK10：</span>
              <span>{{filledContent.fp_pk10}}</span>
            </p>
            <p>
              <span>六合彩：</span>
              <span>{{filledContent.fp_lhc}}</span>
            </p>
          </div>
          <div class="right">
            <p>
              <span>快三：</span>
              <span>{{filledContent.fp_k3}}</span>
            </p>
            <p>
              <span>3D：</span>
              <span>{{filledContent.fp_3d}}</span>
            </p>
            <p>
              <span>PC蛋蛋：</span>
              <span>{{filledContent.fp_pcdd}}</span>
            </p>
            <p>
              <span>其他：</span>
              <span>{{filledContent.fp_other}}</span>
            </p>
          </div>
        </div>
        <p class="close_btn" @click="show=false">确定</p>
      </yd-popup>
      <yd-popup v-model="hadYaoQingMaShow" position="center" width="90%" class="yao_qing_ma_win">
        <p class="title">请选择邀请码</p>
        <div class="content_box">
          <div class="yao_qing_ma_wrap left">
            <p v-for="(item, index) in invitationCode" v-if="index < 20" :key="index" @click="choosedYaoQingMa(item, index)" :class="[{'active': itIndex == index},'yaoQingMa']">{{item.param}}</p>
          </div>
        </div>
        <p class="close_btn" @click="setYaoQingMa">确定</p>
      </yd-popup>
    </div>
  </div>
</template>
<script>
import publicHead from "../../huiYuan/components/moreService/publicHead";
import settingReturn from "./settingReturn";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    publicHead,
    settingReturn,
  },
  computed: mapState({
    fp_11x5: state => state.userinfo.accountInfo.fp_11x5,
    fp_3d: state => state.userinfo.accountInfo.fp_3d,
    fp_k3: state => state.userinfo.accountInfo.fp_k3,
    fp_lhc: state => state.userinfo.accountInfo.fp_lhc,
    fp_pcdd: state => state.userinfo.accountInfo.fp_pcdd,
    fp_pcdd: state => state.userinfo.accountInfo.fp_pcdd,
    fp_ssc: state => state.userinfo.accountInfo.fp_ssc,
  }),
  // computed: {
  //   ...mapState("userInfo/accountInfo", ["fp_11x5"]),
  // },
  data() {
    return {
      tabActive: 0,
      itIndex: 0,
      funcName: "下级开户",
      titleData: ["会员", "代理"],
      typeIndex: 1,
      pageIndex: 0,
      domainTxt: "-- 请选择域名 --",
      domainID: 0,
      thirdTxt: "我的域名",
      centerTypeIndex: 1,
      invitationCode: [],
      yaoqingmaIsShow: false,
      filledContent: "",
      show: false,
      hadYaoQingMaShow: false,
      swicthToSecond: 0,
      domainManageIndex: 0,
      accid: 0,
      domainOptions3: [
        {
          label: "使用现有邀请码",
          callback: () => {
            this.getInvitationCode();
            this.hadYaoQingMaShow = true
          },
        },
        {
          label: "设置新的邀请码",
          callback: () => {
            this.tabActive = 0
          },
        },
      ],
      domainData: [],
      listData: [
        {
          name: "时时彩",
          ref: "vssc",
          percent: this.$store.state.userinfo.accountInfo.fp_ssc,
          src: require("../../../img/daili/ssc.png"),
        },
        {
          name: "快三",
          ref: "vk3",
          percent: this.$store.state.userinfo.accountInfo.fp_k3,
          src: require("../../../img/daili/kuai3.png"),
        },
        {
          name: "11选5",
          ref: "v11x5",
          percent: this.$store.state.userinfo.accountInfo.fp_11x5,
          src: require("../../../img/daili/11-5.png"),
        },
        {
          name: "3D",
          ref: "v3d",
          percent: this.$store.state.userinfo.accountInfo.fp_3d,
          src: require("../../../img/daili/3d.png"),
        },
        {
          name: "PK拾",
          percent: this.$store.state.userinfo.accountInfo.fp_pk10,
          ref: "vpk10",
          src: require("../../../img/daili/PK拾.png"),
        },
        {
          name: "PC蛋蛋",
          ref: "vpcdd",
          percent: this.$store.state.userinfo.accountInfo.fp_pcdd,
          src: require("../../../img/daili/xingyun28.png"),
        },
        {
          name: "六合彩",
          ref: "vlhc",
          percent: this.$store.state.userinfo.accountInfo.fp_lhc,
          src: require("../../../img/daili/liuhecai.png"),
        },
        {
          name: "其他",
          ref: "vother",
          percent: this.$store.state.userinfo.accountInfo.fp_other,
          src: require("../../../img/daili/qtcz.png"),
        },
        // {
        //   name: "幸运农场",
        //   ref: "vxync",
        //   percent: this.$store.state.userinfo.accountInfo.fp_xync,
        //   src: require("../../../img/daili/xync.png"),
        // },
        // {
        //   name: "PK拾牛牛",
        //   ref: "vpknn",
        //   percent: this.$store.state.userinfo.accountInfo.fp_pknn,
        //   src: require("../../../img/daili/pknn.png"),
        // },
        // {
        //   name: "幸运扑克 ",
        //   ref: "vxypk",
        //   percent: this.$store.state.userinfo.accountInfo.xypk,
        //   src: require("../../../img/daili/xypk.png"),
        // },
        // {
        //   name: "经典梯子",
        //   ref: "vjdtz",
        //   percent: this.$store.state.userinfo.accountInfo.jdtz,
        //   src: require("../../../img/daili/jdtz.png"),
        // },
      ],
      domainOptions: [],
      domainOptions2: [
        {
          label: "我的域名",
          callback: () => {
            this.thirdTxt = "我的域名";
            this.domainManageIndex = 0;
            this.getAliveDomain();
          },
        },
        {
          label: "下级域名",
          callback: () => {
            this.thirdTxt = "下级域名";
            this.domainManageIndex = 1;
            this.getAliveDomain();
          },
        },
      ],
      isShow: false,
      thirdIsShow: false,
    };
  },
  mounted() {
    // this.getInvitationCode();
    this.swicthToSecond = 0;
  },
  methods: {
    ...mapActions("agent", [
      "getUsefulEnomList",
      "createJoinCode",
      "getUserEnomList",
      "getUserJoinCodeList",
    ]),
    // ...mapActions(),
    onCopy(e) {
      this.$dialog.toast({ mes: "复制成功" });
    },
    onError(e) {
      console.log(e);
    },
    async createCode() {
      let arr = ["vssc", "vpcdd", "vk3", "vpk10", "v3d", "v11x5", "vlhc", "vother"];
      let request = {
        actype: this.typeIndex,
        eid: this.domainID,
      };
      arr.forEach(v => {
        request[v] = this.$refs[v][0].returnPercent + '';
      });
      let res = await this.createJoinCode(request);
      if (res) {
        this.$dialog.alert({ mes: "创建成功,邀请码为" + res });
        this.getInvitationCode();
        this.tabActive = 1;
      }
      // return;
    },
    getData(l, i) {
      this.pageIndex = i;
      // if (i == 0) this.getUseful();
      // else
      if (i == 1) this.getInvitationCode();
      else if (i == 2) this.getAliveDomain();
    },
    chooseType(i) {
      this.typeIndex = i;
    },
    centerType(i) {
      this.centerTypeIndex = i;
      this.getInvitationCode();
    },
    getInvitationCode() {
      this.$dialog.loading.open("正在加载中···");
      this.getUserJoinCodeList({
        actype: this.centerTypeIndex,
        pageid: 0,
      }).then(res => {
        console.log(res)
        res == (0 || null) ? (this.invitationCode = []) : (this.invitationCode = res);
        if(Array.isArray(res) && res.length) {
          this.domainID = res[0].id
        }
        this.$dialog.loading.close();
      });
    },
    openDetail(n) {
      this.filledContent = n;
      this.show = true;
    },
    getAliveDomain() {
      this.$dialog.loading.open("正在加载中···");
      this.getUserEnomList({
        actype: this.domainManageIndex,
      }).then(res => {
        res == 0 ? (this.domainData = []) : (this.domainData = res);
        this.$dialog.loading.close();
      });
    },
    getUseful() {
      this.$dialog.loading.open("正在加载···");
      this.getUsefulEnomList().then(res => {
        this.domainOptions = [
          {
            label: "使用默认",
            callback: () => {
              this.domainTxt = "使用默认";
              this.domainID = 0;
            },
          },
        ].concat(
          res.map((item, index) => ({
            label: item.enom,
            callback: () => {
              this.domainID = item.id;
              this.domainTxt = item.enom;
            },
          }))
        );
        this.$dialog.loading.close();
      });
    },
    showYaoQingMaOption(i) {
      if(!i.bind_param) {
        this.yaoqingmaIsShow = true
        this.accid = i.id
      }
    },
    choosedYaoQingMa(n, i) {
      console.log(n)
      this.domainID = n.id
      this.itIndex = i
    },
    setYaoQingMa() {
      this.$dialog.loading.open(' ')
      this.$ajax('request', {
        ac: 'BindEnomParam',
        eid: this.domainID,
        id: this.accid
      }).then(res => {
        this.$dialog.toast({mes: '绑定成功'})
        this.$dialog.loading.close()
        this.hadYaoQingMaShow = false
        this.getAliveDomain()
      })
    }
  },
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.openAccount_main_body {
  height: 100%;
  background-color: #fff;
  .openAccount_main_content {
    .betRecord {
      .title {
        text-align: center;
        padding: poTorem(20px);
        .type {
          display: inline-block;
          width: poTorem(170px);
          height: poTorem(28px);
          margin-bottom: poTorem(20px);
          span {
            display: inline-block;
            width: 50%;
            font-size: poTorem(13px);
            height: poTorem(28px);
            color: #909090;
            line-height: poTorem(26px);
            border: poTorem(1px) solid #909090;
            &:first-child {
              border-top-left-radius: poTorem(5px);
              border-bottom-left-radius: poTorem(5px);
            }
            &:last-child {
              border-top-right-radius: poTorem(5px);
              border-bottom-right-radius: poTorem(5px);
              vertical-align: bottom;
            }
          }
          .active {
            line-height: poTorem(28px);
            background-color: #ff7c34;
            color: #fff;
            border: none;
          }
        }
        .check_table {
          font-size: poTorem(14px);
          color: #ff7c34;
        }
      }
      .lottery_rate {
        height: poTorem(530px);
        overflow: auto;
        padding: poTorem(10px);
        padding-bottom: poTorem(142px);
      }
      .bottom {
        padding-top: poTorem(20px);
        padding-bottom: poTorem(20px);
        width: poTorem(414px);
        @include center;
        flex-wrap: wrap;
        position: fixed;
        bottom: 0;
        background-color: #fff;
        p {
          width: poTorem(288px);
          height: poTorem(41px);
          line-height: poTorem(41px);
          font-size: poTorem(18px);
          text-align: center;
          border-radius: poTorem(8px);
        }
        // .chooseDomain {
        //   color: #333;
        //   border: poTorem(1px) solid #ddd;
        //   background: url(../../../img/daili/triangle.png) center right
        //     no-repeat;
        //   background-position: poTorem(258px) center;
        //   background-size: poTorem(20px) poTorem(20px);
        //   margin-bottom: poTorem(20px);
        // }
        .createCode {
          color: #fff;
          background-color: #ff7c34;
        }
      }
      .owned_code {
        @include between;
        background-color: #fff;
        padding: 0 poTorem(10px);
        height: poTorem(80px);
        border-bottom: poTorem(1px) solid #e2e2e2;
        p {
          font-size: poTorem(16px);
          line-height: poTorem(30px);
          height: poTorem(30px);
          text-align: center;
          border: poTorem(1px) solid #e9e9e9;
        }
        .create_time {
          border: none;
          color: #333;
        }
        .text,
        .domain_name {
          color: #909090;
        }
        .text {
          width: poTorem(67px);
        }
        .domain_name {
          width: poTorem(130px);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .funcBtn {
          color: #00a0e9;
          width: poTorem(48px);
          border: poTorem(1px) solid #00a0e9;
        }
      }
      .no_invitation_code {
        text-align: center;
        font-size: poTorem(18px);
        color: #bbb;
        padding-top: poTorem(20px);
      }
      .third_head {
        padding: poTorem(10px);
        @include between;
        p {
          font-size: poTorem(14px);
          height: poTorem(29px);
          line-height: poTorem(29px);
          width: poTorem(130px);
          text-align: center;
          &:first-child {
            color: #ff9147;
            border-bottom: poTorem(2px) solid #ff9174;
            background: url(../../../img/daili/triangle.png) no-repeat;
            background-position: poTorem(100px) center;
            background-size: poTorem(20px) poTorem(20px);
          }
          &:last-child {
            color: #fff;
            background-color: #ff9147;
            border-radius: poTorem(5px);
          }
        }
      }
      .alive_domain {
        @include between;
        padding: poTorem(10px);
        border-bottom: poTroem(1px) solid #e4e4e4;
        p {
          font-size: poTorem(12px);
          height: poTorem(28px);
          line-height: poTorem(28px);
          text-align: center;
          &:first-child {
            width: poTorem(130px);
          }
          &:nth-child(2) {
            width: 4rem;
          }
          &:nth-child(3) {
            width: poTorem(52px);
          }
          // &:nth-child(2n + 1) {
          //   border: poTorem(1px) solid #ddd;
          // }
          &:nth-child(n-3) {
            color: #6e6e6e;
            border: poTorem(1px) solid #ddd;
          }
          &:last-child {
            border: poTorem(1px) solid #00a0e9;
            color: #00a0e9;
            width: poTorem(52px);
          }
        }
        .enable {
          border: none!important;
        }
      }
    }
    .pop_win, .yao_qing_ma_win {
      .title {
        height: poTorem(45px);
        line-height: poTorem(45px);
        font-size: poTorem(18px);
        color: #3f3f3f;
        text-align: center;
        border-bottom: poTorem(1px) dashed #b2b2b2;
      }
      .content_intro {
        text-align: center;
        font-size: poTorem(13px);
        color: #434343;
        line-height: poTorem(32px);
      }
      .content_box {
        padding: poTorem(20px);
        @include around;
        align-items: flex-start;
        .left,
        .right {
          width: 100%;
          p {
            width: poTorem(160px);
            text-align: left;
            span {
              display: inline-block;
              line-height: poTorem(30px);
              &:first-child {
                color: #666;
                width: poTorem(100px);
                text-align: right;
              }
              &:last-child {
                color: #f13131;
              }
            }
          }
        }
        .yao_qing_ma_wrap {
          @include between;
          flex-wrap: wrap;
          .yaoQingMa {
            margin: 0.625rem 0.5rem;
            text-align: center;
            width: poTorem(146px);
            font-size: 1.25rem;
            color: #666;
            border-radius: poTorem(5px);
            border: poTorem(1px) solid #d2d2d2;
            height: poTorem(36px);
            line-height: poTorem(34px);
          }
          .active {
            background: url('~img/account/choosed.png') no-repeat bottom right;
            background-size: 1rem 1rem;
            border: poTorem(1px) solid #e33939;
          }
        }
      }
      .close_btn {
        height: poTorem(45px);
        line-height: poTorem(45px);
        font-size: poTorem(18px);
        color: #f13131;
        text-align: center;
        border-top: poTorem(1px) dashed #b2b2b2;
      }
    }
    .yao_qing_ma_win {
      .content_box {
        padding: 0;
      }
    }
  }
}
</style>
<style lang="scss">
  .yao_qing_ma_win {
    .yd-popup-center {
      max-height: 90%;
      display: flex;
      flex-direction: column;
      .yd-popup-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        div {
          flex: 1;
          display: flex;
          flex-direction: column;
          .content_box {
            padding: 0;
            flex: 1;
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
</style>

