<template>
  <div>
    <yd-tab class="betRecord" :callback="getData" v-show="tabswitch" slot='list'>
      <yd-tab-panel v-for="(item,key) in tabType" :label="item.label" :key="key" class="cont"></yd-tab-panel>
      <div class="empty" v-show="this.allData==0">
        <img src="../../../../img/bet_record/noRecords.png" alt="">
        <p>暂无记录</p>
        <router-link to='/betting'>
          <button>立即购买</button>
        </router-link>
      </div>
      <div class="hasContent" @click="toDetails(item)" v-for="(item, index) in allData" :key="index" v-show="this.allData != 0">
        <div class="left">
          <p>{{item.game_name}}</p>
          <p>{{item.tz_time}}</p>
        </div>
        <p class="center">{{item.qishu}}</p>
        <div class="right">
          <div>
            <p>-{{item.price}}</p>
            <!-- 0=待开奖, 1=已中奖 2=未中奖 3=撤单 4=追号 -->
            <p :class="[item.status==0?'wait':item.status==1?'win':item.status==3?'cancel':'default']">
              {{item.status==1?'赢'+item.win+'元':item.status==0?'待开奖':item.status==3?'已撤单':'未中奖'}}</p>
          </div>
          <div>
            <img src="../../../../img/bet_record/arrow.png" alt="">
          </div>
        </div>
      </div>
      <p class="all_present" v-show="this.allData!=0" @click="getMoreData">{{isAllPresent?'已显示全部':'查看更多'}}</p>
    </yd-tab>
  </div>
</template>
<script>
</script>
