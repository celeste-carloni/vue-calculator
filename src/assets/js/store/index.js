import Vue from "vue"
import Vuex from "vuex"

import operations from "./modules/operations"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    operations
  }
})

export default store