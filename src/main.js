import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import http from 'axios'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/scss/reset.scss' //全局样式
import { Button, Select, Radio, Container, Aside, Header, Main, Menu, MenuItem, MenuItemGroup, Submenu, Dropdown, DropdownItem, DropdownMenu, Row, Col, Card, Table, TableColumn, Breadcrumb, BreadcrumbItem, Tag, Form, FormItem, Input, Option, CheckboxGroup, Checkbox, DatePicker, Dialog, Pagination, MessageBox } from 'element-ui';
Vue.config.productionTip = false
// Vue.use(ElementUI);

// Vue.component(Button.name, Button);
Vue.use(Button)
Vue.component(Select.name, Select);
Vue.component(Radio.name, Radio);
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Option)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.prototype.$http = http
Vue.prototype.$confirm = MessageBox.confirm

if (process.env.NODE_ENV === 'development') require('@/api/mock')


router.beforeEach((to, from, next) => {
  // 防止刷新后vuex里丢失token
  store.commit('getToken')
  // 防止刷新后vuex里丢失标签列表tagList
  store.commit('getMenu')
  let token = store.state.user.token
  // 过滤登录页，因为去登陆页不需要token(防止死循环)
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    store.commit('addMenu', router)
  }
}).$mount('#app')
