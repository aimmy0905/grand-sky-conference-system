<template>
  <div class="app-page">
    <AppHeader title="核销记录" />

    <main class="app-page__body">
      <section class="filter-panel">
        <div class="filter-summary">
          <span><AppIcon name="calendar" :size="14" /> {{ activeRange }}</span>
          <span>餐券类型：{{ activeType }}</span>
          <span>会议：{{ activeMeetingKeyword || '全部' }}</span>
        </div>
        <button type="button" class="filter-btn" @click="filterOpen = true">筛选</button>
      </section>

      <section class="stats-card">
        <article>
          <strong>{{ filteredRecords.length }}</strong>
          <span>总核销数量</span>
        </article>
        <article>
          <strong>{{ successCount }}</strong>
          <span>成功</span>
        </article>
        <article>
          <strong>{{ failedCount }}</strong>
          <span>失败</span>
        </article>
      </section>

      <section class="record-list">
        <article class="record-card" v-for="record in filteredRecords" :key="record.id">
          <div class="record-card__top">
            <strong>{{ record.attendeeName }} · {{ record.couponType }}</strong>
            <span class="status" :class="{ danger: record.status === '核销失败' }">{{ record.status }}</span>
          </div>
          <p>{{ record.meetingName }}</p>
          <small>{{ record.verifyTime }}</small>
          <em v-if="record.reason">{{ record.reason }}</em>
        </article>

        <p v-if="!filteredRecords.length" class="empty-text">暂无符合条件的核销记录</p>
      </section>
    </main>

    <AppBottomNav />

    <Transition name="slide-up">
      <div v-if="filterOpen" class="sheet-mask" @click.self="filterOpen = false">
        <section class="sheet-panel">
          <h3>筛选条件</h3>

          <div class="field-group">
            <span>日期范围</span>
            <div class="chips">
              <button
                type="button"
                v-for="range in dateRanges"
                :key="range"
                :class="{ active: draftRange === range }"
                @click="draftRange = range"
              >
                {{ range }}
              </button>
            </div>
          </div>

          <div class="field-group">
            <span>餐券类型</span>
            <div class="chips">
              <button
                type="button"
                v-for="type in couponTypes"
                :key="type"
                :class="{ active: draftType === type }"
                @click="draftType = type"
              >
                {{ type }}
              </button>
            </div>
          </div>

          <div class="field-group">
            <span>会议筛选</span>
            <input
              v-model.trim="draftMeetingKeyword"
              type="text"
              class="meeting-input"
              placeholder="输入会议关键字搜索"
            />
          </div>

          <div class="sheet-actions">
            <button type="button" class="light" @click="resetFilter">重置</button>
            <button type="button" class="brand" @click="applyFilter">确认</button>
          </div>
        </section>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppBottomNav from '../components/AppBottomNav.vue';
import AppHeader from '../components/AppHeader.vue';
import AppIcon from '../components/AppIcon.vue';
import { couponTypes, dateRanges, verifyRecords } from '../data/mock';

const filterOpen = ref(false);
const activeRange = ref('最近7天');
const activeType = ref<(typeof couponTypes)[number]>('全部');
const activeMeetingKeyword = ref('');
const draftRange = ref(activeRange.value);
const draftType = ref<(typeof couponTypes)[number]>(activeType.value);
const draftMeetingKeyword = ref(activeMeetingKeyword.value);

const parseRecordDate = (value: string) => new Date(value.replace(' ', 'T'));

const filteredRecords = computed(() => {
  const latestDate = verifyRecords.reduce((latest, record) => {
    const current = parseRecordDate(record.verifyTime).getTime();
    return Math.max(latest, current);
  }, 0);

  const startDate = new Date(latestDate);
  if (activeRange.value === '今天') {
    startDate.setHours(0, 0, 0, 0);
  } else if (activeRange.value === '最近7天') {
    startDate.setDate(startDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);
  } else {
    startDate.setDate(startDate.getDate() - 29);
    startDate.setHours(0, 0, 0, 0);
  }

  return verifyRecords.filter((record) => {
    const recordDate = parseRecordDate(record.verifyTime);
    const inRange = recordDate >= startDate;
    const typeMatched = activeType.value === '全部' || record.couponType === activeType.value;
    const meetingMatched = !activeMeetingKeyword.value || record.meetingName.includes(activeMeetingKeyword.value);
    return inRange && typeMatched && meetingMatched;
  });
});

