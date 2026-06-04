import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const management = [
  {
    name: 'Adigun M.A.',
    role: 'Managing Director',
    quals: 'Dip (Const Mgnt)',
    phone: '08033175515',
    initial: 'AM',
    color: '#00CCFF',
  },
  {
    name: 'Rafiu Idris',
    role: 'Executive Director',
    quals: 'HND · PGD · MNIQS · RQS',
    phone: '08167713129',
    initial: 'RI',
    color: '#E4F3F7',
  },
  {
    name: 'Engr. Bello Amodu Ademola',
    role: 'Technical Director',
    quals: 'B.Tech (Civil) · MASCE · MICE · COREN',
    phone: null,
    initial: 'BA',
    color: '#00CCFF',
  },
  {
    name: 'Oni Ademola',
    role: 'Financial Director',
    quals: 'HND Accountancy · ACA · MNIM',
    phone: null,
    initial: 'OA',
    color: '#E4F3F7',
  },
  {
    name: 'Babalola Gabriel',
    role: 'Contract Manager',
    quals: 'BSc · MNIQS · RQS',
    phone: '07035078730',
    initial: 'BG',
    color: '#00CCFF',
  },
]

const technical = [
  {
    name: 'Engr. Bello Amodu Ademola',
    quals: 'B.Tech Civil · MASCE · MICE · COREN',
    years: 18,
    role: 'Project Manager',
    badge: 'Senior',
  },
  {
    name: 'Fashola Kolapo',
    quals: 'BSc Building Tech · NIOB · CORBON',
    years: 15,
    role: 'Site Manager',
    badge: 'Senior',
  },
  {
    name: 'Engr. Lawal A.A.',
    quals: 'B.Tech Civil · MSc Civil · MNSE · COREN · MNICE',
    years: 7,
    role: 'Project Engineer',
    badge: 'Mid',
  },
  {
    name: 'Akinyode Samuel',
    quals: 'HND · MNIQS · RQS',
    years: 10,
    role: 'Procurement Manager',
    badge: 'Senior',
  },
  {
    name: 'Shuaib Lukman',
    quals: 'HND · MNIQS · RQS',
    years: 10,
    role: 'Senior Quantity Surveyor',
    badge: 'Senior',
  },
  {
    name: 'Ehis Odunayo',
    quals: 'BSc Quantity Surveying',
    years: 7,
    role: 'Quantity Surveyor',
    badge: 'Mid',
  },
]

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 150 : -150,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 150 : -150,
    opacity: 0,
    scale: 0.95,
  }),
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity
}

function ManagementCard({ person }) {
  return (
    <motion.div
      className="management-card glass-card gold-border rounded-sm p-8 relative overflow-hidden group w-full mx-auto"
      whileHover={{
        y: -4,
        boxShadow: '0 20px 50px rgba(0,204,255,0.12)',
        transition: { duration: 0.3 },
      }}
    >
      {/* Avatar */}
      <div className="mb-6 flex justify-center">
        <div
          className="w-20 h-20 rounded-sm flex items-center justify-center font-display text-3xl transition-transform duration-300 group-hover:rotate-3"
          style={{
            background: `linear-gradient(135deg, ${person.color}25, ${person.color}10)`,
            border: `1px solid ${person.color}40`,
            color: person.color,
          }}
        >
          {person.initial}
        </div>
      </div>

      {/* Info */}
      <div className="text-center">
        <h3 className="font-display text-2xl text-[#FFFFFF] leading-tight mb-2">{person.name}</h3>
        <p className="font-body text-[#00CCFF] text-sm tracking-wider uppercase mb-4 font-semibold">{person.role}</p>
        <div className="gold-line mx-auto mb-4" style={{ width: '40px', background: person.color }} />
        <p className="font-body text-[#E4F3F7] text-sm leading-relaxed mb-6 max-w-sm mx-auto">{person.quals}</p>

        {person.phone && (
          <a
            href={`tel:${person.phone}`}
            className="inline-flex items-center gap-2 text-[#00CCFF] text-xs font-body hover:text-[#66E0FF] transition-colors justify-center"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.17 6.17l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15v1.92z" />
            </svg>
            {person.phone}
          </a>
        )}
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-sm"
        style={{ background: `radial-gradient(circle at 50% 30%, ${person.color}08, transparent 65%)` }}
      />
    </motion.div>
  )
}

