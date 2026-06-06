import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const divisions = [
  {
    id: 'building',
    number: 'A',
    title: 'Building & Civil Engineering',
    desc: 'Residential, commercial, and public infrastructure — constructed to international standards with certified civil engineers and modern equipment.',
    color: '#00CCFF',
    items: ['Residential Buildings', 'Commercial Structures', 'Road Construction', 'Drainage Systems', 'Site Development'],
  },
  {
    id: 'mep-div',
    number: 'B',
    title: 'Mechanical & Electrical Engineering',
    desc: 'Complete MEP solutions — from power systems and plumbing to HVAC and fire safety — executed by COREN-registered engineers.',
    color: '#E4F3F7',
    items: ['Electrical Installations works', 'Mechanical Systems', 'Plumbing & Sanitation', 'Fire Alarm and Fire Protection Systems'],
  },
  {
    id: 'pmc',
    number: 'C',
    title: 'Project Management, Construction Management, Procurement & Cost Management',
    desc: 'Lifecycle project oversight — from feasibility through procurement, construction, and commissioning — delivered by NIQS-certified professionals.',
    color: '#00CCFF',
    items: ['Cost Engineering & Cost Management', 'Capital Budgeting', 'Construction Management', 'Procurement Management', 'Quality Control & Management', 'Risk Management'],
  },
  {
    id: 'supply',
    number: 'D',
    title: 'General Supply & Contractors',
    desc: 'Reliable supply chain for construction materials, equipment, and general contracting services across all sectors.',
    color: '#E4F3F7',
    items: ['Material Supply', 'Equipment Hire', 'General Contracting', 'Ancillary Works', 'Subcontracting'],
  },
]

function DivisionCard({ division, index }) {
  const cardRef = useRef()

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    // Initial state for the whole card — start from direction alternating left/right
    const isEven = index % 2 === 0
    gsap.set(card, { opacity: 0, x: isEven ? -60 : 60, scale: 0.97 })

    const st = ScrollTrigger.create({
      trigger: card,
      start: 'top 87%',
      once: true,
      onEnter: () => {
        // Slide card in
        gsap.to(card, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.07,
          onComplete: () => {
            // Animate internals once card is visible
            const badge = card.querySelector('.div-badge')
            const title = card.querySelector('.div-title')
            const divider = card.querySelector('.div-divider')
            const desc = card.querySelector('.div-desc')
            const items = card.querySelectorAll('.div-item')

            gsap.set([badge, title, divider, desc], { opacity: 0 })
            gsap.set(badge, { rotation: -12, scale: 0.7 })
            gsap.set(divider, { scaleX: 0, transformOrigin: 'left center' })
            gsap.set(items, { opacity: 0, x: -16 })

            const d = index * 0.07
            gsap.to(badge, { opacity: 1, rotation: 0, scale: 1, duration: 0.55, ease: 'back.out(2)', delay: d })
            gsap.to(title, { opacity: 1, duration: 0.5, ease: 'power2.out', delay: d + 0.12 })
            gsap.to(divider, { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power3.out', delay: d + 0.22 })
            gsap.to(desc, { opacity: 1, duration: 0.5, ease: 'power2.out', delay: d + 0.32 })
            gsap.to(items, { opacity: 1, x: 0, stagger: 0.07, duration: 0.45, ease: 'power2.out', delay: d + 0.42 })
          },
        })
      },
    })

    return () => st.kill()
  }, [index])

  return (
    <div ref={cardRef} className="group relative">
      <div className="glass-card rounded-sm p-8 h-full relative overflow-hidden cursor-default
                      transition-all duration-500 border border-[#E4F3F7]/5
                      hover:border-[#00CCFF]/30 hover:shadow-[0_16px_50px_rgba(0,204,255,0.07)]">

        {/* Ghost letter */}
        <div
          className="absolute -right-4 -top-4 font-display text-[11rem] leading-none select-none transition-opacity duration-500 group-hover:opacity-[0.1]"
          style={{ color: division.color, opacity: 0.04 }}
        >
          {division.number}
        </div>

        {/* Badge */}
        <div
          className="div-badge w-14 h-14 flex items-center justify-center font-display text-2xl mb-6 rounded-sm"
          style={{
            background: `linear-gradient(135deg, ${division.color}22, ${division.color}0a)`,
            border: `1px solid ${division.color}40`,
            color: division.color,
          }}
        >
          {division.number}
        </div>

        {/* Title */}
        <h3 className="div-title font-display text-[1.5rem] lg:text-[1.75rem] text-[#FFFFFF] leading-tight mb-3 pr-10">
          {division.title}
        </h3>

        {/* Divider */}
        <div className="div-divider h-px w-10 mb-4"
          style={{ background: division.color, transformOrigin: 'left center' }} />

        {/* Description */}
        <p className="div-desc font-body text-[#E4F3F7]/80 text-sm leading-relaxed mb-5">
          {division.desc}
        </p>

        {/* Items */}
        <ul className="space-y-[0.6rem]">
          {division.items.map((item, i) => (
            <li key={i} className="div-item flex items-center gap-3 text-[#E4F3F7]/70 text-xs font-body">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: division.color }} />
              {item}
            </li>
          ))}
        </ul>

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 30% 0%, ${division.color}06, transparent 70%)` }}
        />
      </div>
    </div>
  )
}

export default function DivisionsSection() {
  const sectionRef = useRef()
  const headerRef = useRef()

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const eyebrow = header.querySelector('.div-eyebrow')
    const heading = header.querySelector('.div-heading')
    const body = header.querySelector('.div-body')

    gsap.set([eyebrow, heading, body].filter(Boolean), { opacity: 0, y: 28 })

    const st = ScrollTrigger.create({
      trigger: header,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        gsap.to(eyebrow, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
        gsap.to(heading, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: 0.1 })
        gsap.to(body, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', delay: 0.22 })
      },
    })

    return () => st.kill()
  }, [])

  return (
    <section ref={sectionRef} id="divisions" className="relative bg-[#060214] py-28 section-base lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #E4F3F7 0, #E4F3F7 1px, transparent 0, transparent 80px), repeating-linear-gradient(90deg, #E4F3F7 0, #E4F3F7 1px, transparent 0, transparent 80px)',
        }}
      />
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-[0.06] pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(circle, #330099 0%, transparent 70%)' }} />

      <div className="section-padding relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="div-eyebrow font-display text-[#00CCFF] text-sm tracking-[0.3em]">DIVISIONS</span>
            <div className="gold-line" />
          </div>
          <h2 className="div-heading font-display text-[clamp(3rem,7vw,6rem)] text-[#FFFFFF] leading-none mb-4">
            OUR FOUR<br />
            <span className="text-gradient-gold">DIVISIONS</span>
          </h2>
          <p className="div-body font-body text-[#E4F3F7]/80 max-w-2xl text-[1rem] leading-relaxed">
            Rimak Nigeria Limited operates through four specialised divisions — each staffed by credentialed professionals, each delivering excellence within its domain.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {divisions.map((div, i) => (
            <DivisionCard key={div.id} division={div} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
