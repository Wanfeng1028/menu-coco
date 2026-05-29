<template>
  <div class="shop-menu-layout">
    <!-- 左侧分类栏 -->
    <div class="category-sidebar">
      <div
        v-for="cat in categories"
        :key="cat.key"
        class="sidebar-item"
        :class="{ active: activeCategory === cat.key }"
        @click="activeCategory = cat.key"
      >
        <span class="sidebar-label">{{ cat.label }}</span>
      </div>
    </div>
    
    <!-- 右侧商品列表 -->
    <div class="menu-list">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="menu-item"
      >
        <span class="item-emoji">{{ item.emoji }}</span>
        <div class="item-info">
          <div class="item-header">
            <span class="item-name">{{ item.name }}</span>
            <span v-if="item.isPopular" class="item-tag popular">热门</span>
            <span v-if="item.isRecommended" class="item-tag recommend">推荐</span>
          </div>
          <p class="item-desc">{{ item.description }}</p>
          <div class="item-tags" v-if="item.tags">
            <span v-for="tag in item.tags.slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <div class="item-footer">
            <span class="item-love">💕 {{ item.loveValue || 1 }}</span>
          </div>
        </div>
        <div class="item-action">
          <div v-if="getQuantity(item.id) > 0" class="quantity-control">
            <button class="qty-btn" @click="$emit('decrease', item.id)">−</button>
            <span class="qty-value">{{ getQuantity(item.id) }}</span>
            <button class="qty-btn" @click="$emit('increase', item.id)">+</button>
          </div>
          <button v-else class="add-btn" @click="$emit('addToCart', item)">
            加入
          </button>
        </div>
      </div>
      <EmptyState
        v-if="filteredItems.length === 0"
        emoji="🔍"
        text="没找到这个菜哦"
        hint="可以写在备注里让男朋友安排～"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { MenuItem, CartItem, CategoryTab, MenuCategory } from '@/types/order'
import EmptyState from './EmptyState.vue'

const props = defineProps<{
  categories: CategoryTab[]
  menuItems: MenuItem[]
  cart: CartItem[]
}>()

defineEmits<{
  addToCart: [item: MenuItem]
  increase: [id: string]
  decrease: [id: string]
}>()

const activeCategory = ref<MenuCategory | 'all'>('all')

const filteredItems = computed(() => {
  if (activeCategory.value === 'all') return props.menuItems
  return props.menuItems.filter(item => item.category === activeCategory.value)
})

function getQuantity(id: string): number {
  const item = props.cart.find(i => i.id === id)
  return item?.quantity || 0
}
</script>

<style lang="scss" scoped>
.shop-menu-layout {
  display: flex;
  gap: $spacing-sm;
  height: calc(100vh - 400px);
  min-height: 300px;
  max-height: 600px;
  background: $white;
  border-radius: $radius-lg;
  overflow: hidden;
  box-shadow: $shadow-sm;
}

.category-sidebar {
  width: 85px;
  flex-shrink: 0;
  background: $gray-50;
  overflow-y: auto;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
}

.sidebar-item {
  padding: $spacing-md $spacing-sm;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  &:active {
    background: $gray-100;
  }
  
  &.active {
    background: $white;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 20px;
      background: $pink-400;
      border-radius: 0 2px 2px 0;
    }
    
    .sidebar-label {
      color: $pink-500;
      font-weight: 600;
    }
  }
}

.sidebar-label {
  font-size: $font-xs;
  color: $text-secondary;
  transition: all 0.2s ease;
}

.menu-list {
  flex: 1;
  overflow-y: auto;
  padding: $spacing-sm;
  padding-bottom: calc(80px + env(safe-area-inset-bottom, 0px));
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.menu-item {
  display: flex;
  align-items: flex-start;
  gap: $spacing-md;
  padding: $spacing-md;
  border-bottom: 1px solid $gray-100;
  
  &:last-child {
    border-bottom: none;
  }
}

.item-emoji {
  font-size: 36px;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $pink-50;
  border-radius: $radius-md;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-header {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  margin-bottom: $spacing-xs;
  flex-wrap: wrap;
}

.item-name {
  font-size: $font-base;
  font-weight: 600;
  color: $text-primary;
}

.item-tag {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: $radius-full;
  font-weight: 500;
  
  &.popular {
    background: rgba(255, 94, 158, 0.1);
    color: $pink-500;
  }
  
  &.recommend {
    background: rgba(255, 152, 0, 0.1);
    color: $warning;
  }
}

.item-desc {
  font-size: $font-xs;
  color: $text-hint;
  margin-bottom: $spacing-xs;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-tags {
  display: flex;
  gap: $spacing-xs;
  margin-bottom: $spacing-xs;
  flex-wrap: wrap;
}

.tag {
  font-size: 10px;
  background: $gray-100;
  color: $text-secondary;
  padding: 1px 6px;
  border-radius: $radius-sm;
}

.item-footer {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.item-love {
  font-size: $font-xs;
  color: $pink-400;
}

.item-action {
  flex-shrink: 0;
  align-self: center;
}

.add-btn {
  background: linear-gradient(135deg, $pink-400, $pink-500);
  color: $white;
  font-size: $font-xs;
  font-weight: 500;
  padding: $spacing-xs $spacing-md;
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
  gap: $spacing-xs;
  background: $white;
  border-radius: $radius-full;
  padding: 2px;
  border: 1px solid $pink-200;
}

.qty-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: $pink-100;
  color: $pink-500;
  font-size: $font-base;
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
