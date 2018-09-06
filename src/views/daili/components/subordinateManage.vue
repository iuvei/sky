<template>
  <div class="subordinateManage_main_body">
    <publicHead :title="funcName" :type="5"></publicHead>
    <div class="subordinateManage_main_content">
      <div class="title_wrap">
        <p>账号</p>
        <p>类型</p>
        <p>登录时间</p>
        <p>下级人数</p>
      </div>
      <div class="rows_wrap" v-for="(item, index) in baseData" :key="index" v-show="baseData!=0" @click="optionShow(item)">
        <p>{{item.username}}</p>
        <p>{{item.actype}}</p>
        <p>{{item.last_login_time}}</p>
        <p>{{item.next_count}}</p>
      </div>
      <p class="else_word" v-show="baseData!=0" @click="getBaseData">{{hasPage?'查看更多':'已显示全部数据'}}</p>
      <!-- <p class="else_word">查看更多</p> -->
      <div class="empty" v-show="baseData==0">
        <img src="../../../img/bet_record/noRecords.png" alt="">
        <p>暂无记录</p>
      </div>
    </div>
    <yd-actionsheet :items="agencyOptions" v-model="agencyShow" class="choose_agency_type" cancel="取消"></yd-actionsheet>
    <!-- <yd-actionsheet :items="rebateOptions" v-model="rebateShow" class="choose_agency_type"></yd-actionsheet> -->
    <SubOrdinateManageSheet :data='rebateOptions' v-show="rebateShow" @rebateShow="rebateShowEmit" @back="backEmit"></SubOrdinateManageSheet>
  </div>
</template>
<script>
import publicHead from "../../huiYuan/components/moreService/publicHead";
// import { getDate, getMonday, getMonth } from "../../../js/agencyDate";
import { mapState, mapActions } from "vuex";
import SubOrdinateManageSheet from "./block/SubOrdinateManageSheet";
console.log(SubOrdinateManageSheet);
export default {
  components: {
    publicHead,
    SubOrdinateManageSheet,
  },
  computed: {
    ...mapState({
      uid: state => state.userinfo.accountInfo.uid
    })
  },
  data() {
    return {
      funcName: "下级管理",
      type: 0,
      choosedTime: false,
      userinfo: "",
      userID: "",
      hasPage: false, //  是否显示加载更多
      pageid: 0, //  给后台页码值
      listNum: 0, //  数据总量
      isFirst: true, //  是否是首次请求
      type: 0,
      superiorArr: [this.uid], // 可返回的层级
      baseData: [],
      clickItemData: {},
      agencyOptions: [
        {
          label: "someone",
          callback: () => {},
        },
        {
          label: "查看返点",
          callback: this.lookRebate,
        },
      ],
      agencyShow: false,
      rebateOptions: [],
      rebateShow: false,
    };
  },
  mounted() {
    this.isFirst = true;
    this.pageid = 0;
    this.getBaseData();
  },
  methods: {
    ...mapActions("agent", ["getChlidStatic"]),
    changeState(n) {
      this.choosedTime = true;
    },
    // 子组件同时 $emit 两个事件 问题?
    rebateShowEmit() {
      this.rebateShow = false;
    },
    backEmit() {
      this.agencyShow = true;
    },
    async getBaseData() {
      // this.$dialog.loading.open('正在加载中···')
      let res = await this.getChlidStatic({
        username: "",
        user_type: 0,
        pageid: this.pageid,
        user_id: this.userID,
        lasttime: this.type,
      });
      if (res) {
        if (this.isFirst) {
          this.isFirst = false;
          this.baseData = res;
        } else {
          this.baseData = this.baseData.concat(res);
        }
        // this.listNum = res.length; //设置数据总条数
        this.pageid++;
      }
      /** 判断是否有多页 根据该值做加载更多判断 */
      if (res.length >= 20) {
        this.hasPage = true;
      } else {
        this.hasPage = false;
      }
    },
    optionShow(n) {
      this.agencyOptions = this.agencyOptions.splice(0, 2)
      this.clickItemData = n;
      // this.agencyOptions.pop();
      let opt = {
        label: "查看上级",
        callback: () => {
          this.userID = this.superiorArr[this.superiorArr.length - 2];
          this.superiorArr.splice(-1, 1)
          this.pageid = 0; //  重置页码
          this.isFirst = true; //重置为首次请求
          this.getBaseData(this.type);
        }
      }
      if (n.next_count) {
        this.agencyOptions[2] = {
          label: "查看下级",
          callback: () => {
            this.superiorArr.push(n.uid)
            this.userID = n.uid;
            this.pageid = 0; //  重置页码
            this.isFirst = true; //重置为首次请求
            this.getBaseData(this.type);
          },
        };
      } else {
        if (this.agencyOptions.length === 3) this.agencyOptions.pop();
      }
      if(this.superiorArr.length > 1) {
        n.next_count ? this.agencyOptions[3] = opt : this.agencyOptions[2] = opt
      }
      this.agencyShow = true;
      this.agencyOptions[0].label = n.username;
      this.userinfo = n;
    },
    getMoreData() {
      /** 判断数据是否加载完成 */
      this.getBaseData();
    },
    lookRebate() {
      console.log(this.clickItemData);
      let arr = [
        ["val_ssc", "时时彩"],
        ["val_k3", "快三"],
        ["val_11x5", "11选5"],
        ["val_3d", "福彩3D"],
        ["val_pk10", "pk拾"],
        ["val_pcdd", "pc蛋蛋"],
        ["val_lhc", "六合彩"],
      ];
      this.rebateOptions = arr.map(v => {
        return { label: v[1], value: this.clickItemData[v[0]] };
      });
      this.rebateShow = true;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.subordinateManage_main_body {
  .subordinateManage_main_content {
    height: poTorem(688px);
    background-color: #f7f7f7;
    .title_wrap,
    .rows_wrap {
      @include around;
      height: poTorem(40px);
      font-size: poTorem(15px);
      color: #626262;
      p {
        width: poTorem(100px);
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .rows_wrap {
      font-size: poTorem(14px);
      height: poTorem(45px);
      background-color: #fff;
      border-bottom: poTorem(1px) solid #d3d3d3;
      p {
        &:first-child {
          color: #00a0e9;
        }
        &:last-child {
          color: #ff7c34;
        }
        &:nth-child(2),
        &:nth-child(3) {
          color: #959595;
        }
      }
    }
    .else_word {
      font-size: poTorem(15px);
      color: #626262;
      text-align: center;
      background-color: #fff;
      line-height: poTorem(45px);
    }
    .empty {
      background-color: #fff;
      height: poTorem(648px);
      @include column;
      justify-content: center;
      img {
        width: poTorem(93px);
      }
      p {
        width: poTorem(400px);
        text-align: center;
        font-size: poTorem(14px);
        height: poTorem(20px);
        line-height: poTorem(20px);
        color: #bfbfbf;
        font-weight: 700;
      }
      button {
        width: poTorem(93px);
        padding: 5px 0 5px 0;
        font-size: 14px;
        text-align: center;
        font-weight: 700;
        border-radius: 5px;
        color: #fff;
        background-color: #f93;
        outline: none;
        border: none;
      }
    }
  }
}
</style>


