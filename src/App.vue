<template>
  <div class="app-container">
    <AppHeader />

    <!-- 首页：欢迎卡片 -->
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
      <QuickActions
        :current-meal-type="currentMealType"
        @action="handleQuickAction"
        @update:meal-type="handleMealTypeChange"
        @scroll-to-order="scrollToOrderForm"
        @random-add="handleRandomAdd"
      />
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

    <!-- 订单完成页 -->
    <OrderSuccessPage
      v-if="currentView === 'success' && latestOrder"
      :order="latestOrder"
      @copy-order="handleCopyOrder"
      @reorder="handleReorderFromSuccess"
      @modify-order="handleModifyOrder"
      @view-history="currentView = 'history'"
      @go-home="handleGoHome"
    />

    <!-- 订单历史页 -->
    <OrderHistory
      v-if="currentView === 'history'"
      :orders="orderHistory"
      @reorder="handleReorderFromHistory"
      @go-back="currentView = latestOrder ? 'success' : 'menu'"
      @clear-history="handleClearHistory"
    />

    <!-- 底部固定购物车栏（仅首页显示） -->
    <StickyCartBar
      :visible="currentView === 'menu'"
      :cart-count="cartCount"
      :cart="cart"
      @open-cart="openCartPanel"
      @submit="goToOrder"
    />

    <!-- 购物车面板（仅首页和订单页显示） -->
    <CartPanel
      v-if="currentView === 'menu' || currentView === 'order'"
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

    <!-- 订单失败卡片 -->
    <Transition name="fade">
      <div v-if="showFailCard" class="fail-overlay">
        <OrderFailCard
          :error-message="submitError"
          :has-order="cart.length > 0"
          @retry="handleSubmitOrder"
          @copy-order="handleCopyFailedOrder"
          @go-back="showFailCard = false"
        />
      </div>
    </Transition>

    <!-- 错误提示 toast -->
    <Transition name="fade">
      <div v-if="errorMessage" class="error-toast" @click="errorMessage = ''">
        {{ errorMessage }}
      </div>
    </Transition>

    <!-- 成功提示 toast -->
    <Transition name="fade">
      <div v-if="successMessage" class="success-toast">
        {{ successMessage }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { MenuItem, CartItem, OrderForm as OrderFormType, OrderRecord, AppView, MealType } from '@/types/order'
import { menuItems, categories } from '@/data/menu'
import { getCart, setCart, clearCart, getPreference, setPreference, getOrderHistory, addOrderHistory, clearOrderHistory } from '@/utils/storage'
import { sendOrderEmail } from '@/utils/email'
import { createOrderRecord, formatOrderSummary, copyToClipboard, restoreCartFromRecord, restoreFormFromRecord } from '@/utils/order'
import { getCurrentMealType } from '@/utils/meal'

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
import OrderSuccessPage from '@/components/OrderSuccessPage.vue'
import OrderFailCard from '@/components/OrderFailCard.vue'
import OrderHistory from '@/components/OrderHistory.vue'

// State
const currentView = ref<AppView>('menu')
const searchQuery = ref('')
const cart = ref<CartItem[]>([])
const showRecommend = ref(false)
const recommendations = ref<MenuItem[]>([])
const submitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const showFailCard = ref(false)
const submitError = ref('')
const latestOrder = ref<OrderRecord | null>(null)
const orderHistory = ref<OrderRecord[]>([])
const menuRef = ref<HTMLElement | null>(null)
const cartPanelRef = ref<InstanceType<typeof CartPanel> | null>(null)
const currentMealType = ref<MealType>('anytime')

const defaultForm: OrderFormType = {
  nickname: '小鸡毛',
  mealType: getCurrentMealType(),
  mealTime: 'now',
  customMealTime: '',
  scheduleType: 'now',
  scheduledDate: '',
  scheduledTime: '',
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
  ).slice(0, 8)
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
  if (item) item.quantity++
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
  if (savedCart.length > 0) cart.value = savedCart
  const savedPref = getPreference()
  if (savedPref) orderForm.value = { ...defaultForm, ...savedPref }
  orderHistory.value = getOrderHistory()
  currentMealType.value = orderForm.value.mealType as MealType || 'anytime'
})

