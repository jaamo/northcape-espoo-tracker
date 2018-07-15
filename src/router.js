import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import RouteMap from './views/RouteMap.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RouteMap',
      component: RouteMap
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: About
    // },
    // {
    //   path: '/list',
    //   name: 'list',
    //   component: List
    // }
  ]
})
