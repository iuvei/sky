<template>
  <div>
    <div class="yd-search">
      <div class="yd-search-input">
        <form action="#"
              class="search-input"
              @submit.prevent="submit">
          <i class="search-icon"></i>
          <yd-search-input type="search"
                           :placeholder="placeholder"
                           v-model="currentValue"
                           :readonly="fullpage"
                           @click.native="open"
                           ref="search"></yd-search-input>
        </form>
      </div>
    </div>

    <template v-if="fullpage">
      <div class="yd-search yd-search-fly"
           :class="show ? 'yd-search-show' : ''"
           :style="{top: top}">
        <div class="yd-search-input">
          <form action="#"
                class="search-input"
                @submit.prevent="submit">
            <i class="search-icon"></i>
            <yd-search-input type="search"
                             :placeholder="placeholder"
                             v-model="currentValue"
                             ref="search"
                             :class="{'remove_x': currentValue != ''}"></yd-search-input>
          </form>
          <a href="javascript:;"
             class="cancel-text"
             @click="close(false)">{{cancelText}}</a>
        </div>
        <div class="yd-search-list-a"
             :style="{paddingBottom: top}">
          <div class="yd-search-list-item-a"
               v-for="(item, key) in result"
               @click="toOpenTry(item,tag)"
               :key="key"
               :class="{'yd-search-list-item-sw': userinfo.accountInfo.test === 2}">
            <img class="imgtp"
                 :src="item.image_url"
                 alt="图片">
            <div class="gamename">{{item.game_name}}</div>
            <div class="triangle_try"
                 v-show="userinfo.accountInfo.test === 2">
              <div class="djan">
                <span>试玩</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script type="text/babel">
import { addClass, removeClass, getScrollview, isIOS } from './assist.js';
import Input from './input.vue';
import { mapState, mapActions } from 'vuex';
import openTry from '../youximixin.js';
export default {
  name: 'searchss',
  extends: Input,
  components: { 'yd-search-input': Input },
  data() {
    return {
      show: false,
      currentValue: this.value,
      gmurl: '' // 游戏链接
    };
  },
  props: {
    placeholder: { type: String, default: '请输入游戏名称或关键字搜索' },
    cancelText: { type: String, default: '取消' },
    result: {
      type: Array,
      default() {
        return [];
      }
    },
    itemClick: { type: Function },
    value: { type: String, default: '' },
    fullpage: { type: Boolean, default: false },
    top: {
      validator(value) {
        return /^-?(\.|\d+\.)?\d+(px|rem)$/.test(value);
      },
      default: '-1px'
    },
    onSubmit: { type: Function },
    onCancel: { type: Function }
  },
  mixins: [openTry],
  computed: {
    ...mapState(['userinfo']),
    ...mapState({ tag: state => state.youxi.tag })
  },
  watch: {
    currentValue(val) {
      this.$emit('input', val);
    },
    value(val) {
      this.currentValue = val;
    },
    show(val) {
      this.modifyField({ searchView: val });
      if (val) {
        this.$refs.search.setFocus();
        if (isIOS) {
          addClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
        }
      } else {
        this.$refs.search.setBlur();
        if (isIOS) {
          removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
        }
      }
    }
  },
  methods: {
    ...mapActions('youxi', ['modifyField']),
    open() {
      if (this.fullpage) {
        this.show = true;
        this.$refs.search.setFocus();
        // this.fixBody()
      }
    },
    // // 发起弹层时调动
    // fixBody() {
    //     let scrollTop =
    //         document.body.scrollTop || document.documentElement.scrollTop
    //     document.body.style.position = 'fixed'
    //     document.body.style.top = -scrollTop + 'px'
    //     document.body.style.width = '100%'
    //     document.body.style.height = '100%'
    // },
    // // 关闭弹层时调用
    // relaxBody() {
    //     // 清空position属性
    //     document.body.style.position = ''
    //     // 恢复scrollTop
    //     document.body.scrollTop = document.documentElement.scrollTop = -parseFloat(
    //         document.body.style.top
    //     )
    //     // 清空top属性
    //     document.body.style.top = ''
    //     // 清空width属性
    //     document.body.style.width = ''
    //     document.body.style.height = ''
    // },

    close(internalClose) {
      this.show = false;
      if (!internalClose) {
        this.onCancel && this.onCancel();
        this.currentValue = null;
        // this.relaxBody()
      }
    },
    submit() {
      this.$refs.search.setBlur();
      this.onSubmit && this.onSubmit(this.currentValue);
      this.close(true);
    }
  },
  destroyed() {
    isIOS && removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
  },
  mounted() {
    this.scrollView = getScrollview(this.$el);
  }
};
</script>
<style lang="scss">
@import "~css/resources.scss";
.search-input {
  .yd-input {
    font-size: 1rem;
  }
  .remove_x {
    a {
      width: 2rem;
      display: flex !important;
    }
    a.yd-input-clear::after {
      font-size: 1.3rem;
      width: 1.8rem;
    }
  }
}
.yd-search-list,
.yd-search-list-item {
  display: none;
}
.yd-search-show {
  .yd-search-list-a {
    width: 100%;
    height: calc(100% - 6rem);
    background-color: #fff;
    -webkit-overflow-scrolling: touch;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: flex-start;
    overflow-y: auto;
    .yd-search-list-item-a {
      position: relative;
      width: 33.3%;
      height: 9rem !important;
      border-bottom: poTorem(1px) solid #efeff4;
      border-right: poTorem(1px) solid #efeff4;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 0.9rem;
      .imgtp {
        width: 5rem;
        height: 5rem;
        margin: 0.6rem;
      }
      .gamename {
        height: 1.5rem;
      }
      .triangle_try {
        width: 100%;
        height: 2.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.3rem;
        .djan {
          width: poTorem(70px);
          height: poTorem(26px);
          border-radius: 1.25rem;
          border: solid poTorem(1px) $mainColor;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            font-size: 1rem;
            color: $mainColor;
          }
        }
      }
    }
    .yd-search-list-item-sw {
      position: relative;
      width: 33.3%;
      height: 10rem !important;
      border-bottom: poTorem(1px) solid #efeff4;
      border-right: poTorem(1px) solid #efeff4;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 0.9rem;
    }
  }
}
</style>