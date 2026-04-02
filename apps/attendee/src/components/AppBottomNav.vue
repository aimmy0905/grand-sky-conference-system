<template>
  <nav class="bottom-nav">
    <RouterLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="bottom-nav__item"
      :class="{ active: route.path === item.to }"
    >
      <span>{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

const items = [
  { label: '首页', to: '/home' },
  { label: '消息', to: '/messages' },
  { label: '我的', to: '/profile' },
];
</script>

<style scoped lang="scss">
.bottom-nav {
  position: sticky;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0.45rem 0 0.2rem;
  border-top: 1px solid var(--surface-line);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(18px);
}

.bottom-nav__item {
  display: grid;
  place-items: center;
  gap: 0.2rem;
  min-height: 56px;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.85rem;
}

.bottom-nav__item.active {
  color: var(--brand-gold-dark);
  font-weight: 700;
}
</style>
