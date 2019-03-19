import Vue from 'vue'
import Router from 'vue-router'
// import quick from '~/views/quick/index'
// import kjxq from '~/views/kaiJiang/details/index.vue'
// import loader from '~/views/public/loader'
// import kaiJiang from '~/views/kaiJiang/index.vue'
// import shouYe from '~/views/shouYe/index.vue'
// import zouShi from '~/views/zouShi/index.vue'
// import huiYuan from '~/views/huiYuan/index.vue'
// import login from '~/views/public/login'
// import registe from '~/views/public/registe/index'
// import gouCai from '~/views/gouCai/components/betting'
// import promotion from '~/views/public/promotion'
// import winList from '~/views/winList/index'
// import purchaseRecords from '~/views/public/purchaseRecords'
// import shopCar from '~/views/gouCai/lottery/shopCar'
// import chase from '~/views/gouCai/lottery/chase'
// import ssc from '~/views/gouCai/lottery/shishicai/index.vue'

const shouYe = () => import('~/views/shouYe/index.vue')
const quick = () => import('~/views/quick/index')
const kjxq = () => import('~/views/kaiJiang/details/index.vue')
const kaiJiang = () => import('~/views/kaiJiang/index.vue')
const zouShi = () => import('~/views/zouShi/index.vue')
const huiYuan = () => import('~/views/huiYuan/index.vue')
const login = () => import('~/views/public/login')
const registe = () => import('~/views/public/registe/index')
const loader = () => import('~/views/public/loader')
const gouCai = () => import('~/views/gouCai/components/betting')
const promotion = () => import('~/views/public/promotion')
const purchaseRecords = () => import('~/views/public/purchaseRecords')
const shopCar = () => import('~/views/gouCai/lottery/shopCar')
const chase = () => import('~/views/gouCai/lottery/chase')
const ssc = () => import('~/views/gouCai/lottery/shishicai/index.vue')
const winList = () => import('~/views/winList/index')
const chatRoom = () => import('~/views/chatRoom/index')
// const youxi = () => import('~/views/youXi/index.vue')

