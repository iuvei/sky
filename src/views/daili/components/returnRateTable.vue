<template>
  <div class="returnRateTable_main_body">
    <publicHead :title="funcName" :type="1" :timeText="chooseTimeText" @chooseTimeShow="changeState"></publicHead>
    <div class="returnRateTable_main_content">
      <ul class="left">
        <li class="title">
          <span>玩法</span>
          <p></p>
          <span>返点</span>
        </li>
        <li v-for="(item, index) in rowsTitle" :key="index">{{item.wanfa}}</li>
      </ul>
      <div class="right">
        <ul>
          <li v-for="(value, key, index) in rowsContent" :key="index">返点_{{Object.getOwnPropertyNames(rowsContent).length-index-2}}</li>
        </ul>
        <ul v-for="(item, index) in rowsTitle" :key="index" class="content">
          <li v-for="(value, key, indexs) in item.list" :key="indexs">赔率{{item.list['fp_'+(Object.getOwnPropertyNames(rowsContent).length-indexs-2)]}}</li>
        </ul>
      </div>
    </div>
    <yd-actionsheet :items="lotteryOptions" v-model="choosedTime" class="changePeriod"></yd-actionsheet>
  </div>
</template>
<script>
import publicHead from "../../huiYuan/components/moreService/publicHead";
export default {
  components: {
    publicHead,
  },
  data() {
    return {
      funcName: "返点赔率表",
      chooseTimeText: "时时彩",
      choosedTime: false,
      lotteryOptions: [
        {
          label: "时时彩",
          callback: () => {
            this.getBaseData("ssc", "时时彩");
          },
        },
        {
          label: "PK拾",
          callback: () => {
            this.getBaseData("pk10", "PK拾");
          },
        },
        {
          label: "快3",
          callback: () => {
            this.getBaseData("k3", "快3");
          },
        },
        {
          label: "11选5",
          callback: () => {
            this.getBaseData("11x5", "11选5");
          },
        },
        {
          label: "PC蛋蛋",
          callback: () => {
            this.getBaseData("pcdd", "PC蛋蛋");
          },
        },
        {
          label: "3D",
          callback: () => {
            this.getBaseData("3d", "3D");
          },
        },
        {
          label: "六合彩",
          callback: () => {
            this.getBaseData("lhc", "六合彩");
          },
        },
        {
          label: "梯子游戏",
          callback: () => {
            this.getBaseData("tzyx", "梯子游戏");
          },
        },
        {
          label: "幸运农场",
          callback: () => {
            this.getBaseData("xync", "幸运农场");
          },
        },
        {
          label: "幸运扑克",
          callback: () => {
            this.getBaseData("xypk", "幸运扑克");
          },
        },
        {
          label: "PK牛牛",
          callback: () => {
            this.getBaseData("pkniuniu", "PK牛牛");
          },
        },
        {
          label: "七星彩",
          callback: () => {
            this.getBaseData("qxc", "七星彩");
          },
        }
      ],
      rowsTitle: [],
      rowsContent: [],
      columnContent: [],
      countNum: 0,
    };
  },
  mounted() {
    this.getBaseData("ssc", '时时彩');
  },
  methods: {
    changeState() {
      this.choosedTime = true;
    },
    getBaseData(i, t) {
      this.$dialog.loading.open("正在加载中···");
      this.$ajax("request", {
        ac: "getFPInfoBy0",
        tag: i,
      }).then(res => {
        this.chooseTimeText = t
        this.rowsTitle = res;
        this.rowsContent = res[0].list;
        this.$dialog.loading.close();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.returnRateTable_main_body {
  .returnRateTable_main_content {
    overflow: hidden;
    .left {
      float: left;
      list-style: none;
      li {
        width: poTorem(148px);
        height: poTorem(30px);
        font-size: poTorem(13px);
        line-height: poTorem(30px);
        color: #333;
        font-weight: 500;
        text-align: center;
        border: poTorem(1px) solid #dbdbdb;
      }
      .title {
        height: poTorem(40px);
        @include around;
        span {
          display: inline-block;
          width: poTorem(70px);
          line-height: poTorem(25px);
          &:first-child {
            align-self: flex-end;
            // line-height: poTorem(60px);
          }
          &:last-child {
            align-self: flex-start;
            // line-height: poTorem(20px);
          }
        }
        p {
          position: absolute;
          border: poTorem(1px) solid #dbdbdb;
          width: poTorem(150px);
          transform: rotate(14deg);
        }
      }
    }
    .right {
      float: right;
      width: poTorem(266px);
      overflow: auto;
      ul {
        @include between;
        flex-wrap: nowrap;
        width: auto;
        li {
          flex: 0 0 poTorem(130px);
          text-align: center;
          height: poTorem(40px);
          font-size: poTorem(13px);
          line-height: poTorem(40px);
          color: #666;
          border: poTorem(1px) solid #dbdbdb;
        }
      }
      .content {
        li {
          height: poTorem(30px);
        }
      }
    }
  }
}
</style>


