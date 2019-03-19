<template>
  <!-- 投注界面 -->
  <div class="betting">
    <!-- 幸运扑克 -->
    <div class="xypk">
      <div class="wrapper"
           v-for="(item,index) in dataSet"
           :key="index">
        <!-- 包选 -->
        <div class="baoxuan"
             v-for="(subitem,num) in  item.data"
             v-if="[1].includes(curPlayItem.playid)">
          <div class="cards"
               :class="[{active : subitem.checked}]"
               @click="clickBall(item,subitem)"
               :key="num">
            <input type="checkbox"
                   v-model="subitem.checked">
            <p class="title">{{subitem.name}}</p>
            <div class="cart_content">
              <div class="lizi">如</div>
              <div class="card_item"
                   v-for="(card,cardindex) in subitem.cards">
                <span class="card_bg">
                  <span class="card_hs"><img :src="require('../../../../../img/puke/card/' +card.type + '_' + card.card +'.png' )"
                         alt=""></span>
                </span>
              </div>
            </div>
          </div>
          <div class="peilv">{{subitem.peilv}}</div>
        </div>
        <!-- 单选 -->
        <div class="danxuan"
             v-for="(subitem,subindex) in item.data"
             :key="subindex"
             v-if="[2,3,4,5,6].includes(curPlayItem.playid)">
          <div class="peilv"
               v-if="[2,3,4,5,6].includes(curPlayItem.playid)">( 赔率：{{subitem.peilv}} )</div>
          <div class="cards_box">
            <div class="box_item"
                 @click="clickBall(item,val)"
                 :class="[{active : val.checked}]"
                 v-for="(val,valnum) in subitem.cards"
                 :key="valnum"
                 v-if="[2,3,4].includes(curPlayItem.playid)">
              <input type="checkbox"
                     v-model="val.checked">
              <div class="card_content">
                <div class="card_main">
                  <span class="card_bg"
                        v-for="(cardval,cardindex) in val.cards"
                        :key="cardindex">
                    <img class="bg_img"
                         :src="require('../../../../../img/puke/seperate/card_bg.png')"
                         alt="">
                    <span class="card_num"><img :src="require('../../../../../img/puke/seperate/' + cardval.card +'-' + cardval.color + '.png')"
                           alt=""></span>
                    <span class="hs_icon"
                          v-if="(cardindex+1) == val.cards.length">
                      <img :src="require('../../../../../img/puke/seperate/spade_small_icon.png')"
                           alt="">
                      <img :src="require('../../../../../img/puke/seperate/heart_small_icon.png')"
                           alt="">
                      <img :src="require('../../../../../img/puke/seperate/plum_small_icon.png')"
                           alt="">
                      <img :src="require('../../../../../img/puke/seperate/block_small_icon.png')"
                           alt="">
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <!-- 单选同花 -->
            <div class="th_box_item"
                 :class="[{active : val.checked}]"
                 @click="clickBall(item,val)"
                 v-for="(val,valnum) in subitem.cards"
                 v-if="[5,6].includes(curPlayItem.playid)"
                 :key="valnum">
              <input type="checkbox"
                     v-model="val.checked">
              <span class="th_card"
                    v-if="[5].includes(curPlayItem.playid)"><img :src="require('../../../../../img/puke/big/'+val.card + '_big.png')"
                     alt=""></span>
              <!-- 单选同花顺 -->
              <span class="ths_card"
                    v-if="[6].includes(curPlayItem.playid)">
                <img :src="require('../../../../../img/puke/big/'+val.card + '_big.png')"
                     alt="">
                <span class="text">顺子</span>
              </span>
            </div>
          </div>
          <div style="height: 4rem;width:100%;"></div>
        </div>
        <!-- 任选  -->
        <div class="renxuan"
             v-for="(subitem,subindex) in item.data"
             :key="subindex"
             v-if="[7,8,9,10,11,12].includes(curPlayItem.playid)">
          <div class="peilv"
               v-if="[7,8,9,10,11,12].includes(curPlayItem.playid)">( 赔率：{{subitem.peilv}} )</div>
          <div class="card_box">
            <div class="card_item"
                 v-for="(val,num) in subitem.cards"
                 @click="clickBall(item,val)"
                 :class="[{active : val.checked}]">
              <input type="checkbox"
                     v-model="val.checked">
              <div class="card_bg">
                <img class="bg_img"
                     :src="require('../../../../../img/puke/seperate/card_bg.png')"
                     alt="">
                <!-- <span class="card_mark"> -->
                <span class="card_num"><img :src="require('../../../../../img/puke/seperate/'+ val.card +'-black.png')"
                       alt=""></span>
                <span class="rx_icon">
                  <img :src="require('../../../../../img/puke/seperate/spade_small_icon.png')"
                       alt="">
                  <img :src="require('../../../../../img/puke/seperate/heart_small_icon.png')"
                       alt="">
                  <img :src="require('../../../../../img/puke/seperate/plum_small_icon.png')"
                       alt="">
                  <img :src="require('../../../../../img/puke/seperate/block_small_icon.png')"
                       alt="">
                </span>
                <!-- </span> -->
              </div>
            </div>
          </div>
          <div style="height: 4rem;width:100%;"></div>
        </div>
        <div style="height: 2rem;"></div>
      </div>
    </div>
    <div class="bet_area">
      <div @click="clickCart"
           class="shop_icon"
           v-show="shopShow"
           v-drag>
        <div class="_drag">
          <i class="spots"
             v-show="cartNumber>0">
            {{cartNumber > 99 ? '99+' : cartNumber}}
          </i>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { RenderTypes } from "~/js/touzhu/commonTypes";
