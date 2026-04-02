<template>
  <div class="app-shell">
    <GlobalHeader />
    <main class="app-shell__main">
      <RouterView />
    </main>
    <GlobalFooter />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import GlobalFooter from '@/components/global/footer.vue';
import GlobalHeader from '@/components/global/header.vue';
</script>

<style lang="scss" scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-shell__main {
  flex: 1;
}
</style>
