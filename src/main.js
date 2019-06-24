import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueNotifications from 'vue-notification'

import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import messages from './i18n/index'
import moment from 'moment'
import store from './store/index'
import 'babel-polyfill'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './assets/styles/style.scss'

import 'xterm/dist/xterm.css'
import { Terminal } from 'xterm'
import * as fit from 'xterm/lib/addons/fit/fit';

Terminal.applyAddon(fit);

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueI18n)
Vue.use(VueNotifications)


Vue.filter('Status', function (status) {
  switch (status) {
  case 'TIMEOUT':
    return 'blue-grey'
  case 'RUNNING':
    return 'info'
  case 'SUCCESS':
    return 'success'
  case 'ENQUEUE':
    return 'info'
  }
})

Vue.filter('datefmt', function (val, fmtstring) {
  return moment(val).format(fmtstring)
})

new Vue({
  i18n: new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages
  }),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