import { Pukecalc_zhushu } from "~/js/touzhu/touzhu.puke.calc";
import {
  getCalcFuncByPlayID,
  getRenderTypeByPlayID
} from "~/js/touzhu/touzhu.puke.util";
import api from "../../../../../../api/betting";
import oddMixin from "../../oddMixin";
import danshiUtil from "~/js/touzhu/danshi.util";
import randomUtil from "~/js/touzhu/touzhu.random.danshi";

import betArea from "../../../components/betArea";
import getDwdArr from "~/js/touzhu/util";
// import { stat } from 'fs';
const zhushuFunc = new Pukecalc_zhushu();
const baoxuan_template = [
  {
    name: "包选",
    options: [
      {
        name: "对子",
        checked: false,
        list: [
          { card: "A", type: "spade", color: "black" },
          { card: "A", type: "heart", color: "black" },
          { card: 3, type: "plum", color: "black" }
        ],
        value: 0
      },
      {
        name: "顺子",
        checked: false,
        list: [
          { card: "A", type: "spade", color: "black" },
          { card: 2, type: "plum", color: "black" },
          { card: 3, type: "heart", color: "black" }
        ],
        value: 1
      },
      {
        name: "同花",
        checked: false,
        list: [
          { card: "A", type: "spade", color: "black" },
          { card: 3, type: "spade", color: "black" },
          { card: 4, type: "spade", color: "black" }
        ],
        value: 2
      },
      {
        name: "豹子",
        checked: false,
        list: [
          { card: "A", type: "spade", color: "black" },
          { card: "A", type: "heart", color: "black" },
          { card: "A", type: "plum", color: "black" }
        ],
        value: 3
      },
      {
        name: "同花顺",
        checked: false,
        list: [
          { card: "A", type: "heart", color: "red" },
          { card: 2, type: "heart", color: "red" },
          { card: 3, type: "heart", color: "red" }
        ],
        value: 4
      }
    ]
  }
];
const dxsz_template = [
  {
    name: "单选",
    options: [
      {
        name: "顺子",
        list: [
          {
            cards: [
              { card: "A", type: "spade", color: "black" },
              { card: 2, type: "heart", color: "black" },
              { card: 3, type: "heart", color: "black" }
            ],
            checked: false,
            name: "A,2,3",
            value: 0
          },
          {
            cards: [
              { card: 2, type: "spade", color: "black" },
              { card: 3, type: "heart", color: "black" },
              { card: 4, type: "heart", color: "black" }
            ],
            checked: false,
            name: "2,3,4",
            value: 1
          },
          {
            cards: [
              { card: 3, type: "spade", color: "black" },
              { card: 4, type: "heart", color: "black" },
              { card: 5, type: "heart", color: "black" }
            ],
            checked: false,
            name: "3,4,5",
            value: 2
          },
          {
            cards: [
              { card: 4, type: "spade", color: "black" },
              { card: 5, type: "heart", color: "black" },
              { card: 6, type: "heart", color: "black" }
            ],
            checked: false,
            name: "4,5,6",
            value: 3
          },
          {
            cards: [
              { card: 5, type: "spade", color: "black" },
              { card: 6, type: "heart", color: "black" },
              { card: 7, type: "heart", color: "black" }
            ],
            checked: false,
            name: "5,6,7",
            value: 4
          },
          {
            cards: [
              { card: 6, type: "spade", color: "black" },
              { card: 7, type: "heart", color: "black" },
              { card: 8, type: "heart", color: "black" }
            ],
            checked: false,
            name: "6,7,8",
            value: 5
          },
          {
            cards: [
              { card: 7, type: "spade", color: "black" },
              { card: 8, type: "heart", color: "black" },
              { card: 9, type: "heart", color: "black" }
            ],
            checked: false,
            name: "7,8,9",
            value: 6
          },
          {
            cards: [
              { card: 8, type: "spade", color: "black" },
              { card: 9, type: "heart", color: "black" },
              { card: 10, type: "heart", color: "black" }
            ],
            checked: false,
            name: "8,9,10",
            value: 7
          },
          {
            cards: [
              { card: 9, type: "spade", color: "black" },
              { card: 10, type: "heart", color: "black" },
              { card: "J", type: "heart", color: "black" }
            ],
            checked: false,
            name: "9,10,J",
            value: 8
          },
          {
            cards: [
              { card: 10, type: "spade", color: "black" },
              { card: "J", type: "heart", color: "black" },
              { card: "Q", type: "heart", color: "black" }
            ],
            checked: false,
            name: "10,J,Q",
            value: 9
          },
          {
            cards: [
              { card: "J", type: "spade", color: "black" },
              { card: "Q", type: "heart", color: "black" },
              { card: "K", type: "heart", color: "black" }
            ],
            checked: false,
            name: "J,Q,K",
            value: 10
          }
        ]
      }
    ]
  }
];
const dxth_template = [
  {
    name: "单选",
    options: [
      {
        name: "同花",
        list: [
          { card: "spade", checked: false, name: "黑桃", value: 0 },
          { card: "heart", checked: false, name: "红心", value: 1 },
          { card: "plum", checked: false, name: "梅花", value: 2 },
          { card: "block", checked: false, name: "方块", value: 3 }
        ]
      }
    ]
  }
];
const dxths_template = [
  {
    name: "单选",
    options: [
      {
        name: "同花顺",
        list: [
          { card: "spade", checked: false, name: "黑桃", value: 0 },
          { card: "heart", checked: false, name: "红心", value: 1 },
          { card: "plum", checked: false, name: "梅花", value: 2 },
          { card: "block", checked: false, name: "方块", value: 3 }
        ]
      }
    ]
  }
];

