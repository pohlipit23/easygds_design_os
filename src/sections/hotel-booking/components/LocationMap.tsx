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
    <div className="space-y-4">
      {/* Map Placeholder - Compact */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="aspect-[21/9] bg-slate-100 dark:bg-slate-700 relative">
          {/* Map placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="material-icons-round text-[#0891B2] text-5xl mb-2 block">map</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">{address}</p>
            </div>
          </div>

          {/* Pin marker in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
            <span className="material-icons-round text-[#203C94] dark:text-[#0891B2] text-4xl drop-shadow-lg">
              location_on
            </span>
          </div>
        </div>
      </div>

      {/* Nearby Attractions - Compact */}
      {nearbyAttractions.length > 0 && (
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">
            Nearby Attractions
          </h3>
          <div className="space-y-2">
            {nearbyAttractions.slice(0, 5).map((attraction, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
              >
                <span className="material-icons-round text-[#0891B2] text-base">place</span>
                <span>{attraction}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
