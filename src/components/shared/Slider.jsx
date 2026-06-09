import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

/**
 * Reusable horizontal slider for mobile-friendly carousel behavior.
 * Children are laid out horizontally and can be dragged with smooth snap.
 * No navigation arrows – user drags/swipes. Transition is handled by framer‑motion's spring.
 */
export default function Slider({ children, className = '', autoplay = false }) {
  const containerRef = useRef(null);
  const [dragLimit, setDragLimit] = useState(0);
  const autoplayRef = useRef(null);

  // Re‑calculate drag constraints and setup autoplay if enabled
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const limit = container.scrollWidth - container.offsetWidth;
        setDragLimit(limit > 0 ? limit : 0);
        if (autoplay) {
          // Clean previous animation
          if (autoplayRef.current) {
            autoplayRef.current.kill();
          }
          // Animate scroll left continuously with 5 seconds per slide (max 10s)
          const duration = Math.max(5, Math.min(10, limit / container.offsetWidth * 5));
          autoplayRef.current = gsap.to(container, {
            scrollLeft: limit,
            duration: duration * (limit / container.offsetWidth),
            ease: 'none',
            repeat: -1,
            onRepeat: () => { container.scrollLeft = 0; },
          });
        }
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
      if (autoplayRef.current) autoplayRef.current.kill();
    };
  }, [autoplay]);

  return (
    <motion.div
      ref={containerRef}
      className={`flex overflow-x-auto snap-x snap-mandatory scrollbar-hide ${className}`}
      drag="x"
      dragConstraints={{ left: -dragLimit, right: 0 }}
      dragElastic={0.1}
      whileTap={{ cursor: 'grabbing' }}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div key={i} className="flex-shrink-0 snap-start">
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