const dxbz_template = [
  {
    name: "单选",
    options: [
      {
        name: "豹子",
        list: [
          {
            cards: [
              { card: "A", type: "spade", color: "black" },
              { card: "A", type: "heart", color: "black" },
              { card: "A", type: "heart", color: "black" }
            ],
            checked: false,
            name: "A",
            value: 0
          },
          {
            cards: [
              { card: 2, type: "spade", color: "black" },
              { card: 2, type: "heart", color: "black" },
              { card: 2, type: "heart", color: "black" }
            ],
            checked: false,
            name: "2",
            value: 1
          },
          {
            cards: [
              { card: 3, type: "spade", color: "black" },
              { card: 3, type: "heart", color: "black" },
              { card: 3, type: "heart", color: "black" }
            ],
            checked: false,
            name: "3",
            value: 2
          },
          {
            cards: [
              { card: 4, type: "spade", color: "black" },
              { card: 4, type: "heart", color: "black" },
              { card: 4, type: "heart", color: "black" }
            ],
            checked: false,
            name: "4",
            value: 3
          },
          {
            cards: [
              { card: 5, type: "spade", color: "black" },
              { card: 5, type: "heart", color: "black" },
              { card: 5, type: "heart", color: "black" }
            ],
            checked: false,
            name: "5",
            value: 4
          },
          {
            cards: [
              { card: 6, type: "spade", color: "black" },
              { card: 6, type: "heart", color: "black" },
              { card: 6, type: "heart", color: "black" }
            ],
            checked: false,
            name: "6",
            value: 5
          },
          {
            cards: [
              { card: 7, type: "spade", color: "black" },
              { card: 7, type: "heart", color: "black" },
              { card: 7, type: "heart", color: "black" }
            ],
            checked: false,
            name: "7",
            value: 6
          },
          {
            cards: [
              { card: 8, type: "spade", color: "black" },
              { card: 8, type: "heart", color: "black" },
              { card: 8, type: "heart", color: "black" }
            ],
            checked: false,
            name: "8",
            value: 7
          },
          {
            cards: [
              { card: 9, type: "spade", color: "black" },
              { card: 9, type: "heart", color: "black" },
              { card: 9, type: "heart", color: "black" }
            ],
            checked: false,
            name: "9",
            value: 8
          },
          {
            cards: [
              { card: 10, type: "spade", color: "black" },
              { card: 10, type: "heart", color: "black" },
              { card: 10, type: "heart", color: "black" }
            ],
            checked: false,
            name: "10",
            value: 9
          },
          {
            cards: [
              { card: "J", type: "spade", color: "black" },
              { card: "J", type: "heart", color: "black" },
              { card: "J", type: "heart", color: "black" }
            ],
            checked: false,
            name: "J",
            value: 10
          },
          {
            cards: [
              { card: "Q", type: "spade", color: "black" },
              { card: "Q", type: "heart", color: "black" },
              { card: "Q", type: "heart", color: "black" }
            ],
            checked: false,
            name: "Q",
            value: 11
          },
          {
            cards: [
              { card: "K", type: "spade", color: "black" },
              { card: "K", type: "heart", color: "black" },
              { card: "K", type: "heart", color: "black" }
            ],
            checked: false,
            name: "K",
            value: 12
          }
        ]
      }
    ]
  }
];

