<template>
  <div class="shop-status-card">
    <div class="status-row status-main">
      <span class="status-dot active"></span>
      <span class="status-text">今日可投喂</span>
      <span class="status-badge">营业中</span>
    </div>
    <div class="status-tags">
      <span class="tag">🍳 可做饭</span>
      <span class="tag">🛍️ 可买饭</span>
      <span class="tag">🛵 可点外卖</span>
    </div>
    <div class="status-info">
      <span class="info-item">⏱️ 预计响应：看到就安排</span>
    </div>
    <div class="status-tip">
      💡 下单后男朋友会收到提醒～
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.shop-status-card {
  background: $white;
  border-radius: $radius-lg;
  padding: $spacing-lg;
  box-shadow: $shadow-sm;
  margin-bottom: $spacing-lg;
}

.status-row {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
}

.status-main {
  gap: $spacing-md;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: $gray-400;
  
  &.active {
    background: $success;
    box-shadow: 0 0 6px rgba(76, 175, 80, 0.4);
  }
}

.status-text {
  font-size: $font-base;
  font-weight: 600;
  color: $text-primary;
}

.status-badge {
  font-size: $font-xs;
  background: rgba(76, 175, 80, 0.1);
  color: $success;
  padding: 2px 8px;
  border-radius: $radius-full;
  font-weight: 500;
}

.status-tags {
  display: flex;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
  flex-wrap: wrap;
}

.tag {
  font-size: $font-xs;
  background: $pink-50;
  color: $pink-500;
  padding: $spacing-xs $spacing-md;
  border-radius: $radius-full;
  border: 1px solid $pink-100;
}

.status-info {
  margin-bottom: $spacing-sm;
}

.info-item {
  font-size: $font-sm;
  color: $text-secondary;
}

.status-tip {
  font-size: $font-xs;
  color: $text-hint;
  background: $pink-50;
  padding: $spacing-sm $spacing-md;
  border-radius: $radius-sm;
}
</style>
