export default function SlideNavigation({ activeSlide, totalSlides, onPrev, onNext, onDotClick }) {
  return (
    <div className="fixed bottom-8 left-0 right-0 z-40 flex flex-col items-center gap-6 px-6">
      {/* Dot indicators */}
      <div
        className="flex gap-2 items-center justify-center"
        role="tablist"
        aria-label="Section navigation"
      >
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00CCFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060214]"
            style={{
              width: index === activeSlide ? 28 : 8,
              height: 8,
              background: index === activeSlide ? '#00CCFF' : 'rgba(228,243,247,0.25)',
              cursor: 'pointer',
            }}
            role="tab"
            aria-selected={index === activeSlide}
            aria-label={`Go to section ${index + 1}`}
            aria-controls={`slide-${index}`}
          />
        ))}
      </div>

      {/* Arrow controls */}
      <div className="flex gap-3 items-center">
        {/* Previous button */}
        <button
          onClick={onPrev}
          className="w-10 h-10 rounded-sm border border-[#00CCFF]/25 flex items-center justify-center
                     text-[#00CCFF] hover:bg-[#00CCFF]/10 active:scale-95 transition-all duration-200
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00CCFF]"
          aria-label="Previous section"
          title="Previous section (Left arrow)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Counter */}
        <span className="text-[#E4F3F7]/50 text-xs font-display tracking-widest w-12 text-center">
          {String(activeSlide + 1).padStart(2, '0')}/{String(totalSlides).padStart(2, '0')}
        </span>

        {/* Next button */}
        <button
          onClick={onNext}
          className="w-10 h-10 rounded-sm border border-[#00CCFF]/25 flex items-center justify-center
                     text-[#00CCFF] hover:bg-[#00CCFF]/10 active:scale-95 transition-all duration-200
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00CCFF]"
          aria-label="Next section"
          title="Next section (Right arrow)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Swipe hint */}
      <p className="text-center text-[#E4F3F7]/30 text-xs tracking-[0.1em] uppercase">
        Swipe or use arrow keys
      </p>
    </div>
  )
}
