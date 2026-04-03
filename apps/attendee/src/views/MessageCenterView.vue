<template>
  <div class="app-page">
    <AppHeader title="消息通知" right-text="清空" @right-click="clearOpen = true" />

    <main class="app-page__body">
      <section class="tabs-card">
        <button
          type="button"
          :class="{ active: currentTab === 'normal' }"
          @click="currentTab = 'normal'"
        >
          普通消息
        </button>
        <button
          type="button"
          :class="{ active: currentTab === 'receipt' }"
          @click="currentTab = 'receipt'"
        >
          回执消息<span v-if="receiptUnreadCount">·{{ receiptUnreadCount }}</span>
        </button>
      </section>

      <section class="message-list">
        <article class="tips-card">
          <p>未读消息 {{ totalUnreadCount }} 条，点击消息可查看详情。</p>
          <button type="button" @click="markAllRead">全部已读</button>
        </article>

        <article v-for="item in activeMessages" :key="item.id" class="message-card">
          <small class="meeting-title">{{ item.meetingTitle }}</small>
          <div class="message-card__top">
            <strong>{{ item.title }}</strong>
            <span v-if="item.unread" class="dot"></span>
          </div>
          <p>{{ item.content }}</p>
          <div class="message-card__meta">
            <small>{{ item.time }}</small>
            <RouterLink v-if="currentTab === 'receipt'" to="/receipt">去填写</RouterLink>
          </div>
        </article>

        <EmptyState
          v-if="activeMessages.length === 0"
          icon="!"
          title="消息列表为空"
          description="暂无通知消息，后续会议提醒会在这里展示。"
        />
      </section>
    </main>

    <AppBottomNav />

    <AppDialog
      v-model:open="clearOpen"
      title="确认清空消息"
      description="清空后仅移除本地展示，不影响会务后台数据。"
      confirm-text="确认清空"
      @confirm="clearMessages"
    />

    <p v-if="toastText" class="toast">{{ toastText }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import AppDialog from '../components/AppDialog.vue';
import AppBottomNav from '../components/AppBottomNav.vue';
import AppHeader from '../components/AppHeader.vue';
import EmptyState from '../components/EmptyState.vue';
import { messages } from '../data/mock';

const currentTab = ref<'normal' | 'receipt'>('normal');
const localMessages = ref({
  normal: messages.normal.map((item) => ({ ...item })),
  receipt: messages.receipt.map((item) => ({ ...item })),
});
const toastText = ref('');
const clearOpen = ref(false);

const activeMessages = computed(() => currentTab.value === 'normal'
  ? localMessages.value.normal
  : localMessages.value.receipt);
const receiptUnreadCount = computed(() => localMessages.value.receipt.filter((item) => item.unread).length);
const totalUnreadCount = computed(() => [...localMessages.value.normal, ...localMessages.value.receipt]
  .filter((item) => item.unread).length);

const markAllRead = () => {
  localMessages.value = {
    normal: localMessages.value.normal.map((item) => ({ ...item, unread: false })),
    receipt: localMessages.value.receipt.map((item) => ({ ...item, unread: false })),
  };
  toastText.value = '已全部标记为已读';
  setTimeout(() => {
    toastText.value = '';
  }, 1500);
};

const clearMessages = () => {
  clearOpen.value = false;
  localMessages.value = {
    normal: [],
    receipt: [],
  };
  toastText.value = '消息已清空';
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
  min-height: calc(100vh - 121px);
  padding: 1rem;
  background: var(--surface-page);
}

.tabs-card,
.tips-card,
.message-card {
  border-radius: 22px;
  background: white;
  box-shadow: var(--shadow-card);
}

.tabs-card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0.3rem;
  margin-bottom: 1rem;
}

.tabs-card button {
  min-height: 42px;
  border: none;
  border-radius: 16px;
  background: transparent;
  color: var(--text-muted);
}

.tabs-card button.active {
  background: var(--wechat-green-soft);
  color: var(--wechat-green-dark);
  font-weight: 700;
}

.tips-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.65rem;
  padding: 0.8rem 1rem;
  margin-bottom: 0.85rem;
}

.tips-card p {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.84rem;
}

.tips-card button {
  border: none;
  min-height: 32px;
  border-radius: 999px;
  padding: 0 0.75rem;
  background: var(--wechat-green-soft);
  color: var(--wechat-green-dark);
}

.message-card {
  padding: 1rem;
  margin-bottom: 0.85rem;
}

.meeting-title {
  display: inline-flex;
  margin-bottom: 0.5rem;
  padding: 0.16rem 0.5rem;
  border-radius: 999px;
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
  font-size: 0.72rem;
}

.message-card__top,
.message-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
}

.message-card strong {
  color: var(--text-default);
}

.message-card p {
  margin: 0.7rem 0;
  color: var(--text-muted);
  line-height: 1.75;
}

.message-card__meta small {
  color: var(--text-light);
}

.message-card__meta a {
  color: var(--wechat-green-dark);
  text-decoration: none;
  font-size: 0.85rem;
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--danger);
}

.toast {
  position: fixed;
  left: 50%;
  bottom: calc(84px + var(--safe-area-inset-bottom));
  transform: translateX(-50%);
  margin: 0;
  border-radius: 999px;
  padding: 0.4rem 0.75rem;
  font-size: 0.78rem;
  color: white;
  background: rgba(17, 24, 39, 0.85);
}
</style>
