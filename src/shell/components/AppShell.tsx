import React, { useState } from 'react';
import { Header } from './Header';
import { SearchWidget } from './SearchWidget';
import type { SearchFormData } from './SearchWidget';
import { ProductDetails } from './ProductDetails';
import type { ProductType } from './ProductDetails';
import { RegionalSettings } from './RegionalSettings';
import type { RegionalPreferences } from './RegionalSettings';
import { ContextBar } from './ContextBar';
import { Footer } from './Footer';

interface FlightSearchContext {
  from: string;
  to: string;
  dates: string;
  passengers: string;
}

interface HotelSearchContext {
  destination: string;
  dates: string;
  guests: string;
}

interface CarSearchContext {
  location: string;
  dates: string;
}

interface TourSearchContext {
  destination: string;
  dates: string;
}

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

interface AppShellProps {
  children: React.ReactNode;
  showContextBar?: boolean;
  productType?: ProductType;
  searchContext?: FlightSearchContext | HotelSearchContext | CarSearchContext | TourSearchContext;
  productContext?: {
    outbound?: FlightData;
    return?: FlightData;
    hotel?: HotelData;
    car?: CarData;
    tour?: TourData;
  };
}

export function AppShell({
  children,
  showContextBar = false,
  productType = 'flight',
  searchContext,
  productContext
}: AppShellProps) {
  const [searchWidgetOpen, setSearchWidgetOpen] = useState(false);
  const [productDetailsOpen, setProductDetailsOpen] = useState(false);
  const [regionalSettingsOpen, setRegionalSettingsOpen] = useState(false);

  const [regionalPreferences, setRegionalPreferences] = useState<RegionalPreferences>({
    country: 'United Kingdom',
    countryCode: 'gb',
    language: 'English (UK)',
    currency: 'GBP',
    currencySymbol: '£',
  });

  const handleSearchUpdate = (data: SearchFormData) => {
    console.log('Search updated:', data);
    // In a real app, this would trigger a search
  };

  const handleRegionalSettingsApply = (settings: RegionalPreferences) => {
    setRegionalPreferences(settings);
    console.log('Regional settings updated:', settings);
  };

  // Build header context for mobile dropdown (flight/package only)
  const headerFlightContext =
    (productType === 'flight' || productType === 'package') &&
    productContext?.outbound &&
    productContext?.return
      ? {
          outbound: {
            time: productContext.outbound.departTime,
            code: productContext.outbound.departCode,
            flight: productContext.outbound.flightNumber,
          },
          return: {
            time: productContext.return.departTime,
            code: productContext.return.departCode,
            flight: productContext.return.flightNumber,
          },
        }
      : undefined;

  // Build product summary for ContextBar
  const buildProductSummary = () => {
    if (!productContext) return undefined;

    switch (productType) {
      case 'flight':
      case 'package':
        if (productContext.outbound && productContext.return) {
          return {
            outbound: {
              time: productContext.outbound.departTime,
              code: productContext.outbound.departCode,
              flight: productContext.outbound.flightNumber,
            },
            return: {
              time: productContext.return.departTime,
              code: productContext.return.departCode,
              flight: productContext.return.flightNumber,
            },
          };
        }
        return undefined;

      case 'hotel':
        if (productContext.hotel) {
          return {
            name: productContext.hotel.name,
            checkIn: productContext.hotel.checkIn,
            checkOut: productContext.hotel.checkOut,
          };
        }
        return undefined;

      case 'car':
        if (productContext.car) {
          return {
            vehicleType: productContext.car.vehicleType,
            pickupLocation: productContext.car.pickupLocation,
            dropoffLocation: productContext.car.dropoffLocation,
          };
        }
        return undefined;

      case 'tour':
        if (productContext.tour) {
          return {
            name: productContext.tour.name,
            date: productContext.tour.date,
            time: productContext.tour.time,
          };
        }
        return undefined;

      default:
        return undefined;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header
        onSearchToggle={() => setSearchWidgetOpen(!searchWidgetOpen)}
        onRegionalSettingsToggle={() => setRegionalSettingsOpen(!regionalSettingsOpen)}
        onFlightDetailsToggle={() => setProductDetailsOpen(!productDetailsOpen)}
        searchContext={searchContext}
        flightContext={headerFlightContext}
        currentCurrency={regionalPreferences.currency}
        currentFlag={regionalPreferences.countryCode}
      />

      {/* Regional Settings Modal */}
      <RegionalSettings
        isOpen={regionalSettingsOpen}
        onClose={() => setRegionalSettingsOpen(false)}
        onApply={handleRegionalSettingsApply}
        currentSettings={regionalPreferences}
      />

      {/* Context Bar (Desktop) - Sticky at top */}
      {showContextBar && searchContext && (
        <ContextBar
          productType={productType}
          searchSummary={searchContext}
          productSummary={buildProductSummary()}
          onModifySearch={() => setSearchWidgetOpen(true)}
          onProductDetailsClick={() => setProductDetailsOpen(!productDetailsOpen)}
        />
      )}

      {/* Search Widget - Expands below context bar */}
      <SearchWidget
        isOpen={searchWidgetOpen}
        onClose={() => setSearchWidgetOpen(false)}
        onUpdate={handleSearchUpdate}
        defaultValues={searchContext}
      />

      {/* Product Details - Expands below context bar */}
      {productContext && (
        <ProductDetails
          isOpen={productDetailsOpen}
          onClose={() => setProductDetailsOpen(false)}
          productType={productType}
          data={productContext}
        />
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
