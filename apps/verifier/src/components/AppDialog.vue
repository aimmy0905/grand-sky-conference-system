<template>
  <Teleport to="body">
    <Transition name="dialog-fade">
      <div v-if="open" class="dialog-mask" @click.self="$emit('update:open', false)">
        <section class="dialog-panel">
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
          <div class="dialog-actions">
            <button type="button" class="dialog-btn dialog-btn--light" @click="$emit('update:open', false)">
              取消
            </button>
            <button type="button" class="dialog-btn dialog-btn--brand" @click="$emit('confirm')">
              {{ confirmText }}
            </button>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineEmits<{
  (event: 'update:open', value: boolean): void
  (event: 'confirm'): void
}>();

withDefaults(defineProps<{
  open: boolean
  title: string
  description: string
  confirmText?: string
}>(), {
  confirmText: '确定',
});
</script>

<style scoped lang="scss">
.dialog-mask {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
}

.dialog-panel {
  width: min(100%, 340px);
  border-radius: 20px;
  padding: 1.2rem;
  background: white;
}

h3 {
  margin: 0;
  color: var(--text-default);
  font-size: 1.07rem;
}

p {
  margin: 0.75rem 0 1rem;
  color: var(--text-muted);
  line-height: 1.7;
  font-size: 0.9rem;
}

.dialog-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.65rem;
}

.dialog-btn {
  min-height: 42px;
  border: none;
  border-radius: 12px;
}

.dialog-btn--light {
  background: #f2f5f7;
  color: var(--text-muted);
}

.dialog-btn--brand {
  background: var(--wechat-green);
  color: white;
  font-weight: 700;
}

.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.2s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}
</style>
