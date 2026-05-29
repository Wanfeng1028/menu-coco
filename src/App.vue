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
      <MealTypeTabs v-model="mealTypeTabValue" />
      <QuickActions
        :current-meal-type="currentMealType"
        @update:meal-type="handleMealTypeChange"
        @scroll-to-order="scrollToOrderForm"
        @random-add="handleRandomAdd"
      />
      <FilterStatusBar
        :meal-type-label="mealTypeLabel"
        :category-label="categoryLabel"
        :search-keyword="searchQuery"
        :has-any-filter="hasActiveFilters"
        @clear-meal-type="handleClearMealType"
        @clear-category="handleClearCategory"
        @clear-search="handleClearSearch"
        @clear-all="handleClearAllFilters"
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
        v-model:active-category="selectedCategory"
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

    <!-- 操作提示 toast -->
    <ToastMessage
      :visible="toastState.visible"
      :message="toastState.message"
      :undoable="toastState.undoable"
      :duration="toastState.duration"
      @close="handleToastClose"
      @undo="handleToastUndo"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import type { MenuItem, CartItem, OrderForm as OrderFormType, OrderRecord, AppView, MealType, MenuCategory } from '@/types/order'
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
import MealTypeTabs from '@/components/MealTypeTabs.vue'
import FilterStatusBar from '@/components/FilterStatusBar.vue'
import ToastMessage from '@/components/ToastMessage.vue'

// State
const currentView = ref<AppView>('menu')
const searchQuery = ref('')
const cart = ref<CartItem[]>([])
const showRecommend = ref(false)
const recommendations = ref<MenuItem[]>([])
const submitting = ref(false)
const errorMessage = ref('')
const showFailCard = ref(false)
const submitError = ref('')
const latestOrder = ref<OrderRecord | null>(null)
const orderHistory = ref<OrderRecord[]>([])
const menuRef = ref<HTMLElement | null>(null)
const cartPanelRef = ref<InstanceType<typeof CartPanel> | null>(null)
const currentMealType = ref<MealType>('anytime')
const selectedCategory = ref<MenuCategory | 'all'>('all')
const lastRandomAddDelta = ref<{ id: string; addedQuantity: number }[]>([])
const toastState = ref({
  visible: false,
  message: '',
  undoable: false,
  duration: 3000
})

// 按餐次筛选菜品：'anytime' 显示全部，否则只显示 mealTypes 包含当前餐次或无限制的菜品
function filterByMealType(items: MenuItem[]): MenuItem[] {
  if (currentMealType.value === 'anytime') return items
  return items.filter(item => !item.mealTypes || item.mealTypes.includes(currentMealType.value))
}

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
  const mealFiltered = filterByMealType(menuItems)
  if (!searchQuery.value) return mealFiltered
  const query = searchQuery.value.toLowerCase()
  return mealFiltered.filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.categoryName.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query) ||
    item.tags?.some(tag => tag.toLowerCase().includes(query))
  )
})

const favoriteItems = computed(() => {
  if (currentMealType.value === 'anytime') {
    return menuItems.filter(item => item.isPopular || item.isRecommended).slice(0, 8)
  }
  const mealMatch = menuItems.filter(item =>
    (item.isPopular || item.isRecommended) &&
    (!item.mealTypes || item.mealTypes.includes(currentMealType.value))
  )
  if (mealMatch.length >= 8) return mealMatch.slice(0, 8)
  const others = menuItems.filter(item =>
    (item.isPopular || item.isRecommended) && !mealMatch.includes(item)
  )
  return [...mealMatch, ...others].slice(0, 8)
})

const cartCount = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.quantity, 0)
})

const mealTypeTabValue = computed({
  get: () => currentMealType.value === 'anytime' ? 'all' as const : currentMealType.value,
  set: (val: MealType | 'all') => {
    if (val === 'all') {
      if (currentMealType.value !== 'anytime') {
        currentMealType.value = 'anytime'
        orderForm.value.mealType = 'anytime'
        showToast('已取消餐次筛选，宝宝可以重新挑～')
      }
    } else {
      handleMealTypeChange(val)
    }
  }
})

const mealTypeLabel = computed(() => {
  const labels: Record<string, string> = {
    breakfast: '🌅 早餐',
    lunch: '☀️ 午餐',
    dinner: '🌙 晚餐',
    lateNight: '🌃 夜宵'
  }
  return labels[currentMealType.value] || ''
})

const categoryLabel = computed(() => {
  if (selectedCategory.value === 'all') return ''
  const cat = categories.find(c => c.key === selectedCategory.value)
  return cat?.label || ''
})

