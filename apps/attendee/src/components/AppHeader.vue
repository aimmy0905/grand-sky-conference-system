<template>
  <header class="app-header">
    <button v-if="back" type="button" class="app-header__back" @click="router.back()">‹</button>
    <span v-else class="app-header__back app-header__back--ghost">‹</span>
    <strong>{{ title }}</strong>
    <span class="app-header__more">{{ rightText }}</span>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

withDefaults(defineProps<{
  title: string
  back?: boolean
  rightText?: string
}>(), {
  back: false,
  rightText: '',
});

const router = useRouter();
</script>

<style scoped lang="scss">
.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: grid;
  grid-template-columns: 32px 1fr 48px;
  align-items: center;
  gap: 0.75rem;
  padding: 0.95rem 1rem;
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid var(--surface-line);
}

.app-header strong {
  text-align: center;
  color: var(--brand-navy);
  font-size: 1.05rem;
}

.app-header__back,
.app-header__more {
  color: var(--text-muted);
  font-size: 1rem;
}

.app-header__back {
  border: none;
  padding: 0;
  background: transparent;
  text-align: left;
}

.app-header__back--ghost {
  visibility: hidden;
}

.app-header__more {
  text-align: right;
  font-size: 0.82rem;
}
</style>
