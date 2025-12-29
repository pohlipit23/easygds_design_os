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
    <div className="space-y-6">
      {/* Overall Rating */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Score */}
          <div className="flex-shrink-0">
            <div className="bg-[#203C94] dark:bg-[#1A3994] rounded-2xl p-6 text-white text-center">
              <div className="text-5xl font-bold mb-2">{overallRating.toFixed(1)}</div>
              <div className="text-sm font-semibold mb-1">{getRatingLabel(overallRating)}</div>
              <div className="text-xs opacity-90">{totalReviews.toLocaleString()} reviews</div>
            </div>
          </div>

          {/* Category Ratings */}
          <div className="flex-grow">
            <h3 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-4 tracking-wide">
              Rating Breakdown
            </h3>
            <div className="space-y-3">
              {Object.entries(categories).map(([category, rating]) => (
                <div key={category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm capitalize text-slate-700 dark:text-slate-300">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0891B2] rounded-full transition-all"
                      style={{ width: `${(rating / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
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

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-12 text-center">
            <span className="material-icons-round text-slate-300 dark:text-slate-600 text-6xl mb-4 block">
              rate_review
            </span>
            <p className="text-slate-600 dark:text-slate-400">No reviews yet</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:border-slate-300 dark:hover:border-slate-600 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-[#203C94] dark:bg-[#0891B2] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {review.guestName.charAt(0)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {review.guestName}
                      </span>
                      {review.verified && (
                        <span className="flex items-center gap-1 text-xs text-[#0891B2] dark:text-[#0891B2] bg-[#0891B2]/10 px-2 py-0.5 rounded-full">
                          <span className="material-icons-round text-xs">verified</span>
                          Verified
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {formatDate(review.date)}
                    </span>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="flex-shrink-0 bg-[#203C94] dark:bg-[#1A3994] text-white px-3 py-1.5 rounded-lg font-bold text-sm">
                  {review.rating.toFixed(1)}
                </div>
              </div>

              {/* Review Title */}
              {review.title && (
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                  {review.title}
                </h4>
              )}

              {/* Review Comment */}
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {review.comment}
              </p>

              {/* Helpful Actions */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center gap-4">
                <button className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 hover:text-[#203C94] dark:hover:text-[#0891B2] transition-colors">
                  <span className="material-icons-round text-lg">thumb_up</span>
                  Helpful (23)
                </button>
                <button className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 hover:text-[#203C94] dark:hover:text-[#0891B2] transition-colors">
                  <span className="material-icons-round text-lg">flag</span>
                  Report
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More */}
      {reviews.length > 0 && (
        <div className="text-center pt-2">
          <button className="px-12 h-11 border-2 border-slate-300 dark:border-slate-600 rounded-full text-xs font-bold uppercase hover:border-[#203C94] dark:hover:border-[#0891B2] hover:text-[#203C94] dark:hover:text-[#0891B2] transition-all text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:shadow-md active:scale-95">
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  )
}
