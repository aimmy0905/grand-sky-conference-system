<template>
  <div class="phone-shell">
    <div class="phone-shell__device">
      <div class="phone-shell__status">
        <span>9:41</span>
        <span>{{ system.shortName }} · {{ system.viewport }}</span>
      </div>

      <header class="phone-shell__header">
        <span class="phone-shell__back">‹</span>
        <strong>{{ page.screenTitle }}</strong>
        <span class="phone-shell__menu">···</span>
      </header>

      <div class="phone-shell__body">
        <section
          v-for="(section, index) in page.sections"
          :key="`${page.slug}-${section.type}-${index}`"
          class="section"
        >
          <template v-if="section.type === 'hero'">
            <div class="hero-card">
              <span v-if="section.tag" class="chip">{{ section.tag }}</span>
              <h3>{{ section.title }}</h3>
              <p>{{ section.description }}</p>
            </div>
          </template>

          <template v-else-if="section.type === 'stats'">
            <div class="stats-grid">
              <article v-for="item in section.items" :key="item.title" class="stats-card">
                <small>{{ item.title }}</small>
                <strong>{{ item.meta }}</strong>
                <span>{{ item.subtitle }}</span>
              </article>
            </div>
          </template>

          <template v-else-if="section.type === 'cards' || section.type === 'list'">
            <div class="section-title">
              <h4>{{ section.title }}</h4>
            </div>
            <article v-for="item in section.items" :key="item.title" class="entry-card">
              <div>
                <div class="entry-card__head">
                  <strong>{{ item.title }}</strong>
                  <span v-if="item.badge" class="badge">{{ item.badge }}</span>
                </div>
                <p v-if="item.subtitle">{{ item.subtitle }}</p>
                <small v-if="item.meta">{{ item.meta }}</small>
              </div>
              <button v-if="item.action" type="button">{{ item.action }}</button>
            </article>
          </template>

          <template v-else-if="section.type === 'form'">
            <div class="section-title">
              <h4>{{ section.title }}</h4>
            </div>
            <label v-for="field in section.fields" :key="field.label" class="field">
              <span>{{ field.label }}</span>
              <div class="field__box">
                <strong>{{ field.value || field.placeholder }}</strong>
                <small>{{ field.type }}</small>
              </div>
            </label>
            <p v-if="section.text" class="section-tip">{{ section.text }}</p>
          </template>

          <template v-else-if="section.type === 'timeline'">
            <div class="section-title">
              <h4>{{ section.title }}</h4>
            </div>
            <div class="timeline">
              <article v-for="item in section.items" :key="item.title" class="timeline__item">
                <span class="timeline__dot"></span>
                <div>
                  <strong>{{ item.title }}</strong>
                  <p>{{ item.subtitle }}</p>
                  <small>{{ item.meta }}</small>
                </div>
              </article>
            </div>
          </template>

          <template v-else-if="section.type === 'qr'">
            <div class="section-title">
              <h4>{{ section.title }}</h4>
            </div>
            <div class="qr-box">
              <div class="qr-box__grid">
                <span
                  v-for="n in 36"
                  :key="n"
                  :class="{ active: [1, 2, 5, 7, 9, 10, 13, 15, 18, 20, 22, 24, 28, 30, 31, 34].includes(n) }"
                />
              </div>
              <strong>{{ section.code }}</strong>
              <p>{{ section.description }}</p>
              <small>{{ section.footer }}</small>
            </div>
          </template>

          <template v-else-if="section.type === 'notice'">
            <div class="notice" :data-tone="section.tone || 'navy'">
              {{ section.text }}
            </div>
          </template>
        </section>
      </div>

      <nav v-if="page.bottomNav?.length" class="phone-shell__nav">
        <span
          v-for="item in page.bottomNav"
          :key="item.label"
          :class="{ active: item.active }"
        >
          {{ item.label }}
        </span>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PrototypePage, PrototypeSystem } from '../data/prototype';

defineProps<{
  page: PrototypePage
  system: PrototypeSystem
}>();
</script>

