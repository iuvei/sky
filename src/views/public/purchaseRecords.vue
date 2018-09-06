<template>
<!-- 用于购彩记录 -->
  <div class="purchaseRecords">
    <!-- 头部 -->
    <div class="purchaseRecords_head">
      <router-link to="/member">
        <span class="iconfont icon-fanhui"></span>
      </router-link>
      <span class="title">投注记录</span>
      <div class="right">
        <div class="icon_list">
            <span>当天</span>
        </div>
        <div class="icon icon-daosanjiao">
        </div>
      </div> 
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    };
  },
  computed: {
  


  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "../../css/resources.scss";
.purchaseRecords {
  padding: 0;
  .purchaseRecords_head {
    @include between;
    height: poTorem(48px);
    width: 100%;
    background: url(../../img/phone_header.png) CENTER TOP;
    .iconfont {
      font-size: poTorem(24px);
      padding-left: poTorem(10px);
      color: #fff;
      font-weight: bolder;
    }
    .title {
      margin-right: poTorem(-75px);
       color: #fff;
      font-weight: bolder;
      font-size: poTorem(19px);
    }

    .right {
        width: poTorem(98px);
         color: #fff;
    justify-content: space-around;
      align-items: center;
      font-size: poTorem(16px);
      font-weight: bolder;

      .icon_list {
          width: poTorem(65px);
        height: poTorem(18px);
        justify-content: space-around;
        align-items: center;
          text-align: right;
      }

      .icon {
    
          display: flex;
        width: poTorem(14px);
        height: poTorem(7px);
        justify-content: space-around;
        text-align: center;
        position: fixed;
        margin-top: poTorem(-22px);
        margin-left: poTorem(68px);
      }
    }
  }
 
  
}
</style>
