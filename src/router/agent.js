export default [
  {
    path: '/agency/listDetail',
    name: 'agentListDetail',
    meta: {
      requireAuth: true
    },
    component: () => import('~/views/daili/components/listDetail')
  },
  {
    path: '/agency',
    name: 'daili',
    component: () => import('~/views/daili/components/index'),
    children: [
      {
        path: 'agencyIntro',
        name: 'dailijieshao',
        meta: {
          requireAuth: true
        },
        component: () => import('~/views/daili/components/agencyIntro')
      },

      {
        path: 'agencyStatement',
        name: 'dailibaobiao',
        meta: {
          requireAuth: true
        },
        component: resolve =>
          require(['~/views/daili/components/agencyStatement.vue'], resolve)
      },
      {
        path: 'subordinateStatement',
        name: 'xiajibaobiao',
        meta: {
          requireAuth: true
        },
        component: resolve =>
          require([
            '~/views/daili/components/subordinateStatement.vue'
          ], resolve)
      },
      {
        path: 'subordinateManage',
        name: 'xiajiguanli',
        meta: {
          requireAuth: true
        },
        component: resolve =>
          require(['~/views/daili/components/subordinateManage.vue'], resolve)
      },
      {
        path: 'agencyBetting',
        name: 'dailitouzhujilu',
        meta: {
          requireAuth: true
        },
        component: resolve =>
          require(['~/views/daili/components/agencyBetting.vue'], resolve)
      },
      {
        path: 'agencyDeals',
        name: 'dailijiaoyijilu',
        meta: {
          requireAuth: true
        },
        component: resolve =>
          require(['~/views/daili/components/agencyDeals.vue'], resolve)
      },
      {
        path: 'openAccount',
        name: 'dailikaihu',
        meta: {
          requireAuth: true
        },
        component: resolve =>
          require(['~/views/daili/components/openAccount.vue'], resolve)
      },
      {
        path: 'returnRateTable',
        name: 'fandianpeilvbiao',
        meta: {
          requireAuth: true
        },
        component: resolve =>
          require(['~/views/daili/components/returnRateTable.vue'], resolve)
      },
      {
        path: 'addNewDomain',
        name: 'tianjiaxinyuming',
        meta: {
          requireAuth: true
        },
        component: resolve =>
          require(['~/views/daili/components/addNewDomain.vue'], resolve)
      }
    ]
  }
]
