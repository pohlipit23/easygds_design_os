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

    const [selectedOutbound, setSelectedOutbound] = useState<{ offerId: string; fareFamily: string } | null>(null)
    const [selectedReturn, setSelectedReturn] = useState<{ offerId: string; fareFamily: string } | null>(null)

    const handleSelectOutboundFareFamily = (offerId: string, fareFamily: string) => {
        setSelectedOutbound({ offerId, fareFamily })
        onSelectOutbound(offerId)
    }

    const handleSelectReturnFareFamily = (offerId: string, fareFamily: string) => {
        setSelectedReturn({ offerId, fareFamily })
        onSelectReturn(offerId)
    }

    const getOutboundPrice = () => {
        if (!selectedOutbound) return 0
        const offer = outboundOffers.find(o => o.id === selectedOutbound.offerId)
        if (!offer) return 0
        const basePrice = offer.price.amount
        if (selectedOutbound.fareFamily === 'Economy Light') return basePrice - 50
        if (selectedOutbound.fareFamily === 'Economy Flex') return basePrice + 100
        return basePrice
    }

    const getReturnPrice = () => {
        if (!selectedReturn) return 0
        const offer = returnOffers.find(o => o.id === selectedReturn.offerId)
        if (!offer) return 0
        const basePrice = offer.price.amount
        if (selectedReturn.fareFamily === 'Economy Light') return basePrice - 50
        if (selectedReturn.fareFamily === 'Economy Flex') return basePrice + 100
        return basePrice
    }

    const airlines = Array.from(new Set([
        ...outboundOffers.map(o => o.airline.name),
        ...returnOffers.map(o => o.airline.name)
    ]))

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 pb-24">
            <main className="container mx-auto px-4 md:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Left Sidebar Filters */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-24">
                            <FiltersSidebar searchParams={searchParams} availableAirlines={airlines} />
                        </div>
                    </div>

                    {/* Main Results Area */}
                    <div className="lg:col-span-3 space-y-10">

                        {/* Outbound Section */}
                        <section id="outbound-section" className="scroll-mt-28">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-[#203C94] dark:bg-[#0891B2] flex items-center justify-center shrink-0 shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Outbound Flight</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                        {searchParams.origin.city} to {searchParams.destination.city} • {new Date(searchParams.departureDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {outboundOffers.map(offer => (
                                    <FlightCard
                                        key={offer.id}
                                        offer={offer}
                                        type="outbound"
                                        selectedFareFamily={selectedOutbound?.offerId === offer.id ? selectedOutbound.fareFamily : undefined}
                                        onSelectFareFamily={(fareFamily) => {
                                            handleSelectOutboundFareFamily(offer.id, fareFamily)
                                            setTimeout(() => {
                                                document.getElementById('return-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                            }, 300)
                                        }}
                                        onViewDetails={() => onViewDetails(offer.id)}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Return Section */}
                        <section
                            id="return-section"
                            className={`
                                scroll-mt-28 transition-opacity duration-300 ease-out
                                ${selectedOutbound ? 'opacity-100' : 'opacity-40 pointer-events-none grayscale'}
                            `}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-[#203C94] dark:bg-[#0891B2] flex items-center justify-center shrink-0 shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Return Flight</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                        {searchParams.destination.city} to {searchParams.origin.city} • {new Date(searchParams.returnDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                                    </p>
                                </div>
                                {!selectedOutbound && (
                                    <span className="ml-auto px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold rounded-full">
                                        Select outbound first
                                    </span>
                                )}
                            </div>

                            <div className="space-y-4">
                                {returnOffers.map(offer => (
                                    <FlightCard
                                        key={offer.id}
                                        offer={offer}
                                        type="return"
                                        selectedFareFamily={selectedReturn?.offerId === offer.id ? selectedReturn.fareFamily : undefined}
                                        onSelectFareFamily={(fareFamily) => handleSelectReturnFareFamily(offer.id, fareFamily)}
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
                    fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-4 py-5 z-50
                    transform transition-transform duration-300 ease-out
                    shadow-[0_-8px_24px_rgba(0,0,0,0.12)]
                    ${selectedOutbound && selectedReturn ? 'translate-y-0' : 'translate-y-full'}
                `}
                role="complementary"
                aria-label="Booking summary"
            >
                <div className="container mx-auto flex items-center justify-between max-w-6xl">
                    <div className="flex items-center gap-8">
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">Total Price</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-[#203C94] dark:text-[#0891B2]">
                                    £{getOutboundPrice() + getReturnPrice()}
                                </span>
                                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">per person</span>
                            </div>
                        </div>
                        {selectedOutbound && (
                            <div className="hidden md:block">
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">Outbound</p>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{selectedOutbound.fareFamily}</p>
                            </div>
                        )}
                        {selectedReturn && (
                            <div className="hidden md:block">
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">Return</p>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{selectedReturn.fareFamily}</p>
                            </div>
                        )}
                    </div>
                    <button
                        className="px-8 py-4 bg-[#203C94] dark:bg-[#0891B2] text-white rounded-xl text-sm font-bold uppercase hover:bg-[#1a3076] dark:hover:bg-[#0e7490] shadow-lg transition-all duration-200 ease-out hover:shadow-xl active:scale-95"
                        aria-label="Continue to checkout"
                    >
                        Continue to Checkout
                    </button>
                </div>
            </div>

        </div>
    )
}
