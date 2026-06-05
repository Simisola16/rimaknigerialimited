import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import AnimatedCounter from '../shared/AnimatedCounter'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    chapter: '01',
    title: 'Who We Are',
    content:
      'Rimak Nigeria Limited is a proudly Nigerian-owned construction and engineering firm, registered with the Corporate Affairs Commission (RC 9484253). Headquartered in Lagos State, we have been delivering excellence across Nigeria since our formal incorporation — combining local knowledge with global engineering standards.',
    visual: (
      <div className="relative h-64 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          {[80, 60, 40].map((size, i) => (
            <div
              key={i}
              className="absolute border border-[#00CCFF]/20 rounded-full"
              style={{ width: `${size}%`, height: `${size}%` }}
            />
          ))}
          <div className="relative z-10 text-center">
            <div className="font-display text-6xl text-gradient-gold">NG</div>
            <div className="text-[#E4F3F7] text-sm tracking-widest mt-1">NIGERIA</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    chapter: '02',
    title: 'What We Do',
    content:
      'We operate across five core disciplines: Civil Engineering & Building Construction, Mechanical & Electrical Plumbing (MEP), comprehensive Project Management, Supply of Road & Building Materials, and General Supply & Contracting. Each division is staffed by certified professionals with industry-recognised credentials from COREN, NIQS, NIOB, and ACA.',
    visual: (
      <div className="grid grid-cols-2 gap-3 h-64">
        {['Civil Engineering', 'MEP Works', 'Project Mgmt', 'Supply & Contracting'].map((s, i) => (
          <div key={i} className="glass-card gold-border rounded p-4 flex items-center justify-center text-center">
            <span className="font-body text-[#E4F3F7] text-sm">{s}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    chapter: '03',
    title: 'Our Reach',
    content:
      'From residential buildings in Osun State to government broadcast infrastructure in Oyo State, Rimak has served both public institutions and private sector clients across Nigeria. Our growing portfolio reflects our capacity to handle diverse projects in scale, scope, and geography — with ambitions expanding across West Africa.',
    visual: (
      <div className="h-64 relative flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-48 h-48 opacity-60">
          <rect x="60" y="40" width="80" height="120" fill="none" stroke="#00CCFF" strokeWidth="1" />
          {[60, 80, 100, 120].map((y, i) => (
            <line key={i} x1="60" y1={y} x2="140" y2={y} stroke="#00CCFF" strokeWidth="0.5" strokeDasharray="3,3" />
          ))}
          <circle cx="100" cy="100" r="4" fill="#00CCFF" />
          <circle cx="80" cy="130" r="3" fill="#E4F3F7" />
          <circle cx="120" cy="80" r="3" fill="#E4F3F7" />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 text-center">
          <span className="text-[#E4F3F7] text-xs tracking-widest font-body uppercase">Nigeria · West Africa</span>
        </div>
      </div>
    ),
  },
  {
    chapter: '04',
    title: 'Our Commitment',
    content:
      'We deliver on time, on budget, and to international standards. Our project methodology prioritises timely reporting, cost transparency, safety compliance, and eco-friendly construction. We are not merely contractors — we are strategic partners committed to building the modern infrastructure Nigeria deserves.',
    visual: (
      <div className="h-64 grid grid-cols-1 gap-4 content-center">
        {['Timely Delivery', 'International Standards', 'Eco-Friendly Methods', 'Transparent Reporting'].map((v, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#00CCFF]/20 border border-[#00CCFF]/40 flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-[#00CCFF]" />
            </div>
            <span className="text-[#E4F3F7] text-sm font-body">{v}</span>
          </div>
        ))}
      </div>
    ),
  },
]

const stats = [
  { value: 18, suffix: '+', label: 'Years Combined Experience', prefix: '' },
  { value: 4, suffix: '', label: 'Core Divisions', prefix: '' },
  { value: 26, suffix: '', label: 'Equipment Items', prefix: '' },
  { value: 2, suffix: '', label: 'Completed Projects', prefix: '' },
]

export default function AboutSection() {
  const sectionRef = useRef()
  const stepsRef = useRef([])
  const progressRef = useRef()

  useGSAP(() => {
    const stepEls = stepsRef.current.filter(Boolean)
    const totalSteps = stepEls.length
    let mm = gsap.matchMedia()

    /* ── DESKTOP: pinned vertical scrub ── */
    mm.add('(min-width: 1024px)', () => {
      const scrollDistance = (totalSteps - 1) * window.innerHeight

      // Set initial states
      stepEls.forEach((step, i) => {
        if (i === 0) {
          gsap.set(step, { 
            opacity: 1, 
            y: 0, 
            autoAlpha: 1,
            pointerEvents: 'auto'
          })
        } else {
          gsap.set(step, {
            opacity: 0,
            y: 60,
            autoAlpha: 0,
            pointerEvents: 'none'
          })
        }
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (totalSteps - 1),
            duration: { min: 0.2, max: 0.5 },
            ease: 'power2.inOut',
          },
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.height = `${self.progress * 100}%`
            }
          },
        },
      })

      stepEls.forEach((step, i) => {
        if (i > 0) {
          // Incoming: Clean vertical reveal
          tl.to(step, {
            autoAlpha: 1,
            pointerEvents: 'auto',
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          }, i - 0.8)
        }

        // Outgoing: Clean vertical vanish
        if (i < totalSteps - 1) {
          tl.to(step, {
            autoAlpha: 0,
            pointerEvents: 'none',
            y: -60,
            duration: 0.6,
            ease: 'power3.in',
          }, i + 0.6)
        }
      })
    })

    /* ── MOBILE: Cinematic Slide triggers per step ── */
    mm.add('(max-width: 1023px)', () => {
      stepEls.forEach((step) => {
        gsap.set(step, { clearProps: "all" })

        gsap.fromTo(step,
          {
            opacity: 0,
            y: 40
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
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
    <section ref={sectionRef} id="about" className="relative min-h-screen lg:h-screen lg:overflow-hidden bg-[#060214] py-20 lg:py-0">
      {/* Blueprint grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #330099 0, #330099 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #330099 0, #330099 1px, transparent 1px, transparent 60px)',
        }} />
      </div>

      {/* Top-right glow */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.06] pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(circle, #00CCFF 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full h-full section-padding flex flex-col lg:flex-row items-start lg:items-center pt-28 lg:pt-0 pb-20 lg:pb-0">

        {/* Progress bar (desktop) */}
        <div className="hidden lg:flex flex-col items-center gap-4 mr-16 h-64 flex-shrink-0">
          <div className="w-px flex-1 bg-[#E4F3F7]/10 relative overflow-hidden">
            <div ref={progressRef} className="absolute top-0 left-0 right-0 bg-[#00CCFF]" style={{ height: '0%', transition: 'height 0.1s linear' }} />
          </div>
          <div className="w-px flex-1 bg-[#E4F3F7]/10" />
        </div>

        {/* Section label */}
        <div className="absolute top-12 left-0 section-padding z-20">
          <div className="flex items-center gap-4">
            <span className="font-display text-[#00CCFF] text-sm tracking-[0.3em]">ABOUT</span>
            <div className="gold-line" />
          </div>
        </div>

        {/* Steps */}
        <div className="flex-1 relative w-full lg:h-[500px]">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => (stepsRef.current[i] = el)}
              className={`relative lg:absolute lg:inset-0 flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-16 w-full mb-20 lg:mb-0 ${
                i > 0 ? 'lg:opacity-0 lg:pointer-events-none lg:invisible' : ''
              }`}
            >
              {/* Text column */}
              <div className="flex-1">
                <div className="about-chapter font-display text-[#00CCFF]/25 text-[7rem] leading-none mb-2 select-none">
                  {step.chapter}
                </div>
                <h2 className="about-title font-display text-[clamp(2.2rem,5vw,4rem)] text-[#FFFFFF] leading-tight mb-5"
                  style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
                  {step.title}
                </h2>
                <p className="about-body font-body text-[#E4F3F7]/90 text-[1rem] leading-[1.85] max-w-lg">
                  {step.content}
                </p>
              </div>

              {/* Visual column */}
              <div className="about-visual flex-1 w-full max-w-sm lg:max-w-md">
                {step.visual}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative lg:absolute lg:bottom-0 lg:left-0 lg:right-0 z-20 border-t border-[#E4F3F7]/10 bg-[#060214]/80 backdrop-blur-xl">
        <div className="section-padding py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center lg:text-left">
              <div className="flex items-end justify-center lg:justify-start gap-1">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <p className="font-body text-[#E4F3F7]/70 text-xs tracking-widest uppercase mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
