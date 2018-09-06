<template>
  <yd-cell-group>
    <div v-for="(item, index) in data" :key="index" class="transfer_option" @click="clickItem(item)">
      <div class="transfer_info">
        <div class="tag">
          <p>银行</p>
          <p>汇款人</p>
          <p>汇款资讯</p>
        </div>
        <div class="content">
          <p>{{item.bank_type}}</p>
          <p>{{item.real_name}}</p>
          <p>{{item.bank_home}}</p>
        </div>
      </div>
      <img class="arrow_down" src="../../../../../img/daili/arrow_right.png" alt="">
    </div>
  </yd-cell-group>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {};
  },
  methods: {
    clickItem(item) {
      // showBankTransferInfo
      this.$emit("clickItem", item);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
.transfer_option {
  @include between;
  padding: 0 poTorem(20px);
  height: poTorem(100px);
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  .transfer_info {
    @include between;
  }
  .tag {
    width: poTorem(70px);
    font-size: poTorem(14px);
    color: #7d7d7d;
  }
  .content {
    font-size: poTorem(15px);
    color: #434343;
  }
  .tag p,
  .content p {
    height: poTorem(30px);
    line-height: poTorem(30px);
  }
  .arrow_down {
    width: poTorem(20px);
    height: poTorem(20px);
  }
}
</style>

