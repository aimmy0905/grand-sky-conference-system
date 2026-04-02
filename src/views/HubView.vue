<template>
  <div class="hub">
    <section class="hub__hero">
      <div>
        <span class="eyebrow">Hotel Meeting Prototype</span>
        <h1>格兰云天会议管理系统原型站</h1>
        <p>
          当前工程已按文档拆成 3 个小程序端和 1 个管理后台端，全部为纯前端页面，
          用于需求澄清、流程评审和后续视觉深化。
        </p>
      </div>

      <div class="hub__hero-card">
        <strong>交付范围</strong>
        <ul>
          <li>通用登录流程：4 个原型页</li>
          <li>参会人员端：10 个业务页</li>
          <li>核销人员端：5 个业务页</li>
          <li>会务销售端：8 个业务页</li>
          <li>Web 管理后台：12 个业务页</li>
        </ul>
      </div>
    </section>

    <section class="hub__systems">
      <article
        v-for="systemId in systemOrder"
        :key="systemId"
        class="system-card"
      >
        <div class="system-card__head">
          <span>{{ prototypeSystems[systemId].platform }}</span>
          <strong>{{ prototypeSystems[systemId].shortName }}</strong>
        </div>
        <h2>{{ prototypeSystems[systemId].name }}</h2>
        <p>{{ prototypeSystems[systemId].description }}</p>
        <ul>
          <li v-for="highlight in prototypeSystems[systemId].highlights" :key="highlight">{{ highlight }}</li>
        </ul>
        <RouterLink class="system-card__action" :to="`/${systemId}`">
          进入原型
        </RouterLink>
      </article>
    </section>

    <section class="hub__grid">
      <article class="panel">
        <h3>业务流程</h3>
        <ol>
          <li>后台配置酒店、会议室、回执模板和周边信息。</li>
          <li>会务端创建会议、维护参会人、上传资料并发送通知。</li>
          <li>参会端查看会议信息、填写回执、签到并展示餐券。</li>
          <li>核销端扫码核销，后台和会务端同步查看明细与统计。</li>
        </ol>
      </article>

      <article class="panel">
        <h3>视觉规范</h3>
        <div class="tokens">
          <span class="token token--gold">#C8A97E 品牌金</span>
          <span class="token token--navy">#192A41 品牌蓝</span>
          <span class="token token--soft">#F5F0E8 浅米金</span>
          <span class="token token--page">#F8F9FA 页面背景</span>
        </div>
      </article>

      <article class="panel">
        <h3>建议下一步</h3>
        <ul>
          <li>先定四端导航和页面优先级，再细化高保真视觉稿。</li>
          <li>对接接口前，可在当前结构上继续补交互动效和假数据状态。</li>
          <li>如需拆成独立子应用，可基于当前数据源继续分目录演进。</li>
        </ul>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { prototypeSystems, systemOrder } from '@/data/prototype';
</script>

<style scoped lang="scss">
.hub {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
}

.hub__hero {
  display: grid;
  grid-template-columns: 1.4fr 0.9fr;
  gap: 1.5rem;
  align-items: stretch;
  margin-bottom: 1.5rem;
}

.hub__hero h1 {
  margin: 0.4rem 0 0.8rem;
  font-size: clamp(2rem, 5vw, 3.6rem);
  line-height: 1.05;
  color: var(--brand-navy);
}

.hub__hero p {
  max-width: 56rem;
  margin: 0;
  color: var(--text-muted);
  font-size: 1.05rem;
  line-height: 1.8;
}

.eyebrow {
  display: inline-flex;
  padding: 0.28rem 0.7rem;
  border-radius: 999px;
  background: rgba(200, 169, 126, 0.16);
  color: var(--brand-gold-dark);
  font-weight: 700;
}

.hub__hero-card,
.panel,
.system-card {
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: var(--shadow-soft);
}

.hub__hero-card {
  padding: 1.5rem;
}

.hub__hero-card strong {
  color: var(--brand-navy);
}

.hub__hero-card ul {
  margin: 1rem 0 0;
  padding-left: 1.2rem;
  color: var(--text-muted);
  line-height: 1.9;
}

.hub__systems {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.system-card {
  display: grid;
  gap: 0.8rem;
  padding: 1.35rem;
}

.system-card h2,
.system-card p,
.system-card ul {
  margin: 0;
}

.system-card h2 {
  color: var(--brand-navy);
  font-size: 1.2rem;
}

.system-card p,
.system-card ul {
  color: var(--text-muted);
}

.system-card ul {
  padding-left: 1.1rem;
  line-height: 1.8;
}

.system-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.system-card__head span {
  color: var(--brand-gold-dark);
  font-size: 0.85rem;
}

.system-card__head strong {
  color: var(--brand-navy);
}

.system-card__action {
  justify-self: start;
  margin-top: 0.3rem;
  padding: 0.75rem 1rem;
  border-radius: 999px;
  background: var(--brand-navy);
  color: white;
  text-decoration: none;
}

.hub__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.panel {
  padding: 1.4rem;
}

.panel h3 {
  margin: 0 0 0.85rem;
  color: var(--brand-navy);
}

.panel ol,
.panel ul {
  margin: 0;
  padding-left: 1.15rem;
  color: var(--text-muted);
  line-height: 1.8;
}

.tokens {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.token {
  display: inline-flex;
  padding: 0.6rem 0.8rem;
  border-radius: 999px;
  font-size: 0.9rem;
}

.token--gold {
  background: rgba(200, 169, 126, 0.18);
}

.token--navy {
  background: rgba(25, 42, 65, 0.12);
}

.token--soft {
  background: var(--surface-soft);
}

.token--page {
  background: var(--surface-page);
}

@media (max-width: 1180px) {
  .hub__hero,
  .hub__systems,
  .hub__grid {
    grid-template-columns: 1fr;
  }
}
</style>
