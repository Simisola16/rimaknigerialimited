import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const divisions = [
  {
    id: 'building',
    number: 'A',
    title: 'Building & Civil Engineering',
    desc: 'Residential, commercial, and public infrastructure — constructed to international standards with certified civil engineers and modern equipment.',
    color: '#D4861A',
    items: ['Residential Buildings', 'Commercial Structures', 'Road Construction', 'Drainage Systems', 'Site Development'],
  },
  {
    id: 'mep-div',
    number: 'B',
    title: 'Mechanical & Electrical Engineering',
    desc: 'Complete MEP solutions — from power systems and plumbing to HVAC and fire safety — executed by COREN-registered engineers.',
    color: '#C4B8A8',
    items: ['Electrical Installations', 'Mechanical Systems', 'Plumbing & Sanitation', 'HVAC Systems', 'Fire Suppression'],
  },
  {
    id: 'pmc',
    number: 'C',
    title: 'Project Management, Construction Management, Procurement & Cost Management',
    desc: 'Lifecycle project oversight — from feasibility through procurement, construction, and commissioning — delivered by NIQS-certified professionals.',
    color: '#D4861A',
    items: ['Cost Estimation', 'Procurement', 'Construction Management', 'Quality Assurance', 'Risk Management'],
  },
  {
    id: 'supply',
    number: 'D',
    title: 'General Supply & Contractors',
    desc: 'Reliable supply chain for construction materials, equipment, and general contracting services across all sectors.',
    color: '#C4B8A8',
    items: ['Material Supply', 'Equipment Hire', 'General Contracting', 'Ancillary Works', 'Subcontracting'],
  },
]

function DivisionCard({ division, index }) {
  const cardRef = useRef()

  useGSAP(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 80,
      rotateX: 15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      delay: index * 0.15,
    })
  }, { scope: cardRef })

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      style={{ perspective: '1000px' }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="glass-card rounded-sm p-8 h-full relative overflow-hidden cursor-default
                      transition-all duration-500 border border-transparent
                      hover:border-[#D4861A]/30 hover:shadow-[0_20px_60px_rgba(212,134,26,0.1)]">
        
        {/* Large letter background */}
        <div
          className="absolute -right-6 -top-6 font-display text-[12rem] leading-none select-none transition-all duration-500 group-hover:opacity-10"
          style={{ color: division.color, opacity: 0.05 }}
        >
          {division.number}
        </div>

        {/* Division letter badge */}
        <div
          className="w-14 h-14 flex items-center justify-center font-display text-2xl mb-6 rounded-sm"
          style={{
            background: `linear-gradient(135deg, ${division.color}20, ${division.color}10)`,
            border: `1px solid ${division.color}40`,
            color: division.color,
          }}
        >
          {division.number}
        </div>

        {/* Title */}
        <h3 className="font-display text-[1.5rem] lg:text-[1.8rem] text-[#F5F2EE] leading-tight mb-4 pr-8">
          {division.title}
        </h3>

        <div className="w-8 h-px mb-4" style={{ background: division.color }} />

        {/* Description */}
        <p className="font-body text-[#C4B8A8] text-sm leading-relaxed mb-6">
          {division.desc}
        </p>

        {/* Items */}
        <ul className="space-y-2">
          {division.items.map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-[#C4B8A8] text-xs font-body">
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: division.color }} />
              {item}
            </li>
          ))}
        </ul>

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 0%, ${division.color}08, transparent 70%)` }}
        />
      </div>
    </motion.div>
  )
}

export default function DivisionsSection() {
  const sectionRef = useRef()
  const titleRef = useRef()

  useGSAP(() => {
    gsap.from(titleRef.current, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="divisions" className="relative bg-[#060D1A] py-28 section-base">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #C4B8A8 0, #C4B8A8 1px, transparent 0, transparent 80px), repeating-linear-gradient(90deg, #C4B8A8 0, #C4B8A8 1px, transparent 0, transparent 80px)',
        }}
      />

      <div className="section-padding relative z-10">
        {/* Header */}
        <div ref={titleRef} className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-display text-[#D4861A] text-sm tracking-[0.3em]">DIVISIONS</span>
            <div className="gold-line" />
          </div>
          <h2 className="font-display text-[clamp(3rem,7vw,6rem)] text-[#F5F2EE] leading-none mb-4">
            OUR FOUR<br />
            <span className="text-gradient-gold">DIVISIONS</span>
          </h2>
          <p className="font-body text-[#C4B8A8] max-w-2xl text-[1rem] leading-relaxed">
            Rimak Nigeria Limited operates through four specialised divisions — each staffed by credentialed professionals, each delivering excellence within its domain.
          </p>
        </div>

        {/* Division cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {divisions.map((div, i) => (
            <DivisionCard key={div.id} division={div} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
