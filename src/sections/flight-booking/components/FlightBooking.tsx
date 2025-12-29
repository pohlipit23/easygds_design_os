// Design tokens: Primary Blue (#203C94), Teal (#0891B2), Gold (#FFB800), Slate neutral
// Typography: Raleway

import type { FlightBookingProps } from '@/../product/sections/flight-booking/types'
import { FlightCard } from './FlightCard'
import { FiltersSidebar } from './FiltersSidebar'
import { useState } from 'react'

export function FlightBooking({
    searchParams,
    outboundOffers,
    returnOffers,
    onSelectOutbound,
    onSelectReturn,
    onViewDetails
}: FlightBookingProps) {

    const [selectedOutboundId, setSelectedOutboundId] = useState<string | null>(null)
    const [selectedReturnId, setSelectedReturnId] = useState<string | null>(null)

    const handleSelectOutbound = (id: string) => {
        setSelectedOutboundId(id)
        onSelectOutbound(id)
        if (!selectedReturnId) {
            setTimeout(() => {
                document.getElementById('return-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 300)
        }
    }

    const handleSelectReturn = (id: string) => {
        setSelectedReturnId(id)
        onSelectReturn(id)
    }

    const airlines = Array.from(new Set([
        ...outboundOffers.map(o => o.airline.name),
        ...returnOffers.map(o => o.airline.name)
    ]))

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 pb-20">
            <main className="container mx-auto px-4 md:px-6 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* Left Sidebar Filters */}
                    <div className="hidden lg:block lg:col-span-1">
                        <FiltersSidebar searchParams={searchParams} availableAirlines={airlines} />
                    </div>

                    {/* Main Results Area */}
                    <div className="lg:col-span-3 space-y-8">

                        {/* Outbound Section */}
                        <section id="outbound-section" className="scroll-mt-24">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-[#203C94] dark:bg-[#0891B2] flex items-center justify-center shrink-0">
                                    <span className="material-icons-round text-white text-lg" aria-hidden="true">flight_takeoff</span>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Select Outbound Flight</h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                        {searchParams.origin.city} to {searchParams.destination.city} • {new Date(searchParams.departureDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {outboundOffers.map(offer => (
                                    <FlightCard
                                        key={offer.id}
                                        offer={offer}
                                        isSelected={selectedOutboundId === offer.id}
                                        onSelect={() => handleSelectOutbound(offer.id)}
                                        onViewDetails={() => onViewDetails(offer.id)}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Return Section */}
                        <section
                            id="return-section"
                            className={`
                        scroll-mt-24 transition-opacity duration-200 ease-out
                        ${selectedOutboundId ? 'opacity-100' : 'opacity-30 pointer-events-none'}
                    `}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-[#203C94] dark:bg-[#0891B2] flex items-center justify-center shrink-0">
                                    <span className="material-icons-round text-white text-lg" aria-hidden="true">flight_land</span>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Select Return Flight</h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                        {searchParams.destination.city} to {searchParams.origin.city} • {new Date(searchParams.returnDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {returnOffers.map(offer => (
                                    <FlightCard
                                        key={offer.id}
                                        offer={offer}
                                        isSelected={selectedReturnId === offer.id}
                                        onSelect={() => handleSelectReturn(offer.id)}
                                        onViewDetails={() => onViewDetails(offer.id)}
                                    />
                                ))}
                            </div>
                        </section>

                    </div>
                </div>
            </main>

            {/* Floating Bottom Bar */}
            <div
                className={`
                    fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-4 py-4 z-50
                    transform transition-transform duration-200 ease-out
                    shadow-[0_-4px_12px_rgba(0,0,0,0.1)]
                    ${selectedOutboundId && selectedReturnId ? 'translate-y-0' : 'translate-y-full'}
                `}
                role="complementary"
                aria-label="Booking summary"
            >
                <div className="container mx-auto flex items-center justify-between max-w-4xl">
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Total Price</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-[#203C94] dark:text-[#0891B2]">
                                £{
                                    (outboundOffers.find(o => o.id === selectedOutboundId)?.price.amount || 0) +
                                    (returnOffers.find(r => r.id === selectedReturnId)?.price.amount || 0)
                                }
                            </span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">per person</span>
                        </div>
                    </div>
                    <button
                        className="px-6 h-11 bg-[#203C94] dark:bg-[#0891B2] text-white rounded-lg text-xs font-bold uppercase hover:bg-[#1a3076] dark:hover:bg-[#0e7490] shadow-md transition-all duration-200 ease-out hover:shadow-lg active:scale-95"
                        aria-label="Continue to checkout"
                    >
                        Continue
                    </button>
                </div>
            </div>

        </div>
    )
}
