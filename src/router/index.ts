import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'

import './router-user'
import './router-home'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

export default router
