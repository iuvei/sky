<template>
  <!-- 投注界面 -->
  <div class="allPlay-betting">
    <!-- {{gameKey}}<br> {{game}}
    <br>{{selectedKey}} -->

    <!-- 一般的数组结构-->
    <div v-if="renderType === 'Array'" class="one-game one-game-multi">
      <div class="wanfa-title" v-html="getTitle(gameKey)"></div>
      <yd-grids-group :rows="renderCol">
        <yd-grids-item v-for="(el,line) in game" :key="line">
          <div slot="else" class="is-betting" v-one-html="renderHtml(line,el)" @click="selectBet(line,el)"></div>
        </yd-grids-item>
      </yd-grids-group>
    </div>

    <!-- 一般的object结构 -->
    <div v-if="renderType === 'Object'" class="one-game one-game-single">
      <div class="wanfa-title" v-html="getTitle(gameKey)"></div>
      <yd-flexbox v-for="line in resolveObj.row" :key="line">
        <yd-flexbox-item class="is-betting" v-one-html="renderHtml(col,line-1,game[col][line-1])" @click.native="selectBet(col,line-1,game[col][line-1])" v-for="col in resolveObj.keys" :key="col"></yd-flexbox-item>
      </yd-flexbox>
    </div>

    <!-- 二级json，带副标题 -->
    <div v-if="renderType === 'twoLevels'" class="one-game one-game-multi">
      <div class="wanfa-title" v-html="getTitle(gameKey)"></div>
      <div v-for="(row, idx) in game" :key="row">
        <div v-html="getSubTitle(idx)" class="sub-title"></div>
        <yd-grids-group rows="2">
          <yd-grids-item v-for="(col,twoKey) in row" :key="twoKey">
            <div slot="else" class="is-betting" v-one-html="renderHtml(idx,twoKey,col)" @click="selectBet(idx,twoKey,col)"></div>
          </yd-grids-item>
        </yd-grids-group>
      </div>
    </div>

    <!-- 三级json，带副标题 -->
    <div v-if="renderType === 'threeLevels'" class="one-game one-game-multi">
      <div class="wanfa-title" v-html="getTitle(gameKey)"></div>
      <div v-for="(row, idx) in game" :key="row">
        <div v-html="getSubTitle(idx)" class="sub-title"></div>
        <yd-grids-group v-for="line in resolveObj.row" :key="line" rows="2">
          <yd-grids-item v-for="col in resolveObj.keys" :key="col">
            <div slot="else" class="is-betting" v-one-html="renderHtml(idx,col,line-1,game[idx][col][line-1])" @click="selectBet(idx,col,line-1,game[idx][col][line-1])"></div>
          </yd-grids-item>
        </yd-grids-group>
      </div>
    </div>

    <!-- 有三级，四级json，带副标题,特别的UI -->
    <div v-if="renderType === '15M'" class="one-game one-game-multi">
      <div class="wanfa-title" v-html="getTitle(gameKey)"></div>
      <div v-for="row in resolveObj.subTitleKey" :key="row">
        <div v-for="col in resolveObj.keys" :key="col">
          <div v-html="getSubTitle(row,col)" class="sub-title"></div>
          <template v-if="Array.isArray(game[row][col])">
            <yd-grids-group :rows="game[row][col].length">
              <yd-grids-item v-for="(el,lastIdx) in game[row][col]" :key="lastIdx">
                <div slot="else" class="is-betting" v-one-html="renderHtml(row,col,lastIdx,el)" @click="selectBet(row,col,lastIdx,el)"></div>
              </yd-grids-item>
            </yd-grids-group>
          </template>
          <template v-else>
            <div v-for="line in getLine(game[row][col])" :key="line">
              <yd-grids-group rows="2">
                <yd-grids-item v-for="(el,threeKey) in game[row][col]" :key="threeKey">
                  <div slot="else" class="is-betting" v-one-html="renderHtml(row,col,threeKey,line-1,el[line-1])" @click="selectBet(row,col,threeKey,line-1,el[line-1])"></div>
                </yd-grids-item>
              </yd-grids-group>
            </div>

          </template>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { playPMs, BTLists, getItem } from './allPlay.const.js'
import max from 'lodash/max'
import forEach from 'lodash/forEach'

