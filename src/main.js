// Polyfills for IE11 and other browsers
import "babel-polyfill"

import Vue from 'vue'
import App from './App'
import store from './assets/js/store';

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
