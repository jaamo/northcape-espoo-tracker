import Vue from 'vue'
import Router from 'vue-router'
import RouteMap from './views/RouteMap.vue'
import Location from './views/Location.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RouteMap',
      component: RouteMap
    },
    {
      path: '/location',
      name: 'location',
      component: Location
    },
    // {
    //   path: '/list',
    //   name: 'list',
    //   component: List
    // }
  ]
})
