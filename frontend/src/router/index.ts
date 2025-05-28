import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LandingPage from '../views/LandingPage.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import DashboardView from '../views/dashboard/DashboardView.vue'
import ProductsView from '../views/products/ProductsView.vue'
import ProductCreateView from '../views/products/ProductCreateView.vue'
import ProductEditView from '../views/products/ProductEditView.vue'
// import SalesView from '../views/sales/SalesView.vue'
// import SaleCreateView from '../views/sales/SaleCreateView.vue'
// import SaleDetailView from '../views/sales/SaleDetailView.vue'
// import ReportsView from '../views/reports/ReportsView.vue'
// import UsersView from '../views/users/UsersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresAuth: false }
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/products/create',
      name: 'product-create',
      component: ProductCreateView,
      meta: { requiresAuth: true, roles: ['owner', 'admin'] }
    },
    {
      path: '/products/:id/edit',
      name: 'product-edit',
      component: ProductEditView,
      meta: { requiresAuth: true, roles: ['owner', 'admin'] }
    },
    // {
    //   path: '/sales',
    //   name: 'sales',
    //   component: SalesView,
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/sales/create',
    //   name: 'sale-create',
    //   component: SaleCreateView,
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/sales/:id',
    //   name: 'sale-detail',
    //   component: SaleDetailView,
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/reports',
    //   name: 'reports',
    //   component: ReportsView,
    //   meta: { requiresAuth: true, roles: ['owner', 'admin'] }
    // },
    // {
    //   path: '/users',
    //   name: 'users',
    //   component: UsersView,
    //   meta: { requiresAuth: true, roles: ['owner', 'admin'] }
    // }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth
  const requiredRoles = to.meta.roles as string[] | undefined

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (requiredRoles && !requiredRoles.includes(authStore.userRole)) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router