<template>
  <div class="app-page">
    <AppHeader title="会议资料" back />

    <main class="app-page__body">
      <section class="section-card">
        <h1>资料列表</h1>
        <div class="material-row" v-for="item in materials" :key="item.id">
          <div>
            <strong>{{ item.name }}</strong>
            <p>{{ item.category }} · {{ item.size }}</p>
          </div>
          <button type="button">预览</button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
import { materials } from '../data/mock';
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

.section-card {
  padding: 1rem;
  border-radius: 22px;
  background: white;
  box-shadow: var(--shadow-card);
}

.section-card h1 {
  margin: 0 0 0.8rem;
  color: var(--brand-navy);
  font-size: 1.15rem;
}

.material-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--surface-line);
}

.material-row:last-child {
  border-bottom: none;
}

.material-row p {
  margin: 0.25rem 0 0;
  color: var(--text-muted);
}

.material-row button {
  min-width: 74px;
  min-height: 34px;
  border: none;
  border-radius: 12px;
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
}
</style>