const successCount = computed(() => filteredRecords.value.filter((record) => record.status === '核销成功').length);
const failedCount = computed(() => filteredRecords.value.filter((record) => record.status === '核销失败').length);

const resetFilter = () => {
  draftRange.value = '最近7天';
  draftType.value = '全部';
  draftMeetingKeyword.value = '';
};

const applyFilter = () => {
  activeRange.value = draftRange.value;
  activeType.value = draftType.value;
  activeMeetingKeyword.value = draftMeetingKeyword.value;
  filterOpen.value = false;
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

.stats-card,
.filter-panel,
.record-card {
  border-radius: 18px;
  background: white;
  box-shadow: var(--shadow-card);
}

.stats-card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  padding: 0.8rem;
  margin-top: 0.75rem;
}

.stats-card article {
  border-radius: 12px;
  background: #f6f7f9;
  padding: 0.68rem 0.5rem;
  text-align: center;
}

.stats-card strong {
  display: block;
  color: var(--text-default);
  font-size: 1rem;
}

.stats-card span {
  color: var(--text-muted);
  font-size: 0.76rem;
}

.filter-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;
  padding: 0.78rem 0.9rem;
}

.filter-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.8rem;
  align-items: center;
  color: var(--text-muted);
  font-size: 0.8rem;
}

.filter-summary span {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  white-space: nowrap;
}

.filter-btn {
  min-height: 34px;
  border: none;
  border-radius: 999px;
  padding: 0 0.9rem;
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
}

.record-list {
  margin-top: 0.9rem;
}

.record-card {
  padding: 0.95rem;
  margin-bottom: 0.72rem;
}

.record-card__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.6rem;
}

.record-card__top strong {
  color: var(--text-default);
}

.status {
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  background: rgba(76, 175, 80, 0.12);
  color: #2e7d32;
  font-size: 0.75rem;
}

.status.danger {
  background: rgba(244, 67, 54, 0.12);
  color: #d32f2f;
}

.record-card p,
.record-card small,
.record-card em {
  margin: 0.45rem 0 0;
  display: block;
  color: var(--text-muted);
  font-style: normal;
}

.record-card em {
  color: var(--danger);
  font-size: 0.8rem;
}

.empty-text {
  margin: 1.2rem 0 0;
  text-align: center;
  color: var(--text-muted);
}

.sheet-mask {
  position: fixed;
  inset: 0;
  z-index: 40;
  background: rgba(0, 0, 0, 0.45);
  display: grid;
  align-items: end;
}

.sheet-panel {
  background: white;
  border-radius: 18px 18px 0 0;
  padding: 1rem;
}

.sheet-panel h3 {
  margin: 0;
  text-align: center;
  color: var(--text-default);
  font-size: 1.05rem;
}

.field-group {
  margin-top: 1rem;
}

.field-group > span {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-muted);
  font-size: 0.82rem;
}

.meeting-input {
  width: 100%;
  min-height: 42px;
  border: 1px solid var(--surface-line);
  border-radius: 10px;
  padding: 0 0.7rem;
  outline: none;
}

.meeting-input:focus {
  border-color: var(--brand-gold);
}

.chips {
  display: flex;
  gap: 0.55rem;
  flex-wrap: wrap;
}

.chips button {
  border: none;
  min-height: 34px;
  border-radius: 999px;
  padding: 0 0.78rem;
  background: #f2f4f7;
  color: var(--text-muted);
}

.chips button.active {
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
  font-weight: 700;
}

.sheet-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.7rem;
  margin-top: 1.2rem;
  padding-bottom: calc(0.2rem + var(--safe-area-inset-bottom));
}

.sheet-actions button {
  min-height: 42px;
  border: none;
  border-radius: 10px;
}

.sheet-actions .light {
  background: #f2f5f7;
  color: var(--text-muted);
}

.sheet-actions .brand {
  background: var(--brand-gold);
  color: white;
  font-weight: 700;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: opacity 0.2s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
}
</style>
