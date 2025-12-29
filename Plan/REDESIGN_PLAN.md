# Lessico UI Redesign Plan - European Shop Aesthetic

## Overview
Transform Lessico from dark mode generic UI to warm, vintage European shop aesthetic with cream backgrounds, burgundy accents, and refined typography.

## Design System

### Color Palette
```css
--cream-bg: #F5F1E8;        /* Main background - warm cream */
--cream-card: #FAF8F3;      /* Card background - lighter cream */
--burgundy-dark: #7A2B2B;   /* Primary text - deep burgundy */
--burgundy: #A0403B;        /* Accents - warm burgundy */
--burgundy-light: #C97064;  /* Hover states - lighter burgundy */
--cream-border: #E5DFD0;    /* Subtle borders */
--burgundy-border: #B85450; /* Decorative borders */
```

### Typography
- **Display Font**: Playfair Display (serif) - for headings, logo, command names
- **Body Font**: Lora (serif) - for descriptions and body text
- **Accent Font**: Crimson Pro (serif) - for subtitles

### Signature Elements
1. **Striped Awning**: Red/burgundy striped pattern at top of page (like the butcher shop)
2. **Decorative Borders**: Double-line borders around cards (vintage frame effect)
3. **Vintage Badges**: Category tags styled as vintage seals/stamps
4. **Ornamental Dividers**: Small decorative elements between sections

## Implementation Steps

### Step 1: Update Global Styles (globals.css)
- [ ] Replace dark mode color scheme with vintage palette
- [ ] Import Google Fonts (Playfair Display, Lora, Crimson Pro)
- [ ] Add striped awning pattern using CSS gradients
- [ ] Update scrollbar styling to match burgundy theme
- [ ] Add decorative border utilities

### Step 2: Update Layout (layout.tsx)
- [ ] Import vintage fonts from Google Fonts
- [ ] Remove dark mode classes
- [ ] Update background to cream
- [ ] Add striped awning element at top of page

### Step 3: Create Striped Awning Component
- [ ] Create StripeAwning.tsx component
- [ ] Implement repeating stripe pattern (burgundy/cream)
- [ ] Add subtle shadow for depth
- [ ] Make it sticky at top (optional)

### Step 4: Redesign Header (Header.tsx)
- [ ] Update logo typography to Playfair Display
- [ ] Style navigation tabs with vintage aesthetic
- [ ] Add decorative border at bottom
- [ ] Update active tab indicator (burgundy underline or fill)
- [ ] Remove dark mode variants

### Step 5: Redesign Resource Cards (ResourceCard.tsx)
- [ ] Add double-border frame effect
- [ ] Update category badges to vintage stamp style
- [ ] Style command name with Playfair Display
- [ ] Style subtitle with Crimson Pro
- [ ] Use Lora for description text
- [ ] Update hover effects (subtle cream background change)
- [ ] Make copy button burgundy with cream text

### Step 6: Update Other Components
- [ ] SearchBar: Cream background, burgundy border, vintage styling
- [ ] CategoryFilter: Vintage pill/badge style with burgundy accents
- [ ] CopyButton: Burgundy background, cream text, subtle hover effect
- [ ] ResourceDetailModal: Decorative border frame, cream background
- [ ] LoadingSkeleton: Warm cream shimmer effect

### Step 7: Add Decorative Elements
- [ ] Create ornamental divider SVGs
- [ ] Add vintage corner decorations to cards (optional)
- [ ] Create decorative header for sections
- [ ] Add subtle texture/grain overlay (very subtle)

### Step 8: Remove Dark Mode
- [ ] Remove all `dark:` classes throughout codebase
- [ ] Remove dark mode media query from globals.css
- [ ] Update all color references to use vintage palette

## Files to Update

### Critical (Must Update)
1. `src/app/globals.css` - Color system, typography, base styles
2. `src/app/layout.tsx` - Font imports, remove dark mode
3. `src/components/Header.tsx` - Vintage navigation styling
4. `src/components/ResourceCard.tsx` - Card redesign with borders
5. `src/components/CopyButton.tsx` - Burgundy button styling