const dxdz_template = [
  {
    name: "单选",
    options: [
      {
        name: "对子",
        list: [
          {
            cards: [
              { card: "A", type: "spade", color: "black" },
              { card: "A", type: "heart", color: "black" }
            ],
            checked: false,
            name: "A,A",
            value: 0
          },
          {
            cards: [
              { card: "2", type: "spade", color: "black" },
              { card: "2", type: "heart", color: "black" }
            ],
            checked: false,
            name: "2,2",
            value: 1
          },
          {
            cards: [
              { card: "3", type: "spade", color: "black" },
              { card: "3", type: "heart", color: "black" }
            ],
            checked: false,
            name: "3,3",
            value: 2
          },
          {
            cards: [
              { card: "4", type: "spade", color: "black" },
              { card: "4", type: "heart", color: "black" }
            ],
            checked: false,
            name: "4,4",
            value: 3
          },
          {
            cards: [
              { card: "5", type: "spade", color: "black" },
              { card: "5", type: "heart", color: "black" }
            ],
            checked: false,
            name: "5,5",
            value: 4
          },
          {
            cards: [
              { card: "6", type: "spade", color: "black" },
              { card: "6", type: "heart", color: "black" }
            ],
            checked: false,
            name: "6,6",
            value: 5
          },
          {
            cards: [
              { card: "7", type: "spade", color: "black" },
              { card: "7", type: "heart", color: "black" }
            ],
            checked: false,
            name: "7,7",
            value: 6
          },
          {
            cards: [
              { card: "8", type: "spade", color: "black" },
              { card: "8", type: "heart", color: "black" }
            ],
            checked: false,
            name: "8,8",
            value: 7
          },
          {
            cards: [
              { card: "9", type: "spade", color: "black" },
              { card: "9", type: "heart", color: "black" }
            ],
            checked: false,
            name: "9,9",
            value: 8
          },
          {
            cards: [
              { card: "10", type: "spade", color: "black" },
              { card: "10", type: "heart", color: "black" }
            ],
            checked: false,
            name: "10,10",
            value: 9
          },
          {
            cards: [
              { card: "J", type: "spade", color: "black" },
              { card: "J", type: "heart", color: "black" }
            ],
            checked: false,
            name: "J,J",
            value: 10
          },
          {
            cards: [
              { card: "Q", type: "spade", color: "black" },
              { card: "Q", type: "heart", color: "black" }
            ],
            checked: false,
            name: "Q,Q",
            value: 11
          },
          {
            cards: [
              { card: "K", type: "spade", color: "black" },
              { card: "K", type: "heart", color: "black" }
            ],
            checked: false,
            name: "K,K",
            value: 12
          }
        ],
        value: 4
      }
    ]
  }
];

const renxuan_template = [
  {
    name: "任选",
    options: [
      {
        name: "任选",
        list: [
          { card: "A", checked: false, name: "A", value: 0 },
          { card: "2", checked: false, name: "2", value: 1 },
          { card: "3", checked: false, name: "3", value: 2 },
          { card: "4", checked: false, name: "4", value: 3 },
          { card: "5", checked: false, name: "5", value: 4 },
          { card: "6", checked: false, name: "6", value: 5 },
          { card: "7", checked: false, name: "7", value: 6 },
          { card: "8", checked: false, name: "8", value: 7 },
          { card: "9", checked: false, name: "9", value: 8 },
          { card: "10", checked: false, name: "10", value: 9 },
          { card: "J", checked: false, name: "J", value: 10 },
          { card: "Q", checked: false, name: "Q", value: 11 },
          { card: "K", checked: false, name: "K", value: 12 }
        ]
      }
    ]
  }
];

