# Data Model

## Entities

### User
Represents a customer using the platform until such point that a User makes a booking and turns into a Booker. 

### Search
Represents search criteria for finding travel products, including origin and destination locations, travel dates, number of passengers/guests, number of room, product type, trip type (one-way, return, multi-city), and filters.

### Flight
Represents one or more flight segments or itinerary with airline and flight number, origin and destination airports, departure and arrival times, duration, cabin class, fare class.

### Flight Pricing
Represent the price components of a flight including fare, taxes, surcharges, passenger type specific pricing and total price.

### Hotel
Represents an accommodation property with name and brand, location, star rating, guest reviews, amenities, images, and policies.

### Room
Represents a room type within a hotel, including room type (deluxe, suite, standard), bed type (king, queen, twin), capacity.

### Room Rate
Represents the rate of the room including board type (room only, breakfast, half board, full board, all inclusive), taxes and surcharges, fees to be collected at property and total price.

### Package
Represents a bundled flight + hotel offer with included flight(s), hotel and room, flight pricing, room rate, total package price, savings vs separate booking, and flexibility options.

### Package Pricing
Represents the pricing of a package consisting of at least one flight, flight pricing, hotel, room, room rate and displayed as a total pricing only. At no point will component pricing of a flight or hotel be displayed individually for a package. 

### Tour
Represents tours and activities at destinations with name, description, location, duration, available dates and times, price per person, and maximum participants.

### Vehicle
Represents rental cars or transfer vehicles with vehicle type/class, capacity (passengers, luggage), rental company or transfer provider, pick-up and drop-off details, and price.

### Basket
Represents a shopping cart of selected travel products containing line items (Flights, Hotels and/or Packages, Tours, Transfers, Cars), total price, currency, and status.

### Booker
Represents the person making the booking, payment and receiving the booking documentation. The booker does not have to be one of the passengers.

### Passenger
Represents an individual traveler in a booking with full name, date of birth, gender, passport/ID information, contact details, optional documentation details and special requests.

### Payment
Represents payment information for a booking including payment method, amount and currency, transaction ID, status, and timestamp.

### Booking
Represents a confirmed reservation with booking reference number, status, all booked products, passengers, payment information, and confirmation email.

## Relationships

- User creates Search
- User owns Basket
- User makes Booking and becomes a Booker
- Search returns Results (Flights, Hotels, Packages, Tours, Cars, Transfers)
- Hotel contains Rooms
- Rooms contain Rates
- Flight contains Pricing
- Package bundles Flight and Hotel/Room (no individual component pricing to be disclosed)
- Basket contains Products (Flight, Hotel, Room, Package, Tour, Vehicle)
- Basket converts to Booking at checkout
- Booking belongs to Booker
- Booking contains Passengers (and may or may not include the Booker)
- Booking linked to Payment
- Booking contains products from Basket
- Flight can be part of Package
- Flight can be added to Basket
- Hotel can be part of Package
- Room belongs to Hotel
- Room can be added to Basket
