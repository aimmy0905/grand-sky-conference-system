<template>
  <div class="page-shell">
    <AppHeader title="绑定手机号" back />

    <main class="page-body">
      <section class="card">
        <label class="field">
          <span>手机号</span>
          <div class="field-input">
            <AppIcon name="phone" :size="15" />
            <input v-model="mobile" type="tel" maxlength="11" placeholder="请输入手机号" />
          </div>
        </label>

        <label class="field">
          <span>验证码</span>
          <div class="field-row">
            <div class="field-input">
              <AppIcon name="qrcode" :size="15" />
              <input v-model="code" type="text" maxlength="6" placeholder="请输入6位验证码" />
            </div>
            <button type="button" class="secondary-btn" :disabled="countDown > 0 || !mobileValid" @click="startCountDown">
              {{ countDown > 0 ? `${countDown}s后重试` : '获取验证码' }}
            </button>
          </div>
        </label>
      </section>

      <p v-if="errorText" class="error">{{ errorText }}</p>
      <button type="button" class="primary-btn" :disabled="!canSubmit" @click="onSubmit">绑定并登录</button>
    </main>

    <Transition name="fade-up">
      <div v-if="openSelector" class="sheet-mask" @click.self="openSelector = false">
        <section class="sheet-panel">
          <h3>选择所属酒店及部门</h3>
          <label>
            <span>所属酒店</span>
            <select v-model="selectedHotel">
              <option disabled value="">请选择酒店</option>
              <option v-for="hotel in hotelOptions" :key="hotel" :value="hotel">{{ hotel }}</option>
            </select>
          </label>
          <label>
            <span>所属部门</span>
            <select v-model="selectedDepartment" :disabled="!selectedHotel">
              <option disabled value="">请选择会务部门</option>
              <option v-for="department in departmentOptions" :key="department" :value="department">{{ department }}</option>
            </select>
          </label>
          <button type="button" class="sheet-confirm" :disabled="!selectedHotel || !selectedDepartment" @click="confirmSelect">
            确认
          </button>
        </section>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppHeader from '../components/AppHeader.vue';
import AppIcon from '../components/AppIcon.vue';
import { departmentOptions, hotelOptions } from '../data/mock';

const router = useRouter();
const mobile = ref('13900139000');
const code = ref('864219');
const errorText = ref('');
const countDown = ref(0);
const openSelector = ref(false);
const selectedHotel = ref(hotelOptions[0] ?? '');
const selectedDepartment = ref(departmentOptions[0] ?? '');
let timer: number | null = null;

const mobileValid = computed(() => /^1\d{10}$/.test(mobile.value));
const codeValid = computed(() => /^\d{6}$/.test(code.value));
const canSubmit = computed(() => mobileValid.value && codeValid.value);

const startCountDown = () => {
  if (!mobileValid.value || countDown.value > 0) {
    return;
  }
  countDown.value = 60;
  timer = window.setInterval(() => {
    countDown.value -= 1;
    if (countDown.value <= 0 && timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }, 1000);
};

const onSubmit = () => {
  if (!canSubmit.value) {
    errorText.value = '手机号或验证码错误，请重新输入';
    return;
  }
  errorText.value = '';
  openSelector.value = true;
};

const confirmSelect = () => {
  if (!selectedHotel.value || !selectedDepartment.value) {
    return;
  }
  openSelector.value = false;
  router.push('/meetings');
};

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped lang="scss">
.page-shell {
  min-height: 100vh;
  max-width: 430px;
  margin: 0 auto;
  background: white;
}

.page-body {
  padding: 1rem;
  background: var(--surface-page);
  min-height: calc(100vh - 64px);
}

.card {
  padding: 1rem;
  border-radius: 18px;
  background: white;
  box-shadow: var(--shadow-card);
}

.field {
  display: grid;
  gap: 0.5rem;
}

.field + .field {
  margin-top: 1rem;
}

.field span {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.field-input {
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 0.55rem;
  align-items: center;
  min-height: 48px;
  border: 1px solid var(--surface-line);
  border-radius: 14px;
  padding: 0 0.8rem;
  color: var(--text-muted);
}

.field-input:focus-within {
  border-color: var(--brand-gold);
}

.field-input input {
  border: none;
  outline: none;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 105px;
  gap: 0.6rem;
}

.secondary-btn {
  border: none;
  border-radius: 12px;
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
  font-size: 0.74rem;
}

.primary-btn {
  margin-top: 1rem;
  width: 100%;
  min-height: 48px;
  border: none;
  border-radius: 8px;
  background: var(--brand-gold);
  color: white;
  font-weight: 700;
}

.primary-btn:disabled {
  background: #d8c0a0;
}

.error {
  margin: 0.7rem 0 0;
  color: var(--danger);
  font-size: 0.75rem;
  text-align: center;
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

.sheet-confirm:disabled {
  background: #d8c0a0;
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
