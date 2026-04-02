import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '@/views/404.vue';
import HubView from '@/views/HubView.vue';
import SystemPrototypeView from '@/views/SystemPrototypeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'hub',
    component: HubView,
  },
  {
    path: '/attendee/:pageSlug?',
    name: 'attendee',
    component: SystemPrototypeView,
    props: (route: RouteLocationNormalized) => ({
      systemId: 'attendee',
      pageSlug: route.params.pageSlug,
    }),
  },
  {
    path: '/verifier/:pageSlug?',
    name: 'verifier',
    component: SystemPrototypeView,
    props: (route: RouteLocationNormalized) => ({
      systemId: 'verifier',
      pageSlug: route.params.pageSlug,
    }),
  },
  {
    path: '/sales/:pageSlug?',
    name: 'sales',
    component: SystemPrototypeView,
    props: (route: RouteLocationNormalized) => ({
      systemId: 'sales',
      pageSlug: route.params.pageSlug,
    }),
  },
  {
    path: '/admin/:pageSlug?',
    name: 'admin',
    component: SystemPrototypeView,
    props: (route: RouteLocationNormalized) => ({
      systemId: 'admin',
      pageSlug: route.params.pageSlug,
    }),
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: NotFound,
  },
].filter(Boolean) as Array<RouteRecordRaw>;

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { top: 0 };
  },
});

export default router;
