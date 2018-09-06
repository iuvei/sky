<template>
  <div class="betting_left">
    <ul>
      <li v-for="(item,index) in menuList" :key="index" @click="clickMenu(item,index)" :class="{active:item.menuid==activedMenu.menuid}">
        {{item.name}}
      </li>
    </ul>
    <div @click="clickCart" style="display:flex">
      <div class="qxc_drag">
        <i class="spots" v-show="cartNumber>0">
          {{cartNumber}}
        </i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'qxc_leftmenu',
  props: ['switchs', 'menuList'],
  data() {
    return {
      activedMenu: null
    }
  },
  computed: {
    ...mapState({
      cartNumber: state => state.betting.cartNumber,
      cart: state => state.betting.cart
    })
  },
  methods: {
    clickMenu(item, index) {
      this.activedMenu = item
      this.$emit('clickMenu', item, index)
    },
    clickCart() {
      // this.$emit('clickCart')
      if (this.cart.length) {
        this.$router.push('/shopCart')
      } else {
        this.$dialog.toast({ mes: '您的购物车空空如也' })
      }
    }
  },
  created() {
    this.activedMenu = this.menuList[0]
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
.betting_left {
  width: 25%;
  background: #f2f3f4;
  @include column;
  .qxc_drag {
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
      width: poTorem(18px);
      height: poTorem(18px);
      background: #e03a3a;
      display: flex;
      border-radius: 50%;
      font-weight: bolder;
      color: #fff;
      right: poTorem(8px);
      top: poTorem(8px);
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
    }
    .active {
      height: poTorem(50px);
      background: url(~img/goucai/xuanzhong.png) no-repeat;
      background-size: contain;
      background-position: center;
      color: #e13939;
    }
  }
}
</style>
