import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import(/* webpackChunkName: "MainLayout" */ '@/views/layouts/MainLayout.vue'),
    children: [
      {
        name: 'home',
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
      },
      {
        name: 'about',
        path: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
