// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueWechatTitle from 'vue-wechat-title';
import basicContainer from './components/basic-container/base'
import store from './store/index'
import '@/icons' // icon
import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
import moment from 'moment'

Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(VueWechatTitle)
Vue.use(Avue)

moment.suppressDeprecationWarnings = true; // 关闭警告
Vue.prototype.$moment = moment;

// 引入mockjs
require('./mock.js')

// 注册全局容器
Vue.component('basicContainer', basicContainer)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
