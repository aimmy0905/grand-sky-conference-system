<template>
  <div class="app-page">
    <AppHeader title="资料预览" back />

    <main class="app-page__body">
      <section class="preview-card">
        <h1>{{ material?.name || '资料不存在' }}</h1>
        <p v-if="material">{{ material.category }} · {{ material.size }} · {{ material.updatedAt }}</p>

        <article v-if="material" class="preview-panel">
          <div class="preview-sign">{{ material.type.toUpperCase() }}</div>
          <h3>预览摘要</h3>
          <p>{{ material.previewSummary }}</p>
        </article>

        <EmptyState
          v-else
          icon="x"
          title="未找到资料"
          description="链接可能已失效，请返回资料列表重试。"
        />

        <div class="actions" v-if="material">
          <button type="button" class="btn btn--light" @click="showToast('资料下载中，稍后可在下载列表查看')">下载</button>
          <button type="button" class="btn btn--brand" @click="showToast('已加入我的资料')">收藏</button>
        </div>
      </section>
    </main>

    <p v-if="toastText" class="toast">{{ toastText }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '../components/AppHeader.vue';
import EmptyState from '../components/EmptyState.vue';
import { materials } from '../data/mock';

const route = useRoute();
const toastText = ref('');
const material = materials.find((item) => item.id === route.params.id);

const showToast = (text: string) => {
  toastText.value = text;
  setTimeout(() => {
    toastText.value = '';
  }, 1400);
};
</script>

<style scoped lang="scss">
.app-page {
  min-height: 100vh;
  max-width: 430px;
  margin: 0 auto;
  background: white;
}

.app-page__body {
  min-height: calc(100vh - 48px);
  padding: 1rem;
  background: var(--surface-page);
}

.preview-card {
  border-radius: 22px;
  padding: 1rem;
  background: white;
  box-shadow: var(--shadow-card);
}

h1 {
  margin: 0;
  font-size: 1.15rem;
  color: #11253d;
}

.preview-card > p {
  margin: 0.45rem 0 0.95rem;
  color: var(--text-muted);
}

.preview-panel {
  border-radius: 14px;
  background: #f7fafc;
  padding: 0.9rem;
}

.preview-sign {
  width: fit-content;
  border-radius: 999px;
  background: #ffe7d7;
  color: #cc5c1f;
  padding: 0.2rem 0.55rem;
  font-size: 0.75rem;
}

h3 {
  margin: 0.55rem 0 0;
  font-size: 1rem;
}

.preview-panel p {
  margin: 0.5rem 0 0;
  line-height: 1.75;
  color: var(--text-muted);
}

.actions {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.65rem;
}

.btn {
  min-height: 42px;
  border: none;
  border-radius: 12px;
}

.btn--light {
  background: #eef3f7;
  color: var(--text-muted);
}

.btn--brand {
  background: var(--wechat-green);
  color: white;
  font-weight: 700;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 1.2rem;
  transform: translateX(-50%);
  margin: 0;
  border-radius: 999px;
  padding: 0.45rem 0.75rem;
  color: white;
  font-size: 0.8rem;
  background: rgba(17, 24, 39, 0.85);
}
</style>
