---
name: fixed-bottom-bar-overlap-fix
description: Fix layout overlap caused by fixed/sticky bottom bars in mobile-first Vue apps
source: auto-skill
extracted_at: '2026-05-29T11:47:24.849Z'
---

## When to use

When a `position: fixed` or `position: sticky` bottom bar (cart bar, tab bar, action bar) overlaps page content, especially on mobile (375px).

## Root cause

Fixed/sticky bars are removed from normal flow, so page content doesn't know to avoid them. The main container needs explicit padding-bottom to reserve space.

## Fix checklist

### 1. Main container padding-bottom

The most important fix. Reserve space equal to: bar height + safe-area + extra gap.

```scss
// Variables
$bottom-bar-height: 56px; // actual rendered height of the bar
$extra-gap: 16px;         // breathing room

.app-container {
  padding-bottom: calc(#{$bottom-bar-height + $extra-gap} + env(safe-area-inset-bottom, 0px));
}

// Or use a hardcoded safe value:
.app-container {
  padding-bottom: calc(120px + env(safe-area-inset-bottom, 0px));
}
```

**Rule of thumb:** Use 120px if unsure of exact bar height. Too much padding is better than content being hidden.

### 2. Fixed bar positioning

```scss
.sticky-bar {
  position: fixed;
  left: 50%;
  bottom: calc(12px + env(safe-area-inset-bottom, 0px));
  transform: translateX(-50%);
  width: calc(100% - 28px);           // side margins
  max-width: calc(#{$container-max} - 28px); // match parent container
  z-index: 50;                        // not too high
}
```

**Key:** `max-width` must not exceed the parent container's `max-width`, otherwise the bar extends beyond the "phone frame" on desktop.

### 3. z-index layering

Establish a clear hierarchy. Do NOT give everything high z-index.

| Element              | z-index |
|----------------------|---------|
| Sticky bottom bar    | 50      |
| Overlay panels       | 90      |
| Popups/modals        | 100-120 |
| Error toasts         | 400     |

### 4. Sub-components bottom margin

Sections above the bottom bar need extra margin-bottom so the last item isn't flush against the bar's visual edge.

```scss
.quick-actions {
  margin-bottom: 24px; // was 16px, increased
}
```

### 5. Inner scroll containers

If a sub-component uses its own `overflow-y: auto` with `height: calc(100vh - Xpx)`, the X must account for the bottom bar:

```scss
.shop-menu-layout {
  height: calc(100vh - 400px); // must include bottom bar in the 400px
}
```

## Verification

1. On 375px width: last menu item fully visible above the bar
2. On 375px width: form submit button not hidden
3. No horizontal scroll on mobile
4. Desktop: bar stays within the phone-frame container (max-width ~480px)
5. `npm run build` passes

## Common mistakes

- Using the SCSS variable `$cart-button-height` (56px) without adding safe-area and gap
- Forgetting that `position: fixed` elements use the viewport, not the parent container
- Setting z-index: 100 on the bar but z-index: 200 on every overlay (causes layering chaos)
- Not testing at 375px specifically (most overlap issues only appear on narrow screens)
