<template>
  <div class="menu-card" :class="{ 'in-cart': quantity > 0 }">
    <div class="card-emoji">{{ item.emoji }}</div>
    <div class="card-info">
      <h3 class="card-name">{{ item.name }}</h3>
      <span class="card-category">{{ item.categoryName }}</span>
      <p class="card-desc">{{ item.description }}</p>
    </div>
    <div class="card-action">
      <div v-if="quantity > 0" class="quantity-control">
        <button class="qty-btn" @click="$emit('decrease')">−</button>
        <span class="qty-value">{{ quantity }}</span>
        <button class="qty-btn" @click="$emit('increase')">+</button>
      </div>
      <button v-else class="add-btn" @click="$emit('add')">
        加入菜单
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from '@/types/order'

defineProps<{
  item: MenuItem
  quantity: number
}>()

defineEmits<{
  add: []
  increase: []
  decrease: []
}>()
</script>

<style lang="scss" scoped>
.menu-card {
  background: $white;
  border-radius: $radius-lg;
  padding: $spacing-lg;
  box-shadow: $shadow-sm;
  display: flex;
  align-items: center;
  gap: $spacing-md;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.98);
  }

  &.in-cart {
    border: 1px solid $pink-200;
    background: $pink-50;
  }
}

.card-emoji {
  font-size: 36px;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-info {
  flex: 1;
  min-width: 0;
}

.card-name {
  font-size: $font-base;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $spacing-xs;
}

.card-category {
  font-size: $font-xs;
  color: $pink-400;
  background: $pink-50;
  padding: 2px 6px;
  border-radius: $radius-sm;
}

.card-desc {
  font-size: $font-xs;
  color: $text-hint;
  margin-top: $spacing-xs;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-action {
  flex-shrink: 0;
}

.add-btn {
  background: linear-gradient(135deg, $pink-400, $pink-500);
  color: $white;
  font-size: $font-xs;
  font-weight: 500;
  padding: $spacing-sm $spacing-md;
  border-radius: $radius-full;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(255, 94, 158, 0.2);
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.95);
  }
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  background: $white;
  border-radius: $radius-full;
  padding: 2px;
  border: 1px solid $pink-200;
}

.qty-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: $pink-100;
  color: $pink-500;
  font-size: $font-lg;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:active {
    background: $pink-200;
    transform: scale(0.9);
  }
}

.qty-value {
  font-size: $font-sm;
  font-weight: 600;
  color: $text-primary;
  min-width: 20px;
  text-align: center;
}
</style>