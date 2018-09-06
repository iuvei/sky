import agent from './agent'
export default {
  path: '/moreService',
  name: 'gengduofuwu',
  meta: {
    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve =>
        require(['~/views/huiYuan/components/moreService/index.vue'], resolve),
  children: [
    ...agent,
    {
      path: 'success',
      name: 'success',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/getCashSuccess'
                ], resolve)
    },
    {
      path: 'Nrecharge',
      name: 'chongzhi',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/recharge.vue'
                ], resolve)
    },
    {
      path: 'youxi/:pt_id',
      name: 'youxi',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['~/views/youXi'], resolve)
    },
    {
      path: 'rechargeStep',
      name: 'chongzhiqueren',
      meta: {
        requireAuth: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/rechargeStep.vue'
                ], resolve)
    },
    {
      path: 'rechargeEnd',
      name: 'chongzhiwancheng',
      meta: {
        requireAuth: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/recharge/rechargeEnd.vue'
                ], resolve)
    },
    {
      path: 'NgetCash',
      name: 'tixian',
      meta: {
        requireAuth: true,
        testIdentifie: true,
        realName: true
      },
      component: () =>
                import('~/views/huiYuan/components/moreService/getCash.vue')
            // component: resolve =>
            //   require([
            //     '~/views/huiYuan/components/moreService/getCash.vue'
            //   ], resolve)
    },
    {
      path: 'betRecords',
      name: 'goucaijilu',
      meta: {
        requireAuth: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/betRecord.vue'
                ], resolve)
    },
    {
      path: 'downloadApp',
      name: 'xiazai',
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/downloadApp.vue'
                ], resolve)
    },
    {
      path: 'betRecordDetails',
      name: 'goucaixiangqing',
      props: true,
      meta: {
        requireAuth: true
      },
      component: () =>
                import('~/views/huiYuan/components/moreService/betRecordDetails')
    },
    {
      path: 'drawingsList',
      name: 'tikuanxiangqing',
      props: true,
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: () =>
                import('~/views/huiYuan/components/moreService/drawingsList')
    },
    {
      path: 'prizeRecord',
      name: 'zhongjiangjilu',
      meta: {
        requireAuth: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/prizeRecord.vue'
                ], resolve)
    },
    {
      path: 'prizeRecordDetails',
      name: 'zhongjiangxiangqing',
      meta: {
        requireAuth: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/prizeRecordDetails.vue'
                ], resolve)
    },
    {
      path: 'personalInfo',
      name: 'huiyuanxinxi',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/personalInfo.vue'
                ], resolve)
    },
    {
      path: 'growinginfo',
      name: 'chengzhangmingxi',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/growinginfo.vue'
                ], resolve)
    },
    {
      path: 'personalgrade',
      name: 'dengjijiangli',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/personalgrade.vue'
                ], resolve)
    },
    {
      path: 'personaltask',
      name: 'renwulibao',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/personaltask.vue'
                ], resolve)
    },
    {
      path: 'accountInfo',
      name: 'zhanghumingxi',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/accountInfo.vue'
                ], resolve)
    },
    {
      path: 'drawingsRecord',
      name: 'tikuanmingxi',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/drawingsRecord.vue'
                ], resolve)
    },
    {
      path: 'rechargeRecord',
      name: 'chongzhijilu',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/rechargeRecord.vue'
                ], resolve)
    },
    {
      path: 'rechargeDetails',
      name: 'chongzhixiangqing',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/rechargeDetails.vue'
                ], resolve)
    },
    {
      path: 'welfareTask',
      name: 'fulirenwu',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/welfareTask.vue'
                ], resolve)
    },
    {
      path: 'signIn',
      name: 'qiandao',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/signIn.vue'
                ], resolve)
    },
    {
      path: 'offer',
      name: 'youhui',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
        require(['~/views/huiYuan/components/moreService/offer.vue'], resolve)
    },
    {
      path: 'activities',
      name: 'hongbaohuodong',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/activities.vue'
                ], resolve)
    },
    {
      path: 'signInRecord',
      name: 'qiandaojilu',
      meta: {
        requireAuth: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/gettingRecord.vue'
                ], resolve)
    },
    {
      path: 'securityCenter',
      name: 'anquanzhongxin',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/securityCenter.vue'
                ], resolve)
    },
    {
      path: 'correctLoginPW',
      name: 'xiugaidenglumima',
      meta: {
        requireAuth: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/correctLoginPW.vue'
                ], resolve)
    },
    {
      path: 'correctRealName',
      name: 'xiugaizhenshixingming',
      meta: {
        requireAuth: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/correctRealName.vue'
                ], resolve)
    },
    {
      path: 'correctDealPW',
      name: 'xiugaijiaoyimima',
      meta: {
        requireAuth: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/correctDealPW.vue'
                ], resolve)
    },
    {
      path: 'bindingEmail',
      name: 'bangdingyouxiang',
      meta: {
        requireAuth: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/bindingEmail.vue'
                ], resolve)
    },
    {
      path: 'bindingCellphone',
      name: 'bangdingshouji',
      meta: {
        requireAuth: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/bindingCellphone.vue'
                ], resolve)
    },
    {
      path: 'bindingWechat',
      name: 'bangdingweixin',
      meta: {
        requireAuth: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/bindingWechat.vue'
                ], resolve)
    },
    {
      path: 'bindingQQ',
      name: 'bangdingQQ',
      meta: {
        requireAuth: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/bindingQQ.vue'
                ], resolve)
    },
    {
      path: 'correctQuestion',
      name: 'xiugaimibaowenti',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/correctQuestion.vue'
                ], resolve)
    },
    {
      path: 'bankcardManage',
      name: 'yinhangkaguanli',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/bankcardManage.vue'
                ], resolve)
    },
    {
      path: 'bindingBankcard',
      name: 'bangdingyinhangka',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/bindingBankcard.vue'
                ], resolve)
    },
    {
      path: 'todayProfit',
      name: 'jinriyingkui',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/todayProfit.vue'
                ], resolve)
    },
    {
      path: 'personalMessage',
      name: 'gerenxiaoxi',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/personalMessage.vue'
                ], resolve)
    },
    {
      path: 'personalMessageInfo',
      name: 'xiaoxixiangqing',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/personalMessageInfo.vue'
                ], resolve)
    },
    {
      path: 'moreSetting',
      name: 'gengduoshezhi',
            // meta: {
            //   requireAuth: true
            // },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/moreSetting.vue'
                ], resolve)
    },
    {
      path: 'adviceFeedbacks',
      name: 'yijianliebiao',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/adviceFeedbacks.vue'
                ], resolve)
    },
    {
      path: 'adviceFeedback',
      name: 'yijianfanhui',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/adviceFeedback.vue'
                ], resolve)
    },
    {
      path: 'adviceFeedlist',
      name: 'fankuixiangqing',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/adviceFeedlist.vue'
                ], resolve)
    },
    {
      path: 'recommand',
      name: 'tuijiangeihaoyou',
      // meta: {
      //   requireAuth: true,
      //   testIdentifie: true
      // },
      component: resolve =>
        require([
          '~/views/huiYuan/components/moreService/recommand.vue'
        ], resolve)
    },
    {
      path: 'aboutUs',
      name: 'guanyuwomen',
            // meta: {
            //   requireAuth: true,
            //   testIdentifie: true
            // },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/aboutUs.vue'
                ], resolve)
    },
    {
      path: 'cashTransaction',
      name: 'xianjinjiaoyi',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require([
                  '~/views/huiYuan/components/moreService/cashTransaction.vue'
                ], resolve)
    },
    {
      path: 'agencyCenter',
      name: 'dailizhongxin',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require(['~/views/daili/agencyCenter.vue'], resolve)
    },
    {
      path: 'backwater',
      name: 'shishifanshui',
      meta: {
        requireAuth: true,
        testIdentifie: true
      },
      component: resolve =>
                require(['~/views/huiYuan/components/moreService/backwater.vue'], resolve)
    }
  ]
}
