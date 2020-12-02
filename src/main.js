import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Axios from 'axios'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import './assets/sass/custom.scss'

Vue.config.productionTip = false

Vue.prototype.$http = Axios;
Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmMxNGY2OGY2YzRhZjAwMTcwODFlMGYiLCJpYXQiOjE2MDY1MDQyOTZ9._NFJGnvEjc17kxV1_ti5wBES4VxrGuhseFJH8j90wKQ';

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
