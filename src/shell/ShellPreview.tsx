import React, { useState } from 'react';
import { AppShell } from './components';

type PreviewTab = 'package' | 'hotel';

export default function ShellPreview() {
  const [activeTab, setActiveTab] = useState<PreviewTab>('package');

  // Apply Raleway font to the entire shell preview
  React.useEffect(() => {
    document.body.style.fontFamily = 'Raleway, sans-serif';
    return () => {
      document.body.style.fontFamily = '';
    };
  }, []);

  // Package flow data
  const packageSearchContext = {
    from: 'Almaty (ALA)',
    to: 'Dubai (DXB)',
    dates: 'Dec 15 - Dec 22, 2025',
    passengers: '2 Adults, 1 Room',
  };

  const packageProductData = {
    outbound: {
      departTime: '07:30',
      departCode: 'ALA',
      arriveTime: '10:45',
      arriveCode: 'DXB',
      duration: '4h 15m',
      flightNumber: 'KC 118',
      flightClass: 'Economy',
    },
    return: {
      departTime: '12:15',
      departCode: 'DXB',
      arriveTime: '18:10',
      arriveCode: 'ALA',
      duration: '3h 55m',
      flightNumber: 'KC 119',
      flightClass: 'Economy',
    },
    hotel: {
      name: 'Atlantis The Palm',
      starRating: 5,
      checkIn: 'Dec 15, 2025',
      checkOut: 'Dec 22, 2025',
      roomType: 'Deluxe King',
      boardType: 'Bed & Breakfast',
      nights: 7,
      guests: '2 Adults',
    },
  };

  // Hotel-only flow data
  const hotelSearchContext = {
    destination: 'Dubai, UAE',
    dates: 'Jan 10 - Jan 17, 2026',
    guests: '2 Adults, 1 Room',
  };

  const hotelProductData = {
    hotel: {
      name: 'Burj Al Arab Jumeirah',
      starRating: 5,
      checkIn: 'Jan 10, 2026',
      checkOut: 'Jan 17, 2026',
      roomType: 'Deluxe Suite',
      boardType: 'All Inclusive',
      nights: 7,
      guests: '2 Adults',
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Tab Navigation */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-6 flex items-center gap-1 h-12">
          <button
            onClick={() => setActiveTab('package')}
            className={`h-full px-4 text-xs font-bold uppercase transition-colors relative ${
              activeTab === 'package'
                ? 'text-[#203C94]'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Package Flow (Flight + Hotel)
            {activeTab === 'package' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#203C94]"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('hotel')}
            className={`h-full px-4 text-xs font-bold uppercase transition-colors relative ${
              activeTab === 'hotel'
                ? 'text-[#203C94]'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Hotel-Only Flow
            {activeTab === 'hotel' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#203C94]"></div>
            )}
          </button>
          <div className="ml-auto text-xs text-slate-500">
            Examples showing adaptive shell behavior
          </div>
        </div>
      </div>

      {/* Package Flow */}
      {activeTab === 'package' && (
        <AppShell
          productType="package"
          showContextBar={true}
          searchContext={packageSearchContext}
          productData={packageProductData}
        >
          {/* Shell preview - content area intentionally empty */}
        </AppShell>
      )}

      {/* Hotel-Only Flow */}
      {activeTab === 'hotel' && (
        <AppShell
          productType="hotel"
          showContextBar={true}
          searchContext={hotelSearchContext}
          productData={hotelProductData}
        >
          {/* Shell preview - content area intentionally empty */}
        </AppShell>
      )}
    </div>
  );
}
