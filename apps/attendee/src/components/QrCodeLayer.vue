<template>
  <Teleport to="body">
    <Transition name="sheet-slide">
      <div v-if="open" class="sheet-mask" @click.self="$emit('update:open', false)">
        <section class="sheet">
          <button type="button" class="sheet-close" @click="$emit('update:open', false)">关闭</button>
          <h3>{{ title }}</h3>
          <p>{{ subtitle }}</p>

          <div class="qr-card">
            <div class="qr-grid" aria-hidden="true"></div>
            <strong>{{ code }}</strong>
          </div>

          <button type="button" class="save-btn" @click="$emit('save')">保存二维码</button>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineEmits<{
  (event: 'update:open', value: boolean): void
  (event: 'save'): void
}>();

withDefaults(defineProps<{
  open: boolean
  title: string
  subtitle: string
  code: string
}>(), {});
</script>

<style scoped lang="scss">
.sheet-mask {
  position: fixed;
  inset: 0;
  z-index: 55;
  display: grid;
  align-items: end;
  background: rgba(14, 19, 33, 0.5);
}

.sheet {
  width: min(100%, 430px);
  margin: 0 auto;
  border-radius: 22px 22px 0 0;
  padding: 1rem 1rem calc(1rem + var(--safe-area-inset-bottom));
  background: white;
}

.sheet-close {
  float: right;
  border: none;
  background: transparent;
  color: var(--text-light);
}

h3 {
  clear: both;
  margin: 0.2rem 0 0;
  color: var(--text-default);
  font-size: 1.1rem;
}

p {
  margin: 0.5rem 0 1rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.qr-card {
  padding: 1rem;
  border-radius: 18px;
  background: #f4f7f8;
  display: grid;
  justify-items: center;
  gap: 0.8rem;
}

.qr-grid {
  width: min(74vw, 260px);
  aspect-ratio: 1;
  border-radius: 12px;
  background:
    linear-gradient(90deg, #1f2937 8px, transparent 8px) 0 0 / 16px 16px,
    linear-gradient(#1f2937 8px, transparent 8px) 0 0 / 16px 16px,
    #fff;
  box-shadow: inset 0 0 0 8px #fff;
}

.qr-card strong {
  color: #1f2937;
}

.save-btn {
  width: 100%;
  margin-top: 1rem;
  min-height: 44px;
  border: none;
  border-radius: 12px;
  background: var(--wechat-green);
  color: white;
  font-weight: 700;
}

.sheet-slide-enter-active,
.sheet-slide-leave-active {
  transition: opacity 0.22s ease;
}

.sheet-slide-enter-active .sheet,
.sheet-slide-leave-active .sheet {
  transition: transform 0.22s ease;
}

.sheet-slide-enter-from,
.sheet-slide-leave-to {
  opacity: 0;
}

.sheet-slide-enter-from .sheet,
.sheet-slide-leave-to .sheet {
  transform: translateY(28px);
}
</style>
