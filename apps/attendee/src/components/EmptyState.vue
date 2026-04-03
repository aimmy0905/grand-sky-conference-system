<template>
  <section class="empty-state">
    <div class="empty-state__icon">{{ icon }}</div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <button v-if="actionText" type="button" class="empty-state__action" @click="$emit('action')">
      {{ actionText }}
    </button>
  </section>
</template>

<script setup lang="ts">
defineEmits<{
  (event: 'action'): void
}>();

withDefaults(defineProps<{
  icon?: string
  title: string
  description: string
  actionText?: string
}>(), {
  icon: '::',
  actionText: '',
});
</script>

<style scoped lang="scss">
.empty-state {
  display: grid;
  justify-items: center;
  gap: 0.5rem;
  padding: 1.6rem 1rem;
  border-radius: 18px;
  background: #f8f9fa;
  border: 1px dashed #e0d4c4;
}

.empty-state__icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--wechat-green-dark);
  background: rgba(7, 193, 96, 0.12);
  font-size: 1.2rem;
  font-weight: 700;
}

h3 {
  margin: 0.2rem 0 0;
  color: var(--text-default);
  font-size: 1rem;
}

p {
  margin: 0;
  color: var(--text-muted);
  text-align: center;
  line-height: 1.6;
  font-size: 0.88rem;
}

.empty-state__action {
  margin-top: 0.2rem;
  min-height: 34px;
  border: none;
  border-radius: 999px;
  padding: 0 1rem;
  background: rgba(7, 193, 96, 0.15);
  color: var(--wechat-green-dark);
}
</style>
