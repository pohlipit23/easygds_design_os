import React from 'react';

export type ProductType = 'flight' | 'hotel' | 'package' | 'car' | 'tour';

interface BaseSearchSummary {
  dates: string;
  passengers?: string;
  guests?: string;
}

interface FlightSearchSummary extends BaseSearchSummary {
  from: string;
  to: string;
  passengers: string;
}

interface HotelSearchSummary extends BaseSearchSummary {
  destination: string;
  guests: string;
}

interface CarSearchSummary extends BaseSearchSummary {
  location: string;
}

interface TourSearchSummary extends BaseSearchSummary {
  destination: string;
}

interface FlightProductSummary {
  outbound: { time: string; code: string; flight: string };
  return: { time: string; code: string; flight: string };
}

interface HotelProductSummary {
  name: string;
  checkIn: string;
  checkOut: string;
}

interface CarProductSummary {
  vehicleType: string;
  pickupLocation: string;
  dropoffLocation: string;
}

interface TourProductSummary {
  name: string;
  date: string;
  time: string;
}

interface ContextBarProps {
  productType: ProductType;
  searchSummary: FlightSearchSummary | HotelSearchSummary | CarSearchSummary | TourSearchSummary;
  productSummary?: FlightProductSummary | HotelProductSummary | CarProductSummary | TourProductSummary;
  onModifySearch: () => void;
  onProductDetailsClick?: () => void;
}

