<template>
  <div class="app-page">
    <AppHeader title="了解格兰云天" back />

    <main class="app-page__body">
      <section class="hero-card">
        <small>品牌故事</small>
        <h1>以酒店为中心的高效会务服务</h1>
        <p>格兰云天持续打造“会前-会中-会后”一体化会议体验，兼顾品牌品质和运营效率。</p>
      </section>

      <section class="section-card">
        <h2>核心能力</h2>
        <article class="ability-card" v-for="item in abilities" :key="item.title">
          <strong>{{ item.title }}</strong>
          <p>{{ item.desc }}</p>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';

const abilities = [
  { title: '会务数字化协同', desc: '会议信息、参会名单、通知回执统一管理，减少人工传递成本。' },
  { title: '标准化接待服务', desc: '酒店前厅、宴会、餐饮团队联动，确保重要会务节点稳定交付。' },
  { title: '数据回流与复盘', desc: '签到、回执、核销数据沉淀，支撑会后复盘与后续客户经营。' },
];
</script>

<style scoped lang="scss">
.app-page {
  min-height: 100vh;
  max-width: 430px;
  margin: 0 auto;
  background: white;
}

.app-page__body {
  min-height: calc(100vh - 48px);
  padding: 1rem;
  background: var(--surface-page);
}

.hero-card,
.section-card {
  border-radius: 22px;
  padding: 1rem;
  background: white;
  box-shadow: var(--shadow-card);
}

.hero-card {
  margin-bottom: 0.9rem;
  background: linear-gradient(140deg, #192a41 0%, #355075 100%);
  color: white;
}

.hero-card small {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  padding: 0.22rem 0.65rem;
}

.hero-card h1 {
  margin: 0.65rem 0 0.55rem;
  font-size: 1.32rem;
}

.hero-card p {
  margin: 0;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.92);
}

h2 {
  margin: 0 0 0.7rem;
  color: #12253d;
  font-size: 1.05rem;
}

.ability-card {
  border-radius: 14px;
  background: #f7fafc;
  padding: 0.9rem;
  margin-bottom: 0.6rem;
}

.ability-card:last-child {
  margin-bottom: 0;
}

.ability-card strong {
  color: #11253b;
}

.ability-card p {
  margin: 0.4rem 0 0;
  color: var(--text-muted);
  line-height: 1.68;
}
</style>
