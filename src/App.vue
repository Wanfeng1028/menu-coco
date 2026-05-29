<template>
  <div class="app-container">
    <AppHeader />

    <WelcomeCard
      v-if="currentView === 'menu'"
      @random-recommend="showRandomRecommend"
      @view-menu="scrollToMenu"
    />

    <!-- 菜单视图 -->
    <template v-if="currentView === 'menu'">
      <TopTipBar />
      
      <ShopStatusCard />
      
      <SearchBar v-model="searchQuery" />
      
      <QuickActions @action="handleQuickAction" />
      
      <BenefitCards />
      
      <FavoriteSection
        :items="favoriteItems"
        @add-to-cart="addToCart"
      />
      
      <div ref="menuRef">
        <h3 class="section-title">🍽️ 全部菜品</h3>
      </div>
      
      <ShopMenuLayout
        :categories="categories"
        :menu-items="filteredMenuItems"
        :cart="cart"
        @add-to-cart="addToCart"
        @increase="increaseQuantity"
        @decrease="decreaseQuantity"
      />
    </template>

    <!-- 订单表单视图 -->
    <OrderForm
      v-if="currentView === 'order'"
      :form="orderForm"
      :cart="cart"
      :submitting="submitting"
      @back="currentView = 'menu'"
      @submit="handleSubmitOrder"
    />

    <!-- 底部固定购物车栏 -->
    <StickyCartBar
      :cart-count="cartCount"
      :cart="cart"
      @open-cart="openCartPanel"
      @submit="goToOrder"
    />

    <!-- 购物车面板 -->
    <CartPanel
      ref="cartPanelRef"
      :cart="cart"
      :cart-count="cartCount"
      @increase="increaseQuantity"
      @decrease="decreaseQuantity"
      @remove="removeFromCart"
      @clear="clearCartItems"
      @submit="goToOrder"
    />

    <!-- 随机推荐 -->
    <RandomRecommend
      :visible="showRecommend"
      :recommendations="recommendations"
      :is-in-cart="isInCart"
      @close="showRecommend = false"
      @refresh="generateRecommendations"
      @add-to-cart="addToCart"
      @add-all="addAllRecommendations"
    />

    <!-- 成功弹窗 -->
    <SuccessModal
      :visible="showSuccess"
      @close="handleSuccessClose"
      @reorder="handleReorder"
    />

    <!-- 错误提示 -->
    <Transition name="fade">
      <div v-if="errorMessage" class="error-toast" @click="errorMessage = ''">
        {{ errorMessage }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { MenuItem, CartItem, OrderForm as OrderFormType } from '@/types/order'
import { menuItems, categories } from '@/data/menu'
import { getCart, setCart, clearCart, getPreference, setPreference } from '@/utils/storage'
import { sendOrderEmail } from '@/utils/email'

import AppHeader from '@/components/AppHeader.vue'
import WelcomeCard from '@/components/WelcomeCard.vue'
import TopTipBar from '@/components/TopTipBar.vue'
import ShopStatusCard from '@/components/ShopStatusCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import QuickActions from '@/components/QuickActions.vue'
import BenefitCards from '@/components/BenefitCards.vue'
import FavoriteSection from '@/components/FavoriteSection.vue'
import ShopMenuLayout from '@/components/ShopMenuLayout.vue'
import StickyCartBar from '@/components/StickyCartBar.vue'
import CartPanel from '@/components/CartPanel.vue'
import OrderForm from '@/components/OrderForm.vue'
import RandomRecommend from '@/components/RandomRecommend.vue'
import SuccessModal from '@/components/SuccessModal.vue'

// State
const currentView = ref<'menu' | 'order'>('menu')
const searchQuery = ref('')
const cart = ref<CartItem[]>([])
const showRecommend = ref(false)
const recommendations = ref<MenuItem[]>([])
const showSuccess = ref(false)
const submitting = ref(false)
const errorMessage = ref('')
const menuRef = ref<HTMLElement | null>(null)
const cartPanelRef = ref<InstanceType<typeof CartPanel> | null>(null)

const defaultForm: OrderFormType = {
  nickname: '小白白',
  mealTime: 'now',
  customMealTime: '',
  spicyLevel: 'none',
  deliveryType: 'cook',
  mood: 'happy',
  note: ''
}

const orderForm = ref<OrderFormType>({ ...defaultForm })

// Computed
const filteredMenuItems = computed(() => {
  if (!searchQuery.value) return menuItems
  const query = searchQuery.value.toLowerCase()
  return menuItems.filter(item => 
    item.name.toLowerCase().includes(query) ||
    item.categoryName.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query) ||
    item.tags?.some(tag => tag.toLowerCase().includes(query))
  )
})

const favoriteItems = computed(() => {
  return menuItems.filter(item => 
    item.isPopular || item.isRecommended
  ).slice(0, 6)
})

const cartCount = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.quantity, 0)
})

