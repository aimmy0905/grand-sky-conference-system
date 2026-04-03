<template>
  <div class="app-page">
    <AppHeader title="会议记录" back />

    <main class="app-page__body">
      <section class="section-card">
        <div class="status-tabs">
          <button
            v-for="item in filterTabs"
            :key="item"
            type="button"
            :class="{ active: currentFilter === item }"
            @click="currentFilter = item"
          >
            {{ item }}
          </button>
        </div>

        <article v-for="record in filteredRecords" :key="record.id" class="record-card">
          <strong>{{ record.meetingName }}</strong>
          <p>{{ record.date }} · {{ record.status }}</p>
          <small>{{ record.signStatus }} · {{ record.couponStatus }}</small>
        </article>

        <EmptyState
          v-if="filteredRecords.length === 0"
          icon="~"
          title="暂无对应会议"
          description="试试切换筛选条件查看其他会议记录。"
        />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppHeader from '../components/AppHeader.vue';
import EmptyState from '../components/EmptyState.vue';
import { meetingRecords } from '../data/mock';

const filterTabs = ['全部', '待开始', '已结束'];
const currentFilter = ref('全部');
const filteredRecords = computed(() => currentFilter.value === '全部'
  ? meetingRecords
  : meetingRecords.filter((item) => item.status === currentFilter.value));
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

.section-card {
  border-radius: 22px;
  padding: 1rem;
  background: white;
  box-shadow: var(--shadow-card);
}

.status-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.status-tabs button {
  min-height: 34px;
  border: none;
  border-radius: 999px;
  background: #f0f4f8;
  color: var(--text-muted);
}

.status-tabs button.active {
  background: var(--wechat-green-soft);
  color: var(--wechat-green-dark);
  font-weight: 700;
}

.record-card {
  border-radius: 14px;
  padding: 0.9rem;
  margin-bottom: 0.6rem;
  background: #f7fafc;
}

.record-card:last-child {
  margin-bottom: 0;
}

.record-card strong {
  color: #11253d;
}

.record-card p,
.record-card small {
  margin: 0.3rem 0 0;
  color: var(--text-muted);
}
</style>
