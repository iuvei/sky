<template>
  <div class="devote_to_remind">
    <div class="kaijiang_times">
      <div class="jiezhi">
        距离&nbsp;
        <i>{{(qishu + '').substr(-4)}}</i>
        &nbsp;期投注截止:
      </div>
      <div class="haoma">
        <yd-countdown ref="openless" :time="openless" timetype="second" format="{%h}:{%m}:{%s}" done-text="正在开奖" :callback="getData"></yd-countdown>
      </div>
      <div class="rapid_betting">
        <div @click="toBetting">
          <span>去投一注</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
// import countDownkj from "./countDownkj";
export default {
  props: ["listType"],
  data() {
    return {
      openless: '',
      routeLists: {},
      nexts: [],
      timer: Function,
      closeIsShow: true,
      val: "",
      qishu: ''
    };
  },
  components: {},
  computed: {
    ...mapState({
      gameName: state => state.trend.gameName,
      gameId: state => state.trend.gameId,
      jsTag: state => state.trend.js_tag,
      nameTag: state => state.trend.name_tag,
      speed: state => state.trend.speed
    })
  },
  activated() {
    this.getData()
  },
  deactivated() {
    clearInterval(this.$refs.openless.timer)
  },
  watch: {
    listType(val) {
      this.getData();
    }
  },
  methods: {
    ...mapActions(['setBetCurent']),
    toBetting() {
      if (this.listType.enable == 2) {
        this.$dialog.toast({ mes: "该彩种正在维护中···" });
        return;
      }
      this.$router.push({
        name: this.listType.js_tag,
        params: {
          lotter_id: this.listType.lotter_id,
          name_tag: this.listType.name_tag,
          game_name: this.listType.game_name,
          js_tag: this.listType.js_tag,
          isHome: true,
          play_type: this.listType.play_type,
          speed: this.listType.speed
        }
      });
    },
    getData() {
      clearInterval(this.$refs.openless.timer)
      this.$ajax("request", {
        ac: "getCplogList",
        tag: this.listType.name_tag
      }).then(res => {
        this.qishu = res[0].next[0].qishu
        if(res[0].next[0].stopless > 0) {
          this.openless = res[0].next[0].stopless
        } else {
          this.openless = res[0].next[1].stopless
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.devote_to_remind {
  .kaijiang_times {
    @include between;
    width: 100%;
    height: poTorem(48px);
    position: fixed;
    z-index: 12;
    bottom: 0;
    background-color: rgba(12, 11, 11, 0.9);
    .jiezhi {
      width: 100%;
      @include start;
      color: rgba(255, 255, 255, 0.8);
      line-height: poTorem(48px);
      font-size: poTorem(16px);
      margin-left: 1rem;
      flex: 1;
      text-align: center;
    }
    .haoma {
      margin-right: poTorem(10px);
      font-size: poTorem(16px);
      color: #d31a30;
      span {
        width: poTorem(40px);
        letter-spacing: poTorem(1px);
        text-indent: poTorem(3px);
      }
      i {
        margin: 0 poTorem(2px);
      }
    }
    .rapid_betting {
      width: poTorem(100px);
      height: poTorem(48px);
      padding: 0;
      background-color: #d31a30;
      span {
        line-height: poTorem(48px);
        color: #fff;
        font-size: poTorem(18px);
        display: block;
        text-align: center;
      }
    }
  }
}
</style>