const hasActiveFilters = computed(() =>
  currentMealType.value !== 'anytime' ||
  selectedCategory.value !== 'all' ||
  searchQuery.value !== ''
)

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
  const nonSpecial = filterByMealType(menuItems.filter(item => item.category !== 'special'))
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

// QuickActions new event handlers
function handleMealTypeChange(mealType: MealType) {
  if (currentMealType.value === mealType) {
    currentMealType.value = 'anytime'
    showToast('已取消餐次筛选，宝宝可以重新挑～')
  } else {
    currentMealType.value = mealType
    const labels: Record<string, string> = {
      breakfast: '早餐', lunch: '午餐', dinner: '晚餐', lateNight: '夜宵'
    }
    showToast(`已切换到${labels[mealType] || mealType}好好吃～`)
  }
  orderForm.value.mealType = currentMealType.value
}

async function scrollToOrderForm() {
  if (cart.value.length === 0) {
    showToast('先选点菜再去下单哦～')
    return
  }
  currentView.value = 'order'
  showToast('已跳到投喂时间设置～')
  await nextTick()
  const scheduleSection = document.querySelector('[data-section="schedule"]')
  if (scheduleSection) {
    scheduleSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

function handleRandomAdd() {
  const count = Math.floor(Math.random() * 3) + 2
  const nonSpecial = filterByMealType(menuItems.filter(i => i.category !== 'special'))

  // Snapshot current cart quantities
  const cartSnapshot = new Map<string, number>()
  for (const item of cart.value) {
    cartSnapshot.set(item.id, item.quantity)
  }

  let preferred: MenuItem[] = []
  let others: MenuItem[] = []

  if (currentMealType.value === 'breakfast') {
    preferred = nonSpecial.filter(i => ['breakfast', 'staple'].includes(i.category))
    others = nonSpecial.filter(i => !['breakfast', 'staple', 'special'].includes(i.category))
  } else if (currentMealType.value === 'lunch' || currentMealType.value === 'dinner') {
    preferred = nonSpecial.filter(i => ['home', 'meat', 'bbq', 'staple'].includes(i.category))
    others = nonSpecial.filter(i => !['home', 'meat', 'bbq', 'staple', 'special'].includes(i.category))
  } else if (currentMealType.value === 'lateNight') {
    preferred = nonSpecial.filter(i => ['snack', 'bbq', 'drink'].includes(i.category))
    others = nonSpecial.filter(i => !['snack', 'bbq', 'drink', 'special'].includes(i.category))
  } else {
    preferred = nonSpecial
    others = []
  }

  preferred.sort(() => Math.random() - 0.5)
  others.sort(() => Math.random() - 0.5)
  const pool = [...preferred, ...others]

  const usedIds = new Set<string>()
  let added = 0
  for (const item of pool) {
    if (added >= count) break
    if (!usedIds.has(item.id)) {
      addToCart(item)
      usedIds.add(item.id)
      added++
    }
  }

  // Compute delta
  const delta: { id: string; addedQuantity: number }[] = []
  for (const item of cart.value) {
    const oldQty = cartSnapshot.get(item.id) || 0
    if (item.quantity > oldQty) {
      delta.push({ id: item.id, addedQuantity: item.quantity - oldQty })
    }
  }
  lastRandomAddDelta.value = delta

  if (delta.length > 0) {
    showToast(`已随机加入 ${delta.length} 道菜～`, true, 5000)
  }
}

function handleUndoRandomAdd() {
  for (const d of lastRandomAddDelta.value) {
    const item = cart.value.find(i => i.id === d.id)
    if (item) {
      item.quantity -= d.addedQuantity
      if (item.quantity <= 0) {
        cart.value = cart.value.filter(i => i.id !== d.id)
      }
    }
  }
  lastRandomAddDelta.value = []
  showToast('已撤销本次随便安排～')
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

function showToast(message: string, undoable = false, duration = 3000) {
  toastState.value = { visible: true, message, undoable, duration }
}

function handleToastClose() {
  toastState.value.visible = false
}

function handleToastUndo() {
  handleUndoRandomAdd()
  toastState.value.visible = false
}

function handleClearMealType() {
  currentMealType.value = 'anytime'
  orderForm.value.mealType = 'anytime'
  showToast('已取消餐次筛选，宝宝可以重新挑～')
}

function handleClearCategory() {
  selectedCategory.value = 'all'
  showToast('已取消分类筛选～')
}

function handleClearSearch() {
  searchQuery.value = ''
  showToast('已清空搜索～')
}

function handleClearAllFilters() {
  currentMealType.value = 'anytime'
  selectedCategory.value = 'all'
  searchQuery.value = ''
  orderForm.value.mealType = 'anytime'
  showToast('已清空筛选，宝宝可以重新挑～')
}

function showSuccessToast(msg: string) {
  showToast(msg)
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
