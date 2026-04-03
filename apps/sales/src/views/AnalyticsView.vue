<template>
  <div class="app-page">
    <AppHeader title="数据查看" back />

    <main class="app-page__body">
      <section class="stats-grid">
        <article class="stat-card">
          <small>总参会人数</small>
          <strong>{{ signStats.total }}</strong>
        </article>
        <article class="stat-card">
          <small>已签到人数</small>
          <strong>{{ signStats.signed }}</strong>
        </article>
        <article class="stat-card">
          <small>未签到人数</small>
          <strong>{{ signStats.unsigned }}</strong>
        </article>
        <article class="stat-card">
          <small>签到率</small>
          <strong>{{ signRate }}</strong>
        </article>
      </section>

      <section class="card">
        <h3>餐券核销统计</h3>
        <div v-for="item in couponStats" :key="item.type" class="line-item">
          <span>{{ item.type }}</span>
          <strong>{{ item.verified }}</strong>
        </div>
      </section>

      <section class="card">
        <h3>核销明细记录</h3>
        <article v-for="item in verifyRecords" :key="`${item.name}-${item.verifyTime}`" class="record-item">
          <div class="record-top">
            <strong>{{ item.name }}</strong>
            <span :class="{ failed: item.status === '核销失败' }">{{ item.status }}</span>
          </div>
          <p>{{ item.couponType }} · {{ item.verifyTime }}</p>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppHeader from '../components/AppHeader.vue';
import { couponStats, signStats, verifyRecords } from '../data/mock';

const signRate = computed(() => `${Math.round((signStats.signed / signStats.total) * 100)}%`);
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
}

.stat-card,
.card {
  border-radius: 20px;
  background: white;
  box-shadow: var(--shadow-card);
}

.stat-card {
  padding: 0.9rem;
}

.stat-card small {
  color: var(--text-muted);
}

.stat-card strong {
  display: block;
  margin-top: 0.2rem;
  color: #13253d;
  font-size: 1.25rem;
}

.card {
  margin-top: 0.9rem;
  padding: 1rem;
}

.card h3 {
  margin: 0;
  color: var(--text-default);
}

.line-item {
  margin-top: 0.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.58rem 0.68rem;
  border-radius: 10px;
  background: #f8fafc;
}

.line-item span {
  color: var(--text-muted);
}

.line-item strong {
  color: #1e4568;
}

.record-item + .record-item {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--surface-line);
}

.record-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.record-top strong {
  color: var(--text-default);
}

.record-top span {
  color: #27613a;
  background: #e8f8ec;
  border-radius: 999px;
  padding: 0.14rem 0.52rem;
  font-size: 0.72rem;
}

.record-top span.failed {
  color: #bf3e34;
  background: #fdeceb;
}

.record-item p {
  margin: 0.35rem 0 0;
  color: var(--text-muted);
}
</style>
