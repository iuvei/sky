import Vue from 'vue'
import AppCheckbox from './AppCheckbox'
import AppHeader from './AppHeader'
import AppModel from './AppModel'
import AppMenu from './AppMenu'
import AppEmpty from './AppEmpty'
import AppCountDown from './AppCountDown'
import BaseMsgBadge from '../views/chatRoom/message/components/BaseMsg'
import Throttle from '../js/throttle'

const plugins = [
  AppCheckbox,
  AppHeader,
  AppModel,
  AppMenu,
  AppCountDown,
  AppEmpty,
  BaseMsgBadge
]

plugins.forEach(plugin => Vue.use(plugin))
Vue.prototype.$Throttle = new Throttle()
