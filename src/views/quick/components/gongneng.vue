<template>
  <div class="gongNeng">
    <div v-show="tip && !closeTip" @click="closeTipClick" class="intro-one"></div>
    <div class="gongNeng_my">
      <div class="gongNeng_top">
        <div class="left">我添加的功能</div>
        <span @click="saveQuickClick" class="right">保存</span>
      </div>
      <draggable v-model="addQuicks_temp" :options="{draggable:'.shortcut_list', animation:150}" style="min-height:6rem" :no-transition-on-drag="true" @start="drag=true" @end="drag=false" :move="onMoveCallback">
        <transition-group :name="!drag? 'list-complete' : null" :css="true" tag="ul" class="shortcut">
          <li v-for="(item, index) in addQuicks_temp" :key="item.addgn" class="shortcut_list">
            <div v-finger:long-tap="longTap" v-finger:double-tap="doubleTap">
              {{item.text}}
              <yd-icon v-show="moveAble" v-finger:tap='delFeature.bind(this, item, index)' name="error" size="1.2rem" color="#adadad" class="del-feature"></yd-icon>
            </div>

          </li>
        </transition-group>
      </draggable>
    </div>

    <div class="feature_list">
      <yd-tab active-color="#F93" class="tab feature-tab" v-model="tabkey">
        <yd-tab-panel label="功能类">
        </yd-tab-panel>
        <yd-tab-panel label="彩票">
        </yd-tab-panel>
        <yd-tab-panel label="体育彩">
        </yd-tab-panel>
      </yd-tab>
      <!-- <span class="feature_top">全部功能</span> -->
      <ul class="list">
        <li class="classification" v-show="!addQuicks_temp.some(el=>el.addgn===item.addgn)" v-for="(item, index) in remainQuicks_temp" :key="item.addgn" @click="selected(item, index)">
          <div>
            <img :src="quick_icon" alt=""> {{item.text}}
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import draggable from "vuedraggable";
import api from "~/../api/game";
import gnls from "~/store/modules/quick.const";
export default {
  components: {
    draggable
  },
  data() {
    return {
      tabkey: 0,
      gnls,
      lotterys: [], //彩票
      sports: [], //体彩
      closeTip: false,
      quick_icon: require("img/shouye/quick.png"),
      moveAble: true, // 是否可移动
      drag: false // 内置拖放状态， false拖到完成，true拖到中
    };
  },
  computed: {
    ...mapState("quick", ["tip"]),
    ...mapGetters("quick", ["getAddQuicks"]),
    addQuicks_temp: {
      get() {
        return this.getAddQuicks;
      },
      set(v) {
        this.saveQuick(v);
      }
    },
    remainQuicks_temp() {
      switch (this.tabkey) {
        case 0:
          return gnls;
          break;
        case 1:
          return this.lotterys;
          break;
        case 2:
          return this.sports;
          break;
      }
    }
  },
  created() {},
  mounted() {
    this.getGameList();
  },
  activated() {},
  deactivated() {},
  methods: {
    ...mapActions("quick", ["saveQuick"]),
    selected(item, index) {
      if (this.addQuicks_temp.includes(item)) return;
      this.addQuicks_temp=[...this.addQuicks_temp, item];
    },
    async getGameList() {
      let data = (await api.getGameList()) || [];
      // console.error(data);
      data.map(item => {
        // 去掉维护状态的彩票
        if (item.enable !== 2) {
          // type: 1彩票  2体彩   没有就是功能类
          let path = {
            name: item.js_tag,
            params: {
              lotter_id: item.game_id,
              name_tag: item.tag,
              game_name: item.game_name,
              js_tag: item.js_tag
            }
          };
          let el = {
            type: item.type,
            text: item.game_name,
            addgn: item.game_id,
            src: item.icon,
            path
          };
          if (item.type == 2) {
            this.sports.push(el);
          } else {
            this.lotterys.push(el);
          }
        }
      });
    },
    delFeature(item, index) {
      if (!this.addQuicks_temp.includes(item)) return;
      let temp = Object.assign([], this.addQuicks_temp)
      temp.splice(index, 1);
      this.addQuicks_temp = temp;
      //   if (!this.addQuicks_temp.length) {
      //     this.moveAble = false;
      //   }
    },
    onMoveCallback() {
      return this.moveAble;
    },
    longTap() {
      this.moveAble = true;
    },
    doubleTap() {
      this.moveAble = !this.moveAble;
    },
    saveQuickClick() {
      //   this.moveAble = false;
      this.saveQuick(this.addQuicks_temp);
      this.$router.back();
    },
    closeTipClick() {
      this.closeTip = true;
    }
  }
};
</script>

