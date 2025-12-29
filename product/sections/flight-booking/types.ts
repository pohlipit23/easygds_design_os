// =============================================================================
// Data Types
// =============================================================================

export interface Airport {
    code: string
    name: string
    city?: string
}

export interface Airline {
    code: string
    name: string
    logo: string
}

export interface FlightTime {
    airport: Airport
    time: string
}

export interface Layover {
    airport: Airport
    duration: string
}

export interface FareRules {
    refundable: boolean
    changeable: boolean
    changeFee: number
}

export interface FlightPrice {
    amount: number
    currency: string
    perPerson: boolean
    note?: string
}

export interface FlightOffer {
    id: string
    airline: Airline
    flightNumber: string
    departure: FlightTime
    arrival: FlightTime
    duration: string
    stops: number
    layover?: Layover
    price: FlightPrice
    baggage: string
    cabin: string
    aircraft: string
    fareRules: FareRules
}

export interface Passengers {
    adults: number
    children: number
    infants: number
}

export interface SearchParams {
    origin: Airport
    destination: Airport
    departureDate: string
    returnDate: string
    passengers: Passengers
    cabinClass: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface FlightBookingProps {
    /** The current search parameters context */
    searchParams: SearchParams
    /** List of available outbound flight offers */
    outboundOffers: FlightOffer[]
    /** List of available return flight offers */
    returnOffers: FlightOffer[]
    /** Called when user selects an outbound flight */
    onSelectOutbound: (offerId: string) => void
    /** Called when user selects a return flight */
    onSelectReturn: (offerId: string) => void
    /** Called when user wants to modify their search */
    onModifySearch: () => void
    /** Called when user requests detailed info for an offer */
    onViewDetails: (offerId: string) => void
}
