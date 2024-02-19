import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { useAppStore } from '@/store/app';
import authService from '@/services/authService';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  extendRoutes: setupLayouts,
})

router.beforeEach((to: string, from: string, next: string) => {

  const appStore = useAppStore();

  const isAuthenticated = appStore.isLoggedIn;

  if (appStore.accessToken) {
    authService.validateToken(appStore.accessToken)
  }

  const requiresAuth = to.meta.requiredAuth

  if (!requiresAuth && !isAuthenticated) {
    next();
  }

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  }

  if (requiresAuth && isAuthenticated) {
    next();
  }

});

export default router
