import { useState } from 'react'
import type { FlightOffer } from '@/../product/sections/flight-booking/types'

interface FlightSegment {
    flightNumber: string
    from: string
    to: string
    departTime: string
    arriveTime: string
    duration: string
}

interface FareFamily {
    name: string
    price: number
    currency: string
    features: string[]
    badge?: string
    highlighted?: boolean
}

interface FlightCardProps {
    offer: FlightOffer
    type: 'outbound' | 'return'
    selectedFareFamily?: string
    onSelectFareFamily: (fareFamily: string) => void
    onViewDetails: () => void
}

export function FlightCard({ offer, selectedFareFamily, onSelectFareFamily, onViewDetails }: FlightCardProps) {
    const [isFareExpanded, setIsFareExpanded] = useState(false)
    const [isItineraryExpanded, setIsItineraryExpanded] = useState(false)

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
    }

    const formatPrice = (price: number, currency: string) => {
        if (currency === 'GBP') {
            return `£${price.toLocaleString()}`
        }
        return `${currency}${price.toLocaleString()}`
    }

    const isNextDay = new Date(offer.arrival.time).getDate() !== new Date(offer.departure.time).getDate()

    const fareFamilies: FareFamily[] = [
        {
            name: 'Economy Light',
            price: offer.price.amount - 50,
            currency: offer.price.currency,
            features: ['7kg carry-on', 'Seat selection extra', 'No changes'],
            badge: 'Best Value'
        },
        {
            name: 'Economy Standard',
            price: offer.price.amount,
            currency: offer.price.currency,
            features: ['23kg checked bag', 'Seat selection included', 'Changes for fee'],
            highlighted: true
        },
        {
            name: 'Economy Flex',
            price: offer.price.amount + 100,
            currency: offer.price.currency,
            features: ['2x 23kg bags', 'Premium seat included', 'Free changes', 'Refundable'],
            badge: 'Most Flexible'
        }
    ]

    const lowestPrice = Math.min(...fareFamilies.map(f => f.price))

    const flightSegments: FlightSegment[] = offer.layover
        ? [
            {
                flightNumber: offer.flightNumber,
                from: offer.departure.airport.code,
                to: offer.layover.airport.code,
                departTime: offer.departure.time,
                arriveTime: new Date(new Date(offer.departure.time).getTime() + (24 * 60 * 60 * 1000 - (2 * 60 * 60 * 1000))).toISOString(),
                duration: '12h 30m'
            },
            {
                flightNumber: offer.flightNumber.replace(/MH(\d+)/, (_, num) => `MH${parseInt(num) + 1}`),
                from: offer.layover.airport.code,
                to: offer.arrival.airport.code,
                departTime: new Date(new Date(offer.departure.time).getTime() + (24 * 60 * 60 * 1000 - (2 * 60 * 60 * 1000) + (2 * 60 * 60 * 1000))).toISOString(),
                arriveTime: offer.arrival.time,
                duration: '12h 20m'
            }
        ]
        : [
            {
                flightNumber: offer.flightNumber,
                from: offer.departure.airport.code,
                to: offer.arrival.airport.code,
                departTime: offer.departure.time,
                arriveTime: offer.arrival.time,
                duration: offer.duration
            }
        ]

    const flightNumbers = flightSegments.map(s => s.flightNumber).join(' / ')

    return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow duration-300">
            {/* Main Flight Summary */}
            <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Airline Info */}
                    <div className="flex items-center gap-4 md:w-48">
                        <img
                            src={offer.airline.logo}
                            alt={offer.airline.name}
                            className="w-14 h-14 object-contain rounded-lg bg-slate-50 dark:bg-slate-900 p-2"
                        />
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white">{offer.airline.name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{flightNumbers}</p>
                        </div>
                    </div>

                    {/* Flight Timeline */}
                    <div className="flex items-center justify-between flex-1 gap-6">
                        <div className="flex-1 flex flex-col items-start">
                            <div className="flex items-baseline gap-1 mb-1">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{formatTime(offer.departure.time)}</p>
                                {new Date(offer.departure.time).getDate() !== new Date(offer.arrival.time).getDate() && (
                                    <sup className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">{formatDate(offer.departure.time)}</sup>
                                )}
                            </div>
                            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">{offer.departure.airport.code}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-500">{offer.departure.airport.name}</p>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center px-4">
                            <div className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">{offer.duration}</div>
                            <div className="w-full flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-[#0891B2] shrink-0"></div>
                                <div className="flex-1 h-0.5 bg-slate-300 dark:bg-slate-600 relative flex items-center justify-center">
                                    <svg className="w-5 h-5 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </div>
                                <div className="w-3 h-3 rounded-full bg-[#203C94] shrink-0"></div>
                            </div>
                            <div className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400 text-center">
                                {offer.stops === 0 ? 'Direct' : `${offer.stops} stop${offer.stops > 1 ? 's' : ''}`}
                            </div>
                            {flightSegments.length > 1 && (
                                <button
                                    onClick={() => setIsItineraryExpanded(!isItineraryExpanded)}
                                    className="mt-2 text-[#203C94] dark:text-[#0891B2] hover:text-[#1a3076] dark:hover:text-[#0e7490] transition-colors"
                                    aria-label={isItineraryExpanded ? 'Hide itinerary' : 'View itinerary'}
                                >
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-200 ${isItineraryExpanded ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        <div className="flex-1 flex flex-col items-end">
                            <div className="flex items-baseline gap-1 mb-1 text-right">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{formatTime(offer.arrival.time)}</p>
                                {isNextDay && (
                                    <sup className="text-xs font-bold text-amber-600 dark:text-amber-500 ml-1">+1</sup>
                                )}
                            </div>
                            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 text-right">{offer.arrival.airport.code}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-500 text-right">{offer.arrival.airport.name}</p>
                        </div>
                    </div>

                    {/* Price & Select Button */}
                    <div className="md:w-40 flex flex-col items-end">
                        <div className="text-right w-full">
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">from</p>
                            <p className="text-2xl font-bold text-[#203C94] dark:text-[#0891B2] leading-none">{formatPrice(lowestPrice, offer.price.currency)}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">per person</p>
                        </div>
                        <button
                            onClick={() => setIsFareExpanded(!isFareExpanded)}
                            className="mt-3 px-6 h-11 bg-[#203C94] dark:bg-[#0891B2] text-white rounded-lg text-xs font-bold uppercase hover:bg-[#1a3076] dark:hover:bg-[#0e7490] shadow-md w-full transition-all hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                        >
                            {isFareExpanded ? 'Hide Fares' : 'Select Flight'}
                            <svg
                                className={`w-4 h-4 transition-transform duration-200 ${isFareExpanded ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Fare Badges */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-wrap gap-2">
                    {offer.fareRules.refundable && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Refundable
                        </span>
                    )}
                    {offer.fareRules.changeable && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#FFB800]/10 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-full">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Changeable
                        </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-full">
                        {offer.baggage}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-full">
                        {offer.aircraft}
                    </span>
                </div>
            </div>

            {/* Flight Itinerary Expansion */}
            {isItineraryExpanded && (
                <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 p-6 animate-in slide-in-from-top-2 duration-200 ease-out">
                    <div className="mb-4">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Flight Itinerary</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Complete journey details for {offer.departure.airport.code} to {offer.arrival.airport.code}</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        {flightSegments.map((segment, idx) => (
                            <div key={idx} className="flex-1 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{segment.flightNumber}</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">• {offer.aircraft}</span>
                                    </div>
                                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{segment.duration}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{formatTime(segment.departTime)}</p>
                                        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">{segment.from}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                        <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{formatTime(segment.arriveTime)}</p>
                                        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">{segment.to}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {offer.layover && (
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800/50">
                            <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                                <span className="text-sm font-semibold">
                                    Layover in {offer.layover.airport.code} ({offer.layover.airport.name}): {offer.layover.duration}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Fare Families Expansion */}
            {isFareExpanded && (
                <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 p-6 animate-in slide-in-from-top-2 duration-200 ease-out">
                    <div className="mb-4">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Select your fare</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Compare fare families and choose the one that fits your needs</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {fareFamilies.map((fare) => (
                            <button
                                key={fare.name}
                                onClick={() => onSelectFareFamily(fare.name)}
                                className={`
                                    relative p-4 rounded-xl border-2 transition-all duration-200 text-left
                                    ${selectedFareFamily === fare.name
                                        ? 'border-[#203C94] dark:border-[#0891B2] bg-white dark:bg-slate-800 shadow-md'
                                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-[#0891B2] dark:hover:border-[#0891B2]'
                                    }
                                    ${fare.highlighted ? 'ring-2 ring-[#FFB800] ring-offset-2 dark:ring-offset-slate-900' : ''}
                                `}
                            >
                                {fare.badge && (
                                    <div className="absolute -top-2 left-4 px-2 py-0.5 bg-[#FFB800] text-white text-[10px] font-bold uppercase rounded-full">
                                        {fare.badge}
                                    </div>
                                )}

                                <div className="mb-3">
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{fare.name}</h4>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-[#203C94] dark:text-[#0891B2]">{formatPrice(fare.price, fare.currency)}</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">/person</span>
                                    </div>
                                </div>

                                <ul className="space-y-2">
                                    {fare.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                                            <svg className="w-3.5 h-3.5 text-[#4CAF50] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {selectedFareFamily === fare.name && (
                                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-[#203C94] dark:text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="ml-1 text-xs font-bold text-[#203C94] dark:text-[#0891B2]">Selected</span>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Flight Details Link */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onViewDetails()
                        }}
                        className="mt-4 w-full text-center text-sm font-medium text-[#203C94] dark:text-[#0891B2] hover:text-[#1a3076] dark:hover:text-[#0e7490] flex items-center justify-center gap-2 py-2 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        View full flight details and fare rules
                    </button>
                </div>
            )}
        </div>
    )
}
