import Vue from "vue"
import Vuex from "vuex"

import timeline from "@/store/modules/timeline"
import user from '@/store/modules/user';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    timeline,
    user
  }
})
