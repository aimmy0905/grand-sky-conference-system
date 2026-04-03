import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import BindPhoneView from './views/BindPhoneView.vue';
import BrandStoryView from './views/BrandStoryView.vue';
import ContactUsView from './views/ContactUsView.vue';
import CouponsView from './views/CouponsView.vue';
import HomeView from './views/HomeView.vue';
import LoginView from './views/LoginView.vue';
import MaterialsView from './views/MaterialsView.vue';
import MeetingDetailView from './views/MeetingDetailView.vue';
import MeetingRecordsView from './views/MeetingRecordsView.vue';
import MessageCenterView from './views/MessageCenterView.vue';
import NearbyGuideView from './views/NearbyGuideView.vue';
import ProfileView from './views/ProfileView.vue';
import ReceiptFormView from './views/ReceiptFormView.vue';
import SignScanView from './views/SignScanView.vue';

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
    path: '/sign-scan',
    name: 'sign-scan',
    component: SignScanView,
  },
  {
    path: '/materials',
    name: 'materials',
    component: MaterialsView,
  },
  {
    path: '/coupons',
    name: 'coupons',
    component: CouponsView,
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
  {
    path: '/meeting-records',
    name: 'meeting-records',
    component: MeetingRecordsView,
  },
  {
    path: '/brand-story',
    name: 'brand-story',
    component: BrandStoryView,
  },
  {
    path: '/contact-us',
    name: 'contact-us',
    component: ContactUsView,
  },
  {
    path: '/nearby-guide',
    name: 'nearby-guide',
    component: NearbyGuideView,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});
