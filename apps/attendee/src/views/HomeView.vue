<template>
  <div class="app-page">
    <AppHeader title="格兰云天会议" right-text="关闭" />

    <main class="app-page__body">
      <section class="welcome-card">
        <small>欢迎回来</small>
        <h1>{{ attendeeProfile.nickname }}</h1>
        <p>{{ attendeeProfile.hotel }} · {{ attendeeProfile.role }}</p>
      </section>

      <section class="stats-grid">
        <article class="mini-card">
          <strong>3</strong>
          <span>参会会议</span>
        </article>
        <article class="mini-card">
          <strong>2</strong>
          <span>未读消息</span>
        </article>
      </section>

      <section class="section-card">
        <div class="section-head">
          <h2>会议列表</h2>
          <span>按时间倒序</span>
        </div>

        <RouterLink
          v-for="meeting in meetings"
          :key="meeting.id"
          to="/meeting-detail"
          class="meeting-card"
        >
          <div class="meeting-card__top">
            <strong>{{ meeting.name }}</strong>
            <span class="status-chip" :class="{ navy: meeting.status === '已开始' }">{{ meeting.status }}</span>
          </div>
          <p>{{ meeting.hotel }} · {{ meeting.room }}</p>
          <small>{{ meeting.date }} {{ meeting.time }}</small>
        </RouterLink>
      </section>
    </main>

    <AppBottomNav />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import AppBottomNav from '../components/AppBottomNav.vue';
import AppHeader from '../components/AppHeader.vue';
import { attendeeProfile, meetings } from '../data/mock';
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

.welcome-card,
.mini-card,
.section-card,
.meeting-card {
  border-radius: 22px;
  background: white;
  box-shadow: var(--shadow-card);
}

.welcome-card {
  padding: 1.2rem;
  background: linear-gradient(180deg, rgba(200, 169, 126, 0.18), white);
}

.welcome-card small {
  color: var(--brand-gold-dark);
}

.welcome-card h1 {
  margin: 0.4rem 0 0.3rem;
  color: var(--brand-navy);
  font-size: 1.8rem;
}

.welcome-card p {
  margin: 0;
  color: var(--text-muted);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
  margin: 1rem 0;
}

.mini-card {
  padding: 1rem;
}

.mini-card strong {
  display: block;
  color: var(--brand-navy);
  font-size: 1.45rem;
}

.mini-card span {
  color: var(--text-muted);
}

.section-card {
  padding: 1rem;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.section-head h2 {
  margin: 0;
  color: var(--brand-navy);
  font-size: 1.1rem;
}

.section-head span {
  color: var(--text-light);
  font-size: 0.82rem;
}

.meeting-card {
  display: grid;
  gap: 0.45rem;
  padding: 1rem;
  margin-bottom: 0.85rem;
  color: inherit;
  text-decoration: none;
}

.meeting-card:last-child {
  margin-bottom: 0;
}

.meeting-card__top {
  display: flex;
  gap: 0.6rem;
  justify-content: space-between;
  align-items: center;
}

.meeting-card__top strong {
  color: var(--text-default);
}

.meeting-card p,
.meeting-card small {
  margin: 0;
  color: var(--text-muted);
}

.status-chip {
  padding: 0.24rem 0.6rem;
  border-radius: 999px;
  background: rgba(200, 169, 126, 0.16);
  color: var(--brand-gold-dark);
  font-size: 0.75rem;
  white-space: nowrap;
}

.status-chip.navy {
  background: rgba(25, 42, 65, 0.1);
  color: var(--brand-navy);
}
</style>
