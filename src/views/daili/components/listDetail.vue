<template>
  <div>
    <publicHead :title="params.title" :type="1"></publicHead>
    <!-- <yd-list theme="4">
      <yd-list-item v-for="(item,key) in params.data" :key="key" class="item-cell" type="div">
        <div slot="other" class="item-other">
          <span class="item-other-txt txt-label">{{item.label}}</span>
          <span class="item-other-txt txt-value">{{item.value}}</span>
        </div>
      </yd-list-item>
    </yd-list> -->
    <div class="ul-contain">
      <div v-for="(item,key) in params.data" :key="key" class="item-cell">
        <span class="item-other-txt txt-label">{{item.label}}</span>
        <span class="item-other-txt txt-value" :class="item.class">{{item.value}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import publicHead from "../../huiYuan/components/moreService/publicHead";
export default {
  components: { publicHead },
  data() {
    return {
      funcName: "123",
    };
  },
  computed: {
    params() {
      return this.$route.params;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../css/resources.scss";
.ul-contain {
  padding-top: poTorem(20px);
  .item-cell {
    @include start;
    height: poTorem(50px);
    padding-left: poTorem(20px);
    // padding-right: poTorem(100px);
  }
  .item-img {
    display: none;
  }
  .item-other {
    display: flex;
  }
  .item-other-txt {
    font-size: poTorem(20px);
    color: #7d7d7d;
  }
  .txt-label {
    flex-basis: 130px;
    text-align: right;
    padding-right: 20px;
  }
  .red {
    color: #e33939;
  }
}
</style>