<style scoped lang="scss">
.phone-shell {
  display: flex;
  justify-content: center;
}

.phone-shell__device {
  width: min(100%, 390px);
  min-height: 760px;
  border: 10px solid #111827;
  border-radius: 38px;
  background: white;
  box-shadow: var(--shadow-soft);
  overflow: hidden;
}

.phone-shell__status,
.phone-shell__header,
.phone-shell__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1rem;
}

.phone-shell__status {
  background: var(--brand-navy);
  color: rgba(255, 255, 255, 0.84);
  font-size: 0.8rem;
}

.phone-shell__header {
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid var(--surface-line);
}

.phone-shell__back,
.phone-shell__menu {
  width: 1.5rem;
  text-align: center;
  color: var(--text-muted);
}

.phone-shell__body {
  display: grid;
  gap: 0.9rem;
  padding: 1rem;
  background: var(--surface-page);
}

.phone-shell__nav {
  border-top: 1px solid var(--surface-line);
  background: white;

  span {
    flex: 1;
    text-align: center;
    color: var(--text-muted);
    font-size: 0.85rem;
  }

  .active {
    color: var(--brand-gold);
    font-weight: 700;
  }
}

.hero-card,
.entry-card,
.field__box,
.notice,
.qr-box,
.stats-card {
  border-radius: var(--radius-md);
  background: white;
  box-shadow: var(--shadow-card);
}

.hero-card {
  padding: 1.15rem;
  background: linear-gradient(180deg, rgba(200, 169, 126, 0.18), white);
}

.hero-card h3,
.hero-card p,
.section-title h4 {
  margin: 0;
}

.hero-card h3 {
  margin-top: 0.65rem;
  margin-bottom: 0.35rem;
}

.hero-card p,
.stats-card span,
.entry-card p,
.entry-card small,
.timeline__item p,
.timeline__item small,
.section-tip {
  color: var(--text-muted);
}

.chip,
.badge {
  display: inline-flex;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: rgba(200, 169, 126, 0.16);
  color: var(--brand-gold-dark);
  font-size: 0.75rem;
  font-weight: 700;
}

.section-title h4 {
  margin-bottom: 0.7rem;
  color: var(--brand-navy);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.stats-card {
  padding: 0.95rem;
}

.stats-card small,
.stats-card span {
  display: block;
}

.stats-card strong {
  display: block;
  margin: 0.3rem 0;
  font-size: 1.1rem;
  color: var(--brand-navy);
}

.entry-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 0.95rem;
  margin-bottom: 0.75rem;
}

.entry-card p,
.entry-card small {
  margin: 0.25rem 0 0;
}

.entry-card__head {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: wrap;
}

.entry-card button {
  border: none;
  border-radius: 999px;
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
  padding: 0.55rem 0.8rem;
  white-space: nowrap;
}

.field {
  display: grid;
  gap: 0.45rem;
  margin-bottom: 0.75rem;
}

.field__box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1rem;
}

.field__box small {
  color: var(--text-light);
  text-transform: uppercase;
}

.timeline {
  display: grid;
  gap: 0.9rem;
}

.timeline__item {
  display: grid;
  grid-template-columns: 16px 1fr;
  gap: 0.8rem;
}

.timeline__dot {
  width: 12px;
  height: 12px;
  margin-top: 0.25rem;
  border-radius: 50%;
  background: var(--brand-gold);
  box-shadow: 0 0 0 5px rgba(200, 169, 126, 0.16);
}

.timeline__item p,
.timeline__item small {
  margin: 0.25rem 0 0;
}

.qr-box {
  display: grid;
  place-items: center;
  gap: 0.7rem;
  padding: 1.2rem;
  text-align: center;
}

.qr-box__grid {
  display: grid;
  grid-template-columns: repeat(6, 18px);
  gap: 4px;
}

.qr-box__grid span {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: #eceff3;
}

.qr-box__grid .active {
  background: var(--brand-navy);
}

.notice {
  padding: 0.95rem 1rem;
  color: white;
  font-size: 0.92rem;
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
</style>
