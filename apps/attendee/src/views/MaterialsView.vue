<template>
  <div class="app-page">
    <AppHeader title="会议资料" back />

    <main class="app-page__body">
      <section class="section-card">
        <div class="section-head">
          <h1>资料列表</h1>
          <span>{{ activeList.length }} 份</span>
        </div>

        <div class="material-tabs">
          <button
            v-for="tab in tabs"
            :key="tab"
            type="button"
            :class="{ active: currentTab === tab }"
            @click="currentTab = tab"
          >
            {{ tab }}
          </button>
        </div>

        <div v-if="loading" class="skeleton-row" aria-hidden="true"></div>
        <article v-for="item in activeList" v-else :key="item.id" class="material-row">
          <div>
            <strong>{{ item.name }}</strong>
            <p>{{ item.category }} · {{ item.size }} · {{ item.updatedAt }}</p>
          </div>
          <div class="actions">
            <button type="button" @click="previewMaterial(item.name, item.previewSummary)">
              <AppIcon name="preview" :size="14" />预览
            </button>
            <button type="button" @click="downloadMaterial(item.name)">
              <AppIcon name="download" :size="14" />下载
            </button>
          </div>
        </article>

        <EmptyState
          v-if="!loading && activeList.length === 0"
          icon=".."
          title="暂无此类资料"
          description="会务上传后将自动展示到这里。"
        />
      </section>
    </main>

    <AppDialog
      v-model:open="previewOpen"
      :title="previewTitle"
      :description="previewDescription"
      confirm-text="关闭"
      @confirm="previewOpen = false"
    />

    <p v-if="toastText" class="toast">{{ toastText }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import AppDialog from '../components/AppDialog.vue';
import AppHeader from '../components/AppHeader.vue';
import AppIcon from '../components/AppIcon.vue';
import EmptyState from '../components/EmptyState.vue';
import { materials } from '../data/mock';

const tabs = ['全部', '议程', '会议文件', '座位图'];
const currentTab = ref('全部');
const loading = ref(true);
const previewOpen = ref(false);
const previewTitle = ref('资料预览');
const previewDescription = ref('暂无内容');
const toastText = ref('');
const activeList = computed(() => currentTab.value === '全部'
  ? materials
  : materials.filter((item) => item.category === currentTab.value));

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 450);
});

const previewMaterial = (name: string, summary: string) => {
  previewTitle.value = `${name}（预览）`;
  previewDescription.value = summary;
  previewOpen.value = true;
};

const downloadMaterial = (name: string) => {
  toastText.value = `${name} 下载已开始`;
  setTimeout(() => {
    toastText.value = '';
  }, 1500);
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
  padding: 1rem;
  background: var(--surface-page);
}

.section-card {
  padding: 1rem;
  border-radius: 22px;
  background: white;
  box-shadow: var(--shadow-card);
}

.section-card h1 {
  margin: 0;
  color: #12253d;
  font-size: 1.15rem;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.6rem;
}

.section-head span {
  color: var(--text-light);
  font-size: 0.82rem;
}

.material-tabs {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 0.45rem;
}

.material-tabs button {
  min-height: 32px;
  border: none;
  border-radius: 999px;
  background: #eef2f6;
  color: var(--text-muted);
  padding: 0 0.8rem;
  font-size: 0.8rem;
}

.material-tabs button.active {
  color: var(--wechat-green-dark);
  background: var(--wechat-green-soft);
}

.material-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--surface-line);
  text-decoration: none;
  color: inherit;
}

.material-row:last-child {
  border-bottom: none;
}

.material-row p {
  margin: 0.25rem 0 0;
  color: var(--text-muted);
}

.material-row button {
  min-width: 64px;
  min-height: 34px;
  border: 1px solid var(--brand-gold);
  border-radius: 8px;
  background: white;
  color: var(--brand-gold-dark);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.actions {
  display: flex;
  gap: 0.42rem;
}

.skeleton-row {
  height: 88px;
  border-radius: 14px;
  background:
    linear-gradient(100deg, #edf2f6 30%, #f7fafc 45%, #edf2f6 60%)
    0 0 / 220% 100%;
  animation: loading 1.15s infinite;
}

@keyframes loading {
  to {
    background-position: -200% 0;
  }
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 1.2rem;
  transform: translateX(-50%);
  margin: 0;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  background: rgba(17, 24, 39, 0.84);
  color: white;
  font-size: 0.8rem;
}
</style>