<style lang="scss">
.gongNeng .tab.feature-tab .yd-tab-nav li:first-child a {
  background: none;
}
body {
  .introjs-helperLayer {
    border: 2px dashed #777;
    background-color: transparent;
    box-shadow: none;
  }
  .introjs-tooltip {
    min-width: 14.5rem;
    max-width: 18rem;
    padding: 0.6rem 0;
    box-shadow: none;
    background-color: transparent;
    color: #ffffff;
  }
  .introjs-arrow.right {
    top: 0.85rem;
  }
  .introjs-arrow.right:after {
    content: "";
    width: 2rem;
    border: 1px solid #ffffff;
    font-weight: 800;
    position: absolute;
    transform: translate(-106%, -50%);
  }
  .introjs-arrow {
    border-width: 0.4rem;
  }
  .introjs-helperNumberLayer {
    display: none;
    border: none;
    width: 1.25rem;
    height: 1.25rem;
    font-size: 0.9rem;
    line-height: 1.25rem;
    top: -1rem;
    left: -1rem;
    background: #f57606;
  }

  .user-helperNumber {
    width: 1.25rem;
    height: 1.25rem;
    font-size: 0.9rem;
    line-height: 1.25rem;
    font-weight: bold;
    color: white;
    text-align: center;
    border-radius: 50%;
    background: #f57606;
    display: inline-block;
  }
}
</style>
<style lang="scss" scoped>
@function poTorem($px) {
  @return $px / 16px * 1rem;
}
@import "../../../css/resources";
.gongNeng {
  flex: 1;
  height: 0;
  overflow-y: auto;
  background-color: #fff;
  .intro-one {
    z-index: 999999;
    background: transparent url(../../../img/quick_icon/intro.png) no-repeat;
    pointer-events: auto;
    background-size: 100% 100%;
    // background-position: 0px -2.75rem;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
  }
  .gongNeng_my {
    width: 100%;
    margin-bottom: poTorem(10px);
    // height: poTorem(260px);
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
          // box-shadow: 0px 0px poTorem(15px) #a7a2a2;
          box-shadow: 0px 0px poTorem(15px) #a7a2a2;
        }
        .del-feature {
          width: 1.25rem;
          position: absolute;
          top: -0.6rem;
          right: 0.2rem;
          z-index: 1;
        }
      }
    }
    .gongNeng_top {
      display: flex;
      width: 100%;
      height: poTorem(50px);
      // justify-content: space-around;
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
        color: #ff7c34;
        // align-items: center;
        text-align: center;
        border-radius: poTorem(25px);
        margin-right: 1rem;
        border: 1px solid #ff7c34;
        // padding: 0 poTorem(px);
      }
    }
  }
  .feature_list {
    .feature_top {
      font-size: poTorem(18px);
      color: #414141;
      // text-align: center;
      margin-left: poTorem(20px);
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin: 0 poTorem(13px);

      .classification {
        width: 33.3%;
        text-align: center;
        color: #5f5f5f;

        line-height: poTorem(37px);
        border-radius: poTorem(5px);
        font-size: poTorem(17px);
        padding: poTorem(8px) poTorem(10px);
        > div {
          background: white;
          box-shadow: 0px 0px poTorem(15px) #ededed;
        }
        img {
          width: poTorem(13px);
          height: poTorem(13px);
        }
      }
      .active {
        background: #13ddbb;
      }
    }
  }
}
</style>
