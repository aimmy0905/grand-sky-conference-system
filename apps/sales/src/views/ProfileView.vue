<template>
  <div class="app-page">
    <AppHeader title="个人中心" />

    <main class="app-page__body">
      <section class="profile-card">
        <div class="avatar">{{ salesProfile.avatarText }}</div>
        <div>
          <h1>{{ salesProfile.name }}</h1>
          <p>{{ salesProfile.mobile }}</p>
          <small>{{ selectedHotel }} · {{ selectedDepartment }}</small>
        </div>
      </section>

      <section class="info-card">
        <button type="button" class="action-row" @click="openSelector = true">
          <div class="action-left">
            <span class="action-icon"><AppIcon name="hotel" :size="16" /></span>
            <div>
              <strong>切换所属酒店及部门</strong>
              <p>重新设置当前登录归属信息</p>
            </div>
          </div>
          <AppIcon name="arrow-right" :size="15" />
        </button>
      </section>

      <button type="button" class="logout-btn" @click="logoutOpen = true">
        <AppIcon name="logout" :size="15" />
        退出登录
      </button>
    </main>

    <Transition name="fade-up">
      <div v-if="openSelector" class="sheet-mask" @click.self="openSelector = false">
        <section class="sheet-panel">
          <h3>选择所属酒店及部门</h3>
          <label>
            <span>所属酒店</span>
            <select v-model="selectedHotel">
              <option v-for="item in hotelOptions" :key="item" :value="item">{{ item }}</option>
            </select>
          </label>
          <label>
            <span>所属部门</span>
            <select v-model="selectedDepartment">
              <option v-for="item in departmentOptions" :key="item" :value="item">{{ item }}</option>
            </select>
          </label>
          <button type="button" class="sheet-btn" @click="openSelector = false">确认</button>
        </section>
      </div>
    </Transition>

    <AppDialog
      v-model:open="logoutOpen"
      title="确认退出登录"
      description="退出后将返回登录页，可再次通过微信授权登录。"
      confirm-text="退出"
      @confirm="router.push('/login')"
    />

    <AppBottomNav />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppBottomNav from '../components/AppBottomNav.vue';
import AppDialog from '../components/AppDialog.vue';
import AppHeader from '../components/AppHeader.vue';
import AppIcon from '../components/AppIcon.vue';
import { departmentOptions, hotelOptions, salesProfile } from '../data/mock';

const router = useRouter();
const logoutOpen = ref(false);
const openSelector = ref(false);
const selectedHotel = ref(salesProfile.hotel);
const selectedDepartment = ref(salesProfile.department);
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
.info-card {
  border-radius: 20px;
  background: white;
  box-shadow: var(--shadow-card);
}

.profile-card {
  display: flex;
  gap: 0.9rem;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 800;
  background: linear-gradient(145deg, var(--brand-gold), #b8966a);
}

.profile-card h1 {
  margin: 0;
  color: var(--text-default);
  font-size: 1.2rem;
}

.profile-card p,
.profile-card small {
  display: block;
  margin: 0.3rem 0 0;
  color: var(--text-muted);
}

.info-card {
  padding: 0.95rem;
}

.action-row {
  width: 100%;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;
  padding: 0.72rem 0;
  color: inherit;
}

.action-row + .action-row {
  margin-top: 0.35rem;
  border-top: 1px solid var(--surface-line);
}

.action-left {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.action-icon {
  width: 30px;
  height: 30px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  color: var(--brand-gold-dark);
  background: var(--surface-soft);
}

.action-left strong {
  display: block;
  color: var(--text-default);
}

.action-left p {
  margin: 0.3rem 0 0;
  color: var(--text-muted);
  font-size: 0.8rem;
}

.logout-btn {
  margin-top: 1rem;
  width: 100%;
  min-height: 46px;
  border: none;
  border-radius: 12px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.35rem;
  background: #1f3148;
  color: white;
}

.sheet-mask {
  position: fixed;
  inset: 0;
  z-index: 30;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.5);
}

.sheet-panel {
  width: min(100%, 300px);
  border-radius: 16px;
  background: white;
  padding: 1.2rem;
}

.sheet-panel h3 {
  margin: 0;
  text-align: center;
  color: var(--text-default);
  font-size: 1.1rem;
}

.sheet-panel label {
  display: grid;
  gap: 0.45rem;
  margin: 1rem 0;
}

.sheet-panel span {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.sheet-panel select {
  min-height: 46px;
  border: 1px solid var(--surface-line);
  border-radius: 8px;
  padding: 0 0.7rem;
  background: white;
}

.sheet-btn {
  width: 100%;
  min-height: 44px;
  border: none;
  border-radius: 8px;
  background: var(--brand-gold);
  color: white;
  font-weight: 700;
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.2s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
}
</style>
