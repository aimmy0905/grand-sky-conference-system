<template>
  <div class="admin-shell">
    <header class="admin-shell__topbar">
      <strong>格兰云天会议管理系统</strong>
      <div>
        <span>{{ page.group }}</span>
        <span class="divider">/</span>
        <span>{{ page.title }}</span>
      </div>
      <span>管理员 · 原型模式</span>
    </header>

    <div class="admin-shell__content">
      <aside class="admin-shell__sidebar">
        <div v-for="group in system.groups" :key="group.title" class="menu-group">
          <h4>{{ group.title }}</h4>
          <span
            v-for="menu in group.pages"
            :key="menu.slug"
            :class="{ active: menu.slug === page.slug }"
          >
            {{ menu.title }}
          </span>
        </div>
      </aside>

      <section class="admin-shell__canvas">
        <div class="admin-shell__header">
          <div>
            <p class="crumb">工作台 / {{ page.group }}</p>
            <h3>{{ page.title }}</h3>
            <small>{{ page.summary }}</small>
          </div>
          <button type="button">导出数据</button>
        </div>

        <div class="admin-shell__body">
          <section
            v-for="(section, index) in page.sections"
            :key="`${page.slug}-${section.type}-${index}`"
            class="panel"
          >
            <template v-if="section.type === 'hero'">
              <div class="hero">
                <span v-if="section.tag" class="tag">{{ section.tag }}</span>
                <h4>{{ section.title }}</h4>
                <p>{{ section.description }}</p>
              </div>
            </template>

            <template v-else-if="section.type === 'stats'">
              <div class="stats-grid">
                <article v-for="item in section.items" :key="item.title" class="stat-card">
                  <small>{{ item.title }}</small>
                  <strong>{{ item.meta }}</strong>
                </article>
              </div>
            </template>

            <template v-else-if="section.type === 'cards' || section.type === 'list'">
              <h4 v-if="section.title">{{ section.title }}</h4>
              <div class="card-grid" :class="{ compact: section.type === 'list' }">
                <article v-for="item in section.items" :key="item.title" class="info-card">
                  <strong>{{ item.title }}</strong>
                  <p v-if="item.subtitle">{{ item.subtitle }}</p>
                  <small v-if="item.meta">{{ item.meta }}</small>
                  <button v-if="item.action" type="button">{{ item.action }}</button>
                </article>
              </div>
            </template>

            <template v-else-if="section.type === 'table'">
              <h4>{{ section.title }}</h4>
              <div class="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th v-for="column in section.columns" :key="column">{{ column }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, rowIndex) in section.rows" :key="rowIndex">
                      <td v-for="cell in row" :key="cell">{{ cell }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>

            <template v-else-if="section.type === 'chart'">
              <h4>{{ section.title }}</h4>
              <div class="chart-grid">
                <article v-for="item in section.items" :key="item.title" class="chart-bar">
                  <span>{{ item.hint }}</span>
                  <div class="chart-bar__track">
                    <i />
                  </div>
                  <strong>{{ item.title }}</strong>
                  <small>{{ item.meta }}</small>
                </article>
              </div>
            </template>

            <template v-else-if="section.type === 'calendar'">
              <h4>{{ section.title }}</h4>
              <div class="calendar-grid">
                <article v-for="item in section.items" :key="item.title" class="calendar-card">
                  <strong>{{ item.title }}</strong>
                  <p>{{ item.subtitle }}</p>
                  <small>{{ item.meta }}</small>
                </article>
              </div>
            </template>

            <template v-else-if="section.type === 'notice'">
              <div class="notice" :data-tone="section.tone || 'navy'">
                {{ section.text }}
              </div>
            </template>
          </section>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PrototypePage, PrototypeSystem } from '@/data/prototype';

defineProps<{
  page: PrototypePage
  system: PrototypeSystem
}>();
</script>

<style scoped lang="scss">
.admin-shell {
  overflow: hidden;
  border-radius: 28px;
  background: white;
  box-shadow: var(--shadow-soft);
}

.admin-shell__topbar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: white;
  border-bottom: 1px solid var(--surface-line);
}

