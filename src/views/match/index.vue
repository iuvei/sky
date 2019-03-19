<template>
  <div class="match-index">
    <Mheader :title='curJingcai.name' :clickCategory='clickCategory'>
      <!-- <template slot="right"> -->
      <!-- <router-link to="/match/league">
          <img style="width:1.8rem;vertical-align: middle;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAApCAYAAABOScuyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQFSURBVFhH7ZlvaFV1GMc3TSeFf1KGZCuN6dCkIFBKwwUaoSimok1BsECMuV6EBAqWOgVfDPSFIpSKUArbO//MSUn1whe6FzqmCNsUU1Gx1Gb+SbHZ9PP93e+5Orzk7nbP3SX2hQ/Pef6c5/dw7z2/c86Wl47a29uHwwewBNbAd3AQjkIz/AE3HyGs1ApXoAWOwX74lvQ67GfwHgx1++6Jpn1oNgG7CnsIrmmQOETv63AYNsBUKPAYzxfFpfAD3HC/pIjdxhzHVsN6qMCfg50M42Ak/svwAscFOsYWQTHo05wNS2Et7IZ6+JO6DiJ2F/bARx7rWZGcBPU+Jwj/DGyBxVDs0oyLpUbRvww2Q1Ni9YTwG2CqSxMisBIeukBfTyW86XTWxdol8A1c9kxSZZRc5OBDUNFLIZEDYpYCWA1tmhF9qmCDnWWuyzlpNg3IrE0a+J4c9KLzQfh9fJh1aW3oZ1f+ANDAbRr4vJ0S54Pwawkvww50KHZpBtD+/jNr93dY8WLPeFFOtZ0Vzgfhz4A2uA97KdHwY5zOiOg3DLTVbYKwO2Avw1suCcL/0rkaOR/buYBJfg0SsWlwVvlI+NdAm3wVlMMseBuKSIc9WOfKylfcedV9DhvhAPxGPin8f0F7b2FY3CKlPT3MgJ0bfi8cnHLgK9clRbg/8YVQB/dVlynRT0M2cqhb9RtesoOIL3dtMyZxXeFMd/BvzNgQTCHy2mamQAVsg1rQxn4e9NwQ9vJI+A8cvwCNoHp9/eWkP8QOc+uUIj8CWt1rnsMJEdjtxElMhx2jJ8QM+czyo2eqc/iJiA8m0eKCGky+Uz0iZljtWXTnfcXhjiIxnpq/XFjlcNbF2vMg0kyHU4sCbTP/eOivHc6aWPMd0LWk9dc4/N+iUE9O0QW0zuHYxZqjITx3Y/dgOv+z5IRPIDx0YKvSOrkLYo3X4JLX+wWTvNN1Wpw4Hx64yU5MuClkWvR+FaKbg57JBzuVvmig3/RdN/upW81SiJ4j4Zz7n4Duv+PRZCJcddNTkPKulK7oMwYuuq8+2SFOdV801Cdx2s1vwHSnuiTO14fwu/sdgUFOZU5qCvu8SHhD4TDt52bO05PgHfepw8R3Z6W5bpl6bYneAX+FIqefK2q/gGj32YWJ5UJ+Riykh5fod61X9QVOpRR5PfXtcL1UyWF2b/8sWgiHNITkcEpRd1Q12HtQ5nD2xQz5GkRyKKVcooHfd6jn5Fk6NTDK6D7eJXmQ3oFjkwfpHTg2eZDegWOTB/l/DExYt+TSREVQbg2M6cuA72L1vxH9SSu8UD6l3BmY4fSXnVt2kyJ2GrbCXNy+Pq3nlBjriRjsLGyHRTDcZbkjhroE38MS5n3d4RiUl/cYv+4VQUuMo/4AAAAASUVORK5CYII=" alt="">
        </router-link> -->
      <!-- <router-link to="/match/question" class="question-icon" />
      </template> -->
    </Mheader>
    <RightTopMenu :show='showCategorg' @close="()=>{this.showCategorg=false}"></RightTopMenu>

    <Mmenu></Mmenu>

    <section class="view">
      <keep-alive>
        <router-view class="match-child"></router-view>
      </keep-alive>
    </section>

    <Mfooter></Mfooter>

    <CommonPopup></CommonPopup>

  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
// import { getItem } from "./components/allPlay.const.js";
import Mheader from './components/header'
import RightTopMenu from './components/right-top-menu'
import Mmenu from './components/menu'
import Mfooter from './components/footer'
import CommonPopup from './components/commonPopup'

export default {
  name: 'match-index',
  components: {
    Mheader,
    RightTopMenu,
    Mmenu,
    Mfooter,
    CommonPopup
  },
  data() {
    return {
      showCategorg: false
    }
  },
  computed: {
    ...mapGetters('match', ['curJingcai']),
    ...mapState('match', ['matchShow', 'oneMatch', 'selectedKeys', 'gameType']),
    popupShow: {
      get() {
        return this.matchShow
      },
      set(matchShow) {
        this.updateField({ matchShow })
      }
    }
  },

  watch: {
    // tab 切换
    gameType() {
      this.updateField({ selectedKeys: [], playType: [], bet_obj: [] })
    }
  },
  activated() {},
  created() {},
  methods: {
    ...mapActions('match', ['updateField']),
    clickCategory() {
      this.showCategorg = true
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~css/resources.scss';
.match-index {
  font-size: 1rem;
  .question-icon {
    position: absolute;
    width: 2rem;
    height: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 11;
    margin-right: 0.7rem;
    &:after {
      color: #fff;
      content: '?';
      font-weight: 400;
      -webkit-border-radius: 1rem;
      border-radius: 1rem;
      border: 0.1rem solid #fff;
      position: absolute;
      height: 1.84rem;
      line-height: 1.84rem;
      width: 1.84rem;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      text-align: center;
    }
  }
  .view {
    flex: 1;
    display: flex;
    overflow-y: auto;
    background-color: #fff;
    .match-child {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>

<style lang="scss">
.match-index {
  .is-betting {
    position: relative;
    font-size: 1rem;
    &.selected {
      background-color: #ef0404;
      color: #ffffff;
    }
    &.is-lock {
      color: #adaaa2;
    }
  }
}
.yd-accordion-head-arrow:after {
  content: '\e641';
  font-family: 'iconfont';
  font-size: 1.2rem;
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.2rem;
  border: none;
  text-align: center;
  transform: rotate(0deg);
}
.yd-accordion-head-arrow.yd-accordion-rotated:after {
  transform: rotate(-180deg);
}
.yd-list-donetip {
  font-size: 0.8rem;
}
</style>



