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

  const selectedRate = rates.find((rate) => rate.id === selectedRateId) || rates[0]

  if (!selectedRate) return null

  const visibleRates = showAllRates ? rates : rates.slice(0, 2)

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
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:border-slate-300 dark:hover:border-slate-600 transition-all">
      <div className="grid md:grid-cols-[280px,1fr] gap-0">
        {/* Room Image */}
        <div className="relative aspect-[4/3] md:aspect-auto bg-slate-100 dark:bg-slate-700">
          <img
            src={room.images[0]}
            alt={room.roomType}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-[#203C94] dark:bg-[#1A3994] text-white px-3 py-1 rounded-full text-xs font-bold">
            {room.roomType}
          </div>
        </div>

        {/* Room Details */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Room Info */}
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {room.roomType}
              </h3>

              {/* Room Specs */}
              <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="material-icons-round text-[#0891B2] text-lg">bed</span>
                  <span>{room.bedType}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-icons-round text-[#0891B2] text-lg">person</span>
                  <span>Up to {room.capacity} guests</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-icons-round text-[#0891B2] text-lg">square_foot</span>
                  <span>{room.size}</span>
                </div>
              </div>

              {/* Room Amenities */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {room.amenities.slice(0, 4).map((amenity, index) => (
                    <span
                      key={index}
                      className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="text-xs text-[#203C94] dark:text-[#0891B2] font-semibold px-2.5 py-1">
                      +{room.amenities.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Board Type Options */}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <h4 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-3 tracking-wide">
                  Choose your rate
                </h4>
                <div className="space-y-2">
                  {visibleRates.map((rate) => {
                    const totalForStay = rate.pricePerNight * nights
                    const isSelected = rate.id === selectedRateId

                    return (
                      <button
                        key={rate.id}
                        onClick={() => setSelectedRateId(rate.id)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-[#203C94] dark:border-[#0891B2] bg-[#203C94]/5 dark:bg-[#0891B2]/10'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="material-icons-round text-[#0891B2] text-lg">
                                {getBoardTypeIcon(rate.boardType)}
                              </span>
                              <span className="font-semibold text-slate-900 dark:text-white">
                                {rate.boardType}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              {rate.refundable ? (
                                <span className="flex items-center gap-1 text-green-600 dark:text-green-500">
                                  <span className="material-icons-round text-sm">check_circle</span>
                                  Free cancellation
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-amber-600 dark:text-amber-500">
                                  <span className="material-icons-round text-sm">block</span>
                                  Non-refundable
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="text-right flex-shrink-0 ml-4">
                            {rate.oldPrice && (
                              <div className="text-xs text-slate-500 dark:text-slate-400 line-through mb-0.5">
                                £{rate.oldPrice.toFixed(2)}
                              </div>
                            )}
                            <div className="font-bold text-slate-900 dark:text-white">
                              £{rate.pricePerNight.toFixed(2)}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">
                              per night
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}

                  {rates.length > 2 && (
                    <button
                      onClick={() => setShowAllRates(!showAllRates)}
                      className="w-full py-2 text-xs font-semibold text-[#203C94] dark:text-[#0891B2] hover:underline"
                    >
                      {showAllRates ? 'Show fewer rates' : `Show ${rates.length - 2} more rates`}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Price & Action */}
            <div className="flex-shrink-0 lg:w-56 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 pt-6 lg:pt-0 lg:pl-6">
              <div className="sticky top-24">
                <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  Total for {nights} {nights === 1 ? 'night' : 'nights'}
                </div>
                <div className="mb-1">
                  {selectedRate.oldPrice && (
                    <div className="text-sm text-slate-500 dark:text-slate-400 line-through">
                      £{(selectedRate.oldPrice * nights).toFixed(2)}
                    </div>
                  )}
                  <div className="text-3xl font-bold text-[#203C94] dark:text-[#0891B2]">
                    £{(selectedRate.pricePerNight * nights).toFixed(2)}
                  </div>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                  +£{selectedRate.taxesAndFees.toFixed(2)} taxes & fees
                </div>

                {selectedRate.oldPrice && (
                  <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold px-3 py-2 rounded-lg mb-4">
                    Save £{((selectedRate.oldPrice - selectedRate.pricePerNight) * nights).toFixed(2)}
                  </div>
                )}

                <button
                  onClick={() => onAddToBasket?.(selectedRateId)}
                  className="w-full h-11 bg-[#203C94] dark:bg-[#0891B2] text-white font-bold uppercase text-xs rounded-lg hover:bg-[#1A3994] dark:hover:bg-[#06829A] hover:shadow-lg transition-all active:scale-95 mb-2"
                >
                  Add to Basket
                </button>
                <button
                  onClick={() => onSelect?.(selectedRateId)}
                  className="w-full h-10 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-lg hover:border-[#203C94] dark:hover:border-[#0891B2] hover:text-[#203C94] dark:hover:text-[#0891B2] transition-all"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
