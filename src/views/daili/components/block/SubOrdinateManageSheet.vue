<template>
  <div class="actions-sheet">
    <div class="sheet-mask"></div>
    <yd-cell-group class="sheet-group">
      <yd-cell-item class="sheet-title">
        <div slot="left" class="sheet-txt txt-label">
          <span @click="back">返回详情</span>
        </div>
        <div slot="right" class="sheet-txt txt-ensure">
          <span @click="hiddle">确定</span>
        </div>
      </yd-cell-item>
      <yd-cell-item v-for="(item,key) in data" :key="key" class="sheet-cell">
        <span slot="left" class="sheet-txt txt-label">{{item.label}}</span>
        <span slot="right" class="sheet-txt txt-value">{{item.value}}</span>
      </yd-cell-item>
    </yd-cell-group>

  </div>
</template>
<script>
export default {
  name: "SubOrdinateManageSheet",
  props: ["data"],
  methods: {
    hiddle() {
      console.log("hiddle");
      this.$emit("rebateShow");
    },
    back() {
      this.$emit("rebateShow");
      this.$emit("back");
      console.log("back");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.actions-sheet {
  .sheet-mask {
    z-index: 1600;
    pointer-events: auto;
    background-color: rgb(0, 0, 0);
    opacity: 0.4;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    // pointer-events: none;
    // opacity: 0;
    transition: opacity 0.2s ease-in;
  }
  .sheet-group {
    z-index: 1606;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    margin-bottom: 0;
    .sheet-title {
      padding: poTorem(8px) poTorem(8px) poTorem(12px) poTorem(20px);
    }
  }
  .sheet-cell {
    @include around;
    height: poTorem(40px);
    padding-left: poTorem(50px);
    padding-right: poTorem(100px);
  }
  .sheet-txt {
    font-size: poTorem(20px);
  }
  .txt-label {
    color: #434343;
  }
  .txt-value {
    color: #959595;
  }
  .txt-ensure {
    color: #00a0e9;
  }
}
</style>
