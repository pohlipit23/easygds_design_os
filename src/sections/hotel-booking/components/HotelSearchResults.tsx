import { useMemo, useRef } from 'react'
import { HotelCard } from './HotelCard'
import { HotelRecommendationCard } from './HotelRecommendationCard'
import { ToolsBar } from './ToolsBar'

// Design tokens: Primary Blue (#203C94), Gold (#FFB800), Slate neutral
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
    nearbyAttractions?: Array<{ name: string; distance: string }>
  }
  description: string
  amenities: string[]
  images: string[]
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
  taxesAndFees: number
  totalPrice: number
  currency: string
}

interface HotelSearchResultsProps {
  // Data
  hotels: Hotel[]
  rooms: Room[]
  rates: RoomRate[]

  // Search context
  destination: string

  // Filters and sort
  searchQuery?: string
  sortBy: 'price-low-high' | 'price-high-low' | 'star-rating' | 'guest-rating' | 'recommended'
  viewMode: 'list' | 'map'

  // Callbacks
  onSearchChange?: (query: string) => void
  onFiltersClick?: () => void
  onSortChange?: (sortBy: HotelSearchResultsProps['sortBy']) => void
  onViewModeToggle?: () => void
  onHotelSelect?: (hotelId: string) => void
}

const RECOMMENDATION_BADGES = ['Iconic', 'Bestseller', 'Luxury', 'Family Choice', 'Trending']

