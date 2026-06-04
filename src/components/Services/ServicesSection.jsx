import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 'construction',
    number: '01',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="20" width="32" height="20" rx="1" />
        <path d="M16 20V12h16v8" />
        <path d="M20 20V16h8v4" />
        <line x1="8" y1="30" x2="40" y2="30" />
        <line x1="24" y1="20" x2="24" y2="40" />
      </svg>
    ),
    title: 'Construction & Rehabilitation',
    subtitle: 'Buildings & Roads',
    desc: 'Full-cycle construction and rehabilitation of residential, commercial, and public infrastructure — including road construction, drainage, and site development across Nigeria.',
  },
  {
    id: 'mep',
    number: '02',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="8" />
        <path d="M24 4v6M24 38v6M4 24h6M38 24h6" />
        <path d="M10.1 10.1l4.2 4.2M33.7 33.7l4.2 4.2M10.1 37.9l4.2-4.2M33.7 14.3l4.2-4.2" />
        <circle cx="24" cy="24" r="3" fill="currentColor" />
      </svg>
    ),
    title: 'Mechanical, Electrical & Plumbing',
    subtitle: 'MEP Installation Works',
    desc: 'Comprehensive MEP engineering services — from power distribution and lighting systems to HVAC, water supply, sanitation, and fire suppression for all building types.',
  },
  {
    id: 'project-mgmt',
    number: '03',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="8" width="36" height="32" rx="2" />
        <line x1="6" y1="16" x2="42" y2="16" />
        <line x1="14" y1="24" x2="34" y2="24" />
        <line x1="14" y1="30" x2="28" y2="30" />
        <circle cx="10" cy="12" r="1.5" fill="currentColor" />
        <circle cx="16" cy="12" r="1.5" fill="currentColor" />
        <circle cx="22" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    title: 'Project Management',
    subtitle: 'Full Lifecycle Management',
    desc: 'End-to-end project management covering planning, procurement, scheduling, cost control, quality assurance, safety compliance, and comprehensive reporting from inception to handover.',
  },
  {
    id: 'materials',
    number: '04',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 36l6-20h24l6 20H6z" />
        <path d="M12 28h24" />
        <path d="M14 22l-2 14" />
        <path d="M34 22l2 14" />
        <rect x="18" y="14" width="12" height="8" />
      </svg>
    ),
    title: 'Supply of Road & Building Materials',
    subtitle: 'Ancillary Works',
    desc: 'Reliable supply of quality road and building materials — aggregates, cement, reinforcement steel, bitumen, interlocking tiles, and all ancillary construction commodities.',
  },
  {
    id: 'installation',
    number: '05',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="10" y="8" width="28" height="18" rx="2" />
        <path d="M16 26v8" />
        <path d="M32 26v8" />
        <path d="M10 34h28" />
        <path d="M20 12h8M24 12v8" />
        <circle cx="24" cy="16" r="2" />
      </svg>
    ),
    title: 'Supply & Installation',
    subtitle: 'Electrical & Mechanical Equipment',
    desc: 'Procurement, supply, and professional installation of electrical and mechanical equipment — switchgear, generators, pumps, HVAC units, and industrial machinery systems.',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef()
  const trackRef = useRef()
  const progressBarRef = useRef()

  useGSAP(() => {
    const track = trackRef.current
    const section = sectionRef.current
    if (!track || !section) return

    const isMobile = window.innerWidth < 768

    if (!isMobile) {
      // Horizontal scroll effect
      const totalWidth = track.scrollWidth - window.innerWidth

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth + window.innerWidth * 0.5}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`
            }
          },
        },
      })

      tl.to(track, {
        x: () => -totalWidth,
        ease: 'none',
      })
    } else {
      // Mobile: stagger reveal vertically
      ScrollTrigger.batch(track.querySelectorAll('.service-card'), {
        onEnter: (els) => {
          gsap.from(els, { opacity: 0, y: 60, stagger: 0.12, duration: 0.8, ease: 'power3.out' })
        },
        start: 'top 85%',
      })
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="services" className="relative bg-[#0A1628] overflow-hidden">
      {/* Section header */}
      <div className="section-padding pt-24 pb-10 relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-display text-[#D4861A] text-sm tracking-[0.3em]">SERVICES</span>
          <div className="gold-line" />
        </div>
        <h2 className="font-display text-[clamp(3rem,7vw,6rem)] text-[#F5F2EE] leading-none mb-4">
          WHAT WE<br />
          <span className="text-gradient-gold">DELIVER</span>
        </h2>
        <p className="font-body text-[#C4B8A8] max-w-xl text-[1rem]">
          Five core disciplines. One committed partner. Rimak provides comprehensive construction and engineering services — from concept to commissioning.
        </p>

        {/* Scroll indicator for desktop */}
        <div className="hidden md:flex items-center gap-3 mt-6 text-[#C4B8A8]">
          <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
          <svg width="40" height="12" viewBox="0 0 40 12">
            <path d="M0 6h36M30 1l6 5-6 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* Progress bar */}
        <div className="hidden md:block mt-4 h-px bg-[#C4B8A8]/10 max-w-xs relative overflow-hidden">
          <div ref={progressBarRef} className="absolute left-0 top-0 h-full bg-[#D4861A] transition-none" style={{ width: '0%' }} />
        </div>
      </div>

      {/* Horizontal track */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="horizontal-track md:flex-nowrap flex flex-col md:flex-row gap-0 will-change-transform px-0"
        >
          {/* Spacer to start cards after header */}
          <div className="hidden md:block flex-shrink-0 w-[calc(max(6rem,calc(100vw-80vw)))]" />
          
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              className="service-card flex-shrink-0 w-full md:w-[420px] lg:w-[460px] h-auto md:h-[calc(100vh-280px)] min-h-[400px] mx-0 md:mx-4 first:md:ml-0"
              whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
            >
              <div className="glass-card gold-border rounded-sm h-full p-8 md:p-10 flex flex-col group cursor-default relative overflow-hidden mx-6 md:mx-0 mb-4 md:mb-0">
                {/* Background number */}
                <div className="absolute -right-4 -bottom-6 font-display text-[10rem] text-[#C4B8A8]/5 leading-none select-none">
                  {service.number}
                </div>

                {/* Icon */}
                <div className="text-[#D4861A] mb-8 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>

                {/* Title */}
                <div className="mb-4">
                  <span className="font-display text-[#D4861A]/60 text-sm tracking-[0.2em]">{service.number}</span>
                  <h3 className="font-display text-[1.8rem] md:text-[2rem] text-[#F5F2EE] leading-tight mt-1">
                    {service.title}
                  </h3>
                  <p className="text-[#D4861A] text-sm tracking-wider mt-1 font-body">{service.subtitle}</p>
                </div>

                <div className="gold-line mb-6" />

                {/* Description */}
                <p className="font-body text-[#C4B8A8] text-[0.95rem] leading-relaxed flex-1">
                  {service.desc}
                </p>

                {/* Bottom hover line */}
                <div className="mt-8 flex items-center gap-2 text-[#D4861A] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs tracking-widest uppercase font-body">Learn More</span>
                  <svg width="16" height="8" viewBox="0 0 16 8">
                    <path d="M0 4h12M8 1l4 3-4 3" stroke="currentColor" strokeWidth="1" fill="none" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}

          {/* End spacer */}
          <div className="hidden md:block flex-shrink-0 w-[calc(max(6rem,4vw))]" />
        </div>
      </div>
    </section>
  )
}
