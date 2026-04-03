<template>
  <div class="app-page">
    <AppHeader title="新建会议消息" back />

    <main class="app-page__body">
      <section class="card compose-card">
        <div class="tabs">
          <button type="button" :class="{ active: activeTab === 'normal' }" @click="setTab('normal')">普通消息</button>
          <button type="button" :class="{ active: activeTab === 'receipt' }" @click="setTab('receipt')">回执消息</button>
        </div>

        <label class="field">
          <span>会议</span>
          <select v-model="meetingId">
            <option v-for="item in meetings" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </label>

        <label v-if="activeTab === 'receipt'" class="field">
          <span>回执模板</span>
          <select v-model="template">
            <option v-for="item in receiptTemplates" :key="item" :value="item">{{ item }}</option>
          </select>
        </label>

        <div v-if="activeTab === 'receipt'" class="collect-fields">
          <small>回执搜集信息：</small>
          <span v-for="item in sharedReceiptCollectFields" :key="item">{{ item }}</span>
        </div>

        <label class="field">
          <span>{{ activeTab === 'normal' ? '消息内容' : '回执说明' }}</span>
          <textarea
            v-model="content"
            :placeholder="activeTab === 'normal' ? '请输入普通消息内容（≤500字）' : '请输入回执通知内容'"
          ></textarea>
        </label>

        <button type="button" class="send-btn">{{ activeTab === 'normal' ? '发送普通消息' : '发送回执通知' }}</button>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '../components/AppHeader.vue';
import { meetings, messageDraftDefaults, receiptCollectFields, receiptTemplates } from '../data/mock';

const route = useRoute();
const meetingId = ref(String(route.query.meetingId ?? meetings[0]?.id ?? ''));
const activeTab = ref<'normal' | 'receipt'>('normal');
const template = ref(receiptTemplates[0]);
const content = ref(messageDraftDefaults.normal);
const sharedReceiptCollectFields = computed(() => receiptCollectFields);

const setTab = (tab: 'normal' | 'receipt') => {
  activeTab.value = tab;
  content.value = tab === 'normal' ? messageDraftDefaults.normal : messageDraftDefaults.receipt;
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
  min-height: calc(100vh - 64px);
  padding: 1rem;
  background: var(--surface-page);
}

.card {
  border-radius: 20px;
  background: white;
  box-shadow: var(--shadow-card);
  padding: 1rem;
}

.tabs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.45rem;
}

.tabs button {
  border: none;
  min-height: 34px;
  border-radius: 999px;
  background: #eef2f5;
  color: var(--text-muted);
}

.tabs button.active {
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
  font-weight: 700;
}

.field {
  display: grid;
  gap: 0.4rem;
  margin-top: 0.8rem;
}

.field span {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.field select,
.field textarea {
  border-radius: 12px;
  border: 1px solid var(--surface-line);
  padding: 0.6rem 0.72rem;
  outline: none;
  background: white;
}

.field textarea {
  min-height: 90px;
  resize: none;
}

.collect-fields {
  margin-top: 0.8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
}

.collect-fields small {
  color: var(--text-muted);
}

.collect-fields span {
  padding: 0.12rem 0.52rem;
  border-radius: 999px;
  background: #eef6ff;
  color: #355c87;
  font-size: 0.75rem;
}

.send-btn {
  margin-top: 0.85rem;
  width: 100%;
  min-height: 42px;
  border: none;
  border-radius: 10px;
  background: var(--brand-gold);
  color: white;
  font-weight: 700;
}
</style>
