# Design Guidelines: Mindfulnessguiden Verktygslådan PWA

## Design Approach
**System-Based Approach**: iOS Human Interface Guidelines (HIG)
This is a utility-focused, mobile-first PWA requiring efficiency and learnability. The design prioritizes clarity, smooth interactions, and offline reliability over visual flourish. Clean, minimal interface that respects iOS design patterns.

## Core Design Principles
1. **Mobile-First Minimalism**: Clean, uncluttered card-based interface
2. **Touch-Optimized**: All interactive elements 44x44px minimum
3. **Smooth Physicality**: Physics-based animations, natural gestures
4. **Offline-Ready**: No loading states, instant interactions
5. **Swedish Precision**: Clear typography, generous whitespace

## Typography
**Font Family**: Inter or Roboto via Google Fonts CDN

**Type Scale**:
- Display (34px): Cover card welcome title
- Title (28px): Exercise names, bold weight
- Large (22px): Exercise duration labels
- Body (17px): Exercise instructions, default line-height 1.5
- Small (13px): Watermarks, captions, subtle text

**Hierarchy**: Bold weights for headings, regular for body. Tight line-height (1.2) for titles, relaxed (1.7) for instructions.

## Color Palette
- **Primary Navy**: #293556 (Headers, primary text, theme color)
- **Lavender**: #E6E6FA (Subtle accents, decorative elements)
- **Cream Background**: #F6F4EA (Card backgrounds, warm neutral)
- **Text Secondary**: rgba(41, 53, 86, 0.6) (Watermarks, supporting text)
- **Border/Divider**: rgba(41, 53, 86, 0.1)

## Layout System
**Spacing Units**: Use Tailwind units 2, 4, 6, 8 (8px base)
- Card padding: p-6 (24px)
- Section spacing: space-y-4 to space-y-8
- Touch targets: Minimum 44px (11 Tailwind units)

**Card Structure**:
- Mobile: Full viewport width, min-height 70vh, max 100vh
- Desktop: Max-width 600px, centered horizontally
- Border radius: rounded-2xl (16px, iOS-style)
- Shadow: Subtle elevation `box-shadow: 0 4px 12px rgba(41, 53, 86, 0.08)`

## Component Library

### Cover Card (Card 0)
- **Logo**: Centered, prominent size (180-240px width), using provided webp
- **Link**: "mindfulnessguiden.se" above logo, navy color, underlined on hover
- **Welcome Text**: Display size, navy, centered
- **Accordion**: Closed by default, shows "Safari browser: Såhär laddar du ned verktygslådan som app i telefonen >" with chevron
- **Navigation**: Right arrow only (no left arrow on first card)

### Exercise Cards (Cards 1-10)
**Layout Structure**:
- Watermark: "mindfulnessguiden.se" top-right, small size, secondary text color
- Exercise Name: Title size, bold, navy, top center
- Duration: "Tid: X minuter" below name, large size, secondary color
- Instructions: Body text, scrollable area, navy
- Logo: Small (80-100px), centered horizontally, bottom of card

**Scrolling**: If instructions exceed card height, enable vertical scroll within card only. Use native scrollbar (auto-hiding on iOS).

### Navigation Arrows
- **Position**: Fixed left/right edges, vertically centered
- **Style**: iOS chevron icons (< >), semi-transparent circle backgrounds
- **States**: Disabled (opacity 0.3) on first/last cards
- **Size**: 44x44px touch area minimum
- **Color**: Navy with subtle background pill

### Progress Indicator
- **Type**: Dot indicator or "Card X of 11" text
- **Position**: Bottom center or top center
- **Style**: Small, subtle, navy dots or text
- **Behavior**: Updates on swipe/navigation

### Accordion (Installation Instructions)
- **Closed State**: Shows text with right-facing chevron
- **Open State**: Displays iOS and Android installation steps
- **Animation**: 250ms ease-in-out, smooth height transition
- **Content**: Use simple HTML structure, platform icons (emoji or small SVGs), numbered steps

## Animations
**Timing**: 
- Card transitions: 300ms ease-out
- Button press: 150ms ease-in-out  
- Accordion: 250ms ease-in-out

**Properties**: Use `transform` and `opacity` only (GPU-accelerated). Avoid animating width/height.

**Card Swipe**: Smooth horizontal slide with slight fade, respecting swipe velocity for natural feel.

## Images
**Logo Usage**:
- Cover card: Large, centered (180-240px width)
- Exercise cards: Small, bottom-aligned (80-100px width)
- Format: WebP (provided logo_transparent.webp)

**No Hero Images**: This is a utility app with card-based navigation. Focus on typography and clean layouts rather than imagery.

## Accessibility
- Touch targets: 44x44px minimum (iOS HIG standard)
- Text contrast: Navy on cream meets WCAG AA
- Scrollable content: Clear visual indicators when content extends beyond viewport
- Focus states: Subtle outline on keyboard navigation
- Semantic HTML: Proper heading hierarchy, button elements for navigation

## Responsive Behavior
**Mobile (< 768px)**: 
- Full-width cards
- Touch gesture primary navigation
- Visible navigation arrows as backup

**Desktop (≥ 768px)**:
- Max-width 600px cards, centered
- Keyboard arrow keys enabled
- Hover states on navigation arrows
- Mouse drag optional enhancement

## PWA Specific
- **Safe Areas**: Respect iOS notch/home indicator with padding
- **Standalone Mode**: No browser chrome, full-screen card experience
- **Theme Color**: Navy (#293556) for status bar
- **Background**: Cream (#F6F4EA) for loading/splash

This design creates a calm, focused tool for mindfulness practitioners—prioritizing clarity, ease of use, and seamless offline functionality over decorative elements.