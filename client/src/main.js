import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import App from './App'
import router from './router'

import 'bulma'
import 'font-awesome/scss/font-awesome.scss'

const PouchDB = require('pouchdb-browser')
PouchDB.plugin(require('pouchdb-find'))
PouchDB.plugin(require('pouchdb-live-find'))

window.PouchDB = PouchDB

Vue.use(AsyncComputed)
Vue.config.productionTip = false
Vue.use(require('vue-pouch'), {
  pouch: PouchDB    // optional if `PouchDB` is available on the global object
  // defaultDB:         // the database to use if none is specified in the pouch setting of the vue component
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  created () {
    console.log('Created vue app on ', this)
  }
})
