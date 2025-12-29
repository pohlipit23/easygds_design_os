import { useState } from 'react'

// Design tokens: Primary Blue (#203C94), Gold (#FFB800), Slate neutral
// Typography: Raleway

interface HotelCardProps {
  hotel: {
    id: string
    name: string
    brand?: string
    starRating: number
    guestRating: number
    reviewCount: number
    location: {
      address: string
      city: string
    }
    images: string[]
  }
  bestRate: {
    roomType: string
    boardType: string
    pricePerNight: number
    oldPrice?: number
    totalPrice: number
    currency: string
    refundable: boolean
  }
  badge?: string
  badgeColor?: 'blue' | 'gold' | 'green' | 'purple' | 'teal'
  onSelect?: () => void
}

export function HotelCard({ hotel, bestRate, badge, badgeColor = 'blue', onSelect }: HotelCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const getBadgeColorClass = () => {
    switch (badgeColor) {
      case 'gold':
        return 'bg-[#FFB800] text-slate-900'
      case 'green':
        return 'bg-emerald-600 dark:bg-emerald-500 text-white'
      case 'purple':
        return 'bg-purple-600 dark:bg-purple-500 text-white'
      case 'teal':
        return 'bg-[#0891B2] dark:bg-[#0891B2] text-white'
      case 'blue':
      default:
        return 'bg-[#203C94] dark:bg-[#0891B2] text-white'
    }
  }

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
      className="bg-white rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-all h-auto md:h-[160px] flex flex-col cursor-pointer"
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Image Carousel */}
        <div className="relative w-full md:w-[240px] h-48 md:h-auto shrink-0 bg-slate-100 dark:bg-slate-900 group/carousel">
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
            <div className={`absolute top-2 left-2 px-3 py-1 rounded-lg text-[0.625rem] font-bold uppercase shadow-md z-0 pointer-events-none leading-tight tracking-wider ${getBadgeColorClass()}`}>
              {badge}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-grow px-4 pt-4 pb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            {/* Star Rating & Guest Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: hotel.starRating }).map((_, i) => (
                  <span key={i} className="material-icons-round text-[#FFB800] text-sm">
                    star
                  </span>
                ))}
              </div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                {hotel.guestRating} <span className="font-normal text-slate-500 dark:text-slate-400">{getRatingText(hotel.guestRating)}</span>
              </div>
            </div>

            {/* Hotel Name */}
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 hover:text-[#203C94] dark:hover:text-[#0891B2] transition-colors">
              {hotel.name}
            </h3>

            {/* Location */}
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1">
              <span className="material-icons-round text-lg">location_on</span>
              {hotel.location.address}
            </p>

            {/* Room Type, Board Type */}
            <div className="flex flex-wrap gap-3 mt-auto">
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="material-icons-round text-lg">bed</span>
                {bestRate.roomType}
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="material-icons-round text-lg">restaurant</span>
                {bestRate.boardType}
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className="flex md:flex-col items-center justify-between md:justify-center md:items-end border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 pt-4 pb-4 md:pt-0 md:pb-0 md:pl-4 md:w-52 shrink-0 mt-3 md:mt-0">
            <div className="text-left md:text-right">
              {bestRate.oldPrice && (
                <div className="text-xs text-slate-500 dark:text-slate-400 line-through mb-1">
                  {formatPrice(bestRate.oldPrice)}
                </div>
              )}
              <div className="text-2xl font-bold text-[#203C94] dark:text-[#0891B2] leading-none mb-1">
                {formatPrice(bestRate.pricePerNight)}
              </div>
              {bestRate.refundable && (
                <div className="text-[0.625rem] text-emerald-600 dark:text-emerald-400 font-semibold">
                  Free Cancellation
                </div>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onSelect?.()
              }}
              className="px-6 h-11 bg-[#203C94] dark:bg-[#0891B2] text-white rounded-lg text-xs font-bold uppercase hover:bg-[#1a3076] dark:hover:bg-[#0e7490] shadow-md md:w-full mt-0 md:mt-4 transition-all hover:shadow-lg active:scale-95"
            >
              View Deal
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
