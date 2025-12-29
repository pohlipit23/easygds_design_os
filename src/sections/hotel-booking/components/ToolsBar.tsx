// Design tokens: Primary Blue (#203C94), Slate neutral
// Typography: Raleway

interface ToolsBarProps {
  destination: string
  resultCount: number
  searchQuery?: string
  viewMode: 'list' | 'map'
  onSearchChange?: (query: string) => void
  onFiltersClick?: () => void
  onViewModeToggle?: () => void
}

export function ToolsBar({
  destination,
  resultCount,
  searchQuery = '',
  viewMode,
  onSearchChange,
  onFiltersClick,
  onViewModeToggle,
}: ToolsBarProps) {
  return (
    <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-30 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Title & Count */}
          <div className="flex items-center gap-2">
            <h1 className="text-lg md:text-xl font-semibold text-slate-700 dark:text-slate-200">
              Stays in <span className="text-[#203C94] dark:text-[#0891B2]">{destination}</span>
            </h1>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-600 hidden md:block"></div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {resultCount} {resultCount === 1 ? 'result' : 'results'}
            </p>
          </div>

          {/* Controls */}
          <div className="flex gap-2 w-full md:w-auto items-center">
            {/* Search Input */}
            <div className="relative flex-1 md:flex-initial md:w-56 group">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 material-icons-round text-slate-400 dark:text-slate-500 text-lg"
                aria-hidden="true"
              >
                search
              </span>
              <input
                type="text"
                placeholder="Search hotel..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full pl-10 pr-3 h-10 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-[#203C94]/20 dark:focus:ring-[#0891B2]/20 focus:border-[#203C94] dark:focus:border-[#0891B2] shadow-sm transition-all"
                aria-label="Search hotels"
              />
            </div>

            {/* Filters Button */}
            <button
              onClick={onFiltersClick}
              className="flex items-center justify-center gap-2 px-3 md:px-4 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-bold uppercase hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm shrink-0"
            >
              <span className="material-icons-round text-lg">tune</span>
              <span className="hidden sm:inline">Filters</span>
            </button>

            {/* View Mode Toggle */}
            <button
              onClick={onViewModeToggle}
              className={`flex items-center justify-center gap-2 px-3 md:px-4 h-10 rounded-lg text-xs font-bold uppercase transition-all whitespace-nowrap shadow-sm hover:shadow-md shrink-0 active:scale-95 ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-800 border border-[#203C94] dark:border-[#0891B2] text-[#203C94] dark:text-[#0891B2] hover:bg-[#203C94] hover:text-white dark:hover:bg-[#0891B2]'
                  : 'bg-[#203C94] dark:bg-[#0891B2] text-white shadow-md'
              }`}
            >
              <span className="material-icons-round text-lg">
                {viewMode === 'list' ? 'map' : 'view_list'}
              </span>
              <span className="hidden sm:inline">{viewMode === 'list' ? 'Map View' : 'List View'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
