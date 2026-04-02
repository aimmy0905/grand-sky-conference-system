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
          <span :class="{ danger: currentMeeting.signStatus === '未签到', success: currentMeeting.signStatus === '已签到' }">
            {{ currentMeeting.signStatus }}
          </span>
        </div>
        <button type="button" class="primary-btn">扫码签到</button>
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
        <div class="list-row" v-for="item in materials" :key="item.id">
          <div>
            <strong>{{ item.name }}</strong>
            <p>{{ item.category }} · {{ item.size }}</p>
          </div>
          <span>预览</span>
        </div>
      </section>

      <section class="section-card">
        <h2>我的餐券</h2>
        <div class="coupon-card" v-for="coupon in coupons" :key="coupon.id">
          <div>
            <strong>{{ coupon.name }}</strong>
            <p>{{ coupon.time }}</p>
          </div>
          <button type="button" class="secondary-btn">生成二维码</button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import AppHeader from '../components/AppHeader.vue';
import { coupons, materials, meetings } from '../data/mock';

const currentMeeting = meetings[0];
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
.section-card,
.coupon-card {
  border-radius: 22px;
  background: white;
  box-shadow: var(--shadow-card);
}

.hero-card,
.section-card {
  padding: 1rem;
  margin-bottom: 1rem;
}

.hero-card {
  background: linear-gradient(180deg, rgba(200, 169, 126, 0.18), white);
}

.hero-card h1 {
  margin: 0.55rem 0 0.3rem;
  color: var(--brand-navy);
  font-size: 1.45rem;
}

.hero-card p,
.hero-card small,
.plain-list,
.agenda-list,
.list-row p,
.coupon-card p {
  color: var(--text-muted);
}

.hero-card p,
.hero-card small,
.plain-list,
.agenda-list,
.list-row p,
.coupon-card p,
.list-row strong,
.coupon-card strong {
  margin: 0;
}

.status-chip {
  display: inline-flex;
  padding: 0.24rem 0.6rem;
  border-radius: 999px;
  background: rgba(200, 169, 126, 0.16);
  color: var(--brand-gold-dark);
  font-size: 0.75rem;
}

.section-card h2 {
  margin: 0 0 0.8rem;
  color: var(--brand-navy);
  font-size: 1.05rem;
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
  border: none;
  border-radius: 14px;
}

.primary-btn {
  width: 100%;
  min-height: 46px;
  background: var(--brand-gold);
  color: white;
  font-weight: 700;
}

.list-row,
.coupon-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
}

.list-row {
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--surface-line);
}

.list-row:last-child {
  border-bottom: none;
}

.list-row span {
  color: var(--brand-gold-dark);
  font-size: 0.85rem;
}

.coupon-card {
  padding: 0.9rem;
  margin-bottom: 0.75rem;
  background: var(--surface-soft);
  box-shadow: none;
}

.coupon-card:last-child {
  margin-bottom: 0;
}

.secondary-btn {
  min-width: 104px;
  min-height: 36px;
  background: white;
  color: var(--brand-gold-dark);
}
</style>
