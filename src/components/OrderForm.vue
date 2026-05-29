<template>
  <div class="order-form">
    <div class="form-header">
      <h2 class="form-title">📝 填写订单</h2>
      <p class="form-subtitle">告诉小鸡毛你的小心思～</p>
    </div>

    <!-- 显示已选菜品 -->
    <div class="selected-items">
      <h3 class="section-title">已选菜品</h3>
      <div class="items-list">
        <div v-for="item in cart" :key="item.id" class="selected-item">
          <span>{{ item.emoji }} {{ item.name }} × {{ item.quantity }}</span>
        </div>
      </div>
    </div>

    <div class="form-fields">
      <!-- 宝宝昵称 -->
      <div class="field">
        <label class="field-label">宝宝昵称</label>
        <input
          v-model="form.nickname"
          class="field-input"
          type="text"
          placeholder="你的小名"
        />
      </div>

      <!-- 希望吃饭时间 -->
      <div class="field">
        <label class="field-label">希望吃饭时间</label>
        <div class="option-group">
          <button
            v-for="option in mealTimeOptions"
            :key="option.value"
            class="option-btn"
            :class="{ active: form.mealTime === option.value }"
            @click="form.mealTime = option.value"
          >
            {{ option.label }}
          </button>
        </div>
        <input
          v-if="form.mealTime === 'custom'"
          v-model="form.customMealTime"
          class="field-input"
          type="text"
          placeholder="请输入时间，比如下午3点"
        />
      </div>

      <!-- 辣度 -->
      <div class="field">
        <label class="field-label">辣度</label>
        <div class="option-group">
          <button
            v-for="option in spicyOptions"
            :key="option.value"
            class="option-btn"
            :class="{ active: form.spicyLevel === option.value }"
            @click="form.spicyLevel = option.value"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <!-- 获取方式 -->
      <div class="field">
        <label class="field-label">获取方式</label>
        <div class="option-group">
          <button
            v-for="option in deliveryOptions"
            :key="option.value"
            class="option-btn"
            :class="{ active: form.deliveryType === option.value }"
            @click="form.deliveryType = option.value"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <!-- 心情 -->
      <div class="field">
        <label class="field-label">心情</label>
        <div class="option-group">
          <button
            v-for="option in moodOptions"
            :key="option.value"
            class="option-btn"
            :class="{ active: form.mood === option.value }"
            @click="form.mood = option.value"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <!-- 备注 -->
      <div class="field">
        <label class="field-label">备注</label>
        <textarea
          v-model="form.note"
          class="field-textarea"
          placeholder="比如不要太油、多放葱、想喝冰的……"
          rows="3"
        />
      </div>
    </div>

    <div class="form-actions">
      <button class="back-btn" @click="$emit('back')">
        ← 返回
      </button>
      <button
        class="submit-btn"
        :disabled="submitting"
        @click="$emit('submit')"
      >
        {{ submitting ? '发送中...' : '发送给男朋友 💕' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OrderForm as OrderFormType, CartItem } from '@/types/order'

defineProps<{
  form: OrderFormType
  cart: CartItem[]
  submitting: boolean
}>()

defineEmits<{
  back: []
  submit: []
}>()

const mealTimeOptions = [
  { label: '现在', value: 'now' },
  { label: '半小时后', value: '30min' },
  { label: '晚上7点', value: '7pm' },
  { label: '自定义', value: 'custom' }
]

const spicyOptions = [
  { label: '不辣', value: 'none' },
  { label: '微辣', value: 'mild' },
  { label: '中辣', value: 'medium' },
  { label: '超辣', value: 'super' }
]

const deliveryOptions = [
  { label: '你做给我吃', value: 'cook' },
  { label: '你买给我吃', value: 'buy' },
  { label: '你点外卖给我', value: 'delivery' },
  { label: '先记下来', value: 'note' }
]

const moodOptions = [
  { label: '饿了', value: 'hungry' },
  { label: '开心', value: 'happy' },
  { label: '有点累', value: 'tired' },
  { label: '想被哄', value: 'coax' },
  { label: '随便但要好吃', value: 'whatever' }
]
</script>

<style lang="scss" scoped>
.order-form {
  background: $white;
  border-radius: $radius-xl;
  padding: $spacing-2xl;
  box-shadow: $shadow-card;
}

.form-header {
  text-align: center;
  margin-bottom: $spacing-2xl;
}

.form-title {
  font-size: $font-xl;
  font-weight: 600;
  margin-bottom: $spacing-xs;
}

.form-subtitle {
  font-size: $font-sm;
  color: $text-secondary;
}

.selected-items {
  background: $pink-50;
  border-radius: $radius-lg;
  padding: $spacing-lg;
  margin-bottom: $spacing-2xl;
}

.section-title {
  font-size: $font-sm;
  font-weight: 600;
  color: $pink-500;
  margin-bottom: $spacing-md;
}

.items-list {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm;
}

.selected-item {
  background: $white;
  padding: $spacing-xs $spacing-md;
  border-radius: $radius-full;
  font-size: $font-sm;
  border: 1px solid $pink-200;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: $spacing-xl;
}

.field {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.field-label {
  font-size: $font-sm;
  font-weight: 600;
  color: $text-primary;
}

.option-group {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm;
}

.option-btn {
  padding: $spacing-sm $spacing-lg;
  border-radius: $radius-full;
  font-size: $font-sm;
  background: $gray-50;
  color: $text-secondary;
  border: 1px solid $gray-200;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:active {
    transform: scale(0.96);
  }

  &.active {
    background: $pink-100;
    color: $pink-500;
    border-color: $pink-300;
  }
}

.field-input {
  width: 100%;
  padding: $spacing-md $spacing-lg;
  border-radius: $radius-md;
  background: $gray-50;
  border: 1px solid $gray-200;
  font-size: $font-base;
  transition: all 0.2s ease;

  &:focus {
    border-color: $pink-300;
    background: $white;
  }
}

.field-textarea {
  width: 100%;
  padding: $spacing-md $spacing-lg;
  border-radius: $radius-md;
  background: $gray-50;
  border: 1px solid $gray-200;
  font-size: $font-base;
  resize: vertical;
  min-height: 80px;
  transition: all 0.2s ease;

  &:focus {
    border-color: $pink-300;
    background: $white;
  }
}

.form-actions {
  display: flex;
  gap: $spacing-md;
  margin-top: $spacing-2xl;
  padding-bottom: $spacing-lg;
}

.back-btn {
  flex-shrink: 0;
  padding: $spacing-md $spacing-xl;
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
  padding: $spacing-md $spacing-xl;
  border-radius: $radius-full;
  background: linear-gradient(135deg, $pink-400, $pink-500);
  color: $white;
  font-size: $font-base;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(255, 94, 158, 0.3);
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}
</style>