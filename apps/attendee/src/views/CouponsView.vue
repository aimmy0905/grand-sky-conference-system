<template>
  <div class="app-page">
    <AppHeader title="我的餐券" back />

    <main class="app-page__body">
      <section class="section-card">
        <div class="section-head">
          <h2>全部餐券</h2>
          <small>共 {{ coupons.length }} 张</small>
        </div>

        <div class="count-row">
          <span v-for="item in couponCounts" :key="item.name">{{ item.name }} x{{ item.count }}</span>
        </div>

        <article class="coupon-row" v-for="coupon in coupons" :key="coupon.id">
          <div>
            <strong>{{ coupon.name }} · x{{ singleTypeCountMap[coupon.name] }}</strong>
            <p>{{ coupon.time }} · {{ coupon.status }}</p>
          </div>
          <button type="button" @click="openCode(coupon.name, coupon.verifyCode)">
            <AppIcon name="qrcode" :size="14" />二维码
          </button>
        </article>
      </section>
    </main>

    <AppBottomNav />

    <QrCodeLayer
      v-model:open="qrOpen"
      :title="activeCouponName"
      subtitle="请向核销人员出示该二维码完成核销。"
      :code="activeCouponCode"
      @save="qrOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppBottomNav from '../components/AppBottomNav.vue';
import AppHeader from '../components/AppHeader.vue';
import AppIcon from '../components/AppIcon.vue';
import QrCodeLayer from '../components/QrCodeLayer.vue';
import { coupons } from '../data/mock';

const qrOpen = ref(false);
const activeCouponName = ref('午餐券');
const activeCouponCode = ref('LUNCH-4621');
const couponCounts = computed(() => {
  const map = new Map<string, number>();
  coupons.forEach((item) => {
    map.set(item.name, (map.get(item.name) || 0) + 1);
  });
  return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
});
const singleTypeCountMap = computed(() => {
  const out: Record<string, number> = {};
  couponCounts.value.forEach((item) => {
    out[item.name] = item.count;
  });
  return out;
});

const openCode = (name: string, code: string) => {
  activeCouponName.value = name;
  activeCouponCode.value = code;
  qrOpen.value = true;
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

.section-card {
  border-radius: 12px;
  padding: 1rem;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

h2 {
  margin: 0;
  color: var(--text-default);
  font-size: 1rem;
  font-weight: 500;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.7rem;
}

.section-head small {
  color: var(--text-light);
  font-size: 0.78rem;
}

.count-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 0.7rem 0 0.35rem;
}

.count-row span {
  min-height: 26px;
  border-radius: 999px;
  padding: 0 0.62rem;
  background: var(--surface-soft);
  color: var(--brand-gold-dark);
  display: inline-flex;
  align-items: center;
  font-size: 0.75rem;
}

.coupon-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.7rem;
  padding: 0.84rem 0;
  border-bottom: 1px solid var(--surface-line);
}

.coupon-row:last-child {
  border-bottom: none;
}

.coupon-row p {
  margin: 0.35rem 0 0;
  color: var(--text-muted);
}

.coupon-row button {
  min-width: 72px;
  min-height: 34px;
  border-radius: 8px;
  border: 1px solid var(--brand-gold);
  background: white;
  color: var(--brand-gold-dark);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}
</style>
