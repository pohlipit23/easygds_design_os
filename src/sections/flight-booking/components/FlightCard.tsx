// Design tokens: Primary Blue (#203C94), Teal (#0891B2), Gold (#FFB800), Slate neutral
// Typography: Raleway

import type { FlightOffer } from '@/../product/sections/flight-booking/types'

interface FlightCardProps {
    offer: FlightOffer
    isSelected?: boolean
    onSelect: () => void
    onViewDetails: () => void
}

export function FlightCard({ offer, isSelected, onSelect, onViewDetails }: FlightCardProps) {
    // Format times to 24h format (HH:MM)
    const formatTime = (isoString: string) => {
        const date = new Date(isoString)
        return date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
    }

    // Check if arrival is next day
    const isNextDay = new Date(offer.arrival.time).getDate() !== new Date(offer.departure.time).getDate()

    return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden transition-shadow duration-200 ease-out hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            {/* Main Card Content */}
            <div className="p-5">
                <div className="flex items-center gap-5">
                    {/* Airline Logo & Info */}
                    <div className="flex items-start gap-3 w-36 shrink-0">
                        <div className="w-12 h-12 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 flex items-center justify-center shrink-0">
                            <img
                                src={offer.airline.logo}
                                alt={offer.airline.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight mb-1">
                                {offer.airline.name}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                                {offer.flightNumber} • {offer.cabin}
                            </p>
                        </div>
                    </div>

                    {/* Flight Timeline */}
                    <div className="flex-1 flex items-center justify-between gap-6">
                        {/* Departure */}
                        <div className="text-left">
                            <div className="text-xl font-bold text-slate-900 dark:text-white leading-none mb-1.5">
                                {formatTime(offer.departure.time)}
                            </div>
                            <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                                {offer.departure.airport.code}
                            </div>
                        </div>

                        {/* Flight Path */}
                        <div className="flex-1 flex flex-col items-center max-w-[220px]">
                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
                                {offer.duration}
                            </div>
                            <div className="w-full relative flex items-center">
                                {/* Dots and Line */}
                                <div className="h-2 w-2 rounded-full bg-[#0891B2] shrink-0"></div>
                                <div className="flex-1 h-[1px] bg-slate-300 dark:bg-slate-600 relative">
                                    {/* Plane Icon */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 px-1.5">
                                        <span className="material-icons-round text-slate-400 dark:text-slate-500 text-sm transform rotate-90">
                                            flight
                                        </span>
                                    </div>
                                </div>
                                <div className="h-2 w-2 rounded-full bg-[#203C94] shrink-0"></div>
                            </div>
                            <div className="text-xs mt-2 font-medium text-slate-600 dark:text-slate-400">
                                {offer.stops === 0 ? 'Direct' : `${offer.stops} Stop${offer.stops > 1 ? 's' : ''}`}
                            </div>

                            {/* Layover Badge - Subtle */}
                            {offer.layover && (
                                <div className="mt-2 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 px-2.5 py-0.5 rounded text-[10px] font-semibold inline-flex items-center gap-1">
                                    <span className="material-icons-round text-[10px]">schedule</span>
                                    <span>{offer.layover.duration} {offer.layover.airport.code}</span>
                                </div>
                            )}
                        </div>

                        {/* Arrival */}
                        <div className="text-right">
                            <div className="text-xl font-bold text-slate-900 dark:text-white leading-none mb-1.5">
                                {formatTime(offer.arrival.time)}
                                {isNextDay && (
                                    <sup className="text-xs font-bold text-amber-600 dark:text-amber-500 ml-1">+1</sup>
                                )}
                            </div>
                            <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                                {offer.arrival.airport.code}
                            </div>
                        </div>
                    </div>

                    {/* Price & Action */}
                    <div className="flex flex-col items-end justify-center gap-3 w-32 shrink-0">
                        <div className="text-right">
                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">from</div>
                            <div className="text-2xl font-bold text-[#203C94] dark:text-[#0891B2] leading-none">
                                £{offer.price.amount}
                            </div>
                            {offer.price.note && (
                                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-tight">
                                    {offer.price.note}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={onSelect}
                            className="px-6 h-11 bg-[#203C94] dark:bg-[#0891B2] text-white rounded-lg text-xs font-bold uppercase hover:bg-[#1a3076] dark:hover:bg-[#0e7490] shadow-md w-full transition-all duration-200 ease-out hover:shadow-lg active:scale-95"
                            aria-label={isSelected ? 'Flight selected' : 'Select this flight'}
                        >
                            {isSelected ? 'Selected' : 'Select Flight'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Details Expander */}
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onViewDetails()
                }}
                className="w-full border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 py-2.5 flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400 hover:text-[#203C94] dark:hover:text-[#0891B2] font-medium transition-colors duration-150 ease-out group"
                aria-label="View flight details and fare rules"
            >
                Flight details & fare rules
                <span className="material-icons-round text-base transition-transform duration-150 ease-out group-hover:translate-y-0.5">
                    expand_more
                </span>
            </button>
        </div>
    )
}
