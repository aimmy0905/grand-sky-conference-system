<template>
  <div class="app-page">
    <AppHeader title="核销中心" />

    <main class="app-page__body">
      <section class="hero-card">
        <small>今日核销概览</small>
        <h1>{{ successCount }} 次</h1>
        <p>异常 {{ failedCount }} 次 · 核销人员 {{ verifierUser.name }}</p>
      </section>

      <button type="button" class="scan-btn" @click="router.push('/scanner')">
        <AppIcon name="scan" :size="21" />
        <span>扫码核销</span>
      </button>

      <RouterLink to="/records" class="record-entry">
        <div class="record-entry__left">
          <span class="entry-icon"><AppIcon name="record" :size="17" /></span>
          <strong>核销记录</strong>
        </div>
        <AppIcon name="arrow-right" :size="16" />
      </RouterLink>

      <section class="tips-card">
        <h2>核销规则提醒</h2>
        <p>扫码时系统将自动校验会议有效性、核销时间范围与重复核销状态。</p>
        <p>异常提示请按原因处理，必要时可在后台进行手动补录。</p>
      </section>
    </main>

    <AppBottomNav />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import AppBottomNav from '../components/AppBottomNav.vue';
import AppHeader from '../components/AppHeader.vue';
import AppIcon from '../components/AppIcon.vue';
import { verifierUser, verifyRecords } from '../data/mock';

const router = useRouter();
const successCount = computed(() => verifyRecords.filter((item) => item.status === '核销成功').length);
const failedCount = computed(() => verifyRecords.filter((item) => item.status === '核销失败').length);
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

.hero-card,
.record-entry,
.tips-card {
  border-radius: 22px;
  background: white;
  box-shadow: var(--shadow-card);
}

.hero-card {
  padding: 1.15rem;
  background: linear-gradient(140deg, #192a41 0%, #2f4868 55%, #526f93 100%);
  color: white;
}

.hero-card small {
  color: rgba(255, 255, 255, 0.85);
}

.hero-card h1 {
  margin: 0.45rem 0 0.3rem;
  font-size: 1.6rem;
}

.hero-card p {
  margin: 0;
  color: rgba(255, 255, 255, 0.88);
}

.scan-btn {
  width: min(100%, 311px);
  margin: 1.15rem auto;
  min-height: 60px;
  border: none;
  border-radius: 14px;
  background: var(--brand-gold);
  color: white;
  font-size: 1.07rem;
  font-weight: 700;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;
  box-shadow: 0 4px 8px rgba(200, 169, 126, 0.25);
}

.record-entry {
  min-height: 56px;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
  text-decoration: none;
}

.record-entry__left {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
}

.entry-icon {
  width: 28px;
  height: 28px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  color: var(--brand-gold-dark);
  background: var(--surface-soft);
}

.record-entry strong {
  color: var(--text-default);
}

.tips-card {
  margin-top: 1rem;
  padding: 1rem;
}

.tips-card h2 {
  margin: 0;
  color: var(--text-default);
  font-size: 1.04rem;
}

.tips-card p {
  margin: 0.7rem 0 0;
  color: var(--text-muted);
  line-height: 1.7;
}
</style>
