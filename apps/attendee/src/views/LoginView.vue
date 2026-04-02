<template>
  <div class="auth-page">
    <div class="auth-page__brand">
      <div class="brand-mark">GLY</div>
      <h1>格兰云天会议</h1>
      <p>便捷参会，高效管理</p>
    </div>

    <section class="auth-card">
      <h2>欢迎登录</h2>
      <p>使用微信授权获取头像和昵称后，完成手机号绑定即可进入参会页面。</p>
      <RouterLink class="primary-btn" to="/bind-phone">微信授权登录</RouterLink>
      <small>登录即表示同意《用户服务协议》和《隐私政策》</small>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped lang="scss">
.auth-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem 1rem;
  background:
    radial-gradient(circle at top, rgba(200, 169, 126, 0.26), transparent 30%),
    linear-gradient(180deg, #fbfcfd 0%, #f4f6f8 100%);
}

.auth-page__brand {
  text-align: center;
  margin-bottom: 1.75rem;
}

.brand-mark {
  width: 82px;
  height: 82px;
  margin: 0 auto 1.2rem;
  border-radius: 24px;
  display: grid;
  place-items: center;
  background: linear-gradient(145deg, var(--brand-gold), #b8966a);
  color: white;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.auth-page__brand h1 {
  margin: 0;
  color: var(--brand-navy);
}

.auth-page__brand p {
  margin: 0.6rem 0 0;
  color: var(--text-muted);
}

.auth-card {
  width: min(100%, 390px);
  padding: 1.4rem;
  border-radius: 24px;
  background: white;
  box-shadow: var(--shadow-soft);
}

.auth-card h2 {
  margin: 0;
  color: var(--brand-navy);
}

.auth-card p {
  margin: 0.8rem 0 1.2rem;
  color: var(--text-muted);
  line-height: 1.8;
}

.primary-btn {
  display: grid;
  place-items: center;
  min-height: 48px;
  border-radius: 14px;
  background: var(--brand-gold);
  color: white;
  text-decoration: none;
  font-weight: 700;
}

.auth-card small {
  display: block;
  margin-top: 1rem;
  text-align: center;
  color: var(--text-light);
}
</style>
