import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import BindPhoneView from './views/BindPhoneView.vue';
import HomeView from './views/HomeView.vue';
import LoginView from './views/LoginView.vue';
import ProfileView from './views/ProfileView.vue';
import RecordsView from './views/RecordsView.vue';
import ScannerView from './views/ScannerView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/bind-phone',
    name: 'bind-phone',
    component: BindPhoneView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/scanner',
    name: 'scanner',
    component: ScannerView,
  },
  {
    path: '/records',
    name: 'records',
    component: RecordsView,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});
