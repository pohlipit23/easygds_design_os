import React, { useState } from 'react';

interface HeaderProps {
  onSearchToggle: () => void;
  onRegionalSettingsToggle: () => void;
  onFlightDetailsToggle?: () => void;
  searchContext?: {
    from?: string;
    to?: string;
    destination?: string;
    location?: string;
    dates: string;
    passengers?: string;
    guests?: string;
  };
  flightContext?: {
    outbound: { time: string; code: string; flight: string };
    return: { time: string; code: string; flight: string };
  };
  currentCurrency?: string;
  currentFlag?: string;
}

export function Header({
  onSearchToggle,
  onRegionalSettingsToggle,
  onFlightDetailsToggle,
  searchContext,
  flightContext,
  currentCurrency = 'GBP',
  currentFlag = 'gb',
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleModifyFromMobile = () => {
    setMobileMenuOpen(false);
    onSearchToggle();
  };

  return (
    <nav className="shrink-0 z-50 bg-white border-b border-stone-200 shadow-sm relative">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/easygds_logo_white.jpg" alt="easyGDS" className="h-7 object-contain" />
            <div className="h-6 w-px bg-stone-300"></div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onRegionalSettingsToggle}
              className="flex items-center gap-2 px-3 h-10 rounded-lg hover:bg-stone-50 text-stone-600 hover:text-[#203C94] transition-colors group"
              aria-label="Regional settings"
            >
              <img
                src={`https://flagcdn.com/w20/${currentFlag}.png`}
                className="w-5 h-auto rounded shadow-sm transition-opacity"
                alt={currentFlag.toUpperCase()}
              />
              <span className="text-xs font-semibold text-[#1A3994]">{currentCurrency}</span>
              <span className="material-icons-round text-lg text-stone-600 group-hover:text-[#203C94] transition-colors">
                expand_more
              </span>
            </button>
            <div className="h-6 w-px bg-stone-300"></div>
            <button
              className="w-10 h-10 rounded-full hover:bg-stone-50 text-stone-600 hover:text-[#203C94] transition-colors flex items-center justify-center"
              aria-label="User account"
            >
              <span className="material-icons-round text-2xl">person_outline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden bg-white relative z-40">
        <div className="h-14 flex items-center justify-between px-4 w-full">
          <img src="/easygds_logo_white.jpg" alt="easyGDS" className="h-6 object-contain" />

          {searchContext && (
            <button
              onClick={toggleMobileMenu}
              className="flex flex-col items-center justify-center px-3 h-11 rounded-lg hover:bg-stone-50 transition-colors group"
            >
              <div className="flex items-center gap-1 text-sm font-semibold text-[#1A3994]">
                {searchContext.from && searchContext.to ? (
                  <>
                    <span>{searchContext.from.split(' ')[0]}</span>
                    <span className="text-stone-300 material-icons-round text-sm">arrow_forward</span>
                    <span>{searchContext.to.split(' ')[0]}</span>
                  </>
                ) : searchContext.destination ? (
                  <span>{searchContext.destination.split(',')[0]}</span>
                ) : searchContext.location ? (
                  <span>{searchContext.location.split(',')[0]}</span>
                ) : null}
                <span
                  className="material-icons-round text-[#203C94] text-lg transform transition-transform duration-200"
                  style={{ transform: mobileMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  expand_more
                </span>
              </div>
              <div className="text-[0.625rem] text-stone-600 font-medium mt-0.5">
                {searchContext.dates}
                {searchContext.passengers && ' • Flight Incl.'}
                {searchContext.guests && ` • ${searchContext.guests.split(',')[0]}`}
              </div>
            </button>
          )}

          <div className="flex items-center gap-1">
            <button
              onClick={onRegionalSettingsToggle}
              className="w-11 h-11 rounded-full hover:bg-stone-50 text-stone-600 hover:text-[#203C94] transition-colors flex items-center justify-center"
              aria-label="Regional settings"
            >
              <img
                src={`https://flagcdn.com/w20/${currentFlag}.png`}
                className="w-5 h-auto rounded shadow-sm"
                alt={currentFlag.toUpperCase()}
              />
            </button>
            <button
              className="w-11 h-11 rounded-full hover:bg-stone-50 text-stone-600 hover:text-[#203C94] transition-colors flex items-center justify-center"
              aria-label="User account"
            >
              <span className="material-icons-round text-2xl">person_outline</span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && flightContext && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg border-b border-stone-200 overflow-hidden origin-top animate-fade-in">
            <div className="p-4 space-y-3 bg-stone-50/50">
              <div className="bg-white p-3 rounded-lg border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-stone-200">
                  <span className="text-xs font-bold text-[#203C94] uppercase flex items-center gap-2">
                    <span className="material-icons-round text-lg">flight</span> Itinerary
                  </span>
                  <span className="text-[0.625rem] text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full font-semibold">
                    Included
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1A3994]">{flightContext.outbound.time}</span>
                    <span className="text-stone-300">-------</span>
                    <span className="font-semibold text-[#1A3994]">{flightContext.return.time}</span>
                  </div>
                </div>
              </div>

              {searchContext && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white p-2.5 rounded-lg border border-stone-200">
                    <div className="text-[0.625rem] text-stone-600 uppercase font-bold mb-1">Dates</div>
                    <div className="text-xs font-semibold text-[#1A3994]">{searchContext.dates}</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-stone-200">
                    <div className="text-[0.625rem] text-stone-600 uppercase font-bold mb-1">Guests</div>
                    <div className="text-xs font-semibold text-[#1A3994]">
                      {searchContext.passengers || searchContext.guests}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 p-4 pt-0">
              <button
                onClick={toggleMobileMenu}
                className="flex-1 h-11 bg-white border border-stone-200 text-stone-600 rounded-lg text-xs font-bold uppercase shadow-sm hover:border-stone-300 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleModifyFromMobile}
                className="flex-1 h-11 bg-[#203C94] text-white border border-[#203C94] rounded-lg text-xs font-bold uppercase shadow-sm hover:bg-[#1A3994] flex items-center justify-center gap-2 transition-all hover:shadow-md active:scale-95"
              >
                <span className="material-icons-round text-lg">edit</span> Modify
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
