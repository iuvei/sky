const BTLists = [
  // 玩法
  { key: 'WDL', name: '胜负平' },
  { key: 'HCWDL', name: '让球' },
  { key: 'TCS', name: '比分' },
  { key: 'TG', name: '总进球' },
  { key: 'HFT', name: '半全场' },
  // { key: 'WDL', name: '胜负平' },

  // 小字段
  { key: 'W', name: '主胜' },
  { key: 'D', name: '平' },
  { key: 'L', name: '主负' },

  { key: 'WW', name: '胜胜' },
  { key: 'WD', name: '胜平' },
  { key: 'WL', name: '胜负' },

  { key: 'DW', name: '平胜' },
  { key: 'DD', name: '平平' },
  { key: 'DL', name: '平负' },

  { key: 'LW', name: '负胜' },
  { key: 'LD', name: '负平' },
  { key: 'LL', name: '负负' },

  { key: 'OW', name: '胜其他' },
  { key: 'OD', name: '平其他' },
  { key: 'OL', name: '负其他' }
]

function getItem(key, arr = BTLists) {
  return arr.find(el => el.key === key) || { name: '' }
}

export { BTLists, getItem }
