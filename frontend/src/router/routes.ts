import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLogin.vue'),
    children: [
      { path: '', component: () => import('pages/login/Inicial.vue') },
      { path: 'login', component: () => import('pages/login/Login.vue') },
      { path: 'register', component: () => import('pages/register/Register.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLogin.vue'),
    children: [
      { path: 'truck', component: () => import('pages/truck/Truck.vue') },
      { path: 'agradece', component: () => import('pages/point/Agradece.vue') },
      { path: 'verde', component: () => import('pages/point/Agradece.vue') },
      { path: 'vermelho', component: () => import('pages/point/Agradece.vue') }
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
