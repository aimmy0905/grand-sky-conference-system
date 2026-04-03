<template>
  <nav class="bottom-nav">
    <RouterLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="bottom-nav__item"
      :class="{ active: item.match.some((entry) => route.path.startsWith(entry)) }"
    >
      <span class="bottom-nav__icon"><AppIcon :name="item.icon" :size="17" /></span>
      <span>{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import AppIcon from './AppIcon.vue';

const route = useRoute();

const items: Array<{ label: string; to: string; icon: 'meeting' | 'hotel' | 'message' | 'profile'; match: string[] }> = [
  { label: '会议', to: '/meetings', icon: 'meeting', match: ['/meetings', '/meeting-create', '/meeting-detail', '/materials', '/receipts', '/analytics'] },
  { label: '会议室', to: '/rooms', icon: 'hotel', match: ['/rooms'] },
  { label: '消息', to: '/messages', icon: 'message', match: ['/messages'] },
  { label: '我的', to: '/profile', icon: 'profile', match: ['/profile'] },
];
</script>

<style scoped lang="scss">
.bottom-nav {
  position: sticky;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0.45rem 0 calc(0.2rem + var(--safe-area-inset-bottom));
  border-top: 1px solid var(--surface-line);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(22px);
}

.bottom-nav__item {
  display: grid;
  place-items: center;
  gap: 0.15rem;
  min-height: 56px;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.8rem;
  border-radius: 10px;
  margin: 0 0.2rem;
}

.bottom-nav__icon {
  display: inline-grid;
  place-items: center;
  width: 24px;
  height: 24px;
  color: currentColor;
}

.bottom-nav__item.active {
  color: var(--wechat-green-dark);
  font-weight: 700;
  background: rgba(245, 240, 232, 0.5);
}

.bottom-nav__item.active .bottom-nav__icon {
  color: var(--wechat-green-dark);
}
</style>
