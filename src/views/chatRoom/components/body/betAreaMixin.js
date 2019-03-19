import { mapState } from 'vuex'
export default {
  methods: {
    // 设置箭头标题
    setArrowTitle(item) {
      if (this.$route.name !== 'liaotianshi') return ''
      if (!item) return ''
      if (this.dataSet && this.dataSet.length === 1) {
        return (this.curPlayItem && this.curPlayItem.playname) || ''
      }
      return item.name.split('|')[0]
    },

    // 点击快捷选球
    doAction(action, row) {
      row.data.forEach(x => {
        x.checked = false

        switch (action.label) {
          case '全':
            x.checked = true
            if (this.isDantuo) {
              this.dataSet[0].data.forEach(x => x.checked = false)
            }
            break
          case '大':
            if (this.action_big(x.value)) x.checked = true
            break
          case '小':
            if (this.action_small(x.value)) x.checked = true
            break
          case '单':
            if (x.value % 2 !== 0) x.checked = true
            break
          case '双':
            if (x.value % 2 === 0) x.checked = true
            break
        }
      })
      this.$emit('clickBall', row, null)
    },
    // 选择大 3d,ssc, 0到9，pk10 1到10 11x5 11选5 1到11
    action_big(value) {
      switch (this.js_tag) {
        case 'ssc':
        case 'qxc':
          return value > 4
        case 'pk10':
        case '11x5':
          return value > 5
        case '3d':
          if ([3, 6].includes(this.curPlayItem.playid)) {
            return value > 13
          } else if (this.curPlayItem.playid === 7) {
            return value > 12
          } else return value > 4
        case 'lhc':
          return value > 24
      }
    },

    // 选择小
    action_small(value) {
      switch (this.js_tag) {
        case 'ssc':
        case 'qxc':
          return value < 5
        case 'pk10':
        case '11x5':
          return value < 6
        case '3d':
          if ([3, 6].includes(this.curPlayItem.playid)) {
            return value < 14
          } else if (this.curPlayItem.playid === 7) {
            return value < 13
          } else return value < 5
        case 'lhc':
          return value < 25
      }
    },

    // 联动快捷选项
    linkToFastSelect(row) {
      const chckedItems = row.data.filter(x => x.checked),
        isMutilSelect = chckedItems.length >= row.data.length / 2

      if (row.data.every(x => x.checked)) {
        this.clickFastSelect(row.actions, '全')
      } else if (row.data.every(x => !x.checked)) {
        this.clickFastSelect(row.actions, '清')
      } else if (chckedItems.every(x => x.value % 2 === 0) && isMutilSelect) {
        this.clickFastSelect(row.actions, '双')
      } else if (chckedItems.every(x => x.value % 2 !== 0) && isMutilSelect) {
        this.clickFastSelect(row.actions, '单')
      } else if (
        chckedItems.every(x => this.action_big(x.value)) &&
        isMutilSelect
      ) {
        this.clickFastSelect(row.actions, '大')
      } else if (
        chckedItems.every(x => this.action_small(x.value)) &&
        isMutilSelect
      ) {
        this.clickFastSelect(row.actions, '小')
      } else this.clickFastSelect(row.actions)
    },
    // 选择快捷选项
    clickFastSelect(actions, label) {
      actions.forEach(x => x.checked = false)
      if (label) {
        actions.find(x => x.label === label).checked = true
      }
    },
    // 设置快捷选项数据
    setFastSelect(dataSet) {
      // if (dataSet.length && !dataSet[0].actions) {
      //   const _actions = ['全', '大', '小', '单', '双', '清']

      //   dataSet.forEach(x => {
      //     x.actions = _actions.map(x => ({ label: x, checked: false }))
      //   })
      // }
      const _actions = ['全', '大', '小', '单', '双', '清']

      dataSet.forEach(x => {
        x.actions = _actions.map(x => ({ label: x, checked: false }))
      })
    },
    // 是否是胆码
    isDanma(name) {
      if (this.$route.name !== 'liaotianshi' || !this.curPlayItem) return false
      // if (this.js_tag === 'ssc') {
      //   return [18, 32, 114].includes(this.curPlayItem.playid)
      // } else {
      //   return this.isDantuo
      // }
      return this.isDantuo && name.includes('胆')
    }
  },

  computed: {
    ...mapState({
      js_tag: state => state.betting.game.js_tag
    }),

    // 是否是胆拖
    isDantuo() {
      if (this.js_tag === 'ssc') {
        return [18, 32, 114].includes(this.curPlayItem.playid)
      }
      return (
        this.curPlayItem.wanfa.includes('胆拖') ||
        this.curPlayItem.wanfa.includes('包胆')
      )
    },

    // 显示快捷操作
    showActions() {
      if (['pcdd', 'pkniuniu'].includes(this.js_tag)) {
        return false
      }
      if (this.$route.name !== 'liaotianshi' || !this.curPlayItem) return false
      return this.instance.showActions
        ? this.instance.showActions(this.curPlayItem.playid)
        : true
    }
  },

  watch: {
    // placeholder(val) {
    //   if (val) this.myPlaceholder = val
    // },
    danshiExcl(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.danshiExcl = val
    },
    dataSet(val) {
      this.setFastSelect(val)
    }
  }
}