export default {
  name: "fc3d_betting",
  props: ["routeList"],
  components: {
    betArea
  },
  data() {
    return {
      shopShow: true,
      isClick: false,
      dataSet: [],
      playList: Array,
      guanfangList: [],
      shuangmianList: [],
      title: "直选复式",
      modelTitle: "",
      show1: false,
      heights: "",
      player: {},
      playersChl: {},
      template_default: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      template_sum: [0, 27],
      template_zu6: [3, 24],
      template_zu3: [1, 26],
      ballsList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      ballsList2: ["大", "小", "单", "双"],
      switchs: this.$route.params.play_type ? "双面玩法" : "官方玩法",
      peilv: "",
      peilvs: [],
      parentWanfa: 0,
      wanfaIndex: 0,
      curPlayItem: {},
      wanfa: {},
      danshiExcl: "",
      odds: [],
      zhushu: 0,
      myPlaceholder: "",
      baoxuan_template
    };
  },
  mounted() {
    this.getData(this.$route.params.js_tag);
  },
  activated() {
    if (this.$route.params.isHome) {
      this.getData(this.$route.params.js_tag);
    }
    this.setOdds();
    this.clearBalls();
    this.zhushu = 0;
    this.danshiExcl = "";
  },
  deactivated() {
    if (this.dataSet && this.dataSet.length) {
      this.dataSet.forEach(item => {
        item.data.forEach(x => (x.checked = false));
      });
    }
  },
  methods: {
    clickBall(item, subitem) {
      console.log("subitem", subitem);
      console.log("item", item);
      subitem.checked = !subitem.checked;
      this.filter();
    },
    // 包选/单选/任选一 注数计算
    // puke_danchengzhu(num) {
    //   const danchengzhu = val.split(" ").join("|");
    //   switch (num) {
    //     case 1:
    //     case 2:
    //     case 3:
    //     case 4:
    //     case 5:
    //     case 6:
    //     case 7:
    //       this.zhushu = zhushuFunc.calc_danchengzhu(danchengzhu.split(","));
    //   }
    // },
    // 任选二~六注数计算
    renxszhushucal() {},
    danshiZhushuCacl(val) {
      const danshiExcl = val.split(" ").join("|");
      switch (this.curPlayItem.playid) {
        case 2:
          this.zhushu = zhushuFunc.calc_3x_zhxds(danshiExcl.split(","));
          break;
      }
    },
    clickCart() {
      if (this.cart.length) {
        this.$router.push("/shopCart");
      } else {
        this.$dialog.toast({ mes: "您的购物车空空如也" });
      }
    },
    clearBalls() {
      if (this.dataSet && this.dataSet.length) {
        this.dataSet.forEach(x => x.data.forEach(y => (y.checked = false)));
        if (
          [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(this.curPlayItem.playid)
        ) {
          this.dataSet.forEach(x =>
            x.data[0].cards.forEach(y => {
              y.checked = false;
            })
          );
        }
      }
      this.zhushu = 0;
      this.setBetNumber(0);
    },
    getTemplateByRange(template) {
      const arr = [];
      if (!template.length && template.length !== 2) {
        return [];
      }
      for (let i = template[0]; i <= template[1]; i++) {
        arr.push(i);
      }
      return arr;
    },
    async getData(tag) {
      const playConfig = await api.getGamePlayConfig(tag);
      if (playConfig && Array.isArray(playConfig)) {
        this.playList = playConfig;
        this.setPlayConfig(playConfig);
        this.guanfangList = playConfig.filter(x => x.showofficial === 0);
        this.shuangmianList = playConfig.filter(x => x.showofficial === 1);

        // 从彩种获取默认玩法 ，0为官方 1为双面
        const defaultPlay = this.$route.params.play_type;
        this.player =
          defaultPlay === 0 ? this.guanfangList : this.shuangmianList;
        this.playSwitch(defaultPlay ? "双面玩法" : "官方玩法");
        if (!this.$route.params.hasOwnProperty("wanfa")) {
          this.player && this.changeList(this.player[0]);
        } else {
          this.findItemByWanfa(this.$route.params.wanfa);
        }
        // this.player && this.changeList(this.player[0])
      }
    },
    // 计算注数
    calcZhushu(playid, oneDimValuesArr) {
      const func = getCalcFuncByPlayID(playid), // getCalcFuncByName(playName),
        param = oneDimValuesArr;
      // if (playid === 12) {
      //   param = towDimValuesArr //定位胆
      // } else if (
      //   playid === 1 || //"三星直选复式"
      //   playid === 8 || //前二直选复式
      //   playid === 9 //后二直选复式
      // ) {
      //   param = twoDimNamesArr
      // }
      console.log("param", param);
      this.zhushu = zhushuFunc[func](param.length);
      console.log("zhushu", this.zhushu);
    },
    clickHandle() {
      // 单行多赔率
      const oneDimArr = [],
        twoDimArr = [],
        oneDimValuesArr = [],
        twoDimNamesArr = [],
        towDimValuesArr = [];
      let formatShowStr = "";
      const peilvType = getRenderTypeByPlayID(this.curPlayItem.playid);
      let filteredData = [];
      this.dataSet.forEach(item => {
        if (this.curPlayItem.playid == 1) {
          filteredData = item.data.filter(x => x.checked);
        } else {
          filteredData = item.data[0].cards.filter(x => x.checked);
        }
        console.log("filterData", filteredData);
        oneDimArr.push(...filteredData);
        if (filteredData.length) {
          const obj = Object.assign({}, item);
          obj.data = filteredData;
          twoDimArr.push(obj);
        }
        const filters = filteredData.map(x =>
          x.name.toString().replace(/\s/g, "")
        );
        const values = filteredData.map(x =>
          x.value.toString().replace(/\s/g, "")
        );
        oneDimValuesArr.push(...filters);
        twoDimNamesArr.push(filters.join("|"));
        towDimValuesArr.push(values.join("|"));
        console.log("oneDimValuesArr", oneDimValuesArr);
        console.log("twoDimNamesArr", twoDimNamesArr);
        console.log("towDimValuesArr", towDimValuesArr);
        console.log("playid", this.curPlayItem.playid);
      });
      if (
        !danshiUtil.isSingleMode(this.routeList.js_tag, this.curPlayItem.playid)
      ) {
        this.calcZhushu(
          this.curPlayItem.playid,
          oneDimValuesArr,
          twoDimNamesArr,
          towDimValuesArr
        );
      }

      // this.setBetNumber(oneDimArr.length);

      if (peilvType === RenderTypes.MUTI_ROW_SINGLE_PEILV) {
        twoDimNamesArr.forEach((x, i) => {
          if (x.length) {
            formatShowStr += `${
              this.dataSet[i].name
            }(<span style="color:red">${x}</span>) `;
          }
        });
        formatShowStr = formatShowStr.trim();
        console.log("formatShowStr", formatShowStr);
      }
      this.setBetData({
        type: [1, 2, 3, 4, 5, 6, 7].includes(this.curPlayItem.playid) ? 1 : 0,
        peilv: this.peilv,
        peilvType, // 0 为单赔率,1为多赔率
        formatValueStr:
          peilvType == 1 ? twoDimNamesArr.join(" ") : oneDimValuesArr.join(" "),
        arr: oneDimValuesArr,
        arr2: towDimValuesArr,
        formatShowStr,
        // 定位胆专用取值
        dwdValuesArr:
          peilvType == RenderTypes.DWD ? getDwdArr(towDimValuesArr) : [],
        wanfa: this.title, // 玩法
        zhushu: this.zhushu, // 注数
        gameid: this.$route.params.lotter_id,
        js_tag: this.$store.state.betting.js_tag,
        playid: this.curPlayItem.playid,
        dataSource: this.dataSet,
        danshiExcl: this.danshiExcl,
        dataSet: oneDimArr, // 数据源,已选中的一维数组
        filteredData: twoDimArr // 已经选中的项数组 二维数组
      });
    },
    // 选择号码
    filter() {
      setTimeout(this.clickHandle);
    },
    changeList(val) {
      // 添加类名

      if (val) this.modelTitle = val.name;
      val &&
        val.submenu[0] &&
        val.submenu[0].playlist.length &&
        this.specific(val.submenu[0].playlist[0], "显示", 0, 0);

      this.wanfa = val;
    },
    specific(val, txt, p, i) {
      console.log(val, "val");
      switch (val.playid) {
        case 2:
          this.myPlaceholder = "1 2 3";
          break;
      }
      this.danshiExcl = "";
      this.curPlayItem = val;
      this.parentWanfa = p;
      this.wanfaIndex = i;
      this.description(
        `<b>范例</b>：${val.play_fanli}<br><br><b>玩法说明</b>：${
          val.play_shuoming
        }`
      );
      this.playersChl = val.content.split("+");
      this.title = val.playname;
      this.setBetNumber(0);
      txt != "显示" && (this.show1 = !this.show1);
      this.setBallList(val.playid);
      this.setDataSet();
      this.odds.length && this.setEachDataPeilv(this.curPlayItem.playid);
    },
    setBallList(playid) {
      console.log("playid", playid);
      switch (playid) {
        case 1: // 包选
          this.playersChl = baoxuan_template;
          return;
        case 4: // 单选豹子
          this.playersChl = dxsz_template;
          return;
        case 2: // 单选順子
          this.playersChl = dxbz_template;
          return;
        case 5: // 同花
          this.playersChl = dxth_template;
          return;
        case 3: // 对子
          this.playersChl = dxdz_template;
          return;
        case 6: // 同花顺
          this.playersChl = dxths_template;
          return;
        // 任选
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
          this.playersChl = renxuan_template;
          return;
      }
      // let _arr = []
      // _arr = this.playersChl.map(x => {
      //   return {
      //     name: x.name,
      // options: this.ballsList,
      // values: this.ballsList
      // }
      // })
      // this.playersChl = _arr
      console.log(this.playersChl, "playersChl");
    },
    changeGameType(val) {
      this.show1 = !this.show1;
      this.playList.map(item => {
        item.name == val && (this.player = item);
      });
    },
    // 初始化数据源
    setDataSet() {
      const columns = this.playersChl,
        _dataSet = [];
      // arr = [26, 27];
      // const bool = arr.includes(this.curPlayItem.playid);
      columns.map(item => {
        const _d = [];
        // item.options &&
        item.options.map((x, i) => {
          _d.push({
            name: x.name || x,
            checked: false,
            peilv: "-",
            playid: this.curPlayItem.playid,
            cards: x.list || x,
            value: i
          });
        });

        // if (item.data) {
        //   item.data.forEach(el => (el.checked = false));
        //   _d = item.data;
        // }

        _dataSet.push({
          name: item.name,
          data: _d
        });
        // _dataSet.push(Object.assign({},item));
      });
      console.log("dataset", _dataSet);
      this.dataSet = _dataSet;
    },
    ...mapActions([
      "description",
      "playSwitch",
      "setBetNumber",
      "setBetOdd",
      "setBetOdds",
      "setBetUOdds",
      "setPlayConfig",
      "setQishu",
      "clearCart",
      "setBetData",
      "showOfficial"
    ])
  },
  watch: {
    danshiExcl(val) {
      this.zhushu = 0;
      this.danshiZhushuCacl(val);
    },
    async "$route.params"(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === "xypk" &&
        oldVal &&
        (oldVal.js_tag && oldVal.js_tag === "xypk")
      ) {
        const _playItem = this.curPlayItem;
        this.setOdds();
        this.clearBalls();
        this.setBetNumber(0);
        this.setBetData(0);
        this.clearCart();
        // this.changeList(this.shuangmianList[0], 0)
        if (newVal.isHome) {
          await this.getData(this.$route.params.js_tag);
          this.findItemByWanfa(_playItem.wanfa);
        }
      }
    },
    show1(val) {
      val == false && (this.heights = "0px");
    },
    switch(val) {
      this.switchs = val;
      if (this.isFromBetHistory) return;
    },
    zhushu: {
      handler(val) {
        this.setBetNumber(val);
        if (
          danshiUtil.isSingleMode(
            this.routeList.js_tag,
            this.curPlayItem.playid
          ) &&
          val > 0
        ) {
          const dataSet = randomUtil.createDataSource(
            this.routeList.js_tag,
            this.curPlayItem.playid
          );
          this.dataSet = dataSet;
          this.clickHandle();
        }
      },
      deep: true
    }
  },
  computed: {
    text() {
      return this.$route.params;
    },
    ...mapState({
      switch: state => state.betting.switch,
      zhushu: state => state.betting.betNumber,
      cart: state => state.betting.cart,
      cartNumber: state => state.betting.cartNumber,
      js_tag: state => state.betting.js_tag
    }),
    getIsShowSinglePeilv() {
      // const result = true;
      if (this.peilvs.length) return false;
      const playids = [3, 6, 7, 26, 27];
      return !playids.includes(this.curPlayItem.playid);
    }
  },
  mixins: [oddMixin]
};
</script>
<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
.betting {
  width: 100%;
  overflow: scroll;
  input {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .xypk {
    .active {
      border: 1px solid red !important;
      border-radius: 5px !important;
    }
    display: flex;
    width: 100%;
    .wrapper {
      // display: flex;
      background-color: #f1f1f1;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: poTorem(20px);
      overflow-y: scroll;
      flex: 1;
      flex-wrap: wrap;
      .peilv {
        text-align: center;
        width: 100%;
        font-size: poTorem(15px);
        color: gray;
        line-height: poTorem(30px);
      }
      .baoxuan {
        display: inline-block;
        height: poTorem(150px);
        align-items: flex-start;
      }
      .cards {
        background-color: #fff;
        border: 1px dashed gray;
        border-radius: 5px;
        width: poTorem(120px);
        min-width: 100px;
        height: poTorem(115px);
        .title {
          text-align: center;
          width: 100%;
          height: poTorem(55px);
          line-height: poTorem(55px);
          font-size: poTorem(25px);
          color: red;
        }
        .cart_content {
          width: 100%;
          height: 50%;
          padding-right: poTorem(3px);
          position: relative;
          display: flex;
          @include between;
          align-items: center;
          .lizi {
            // width: 30%;
            display: inline-block;
            width: poTorem(25px);
            text-align: center;
            font-size: poTorem(20px);
            color: gray;
          }
          .card_item {
            display: inline-block;
            .card_bg {
              .card_hs {
                display: inline-block;
                height: poTorem(40px);
                img {
                  display: inline-block;
                  width: 25px;
                }
              }
            }
          }
          // .card_item:nth-child(2){
          //   position: absolute;
          //   display: inline-block;
          //   left: 35px;
          // }
          // .card_item:nth-child(3){
          //   position: absolute;
          //   display: inline-block;
          //   left: 50px;
          // }
          // .card_item:nth-child(4){
          //   position: absolute;
          //   display: inline-block;
          //   left: 65px;
          // }
        }
      }
      .danxuan {
        width: 100%;
        // height: 100%;
        background-color: #f1f1f1;
        overflow-y: scroll;
        .peilv {
          width: 100%;
          height: poTorem(40px);
          font-size: poTorem(20px);
        }
        .cards_box {
          width: 100%;
          height: 400px;
          display: flex;
          flex-wrap: wrap;
          flex: 1;
          justify-content: space-between;
          align-items: flex-start;
          .th_box_item {
            height: poTorem(100px);
            width: poTorem(80px);
            background-color: #fff;
            border: 1px dashed gray;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px dashed gray;
            .th_card {
              img {
                display: inline-block;
                // margin-top: poTorem(30px);
                width: poTorem(50px);
              }
            }
            .ths_card {
              display: inline-block;
              position: relative;
              width: 100%;
              height: 100%;
              img {
                position: absolute;
                left: poTorem(5px);
                top: poTorem(5px);
                display: inline-block;
                width: poTorem(50px);
              }
              .text {
                color: red;
                font-size: poTorem(20px);
                display: inline-block;
                position: absolute;
                right: 0;
                bottom: 0;
              }
            }
          }
          .box_item {
            // display: inline-block;
            // height: poTorem(90px);
            // width: poTorem(100px);
            background-color: #fff;
            border: 1px dashed gray;
            border-radius: 5px;
            padding: poTorem(15px) poTorem(10px);
            flex-wrap: wrap;
            .card_content {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: space-around;
              align-items: center;
              .card_main {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
              }
              .card_bg {
                display: inline-block;
                position: relative;
                @include between;
                .card_num {
                  // height: 100%;
                  position: absolute;
                  display: inline-block;
                  left: poTorem(2px);
                  top: poTorem(4px);
                  img {
                    // display: inline-block;
                    height: poTorem(25px);
                  }
                }
                .bg_img {
                  display: inline-block;
                  width: poTorem(40px);
                }
                .hs_icon {
                  position: absolute;
                  width: poTorem(10px);
                  height: 100%;
                  display: flex;
                  right: 2px;
                  top: 2px;
                  flex-direction: column;
                  justify-content: flex-end;
                  padding-bottom: 5px;
                  img {
                    display: inline-block;
                    margin-top: 1px;
                    width: poTorem(8px);
                  }
                }
              }
              .card_bg:nth-child(2) {
                margin-left: -10px;
              }
              .card_bg:nth-child(3) {
                margin-left: -10px;
              }
              .card_bg:nth-child(4) {
                // margin-left: -40px;
                // top:  poTorem(30px);
                // left: poTorem(25px);
              }
            }
          }
        }
      }
      .renxuan {
        width: 100%;
        height: 100%;
        background-color: #f1f1f1;
        .peilv {
          width: 100%;
          height: poTorem(30px);
          line-height: poTorem(30px);
          text-align: center;
          color: gray;
          font-size: poTorem(18px);
        }
        .card_box {
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          .card_item {
            display: flex;
            width: poTorem(95px);
            height: poTorem(80px);
            justify-content: center;
            align-items: center;
            border: 1px dashed gray;
            border-radius: poTorem(5px);
            background-color: #fff;
            .card_bg {
              position: relative;
              width: poTorem(50px);
              height: poTorem(66px);
              .bg_img {
                display: inline-block;
                width: poTorem(50px);
              }
              .card_num {
                position: absolute;
                display: inline-block;
                top: poTorem(5px);
                left: poTorem(4px);
                img {
                  // width: poTorem(18px);
                  height: 1.8rem;
                }
              }
              .rx_icon {
                // height: 100%;
                width: poTorem(15px);
                position: absolute;
                right: poTorem(0px);
                top: poTorem(20px);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                img {
                  width: poTorem(8px);
                  margin: poTorem(1px);
                }
              }
            }
          }
        }
      }
    }
  }
  @include between;
  flex: 1;
  align-items: stretch;
  margin-top: poTorem(30px);
  //购物车
  .shop_icon {
    display: flex;
    position: fixed;
    bottom: 3.5625rem;
    left: 1.3rem;
    ._drag {
      position: relative;
      box-shadow: #555 0 0 poTorem(10px);
      border-radius: 50%;
      width: poTorem(60px);
      height: poTorem(60px);
      background: #fff url(~img/goucai/gouwuche.png) no-repeat;
      background-size: poTorem(30px) poTorem(30px);
      background-position: center;
      .spots {
        position: absolute;
        @include center;
        width: poTorem(24px);
        height: poTorem(24px);
        background: #e03a3a;
        display: flex;
        border-radius: 50%;
        font-weight: bolder;
        color: #fff;
        right: 0;
        top: 0;
      }
    }
  }
}
</style>
