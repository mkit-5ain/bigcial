// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import axios from 'axios'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'
import VueCharts from 'vue-charts'
import VueCarousel from 'vue-carousel'
import VueDraggable from 'Vuedraggable'
import FullCalendar from 'vue-full-calendar'
import Datetime from 'vue-datetime'
import VuePaginate from 'vue-paginate'

import 'fullcalendar/dist/fullcalendar.min.css'
import 'vue-datetime/dist/vue-datetime.css'

Vue.prototype.$http = axios
// Vue.prototype.$http.defaults.headers.common['x-access-token'] = localStorage.getItem('local-access-token')
Vue.prototype.$http.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    alert('로그인이 필요합니다.')
    router.replace({ name: 'SignIn' })
  } else if (error.response.status === 405) {
    alert('허용 되지 않는 접근입니다.')
    router.replace({ name: 'SignIn' })
  }
  // else if (error.response.status === 500) {
  //   alert('잘못된 접근입니다.')
  // }
  return Promise.reject(error.response)
})

Vue.prototype.$eventBus = new Vue()
Vue.config.productionTip = false
Vue.use(FullCalendar)
Vue.use(VueCharts)
Vue.use(VueCarousel)
Vue.use(VueDraggable)
Vue.use(VueMomentJS, moment)
Vue.use(Datetime)
Vue.use(VuePaginate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
