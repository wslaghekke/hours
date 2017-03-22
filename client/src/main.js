import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import App from './App'
import router from './router'

import 'bulma'
import 'font-awesome/scss/font-awesome.scss'

Vue.use(AsyncComputed)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  created () {
    console.log('Created vue app on ', this)
  }
})
