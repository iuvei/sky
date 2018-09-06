export default [
  {
    name: 'footballAllPlay',
    path: '/football/allPlay',
    component: () => import('~/views/football/footballType/allPlay')
  },
  {
    path: '/zhggPreview',
    name: 'zhggPreview',
    component: () => import('~/views/football/footballType/zhggPreview')
  },
  {
    path: '/football',
    name: 'football',
    component: () => import('~/views/football/index'),
    children: [
      {
        path: 'maintained',
        name: 'maintained',
        component: () =>
          import('~/views/football/footballType/maintained')
      },
      {
        path: 'multi',
        name: 'sport_key',
        component: () =>
          import('~/views/football/footballType/FootballTypeMulti')
      },
      {
        path: 'fmatch',
        name: 'footballFmatch',
        component: () =>
          import('~/views/football/footballType/FootballTypeFmatch')
      },
      {
        path: 'total',
        name: 'footballTotal',
        component: () =>
          import('~/views/football/footballType/FootballTypeTotal')
      },

      {
        path: 'champion',
        name: 'footballChampion',
        component: () =>
          import('~/views/football/footballType/FootballTypeChampion')
      },
      {
        path: 'waves',
        name: 'footballWaves',
        component: () =>
          import('~/views/football/footballType/FootballTypeWaves')
      },
      {
        path: 'htcs',
        name: 'footballHtcs',
        component: () =>
          import('~/views/football/footballType/FootballTypeHtcs')
      }
    ]
  },
  {
    name: 'footballLeague',
    path: '/football/league',
    component: () => import('~/views/football/children/footballLeague')
  },
  {
    name: 'footballRace',
    path: '/football/race',
    component: () => import('~/views/football/children/footballRace')
  },
  {
    name: 'footballRaceInfo',
    path: '/football/race/info',
    component: () => import('~/views/football/children/footballRaceInfo')
  },
  {
    name: 'footballDetails',
    path: '/football/details',
    component: () => import('~/views/football/children/footballDetails')
  },
  {
    name: 'footballRecord',
    path: '/football/record',
    component: () => import('~/views/football/children/footballRecord')
  },
  {
    name: 'footballRule',
    path: '/football/rule',
    component: () => import('~/views/football/children/footballRule')
  },
  {
    name: 'footballDetaList',
    path: '/football/detalist',
    component: () => import('~/views/football/children/footballDetaList')
  }
]
