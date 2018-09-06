<template>
  <div class="betting_main_body">
    <publicHead :title="funcName" :type="5"></publicHead>
    <div class="betting_main_content">

      <!-- <yd-tab @click.native="scrollToShow" horizontal-scroll> -->
      <!-- <yd-tab-panel label="全部彩种">
          <lottery-content :datas="dataList" class="animtes"></lottery-content>
        </yd-tab-panel>
        <yd-tab-panel label="时时彩">
          <lottery-content :datas="ssc" class="animtes"></lottery-content>
        </yd-tab-panel>
        <yd-tab-panel label="快三">
          <lottery-content :datas="k3" class="animtes"></lottery-content>
        </yd-tab-panel>
        <yd-tab-panel label="体育彩">
          <lottery-content :datas="sport" class="animtes"></lottery-content> -->
      <!-- <div class="prediction">新版本即将上线，敬请期待···</div> -->
      <!-- </yd-tab-panel>
        <yd-tab-panel label="PK拾">
          <lottery-content :datas="pk" class="animtes"></lottery-content>
        </yd-tab-panel>
        <yd-tab-panel label="11选5">
          <lottery-content :datas="eleven" class="animtes"></lottery-content>
        </yd-tab-panel>
        <yd-tab-panel label="3D">
          <lottery-content :datas="sandi" class="animtes"></lottery-content>
        </yd-tab-panel>
        <yd-tab-panel label="六合彩">
          <lottery-content :datas="lhc" class="animtes"></lottery-content>
        </yd-tab-panel>
        <yd-tab-panel label="PC蛋蛋">
          <lottery-content :datas="pcdd" class="animtes"></lottery-content>
        </yd-tab-panel>
        <yd-tab-panel label="其他">
          <lottery-content :datas="elseData" class="animtes"></lottery-content>
        </yd-tab-panel>
        </yd-tab> -->

      <yd-tab>
        <yd-tab-panel class="abcd" label="彩票">
          <div class='left'>
            <ul class='left-qdcz' v-for="(item,index) in gList" :key="index" @click="changeListli(item)" :class="{flag: actives == item }">
              <li>{{item}}</li>
            </ul>
          </div>
          <div class="right">
            <lottery-content v-if="this.actives === '时时彩'" :datas="ssc" class="animtes"></lottery-content>
            <lottery-content v-else-if="this.actives ==='快三'" :datas="k3" class="animtes"></lottery-content>
            <lottery-content v-else-if="this.actives ==='PK拾'" :datas="pk" class="animtes"></lottery-content>
            <lottery-content v-else-if="this.actives ==='11选5'" :datas="eleven" class="animtes"></lottery-content>
            <lottery-content v-else-if="this.actives ==='3D'" :datas="sandi" class="animtes"></lottery-content>
            <lottery-content v-else-if="this.actives ==='六合彩'" :datas="lhc" class="animtes"></lottery-content>
            <lottery-content v-else-if="this.actives ==='PC蛋蛋'" :datas="pcdd" class="animtes"></lottery-content>
            <lottery-content v-else-if="this.actives ==='其他'" :datas="other" class="animtes"></lottery-content>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="体育彩">
          <lottery-content :datas="sport" class="animtes"></lottery-content>
        </yd-tab-panel>
        <!-- <yd-tab-panel label="电子游戏">
          <lotteryYouxilist></lotteryYouxilist>
        </yd-tab-panel> -->
      </yd-tab>

    </div>
  </div>
</template>
<script>
import lotteryContent from "./lotteryList";
import publicHead from "../../huiYuan/components/moreService/publicHead";
import lotteryYouxilist from "../../youXi/components/lotteryYouxilist";
import api from '../../../../api/game'
export default {
  components: {
    publicHead,
    lotteryContent,
    lotteryYouxilist
  },
  data() {
    return {
      funcName: "全部彩种",
      dataList: [],
      ssc: [],
      k3: [],
      pk: [],
      sandi: [],
      eleven: [],
      lhc: [],
      pcdd: [],
      sport: [],
      actives: "",
      other: [],
      gList: [
        "时时彩",
        "快三",
        "PK拾",
        "11选5",
        "3D",
        "六合彩",
        "PC蛋蛋",
        "其他"
      ]
    };
  },
  mounted() {
    this.actives = this.gList[0];
    this.getData();
  },
  methods: {
    changeListli: function(item) {
      this.actives = item;
    },
    // scrollToShow(e) {
    //     if (e.x / window.innerWidth > 0.5) {
    //         e.srcElement.parentElement.parentElement.scrollLeft +=
    //             e.x - window.innerWidth / 2
    //     } else {
    //         e.srcElement.parentElement.parentElement.scrollLeft -=
    //             window.innerWidth / 2 - e.x
    //     }
    // },
    async getData() {
      this.$dialog.loading.open("正在加载中···");
      await api.getGameList().then(res => {
        res.map((item, index) => {
          this.dataList.push(item);
          switch (item.js_tag) {
            case "pcdd":
              this.pcdd.push(item);
              break;
            case "ssc":
              this.ssc.push(item);
              break;
            case "pk10":
              this.pk.push(item);
              break;
            case "k3":
              this.k3.push(item);
              break;
            case "3d":
              this.sandi.push(item);
              break;
            case "11x5":
              this.eleven.push(item);
              break;
            case "lhc":
              this.lhc.push(item);
              break;
            case "sport_key":
              this.sport.push(item);
              break;
            default:
              this.other.push(item)
              break;
          }
        });
        this.$dialog.loading.close();
      });
    }
  }
};
</script>
<style lang="scss">
@import "../../../css/common.scss";
.betting_main_content {
  flex: 1;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: stretch;
  .abcd {
    height: 100%;
    .left {
      float: left;
      width: 25%;
      background: #f2f3f4;
      overflow: scroll;
      height: 100%;
      ul {
        flex: 1;
        width: 80%;
        overflow: scroll;
        // position: relative;
        background: url(~img/goucai/morenzhuangtai.png) no-repeat;
        background-size: contain;
        background-position: center;
        height: poTorem(50px);
        margin-left: poTorem(11px);
        li {
          outline: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          margin: auto;
          @include center;
          height: poTorem(50px);
          font-size: poTorem(16px);
          color: #535353;
          font-weight: 900;
        }
      }
      .flag {
        @include center;
        background: url(~img/goucai/the_selected.png) no-repeat;
        width: 80%;
        height: poTorem(50px);
        background-size: contain;
        background-position: center;
        font-size: poTorem(16px);
        li {
          color: #fff;
        }
      }
    }
    .right {
      flex: 1;
      float: right;
      display: block;
      width: 75%;
      height: 99%;
      overflow: scroll;
    }
  }
}
.betting_main_body .yd-tab {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.betting_main_content .abcd {
  flex: 1;
  width: 100%;
}
.betting_main_body .abcd .yd-tab-nav-scoll,
.betting_main_body .yd-tab-nav-scoll {
  position: relative;
}
.betting_main_body .abcd .yd-tab-nav,
.betting_main_body .yd-tab-nav {
  position: relative;
  top: 0;
}
.betting_main_body .abcd .yd-tab-panel,
.betting_main_body .yd-tab-panel {
  position: relative;
  top: 0;
  flex: 1;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

// .prediction {
//     text-align: center;
//     padding: poTorem(150px) 0 !important;
//     font-size: poTorem(24px) !important;
//     font-weight: 500;
//     color: #ccc;
//     font-style: italic;
// }
</style>
