import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
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
              className="absolute border border-[#D4861A]/30 rounded-full"
              style={{ width: `${size}%`, height: `${size}%`, animationDelay: `${i * 0.5}s` }}
            />
          ))}
          <div className="relative z-10 text-center">
            <div className="font-display text-6xl text-gradient-gold">NG</div>
            <div className="text-[#C4B8A8] text-sm tracking-widest mt-1">NIGERIA</div>
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
            <span className="font-body text-[#C4B8A8] text-sm">{s}</span>
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
          <rect x="60" y="40" width="80" height="120" fill="none" stroke="#D4861A" strokeWidth="1" />
          {[60, 80, 100, 120].map((y, i) => (
            <line key={i} x1="60" y1={y} x2="140" y2={y} stroke="#D4861A" strokeWidth="0.5" strokeDasharray="3,3" />
          ))}
          <circle cx="100" cy="100" r="4" fill="#D4861A" />
          <circle cx="80" cy="130" r="3" fill="#C4B8A8" />
          <circle cx="120" cy="80" r="3" fill="#C4B8A8" />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 text-center">
          <span className="text-[#C4B8A8] text-xs tracking-widest">NIGERIA · WEST AFRICA</span>
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
      <div className="h-64 grid grid-cols-1 gap-3">
        {['Timely Delivery', 'International Standards', 'Eco-Friendly Methods', 'Transparent Reporting'].map((v, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#D4861A]/20 border border-[#D4861A]/40 flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-[#D4861A]" />
            </div>
            <span className="text-[#C4B8A8] text-sm font-body">{v}</span>
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
  const pinWrapRef = useRef()
  const stepsRef = useRef([])
  const progressRef = useRef()

  useGSAP(() => {
    const steps = stepsRef.current.filter(Boolean)
    const totalSteps = steps.length

    let mm = gsap.matchMedia()

    mm.add("(min-width: 1024px)", () => {
      const scrollDistance = (totalSteps - 1) * window.innerHeight

      // Pin the section and animate steps
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 0.5,
          snap: {
            snapTo: 1 / (totalSteps - 1),
            duration: 0.4,
            ease: 'power2.inOut',
          },
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.height = `${self.progress * 100}%`
            }
          },
        },
      })

      // Animate each step in/out
      steps.forEach((step, i) => {
        if (i === 0) {
          gsap.set(step, { opacity: 1, y: 0 })
        } else {
          tl.fromTo(
            step,
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 1 },
            i - 1
          )
        }
        if (i < totalSteps - 1) {
          tl.to(step, { opacity: 0, y: -60, duration: 1 }, i + 0.6)
        }
      })
    })

    mm.add("(max-width: 1023px)", () => {
      // Mobile fallback: show all steps without opacity or timeline animation
      steps.forEach((step) => {
        gsap.set(step, { opacity: 1, y: 0 })
      })
    })

    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen lg:h-screen lg:overflow-hidden bg-[#060D1A] py-20 lg:py-0">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #C4B8A8 0, #C4B8A8 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #C4B8A8 0, #C4B8A8 1px, transparent 1px, transparent 60px)',
          }}
        />
      </div>

      <div ref={pinWrapRef} className="relative z-10 w-full h-full section-padding flex flex-col lg:flex-row items-start lg:items-center pt-28 lg:pt-0 pb-20 lg:pb-0">
        {/* Left: Step indicator */}
        <div className="hidden lg:flex flex-col items-center gap-4 mr-16 h-64">
          <div className="w-px flex-1 bg-[#C4B8A8]/10 relative overflow-hidden">
            <div ref={progressRef} className="absolute top-0 left-0 right-0 bg-[#D4861A] transition-all duration-300" style={{ height: '0%' }} />
          </div>
          <div className="w-px flex-1 bg-[#C4B8A8]/10" />
        </div>

        {/* Section label */}
        <div className="absolute top-12 left-0 section-padding">
          <div className="flex items-center gap-4">
            <span className="font-display text-[#D4861A] text-sm tracking-[0.3em]">ABOUT</span>
            <div className="gold-line" />
          </div>
        </div>

        {/* Steps container */}
        <div className="flex-1 relative w-full lg:h-[450px]">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => (stepsRef.current[i] = el)}
              className={`relative lg:absolute lg:inset-0 flex flex-col lg:flex-row items-start lg:items-center gap-12 w-full mb-16 lg:mb-0 ${
                i === 0 ? 'opacity-100' : 'opacity-100 lg:opacity-0'
              }`}
            >
              {/* Left: Text */}
              <div className="flex-1">
                <div className="font-display text-[#D4861A]/30 text-8xl leading-none mb-4">
                  {step.chapter}
                </div>
                <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-[#F5F2EE] leading-tight mb-6">
                  {step.title}
                </h2>
                <p className="font-body text-[#C4B8A8] text-[1.05rem] leading-relaxed max-w-lg">
                  {step.content}
                </p>
              </div>

              {/* Right: Visual */}
              <div className="flex-1 w-full max-w-md">
                {step.visual}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats bar at bottom */}
      <div className="relative lg:absolute lg:bottom-0 lg:left-0 lg:right-0 z-20 border-t border-[#C4B8A8]/10 bg-[#060D1A]/80 backdrop-blur-xl">
        <div className="section-padding py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center lg:text-left">
              <div className="flex items-end justify-center lg:justify-start gap-1">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <p className="font-body text-[#C4B8A8] text-xs tracking-widest uppercase mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
