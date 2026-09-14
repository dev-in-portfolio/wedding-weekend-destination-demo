/**
 * DSCG Wedding Websites - Site 4: Wedding Weekend / Destination Demo
 * Centralized configuration & content registry
 */

export const CONFIG = {
  COUPLE: {
    BRIDE: 'Amara Singh',
    GROOM: 'Luca Moretti',
    NAMES: 'Amara & Luca',
    INITIALS: 'A & L'
  },
  DESTINATION: {
    REGION: 'Mallorca, Spain',
    VENUE_NAME: 'Casa Solenne',
    LOCATION_LINE: 'North Coast · Mallorca, Spain',
    AIRPORT_NAME: 'Palma de Mallorca Airport',
    AIRPORT_CODE: 'PMI'
  },
  DATES: {
    WEEKEND_RANGE: 'September 17–19, 2027',
    FRIDAY: 'Friday, September 17, 2027',
    SATURDAY: 'Saturday, September 18, 2027',
    SUNDAY: 'Sunday, September 19, 2027',
    RSVP_DEADLINE: 'Saturday, August 1, 2027'
  },
  PRICING: {
    TIER: '★★★ Wedding Weekend / Destination',
    STARTING_PRICE: '$1,195'
  },
  HOTELS: [
    {
      id: 'the-cala-house',
      name: 'The Cala House',
      type: 'Boutique Coastal Hotel',
      setting: 'Secluded cove waterfront',
      area: 'Cala Deià Coastline',
      distance: '12 min shuttle to Casa Solenne',
      description: 'Handcrafted stone retreat perched above a quiet turquoise cove, ideal for couples and small travel groups desiring intimate Mediterranean charm.',
      roomBlock: 'Group Block: SINGH-MORETTI'
    },
    {
      id: 'hotel-maravela',
      name: 'Hotel Maravela',
      type: 'Full-Service Destination Hotel',
      setting: 'Cliffside resort & spa',
      area: 'North Coast Bluffs',
      distance: '15 min shuttle to Casa Solenne',
      description: 'Panoramic coastal property offering extensive amenities, saltwater infinity pool, full spa facilities, and family-friendly suite options.',
      roomBlock: 'Group Block: AMARA-LUCA-27'
    },
    {
      id: 'sona-mar-suites',
      name: 'Sona Mar Suites',
      type: 'Apartment-Style Guest Residences',
      setting: 'Historic village perimeter',
      area: 'Valldemossa Foothills',
      distance: '20 min shuttle to Casa Solenne',
      description: 'Spacious one- and two-bedroom residential suites featuring private terraces, kitchenettes, and quiet mountain olive grove views.',
      roomBlock: 'Group Block: DSCG-SOLENNE'
    }
  ],
  PORTAL_URL: 'https://dscg-wedding-portal.netlify.app'
};
