# Hotel Booking Specification

## Overview
The hotel booking section enables users to search, browse, and select hotels. Users can filter and sort results, view detailed hotel information including photos, location, and reviews, then select a room and add it to their basket for checkout.

## User Flows
- Browse Hotels - View list of hotels with optional map toggle, filter by price/star rating/guest rating/location/name/refundability/board type, sort by price/rating/recommended
- View Hotel Details - Click hotel card to navigate to dedicated hotel page showing photo gallery, location map, guest reviews, and available rooms
- Select Room - Choose from room cards/tiles on the hotel details page displaying room type, amenities, board type, and pricing
- Add to Basket - Add selected hotel and room to shopping basket to continue shopping or proceed to checkout

## UI Requirements
- Search Results Page: List view with optional map toggle, hotel cards showing image carousel (rotatable on-click), hotel name, star rating, price, room type (e.g., "Deluxe King"), and board type (e.g., "Bed & Breakfast") that the price is based on
- Filters: Price range, star rating, guest rating, location, hotel name search, refundable/non-refundable, board type (Room Only, Bed & Breakfast, Half Board, Full Board, All Inclusive)
- Sort Options: Price (low to high, high to low), star rating, guest rating, recommended
- Hotel Details Page: Photo gallery, location map with nearby attractions, guest reviews section, available room cards/tiles for selection
- Room Cards: Display room type, photos, amenities, board type, price per night, refund policy, and "Select" button
- Responsive Design: Mobile and desktop layouts with adaptive filtering and navigation

## Configuration
- shell: true
