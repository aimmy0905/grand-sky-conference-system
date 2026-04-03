<template>
  <div class="app-page">
    <AppHeader title="资料管理" back />

    <main class="app-page__body">
      <section class="card">
        <label class="field">
          <span>选择会议</span>
          <select v-model="meetingId">
            <option v-for="item in meetings" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </label>

        <div class="category-row">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            :class="{ active: activeCategory === category }"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>

        <button type="button" class="upload-btn">
          <AppIcon name="plus" :size="14" />
          <span>上传{{ activeCategory }}（≤200MB）</span>
        </button>
      </section>

      <section class="card list-card">
        <article v-for="item in filteredMaterials" :key="item.id" class="material-item">
          <div>
            <strong>{{ item.name }}</strong>
            <p>{{ item.category }} · {{ item.size }} · {{ item.updatedAt }}</p>
          </div>
          <button type="button" class="delete-btn">
            <AppIcon name="delete" :size="14" />
          </button>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '../components/AppHeader.vue';
import AppIcon from '../components/AppIcon.vue';
import { materials, meetings } from '../data/mock';

const route = useRoute();
const meetingId = ref(String(route.query.meetingId ?? meetings[0]?.id ?? ''));
const activeCategory = ref('议程');
const categories = ['议程', '会议文件', '座位图'];

const filteredMaterials = computed(() => materials.filter((item) => item.meetingId === meetingId.value && item.category === activeCategory.value));
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
  min-height: calc(100vh - 64px);
  background: var(--surface-page);
}

.card {
  border-radius: 20px;
  background: white;
  box-shadow: var(--shadow-card);
  padding: 1rem;
}

.list-card {
  margin-top: 0.9rem;
}

.field {
  display: grid;
  gap: 0.45rem;
}

.field span {
  color: var(--text-muted);
  font-size: 0.82rem;
}

.field select {
  min-height: 44px;
  border-radius: 12px;
  border: 1px solid var(--surface-line);
  padding: 0 0.75rem;
  outline: none;
}

.category-row {
  margin-top: 0.8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.category-row button {
  border: none;
  min-height: 30px;
  border-radius: 999px;
  padding: 0 0.7rem;
  background: #eef2f5;
  color: var(--text-muted);
  font-size: 0.75rem;
}

.category-row button.active {
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
}

.upload-btn {
  margin-top: 0.8rem;
  width: 100%;
  min-height: 42px;
  border: none;
  border-radius: 12px;
  background: var(--brand-gold);
  color: white;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  font-weight: 700;
}

.material-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.7rem;
}

.material-item + .material-item {
  margin-top: 0.9rem;
  padding-top: 0.9rem;
  border-top: 1px solid var(--surface-line);
}

.material-item strong {
  color: var(--text-default);
}

.material-item p {
  margin: 0.38rem 0 0;
  color: var(--text-muted);
  font-size: 0.8rem;
}

.delete-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 10px;
  display: grid;
  place-items: center;
  color: #bf3e34;
  background: #fdeceb;
}
</style>
