<template>
  <div class="devote_to_remind">
    <div class="kaijiang_times">
      <div class="jiezhi">
        <span>第
          <i style="color:red;">{{(issueNum+ '').slice(-4)}}</i>
          期投注截止时间:</span>
      </div>
      <div class="haoma">
        <div>
          <yd-countdown class="time_top"
                        ref="stopless"
                        :time="stopless"
                        timetype="second"
                        done-text="正在开奖"
                        :callback="endCallback">
            <span>{%h}:{%m}:{%s}</span>
          </yd-countdown>
          <!-- <yd-countdown timetype="second" format="{%h}:{%m}:{%s}" done-text="正在开奖封盘" :callback="getData">00:00:00</yd-countdown> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [""],
  data() {
    return {
      issueNum: 2018,
      stopless: 0
    };
  },
  components: {},
  computed: {},
  activated() {
    this.getBasicData();
  },
  deactivated() {
    clearInterval(this.$refs.stopless.timer);
  },
  watch: {
    issueNum(val) {
      this.$emit("activedData", val);
    }
  },
  methods: {
    async getBasicData() {
      const res = await this.getData();
      this.issueNum = res[0].next[0].qishu;
      this.stopless = res[0].next[0].stopless;
      this.$refs.stopless.run();
    },
    getData() {
      return this.$ajax("request", {
        ac: "getCplogList",
        tag: this.$store.state.betting.name_tag
      });
    },
    async endCallback() {
      const res = await this.getData();
      const stopTime = res[0].next[0].stopless;
      if (stopTime > 1) {
        this.issueNum = res[0].next[0].qishu;
        this.stopless = res[0].next[0].stopless;
      } else {
        this.issueNum = res[0].next[1].qishu;
        this.stopless = res[0].next[1].stopless;
      }
    }
    // getData() {
    //     this.$dialog.loading.open(" ");
    //     this.$ajax("request", {
    //         ac: "getCplogList",
    //         tag: this.listType.name_tag
    //     }).then(res => {
    //         this.qishu = res[0].next[0].qishu;
    //         this.openless = res[0].next[0].openless;
    //         this.$dialog.loading.close();
    //     });
    // }
  }
};
</script>
<style lang="scss" scoped>
@import "../../css/resources.scss";
.devote_to_remind {
  .kaijiang_times {
    @include center;
    width: 100%;
    height: poTorem(38px);
    background: #fff;
    position: fixed;
    font-size: poTorem(16px);
    z-index: 999;
    top: poTorem(48px);
    .jiezhi {
      width: poTorem(210px);
      i {
        font-size: poTorem(16px);
      }
    }
    .haoma {
      width: poTorem(80px);
      margin-left: poTorem(5px);
      // border: 1px solid #515253;
      .time_top {
        display: flex;
        justify-content: flex-end;
        color: red;
        font-size: poTorem(18px);
      }
    }
  }
}
</style>
