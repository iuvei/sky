<template>
  <!-- 弹窗选投注 -->
  <!-- position="center" width="90%" -->
  <yd-popup v-model="popupShow" class="common-popup" v-show="popupShow">
    <yd-flexbox slot='top' class="popup-header">
      <yd-flexbox-item>{{oneMatch.home_short_name}}</yd-flexbox-item>
      <p style="color: #6a6a6d;">vs</p>
      <yd-flexbox-item>{{oneMatch.visitor_short_name}}</yd-flexbox-item>
    </yd-flexbox>
    <keep-alive>
      <component :is="curPopup" :oneMatch='oneMatch' :is_dg="is_dg" :updateField='updateField' :getItem='getItem' :keys='keys' class="common-popup-content"></component>
    </keep-alive>
    <yd-flexbox slot='bottom' class="popup-footer">
      <yd-flexbox-item @click.native="updateField({matchShow:false})">取消</yd-flexbox-item>
      <yd-flexbox-item @click.native="okClick">确定</yd-flexbox-item>
    </yd-flexbox>
  </yd-popup>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { getItem } from './allPlay.const.js'

import Mix_popup from './mix_popup'
import Score_popup from './score_popup'

export default {
  name: 'common-popup',
  components: {
    Mix_popup,
    Score_popup
  },
  data() {
    return {
      keys: [] // selectedKeys备份
    }
  },
  computed: {
    ...mapGetters('match', ['curPopup', 'curRenderKey']),
    ...mapState('match', ['matchShow', 'oneMatch', 'selectedKeys', 'gameType']),
    popupShow: {
      get() {
        return this.matchShow
      },
      set(matchShow) {
        this.updateField({ matchShow })
      }
    },
    is_dg() {
      // 混合过关
      if (this.gameType == -1) {
        return false
      }
      // 单关固定
      if (this.gameType == 5) {
        return true
      }
      if (!this.oneMatch.dg_data) return false
      return this.oneMatch.dg_data.includes(this.curRenderKey[0])
    }
  },
  watch: {
    selectedKeys(selectedKeys) {
      this.keys = Object.assign([], selectedKeys)
    }
  },
  activated() {
    this.keys = Object.assign([], this.selectedKeys)
  },
  created() {},
  methods: {
    ...mapActions('match', ['updateField']),
    getItem,
    okClick() {
      this.updateField({ matchShow: false, selectedKeys: this.keys })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~css/resources.scss';
.common-popup {
  text-align: center;
  z-index: 2999;
  .yd-popup-show {
    border-radius: 0.2rem;
  }
  .popup-header {
    width: 100%;
    line-height: 3rem;
    font-size: 1.2rem;
  }
  .common-popup-content {
    max-height: 70vh;
    min-height: 20vh;
    width: 100%;
    padding: 0 0.7rem;
    overflow-y: auto;
  }
  .popup-footer {
    width: 100%;
    border-top: 1px solid #dddddd;
    line-height: 4rem;
    .yd-flexbox-item:first-child {
      border-right: 1px solid #dddddd;
    }
  }
}
</style>

<style lang="scss">
.pop-bet-index {
  .yd-popup-center {
    top: 40% !important;
  }
}
</style>



