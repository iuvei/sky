/**
 * 使用ydui第三方插件
 */
import Vue from 'vue'
// import YDUI from 'vue-ydui'
// Vue.use(YDUI)
import 'vue-ydui/dist/ydui.base.css'
import 'vue-ydui/dist/ydui.rem.css'
import { Button, ButtonGroup } from 'vue-ydui/dist/lib.rem/button'
import {
  NavBar,
  NavBarBackIcon,
  NavBarNextIcon
} from 'vue-ydui/dist/lib.rem/navbar'
import { TabBar, TabBarItem } from 'vue-ydui/dist/lib.rem/tabbar'
import { Slider, SliderItem } from 'vue-ydui/dist/lib.rem/slider'
import { Tab, TabPanel } from 'vue-ydui/dist/lib.rem/tab'
import { ProgressBar } from 'vue-ydui/dist/lib.rem/progressbar'
import {
  Confirm,
  Alert,
  Toast,
  Notify,
  Loading
} from 'vue-ydui/dist/lib.rem/dialog'
import { Popup } from 'vue-ydui/dist/lib.rem/popup'
import { Input } from 'vue-ydui/dist/lib.rem/input'
import { CountDown } from 'vue-ydui/dist/lib.rem/countdown'
import { ActionSheet } from 'vue-ydui/dist/lib.rem/actionsheet'
import { Accordion, AccordionItem } from 'vue-ydui/dist/lib.rem/accordion'
import { Spinner } from 'vue-ydui/dist/lib.rem/spinner'
import { CountUp } from 'vue-ydui/dist/lib.rem/countup'
import { FlexBox, FlexBoxItem } from 'vue-ydui/dist/lib.rem/flexbox'
import { Icons } from 'vue-ydui/dist/lib.rem/icons'
import { GridsGroup, GridsItem } from 'vue-ydui/dist/lib.rem/grids'
import { CellGroup, CellItem } from 'vue-ydui/dist/lib.rem/cell'
import { CheckBox, CheckBoxGroup } from 'vue-ydui/dist/lib.rem/checkbox'
import { TimeLine, TimeLineItem } from 'vue-ydui/dist/lib.rem/timeline'
import { InfiniteScroll } from 'vue-ydui/dist/lib.rem/infinitescroll'
import { Switch } from 'vue-ydui/dist/lib.rem/switch'
import { Layout } from 'vue-ydui/dist/lib.rem/layout'
import { ListTheme, ListItem, ListOther } from 'vue-ydui/dist/lib.rem/list'
// import { ScrollNav, ScrollNavPanel } from 'vue-ydui/dist/lib.rem/scrollnav'
import { ScrollTab, ScrollTabPanel } from 'vue-ydui/dist/lib.rem/scrolltab'
import { DateTime } from 'vue-ydui/dist/lib.rem/datetime'
import { Badge } from 'vue-ydui/dist/lib.rem/badge'
import { PullRefresh } from 'vue-ydui/dist/lib.rem/pullrefresh'
// 五角星评分
import { Rate } from 'vue-ydui/dist/lib.rem/rate'
Vue.component(Rate.name, Rate)
// 搜索功能
import { Search } from 'vue-ydui/dist/lib.rem/search'
Vue.component(Search.name, Search)

Vue.component(Search.name, Search)
Vue.component(PullRefresh.name, PullRefresh)
Vue.component(Badge.name, Badge)
Vue.component(ScrollTab.name, ScrollTab)
Vue.component(ScrollTabPanel.name, ScrollTabPanel)
// Vue.component(ScrollNav.name, ScrollNav)
// Vue.component(ScrollNavPanel.name, ScrollNavPanel)
Vue.component(ListTheme.name, ListTheme)
Vue.component(ListItem.name, ListItem)
Vue.component(ListOther.name, ListOther)
Vue.component(Layout.name, Layout)
Vue.component(TimeLine.name, TimeLine)
Vue.component(TimeLineItem.name, TimeLineItem)
Vue.component(CheckBox.name, CheckBox)
Vue.component(CheckBoxGroup.name, CheckBoxGroup)
Vue.component(CellGroup.name, CellGroup)
Vue.component(CellItem.name, CellItem)
Vue.component(GridsGroup.name, GridsGroup)
Vue.component(GridsItem.name, GridsItem)
Vue.component(Icons.name, Icons)
Vue.component(FlexBox.name, FlexBox)
Vue.component(FlexBoxItem.name, FlexBoxItem)
Vue.component(CountUp.name, CountUp)
Vue.component(Spinner.name, Spinner)
Vue.component(InfiniteScroll.name, InfiniteScroll)
Vue.component(Switch.name, Switch)
Vue.component(Accordion.name, Accordion)
Vue.component(AccordionItem.name, AccordionItem)
Vue.component(ActionSheet.name, ActionSheet)
Vue.component(CountDown.name, CountDown)
Vue.component(Input.name, Input)
Vue.component(Popup.name, Popup)
Vue.component(ProgressBar.name, ProgressBar)
Vue.component(TabBar.name, TabBar)
Vue.component(TabBarItem.name, TabBarItem)
Vue.component(Tab.name, Tab)
Vue.component(TabPanel.name, TabPanel)
Vue.component(NavBar.name, NavBar)
Vue.component(NavBarBackIcon.name, NavBarBackIcon)
Vue.component(NavBarNextIcon.name, NavBarNextIcon)
Vue.component(Button.name, Button)
Vue.component(ButtonGroup.name, ButtonGroup)
Vue.component(Slider.name, Slider)
Vue.component(SliderItem.name, SliderItem)
Vue.component(Tab.name, Tab)
Vue.component(TabPanel.name, TabPanel)
Vue.component(DateTime.name, DateTime)
Vue.component(PullRefresh.name, PullRefresh)
Vue.prototype.$dialog = {
  confirm: Confirm,
  alert: Alert,
  toast: Toast,
  notify: Notify,
  loading: Loading
}
Window.prototype.$get = num => {
  console.log(num / 720 * 414)
}
