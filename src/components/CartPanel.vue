<template>
  <Teleport to="body">
    <!-- Cart panel -->
    <Transition name="fade">
      <div v-if="isOpen" class="cart-overlay" @click.self="isOpen = false">
        <Transition name="slide-up">
          <div v-if="isOpen" class="cart-panel">
            <div class="panel-header">
              <h2 class="panel-title">🛒 今日投喂清单</h2>
              <button class="panel-close" @click="isOpen = false">✕</button>
            </div>

            <div class="panel-body">
              <template v-if="cart.length > 0">
                <div
                  v-for="item in cart"
                  :key="item.id"
                  class="cart-item"
                >
                  <span class="item-emoji">{{ item.emoji }}</span>
                  <div class="item-info">
                    <span class="item-name">{{ item.name }}</span>
                  </div>
                  <div class="item-quantity">
                    <button class="qty-btn" @click="$emit('decrease', item.id)">−</button>
                    <span class="qty-value">{{ item.quantity }}</span>
                    <button class="qty-btn" @click="$emit('increase', item.id)">+</button>
                  </div>
                  <button class="item-remove" @click="$emit('remove', item.id)">🗑️</button>
                </div>
              </template>
              <EmptyState
                v-else
                emoji="🥺"
                text="宝宝还没有选菜哦～"
                hint="先去挑一点想吃的吧"
              />
            </div>

            <div v-if="cart.length > 0" class="panel-footer">
              <button class="clear-btn" @click="$emit('clear')">
                清空购物车
              </button>
              <button class="submit-btn" @click="handleSubmit">
                填写订单 →
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CartItem } from '@/types/order'
import EmptyState from './EmptyState.vue'

defineProps<{
  cart: CartItem[]
  cartCount: number
}>()

const emit = defineEmits<{
  increase: [id: string]
  decrease: [id: string]
  remove: [id: string]
  clear: []
  submit: []
}>()

const isOpen = ref(false)

function handleSubmit() {
  isOpen.value = false
  emit('submit')
}

defineExpose({ isOpen })
</script>

<style lang="scss" scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 90;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.cart-panel {
  width: 100%;
  max-width: $content-max-width;
  max-height: 75vh;
  background: $white;
  border-radius: $radius-xl $radius-xl 0 0;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-xl $spacing-2xl;
  border-bottom: 1px solid $gray-100;
}

.panel-title {
  font-size: $font-lg;
  font-weight: 600;
}

.panel-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: $gray-100;
  color: $gray-600;
  font-size: $font-sm;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:active {
    background: $gray-200;
  }
}

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: $spacing-lg $spacing-2xl;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md 0;
  border-bottom: 1px solid $gray-100;

  &:last-child {
    border-bottom: none;
  }
}

.item-emoji {
  font-size: 28px;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: $font-base;
  font-weight: 500;
  color: $text-primary;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
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

.item-remove {
  font-size: $font-lg;
  padding: $spacing-xs;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.9);
  }
}

.panel-footer {
  display: flex;
  gap: $spacing-md;
  padding: $spacing-lg $spacing-2xl;
  padding-bottom: calc(#{$spacing-lg} + env(safe-area-inset-bottom, 0px));
  border-top: 1px solid $gray-100;
}

.clear-btn {
  flex-shrink: 0;
  padding: $spacing-md $spacing-lg;
  border-radius: $radius-full;
  background: $gray-100;
  color: $text-secondary;
  font-size: $font-sm;
  font-weight: 500;
  transition: all 0.2s ease;

  &:active {
    background: $gray-200;
  }
}

.submit-btn {
  flex: 1;
  padding: $spacing-md $spacing-lg;
  border-radius: $radius-full;
  background: linear-gradient(135deg, $pink-400, $pink-500);
  color: $white;
  font-size: $font-sm;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(255, 94, 158, 0.3);
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.98);
  }
}
</style>