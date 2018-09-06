<template>
  <div class="zzgg-preview">
    <header class="head">
      <div class="head_con">
        <div @click="router">
          <div class="icon"></div>
        </div>

        <div class="title">
          <i>{{gameTypeMap[gameType].label}}</i>
        </div>
        <div class="switch">
          <div class="cate">
            <span>
              <FootballTime></FootballTime>
            </span>
          </div>
        </div>
      </div>
    </header>

    <div class="con">
      <div class="chase">
        <span class="chases" @click="addSchedule">
          <i class="icon_add"></i>
          <span>添加赛事</span>
        </span>
        <span class="chases" @click="clearSchedule">
          <i class="icon_zhui"></i>
          <span>清空重选</span>
        </span>
      </div>
    </div>

    <div class="shop_content_wrap">
      <div class="shows">
        <ul>
          <template v-for="(item, index) in bet_data">
            <li :key="index">
              <span class="title1">{{render_normal(item, 'league_name')}}</span>
              <div class="title2">
                <span>
                  {{render_normal(item, 'h')}}
                </span>
                vs
                <span>
                  {{render_normal(item, 'v')}}
                </span>
              </div>
              <div class="title2">
                <span>
                  {{render_play_method(item)}}：
                </span>
                <span>{{render_txt(item)}}
                </span>
                <span class="pl">
                  @
                  <i>{{item.p}}</i>
                  <!-- <i>{{render_pl(item)}}</i> -->
                </span>
              </div>
              <span class="icon" @click="delBet(index)"></span>
            </li>
          </template>
        </ul>

      </div>
      <!-- <p class="serrated"></p> -->
      <div class="protocol">
        <yd-checkbox class="checkbox" v-model="isAgree" @click.native.prevent="showAggrement($event)" color="#fff">我已阅读并同意
          <span>《{{sysinfo.web_title}}服务协议》</span>
        </yd-checkbox>
      </div>
    </div>
    <FootballFooter></FootballFooter>
  </div>

</template>
<script>
import debounce from "lodash/debounce";
import { mapActions, mapState } from "vuex";
import FootballTime from "../components/FootballTime";
import FootballFooter from "../components/FootballFooter";
import { playPMs, BTLists, getItem } from "./components/allPlay/allPlay.const.js";

