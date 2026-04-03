<template>
  <div class="app-page">
    <AppHeader title="扫码签到" back />

    <main class="app-page__body">
      <section class="section-card">
        <h2>会议信息</h2>
        <div class="info-row">
          <span>会议名称</span>
          <strong>{{ currentMeeting.name }}</strong>
        </div>
        <div class="info-row">
          <span>会议时间</span>
          <strong>{{ currentMeeting.date }} {{ currentMeeting.time }}</strong>
        </div>
        <div class="info-row">
          <span>会议地点</span>
          <strong>{{ currentMeeting.hotel }} · {{ currentMeeting.room }}</strong>
        </div>
      </section>

      <section class="section-card">
        <h2>个人信息</h2>
        <div class="info-row">
          <span>姓名</span>
          <strong>{{ attendeeProfile.name }}</strong>
        </div>
        <div class="info-row">
          <span>手机号</span>
          <strong>{{ attendeeProfile.mobile }}</strong>
        </div>
        <div class="info-row">
          <span>参会身份</span>
          <strong>{{ attendeeProfile.role }}</strong>
        </div>
      </section>

      <button type="button" class="primary-btn" @click="confirmSign">
        <AppIcon name="scan" :size="16" />
        确认签到
      </button>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import AppHeader from '../components/AppHeader.vue';
import AppIcon from '../components/AppIcon.vue';
import { attendeeProfile, meetings } from '../data/mock';

const router = useRouter();
const currentMeeting = meetings[0];

const confirmSign = () => {
  router.push('/meeting-detail?signed=1');
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
  min-height: calc(100vh - 48px);
  padding: 1rem;
  background: var(--surface-page);
}

.section-card {
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  margin-bottom: 0.8rem;
}

h2 {
  margin: 0 0 0.7rem;
  color: var(--text-default);
  font-size: 1rem;
}

.info-row {
  display: grid;
  gap: 0.22rem;
  padding: 0.68rem 0;
  border-bottom: 1px solid var(--surface-line);
}

.info-row:last-child {
  border-bottom: none;
}

.info-row span {
  color: var(--text-light);
  font-size: 0.78rem;
}

.info-row strong {
  color: var(--text-default);
  font-size: 0.93rem;
  font-weight: 500;
}

.primary-btn {
  width: 100%;
  min-height: 48px;
  border: none;
  border-radius: 8px;
  background: var(--brand-gold);
  color: white;
  font-weight: 700;
  box-shadow: 0 2px 4px rgba(200, 169, 126, 0.2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.36rem;
}
</style>
