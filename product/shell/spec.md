# easyGDS Application Shell Specification

## Overview
The application shell provides the persistent navigation, search controls, and layout structure that wraps all booking flows in the easyGDS platform. It adapts responsively across desktop and mobile devices while maintaining consistent branding and user experience.

The shell is **product-type aware** and automatically adapts its display based on the current booking flow (flight, hotel, package, car rental, or tour), showing the appropriate search summary, product summary, and expandable details for each product type.

## Design Tokens
- **Primary Color**: #203C94 (deep blue) - buttons, links, main accents
- **Secondary Color**: #0891B2 (teal) - secondary accents, complementary actions, highlights
- **Accent Color**: #FFB800 (gold) - highlights, ratings, special badges
- **Neutral Color**: slate - backgrounds, borders, text, subtle UI elements
- **Typography**: Raleway (400-800 weights)
- **Icons**: Material Icons Round
- **Border Radius**: 8px (rounded-lg) for cards/inputs, 50% (rounded-full) for icon buttons
- **Shadows**: Subtle (0 1px 3px rgba(0,0,0,0.08)) to medium (0 4px 12px rgba(0,0,0,0.1))
- **Transitions**: 150-200ms cubic-bezier(0.4, 0, 0.2, 1)

### Navigational Elements
- **Primary Action Button**:
  - Height: 44px (`h-11`)
  - Style: Primary Blue background, White text, Uppercase, Bold (text-xs)
  - Interactive: Hover shadow-lg, Active scale-95, Transition-all
- **Secondary/Filter Button**:
  - Height: 40px (`h-10`)
  - Style: White background, Slate-200 border, Slate-700 text, Uppercase, Bold
  - Dark Mode: Slate-800 background, Slate-700 border, Slate-200 text
- **Icon Button (Circular)**:
  - Size: 36px (`w-9 h-9`)
  - Style: White/90 backdrop, Primary Blue icon, Shadow-md
  - Usage: Carousel controls, toggles
- **Text Input**:
  - Height: 40px (`h-10`)
  - Style: Slate-50 background, Slate-200 border, Focus ring Primary/20
  - Typography: Text-sm font-medium

## Product Type Support

The shell components support all product types with adaptive content:

### Flight-Only Flow
- **Context Bar**: Displays flight route, dates, and passenger count
- **Product Summary**: Shows outbound and return flight times
- **Product Details Panel**: Full flight itinerary with departure/arrival times, airport codes, duration, flight numbers, and class

### Hotel-Only Flow
- **Context Bar**: Displays destination, dates, and guest count
- **Product Summary**: Shows hotel name and check-in/check-out dates
- **Product Details Panel**: Hotel details with star rating, room type, board type, nights, and guest information

### Package Flow (Flight + Hotel)
- **Context Bar**: Displays flight route, dates, and passenger count
- **Product Summary**: Shows outbound and return flight times
- **Product Details Panel**: Combined view with full flight itinerary PLUS hotel details below

### Car Rental Flow
- **Context Bar**: Displays pick-up location and dates
- **Product Summary**: Shows vehicle type and pick-up/drop-off locations
- **Product Details Panel**: Pick-up and drop-off details with vehicle information

### Tours & Activities Flow
- **Context Bar**: Displays destination and date
- **Product Summary**: Shows tour name, date, and time
- **Product Details Panel**: Tour description, date, time, duration, and participant count

## Components

### 1. Header (Desktop)
**Purpose**: Primary navigation and account controls for desktop viewports (≥768px)

**Elements**:
- **Logo**: easyGDS logo (left-aligned, height: 28px)
- **Divider**: Vertical separator (1px, gray-300)
- **Regional Settings Button**:
  - Country flag icon (20px)
  - Currency code (e.g., "GBP")
  - Dropdown chevron
  - Opens regional settings modal on click
- **User Account Button**:
  - Person outline icon (24px)
  - Circular button (40px × 40px)
  - Hover: light gray background

**Layout**:
- Container: max-width with horizontal padding (24px)
- Height: 64px
- Background: white with bottom border
- Flex layout with space-between

**States**:
- Default, hover, active

