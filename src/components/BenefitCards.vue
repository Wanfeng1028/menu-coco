<template>
  <div class="benefit-section">
    <div class="benefit-scroll">
      <div
        v-for="benefit in benefits"
        :key="benefit.id"
        class="benefit-card"
        :class="benefit.type"
      >
        <div class="benefit-icon">{{ benefit.icon }}</div>
        <div class="benefit-content">
          <div class="benefit-title">{{ benefit.title }}</div>
          <div class="benefit-desc">{{ benefit.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const benefits = [
  {
    id: 1,
    icon: '🎁',
    title: '今日专属福利',
    desc: '下单即可获得男朋友投喂服务',
    type: 'primary'
  },
  {
    id: 2,
    icon: '💕',
    title: '满1道菜',
    desc: '赠送一句夸夸',
    type: 'secondary'
  },
  {
    id: 3,
    icon: '🌟',
    title: '满3道菜',
    desc: '优先安排投喂',
    type: 'secondary'
  },
  {
    id: 4,
    icon: '🤗',
    title: '备注写"想被哄"',
    desc: '自动触发哄哄服务',
    type: 'special'
  }
]
</script>

<style lang="scss" scoped>
.benefit-section {
  margin-bottom: $spacing-lg;
}

.benefit-scroll {
  display: flex;
  gap: $spacing-md;
  overflow-x: auto;
  padding: $spacing-xs 0;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
}

.benefit-card {
  flex-shrink: 0;
  width: 200px;
  padding: $spacing-lg;
  border-radius: $radius-lg;
  display: flex;
  gap: $spacing-md;
  align-items: flex-start;
  transition: all 0.2s ease;
  
  &:active {
    transform: scale(0.98);
  }
  
  &.primary {
    background: linear-gradient(135deg, $pink-400, $pink-500);
    color: $white;
  }
  
  &.secondary {
    background: $pink-50;
    border: 1px solid $pink-100;
  }
  
  &.special {
    background: linear-gradient(135deg, #ffd700, #ffa500);
    color: $white;
  }
}

.benefit-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.benefit-content {
  min-width: 0;
}

.benefit-title {
  font-size: $font-sm;
  font-weight: 600;
  margin-bottom: $spacing-xs;
}

.benefit-desc {
  font-size: $font-xs;
  opacity: 0.9;
}

.secondary .benefit-title {
  color: $pink-500;
}

.secondary .benefit-desc {
  color: $text-secondary;
}
</style>
