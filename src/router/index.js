import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/feed",
    name: "default-layout",
    component: () => import("../layouts/LayoutDefault"),
    children: [
      {
        path: "/feed",
        name: "feed",
        component: () => import("../views/Feed"),
      },
      {
        path: "/groups",
        name: "groups",
        component: () => import("../views/Groups"),
      },
      {
        path: "/chat",
        name: "chat",
        component: () => import("../views/Chat"),
      },
      {
        path: "/store",
        name: "store",
        component: () => import("../views/Store"),
      },
      {
        path: "/notifications",
        name: "notifications",
        component: () => import("../views/Notifications"),
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/Signup.vue")
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/Test.vue")
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
