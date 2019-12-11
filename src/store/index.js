import Vue from "vue"
import Vuex from "vuex"
import config from "../config/firebase.config"
import * as firebase from "firebase"

firebase.initializeApp(config)

import timeline from "@/store/modules/timeline"
import user from "@/store/modules/user"
import search from "@/store/modules/search"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    timeline,
    user,
    search
  }
})

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("user/fetchUser", user)
})

export default store
