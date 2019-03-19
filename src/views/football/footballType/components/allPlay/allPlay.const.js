const playPMs = [
  // 讓球&大小: is_hg; 上半场: is_hf; 比分: is_sc;
  // 所有盤口 主盤口
  {
    id: 0,
    type: 0,
    key: 'HC',
    title: '',
    name: '让球',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '0'
  },
  {
    id: 1,
    type: 0,
    key: 'HHC',
    title: '',
    name: '让球',
    target: '上半场',
    is_hg: '1',
    is_hf: '1',
    is_sc: '0'
  },
  {
    id: 2,
    type: 0,
    key: 'GL',
    title: '',
    name: '大 / 小',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 3,
    type: 0,
    key: 'HGL',
    title: '',
    name: '大 / 小',
    target: '上半场',
    is_hg: '1',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 4,
    type: 0,
    key: '1X2',
    title: '',
    name: '独赢',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '0'
  },
  {
    id: 5,
    type: 0,
    key: 'H1X2',
    title: '',
    name: '独赢',
    target: '上半场',
    is_hg: '0',
    is_hf: '1',
    is_sc: '0'
  },
  {
    id: 6,
    type: 0,
    key: 'TCS',
    title: '',
    name: '波胆',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 7,
    type: 0,
    key: 'HTCS',
    title: '',
    name: '波胆',
    target: '上半场',
    is_hg: '0',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 8,
    type: 0,
    key: '15M',
    title: '',
    name: '15分钟盘口',
    target: '',
    is_hg: '0',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 9,
    type: 0,
    key: 'TG',
    title: '',
    name: '总进球数',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 10,
    type: 0,
    key: 'HTG',
    title: '',
    name: '总进球数',
    target: '上半场',
    is_hg: '0',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 11,
    type: 0,
    key: 'BTS',
    title: '',
    name: '双方球队进球',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 12,
    type: 0,
    key: 'HBTS',
    title: '',
    name: '双方球队进球',
    target: '上半場',
    is_hg: '0',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 13,
    type: 0,
    key: 'GLH',
    title: '球队进球数',
    name: '全场主队大小',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 14,
    type: 0,
    key: 'GLV',
    title: '球队进球数',
    name: '全场客队大小',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 15,
    type: 0,
    key: 'HGLH',
    title: '球队进球数',
    name: '上半场主队大小',
    target: '上半场',
    is_hg: '1',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 16,
    type: 0,
    key: 'HGLV',
    title: '球队进球数',
    name: '上半场客队大小',
    target: '上半场',
    is_hg: '1',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 17,
    type: 0,
    key: 'TGOE',
    title: '',
    name: '单双',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 18,
    type: 0,
    key: 'HTGOE',
    title: '',
    name: '单双',
    target: '上半场',
    is_hg: '0',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 19,
    type: 0,
    key: 'FLG',
    title: '',
    name: '最先 / 最后进球',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 20,
    type: 0,
    key: 'HFT',
    title: '',
    name: '半场 / 全场',
    target: '',
    is_hg: '0',
    is_hf: '1',
    is_sc: '0'
  },
  {
    id: 21,
    type: 0,
    key: 'WM',
    title: '',
    name: '净胜球数',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 22,
    type: 0,
    key: 'DC',
    title: '',
    name: '双重机会',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '0'
  },
  {
    id: 23,
    type: 0,
    key: 'CNS',
    title: '',
    name: '零失球',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 24,
    type: 0,
    key: 'WTN',
    title: '',
    name: '零失球获胜',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 25,
    type: 0,
    key: '1X2GL',
    title: '',
    name: '独赢 & 进球 大 / 小',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 26,
    type: 0,
    key: '1X2BTS',
    title: '',
    name: '独赢 & 双方球队进球',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 27,
    type: 0,
    key: 'GLBTS',
    title: '',
    name: '进球 大 / 小 & 双方球队进球',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 28,
    type: 0,
    key: '1X2FG',
    title: '',
    name: '独赢& 最先进球',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  // 所有盤口下的進球盤口
  {
    id: 28,
    type: 1,
    key: 'R2G',
    title: '',
    name: '先进两球的一方',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 29,
    type: 1,
    key: 'R3G',
    title: '',
    name: '先进三球的一方',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 30,
    type: 1,
    key: 'HMG',
    title: '',
    name: '最多进球的半场',
    target: '',
    is_hg: '0',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 31,
    type: 1,
    key: 'HMG1x2',
    title: '',
    name: '最多进球的半场',
    target: '独赢',
    is_hg: '0',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 32,
    type: 1,
    key: 'SBH',
    title: '',
    name: '双半场进球',
    target: '',
    is_hg: '0',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 33,
    type: 1,
    key: 'FGM',
    title: '',
    name: '首个进球方式',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 34,
    type: 1,
    key: 'TFG3W',
    title: '',
    name: '首个进球时间',
    target: '3项',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 35,
    type: 1,
    key: 'TFG',
    title: '',
    name: '首个进球时间',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 36,
    type: 1,
    key: 'DCGL',
    title: '',
    name: '双重机会 & 进球 大 / 小',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 37,
    type: 1,
    key: 'DCBTS',
    title: '',
    name: '双重机会 & 双方球队进球',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 38,
    type: 1,
    key: 'DCFTS',
    title: '',
    name: '双重机会 & 最先进球',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 39,
    type: 1,
    key: 'GLTGOE',
    title: '',
    name: '进球 大 / 小 & 进球 单/双',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 40,
    type: 1,
    key: 'GLFTS',
    title: '',
    name: '进球 大 / 小 & 最先进球',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },
  // 所有盤口的其他
  {
    id: 41,
    type: 2,
    key: '3WHC',
    title: '',
    name: '三项让球投注',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '0'
  },
  {
    id: 42,
    type: 2,
    key: 'WFB',
    title: '',
    name: '落后反超获胜',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 43,
    type: 2,
    key: 'WEH',
    title: '',
    name: '赢得任一半场',
    target: '',
    is_hg: '0',
    is_hf: '1',
    is_sc: '0'
  },
  {
    id: 44,
    type: 2,
    key: 'WBH',
    title: '',
    name: '赢得所有半场',
    target: '',
    is_hg: '0',
    is_hf: '1',
    is_sc: '0'
  },

  // 讓球 & 大小 主盤口
  {
    id: 0,
    type: 0,
    key: 'HC',
    title: '',
    name: '让球',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '0'
  },
  {
    id: 1,
    type: 0,
    key: 'HHC',
    title: '',
    name: '让球',
    target: '上半场',
    is_hg: '1',
    is_hf: '1',
    is_sc: '0'
  },
  {
    id: 2,
    type: 0,
    key: 'GL',
    title: '',
    name: '大 / 小',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 3,
    type: 0,
    key: 'HGL',
    title: '',
    name: '大 / 小',
    target: '上半场',
    is_hg: '1',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 13,
    type: 0,
    key: 'GLH',
    title: '球队进球数',
    name: '大 / 小',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 14,
    type: 0,
    key: 'GLV',
    title: '球队进球数',
    name: '大 / 小',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 25,
    type: 0,
    key: '1X2GL',
    title: '',
    name: '独赢 & 进球 大 / 小',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 27,
    type: 0,
    key: 'GLBTS',
    title: '',
    name: '进球 大 / 小 & 双方球队进球',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },

  // 讓球 & 大小 進球盤口
  {
    id: 36,
    type: 1,
    key: 'DCGL',
    title: '',
    name: '双重机会 & 进球 大 / 小',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 39,
    type: 1,
    key: 'GLTGOE',
    title: '',
    name: '进球 大 / 小 & 进球 单/双',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 40,
    type: 1,
    key: 'GLFTS',
    title: '',
    name: '进球 大 / 小 & 最先进球',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },

  // 讓球 & 大小 其他
  {
    id: 41,
    type: 2,
    key: '3WHC',
    title: '',
    name: '三项让球投注',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '0'
  },

  // 上半場 主盤口
  {
    id: 1,
    type: 0,
    key: 'HHC',
    title: '',
    name: '让球',
    target: '上半场',
    is_hg: '1',
    is_hf: '1',
    is_sc: '0'
  },
  {
    id: 3,
    type: 0,
    key: 'HGL',
    title: '',
    name: '大 / 小',
    target: '上半场',
    is_hg: '1',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 5,
    type: 0,
    key: 'H1X2',
    title: '',
    name: '独赢',
    target: '上半场',
    is_hg: '0',
    is_hf: '1',
    is_sc: '0'
  },
  {
    id: 7,
    type: 0,
    key: 'HTCS',
    title: '',
    name: '波胆',
    target: '上半场',
    is_hg: '0',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 10,
    type: 0,
    key: 'HTG',
    title: '',
    name: '总进球数',
    target: '上半场',
    is_hg: '0',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 15,
    type: 0,
    key: 'HGLH',
    title: '球队进球数',
    name: '大 / 小',
    target: '上半场',
    is_hg: '1',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 16,
    type: 0,
    key: 'HGLV',
    title: '球队进球数',
    name: '大 / 小',
    target: '上半场',
    is_hg: '1',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 18,
    type: 0,
    key: 'HTGOE',
    title: '',
    name: '单双',
    target: '上半场',
    is_hg: '0',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 20,
    type: 0,
    key: 'HFT',
    title: '',
    name: '半场 / 全场',
    target: '',
    is_hg: '0',
    is_hf: '1',
    is_sc: '0'
  },

  // 上半場 進球盤口
  {
    id: 30,
    type: 1,
    key: 'HMG',
    title: '',
    name: '最多进球的半场',
    target: '',
    is_hg: '0',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 31,
    type: 1,
    key: 'HMG1x2',
    title: '',
    name: '最多进球的半场',
    target: '独赢',
    is_hg: '0',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 32,
    type: 1,
    key: 'SBH',
    title: '',
    name: '双半场进球',
    target: '',
    is_hg: '0',
    is_hf: '1',
    is_sc: '1'
  },

  // 上半場 其他
  {
    id: 43,
    type: 2,
    key: 'WEH',
    title: '',
    name: '赢得任一半场',
    target: '',
    is_hg: '0',
    is_hf: '1',
    is_sc: '0'
  },
  {
    id: 44,
    type: 2,
    key: 'WBH',
    title: '',
    name: '赢得所有半场',
    target: '',
    is_hg: '0',
    is_hf: '1',
    is_sc: '0'
  },

  // 比分盤口 主盤口
  {
    id: 2,
    type: 0,
    key: 'GL',
    title: '',
    name: '大 / 小',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 3,
    type: 0,
    key: 'HGL',
    title: '',
    name: '大 / 小',
    target: '上半场',
    is_hg: '1',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 6,
    type: 0,
    key: 'TCS',
    title: '',
    name: '波胆',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 7,
    type: 0,
    key: 'HTCS',
    title: '',
    name: '波胆',
    target: '上半场',
    is_hg: '0',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 9,
    type: 0,
    key: 'TG',
    title: '',
    name: '总进球数',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 10,
    type: 0,
    key: 'HTG',
    title: '',
    name: '总进球数',
    target: '上半场',
    is_hg: '0',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 11,
    type: 0,
    key: 'BTS',
    title: '',
    name: '双方球队进球',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 12,
    type: 0,
    key: 'HBTS',
    title: '',
    name: '双方球队进球',
    target: '上半場',
    is_hg: '0',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 13,
    type: 0,
    key: 'GLH',
    title: '球队进球数',
    name: '大 / 小',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 14,
    type: 0,
    key: 'GLV',
    title: '球队进球数',
    name: '大 / 小',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 15,
    type: 0,
    key: 'HGLH',
    title: '球队进球数',
    name: '大 / 小',
    target: '上半场',
    is_hg: '1',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 16,
    type: 0,
    key: 'HGLV',
    title: '球队进球数',
    name: '大 / 小',
    target: '上半场',
    is_hg: '1',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 17,
    type: 0,
    key: 'TGOE',
    title: '',
    name: '单双',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 18,
    type: 0,
    key: 'HTGOE',
    title: '',
    name: '单双',
    target: '上半场',
    is_hg: '0',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 19,
    type: 0,
    key: 'FLG',
    title: '',
    name: '最先 / 最后进球',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 21,
    type: 0,
    key: 'WM',
    title: '',
    name: '净胜球数',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 23,
    type: 0,
    key: 'CNS',
    title: '',
    name: '零失球',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 24,
    type: 0,
    key: 'WTN',
    title: '',
    name: '零失球获胜',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 25,
    type: 0,
    key: '1X2GL',
    title: '',
    name: '独赢 & 进球 大 / 小',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 26,
    type: 0,
    key: '1X2BTS',
    title: '',
    name: '独赢 & 双方球队进球',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 27,
    type: 0,
    key: 'GLBTS',
    title: '',
    name: '进球 大 / 小 & 双方球队进球',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 28,
    type: 0,
    key: '1X2FG',
    title: '',
    name: '独赢& 最先进球',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },

  // 比分盤口 進球盤口
  {
    id: 28,
    type: 1,
    key: 'R2G',
    title: '',
    name: '先进两球的一方',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 29,
    type: 1,
    key: 'R3G',
    title: '',
    name: '先进三球的一方',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 30,
    type: 1,
    key: 'HMG',
    title: '',
    name: '最多进球的半场',
    target: '',
    is_hg: '0',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 31,
    type: 1,
    key: 'HMG1x2',
    title: '',
    name: '最多进球的半场',
    target: '独赢',
    is_hg: '0',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 32,
    type: 1,
    key: 'SBH',
    title: '',
    name: '双半场进球',
    target: '',
    is_hg: '0',
    is_hf: '1',
    is_sc: '1'
  },
  {
    id: 33,
    type: 1,
    key: 'FGM',
    title: '',
    name: '首个进球方式',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 34,
    type: 1,
    key: 'TFG3W',
    title: '',
    name: '首个进球时间',
    target: '3项',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 35,
    type: 1,
    key: 'TFG',
    title: '',
    name: '首个进球时间',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 36,
    type: 1,
    key: 'DCGL',
    title: '',
    name: '双重机会 & 进球 大 / 小',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 37,
    type: 1,
    key: 'DCBTS',
    title: '',
    name: '双重机会 & 双方球队进球',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 38,
    type: 1,
    key: 'DCFTS',
    title: '',
    name: '双重机会 & 最先进球',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 39,
    type: 1,
    key: 'GLTGOE',
    title: '',
    name: '进球 大 / 小 & 进球 单/双',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },
  {
    id: 40,
    type: 1,
    key: 'GLFTS',
    title: '',
    name: '进球 大 / 小 & 最先进球',
    target: '',
    is_hg: '1',
    is_hf: '0',
    is_sc: '1'
  },

  // 比分盤口 其他盤口
  {
    id: 42,
    type: 2,
    key: 'WFB',
    title: '',
    name: '落后反超获胜',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '1'
  },

  // Not use
  {
    id: 99,
    type: '',
    key: 'QUA',
    title: '',
    name: '晋级',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '0'
  },
  {
    id: 99,
    type: '',
    key: '3RDG',
    title: '',
    name: '第三个进球',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '0'
  },
  {
    id: 99,
    type: '',
    key: 'TNC',
    title: '',
    name: '角球总数',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '0'
  },
  {
    id: 99,
    type: '',
    key: '2WCIP',
    title: '',
    name: '两项角球',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '0'
  },
  {
    id: 99,
    type: '',
    key: 'DR',
    title: '',
    name: '平局退款',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '0'
  },
  {
    id: 99,
    type: '',
    key: 'FGT',
    title: '',
    name: '最后入球的球队',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '0'
  },
  {
    id: 99,
    type: '',
    key: '2HBTS',
    title: '',
    name: '下半场两队均得分',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '0'
  },
  {
    id: 99,
    type: '',
    key: 'CSH',
    title: '',
    name: '主场准确进球',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '0'
  },
  {
    id: 99,
    type: '',
    key: 'CSV',
    title: '',
    name: '客场准确进球',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '0'
  },
  {
    id: 99,
    type: '',
    key: '2HSH',
    title: '',
    name: '主场下半场得分',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '0'
  },
  {
    id: 99,
    type: '',
    key: '2HSV',
    title: '',
    name: '客场下半场得分',
    target: '',
    is_hg: '0',
    is_hf: '0',
    is_sc: '0'
  },

  // 篮球
  { key: '1X2HT1', title: '', name: '上半场独贏', target: '' },
  { key: '1X2HT2', title: '', name: '下半场独贏', target: '' },

  { key: 'HCHT1', title: '', name: '上半场让球', target: '' },
  { key: 'HCHT2', title: '', name: '下半场让球', target: '' },

  { key: 'GLHT1', title: '', name: '上半场大小', target: '' },
  { key: 'GLHT2', title: '', name: '下半场大小', target: '' },

  { key: '1X2Q1', title: '', name: '第1节独贏', target: '' },
  { key: '1X2Q2', title: '', name: '第2节独贏', target: '' },
  { key: '1X2Q3', title: '', name: '第3节独贏', target: '' },
  { key: '1X2Q4', title: '', name: '第4节独贏', target: '' },

  { key: 'HCQ1', title: '', name: '第1节让球', target: '' },
  { key: 'HCQ2', title: '', name: '第2节让球', target: '' },
  { key: 'HCQ3', title: '', name: '第3节让球', target: '' },
  { key: 'HCQ4', title: '', name: '第4节让球', target: '' },

  { key: 'GLQ1', title: '', name: '第1节大小', target: '' },
  { key: 'GLQ2', title: '', name: '第2节大小', target: '' },
  { key: 'GLQ3', title: '', name: '第3节大小', target: '' },
  { key: 'GLQ4', title: '', name: '第4节大小', target: '' },

  { key: 'GLHQ1', title: '', name: '第1节主队大小', target: '' },
  { key: 'GLHQ2', title: '', name: '第2节主队大小', target: '' },
  { key: 'GLHQ3', title: '', name: '第3节主队大小', target: '' },
  { key: 'GLHQ4', title: '', name: '第4节主队大小', target: '' },

  { key: 'GLVQ1', title: '', name: '第1节客队大小', target: '' },
  { key: 'GLVQ2', title: '', name: '第2节客队大小', target: '' },
  { key: 'GLVQ3', title: '', name: '第3节客队大小', target: '' },
  { key: 'GLVQ4', title: '', name: '第4节客队大小', target: '' },

  { key: 'GLHHT1', title: '', name: '上半场主队大小', target: '' },
  { key: 'GLHHT2', title: '', name: '下半场主队大小', target: '' },

  { key: 'GLVHT1', title: '', name: '上半场客队大小', target: '' },
  { key: 'GLVHT2', title: '', name: '下半场客队大小', target: '' },

  { key: 'LD', title: '', name: '球队得分-最后1位数', target: '' },

  // 网球
  { key: '1X2S1', title: '', name: '第1盘独赢', target: '' },
  { key: '1X2S2', title: '', name: '第2盘独赢', target: '' },
  { key: '1X2S3', title: '', name: '第3盘独赢', target: '' },
  { key: '1X2S4', title: '', name: '第4盘独赢', target: '' },
  { key: '1X2S5', title: '', name: '第5盘独赢', target: '' },

  { key: 'GLS1', title: '', name: '第1盘局分大小', target: '' },
  { key: 'GLS2', title: '', name: '第2盘局分大小', target: '' },
  { key: 'GLS3', title: '', name: '第3盘局分大小', target: '' },
  { key: 'GLS4', title: '', name: '第4盘局分大小', target: '' },
  { key: 'GLS5', title: '', name: '第5盘局分大小', target: '' },

  { key: 'HCS1', title: '', name: '第1盘让局', target: '' },
  { key: 'HCS2', title: '', name: '第2盘让局', target: '' },
  { key: 'HCS3', title: '', name: '第3盘让局', target: '' },
  { key: 'HCS4', title: '', name: '第4盘让局', target: '' },
  { key: 'HCS5', title: '', name: '第5盘让局', target: '' },

  { key: 'GHC', title: '', name: '全场让局', target: '' },
  { key: 'SHC', title: '', name: '全场让盘', target: '' },

  { key: 'TGL', title: '', name: '全场局分大小', target: '' },
  { key: 'TGLH', title: '', name: '全场主队球员局分大小', target: '' },
  { key: 'TGLV', title: '', name: '全场客队局分大小', target: '' }
]
// bet target
const BTLists = [
  { key: 'o', name: '其他' },
  { key: 'O', name: '其他比分' },
  { key: 'X', name: '和局' },
  { key: 'OV', name: '大' },
  { key: 'UN', name: '小' },
  { key: 'Odd', name: '单' },
  { key: 'Even', name: '双' },
  { key: 'FG', name: '最先进球' },
  { key: 'LG', name: '最后进球' },
  { key: 'NG', name: '无进球' },
  { key: 'Yes', name: '是' },
  { key: 'No', name: '不是' },
  { key: 'HFG', name: '（主）最先进球' },
  { key: 'VFG', name: '（客）最先进球' },
  { key: '1H', name: '上半场' },
  { key: '2H', name: '下半场' },
  { key: 'B26M', name: '第26分钟或之前' },
  { key: 'A27M', name: '第27分钟或之后' },
  { key: 'q1', name: '上半场开场 - 14:59分钟' },
  { key: 'q2', name: '15:00分钟 - 29:59分钟' },
  { key: 'q3', name: '30:00分钟 - 下半场' },
  { key: 'q4', name: '下半场开场 - 59:59分钟' },
  { key: 'q5', name: '60:00分钟 - 74:59分钟' },
  { key: 'q6', name: '75:00分钟 - 全场完场' },
  { key: 'H', name: '主' },
  { key: 'V', name: '客' },
  { key: 'HH', name: '主 / 主' },
  { key: 'HV', name: '主 / 客' },
  { key: 'HX', name: '主 / 和' },
  { key: 'VH', name: '客 / 主' },
  { key: 'VV', name: '客 / 客' },
  { key: 'VX', name: '客 / 和' },
  { key: 'XH', name: '和 / 主' },
  { key: 'XV', name: '和 / 客' },
  { key: 'XX', name: '和 / 和' }
]

function getItem(arr, key) {
  return arr.filter(el => el.key === key)[0] || {}
}

export { playPMs, BTLists, getItem }
