<template>
  <div class="welcome-card">
    <div class="welcome-greeting">
      <span class="greeting-emoji">💕</span>
      <p class="greeting-text">{{ greeting }}</p>
    </div>
    <div class="welcome-actions">
      <button class="btn btn-primary" @click="$emit('randomRecommend')">
        <span class="btn-icon">🎲</span>
        随机推荐
      </button>
      <button class="btn btn-secondary" @click="$emit('viewMenu')">
        <span class="btn-icon">📋</span>
        查看今日菜单
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  randomRecommend: []
  viewMenu: []
}>()

const greeting = '宝宝今天也要好好吃饭～'
</script>

<style lang="scss" scoped>
.welcome-card {
  background: $white;
  border-radius: $radius-xl;
  padding: $spacing-2xl;
  box-shadow: $shadow-card;
  margin-bottom: $spacing-xl;
}

.welcome-greeting {
  text-align: center;
  margin-bottom: $spacing-xl;
}

.greeting-emoji {
  font-size: 32px;
  display: block;
  margin-bottom: $spacing-sm;
}

.greeting-text {
  font-size: $font-lg;
  color: $text-primary;
  font-weight: 500;
}

.welcome-actions {
  display: flex;
  gap: $spacing-md;
}

.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  padding: $spacing-md $spacing-lg;
  border-radius: $radius-full;
  font-size: $font-sm;
  font-weight: 500;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.96);
  }
}

.btn-primary {
  background: linear-gradient(135deg, $pink-400, $pink-500);
  color: $white;
  box-shadow: 0 4px 12px rgba(255, 94, 158, 0.3);

  &:hover {
    box-shadow: 0 6px 16px rgba(255, 94, 158, 0.4);
  }
}

.btn-secondary {
  background: $pink-50;
  color: $pink-500;
  border: 1px solid $pink-200;

  &:hover {
    background: $pink-100;
  }
}

.btn-icon {
  font-size: $font-lg;
}
</style>