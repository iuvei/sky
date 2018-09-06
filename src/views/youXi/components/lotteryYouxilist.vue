<template>
  <div class="lottery_youxi_lists">
    <ul v-for="(item,index) in datalist" :key="index" :datalist="datalist">
      <li>
        <div>
          <div class="big_box">
            <div class="icon">
              <img src="~img/goucai/MG_electronic.png" alt="图呢">
              <!-- <img :src="item.image_url" alt="图呢"> -->
            </div>
            <div class="content">
              <div class="content_top">
                <span class="game_name">
                  {{item.pt_name}}
                </span>
              </div>
              <div class="content_bottom">
                <yd-cell-group title="">
                  <yd-cell-item>
                    <yd-rate slot="left" v-model="item.score" :readonly="true" size="14px"></yd-rate>
                  </yd-cell-item>
                </yd-cell-group>
                <span class="right">
                  {{item.number}}
                  <i>人在玩</i>
                </span>
              </div>
            </div>
            <div class="triangle" @click="toOpen(item)">
              <div class="djan">
                <span>进入</span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>

</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import dayjs from 'dayjs'
export default {
    data() {
        return {
            datalist: []
        }
    },
    computed: {},
    mounted() {
        this.getGameList_get()
    },
    watch: {},
    components: {},
    methods: {
        ...mapMutations('youxi', ['SET_GMGAME_TAG']),
        toOpen(item) {
            this.$router.push({
                name: 'youxi',
                params: {
                    pt_id: item.pt_id,
                    pt_name: item.pt_name
                }
            })
            this.SET_GMGAME_TAG(item.tag)
        },
        getGameList_get() {
            this.$dialog.loading.open(' ')
            this.$ajax('request', {
                ac: 'GetIndexWebgame'
            }).then(res => {
                this.datalist = res
                // console.error('==', this.datalist)
                this.pt_name = this.datalist[0].pt_name
                this.tag = this.datalist[0].tag

                this.$dialog.loading.close()
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~css/resources';
.lottery_youxi_lists {
    background-color: #fff;
    > ul {
        .big_box {
            display: flex;
            width: 100%;
            height: poTorem(90.3px);
            // min-height: poTorem(90px);
            border-bottom: solid 1px #dbdbdb;
            justify-content: space-around;
            align-items: center;
            .icon {
                width: 22%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                img {
                    width: poTorem(58px);
                    height: poTorem(58px);
                    border-radius: 50%;
                }
            }
            .content {
                display: flex;
                flex-direction: column;
                flex: 1;
                // border: solid 1px #c6e66e;
                .content_top {
                    font-size: poTorem(15px);
                    margin: poTorem(8px) 0;
                }
                .content_bottom {
                    display: flex;
                    justify-content: space-between;
                    height: poTorem(22px);
                    line-height: poTorem(18px);
                    font-size: poTorem(13px);
                    color: #959595;
                    .right {
                        width: 50%;
                        margin-right: poTorem(18px);
                        i {
                            padding-left: 0.2rem;
                            font-size: 1rem;
                        }
                    }
                }
            }
            .triangle {
                width: 20%;
                height: 100%;
                display: flex;
                align-items: center;
                .djan {
                    width: poTorem(70px);
                    height: poTorem(26px);
                    border-radius: 20px;
                    border: solid 1px #ff7c34;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span {
                        font-size: poTorem(16px);
                        color: #ff7c34;
                    }
                }
            }
        }
    }
}
</style>
<style lang="scss">
.lottery_youxi_lists {
    .yd-cell::after {
        border-bottom: solid 0 #fff;
    }
    .yd-rate .rate-active {
        color: #ff7c34 !important;
    }
    .yd-rate a {
        color: #ff7c34 !important;
    }
    .yd-cell-item {
        padding: 0;
    }
}
</style>
