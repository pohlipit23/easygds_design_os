import { AppShell } from './components/AppShell';

export default function PackagePreview() {
  const searchContext = {
    from: 'Almaty (ALA)',
    to: 'Dubai (DXB)',
    dates: 'Dec 15 - Dec 22, 2025',
    passengers: '2 Adults, 1 Room',
  };

  const productData = {
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

  return (
    <AppShell
      productType="package"
      showContextBar={true}
      searchContext={searchContext}
      productContext={productData}
    >
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Package Search Results Content */}
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Flight + Hotel Packages to Dubai
          </h1>
          <p className="text-slate-600 mb-8">
            7 nights • 2 adults • {searchContext.dates}
          </p>

          {/* Sample Package Card */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden mb-4">
            <div className="p-6">
              {/* Flight Summary */}
              <div className="mb-6">
                <div className="text-xs font-bold text-[#203C94] uppercase mb-3 flex items-center gap-2">
                  <span className="material-icons-round text-lg">flight</span>
                  Included Flights
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="material-icons-round text-slate-600 rotate-90">flight</span>
                    <div>
                      <div className="font-semibold text-slate-900">
                        {productData.outbound.departTime} ALA → {productData.outbound.arriveTime} DXB
                      </div>
                      <div className="text-xs text-slate-600">{productData.outbound.flightNumber} • {productData.outbound.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="material-icons-round text-slate-600 -rotate-90">flight</span>
                    <div>
                      <div className="font-semibold text-slate-900">
                        {productData.return.departTime} DXB → {productData.return.arriveTime} ALA
                      </div>
                      <div className="text-xs text-slate-600">{productData.return.flightNumber} • {productData.return.duration}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                {/* Hotel Summary */}
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=150&fit=crop"
                      alt="Atlantis The Palm"
                      className="w-32 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-slate-900">{productData.hotel.name}</h3>
                        <div className="flex items-center gap-1 text-[#FFB800]">
                          {Array.from({ length: productData.hotel.starRating }).map((_, i) => (
                            <span key={i} className="material-icons-round text-sm">star</span>
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-slate-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="material-icons-round text-lg">bed</span>
                          {productData.hotel.roomType}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-icons-round text-lg">restaurant</span>
                          {productData.hotel.boardType}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-icons-round text-lg">calendar_today</span>
                          {productData.hotel.nights} nights • {productData.hotel.guests}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-600 mb-1">Total Package Price</div>
                    <div className="text-2xl font-bold text-[#203C94]">£1,895</div>
                    <div className="text-xs text-green-600 font-semibold">Save £245 vs separate booking</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-t border-slate-200">
              <div className="flex items-center gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <span className="material-icons-round text-lg text-green-600">check_circle</span>
                  Free cancellation
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-icons-round text-lg text-green-600">check_circle</span>
                  No hidden fees
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-icons-round text-lg text-[#FFB800]">loyalty</span>
                  Earn rewards
                </div>
              </div>
              <button className="h-11 px-6 bg-[#203C94] text-white font-bold uppercase text-xs rounded-lg shadow-md hover:bg-[#1A3994] hover:shadow-lg transition-all active:scale-95">
                Select Package
              </button>
            </div>
          </div>

          {/* Additional Package Options */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden mb-4 opacity-60">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&h=150&fit=crop"
                    alt="Hotel"
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">Jumeirah Beach Hotel</h3>
                      <div className="flex items-center gap-1 text-[#FFB800]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="material-icons-round text-sm">star</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-slate-600">Same flights • 7 nights • Half Board</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#203C94]">£2,145</div>
                  <div className="text-xs text-slate-600">Total package price</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden opacity-60">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=200&h=150&fit=crop"
                    alt="Hotel"
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">Address Downtown</h3>
                      <div className="flex items-center gap-1 text-[#FFB800]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="material-icons-round text-sm">star</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-slate-600">Same flights • 7 nights • Bed & Breakfast</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#203C94]">£1,695</div>
                  <div className="text-xs text-slate-600">Total package price</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
