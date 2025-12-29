import React from 'react';

type ProductType = 'flight' | 'hotel' | 'package' | 'car' | 'tour';

interface SearchWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (searchData: SearchFormData) => void;
  defaultValues?: SearchFormData;
  productType?: ProductType;
}

export interface SearchFormData {
  from?: string;
  to?: string;
  destination?: string;
  location?: string;
  dates: string;
  passengers?: string;
  guests?: string;
}

export function SearchWidget({
  isOpen,
  onClose,
  onUpdate,
  defaultValues,
  productType = 'flight',
}: SearchWidgetProps) {
  const [formData, setFormData] = React.useState<SearchFormData>(
    defaultValues || {
      from: '',
      to: '',
      destination: '',
      location: '',
      dates: '',
      passengers: '2 Adults, 1 Room',
      guests: '2 Adults, 1 Room',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  if (!isOpen) return null;

  const renderFlightFields = () => (
    <>
      <div className="relative group">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons-round text-slate-600 text-lg group-focus-within:text-[#203C94] transition-colors">
          flight_takeoff
        </span>
        <label className="absolute -top-2 left-2 px-1 bg-white text-[0.625rem] font-bold uppercase text-[#203C94]">
          From
        </label>
        <input
          type="text"
          value={formData.from || ''}
          onChange={(e) => setFormData({ ...formData, from: e.target.value })}
          className="w-full pl-10 pr-3 h-11 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-[#1A3994] focus:ring-2 focus:ring-[#203C94]/20 focus:border-[#203C94] shadow-sm transition-all"
          placeholder="Airport or city"
        />
      </div>

      <div className="relative group">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons-round text-slate-600 text-lg group-focus-within:text-[#203C94] transition-colors">
          flight_land
        </span>
        <label className="absolute -top-2 left-2 px-1 bg-white text-[0.625rem] font-bold uppercase text-[#203C94]">
          To
        </label>
        <input
          type="text"
          value={formData.to || ''}
          onChange={(e) => setFormData({ ...formData, to: e.target.value })}
          className="w-full pl-10 pr-3 h-11 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-[#1A3994] focus:ring-2 focus:ring-[#203C94]/20 focus:border-[#203C94] shadow-sm transition-all"
          placeholder="Airport or city"
        />
      </div>
    </>
  );

  const renderHotelFields = () => (
    <div className="relative group">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons-round text-slate-600 text-lg group-focus-within:text-[#0891B2] transition-colors">
        location_on
      </span>
      <label className="absolute -top-2 left-2 px-1 bg-white text-[0.625rem] font-bold uppercase text-[#203C94]">
        Destination
      </label>
      <input
        type="text"
        value={formData.destination || ''}
        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
        className="w-full pl-10 pr-3 h-11 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-[#1A3994] focus:ring-2 focus:ring-[#0891B2]/20 focus:border-[#0891B2] shadow-sm transition-all"
        placeholder="City or hotel name"
      />
    </div>
  );

  const renderCarFields = () => (
    <div className="relative group">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons-round text-slate-600 text-lg group-focus-within:text-[#0891B2] transition-colors">
        location_on
      </span>
      <label className="absolute -top-2 left-2 px-1 bg-white text-[0.625rem] font-bold uppercase text-[#203C94]">
        Pick-up Location
      </label>
      <input
        type="text"
        value={formData.location || ''}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        className="w-full pl-10 pr-3 h-11 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-[#1A3994] focus:ring-2 focus:ring-[#0891B2]/20 focus:border-[#0891B2] shadow-sm transition-all"
        placeholder="Airport or city"
      />
    </div>
  );

  const renderTourFields = () => (
    <div className="relative group">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons-round text-slate-600 text-lg group-focus-within:text-[#0891B2] transition-colors">
        tour
      </span>
      <label className="absolute -top-2 left-2 px-1 bg-white text-[0.625rem] font-bold uppercase text-[#203C94]">
        Destination
      </label>
      <input
        type="text"
        value={formData.destination || ''}
        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
        className="w-full pl-10 pr-3 h-11 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-[#1A3994] focus:ring-2 focus:ring-[#0891B2]/20 focus:border-[#0891B2] shadow-sm transition-all"
        placeholder="City or region"
      />
    </div>
  );

  const renderLocationFields = () => {
    switch (productType) {
      case 'flight':
      case 'package':
        return renderFlightFields();
      case 'hotel':
        return renderHotelFields();
      case 'car':
        return renderCarFields();
      case 'tour':
        return renderTourFields();
    }
  };

  const renderGuestField = () => {
    const useGuests = productType === 'hotel' || productType === 'tour';
    const value = useGuests ? formData.guests : formData.passengers;
    const onChange = (val: string) => {
      if (useGuests) {
        setFormData({ ...formData, guests: val });
      } else {
        setFormData({ ...formData, passengers: val });
      }
    };

    return (
      <div className="relative group">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons-round text-slate-600 text-lg group-focus-within:text-[#203C94] transition-colors">
          person
        </span>
        <label className="absolute -top-2 left-2 px-1 bg-white text-[0.625rem] font-bold uppercase text-[#203C94]">
          {useGuests ? 'Guests' : 'Passengers'}
        </label>
        <select
          value={value || '2 Adults, 1 Room'}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-3 h-11 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-[#1A3994] focus:ring-2 focus:ring-[#203C94]/20 focus:border-[#203C94] shadow-sm transition-all appearance-none"
        >
          <option>1 Adult, 1 Room</option>
          <option>2 Adults, 1 Room</option>
          <option>2 Adults, 2 Children, 1 Room</option>
          <option>3 Adults, 2 Rooms</option>
          <option>4 Adults, 2 Rooms</option>
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 material-icons-round text-slate-600 text-lg pointer-events-none">
          expand_more
        </span>
      </div>
    );
  };

  // Determine grid columns based on product type
  const getGridCols = () => {
    switch (productType) {
      case 'flight':
      case 'package':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5'; // from, to, dates, guests, button
      case 'hotel':
      case 'tour':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'; // destination, dates, guests, button
      case 'car':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'; // location, dates, button
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 shadow-lg animate-fade-in-down z-30 relative">
      <div className="container mx-auto px-4 md:px-6 py-4 bg-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-600 hover:text-[#203C94] transition-colors z-10 w-8 h-8 rounded-full hover:bg-slate-50 flex items-center justify-center"
          aria-label="Close search widget"
        >
          <span className="material-icons-round text-xl">close</span>
        </button>

        <form
          onSubmit={handleSubmit}
          className={`grid ${getGridCols()} gap-3 pr-12 md:pr-0 items-end`}
        >
          {renderLocationFields()}

          <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons-round text-slate-600 text-lg group-focus-within:text-[#203C94] transition-colors">
              calendar_today
            </span>
            <label className="absolute -top-2 left-2 px-1 bg-white text-[0.625rem] font-bold uppercase text-[#203C94]">
              Dates
            </label>
            <input
              type="text"
              value={formData.dates}
              onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
              className="w-full pl-10 pr-3 h-11 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-[#1A3994] focus:ring-2 focus:ring-[#203C94]/20 focus:border-[#203C94] shadow-sm transition-all"
              placeholder="Select dates"
            />
          </div>

          {productType !== 'car' && renderGuestField()}

          <button
            type="submit"
            className="h-11 bg-[#203C94] text-white font-bold uppercase text-xs rounded-lg shadow-md hover:bg-[#1A3994] hover:shadow-lg transition-all active:scale-95"
          >
            Update Search
          </button>
        </form>
      </div>
    </div>
  );
}
