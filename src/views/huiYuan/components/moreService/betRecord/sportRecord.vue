<template>
  <div>
    <yd-tab v-model="tab" :prevent-default="false" :item-click="itemClick" v-show="!tabswitch" class="tabs betRecord" slot='list'>
      <yd-tab-panel v-for="(item,key) in items" :label="item.label" :key="key" class="cent">
        <div class="emptys" v-show="!showData">
          <img src="../../../../img/bet_record/noRecords.png" alt="">
          <p>暂无记录</p>
          <router-link to='/betting'>
            <button>立即购买</button>
          </router-link>
        </div>
        <div v-for="(item,key) in data" :key="key" v-show="showData" class="list">
          <div class="info" @click="itemInfo(item,key)" v-if="item.game_type ===3">
            <p>综合过关</p>
            <p style="display:inline-block">{{item.bet_info.length}}串1</p>
            <p style="display:inline-block;float:right">已结束：{{item.opened_result}}</p>
            <p>实际盈亏
              <b>{{(item.profit || 0).toFixed(2)}}</b>
            </p>
            <p>下注：
              <span>{{(item.bet_info[0].price || 0).toFixed(2)}}</span> 元
              <b :class="item.bet_info[0].status==0?'orange':item.bet_info[0].status==1?'green':item.bet_info[0].status==2?'red':''">{{item.bet_info[0].status==0?'待开奖':item.bet_info[0].status==1?'已中奖':item.bet_info[0].status==2?'未中奖':item.bet_info[0].status==3?'和局':item.bet_info[0].status==4?'已撤单':'已结束'}}</b>
            </p>
          </div>
          <div class="info" @click="itemInfo(item,key)" v-else>
            <p>{{item.bet_info[0].play_method}}</p>
            <p>{{item.bet_info[0].team}}</p>
            <p>{{item.bet_info[0].bet_content}}
              <span>@{{item.bet_info[0].new_odds}}</span>
            </p>
            <p>实际盈亏
              <b>{{(item.profit || 0).toFixed(2)}}</b>
            </p>
            <p>下注：
              <span>{{(item.bet_info[0].price || 0).toFixed(2)}}</span> 元
              <b :class="item.bet_info[0].status==0?'orange':item.bet_info[0].status==1?'green':item.bet_info[0].status==2?'red':''">{{item.bet_info[0].status==0?'待开奖':item.bet_info[0].status==1?'已中奖':item.bet_info[0].status==2?'未中奖':item.bet_info[0].status==3?'和局':item.bet_info[0].status==4?'已撤单':'已结束'}}</b>
            </p>
          </div>
        </div>
      </yd-tab-panel>
    </yd-tab>
  </div>
</template>
