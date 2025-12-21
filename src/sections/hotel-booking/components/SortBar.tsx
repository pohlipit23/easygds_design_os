// Design tokens: Primary Blue (#203C94), Teal (#0891B2), Slate neutral
// Typography: Raleway

interface SortBarProps {
  resultCount: number
  sortBy: 'price-low-high' | 'price-high-low' | 'star-rating' | 'guest-rating' | 'recommended'
  viewMode: 'list' | 'map'
  onSortChange?: (sortBy: SortBarProps['sortBy']) => void
  onViewModeToggle?: () => void
}

export function SortBar({
  resultCount,
  sortBy,
  viewMode,
  onSortChange,
  onViewModeToggle,
}: SortBarProps) {
  const sortOptions: Array<{
    value: SortBarProps['sortBy']
    label: string
    icon: string
  }> = [
    { value: 'recommended', label: 'Recommended', icon: 'thumb_up' },
    { value: 'price-low-high', label: 'Price: Low to High', icon: 'arrow_upward' },
    { value: 'price-high-low', label: 'Price: High to Low', icon: 'arrow_downward' },
    { value: 'star-rating', label: 'Star Rating', icon: 'star' },
    { value: 'guest-rating', label: 'Guest Rating', icon: 'grade' },
  ]

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center justify-between gap-4">
      {/* Result Count */}
      <div className="flex items-center gap-2">
        <span className="material-icons-round text-[#203C94] dark:text-[#0891B2] text-xl">
          hotel
        </span>
        <span className="text-sm font-bold text-slate-900 dark:text-white">
          {resultCount} {resultCount === 1 ? 'hotel' : 'hotels'} found
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600 dark:text-slate-300 hidden sm:inline">
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange?.(e.target.value as SortBarProps['sortBy'])}
            className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#203C94] dark:focus:ring-[#0891B2] focus:border-transparent transition-shadow cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
          <button
            onClick={() => viewMode === 'map' && onViewModeToggle?.()}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
              viewMode === 'list'
                ? 'bg-white dark:bg-slate-700 text-[#203C94] dark:text-[#0891B2] shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            aria-label="List view"
          >
            <span className="material-icons-round text-lg">view_list</span>
            <span className="hidden sm:inline">List</span>
          </button>
          <button
            onClick={() => viewMode === 'list' && onViewModeToggle?.()}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
              viewMode === 'map'
                ? 'bg-white dark:bg-slate-700 text-[#203C94] dark:text-[#0891B2] shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            aria-label="Map view"
          >
            <span className="material-icons-round text-lg">map</span>
            <span className="hidden sm:inline">Map</span>
          </button>
        </div>
      </div>
    </div>
  )
}
