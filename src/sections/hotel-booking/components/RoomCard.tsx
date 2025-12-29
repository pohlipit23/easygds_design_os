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
  onAddToBasket?: (rateId: string) => void
}

const BOARD_TYPE_ORDER: RoomRate['boardType'][] = [
  'Room Only',
  'Bed & Breakfast',
  'Half Board',
  'Full Board',
  'All Inclusive',
]

export function RoomCard({ room, rates, onAddToBasket }: RoomCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (rates.length === 0) return null

  const groupedRates = BOARD_TYPE_ORDER.reduce((acc, boardType) => {
    const boardRates = rates.filter((r) => r.boardType === boardType)
    if (boardRates.length > 0) {
      acc[boardType] = {
        refundable: boardRates.find((r) => r.refundable),
        nonRefundable: boardRates.find((r) => !r.refundable),
      }
    }
    return acc
  }, {} as Record<string, { refundable?: RoomRate; nonRefundable?: RoomRate }>)

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-all">
      <div className="flex flex-col md:flex-row">
        {/* Room Image Carousel */}
        <div className="relative w-full md:w-[240px] flex-shrink-0 flex flex-col">
          <div className="relative h-48 md:h-[160px] bg-slate-100 dark:bg-slate-700">
            <img
              src={room.images[currentImageIndex]}
              alt={`${room.roomType} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />

            {room.images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length)}
                  className="absolute top-1/2 left-2 -translate-y-1/2 w-7 h-7 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 rounded-full shadow-md flex items-center justify-center"
                  aria-label="Previous image"
                >
                  <span className="material-icons-round text-slate-900 dark:text-white text-lg">chevron_left</span>
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % room.images.length)}
                  className="absolute top-1/2 right-2 -translate-y-1/2 w-7 h-7 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 rounded-full shadow-md flex items-center justify-center"
                  aria-label="Next image"
                >
                  <span className="material-icons-round text-slate-900 dark:text-white text-lg">chevron_right</span>
                </button>
              </>
            )}
          </div>

          {room.images.length > 1 && (
            <div className="flex gap-1 p-2">
              {room.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-10 h-8 rounded overflow-hidden border-2 ${
                    index === currentImageIndex
                      ? 'border-[#203C94] dark:border-[#0891B2] opacity-100'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={room.images[index]}
                    alt={`${room.roomType} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Room Details */}
        <div className="flex-grow px-4 py-4 flex flex-col gap-3">
          {/* Room Title & Info */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              {room.roomType}
            </h3>
            <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-400">
              <span>{room.bedType}</span>
              <span>•</span>
              <span>{room.size}</span>
              <span>•</span>
              <span>{room.capacity > 1 ? `${room.capacity} guests` : `${room.capacity} guest`}</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
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

          {/* Rate Options Grouped by Board Type */}
          <div className="space-y-2 mt-1">
            {Object.entries(groupedRates).map(([boardType, rateGroup]) => (
              <div key={boardType} className="border border-slate-200 dark:border-slate-700 rounded-lg p-2">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  {boardType}
                </div>
                <div className="space-y-2">
                  {rateGroup.refundable && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-emerald-600 dark:text-emerald-500 font-medium">
                          Fully refundable
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {rateGroup.refundable.oldPrice && (
                          <span className="text-xs text-slate-500 dark:text-slate-400 line-through">
                            £{rateGroup.refundable.oldPrice.toFixed(0)}
                          </span>
                        )}
                        <span className="text-sm font-bold text-[#203C94] dark:text-[#0891B2]">
                          £{rateGroup.refundable.pricePerNight.toFixed(0)}
                        </span>
                        <button
                          onClick={() => onAddToBasket?.(rateGroup.refundable!.id)}
                          className="px-3 h-7 bg-[#203C94] hover:bg-[#1A3994] dark:bg-[#0891B2] dark:hover:bg-[#06829A] text-white font-bold text-xs rounded transition-all"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  )}
                  {rateGroup.nonRefundable && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-amber-600 dark:text-amber-500 font-medium">
                          Non-refundable
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {rateGroup.nonRefundable.oldPrice && (
                          <span className="text-xs text-slate-500 dark:text-slate-400 line-through">
                            £{rateGroup.nonRefundable.oldPrice.toFixed(0)}
                          </span>
                        )}
                        <span className="text-sm font-bold text-[#203C94] dark:text-[#0891B2]">
                          £{rateGroup.nonRefundable.pricePerNight.toFixed(0)}
                        </span>
                        <button
                          onClick={() => onAddToBasket?.(rateGroup.nonRefundable!.id)}
                          className="px-3 h-7 bg-[#203C94] hover:bg-[#1A3994] dark:bg-[#0891B2] dark:hover:bg-[#06829A] text-white font-bold text-xs rounded transition-all"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
