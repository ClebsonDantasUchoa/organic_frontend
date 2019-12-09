import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bulma/bulma.sass'
import '@fortawesome/fontawesome-free/css/all.css'
import * as firebase from "firebase";

import "./assets/css/_reset.sass"
import "bulma/bulma.sass"
import "@fortawesome/fontawesome-free/css/all.css"

import PerfectScrollbar from "vue2-perfect-scrollbar"
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"

Vue.use(PerfectScrollbar)

Vue.config.productionTip = false

const configOptions = {
  apiKey: "AIzaSyBeEKZ77fbhnITFg0ziVrjgzcugzET7itg",
  authDomain: "organic-f2d90.firebaseapp.com",
  databaseURL: "https://organic-f2d90.firebaseio.com",
  projectId: "organic-f2d90",
  storageBucket: "organic-f2d90.appspot.com",
  messagingSenderId: "432791562597",
  appId: "1:432791562597:web:adcf80046a25c5d365998c",
  measurementId: "G-TTBZGCGG3D"
};

firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("user/fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
