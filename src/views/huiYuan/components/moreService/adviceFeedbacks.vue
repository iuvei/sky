<template>
  <div class="adviceFeedbacks_main_body">
    <publicHead :title="funcName" :type="5"></publicHead>
    <div class="adviceFeedbacks_main_content">
      <div class="top">
        <router-link :to="item.path" class="pieces_content" v-for="(item, index) in gridsData" :key="index">
          <img :src="item.src" alt="">
          <span>{{item.text}}</span>
        </router-link>
        <a :href="sysinfo.service_url">
          <img src="../../../../img/personal_center/service.png" alt="">
          <span>联系客服</span>
        </a>
      </div>
      <yd-tab class="tabss" v-model="tab" :callback="getData" :prevent-default="false" :item-click="itemClick">
        <div>
          <ul>
            <li>标题</li>
            <li>状态</li>
            <li>反馈时间</li>
          </ul>
        </div>
        <yd-tab-panel v-for="(item,key) in items" :key="key" :label="item.label">
          <div @click="toDetails(item)" v-for="(item,key) in allData" :key="key" :id="item.id">
            <ul class="info">
              <li>{{item.title}}</li>
              <li>{{item.answer.length == 0?"未回复":"已回复"}}</li>
              <li>{{new Date(parseInt(item.send_time) * 1000).toJSON().slice(0,10)}}</li>
            </ul>
          </div>
        </yd-tab-panel>
      </yd-tab>
    </div>
  </div>
</template>
<script>
import publicHead from './publicHead'
import { mapState } from 'vuex'
export default {
  components : {
    publicHead
  },
  data() {
    return {
      funcName: '意见反馈',
      tab: 0,
      allData: [],
      pageId: 0,
      gridsData:[
        {
          text: '我要反馈',
          path: '/moreService/adviceFeedback',
          src: require('../../../../img/personal_center/opinion.png')
        }
      ],
      items: [
        {
          label: '全部',
          content: ''
        },
        {
          label: '已回复',
          content: ''
        },
        {
          label: '未回复',
          content: ''
        }
      ],
      label:'全部'
    }
  },
  activated() {
    this.getAllData()
  },
  computed: {
    ...mapState(["sysinfo"])
  },
  methods: {
    getAllData() {
      this.$dialog.loading.open(' ');
      this.$ajax('request', {
        ac: 'getOpinionList',
      }).then(res => {
        this.allData = res
        this.$dialog.loading.close()
      })
    },
    getData(label,key) {
      this.label = label
      this.$dialog.loading.open(' ');
      this.$ajax('request', {
        ac: 'getOpinionList',
      }).then(res => {
        for(var i = 0; i<res.length; i++) {
          if(res[i].status === 1) {
            this.$dialog.loading.open(' ');
            this.$ajax('request', {
              ac: 'ReadOpinion',
              id: res[i].id
            }).then(res => {
              this.$dialog.loading.close()
            })
          }
        }
        if(this.label == '全部'){
          this.allData = res
        } else if (this.label === '已回复') {
          this.allData = []
          for ( var i = 0 ; i < res.length ; i++ ) {
            if(!(res[i].answer.length == 0)){
              this.allData.push(res[i])
            }
          }
        } else if(this.label === '未回复'){
          this.allData = []
          for ( var i = 0 ; i < res.length ; i++ ) {
            if(res[i].answer.length == 0){
              this.allData.push(res[i])
            }
          }
        }
        this.$dialog.loading.close()
      })
    },
    itemClick(key) {
      this.tab = key;
    },
    toDetails(item) {
      this.$router.push({
        name: 'fankuixiangqing',
        params: item
      })
    },
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.adviceFeedbacks_main_body {
  background-color: #eee;
  .adviceFeedbacks_main_content {
    height: poTorem(688px);
    background-color: #eee;
    .top {
      background-color: #fff;
      padding: poTorem(10px) 0;
      height: poTorem(60px);
      border-bottom: poTorem(1px) solid #ccc;
      a {
        display: inline-block;
        width: 50%;
        float: left;
        height: poTorem(40px);
        text-align: center;
        &:first-child{
          border-right: poTorem(1px) solid #ccc;
        }
        span {
          display: inline-block;
          height: poTorem(40px);
          line-height: poTorem(40px);
          vertical-align: super;
          color:rgb(17,140,227);
          font-size: poTorem(20px);
          margin-left: poTorem(10px);
        }
        img {
          width: poTorem(25px);
        }
      }
    }
    .tabss {
      // height: poTorem(30px);
      ul {
        margin: 0;
        li {
          float: left;
          width: 33.333%;
          font-size: poTorem(18px);
          height: poTorem(45px);
          line-height: poTorem(45px);
          text-align: center;
          border-bottom: poTorem(1px) solid #ccc;
          &:last-child{
            // font-size: poTorem(10px);
          }
        }
      }
      .info {
        li {
          color: rgb(61, 61, 61);
        }
      }
    }
  }
}
</style>


