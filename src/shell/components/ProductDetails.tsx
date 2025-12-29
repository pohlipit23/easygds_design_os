import React from 'react';

export type ProductType = 'flight' | 'hotel' | 'package' | 'car' | 'tour';

interface FlightData {
  departTime: string;
  departCode: string;
  arriveTime: string;
  arriveCode: string;
  duration: string;
  flightNumber: string;
  flightClass: string;
}

interface HotelData {
  name: string;
  starRating: number;
  checkIn: string;
  checkOut: string;
  roomType: string;
  boardType: string;
  nights: number;
  guests: string;
}

interface CarData {
  pickupLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffLocation: string;
  dropoffDate: string;
  dropoffTime: string;
  vehicleType: string;
  capacity: string;
  duration: string;
}

interface TourData {
  name: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  participants: string;
}

interface ProductDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  productType: ProductType;
  data: {
    outbound?: FlightData;
    return?: FlightData;
    hotel?: HotelData;
    car?: CarData;
    tour?: TourData;
  };
}

export function ProductDetails({ isOpen, onClose, productType, data }: ProductDetailsProps) {
  if (!isOpen) return null;

  const renderFlights = () => {
    if (!data.outbound || !data.return) return null;

    return (
      <div className="grid md:grid-cols-2 gap-3">
        {/* Outbound Flight */}
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
          <div className="text-xs font-bold text-[#203C94] uppercase mb-2">
            Outbound • {data.outbound.duration}
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xl font-bold text-[#1A3994]">
              {data.outbound.departTime}{' '}
              <span className="text-sm font-normal text-slate-600">{data.outbound.departCode}</span>
            </div>
            <div className="h-px flex-grow bg-slate-300 mx-4 relative">
              <span className="absolute right-0 -top-1.5 w-3 h-3 rounded-full bg-slate-300"></span>
            </div>
            <div className="text-xl font-bold text-[#1A3994]">
              {data.outbound.arriveTime}{' '}
              <span className="text-sm font-normal text-slate-600">{data.outbound.arriveCode}</span>
            </div>
          </div>
          <div className="text-xs text-slate-600 flex items-center gap-2">
            <span className="material-icons-round text-lg">flight_takeoff</span> {data.outbound.flightNumber} •{' '}
            {data.outbound.flightClass}
          </div>
        </div>

        {/* Return Flight */}
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
          <div className="text-xs font-bold text-[#203C94] uppercase mb-2">
            Return • {data.return.duration}
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xl font-bold text-[#1A3994]">
              {data.return.departTime}{' '}
              <span className="text-sm font-normal text-slate-600">{data.return.departCode}</span>
            </div>
            <div className="h-px flex-grow bg-slate-300 mx-4 relative">
              <span className="absolute right-0 -top-1.5 w-3 h-3 rounded-full bg-slate-300"></span>
            </div>
            <div className="text-xl font-bold text-[#1A3994]">
              {data.return.arriveTime}{' '}
              <span className="text-sm font-normal text-slate-600">{data.return.arriveCode}</span>
            </div>
          </div>
          <div className="text-xs text-slate-600 flex items-center gap-2">
            <span className="material-icons-round text-lg">flight_takeoff</span> {data.return.flightNumber} •{' '}
            {data.return.flightClass}
          </div>
        </div>
      </div>
    );
  };

  const renderHotel = () => {
    if (!data.hotel) return null;

    return (
      <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
        <div className="flex items-center justify-between mb-3">
          <div className="text-lg font-bold text-[#1A3994]">{data.hotel.name}</div>
          <div className="flex items-center gap-1 text-[#FFB800]">
            {Array.from({ length: data.hotel.starRating }).map((_, i) => (
              <span key={i} className="material-icons-round text-sm">star</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <div className="text-xs font-bold text-[#203C94] uppercase mb-1">Check-in</div>
            <div className="text-sm font-semibold text-slate-700">{data.hotel.checkIn}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-[#203C94] uppercase mb-1">Check-out</div>
            <div className="text-sm font-semibold text-slate-700">{data.hotel.checkOut}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-lg">bed</span>
            {data.hotel.roomType}
          </div>
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-lg">restaurant</span>
            {data.hotel.boardType}
          </div>
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-lg">nights_stay</span>
            {data.hotel.nights} nights
          </div>
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-lg">person</span>
            {data.hotel.guests}
          </div>
        </div>
      </div>
    );
  };

  const renderCar = () => {
    if (!data.car) return null;

    return (
      <div className="grid md:grid-cols-2 gap-3">
        {/* Pick-up */}
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
          <div className="text-xs font-bold text-[#203C94] uppercase mb-2">Pick-up</div>
          <div className="text-sm font-semibold text-slate-700 mb-1">{data.car.pickupLocation}</div>
          <div className="text-xs text-slate-600">{data.car.pickupDate} • {data.car.pickupTime}</div>
        </div>

        {/* Drop-off */}
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
          <div className="text-xs font-bold text-[#203C94] uppercase mb-2">Drop-off</div>
          <div className="text-sm font-semibold text-slate-700 mb-1">{data.car.dropoffLocation}</div>
          <div className="text-xs text-slate-600">{data.car.dropoffDate} • {data.car.dropoffTime}</div>
        </div>

        {/* Vehicle Details */}
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 md:col-span-2">
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="material-icons-round text-lg">directions_car</span>
              {data.car.vehicleType}
            </div>
            <div className="flex items-center gap-2">
              <span className="material-icons-round text-lg">person</span>
              {data.car.capacity}
            </div>
            <div className="flex items-center gap-2">
              <span className="material-icons-round text-lg">schedule</span>
              {data.car.duration}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTour = () => {
    if (!data.tour) return null;

    return (
      <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
        <div className="text-lg font-bold text-[#1A3994] mb-2">{data.tour.name}</div>
        <div className="text-sm text-slate-700 mb-3">{data.tour.description}</div>
        <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-lg">calendar_today</span>
            {data.tour.date}
          </div>
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-lg">schedule</span>
            {data.tour.time}
          </div>
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-lg">timelapse</span>
            {data.tour.duration}
          </div>
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-lg">group</span>
            {data.tour.participants}
          </div>
        </div>
      </div>
    );
  };

  const renderPackage = () => {
    return (
      <>
        {renderFlights()}
        {data.hotel && (
          <div className="mt-3">
            {renderHotel()}
          </div>
        )}
      </>
    );
  };

  const getTitle = () => {
    switch (productType) {
      case 'flight':
        return 'Flight Itinerary';
      case 'hotel':
        return 'Hotel Details';
      case 'package':
        return 'Package Details';
      case 'car':
        return 'Car Rental Details';
      case 'tour':
        return 'Tour Details';
      default:
        return 'Product Details';
    }
  };

  const renderContent = () => {
    switch (productType) {
      case 'flight':
        return renderFlights();
      case 'hotel':
        return renderHotel();
      case 'package':
        return renderPackage();
      case 'car':
        return renderCar();
      case 'tour':
        return renderTour();
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 shadow-lg animate-fade-in-down z-30 relative">
      <div className="container mx-auto px-4 md:px-6 py-4 bg-white relative">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase text-slate-600">{getTitle()}</h3>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-[#203C94] transition-colors w-8 h-8 rounded-full hover:bg-slate-50 flex items-center justify-center"
            aria-label={`Close ${getTitle().toLowerCase()}`}
          >
            <span className="material-icons-round text-xl">close</span>
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}
