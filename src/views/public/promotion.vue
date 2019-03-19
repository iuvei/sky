<template>
  <div class="promotion">
    <div :class="[{'heads_pig': isfestival},'heads']">
      <!-- <router-link to="/home"> -->
      <span class="iconfont icon-fanhui"
            @click="goBack"></span>
      <!-- </router-link> -->
      <span class="title">
        优惠活动
      </span>
      <span></span>
    </div>

    <div class="other-block">
      <div class="content"
           v-show="isShow">
        <ul>
          <li v-for="(item, index) in activities"
              :key="index"
              @click="activitiesShow(item)">
            <img :src="item.phone_head"
                 alt="">
          </li>
        </ul>
      </div>
      <div v-show="!isShow"
           class="activities_detail">
        <div class="activities_title">
          <p>{{imgData.event_title}}</p>
          <p>{{imgData.begin_time}}</p>
        </div>
        <div v-html="params"
             class="get_from_response"></div>
      </div>
    </div>

  </div>
</template>
<script>
import decodeFunc from "../shouYe/decode.js";
import decompress from "../../js/decompress.js";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      activities: [],
      isShow: true,
      params: "",
      imgData: ""
    };
  },
  computed: {
    ...mapState(['isfestival'])
  },
  activated() {
    this.getBaseData();
  },
  mixins: [decodeFunc],
  methods: {
    getBaseData() {
      this.$dialog.loading.open("");
      this.$ajax("request", {
        ac: "getGameEventList"
      }).then(res => {
        this.activities = res;
        this.$dialog.loading.close();
      });
    },
    goBack() {
      if (this.isShow) {
        this.$router.back();
      } else {
        this.isShow = true;
      }
    },
    async activitiesShow(n) {
      let needData = "";
      if (n.event_detail) {
        needData = n.event_detail;
      } else {
        this.$dialog.loading.open(" ");
        needData = await this.$ajax("request", {
          ac: "getEventContent",
          eid: n.event_id,
          etype: n.type,
          wtype: 1
        });
        this.$dialog.loading.close();
      }
      // res = res.slice(34, -2)
      this.isShow = false;
      this.imgData = n;
      let temp = document.createElement("div");
      const isNew = needData.slice(0, 2) === "GZ";
      if (isNew) {
        needData = needData.substring(2);
        temp.innerHTML = decodeURIComponent(escape(decompress(needData)));
      } else {
        temp.innerHTML = this.decodeEvent(needData);
      }
      const output = temp.innerText || temp.textContent;
      temp = null;
      this.params = output;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../css/resources.scss";
.promotion {
  padding-top: 0;
  width: 100%;
  background-color: rgb(249, 249, 249);
  // background-color: #fff;
  .heads {
    position: relative;
    top: 0;
    @include between;
    height: poTorem(48px);
    width: 100%;
    background: #fff url(../../img/phone_header.png) CENTER TOP;
    &.heads_pig {
      @include pigbg;
    }
    .iconfont {
      font-size: poTorem(30px);
      padding-left: poTorem(10px);
      color: #fff;
      font-weight: normal;
      @include start;
    }
    .title {
      color: #fff;
      font-weight: bolder;
    }
    span {
      font-size: poTorem(18px);
      display: flex;
      width: 100px;
      @include center;
    }
  }
  .content {
    // padding-top: 3rem;
    ul {
      @include column;
      li {
        // background: yellowgreen;
        width: 100%;
        // height: 8.75rem;
        margin: 5px 0px 5px 0px;
        box-sizing: border-box;
        padding: 0px 10px 0px 10px;
        // height: 133px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .activities_detail {
    // padding: poTorem(10px);
    .activities_title {
      text-align: center;
      font-size: 1.2rem;
      color: #333;
      p {
        &:nth-child(2) {
          font-size: 0.8rem;
          color: #999;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.get_from_response {
  padding: 10px;
  p {
    span {
      word-wrap: break-word;
    }
  }
}
</style>

