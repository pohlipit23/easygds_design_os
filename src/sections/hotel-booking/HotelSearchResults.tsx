import { useState } from 'react'
import data from '@/../product/sections/hotel-booking/data.json'
import { HotelSearchResults } from './components/HotelSearchResults'

export default function HotelSearchResultsPreview() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<
    'price-low-high' | 'price-high-low' | 'star-rating' | 'guest-rating' | 'recommended'
  >('recommended')
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')

  return (
    <HotelSearchResults
      hotels={data.hotels}
      rooms={data.rooms}
      rates={data.roomRates}
      destination="Dubai, UAE"
      searchQuery={searchQuery}
      sortBy={sortBy}
      viewMode={viewMode}
      onSearchChange={(query) => {
        console.log('Search query:', query)
        setSearchQuery(query)
      }}
      onFiltersClick={() => {
        console.log('Filters clicked')
      }}
      onSortChange={(newSort) => {
        console.log('Sort change:', newSort)
        setSortBy(newSort)
      }}
      onViewModeToggle={() => {
        console.log('View mode toggle')
        setViewMode((prev) => (prev === 'list' ? 'map' : 'list'))
      }}
      onHotelSelect={(hotelId) => {
        console.log('Hotel selected:', hotelId)
      }}
    />
  )
}
