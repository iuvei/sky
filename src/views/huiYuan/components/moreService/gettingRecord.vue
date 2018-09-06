<template>
  <div class="gettingRecord_main_body">
    <publicHead :title="funcName" :type="5"></publicHead>
    <div class="main_content">
      <div class="hasContent">
        <yd-accordion accordion>
          <yd-accordion-item title="本月" open icon  @click.native="getData(0)">
            <div class="info" v-for="(item, key) in thisMonth" :key="key">
              <div class="left">
                <p>累计签到{{item.sign_days}}天奖励</p>
                <p :style="item.status==='未领取'?'color:#E73A42':''">{{item.status}}</p>
              </div>
              <div class="right">
                <div>
                  <p>{{item.reward_price}} 元{{item.price_type}}</p>
                  <p>{{item.uptime}}</p>
                </div>
              </div>
            </div>
          </yd-accordion-item>
          <yd-accordion-item :title="SectionToChinese(new Date().getMonth()) + '月'" @click.native="getData(1)">
            <div class="info" v-for="(item, key) in upMonth" :key="key">
              <div class="left">
                <p>累计签到{{item.sign_days}}天奖励</p>
                <p :style="item.status==='未领取'?'color:#E73A42':''">{{item.status}}</p>
              </div>
              <div class="right">
                <div>
                  <p>{{item.reward_price}} 元{{item.price_type}}</p>
                  <p>{{item.uptime}}</p>
                </div>
              </div>
            </div>
          </yd-accordion-item>
          <yd-accordion-item :title="SectionToChinese(new Date().getMonth()-1) + '月'" @click.native="getData(2)">
            <div class="info" v-for="(item, key) in lastMonth" :key="key">
              <div class="left">
                <p>累计签到{{item.sign_days}}天奖励</p>
                <p :style="item.status==='未领取'?'color:#E73A42':''">{{item.status}}</p>
              </div>
              <div class="right">
                <div>
                  <p>{{item.reward_price}} 元{{item.price_type}}</p>
                  <p>{{item.uptime}}</p>
                </div>
              </div>
            </div>
          </yd-accordion-item>
        </yd-accordion>
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
      funcName: '领取记录',
      thisMonth: [],
      upMonth: [],
      lastMonth: [],
      gettingState: [],
    }
  },
  mounted() {
    this.getData(0)
  },
  methods: {
    getData (n) {
      this.$dialog.loading.open(' ')
      this.$ajax('request', {
        ac: 'UserSignAwardLog',
        date: n
      }).then(res => {
        if(n === 0) {
          this.thisMonth = res
        } else if(n === 1) {
          this.upMonth = res
        } else if (n === 2) {
          this.lastMonth = res
        }
        this.gettingState = res.box
        this.$dialog.loading.close()
      })
    },
    SectionToChinese(section){
      let chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
      let chnUnitSection = ["","万","亿","万亿","亿亿"];
      let chnUnitChar = ["","十","百","千"];
      let strIns = '', chnStr = '';
      let unitPos = 0;
      let zero = true;
      while(section > 0){
        let v = section % 10;
        if(v === 0){
          if(!zero){
            zero = true;
            chnStr = chnNumChar[v] + chnStr;
          }
        }else{
          zero = false;
          strIns = chnNumChar[v];
          strIns += chnUnitChar[unitPos];
          chnStr = strIns + chnStr;
        }
        unitPos++;
        section = Math.floor(section / 10);
      }
      return chnStr;
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.gettingRecord_main_body {
  background-color: #eee;
  .main_content {
    height: poTorem(688px);
    background-color: #eee;
    .empty {
      padding-top: 50%;
      @include column;
      img {
        width: poTorem(93px);
      }
      p {
        font-size: poTorem(14px);
        height: poTorem(20px);
        line-height: poTorem(20px);
        color: #bfbfbf;
        font-weight: 700;
      }
    }
    .hasContent {
      @include between;
      .info {
        width: 100%;
        height: 3.5rem;
        border-bottom: 1px solid rgb(229,229,229);
        &:last-child{
          border-bottom: none;
        }
      }
      .left {
        float: left;
        padding: 0.5rem;
        p {
          line-height: poTorem(20px);
          &:first-child {
            font-size: poTorem(14px);
            color: #313131;
          }
          &:last-child {
            font-size: poTorem(12px);
            color: #a0a0a0;
          }
        }
      }
      .center {
        font-size: poTorem(12px);
      }
      .right {
        float: right;
        padding: 0.5rem;
        div {
          height: poTorem(37px);
          &:first-child {
            font-size: poTorem(13px);
            p {
              line-height: poTorem(20px);
              text-align: right;
              &:first-child {
                color: #009944;
              }
              &:last-child {
                font-size: poTorem(10px);
                color: #a0a0a0;
              }
            }
          }
        }
      }
    }
    .all_present {
      width: 100%;
      text-align: center;
      margin-top: poTorem(20px);
      font-size: 1rem;
      color: #a0a0a0;
      font-weight: 400;
    }
  }
}
</style>


