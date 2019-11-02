import Vue from 'vue'
import { mapState } from 'vuex'
import VueI18n from 'vue-i18n'
import VueNotifications from 'vue-notification'
import VueClipboard from 'vue-clipboard2'

import App from './App'

import router from './router'
import messages from './i18n/index'
import store from './store/index'
import actions from './store/actions'
import code from './util/code'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

import 'babel-polyfill'
import './assets/styles/style.scss'

import 'xterm/dist/xterm.css'
import { Terminal } from 'xterm'
import * as fit from 'xterm/lib/addons/fit/fit'

Terminal.applyAddon(fit)

Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true

Vue.use(Vuetify)
Vue.use(VueI18n)
Vue.use(VueNotifications)
Vue.use(VueClipboard)

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

Vue.mixin({
  computed: {
    ...mapState({
      user: state => state.auth.user,
      hasLogin: state => state.auth.hasLogin
    }),

    isLoginPage () {
      return this.$route.name === 'Login'
    },

    appVersion () {
      return process.env.APP_VERSION
    }
  },
  methods: {
    redirectToLogin () {
      if (!this.isLoginPage) {
        this.$router.replace('/login')
      }
    },

    showSnackBar (text, color) {
      color = color || 'info'
      this.$store.commit(actions.app.showSnackbar, {text, color})
    }
  }
})

new Vue({
  i18n: new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages
  }),
  vuetify: new Vuetify({
    icons: {
      iconfont: 'mdi',
    },
  }),
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    this.$store.dispatch(actions.auth.load)
      .then(() => {
        console.log('token has been loaded...')
      })
      .catch((err) => {
        // error handling on load will be on the global
      })
  },
  computed: {
    ...mapState({
      error: state => state.err.error
    })
  },
  watch: {
    error: {
      immediate: true,
      handler: function (value) {
        if (value.code === code.error.auth) {
          this.redirectToLogin()
        }
      }
    }
  }
}).$mount('#app')
