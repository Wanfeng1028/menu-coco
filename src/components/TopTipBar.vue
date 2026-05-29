<template>
  <div class="top-tip-bar" @click="nextTip">
    <span class="tip-icon">💡</span>
    <span class="tip-text">{{ currentTip }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const tips = [
  '今天也要好好吃饭～',
  '不知道吃什么就交给男朋友',
  '可以备注想被哄',
  '点完请等待投喂',
  '多吃点肉肉才有力气',
  '记得喝点饮料哦',
  '今天想被哄的话可以告诉我',
  '随便点，反正都好吃'
]

const currentIndex = ref(0)

const currentTip = ref(tips[0])

function nextTip() {
  currentIndex.value = (currentIndex.value + 1) % tips.length
  currentTip.value = tips[currentIndex.value]
}

onMounted(() => {
  currentIndex.value = Math.floor(Math.random() * tips.length)
  currentTip.value = tips[currentIndex.value]
})
</script>

<style lang="scss" scoped>
.top-tip-bar {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  background: linear-gradient(90deg, $pink-50, $white);
  padding: $spacing-sm $spacing-md;
  border-radius: $radius-md;
  margin-bottom: $spacing-lg;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:active {
    transform: scale(0.98);
  }
}

.tip-icon {
  font-size: $font-lg;
  flex-shrink: 0;
}

.tip-text {
  font-size: $font-sm;
  color: $text-secondary;
}
</style>
