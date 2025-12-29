import { useState } from 'react'

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

interface RoomCardProps {
  room: Room
  rates: RoomRate[]
  nights: number
  onSelect?: (rateId: string) => void
  onAddToBasket?: (rateId: string) => void
}

export function RoomCard({ room, rates, nights, onSelect, onAddToBasket }: RoomCardProps) {
  const [selectedRateId, setSelectedRateId] = useState<string>(rates[0]?.id || '')
  const [showAllRates, setShowAllRates] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const selectedRate = rates.find((rate) => rate.id === selectedRateId) || rates[0]

  if (!selectedRate) return null

  const visibleRates = showAllRates ? rates : rates.slice(0, 2)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length)
  }

  const getBoardTypeIcon = (boardType: string) => {
    switch (boardType) {
      case 'All Inclusive':
        return 'restaurant_menu'
      case 'Full Board':
        return 'dinner_dining'
      case 'Half Board':
        return 'brunch_dining'
      case 'Bed & Breakfast':
        return 'free_breakfast'
      case 'Room Only':
      default:
        return 'bed'
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-all">
      <div className="flex flex-col md:flex-row">
        {/* Room Image Carousel - Landscape */}
        <div className="relative w-full md:w-72 aspect-[16/9] bg-slate-100 dark:bg-slate-700 flex-shrink-0">
          <img
            src={room.images[currentImageIndex]}
            alt={`${room.roomType} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Image Navigation */}
          {room.images.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm"
                aria-label="Previous image"
              >
                <span className="material-icons-round text-slate-900 dark:text-white text-base">chevron_left</span>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm"
                aria-label="Next image"
              >
                <span className="material-icons-round text-slate-900 dark:text-white text-base">chevron_right</span>
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-white text-xs font-medium">
                {currentImageIndex + 1} / {room.images.length}
              </div>
            </>
          )}
        </div>

        {/* Room Details */}
        <div className="flex-grow p-4">
          {/* Room Title & Info */}
          <div className="mb-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              {room.roomType}
            </h3>
            <div className="flex flex-wrap gap-3 text-xs text-slate-600 dark:text-slate-400">
              <span>{room.bedType}</span>
              <span>•</span>
              <span>{room.size}</span>
              <span>•</span>
              <span>{room.capacity > 1 ? `${room.capacity} guests` : `${room.capacity} guest`}</span>
            </div>
          </div>

          {/* Room Details Button */}
          <button
            onClick={() => onSelect?.(selectedRateId)}
            className="text-xs text-[#203C94] dark:text-[#0891B2] font-semibold hover:underline mb-3"
          >
            Room details
          </button>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {room.amenities.slice(0, 2).map((amenity, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 px-2 py-0.5 rounded"
              >
                <span className="material-icons-round text-xs">check_circle</span>
                {amenity}
              </span>
            ))}
          </div>

          {/* Board Type & Rate Options */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-2">
              Board Type
            </h4>

            {visibleRates.map((rate) => {
              const isSelected = rate.id === selectedRateId
              const totalPrice = rate.pricePerNight * nights

              return (
                <div
                  key={rate.id}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                >
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {rate.boardType}
                      </span>
                      {rate.oldPrice && (
                        <span className="text-xs text-green-600 dark:text-green-500 font-semibold">
                          +£{((rate.oldPrice - rate.pricePerNight) * nights).toFixed(0)}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      {rate.refundable ? (
                        <span className="text-green-600 dark:text-green-500">
                          Fully refundable
                        </span>
                      ) : (
                        <span className="text-amber-600 dark:text-amber-500">
                          Non-refundable
                        </span>
                      )}
                      {' • '}
                      <button
                        onClick={() => onSelect?.(rate.id)}
                        className="text-[#203C94] dark:text-[#0891B2] hover:underline"
                      >
                        Details
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 ml-4">
                    <div className="text-right">
                      {rate.oldPrice && (
                        <div className="text-xs text-slate-500 dark:text-slate-400 line-through">
                          £{rate.oldPrice.toFixed(0)}
                        </div>
                      )}
                      <div className="text-lg font-bold text-[#203C94] dark:text-[#0891B2]">
                        £{rate.pricePerNight.toFixed(0)}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedRateId(rate.id)
                        onAddToBasket?.(rate.id)
                      }}
                      className="px-4 h-9 bg-[#203C94] hover:bg-[#1A3994] dark:bg-[#0891B2] dark:hover:bg-[#06829A] text-white font-bold text-xs rounded transition-all flex-shrink-0"
                    >
                      Select
                    </button>
                  </div>
                </div>
              )
            })}

            {rates.length > visibleRates.length && (
              <button
                onClick={() => setShowAllRates(!showAllRates)}
                className="text-xs font-semibold text-[#203C94] dark:text-[#0891B2] hover:underline"
              >
                {showAllRates ? 'Show fewer options' : `+${rates.length - visibleRates.length} more options`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
