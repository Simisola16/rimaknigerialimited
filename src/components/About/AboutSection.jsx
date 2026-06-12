import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import AnimatedCounter from '../shared/AnimatedCounter';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    chapter: '01',
    eyebrow: 'Who We Are',
    title: 'Nigerian-Owned.\nGlobally Engineered.',
    body: 'Rimak Nigeria Limited is a proudly Nigerian-owned construction and engineering firm, registered with the Corporate Affairs Commission (RC 9484253). Headquartered in Lagos State, we have been delivering excellence across Nigeria — combining deep local knowledge with international engineering standards.',
    visual: (
      <div className="about-visual-panel">
        {/* Animated concentric rings */}
        <div className="about-rings-wrap" aria-hidden="true">
          {[128, 96, 64].map((size, i) => (
            <div
              key={i}
              className="about-ring-circle"
              style={{ width: size, height: size, animationDelay: `${i * 0.5}s` }}
            />
          ))}
          <div className="about-ring-core">
            <img src="/rimak logo.png" alt="Rimak Logo" className="about-logo-img" />
          </div>
        </div>
        {/* RC badge */}
        <div className="about-rc-badge">
          <span className="about-rc-dot" />
          RC 9484253 · CAC Registered
        </div>
      </div>
    ),
  },
  {
    chapter: '02',
    eyebrow: 'What We Do',
    title: 'Five Disciplines.\nOne Partner.',
    body: 'We operate across five core disciplines: Civil Engineering & Building Construction, Mechanical & Electrical Plumbing (MEP), comprehensive Project Management, Supply of Road & Building Materials, and General Supply & Contracting. Each division is staffed by professionals credentialed through COREN, NIQS, NIOB, and ACA.',
    visual: (
      <div className="about-visual-panel">
        <div className="about-discipline-grid">
          {[
            { label: 'Civil Engineering', icon: '🏗️' },
            { label: 'MEP Works', icon: '⚡' },
            { label: 'Project Mgmt', icon: '📊' },
            { label: 'Materials Supply', icon: '🧱' },
            { label: 'General Contracting', icon: '🔧' },
          ].map((d, i) => (
            <div key={i} className="about-disc-card">
              <span className="about-disc-icon" aria-hidden="true">{d.icon}</span>
              <span className="about-disc-label">{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    chapter: '03',
    eyebrow: 'Our Reach',
    title: 'Across Nigeria.\nInto West Africa.',
    body: 'From residential buildings in Osun State to government broadcast infrastructure in Oyo State, Rimak has served both public institutions and private sector clients across Nigeria. Our growing portfolio reflects our capacity to handle diverse projects — in scale, scope, and geography — with ambitions expanding across West Africa.',
    visual: (
      <div className="about-visual-panel about-visual-map">
        <svg viewBox="0 0 200 220" className="about-map-svg" aria-label="Nigeria map outline">
          <path
            d="M70 30 L110 20 L140 35 L155 55 L160 80 L150 110 L155 140 L140 170 L120 190 L100 200 L80 185 L60 165 L50 140 L45 110 L50 80 L55 55 Z"
            fill="none"
            stroke="rgba(0,204,255,0.3)"
            strokeWidth="1.5"
          />
          {/* Project dots */}
          {[
            { cx: 90, cy: 130, label: 'Osun' },
            { cx: 80, cy: 110, label: 'Oyo' },
            { cx: 100, cy: 90, label: 'Lagos' },
          ].map((pt, i) => (
            <g key={i}>
              <circle cx={pt.cx} cy={pt.cy} r="5" fill="rgba(0,204,255,0.2)" stroke="#00CCFF" strokeWidth="1" />
              <circle cx={pt.cx} cy={pt.cy} r="2" fill="#00CCFF" />
            </g>
          ))}
        </svg>
        <div className="about-map-label">Nigeria · West Africa</div>
      </div>
    ),
  },
  {
    chapter: '04',
    eyebrow: 'Our Commitment',
    title: 'On Time.\nOn Budget.\nTo Standard.',
    body: 'We deliver on time, on budget, and to international standards. Our project methodology prioritises timely reporting, cost transparency, safety compliance, and eco-friendly construction. We are not merely contractors — we are strategic partners committed to building the modern infrastructure Nigeria deserves.',
    visual: (
      <div className="about-visual-panel">
        <div className="about-commitment-list">
          {[
            { label: 'Timely Delivery', sub: 'Schedule-driven project control' },
            { label: 'International Standards', sub: 'COREN, NIQS, NIOB, ACA certified' },
            { label: 'Eco-Friendly Methods', sub: 'Sustainable construction practices' },
            { label: 'Transparent Reporting', sub: 'Full cost & progress visibility' },
          ].map((item, i) => (
            <div key={i} className="about-commit-row">
              <div className="about-commit-dot" />
              <div>
                <div className="about-commit-label">{item.label}</div>
                <div className="about-commit-sub">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const stats = [
  { value: 5, suffix: '+', label: 'Years Experience', prefix: '' },
  { value: 4, suffix: '', label: 'Core Divisions', prefix: '' },
  { value: 26, suffix: '', label: 'Equipment Items', prefix: '' },
  { value: 2, suffix: '', label: 'Completed Projects', prefix: '' },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const headerRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const header = headerRef.current;
    if (!section || !track || !header) return;

    // ── Header entrance animation ──
    const eyebrow = header.querySelector('.about-eyebrow-tag');
    const heading = header.querySelector('.about-heading-main');
    const hint = header.querySelector('.about-scroll-hint');

    gsap.set([eyebrow, heading, hint].filter(Boolean), { opacity: 0, y: 30 });

    const headerST = ScrollTrigger.create({
      trigger: header,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        gsap.to(eyebrow, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
        gsap.to(heading, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: 0.1 });
        if (hint) gsap.to(hint, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.3 });
      },
    });

    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      // ── Desktop: GSAP horizontal scroll with pin + scrub ──
      const totalWidth = track.scrollWidth - window.innerWidth;

      const cards = track.querySelectorAll('.about-slide-card');
      gsap.set(cards, { opacity: 0, x: 100, scale: 0.95 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth + window.innerWidth * 0.5}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      tl.to(track, { x: () => -totalWidth, ease: 'none' });

      // Cards animate in when section pins
      ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            x: 0,
            scale: 1,
            stagger: 0.1,
            duration: 1.0,
            ease: 'power4.out',
          });
        },
      });
    } else {
      // ── Mobile: each card stacks vertically, reveals on scroll ──
      const cards = track.querySelectorAll('.about-slide-card');
      cards.forEach((card) => {
        gsap.set(card, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: card,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(card, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
          },
        });
      });
    }

    return () => {
      headerST.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative bg-[#060214] overflow-hidden">
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #330099 0, #330099 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #330099 0, #330099 1px, transparent 1px, transparent 60px)',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right, #00CCFF 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 opacity-[0.05] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #330099 0%, transparent 70%)' }}
      />

      {/* ── Section header ── */}
      <div ref={headerRef} className="section-padding pt-24 pb-10 relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="about-eyebrow-tag font-display text-[#00CCFF] text-sm tracking-[0.3em]">ABOUT</span>
          <div className="gold-line" />
        </div>

        <h2 className="about-heading-main font-display text-[clamp(3rem,7vw,6rem)] text-white leading-none mb-4">
          WHO WE<br />
          <span className="text-gradient-gold">ARE</span>
        </h2>

        {/* Scroll hint + progress bar */}
        <div className="about-scroll-hint hidden md:flex items-center gap-3 mt-6 text-[#E4F3F7]/50">
          <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
          <svg width="40" height="12" viewBox="0 0 40 12">
            <path d="M0 6h36M30 1l6 5-6 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
        <div className="hidden md:block mt-4 h-px bg-[#E4F3F7]/10 max-w-xs relative overflow-hidden">
          <div
            ref={progressBarRef}
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#00CCFF] to-[#330099] transition-none"
            style={{ width: '0%' }}
          />
        </div>
      </div>

      {/* ── Horizontal scroll track ── */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="horizontal-track flex flex-col md:flex-row will-change-transform"
        >
          {/* Left spacer (desktop) */}
          <div className="hidden md:block flex-shrink-0 w-20" />

          {slides.map((slide, i) => (
            <div
              key={i}
              className="about-slide-card flex-shrink-0 w-full md:w-[520px] lg:w-[580px] h-auto md:h-[calc(100vh-280px)] min-h-[480px] md:mx-4"
            >
              <div className="glass-card gold-border rounded-sm h-full p-8 md:p-10 flex flex-col relative overflow-hidden mx-6 md:mx-0 mb-6 md:mb-0 group hover:border-[#00CCFF]/50 transition-colors duration-500">

                {/* Ghost chapter number */}
                <div className="absolute -right-4 -bottom-6 font-display text-[10rem] text-[#00CCFF]/5 leading-none select-none">
                  {slide.chapter}
                </div>

                {/* Top — chapter + eyebrow */}
                <div className="mb-6">
                  <span className="font-display text-[#00CCFF]/40 text-sm tracking-[0.25em]">
                    {slide.chapter}
                  </span>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-body text-[#00CCFF] text-xs tracking-[0.22em] uppercase font-semibold">
                      {slide.eyebrow}
                    </span>
                    <div className="h-px flex-1 bg-[#00CCFF]/20" />
                  </div>
                </div>

                {/* Heading */}
                <h3 className="font-display text-[clamp(1.9rem,3.5vw,2.8rem)] text-white leading-tight mb-5 whitespace-pre-line">
                  {slide.title}
                </h3>

                {/* Gold divider */}
                <div className="gold-line mb-6" />

                {/* Body text */}
                <p className="font-body text-[#E4F3F7]/80 text-[0.95rem] leading-[1.85] flex-1">
                  {slide.body}
                </p>

                {/* Visual */}
                <div className="mt-8">{slide.visual}</div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-sm"
                  style={{
                    background: 'radial-gradient(circle at 30% 20%, rgba(0,204,255,0.06), transparent 65%)',
                  }}
                />
              </div>
            </div>
          ))}

          {/* Right spacer (desktop) */}
          <div className="hidden md:block flex-shrink-0 w-20" />
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="relative z-10 border-t border-[#E4F3F7]/10 bg-[#060214]/80 backdrop-blur-xl">
        <div className="section-padding py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-left group">
              <div className="flex items-end gap-1">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <p className="font-body text-[#E4F3F7]/60 text-xs tracking-widest uppercase mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
