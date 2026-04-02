import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import BindPhoneView from './views/BindPhoneView.vue';
import HomeView from './views/HomeView.vue';
import LoginView from './views/LoginView.vue';
import MaterialsView from './views/MaterialsView.vue';
import MeetingDetailView from './views/MeetingDetailView.vue';
import MessageCenterView from './views/MessageCenterView.vue';
import ProfileView from './views/ProfileView.vue';
import ReceiptFormView from './views/ReceiptFormView.vue';

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
    path: '/meeting-detail',
    name: 'meeting-detail',
    component: MeetingDetailView,
  },
  {
    path: '/materials',
    name: 'materials',
    component: MaterialsView,
  },
  {
    path: '/messages',
    name: 'messages',
    component: MessageCenterView,
  },
  {
    path: '/receipt',
    name: 'receipt',
    component: ReceiptFormView,
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
