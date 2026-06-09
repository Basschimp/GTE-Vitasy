# VITASY Shopify 2.0 Theme

A premium, clinical-grade Shopify 2.0 theme designed for Vitasy Supplements - a science-backed supplement brand focused on trust, transparency, and efficacy.

## Brand Positioning

**Brand Promise:** Science-Backed Supplements for Modern Health

**Visual Keywords:** Clinical, Premium, Modern, Clean, Calm, Human, Scientific

## Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary Navy | `#102A43` | Headings, Primary buttons, Footer |
| Secondary Green | `#2BB673` | CTAs, Success states, Accents |
| Background | `#F8FAFC` | Page backgrounds |
| Text | `#1F2937` | Body text |
| Border | `#E5E7EB` | Dividers, Cards |
| Success | `#22C55E` | Success messages, Discounts |

## Typography

- **Headings:** Manrope
- **Body:** Inter
- **Fallback:** system-ui

## Theme Structure

```
vitasy-theme/
├── assets/
│   ├── base.css          # Core styles, CSS variables, reset
│   ├── components.css    # Component-specific styles
│   └── theme.js          # JavaScript functionality
├── config/
│   ├── settings_schema.json  # Theme settings configuration
│   └── theme.json            # Theme metadata
├── layout/
│   └── theme.liquid      # Main layout template
├── sections/
│   ├── header.liquid     # Header with navigation
│   ├── footer.liquid     # Footer with links
│   ├── hero.liquid       # Hero section
│   ├── trust-bar.liquid  # Trust signals section
│   └── goal-grid.liquid  # Shop by Goal section
├── snippets/
│   ├── product-card.liquid       # Product card component
│   ├── cart-drawer.liquid        # Cart drawer component
│   ├── mobile-menu.liquid        # Mobile navigation
│   ├── breadcrumbs.liquid        # Breadcrumb navigation
│   ├── pagination.liquid         # Pagination component
│   ├── subscription-widget.liquid # Subscription options
│   ├── meta-tags.liquid          # SEO meta tags
│   └── structured-data.liquid    # JSON-LD structured data
├── templates/
│   ├── index.json        # Homepage template
│   ├── product.json      # Product page template
│   └── collection.json   # Collection page template
└── locales/
    └── en.default.json   # Translations (to be added)
```

## Features

### Core Features
- ✅ Mobile-first responsive design
- ✅ Shopify Online Store 2.0 compatible
- ✅ Dynamic sections everywhere
- ✅ Metaobject and metafield support
- ✅ Accessibility compliant (WCAG AA)
- ✅ SEO optimized with structured data
- ✅ Performance optimized (lazy loading, deferred JS)

### E-commerce Features
- ✅ Cart drawer with AJAX updates
- ✅ Quick add to cart
- ✅ Subscription widget (Recharge compatible)
- ✅ Product filtering and sorting
- ✅ Pagination
- ✅ Breadcrumb navigation

### Integrations Ready
- **Judge.me** - Product reviews
- **Klaviyo** - Email marketing
- **Recharge** - Subscriptions
- **GA4** - Analytics tracking
- **Google Search Console** - SEO

## Installation

### Option 1: Upload to Shopify Admin

1. Compress the `vitasy-theme` folder into a ZIP file
2. Go to Shopify Admin > Online Store > Themes
3. Click "Add theme" > "Upload ZIP file"
4. Select your ZIP file and upload
5. Click "Customize" to configure theme settings

### Option 2: Shopify CLI Development

```bash
# Install Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Navigate to theme directory
cd vitasy-theme

# Connect to your store
shopify theme dev --store your-store.myshopify.com

# Push to your store
shopify theme push
```

## Configuration

### Required Settings

1. **Brand Settings**
   - Upload your logo (desktop and mobile versions)
   - Set your brand tagline

2. **Subscription Settings**
   - Enable/disable subscriptions
   - Set discount percentage
   - Configure subscription benefits text

