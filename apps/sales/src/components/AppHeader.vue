<template>
  <header class="app-header">
    <button v-if="back" type="button" class="app-header__back" @click="router.back()">
      <AppIcon name="back" :size="17" />
    </button>
    <span v-else class="app-header__back app-header__back--ghost">
      <AppIcon name="back" :size="17" />
    </span>
    <strong>{{ title }}</strong>
    <button v-if="rightText" type="button" class="app-header__more" @click="emit('right-click')">{{ rightText }}</button>
    <span v-else class="app-header__more app-header__more--ghost">占位</span>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import AppIcon from './AppIcon.vue';

const emit = defineEmits<{
  (event: 'right-click'): void
}>();

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
  grid-template-columns: 36px 1fr 56px;
  align-items: center;
  gap: 0.75rem;
  min-height: 48px;
  padding: 0.15rem 1rem;
  background: rgba(255, 255, 255, 0.98);
  border-bottom: 1px solid var(--surface-line);
  backdrop-filter: blur(12px);
}

.app-header::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(200, 169, 126, 0.45), transparent);
}

.app-header strong {
  text-align: center;
  color: #121826;
  font-size: 1.06rem;
  font-weight: 700;
}

.app-header__back,
.app-header__more {
  color: var(--text-muted);
}

.app-header__back {
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #f7f8fa;
  display: grid;
  place-items: center;
}

.app-header__back--ghost {
  visibility: hidden;
}

.app-header__more {
  border: none;
  background: transparent;
  text-align: right;
  font-size: 0.84rem;
}

.app-header__more--ghost {
  visibility: hidden;
}
</style>
