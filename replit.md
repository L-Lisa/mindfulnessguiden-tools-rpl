# Mindfulnessguiden Verktygslådan - PWA

## Overview
A Progressive Web App providing Swedish mindfulness practitioners with a portable toolkit of 10 validated mindfulness exercises. Functions as a lead magnet and practical resource for certified mindfulness facilitators.

## Project Structure
- **Pure Frontend PWA** - No backend required
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite 5+
- **Styling**: Tailwind CSS with custom design tokens
- **PWA**: Manual service worker implementation for offline functionality

## Design System
- **Colors**:
  - Primary Navy: #293556 (headers, text, theme color)
  - Lavender: #E6E6FA (accents)
  - Whiter Cream: hsl(42° 12% 98%) - lightened from 30% to 12% saturation (less fatiguing on mobile)
- **Typography**: 
  - Inter/Roboto from Google Fonts
  - Exercise headings: text-4xl (all breakpoints) with subtle lavender underline
  - Body text: leading-loose for improved mobile readability
- **Border Radius**: 16px (iOS-style)
- **Touch Targets**: Minimum 44x44px (iOS HIG standard)
- **Haptic Feedback**: 10ms vibration on favorite/completion toggles (mobile only)

## Features
1. **Cover Card** - Welcome screen with logo, website link, installation instructions, and category filter pills
2. **10 Exercise Cards** - Validated MBSR/MBCT mindfulness exercises in Swedish:
   - **Andning (Breathing)**: Tre minuters andningsrum, Andningsmedvetenhet
   - **Rörelse (Movement)**: Bodyscan meditation, Medveten promenad, Medveten rörelse
   - **Meditation**: Sittande meditation, Kärleksfull vänlighet/Metta, RAIN-tekniken, Medvetet ätande, Ljudmeditation
3. **Category Filtering** - Quick-filter pills on CoverCard (Andning, Rörelse, Meditation) using shadcn Button components
4. **Favorites System** - Mark exercises as favorites with haptic feedback
5. **Completion Tracking** - Track completed exercises with progress indicator

## Navigation
- **Swipe Gestures**: Left/Right swipe on mobile
- **Navigation Arrows**: iOS-style chevrons at 75% from top on left/right edges
- **Keyboard**: Arrow keys for desktop navigation
- **Progress Indicator**: Shows "X/Y" format (e.g. "1/11") in bottom-right corner
- **Top Header Row**: Single sticky row with perfect vertical alignment
  - Left side: Three action buttons (favorite, complete, share) in horizontal row
  - Right side: Watermark ("mindfulnessguiden.se") or completion badge ("Slutförd")
  - Button size: 44×44px (iOS HIG compliant touch targets)
  - Icon size: 20×20px for cleaner appearance
  - Layout: `flex items-center justify-between` for perfect alignment

## PWA Configuration
- **Service Worker**: Manual implementation in `client/public/sw.js`
- **Manifest**: Located at `client/public/manifest.json`
- **Icons**: 192x192 and 512x512 PNG icons generated from logo
- **Offline**: 100% functional offline after first load

## File Structure
```
client/
├── public/
│   ├── exercises.json          # Exercise data
│   ├── manifest.json           # PWA manifest
│   ├── sw.js                   # Service worker
│   ├── icon-192.png           # PWA icon
│   └── icon-512.png           # PWA icon
├── src/
│   ├── components/
│   │   ├── Accordion.tsx       # Reusable accordion
│   │   ├── CardContainer.tsx   # Main card container with swipe
│   │   ├── CoverCard.tsx       # Welcome/cover card
│   │   ├── ExerciseCard.tsx    # Exercise display card
│   │   ├── InstallInstructions.tsx  # iOS/Android install steps
│   │   ├── NavigationArrows.tsx     # Left/right navigation
│   │   └── ProgressIndicator.tsx    # Card counter
│   ├── pages/
│   │   └── Home.tsx            # Main page component
│   ├── lib/
│   │   └── registerSW.ts       # Service worker registration
│   ├── App.tsx                 # App router
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles with design tokens
shared/
└── schema.ts                   # TypeScript types for exercises
```

## Running the Project
The workflow "Start application" runs `npm run dev` which starts the Vite development server on port 5000.

## Recent Enhancements (November 2025)

### UX Improvements (Latest)
1. **Visual Hierarchy**: Upgraded exercise headings to text-4xl (all breakpoints) with subtle lavender underline (w-16 h-1 bg-accent/50) for better scanability
2. **Readability**: Increased line-height from leading-relaxed to leading-loose in exercise instructions for easier mobile reading
3. **Haptic Feedback**: Added 10ms vibration on favorite/completion toggles for native app feel (feature-detected)
4. **Category Filtering**: 
   - Added category field to all exercises ("Andning", "Rörelse", "Meditation")
   - Implemented filter pills on CoverCard with shadcn Button components
   - Smart filter reset prevents blank screens when switching categories
   - Works together with favorites filter

### Background Color Lightening
**Change:** Reduced background saturation from 30% to 12% (hsl(42° 12% 98%)) while maintaining warm hue.
**Reason:** Less fatiguing on mobile, fresher appearance for long reading sessions.

### Safari <11.1 Compatibility Fix
**Problem:** White screen on older Safari (iOS <11.3) caused by `env(safe-area-inset-*)` CSS function crashing the CSS parser.
**Solution:** Removed all `env()` usage from CardContainer.tsx and ProgressIndicator.tsx, replaced with standard Tailwind padding classes.
**Service Worker:** Bumped cache version from v2 to v3 to ensure users get fresh code.

### High-Contrast Theme Enhancement
**Problem:** Previous high-contrast theme had minimal visual difference (only 16% lightness change).
**Solution:** Implemented pure black foreground (0 0% 0%) achieving ~20:1 contrast ratio (WCAG AAA compliant).
**Activation:** Set via `data-theme="high-contrast"` attribute, managed in settings.ts.

### iOS Touch Target Compliance
**Problem:** Timer buttons were 40×40px, below iOS HIG minimum of 44×44px.
**Solution:** Updated Timer.tsx play/pause and reset buttons from w-10 h-10 to w-11 h-11 (44×44px).

## User Personas
- **Primary**: Certified mindfulness guides from Mindfulnessguiden courses
- **Secondary**: HR professionals, organizational developers interested in workplace mindfulness
- **Language**: Swedish-speaking users in Sweden
- **Devices**: Primarily mobile (iPhone/Android), but works on desktop

## Technical Notes
- No database or authentication required
- All data loaded from static JSON file
- Service worker caches all assets for offline use
- Follows iOS Human Interface Guidelines for design
- Smooth physics-based animations (300ms transitions)
- Responsive design (mobile-first, max-width 600px on desktop)
