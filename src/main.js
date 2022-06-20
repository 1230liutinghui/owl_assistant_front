// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import LemonIMUI from 'lemon-imui'
import 'lemon-imui/dist/index.css'

//LemonIMUI
Vue.use(LemonIMUI)
Vue.use(ElementUI)

axios.defaults.baseURL = 'http://119.91.99.211:8989';  // 默认地址
Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
