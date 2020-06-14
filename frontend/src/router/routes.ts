import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'mapa', component: () => import('pages/Mapa.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/MainLogin.vue'),
    children: [
      { path: '', component: () => import('pages/login/Login.vue') },
      { path: 'cadastro', component: () => import('pages/cadastro/Cadastro.vue') }
    ]
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
