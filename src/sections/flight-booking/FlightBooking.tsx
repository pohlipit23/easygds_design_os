import data from '@/../product/sections/flight-booking/data.json'
import { FlightBooking } from './components/FlightBooking'
import type { FlightOffer, SearchParams } from '@/../product/sections/flight-booking/types'

const outboundOffers = data.outboundOffers as FlightOffer[]
const returnOffers = data.returnOffers as FlightOffer[]
const searchParams = data.searchParams as SearchParams

export default function FlightBookingPreview() {
    return (
        <FlightBooking
            searchParams={searchParams}
            outboundOffers={outboundOffers}
            returnOffers={returnOffers}
            onSelectOutbound={(id) => console.log('Selected Outbound:', id)}
            onSelectReturn={(id) => console.log('Selected Return:', id)}
            onModifySearch={() => console.log('Modify Search Triggered')}
            onViewDetails={(id) => console.log('View Details Triggered:', id)}
        />
    )
}
