<template>
  <div class="app-page">
    <AppHeader title="会议管理" />

    <main class="app-page__body">
      <section class="card filter-card">
        <div class="search-input">
          <AppIcon name="search" :size="16" />
          <input v-model="keyword" type="text" placeholder="搜索会议名称" />
        </div>
      </section>

      <section class="card list-card">
        <article v-for="meeting in filteredMeetings" :key="meeting.id" class="meeting-item">
          <div class="meeting-top">
            <strong>{{ meeting.name }}</strong>
            <span class="status-tag" :class="meeting.status">{{ meeting.status }}</span>
          </div>
          <p>{{ meeting.hotel }} · {{ meeting.room }}</p>
          <small>{{ meeting.startTime }} - {{ meeting.endTime }}</small>
          <div class="meta-row">
            <span>参会人数 {{ meeting.participantCount }}</span>
            <span>签到率 {{ meeting.signRate }}</span>
          </div>
          <div class="actions">
            <button v-if="meeting.status === '待开始'" type="button" @click="toEdit(meeting.id)">编辑</button>
            <button type="button" @click="toDetail(meeting.id)">会议详情</button>
            <button v-if="meeting.status !== '已结束'" type="button" @click="toMaterials(meeting.id)">资料管理</button>
            <button v-if="meeting.status !== '已结束'" type="button" @click="toMessages(meeting.id)">会议通知</button>
            <button type="button" @click="showQrCode = true">签到码</button>
            <button v-if="meeting.status === '待开始'" type="button" class="danger" @click="askDelete(meeting.id)">
              删除
            </button>
          </div>
        </article>
      </section>

      <button type="button" class="create-btn" @click="router.push('/meeting-create')">+ 新建会议</button>
    </main>

    <Transition name="fade-up">
      <div v-if="showQrCode" class="sheet-mask" @click.self="showQrCode = false">
        <section class="sheet-panel">
          <h3>会议签到二维码</h3>
          <div class="qr-box">SIGN-2026-001</div>
          <p>二维码有效期与会议时间一致，会议结束后自动失效。</p>
          <button type="button" class="sheet-btn" @click="showQrCode = false">完成</button>
        </section>
      </div>
    </Transition>

    <AppDialog
      v-model:open="deleteOpen"
      title="确认删除会议"
      description="仅待开始且未添加参会人员会议可删除，删除后不可恢复。"
      confirm-text="确认删除"
      @confirm="confirmDelete"
    />

    <AppBottomNav />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppBottomNav from '../components/AppBottomNav.vue';
import AppDialog from '../components/AppDialog.vue';
import AppHeader from '../components/AppHeader.vue';
import AppIcon from '../components/AppIcon.vue';
import { meetings } from '../data/mock';

const router = useRouter();
const keyword = ref('');
const showQrCode = ref(false);
const deleteOpen = ref(false);
const deleteMeetingId = ref('');

const filteredMeetings = computed(() => meetings.filter((item) => item.name.includes(keyword.value.trim())));

const toEdit = (meetingId: string) => {
  const target = meetings.find((item) => item.id === meetingId);
  if (!target || target.status !== '待开始') {
    return;
  }
  router.push({ path: '/meeting-create', query: { id: meetingId } });
};

const toDetail = (meetingId: string) => {
  router.push(`/meeting-detail/${meetingId}`);
};

const toMaterials = (meetingId: string) => {
  const target = meetings.find((item) => item.id === meetingId);
  if (!target || target.status === '已结束') {
    return;
  }
  router.push({ path: '/materials', query: { meetingId } });
};

const toMessages = (meetingId: string) => {
  const target = meetings.find((item) => item.id === meetingId);
  if (!target || target.status === '已结束') {
    return;
  }
  router.push({ path: '/message-create', query: { meetingId } });
};

const askDelete = (meetingId: string) => {
  deleteMeetingId.value = meetingId;
  deleteOpen.value = true;
};

const confirmDelete = () => {
  deleteOpen.value = false;
  deleteMeetingId.value = '';
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
}

.filter-card {
  padding: 0.85rem;
  margin-bottom: 0.9rem;
}

.search-input {
  min-height: 44px;
  border: 1px solid var(--surface-line);
  border-radius: 12px;
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 0.55rem;
  align-items: center;
  padding: 0 0.75rem;
  color: var(--text-muted);
}

.search-input input {
  border: none;
  outline: none;
}

.list-card {
  padding: 1rem;
}

.meeting-item + .meeting-item {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--surface-line);
}

.meeting-top {
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;
}

.meeting-top strong {
  color: var(--text-default);
}

.status-tag {
  padding: 0.18rem 0.58rem;
  border-radius: 999px;
  font-size: 0.74rem;
}

.status-tag.待开始 {
  color: var(--brand-gold-dark);
  background: var(--surface-soft);
}

.status-tag.进行中 {
  color: #2b5588;
  background: #eaf2ff;
}

.status-tag.已结束 {
  color: var(--text-muted);
  background: #eef2f5;
}

.meeting-item p,
.meeting-item small {
  display: block;
  margin: 0.45rem 0 0;
  color: var(--text-muted);
}

.meta-row {
  margin-top: 0.45rem;
  display: flex;
  gap: 0.8rem;
  font-size: 0.8rem;
  color: #2d4462;
}

.actions {
  margin-top: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.actions button {
  border: none;
  border-radius: 10px;
  min-height: 30px;
  padding: 0 0.65rem;
  background: #f3f6f8;
  color: var(--text-default);
  font-size: 0.76rem;
}


.actions .danger {
  background: #fdeceb;
  color: #bf3e34;
}

.sheet-mask {
  position: fixed;
  inset: 0;
  z-index: 35;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.5);
}

.sheet-panel {
  width: min(100%, 300px);
  border-radius: 18px;
  background: white;
  padding: 1.1rem;
  text-align: center;
}

.sheet-panel h3 {
  margin: 0;
  color: var(--text-default);
}

.qr-box {
  margin: 0.9rem auto;
  width: 180px;
  aspect-ratio: 1;
  border-radius: 14px;
  display: grid;
  place-items: center;
  color: #1d3551;
  font-weight: 700;
  background:
    linear-gradient(45deg, #f4f6f8 25%, transparent 25%, transparent 75%, #f4f6f8 75%, #f4f6f8),
    linear-gradient(45deg, #f4f6f8 25%, transparent 25%, transparent 75%, #f4f6f8 75%, #f4f6f8);
  background-position:
    0 0,
    10px 10px;
  background-size: 20px 20px;
}

.sheet-panel p {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.7;
  font-size: 0.84rem;
}

.sheet-btn {
  margin-top: 0.95rem;
  width: 100%;
  min-height: 42px;
  border: none;
  border-radius: 10px;
  background: var(--brand-gold);
  color: white;
  font-weight: 700;
}

.create-btn {
  margin-top: 0.95rem;
  width: 100%;
  min-height: 44px;
  border: none;
  border-radius: 10px;
  background: var(--brand-gold);
  color: white;
  font-weight: 700;
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.2s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
}
</style>
