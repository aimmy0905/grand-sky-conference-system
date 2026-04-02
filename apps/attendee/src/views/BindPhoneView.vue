<template>
  <div class="page-shell">
    <AppHeader title="绑定手机号" back />

    <main class="page-body">
      <section class="card">
        <h2>手机号验证</h2>
        <p>完成微信身份与参会账号绑定，后续可直接登录参会端。</p>

        <label class="field">
          <span>手机号</span>
          <input v-model="mobile" type="tel" placeholder="请输入手机号" />
        </label>

        <label class="field">
          <span>验证码</span>
          <div class="field-row">
            <input v-model="code" type="text" placeholder="请输入6位验证码" />
            <button type="button" class="secondary-btn">获取验证码</button>
          </div>
        </label>

        <RouterLink class="primary-btn" to="/home">绑定并登录</RouterLink>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import AppHeader from '../components/AppHeader.vue';

const mobile = ref('13800138000');
const code = ref('864219');
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
  padding: 1.25rem;
  border-radius: 22px;
  background: white;
  box-shadow: var(--shadow-card);
}

.card h2 {
  margin: 0;
  color: var(--brand-navy);
}

.card p {
  margin: 0.7rem 0 1rem;
  color: var(--text-muted);
  line-height: 1.7;
}

.field {
  display: grid;
  gap: 0.45rem;
  margin-bottom: 1rem;
}

.field span {
  color: var(--text-muted);
  font-size: 0.92rem;
}

.field input {
  width: 100%;
  min-height: 48px;
  border: 1px solid var(--surface-line);
  border-radius: 14px;
  padding: 0 0.95rem;
  outline: none;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 112px;
  gap: 0.65rem;
}

.secondary-btn,
.primary-btn {
  border: none;
  border-radius: 14px;
  min-height: 48px;
  display: grid;
  place-items: center;
  text-decoration: none;
}

.secondary-btn {
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
}

.primary-btn {
  background: var(--brand-gold);
  color: white;
  font-weight: 700;
}
</style>
