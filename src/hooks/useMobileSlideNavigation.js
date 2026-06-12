import { useState, useEffect, useCallback, useRef } from 'react'

const SWIPE_THRESHOLD = 50
const SWIPE_VELOCITY_THRESHOLD = 0.5

export function useMobileSlideNavigation(totalSlides) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchEndX = useRef(0)
  const touchEndY = useRef(0)
  const lastSwipeTime = useRef(Date.now())

  const goToSlide = useCallback(
    (index) => {
      if (index < 0 || index >= totalSlides) return
      const newDir = index > activeSlide ? 1 : -1
      setDirection(newDir)
      setActiveSlide(index)
    },
    [activeSlide, totalSlides]
  )

  const nextSlide = useCallback(() => {
    const next = (activeSlide + 1) % totalSlides
    goToSlide(next)
  }, [activeSlide, totalSlides, goToSlide])

  const prevSlide = useCallback(() => {
    const prev = activeSlide === 0 ? totalSlides - 1 : activeSlide - 1
    goToSlide(prev)
  }, [activeSlide, totalSlides, goToSlide])

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    lastSwipeTime.current = Date.now()
  }, [])

  const handleTouchEnd = useCallback(
    (e) => {
      touchEndX.current = e.changedTouches[0].clientX
      touchEndY.current = e.changedTouches[0].clientY

      const deltaX = touchStartX.current - touchEndX.current
      const deltaY = Math.abs(touchStartY.current - touchEndY.current)
      const timeDelta = (Date.now() - lastSwipeTime.current) / 1000

      // Only trigger swipe if horizontal movement is greater than vertical
      if (deltaY < Math.abs(deltaX)) {
        const velocity = Math.abs(deltaX) / timeDelta

        // Swipe right to left (next slide)
        if (deltaX > SWIPE_THRESHOLD || velocity > SWIPE_VELOCITY_THRESHOLD) {
          nextSlide()
        }
        // Swipe left to right (prev slide)
        else if (deltaX < -SWIPE_THRESHOLD || velocity > SWIPE_VELOCITY_THRESHOLD) {
          prevSlide()
        }
      }
    },
    [nextSlide, prevSlide]
  )

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextSlide()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  return {
    activeSlide,
    goToSlide,
    nextSlide,
    prevSlide,
    handleTouchStart,
    handleTouchEnd,
    direction,
  }
}