// import agent from './agent'
import moreService from './moreService'
import football from './football'
import match from './match'
import paper from '~/views/roadMap/index.vue'
import grabhb from './grabhb'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    // ...agent,
    ...football,
    ...match,
    moreService,
    grabhb,

    // {
    //   path: *,
    //   redirect: 'home',
    //   component: shouYe
    // },
    {
      path: '/',
      redirect: 'home',
      component: shouYe
    },
    {
      path: '/loader',
      name: 'loader',
      component: loader
    },
    {
      path: '/home',
      name: 'shouYe',
      component: shouYe,
      meta: {
        title: ''
      }
    },
    {
      path: '/trend',
      name: 'zouShi',
      component: zouShi,
      meta: {
        title: '基本走势'
      }
    },
    {
      path: '/paper',
      name: 'paper',
      component: paper,
      meta: {
        title: '路纸图'
      }
    },
    {
      path: '/winlist',
      name: 'winList',
      component: winList,
      meta: {
        title: '中奖记录'
      }
    },
    {
      path: '/lottery',
      name: 'kaiJiang',
      component: kaiJiang,
      meta: {
        title: '开奖大厅'
      }
    },
    {
      path: '/betting',
      name: 'gouCai',
      component: gouCai,
      meta: {
        title: '全部彩种'
      }
    },
    {
      path: '/shopcart',
      name: 'shopCart',
      component: shopCar,
      meta: {
        title: '购物车'
      }
    },
    {
      path: '/chase',
      name: 'chase',
      component: chase,
      meta: {
        title: '智能追号'
      }
    },
    {
      path: '/member',
      name: 'huiYuan',
      component: huiYuan,
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/registe',
      name: 'zhuce',
      component: registe,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/promotion',
      name: 'promotion',
      component: promotion,
      meta: {
        title: '活动'
      }
    },
    {
      path: '/purchaseRecords',
      name: 'purchaseRecords',
      component: purchaseRecords,
      meta: {
        title: '投注记录'
      }
    },
    {
      path: '/kjxq/:lotter_id',
      name: 'kjxq',
      component: kjxq,
      meta: {
        title: '开奖详情'
      }
    },
    {
      path: '/quick',
      name: 'quick',
      component: quick,
      meta: {
        title: '添加快捷方式'
      }
    },
    {
      path: '/ssc/:lotter_id',
      name: 'ssc',
      component: ssc,
      meta: {
        title: '时时彩'
      }
    },
    {
      path: 'addBetting',
      name: 'tianjiacaizhong',
      component: resolve =>
        require(['~/views/gouCai/components/addBetting.vue'], resolve),
      meta: {
        title: '添加彩种'
      }
    },
    {
      path: '/k3/:lotter_id',
      name: 'k3',
      component: resolve =>
        require(['~/views/gouCai/lottery/k3/index.vue'], resolve),
      meta: {
        title: '快三'
      }
    },
    {
      path: '/pk10/:lotter_id',
      name: 'pk10',
      component: resolve =>
        require(['~/views/gouCai/lottery/pk10/index.vue'], resolve),
      meta: {
        title: 'PK拾'
      }
    },
    {
      path: '/3d/:lotter_id',
      name: '3d',
      component: resolve =>
        require(['~/views/gouCai/lottery/3d/index.vue'], resolve),
      meta: {
        title: '3d'
      }
    },
    {
      path: '/lhc/:lotter_id',
      name: 'lhc',
      component: resolve =>
        require(['~/views/gouCai/lottery/lhc/index.vue'], resolve),
      meta: {
        title: '香港⑥合彩'
      }
    },
    {
      path: '/11x5/:lotter_id',
      name: '11x5',
      component: resolve =>
        require(['~/views/gouCai/lottery/elevenx5/index.vue'], resolve),
      meta: {
        title: '11选5'
      }
    },
    {
      path: '/pcdd/:lotter_id',
      name: 'pcdd',
      component: resolve =>
        require(['~/views/gouCai/lottery/pcdd/index.vue'], resolve),
      meta: {
        title: 'pcdd'
      }
    },
    {
      path: '/xypk/:lotter_id',
      name: 'xypk',
      component: resolve =>
        require(['~/views/gouCai/lottery/puke/index.vue'], resolve),
      meta: {
        title: '幸运扑克'
      }
    },
    {
      path: '/pkniuniu/:lotter_id',
      name: 'pkniuniu',
      component: resolve =>
        require(['~/views/gouCai/lottery/pkniuniu/index.vue'], resolve),
      meta: {
        title: '幸运PK牛牛'
      }
    },
    {
      path: '/tzyx/:lotter_id',
      name: 'tzyx',
      component: resolve =>
        require(['~/views/gouCai/lottery/ladder/index.vue'], resolve),
      meta: {
        title: '梯子游戏'
      }
    },
    {
      path: '/qxc/:lotter_id',
      name: 'qxc',
      component: resolve =>
        require(['~/views/gouCai/lottery/qxc/index.vue'], resolve),
      meta: {
        title: '七星彩'
      }
    },
    {
      path: '/xync/:lotter_id',
      name: 'xync',
      component: resolve =>
        require(['~/views/gouCai/lottery/xync/index.vue'], resolve),
      meta: {
        title: '幸运农场'
      }
    },
    {
      path: '/findPW',
      name: 'zhaohuimima',
      component: resolve =>
        require(['~/views/public/registe/components/findpw.vue'], resolve),
      meta: {
        title: '找回密码'
      }
    },
    {
      path: '/agreement',
      name: 'yonghuxieyi',
      component: resolve =>
        require(['~/views/public/registe/components/agreement.vue'], resolve),
      meta: {
        title: '用户协议'
      }
    },
    {
      path: '/sysNotice',
      name: 'xitonggonggao',
      component: resolve =>
        require(['~/views/shouYe/components/sysNotice.vue'], resolve),
      meta: {
        title: '系统公告'
      }
    },
    {
      path: '/maintained',
      name: 'weihu',
      component: resolve =>
        require(['~/views/maintained/maintained.vue'], resolve),
      meta: {
        title: '维护中···'
      }
    },
    {
      path: '/forbiddenIP',
      name: 'IPshouxian',
      component: resolve =>
        require(['~/views/forbiddenIP/forbiddenIP.vue'], resolve),
      meta: {
        title: 'IP受限'
      }
    },
    {
      path: '/chatRoom',
      name: 'liaotianshi',
      component: chatRoom,
      meta: {
        title: '聊天室',
        keepAlive: false
      }
    },
    {
      path: '/plan',
      name: 'plan',
      component: resolve =>
        require(['~/views/chatRoom/components/plan/index.vue'], resolve),
      meta: {
        title: '计划'
      }
    },
    {
      path: '/zixuanPaixu',
      name: 'zixuanPaixu',
      component: resolve => require(['~/views/zixuanPaixu/index.vue'], resolve),
      meta: {
        title: '自选排序'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
