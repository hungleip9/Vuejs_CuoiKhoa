import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/path',
    name: 'Home',
    component: () => import('../layouts/AdminLayout'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/Home')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/UserSetting')
      },
    ]
  },
  {
    path: '/',
    component: () => import('../layouts/LoginLayout'),
    children: [
      {
        path: '/',
        name: 'Login',
        component: () => import('../views/LoginForm')
      },
      {
        path: 'forgot-password',
        name: 'Forgot',
        component: () => import('../views/ForgotPasswordForm')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../views/Register')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.state.auth.isAuthenticated && to.name !== 'Register') {
    next({ name: 'Login' || 'Register'})
  } else {
    next()
  }
})

export default router
