import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from "@/views/DashboardView";
import RegisterView from "@/views/RegisterView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/enter',
    name: 'enter',
    component: () => import(/* webpackChunkName: "about" */ '../views/EnterView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(localStorage.getItem('admin-token')) {
      next()
    } else {
      next({ name: 'enter' })
    }
  } else {
    next()
  }
})

export default router
