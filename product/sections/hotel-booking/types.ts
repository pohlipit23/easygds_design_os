// Hotel Booking Types
// Generated from data model and sample data

export interface GuestReview {
  id: string;
  hotelId: string;
  guestName: string;
  rating: number;
  date: string;
  comment: string;
  categories: {
    cleanliness: number;
    location: number;
    service: number;
    facilities: number;
    valueForMoney: number;
  };
}

export interface RoomRate {
  id: string;
  roomId: string;
  boardType: 'Room Only' | 'Bed & Breakfast' | 'Half Board' | 'Full Board' | 'All Inclusive';
  pricePerNight: number;
  totalPrice: number;
  currency: string;
  isRefundable: boolean;
  cancellationPolicy: string;
  availability: number;
}

export interface Room {
  id: string;
  hotelId: string;
  type: string;
  description: string;
  maxOccupancy: number;
  bedConfiguration: string;
  size: string;
  amenities: string[];
  imageUrls: string[];
}

export interface Hotel {
  id: string;
  name: string;
  starRating: number;
  guestRating: number;
  location: {
    area: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  description: string;
  amenities: string[];
  imageUrls: string[];
  distanceFromCenter: string;
  nearbyAttractions: Array<{
    name: string;
    distance: string;
  }>;
}

export interface HotelSearchFilters {
  priceRange?: {
    min: number;
    max: number;
  };
  starRating?: number[];
  guestRating?: number;
  locations?: string[];
  hotelName?: string;
  refundableOnly?: boolean;
  boardTypes?: Array<'Room Only' | 'Bed & Breakfast' | 'Half Board' | 'Full Board' | 'All Inclusive'>;
}

export type SortOption =
  | 'price-low-high'
  | 'price-high-low'
  | 'star-rating'
  | 'guest-rating'
  | 'recommended';

export interface HotelSearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
  };
  rooms: number;
}

// Component Props

export interface HotelBookingProps {
  // Data
  hotels: Hotel[];
  rooms: Room[];
  rates: RoomRate[];
  reviews: GuestReview[];

  // Search context
  searchParams: HotelSearchParams;

  // Filters and sort
  filters: HotelSearchFilters;
  sortBy: SortOption;

  // View state
  viewMode: 'list' | 'map';
  selectedHotelId?: string;
  selectedRoomId?: string;

  // Callbacks
  onFilterChange: (filters: HotelSearchFilters) => void;
  onSortChange: (sortBy: SortOption) => void;
  onViewModeToggle: () => void;
  onHotelSelect: (hotelId: string) => void;
  onRoomSelect: (roomId: string, rateId: string) => void;
  onAddToBasket: (hotelId: string, roomId: string, rateId: string) => void;
  onModifySearch: (params: HotelSearchParams) => void;
}
