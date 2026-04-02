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
          <input v-model="form.arriveAt" type="datetime-local" />
        </label>

        <label class="field">
          <span>离开时间</span>
          <input v-model="form.leaveAt" type="datetime-local" />
        </label>

        <label class="field">
          <span>是否需要接送</span>
          <select v-model="form.pickup">
            <option>需要</option>
            <option>不需要</option>
          </select>
        </label>

        <label class="field">
          <span>是否需要住宿</span>
          <select v-model="form.hotel">
            <option>需要</option>
            <option>不需要</option>
          </select>
        </label>

        <label class="field">
          <span>是否需要餐饮</span>
          <select v-model="form.meal">
            <option>需要</option>
            <option>不需要</option>
          </select>
        </label>

        <button type="button" class="primary-btn">提交回执</button>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import AppHeader from '../components/AppHeader.vue';

const form = reactive({
  arriveAt: '2026-05-31T20:30',
  leaveAt: '2026-06-02T14:00',
  pickup: '需要',
  hotel: '需要',
  meal: '需要',
});
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
  color: var(--brand-navy);
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

.primary-btn {
  width: 100%;
  min-height: 48px;
  border: none;
  border-radius: 14px;
  background: var(--brand-gold);
  color: white;
  font-weight: 700;
}
</style>
