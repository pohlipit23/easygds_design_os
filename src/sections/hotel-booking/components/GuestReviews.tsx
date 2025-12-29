interface GuestReview {
  id: string
  hotelId: string
  guestName: string
  rating: number
  title?: string
  comment: string
  date: string
  verified?: boolean
}

interface GuestReviewsProps {
  reviews: GuestReview[]
  overallRating: number
  totalReviews: number
  categories: {
    cleanliness: number
    location: number
    service: number
    facilities: number
    valueForMoney: number
  }
}

export function GuestReviews({
  reviews,
  overallRating,
  totalReviews,
  categories,
}: GuestReviewsProps) {
  const getRatingLabel = (rating: number) => {
    if (rating >= 9) return 'Exceptional'
    if (rating >= 8) return 'Excellent'
    if (rating >= 7) return 'Very Good'
    if (rating >= 6) return 'Good'
    return 'Average'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="space-y-4">
      {/* Overall Rating - Compact */}
      <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="flex-shrink-0">
          <div className="bg-[#FFB800] text-slate-900 rounded-lg p-3 text-center min-w-[80px]">
            <div className="text-3xl font-bold">{overallRating.toFixed(1)}</div>
            <div className="text-xs font-bold">{getRatingLabel(overallRating)}</div>
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
            Based on {totalReviews.toLocaleString()} verified reviews
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(categories).slice(0, 4).map(([category, rating]) => (
              <div key={category} className="flex items-center gap-2">
                <span className="text-slate-600 dark:text-slate-400 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}:
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {rating.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Filter/Sort */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Guest Reviews
        </h3>
        <select className="px-4 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-[#203C94]/20 dark:focus:ring-[#0891B2]/20 focus:border-[#203C94] dark:focus:border-[#0891B2] transition-all appearance-none pr-10 bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-no-repeat bg-[center_right_0.75rem] bg-[length:1.25rem]">
          <option>Most Recent</option>
          <option>Highest Rating</option>
          <option>Lowest Rating</option>
          <option>Most Helpful</option>
        </select>
      </div>

      {/* Reviews List - Compact */}
      <div className="space-y-3">
        {reviews.length === 0 ? (
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8 text-center">
            <p className="text-slate-600 dark:text-slate-400 text-sm">No reviews yet</p>
          </div>
        ) : (
          reviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4"
            >
              <div className="flex items-start gap-3 mb-2">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-slate-700 dark:bg-slate-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {review.guestName.split(' ').map(n => n[0]).join('')}
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                        {review.guestName}
                      </span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`material-icons-round text-xs ${
                              i < review.rating ? 'text-[#FFB800]' : 'text-slate-300 dark:text-slate-600'
                            }`}
                          >
                            star
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                    Reviewed {formatDate(review.date)}
                  </div>

                  {/* Review Comment */}
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Show All Reviews Link */}
      {reviews.length > 3 && (
        <div className="text-center pt-2">
          <button className="text-sm font-semibold text-[#203C94] dark:text-[#0891B2] hover:underline">
            Show all {totalReviews.toLocaleString()} reviews
          </button>
        </div>
      )}
    </div>
  )
}
