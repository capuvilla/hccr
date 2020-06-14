import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLogin.vue'),
    children: [
      { path: '', component: () => import('pages/login/Login.vue') },
      { path: 'login', component: () => import('pages/login/Login.vue') },
      { path: 'register', component: () => import('pages/register/Register.vue') },
      { path: 'truck', component: () => import('pages/truck/Truck.vue') }
    ]
  },
  {
    path: '/mapa',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Mapa.vue') }]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
