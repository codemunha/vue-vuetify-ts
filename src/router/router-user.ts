import { addRoute } from '@/router/routes'

addRoute({
  path: '/',
  redirect: '/home',
  component: () => import('@/layouts/MainLayout.vue'),
  children: [
    {
      path: '/user',
      name: 'user',
      component: () => import(/* webpackChunkName: "user" */ '@/views/app/user/User.vue'),
      meta: {
        screen: '',
        hasPermission: '',
        breadcrumb: [
          {
            text: 'home',
            href: '/',
            disabled: false
          },
          {
            text: 'user',
            href: '/user',
            disabled: true
          }
        ]
      }
    },
    {
      path: '/user/detail',
      name: 'user-detail',
      component: () => import(/* webpackChunkName: "user" */ '@/views/app/user/UserDetail.vue'),
      meta: {
        screen: '',
        hasPermission: '',
        breadcrumb: [
          {
            text: 'home',
            href: '/',
            disabled: false
          },
          {
            text: 'user detail',
            href: '/user/detail',
            disabled: true
          }
        ]
      }
    }
  ]
})