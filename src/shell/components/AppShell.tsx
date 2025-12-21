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
  productType?: ProductType;
  showContextBar?: boolean;
  searchContext?: {
    from?: string;
    to?: string;
    destination?: string;
    location?: string;
    dates: string;
    passengers?: string;
    guests?: string;
  };
  productData?: {
    outbound?: FlightData;
    return?: FlightData;
    hotel?: HotelData;
    car?: CarData;
    tour?: TourData;
  };
}

export function AppShell({
  children,
  productType = 'flight',
  showContextBar = false,
  searchContext,
  productData,
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

  // Build flight context for Header mobile dropdown (backward compatibility)
  const flightContext =
    productData?.outbound && productData?.return
      ? {
          outbound: {
            time: productData.outbound.departTime,
            code: productData.outbound.departCode,
            flight: productData.outbound.flightNumber,
          },
          return: {
            time: productData.return.departTime,
            code: productData.return.departCode,
            flight: productData.return.flightNumber,
          },
        }
      : undefined;

  // Build product summary for ContextBar
  const buildProductSummary = () => {
    if (!productData) return undefined;

    switch (productType) {
      case 'flight':
      case 'package':
        if (productData.outbound && productData.return) {
          return {
            outbound: {
              time: productData.outbound.departTime,
              code: productData.outbound.departCode,
              flight: productData.outbound.flightNumber,
            },
            return: {
              time: productData.return.departTime,
              code: productData.return.departCode,
              flight: productData.return.flightNumber,
            },
          };
        }
        return undefined;

      case 'hotel':
        if (productData.hotel) {
          return {
            name: productData.hotel.name,
            checkIn: productData.hotel.checkIn,
            checkOut: productData.hotel.checkOut,
          };
        }
        return undefined;

      case 'car':
        if (productData.car) {
          return {
            vehicleType: productData.car.vehicleType,
            pickupLocation: productData.car.pickupLocation,
            dropoffLocation: productData.car.dropoffLocation,
          };
        }
        return undefined;

      case 'tour':
        if (productData.tour) {
          return {
            name: productData.tour.name,
            date: productData.tour.date,
            time: productData.tour.time,
          };
        }
        return undefined;
    }
  };

  // Build search summary for ContextBar
  const buildSearchSummary = () => {
    if (!searchContext) return undefined;

    switch (productType) {
      case 'flight':
      case 'package':
        return {
          from: searchContext.from || '',
          to: searchContext.to || '',
          dates: searchContext.dates,
          passengers: searchContext.passengers || '1 Adult',
        };

      case 'hotel':
        return {
          destination: searchContext.destination || '',
          dates: searchContext.dates,
          guests: searchContext.guests || '1 Adult',
        };

      case 'car':
        return {
          location: searchContext.location || '',
          dates: searchContext.dates,
        };

      case 'tour':
        return {
          destination: searchContext.destination || '',
          dates: searchContext.dates,
        };
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
        flightContext={flightContext}
        currentCurrency={regionalPreferences.currency}
        currentFlag={regionalPreferences.countryCode}
      />

      {/* Context Bar (Desktop) */}
      {showContextBar && searchContext && (
        <ContextBar
          productType={productType}
          searchSummary={buildSearchSummary()!}
          productSummary={buildProductSummary()}
          onModifySearch={() => setSearchWidgetOpen(true)}
          onProductDetailsClick={() => setProductDetailsOpen(!productDetailsOpen)}
        />
      )}

      {/* Search Widget - Dropdown below context bar */}
      <SearchWidget
        isOpen={searchWidgetOpen}
        onClose={() => setSearchWidgetOpen(false)}
        onUpdate={handleSearchUpdate}
        defaultValues={searchContext}
        productType={productType}
      />

      {/* Product Details - Dropdown below context bar */}
      {productData && (
        <ProductDetails
          isOpen={productDetailsOpen}
          onClose={() => setProductDetailsOpen(false)}
          productType={productType}
          data={productData}
        />
      )}

      {/* Regional Settings Modal */}
      <RegionalSettings
        isOpen={regionalSettingsOpen}
        onClose={() => setRegionalSettingsOpen(false)}
        onApply={handleRegionalSettingsApply}
        currentSettings={regionalPreferences}
      />

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
