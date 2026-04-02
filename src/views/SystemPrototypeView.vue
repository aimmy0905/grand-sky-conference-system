<template>
  <div v-if="system && currentPage" class="system-view">
    <aside class="system-view__sidebar">
      <RouterLink class="back-link" to="/">返回总览</RouterLink>
      <h1>{{ system.shortName }}</h1>
      <p>{{ system.description }}</p>

      <div class="summary-card">
        <strong>{{ system.platform }}</strong>
        <span>业务页数量：{{ system.businessPageCount }}</span>
        <span>预览尺寸：{{ system.viewport }}</span>
      </div>

      <section v-for="group in system.groups" :key="group.title" class="nav-group">
        <h3>{{ group.title }}</h3>
        <RouterLink
          v-for="entry in group.pages"
          :key="entry.slug"
          :to="`/${system.id}/${entry.slug}`"
          :class="{ active: entry.slug === currentPage.slug }"
        >
          <strong>{{ entry.title }}</strong>
          <small>{{ entry.summary }}</small>
        </RouterLink>
      </section>
    </aside>

    <main class="system-view__content">
      <section class="content-hero">
        <div>
          <span class="eyebrow">{{ currentPage.group }}</span>
          <h2>{{ currentPage.title }}</h2>
          <p>{{ currentPage.summary }}</p>
        </div>

        <div class="hero-tags">
          <span v-for="highlight in system.highlights" :key="highlight">{{ highlight }}</span>
        </div>
      </section>

      <section class="info-grid">
        <article class="info-card">
          <h3>页面检查点</h3>
          <ul>
            <li v-for="item in currentPage.checkpoints" :key="item">{{ item }}</li>
          </ul>
        </article>

        <article class="info-card">
          <h3>推荐流程</h3>
          <ol>
            <li v-for="item in currentPage.flow" :key="item">{{ item }}</li>
          </ol>
        </article>
      </section>

      <section class="preview-panel">
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

  <div v-else class="system-view system-view--empty">
    <h1>未找到对应系统</h1>
    <RouterLink to="/">返回总览</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import AdminPrototype from '@/components/prototype/AdminPrototype.vue';
import MobilePrototype from '@/components/prototype/MobilePrototype.vue';
import { getSystemById } from '@/data/prototype';

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
.system-view {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 1.5rem;
  max-width: 1600px;
  margin: 0 auto;
  padding: 1.5rem;
}

.system-view__sidebar {
  position: sticky;
  top: 88px;
  align-self: start;
  max-height: calc(100vh - 104px);
  overflow: auto;
  padding: 1.35rem;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: var(--shadow-soft);
}

.system-view__sidebar h1 {
  margin: 0.6rem 0 0.4rem;
  color: var(--brand-navy);
}

.system-view__sidebar p {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.8;
}

.back-link {
  color: var(--brand-gold-dark);
  text-decoration: none;
}

.summary-card {
  display: grid;
  gap: 0.35rem;
  margin: 1rem 0 1.2rem;
  padding: 1rem;
  border-radius: 18px;
  background: var(--surface-soft);
}

.summary-card span {
  color: var(--text-muted);
  font-size: 0.92rem;
}

.nav-group {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.nav-group h3 {
  margin: 0.2rem 0 0;
  color: var(--brand-navy);
  font-size: 1rem;
}

.nav-group a {
  display: grid;
  gap: 0.15rem;
  padding: 0.75rem 0.85rem;
  border-radius: 16px;
  text-decoration: none;
  background: rgba(248, 249, 250, 0.95);
  transition: 0.2s ease;
}

.nav-group a strong {
  color: var(--text-default);
}

.nav-group a small {
  color: var(--text-muted);
}

.nav-group a.active,
.nav-group a:hover {
  background: rgba(200, 169, 126, 0.16);
}

.system-view__content {
  display: grid;
  gap: 1rem;
}

.content-hero,
.info-card,
.preview-panel {
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: var(--shadow-soft);
}

.content-hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.4rem;
}

.content-hero h2 {
  margin: 0.5rem 0 0.45rem;
  color: var(--brand-navy);
  font-size: 2rem;
}

.content-hero p {
  margin: 0;
  color: var(--text-muted);
}

.eyebrow {
  display: inline-flex;
  padding: 0.28rem 0.68rem;
  border-radius: 999px;
  background: rgba(200, 169, 126, 0.16);
  color: var(--brand-gold-dark);
  font-weight: 700;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.hero-tags span {
  padding: 0.55rem 0.8rem;
  border-radius: 999px;
  background: var(--surface-page);
  color: var(--text-muted);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.info-card {
  padding: 1.25rem;
}

.info-card h3 {
  margin: 0 0 0.8rem;
  color: var(--brand-navy);
}

.info-card ul,
.info-card ol {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--text-muted);
  line-height: 1.9;
}

.preview-panel {
  padding: 1.25rem;
}

.system-view--empty {
  display: grid;
  place-items: center;
  min-height: 60vh;
  grid-template-columns: 1fr;
}

@media (max-width: 1180px) {
  .system-view {
    grid-template-columns: 1fr;
  }

  .system-view__sidebar {
    position: static;
    max-height: none;
  }

  .content-hero,
  .info-grid {
    grid-template-columns: 1fr;
    display: grid;
  }
}
</style>
