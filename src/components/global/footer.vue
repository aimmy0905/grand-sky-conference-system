<template>
  <footer class="footer">
    <div class="footer__inner">
      <p>纯前端原型工程，覆盖 3 个小程序端与 1 个 Web 管理端，便于需求评审与后续视觉深化。</p>
      <p>建议开发顺序：设计系统 -> 登录流程 -> 各端核心业务流 -> 后台扩展模块。</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  border-top: 1px solid rgba(25, 42, 65, 0.08);
  background: white;
}

.footer__inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem 1.5rem 2rem;
  color: var(--text-muted);
  font-size: 0.95rem;
}
</style>