export function ContextBar({
  productType,
  searchSummary,
  productSummary,
  onModifySearch,
  onProductDetailsClick,
}: ContextBarProps) {
  const renderSearchSummary = () => {
    switch (productType) {
      case 'flight':
      case 'package': {
        const flightSearch = searchSummary as FlightSearchSummary;
        return (
          <div className="flex items-center gap-3 text-base text-slate-900 overflow-hidden">
            <span className="material-icons-round text-xl text-[#203C94]">search</span>
            <div className="flex flex-col">
              <span className="font-semibold text-[#1A3994] truncate text-sm">
                {flightSearch.from.split('(')[0].trim()} - {flightSearch.to.split('(')[0].trim()}
              </span>
              <span className="text-slate-600 text-xs">
                {flightSearch.dates} • {flightSearch.passengers.split(',')[0]}
              </span>
            </div>
          </div>
        );
      }

      case 'hotel': {
        const hotelSearch = searchSummary as HotelSearchSummary;
        return (
          <div className="flex items-center gap-3 text-base text-slate-900 overflow-hidden">
            <span className="material-icons-round text-xl text-[#0891B2]">location_on</span>
            <div className="flex flex-col">
              <span className="font-semibold text-[#1A3994] truncate text-sm">
                {hotelSearch.destination}
              </span>
              <span className="text-slate-600 text-xs">
                {hotelSearch.dates} • {hotelSearch.guests.split(',')[0]}
              </span>
            </div>
          </div>
        );
      }

      case 'car': {
        const carSearch = searchSummary as CarSearchSummary;
        return (
          <div className="flex items-center gap-3 text-base text-slate-900 overflow-hidden">
            <span className="material-icons-round text-xl text-[#0891B2]">directions_car</span>
            <div className="flex flex-col">
              <span className="font-semibold text-[#1A3994] truncate text-sm">
                {carSearch.location}
              </span>
              <span className="text-slate-600 text-xs">{carSearch.dates}</span>
            </div>
          </div>
        );
      }

      case 'tour': {
        const tourSearch = searchSummary as TourSearchSummary;
        return (
          <div className="flex items-center gap-3 text-base text-slate-900 overflow-hidden">
            <span className="material-icons-round text-xl text-[#0891B2]">tour</span>
            <div className="flex flex-col">
              <span className="font-semibold text-[#1A3994] truncate text-sm">
                {tourSearch.destination}
              </span>
              <span className="text-slate-600 text-xs">{tourSearch.dates}</span>
            </div>
          </div>
        );
      }
    }
  };

  const renderProductSummary = () => {
    if (!productSummary || !onProductDetailsClick) return null;

    switch (productType) {
      case 'flight':
      case 'package': {
        const flight = productSummary as FlightProductSummary;
        return (
          <div
            onClick={onProductDetailsClick}
            className="flex items-center justify-between gap-4 cursor-pointer group flex-grow hover:bg-white transition-all rounded-lg px-3 -mx-3 h-full"
          >
            <div className="flex items-center gap-8 text-sm w-full">
              {/* Outbound */}
              <div className="flex items-center gap-3 text-slate-900">
                <span className="material-icons-round text-slate-600 text-lg rotate-90">flight</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#1A3994] text-sm">{flight.outbound.time}</span>
                  <span className="text-slate-600">→</span>
                  <span className="font-semibold text-[#1A3994] text-sm">
                    {flight.outbound.time.split(':')[0] === '07' ? '10:45' : '14:30'}
                  </span>
                  <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">
                    {flight.outbound.flight}
                  </span>
                </div>
              </div>

              <div className="w-px h-6 bg-slate-300"></div>

              {/* Return */}
              <div className="flex items-center gap-3 text-slate-900">
                <span className="material-icons-round text-slate-600 text-lg -rotate-90">flight</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#1A3994] text-sm">{flight.return.time}</span>
                  <span className="text-slate-600">→</span>
                  <span className="font-semibold text-[#1A3994] text-sm">
                    {flight.return.time.split(':')[0] === '12' ? '18:10' : '20:00'}
                  </span>
                  <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">
                    {flight.return.flight}
                  </span>
                </div>
              </div>
            </div>
            <span className="material-icons-round text-slate-600 text-xl group-hover:text-[#203C94] transition-transform duration-200">
              expand_more
            </span>
          </div>
        );
      }

      case 'hotel': {
        const hotel = productSummary as HotelProductSummary;
        return (
          <div
            onClick={onProductDetailsClick}
            className="flex items-center justify-between gap-4 cursor-pointer group flex-grow hover:bg-white transition-all rounded-lg px-3 -mx-3 h-full"
          >
            <div className="flex items-center gap-3 text-sm">
              <span className="material-icons-round text-slate-600 text-lg">hotel</span>
              <div className="flex flex-col">
                <span className="font-semibold text-[#1A3994] text-sm truncate">{hotel.name}</span>
                <span className="text-xs text-slate-600">
                  {hotel.checkIn} - {hotel.checkOut}
                </span>
              </div>
            </div>
            <span className="material-icons-round text-slate-600 text-xl group-hover:text-[#203C94] transition-transform duration-200">
              expand_more
            </span>
          </div>
        );
      }

      case 'car': {
        const car = productSummary as CarProductSummary;
        return (
          <div
            onClick={onProductDetailsClick}
            className="flex items-center justify-between gap-4 cursor-pointer group flex-grow hover:bg-white transition-all rounded-lg px-3 -mx-3 h-full"
          >
            <div className="flex items-center gap-3 text-sm">
              <span className="material-icons-round text-slate-600 text-lg">directions_car</span>
              <div className="flex flex-col">
                <span className="font-semibold text-[#1A3994] text-sm">{car.vehicleType}</span>
                <span className="text-xs text-slate-600">
                  {car.pickupLocation} → {car.dropoffLocation}
                </span>
              </div>
            </div>
            <span className="material-icons-round text-slate-600 text-xl group-hover:text-[#203C94] transition-transform duration-200">
              expand_more
            </span>
          </div>
        );
      }

      case 'tour': {
        const tour = productSummary as TourProductSummary;
        return (
          <div
            onClick={onProductDetailsClick}
            className="flex items-center justify-between gap-4 cursor-pointer group flex-grow hover:bg-white transition-all rounded-lg px-3 -mx-3 h-full"
          >
            <div className="flex items-center gap-3 text-sm">
              <span className="material-icons-round text-slate-600 text-lg">tour</span>
              <div className="flex flex-col">
                <span className="font-semibold text-[#1A3994] text-sm truncate">{tour.name}</span>
                <span className="text-xs text-slate-600">
                  {tour.date} • {tour.time}
                </span>
              </div>
            </div>
            <span className="material-icons-round text-slate-600 text-xl group-hover:text-[#203C94] transition-transform duration-200">
              expand_more
            </span>
          </div>
        );
      }
    }
  };

  return (
    <div className="bg-slate-50 border-t border-slate-200 z-40 sticky top-0 hidden md:block shadow-sm h-16">
      <div className="container mx-auto px-6 h-full">
        <div className="flex items-center gap-6 h-full">
          {/* Search Summary */}
          <div className="flex items-center gap-4 border-r border-slate-300 pr-6">
            {renderSearchSummary()}
            <button
              onClick={onModifySearch}
              className="flex items-center gap-2 px-4 h-10 bg-white border border-[#203C94] text-[#203C94] rounded-lg text-xs font-bold uppercase hover:bg-[#203C94] hover:text-white hover:shadow-md transition-all whitespace-nowrap shadow-sm active:scale-95"
            >
              <span className="material-icons-round text-lg">edit</span> Modify
            </button>
          </div>

          {/* Product Summary (adaptive) */}
          {renderProductSummary()}
        </div>
      </div>
    </div>
  );
}
