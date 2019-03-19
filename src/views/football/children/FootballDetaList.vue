<template>
  <div class="footballDetaiList_main_body">
    <div class="tit">{{data.league_name}}</div>
    <div class="item">
      <div class="cent"
           v-for="(item,indexs,key) in data.schedule"
           :key="key">
        <p class="title">{{item.h}}</p>
        <yd-grids-group :rows="2">
          <yd-grids-item v-for="(i,indexss,key) in item.bet_data.CHP"
                         :key="key"
                         @click.native="select($event,item)"
                         :class="['items', (indexs + '' +indexss),{selected: footer&&selectedKey === indexs + '' + indexss }]">
            <span slot="text">{{i.k}}</span>
            <b slot="text">{{i.p}}</b>
          </yd-grids-item>
        </yd-grids-group>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      // funcName: "详情",
      data: [],
      recordTime: "",
      bet_data: {},
      selectedKey: ""
    };
  },

  computed: {
    ...mapState("football", ["footer", "sport_id", "money"])
  },
  mounted() {
    this.modifyFootballField({ footer: false });
  },
  activated() {
    this.data = this.$route.params;
    console.log(this.data);
  },
  methods: {
    ...mapActions("football", [
      "modifyFootballField",
      "getSportMobileGameList",
      "queryComputed"
    ]),
    select(e, item) {
      const obj = e.target.closest(".items");
      if (e.target.closest(".items").className.indexOf("selected") === -1) {
        // 选中
        this.selectedKey = e.target
          .closest(".items")
          .className.replace(/[^0-9]/gi, "");
        this.bet_data.history_id = item.history_id;
        this.bet_data.schedule_id = item.schedule_id;
        this.bet_data.k = obj.children[0].children[0].innerText;
        this.bet_data.p = obj.children[0].children[1].innerText;
        this.bet_data.play_method = "CHP";
        (this.bet_data.price = this.money),
        (this.bet_data.sport_id = this.sport_id),
        (this.bet_data.team = ""),
        (this.bet_data.team_score = item.team_score),
        this.modifyFootballField({
          min_stake: item.min_stake,
          max_stake: item.max_stak,
          footer: true,
          bet_txt: this.bet_data.k,
          bet_pl: this.bet_data.p,
          bet_data: [this.bet_data]
        });
      } else {
        // 取消
        this.selectedKey = "";
        this.modifyFootballField({ footer: false });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.footballDetaiList_main_body {
  padding: 0;
  .tit {
    height: 2.8rem;
    line-height: 2.8rem;
    border-bottom: 1px solid #d9d9d9;
    position: relative;
    background-color: rgb(242, 244, 245);
    font-size: 1rem;
    padding: 0 0.5rem;
  }
  .item {
    padding: 0 0.5rem;
  }
  .cent {
    margin-top: 1rem;
    border: 1px solid rgb(234, 234, 234);
    .title {
      display: block;
      text-align: center;
      line-height: 2rem;
      font-size: 0.9rem;
    }
    .selected {
      border: 1px solid rgb(217, 46, 54) !important;
      div span,
      div b {
        color: rgb(217, 46, 54);
      }
    }
    .items {
      height: 2.5rem;
      padding: 0;
      line-height: 2.5rem;
      font-size: 1rem;
      border-top: 1px solid rgb(234, 234, 234);
      span {
        float: left;
      }
      b {
        float: right;
        font-weight: 400;
      }
    }
    .items:before,
    .items:after {
      border-bottom: none !important;
    }
    .active {
      border: 1px solid rgb(213, 0, 0);
      span {
        color: rgb(213, 0, 0);
      }
      b {
        color: rgb(213, 0, 0);
      }
    }
  }
  .foot {
    background-color: rgb(228, 229, 230);
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    padding: 0 0.9rem;
    font-size: 1rem;
    position: fixed;
    bottom: 3rem;
    left: 0;
    p {
      float: left;
      span {
        color: red;
      }
    }
    .check {
      float: right;
    }
  }
}
</style>


