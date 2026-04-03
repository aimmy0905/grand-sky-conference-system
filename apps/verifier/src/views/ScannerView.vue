<template>
  <div class="scanner-page">
    <button type="button" class="back-btn" @click="router.back()">
      <AppIcon name="back" :size="19" />
    </button>

    <main class="scanner-main">
      <section class="scan-frame">
        <div class="corner corner--lt"></div>
        <div class="corner corner--rt"></div>
        <div class="corner corner--lb"></div>
        <div class="corner corner--rb"></div>
        <div class="scan-line"></div>
      </section>
      <p class="scan-tip">请扫描参会人员餐券二维码</p>

      <div class="mock-actions">
        <button type="button" @click="showResult('success')">模拟成功</button>
        <button type="button" @click="showResult('invalidTime')">模拟超时</button>
        <button type="button" @click="showResult('repeated')">模拟重复</button>
      </div>
    </main>

    <Transition name="pop">
      <section v-if="resultKey" class="result-dialog" :class="`result-dialog--${activeResult?.tone}`">
        <h2>{{ activeResult?.title }}</h2>
        <p>{{ activeResult?.message }}</p>
        <small v-if="activeResult?.meetingName">会议：{{ activeResult.meetingName }}</small>
        <small>{{ activeResult?.subMessage }}</small>
        <button type="button" @click="resultKey = null">确认</button>
      </section>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppIcon from '../components/AppIcon.vue';
import { scanResults } from '../data/mock';

const router = useRouter();
const resultKey = ref<null | keyof typeof scanResults>(null);
const activeResult = computed(() => (resultKey.value ? scanResults[resultKey.value] : null));

const showResult = (key: keyof typeof scanResults) => {
  resultKey.value = key;
};
</script>

<style scoped lang="scss">
.scanner-page {
  position: relative;
  min-height: 100vh;
  max-width: 430px;
  margin: 0 auto;
  overflow: hidden;
  color: white;
  background:
    radial-gradient(circle at center, rgba(200, 169, 126, 0.12), transparent 36%),
    repeating-linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.02) 0,
      rgba(255, 255, 255, 0.02) 8px,
      rgba(255, 255, 255, 0.035) 8px,
      rgba(255, 255, 255, 0.035) 16px
    ),
    #111722;
}

.back-btn {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 4;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.16);
  color: white;
  display: grid;
  place-items: center;
}

.scanner-main {
  min-height: 100vh;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 1.2rem;
  padding: 1rem;
}

.scan-frame {
  position: relative;
  width: 240px;
  height: 240px;
  border-radius: 14px;
  border: 2px solid rgba(200, 169, 126, 0.55);
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(1px);
}

.corner {
  position: absolute;
  width: 45px;
  height: 45px;
  border: 3px solid var(--brand-gold);
}

.corner--lt {
  top: -2px;
  left: -2px;
  border-right: none;
  border-bottom: none;
  border-radius: 14px 0 0 0;
}

.corner--rt {
  top: -2px;
  right: -2px;
  border-left: none;
  border-bottom: none;
  border-radius: 0 14px 0 0;
}

.corner--lb {
  bottom: -2px;
  left: -2px;
  border-right: none;
  border-top: none;
  border-radius: 0 0 0 14px;
}

.corner--rb {
  right: -2px;
  bottom: -2px;
  border-left: none;
  border-top: none;
  border-radius: 0 0 14px 0;
}

.scan-line {
  position: absolute;
  left: 12px;
  right: 12px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #f7d9ac, transparent);
  animation: sweep 2.2s ease-in-out infinite;
}

@keyframes sweep {
  0% {
    top: 24px;
  }

  50% {
    top: 214px;
  }

  100% {
    top: 24px;
  }
}

.scan-tip {
  margin: 0;
  padding: 0.45rem 0.8rem;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.32);
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.95rem;
}

.mock-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.mock-actions button {
  min-height: 34px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.92);
  padding: 0 0.78rem;
  font-size: 0.76rem;
}

.result-dialog {
  position: fixed;
  left: 50%;
  bottom: calc(2.2rem + var(--safe-area-inset-bottom));
  transform: translateX(-50%);
  z-index: 6;
  width: min(280px, calc(100vw - 2rem));
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  color: white;
}

.result-dialog--success {
  background: rgba(76, 175, 80, 0.95);
}

.result-dialog--danger {
  background: rgba(244, 67, 54, 0.95);
}

.result-dialog h2 {
  margin: 0;
  font-size: 1.06rem;
}

.result-dialog p {
  margin: 0.62rem 0 0;
  line-height: 1.6;
}

.result-dialog small {
  display: block;
  margin-top: 0.35rem;
  opacity: 0.92;
}

.result-dialog button {
  margin-top: 0.9rem;
  width: 100%;
  min-height: 38px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.94);
  color: #1f2937;
  font-weight: 700;
}

.pop-enter-active,
.pop-leave-active {
  transition: all 0.2s ease;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translate(-50%, 12px);
}
</style>
