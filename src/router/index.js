import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/echartDemo1',
    name: 'echartDemo1',
    component: () => import(/* webpackChunkName: "echartDemo1" */ '../views/echartDemo1.vue')
  },
  {
    path: '/echartDemo2',
    name: 'echartDemo2',
    component: () => import(/* webpackChunkName: "echartDemo2" */ '../views/echartDemo2.vue')
  },
  {
    path: '/echartDemo3',
    name: 'echartDemo3',
    component: () => import(/* webpackChunkName: "echartDemo3" */ '../views/echartDemo3.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