const icons = [
  require('img/football/p_up.png'),
  require('img/football/p_down.png')
]
const twoLevels = [
  'TCS',
  'HTCS',
  '1X2BTS',
  '1X2FG',
  'DCBTS',
  'DCFTS',
  'WM',
  'FLG'
]
const threeLevels = ['1X2GL', 'DCGL', 'GLTGOE', 'GLFTS', 'GLBTS']
// m15:有三级四级json，特别的渲染方式
const m15 = ['15M']
// unUse:不使用的数据结构
// TNC: {
//   OV: {
//     k: '13',
//     p: 0.00
//   },
//   EQU: {
//     k: '13',
//     p: 0.00
//   },
//   UN: {
//     k: '13',
//     p: 0.00
//   }
// }
const unUse = ['TNC', '2WCIP', '3WHC']
// 普通玩法
// const basePlay = [
//   ...['H1X2', 'HHC', 'HGL', 'HTGOE', 'HTCS', 'HTG'],
//   ...['1X2', 'HC', 'GL', 'TGOE', 'TCS', 'TG', 'HFT']
// ]
export default {
  name: 'allPlay_betting',
  props: ['gameKey', 'game'],
  data() {
    return {
      // bet_obj => path => { bet_txt, bet_data }
      // bet_obj: {}
    }
  },
  computed: {
    ...mapGetters('football', ['schedule_id']),
    ...mapState('football', [
      'money',
      'sport_id',
      'gameType',
      'allPlayTeam',
      'bet_obj',
      'multiSelected'
    ]),
    // 选中的投注
    selectedKey: {
      get() {
        return this.multiSelected
      },
      set(selectedKey) {
        // 底部信息
        let bet_txt = ''
        let bet_data = selectedKey.map(el => {
          const bet_obj = this.bet_obj[el]
          bet_txt = bet_obj.bet_txt
          return bet_obj.bet_data
        })

        if (this.gameType === 3) {
          bet_txt = selectedKey.length
        }
        let params = {
          multiSelected: selectedKey,
          footer: !!selectedKey.length,
          min_stake: this.allPlayTeam.min_stake,
          max_stake: this.allPlayTeam.max_stake,
          bet_txt: bet_txt,
          bet_data
        }
        this.modifyFootballField(params)
      }
    },

    /**
     * 解析对象为多少行，多少列
     * isThreeLevels 是否渲染成带副标题的多个table，为true时，subTitleKey 才有值，第一层关键字，数组类型
     * keys 最后的关键字,数组类型
     * row  行数,数字类型
     */
    resolveObj() {
      let keys = Object.keys(this.game)
      let lengths = keys.map(el => this.game[el].length)
      let isThreeLevels = !Array.isArray(this.game[keys[0]])
      let subTitleKey = ''
      if (isThreeLevels) {
        subTitleKey = keys
        keys = Object.keys(this.game[keys[0]])
        lengths = subTitleKey.map(sub =>
          max(keys.map(el => this.game[sub][el].length))
        )
      }

      return {
        isThreeLevels,
        subTitleKey,
        keys,
        row: max(lengths)
      }
    },
    // 定制一行放几列
    renderCol() {
      const type = this.gameKey
      switch (type) {
        case '1X2':
        case 'H1X2':
          return 3
          break
        default:
          return 2
          break
      }
    },
    /**
     * 定制渲染类型
     */
    renderType() {
      if (twoLevels.includes(this.gameKey)) return 'twoLevels'
      if (threeLevels.includes(this.gameKey)) return 'threeLevels'
      if (m15.includes(this.gameKey)) return '15M'
      if (unUse.includes(this.gameKey)) return 'Array'

      // Object.prototype.toString.call(this.game)  => [object Array]
      const type = Array.isArray(this.game) ? 'Array' : 'Object'
      return type
    }
  },
  directives: {
    oneHtml: {
      bind(el, { value, oldValue }, vnode) {
        if (!value) return
        el.innerHTML = value.html
        // 添加选中样式
        el.classList[value.selected ? 'add' : 'remove']('selected')
      },
      update(el, { value, oldValue }, vnode) {
        if (
          !value ||
          (value.selected === oldValue.selected &&
            value.data.p === oldValue.data.p)
        )
          return
        let img = ''
        // 赔率上升下降
        let last_p = oldValue.data.p * 1
        let cur_p = value.data.p * 1
        if (value.path === oldValue.path && cur_p > last_p) {
          img = `<img src="${icons[0]}" class="pv-float">`
        } else if (value.path === oldValue.path && cur_p < last_p) {
          img = `<img src="${icons[1]}" class="pv-float">`
        }
        // console.error(cur_p , last_p);

        el.innerHTML = value.html + img
        // 添加选中样式
        el.classList[value.selected ? 'add' : 'remove']('selected')
      }
    }
  },
  activated() {},
  deactivated() {},
  methods: {
    ...mapActions('football', ['modifyFootballField']),
    /**
     * 渲染15M，4级json 时计算需渲染多少行
     */
    getLine(data) {
      let arr = []
      forEach(data, el => (arr = [...arr, el.length]))
      return max(arr) || 0
    },
    getTitle(key) {
      let item = getItem(playPMs, key)
      let str = item.name
      if (item.target) {
        str += " - <i class='subTitle-orange'>" + item.target + '</i>'
      }
      str +=
        " -（主）— <i class='subTitle-orange'>" + this.allPlayTeam.h + '</i>'
      str +=
        "VS（客）— <i class='subTitle-orange'>" + this.allPlayTeam.v + '</i>'
      return str
    },
    getSubTitle(key, subKey) {
      let title = getItem(BTLists, key).name
      if (subKey) title += ' - ' + getItem(playPMs, subKey).name
      return title
    },
    /**
     * 参数 arg = 当前全路径 + 当前要渲染的data
     * 返回对象 { path, data , html, select, selected }
     */
    renderHtml(...arg) {
      // console.error(this.gameKey + ":" + JSON.stringify(arg));
      const data = arg.pop()

      //替换最后一位索引值为k值
      arg[arg.length - 1] = data.k

      const path =
        this.schedule_id + '||' + this.gameKey + '||' + arg.join('||')
      let exist = this.multiSelected.indexOf(path)
      let html = ''
      let select = data.p > 0
      let selected = select && exist !== -1
      let k = data.k

      // 计算下注数据，关键参数  team  subkey
      let team =
        arg[arg.length - 3] || arg[arg.length - 2] || arg[arg.length - 1]
      team = (typeof team === 'string' && team !== data.k && team) || ''
      let subkey = arg[arg.length - 2] || arg[arg.length - 1]
      subkey = (typeof subkey === 'string' && subkey !== team && team !=='' && subkey) || ''

      const idx = subkey || team || k
      let topTxt = getItem(BTLists, idx).name || k
      if (!select && exist !== -1) {
        let selectedKey = JSON.parse(JSON.stringify(this.multiSelected))
        selectedKey.splice(exist, 1)
        this.selectedKey = selectedKey
      }
      switch (this.gameKey) {
        case '1X2FG':
        case 'HTCS':
        case 'TCS':
        case 'DCFTS':
        case 'DCBTS':
        case '1X2BTS':
          topTxt = getItem(BTLists, k).name || k
          html = `<div class="top-txt">${topTxt}</div>`
          html += `<div><span class="pl-color">${data.p}</span></div>`
          break
        case 'FLG':
          topTxt = getItem(BTLists, k).name || '无进球'
          html = `<div class="top-txt">${topTxt}</div>`
          html += `<div><span class="pl-color">${data.p}</span></div>`
          break
        case 'WM':
          switch (k) {
            case '0-0':
              topTxt = k
              break
            case 'o':
              topTxt = '任何进球和局'
              break
            default:
              topTxt = '净胜' + k + '球'
              break
          }
          html = `<div class="top-txt">${topTxt}</div>`
          html += `<div><span class="pl-color">${data.p}</span></div>`
          break
        // case "GLTGOE":
        // html = `<div>${topTxt} ${k}</div>`;
        // html += `<div><span class="pl-color">${data.p}</span></div>`;
        // break;
        case 'GLTGOE':
        case 'GLFTS':
        case 'GLBTS':
        case 'GLH':
        case 'GLV':
        case 'HGLH':
        case 'HGLV':
        case 'TNC':
        case '2WCIP':
        case '3WHC':
        case '1X2GL':
        case 'DCGL':
        case 'HGL':
        case 'GL':
        case 'HHC':
        case 'HC':
          html = `<div class="top-txt">${topTxt}</div>`
          html += `<div><span class="left_k">${k}</span><span class="pl-color">${
            data.p
          }</span></div>`
          break
        case '15M':
          // 让球特别处理k值
          if (team === 'HC' || team === 'HHC') {
            k = k > 0 ? '' : k * -1
          }
          if (subkey === '1X2') {
            topTxt = getItem(BTLists, k).name
          }
          html = `<div class="top-txt">${topTxt}</div><div>`

          // 15M 独赢 不要显示 left_k
          if (subkey !== '1X2') html += `<span class="left_k">${k}</span>`
          html += `<span class="pl-color">${data.p}</span></div>`
          break
        default:
          html = `<div class="top-txt">${topTxt}</div>`
          html += `<div><span class="pl-color">${data.p}</span></div>`
          break
      }

      // 计算下注信息
      let bet_txt =
        ((team && data.k !== team && getItem(BTLists, team).name) || '') +
        ' ' +
        ((subkey && data.k !== subkey && getItem(BTLists, subkey).name) || '') +
        ' ' +
        ((data.k && getItem(BTLists, data.k).name) || data.k)
      // const is_all_method = basePlay.includes(this.gameKey) ? '' : 1
      let bet_data = {
        history_id: this.allPlayTeam.history_id,
        k: data.k,
        p: data.p,
        play_method: this.gameKey,
        price: this.money,
        schedule_id: this.allPlayTeam.schedule_id,
        sport_id: this.sport_id,
        team_score: this.allPlayTeam.team_score,
        team,
        subkey,
        is_all_method: 1
      }
      // this.$set(this.bet_obj, path, { bet_txt, bet_data });

      return {
        path,
        data,
        html,
        select,
        selected,
        bet_txt,
        bet_data
      }
    },
    selectBet(...arg) {
      // console.error(arg);
      const allArg = Object.assign([], arg)
      const data = arg.pop()

      //替换最后一位索引值为k值
      arg[arg.length - 1] = data.k

      const path =
        this.schedule_id + '||' + this.gameKey + '||' + arg.join('||')
      let select = data.p > 0
      if (!select) {
        return this.$dialog.toast({
          mes: '赔率异常'
        })
      }

      // 同一场赛事只能投一注
      const schedule_id = this.allPlayTeam.schedule_id
      let selectedKey = JSON.parse(JSON.stringify(this.multiSelected))
      let idx = selectedKey.findIndex(el => el.includes(schedule_id))
      // 综合过关
      if (this.gameType === 3) {
        if (idx !== -1 && selectedKey[idx] === path) selectedKey.splice(idx, 1)
        else if (idx !== -1 && selectedKey[idx] !== path) {
          selectedKey.splice(idx, 1, path)
        } else selectedKey.push(path)
      } else {
        selectedKey = idx !== -1 && selectedKey[idx] === path ? [] : [path]
      }

      // 先保存当前选中的下注信息
      let big_data = this.renderHtml(...allArg)
      let bet_obj = JSON.parse(JSON.stringify(this.bet_obj))
      bet_obj[path] = {
        hg_id: this.allPlayTeam.hg_id,
        bet_txt: big_data.bet_txt,
        bet_data: big_data.bet_data
      }
      this.modifyFootballField({ bet_obj })

      this.selectedKey = selectedKey
    }
  }
}
</script>
<style lang="scss">
.allPlay-betting {
  .subTitle-orange {
    color: #ff7c34;
  }
  .left_k {
    padding-right: 1rem;
  }
  .pl-color {
    color: #c51919;
  }
  .pv-float {
    width: 0.6rem;
    position: absolute;
    right: 1rem;
    top: 46%;
  }
  .is-betting .top-txt {
    width: 100%;
    height: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  .selected {
    color: #ef0404;
    box-shadow: 0 0 0 1px #ef0404 inset;
    // border: 1px solid #c33939 !important;
    .pl-color {
      color: #ef0404;
    }
  }
  .yd-grids-item .selected {
    transform: scaleY(0.97);
    // transform: translateY(-0.5px);
  }
}
</style>
<style lang="scss" scoped>
.allPlay-betting {
  user-select: none;
  text-align: left;
  font-size: 1rem;
  padding: 0 0.7rem 0.7rem;
  &:first-of-type {
    padding-top: 0.7rem;
  }
  .is-betting {
    position: relative;
    // width:calc(100% - 1px);
    padding: 0 0 0 1rem;
    line-height: 2rem;
    min-height: 3rem;
    font-size: 1rem;
    // border: 1px solid transparent;
  }
  .one-game-multi {
    // border-left: 1px solid #b2b2b2;
    // border-top: 1px solid #b2b2b2;
    // border-right: 1px solid #b2b2b2;
    box-shadow: 0px 0px 0.3rem #b2b2b2;
    .yd-grids-item {
      padding: 0;
    }
  }
  .one-game-single {
    // border: 1px solid #b2b2b2;
    box-shadow: 0px 0px 0.3rem #b2b2b2;
    .yd-flexbox {
      border-top: 1px solid #dddddd;
      .yd-flexbox-item:nth-child(n + 2) {
        border-left: 1px solid #dddddd;
      }
    }
  }
  .one-game {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    .wanfa-title {
      color: #313131;
      line-height: 2rem;
      font-size: 1.2rem;
      padding: 0.5rem 1rem;
      background-color: #f5f5f5;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
    }
    .sub-title {
      color: #313131;
      line-height: 2rem;
      font-size: 1.2rem;
      // border-top: 1px solid #dddddd;
      text-align: left;
      padding: 0.5rem 1rem;
      background-color: #f5f2f2;
    }
    .wanfa-title + div .sub-title {
      border-top: 1px solid #dddddd;
    }
  }
}
</style>
