import { useState } from 'react'

// Design tokens: Primary Blue (#203C94), Gold (#FFB800), Slate neutral
// Typography: Raleway

interface HotelRecommendationCardProps {
  hotel: {
    id: string
    name: string
    starRating: number
    guestRating: number
    location: {
      address: string
    }
    images: string[]
  }
  bestRate: {
    roomType: string
    boardType: string
    pricePerNight: number
    currency: string
  }
  badge?: string
  onSelect?: () => void
}

export function HotelRecommendationCard({
  hotel,
  bestRate,
  badge,
  onSelect,
}: HotelRecommendationCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length)
  }

  const formatPrice = (price: number) => {
    return `£${price.toLocaleString()}`
  }

  const getRatingText = (rating: number) => {
    if (rating >= 9.5) return 'Exceptional'
    if (rating >= 9.0) return 'Excellent'
    if (rating >= 8.5) return 'Very Good'
    if (rating >= 8.0) return 'Good'
    return 'Pleasant'
  }

  return (
    <div
      onClick={onSelect}
      className="snap-center shrink-0 w-[280px] md:w-[300px] group cursor-pointer bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden h-[408px]"
    >
      {/* Top Stripe */}
      <div className="h-1 w-full bg-[#203C94] dark:bg-[#0891B2] shrink-0"></div>

      {/* Image */}
      <div className="relative bg-slate-100 dark:bg-slate-900 shrink-0 group/carousel h-[180px]">
        <img
          src={hotel.images[currentImageIndex]}
          alt={`${hotel.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-200"
        />

        {/* Carousel Controls */}
        {hotel.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 -translate-y-1/2 w-9 h-9 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 text-[#203C94] dark:text-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 z-10 active:scale-95"
              aria-label="Previous image"
            >
              <span className="material-icons-round text-lg">chevron_left</span>
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 -translate-y-1/2 w-9 h-9 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 text-[#203C94] dark:text-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 z-10 active:scale-95"
              aria-label="Next image"
            >
              <span className="material-icons-round text-lg">chevron_right</span>
            </button>
          </>
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-2 left-2 bg-[#203C94] dark:bg-[#0891B2] text-white px-3 py-1 rounded-lg text-[0.625rem] font-bold uppercase shadow-md z-0 pointer-events-none leading-tight tracking-wider">
            {badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 pt-4 pb-6 flex flex-col flex-1">
        {/* Ratings */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: hotel.starRating }).map((_, i) => (
              <span key={i} className="material-icons-round text-[#FFB800] text-xs">
                star
              </span>
            ))}
          </div>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
            {hotel.guestRating} <span className="font-normal text-slate-500 dark:text-slate-400">{getRatingText(hotel.guestRating)}</span>
          </div>
        </div>

        {/* Hotel Name */}
        <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-[#203C94] dark:group-hover:text-[#0891B2] transition-colors truncate mb-1">
          {hotel.name}
        </h3>

        {/* Location */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1 truncate">
          <span className="material-icons-round text-lg">location_on</span>
          {hotel.location.address}
        </p>

        {/* Room & Board Type */}
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="material-icons-round text-lg">bed</span>
            {bestRate.roomType}
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="material-icons-round text-lg">restaurant</span>
            {bestRate.boardType}
          </div>
        </div>

        {/* Price & CTA */}
        <div className="pt-3 pb-4 border-t border-slate-200 dark:border-slate-700 flex items-end justify-between mt-auto">
          <div>
            <div className="text-xl font-bold text-[#203C94] dark:text-[#0891B2] leading-none">
              {formatPrice(bestRate.pricePerNight)}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onSelect?.()
            }}
            className="bg-[#203C94] dark:bg-[#0891B2] text-white px-4 h-10 rounded-lg text-xs font-bold uppercase hover:bg-[#1a3076] dark:hover:bg-[#0e7490] hover:shadow-md transition-all active:scale-95"
          >
            View Deal
          </button>
        </div>
      </div>
    </div>
  )
}