export default function TeamSection() {
  const sectionRef = useRef()
  const mgmtRef = useRef()
  const techRef = useRef()
  const [[page, direction], setPage] = useState([0, 0])

  const activeIndex = page

  const paginate = (newDirection) => {
    let nextPage = activeIndex + newDirection
    if (nextPage < 0) nextPage = management.length - 1
    if (nextPage >= management.length) nextPage = 0
    setPage([nextPage, newDirection])
  }

  useGSAP(() => {
    // Reveal the slider container
    gsap.from('.leadership-slider-container', {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.leadership-slider-container',
        start: 'top 85%',
      }
    })

    // Technical staff rows reveal
    ScrollTrigger.batch('.tech-row', {
      onEnter: (els) => {
        gsap.from(els, {
          opacity: 0,
          x: -40,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
        })
      },
      start: 'top 90%',
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="team" className="relative bg-[#060214] py-28 section-base">
      <div className="section-padding relative z-10">

        {/* Management Team */}
        <div ref={mgmtRef} className="mb-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-display text-[#00CCFF] text-sm tracking-[0.3em]">LEADERSHIP</span>
            <div className="gold-line" />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[#FFFFFF] leading-none mb-4">
            MANAGEMENT<br /><span className="text-gradient-gold">TEAM</span>
          </h2>
          <p className="font-body text-[#E4F3F7] max-w-xl mb-14 text-[1rem] leading-relaxed">
            Rimak is led by a seasoned team of construction professionals, engineers, and business managers — each bringing deep domain expertise and industry-recognised credentials.
          </p>

          {/* Interactive slider for single card display */}
          <div className="leadership-slider-container relative max-w-lg mx-auto flex flex-col items-center">
            
            {/* Slider window with touch swipe support */}
            <div className="w-full relative overflow-hidden min-h-[360px] flex items-center justify-center py-2">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.25 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x)
                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1)
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1)
                    }
                  }}
                  className="w-full cursor-grab active:cursor-grabbing"
                >
                  <ManagementCard person={management[activeIndex]} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-8 mt-8 z-20">
              {/* Prev Button */}
              <button
                onClick={() => paginate(-1)}
                className="w-12 h-12 rounded-sm border border-[#00CCFF]/30 flex items-center justify-center text-[#00CCFF] hover:bg-[#00CCFF]/10 active:scale-95 transition-all"
                aria-label="Previous page"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Dot Indicators */}
              <div className="flex gap-2">
                {management.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const dir = idx > activeIndex ? 1 : -1
                      setPage([idx, dir])
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? 'w-6 bg-[#00CCFF]' : 'w-2 bg-[#E4F3F7]/30 hover:bg-[#E4F3F7]/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => paginate(1)}
                className="w-12 h-12 rounded-sm border border-[#00CCFF]/30 flex items-center justify-center text-[#00CCFF] hover:bg-[#00CCFF]/10 active:scale-95 transition-all"
                aria-label="Next page"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Technical Staff */}
        <div ref={techRef}>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-display text-[#00CCFF] text-sm tracking-[0.3em]">TECHNICAL</span>
            <div className="gold-line" />
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-[#FFFFFF] leading-none mb-10">
            TECHNICAL<br /><span className="text-gradient-concrete">STAFF</span>
          </h2>

          {/* Table */}
          <div className="overflow-x-auto rounded-sm border border-[#E4F3F7]/10">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-[#E4F3F7]/10">
                  <th className="text-left py-4 px-6 font-body text-xs tracking-[0.2em] text-[#00CCFF] uppercase">Name</th>
                  <th className="text-left py-4 px-6 font-body text-xs tracking-[0.2em] text-[#00CCFF] uppercase">Qualifications</th>
                  <th className="text-left py-4 px-6 font-body text-xs tracking-[0.2em] text-[#00CCFF] uppercase">Experience</th>
                  <th className="text-left py-4 px-6 font-body text-xs tracking-[0.2em] text-[#00CCFF] uppercase">Role</th>
                  <th className="text-left py-4 px-6 font-body text-xs tracking-[0.2em] text-[#00CCFF] uppercase">Level</th>
                </tr>
              </thead>
              <tbody>
                {technical.map((staff, i) => (
                  <tr
                    key={i}
                    className="tech-row border-b border-[#E4F3F7]/5 hover:bg-[#00CCFF]/5 transition-colors duration-200"
                  >
                    <td className="py-5 px-6 font-body font-medium text-[#FFFFFF] text-sm">{staff.name}</td>
                    <td className="py-5 px-6 font-body text-[#E4F3F7] text-xs leading-relaxed max-w-[200px]">{staff.quals}</td>
                    <td className="py-5 px-6 font-display text-[#00CCFF] text-xl">{staff.years}yrs</td>
                    <td className="py-5 px-6 font-body text-[#E4F3F7] text-sm">{staff.role}</td>
                    <td className="py-5 px-6">
                      <span
                        className="text-xs font-body tracking-wider px-3 py-1 rounded-full"
                        style={{
                          background: staff.badge === 'Senior' ? 'rgba(0,204,255,0.15)' : 'rgba(228,243,247,0.1)',
                          color: staff.badge === 'Senior' ? '#00CCFF' : '#E4F3F7',
                          border: `1px solid ${staff.badge === 'Senior' ? 'rgba(0,204,255,0.3)' : 'rgba(228,243,247,0.2)'}`,
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
