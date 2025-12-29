import { AppShell } from './components/AppShell';

export default function HotelPreview() {
  const searchContext = {
    destination: 'Dubai, UAE',
    dates: 'Jan 10 - Jan 17, 2026',
    guests: '2 Adults, 1 Room',
  };

  const productData = {
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
    <AppShell
      productType="hotel"
      showContextBar={true}
      searchContext={searchContext}
      productContext={productData}
    >
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Hotel Search Results Content */}
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Hotels in Dubai</h1>
          <p className="text-slate-600 mb-8">
            {productData.hotel.nights} nights • {productData.hotel.guests} • {searchContext.dates}
          </p>

          {/* Sample Hotel Card - Selected */}
          <div className="bg-white border-2 border-[#203C94] rounded-lg shadow-md overflow-hidden mb-4">
            <div className="p-6">
              <div className="flex gap-6">
                {/* Hotel Image */}
                <div className="flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=240&fit=crop"
                    alt="Burj Al Arab Jumeirah"
                    className="w-72 h-48 object-cover rounded-lg"
                  />
                </div>

                {/* Hotel Details */}
                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-slate-900">{productData.hotel.name}</h3>
                        <div className="flex items-center gap-1 text-[#FFB800]">
                          {Array.from({ length: productData.hotel.starRating }).map((_, i) => (
                            <span key={i} className="material-icons-round text-base">
                              star
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                        <span className="material-icons-round text-lg text-[#0891B2]">location_on</span>
                        Jumeirah Beach, Dubai
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <span className="material-icons-round text-lg text-[#FFB800]">star</span>
                          <span className="font-semibold text-slate-900">9.4</span>
                          <span className="text-sm text-slate-600">Exceptional</span>
                        </div>
                        <span className="text-sm text-slate-600">2,847 reviews</span>
                      </div>
                    </div>
                  </div>

                  {/* Room Details */}
                  <div className="bg-slate-50 rounded-lg p-4 mb-4">
                    <div className="text-xs font-bold text-[#0891B2] uppercase mb-2">Selected Room</div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-slate-700">
                        <span className="material-icons-round text-lg text-slate-600">bed</span>
                        <span>{productData.hotel.roomType}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <span className="material-icons-round text-lg text-slate-600">restaurant</span>
                        <span>{productData.hotel.boardType}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <span className="material-icons-round text-lg text-slate-600">nights_stay</span>
                        <span>{productData.hotel.nights} nights</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <span className="material-icons-round text-lg text-slate-600">person</span>
                        <span>{productData.hotel.guests}</span>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                      <span className="material-icons-round text-sm">check_circle</span>
                      Free WiFi
                    </span>
                    <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                      <span className="material-icons-round text-sm">check_circle</span>
                      Pool
                    </span>
                    <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                      <span className="material-icons-round text-sm">check_circle</span>
                      Spa
                    </span>
                    <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                      <span className="material-icons-round text-sm">check_circle</span>
                      Beach Access
                    </span>
                    <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                      <span className="material-icons-round text-sm">check_circle</span>
                      Free Cancellation
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex-shrink-0 text-right">
                  <div className="text-xs text-slate-600 mb-1">Total for {productData.hotel.nights} nights</div>
                  <div className="text-3xl font-bold text-[#203C94] mb-1">£3,450</div>
                  <div className="text-sm text-slate-600 mb-4">£493 per night</div>
                  <button className="w-full h-11 px-6 bg-[#203C94] text-white font-bold uppercase text-xs rounded-lg shadow-md hover:bg-[#1A3994] hover:shadow-lg transition-all active:scale-95 mb-2">
                    Book Now
                  </button>
                  <button className="w-full h-9 px-4 bg-white border border-[#0891B2] text-[#0891B2] font-semibold text-xs rounded-lg hover:bg-[#0891B2] hover:text-white transition-all">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Hotel Options */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden mb-4">
            <div className="p-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=240&fit=crop"
                    alt="Hotel"
                    className="w-72 h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-slate-900">Atlantis The Palm</h3>
                        <div className="flex items-center gap-1 text-[#FFB800]">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className="material-icons-round text-base">
                              star
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                        <span className="material-icons-round text-lg text-[#0891B2]">location_on</span>
                        Palm Jumeirah, Dubai
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <span className="material-icons-round text-lg text-[#FFB800]">star</span>
                          <span className="font-semibold text-slate-900">9.1</span>
                          <span className="text-sm text-slate-600">Wonderful</span>
                        </div>
                        <span className="text-sm text-slate-600">4,521 reviews</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full">Deluxe King</span>
                        <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full">Bed & Breakfast</span>
                        <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full font-semibold">Free WiFi</span>
                        <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full font-semibold">Pool</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-600 mb-1">Total for 7 nights</div>
                      <div className="text-3xl font-bold text-[#203C94] mb-1">£2,695</div>
                      <div className="text-sm text-slate-600 mb-4">£385 per night</div>
                      <button className="w-full h-11 px-6 bg-white border border-[#203C94] text-[#203C94] font-bold uppercase text-xs rounded-lg hover:bg-[#203C94] hover:text-white transition-all mb-2">
                        Select
                      </button>
                      <button className="w-full h-9 px-4 bg-white border border-slate-300 text-slate-600 font-semibold text-xs rounded-lg hover:bg-slate-50 transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&h=240&fit=crop"
                    alt="Hotel"
                    className="w-72 h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-slate-900">Address Downtown</h3>
                        <div className="flex items-center gap-1 text-[#FFB800]">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className="material-icons-round text-base">
                              star
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                        <span className="material-icons-round text-lg text-[#0891B2]">location_on</span>
                        Downtown Dubai
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <span className="material-icons-round text-lg text-[#FFB800]">star</span>
                          <span className="font-semibold text-slate-900">8.9</span>
                          <span className="text-sm text-slate-600">Excellent</span>
                        </div>
                        <span className="text-sm text-slate-600">3,102 reviews</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full">Superior Room</span>
                        <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full">Room Only</span>
                        <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full font-semibold">Free WiFi</span>
                        <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full font-semibold">Gym</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-600 mb-1">Total for 7 nights</div>
                      <div className="text-3xl font-bold text-[#203C94] mb-1">£1,995</div>
                      <div className="text-sm text-slate-600 mb-4">£285 per night</div>
                      <button className="w-full h-11 px-6 bg-white border border-[#203C94] text-[#203C94] font-bold uppercase text-xs rounded-lg hover:bg-[#203C94] hover:text-white transition-all mb-2">
                        Select
                      </button>
                      <button className="w-full h-9 px-4 bg-white border border-slate-300 text-slate-600 font-semibold text-xs rounded-lg hover:bg-slate-50 transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
