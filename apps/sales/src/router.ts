import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import AnalyticsView from './views/AnalyticsView.vue';
import BindPhoneView from './views/BindPhoneView.vue';
import LoginView from './views/LoginView.vue';
import MaterialsView from './views/MaterialsView.vue';
import MeetingFormView from './views/MeetingFormView.vue';
import MeetingDetailView from './views/MeetingDetailView.vue';
import MeetingsView from './views/MeetingsView.vue';
import MessageCreateView from './views/MessageCreateView.vue';
import MessagesView from './views/MessagesView.vue';
import ProfileView from './views/ProfileView.vue';
import ReceiptsView from './views/ReceiptsView.vue';
import RoomsView from './views/RoomsView.vue';

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
    path: '/meetings',
    name: 'meetings',
    component: MeetingsView,
  },
  {
    path: '/rooms',
    name: 'rooms',
    component: RoomsView,
  },
  {
    path: '/meeting-create',
    name: 'meeting-create',
    component: MeetingFormView,
  },
  {
    path: '/meeting-detail/:id',
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
    component: MessagesView,
  },
  {
    path: '/message-create',
    name: 'message-create',
    component: MessageCreateView,
  },
  {
    path: '/receipts',
    name: 'receipts',
    component: ReceiptsView,
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: AnalyticsView,
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
