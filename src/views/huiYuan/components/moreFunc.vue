<template>
  <yd-grids-group :rows="2">
    <yd-grids-item>
      <div class="little_grid">
        <div class="grid_icon">
          <img src="../../../img/personal_center/bought_record.png"
               alt="">
        </div>
        <div class="grid_desp">
          <p>购彩记录</p>
          <p>查看投注记录</p>
        </div>
      </div>
    </yd-grids-item>
    <yd-grids-item>
      <yd-icon slot="icon"
               name="home"
               color="#FF685D"></yd-icon>
      <span slot="text">iconfont</span>
    </yd-grids-item>
  </yd-grids-group>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
@import url(../../../css/resources.scss);
.little_grid {
  .grid_icon {
    float: left;
    img {
      width: poTorem(20px);
      height: poTorem(20px);
    }
  }
  .grid_desp {
    float: left;
  }
}
</style>


