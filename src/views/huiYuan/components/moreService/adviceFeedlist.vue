<template>
  <div class="adviceFeedlist_main_body">
    <publicHead :title="funcName" :type="5"></publicHead>
    <div class="adviceFeedlist_main_content">
      <div>
        <span>{{new Date(parseInt(allData.send_time) * 1000).toLocaleString('chinese',{hour12:false}).replace(/\//g, "-")}}</span>
        <span>反馈内容：</span>
        <p>{{allData.content}}</p>
      </div>
      <div v-show="replyer">
        <span>{{new Date(parseInt(allData.reply_time) * 1000).toLocaleString('chinese',{hour12:false}).replace(/\//g, "-")}}</span>
        <span>回复：</span>
        <p>{{allData.answer}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import publicHead from '../moreService/publicHead'
export default {
  components : {
    publicHead
  },
  data() {
    return {
      funcName: '投诉',
      allData: '',
      recordTime: '',
      replyer: false
    }
  },
  activated() {
    this.allData = this.$route.params
    console.log(this.allData)
    if(!(this.allData.answer.length == 0)) {this.replyer = true}
    this.funcName = this.allData.title
    let timestamp = this.allData.send_time*1000
    let assignTime = new Date(timestamp),
        y = assignTime.getFullYear(),
        M = assignTime.getMonth() + 1,
        d = assignTime.getDate(),
        h = assignTime.getHours(),
        m = assignTime.getMinutes(),
        s = assignTime.getSeconds(),
        add0 = (m) => {
          return m > 9 ? m : '0' + m
        }
    this.recordTime = y + '-' + add0(M) + '-' + add0(d) + " " + add0(h) + ":" + add0(m) + ":" + add0(s)
    this.$dialog.loading.open(' ');
    this.$ajax('request', {
      ac: 'ReadOpinion',
      id: this.allData.id
    }).then(res => {
    })
    this.$dialog.loading.close()
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.adviceFeedlist_main_body {
  // padding: poTorem(20px) poTorem(10px);
  .adviceFeedlist_main_content {
  background-color: #fff;
  border-radius: poTorem(5px);
  border-left: poTorem(1px) solid rgb(215,217,218);
  border-right: poTorem(1px) solid rgb(215,217,218);
  div {
    border-bottom: poTorem(1px) solid rgb(215,217,218);
    padding: poTorem(10px);
    &:last-child{
      border-bottom: none;
    }
    span {
      display: block;
      font-size: poTorem(15px);
      line-height: poTorem(30px);
      color: rgb(98,99,100)
    }
    p {
      font-size: poTorem(15px);
      line-height: poTorem(25px);
      color: #000;
      text-indent: 2em;
    }
  }
}
}
</style>