export default {
  name: "zhggPreview",
  components: { FootballTime, FootballFooter },
  data() {
    return {
      newData: [],
      isAgree: true
    };
  },
  computed: {
    ...mapState({
      sysinfo: state => state.sysinfo
    }),
    ...mapState("football", [
      "gameTypeMap",
      "gameType",
      "playType",
      "bet_data",
      "timeCount",
      "zhgg_preview"
    ])
  },
  watch: {
    "timeCount.getData"() {
      if (!this.zhgg_preview) this.getNew();
    },
    // bet_data() {
    //   if (!this.zhgg_preview) this.getNew();
    // }
  },
  activated() {
    this.queryComputed(["reset"]);
    this.getNew();
  },
  deactivated() {
    this.modifyFootballField({ zhgg_preview: true });
  },
  methods: {
    ...mapActions("football", [
      "modifyFootballField",
      "queryComputed",
      "getSportGameData"
    ]),
    router() {
      this.modifyFootballField({
        zhgg_preview: true,
        footer: false,
        bet_data: []
      });
      // this.$router.replace({ path: "/football/multi" });
      this.$router.back();
    },
    showAggrement(event) {
      if (event.x > document.body.clientWidth / 2) {
        this.$router.push("/agreement");
      } else {
        this.isAgree = !this.isAgree;
      }
    },
    addSchedule() {
      this.modifyFootballField({ zhgg_preview: true });
      // this.$router.replace({ path: "/football/multi" });
      this.$router.back();
    },
    clearSchedule() {
      this.$dialog.confirm({
        title: "提示",
        mes: "确定删除所有比赛？",
        opts: () => {
          this.modifyFootballField({
            zhgg_preview: true,
            footer: false,
            bet_data: []
          });
          // this.$router.replace({ path: "/football/multi" });
          this.$router.back();
        }
      });
    },
    delBet(i) {
      let bet_data = Object.assign([], this.bet_data);
      bet_data.splice(i, 1);
      this.modifyFootballField({ bet_data: bet_data,bet_txt: bet_data.length });
    },
    render_normal({schedule_id}, field) {
      let data =
        this.newData.filter(el => el.schedule_id === schedule_id)[0] || {};
      return data[field];
    },
    render_play_method({play_method}) {
      let one = getItem(playPMs, play_method)
      let s= one.name + one.target
      return s;
    },
    render_txt({schedule_id,play_method,team, k}) {
      // console.error(play_method,team , k)
      let s = getItem(BTLists, team || k).name || k
      s+= team && k;
      return s;
    },
    render_pl({schedule_id,play_method,team, k}) {
      let data = this.newData.filter(
        el => el.schedule_id === schedule_id
      )[0] || {};
      data = data.bet_data || {}
      data = data[play_method]
      if(!data) return ''
      let s = "";
      if(team)s= data[team][0].p
      else s= data.filter(el => el.k === k)[0].p;
      return s;
    },
    getNew: debounce(async function() {
      if (!this.bet_data.length) return (this.newData = []);
      let data = await this.getSportGameData();
      this.newData = data;
      this.queryComputed(["reset"]);
    }, 500)
  }
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.zzgg-preview {
  .head {
    width: 100%;
    position: relative;
    height: poTorem(48px);
    .head_con {
      @include between;
      background: url(~img/goucai/goucaibg.png);
      width: 100%;
      height: poTorem(48px);
      padding: 0 poTorem(10px);
      position: fixed;
      top: 0;
      // z-index: 22;
      z-index: 1999;
      .icon {
        background: url(~img/shouye/back.png) no-repeat;
        width: poTorem(60px);
        height: poTorem(20px);
        background-size: poTorem(20px) poTorem(20px);
      }
      .title {
        text-align: center;
        font-size: poTorem(16px);
        color: #fff;
        font-weight: bolder;
        @include center;
        i {
          font-size: poTorem(20px);
        }
        .trangle {
          width: 0px;
          height: 0px;
          border-bottom: solid poTorem(6px) #ffffff;
          border-right: solid poTorem(6px) #ffffff;
          border-top: solid poTorem(6px) #ff7c34;
          border-left: solid poTorem(6px) #ff7c34;
          margin-left: poTorem(5px);
        }
      }
      .switch {
        @include between;
        width: poTorem(60px);
        .cate {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
        span {
          font-size: poTorem(20px);
          padding-right: poTorem(8px);
          color: #fff;
          font-weight: bolder;
        }
        i {
          display: inline-block;
          background: url(~img/football/category.png);
          width: poTorem(23px);
          height: poTorem(23px);
          background-size: poTorem(23px) poTorem(23px);
        }
      }
    }
  }
  .con {
    width: 100%;

    .chase {
      @include between;
      height: poTorem(60px);
      background: #fff;
      padding: 0 poTorem(20px);
      .chases {
        margin: 0 7px;
        @include center;
        width: poTorem(110px);
        height: poTorem(40px);
        background: #f5f6f7;
        border-radius: poTorem(5px);
        font-size: poTorem(16px);
        color: #6c6d6e;
        border: poTorem(1px) solid #e7e8e8;
        span {
          width: poTorem(65px);
          margin-left: poTorem(3px);
        }
        .icon_add {
          background: url(~img/goucai/fanhuigoucai.png) no-repeat;
          background-size: cover;
          width: poTorem(20px);
          height: poTorem(20px);
          display: inline-block;
        }
        .icon_zhui {
          background: url(~img/goucai/qingkong2.png) no-repeat;
          background-size: cover;
          width: poTorem(15px);
          height: poTorem(15px);
          display: inline-block;
        }
      }
    }
  }
  .shop_content_wrap {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    position: relative;
    width: 100%;
    padding-bottom: 7rem;
    &::-webkit-scrollbar {
      display: none;
    }
    .shows {
      padding: 1rem;
      // flex: 1;
      min-height: 18rem;
      position: relative;
      @include column;
      background: url("~img/goucai/ticket_bg.png") center center no-repeat;
      background-size: 100% 100%;
      ul {
        overflow-y: auto;
        width: 100%;
        padding: .5rem 1rem;
        li {
          @include column;
          align-items: flex-start;
          position: relative;
          padding: poTorem(10px) 0;
          border-bottom: poTorem(1px) dashed #ddd;
          &:last-child {
            border-bottom: none;
            padding-bottom: poTorem(5px);
          }
          .title1 {
            color: #343434;
            font-size: poTorem(18px);
          }
          .title2 {
            color: #676767;
            font-size: poTorem(18px);
          }
          .pl {
            color: #e33939;
          }
          .icon {
            background: url(~img/goucai/shanchu.png) no-repeat;
            background-size: contain;
            width: poTorem(20px);
            height: poTorem(20px);
            position: absolute;
            right: poTorem(10px);
            top: poTorem(40px);
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.protocol {
  padding: 0.7rem;
  .checkbox {
    input[type="checkbox"]:checked + .yd-checkbox-icon {
      border-color: #ccc;
    }
    border-color: #ccc;
    .yd-checkbox-icon {
      background-color: #fff;
      border-color: rgb(204, 204, 204);
      i {
        border-color: #f00;
      }
    }
  }
}
</style>