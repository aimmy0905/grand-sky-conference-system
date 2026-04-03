<template>
  <div class="auth-page">
    <div class="auth-page__brand">
      <div class="brand-mark">GLY</div>
      <h1>格兰云天会议</h1>
      <p>便捷参会，高效管理</p>
    </div>

    <section class="auth-card">
      <p>使用微信授权获取头像和昵称后，完成手机号绑定即可进入参会页面。</p>
      <RouterLink class="primary-btn" to="/bind-phone">
        <span class="wechat-icon"><AppIcon name="wechat" :size="14" /></span>
        <span>微信授权登录</span>
      </RouterLink>
      <small>登录即表示同意《用户服务协议》和《隐私政策》</small>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import AppIcon from '../components/AppIcon.vue';
</script>

<style scoped lang="scss">
.auth-page {
  min-height: 100vh;
  display: grid;
  align-content: center;
  justify-items: center;
  padding: 1rem;
  background:
    radial-gradient(circle at top, rgba(200, 169, 126, 0.22), transparent 32%),
    linear-gradient(180deg, #fbfcfd 0%, #f4f6f8 100%);
}

.auth-page__brand {
  text-align: center;
  margin-bottom: 1.75rem;
}

.brand-mark {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.2rem;
  border-radius: 20px;
  display: grid;
  place-items: center;
  background: linear-gradient(145deg, var(--brand-gold), #b8966a);
  color: white;
  font-weight: 800;
  letter-spacing: 0.16em;
  box-shadow: 0 8px 18px rgba(200, 169, 126, 0.28);
}

.auth-page__brand h1 {
  margin: 0;
  color: var(--text-default);
  font-size: 1.5rem;
  font-weight: 500;
}

.auth-page__brand p {
  margin: 0.6rem 0 0;
  color: var(--text-muted);
}

.auth-card {
  width: 100%;
  max-width: 375px;
  padding: 0.2rem 0;
  text-align: center;
  background: transparent;
  box-shadow: none;
}

.auth-card p {
  width: min(100%, 311px);
  margin: 0 auto 1.2rem;
  color: var(--text-muted);
  line-height: 1.8;
  font-size: 0.9rem;
}

.primary-btn {
  display: grid;
  grid-template-columns: 24px auto;
  place-items: center;
  justify-content: center;
  column-gap: 0.45rem;
  width: min(100%, 311px);
  margin: 0 auto;
  min-height: 48px;
  border-radius: 8px;
  background: var(--brand-gold);
  color: white;
  text-decoration: none;
  font-weight: 700;
  box-shadow: 0 2px 4px rgba(200, 169, 126, 0.2);
}

.wechat-icon {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.7);
}

.auth-card small {
  display: block;
  margin-top: 1.2rem;
  text-align: center;
  color: var(--text-light);
  font-size: 0.75rem;
}
</style>
