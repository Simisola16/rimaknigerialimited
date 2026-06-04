import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
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
  const headerRef = useRef()
  const stepsContainerRef = useRef()
  const stepRefs = useRef([])

  useGSAP(() => {
    const section = sectionRef.current
    const header = headerRef.current

    let mm = gsap.matchMedia()

    mm.add("(min-width: 1024px)", () => {
      // Pin the section header while steps animate in
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${window.innerHeight * 2.5}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      })

      // Animate each step in sequence
      stepRefs.current.forEach((step, i) => {
        if (!step) return
        tl.fromTo(step,
          { opacity: 0, x: 80 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
          i * 0.8
        )
      })

      // Header subtle movement
      tl.to(header, { y: -30, ease: 'none' }, 0)
    })

    mm.add("(max-width: 1023px)", () => {
      // Mobile animation: animate steps in as they scroll into view individually (no pinning)
      stepRefs.current.forEach((step) => {
        if (!step) return
        gsap.fromTo(step,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    })

    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="strategy" className="relative bg-[#0A1628] overflow-hidden min-h-screen">
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0A1628] to-[#060D1A]" />
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #D4861A 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #C4B8A8 0%, transparent 70%)' }}
        />
        {/* Structural lines */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, #D4861A 0, #D4861A 1px, transparent 0, transparent 120px)',
          }}
        />
      </div>

      <div className="section-padding relative z-10 h-full flex flex-col lg:flex-row items-start gap-16 pt-24 pb-24">
        {/* Left: Pinned header */}
        <div ref={headerRef} className="lg:sticky lg:top-24 lg:w-[40%] flex-shrink-0">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-display text-[#D4861A] text-sm tracking-[0.3em]">STRATEGY</span>
            <div className="gold-line" />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] text-[#F5F2EE] leading-none mb-6">
            OPERATIONAL<br />
            <span className="text-gradient-gold">EXCELLENCE</span>
          </h2>
          <p className="font-body text-[#C4B8A8] text-[1rem] leading-relaxed max-w-sm">
            Our three-pillar operational strategy ensures every project is defined, executed, and reported with the precision of an international engineering firm.
          </p>

          {/* Decorative architectural element */}
          <div className="mt-12 relative w-32 h-32">
            <div className="absolute inset-0 border border-[#D4861A]/30 rotate-45" />
            <div className="absolute inset-[16px] border border-[#D4861A]/20 rotate-45" />
            <div className="absolute inset-[32px] bg-[#D4861A]/10 rotate-45" />
          </div>
        </div>

        {/* Right: Animated steps */}
        <div ref={stepsContainerRef} className="flex-1 flex flex-col gap-8 lg:pt-16">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => (stepRefs.current[i] = el)}
              className="glass-card gold-border rounded-sm p-8 relative overflow-hidden group opacity-0"
            >
              {/* Step number */}
              <div className="absolute -right-4 -top-4 font-display text-8xl text-[#D4861A]/10 leading-none select-none">
                {step.number}
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 flex items-center justify-center font-display text-lg text-[#060D1A] bg-[#D4861A] rounded-sm flex-shrink-0">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-[1.8rem] text-[#F5F2EE] leading-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-[#C4B8A8] text-sm leading-relaxed mb-4">
                    {step.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="text-xs font-body tracking-wider px-3 py-1 rounded-full text-[#D4861A] border border-[#D4861A]/30 bg-[#D4861A]/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom connector */}
              {i < steps.length - 1 && (
                <div className="absolute -bottom-4 left-14 w-px h-8 bg-[#D4861A]/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
