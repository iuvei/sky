<template>
  <div class="addBetting_main_body">
    <publicHead :title="funcName" :type="5"></publicHead>
    <lotteryContent :datas='lotteryList' :gray="true"></lotteryContent>
  </div>
</template>
<script>
import publicHead from "../../huiYuan/components/moreService/publicHead";
import lotteryContent from "./lotteryList";
export default {
  components: {
    publicHead,
    lotteryContent
  },
  data() {
    return {
      funcName: "添加彩种",
      lotteryList: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$dialog.loading.open("正在加载中···");
      this.$ajax("request", {
        ac: "getGameListAtin",
        tag: "",
        gameid: ""
      }).then(res => {
        this.lotteryList = res;
        this.$dialog.loading.close();
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../../../css/resources.scss";
.addBetting_main_body {
  .func_part {
    .yd-grids-3{
      width: 100%;
    }
  }
}
</style>


