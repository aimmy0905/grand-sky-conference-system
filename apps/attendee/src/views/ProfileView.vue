<template>
  <div class="app-page">
    <AppHeader title="我的" />

    <main class="app-page__body">
      <section class="profile-card">
        <div class="avatar">{{ attendeeProfile.avatarText }}</div>
        <div>
          <h1>{{ attendeeProfile.nickname }}</h1>
          <p>{{ attendeeProfile.name }} · {{ attendeeProfile.mobile }}</p>
          <small>{{ attendeeProfile.hotel }}</small>
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <h2>会议记录</h2>
          <RouterLink to="/meeting-records">全部记录</RouterLink>
        </div>
        <div class="record-entry">
          <strong>最近参会：{{ meetingRecords[0].meetingName }}</strong>
          <p>{{ meetingRecords[0].date }} · {{ meetingRecords[0].status }}</p>
        </div>
      </section>

      <section class="section-card">
        <h2>常用服务</h2>
        <button type="button" class="service-row" v-for="service in services" :key="service.name" @click="openService(service)">
          <div class="service-icon">
            <AppIcon :name="serviceIconMap[service.name]" :size="16" />
          </div>
          <div>
            <strong>{{ service.name }}</strong>
            <p>{{ service.desc }}</p>
          </div>
          <span class="service-action">
            <template v-if="service.externalMiniProgram">
              <small>小程序</small>
              <AppIcon name="external" :size="12" />
            </template>
            <template v-else>
              <small>进入</small>
              <AppIcon name="arrow-right" :size="12" />
            </template>
          </span>
        </button>
      </section>

      <section class="section-card">
        <div class="section-head">
          <h2>周边推荐</h2>
        </div>
        <RouterLink to="/nearby-guide" class="nearby-entry">
          <div>
            <strong>当前位置 · 深圳福田区</strong>
            <p>查看最近城市的美食、交通与游玩图文推荐</p>
          </div>
          <span>查看</span>
        </RouterLink>
      </section>
    </main>

    <AppBottomNav />

    <AppDialog
      v-model:open="externalDialogOpen"
      title="即将跳转其他小程序"
      :description="`将为你打开${selectedExternalAppName}，是否继续？`"
      confirm-text="继续跳转"
      @confirm="confirmExternalJump"
    />

    <p v-if="toastText" class="toast">{{ toastText }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import AppDialog from '../components/AppDialog.vue';
import AppBottomNav from '../components/AppBottomNav.vue';
import AppHeader from '../components/AppHeader.vue';
import AppIcon from '../components/AppIcon.vue';
import { attendeeProfile, meetingRecords, services } from '../data/mock';

const serviceIconMap: Record<string, 'service-hotel' | 'service-shop' | 'service-wifi' | 'service-brand' | 'service-contact'> = {
  订酒店: 'service-hotel',
  逛商城: 'service-shop',
  一键连WiFi: 'service-wifi',
  了解格兰云天: 'service-brand',
  联系我们: 'service-contact',
};

const router = useRouter();
const externalDialogOpen = ref(false);
const selectedExternalAppName = ref('外部小程序');
const toastText = ref('');
let toastTimer: number | null = null;

const showToast = (text: string) => {
  toastText.value = text;
  if (toastTimer) {
    clearTimeout(toastTimer);
  }
  toastTimer = window.setTimeout(() => {
    toastText.value = '';
  }, 1400);
};

const openService = (service: typeof services[number]) => {
  if (service.externalMiniProgram) {
    selectedExternalAppName.value = service.externalAppName || service.name;
    externalDialogOpen.value = true;
    return;
  }

  if (service.to) {
    router.push(service.to);
  }
};

const confirmExternalJump = () => {
  externalDialogOpen.value = false;
  showToast(`已发起跳转：${selectedExternalAppName.value}`);
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

.profile-card,
.section-card {
  border-radius: 22px;
  background: white;
  box-shadow: var(--shadow-card);
}

.profile-card {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1.1rem;
  margin-bottom: 1rem;
}

.avatar {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(145deg, var(--brand-gold), #b8966a);
  color: white;
  font-size: 1.3rem;
  font-weight: 800;
}

.profile-card h1 {
  margin: 0;
  color: #10233d;
  font-size: 1.25rem;
}

.profile-card p,
.profile-card small,
.service-row p,
.nearby-row p,
.record-entry p,
.nearby-row small {
  margin: 0.3rem 0 0;
  color: var(--text-muted);
}

.section-card {
  padding: 1rem;
  margin-bottom: 1rem;
}

.section-card h2 {
  margin: 0 0 0.8rem;
  color: #11243d;
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

.section-head a {
  color: var(--wechat-green-dark);
  text-decoration: none;
  font-size: 0.82rem;
}

.record-entry {
  border-radius: 14px;
  background: #f4f8ff;
  padding: 0.8rem;
}

.record-entry strong {
  color: #1e3a8a;
}

.service-row,
.nearby-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid var(--surface-line);
}

.service-row {
  display: grid;
  grid-template-columns: 34px 1fr auto;
  align-items: center;
  column-gap: 0.6rem;
  width: 100%;
  border: none;
  background: transparent;
  text-align: left;
  text-decoration: none;
  color: inherit;
}

.service-row:last-child,
.nearby-entry:last-child {
  border-bottom: none;
}

.service-action {
  color: var(--wechat-green-dark);
  font-size: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.12rem;
}

.service-action small {
  font-size: 0.72rem;
  color: var(--brand-gold-dark);
}

.service-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
  font-size: 0.82rem;
  font-weight: 700;
}

.nearby-entry {
  text-decoration: none;
  color: inherit;
}

.nearby-entry p {
  margin: 0.35rem 0 0;
  color: var(--text-muted);
}

.nearby-entry span {
  color: var(--brand-gold-dark);
  font-size: 0.85rem;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: calc(88px + var(--safe-area-inset-bottom));
  transform: translateX(-50%);
  margin: 0;
  border-radius: 999px;
  padding: 0.45rem 0.75rem;
  color: white;
  font-size: 0.8rem;
  background: rgba(17, 24, 39, 0.85);
}
</style>