.divider {
  margin: 0 0.45rem;
}

.admin-shell__content {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 920px;
}

.admin-shell__sidebar {
  padding: 1.2rem;
  background: var(--brand-navy);
  color: rgba(255, 255, 255, 0.84);
}

.menu-group {
  display: grid;
  gap: 0.45rem;
  margin-bottom: 1.2rem;
}

.menu-group h4 {
  margin: 0 0 0.4rem;
  color: white;
}

.menu-group span {
  padding: 0.72rem 0.8rem;
  border-radius: 12px;
}

.menu-group .active {
  background: rgba(200, 169, 126, 0.92);
  color: white;
}

.admin-shell__canvas {
  padding: 1.5rem;
  background: var(--surface-page);
}

.admin-shell__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.admin-shell__header h3 {
  margin: 0.2rem 0;
  font-size: 1.55rem;
}

.admin-shell__header small,
.admin-shell__header .crumb {
  color: var(--text-muted);
}

.admin-shell__header button {
  border: none;
  border-radius: 999px;
  background: var(--brand-gold);
  color: white;
  padding: 0.8rem 1.2rem;
}

.admin-shell__body {
  display: grid;
  gap: 1rem;
}

.panel {
  padding: 1.2rem;
  border-radius: 20px;
  background: white;
  box-shadow: var(--shadow-card);
}

.panel h4 {
  margin: 0 0 0.9rem;
  color: var(--brand-navy);
}

.hero {
  padding: 1rem;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(200, 169, 126, 0.18), white);
}

.hero h4,
.hero p {
  margin: 0.45rem 0 0;
}

.hero p {
  color: var(--text-muted);
}

.tag {
  display: inline-flex;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: rgba(200, 169, 126, 0.14);
  color: var(--brand-gold-dark);
}

.stats-grid,
.card-grid,
.chart-grid,
.calendar-grid {
  display: grid;
  gap: 1rem;
}

.stats-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.stat-card,
.info-card,
.chart-bar,
.calendar-card {
  padding: 1rem;
  border: 1px solid rgba(25, 42, 65, 0.06);
  border-radius: 18px;
  background: white;
}

.stat-card strong {
  display: block;
  margin-top: 0.45rem;
  font-size: 1.45rem;
}

.card-grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.card-grid.compact {
  grid-template-columns: 1fr;
}

.info-card {
  display: grid;
  gap: 0.5rem;
}

.info-card p,
.info-card small {
  margin: 0;
  color: var(--text-muted);
}

.info-card button {
  justify-self: start;
  border: none;
  border-radius: 999px;
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
  padding: 0.55rem 0.9rem;
}

.table-wrap {
  overflow: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  padding: 0.9rem 0.75rem;
  border-bottom: 1px solid var(--surface-line);
  text-align: left;
}

table th {
  background: var(--surface-soft);
  color: var(--text-muted);
  font-weight: 600;
}

.chart-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.chart-bar__track {
  height: 160px;
  display: flex;
  align-items: flex-end;
  margin: 0.75rem 0;
  padding: 0.5rem;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(200, 169, 126, 0.08), rgba(25, 42, 65, 0.06));
}

.chart-bar__track i {
  display: block;
  width: 100%;
  height: 70%;
  border-radius: 14px 14px 6px 6px;
  background: linear-gradient(180deg, var(--brand-gold), var(--brand-navy));
}

.calendar-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.calendar-card small,
.calendar-card p {
  display: block;
  margin: 0.35rem 0 0;
  color: var(--text-muted);
}

.notice {
  padding: 1rem;
  border-radius: 16px;
  color: white;
}

.notice[data-tone='success'] {
  background: var(--success);
}

.notice[data-tone='danger'] {
  background: var(--danger);
}

.notice[data-tone='warning'] {
  background: var(--warning);
}

.notice[data-tone='navy'] {
  background: var(--brand-navy);
}

@media (max-width: 1180px) {
  .admin-shell__content {
    grid-template-columns: 1fr;
  }

  .stats-grid,
  .chart-grid,
  .calendar-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
