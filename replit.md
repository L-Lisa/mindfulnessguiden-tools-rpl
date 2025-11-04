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
  - Cream: #F6F4EA (background, cards)
- **Typography**: Inter/Roboto from Google Fonts
- **Border Radius**: 16px (iOS-style)
- **Touch Targets**: Minimum 44x44px (iOS HIG standard)

## Features
1. **Cover Card** - Welcome screen with logo, website link, and installation instructions accordion
2. **10 Exercise Cards** - Validated MBSR/MBCT mindfulness exercises in Swedish:
   - Bodyscan meditation
   - Sittande meditation (Sitting Meditation)
   - Medveten promenad (Mindful Walking)
   - Kärleksfull vänlighet/Metta (Loving-Kindness)
   - RAIN-tekniken (RAIN Technique)
   - Tre minuters andningsrum (Three-Minute Breathing Space)
   - Medvetet ätande (Mindful Eating)
   - Medveten rörelse (Mindful Movement)
   - Andningsmedvetenhet (Breath Awareness)
   - Ljudmeditation (Sound Meditation)

## Navigation
- **Swipe Gestures**: Left/Right swipe on mobile
- **Navigation Arrows**: iOS-style chevrons at 75% from top on left/right edges
- **Keyboard**: Arrow keys for desktop navigation
- **Progress Indicator**: Shows "X/Y" format (e.g. "1/11") in bottom-right corner
- **Action Buttons**: Horizontal row of three buttons (favorite, complete, share) in top-left
  - Button size: 44×44px (iOS HIG compliant touch targets)
  - Icon size: 20×20px for cleaner appearance

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
