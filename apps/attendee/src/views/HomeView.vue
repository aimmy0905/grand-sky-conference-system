<template>
  <div class="app-page">
    <AppHeader title="格兰云天会议" right-text="关闭" @right-click="exitDialogOpen = true" />

    <main class="app-page__body">
      <section class="hero-banner">
        <div class="hero-banner__tag">{{ activeBanner.tag }}</div>
        <h1>{{ activeBanner.title }}</h1>
        <p>{{ activeBanner.subtitle }}</p>
        <RouterLink :to="activeBanner.to" class="hero-banner__cta">{{ activeBanner.cta }}</RouterLink>
        <div class="hero-dots">
          <button
            v-for="(banner, index) in brandBanners"
            :key="banner.id"
            type="button"
            class="hero-dot"
            :class="{ active: currentBannerIndex === index }"
            @click="currentBannerIndex = index"
          ></button>
        </div>
      </section>

      <section class="welcome-card">
        <small>欢迎回来</small>
        <h2>{{ attendeeProfile.nickname }}</h2>
        <p>{{ attendeeProfile.hotel }} · {{ attendeeProfile.role }}</p>
      </section>

      <section class="stats-grid">
        <article class="mini-card">
          <strong>{{ meetings.length }}</strong>
          <span>参会会议</span>
        </article>
        <RouterLink to="/messages" class="mini-card mini-card--link">
          <strong>{{ unreadCount }}</strong>
          <span>未读消息</span>
        </RouterLink>
      </section>

      <section class="section-card">
        <div class="section-head">
          <h2>会议列表</h2>
          <RouterLink to="/meeting-records">我的记录</RouterLink>
        </div>

        <div v-if="loading" class="skeleton-group" aria-hidden="true">
          <div v-for="item in 2" :key="item" class="skeleton-card"></div>
        </div>

        <template v-else-if="meetings.length">
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
        </template>

        <EmptyState
          v-else
          icon="?"
          title="暂无会议安排"
          description="当前暂无可参会会议，会务添加后会第一时间提醒你。"
        />
      </section>
    </main>

    <AppBottomNav />

    <AppDialog
      v-model:open="exitDialogOpen"
      title="确认关闭页面"
      description="关闭后将返回登录页，再次进入可继续查看会议。"
      confirm-text="确认关闭"
      @confirm="goLogin"
    />

    <div class="floating-actions">
      <button type="button" class="floating-btn" @click="goSign">
        <AppIcon name="scan" :size="18" />
        <small>扫描签到</small>
      </button>
      <button type="button" class="floating-btn" @click="openCouponVerify">
        <AppIcon name="qrcode" :size="18" />
        <small>餐券核销</small>
      </button>
    </div>

    <QrCodeLayer
      v-model:open="couponQrOpen"
      title="午餐券核销码"
      subtitle="请向核销人员出示该二维码完成核销。"
      code="LUNCH-4621"
      @save="couponQrOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import AppDialog from '../components/AppDialog.vue';
import AppBottomNav from '../components/AppBottomNav.vue';
import AppHeader from '../components/AppHeader.vue';
import AppIcon from '../components/AppIcon.vue';
import EmptyState from '../components/EmptyState.vue';
import QrCodeLayer from '../components/QrCodeLayer.vue';
import { attendeeProfile, brandBanners, meetings, messages } from '../data/mock';

const router = useRouter();
const loading = ref(true);
const exitDialogOpen = ref(false);
const couponQrOpen = ref(false);
const currentBannerIndex = ref(0);
let timer: number | null = null;

const activeBanner = computed(() => brandBanners[currentBannerIndex.value]);
const unreadCount = computed(() => [...messages.normal, ...messages.receipt].filter((item) => item.unread).length);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 550);

  timer = window.setInterval(() => {
    currentBannerIndex.value = (currentBannerIndex.value + 1) % brandBanners.length;
  }, 3200);
});

onUnmounted(() => {
  if (timer) {
    window.clearInterval(timer);
  }
});

const goLogin = () => {
  exitDialogOpen.value = false;
  router.push('/login');
};

const goSign = () => {
  router.push('/sign-scan');
};

const openCouponVerify = () => {
  couponQrOpen.value = true;
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

.hero-banner,
.welcome-card,
.mini-card,
.section-card,
.meeting-card {
  border-radius: 22px;
  background: white;
  box-shadow: var(--shadow-card);
}

.hero-banner {
  position: relative;
  overflow: hidden;
  margin-bottom: 0.9rem;
  padding: 1.25rem;
  background:
    radial-gradient(circle at right top, rgba(255, 255, 255, 0.28), transparent 45%),
    linear-gradient(130deg, #192a41 0%, #2b3f5d 56%, #3f5b82 100%);
  color: white;
}

.hero-banner__tag {
  width: fit-content;
  padding: 0.22rem 0.6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.24);
  font-size: 0.75rem;
}

.hero-banner h1 {
  margin: 0.72rem 0 0.45rem;
  font-size: 1.26rem;
  line-height: 1.35;
}

.hero-banner p {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
}

.hero-banner__cta {
  margin-top: 0.9rem;
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 0.8rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.94);
  color: var(--brand-gold-dark);
  text-decoration: none;
  font-size: 0.84rem;
  font-weight: 700;
}

.hero-dots {
  position: absolute;
  right: 1rem;
  bottom: 0.9rem;
  display: flex;
  gap: 0.35rem;
}

.hero-dot {
  width: 7px;
  height: 7px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.38);
}

.hero-dot.active {
  width: 16px;
  border-radius: 999px;
  background: white;
}

.welcome-card {
  padding: 1.1rem;
  background: linear-gradient(180deg, rgba(200, 169, 126, 0.18), white);
}

.welcome-card small {
  color: var(--brand-gold-dark);
}

.welcome-card h2 {
  margin: 0.4rem 0 0.3rem;
  color: #112237;
  font-size: 1.4rem;
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

.mini-card--link {
  text-decoration: none;
  color: inherit;
}

.mini-card strong {
  display: block;
  color: #102035;
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
  color: #11233a;
  font-size: 1.1rem;
}

.section-head a {
  color: var(--brand-gold-dark);
  font-size: 0.82rem;
  text-decoration: none;
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
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
  font-size: 0.75rem;
  white-space: nowrap;
}

.status-chip.navy {
  background: rgba(25, 42, 65, 0.1);
  color: var(--brand-navy);
}

.skeleton-group {
  display: grid;
  gap: 0.85rem;
}

.skeleton-card {
  height: 86px;
  border-radius: 16px;
  background:
    linear-gradient(100deg, #edf2f6 30%, #f7fafc 45%, #edf2f6 60%)
    0 0 / 200% 100%;
  animation: loading 1.15s infinite;
}

@keyframes loading {
  to {
    background-position: -200% 0;
  }
}

.floating-actions {
  position: fixed;
  right: max(1rem, calc((100vw - 430px) / 2 + 1rem));
  bottom: calc(84px + var(--safe-area-inset-bottom));
  z-index: 18;
  display: grid;
  gap: 0.6rem;
}

.floating-btn {
  width: 58px;
  height: 58px;
  border: 1px solid var(--surface-line);
  border-radius: 50%;
  background: white;
  color: var(--brand-gold-dark);
  box-shadow: 0 6px 14px rgba(25, 42, 65, 0.16);
  display: grid;
  place-items: center;
  padding: 0;
}

.floating-btn small {
  margin-top: -0.05rem;
  color: var(--text-muted);
  font-size: 0.65rem;
  line-height: 1;
}

</style>
