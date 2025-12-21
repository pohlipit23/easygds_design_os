import { useState } from 'react'

// Design tokens: Primary Blue (#203C94), Teal (#0891B2), Slate neutral
// Typography: Raleway

interface FilterPanelProps {
  filters: {
    priceRange?: { min: number; max: number }
    starRating?: number[]
    guestRating?: number
    locations?: string[]
    hotelName?: string
    refundableOnly?: boolean
    boardTypes?: Array<'Room Only' | 'Bed & Breakfast' | 'Half Board' | 'Full Board' | 'All Inclusive'>
  }
  availableLocations: string[]
  onFilterChange?: (filters: FilterPanelProps['filters']) => void
  onReset?: () => void
}

export function FilterPanel({
  filters,
  availableLocations,
  onFilterChange,
  onReset,
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const starRatings = [5, 4, 3]
  const boardTypeOptions: Array<'Room Only' | 'Bed & Breakfast' | 'Half Board' | 'Full Board' | 'All Inclusive'> = [
    'Room Only',
    'Bed & Breakfast',
    'Half Board',
    'Full Board',
    'All Inclusive',
  ]

  const handlePriceChange = (min: number, max: number) => {
    onFilterChange?.({ ...filters, priceRange: { min, max } })
  }

  const handleStarRatingToggle = (rating: number) => {
    const current = filters.starRating || []
    const updated = current.includes(rating)
      ? current.filter((r) => r !== rating)
      : [...current, rating]
    onFilterChange?.({ ...filters, starRating: updated.length > 0 ? updated : undefined })
  }

  const handleGuestRatingChange = (rating: number) => {
    onFilterChange?.({ ...filters, guestRating: rating === filters.guestRating ? undefined : rating })
  }

  const handleLocationToggle = (location: string) => {
    const current = filters.locations || []
    const updated = current.includes(location)
      ? current.filter((l) => l !== location)
      : [...current, location]
    onFilterChange?.({ ...filters, locations: updated.length > 0 ? updated : undefined })
  }

  const handleBoardTypeToggle = (boardType: typeof boardTypeOptions[number]) => {
    const current = filters.boardTypes || []
    const updated = current.includes(boardType)
      ? current.filter((b) => b !== boardType)
      : [...current, boardType]
    onFilterChange?.({ ...filters, boardTypes: updated.length > 0 ? updated : undefined })
  }

  const handleRefundableToggle = () => {
    onFilterChange?.({ ...filters, refundableOnly: !filters.refundableOnly })
  }

  const handleNameSearch = (name: string) => {
    onFilterChange?.({ ...filters, hotelName: name || undefined })
  }

  const activeFilterCount = [
    filters.priceRange,
    filters.starRating?.length,
    filters.guestRating,
    filters.locations?.length,
    filters.hotelName,
    filters.refundableOnly,
    filters.boardTypes?.length,
  ].filter(Boolean).length

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <span className="material-icons-round text-[#203C94] dark:text-[#0891B2]">
            tune
          </span>
          <h3 className="font-bold text-slate-900 dark:text-white">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="bg-[#203C94] dark:bg-[#0891B2] text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={onReset}
              className="text-sm text-[#0891B2] dark:text-[#0891B2] hover:text-[#203C94] dark:hover:text-white font-medium transition-colors"
            >
              Clear all
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <span className="material-icons-round text-xl">
              {isExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className={`${isExpanded ? 'block' : 'hidden md:block'}`}>
        <div className="p-5 space-y-6">
          {/* Hotel Name Search */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
              Hotel name
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.hotelName || ''}
                onChange={(e) => handleNameSearch(e.target.value)}
                placeholder="Search by name..."
                className="w-full px-4 py-2.5 pl-10 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#203C94] dark:focus:ring-[#0891B2] focus:border-transparent transition-shadow"
              />
              <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                search
              </span>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
              Price per night
            </label>
            <div className="space-y-3">
              <div className="flex gap-3">
                <input
                  type="number"
                  value={filters.priceRange?.min || 0}
                  onChange={(e) =>
                    handlePriceChange(Number(e.target.value), filters.priceRange?.max || 2000)
                  }
                  placeholder="Min"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#203C94] dark:focus:ring-[#0891B2] focus:border-transparent"
                />
                <input
                  type="number"
                  value={filters.priceRange?.max || 2000}
                  onChange={(e) =>
                    handlePriceChange(filters.priceRange?.min || 0, Number(e.target.value))
                  }
                  placeholder="Max"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#203C94] dark:focus:ring-[#0891B2] focus:border-transparent"
                />
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={filters.priceRange?.max || 2000}
                onChange={(e) =>
                  handlePriceChange(filters.priceRange?.min || 0, Number(e.target.value))
                }
                className="w-full accent-[#203C94] dark:accent-[#0891B2]"
              />
            </div>
          </div>

          {/* Star Rating */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
              Star rating
            </label>
            <div className="space-y-2">
              {starRatings.map((rating) => (
                <label
                  key={rating}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.starRating?.includes(rating) || false}
                    onChange={() => handleStarRatingToggle(rating)}
                    className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-[#203C94] dark:text-[#0891B2] focus:ring-[#203C94] dark:focus:ring-[#0891B2] focus:ring-offset-0 transition-colors"
                  />
                  <div className="flex gap-0.5">
                    {Array.from({ length: rating }).map((_, i) => (
                      <span key={i} className="material-icons-round text-[#FFB800] text-base">
                        star
                      </span>
                    ))}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Guest Rating */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
              Guest rating
            </label>
            <div className="flex flex-wrap gap-2">
              {[9, 8, 7, 6].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleGuestRatingChange(rating)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filters.guestRating === rating
                      ? 'bg-[#203C94] dark:bg-[#0891B2] text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {rating}+
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
              Location
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableLocations.map((location) => (
                <label
                  key={location}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.locations?.includes(location) || false}
                    onChange={() => handleLocationToggle(location)}
                    className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-[#203C94] dark:text-[#0891B2] focus:ring-[#203C94] dark:focus:ring-[#0891B2] focus:ring-offset-0 transition-colors"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-200 group-hover:text-[#203C94] dark:group-hover:text-[#0891B2] transition-colors">
                    {location}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Board Type */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
              Board type
            </label>
            <div className="space-y-2">
              {boardTypeOptions.map((boardType) => (
                <label
                  key={boardType}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.boardTypes?.includes(boardType) || false}
                    onChange={() => handleBoardTypeToggle(boardType)}
                    className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-[#203C94] dark:text-[#0891B2] focus:ring-[#203C94] dark:focus:ring-[#0891B2] focus:ring-offset-0 transition-colors"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-200 group-hover:text-[#203C94] dark:group-hover:text-[#0891B2] transition-colors">
                    {boardType}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Refundable Only */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.refundableOnly || false}
                onChange={handleRefundableToggle}
                className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-[#203C94] dark:text-[#0891B2] focus:ring-[#203C94] dark:focus:ring-[#0891B2] focus:ring-offset-0 transition-colors"
              />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-[#203C94] dark:group-hover:text-[#0891B2] transition-colors">
                Free cancellation only
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
