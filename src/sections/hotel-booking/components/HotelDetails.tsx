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
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Back Button */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-semibold text-[#203C94] dark:text-[#0891B2] hover:text-[#1A3994] dark:hover:text-[#06829A] transition-colors"
          >
            <span className="material-icons-round text-lg">arrow_back</span>
            Back to search results
          </button>
        </div>
      </div>

      {/* Photo Gallery */}
      <PhotoGallery
        images={hotel.images}
        hotelName={hotel.name}
        selectedIndex={selectedImage}
        onImageSelect={setSelectedImage}
      />

      {/* Main Content - Compact Layout */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Hotel Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {hotel.name}
                </h1>
                <div className="flex items-center gap-0.5 text-[#FFB800]">
                  {Array.from({ length: hotel.starRating }).map((_, i) => (
                    <span key={i} className="material-icons-round text-base">star</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                <span className="material-icons-round text-[#0891B2] text-base">location_on</span>
                <span>{hotel.location.address}</span>
              </div>
            </div>

            <div className="flex-shrink-0 text-right">
              <div className="inline-flex items-center gap-2 bg-[#FFB800] text-slate-900 px-3 py-1.5 rounded-lg">
                <span className="text-xl font-bold">{hotel.guestRating.toFixed(1)}</span>
                <span className="text-xs font-bold">Excellent</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Based on {hotel.reviewCount.toLocaleString()} verified reviews
              </div>
            </div>
          </div>

          {/* Horizontal Tabs */}
          <div className="flex gap-6 border-b border-slate-200 dark:border-slate-700 -mb-px">
            <button
              onClick={() => setActiveTab('rooms')}
              className={`pb-3 text-sm font-semibold transition-colors relative ${
                activeTab === 'rooms'
                  ? 'text-[#203C94] dark:text-[#0891B2]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Room Type
              {activeTab === 'rooms' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#203C94] dark:bg-[#0891B2]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-sm font-semibold transition-colors relative ${
                activeTab === 'reviews'
                  ? 'text-[#203C94] dark:text-[#0891B2]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Reviews
              {activeTab === 'reviews' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#203C94] dark:bg-[#0891B2]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`pb-3 text-sm font-semibold transition-colors relative ${
                activeTab === 'location'
                  ? 'text-[#203C94] dark:text-[#0891B2]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Location
              {activeTab === 'location' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#203C94] dark:bg-[#0891B2]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`pb-3 text-sm font-semibold transition-colors relative ${
                activeTab === 'info'
                  ? 'text-[#203C94] dark:text-[#0891B2]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Hotel Information
              {activeTab === 'info' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#203C94] dark:bg-[#0891B2]"></div>
              )}
            </button>
          </div>
        </div>

        {/* Rooms Tab - Primary Content */}
        {activeTab === 'rooms' && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Select your room
            </h2>
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

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <GuestReviews
            reviews={hotelReviews}
            overallRating={hotel.guestRating}
            totalReviews={hotel.reviewCount}
            categories={reviewCategories}
          />
        )}

        {/* Location Tab */}
        {activeTab === 'location' && (
          <LocationMap
            hotelName={hotel.name}
            address={`${hotel.location.address}, ${hotel.location.city}`}
            coordinates={hotel.location.coordinates}
            nearbyAttractions={hotel.location.nearbyAttractions || []}
          />
        )}

        {/* Hotel Information Tab */}
        {activeTab === 'info' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                About this hotel
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {hotel.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Amenities
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {hotel.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <span className="material-icons-round text-[#0891B2] text-base">check_circle</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {hotel.policies && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  Policies & Check-in
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 dark:text-slate-400 w-24">Check-in:</span>
                    <span className="text-slate-900 dark:text-white font-semibold">
                      {hotel.policies.checkIn}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 dark:text-slate-400 w-24">Check-out:</span>
                    <span className="text-slate-900 dark:text-white font-semibold">
                      {hotel.policies.checkOut}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-600 dark:text-slate-400 w-24">Cancellation:</span>
                    <span className="text-slate-900 dark:text-white font-semibold">
                      {hotel.policies.cancellationPolicy}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
