<template>
  <div class="activities_main_body">
    <publicHead :title="funcName"
                :type="5"></publicHead>
    <div class="content_box">
      <div class="empty"
           v-show="allActivities==0">
        <img src="../../../../img/bet_record/noRecords.png"
             alt="">
        <p>暂无记录</p>
      </div>
      <div v-for="(item, index) in allActivities"
           :key="index"
           class="content"
           @click="popIsShow(item.is_can_get)">
        <p>{{item.event_title}}</p>
        <p>活动时间：{{item.begin_time}}</p>
        <div :class="[{'cantGet': item.is_can_get==0}, 'red_packet']">
          <img :src="item.is_can_get==0||item.is_can_get==3?src0:item.is_can_get==1?src1:src2"
               alt="">
          <div class="red_packet_intro">
            <p>需单笔充值满{{item.event_param}}元</p>
            <p>当前剩余
              <i>{{item.yu_sheng}}</i>
              个红包
            </p>
          </div>
        </div>
        <p>截止时间：{{item.end_time}}</p>
        <p>
          <span>{{item.is_can_get==0?'未达到领取资格':item.is_can_get==1?'点击领取':item.is_can_get==2?'已领取':'还剩余多久触发'}}</span>
          <img src="../../../../img/bet_record/arrow.png"
               alt="">
        </p>
      </div>
    </div>
    <yd-popup v-model="isShow1"
              position="center"
              width="60%"
              class="pop_win">
      <p>领取成功</p>
      <p>获得100元</p>
      <p>
        <button @click="isShow1=false">确定</button>
      </p>
    </yd-popup>
    <yd-popup v-model="isShow2"
              position="center"
              width="60%"
              class="pop_win">
      <p>很抱歉，您还未达到领取资格</p>
      <p>
        <router-link to='/moreService/Nrecharge'>
          <button>立即充值</button>
        </router-link>
      </p>
    </yd-popup>
  </div>
</template>
<script>
import publicHead from "../moreService/publicHead";
export default {
  components: {
    publicHead
  },
  data() {
    return {
      funcName: "红包活动",
      isShow1: false,
      isShow2: false,
      allActivities: [
        // {
        //   title: '8888888888',
        //   startTime: '2016-12-23',
        //   endTime: '2018-02-15',
        //   money: 500,
        //   left: 999,
        //   state: 1
        // },
        // {
        //   title: '8888888888',
        //   startTime: '2016-12-23',
        //   endTime: '2018-02-15',
        //   money: 500,
        //   left: 999,
        //   state: 2
        // },
        // {
        //   title: '8888888888',
        //   startTime: '2016-12-23',
        //   endTime: '2018-02-15',
        //   money: 500,
        //   left: 999,
        //   state: 0
        // },
        // {
        //   title: '8888888888',
        //   startTime: '2016-12-23',
        //   endTime: '2018-02-15',
        //   money: 500,
        //   left: 999,
        //   state: 0
        // },
        // {
        //   title: '8888888888',
        //   startTime: '2016-12-23',
        //   endTime: '2018-02-15',
        //   money: 500,
        //   left: 999,
        //   state: 0
        // }
      ],
      src0: require("../../../../img/welfareTask/red_packet_g.png"),
      src1: require("../../../../img/welfareTask/red_packet_c.png"),
      src2: require("../../../../img/welfareTask/red_packet_o.png")
    };
  },
  activated() {
    this.$dialog.loading.open(" ");
    this.getData();
  },
  methods: {
    popIsShow(n) {
      if (n == 1 || n == 2) {
        this.isShow1 = true;
      } else {
        this.isShow2 = true;
      }
    },
    getData() {
      this.$ajax("request", {
        ac: "getGameEventGiftList"
      }).then(res => {
        this.allActivities = res == 0 ? [] : res;
        this.$dialog.loading.close();
        if (res == 0) this.$dialog.alert({ mes: "暂时没有红包活动" });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.activities_main_body {
  background-color: #fff;
  .content_box {
    .empty {
      padding-top: 50%;
      @include column;
      img {
        width: poTorem(93px);
        // height: poTorem(81px);
      }
      p {
        font-size: poTorem(14px);
        height: poTorem(20px);
        line-height: poTorem(20px);
        color: #bfbfbf;
        font-weight: 700;
      }
    }
    padding: poTorem(20px);
    .content {
      padding: poTorem(10px);
      border: 1px solid #ddd;
      border-radius: poTorem(10px);
      margin-bottom: poTorem(20px);
      line-height: poTorem(28px);
      p {
        &:first-child,
        &:last-child {
          font-size: poTorem(16px);
          color: #000;
        }
        &:nth-child(2),
        &:nth-child(4) {
          font-size: poTorem(12px);
          color: #5d5d5d;
        }
        &:nth-child(4) {
          border-bottom: 1px solid #ddd;
        }
        &:last-child {
          @include between;
          img {
            height: poTorem(17px);
          }
        }
      }
      .red_packet {
        width: 100%;
        height: poTorem(106px);
        background: #fa9e3b;
        @include between;
        img {
          width: poTorem(50px);
          margin-left: poTorem(20px);
        }
        .red_packet_intro {
          margin-right: poTorem(60px);
          p {
            color: #fff;
            i {
              font-size: poTorem(20px);
              color: #ffff00;
            }
          }
        }
      }
      .cantGet {
        background-color: #9d9d9d;
      }
    }
  }
  .pop_win {
    p {
      text-align: center;
      color: #fff;
      button {
        outline: none;
        width: poTorem(154px);
        height: poTorem(52px);
        background-color: #fff;
        color: #fd3331;
        font-size: poTorem(18px);
        border: none;
      }
      &:first-child {
        font-size: poTorem(20px);
        margin-top: 60%;
        padding: poTorem(20px);
      }
      &:nth-child(2) {
        font-size: poTorem(32px);
      }
      &:last-child {
        margin-top: poTorem(60px);
      }
    }
  }
}
</style>