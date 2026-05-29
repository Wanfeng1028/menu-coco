---
name: localstorage-reactive-persistence
description: Persist Vue 3 reactive state to localStorage with automatic save/restore
source: auto-skill
extracted_at: '2026-05-29T11:05:18.481Z'
---

## When to use

When you need to persist Vue 3 reactive state (cart, preferences, form data) to localStorage so it survives page refreshes.

## Pattern

### 1. Create storage utility (src/utils/storage.ts)

```typescript
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

// Export domain-specific functions
export function getCart(): CartItem[] {
  return getStorage<CartItem[]>('app-cart') || []
}

export function setCart(cart: CartItem[]): void {
  setStorage('app-cart', cart)
}

export function clearCart(): void {
  localStorage.removeItem('app-cart')
}
```

### 2. Use in component with watch + onMounted

```typescript
import { ref, watch, onMounted } from 'vue'
import { getCart, setCart } from '@/utils/storage'

const cart = ref<CartItem[]>([])

// Restore on mount
onMounted(() => {
  const saved = getCart()
  if (saved.length > 0) {
    cart.value = saved
  }
})

// Save on change (deep watch for arrays/objects)
watch(cart, (newCart) => {
  setCart(newCart)
}, { deep: true })
```

### 3. For form preferences (partial save)

```typescript
// Only save user preferences, not transient fields
watch(orderForm, (newForm) => {
  setPreference({
    nickname: newForm.nickname,
    spicyLevel: newForm.spicyLevel,
    // Don't save: note, customMealTime
  })
}, { deep: true })

// On mount, merge with defaults
const savedPref = getPreference()
if (savedPref) {
  orderForm.value = { ...defaultForm, ...savedPref }
}
```

## Key points

- Always wrap localStorage access in try/catch (quota exceeded, private browsing)
- Use `{ deep: true }` for array/object watchers
- Restore in `onMounted`, not at module level (SSR compatibility)
- Clear cart after successful order submission
- Save only persistent preferences, not transient state