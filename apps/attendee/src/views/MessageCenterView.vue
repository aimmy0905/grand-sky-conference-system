<template>
  <div class="app-page">
    <AppHeader title="消息通知" />

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
          回执消息
        </button>
      </section>

      <section class="message-list">
        <article v-for="item in activeMessages" :key="item.id" class="message-card">
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
      </section>
    </main>

    <AppBottomNav />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import AppBottomNav from '../components/AppBottomNav.vue';
import AppHeader from '../components/AppHeader.vue';
import { messages } from '../data/mock';

const currentTab = ref<'normal' | 'receipt'>('normal');

const activeMessages = computed(() => currentTab.value === 'normal' ? messages.normal : messages.receipt);
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
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
  font-weight: 700;
}

.message-card {
  padding: 1rem;
  margin-bottom: 0.85rem;
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
  color: var(--brand-gold-dark);
  text-decoration: none;
  font-size: 0.85rem;
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--danger);
}
</style>
