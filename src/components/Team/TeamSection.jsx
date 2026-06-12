import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const management = [
  {
    name: 'Adigun M.A.',
    role: 'Managing Director',
    quals: 'Dip (Const Mgnt)',
    initial: 'AM',
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
    name: 'Engr. Bello Amodu Ademola',
    role: 'Technical Director',
    quals: 'B.Tech (Civil) · MASCE · MICE · COREN',
    initial: 'BA',
    color: '#00CCFF',
    accentBg: 'rgba(0,204,255,0.08)',
  },
  {
    name: 'Oni Ademola',
    role: 'Financial Director',
    quals: 'HND Accountancy · ACA · MNIM',
    initial: 'OA',
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
]

const technical = [
  { name: 'Engr. Bello Amodu Ademola', quals: 'B.Tech Civil · MASCE · MICE · COREN', years: 18, role: 'Project Manager', badge: 'Senior' },
  { name: 'Fashola Kolapo', quals: 'BSc Building Tech · NIOB · CORBON', years: 15, role: 'Site Manager', badge: 'Senior' },
  { name: 'Engr. Lawal A.A.', quals: 'B.Tech Civil · MSc Civil · MNSE · COREN · MNICE', years: 7, role: 'Project Engineer', badge: 'Mid' },
  { name: 'Akinyode Samuel', quals: 'HND · MNIQS · RQS', years: 10, role: 'Procurement Manager', badge: 'Senior' },
  { name: 'Shuaib Lukman', quals: 'HND · MNIQS · RQS', years: 10, role: 'Senior Quantity Surveyor', badge: 'Senior' },
  { name: 'Ehis Odunayo', quals: 'BSc Quantity Surveying', years: 7, role: 'Quantity Surveyor', badge: 'Mid' },
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

        {/* Avatar */}
        <div className="mb-8 flex justify-center">
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
    if (next < 0) next = management.length - 1
    if (next >= management.length) next = 0
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

    // ── Technical staff rows ──
    const techHeader = section.querySelector('.tech-header')
    const techTable = section.querySelector('table')
    if (techHeader && techTable) {
      gsap.set(techHeader, { opacity: 0, y: 20 })
      ScrollTrigger.create({
        trigger: techHeader,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(techHeader, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })

          const rows = techTable.querySelectorAll('.tech-row')
          gsap.set(rows, { opacity: 0, x: -30 })
          gsap.to(rows, {
            opacity: 1,
            x: 0,
            duration: 0.65,
            stagger: 0.07,
            ease: 'power3.out',
            delay: 0.15,
          })
        },
      })
    }
  }, [])

  const person = management[activeIndex]

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
            MANAGEMENT<br /><span className="text-gradient-gold">TEAM</span>
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
              {String(activeIndex + 1).padStart(2, '0')} / {String(management.length).padStart(2, '0')}
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
              {management.map((_, idx) => (
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

        {/* Technical Staff */}
        <div>
          <div className="overflow-x-auto rounded-sm border border-[#E4F3F7]/10">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-[#E4F3F7]/10 bg-[#330099]/10">
                  {['Name', 'Qualifications', 'Experience', 'Role', 'Level'].map((h) => (
                    <th key={h} className="text-left py-4 px-6 font-body text-xs tracking-[0.2em] text-[#00CCFF] uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {technical.map((staff, i) => (
                  <tr
                    key={i}
                    className="tech-row border-b border-[#E4F3F7]/5 hover:bg-[#00CCFF]/[0.04] transition-colors duration-200"
                  >
                    <td className="py-5 px-6 font-body font-medium text-[#FFFFFF] text-sm">{staff.name}</td>
                    <td className="py-5 px-6 font-body text-[#E4F3F7]/70 text-xs leading-relaxed max-w-[200px]">{staff.quals}</td>
                    <td className="py-5 px-6 font-display text-[#00CCFF] text-xl">{staff.years}<span className="text-sm">yrs</span></td>
                    <td className="py-5 px-6 font-body text-[#E4F3F7]/80 text-sm">{staff.role}</td>
                    <td className="py-5 px-6">
                      <span
                        className="text-xs font-body tracking-wider px-3 py-1 rounded-full"
                        style={{
                          background: staff.badge === 'Senior' ? 'rgba(0,204,255,0.12)' : 'rgba(228,243,247,0.08)',
                          color: staff.badge === 'Senior' ? '#00CCFF' : '#E4F3F7',
                          border: `1px solid ${staff.badge === 'Senior' ? 'rgba(0,204,255,0.25)' : 'rgba(228,243,247,0.15)'}`,
                        }}
                      >
                        {staff.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
