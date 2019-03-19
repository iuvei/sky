<template>
  <div class="head_model">
    <div class="bg"
         v-show="show"
         @click="showGamePlay"></div>
    <transition enter-active-class="animated slideInDown"
                leave-active-class="animated slideOutUp">
      <div class="shadow"
           v-show="show">
        <div v-show="!['lhc', 'xypk'].includes(js_tag)">
          <span class="item"
                v-for="(item, index) in titleArr"
                :key="index"
                :class="{actives: title == item}"
                @click="switchs(item, index)">{{item}}</span>
        </div>
        <div v-if="curIndex===1">
          <span class="item"
                v-for="(item, index) in sortItems"
                :key="index"
                :class="{actives: menuid === item.menuid}"
                v-if="item.showofficial===0"
                @click="selectSubmenu(item,index,$event)">{{item.name}}</span>
          <span class="item long"
                v-for="(item, index) in longItems"
                :key="index"
                :class="{actives: menuid === item.menuid}"
                v-if="item.showofficial===0"
                @click="selectSubmenu(item,index,$event)">{{item.name}}</span>
        </div>
        <div v-if="curIndex===1 && subMenu.length > 0"
             class="sub-menu">
          <!--玩法 数量 1 -->
          <template v-if="subMenu.length === 1">
            <div class="row">
              <div class="left"
                   :class="{'sm': subMenu[0].name.length === 4}">
                <i class="circle"></i>{{subMenu[0].name | toLongName}}
              </div>
              <div class="play-list">
                <span class="item"
                      v-for="(item, index) in subMenu[0].playlist"
                      :key="index"
                      :class="{active: curPlayItem && curPlayItem.playid === item.playid}"
                      @click="selectPlayItem(item,index,$event)">{{item.playname}}</span>
              </div>
            </div>
          </template>
          <!--玩法 数量多-->
          <template v-if="subMenu.length > 1">
            <yd-timeline class="time_line_wrap">
              <yd-timeline-item v-for="(item,index) in subMenu"
                                :key="index">
                <span>{{item.name}}</span>
                <ul>
                  <li v-for="(items,indexs) in item.playlist"
                      :key="indexs"
                      :class="{active: curPlayItem && curPlayItem.playid === items.playid}"
                      @click="selectPlayItem(items, index, $event)">{{items.playname}}</li>
                </ul>
              </yd-timeline-item>
            </yd-timeline>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "HeadItem",
  props: ["modal_show"],
  data() {
    return {
      show: false,
      // activeTitle: '官方玩法',
      titleArr: ["双面玩法", "官方玩法"],
      menuid: 0,
      curPlayIndex: 0,
      curPlayItem: null,
      js_tag:
        this.$route.params.js_tag || this.$store.state.betting.js_tag || "",
      game_id: 0,
      items: [],
      curTitle: null
    };
  },
  filters: {
    toLongName(name) {
      return name.length > 5 ? "综合" : name;
    }
  },
  methods: {
    ...mapActions(["playSwitch", "setPlayItem", "setBetMenu"]),
    // 切换双面玩法或者官方玩法
    async switchs(val) {
      this.activeTitle = val;
      // this.playItems = await this.getPlayItems(val)
      if (this.getCurIndex() === 0) {
        this.$emit("showGamePlay");
        this.show = false;
      } else {
        this.selectSubmenu(this.playItems[0], 0);
      }
      this.changeTitle();
      // this.playSwitch(val)
    },
    // 选择二级
    selectSubmenu(item, index) {
      if (item) {
        this.menuid = item.menuid;
        this.bus.$emit("selectSubmenu", item, index);
        this.selectPlayItem(item.submenu[0].playlist[0], 0);
        this.curPlayItem = item.submenu[0].playlist[0];
        this.changeTitle(item.submenu[0].playlist[0]);
      }
      this.bus.$emit("clearBalls");
    },
    // 选择三级
    selectPlayItem(item, index, event) {
      // 判断是自动选择还是手动选择，有event说明是手动选择
      if (event) {
        this.setPlayItem(item);
        this.bus.$emit(
          "selectPlayItem",
          item,
          "显示",
          index,
          this.menuid,
          this.playItems.find(x => x.menuid === this.menuid)
        );
        this.curPlayIndex = index;
        this.curPlayItem = item;
        this.show = false;
        this.$emit("showGamePlay");
        this.changeTitle(item);
      }
      this.bus.$emit("clearBalls");
    },
    // 改变标题
    changeTitle(item, activeTitle) {
      let title = "";
      if (this.$route.params.play_type) title = "";
      if ((activeTitle || this.activeTitle) === "双面玩法") {
        title = "";
        if (this.curTitle) {
          title = this.curTitle;
          this.activeTitle = this.curTitle;
        }
      } else if (this.playItems && this.playItems.length) {
        const menu =
          this.playItems.find(x => x.menuid === this.menuid) ||
          this.playItems[0];
        const wanfaItem = item || menu.submenu[0].playlist[0];
        title = `${wanfaItem.wanfa}` || "";
      }
      //
      this.bus.$emit("changeTitle", title);
    },
    // 获取玩法索引
    getCurIndex() {
      return this.titleArr.findIndex(x => x === this.activeTitle);
    },
    getTitle() {
      if (
        this.$route.params &&
        this.$route.params.hasOwnProperty("play_type")
      ) {
        if (this.$route.params.js_tag === "k3") return "双面玩法";
        return this.$route.params.play_type ? "双面玩法" : "官方玩法";
      }
      return this.$store.state.betting.switch;
    },
    // 设置是否显示
    showGamePlay() {
      this.show = !this.show;
      if (!this.show) {
        this.$emit("showGamePlay");
      }
    },
    // 根据玩法找出玩法object
    findItemByWanfa(wanfa) {
      // 有参数
      if (wanfa && this.hasCurPlayItem(this.playItems, wanfa)) {
        this.changeTitle(this.curPlayItem, this.curTitle);
      }
    },
    init() {
      this.menuid = this.playItems[0].menuid;
      this.curPlayItem = this.playItems[0].submenu[0].playlist[0];
      this.setPlayItem(this.playItems[0].submenu[0].playlist[0]);
      this.changeTitle(this.curPlayItem);
    },
    // 判断this.playItems是否包含当前curPlayItem的玩法
    hasCurPlayItem(items, wanfa) {
      let hasWanfa = false;
      items.forEach(x => {
        x.submenu.forEach(y => {
          // console.warn("y.playlist",y.playlist)
          const item = y.playlist.find(z => z.wanfa === wanfa);
          if (item) {
            hasWanfa = true;
            this.curPlayItem = item;
            this.setPlayItem(item);
            this.curTitle = x.showofficial === 1 ? this.titleArr[0] : null;
            this.setBetMenu(x);
            // console.warn("x",x)
          }
        });
      });
      return hasWanfa;
    }
  },
  computed: {
    ...mapState({
      title: state => state.betting.switch,
      betData: state => state.betting.betData,
      gameid: state => state.betting.game.game_id,
      playConfigs: state => state.betting.playConfigs
    }),
    activeTitle: {
      get() {
        return this.title;
      },
      set(title) {
        if (!this._inactive) {
          this.playSwitch(title);
        }
      }
    },
    playItems() {
      const configs = this.playConfigs;

      if (configs && Array.isArray(configs) && configs.length) {
        if (this.menuid === 0) {
          this.menuid = configs[0].menuid;
        }
        // let isShuangMian = this.$route.params.play_type === 1
        // if (this.activeTitle) isShuangMian = this.activeTitle === '双面玩法'
        // configs = configs.filter(x => !!x.showofficial === isShuangMian)

        return configs;
      }
      return [];
    },
    sortItems() {
      return this.playItems
        ? this.playItems.filter(x => x.name.length < 6)
        : [];
    },
    longItems() {
      return this.playItems
        ? this.playItems.filter(x => x.name.length > 5)
        : [];
    },
    // 双面还是官方
    curIndex() {
      return this.getCurIndex();
    },
    subMenu() {
      const isShuangmian = this.activeTitle === "双面玩法";

      if (
        (this.$route.params.play_type === 1 && isShuangmian) ||
        isShuangmian
      ) {
        return [];
      }
      return this.playItems && this.playItems.length
        ? (
          this.playItems.find(x => x.menuid === this.menuid) ||
            this.playItems[0]
        ).submenu
        : [];
    }
  },
  watch: {
    modal_show(val) {
      this.show = val;
      if (this.getCurIndex() === 0) {
        this.menuid = 0;
        this.curPlayIndex = 0;
      }
    },
    playItems(newVal, oldVal) {
      if (this._inactive) return;

      if (this.game_id !== this.$route.params.lotter_id) return; // 多实例处理
      const isFirst = newVal.length && !oldVal.length, // 判断是否是第一次进入
        isSwithGame =
          newVal.length &&
          oldVal.length &&
          newVal[0].js_tag !== oldVal[0].js_tag, // 是否切换了彩种
        isFromHistory = this.$route.params.hasOwnProperty("wanfa");
      if (isFirst || isSwithGame) {
        this.activeTitle = this.getTitle();
        // this.activeTitle =
        //   this.$route.params.play_type === 0 ? '官方玩法' : '双面玩法'
        // 如果不是从投注记录来的
        if (!isFromHistory) {
          // this.$nextTick(() => {
          //   if (this.game_id === this.$route.params.lotter_id) {

          //   }
          // })
          this.init();
        } else {
          // 如果是从投注记录来的而且是同彩种
          //
          this.findItemByWanfa(this.$route.params.wanfa);
        }
      }
    },
    "$route.params"(newVal, oldVal) {
      if (this._inactive) return;

      if (!this.playItems.length) return; // 没有数据初始化的话，走上面
      if (!newVal && !oldVal) return; // 如果是第一次进来的，走上面
      const isSameGameTag =
        newVal.js_tag === oldVal.js_tag && newVal.name_tag !== oldVal.name_tag; // 如果是同js_tag不同name_tag
      this.$nextTick(() => {
        this.activeTitle = this.getTitle();

        if (isSameGameTag) {
          // 因为同彩种共享一个头，同彩种切换没有走actived钩子，这里需要将旧头的game_id设置为路由的参数
          if (this.game_id === oldVal.lotter_id) {
            this.game_id = newVal.lotter_id;
          }
          if (this.$route.params.wanfa) {
            this.findItemByWanfa(this.$route.params.wanfa);
          } else if (this.game_id === this.$route.params.lotter_id) {
            this.init();
          }
        } else if (newVal.lotter_id && newVal.lotter_id !== oldVal.lotter_id) {
          // 前进后退处理
          // 如果是同彩种从投注记录来的
          if (
            this.$route.params.wanfa &&
            this.playItems[0].js_tag === this.$route.params.js_tag
          ) {
            this.findItemByWanfa(this.$route.params.wanfa);
          } else {
            // 如果是后退回来的，则$route.params没有值
            if (
              newVal.lotter_id &&
              Object.keys(newVal).length === 1 &&
              Object.keys(oldVal).length === 0
            ) {
              // 啥都不干
            } else {
              if (this.playItems[0].js_tag !== newVal.js_tag) return;
              this.init();
            }
          }
        }
      });
    }
  },
  activated() {
    this.activeTitle = this.getTitle();
    this.game_id = this.$route.params.lotter_id;
  },
  deactivated() {
    if (
      !this.betData ||
      (this.betData.danshiExcl ||
        (!this.betData.dataSet || !this.betData.dataSet.length))
    ) {
      this.bus.$emit("clearBalls");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../css/resources.scss";
.head_model {
  .animated {
    animation-duration: 0.25s;
  }
  .bg {
    width: 100%;
    height: calc(100vh - 3rem);
    position: absolute;
    top: poTorem(48px);
    left: 0;
    background: #000;
    opacity: 0.5;
    z-index: 20;
  }
  .shadow {
    position: absolute;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 21;
    > div {
      line-height: 2;
      @include center;
      margin: 15px 0;
    }
    > div:nth-child(2) {
      justify-content: center;
      flex-wrap: wrap;
      .item {
        margin: 10px 0.4rem;
        width: 21%;
      }
    }
    .item {
      height: poTorem(35px);
      min-width: poTorem(87px);
      background: #fff;
      @include center;
      margin: 0 poTorem(20px);
      border-radius: poTorem(5px);
      font-size: poTorem(18px);
      color: #666;
      font-weight: bold;
      border: 1px solid #d2d3d5;
      &.long {
        width: auto !important;
        padding: 0 poTorem(6px);
      }
    }
    .actives {
      background: #e13a39;
      color: #fff;
      border: 1px solid #e13a39;
    }
    .active {
      color: #e13a39;
      border: 1px solid #e13a39;
    }
  }
  .sub-menu {
    margin: 0 !important;
    box-shadow: 0 14px 28px -8px #eeeeee inset;
    .row {
      width: 100%;
      @include center;
      padding: 0.5rem 0.4rem;
      margin: 10px 0;
      justify-content: flex-start;
      .left {
        width: 24%;
        @include center;
        justify-content: flex-start;
        align-items: center;
        font-size: poTorem(16px);
        color: #666;
        margin-top: poTorem(-7px);
        &.sm {
          font-size: poTorem(12px);
        }
      }
      .circle {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 5px solid #d2d2d2;
        display: block;
        margin-right: 10px;
      }
      .play-list {
        @include center;
        justify-content: flex-start;
        flex: 1;
        flex-wrap: wrap;
        .item {
          margin: 0 poTorem(4px) poTorem(10px) poTorem(4px);
          font-weight: normal;
        }
      }
    }
  }
  .time_line_wrap {
    width: 100%;
    padding: 0 1rem;
  }
  .yd-timeline-custom-item:first-child,
  .yd-timeline-item:first-child,
  .yd-timeline-item {
    margin-top: poTorem(14px);
    padding: poTorem(4px) 0;
    color: #666;
    display: flex;
    span {
      width: poTorem(60px);
      margin-top: poTorem(4px);
      flex: none;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        height: 2.1875rem;
        min-width: poTorem(86px);
        background: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 0 poTorem(6px);
        margin: 0 poTorem(10px) poTorem(10px) 0;
        border-radius: 0.3125rem;
        font-size: 1.125rem;
        color: #666;
        border: 1px solid #d2d3d5;
        &.active {
          color: #e13a39;
          border: 1px solid #e13a39;
        }
      }
    }
  }

  .yd-timeline-custom-item:not(:last-child):after,
  .yd-timeline-item:not(:last-child):after {
    border-bottom-style: dashed;
  }

  .yd-timeline-item:first-child:before {
    background: none;
  }

  .yd-timeline-item:first-child > .yd-timeline-icon {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 5px solid #d2d2d2;
    display: block;
    margin-right: 10px;
  }
  .yd-timeline-item .yd-timeline-icon {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 4px solid #e4e5e9;
    background: #fff;
  }
}
</style>
<style lang="scss">
@function poTorem($px) {
  @return $px / 16px * 1rem;
}
.head_model .yd-timeline-item .yd-timeline-icon {
  width: poTorem(18px);
  height: poTorem(18px);
  border-radius: 50%;
  border: 5px solid #d2d2d2;
  display: block;
  margin-right: poTorem(10px);
  background: #fff;
  top: poTorem(12px);
}
.head_model .yd-timeline-item:first-child .yd-timeline-icon:before {
  content: "";
  display: block;
  width: 4px;
  height: 12px;
  position: absolute;
  background: #fff;
  top: -17px;
  left: 0;
}
</style>

