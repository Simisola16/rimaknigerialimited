import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import MobileCarousel from '../shared/MobileCarousel'
import { projects } from '../../data/projectsData'

gsap.registerPlugin(ScrollTrigger)

// ─── Project Card ────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const navigate = useNavigate()
  const cardRef = useRef()
  const bgTextRef = useRef()
  const contentRef = useRef()

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
    tl.to(bgTextRef.current, { y: -60, ease: 'none' }, 0)
    tl.to(contentRef.current, { y: -20, ease: 'none' }, 0)

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

  const hasImages = project.images && project.images.length > 0
  const coverImage = hasImages ? project.images[0] : null

  const handleViewGallery = () => {
    navigate(`/gallery?project=${project.id}`)
  }

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-sm border border-[#E4F3F7]/10 group w-full"
      style={{ minHeight: '500px' }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D0524] to-[#060214]">
        {coverImage ? (
          <>
            <img
              src={coverImage}
              alt={`${project.title} – ${project.client}`}
              className="w-full h-full object-cover opacity-40 group-hover:opacity-55 transition-opacity duration-700 scale-105 group-hover:scale-100"
              style={{ transition: 'opacity 0.7s ease, transform 0.9s ease' }}
            />
            {/* colour grade */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0D0524]/70 via-transparent to-[#00CCFF]/10" />
          </>
        ) : (
          /* Architectural SVG for cards without a photo */
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
        )}
      </div>

      {/* ── Parallax background number ── */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="font-display text-[8rem] lg:text-[12rem] text-[#00CCFF]/5 leading-none whitespace-nowrap">
          PROJECT {project.number}
        </span>
      </div>

      {/* ── Hover overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060214]/95 via-[#060214]/50 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

      {/* ── Content ── */}
      <div ref={contentRef} className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between" style={{ minHeight: '500px' }}>
        {/* Top row */}
        <div className="flex items-start justify-between">
          <span className="font-display text-[#00CCFF]/60 text-4xl leading-none">{project.number}</span>
          <div className="flex items-center gap-2">
            {hasImages && (
              <span className="text-xs font-body tracking-widest px-3 py-1 rounded-full bg-[#E4F3F7]/10 text-[#E4F3F7]/70 border border-[#E4F3F7]/20">
                📷 {project.images.length} photos
              </span>
            )}
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

          {/* Construction progress note */}
          {hasImages && (
            <div className="mb-3 flex items-start gap-2 px-3 py-2 rounded-sm bg-[#00CCFF]/5 border-l-2 border-[#00CCFF]/60">
              <svg className="flex-shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00CCFF" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="font-body text-[#00CCFF]/80 text-xs leading-relaxed">
                The images document the <strong className="text-[#00CCFF]">building construction process</strong> — from foundation to completion of the {project.title}.
              </p>
            </div>
          )}

          <p className="font-body text-[#E4F3F7]/70 text-sm leading-relaxed max-w-lg opacity-100 lg:opacity-0 lg:group-hover:opacity-100 translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-all duration-500">
            {project.scope}
          </p>
        </div>

        {/* Bottom stats */}
        <div>
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E4F3F7]/10 mt-6">
            <div>
              <div className="font-display text-[#FFFFFF] text-xl mb-1">{project.year}</div>
              <div className="font-body text-[#E4F3F7]/60 text-[0.65rem] tracking-widest uppercase">Year</div>
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

          {/* CTA */}
          {hasImages ? (
            <button
              onClick={handleViewGallery}
              className="btn-primary mt-5 flex items-center gap-2 group/btn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              View Construction Images
              <svg className="transition-transform duration-200 group-hover/btn:translate-x-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary mt-5"
            >
              Learn More
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
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
            OUR<br />
            <span className="text-gradient-gold">PROJECTS</span>
          </h2>
          <p className="font-body text-[#E4F3F7]/80 max-w-xl text-[1rem] leading-relaxed">
            Every project is a testament to Rimak's commitment to quality, timely delivery, and client satisfaction. Two completed projects — with more in progress.
          </p>
        </div>

        {/* Projects grid with autoPlay={false} to disable automatic sliding on mobile */}
        <MobileCarousel autoPlay={false} className="flex md:grid md:grid-cols-2 gap-8 mobile-slider-track hide-scrollbar">
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
