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
      <div className="container mx-auto px-4 md:px-6 py-6">
        {/* Main Image */}
        <div className="relative rounded-xl overflow-hidden mb-4 aspect-[16/9] md:aspect-[21/9] bg-slate-100 dark:bg-slate-700">
          <img
            src={images[selectedIndex]}
            alt={`${hotelName} - Photo ${selectedIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-semibold">
            {selectedIndex + 1} / {images.length}
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => onImageSelect(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 transition-all shadow-lg"
                aria-label="Previous image"
              >
                <span className="material-icons-round text-slate-900 dark:text-white">chevron_left</span>
              </button>
              <button
                onClick={() => onImageSelect(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 transition-all shadow-lg"
                aria-label="Next image"
              >
                <span className="material-icons-round text-slate-900 dark:text-white">chevron_right</span>
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Strip */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onImageSelect(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === selectedIndex
                  ? 'border-[#203C94] dark:border-[#0891B2] scale-105'
                  : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <img
                src={image}
                alt={`${hotelName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