### Important (Should Update)
6. `src/components/SearchBar.tsx` - Vintage input styling
7. `src/components/CategoryFilter.tsx` - Vintage badge/pill styling
8. `src/components/ResourceDetailModal.tsx` - Modal frame styling
9. `src/components/ClarifyingToggle.tsx` - Toggle switch styling
10. `src/components/LoadingSkeleton.tsx` - Cream shimmer effect

### Nice to Have (Can Update Later)
11. Create `src/components/StripeAwning.tsx` - Decorative awning
12. Create `src/components/OrnamentalDivider.tsx` - Section dividers
13. Add decorative SVG elements
14. Add subtle background texture

## Outstanding Setup Steps (From Previous Agent)

After UI redesign is complete, you still need to:

1. ✅ Add Supabase credentials to .env.local (USER SAYS DONE)
2. **Run the SQL schema in Supabase SQL Editor**
   - Open Supabase dashboard → SQL Editor
   - Copy schema from /Users/simsuperville/Documents/Lessico/Plan/IMPLEMENTATION.md (lines 47-99)
   - Execute to create tables
3. **Add seed data to Supabase**
   - Copy seed SQL from IMPLEMENTATION.md (lines 523-546)
   - Execute in SQL Editor
4. **Add PostHog (optional)**
   - Get PostHog API key
   - Add to .env.local: `NEXT_PUBLIC_POSTHOG_KEY=your-key`
5. **Deploy to Vercel**
   - Run `npm run build` locally to verify
   - Connect repo to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy

## Testing Checklist

After redesign:
- [ ] All pages load with cream background
- [ ] Typography uses Playfair Display, Lora, Crimson Pro
- [ ] Striped awning visible at top
- [ ] Cards have decorative double borders
- [ ] Category badges styled as vintage stamps
- [ ] Copy buttons are burgundy
- [ ] Hover states work (subtle color changes)
- [ ] No dark mode artifacts remain
- [ ] Mobile responsive on all screens
- [ ] Search and filters work with new styling

## Prompt for Building Agent

```
I need you to redesign the Lessico UI to match a vintage European shop aesthetic. I've created a detailed redesign plan at /Users/simsuperville/Documents/Lessico/REDESIGN_PLAN.md - please read it first.

Key design direction:
- Warm cream backgrounds (#F5F1E8)
- Deep burgundy text and accents (#7A2B2B, #A0403B)
- Vintage serif fonts: Playfair Display, Lora, Crimson Pro
- Striped awning pattern at top (signature element)
- Decorative double-line borders around cards
- Vintage badge/stamp style for categories
- Remove ALL dark mode styling

IMPORTANT:
1. Read the REDESIGN_PLAN.md file thoroughly
2. Start with Step 1-5 (globals.css, layout.tsx, Header.tsx, ResourceCard.tsx, CopyButton.tsx)
3. Work through each component systematically
4. Test on localhost after each major change
5. Reference the inspiration images I shared for the aesthetic feel

The goal is to make Lessico feel like stepping into a curated European artisan shop - warm, trustworthy, refined, and timeless.

After the UI redesign is complete, remind me to:
- Run the SQL schema in Supabase
- Add seed data
- Test all features
- Deploy to Vercel

Please run tasks in parallel where possible to speed up the redesign.
```

## Additional Notes

- **Design Inspiration**: Metzlerei Schmit-Kail butcher shop storefront with striped awning
- **Fonts must be distinctive**: No Inter, no Roboto - only vintage serifs
- **Burgundy is the hero color**: Should be prominent but not overwhelming
- **Cream creates warmth**: Avoid pure white - always warm cream tones
- **Borders are decorative**: Double-line frames add vintage character
- **Minimalism with character**: Clean layouts but distinctive typography and accents

## Timeline Estimate

If working sequentially:
- Steps 1-5 (Critical): ~2-3 hours
- Steps 6-7 (Important): ~1-2 hours
- Step 8 (Polish): ~30 min
- Testing: ~30 min

If working in parallel (recommended):
- One agent: Steps 1-3 (Global styles, layout, awning)
- Second agent: Steps 4-5 (Header, ResourceCard)
- Third agent: Step 6 (Other components)
- Then combine and test

---

**Ready to transform Lessico into a beautiful vintage experience!** 🎨