---

### 2. Header (Mobile)
**Purpose**: Compact navigation for mobile viewports (<768px)

**Elements**:
- **Logo**: easyGDS logo (height: 24px)
- **Itinerary Summary Button**:
  - Route display (e.g., "Almaty → Dubai")
  - Date and flight inclusion text
  - Expandable chevron
  - Toggles mobile dropdown panel
- **Regional Settings Button**: Flag icon only
- **User Account Button**: Person icon only

**Mobile Dropdown Panel**:
- **Flight Itinerary Card**:
  - Outbound and return flight times
  - Airport codes
  - "Included" badge
- **Search Details**:
  - Date range
  - Number of guests
- **Action Buttons**:
  - Close button
  - Modify search button (opens search widget)

**Layout**:
- Height: 56px
- Full-width dropdown slides from top
- Background: white with shadow

---

### 3. Search Widget
**Purpose**: Collapsible search form for modifying travel criteria

**Visibility**: Hidden by default, toggles on "Modify" button click

**Form Fields**:
- **From**: Text input with flight_takeoff icon
- **To**: Text input with flight_land icon
- **Dates**: Text input with calendar icon
- **Guests**: Select dropdown with person icon
- **Update Search Button**: Primary blue button

**Layout**:
- Slides down from header with animation (200ms fade-in-down)
- Grid layout: 1 column mobile, 5 columns desktop
- Each input: 44px height, rounded corners, labeled with floating label
- Close button (top-right)

**States**:
- Collapsed (hidden)
- Expanded (visible)
- Focus states for inputs

---

### 4. Product Details Widget
**Purpose**: Expandable panel showing detailed information about booked products (adaptive based on product type)

**Visibility**:
- Hidden by default, toggles on product summary button click
- Optional - only appears when products are added to basket

**Product Type Variations**:

**Flight Booking**:
- **Outbound Flight Card**:
  - Departure time and airport code
  - Arrival time and airport code
  - Duration
  - Flight number and class
- **Return Flight Card**: (same structure)

**Hotel Booking**:
- **Hotel Details Card**:
  - Hotel name and star rating
  - Check-in and check-out dates
  - Room type and board type
  - Number of nights
  - Guest count

**Flight + Hotel Package**:
- **Outbound Flight** (left card)
- **Return Flight** (right card)
- **Hotel Summary** (below flights)

**Car Rental**:
- **Pick-up Details**: Location, date, time
- **Drop-off Details**: Location, date, time
- **Vehicle Type**: Class, capacity
- **Rental Duration**: Number of days

**Tours/Activities**:
- **Tour Name**: Description
- **Date and Time**: When it occurs
- **Duration**: How long
- **Participants**: Number of people

**Layout**:
- Slides down from header/context bar with animation
- 2-column grid on desktop, stacked on mobile
- Each card: rounded corners, light gray background, border
- Adapts number of cards based on product type

---

### 5. Regional Settings Modal
**Purpose**: Full-screen modal for selecting country, language, and currency

**Trigger**: Regional settings button in header

**Sections**:
- **Country Selection**:
  - List of countries with flag icons
  - Selected country highlighted (primary blue background)
- **Language Selection**:
  - List of languages
  - Selected language highlighted
- **Currency Selection**:
  - List of currencies with symbols
  - Selected currency highlighted

**Layout**:
- Modal overlay: black/50 backdrop with blur
- Content: white card, rounded corners, max-width 672px
- Header: title + close button
- Body: 3-column grid on desktop, stacked on mobile
- Footer: Cancel and Apply buttons

**Actions**:
- Cancel: closes modal without saving
- Apply: saves preferences and closes modal
- Close icon: same as cancel

---

### 6. Context Bar (Desktop)
**Purpose**: Shows active search criteria and product summary in a sticky bar below header

**Visibility**: Only on search results and booking pages when products are in basket

**Adaptive Content Based on Product Type**:

**For Flight or Flight+Hotel**:
- **Search Summary**:
  - Search icon
  - Route (e.g., "Almaty - Dubai")
  - Date range and passenger count
  - "Modify" button (opens search widget)
