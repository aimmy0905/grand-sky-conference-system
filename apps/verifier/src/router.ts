import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import SystemWorkspace from '@shared/components/SystemWorkspace.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/:pageSlug?',
    name: 'verifier',
    component: SystemWorkspace,
    props: (route: RouteLocationNormalized) => ({
      systemId: 'verifier',
      pageSlug: route.params.pageSlug,
    }),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});
