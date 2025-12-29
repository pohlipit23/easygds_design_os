// Design tokens: Primary Blue (#203C94), Teal (#0891B2), Slate neutral
// Typography: Raleway

import type { SearchParams } from '@/../product/sections/flight-booking/types'
import { useState } from 'react'

interface FiltersSidebarProps {
    searchParams: SearchParams
    availableAirlines: string[]
}

export function FiltersSidebar({ searchParams, availableAirlines }: FiltersSidebarProps) {
    const [isExpanded, setIsExpanded] = useState(true)

    return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                    <span className="material-icons-round text-[#203C94] dark:text-[#0891B2]">
                        tune
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white">Filters</h3>
                </div>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="lg:hidden w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                    <span className="material-icons-round text-xl">
                        {isExpanded ? 'expand_less' : 'expand_more'}
                    </span>
                </button>
            </div>

            {/* Filters */}
            <div className={`${isExpanded ? 'block' : 'hidden lg:block'}`}>
                <div className="p-5 space-y-6">
                    {/* Price Range */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
                            Price Range
                        </label>
                        <div className="space-y-3">
                            <input
                                type="range"
                                min="500"
                                max="2000"
                                step="50"
                                defaultValue="2000"
                                className="w-full accent-[#203C94] dark:accent-[#0891B2]"
                            />
                            <div className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-400">
                                <span>£500</span>
                                <span>£2000+</span>
                            </div>
                        </div>
                    </div>

                    {/* Stops */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
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
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                Airlines
                            </label>
                            <button className="text-sm text-[#0891B2] dark:text-[#0891B2] hover:text-[#203C94] dark:hover:text-white font-medium transition-colors">
                                Clear
                            </button>
                        </div>
                        <div className="space-y-2">
                            {availableAirlines.map(airline => (
                                <FilterCheckbox key={airline} label={airline} defaultChecked />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function FilterCheckbox({ label, count, defaultChecked }: { label: string, count?: number, defaultChecked?: boolean }) {
    return (
        <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    defaultChecked={defaultChecked}
                    className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-[#203C94] dark:text-[#0891B2] focus:ring-[#203C94] dark:focus:ring-[#0891B2] focus:ring-offset-0 transition-colors"
                />
                <span className="text-sm text-slate-700 dark:text-slate-200 group-hover:text-[#203C94] dark:group-hover:text-[#0891B2] transition-colors">
                    {label}
                </span>
            </div>
            {count !== undefined && (
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{count}</span>
            )}
        </label>
    )
}
