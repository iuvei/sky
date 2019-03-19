// 包选
const template_bx = [
  {
    name: '对子',
    width: '120',
    height: '115',
    data: {
      tit: '如',
      data: ['spade_A', 'heart_A', 'plum_3']
    },
    checked: false,
    value: 0
  },
  {
    name: '顺子',
    width: '120',
    height: '115',
    data: {
      tit: '如',
      data: ['spade_A', 'plum_2', 'heart_3']
    },
    checked: false,
    value: 1
  },
  {
    name: '同花',
    width: '120',
    height: '115',
    data: {
      tit: '如',
      data: ['spade_A', 'spade_3', 'spade_4']
    },
    checked: false,
    value: 2
  },
  {
    name: '豹子',
    width: '120',
    height: '115',
    data: {
      tit: '如',
      data: ['spade_A', 'heart_A', 'plum_A']
    },
    checked: false,
    value: 3
  },
  {
    name: '同花顺',
    width: '120',
    height: '115',
    data: {
      tit: '如',
      data: ['heart_A', 'heart_2', 'heart_3']
    },
    checked: false,
    value: 4
  }
]
// 单选豹子
const template_dxbz = [
  {
    width: '100',
    height: '90',
    data: ['card_A', 'card_A', 'card_A'],
    checked: false,
    value: 0
  },
  {
    data: ['card_2', 'card_2', 'card_2'],
    checked: false,
    value: 1
  },
  {
    data: ['card_3', 'card_3', 'card_3'],
    checked: false,
    value: 2
  },
  {
    data: ['card_4', 'card_4', 'card_4'],
    checked: false,
    value: 3
  },
  {
    data: ['card_5', 'card_5', 'card_5'],
    checked: false,
    value: 4
  },
  {
    data: ['card_6', 'card_6', 'card_6'],
    checked: false,
    value: 5
  },
  {
    data: ['card_7', 'card_7', 'card_7'],
    checked: false,
    value: 6
  },
  {
    data: ['card_8', 'card_8', 'card_8'],
    checked: false,
    value: 7
  },
  {
    data: ['card_9', 'card_9', 'card_9'],
    checked: false,
    value: 8
  },
  {
    data: ['card_10', 'card_10', 'card_10'],
    checked: false,
    value: 9
  },
  {
    data: ['card_J', 'card_J', 'card_J'],
    checked: false,
    value: 10
  },
  {
    data: ['card_Q', 'card_Q', 'card_Q'],
    checked: false,
    value: 11
  },
  {
    data: ['card_K', 'card_K', 'card_K'],
    checked: false,
    value: 12
  }
]

// 单选对子
const template_dxdz = [
  {
    data: ['card_A', 'card_A'],
    checked: false,
    value: 0
  },
  {
    data: ['card_2', 'card_2'],
    checked: false,
    value: 1
  },
  {
    data: ['card_3', 'card_3'],
    checked: false,
    value: 2
  },
  {
    data: ['card_4', 'card_4'],
    checked: false,
    value: 3
  },
  {
    data: ['card_5', 'card_5'],
    checked: false,
    value: 4
  },
  {
    data: ['card_6', 'card_6'],
    checked: false,
    value: 5
  },
  {
    data: ['card_7', 'card_7'],
    checked: false,
    value: 6
  },
  {
    data: ['card_8', 'card_8'],
    checked: false,
    value: 7
  },
  {
    data: ['card_9', 'card_9'],
    checked: false,
    value: 8
  },
  {
    data: ['card_10', 'card_10'],
    checked: false,
    value: 9
  },
  {
    data: ['card_J', 'card_J'],
    checked: false,
    value: 10
  },
  {
    data: ['card_Q', 'card_Q'],
    checked: false,
    value: 11
  },
  {
    data: ['card_K', 'card_K'],
    checked: false,
    value: 12
  }
]

// 单选顺子
const template_dxsz = [
  {
    data: ['card_A', 'card_2', 'card_3'],
    checked: false,
    value: 0
  },
  {
    data: ['card_2', 'card_3', 'card_4'],
    checked: false,
    value: 1
  },
  {
    data: ['card_3', 'card_4', 'card_5'],
    checked: false,
    value: 2
  },
  {
    data: ['card_4', 'card_5', 'card_6'],
    checked: false,
    value: 3
  },
  {
    data: ['card_5', 'card_6', 'card_7'],
    checked: false,
    value: 4
  },
  {
    data: ['card_6', 'card_7', 'card_8'],
    checked: false,
    value: 5
  },
  {
    data: ['card_7', 'card_8', 'card_9'],
    checked: false,
    value: 6
  },
  {
    data: ['card_8', 'card_9', 'card_10'],
    checked: false,
    value: 7
  },
  {
    data: ['card_9', 'card_10', 'card_J'],
    checked: false,
    value: 8
  },
  {
    data: ['card_10', 'card_J', 'card_Q'],
    checked: false,
    value: 9
  },
  {
    data: ['card_J', 'card_Q', 'card_K'],
    checked: false,
    value: 10
  },
  {
    data: ['card_Q', 'card_K', 'card_A'],
    checked: false,
    value: 11
  }
]

// 单选同花
const template_dxth = [
  {
    data: 'spade_big',
    txt: '同花',
    checked: false,
    value: 0
  },
  {
    data: 'heart_big',
    txt: '同花',
    checked: false,
    value: 1
  },
  {
    data: 'plum_big',
    txt: '同花',
    checked: false,
    value: 2
  },
  {
    data: 'block_big',
    txt: '同花',
    checked: false,
    value: 3
  }
]

// 单选同花顺
const template_dxths = [
  {
    data: 'spade_big',
    txt: '顺子',
    checked: false,
    value: 0
  },
  {
    data: 'heart_big',
    txt: '顺子',
    checked: false,
    value: 1
  },
  {
    data: 'plum_big',
    txt: '顺子',
    checked: false,
    value: 2
  },
  {
    data: 'block_big',
    txt: '顺子',
    checked: false,
    value: 3
  }
]

// 任选
const template_rx = [
  {
    data: 'card_A',
    checked: false,
    value: 0
  },
  {
    data: 'card_2',
    checked: false,
    value: 1
  },
  {
    data: 'card_3',
    checked: false,
    value: 2
  },
  {
    data: 'card_4',
    checked: false,
    value: 3
  },
  {
    data: 'card_5',
    checked: false,
    value: 4
  },
  {
    data: 'card_6',
    checked: false,
    value: 5
  },
  {
    data: 'card_7',
    checked: false,
    value: 6
  },
  {
    data: 'card_8',
    checked: false,
    value: 7
  },
  {
    data: 'card_9',
    checked: false,
    value: 8
  },
  {
    data: 'card_10',
    checked: false,
    value: 9
  },
  {
    data: 'card_J',
    checked: false,
    value: 10
  },
  {
    data: 'card_Q',
    checked: false,
    value: 11
  },
  {
    data: 'card_K',
    checked: false,
    value: 12
  }
]
const map = new Map([
  [1, template_bx],
  [2, template_dxbz],
  [3, template_dxdz],
  [4, template_dxsz],
  [5, template_dxth],
  [6, template_dxths],
  [7, template_rx],
  [8, template_rx],
  [9, template_rx],
  [10, template_rx],
  [11, template_rx],
  [12, template_rx]
])

const getFields = playid => map.get(playid)

export default getFields
