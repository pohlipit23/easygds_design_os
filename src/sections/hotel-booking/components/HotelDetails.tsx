import { useState } from 'react'
import { PhotoGallery } from './PhotoGallery'
import { LocationMap } from './LocationMap'
import { GuestReviews } from './GuestReviews'
import { RoomCard } from './RoomCard'

// Design tokens: Primary Blue (#203C94), Secondary Teal (#0891B2), Gold (#FFB800), Slate neutral
// Typography: Raleway

interface Hotel {
  id: string
  name: string
  brand?: string
  starRating: number
  guestRating: number
  reviewCount: number
  location: {
    address: string
    city: string
    country: string
    coordinates: { lat: number; lng: number }
    nearbyAttractions?: string[]
  }
  description: string
  amenities: string[]
  images: string[]
  policies?: {
    checkIn: string
    checkOut: string
    cancellationPolicy: string
  }
}

interface Room {
  id: string
  hotelId: string
  roomType: string
  bedType: string
  capacity: number
  size: string
  amenities: string[]
  images: string[]
}

interface RoomRate {
  id: string
  roomId: string
  boardType: 'Room Only' | 'Bed & Breakfast' | 'Half Board' | 'Full Board' | 'All Inclusive'
  refundable: boolean
  pricePerNight: number
  oldPrice?: number
  taxesAndFees: number
  totalPrice: number
  currency: string
}

interface GuestReview {
  id: string
  hotelId: string
  guestName: string
  rating: number
  title?: string
  comment: string
  date: string
  verified?: boolean
}

interface HotelDetailsProps {
  // Data
  hotel: Hotel
  rooms: Room[]
  rates: RoomRate[]
  reviews: GuestReview[]

  // Search context
  checkIn: string
  checkOut: string
  nights: number
  guests: string

  // Callbacks
  onBack?: () => void
  onRoomSelect?: (roomId: string, rateId: string) => void
  onAddToBasket?: (roomId: string, rateId: string) => void
}

export function HotelDetails({
  hotel,
  rooms,
  rates,
  reviews,
  checkIn,
  checkOut,
  nights,
  guests,
  onBack,
  onRoomSelect,
  onAddToBasket,
}: HotelDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'rooms' | 'reviews' | 'location'>('rooms')

  // Get hotel rooms and their rates
  const hotelRooms = rooms.filter((room) => room.hotelId === hotel.id)
  const roomsWithRates = hotelRooms.map((room) => {
    const roomRates = rates.filter((rate) => rate.roomId === room.id)
    return { room, rates: roomRates }
  })

  // Get hotel reviews
  const hotelReviews = reviews.filter((review) => review.hotelId === hotel.id)

  // Calculate average ratings by category (mock data for display)
  const reviewCategories = {
    cleanliness: 9.2,
    location: 9.5,
    service: 9.3,
    facilities: 9.1,
    valueForMoney: 8.8,
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-semibold text-[#203C94] dark:text-[#0891B2] hover:text-[#1A3994] dark:hover:text-[#06829A] transition-colors mb-4"
          >
            <span className="material-icons-round text-lg">arrow_back</span>
            Back to search results
          </button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  {hotel.name}
                </h1>
                <div className="flex items-center gap-1 text-[#FFB800]">
                  {Array.from({ length: hotel.starRating }).map((_, i) => (
                    <span key={i} className="material-icons-round text-lg">
                      star
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1">
                  <span className="material-icons-round text-[#0891B2] text-lg">location_on</span>
                  <span>{hotel.location.address}, {hotel.location.city}</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 bg-[#203C94] dark:bg-[#1A3994] rounded-lg p-4 text-white">
              <div className="flex items-end gap-2 mb-1">
                <span className="text-4xl font-bold">{hotel.guestRating.toFixed(1)}</span>
                <span className="text-sm font-semibold mb-1">Exceptional</span>
              </div>
              <div className="text-xs opacity-90">{hotel.reviewCount.toLocaleString()} reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <PhotoGallery
        images={hotel.images}
        hotelName={hotel.name}
        selectedIndex={selectedImage}
        onImageSelect={setSelectedImage}
      />

      {/* Tabs Navigation */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('rooms')}
              className={`px-6 h-12 text-xs font-bold uppercase transition-colors relative ${
                activeTab === 'rooms'
                  ? 'text-[#203C94] dark:text-[#0891B2]'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              Rooms & Rates
              {activeTab === 'rooms' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#203C94] dark:bg-[#0891B2]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`px-6 h-12 text-xs font-bold uppercase transition-colors relative ${
                activeTab === 'location'
                  ? 'text-[#203C94] dark:text-[#0891B2]'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              Location
              {activeTab === 'location' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#203C94] dark:bg-[#0891B2]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 h-12 text-xs font-bold uppercase transition-colors relative ${
                activeTab === 'reviews'
                  ? 'text-[#203C94] dark:text-[#0891B2]'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              Reviews ({hotelReviews.length})
              {activeTab === 'reviews' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#203C94] dark:bg-[#0891B2]"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-6">
        {/* Hotel Description & Amenities */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            {hotel.description}
          </p>

          <div>
            <h3 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-3 tracking-wide">
              Hotel Amenities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {hotel.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                >
                  <span className="material-icons-round text-[#0891B2] text-lg">check_circle</span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {hotel.policies && (
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <h3 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-3 tracking-wide">
                Hotel Policies
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Check-in:</span>
                  <span className="ml-2 text-slate-900 dark:text-white font-semibold">
                    {hotel.policies.checkIn}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Check-out:</span>
                  <span className="ml-2 text-slate-900 dark:text-white font-semibold">
                    {hotel.policies.checkOut}
                  </span>
                </div>
                <div className="md:col-span-1">
                  <span className="text-slate-500 dark:text-slate-400">Cancellation:</span>
                  <span className="ml-2 text-slate-900 dark:text-white font-semibold">
                    {hotel.policies.cancellationPolicy}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === 'rooms' && (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Available Rooms
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {checkIn} - {checkOut} • {nights} {nights === 1 ? 'night' : 'nights'} • {guests}
              </p>
            </div>

            <div className="space-y-4">
              {roomsWithRates.map(({ room, rates: roomRates }) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  rates={roomRates}
                  nights={nights}
                  onSelect={(rateId) => onRoomSelect?.(room.id, rateId)}
                  onAddToBasket={(rateId) => onAddToBasket?.(room.id, rateId)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'location' && (
          <LocationMap
            hotelName={hotel.name}
            address={`${hotel.location.address}, ${hotel.location.city}`}
            coordinates={hotel.location.coordinates}
            nearbyAttractions={hotel.location.nearbyAttractions || []}
          />
        )}

        {activeTab === 'reviews' && (
          <GuestReviews
            reviews={hotelReviews}
            overallRating={hotel.guestRating}
            totalReviews={hotel.reviewCount}
            categories={reviewCategories}
          />
        )}
      </div>
    </div>
  )
}
