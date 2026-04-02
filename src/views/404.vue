<template>
  <div class="not-found">
    <div class="not-found__card">
      <span>404</span>
      <h1>页面不存在</h1>
      <p>当前路由没有对应的原型页面，请返回总览重新选择。</p>
      <RouterLink to="/">返回总览</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped>
.not-found {
  display: grid;
  place-items: center;
  min-height: 70vh;
  padding: 2rem;
}

.not-found__card {
  max-width: 420px;
  padding: 2rem;
  border-radius: 28px;
  background: white;
  box-shadow: var(--shadow-soft);
  text-align: center;
}

.not-found__card span {
  color: var(--brand-gold-dark);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.not-found__card h1 {
  margin: 0.7rem 0 0.5rem;
  color: var(--brand-navy);
}

.not-found__card p {
  margin: 0 0 1rem;
  color: var(--text-muted);
}

.not-found__card a {
  display: inline-flex;
  padding: 0.8rem 1rem;
  border-radius: 999px;
  background: var(--brand-navy);
  color: white;
  text-decoration: none;
}
</style>
