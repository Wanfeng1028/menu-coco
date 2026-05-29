import type { CartItem, OrderForm, OrderRecord } from '@/types/order'

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'lateNight' | 'anytime'

const CART_KEY = 'menu-coco-cart'
const PREFERENCE_KEY = 'menu-coco-order-preference'
const ORDER_HISTORY_KEY = 'menu-coco-order-history'
const MEAL_PREFERENCE_KEY = 'menu-coco-meal-preference'
const SCHEDULE_PREFERENCE_KEY = 'menu-coco-schedule-preference'

function getStorage<T>(key: string): T | null {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage full or not available
  }
}

function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // Ignore
  }
}

export function getCart(): CartItem[] {
  return getStorage<CartItem[]>(CART_KEY) || []
}

export function setCart(cart: CartItem[]): void {
  setStorage(CART_KEY, cart)
}

export function clearCart(): void {
  removeStorage(CART_KEY)
}

export function getPreference(): Partial<OrderForm> | null {
  return getStorage<Partial<OrderForm>>(PREFERENCE_KEY)
}

export function setPreference(pref: Partial<OrderForm>): void {
  setStorage(PREFERENCE_KEY, pref)
}

export function getOrderHistory(): OrderRecord[] {
  return getStorage<OrderRecord[]>(ORDER_HISTORY_KEY) || []
}

export function setOrderHistory(history: OrderRecord[]): void {
  setStorage(ORDER_HISTORY_KEY, history)
}

export function addOrderHistory(record: OrderRecord): void {
  const history = getOrderHistory()
  history.unshift(record)
  if (history.length > 50) {
    history.length = 50
  }
  setOrderHistory(history)
}

export function removeOrderHistory(id: string): void {
  const history = getOrderHistory().filter(r => r.id !== id)
  setOrderHistory(history)
}

export function clearOrderHistory(): void {
  removeStorage(ORDER_HISTORY_KEY)
}

export function saveMealPreference(mealType: MealType): void {
  setStorage(MEAL_PREFERENCE_KEY, mealType)
}

export function loadMealPreference(): MealType | null {
  return getStorage<MealType>(MEAL_PREFERENCE_KEY)
}

interface SchedulePreference {
  scheduleType: string
  scheduledDate: string
  scheduledTime: string
}

export function saveSchedulePreference(
  scheduleType: string,
  scheduledDate: string,
  scheduledTime: string,
): void {
  setStorage<SchedulePreference>(SCHEDULE_PREFERENCE_KEY, {
    scheduleType,
    scheduledDate,
    scheduledTime,
  })
}

export function loadSchedulePreference(): SchedulePreference | null {
  return getStorage<SchedulePreference>(SCHEDULE_PREFERENCE_KEY)
}
