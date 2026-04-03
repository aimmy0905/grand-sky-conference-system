<template>
  <div class="page-shell">
    <AppHeader title="绑定手机号" back />

    <main class="page-body">
      <section class="card">
        <h2>手机号验证</h2>
        <p>完成微信身份与参会账号绑定，后续可直接登录参会端。</p>

        <label class="field">
          <span>手机号</span>
          <input v-model="mobile" type="tel" maxlength="11" placeholder="请输入手机号" />
        </label>

        <label class="field">
          <span>验证码</span>
          <div class="field-row">
            <input v-model="code" type="text" maxlength="6" placeholder="请输入6位验证码" />
            <button type="button" class="secondary-btn" :disabled="!mobileValid">
              {{ mobileValid ? '获取验证码' : '手机号错误' }}
            </button>
          </div>
        </label>

        <p v-if="errorText" class="error">{{ errorText }}</p>
        <button type="button" class="primary-btn" :disabled="!canSubmit" @click="onSubmit">绑定并登录</button>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppHeader from '../components/AppHeader.vue';

const mobile = ref('13800138000');
const code = ref('864219');
const errorText = ref('');
const router = useRouter();
const mobileValid = computed(() => /^1\d{10}$/.test(mobile.value));
const codeValid = computed(() => /^\d{6}$/.test(code.value));
const canSubmit = computed(() => mobileValid.value && codeValid.value);

const onSubmit = () => {
  if (!canSubmit.value) {
    errorText.value = '手机号或验证码格式错误，请重新输入';
    return;
  }
  errorText.value = '';
  router.push('/home');
};
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
  color: #12253d;
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
  background: var(--wechat-green-soft);
  color: var(--wechat-green-dark);
}

.primary-btn {
  width: 100%;
  background: var(--wechat-green);
  color: white;
  font-weight: 700;
}

.primary-btn:disabled {
  background: #b4d8c3;
}

.error {
  margin: 0 0 0.7rem;
  color: var(--danger);
  font-size: 0.8rem;
  text-align: center;
}
</style>
