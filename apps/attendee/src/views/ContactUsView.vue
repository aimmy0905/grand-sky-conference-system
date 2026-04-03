<template>
  <div class="app-page">
    <AppHeader title="联系我们" back />

    <main class="app-page__body">
      <section class="section-card">
        <h1>服务入口</h1>
        <article class="contact-card" v-for="item in contactCards" :key="item.id">
          <div>
            <strong>{{ item.title }}</strong>
            <p>{{ item.detail }}</p>
          </div>
          <button type="button" @click="showToast(`${item.actionText}中`)">{{ item.actionText }}</button>
        </article>
      </section>

      <section class="section-card">
        <h2>常见问题</h2>
        <article class="faq-card" v-for="faq in faqList" :key="faq.id">
          <strong>{{ faq.question }}</strong>
          <p>{{ faq.answer }}</p>
        </article>
      </section>
    </main>

    <p v-if="toastText" class="toast">{{ toastText }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from '../components/AppHeader.vue';
import { contactCards, faqList } from '../data/mock';

const toastText = ref('');

const showToast = (text: string) => {
  toastText.value = text;
  setTimeout(() => {
    toastText.value = '';
  }, 1300);
};
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

.section-card {
  border-radius: 22px;
  background: white;
  box-shadow: var(--shadow-card);
  padding: 1rem;
  margin-bottom: 0.9rem;
}

.section-card h1,
.section-card h2 {
  margin: 0 0 0.75rem;
  color: #11253d;
  font-size: 1.1rem;
}

.contact-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--surface-line);
}

.contact-card:last-child {
  border-bottom: none;
}

.contact-card p {
  margin: 0.4rem 0 0;
  color: var(--text-muted);
}

.contact-card button {
  min-height: 34px;
  border: none;
  border-radius: 999px;
  padding: 0 0.85rem;
  background: var(--wechat-green-soft);
  color: var(--wechat-green-dark);
}

.faq-card {
  border-radius: 14px;
  padding: 0.8rem;
  margin-bottom: 0.55rem;
  background: #f7fafc;
}

.faq-card:last-child {
  margin-bottom: 0;
}

.faq-card p {
  margin: 0.45rem 0 0;
  color: var(--text-muted);
  line-height: 1.7;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 1.2rem;
  transform: translateX(-50%);
  margin: 0;
  border-radius: 999px;
  padding: 0.45rem 0.75rem;
  color: white;
  font-size: 0.8rem;
  background: rgba(17, 24, 39, 0.85);
}
</style>
