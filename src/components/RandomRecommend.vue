<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="recommend-overlay" @click.self="$emit('close')">
        <Transition name="slide-up">
          <div v-if="visible" class="recommend-panel">
            <div class="panel-header">
              <h2 class="panel-title">🎲 今天小鸡毛适合吃这些～</h2>
              <button class="panel-close" @click="$emit('close')">✕</button>
            </div>

            <div class="panel-body">
              <div
                v-for="item in recommendations"
                :key="item.id"
                class="recommend-item"
              >
                <span class="item-emoji">{{ item.emoji }}</span>
                <div class="item-info">
                  <span class="item-name">{{ item.name }}</span>
                  <span class="item-desc">{{ item.description }}</span>
                </div>
                <button
                  class="item-add-btn"
                  :class="{ added: isInCart(item.id) }"
                  @click="$emit('addToCart', item)"
                >
                  {{ isInCart(item.id) ? '已加入' : '加入' }}
                </button>
              </div>
            </div>

            <div class="panel-footer">
              <button class="refresh-btn" @click="$emit('refresh')">
                🔄 换一批
              </button>
              <button class="addAll-btn" @click="$emit('addAll')">
                全部加入 🛒
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { MenuItem } from '@/types/order'

defineProps<{
  visible: boolean
  recommendations: MenuItem[]
  isInCart: (id: string) => boolean
}>()

defineEmits<{
  close: []
  refresh: []
  addToCart: [item: MenuItem]
  addAll: []
}>()
</script>

<style lang="scss" scoped>
.recommend-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-xl;
}

.recommend-panel {
  width: 100%;
  max-width: $content-max-width;
  max-height: 80vh;
  background: $white;
  border-radius: $radius-xl;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
}

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: $spacing-lg $spacing-2xl;
}

.recommend-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-lg 0;
  border-bottom: 1px solid $gray-100;

  &:last-child {
    border-bottom: none;
  }
}

.item-emoji {
  font-size: 36px;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  display: block;
  font-size: $font-base;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $spacing-xs;
}

.item-desc {
  display: block;
  font-size: $font-xs;
  color: $text-hint;
}

.item-add-btn {
  flex-shrink: 0;
  padding: $spacing-sm $spacing-lg;
  border-radius: $radius-full;
  font-size: $font-sm;
  font-weight: 500;
  background: linear-gradient(135deg, $pink-400, $pink-500);
  color: $white;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.95);
  }

  &.added {
    background: $gray-200;
    color: $text-hint;
  }
}

.panel-footer {
  display: flex;
  gap: $spacing-md;
  padding: $spacing-lg $spacing-2xl;
  padding-bottom: calc(#{$spacing-lg} + env(safe-area-inset-bottom, 0px));
  border-top: 1px solid $gray-100;
}

.refresh-btn {
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

.addAll-btn {
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