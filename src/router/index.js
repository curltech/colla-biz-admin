import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import { config, PeerMode, routerMenu, myself } from 'libcolla'
import * as cookie from 'tiny-cookie'

Vue.use(VueRouter)

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * If you decide to go with "history" mode, please also set "build.publicPath"
   * to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({
    y: 0
  }),
  routes
})

const whiteList = ['/login', '/logout', '/403', '/', '/workspace','/rbac/user','/basecode/basecode','/stock/share','/stock/shareIndex'] // 设置白名单，避免死循环

// 地址栏改变，比$route(to)先触发
Router.beforeEach(async (to, from, next) => {
  if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
    next()
    return
  }

  let isLogin = false
  let token = cookie.getCookie('token')
  if (config.appParams.mode === PeerMode.Client && token) {
    isLogin = true
  }
  if (config.appParams.mode === PeerMode.P2pPeer && myself.myselfPeer) {
    isLogin = true
  }
  // 已经登录
  if (isLogin === true) {
    next()
  } else { // 没有登录
    next('/login')
  }
  routerMenu.title = to.name
})

Router.afterEach((to) => {
  window.scrollTo(0, 0)
})

export default Router
