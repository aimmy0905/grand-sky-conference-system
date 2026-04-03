<template>
  <div class="app-page">
    <AppHeader title="填写回执" back />

    <main class="app-page__body">
      <section class="form-card">
        <div class="form-head">
          <h1>标准会议回执</h1>
          <small>截止时间：2026-05-30 18:00</small>
        </div>

        <label class="field">
          <span>到达时间</span>
          <input v-model="form.arriveAt" type="datetime-local" :disabled="submitted" />
        </label>

        <label class="field">
          <span>离开时间</span>
          <input v-model="form.leaveAt" type="datetime-local" :disabled="submitted" />
        </label>

        <label class="field">
          <span>是否需要接送</span>
          <select v-model="form.pickup" :disabled="submitted">
            <option>需要</option>
            <option>不需要</option>
          </select>
        </label>

        <label class="field">
          <span>是否需要住宿</span>
          <select v-model="form.hotel" :disabled="submitted">
            <option>需要</option>
            <option>不需要</option>
          </select>
        </label>

        <label class="field">
          <span>是否需要餐饮</span>
          <select v-model="form.meal" :disabled="submitted">
            <option>需要</option>
            <option>不需要</option>
          </select>
        </label>

        <button type="button" class="primary-btn" :disabled="submitted" @click="submitOpen = true">
          {{ submitted ? '已提交，不可修改' : '提交回执' }}
        </button>
      </section>
    </main>

    <AppDialog
      v-model:open="submitOpen"
      title="确认提交回执"
      description="提交后将无法修改，请确认信息填写无误。"
      confirm-text="确认提交"
      @confirm="handleSubmit"
    />

    <p v-if="toastText" class="toast">{{ toastText }}</p>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import AppDialog from '../components/AppDialog.vue';
import AppHeader from '../components/AppHeader.vue';

const form = reactive({
  arriveAt: '2026-05-31T20:30',
  leaveAt: '2026-06-02T14:00',
  pickup: '需要',
  hotel: '需要',
  meal: '需要',
});

const submitOpen = ref(false);
const submitted = ref(false);
const toastText = ref('');

const handleSubmit = () => {
  submitOpen.value = false;
  submitted.value = true;
  toastText.value = '回执提交成功，会务已收到';
  setTimeout(() => {
    toastText.value = '';
  }, 1600);
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
  padding: 1rem;
  background: var(--surface-page);
}

.form-card {
  padding: 1.1rem;
  border-radius: 22px;
  background: white;
  box-shadow: var(--shadow-card);
}

.form-head {
  margin-bottom: 1rem;
}

.form-head h1 {
  margin: 0;
  color: #12253d;
  font-size: 1.2rem;
}

.form-head small {
  display: block;
  margin-top: 0.45rem;
  color: var(--danger);
}

.field {
  display: grid;
  gap: 0.45rem;
  margin-bottom: 0.9rem;
}

.field span {
  color: var(--text-muted);
  font-size: 0.92rem;
}

.field input,
.field select {
  width: 100%;
  min-height: 48px;
  border: 1px solid var(--surface-line);
  border-radius: 14px;
  padding: 0 0.95rem;
  background: white;
}

.field input:disabled,
.field select:disabled {
  background: #f3f5f7;
  color: #97a3b1;
}

.primary-btn {
  width: 100%;
  min-height: 48px;
  border: none;
  border-radius: 14px;
  background: var(--wechat-green);
  color: white;
  font-weight: 700;
}

.primary-btn:disabled {
  background: #b4d8c3;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 1.4rem;
  transform: translateX(-50%);
  margin: 0;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  font-size: 0.78rem;
  color: white;
  background: rgba(17, 24, 39, 0.86);
}
</style>