- **Flight Summary** (clickable):
  - Outbound flight time and code
  - Return flight time and code
  - Expandable chevron (opens product details)

**For Hotel Only**:
- **Search Summary**:
  - Location icon
  - Destination (e.g., "Dubai")
  - Date range and guest count
  - "Modify" button
- **Hotel Summary** (clickable):
  - Hotel name or "View Hotel Details"
  - Check-in and check-out dates
  - Expandable chevron

**For Car Rental**:
- **Search Summary**:
  - Car icon
  - Pick-up location
  - Date range
  - "Modify" button
- **Vehicle Summary** (clickable):
  - Vehicle type
  - Pick-up and drop-off details
  - Expandable chevron

**For Tours/Activities**:
- **Search Summary**:
  - Tour icon
  - Destination
  - Date
  - "Modify" button
- **Tour Summary** (clickable):
  - Tour name
  - Date and time
  - Expandable chevron

**Layout**:
- Height: 64px
- Sticky positioning (top: 0 after scroll)
- Background: light gray (slate-50)
- Border bottom
- Flexbox layout adapts to content type

---

### 7. Footer
**Purpose**: Site-wide footer with legal links and copyright

**Elements**:
- Copyright text: "© 2025 easyGDS. All rights reserved."
- Links:
  - Terms & Conditions
  - Privacy Policy
  - Cookie Policy

**Layout**:
- Background: white with top border
- Padding: 24px vertical
- Flex layout: copyright left, links right (stacked on mobile)
- Text size: xs (12px)
- Text color: muted gray

---

## Layout Structure

```
┌─────────────────────────────────────┐
│  Header (Desktop/Mobile)            │
├─────────────────────────────────────┤
│  [Search Widget] (collapsible)      │
├─────────────────────────────────────┤
│  [Flight Details] (collapsible)     │
├─────────────────────────────────────┤
│  Context Bar (when applicable)      │
├─────────────────────────────────────┤
│                                     │
│  MAIN CONTENT AREA                  │
│  (Section-specific screens)         │
│                                     │
├─────────────────────────────────────┤
│  Footer                             │
└─────────────────────────────────────┘
```

## Responsive Behavior

### Desktop (≥768px)
- Full header with text labels
- Search widget: 5-column grid
- Context bar visible and sticky
- Regional modal: 3-column grid

### Tablet (≥640px, <768px)
- Compact header (mobile style)
- Search widget: 2-column grid
- Context bar hidden (use mobile dropdown)

### Mobile (<640px)
- Mobile header with dropdown panel
- Search widget: 1-column stacked
- Context bar hidden
- Regional modal: stacked sections
- Full-screen modals

## Interactions

### Search Widget Toggle
1. User clicks "Modify" button
2. Widget slides down with fade-in-down animation (200ms)
3. First input receives focus
4. Click "Update Search" or "Close" to collapse

### Flight Details Toggle
1. User clicks flight summary in context bar
2. Widget slides down with fade-in-down animation
3. Click anywhere else or "Close" to collapse

### Regional Settings
1. User clicks flag/currency button
2. Modal fades in with backdrop (200ms)
3. User selects preferences
4. Click "Apply" to save and close, "Cancel" to discard

### Mobile Dropdown
1. User clicks itinerary summary button
2. Panel slides down from header
3. Shows flight details and search criteria
4. "Close" collapses panel
5. "Modify" opens search widget and collapses panel

## Accessibility

- All interactive elements have proper ARIA labels
- Modals have `role="dialog"` and `aria-modal="true"`
- Focus management for modals and dropdowns
- Keyboard navigation support (Tab, Enter, Escape)
- Color contrast meets WCAG AA standards

## States & Variations

### Search Context States
- **No Search**: Default shell without context bar
- **Active Search**: Context bar with search criteria and flight details
- **Editing Search**: Search widget expanded

### User States
- **Guest**: Person outline icon, click opens login/signup
- **Authenticated**: User avatar or initials, click opens account menu

### Regional Settings
- Selected preferences persist across session
- Display currency throughout all prices
- Language affects UI text (when localization implemented)
