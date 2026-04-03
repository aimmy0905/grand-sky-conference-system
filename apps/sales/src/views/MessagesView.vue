<template>
  <div class="app-page">
    <AppHeader title="消息管理" />

    <main class="app-page__body">
      <section class="meeting-list">
        <article v-for="item in meetingMessageSummary" :key="item.meetingId" class="card meeting-card">
          <div class="meeting-head">
            <strong>{{ item.meetingName }}</strong>
            <button type="button" @click="toCreate(item.meetingId)">新建消息</button>
          </div>

          <div class="meta-row">
            <span>普通消息 {{ item.normalCount }} 条</span>
            <span>回执消息 {{ item.receiptCount }} 条</span>
          </div>

          <div v-if="item.normalMessages.length" class="msg-line">
            <small>普通消息记录（{{ item.normalMessages.length }}）</small>
            <p v-for="normal in item.normalMessages" :key="normal.id">{{ normal.title }} · {{ normal.sendTime }}</p>
          </div>

          <div v-if="item.receiptMessages.length" class="msg-line">
            <small>回执消息记录（{{ item.receiptMessages.length }}）</small>
            <p v-for="receipt in item.receiptMessages" :key="receipt.id">{{ receipt.title }} · {{ receipt.sendTime }}</p>
            <p
              v-for="receipt in item.receiptMessages"
              :key="`${receipt.id}-fields`"
              class="receipt-fields"
            >
              搜集项：{{ receipt.collectFields?.join('、') }}
            </p>
          </div>
        </article>
      </section>

      <button type="button" class="global-create-btn" @click="toCreate()">
        <AppIcon name="plus" :size="14" />
        <span>新建会议消息</span>
      </button>
    </main>

    <AppBottomNav />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import AppBottomNav from '../components/AppBottomNav.vue';
import AppHeader from '../components/AppHeader.vue';
import AppIcon from '../components/AppIcon.vue';
import { meetings, messageRecords } from '../data/mock';

const router = useRouter();

const meetingMessageSummary = computed(() => meetings.map((meeting) => {
  const normal = messageRecords.normal.filter((item) => item.meetingName === meeting.name);
  const receipt = messageRecords.receipt.filter((item) => item.meetingName === meeting.name);
  return {
    meetingId: meeting.id,
    meetingName: meeting.name,
    normalCount: normal.length,
    receiptCount: receipt.length,
    normalMessages: normal,
    receiptMessages: receipt,
  };
}));

const toCreate = (targetMeetingId?: string) => {
  router.push({
    path: '/message-create',
    query: targetMeetingId ? { meetingId: targetMeetingId } : undefined,
  });
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
  min-height: calc(100vh - 121px);
  padding: 1rem;
  background: var(--surface-page);
}

.card {
  border-radius: 20px;
  background: white;
  box-shadow: var(--shadow-card);
  padding: 1rem;
}

.global-create-btn {
  margin-top: 0.95rem;
  width: 100%;
  min-height: 42px;
  border: none;
  border-radius: 10px;
  background: var(--brand-gold);
  color: white;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.35rem;
  font-weight: 700;
}

.meeting-list {
  margin-top: 0;
  display: grid;
  gap: 0.8rem;
}

.meeting-head {
  display: flex;
  justify-content: space-between;
  gap: 0.7rem;
  align-items: center;
}

.meeting-head strong {
  color: var(--text-default);
}

.meeting-head button {
  border: none;
  min-height: 30px;
  border-radius: 999px;
  padding: 0 0.65rem;
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
  font-size: 0.74rem;
}

.meta-row {
  margin-top: 0.45rem;
  display: flex;
  gap: 0.8rem;
  color: var(--text-muted);
  font-size: 0.8rem;
}

.msg-line {
  margin-top: 0.6rem;
  padding-top: 0.6rem;
  border-top: 1px solid var(--surface-line);
}

.msg-line small {
  color: var(--text-muted);
}

.msg-line p {
  margin: 0.32rem 0 0;
  color: var(--text-default);
  font-size: 0.82rem;
}

.msg-line .receipt-fields {
  color: #355c87;
}
</style>
