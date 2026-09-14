# DSCG Wedding Websites · Site 4: Wedding Weekend / Destination Demo

A production-grade, customer-facing sales demonstration for Dark Star Consulting Group's (DSCG) premier **★★★ Wedding Weekend / Destination** package (**$1,195**).

## Overview

- **Couple:** Amara Singh & Luca Moretti
- **Destination & Venue:** Casa Solenne (North Coast · Mallorca, Spain)
- **Weekend Dates:** Friday, September 17, 2027 – Sunday, September 19, 2027
- **RSVP Deadline:** Saturday, August 1, 2027
- **Nearest Airport:** Palma de Mallorca Airport (PMI)
- **Host Partner Hotels:**
  - The Cala House (Boutique Coastal Hotel · Room Block: `SINGH-MORETTI`)
  - Hotel Maravela (Full-Service Destination Hotel · Room Block: `AMARA-LUCA-27`)
  - Sona Mar Suites (Apartment-Style Guest Residences · Room Block: `DSCG-SOLENNE`)

## Key Architecture: 5 Custom Visual Directions

Rather than a generic layout or template switcher, this site showcases how DSCG tailors the exact same wedding content across **5 distinct custom visual design directions**:

1. **Mediterranean Minimal (Default):** Architectural restraint, sunlit limestone, terracotta restraint, airy geometry, serif headlines.
2. **Resort Cinematic:** Luxury destination resort, nocturnal slate navy palette, full-bleed imagery, brushed gold accents, glassmorphism.
3. **Sun-Washed Organic:** Warm ivory, tactile paper textures, organic rhythm, olive & sun-baked clay, soft pebble curves.
4. **European Editorial:** High-fashion / travel monograph editorial, asymmetric columns, chapter numbers, sharp 0px corners, stark monochrome with antique cognac.
5. **Night-Before-After:** Dynamic weekend progression: Friday twilight dusk, Saturday midnight celestial celebration, Sunday morning fresh citrus light.

The visual direction can be toggled via the demonstration bar, dropdown select, or URL parameter (e.g. `?style=resort-cinematic`), and is programmatically switchable via `window.switchStyle(styleId)`.

## Features

- **Semantic HTML5 & Accessible Structure:** WCAG AA compliant contrast, native accessible dialogs (`<dialog id="demo-modal">`), skip-to-content navigation, and ARIA attributes throughout.
- **3-Day Multi-Event Itinerary:** Friday Sunset Tapas & Welcome Aperitivo, Saturday Wedding Ceremony & Gala Celebration, Sunday Farewell Paella & Citrus Brunch.
- **Multi-Event Weekend RSVP Form:**
  - Client-side accessible inline validation (`role="alert"`, `aria-invalid`, `aria-describedby`, form status region).
  - Conditional display based on attendance.
  - Saturday dinner entrée selection (Sea Bass, Lamb Shoulder, Truffled Mushroom Risotto).
  - Plus-one toggle with accompanying name and dinner entrée validation.
  - Shuttle pickup location selection across the 3 partner hotels.
  - Strict sales demonstration modal confirmation disclaimer (zero backend persistence).
- **Travel & Transportation Logistics:** Comprehensive flight guidelines into PMI, airport transfers, rental car advice, and scheduled shuttle timetables.
- **Island Guide & Curated Dining:** Serra de Tramuntana scenic drives, Cala Deià swimming, Valldemossa bakeries, and Sóller vintage tram.
- **Honeymoon & Conservation Funds:** Interactive demonstration contribution flows.
- **★★★ Enhancement Previews:**
  - Front-end interactive Digital Guestbook demo.
  - Private Ceremony Livestream preview modal.
  - On-site QR Guest Photo Collection preview modal.
  - Real-time Multilingual Preview toggle (English / Spanish).
- **Zero Real External Dependencies:** No external booking engines, live payment gateways, or unowned email channels.

## Development & Build

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Production Deployment

Deployed via Netlify with strict security headers:
- Target site: `wedding-weekend-destination-demo`
- Production command: `npx netlify deploy --prod --dir=dist --no-build`

© 2027 Dark Star Consulting Group (DSCG). All rights reserved.
