import data from '@/../product/sections/flight-booking/data.json'
import { FlightBooking } from './components/FlightBooking'

// Cast data to ensure type safety with the JSON import
const outboundOffers = data.outboundOffers as any[]
const returnOffers = data.returnOffers as any[]
const searchParams = data.searchParams as any

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
