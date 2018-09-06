<template>
  <div class="theWallet">
    <!--充值&提款-->
    
    <div class="main_menu">
      <div class="main_menu_item">
        
        <router-link to="/moreService/Nrecharge">
          <div class="_menu_icon">
            <div class="phone_all_icon">
              <img src="../../../img/personal_center/charge.png" alt="">
            </div>
            <div class="title">我要充值</div>
          </div>
        </router-link>
      </div>

      <div class="main_menu_item">
        
        <router-link to="/moreService/NgetCash">
        <div class="_menu_icon">
         <div class="phone_all_icon">
           <img src="../../../img/personal_center/get_cash.png" alt="">
         </div>
         <div class="title">我要提款</div>
        </div>
        </router-link>
      </div>
      <div class="main_menu_item">
        
        <router-link to="/moreService/rechargeRecord">
          <div class="_menu_icon">
            <div class="phone_all_icon">
              <img src="../../../img/personal_center/charge_record.png" alt="">
            </div>
            <div class="title">充值记录</div>
          </div>
        </router-link>
      </div>
      <div class="main_menu_item">
        
        <router-link to="/moreService/drawingsRecord">
          <div class="_menu_icon">
            <div class="phone_all_icon">
              <img src="../../../img/personal_center/get_record.png" alt="">
            </div>
            <div class="title">提款记录</div>
          </div>
        </router-link>
      </div>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    // this.Marquee();
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.main_menu {
  width: 100%;
  height: poTorem(73px);
  background-color: #fff;
  @include around;
  > div {
    // @include column;
    width: 25%;
    border-left: 0 solid #f3f3f32e;

    ._menu_icon {
      @include column;
      height: poTorem(73px);
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left:poTorem(-1px);

      .phone_all_icon {
        display: inline-block;
        @include center;
        width: 100%;
        font-size: poTorem(36px);
        color: #fa6f10;
        padding-bottom: poTorem(10px);
        img {
          width: poTorem(22px);
          height: poTorem(22px);
        }
      }
    }
    .title {
      display: flex;
      // padding-bottom: poTorem(5px);
      color: #7d7d7d;
      font-size: poTorem(15px);
      font-weight:900;
      text-align: center;
    }
  }
}

</style>
