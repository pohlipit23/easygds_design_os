import data from '@/../product/sections/hotel-booking/data.json'
import { HotelDetails } from './components/HotelDetails'

export default function HotelDetailsPreview() {
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

  return (
    <HotelDetails
      hotel={hotel}
      rooms={hotelRooms}
      rates={hotelRates}
      reviews={hotelReviews}
      checkIn="Jan 10, 2026"
      checkOut="Jan 17, 2026"
      nights={7}
      guests="2 Adults, 1 Room"
      onBack={() => console.log('Back to search results')}
      onRoomSelect={(roomId, rateId) => console.log('Room selected:', roomId, rateId)}
      onAddToBasket={(roomId, rateId) => console.log('Add to basket:', roomId, rateId)}
    />
  )
}
