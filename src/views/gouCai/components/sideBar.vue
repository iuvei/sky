<template>
  <div class="betting_left">
    <ul>
      <li v-for="(item,index) in menuList"
          :key="item.menuid"
          @click="clickMenu(item, index)"
          :class="{active:index === (curIndex || getCurMenuIndex())}">
        {{item.name}}
      </li>
    </ul>
    <div @click="clickCart"
         style="display:flex">
      <div class="sandi_drag">
        <i class="spots"
           v-show="cartNumber>0">
          {{cartNumber > 99 ? '99+' : cartNumber}}
        </i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "lottery-sidebar",
  props: ["menuList"],
  data() {
    return {
      curIndex: 0
    };
  },
  methods: {
    ...mapActions(["setBetMenu"]),
    clickMenu(item, index) {
      this.curIndex = index;
      this.$emit("changeList", item, index);
    },
    clickCart() {
      if (this.cart.length) {
        this.$router.push("/shopCart");
      } else {
        this.$dialog.toast({ mes: "您的购物车空空如也" });
      }
    },
    getCurMenuIndex() {
      if (this.curMenu && this.menuList) {
        const menuids = this.menuList.map(x => x.menuid);
        const index = menuids.findIndex(x => x === this.curMenu.menuid);
        if (index > -1 && this.curIndex !== index) return index;
      }
      return 0;
    }
  },
  computed: {
    ...mapState({
      cart: state => state.betting.cart,
      cartNumber: state => state.betting.cartNumber,
      curMenu: state => state.betting.betMenu
    })
  },
  activated() {
    if (this.$route.params.isHome) this.curIndex = 0;
  },
  deactivated() {
    this.setBetMenu(null);
  }
};
</script>

<style lang="scss" scoped>
@import "../../../css/resources.scss";
.betting_left {
  width: 25%;
  background: #f2f3f4;
  @include column;
  .sandi_drag {
    position: relative;
    box-shadow: #555 0 0 poTorem(10px);
    border-radius: 50%;
    width: poTorem(60px);
    height: poTorem(60px);
    background: #fff url(~img/goucai/gouwuche.png) no-repeat;
    background-size: poTorem(30px) poTorem(30px);
    background-position: center;
    .spots {
      position: absolute;
      @include center;
      width: poTorem(24px);
      height: poTorem(24px);
      background: #e03a3a;
      display: flex;
      border-radius: 50%;
      font-weight: bolder;
      color: #fff;
      right: 0;
      top: 0;
    }
  }
  ul {
    flex: 1;
    width: 90%;
    overflow-y: auto;
    li {
      outline: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      margin: auto;
      @include center;
      width: 90%;
      height: poTorem(50px);
      background: url(~img/goucai/morenzhuangtai.png) no-repeat;
      background-size: contain;
      background-position: center;
      font-size: poTorem(16px);
      color: #535353;
      font-weight: 900;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .active {
      @include center;
      background: url(~img/goucai/xuanzhong.png) no-repeat;
      width: 90%;
      height: poTorem(50px);
      background-size: contain;
      background-position: center;
      font-size: poTorem(16px);
      color: #e13939;
    }
  }
}
</style>
