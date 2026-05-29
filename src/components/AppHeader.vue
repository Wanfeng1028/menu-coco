<template>
  <header class="app-header">
    <div class="header-card">
      <div class="header-emoji">🍽️</div>
      <h1 class="header-title">Coco 宝宝专属点餐站</h1>
      <p class="header-subtitle">今天想吃什么呀，小白白来安排 💕</p>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.app-header {
  padding: $spacing-xl 0 $spacing-lg;
}

.header-card {
  background: $white;
  border-radius: $radius-xl;
  padding: $spacing-3xl $spacing-2xl;
  text-align: center;
  box-shadow: $shadow-card;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, $pink-300, $pink-400, $pink-300);
  }
}

.header-emoji {
  font-size: 48px;
  margin-bottom: $spacing-md;
}

.header-title {
  font-size: $font-2xl;
  font-weight: 700;
  color: $text-primary;
  margin-bottom: $spacing-sm;
}

.header-subtitle {
  font-size: $font-sm;
  color: $text-secondary;
}
</style>