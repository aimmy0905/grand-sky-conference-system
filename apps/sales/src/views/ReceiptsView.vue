<template>
  <div class="app-page">
    <AppHeader title="回执统计" back />

    <main class="app-page__body">
      <section class="card filter-card">
        <label class="field">
          <span>会议</span>
          <select v-model="meetingId">
            <option v-for="item in meetings" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </label>

        <label class="field">
          <span>回执状态</span>
          <select v-model="status">
            <option value="全部">全部</option>
            <option value="已填写">已填写</option>
            <option value="未填写">未填写</option>
          </select>
        </label>
      </section>

      <section class="stats-grid">
        <article class="stat-card">
          <strong>{{ receiptStats.submitted }}</strong>
          <span>已填写</span>
        </article>
        <article class="stat-card">
          <strong>{{ receiptStats.pending }}</strong>
          <span>未填写</span>
        </article>
        <article class="stat-card">
          <strong>{{ receiptStats.requiredPickup }}</strong>
          <span>需接送</span>
        </article>
        <article class="stat-card">
          <strong>{{ receiptStats.requiredStay }}</strong>
          <span>需住宿</span>
        </article>
      </section>

      <section class="card list-card">
        <article v-for="item in filteredDetails" :key="`${item.name}-${item.mobile}`" class="detail-item">
          <div class="detail-top">
            <strong>{{ item.name }}</strong>
            <span :class="{ pending: item.status === '未填写' }">{{ item.status }}</span>
          </div>
          <p>{{ item.mobile }}</p>
          <small>接送：{{ item.pickup }} · 住宿：{{ item.stay }} · 餐饮：{{ item.meal }}</small>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppHeader from '../components/AppHeader.vue';
import { meetings, receiptDetails, receiptStats } from '../data/mock';

const meetingId = ref(meetings[0]?.id ?? '');
const status = ref<'全部' | '已填写' | '未填写'>('全部');

const filteredDetails = computed(() => receiptDetails.filter((item) => status.value === '全部' || item.status === status.value));
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
  min-height: calc(100vh - 64px);
  background: var(--surface-page);
}

.card,
.stat-card {
  border-radius: 20px;
  background: white;
  box-shadow: var(--shadow-card);
}

.filter-card {
  padding: 1rem;
}

.field {
  display: grid;
  gap: 0.4rem;
}

.field + .field {
  margin-top: 0.8rem;
}

.field span {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.field select {
  min-height: 44px;
  border-radius: 12px;
  border: 1px solid var(--surface-line);
  padding: 0 0.7rem;
}

.stats-grid {
  margin-top: 0.9rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
}

.stat-card {
  padding: 0.9rem;
}

.stat-card strong {
  display: block;
  color: #13253d;
  font-size: 1.25rem;
}

.stat-card span {
  color: var(--text-muted);
  font-size: 0.82rem;
}

.list-card {
  margin-top: 0.9rem;
  padding: 1rem;
}

.detail-item + .detail-item {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--surface-line);
}

.detail-top {
  display: flex;
  justify-content: space-between;
  gap: 0.7rem;
}

.detail-top strong {
  color: var(--text-default);
}

.detail-top span {
  color: #2d6282;
  background: #e9f6ff;
  border-radius: 999px;
  padding: 0.14rem 0.52rem;
  font-size: 0.72rem;
}

.detail-top span.pending {
  color: #a65a21;
  background: #fff3e8;
}

.detail-item p,
.detail-item small {
  display: block;
  margin: 0.35rem 0 0;
  color: var(--text-muted);
}
</style>
