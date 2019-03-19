// import './registerServiceWorker'
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from '../server/axios.js';
import EXIF from 'exif-js';
window.EXIF = EXIF;
import './components';
import sha1 from 'node-sha1';
import './verdor';
import AlloyFinger from 'alloyfinger/alloy_finger';
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue';
import 'vue-event-calendar/dist/style.css';
import vueEventCalendar from 'vue-event-calendar';
import VueClipboard from 'vue-clipboard2'; // 剪贴板工具

import $ws from '../server/websocket';

Vue.use(VueClipboard);
Vue.use(vueEventCalendar, { locale: 'zh' });

// 实现拖拽
// import vueDrag from 'vue-dragging'
// Vue.use(vueDrag)
// 弹窗
import { Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);

// 弹窗
require('animate.css');
require('./font/iconfont.css');
require('../server/unitl');
Vue.use(AlloyFingerVue, {
  AlloyFinger
});

Vue.prototype.$ajax = axios;
Vue.prototype.$sha1 = sha1;
Vue.prototype.$ws = $ws;
Vue.prototype.bus = new Vue();
/**
 * 创建指令
 * 拖动
 */
Vue.directive('drag', {
  bind(el) {
    const oDiv = el; // 当前元素
    // const self = this  // 上下文
    oDiv.addEventListener('touchstart', e => {
      // 判断默认行为是否可以被禁用
      e.cancelBubble = true;
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.changedTouches[0].clientX - oDiv.offsetLeft;
      const disY = e.changedTouches[0].clientY - oDiv.offsetTop;
      oDiv.addEventListener('touchmove', e => {
        e.cancelBubble = true;
        // 通过事件委托，计算移动的距离
        const l = e.changedTouches[0].clientX - disX;
        const t = e.changedTouches[0].clientY - disY;
        if (t > 570) {
          return;
        } else {
          // 移动当前元素
          oDiv.style.left = l + 'px';
          oDiv.style.top = t + 'px';
          // 将此时的位置传出去
          // binding.value({ x: e.pageX, y: e.pageY })
          window._thisPositionX = e.pageX;
          window._thisPositionY = e.pageY;
        }
      });
      oDiv.addEventListener('touchend', e => {
        e.cancelBubble = true;
        oDiv.ontouchend = null;
        oDiv.ontouchmove = null;
      });
    });
  }
});

function needTest(store, to) {
  if (to.meta.testIdentifie) {
    window.vue.$dialog.toast({ mes: '试玩账号不可以进行此操作！' });
    return false;
  }
  return true;
}

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || document.title;
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (store.state.userinfo.isLogin) {
      // 通过vuex state获取当前的token是否存在
      // if (to.meta.testIdentifie || to.meta.realName) {
      //   // 先判断是否是试玩账号
      //   if (store.state.userinfo.accountInfo.test === 2) {
      //     window.vue.$dialog.toast({ mes: '试玩账号不可以进行此操作！' })
      //   } else if (!(store.state.userinfo.accountInfo.real_name &&
      //       store.state.userinfo.accountInfo.bind_bank_id)) {
      //     next({
      //       path: 'moreService/bindingBankcard'
      //     })
      //   } else {
      //     next()
      //   }
      // } else {
      //   next()
      // }
      // if (needTest(store, to) && bindBankCard(store, to, next)) {
      //   next()
      // }
      if (store.state.userinfo.accountInfo.test === 2) {
        if (needTest(store, to)) {
          next();
        }
      } else {
        next();
      }
    } else {
      window.vue.$dialog.confirm({
        title: '温馨提示',
        mes: '您未登录，请先登录',
        opts: () => {
          next({
            path: '/login',
            query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          });
        }
      });
    }
  } else {
    next();
  }
});
window.vue = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  data: {
    Bus: new Vue()
  }
});
