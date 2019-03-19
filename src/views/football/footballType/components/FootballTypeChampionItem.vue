<template>
  <div class="footballTypeChampion_main_body">

    <div style="padding: .7rem .7rem 0;background-color:#fff"
         v-for="(items,indexs) in schedules"
         :key="indexs">
      <div class="cent">
        <p class="title">{{items.h}}</p>

        <div class="champion-wrap">
          <div class="champion-item"
               v-for="(el,index) in items.bet_data.CHP"
               :key="index"
               @click="select(el,items)"
               :class="['champion-item', {selected: footer&&selectedKey === items.schedule_id + '||' + el.k }]">
            <yd-flexbox>
              <yd-flexbox-item class="league-name">{{el.k}}</yd-flexbox-item>
              <div class="schedule-num">{{el.p}}</div>
            </yd-flexbox>
          </div>
          <div class="champion-item"
               v-if="items.bet_data.CHP.length%2!==0"></div>
        </div>
        <!-- <yd-grids-group :rows="2">
          <yd-grids-item v-for="(el,indexss) in items.bet_data.CHP" :key="indexss" @click.native="select(el,items)" :class="['items', {selected: footer&&selectedKey === items.schedule_id + '||' + el.k }]">
            <span slot="text">{{el.k}}</span>
            <b slot="text">{{el.p}}</b>
          </yd-grids-item>
        </yd-grids-group> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "champion",
  props: ["schedules"],
  data() {
    return {
      selectedKey: "",
      bet_data: {}
    };
  },
  computed: {
    ...mapState("football", ["footer", "sport_id", "money"])
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapActions("football", ["modifyFootballField", "queryComputed"]),
    select(
      { k, p },
      { schedule_id, history_id, team_score, min_stake, max_stake }
    ) {
      const _selectedKey = schedule_id + "||" + k;
      if (_selectedKey !== this.selectedKey) {
        // 选中
        this.selectedKey = _selectedKey;
        this.bet_data = {
          history_id,
          schedule_id,
          k,
          p,
          play_method: "CHP",
          price: this.money,
          sport_id: this.sport_id,
          team: "",
          team_score
        };

        this.modifyFootballField({
          min_stake,
          max_stake,
          footer: true,
          bet_txt: k,
          bet_pl: p,
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
<style lang="scss">
.footballTypeChampion_main_body {
  height: 100%;
  background-color: #fff;
  .yd-grids-2:before {
    border-bottom: none;
  }
  .lab {
    height: 2.8rem;
    line-height: 2.8rem;
    border-radius: 0.2rem;
    margin-top: 0.5rem;
    border: 1px solid #d9d9d9;
    padding: 0 0.5rem;
    position: relative;
    overflow: hidden;
    .lent {
      display: inline-block;
      width: 2.8rem;
      height: 2.8rem;
      line-height: 2.8rem;
      text-align: center;
      position: absolute;
      right: 0;
      background-color: #dbdbdb;
    }
  }
  .cent {
    border: 1px solid rgb(234, 234, 234);
    .title {
      display: block;
      text-align: center;
      line-height: 2rem;
      font-size: 0.9rem;
    }
    .champion-wrap {
      display: flex;
      flex-wrap: wrap;
      .champion-item {
        width: 50%;
        line-height: 3rem;
        border-top: 1px solid #eaeaea;
        &:nth-child(even) {
          border-left: 1px solid #eaeaea;
        }
      }
      .league-name {
        padding-left: 0.2rem;
      }
      .schedule-num {
        background-color: unset;
      }
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
  .empty {
    padding-top: 50%;
    img {
      display: block;
      width: poTorem(93px);
      margin: 0 auto;
    }
    p {
      font-size: poTorem(14px);
      height: poTorem(20px);
      line-height: poTorem(20px);
      text-align: center;
      color: #bfbfbf;
      font-weight: 700;
    }
  }
  .yd-pullrefresh-dragtip {
    top: 0 !important;
    height: poTorem(100px);
    font-size: poTorem(20px);
  }
  .yd-list-donetip {
    height: poTorem(60px);
    font-size: poTorem(20px);
  }
  .yd-accordion-head {
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    .yd-accordion-title {
      font-size: 1.2rem;
      color: #000;
    }
  }
}
</style>

