import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
} from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';

/**
 * MobileCarousel
 *
 * On mobile (≤768 px): Framer Motion drag-based slider.
 *   - 85 vw cards with peek effect
 *   - Spring-physics drag with snap-to-card
 *   - Auto-scroll every 4 s, pauses on touch (resumes after 2.2 s)
 *   - Expanding pill pagination dots
 *   - Animated swipe-hint chevron
 *
 * On desktop: renders children in the provided `className` div unchanged
 *   so GSAP-driven horizontal scroll / pinning works without interference.
 */
const MobileCarousel = forwardRef(function MobileCarousel(
  { children, className },
  forwardedRef
) {
  /* ── Flatten children, strip desktop-only spacers (hidden md:block) ── */
  const allItems = React.Children.toArray(children).filter(Boolean);
  
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  // On mobile, filter out invisible spacers (they have className containing 'hidden')
  const items = isMobile
    ? allItems.filter((child) => {
        if (!React.isValidElement(child)) return false;
        const cls = child.props?.className ?? '';
        return !cls.includes('hidden');
      })
    : allItems;

  const count = items.length;

  /* ── State ── */
  const [activeIndex, setActiveIndex] = useState(0);
  const pauseRef = useRef(false);
  const autoTimerRef = useRef(null);

  /* ── Framer Motion ── */
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);

  /* ── Sizing helpers ── */
  const CARD_VW = 85;
  const GAP = 16;
  const getCardW = () => (window.innerWidth * CARD_VW) / 100;
  const offsetFor = (idx) => -(idx * (getCardW() + GAP));

  /* ── Detect mobile ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── Slide to index ── */
  const slideTo = useCallback(
    (idx) => {
      const clamped = Math.max(0, Math.min(idx, count - 1));
      setActiveIndex(clamped);
      controls.start({
        x: offsetFor(clamped),
        transition: {
          type: 'spring',
          stiffness: 320,
          damping: 36,
          mass: 0.85,
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, controls]
  );

  /* ── Sync position whenever activeIndex or isMobile changes ── */
  useEffect(() => {
    if (!isMobile) return;
    controls.start({
      x: offsetFor(activeIndex),
      transition: { type: 'spring', stiffness: 320, damping: 36, mass: 0.85 },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isMobile]);

  /* ── Auto-scroll ── */
  const scheduleNext = useCallback(() => {
    clearTimeout(autoTimerRef.current);
    autoTimerRef.current = window.setTimeout(() => {
      if (!pauseRef.current) {
        setActiveIndex((prev) => {
          const next = prev >= count - 1 ? 0 : prev + 1;
          controls.start({
            x: offsetFor(next),
            transition: { type: 'spring', stiffness: 320, damping: 36, mass: 0.85 },
          });
          return next;
        });
      }
      scheduleNext();
    }, 4000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, controls]);

  useEffect(() => {
    if (!isMobile || count <= 1) return;
    scheduleNext();
    return () => clearTimeout(autoTimerRef.current);
  }, [isMobile, count, scheduleNext]);

  const pauseAutoScroll = () => { pauseRef.current = true; };
  const resumeAutoScroll = () => {
    setTimeout(() => { pauseRef.current = false; }, 2200);
  };

  /* ── Drag end: snap to nearest card by velocity / offset ── */
  const handleDragEnd = (_, info) => {
    setIsDragging(false);
    resumeAutoScroll();
    const { offset, velocity } = info;
    if (velocity.x < -350 || offset.x < -60) {
      slideTo(Math.min(activeIndex + 1, count - 1));
    } else if (velocity.x > 350 || offset.x > 60) {
      slideTo(Math.max(activeIndex - 1, 0));
    } else {
      slideTo(activeIndex); // bounce back
    }
  };

  /* ════════════════════════════════════════════
     DESKTOP — pass-through, GSAP controls this
     ════════════════════════════════════════════ */
  if (!isMobile) {
    return (
      <div ref={forwardedRef} className={className}>
        {children}
      </div>
    );
  }

  /* ════════════════════════════════════════════
     MOBILE — Framer Motion drag slider
     ════════════════════════════════════════════ */
  return (
    <div className="w-full relative" style={{ overflow: 'hidden' }}>
      {/* Drag track */}
      <motion.div
        ref={forwardedRef}
        style={{
          x,
          display: 'flex',
          gap: `${GAP}px`,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 8,
          paddingBottom: 8,
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
        animate={controls}
        drag="x"
        dragConstraints={{
          left: offsetFor(count - 1) - GAP,
          right: GAP,
        }}
        dragElastic={0.06}
        onDragStart={() => {
          setIsDragging(true);
          pauseAutoScroll();
        }}
        onDragEnd={handleDragEnd}
      >
        {items.map((child, i) => (
          <div
            key={i}
            style={{
              flex: `0 0 ${CARD_VW}vw`,
              pointerEvents: isDragging ? 'none' : 'auto',
            }}
            className="carousel-card"
          >
            {/* Premium glass wrapper */}
            <div
              style={{
                height: '100%',
                background: 'rgba(10, 4, 28, 0.65)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                boxShadow:
                  '0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {child}
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── Pagination dots ── */}
      {count > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 7,
            marginTop: 20,
            marginBottom: 4,
          }}
        >
          {items.map((_, i) => (
            <motion.button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => { pauseAutoScroll(); slideTo(i); resumeAutoScroll(); }}
              style={{ height: 6, borderRadius: 99 }}
              animate={{
                width: i === activeIndex ? 24 : 7,
                backgroundColor: i === activeIndex
                  ? '#00CCFF'
                  : 'rgba(228,243,247,0.22)',
                opacity: 1,
              }}
              transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
              className="border-0 p-0 outline-none focus:outline-none"
            />
          ))}
        </div>
      )}

      {/* ── Swipe hint chevron ── */}
      <motion.div
        style={{
          position: 'absolute',
          right: 10,
          top: '44%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
        animate={{ x: [0, 7, 0], opacity: [0.22, 0.65, 0.22] }}
        transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#00CCFF"
          strokeWidth={2.5}
          style={{ filter: 'drop-shadow(0 0 6px rgba(0,204,255,0.7))' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </motion.div>
    </div>
  );
});

export default MobileCarousel;
