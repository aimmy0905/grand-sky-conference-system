<template>
  <div v-if="system && currentPage" class="workspace">
    <aside class="workspace__sidebar">
      <span class="workspace__label">{{ system.platform }}</span>
      <h1>{{ system.name }}</h1>
      <p>{{ system.description }}</p>

      <div class="workspace__summary">
        <strong>{{ system.shortName }}</strong>
        <span>页面数量：{{ system.businessPageCount }}</span>
        <span>推荐预览：{{ system.viewport }}</span>
      </div>

      <section v-for="group in system.groups" :key="group.title" class="workspace__group">
        <h3>{{ group.title }}</h3>
        <RouterLink
          v-for="entry in group.pages"
          :key="entry.slug"
          :to="`/${entry.slug}`"
          :class="{ active: entry.slug === currentPage.slug }"
        >
          <strong>{{ entry.title }}</strong>
          <small>{{ entry.summary }}</small>
        </RouterLink>
      </section>
    </aside>

    <main class="workspace__main">
      <header class="workspace__hero">
        <div>
          <span class="workspace__eyebrow">{{ currentPage.group }}</span>
          <h2>{{ currentPage.title }}</h2>
          <p>{{ currentPage.summary }}</p>
        </div>

        <div class="workspace__tags">
          <span v-for="highlight in system.highlights" :key="highlight">{{ highlight }}</span>
        </div>
      </header>

      <section class="workspace__info">
        <article class="workspace__card">
          <h3>页面检查点</h3>
          <ul>
            <li v-for="item in currentPage.checkpoints" :key="item">{{ item }}</li>
          </ul>
        </article>

        <article class="workspace__card">
          <h3>流程建议</h3>
          <ol>
            <li v-for="item in currentPage.flow" :key="item">{{ item }}</li>
          </ol>
        </article>
      </section>

      <section class="workspace__preview">
        <MobilePrototype
          v-if="currentPage.layout === 'mobile'"
          :page="currentPage"
          :system="system"
        />
        <AdminPrototype
          v-else
          :page="currentPage"
          :system="system"
        />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { getSystemById } from '../data/prototype';
import AdminPrototype from './AdminPrototype.vue';
import MobilePrototype from './MobilePrototype.vue';

const props = defineProps<{
  systemId: string
  pageSlug?: string | string[]
}>();

const system = computed(() => getSystemById(props.systemId));
const pages = computed(() => system.value?.groups.flatMap(group => group.pages) ?? []);

const currentPage = computed(() => {
  const slug = Array.isArray(props.pageSlug) ? props.pageSlug[0] : props.pageSlug;
  return pages.value.find(item => item.slug === slug) ?? pages.value[0];
});
</script>

<style scoped lang="scss">
.workspace {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 1.5rem;
  max-width: 1600px;
  margin: 0 auto;
  padding: 1.5rem;
}

.workspace__sidebar {
  position: sticky;
  top: 24px;
  align-self: start;
  max-height: calc(100vh - 48px);
  overflow: auto;
  padding: 1.35rem;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: var(--shadow-soft);
}

.workspace__label {
  display: inline-flex;
  padding: 0.28rem 0.68rem;
  border-radius: 999px;
  background: rgba(200, 169, 126, 0.16);
  color: var(--brand-gold-dark);
  font-weight: 700;
}

.workspace__sidebar h1 {
  margin: 0.75rem 0 0.45rem;
  color: var(--brand-navy);
  font-size: 1.75rem;
}

.workspace__sidebar p {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.8;
}

.workspace__summary {
  display: grid;
  gap: 0.35rem;
  margin: 1rem 0 1.2rem;
  padding: 1rem;
  border-radius: 18px;
  background: var(--surface-soft);
}

.workspace__summary span {
  color: var(--text-muted);
  font-size: 0.92rem;
}

.workspace__group {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.workspace__group h3 {
  margin: 0.2rem 0 0;
  color: var(--brand-navy);
  font-size: 1rem;
}

.workspace__group a {
  display: grid;
  gap: 0.15rem;
  padding: 0.75rem 0.85rem;
  border-radius: 16px;
  text-decoration: none;
  background: rgba(248, 249, 250, 0.95);
  transition: 0.2s ease;
}

.workspace__group a strong {
  color: var(--text-default);
}

.workspace__group a small {
  color: var(--text-muted);
}

.workspace__group a.active,
.workspace__group a:hover {
  background: rgba(200, 169, 126, 0.16);
}

.workspace__main {
  display: grid;
  gap: 1rem;
}

.workspace__hero,
.workspace__card,
.workspace__preview {
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: var(--shadow-soft);
}

.workspace__hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.4rem;
}

.workspace__eyebrow {
  display: inline-flex;
  padding: 0.28rem 0.68rem;
  border-radius: 999px;
  background: rgba(200, 169, 126, 0.16);
  color: var(--brand-gold-dark);
  font-weight: 700;
}

.workspace__hero h2 {
  margin: 0.5rem 0 0.45rem;
  color: var(--brand-navy);
  font-size: 2rem;
}

.workspace__hero p {
  margin: 0;
  color: var(--text-muted);
}

.workspace__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.workspace__tags span {
  padding: 0.55rem 0.8rem;
  border-radius: 999px;
  background: var(--surface-page);
  color: var(--text-muted);
}

.workspace__info {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.workspace__card {
  padding: 1.25rem;
}

.workspace__card h3 {
  margin: 0 0 0.8rem;
  color: var(--brand-navy);
}

.workspace__card ul,
.workspace__card ol {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--text-muted);
  line-height: 1.9;
}

.workspace__preview {
  padding: 1.25rem;
}

@media (max-width: 1180px) {
  .workspace {
    grid-template-columns: 1fr;
  }

  .workspace__sidebar {
    position: static;
    max-height: none;
  }

  .workspace__hero,
  .workspace__info {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
