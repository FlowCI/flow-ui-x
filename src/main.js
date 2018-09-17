// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import messages from './i18n/index'
import store from './api/index'

import 'babel-polyfill'
import 'vuetify/dist/vuetify.min.css'
import './assets/styles/style.scss'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueI18n)
// Vue.use(VueResource)

// Vue.http.headers.common['Token'] = 'helloflowciadmin'
/* eslint-disable no-new */
new Vue({
  i18n: new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages
  }),
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
