<template>
  <header class="header">
    <div class="header__inner">
      <RouterLink class="header__brand" to="/">
        <span class="header__brand-mark">GLY</span>
        <span>
          <strong>格兰云天会议管理系统</strong>
          <small>Web Prototype</small>
        </span>
      </RouterLink>

      <nav class="header__nav">
        <RouterLink to="/">总览</RouterLink>
        <RouterLink to="/attendee">参会端</RouterLink>
        <RouterLink to="/verifier">核销端</RouterLink>
        <RouterLink to="/sales">会务端</RouterLink>
        <RouterLink to="/admin">管理后台</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid rgba(25, 42, 65, 0.08);
  background: rgba(248, 249, 250, 0.92);
  backdrop-filter: blur(18px);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
}

.header__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  color: var(--brand-navy);
  text-decoration: none;

  strong,
  small {
    display: block;
  }

  small {
    margin-top: 0.2rem;
    color: var(--text-muted);
  }
}

.header__brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 0.95rem;
  background: linear-gradient(145deg, var(--brand-gold), #b8966a);
  color: white;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.header__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  a {
    padding: 0.65rem 0.9rem;
    border-radius: 999px;
    color: var(--text-default);
    text-decoration: none;
    transition: 0.2s ease;
  }

  a:hover,
  a.router-link-active {
    background: rgba(200, 169, 126, 0.14);
    color: var(--brand-navy);
  }
}

@media (max-width: 960px) {
  .header__inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
