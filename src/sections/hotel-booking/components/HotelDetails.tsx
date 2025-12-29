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
  const [reviewsExpanded, setReviewsExpanded] = useState(true)
  const [locationExpanded, setLocationExpanded] = useState(false)
  const [infoExpanded, setInfoExpanded] = useState(false)
  const [policiesExpanded, setPoliciesExpanded] = useState(false)

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Back Button */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-5xl mx-auto px-4 py-3">
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
      <div className="max-w-5xl mx-auto px-4 py-6">
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
              <div className="inline-flex items-center gap-2 bg-[#203C94] dark:bg-[#1A3994] text-white px-3 py-1.5 rounded-lg">
                <span className="text-xl font-bold">{hotel.guestRating.toFixed(1)}</span>
                <span className="text-xs font-bold">Excellent</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Based on {hotel.reviewCount.toLocaleString()} verified reviews
              </div>
            </div>
          </div>

          {/* Anchor Navigation Links */}
          <div className="flex gap-6 border-b border-slate-200 dark:border-slate-700 -mb-px">
            <button
              onClick={() => scrollToSection('room-type')}
              className="pb-3 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              Room Type
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="pb-3 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('location')}
              className="pb-3 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              Location
            </button>
            <button
              onClick={() => scrollToSection('hotel-information')}
              className="pb-3 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              Hotel Information
            </button>
            <button
              onClick={() => scrollToSection('policies')}
              className="pb-3 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              Policies and T&C
            </button>
          </div>
        </div>

        {/* Room Type Section */}
        <section id="room-type" className="scroll-mt-4">
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
        </section>

        {/* Reviews Section - Expanded by default */}
        <section id="reviews" className="scroll-mt-4 mt-8">
          <button
            onClick={() => setReviewsExpanded(!reviewsExpanded)}
            className="w-full flex items-center justify-between py-4 border-b border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Guest Reviews</h2>
            <span className="material-icons-round text-slate-600 dark:text-slate-400">
              {reviewsExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </button>
          {reviewsExpanded && (
            <div className="pt-4">
              <GuestReviews
                reviews={hotelReviews}
                overallRating={hotel.guestRating}
                totalReviews={hotel.reviewCount}
                categories={reviewCategories}
              />
            </div>
          )}
        </section>

        {/* Location Section - Collapsed */}
        <section id="location" className="scroll-mt-4 mt-6">
          <button
            onClick={() => setLocationExpanded(!locationExpanded)}
            className="w-full flex items-center justify-between py-4 border-b border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Location</h2>
            <span className="material-icons-round text-slate-600 dark:text-slate-400">
              {locationExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </button>
          {locationExpanded && (
            <div className="pt-4">
              <LocationMap
                hotelName={hotel.name}
                address={`${hotel.location.address}, ${hotel.location.city}`}
                coordinates={hotel.location.coordinates}
                nearbyAttractions={hotel.location.nearbyAttractions || []}
              />
            </div>
          )}
        </section>

        {/* Hotel Information Section - Collapsed */}
        <section id="hotel-information" className="scroll-mt-4 mt-6">
          <button
            onClick={() => setInfoExpanded(!infoExpanded)}
            className="w-full flex items-center justify-between py-4 border-b border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Hotel Information</h2>
            <span className="material-icons-round text-slate-600 dark:text-slate-400">
              {infoExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </button>
          {infoExpanded && (
            <div className="pt-4 space-y-6">
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
            </div>
          )}
        </section>

        {/* Policies and T&C Section - Collapsed */}
        <section id="policies" className="scroll-mt-4 mt-6 mb-8">
          <button
            onClick={() => setPoliciesExpanded(!policiesExpanded)}
            className="w-full flex items-center justify-between py-4 border-b border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Policies and T&C</h2>
            <span className="material-icons-round text-slate-600 dark:text-slate-400">
              {policiesExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </button>
          {policiesExpanded && hotel.policies && (
            <div className="pt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                    Check-in / Check-out
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
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                    Cancellation Policy
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {hotel.policies.cancellationPolicy}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
