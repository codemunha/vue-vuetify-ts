import { addRoute } from './routes'

addRoute(
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        meta: {
          screen: '',
          hasPermission: '',
          breadcrumb: [
            {
              text: 'home',
              href: '/',
              disabled: true
            }
          ]
        }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
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
              text: 'about',
              href: '/about',
              disabled: true
            }
          ]
        }
      }
    ]
  }
)