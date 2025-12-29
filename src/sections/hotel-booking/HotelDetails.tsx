import React from 'react'
import data from '@/../product/sections/hotel-booking/data.json'
import { HotelDetails } from './components/HotelDetails'
import { AppShell } from '@/shell/components'

export default function HotelDetailsPreview() {
  // Apply Raleway font
  React.useEffect(() => {
    document.body.style.fontFamily = 'Raleway, sans-serif'
    return () => {
      document.body.style.fontFamily = ''
    }
  }, [])

  // Use first hotel from data
  const hotel = data.hotels[0]

  // Get rooms for this hotel
  const hotelRooms = data.rooms.filter((room) => room.hotelId === hotel.id)

  // Get rates for these rooms
  const hotelRates = data.roomRates.filter((rate) =>
    hotelRooms.some((room) => room.id === rate.roomId)
  )

  // Get reviews for this hotel
  const hotelReviews = data.guestReviews.filter((review) => review.hotelId === hotel.id)

  // Hotel-only shell context
  const hotelSearchContext = {
    destination: 'Dubai, UAE',
    dates: 'Jan 10 - Jan 17, 2026',
    guests: '2 Adults, 1 Room',
  }

  const hotelProductData = {
    hotel: {
      name: hotel.name,
      starRating: hotel.starRating,
      checkIn: 'Jan 10, 2026',
      checkOut: 'Jan 17, 2026',
      roomType: hotelRooms[0]?.roomType || 'Deluxe Suite',
      boardType: 'All Inclusive',
      nights: 7,
      guests: '2 Adults',
    },
  }

  return (
    <AppShell
      productType="hotel"
      showContextBar={true}
      searchContext={hotelSearchContext}
      productContext={hotelProductData}
      showHeader={false}
      showFooter={false}
    >
      <HotelDetails
        hotel={hotel}
        rooms={hotelRooms}
        rates={hotelRates}
        reviews={hotelReviews}
        onAddToBasket={(roomId, rateId) => console.log('Add to basket:', roomId, rateId)}
      />
    </AppShell>
  )
}