// Random recommend
function generateRecommendations() {
  const count = Math.floor(Math.random() * 3) + 2
  const nonSpecial = menuItems.filter(item => item.category !== 'special')
  const specialItems = menuItems.filter(item => item.category === 'special')

  const stapleOrHome = nonSpecial.filter(i => ['staple', 'home', 'breakfast'].includes(i.category))
  const meatOrBbq = nonSpecial.filter(i => i.category === 'meat' || i.category === 'bbq')
  const drinks = nonSpecial.filter(i => i.category === 'drink')
  const desserts = nonSpecial.filter(i => i.category === 'dessert')
  const soupOrLight = nonSpecial.filter(i => i.category === 'soup' || i.category === 'light')
  const others = nonSpecial.filter(i => !['staple', 'home', 'breakfast', 'meat', 'bbq', 'drink', 'dessert', 'soup', 'light'].includes(i.category))

  const pick = (arr: MenuItem[]) => arr[Math.floor(Math.random() * arr.length)]
  const selected: MenuItem[] = []
  const usedIds = new Set<string>()

  const addUnique = (item: MenuItem | undefined) => {
    if (item && !usedIds.has(item.id) && selected.length < count) {
      selected.push(item)
      usedIds.add(item.id)
    }
  }

  addUnique(pick(stapleOrHome))
  if (Math.random() > 0.3) addUnique(pick(meatOrBbq))

  const pool = [...others, ...meatOrBbq, ...stapleOrHome, ...soupOrLight].filter(i => !usedIds.has(i.id))
  pool.sort(() => Math.random() - 0.5)
  for (const item of pool) {
    if (selected.length >= count) break
    addUnique(item)
  }

  if (selected.length < count && Math.random() > 0.4) {
    addUnique(pick(Math.random() > 0.5 ? drinks : desserts))
  }

  if (selected.length < count && Math.random() > 0.7 && specialItems.length > 0) {
    addUnique(pick(specialItems))
  }

  const remaining = nonSpecial.filter(i => !usedIds.has(i.id)).sort(() => Math.random() - 0.5)
  for (const item of remaining) {
    if (selected.length >= count) break
    addUnique(item)
  }

  recommendations.value = selected
}

function showRandomRecommend() {
  generateRecommendations()
  showRecommend.value = true
}

function addAllRecommendations() {
  for (const item of recommendations.value) {
    if (!isInCart(item.id)) addToCart(item)
  }
  showRecommend.value = false
}

// Quick actions
function handleQuickAction(key: string) {
  switch (key) {
    case 'recommend': {
      searchQuery.value = ''
      const recommended = menuItems.filter(i => i.isRecommended).slice(0, 6)
      if (recommended.length > 0) {
        recommendations.value = recommended
        showRecommend.value = true
      }
      break
    }
    case 'random':
      showRandomRecommend()
      break
    case 'meat':
      searchQuery.value = '肉'
      break
    case 'drink':
      searchQuery.value = '饮料'
      break
    case 'coax': {
      const coaxItem = menuItems.find(item => item.id === 'want-to-be-coaxed')
      if (coaxItem) addToCart(coaxItem)
      break
    }
    case 'arrange': {
      const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]
      const nonSpecial = menuItems.filter(i => i.category !== 'special')
      const stapleHome = nonSpecial.filter(i => ['staple', 'home', 'breakfast'].includes(i.category))
      const meatBbq = nonSpecial.filter(i => i.category === 'meat' || i.category === 'bbq')
      const drinks = nonSpecial.filter(i => i.category === 'drink')
      const desserts = nonSpecial.filter(i => i.category === 'dessert')

      const ids = new Set<string>()
      const add = (item: MenuItem | undefined) => {
        if (item && !ids.has(item.id)) {
          addToCart(item)
          ids.add(item.id)
        }
      }

      add(pick(stapleHome))
      add(pick(meatBbq))
      if (Math.random() > 0.5) add(pick(drinks))
      if (Math.random() > 0.5) add(pick(desserts))

      const target = Math.max(2, ids.size)
      const pool = nonSpecial.filter(i => !ids.has(i.id)).sort(() => Math.random() - 0.5)
      for (const item of pool) {
        if (ids.size >= target) break
        add(item)
      }
      break
    }
  }
}

// QuickActions new event handlers
function handleMealTypeChange(mealType: MealType) {
  currentMealType.value = mealType
  orderForm.value.mealType = mealType
}

function scrollToOrderForm() {
  if (cart.value.length === 0) {
    errorMessage.value = '先选点菜再去下单哦～'
    setTimeout(() => { errorMessage.value = '' }, 2000)
    return
  }
  currentView.value = 'order'
}

