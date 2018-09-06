<template>
  <div class="kaijiang">
    <heads></heads>
    <div class="other-block">
      <lotteryList v-for="(item,index) in data" :key="index" :tag='item.tag' :datas="item">
      </lotteryList>
    </div>

  </div>
</template>
<script>
import heads from "./components/heads";
import lotteryList from "./components/lotteryList";
import api from "../../../api/game";

export default {
  data() {
    return {
      data: [
        {
          js_tag: "ssc",
          icon:
            "http://upload.bxvip588.com/sg04/Uploads/cpicon/ffssc.png?1.0.0.0",
          prev: [
            { balls: "4+5+6+2+0", qishu: 20180419036, opentime: 1524110400 }
          ],
          game_name: "重庆时时彩",
          tag: "cqssc"
        },
        {
          js_tag: "pk10",
          icon:
            "http://upload.bxvip588.com/sg04/Uploads/cpicon/ff11x5.png?1.0.0.0",
          game_name: "北京PK拾",
          gameid: 2,
          prev: [
            {
              balls: "04+08+05+03+10+09+02+07+06+01",
              qishu: 671395,
              opentime: 1521215820
            }
          ],
          tag: "pk10"
        },
        {
          icon:
            "http://upload.bxvip588.com/sg04/Uploads/cpicon/sflhc.png?1.0.0.0",
          prev: [{ balls: "7+8+4", qishu: 2018031623, opentime: 1521207000 }],
          gameid: 3,
          tag: "shssl",
          js_tag: "3d",
          game_name: "上海时时乐"
        },
        {
          icon:
            "http://upload.bxvip588.com/sg04/Uploads/cpicon/shssl_2.png?1.0.0.0",
          gameid: 4,
          tag: "tjssc",
          game_name: "天津时时彩",
          js_tag: "ssc",
          prev: [
            { balls: "9+6+5+3+7", qishu: 20180316084, opentime: 1521211680 }
          ]
        },
        {
          icon:
            "http://upload.bxvip588.com/sg04/Uploads/cpicon/gd11x5.png?1.0.0.0",
          gameid: 5,
          tag: "xjssc",
          game_name: "新疆时时彩",
          js_tag: "ssc",
          prev: [
            { balls: "0+3+1+6+5", qishu: 20180316092, opentime: 1521220800 }
          ]
        },
        {
          icon:
            "http://upload.bxvip588.com/sg04/Uploads/cpicon/sfpk10.png?1.0.0.0",
          gameid: 6,
          tag: "ahk3",
          game_name: "安徽快三",
          js_tag: "k3",
          prev: [{ balls: "1+3+3", qishu: 20180316080, opentime: 1521208800 }]
        },
        {
          icon:
            "http://upload.bxvip588.com/sg04/Uploads/cpicon/wfpk10.png?1.0.0.0",
          gameid: 7,
          tag: "jsk3",
          game_name: "江苏快三",
          js_tag: "k3",
          prev: [{ balls: "2+3+6", qishu: 20180316082, opentime: 1521209400 }]
        },
        {
          icon:
            "http://upload.bxvip588.com/sg04/Uploads/cpicon/gxk3.png?1.0.0.0",
          prev: [{ balls: "1+4+6", qishu: 20180426025, opentime: 1524718680 }],
          gameid: 46,
          tag: "shk3",
          game_name: "上海快三"
        },
        {
          icon:
            "http://upload.bxvip588.com/sg04/Uploads/cpicon/sh11x5.png?1.0.0.0",
          game_name: "幸运飞艇",
          js_tag: "pk10",
          gameid: 47,
          js_tag: "pk10",
          prev: [
            {
              balls: "07+02+08+06+04+09+05+01+10+03",
              qishu: 20180425180,
              opentime: 1524686640
            }
          ],
          tag: "mlaft"
        }
      ],
      refreshTimer: Function,
      resTimer: Function,
      balls: []
    };
  },
  mounted() {
    this.$dialog.loading.open(" ");
    this.getKjCpLog_get();
  },
  activated() {
    this.callback();
  },
  deactivated() {
    clearInterval(this.refreshTimer);
  },
  methods: {
    async getKjCpLog_get() {
      let games = await api.getGameList();
      this.$ajax("request", {
        ac: "getKjCpLog",
        tag: "",
        date: 0
      }).then(res => {
        if (games) {
          res.forEach(item => {
            let game = games.find(x => x.game_id === item.gameid);
            if (game) {
              item.enable = game.enable;
              item.speed = game.speed
            }
          });
        }
        this.data = res;
        this.$dialog.loading.close();
      });
    },
    callback() {
      this.refreshTimer = setInterval(() => {
        this.getKjCpLog_get();
      }, 30000);
    }
  },
  components: {
    heads,
    lotteryList
  }
};
</script>
<style lang="scss" scoped>
.kaijiang {
  overflow: auto;
  background-color: #fff;
  .other-block {
    flex: 1;
    overflow: scroll;
  }
}
</style>
