interface LocationMapProps {
  hotelName: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  nearbyAttractions: string[]
}

export function LocationMap({
  hotelName,
  address,
  coordinates,
  nearbyAttractions,
}: LocationMapProps) {
  return (
    <div className="space-y-6">
      {/* Map Placeholder */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="aspect-[16/9] bg-slate-100 dark:bg-slate-700 relative">
          {/* Map placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="material-icons-round text-[#0891B2] text-6xl mb-4 block">map</span>
              <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{hotelName}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">{address}</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
              </p>
            </div>
          </div>

          {/* Pin marker in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
            <span className="material-icons-round text-[#203C94] dark:text-[#0891B2] text-5xl drop-shadow-lg">
              location_on
            </span>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span className="material-icons-round text-lg">location_on</span>
            <span>{address}</span>
          </div>
          <button className="px-4 h-9 bg-[#203C94] dark:bg-[#0891B2] text-white text-xs font-bold uppercase rounded-lg hover:bg-[#1A3994] dark:hover:bg-[#06829A] transition-all">
            View on Map
          </button>
        </div>
      </div>

      {/* Nearby Attractions */}
      {nearbyAttractions.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-4 tracking-wide flex items-center gap-2">
            <span className="material-icons-round text-[#0891B2] text-lg">explore</span>
            Nearby Attractions
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {nearbyAttractions.map((attraction, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600"
              >
                <span className="material-icons-round text-[#203C94] dark:text-[#0891B2] text-xl">
                  place
                </span>
                <span className="text-sm text-slate-900 dark:text-white">{attraction}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Getting There */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-4 tracking-wide flex items-center gap-2">
          <span className="material-icons-round text-[#0891B2] text-lg">directions</span>
          Getting There
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600">
            <span className="material-icons-round text-[#203C94] dark:text-[#0891B2] text-xl mt-0.5">
              flight
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                Dubai International Airport (DXB)
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                25 minutes by car • 18 km
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600">
            <span className="material-icons-round text-[#203C94] dark:text-[#0891B2] text-xl mt-0.5">
              train
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                Dubai Metro
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                5 minutes walk from nearest station
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
