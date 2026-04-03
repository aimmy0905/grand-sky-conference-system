<template>
  <div class="app-page">
    <AppHeader title="会议详情" back />

    <main class="app-page__body">
      <section class="hero-card">
        <span class="status-chip">{{ currentMeeting.status }}</span>
        <h1>{{ currentMeeting.name }}</h1>
        <p>{{ currentMeeting.hotel }} · {{ currentMeeting.room }}</p>
        <small>{{ currentMeeting.date }} {{ currentMeeting.time }}</small>
      </section>

      <section class="section-card">
        <h2>会议信息</h2>
        <ul class="plain-list">
          <li><strong>时间：</strong>{{ currentMeeting.date }} {{ currentMeeting.time }}</li>
          <li><strong>地点：</strong>{{ currentMeeting.hotel }} - {{ currentMeeting.room }}</li>
          <li><strong>分组：</strong>{{ currentMeeting.group }}</li>
        </ul>
      </section>

      <section class="section-card">
        <div class="section-head">
          <h2>会议签到</h2>
          <span :class="{ danger: signStatus === '未签到', success: signStatus === '已签到' }">
            {{ signStatus }}
          </span>
        </div>
        <button type="button" class="primary-btn" :disabled="signed" @click="signDialogOpen = true">
          <AppIcon name="scan" :size="15" />
          {{ signed ? '已签到' : '扫码签到' }}
        </button>
      </section>

      <section class="section-card">
        <h2>会议议程</h2>
        <ol class="agenda-list">
          <li v-for="item in currentMeeting.agenda" :key="item">{{ item }}</li>
        </ol>
      </section>

      <section class="section-card">
        <div class="section-head">
          <h2>会议资料</h2>
          <RouterLink to="/materials">全部资料</RouterLink>
        </div>
        <div class="material-tabs">
          <button
            v-for="tab in materialTabs"
            :key="tab"
            type="button"
            :class="{ active: materialTab === tab }"
            @click="materialTab = tab"
          >
            {{ tab }}
          </button>
        </div>

        <article
          v-for="item in currentMaterials"
          :key="item.id"
          class="list-row"
        >
          <div>
            <strong>{{ item.name }}</strong>
            <p>{{ item.category }} · {{ item.size }}</p>
          </div>
          <div class="material-actions">
            <button type="button" class="secondary-btn" @click="previewMaterial(item.name, item.previewSummary)">
              <AppIcon name="preview" :size="14" />预览
            </button>
            <button type="button" class="secondary-btn" @click="downloadMaterial(item.name)">
              <AppIcon name="download" :size="14" />下载
            </button>
          </div>
        </article>
        <div v-if="!currentMaterials.length" class="empty-tip">暂无资料</div>
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

    <AppDialog
      v-model:open="signDialogOpen"
      title="确认扫码签到"
      description="确认后将调用扫码签到流程，签到成功后不可重复签到。"
      confirm-text="立即签到"
      @confirm="handleSignIn"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import AppDialog from '../components/AppDialog.vue';
import AppHeader from '../components/AppHeader.vue';
import AppIcon from '../components/AppIcon.vue';
import { materials, meetings } from '../data/mock';

const route = useRoute();
const currentMeeting = meetings[0];
const signStatus = ref(route.query.signed === '1' ? '已签到' : currentMeeting.signStatus);
const signDialogOpen = ref(false);
const signed = computed(() => signStatus.value === '已签到');
const materialTabs = ['全部', '议程', '会议文件', '座位图'];
const materialTab = ref('全部');
const currentMaterials = computed(() => materialTab.value === '全部'
  ? materials
  : materials.filter((item) => item.category === materialTab.value));
const previewOpen = ref(false);
const previewTitle = ref('资料预览');
const previewDescription = ref('暂无内容');
const toastText = ref('');
let toastTimer: number | null = null;

const showToast = (text: string) => {
  toastText.value = text;
  if (toastTimer) {
    clearTimeout(toastTimer);
  }
  toastTimer = window.setTimeout(() => {
    toastText.value = '';
  }, 1700);
};

const handleSignIn = () => {
  signDialogOpen.value = false;
  signStatus.value = '已签到';
  showToast('签到成功，祝你参会顺利');
};

const previewMaterial = (name: string, summary: string) => {
  previewTitle.value = `${name}（预览）`;
  previewDescription.value = summary;
  previewOpen.value = true;
};

const downloadMaterial = (name: string) => {
  showToast(`${name} 下载已开始`);
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

.hero-card,
.section-card {
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.hero-card,
.section-card {
  padding: 1rem;
  margin-bottom: 1rem;
}

.hero-card {
  background: linear-gradient(180deg, rgba(200, 169, 126, 0.16), white);
}

.hero-card h1 {
  margin: 0.55rem 0 0.3rem;
  color: var(--text-default);
  font-size: 1.2rem;
  font-weight: 500;
}

.hero-card p,
.hero-card small,
.plain-list,
.agenda-list,
.list-row p {
  color: var(--text-muted);
}

.hero-card p,
.hero-card small,
.plain-list,
.agenda-list,
.list-row p,
.list-row strong {
  margin: 0;
}

.status-chip {
  display: inline-flex;
  padding: 0.24rem 0.6rem;
  border-radius: 4px;
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
  font-size: 0.75rem;
}

.section-card h2 {
  margin: 0 0 0.8rem;
  color: var(--text-default);
  font-size: 1rem;
  font-weight: 500;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.8rem;
}

.section-head h2 {
  margin: 0;
}

.section-head a,
.section-head span {
  color: var(--brand-gold-dark);
  font-size: 0.82rem;
  text-decoration: none;
}

.section-head .danger {
  color: var(--danger);
}

.section-head .success {
  color: var(--success);
}

.plain-list,
.agenda-list {
  padding-left: 1rem;
  line-height: 1.9;
}

.primary-btn,
.secondary-btn {
  border-radius: 8px;
}

.primary-btn {
  width: 100%;
  min-height: 48px;
  border: none;
  background: var(--brand-gold);
  color: white;
  font-weight: 700;
  box-shadow: 0 2px 4px rgba(200, 169, 126, 0.2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.28rem;
}

.primary-btn:disabled {
  background: #d8c0a0;
}

.material-tabs {
  display: flex;
  gap: 0.45rem;
  margin-bottom: 0.5rem;
}

.material-tabs button {
  min-height: 32px;
  border: none;
  border-radius: 6px;
  padding: 0 0.75rem;
  background: #f8f9fa;
  color: var(--text-muted);
  font-size: 0.8rem;
}

.material-tabs button.active {
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
}

.list-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
}

.list-row {
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--surface-line);
  text-decoration: none;
  color: inherit;
}

.list-row:last-child {
  border-bottom: none;
}

.list-row span {
  color: var(--brand-gold-dark);
  font-size: 0.85rem;
}

.secondary-btn {
  min-width: 64px;
  min-height: 34px;
  background: white;
  border: 1px solid var(--brand-gold);
  color: var(--brand-gold-dark);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.material-actions {
  display: flex;
  gap: 0.42rem;
}

.empty-tip {
  color: var(--text-light);
  font-size: 0.85rem;
  padding: 0.5rem 0 0.2rem;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: calc(88px + var(--safe-area-inset-bottom));
  transform: translateX(-50%);
  margin: 0;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  background: rgba(17, 24, 39, 0.84);
  color: white;
  font-size: 0.8rem;
}
</style>
