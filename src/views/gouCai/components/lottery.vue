<template>
  <div class="lottery">
    <yd-tab active-color="#F93" class="tab" v-if="flag" :callback="choose">
      <yd-tab-panel label="热门" active tabkey=1>
        <lottery-content :datas="dataList" :indexFlag="1" class="animtes"></lottery-content>
        <!-- <lottery-list :dataList="dataList" :indexFlag="indexFlag" class="animtes" v-show="tabVal"></lottery-list> -->
      </yd-tab-panel>
      <yd-tab-panel label="高频彩" tabkey=2>
        <lottery-content :datas="dataHeigh" :indexFlag="2" class="animtes"></lottery-content>
        <!-- <lottery-list :dataList="dataHeigh" :indexFlag="indexFlag" class="animtes" v-show="tabVal"></lottery-list> -->
      </yd-tab-panel>
      <yd-tab-panel label="低频彩" tabkey=3>
        <lottery-content :datas="dataLow" :indexFlag="2" class="animtes"></lottery-content>
        <!-- <lottery-list :dataList="dataLow" :indexFlag="indexFlag" class="animtes" v-show="tabVal"></lottery-list> -->
      </yd-tab-panel>
      <yd-tab-panel label="体育彩" tabkey=4>
        <!-- <div @click="goFootball">goFootball</div> -->
        <lottery-content :datas="dataSport" :indexFlag="2" class="animtes"></lottery-content>
        <!-- <div class="prediction">新版本即将上线，敬请期待···</div> -->
      </yd-tab-panel>
    </yd-tab>
  </div>
</template>
<script>
import lotteryContent from './lotteryContent'
import { mapState } from 'vuex'
import api from '../../../../api/game'
export default {
  data() {
    return {
      data: [],
      dataHeigh: [],
      dataLow: [],
      dataList: [],
      dataSport: [],
      flag: false,
      timer: Function
    }
  },
  components: {
    lotteryContent
  },
  created() {
    this.getData()
  },
  // mounted() {
  //   this.getData();
  // },
  methods: {
    goFootball() {
      this.$router.push({ name: 'footballMulti' })
    },
    /**获得数据 */
    async getData() {
      let games = await api.getGameList()
      if (games && games.length) {
        // await api.getGamePlayConfigs();
        // if (!this.$store.state.userinfo.isLogin) {
        //   api.setUnloginOdds(games);
        // }

        this.data = games
        // console.log(JSON.stringify(res));
        /**过滤数据 */
        let checkArr = ['15', '16', '14']
        games.map((item, index) => {
          // 区分彩票和体彩
          // if(item.type == 1) {
          if (item.hot == 1) {
            this.dataList.push(item)
          }
          if (item.type == 1) {
            if (item.speed == 1) {
              this.dataHeigh.push(item)
            } else {
              this.dataLow.push(item)
            }
          } else {
            this.dataSport.push(item)
          }
        })
        this.flag = true
      }

      // api.getGameList().then(res => {
      //   // debugger;
      //   this.data = res;
      //   // console.log(JSON.stringify(res));
      //   /**过滤数据 */
      //   let checkArr = ["15", "16", "14"];
      //   res.map((item, index) => {
      //     // 区分彩票和体彩
      //     if (item.hot == 1) {
      //       this.dataList.push(item);
      //     }
      //     if (item.speed == 1) {
      //       this.dataHeigh.push(item);
      //     } else {
      //       this.dataLow.push(item);
      //     }
      //     if (item.type == 2 && item.enable) {
      //       this.dataSport.push(item);
      //     }
      //   });
      //   this.flag = true;
      // });
    },
    /**更新倒计时 */
    daojishi() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.$ajax('request', {
          ac: 'getKjCpLog',
          tag: 'all',
          date: 0,
          pcount: 10,
          ncount: 5,
          pageid: 0
        }).then(res => {
          this.data = res
          this.daojishi()
        })
      }, 180000)
    },
    choose(lable, tabkey) {
      this.indexFlag = tabkey
    }
  }
}
</script>
<style lang="scss" scoped>
@function poTorem($px) {
  @return $px / 16px * 1rem;
}

.lottery {
  position: relative;
  .prediction {
    text-align: center;
    padding: poTorem(150px) 0;
    font-size: poTorem(24px);
    font-weight: 500;
    color: #ccc;
    font-style: italic;
  }
}
</style>
