import React from 'react';

interface FlightDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  outbound: {
    departTime: string;
    departCode: string;
    arriveTime: string;
    arriveCode: string;
    duration: string;
    flightNumber: string;
    flightClass: string;
  };
  return: {
    departTime: string;
    departCode: string;
    arriveTime: string;
    arriveCode: string;
    duration: string;
    flightNumber: string;
    flightClass: string;
  };
}

export function FlightDetails({ isOpen, onClose, outbound, return: returnFlight }: FlightDetailsProps) {
  if (!isOpen) return null;

  return (
    <div className="bg-white border-b border-stone-200 shadow-lg fixed left-0 right-0 z-50 top-32 animate-fade-in-down">
      <div className="container mx-auto px-4 md:px-6 py-4 bg-white relative">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase text-stone-600">Detailed Itinerary</h3>
          <button
            onClick={onClose}
            className="text-stone-600 hover:text-[#203C94] transition-colors w-8 h-8 rounded-full hover:bg-stone-50 flex items-center justify-center"
            aria-label="Close flight details"
          >
            <span className="material-icons-round text-xl">close</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {/* Outbound Flight */}
          <div className="border border-stone-200 rounded-lg p-4 bg-stone-50/50">
            <div className="text-xs font-bold text-[#203C94] uppercase mb-2">
              Outbound • {outbound.duration}
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xl font-bold text-[#1A3994]">
                {outbound.departTime}{' '}
                <span className="text-sm font-normal text-stone-600">{outbound.departCode}</span>
              </div>
              <div className="h-px flex-grow bg-stone-300 mx-4 relative">
                <span className="absolute right-0 -top-1.5 w-3 h-3 rounded-full bg-stone-300"></span>
              </div>
              <div className="text-xl font-bold text-[#1A3994]">
                {outbound.arriveTime}{' '}
                <span className="text-sm font-normal text-stone-600">{outbound.arriveCode}</span>
              </div>
            </div>
            <div className="text-xs text-stone-600 flex items-center gap-2">
              <span className="material-icons-round text-lg">flight_takeoff</span> {outbound.flightNumber} •{' '}
              {outbound.flightClass}
            </div>
          </div>

          {/* Return Flight */}
          <div className="border border-stone-200 rounded-lg p-4 bg-stone-50/50">
            <div className="text-xs font-bold text-[#203C94] uppercase mb-2">
              Return • {returnFlight.duration}
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xl font-bold text-[#1A3994]">
                {returnFlight.departTime}{' '}
                <span className="text-sm font-normal text-stone-600">{returnFlight.departCode}</span>
              </div>
              <div className="h-px flex-grow bg-stone-300 mx-4 relative">
                <span className="absolute right-0 -top-1.5 w-3 h-3 rounded-full bg-stone-300"></span>
              </div>
              <div className="text-xl font-bold text-[#1A3994]">
                {returnFlight.arriveTime}{' '}
                <span className="text-sm font-normal text-stone-600">{returnFlight.arriveCode}</span>
              </div>
            </div>
            <div className="text-xs text-stone-600 flex items-center gap-2">
              <span className="material-icons-round text-lg">flight_takeoff</span> {returnFlight.flightNumber} •{' '}
              {returnFlight.flightClass}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
