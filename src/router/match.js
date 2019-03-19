export default [
  {
    path: '/match',
    // name: 'match',
    component: () => import('~/views/match/index'),
    children: [
      {
        path: '',
        name: 'jingcai_key',
        component: () => import('~/views/match/children/main')
      },
      {
        path: 'maintained',
        name: 'matchMaintained',
        component: () => import('~/views/match/children/maintained')
      }
    ]
  },
  {
    path: '/match/league',
    name: 'matchLeague',
    component: () => import('~/views/match/league'),
    meta: {
      title: '赛事赛选'
    }
  },
  {
    path: '/match/cart',
    name: 'matchCart',
    component: () => import('~/views/match/cart'),
    meta: {
      title: '竞彩投注单'
    }
  },
  {
    path: '/match/question',
    name: 'matchQuestion',
    component: () => import('~/views/match/question'),
    meta: {
      title: '玩法说明'
    }
  },
  // 竟彩投注记录详情
  {
    path: '/jingcaiTZXQ',
    name: 'jingcaixiangqing',
    component: () =>
      import('~/views/huiYuan/components/moreService/betRecord/recordDetails/index.vue')
  }
]
