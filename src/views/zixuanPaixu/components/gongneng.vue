<template>
  <div class="gongNeng_zixuanPaixu">
    <div class="gongNeng_my">
      <div class="gongNeng_top">
        <div class="left">当前排序</div>
        <span @click="saveMenuClick"
              class="right">保存</span>
      </div>
      <draggable v-model="optionalList"
                 :options="{draggable:'.shortcut_list', animation:150}"
                 style="min-height:6rem"
                 :no-transition-on-drag="true"
                 @start="drag=true"
                 @end="drag=false">
        <transition-group :name="!drag? 'list-complete' : null"
                          :css="true"
                          tag="ul"
                          class="shortcut">
          <li v-for="item in optionalList"
              :key="item.addgn"
              class="shortcut_list">
            <div>{{item.label}}</div>
          </li>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import draggable from "vuedraggable";

export default {
  components: {
    draggable
  },
  data() {
    return {
      optionalList: [],
      drag: false // 内置拖放状态， false拖到完成，true拖到中
    };
  },
  computed: {
    ...mapGetters("zixuanPaixu", ["getMenus"])
  },
  created() {},
  mounted() {},
  activated() {
    this.optionalList = this.getMenus;
  },
  deactivated() {},
  methods: {
    ...mapActions("zixuanPaixu", ["saveMenu"]),
    selected(item) {
      if (this.optionalList.includes(item)) return;
      this.optionalList = [...this.optionalList, item];
    },
    saveMenuClick() {
      this.saveMenu(this.optionalList);
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
@function poTorem($px) {
  @return $px / 16px * 1rem;
}
@import "~css/resources";
.gongNeng_zixuanPaixu {
  flex: 1;
  height: 0;
  overflow-y: auto;
  background-color: #fff;
  .gongNeng_my {
    width: 100%;
    margin-bottom: poTorem(10px);
    .shortcut {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin: 0 poTorem(13px);
      .shortcut_list {
        width: 33.3%;
        text-align: center;
        color: #5f5f5f;
        line-height: poTorem(37px);
        border-radius: poTorem(5px);
        font-size: poTorem(17px);
        padding: poTorem(8px) poTorem(10px);
        position: relative;
        > div {
          background: #f3f3f3;
          box-shadow: 0px 0px poTorem(15px) #a7a2a2;
        }
      }
    }
    .gongNeng_top {
      display: flex;
      width: 100%;
      height: poTorem(50px);
      align-items: center;
      .left {
        font-size: poTorem(18px);
        color: #414141;
        text-align: left;
        margin-left: poTorem(20px);
        flex: 1;
      }
      .right {
        width: poTorem(55px);
        height: poTorem(23px);
        line-height: poTorem(23px);
        font-size: poTorem(15px);
        color: $mainColor;
        text-align: center;
        border-radius: poTorem(25px);
        margin-right: 1rem;
        border: 1px solid $mainColor;
      }
    }
  }
}
</style>