export function HotelSearchResults({
  hotels,
  rooms,
  rates,
  destination,
  searchQuery = '',
  sortBy,
  viewMode,
  onSearchChange,
  onFiltersClick,
  onViewModeToggle,
  onHotelSelect,
}: HotelSearchResultsProps) {
  const recContainerRef = useRef<HTMLDivElement>(null)

  // Get best rate for each hotel
  const hotelBestRates = useMemo(() => {
    const bestRates = new Map<string, { room: Room; rate: RoomRate }>()

    hotels.forEach((hotel) => {
      const hotelRooms = rooms.filter((r) => r.hotelId === hotel.id)
      let bestRate: { room: Room; rate: RoomRate } | null = null
      let lowestPrice = Infinity

      hotelRooms.forEach((room) => {
        const roomRates = rates.filter((r) => r.roomId === room.id)
        roomRates.forEach((rate) => {
          if (rate.pricePerNight < lowestPrice) {
            lowestPrice = rate.pricePerNight
            bestRate = { room, rate }
          }
        })
      })

      if (bestRate) {
        bestRates.set(hotel.id, bestRate)
      }
    })

    return bestRates
  }, [hotels, rooms, rates])

  // Filter hotels by search query
  const filteredHotels = useMemo(() => {
    if (!searchQuery) return hotels

    const query = searchQuery.toLowerCase()
    return hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(query) ||
      hotel.location.address.toLowerCase().includes(query)
    )
  }, [hotels, searchQuery])

  // Sort hotels
  const sortedHotels = useMemo(() => {
    const sorted = [...filteredHotels]

    switch (sortBy) {
      case 'price-low-high':
        return sorted.sort((a, b) => {
          const aRate = hotelBestRates.get(a.id)
          const bRate = hotelBestRates.get(b.id)
          return (aRate?.rate.pricePerNight || 0) - (bRate?.rate.pricePerNight || 0)
        })
      case 'price-high-low':
        return sorted.sort((a, b) => {
          const aRate = hotelBestRates.get(a.id)
          const bRate = hotelBestRates.get(b.id)
          return (bRate?.rate.pricePerNight || 0) - (aRate?.rate.pricePerNight || 0)
        })
      case 'star-rating':
        return sorted.sort((a, b) => b.starRating - a.starRating)
      case 'guest-rating':
        return sorted.sort((a, b) => b.guestRating - a.guestRating)
      case 'recommended':
      default:
        // Weighted score: guest rating + (star rating * 0.5)
        return sorted.sort((a, b) => {
          const aScore = a.guestRating + a.starRating * 0.5
          const bScore = b.guestRating + b.starRating * 0.5
          return bScore - aScore
        })
    }
  }, [filteredHotels, sortBy, hotelBestRates])

  // Get top recommendations
  const recommendations = useMemo(() => {
    return sortedHotels.slice(0, 5).map((hotel, index) => ({
      hotel,
      badge: RECOMMENDATION_BADGES[index % RECOMMENDATION_BADGES.length],
    }))
  }, [sortedHotels])

  const scrollRecs = (direction: 'left' | 'right') => {
    if (recContainerRef.current) {
      recContainerRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      })
    }
  }

  const getSortText = () => {
    switch (sortBy) {
      case 'price-low-high':
        return 'Price: Low to High'
      case 'price-high-low':
        return 'Price: High to Low'
      case 'star-rating':
        return 'Star Rating'
      case 'guest-rating':
        return 'Guest Rating'
      case 'recommended':
      default:
        return 'Recommended'
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Tools Bar */}
      <ToolsBar
        destination={destination}
        resultCount={sortedHotels.length}
        searchQuery={searchQuery}
        viewMode={viewMode}
        onSearchChange={onSearchChange}
        onFiltersClick={onFiltersClick}
        onViewModeToggle={onViewModeToggle}
      />

      {/* List View */}
      {viewMode === 'list' && (
        <div className="container mx-auto px-4 md:px-6 py-4">
          {/* Recommendations Section */}
          <section className="mb-6 relative border-b border-slate-200 dark:border-slate-700 pb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-200 flex items-center gap-3">
                <span className="w-8 h-1 bg-[#203C94] dark:bg-[#0891B2] rounded-full"></span>
                easygds Picks
              </h2>
              <div className="flex gap-2 hidden md:flex">
                <button
                  onClick={() => scrollRecs('left')}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-[#203C94] dark:hover:border-[#0891B2] hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all"
                  aria-label="Scroll recommendations left"
                >
                  <span className="material-icons-round text-lg">arrow_back</span>
                </button>
                <button
                  onClick={() => scrollRecs('right')}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-[#203C94] dark:hover:border-[#0891B2] hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all"
                  aria-label="Scroll recommendations right"
                >
                  <span className="material-icons-round text-lg">arrow_forward</span>
                </button>
              </div>
            </div>
            <div
              ref={recContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0 py-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {recommendations.map(({ hotel, badge }) => {
                const bestRate = hotelBestRates.get(hotel.id)
                if (!bestRate) return null

                return (
                  <HotelRecommendationCard
                    key={hotel.id}
                    hotel={hotel}
                    bestRate={{
                      roomType: bestRate.room.roomType,
                      boardType: bestRate.rate.boardType,
                      pricePerNight: bestRate.rate.pricePerNight,
                      currency: bestRate.rate.currency,
                    }}
                    badge={badge}
                    onSelect={() => onHotelSelect?.(hotel.id)}
                  />
                )
              })}
            </div>
          </section>

          {/* Main Results */}
          <div>
            <div className="flex items-end justify-between mb-4">
              <h2 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-200">
                All Properties
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Sorted by {getSortText()}
              </span>
            </div>
            <div className="flex flex-col gap-4 pb-6">
              {sortedHotels.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-12 text-center">
                  <span className="material-icons-round text-slate-300 dark:text-slate-600 text-6xl mb-4 block">
                    search_off
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    No hotels found
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    Try adjusting your search or filters
                  </p>
                </div>
              ) : (
                sortedHotels.map((hotel) => {
                  const bestRate = hotelBestRates.get(hotel.id)
                  if (!bestRate) return null

                  // Assign badge to some hotels
                  const badge = hotel.guestRating >= 9.3 ? RECOMMENDATION_BADGES[Math.floor(Math.random() * RECOMMENDATION_BADGES.length)] : undefined

                  return (
                    <HotelCard
                      key={hotel.id}
                      hotel={hotel}
                      bestRate={{
                        roomType: bestRate.room.roomType,
                        boardType: bestRate.rate.boardType,
                        pricePerNight: bestRate.rate.pricePerNight,
                        totalPrice: bestRate.rate.totalPrice,
                        currency: bestRate.rate.currency,
                        refundable: bestRate.rate.refundable,
                      }}
                      badge={badge}
                      onSelect={() => onHotelSelect?.(hotel.id)}
                    />
                  )
                })
              )}
            </div>

            {/* Load More */}
            {sortedHotels.length > 0 && (
              <div className="mt-6 mb-8 text-center">
                <button className="px-12 h-11 border-2 border-slate-300 dark:border-slate-600 rounded-full text-xs font-bold uppercase hover:border-[#203C94] dark:hover:border-[#0891B2] hover:text-[#203C94] dark:hover:text-[#0891B2] transition-all text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:shadow-md active:scale-95">
                  Load More Results
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Map View Placeholder */}
      {viewMode === 'map' && (
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-12 text-center">
            <span className="material-icons-round text-[#0891B2] text-6xl mb-4 block">map</span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Map View</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Interactive map will be integrated here showing hotel locations
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
