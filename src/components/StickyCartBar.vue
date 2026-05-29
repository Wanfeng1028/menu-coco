<template>
  <Teleport to="body">
    <div class="sticky-cart-bar" v-if="cartCount > 0">
      <div class="cart-left" @click="$emit('openCart')">
        <span class="cart-icon">🛒</span>
        <div class="cart-info">
          <span class="cart-title">今日投喂清单</span>
          <span class="cart-count">已选 {{ cartCount }} 个</span>
        </div>
      </div>
      <button class="cart-submit" @click="$emit('submit')">
        去填写
      </button>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { CartItem } from '@/types/order'

defineProps<{
  cartCount: number
  cart: CartItem[]
}>()

defineEmits<{
  openCart: []
  submit: []
}>()
</script>

<style lang="scss" scoped>
.sticky-cart-bar {
  position: fixed;
  bottom: calc(12px + env(safe-area-inset-bottom, 0px));
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 28px);
  max-width: calc(#{$content-max-width} - 28px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, $pink-400, $pink-500);
  padding: $spacing-sm $spacing-md $spacing-sm $spacing-lg;
  border-radius: $radius-full;
  box-shadow: 0 4px 20px rgba(255, 94, 158, 0.4);
  z-index: 50;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateX(-50%) translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}

.cart-left {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  cursor: pointer;
}

.cart-icon {
  font-size: 24px;
}

.cart-info {
  display: flex;
  flex-direction: column;
}

.cart-title {
  font-size: $font-sm;
  font-weight: 600;
  color: $white;
}

.cart-count {
  font-size: $font-xs;
  color: rgba(255, 255, 255, 0.8);
}

.cart-submit {
  background: $white;
  color: $pink-500;
  font-size: $font-sm;
  font-weight: 600;
  padding: $spacing-sm $spacing-xl;
  border-radius: $radius-full;
  transition: all 0.2s ease;
  
  &:active {
    transform: scale(0.95);
  }
}
</style>
