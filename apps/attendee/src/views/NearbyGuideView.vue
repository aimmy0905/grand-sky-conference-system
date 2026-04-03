<template>
  <div class="app-page">
    <AppHeader title="周边推荐" back />

    <main class="app-page__body">
      <section class="location-card">
        <small>当前所在位置</small>
        <h1>深圳市 · 福田区 · 格兰云天酒店</h1>
        <p>已为你推荐最近城市的图文内容。</p>
      </section>

      <section class="section-card">
        <h2>城市图文介绍</h2>
        <article class="story-article">
          <p>
            深圳福田区节奏紧凑，但非常适合会议间隙做短时体验。以酒店为中心，步行与地铁 20 分钟范围内，就能覆盖“吃、玩、行”三类核心需求。
          </p>

          <div class="article-image article-image--food">吃什么</div>
          <h3>风味餐饮建议</h3>
          <p>
            会后用餐建议优先选择粤菜和海鲜，口味稳定、上菜效率高，适合商务场景。若时间紧，可选择中心区轻食与咖啡店，节奏更轻便。
          </p>
          <p class="article-tip">推荐：云庭粤菜、福华海鲜坊、中心区轻食咖啡</p>

          <div class="article-image article-image--play">玩什么</div>
          <h3>会后放松路线</h3>
          <p>
            若希望会后放松，莲花山公园和市民中心夜景是最稳妥的路线；如果偏好文化体验，可前往福田书城，适合短暂停留和轻度游览。
          </p>
          <p class="article-tip">推荐：莲花山公园、市民中心夜景、福田书城</p>

          <div class="article-image article-image--tips">怎么走</div>
          <h3>交通出行提示</h3>
          <p>
            酒店周边与地铁、高铁枢纽连接紧密，当天往返和跨城出行都比较高效。高峰时段建议优先地铁，跨城行程可直接衔接福田高铁站。
          </p>
          <p class="article-tip">推荐：福田高铁站、会展中心地铁站、酒店礼宾叫车</p>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
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

.location-card,
.section-card {
  border-radius: 22px;
  padding: 1rem;
  background: white;
  box-shadow: var(--shadow-card);
}

.location-card {
  margin-bottom: 0.9rem;
  background: linear-gradient(180deg, rgba(200, 169, 126, 0.18), white);
}

.location-card small {
  color: var(--brand-gold-dark);
}

.location-card h1 {
  margin: 0.5rem 0 0.35rem;
  font-size: 1.16rem;
  color: #11253d;
}

.location-card p {
  margin: 0;
  color: var(--text-muted);
}

h2 {
  margin: 0 0 0.7rem;
  font-size: 1.05rem;
  color: #11253d;
}

.story-article {
  color: var(--text-muted);
  line-height: 1.78;
  font-size: 0.98rem;
}

.story-article p {
  margin: 0.5rem 0 0;
}

.story-article h3 {
  margin: 0.65rem 0 0;
  color: #12253d;
  font-size: 1.02rem;
}

.article-image {
  width: 100%;
  height: 144px;
  margin-top: 0.9rem;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 1.32rem;
  letter-spacing: 0.08em;
  background: linear-gradient(140deg, #eadbc7 0%, #f6efe7 100%);
  color: #876740;
  font-weight: 700;
}

.article-image--food {
  background: linear-gradient(140deg, #ecd8be 0%, #f8f1e6 100%);
}

.article-image--play {
  background: linear-gradient(140deg, #d8e5f2 0%, #eef4fb 100%);
  color: #466383;
}

.article-image--tips {
  background: linear-gradient(140deg, #e5e5e5 0%, #f3f3f3 100%);
  color: #59616a;
}

.article-tip {
  color: #66717d;
  font-size: 0.92rem;
}
</style>
