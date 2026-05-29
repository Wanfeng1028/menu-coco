<template>
  <div class="favorite-section">
    <h3 class="section-title">💕 小鸡毛可能想吃</h3>
    <div class="favorite-scroll">
      <div
        v-for="item in items"
        :key="item.id"
        class="favorite-item"
        @click="$emit('addToCart', item)"
      >
        <span class="item-emoji">{{ item.emoji }}</span>
        <span class="item-name">{{ item.name }}</span>
        <span class="item-add">+</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from '@/types/order'

defineProps<{
  items: MenuItem[]
}>()

defineEmits<{
  addToCart: [item: MenuItem]
}>()
</script>

<style lang="scss" scoped>
.favorite-section {
  margin-bottom: $spacing-lg;
}

.section-title {
  font-size: $font-base;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $spacing-md;
}

.favorite-scroll {
  display: flex;
  gap: $spacing-md;
  overflow-x: auto;
  padding: $spacing-xs 0;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
}

.favorite-item {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-xs;
  padding: $spacing-md;
  background: $white;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;
  width: 80px;
  position: relative;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:active {
    transform: scale(0.95);
  }
}

.item-emoji {
  font-size: 32px;
}

.item-name {
  font-size: $font-xs;
  font-weight: 500;
  color: $text-primary;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.item-add {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, $pink-400, $pink-500);
  color: $white;
  font-size: $font-xs;
  font-weight: 700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
