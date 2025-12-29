interface PhotoGalleryProps {
  images: string[]
  hotelName: string
  selectedIndex: number
  onImageSelect: (index: number) => void
}

export function PhotoGallery({
  images,
  hotelName,
  selectedIndex,
  onImageSelect,
}: PhotoGalleryProps) {
  return (
    <div className="bg-white dark:bg-slate-800">
      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Main Image */}
        <div className="relative rounded-lg overflow-hidden aspect-[16/9] bg-slate-100 dark:bg-slate-700">
          <img
            src={images[selectedIndex]}
            alt={`${hotelName} - Photo ${selectedIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => onImageSelect(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 transition-all shadow-md"
                aria-label="Previous image"
              >
                <span className="material-icons-round text-slate-900 dark:text-white text-xl">chevron_left</span>
              </button>
              <button
                onClick={() => onImageSelect(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 transition-all shadow-md"
                aria-label="Next image"
              >
                <span className="material-icons-round text-slate-900 dark:text-white text-xl">chevron_right</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
