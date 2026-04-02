<template>
  <div class="app-page">
    <AppHeader title="我的" />

    <main class="app-page__body">
      <section class="profile-card">
        <div class="avatar">张</div>
        <div>
          <h1>{{ attendeeProfile.nickname }}</h1>
          <p>{{ attendeeProfile.mobile }}</p>
          <small>{{ attendeeProfile.hotel }}</small>
        </div>
      </section>

      <section class="section-card">
        <h2>常用服务</h2>
        <div class="service-row" v-for="service in services" :key="service.name">
          <div>
            <strong>{{ service.name }}</strong>
            <p>{{ service.desc }}</p>
          </div>
          <span>进入</span>
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <h2>周边推荐</h2>
          <RouterLink to="/home">返回会议</RouterLink>
        </div>
        <div class="nearby-row" v-for="spot in nearbySpots" :key="spot.name">
          <div>
            <strong>{{ spot.name }}</strong>
            <p>{{ spot.type }} · 距离 {{ spot.distance }}</p>
          </div>
        </div>
      </section>
    </main>

    <AppBottomNav />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import AppBottomNav from '../components/AppBottomNav.vue';
import AppHeader from '../components/AppHeader.vue';
import { attendeeProfile, nearbySpots, services } from '../data/mock';
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
  color: var(--brand-navy);
  font-size: 1.25rem;
}

.profile-card p,
.profile-card small,
.service-row p,
.nearby-row p {
  margin: 0.3rem 0 0;
  color: var(--text-muted);
}

.section-card {
  padding: 1rem;
  margin-bottom: 1rem;
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

.section-head a {
  color: var(--brand-gold-dark);
  text-decoration: none;
  font-size: 0.82rem;
}

.service-row,
.nearby-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid var(--surface-line);
}

.service-row:last-child,
.nearby-row:last-child {
  border-bottom: none;
}

.service-row span {
  color: var(--brand-gold-dark);
  font-size: 0.85rem;
}
</style>
