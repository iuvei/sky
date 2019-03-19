<template>
  <div class="personalMessage_main_body">
    <publicHead :title="funcName"
                :type="5"></publicHead>
    <yd-tab class="msg_tab">
      <yd-tab-panel label="全部">
        <div class="message_box">
          <div v-for="(item, index) in messageBox"
               :key="index"
               :class="[item.status==0?'unread':'read', 'tab_content']"
               @click="fillWord(item, index)">
            <p>{{item.title}}</p>
            <p>{{item.content}}</p>
            <p>{{sendTime(item.sendtime)}}</p>
          </div>
          <div class="empty"
               v-show="messageBox.length==0">
            <img src="../../../../img/bet_record/noRecords.png"
                 alt="">
            <p>暂无记录</p>
          </div>
        </div>
      </yd-tab-panel>
      <yd-tab-panel label="已读">
        <div class="message_box">
          <div v-for="(item, index) in readMsg"
               :key="index"
               class="read tab_content"
               @click="fillWord(item, index)">
            <p>{{item.title}}</p>
            <p>{{item.content}}</p>
            <p>{{sendTime(item.sendtime)}}</p>
          </div>
          <div class="empty"
               v-show="readMsg.length==0">
            <img src="../../../../img/bet_record/noRecords.png"
                 alt="">
            <p>暂无记录</p>
          </div>
        </div>
      </yd-tab-panel>
      <yd-tab-panel label="未读">
        <div class="message_box">
          <div v-for="(item, index) in unreadMsg"
               :key="index"
               class="unread tab_content"
               @click="fillWord(item, index)">
            <p>{{item.title}}</p>
            <p>{{item.content}}</p>
            <p>{{sendTime(item.sendtime)}}</p>
          </div>
          <div class="empty"
               v-show="unreadMsg.length==0">
            <img src="../../../../img/bet_record/noRecords.png"
                 alt="">
            <p>暂无记录</p>
          </div>
        </div>
      </yd-tab-panel>
    </yd-tab>
  </div>
</template>
<script>
import publicHead from "./publicHead";
export default {
  components: {
    publicHead
  },
  data() {
    return {
      funcName: "个人消息",
      defaultClass: "tab_content",
      messageBox: [],
      readMsg: [],
      unreadMsg: [],
      filledContent: { title: "", content: "", time: "" }
    };
  },
  activated() {
    this.$dialog.loading.open(" ");
    this.getData();
  },
  methods: {
    fillWord(o) {
      this.$router.push({
        name: "xiaoxixiangqing",
        params: o
      });
      Object.assign(this.filledContent, o);
      if (o.status == 0) {
        this.$ajax("request", {
          ac: "readUserMessage",
          id: o.guid
        }).then(() => {
          this.getData();
        });
      }
    },
    getData() {
      this.$ajax("request", {
        ac: "getUserMessage",
        // bdate: 1,
        // edate: '',
        type: 0,
        limit: 20,
        pageid: 0
      }).then(res => {
        console.log(res);
        this.messageBox = res == 0 ? [] : res;
        const readAyy = [],
          unreadAyy = [];
        this.messageBox.forEach(item => {
          if (item.status == 1) readAyy.push(item);
          else unreadAyy.push(item);
        });
        this.readMsg = readAyy;
        this.unreadMsg = unreadAyy;
        this.$dialog.loading.close();
      });
    },
    sendTime(j) {
      const timestamp = j * 1000;
      const assignTime = new Date(timestamp),
        y = assignTime.getFullYear(),
        M = assignTime.getMonth() + 1,
        d = assignTime.getDate(),
        h = assignTime.getHours(),
        m = assignTime.getMinutes(),
        s = assignTime.getSeconds(),
        add0 = m => (m > 9 ? m : "0" + m);
      return (
        y +
        "-" +
        add0(M) +
        "-" +
        add0(d) +
        " " +
        add0(h) +
        ":" +
        add0(m) +
        ":" +
        add0(s)
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.personalMessage_main_body {
  .msg_tab {
    height: 100%;
    background-color: #eee;
    .message_box {
      padding: poTorem(10px);
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
        button {
          width: poTorem(93px);
          padding: 5px 0 5px 0;
          font-size: 14px;
          text-align: center;
          font-weight: 700;
          border-radius: 5px;
          color: #fff;
          background-color: #f93;
          outline: none;
          border: none;
        }
      }
      .tab_content {
        height: poTorem(90px);
        margin-bottom: poTorem(20px);
        padding: poTorem(10px);
        background-color: #fff;
        p {
          line-height: poTorem(24px);
          &:first-child {
            font-size: poTorem(15px);
            color: #000;
          }
          &:nth-child(2) {
            font-size: poTorem(12px);
            color: #949494;
            width: poTorem(200px);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          &:last-child {
            font-size: poTorem(11px);
            color: #767676;
          }
        }
      }
      .read {
        background: #fff url(~img/personal_center/read.png) no-repeat right top;
        background-size: poTorem(40px);
      }
      .unread {
        background: #fff url(~img/personal_center/unread.png) no-repeat right
          top;
        background-size: poTorem(40px);
      }
    }
  }
  .pop_win {
    p {
      text-align: center;
      line-height: poTorem(24px);
      &:first-child {
        margin-top: poTorem(20px);
        font-size: poTorem(15px);
        color: #000;
      }
      &:nth-child(2) {
        font-size: poTorem(11px);
        color: #949494;
      }
      &:nth-child(3) {
        text-align: left;
        text-indent: 2rem;
        padding: poTorem(20px);
        font-size: poTorem(12px);
        color: #333;
      }
      button {
        width: poTorem(133px);
        height: poTorem(33px);
        border: poTorem(1px) solid #e3e3e3;
        border-radius: poTorem(5px);
        outline: none;
        margin: poTorem(20px) 0;
        color: #e33939;
      }
    }
  }
}
</style>