3. **Reviews (Judge.me)**
   - Enable reviews
   - Add your Judge.me public key

4. **Analytics**
   - Add GA4 Measurement ID
   - Configure any custom tracking scripts

### Navigation Setup

Create the following menus in Shopify Admin > Navigation:

**Main Menu:**
- Shop (with dropdown for collections)
- Learn
- Research
- About
- Subscriptions

**Footer Menus:**
- Shop Links
- Learn Links
- Support Links

## Metafields Configuration

### Product Metafields

| Namespace | Key | Type | Description |
|-----------|-----|------|-------------|
| `product` | `supplement_facts` | Rich Text | Supplement facts table |
| `product` | `ingredients` | List | Ingredient list |
| `product` | `benefits` | List | Product benefits |
| `product` | `directions` | Rich Text | Usage directions |

### Collection Metafields

| Namespace | Key | Type | Description |
|-----------|-----|------|-------------|
| `collection` | `goal_description` | Rich Text | Health goal explanation |
| `collection` | `faq` | Rich Text | Collection-specific FAQ |

## Sections Reference

### Hero Section
- Eyebrow text
- Heading
- Description
- Primary CTA button
- Secondary CTA button
- Background image

### Trust Bar Section
- Configurable trust items
- Custom SVG icons supported
- Labels for each trust signal

### Shop by Goal Section
- Grid of health goal cards
- Link each card to a collection
- Custom icons or images per goal
- Default goals: Sleep, Energy, Focus, Gut Health, Immunity, Stress, Performance, Longevity

## Performance Optimization

### Images
- All images use `loading="lazy"` except above-fold content
- Responsive image sizes via `image_url` filter
- AVIF/WebP format support through Shopify CDN

### JavaScript
- No jQuery dependency
- Deferred loading
- Minimal bundle size
- Event delegation for dynamic content

### CSS
- CSS custom properties for theming
- Critical CSS inlined
- Unused CSS elimination ready

## Accessibility

- Semantic HTML throughout
- ARIA labels on interactive elements
- Focus management for modals/drawers
- Keyboard navigation support
- Skip-to-content link
- Color contrast compliance

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- iOS Safari (latest 2 versions)
- Android Chrome (latest 2 versions)

## Development Guidelines

### Coding Standards

1. **Liquid**
   - Use `{%- -%}` for whitespace control
   - Follow Shopify Liquid best practices
   - Comment complex logic

2. **CSS**
   - Use CSS custom properties from `base.css`
   - BEM-like naming convention
   - Mobile-first media queries

3. **JavaScript**
   - ES6+ syntax
   - Strict mode enabled
   - No console.log in production

### Testing Checklist

- [ ] Test on mobile, tablet, and desktop
- [ ] Verify all interactive elements work with keyboard
- [ ] Check color contrast ratios
- [ ] Validate structured data with Google Rich Results Test
- [ ] Run Lighthouse performance audit (target 90+)
- [ ] Test cart functionality end-to-end
- [ ] Verify subscription flow
- [ ] Test review integration

## Troubleshooting

### Common Issues

**Cart drawer not opening:**
- Ensure `cart-drawer.liquid` snippet is rendered in `theme.liquid`
- Check JavaScript console for errors
- Verify `theme.js` is loaded

**Styles not applying:**
- Clear browser cache
- Check asset URLs in `theme.liquid`
- Verify CSS files are published

**Metafields not showing:**
- Ensure metafields are defined in Shopify Admin
- Check namespace and key names match exactly
- Verify metafield content is saved

## Support

For theme support and questions:
- Email: support@vitasysupplements.com
- Documentation: [Internal Wiki]

## Changelog

### Version 1.0.0 (Initial Release)
- Initial theme structure
- Core sections and snippets
- Base styling system
- JavaScript functionality
- SEO and analytics integration

---

© 2024 Vitasy Supplements. All rights reserved.
