import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/LandingPage.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/dashboard/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/products/ProductsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/products/create',
      name: 'product-create',
      component: () => import('../views/products/ProductCreateView.vue'),
      meta: { requiresAuth: true, roles: ['owner', 'admin'] }
    },
    {
      path: '/products/:id/edit',
      name: 'product-edit',
      component: () => import('../views/products/ProductEditView.vue'),
      meta: { requiresAuth: true, roles: ['owner', 'admin'] }
    },
    {
      path: '/sales',
      name: 'sales',
      component: () => import('../views/sales/SalesView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/sales/create',
      name: 'sale-create',
      component: () => import('../views/sales/SaleCreateView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/sales/:id',
      name: 'sale-detail',
      component: () => import('../views/sales/SaleDetailView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('../views/reports/ReportsView.vue'),
      meta: { requiresAuth: true, roles: ['owner', 'admin'] }
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/users/UsersView.vue'),
      meta: { requiresAuth: true, roles: ['owner', 'admin'] }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/dashboard'
    }
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.meta.requiresAuth;
  const requiredRoles = to.meta.roles as string[] | undefined;

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else if (requiredRoles && !requiredRoles.includes(authStore.userRole)) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;