function handleRandomAdd() {
  const count = Math.floor(Math.random() * 3) + 2 // 2-4 items
  const nonSpecial = menuItems.filter(i => i.category !== 'special')
  const usedIds = new Set(cart.value.map(i => i.id))

  // Prefer categories matching current meal type
  let preferred: MenuItem[] = []
  let others: MenuItem[] = []

  if (currentMealType.value === 'breakfast') {
    preferred = nonSpecial.filter(i => ['breakfast', 'staple'].includes(i.category) && !usedIds.has(i.id))
    others = nonSpecial.filter(i => !['breakfast', 'staple', 'special'].includes(i.category) && !usedIds.has(i.id))
  } else if (currentMealType.value === 'lunch' || currentMealType.value === 'dinner') {
    preferred = nonSpecial.filter(i => ['home', 'meat', 'bbq', 'staple'].includes(i.category) && !usedIds.has(i.id))
    others = nonSpecial.filter(i => !['home', 'meat', 'bbq', 'staple', 'special'].includes(i.category) && !usedIds.has(i.id))
  } else if (currentMealType.value === 'lateNight') {
    preferred = nonSpecial.filter(i => ['snack', 'bbq', 'drink'].includes(i.category) && !usedIds.has(i.id))
    others = nonSpecial.filter(i => !['snack', 'bbq', 'drink', 'special'].includes(i.category) && !usedIds.has(i.id))
  } else {
    preferred = nonSpecial.filter(i => !usedIds.has(i.id))
    others = []
  }

  preferred.sort(() => Math.random() - 0.5)
  others.sort(() => Math.random() - 0.5)
  const pool = [...preferred, ...others]

  let added = 0
  for (const item of pool) {
    if (added >= count) break
    addToCart(item)
    added++
  }

  if (added > 0) {
    showSuccessToast(`已随机加入 ${added} 道菜～`)
  }
}

// Navigation
function scrollToMenu() {
  menuRef.value?.scrollIntoView({ behavior: 'smooth' })
}

function openCartPanel() {
  if (cartPanelRef.value) cartPanelRef.value.isOpen = true
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
  showFailCard.value = false

  try {
    await sendOrderEmail(cart.value, orderForm.value)
    const record = createOrderRecord(cart.value, orderForm.value)
    latestOrder.value = record
    addOrderHistory(record)
    orderHistory.value = getOrderHistory()
    clearCartItems()
    currentView.value = 'success'
  } catch (error: any) {
    submitError.value = error.message || '发送失败了，宝宝先截图发给我也可以～'
    showFailCard.value = true
  } finally {
    submitting.value = false
  }
}

// Copy order
async function handleCopyOrder() {
  if (!latestOrder.value) return
  const text = formatOrderSummary(latestOrder.value)
  const ok = await copyToClipboard(text)
  if (ok) {
    showSuccessToast('订单已复制到剪贴板～')
  } else {
    errorMessage.value = '复制失败，请手动截图～'
    setTimeout(() => { errorMessage.value = '' }, 2000)
  }
}

async function handleCopyFailedOrder() {
  const record = createOrderRecord(cart.value, orderForm.value)
  const text = formatOrderSummary(record)
  const ok = await copyToClipboard(text)
  if (ok) {
    showSuccessToast('订单已复制到剪贴板～')
  } else {
    errorMessage.value = '复制失败，请手动截图～'
    setTimeout(() => { errorMessage.value = '' }, 2000)
  }
}

// Reorder from success page
function handleReorderFromSuccess() {
  clearCartItems()
  orderForm.value = { ...defaultForm, ...getPreference() }
  currentView.value = 'menu'
}

// Modify order from success page
function handleModifyOrder() {
  if (latestOrder.value) {
    cart.value = restoreCartFromRecord(latestOrder.value)
    orderForm.value = restoreFormFromRecord(latestOrder.value)
  }
  currentView.value = 'menu'
}

// Reorder from history
function handleReorderFromHistory(record: OrderRecord) {
  cart.value = restoreCartFromRecord(record)
  orderForm.value = restoreFormFromRecord(record)
  currentView.value = 'menu'
}

// Go home
function handleGoHome() {
  latestOrder.value = null
  currentView.value = 'menu'
}

// Clear history
function handleClearHistory() {
  clearOrderHistory()
  orderHistory.value = []
  showSuccessToast('历史已清空～')
}

function showSuccessToast(msg: string) {
  successMessage.value = msg
  setTimeout(() => { successMessage.value = '' }, 2000)
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

.success-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(76, 175, 80, 0.9);
  color: $white;
  padding: $spacing-md $spacing-2xl;
  border-radius: $radius-lg;
  font-size: $font-sm;
  z-index: 400;
  max-width: 280px;
  text-align: center;
}

.fail-overlay {
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
</style>
