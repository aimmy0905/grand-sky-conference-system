<template>
  <div class="app-page">
    <AppHeader title="我的" />

    <main class="app-page__body">
      <section class="profile-card">
        <div class="avatar">{{ verifierUser.avatarText }}</div>
        <div>
          <h1>{{ verifierUser.name }}</h1>
          <p>{{ verifierUser.mobile }}</p>
          <small>{{ selectedHotel }} · {{ verifierUser.role }}</small>
        </div>
      </section>

      <section class="info-card">
        <div class="row">
          <span>所属酒店</span>
          <strong>{{ selectedHotel }}</strong>
        </div>
      </section>

      <section class="info-card">
        <button type="button" class="action-row" @click="openHotelSelect = true">
          <div class="action-left">
            <span class="action-icon"><AppIcon name="hotel" :size="16" /></span>
            <div>
              <strong>切换所属酒店</strong>
              <p>重新选择登录归属酒店</p>
            </div>
          </div>
          <AppIcon name="arrow-right" :size="15" />
        </button>

        <RouterLink to="/records" class="action-row">
          <div class="action-left">
            <span class="action-icon"><AppIcon name="record" :size="16" /></span>
            <div>
              <strong>查看核销记录</strong>
              <p>按时间倒序查看历史核销明细</p>
            </div>
          </div>
          <AppIcon name="arrow-right" :size="15" />
        </RouterLink>
      </section>

      <section class="info-card">
        <button type="button" class="action-row" @click="openWechatFlow">
          <div class="action-left">
            <span class="action-icon"><AppIcon name="wechat" :size="16" /></span>
            <div>
              <strong>微信绑定</strong>
              <p>{{ wechatBound ? '已绑定微信，可直接授权登录' : '未绑定微信，建议完成绑定' }}</p>
            </div>
          </div>
          <span class="action-tag" :class="{ active: wechatBound }">{{ wechatBound ? '已绑定' : '去绑定' }}</span>
        </button>
      </section>

      <button type="button" class="logout-btn" @click="logoutOpen = true">
        <AppIcon name="logout" :size="15" />
        退出登录
      </button>
    </main>

    <Transition name="fade-up">
      <div v-if="openHotelSelect" class="sheet-mask" @click.self="openHotelSelect = false">
        <section class="sheet-panel">
          <h3>选择所属酒店</h3>
          <label>
            <span>酒店</span>
            <select v-model="selectedHotel">
              <option v-for="hotel in hotelOptions" :key="hotel" :value="hotel">{{ hotel }}</option>
            </select>
          </label>
          <button type="button" class="sheet-confirm" @click="openHotelSelect = false">确认</button>
        </section>
      </div>
    </Transition>

    <AppDialog
      v-model:open="logoutOpen"
      title="确认退出登录"
      description="退出后将返回登录页，可再次通过微信授权或已绑定账号登录。"
      confirm-text="退出"
      @confirm="router.push('/login')"
    />

    <AppDialog
      v-model:open="unbindWechatOpen"
      title="解除微信绑定"
      description="解除后将无法使用微信快捷授权登录，是否继续？"
      confirm-text="确认解除"
      @confirm="confirmUnbindWechat"
    />

    <Transition name="fade-up">
      <div v-if="wechatFlowOpen" class="sheet-mask" @click.self="closeWechatFlow">
        <section class="wechat-panel">
          <h3>微信绑定授权</h3>
          <p>按提示完成微信授权与手机号确认，即可完成当前账号绑定。</p>

          <div class="wechat-step" :class="{ done: loginCodeReady }">
            <strong>步骤1：微信授权</strong>
            <small>{{ loginCodeReady ? '授权成功' : '点击按钮进行微信授权' }}</small>
            <button type="button" :disabled="loginCodeLoading || loginCodeReady" @click="fetchLoginCode">
              {{ loginCodeLoading ? '授权中...' : loginCodeReady ? '已授权' : '发起微信授权' }}
            </button>
          </div>

          <div class="wechat-step" :class="{ done: phoneCredentialReady }">
            <strong>步骤2：手机号确认</strong>
            <small>{{ phoneCredentialReady ? '手机号确认成功' : '授权后确认手机号信息' }}</small>
            <button type="button" :disabled="!loginCodeReady || phoneCredentialLoading || phoneCredentialReady" @click="fetchPhoneCredential">
              {{ phoneCredentialLoading ? '授权中...' : phoneCredentialReady ? '已获取' : '手机号授权' }}
            </button>
          </div>

          <div class="wechat-step" :class="{ done: wechatBoundDraft }">
            <strong>步骤3：完成绑定</strong>
            <small>{{ wechatBoundDraft ? '已完成绑定' : '确认后立即完成微信绑定' }}</small>
            <button type="button" :disabled="!phoneCredentialReady || wechatBoundDraft" @click="bindWechat">
              {{ wechatBoundDraft ? '已绑定' : '确认绑定' }}
            </button>
          </div>

          <button type="button" class="wechat-close" @click="closeWechatFlow">
            {{ wechatBoundDraft ? '完成' : '取消' }}
          </button>
        </section>
      </div>
    </Transition>

    <AppBottomNav />

    <p v-if="toastText" class="toast">{{ toastText }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import AppBottomNav from '../components/AppBottomNav.vue';
import AppDialog from '../components/AppDialog.vue';
import AppHeader from '../components/AppHeader.vue';
import AppIcon from '../components/AppIcon.vue';
import { hotelOptions, verifierUser } from '../data/mock';

const router = useRouter();
const logoutOpen = ref(false);
const openHotelSelect = ref(false);
const selectedHotel = ref(verifierUser.hotel);
const unbindWechatOpen = ref(false);
const wechatBound = ref(true);
const wechatFlowOpen = ref(false);
const loginCodeLoading = ref(false);
const loginCodeReady = ref(false);
const phoneCredentialLoading = ref(false);
const phoneCredentialReady = ref(false);
const wechatBoundDraft = ref(false);
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

const openWechatFlow = () => {
  if (wechatBound.value) {
    unbindWechatOpen.value = true;
    return;
  }
  wechatFlowOpen.value = true;
};

const fetchLoginCode = () => {
  if (loginCodeReady.value || loginCodeLoading.value) {
    return;
  }
  loginCodeLoading.value = true;
  window.setTimeout(() => {
    loginCodeLoading.value = false;
    loginCodeReady.value = true;
  }, 700);
};

const fetchPhoneCredential = () => {
  if (!loginCodeReady.value || phoneCredentialReady.value || phoneCredentialLoading.value) {
    return;
  }
  phoneCredentialLoading.value = true;
  window.setTimeout(() => {
    phoneCredentialLoading.value = false;
    phoneCredentialReady.value = true;
  }, 900);
};

const bindWechat = () => {
  if (!phoneCredentialReady.value) {
    return;
  }
  wechatBoundDraft.value = true;
  wechatBound.value = true;
  showToast('微信绑定成功');
};

const closeWechatFlow = () => {
  wechatFlowOpen.value = false;
  loginCodeLoading.value = false;
  phoneCredentialLoading.value = false;
  if (!wechatBoundDraft.value) {
    loginCodeReady.value = false;
    phoneCredentialReady.value = false;
  }
};

const confirmUnbindWechat = () => {
  wechatBound.value = false;
  unbindWechatOpen.value = false;
  loginCodeReady.value = false;
  phoneCredentialReady.value = false;
  wechatBoundDraft.value = false;
  showToast('已解除微信绑定');
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
  margin-bottom: 1rem;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 0.7rem;
  align-items: center;
}

.row + .row {
  margin-top: 0.7rem;
}

.row span {
  color: var(--text-muted);
}

.row strong {
  color: var(--text-default);
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
  text-decoration: none;
  color: inherit;
}

.action-row + .action-row {
  border-top: 1px solid var(--surface-line);
}

.action-left {
  display: grid;
  grid-template-columns: 32px 1fr;
  align-items: center;
  gap: 0.6rem;
  text-align: left;
}

.action-icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
}

