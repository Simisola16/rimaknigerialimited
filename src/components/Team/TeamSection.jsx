import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

// Map member names to their public-folder images
const memberImages = {
  'Eko Oluwaseyi': '/Eko Oluwaseyi.png',
  'Babalola Gabriel': '/Babalola Gabriel.png',
  'Shuaib Lukman': '/Lukman Shuaib.jpeg',
  'Akinyode Samuel': '/Akinyode Samuel.png',
  'Fashola Kolapo': '/Fashola Kolapo.png',
  'Engr. Lawal A.A.': '/Lawal Ajetunmobi Abiodun.jpeg',
  'Ehis Odunayo': '/Eshin Odunayo.png',
  'Adigun A.A.': '/Adigun A.A..png',
  'Rafiu Idris': '/Rafiu Idris.png',
}

const teamMembers = [
  {
    name: 'Adigun A.A.',
    role: 'Managing Director',
    quals: 'BSc, PGD, MTech (Maths & Statitics)',
    initial: 'AA',
    color: '#00CCFF',
    accentBg: 'rgba(0,204,255,0.08)',
  },
  {
    name: 'Rafiu Idris',
    role: 'Executive Director',
    quals: 'HND · PGD · MNIQS · RQS',
    initial: 'RI',
    color: '#E4F3F7',
    accentBg: 'rgba(228,243,247,0.06)',
  },

  {
    name: 'Eko Oluwaseyi',
    role: 'Financial Director',
    quals: 'BSc, MSc Accounting · MNIM',
    initial: 'EO',
    color: '#E4F3F7',
    accentBg: 'rgba(228,243,247,0.06)',
  },
  {
    name: 'Babalola Gabriel',
    role: 'Contract Manager',
    quals: 'BSc · MNIQS · RQS',
    initial: 'BG',
    color: '#00CCFF',
    accentBg: 'rgba(0,204,255,0.08)',
  },
  {
    name: 'Fashola Kolapo',
    role: 'Project Manager',
    quals: 'B.Tech Building Tech · NIOB · CORBON',
    
    years: 15,
    badge: 'Senior',
    initial: 'FK',
    color: '#00CCFF',
    accentBg: 'rgba(0,204,255,0.08)',
  },
  {
    name: 'Engr. Lawal A.A.',
    role: 'Project Engineer',
    quals: 'B.Tech Civil · MSc Civil · MNSE · COREN · MNICE',
    years: 7,
    badge: 'Mid',
    initial: 'LA',
    color: '#E4F3F7',
    accentBg: 'rgba(228,243,247,0.06)',
  },
  {
    name: 'Akinyode Samuel',
    role: 'Procurement Manager',
    quals: 'HND · MNIQS · RQS',
    years: 10,
    badge: 'Senior',
    initial: 'AS',
    color: '#00CCFF',
    accentBg: 'rgba(0,204,255,0.08)',
  },
  {
    name: 'Shuaib Lukman',
    role: 'Senior Quantity Surveyor',
    quals: 'HND · MNIQS · RQS',
    years: 10,
    badge: 'Senior',
    initial: 'SL',
    color: '#E4F3F7',
    accentBg: 'rgba(228,243,247,0.06)',
  },
  {
    name: 'Ehis Odunayo',
    role: 'Quantity Surveyor',
    quals: 'BSc Quantity Surveying',
    years: 7,
    badge: 'Mid',
    initial: 'EO',
    color: '#00CCFF',
    accentBg: 'rgba(0,204,255,0.08)',
  },
]

const swipeConfidenceThreshold = 8000
const swipePower = (offset, velocity) => Math.abs(offset) * velocity

const cardVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 200 : -200,
    opacity: 0,
    scale: 0.93,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir) => ({
    x: dir < 0 ? 200 : -200,
    opacity: 0,
    scale: 0.93,
  }),
}

