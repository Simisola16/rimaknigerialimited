import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import MobileCarousel from '../shared/MobileCarousel'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 'proj-1',
    number: '01',
    title: 'Construction of 4-Bedroom Apartment',
    location: 'Iwo, Osun State',
    client: 'Mr. Ogundapo Olalekan',
    value: '₦45,000,000',
    duration: '18 months',
    status: 'COMPLETED',
    year: '2024',
    category: 'Residential Construction',
    scope: 'Full construction of a luxury 4-bedroom apartment including structural works, finishes, MEP installations, external landscaping, and boundary fencing.',
  },
  {
    id: 'proj-2',
    number: '02',
    title: 'Construction of Gate House & Perimeter Fence',
    location: 'Ibadan, Oyo State',
    client: 'Broadcasting Corporation of Oyo State',
    value: '₦15,000,000',
    duration: '4 months',
    status: 'COMPLETED',
    year: '2024',
    category: 'Government / Public Infrastructure',
    scope: 'Design and construction of a modern gate house facility and perimeter fence for the Broadcasting Corporation of Oyo State headquarters, including security provisions.',
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef()
  const bgTextRef = useRef()
  const contentRef = useRef()

  useGSAP(() => {
    // Parallax layers
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Background text moves slower (parallax)
    tl.to(bgTextRef.current, { y: -60, ease: 'none' }, 0)
    // Content moves at normal speed
    tl.to(contentRef.current, { y: -20, ease: 'none' }, 0)

    // Entrance animation
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 60,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
      },
    })
  }, { scope: cardRef })

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-sm border border-[#E4F3F7]/10 group w-full"
      style={{ minHeight: '500px' }}
    >
      {/* Background: construction site visual */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D0524] to-[#060214]">
        {/* Architectural line art */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
          <rect x="100" y="50" width="600" height="400" fill="none" stroke="#00CCFF" strokeWidth="1" />
          <rect x="150" y="100" width="200" height="280" fill="none" stroke="#E4F3F7" strokeWidth="0.5" />
          <rect x="400" y="100" width="250" height="180" fill="none" stroke="#E4F3F7" strokeWidth="0.5" />
          {[130, 180, 230, 280, 330].map((y, i) => (
            <line key={i} x1="150" y1={y} x2="350" y2={y} stroke="#E4F3F7" strokeWidth="0.3" strokeDasharray="4,8" />
          ))}
          {[440, 490, 540, 590].map((x, i) => (
            <line key={i} x1={x} y1="100" x2={x} y2="280" stroke="#E4F3F7" strokeWidth="0.3" strokeDasharray="4,8" />
          ))}
          <circle cx="400" cy="250" r="80" fill="none" stroke="#00CCFF" strokeWidth="0.5" strokeDasharray="6,12" />
        </svg>
      </div>

      {/* Parallax background text */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="font-display text-[8rem] lg:text-[12rem] text-[#00CCFF]/5 leading-none whitespace-nowrap">
          PROJECT {project.number}
        </span>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060214]/90 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between" style={{ minHeight: '500px' }}>
        {/* Top */}
        <div className="flex items-start justify-between">
          <div>
            <span className="font-display text-[#00CCFF]/60 text-4xl leading-none">{project.number}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-body tracking-widest px-3 py-1 rounded-full bg-[#00CCFF]/20 text-[#00CCFF] border border-[#00CCFF]/30">
              ✓ {project.status}
            </span>
          </div>
        </div>

        {/* Middle */}
        <div>
          <span className="text-xs font-body tracking-[0.2em] text-[#00CCFF] uppercase mb-3 block">{project.category}</span>
          <h3 className="font-display text-[clamp(1.5rem,3vw,2.4rem)] text-[#FFFFFF] leading-tight mb-2">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E4F3F7" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="font-body text-[#E4F3F7]/80 text-sm">{project.location}</span>
          </div>
          <p className="font-body text-[#E4F3F7]/70 text-sm leading-relaxed max-w-lg opacity-100 lg:opacity-0 lg:group-hover:opacity-100 translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-all duration-500">
            {project.scope}
          </p>
        </div>

        {/* Bottom: Stats */}
        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E4F3F7]/10 mt-6">
          <div>
            <div className="font-display text-[#00CCFF] text-xl mb-1">{project.value}</div>
            <div className="font-body text-[#E4F3F7]/60 text-[0.65rem] tracking-widest uppercase">Contract Value</div>
          </div>
          <div>
            <div className="font-display text-[#FFFFFF] text-xl mb-1">{project.duration}</div>
            <div className="font-body text-[#E4F3F7]/60 text-[0.65rem] tracking-widest uppercase">Duration</div>
          </div>
          <div>
            <div className="font-body text-[#E4F3F7]/80 text-xs leading-relaxed">{project.client}</div>
            <div className="font-body text-[#E4F3F7]/60 text-[0.65rem] tracking-widest uppercase mt-1">Client</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const sectionRef = useRef()

  useGSAP(() => {
    gsap.from('.projects-header', {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.projects-header', start: 'top 80%' },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="projects" className="relative bg-[#0D0524] py-28 section-base lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
      <div className="section-padding relative z-10">
        {/* Header */}
        <div className="projects-header mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-display text-[#00CCFF] text-sm tracking-[0.3em]">PORTFOLIO</span>
            <div className="gold-line" />
          </div>
          <h2 className="font-display text-[clamp(3rem,7vw,6rem)] text-[#FFFFFF] leading-none mb-4">
            PAST<br /><span className="text-gradient-gold">PROJECTS</span>
          </h2>
          <p className="font-body text-[#E4F3F7]/80 max-w-xl text-[1rem] leading-relaxed">
            Every project is a testament to Rimak's commitment to quality, timely delivery, and client satisfaction. Two completed projects — with more in progress.
          </p>
        </div>

        {/* Projects grid */}
        <MobileCarousel className="flex md:grid md:grid-cols-2 gap-8 mobile-slider-track hide-scrollbar">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </MobileCarousel>

        {/* Callout */}
        <div className="mt-16 glass-card gold-border rounded-sm p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl text-[#FFFFFF] mb-2">Ready to Start Your Project?</h3>
            <p className="font-body text-[#E4F3F7]/80 text-sm">Contact Rimak Nigeria Limited for a consultation and cost estimate.</p>
          </div>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary flex-shrink-0"
          >
            Get a Quote
          </button>
        </div>
      </div>
    </section>
  )
}
