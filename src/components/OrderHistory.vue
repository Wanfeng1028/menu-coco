<template>
  <div class="order-history">
    <div class="history-header">
      <button class="back-btn" @click="$emit('goBack')">← 返回</button>
      <h2 class="history-title">📜 投喂记录</h2>
    </div>

    <div v-if="orders.length === 0" class="empty-state">
      <span class="empty-emoji">🍽️</span>
      <p class="empty-text">还没有投喂记录哦～</p>
      <p class="empty-subtitle">快去点餐吧！</p>
      <button class="empty-btn" @click="$emit('goBack')">去点餐</button>
    </div>

    <div v-else class="history-list">
      <div
        v-for="order in orders"
        :key="order.id"
        class="order-card"
      >
        <div class="card-header" @click="toggleExpand(order.id)">
          <div class="card-summary">
            <span class="card-id">{{ order.id }}</span>
            <span class="card-time">{{ order.submittedAt }}</span>
          </div>
          <div class="card-dishes">
            <span class="dish-text">
              {{ order.cartItems.slice(0, 3).map(i => i.name).join('、') }}
              <template v-if="order.cartItems.length > 3">等{{ order.cartItems.length }}道菜</template>
            </span>
          </div>
          <div class="card-tags">
            <span class="tag mood-tag">{{ getMoodLabel(order.form.mood) }}</span>
            <span class="tag delivery-tag">{{ getDeliveryLabel(order.form.deliveryType) }}</span>
          </div>
          <span class="expand-icon">{{ expandedIds.has(order.id) ? '▲' : '▼' }}</span>
        </div>

        <Transition name="slide-down">
          <div v-if="expandedIds.has(order.id)" class="card-detail">
            <div class="detail-items">
              <div
                v-for="item in order.cartItems"
                :key="item.id"
                class="detail-item"
              >
                <span class="item-emoji">{{ item.emoji }}</span>
                <span class="item-name">{{ item.name }}</span>
                <span class="item-qty">× {{ item.quantity }}</span>
              </div>
            </div>

            <div class="detail-info">
              <div class="info-row">
                <span class="info-label">宝宝昵称</span>
                <span class="info-value">{{ order.form.nickname || 'Coco' }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">希望时间</span>
                <span class="info-value">{{ getMealTimeLabel(order.form.mealTime, order.form.customMealTime) }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">辣度</span>
                <span class="info-value">{{ getSpicyLabel(order.form.spicyLevel) }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">获取方式</span>
                <span class="info-value">{{ getDeliveryLabel(order.form.deliveryType) }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">心情</span>
                <span class="info-value">{{ getMoodLabel(order.form.mood) }}</span>
              </div>
              <div v-if="order.form.note" class="info-row">
                <span class="info-label">备注</span>
                <span class="info-value">{{ order.form.note }}</span>
              </div>
            </div>

            <button class="reorder-btn" @click="$emit('reorder', order)">
              🔄 再来一单
            </button>
          </div>
        </Transition>
      </div>
    </div>

    <div v-if="orders.length > 0" class="history-footer">
      <button class="clear-btn" @click="handleClear">🗑️ 清空历史</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { OrderRecord } from '@/types/order'
import { getMealTimeLabel, getSpicyLabel, getDeliveryLabel, getMoodLabel } from '@/utils/time'

defineProps<{
  orders: OrderRecord[]
}>()

const emit = defineEmits<{
  reorder: [order: OrderRecord]
  goBack: []
  clearHistory: []
}>()

const expandedIds = ref<Set<string>>(new Set())

function toggleExpand(id: string) {
  if (expandedIds.value.has(id)) {
    expandedIds.value.delete(id)
  } else {
    expandedIds.value.add(id)
  }
}

function handleClear() {
  if (window.confirm('确定要清空所有投喂记录吗？')) {
    emit('clearHistory')
  }
}
</script>

<style lang="scss" scoped>
.order-history {
  background: $white;
  border-radius: $radius-xl;
  padding: $spacing-2xl;
  box-shadow: $shadow-card;
  padding-bottom: calc(#{$spacing-2xl} + env(safe-area-inset-bottom, 0px));
}

.history-header {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  margin-bottom: $spacing-2xl;
}

.back-btn {
  flex-shrink: 0;
  padding: $spacing-sm $spacing-lg;
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

.history-title {
  font-size: $font-xl;
  font-weight: 600;
  color: $text-primary;
}

.empty-state {
  text-align: center;
  padding: $spacing-3xl 0;
}

.empty-emoji {
  font-size: 64px;
  display: block;
  margin-bottom: $spacing-lg;
}

.empty-text {
  font-size: $font-lg;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $spacing-sm;
}

.empty-subtitle {
  font-size: $font-sm;
  color: $text-secondary;
  margin-bottom: $spacing-2xl;
}

.empty-btn {
  padding: $spacing-md $spacing-2xl;
  border-radius: $radius-full;
  background: linear-gradient(135deg, $pink-400, $pink-500);
  color: $white;
  font-size: $font-sm;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(255, 94, 158, 0.3);
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.96);
  }
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.order-card {
  border: 1px solid $pink-100;
  border-left: 4px solid $pink-300;
  border-radius: $radius-lg;
  overflow: hidden;
  transition: all 0.2s ease;
}

.card-header {
  padding: $spacing-lg;
  cursor: pointer;
  position: relative;

  &:active {
    background: $pink-50;
  }
}

.card-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $spacing-sm;
}

.card-id {
  font-size: $font-xs;
  color: $text-hint;
  font-family: monospace;
}

.card-time {
  font-size: $font-xs;
  color: $text-hint;
}

.card-dishes {
  margin-bottom: $spacing-sm;
}

.dish-text {
  font-size: $font-sm;
  font-weight: 500;
  color: $text-primary;
}

.card-tags {
  display: flex;
  gap: $spacing-sm;
}

.tag {
  padding: $spacing-xs $spacing-sm;
  border-radius: $radius-full;
  font-size: $font-xs;
}

.mood-tag {
  background: $pink-50;
  color: $pink-500;
}

.delivery-tag {
  background: $gray-50;
  color: $text-secondary;
  border: 1px solid $gray-200;
}

.expand-icon {
  position: absolute;
  top: $spacing-lg;
  right: $spacing-lg;
  font-size: $font-xs;
  color: $text-hint;
}

.card-detail {
  background: $pink-50;
  padding: $spacing-lg;
  border-top: 1px solid $pink-100;
}

.detail-items {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  margin-bottom: $spacing-lg;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-md;
  background: $white;
  border-radius: $radius-md;
}

.item-emoji {
  font-size: 20px;
  flex-shrink: 0;
}

.item-name {
  flex: 1;
  font-size: $font-sm;
  color: $text-primary;
}

.item-qty {
  font-size: $font-sm;
  color: $pink-500;
  font-weight: 600;
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  margin-bottom: $spacing-lg;
}

.info-row {
  display: flex;
  align-items: baseline;
  gap: $spacing-md;
}

.info-label {
  flex-shrink: 0;
  width: 64px;
  font-size: $font-xs;
  color: $text-hint;
}

.info-value {
  font-size: $font-sm;
  color: $text-primary;
}

.reorder-btn {
  width: 100%;
  padding: $spacing-md;
  border-radius: $radius-full;
  background: linear-gradient(135deg, $pink-400, $pink-500);
  color: $white;
  font-size: $font-sm;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(255, 94, 158, 0.3);
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.98);
  }
}

.history-footer {
  margin-top: $spacing-2xl;
  text-align: center;
}

.clear-btn {
  padding: $spacing-sm $spacing-2xl;
  border-radius: $radius-full;
  background: $white;
  color: $error;
  font-size: $font-sm;
  font-weight: 500;
  border: 1px solid $error;
  transition: all 0.2s ease;

  &:active {
    background: $error;
    color: $white;
  }
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 600px;
}
</style>
