<template>
  <yd-cell-group>
    <yd-cell-item arrow
                  v-for="(item, index) in data"
                  :key="index"
                  @click.native="clickItem(item)">
      <div class="pay_option"
           slot="left">
        <div>
          <img :src="'/assets/recharge/bank_logo/'+item.id+'.png'"
               alt="">
        </div>
        <div slot="left">
          <p class="first_row">{{item.name}}</p>
        </div>
      </div>
    </yd-cell-item>
  </yd-cell-group>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {
      bankLogoSrc: "",
      bankName: "中国银行",
      data1: [{ name: "中国银行", src: "", id: 1 }]
    };
  },
  methods: {
    clickItem(item) {
      // onlinePay
      this.$emit("clickItem", item);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
.pay_option {
  @include between;
  height: poTorem(60px);
  border-bottom: 1px solid #ddd;
  .first_row {
    font-size: poTorem(15px);
    color: #434343;
  }
  .second_row {
    font-size: poTorem(13px);
    color: #7d7d7d;
  }
  img {
    width: poTorem(59px);
    height: poTorem(39px);
    padding: 0 poTorem(10px);
  }
}
</style>