.action-left strong {
  color: var(--text-default);
}

.action-left p {
  margin: 0.28rem 0 0;
  color: var(--text-muted);
  font-size: 0.8rem;
}

.action-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 58px;
  min-height: 28px;
  padding: 0 0.6rem;
  border-radius: 999px;
  background: #f2f4f7;
  color: var(--text-muted);
  font-size: 0.75rem;
}

.action-tag.active {
  background: rgba(76, 175, 80, 0.12);
  color: #2e7d32;
}

.logout-btn {
  width: 100%;
  min-height: 44px;
  border: none;
  border-radius: 10px;
  background: #f8ebea;
  color: #c0392b;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
}

.sheet-mask {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.45);
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
  font-size: 1.06rem;
}

.sheet-panel label {
  display: grid;
  gap: 0.5rem;
  margin: 1rem 0;
}

.sheet-panel span {
  color: var(--text-muted);
  font-size: 0.84rem;
}

.sheet-panel select {
  min-height: 48px;
  border: 1px solid var(--surface-line);
  border-radius: 8px;
  padding: 0 0.7rem;
  background: white;
}

.sheet-confirm {
  width: 100%;
  min-height: 48px;
  border: none;
  border-radius: 8px;
  background: var(--brand-gold);
  color: white;
  font-weight: 700;
}

.wechat-panel {
  width: min(100%, 340px);
  border-radius: 18px;
  background: white;
  padding: 1rem;
}

.wechat-panel h3 {
  margin: 0;
  text-align: center;
  color: var(--text-default);
}

.wechat-panel > p {
  margin: 0.7rem 0 0;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.84rem;
  line-height: 1.6;
}

.wechat-step {
  margin-top: 0.85rem;
  border: 1px solid var(--surface-line);
  border-radius: 12px;
  padding: 0.75rem;
}

.wechat-step.done {
  border-color: rgba(76, 175, 80, 0.35);
  background: rgba(76, 175, 80, 0.06);
}

.wechat-step strong {
  display: block;
  color: var(--text-default);
}

.wechat-step small {
  display: block;
  margin-top: 0.28rem;
  color: var(--text-muted);
}

.wechat-step button {
  margin-top: 0.6rem;
  width: 100%;
  min-height: 38px;
  border: none;
  border-radius: 10px;
  background: var(--brand-gold);
  color: white;
  font-weight: 700;
}

.wechat-step button:disabled {
  background: #d8c0a0;
}

.wechat-close {
  margin-top: 0.85rem;
  width: 100%;
  min-height: 40px;
  border: none;
  border-radius: 10px;
  background: #f2f5f7;
  color: var(--text-muted);
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.2s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
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
