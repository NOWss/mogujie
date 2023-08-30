import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import VueLazyLoad from 'vue-lazyload'

import {
  Button,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  Search,
  Icon,
  Sidebar,
  SidebarItem,
  List,
  PullRefresh,
  Cell,
  CellGroup,
  NavBar,
  Form,
  Field,
  Popup,
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Sku,
  Checkbox,
  CheckboxGroup,
  Stepper,
  Empty,
  SubmitBar,
  NoticeBar,
  AddressList,
  AddressEdit,
  Area,
  PasswordInput,
  NumberKeyboard
} from 'vant'

// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/f2f52ab95f230a30e27e46bfffb5419c.gif')
})

//注册, 将axios挂在到Vue构造函数的原型对象中, 这样可以在组件实例中直接使用 this.axios()
Vue.use(VueAxios, axios)
Vue.use(Button)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Tab)
  .use(Tabs)
  .use(Search)
  .use(Icon)
  .use(Sidebar)
  .use(SidebarItem)
  .use(List)
  .use(PullRefresh)
  .use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Form)
  .use(Field)
  .use(Popup)
  .use(Swipe)
  .use(SwipeItem)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Sku)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Stepper)
  .use(Empty)
  .use(SubmitBar)
  .use(NoticeBar)
  .use(AddressList)
  .use(AddressEdit)
  .use(Area)
  .use(PasswordInput)
  .use(NumberKeyboard)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
