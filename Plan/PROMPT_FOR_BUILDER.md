# Implementation Prompt: Redesign Lessico UI

## Context

I'm redesigning the Lessico website to match a vintage European shop aesthetic (inspired by the Metzlerei Schmit-Kail butcher shop images). The current UI is in dark mode with generic styling. I need to transform it to have:

- **Warm cream backgrounds** (#F5F1E8)
- **Deep burgundy text and accents** (#7A2B2B, #A0403B)
- **Vintage serif fonts** (Playfair Display, Lora, Crimson Pro)
- **Striped awning pattern** at the top (signature element)
- **Decorative borders** around cards (double-line vintage frames)
- **Vintage badge/stamp style** for category tags
- **NO dark mode** - single light theme only

## Your Task

Redesign the Lessico UI by implementing the vintage European shop aesthetic. All the redesigned component files are ready for you - you just need to replace the old ones and test.

## Files to Replace

I've created redesigned versions of key files with the `-redesign` suffix. Your job is to:

1. **Replace old files with redesigned versions:**
   - `src/app/globals.css` ← replace with `src/app/globals-redesign.css`
   - `src/components/Header.tsx` ← replace with `src/components/Header-redesign.tsx`
   - `src/components/ResourceCard.tsx` ← replace with `src/components/ResourceCard-redesign.tsx`
   - `src/components/CopyButton.tsx` ← replace with `src/components/CopyButton-redesign.tsx`

2. **Update layout.tsx** to import vintage fonts (Playfair Display, Lora, Crimson Pro) instead of Geist fonts

3. **Update remaining components** to remove dark mode and use vintage styling:
   - `src/components/SearchBar.tsx`
   - `src/components/CategoryFilter.tsx`
   - `src/components/ResourceDetailModal.tsx`
   - `src/components/LoadingSkeleton.tsx`
   - `src/components/ClarifyingToggle.tsx`
   - `src/components/CheatsheetList.tsx`
   - `src/components/CheatsheetContent.tsx`

4. **Test everything** works correctly in the browser

## Step-by-Step Instructions

### STEP 1: Replace Core Files (DO THIS IN PARALLEL)

**Agent 1 - Replace globals.css:**
```bash
# Backup original
cp src/app/globals.css src/app/globals-OLD.css

# Replace with redesign
cp src/app/globals-redesign.css src/app/globals.css

# Delete redesign file (now unnecessary)
rm src/app/globals-redesign.css
```

**Agent 2 - Replace Header.tsx:**
```bash
# Backup original
cp src/components/Header.tsx src/components/Header-OLD.tsx

# Replace with redesign
cp src/components/Header-redesign.tsx src/components/Header.tsx

# Delete redesign file
rm src/components/Header-redesign.tsx
```

**Agent 3 - Replace ResourceCard.tsx:**
```bash
# Backup original
cp src/components/ResourceCard.tsx src/components/ResourceCard-OLD.tsx

# Replace with redesign
cp src/components/ResourceCard-redesign.tsx src/components/ResourceCard.tsx

# Delete redesign file
rm src/components/ResourceCard-redesign.tsx
```

**Agent 4 - Replace CopyButton.tsx:**
```bash
# Backup original
cp src/components/CopyButton.tsx src/components/CopyButton-OLD.tsx

# Replace with redesign
cp src/components/CopyButton-redesign.tsx src/components/CopyButton.tsx

# Delete redesign file
rm src/components/CopyButton-redesign.tsx
```

### STEP 2: Update layout.tsx

Replace the Geist font imports with vintage fonts:

**OLD:**
```typescript
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
```

**NEW:**
```typescript
import { Playfair_Display, Lora, Crimson_Pro } from "next/font/google";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const crimsonPro = Crimson_Pro({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
```

And update the className in the <body> tag:

**OLD:**
```tsx
<body
  className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50 dark:bg-gray-950`}
>
```

**NEW:**
```tsx
<body
  className={`${playfairDisplay.variable} ${lora.variable} ${crimsonPro.variable} antialiased min-h-screen`}
>
```

### STEP 3: Update Remaining Components (DO THIS IN PARALLEL)

For each component below, remove ALL `dark:` Tailwind classes and update colors to use vintage palette.

**SearchBar.tsx** - Update to:
- Background: `bg-[var(--cream-card)]`
- Border: `border-2 border-[var(--cream-border)] focus:border-[var(--burgundy-light)]`
- Text: `text-[var(--burgundy-dark)]`
- Placeholder: `placeholder:text-[var(--burgundy-light)]`
- Add class: `vintage-input`

**CategoryFilter.tsx** - Update to:
- Pill background: `bg-[var(--cream-card)]`
- Pill border: `border border-[var(--burgundy-border)]`
- Active pill: `bg-[var(--burgundy)] text-[var(--cream-card)]`
- Text color: `text-[var(--burgundy-dark)]`
- Add class: `vintage-badge` to pills

**ResourceDetailModal.tsx** - Update to:
- Modal background: `bg-[var(--cream-card)]`
- Border: Add `vintage-border` class
- Text: `text-[var(--burgundy-dark)]`
- Close button: Use burgundy colors
- Remove all dark mode variants

**LoadingSkeleton.tsx** - Update to:
- Skeleton base: `bg-[var(--cream-border)]`
- Skeleton shimmer: `bg-gradient-to-r from-transparent via-[var(--burgundy-pale)] to-transparent`
- Remove dark mode variants

**ClarifyingToggle.tsx** - Update to:
- Toggle background (off): `bg-[var(--cream-border)]`
- Toggle background (on): `bg-[var(--burgundy)]`
- Remove dark mode variants

**CheatsheetList.tsx & CheatsheetContent.tsx** - Update to:
- Use vintage color palette
- Remove dark mode classes
- Add `vintage-card` class to cards
- Use Playfair Display for headings

### STEP 4: Test in Browser

Run the development server and verify:

```bash
npm run dev
```

Check that:
- [ ] Cream background (#F5F1E8) loads on all pages
- [ ] Striped burgundy awning appears at top
- [ ] Header shows "LESSICO" in Playfair Display with "Est. 2024" subtitle
- [ ] Navigation tabs have burgundy styling
- [ ] Cards have decorative corner accents and double borders
- [ ] Category badges look like vintage stamps
- [ ] Copy buttons are burgundy with cream text
- [ ] All fonts are vintage serifs (Playfair, Lora, Crimson Pro)
- [ ] NO dark mode artifacts anywhere
- [ ] Search and filters work correctly
- [ ] Mobile responsive design works

## Important Guidelines

1. **Remove ALL dark mode**: Delete every `dark:` class you see
2. **Use CSS variables**: Reference colors as `var(--cream-bg)`, `var(--burgundy-dark)`, etc.
3. **Use vintage classes**: Apply `.vintage-card`, `.vintage-button`, `.vintage-badge`, `.vintage-input` where appropriate
4. **Test incrementally**: After each file replacement, check the browser
5. **Preserve functionality**: Don't change any logic - only styling
6. **Work in parallel**: Multiple agents can work on different files simultaneously

## After UI Redesign is Complete

Once the UI looks correct, remind me to complete these outstanding setup steps:

1. ✅ Add Supabase credentials to .env.local (DONE)
2. **Run SQL schema in Supabase SQL Editor**
   - Location: `/Users/simsuperville/Documents/Lessico/Plan/IMPLEMENTATION.md` (lines 47-99)
3. **Add seed data to Supabase**
   - Location: `/Users/simsuperville/Documents/Lessico/Plan/IMPLEMENTATION.md` (lines 523-546)
4. **Add PostHog (optional)**
5. **Deploy to Vercel**

## Reference Files

- **Full redesign plan**: `/Users/simsuperville/Documents/Lessico/REDESIGN_PLAN.md`
- **PRD**: `/Users/simsuperville/Documents/Lessico/Plan/PRD.md`
- **Implementation guide**: `/Users/simsuperville/Documents/Lessico/Plan/IMPLEMENTATION.md`

## Success Criteria

The UI redesign is complete when:
- Lessico looks like a warm, vintage European shop
- All pages use cream backgrounds and burgundy accents
- Typography is exclusively vintage serifs
- No dark mode styling remains
- All functionality works (search, filter, copy, modals)
- Mobile responsive design intact

---

**Let's transform Lessico into a beautiful vintage experience!** 🎨

Please work in parallel where possible to complete this redesign efficiently.
