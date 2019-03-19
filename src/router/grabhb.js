export default {
  path: '/grabhb',
  name: 'grabhongbao',
  component: resolve =>
    require(['~/views/grabhongbao/index.vue'], resolve),
  children: [{
    path: '',
    name: 'home',
    meta: {
      testIdentifie: true
    },
    component: resolve => {
      require([
        '~/views/grabhongbao/home.vue'
      ], resolve)
    }
  },
  {
    path: 'myhb',
    name: 'myhongbao',
    meta: {
      requireAuth: true,
      testIdentifie: true
    },
    component: resolve => {
      require([
        '~/views/grabhongbao/myhongbao.vue'
      ], resolve)
    }
  },
  {
    path: 'bangdan',
    name: 'hongbaobangdan',
    meta: {
      testIdentifie: true
    },
    component: resolve => {
      require([
        '~/views/grabhongbao/bangdan.vue'
      ], resolve)
    }
  },
  {
    path: 'grabhbrule',
    name: 'guize',
    meta: {
      testIdentifie: true
    },
    component: resolve => {
      require([
        '~/views/grabhongbao/grabhbrule.vue'
      ], resolve)
    }
  }]
}