// Cart methods
function addToCart(item: MenuItem) {
  const existing = cart.value.find(i => i.id === item.id)
  if (existing) {
    existing.quantity++
  } else {
    cart.value.push({ ...item, quantity: 1 })
  }
}

function increaseQuantity(id: string) {
  const item = cart.value.find(i => i.id === id)
  if (item) {
    item.quantity++
  }
}

function decreaseQuantity(id: string) {
  const item = cart.value.find(i => i.id === id)
  if (item) {
    if (item.quantity <= 1) {
      removeFromCart(id)
    } else {
      item.quantity--
    }
  }
}

function removeFromCart(id: string) {
  cart.value = cart.value.filter(i => i.id !== id)
}

function clearCartItems() {
  cart.value = []
  clearCart()
}

function isInCart(id: string): boolean {
  return cart.value.some(i => i.id === id)
}

// Persistence
watch(cart, (newCart) => {
  setCart(newCart)
}, { deep: true })

watch(orderForm, (newForm) => {
  setPreference({
    nickname: newForm.nickname,
    spicyLevel: newForm.spicyLevel,
    deliveryType: newForm.deliveryType,
    mood: newForm.mood
  })
}, { deep: true })

onMounted(() => {
  const savedCart = getCart()
  if (savedCart.length > 0) {
    cart.value = savedCart
  }

  const savedPref = getPreference()
  if (savedPref) {
    orderForm.value = { ...defaultForm, ...savedPref }
  }
})

// Random recommend
function generateRecommendations() {
  const count = Math.floor(Math.random() * 3) + 2 // 2-4 items
  const shuffled = [...menuItems]
    .filter(item => item.category !== 'special')
    .sort(() => Math.random() - 0.5)

  // Try to include different categories
  const selected: MenuItem[] = []
  const usedCategories = new Set<string>()

  for (const item of shuffled) {
    if (selected.length >= count) break
    if (!usedCategories.has(item.category) || selected.length >= 3) {
      selected.push(item)
      usedCategories.add(item.category)
    }
  }

  // Fill remaining if needed
  if (selected.length < count) {
    for (const item of shuffled) {
      if (selected.length >= count) break
      if (!selected.find(s => s.id === item.id)) {
        selected.push(item)
      }
    }
  }

  recommendations.value = selected
}

function showRandomRecommend() {
  generateRecommendations()
  showRecommend.value = true
}

function addAllRecommendations() {
  for (const item of recommendations.value) {
    if (!isInCart(item.id)) {
      addToCart(item)
    }
  }
  showRecommend.value = false
}

// Quick actions
function handleQuickAction(key: string) {
  switch (key) {
    case 'recommend':
    case 'random':
      showRandomRecommend()
      break
    case 'meat':
      searchQuery.value = '肉'
      break
    case 'drink':
      searchQuery.value = '饮料'
      break
    case 'coax':
      const coaxItem = menuItems.find(item => item.id === 'want-to-be-coaxed')
      if (coaxItem) addToCart(coaxItem)
      break
    case 'arrange':
      // Random add 2-4 items
      const shuffled = [...menuItems]
        .filter(item => item.category !== 'special')
        .sort(() => Math.random() - 0.5)
      const count = Math.floor(Math.random() * 3) + 2
      for (let i = 0; i < count && i < shuffled.length; i++) {
        addToCart(shuffled[i])
      }
      break
  }
}

// Navigation
function scrollToMenu() {
  menuRef.value?.scrollIntoView({ behavior: 'smooth' })
}

function openCartPanel() {
  if (cartPanelRef.value) {
    cartPanelRef.value.isOpen = true
  }
}

function goToOrder() {
  if (cart.value.length === 0) {
    errorMessage.value = '宝宝还没有选菜哦～'
    setTimeout(() => { errorMessage.value = '' }, 2000)
    return
  }
  currentView.value = 'order'
}

// Submit order
async function handleSubmitOrder() {
  if (cart.value.length === 0) {
    errorMessage.value = '宝宝还没有选菜哦～'
    setTimeout(() => { errorMessage.value = '' }, 2000)
    return
  }

  submitting.value = true

  try {
    await sendOrderEmail(cart.value, orderForm.value)
    showSuccess.value = true
    clearCartItems()
  } catch (error: any) {
    errorMessage.value = error.message || '发送失败了，宝宝先截图发给我也可以～'
    setTimeout(() => { errorMessage.value = '' }, 3000)
  } finally {
    submitting.value = false
  }
}

// Success modal
function handleSuccessClose() {
  showSuccess.value = false
  currentView.value = 'menu'
}

function handleReorder() {
  showSuccess.value = false
  currentView.value = 'menu'
}
</script>

<style lang="scss" scoped>
.section-title {
  font-size: $font-lg;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $spacing-md;
  margin-top: $spacing-xl;
}

.error-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.75);
  color: $white;
  padding: $spacing-md $spacing-2xl;
  border-radius: $radius-lg;
  font-size: $font-sm;
  z-index: 400;
  max-width: 280px;
  text-align: center;
}

// Scale transition for success modal
.scale-enter-active,
.scale-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
</style>
