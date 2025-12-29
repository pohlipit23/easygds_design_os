import type { SearchParams } from '@/../product/sections/flight-booking/types'
import { useState } from 'react'

interface FiltersSidebarProps {
    searchParams: SearchParams
    availableAirlines: string[]
}

export function FiltersSidebar({ availableAirlines }: FiltersSidebarProps) {
    const [isExpanded, setIsExpanded] = useState(true)

    return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#203C94] dark:text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">Filters</h3>
                </div>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="lg:hidden w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isExpanded ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Filters */}
            <div className={`${isExpanded ? 'block' : 'hidden lg:block'}`}>
                <div className="p-5 space-y-6">
                    {/* Price Range */}
                    <div>
                        <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">
                            Price Range
                        </label>
                        <div className="space-y-3">
                            <input
                                type="range"
                                min="500"
                                max="2000"
                                step="50"
                                defaultValue="2000"
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#203C94] dark:accent-[#0891B2]"
                            />
                            <div className="flex justify-between text-sm font-semibold text-slate-600 dark:text-slate-400">
                                <span>£500</span>
                                <span>£2000+</span>
                            </div>
                        </div>
                    </div>

                    {/* Stops */}
                    <div>
                        <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">
                            Stops
                        </label>
                        <div className="space-y-2">
                            <FilterCheckbox label="Direct" count={5} />
                            <FilterCheckbox label="1 Stop" count={12} defaultChecked />
                            <FilterCheckbox label="2+ Stops" count={3} />
                        </div>
                    </div>

                    {/* Airlines */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-bold text-slate-900 dark:text-white">
                                Airlines
                            </label>
                            <button className="text-xs font-semibold text-[#0891B2] dark:text-[#0891B2] hover:text-[#203C94] dark:hover:text-[#0891B2] transition-colors px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                                Clear
                            </button>
                        </div>
                        <div className="space-y-2">
                            {availableAirlines.map(airline => (
                                <FilterCheckbox key={airline} label={airline} defaultChecked />
                            ))}
                        </div>
                    </div>

                    {/* Departure Time */}
                    <div>
                        <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">
                            Departure Time
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <TimeFilter label="Morning (06:00-12:00)" />
                            <TimeFilter label="Afternoon (12:00-18:00)" />
                            <TimeFilter label="Evening (18:00-00:00)" />
                            <TimeFilter label="Night (00:00-06:00)" />
                        </div>
                    </div>
                </div>

                {/* Apply Button */}
                <div className="p-5 border-t border-slate-200 dark:border-slate-700">
                    <button className="w-full py-3 bg-[#203C94] dark:bg-[#0891B2] text-white rounded-lg text-sm font-bold uppercase hover:bg-[#1a3076] dark:hover:bg-[#0e7490] transition-colors duration-200 shadow-md">
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    )
}

function FilterCheckbox({ label, count, defaultChecked }: { label: string, count?: number, defaultChecked?: boolean }) {
    return (
        <label className="flex items-center justify-between cursor-pointer group py-1">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    defaultChecked={defaultChecked}
                    className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-[#203C94] dark:text-[#0891B2] focus:ring-[#203C94] dark:focus:ring-[#0891B2] focus:ring-offset-0 transition-colors cursor-pointer"
                />
                <span className="text-sm text-slate-700 dark:text-slate-200 group-hover:text-[#203C94] dark:group-hover:text-[#0891B2] transition-colors font-medium cursor-pointer">
                    {label}
                </span>
            </div>
            {count !== undefined && (
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">{count}</span>
            )}
        </label>
    )
}

function TimeFilter({ label }: { label: string }) {
    return (
        <label className="flex items-center justify-between cursor-pointer group">
            <input type="checkbox" className="sr-only peer" />
            <span className="text-xs text-slate-700 dark:text-slate-200 group-hover:text-[#203C94] dark:group-hover:text-[#0891B2] transition-colors font-medium cursor-pointer flex-1">
                {label}
            </span>
            <div className="w-10 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer-checked:bg-[#203C94] dark:peer-checked:bg-[#0891B2] relative transition-colors duration-200">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform duration-200 shadow-sm"></div>
            </div>
        </label>
    )
}
