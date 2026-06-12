import { useMobileSlideNavigation } from '../hooks/useMobileSlideNavigation'
import SlideNavigation from './SlideNavigation'

export default function MobileSlideLayout({ sections }) {
  const { activeSlide, goToSlide, nextSlide, prevSlide, handleTouchStart, handleTouchEnd } = useMobileSlideNavigation(sections.length)

  return (
    <div className="md:hidden fixed inset-0 bg-[#060214] overflow-hidden">
      {/* Slide container */}
      <div
        className="relative w-full h-full flex"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="Section carousel - swipe to navigate"
        aria-live="polite"
      >
        {sections.map((Section, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 overflow-y-auto"
            style={{
              transform: `translateX(${(index - activeSlide) * 100}%)`,
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            role="tabpanel"
            aria-label={`Section ${index + 1} of ${sections.length}`}
            aria-hidden={index !== activeSlide}
          >
            <Section />
          </div>
        ))}
      </div>

      {/* Navigation controls */}
      <SlideNavigation
        activeSlide={activeSlide}
        totalSlides={sections.length}
        onPrev={prevSlide}
        onNext={nextSlide}
        onDotClick={goToSlide}
      />
    </div>
  )
}
