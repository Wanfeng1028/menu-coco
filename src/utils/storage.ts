import type { CartItem, OrderForm } from '@/types/order'

const CART_KEY = 'menu-coco-cart'
const PREFERENCE_KEY = 'menu-coco-order-preference'

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