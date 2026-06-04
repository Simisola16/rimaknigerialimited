import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import HeroShader from './HeroShader'
import HeroScene from './HeroScene'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef()
  const headingRef = useRef()
  const taglineRef = useRef()
  const subtitleRef = useRef()
  const ctaRef = useRef()
  const rcRef = useRef()
  const scrollProgress = useRef(0)

  useGSAP(() => {
    // Track scroll for 3D scene
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => { scrollProgress.current = self.progress },
    })

    // Staggered text entrance
    const tl = gsap.timeline({ delay: 0.2 })
    tl.from(rcRef.current, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
      .from(headingRef.current.querySelectorAll('.hero-line'), {
        y: 120, opacity: 0, duration: 1.0, stagger: 0.12, ease: 'power4.out',
      }, '-=0.2')
      .from(taglineRef.current, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .from(subtitleRef.current, { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from(ctaRef.current.children, { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.4')

    // Scroll-based parallax on text
    gsap.to(headingRef.current, {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    gsap.to(subtitleRef.current, {
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, { scope: sectionRef })

  const handleScrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* GLSL Background */}
      <HeroShader />

      {/* 3D Scene */}
      <HeroScene scrollProgress={scrollProgress} />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060D1A]/30 via-transparent to-[#060D1A]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#060D1A]/60 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 section-padding w-full pt-28 pb-20">
        {/* RC Badge */}
        <div ref={rcRef} className="mb-8">
          <span className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.25em] text-[#C4B8A8] uppercase border border-[#D4861A]/30 rounded-full px-4 py-2 bg-[#D4861A]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4861A] animate-pulse" />
            RC 9484253 · CAC Registered · Lagos State, Nigeria
          </span>
        </div>

        {/* Main Heading */}
        <div ref={headingRef} className="overflow-hidden mb-6">
          <div className="hero-line font-display text-[clamp(3.5rem,10vw,9rem)] leading-none text-[#F5F2EE] tracking-tight">
            RIMAK
          </div>
          <div className="hero-line font-display text-[clamp(3.5rem,10vw,9rem)] leading-none tracking-tight flex items-end gap-4">
            <span className="text-gradient-gold">NIGERIA</span>
          </div>
          <div className="hero-line font-display text-[clamp(3.5rem,10vw,9rem)] leading-none text-[#F5F2EE] tracking-tight">
            LIMITED
          </div>
        </div>

        {/* Tagline */}
        <div ref={taglineRef} className="mb-4">
          <p className="font-display text-[clamp(1.2rem,3vw,2.2rem)] text-[#D4861A] tracking-[0.12em]">
            "Building Nigeria. Engineering the Future."
          </p>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mb-12">
          <div className="gold-line mb-4" />
          <p className="font-body text-[#C4B8A8] text-[clamp(0.85rem,1.5vw,1.05rem)] tracking-[0.08em] uppercase max-w-xl">
            Civil · Building · MEP · Project Management · General Contractors
          </p>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-4">
          <button
            onClick={() => handleScrollTo('#services')}
            className="btn-primary"
            id="hero-cta-services"
          >
            <span>Our Services</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => handleScrollTo('#contact')}
            className="btn-outline"
            id="hero-cta-contact"
          >
            <span>Get In Touch</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[0.65rem] tracking-[0.3em] text-[#C4B8A8] uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4861A] to-transparent animate-pulse" />
      </div>

      {/* Decorative corner lines */}
      <div className="absolute top-28 right-8 md:right-16 w-px h-32 bg-gradient-to-b from-transparent via-[#D4861A]/40 to-transparent" />
      <div className="absolute top-28 right-8 md:right-16 h-px w-16 bg-gradient-to-r from-transparent via-[#D4861A]/40 to-transparent" />
    </section>
  )
}
