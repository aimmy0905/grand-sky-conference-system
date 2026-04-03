<template>
  <div class="app-page">
    <AppHeader title="会议室" />

    <main class="app-page__body">
      <section class="card filter-card">
        <label class="field">
          <span>酒店</span>
          <select v-model="selectedHotel">
            <option value="全部酒店">全部酒店</option>
            <option v-for="item in hotelOptions" :key="item" :value="item">{{ item }}</option>
          </select>
        </label>

        <label class="field">
          <span>日期</span>
          <select v-model="selectedDate">
            <option v-for="item in dateOptions" :key="item" :value="item">{{ item }}</option>
          </select>
        </label>
      </section>

      <section class="list-grid">
        <article v-for="room in filteredRooms" :key="room.id" class="card room-card">
          <div class="room-head">
            <strong>{{ room.roomName }}</strong>
            <span class="capacity">容纳 {{ room.capacity }} 人</span>
          </div>
          <p>{{ room.hotel }}</p>

          <div class="schedule-line">
            <span v-for="item in room.schedule" :key="`${room.id}-${item.date}`" :class="{ unavailable: item.status === '不可用' }">
              {{ item.date.slice(5) }} {{ item.status }}
            </span>
          </div>

          <div class="today-status" :class="{ unavailable: selectedStatus(room) === '不可用' }">
            {{ selectedDate }}：{{ selectedStatus(room) }}
          </div>
        </article>
      </section>
    </main>

    <AppBottomNav />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppBottomNav from '../components/AppBottomNav.vue';
import AppHeader from '../components/AppHeader.vue';
import { hotelOptions, roomAvailability } from '../data/mock';

const selectedHotel = ref('全部酒店');
const dateOptions = ['2026-04-03', '2026-04-04', '2026-04-05'];
const selectedDate = ref(dateOptions[0]);

const filteredRooms = computed(() => roomAvailability.filter((item) => selectedHotel.value === '全部酒店' || item.hotel === selectedHotel.value));

const selectedStatus = (room: typeof roomAvailability[number]) => room.schedule.find((item) => item.date === selectedDate.value)?.status ?? '未知';
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
  padding: 1rem;
  display: grid;
  gap: 0.75rem;
}

.field {
  display: grid;
  gap: 0.4rem;
}

.field span {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.field select {
  min-height: 44px;
  border-radius: 12px;
  border: 1px solid var(--surface-line);
  padding: 0 0.7rem;
  background: white;
  outline: none;
}

.list-grid {
  margin-top: 0.9rem;
  display: grid;
  gap: 0.8rem;
}

.room-card {
  padding: 1rem;
}

.room-head {
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;
}

.room-head strong {
  color: var(--text-default);
}

.capacity {
  color: var(--text-muted);
  font-size: 0.78rem;
}

.room-card p {
  margin: 0.4rem 0 0;
  color: var(--text-muted);
}

.schedule-line {
  margin-top: 0.7rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.schedule-line span {
  padding: 0.15rem 0.52rem;
  border-radius: 999px;
  background: #e8f8ec;
  color: #2f6b44;
  font-size: 0.74rem;
}

.schedule-line span.unavailable {
  background: #fdeceb;
  color: #bf3e34;
}

.today-status {
  margin-top: 0.7rem;
  width: fit-content;
  padding: 0.18rem 0.58rem;
  border-radius: 999px;
  background: #e8f8ec;
  color: #2f6b44;
  font-size: 0.76rem;
  font-weight: 700;
}

.today-status.unavailable {
  background: #fdeceb;
  color: #bf3e34;
}
</style>