function ManagementCard({ person }) {
  const photo = memberImages[person.name]

  return (
    <div className="w-full">
      <div
        className="glass-card rounded-sm p-8 relative overflow-hidden"
        style={{ boxShadow: `0 0 60px ${person.accentBg}, 0 20px 40px rgba(0,0,0,0.3)` }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-30 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${person.accentBg} 0%, transparent 70%)` }}
        />

        {/* Avatar — photo or initials */}
        <div className="mb-8 flex justify-center">
          {photo ? (
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute -inset-[3px] rounded-sm pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${person.color}80, transparent 60%, ${person.color}40)`,
                  borderRadius: '6px',
                }}
              />
              {/* Corner accents */}
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 z-10" style={{ borderColor: person.color }} />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 z-10" style={{ borderColor: person.color }} />

              {/* Photo */}
              <div className="relative w-28 h-28 rounded-sm overflow-hidden">
                <img
                  src={photo}
                  alt={person.name}
                  className="w-full h-full object-cover object-top"
                  style={{ filter: 'contrast(1.05) brightness(0.96)' }}
                />
                {/* Subtle color overlay for brand cohesion */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(180deg, transparent 55%, ${person.color}22 100%)`,
                    mixBlendMode: 'overlay',
                  }}
                />
              </div>
            </div>
          ) : (
            <div
              className="relative w-24 h-24 rounded-sm flex items-center justify-center font-display text-4xl"
              style={{
                background: `linear-gradient(135deg, ${person.color}30, ${person.color}12)`,
                border: `1px solid ${person.color}50`,
                color: person.color,
              }}
            >
              {person.initial}
              {/* Corner accents */}
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r" style={{ borderColor: person.color }} />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l" style={{ borderColor: person.color }} />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="text-center relative z-10">
          <h3 className="font-display text-[1.8rem] lg:text-[2rem] text-[#FFFFFF] leading-tight mb-2">
            {person.name}
          </h3>
          <p className="font-body text-sm tracking-[0.2em] uppercase mb-4 font-semibold" style={{ color: person.color }}>
            {person.role}
          </p>

          {/* Divider */}
          <div className="mx-auto mb-4 h-px w-12" style={{ background: person.color }} />

          <p className="font-body text-[#E4F3F7]/75 text-sm leading-relaxed max-w-xs mx-auto">
            {person.quals}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function TeamSection() {
  const sectionRef = useRef()
  const sliderWrapRef = useRef()
  const [[page, direction], setPage] = useState([0, 0])
  const activeIndex = page

  const paginate = (newDir) => {
    let next = activeIndex + newDir
    if (next < 0) next = teamMembers.length - 1
    if (next >= teamMembers.length) next = 0
    setPage([next, newDir])
  }

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1)
    }, 4500)
    return () => clearInterval(timer)
  }, [activeIndex])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // ── Header reveal ──
    const header = section.querySelector('.ldp-header')
    if (header) {
      const eyebrow = header.querySelector('.ldp-eyebrow')
      const heading = header.querySelector('.ldp-heading')
      const body = header.querySelector('.ldp-body')

      gsap.set([eyebrow, heading, body].filter(Boolean), { opacity: 0, y: 28 })

      ScrollTrigger.create({
        trigger: header,
        start: 'top 82%',
        once: true,
        onEnter: () => {
          gsap.to(eyebrow, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
          gsap.to(heading, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: 0.1 })
          gsap.to(body, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', delay: 0.22 })
        },
      })
    }

    // ── Slider container reveal ──
    const slider = sliderWrapRef.current
    if (slider) {
      gsap.set(slider, { opacity: 0, y: 50 })
      ScrollTrigger.create({
        trigger: slider,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(slider, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
          })
        },
      })
    }
  }, [])

  const person = teamMembers[activeIndex]

  return (
    <section ref={sectionRef} id="team" className="relative bg-[#060214] py-28 section-base overflow-hidden lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none opacity-[0.05]"
        style={{ background: 'radial-gradient(ellipse, #330099 0%, transparent 70%)' }} />

      <div className="section-padding relative z-10">

        {/* Header */}
        <div className="ldp-header mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="ldp-eyebrow font-display text-[#00CCFF] text-sm tracking-[0.3em]">LEADERSHIP</span>
            <div className="gold-line" />
          </div>
          <h2 className="ldp-heading font-display text-[clamp(2.5rem,6vw,5rem)] text-[#FFFFFF] leading-none mb-4">
            OUR<br /><span className="text-gradient-gold">TEAM</span>
          </h2>
          <p className="ldp-body font-body text-[#E4F3F7]/80 max-w-xl text-[1rem] leading-relaxed">
            Rimak is led by a seasoned team of construction professionals, engineers, and business managers — each bringing deep domain expertise and industry-recognised credentials.
          </p>
        </div>

        {/* Slider */}
        <div ref={sliderWrapRef} className="max-w-lg mx-auto mb-32">
          {/* Position counter */}
          <div className="flex items-center justify-between mb-6 px-1">
            <span className="font-display text-[#00CCFF]/40 text-xs tracking-[0.3em] uppercase">Profile</span>
            <span className="font-display text-[#E4F3F7]/40 text-xs tracking-widest">
                {String(activeIndex + 1).padStart(2, '0')} / {String(teamMembers.length).padStart(2, '0')}
            </span>
          </div>

          {/* Card viewport — single card visible at all times */}
          <div className="relative overflow-hidden min-h-[380px] flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 32 },
                  opacity: { duration: 0.18 },
                  scale: { duration: 0.18 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x)
                  if (swipe < -swipeConfidenceThreshold) paginate(1)
                  else if (swipe > swipeConfidenceThreshold) paginate(-1)
                }}
                className="w-full cursor-grab active:cursor-grabbing"
              >
                <ManagementCard person={person} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8 px-1">
            {/* Prev */}
            <button
              onClick={() => paginate(-1)}
              className="w-11 h-11 rounded-sm border border-[#00CCFF]/25 flex items-center justify-center
                         text-[#00CCFF] hover:bg-[#00CCFF]/10 active:scale-95 transition-all duration-200"
              aria-label="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2 items-center">
              {teamMembers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPage([idx, idx > activeIndex ? 1 : -1])}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: idx === activeIndex ? 24 : 6,
                    height: 6,
                    background: idx === activeIndex ? '#00CCFF' : 'rgba(228,243,247,0.25)',
                  }}
                  aria-label={`Go to ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={() => paginate(1)}
              className="w-11 h-11 rounded-sm border border-[#00CCFF]/25 flex items-center justify-center
                         text-[#00CCFF] hover:bg-[#00CCFF]/10 active:scale-95 transition-all duration-200"
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Swipe hint */}
          <p className="md:hidden text-center text-[#E4F3F7]/30 text-xs tracking-widest mt-4 uppercase">
            Swipe to navigate
          </p>
        </div>

        <div>
          
        </div>
      </div>
    </section>
  )
}

