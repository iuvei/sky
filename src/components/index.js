import Vue from 'vue'
import AppCheckbox from './AppCheckbox'
import AppHeader from './AppHeader'
import AppModel from './AppModel'
import AppMenu from './AppMenu'
import AppEmpty from './AppEmpty'
import AppCountDown from './AppCountDown'

const plugins = [
  AppCheckbox,
  AppHeader,
  AppModel,
  AppMenu,
  AppCountDown,
  AppEmpty
]

plugins.forEach(plugin => Vue.use(plugin))
