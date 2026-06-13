import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import MobileCarousel from '../shared/MobileCarousel'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Define & Align',
    desc: 'We begin every engagement by rigorously defining objectives, priorities, and technical requirements. This phase establishes scope, quality benchmarks, resource plans, and stakeholder expectations — forming the blueprint for everything that follows.',
    tags: ['Scope Definition', 'Stakeholder Alignment', 'Technical Review', 'Feasibility'],
  },
  {
    number: '02',
    title: 'Execute with Precision',
    desc: 'Execution is guided by the defined objectives — delivered in a cost-effective, safety-compliant manner. Our certified teams deploy proven methodologies, deploy the right equipment, and maintain strict quality controls at every milestone.',
    tags: ['Cost Control', 'Safety Compliance', 'Quality Assurance', 'Resource Deployment'],
  },
  {
    number: '03',
    title: 'Monitor & Report',
    desc: 'We maintain a continuous feedback loop: work plans, cost estimates, progress reporting, and corrective action are integrated throughout the project lifecycle. Clients receive timely, transparent reports — giving full visibility at every stage.',
    tags: ['Work Planning', 'Cost Estimation', 'Progress Reporting', 'Corrective Action'],
  },
]

export default function StrategySection() {
  const sectionRef = useRef()
  const cardRefs = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // ── Header elements ──
    const eyebrow = section.querySelector('.str-eyebrow')
    const heading = section.querySelector('.str-heading')
    const body = section.querySelector('.str-body')
    const deco = section.querySelector('.str-deco')

    gsap.set([eyebrow, heading, body, deco].filter(Boolean), { opacity: 0, y: 28 })

    const headerST = ScrollTrigger.create({
      trigger: section,
      start: 'top 78%',
      once: true,
      onEnter: () => {
        gsap.to(eyebrow, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
        gsap.to(heading, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: 0.1 })
        gsap.to(body, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', delay: 0.22 })
        gsap.to(deco, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', delay: 0.38 })
      },
    })

    // ── Step cards — stagger reveal (desktop only) ──
    const isMobile = window.innerWidth < 768
    const cards = cardRefs.current.filter(Boolean)
    if (!isMobile) {
      cards.forEach((card, i) => {
        gsap.set(card, { opacity: 0, y: 60, scale: 0.97 })

        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              ease: 'power3.out',
              delay: i * 0.08,
            })

            const badge = card.querySelector('.str-badge')
            const title = card.querySelector('.str-title')
            const divider = card.querySelector('.str-divider')
            const desc = card.querySelector('.str-desc')
            const tags = card.querySelectorAll('.str-tag')

            gsap.set([badge, title, divider, desc], { opacity: 0 })
            gsap.set(badge, { scale: 0.5 })
            gsap.set(divider, { scaleX: 0, transformOrigin: 'left center' })
            gsap.set(tags, { opacity: 0, y: 10 })

            const delay = i * 0.08
            gsap.to(badge, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)', delay: delay + 0.2 })
            gsap.to(title, { opacity: 1, duration: 0.5, ease: 'power2.out', delay: delay + 0.32 })
            gsap.to(divider, { opacity: 1, scaleX: 1, duration: 0.55, ease: 'power3.out', delay: delay + 0.42 })
            gsap.to(desc, { opacity: 1, duration: 0.55, ease: 'power2.out', delay: delay + 0.52 })
            gsap.to(tags, { opacity: 1, y: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out', delay: delay + 0.62 })
          },
        })
      })
    }

    return () => {
      headerST.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} id="strategy" className="relative bg-[#0D0524] overflow-hidden min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D0524] via-[#0D0524] to-[#060214]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #00CCFF 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #330099 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg, #00CCFF 0, #00CCFF 1px, transparent 0, transparent 120px)' }}
        />
      </div>

      <div className="section-padding relative z-10 flex flex-col lg:flex-row items-start gap-16 pt-24 pb-24">
        {/* Left: sticky header */}
        <div className="lg:sticky lg:top-24 lg:w-[38%] flex-shrink-0">
          <div className="flex items-center gap-4 mb-6">
            <span className="str-eyebrow font-display text-[#00CCFF] text-sm tracking-[0.3em]">STRATEGY</span>
            <div className="gold-line" />
          </div>
          <h2 className="str-heading font-display text-[clamp(2.5rem,5vw,5rem)] text-[#FFFFFF] leading-none mb-6">
            OPERATIONAL<br />
            <span className="text-gradient-gold">EXCELLENCE</span>
          </h2>
          <p className="str-body font-body text-[#E4F3F7]/80 text-[1rem] leading-relaxed max-w-sm">
            Our three-pillar operational strategy ensures every project is defined, executed, and reported with the precision of an international engineering firm.
          </p>
          <div className="str-deco mt-12 relative w-28 h-28">
            <div className="absolute inset-0 border border-[#00CCFF]/15 rotate-45" />
            <div className="absolute inset-[14px] border border-[#00CCFF]/10 rotate-45" />
            <div className="absolute inset-[28px] bg-[#00CCFF]/5 rotate-45" />
          </div>
        </div>

        {/* Right: step cards */}
        <MobileCarousel className="flex-1 flex lg:flex-col gap-6 lg:pt-16 mobile-slider-track hide-scrollbar">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="glass-card gold-border rounded-sm p-8 relative overflow-hidden group w-full
                         hover:border-[#00CCFF]/40 hover:shadow-[0_8px_40px_rgba(0,204,255,0.08)]
                         transition-all duration-500"
            >
              {/* Ghost number */}
              <div className="absolute -right-3 -top-3 font-display text-[8rem] text-[#00CCFF]/[0.06] leading-none select-none">
                {step.number}
              </div>

              <div className="flex items-start gap-5">
                {/* Badge */}
                <div className="str-badge w-12 h-12 flex-shrink-0 flex items-center justify-center font-display text-base
                                text-[#060214] bg-[#00CCFF] rounded-sm">
                  {step.number}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <h3 className="str-title font-display text-[1.7rem] lg:text-[1.9rem] text-[#FFFFFF] leading-tight mb-3">
                    {step.title}
                  </h3>

                  {/* Divider */}
                  <div className="str-divider h-px w-12 bg-[#00CCFF]/40 mb-4" />

                  {/* Description */}
                  <p className="str-desc font-body text-[#E4F3F7]/80 text-[0.9rem] leading-relaxed mb-5">
                    {step.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag, j) => (
                      <span key={j} className="str-tag text-xs font-body tracking-wider px-3 py-1 rounded-full
                                               text-[#00CCFF] border border-[#00CCFF]/25 bg-[#00CCFF]/[0.06]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 0% 50%, rgba(0,204,255,0.05), transparent 70%)' }}
              />

              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="absolute -bottom-3 left-[3.75rem] w-px h-6 bg-[#00CCFF]/20" />
              )}
            </div>
          ))}
        </MobileCarousel>
      </div>
    </section>
  )
}
