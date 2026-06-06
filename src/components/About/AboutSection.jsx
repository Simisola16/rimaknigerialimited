import React from 'react';
import AnimatedCounter from '../shared/AnimatedCounter';
import { gsap } from 'gsap';

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
              className="absolute border border-[#00CCFF]/20 rounded-full animate-pulse"
              style={{ width: `${size}%`, height: `${size}%`, animationDelay: `${i * 0.4}s` }}
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
];

const stats = [
  { value: 18, suffix: '+', label: 'Years Combined Experience', prefix: '' },
  { value: 4, suffix: '', label: 'Core Divisions', prefix: '' },
  { value: 26, suffix: '', label: 'Equipment Items', prefix: '' },
  { value: 2, suffix: '', label: 'Completed Projects', prefix: '' },
];

export default function AboutSection() {
  const containerRef = React.useRef(null);
  React.useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const totalScroll = container.scrollWidth - container.clientWidth;
    // Animate scroll left continuously
    gsap.to(container, {
      scrollLeft: totalScroll,
      duration: steps.length * 5, // 5 seconds per slide
      ease: 'none',
      repeat: -1,
      onRepeat: () => {
        // Reset scroll to start after each loop
        container.scrollLeft = 0;
      },
    });
  }, []);

  return (
    <section id="about" className="relative min-h-[70vh] bg-[#060214] py-12 overflow-x-auto snap-x snap-mandatory">
      {/* Blueprint grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #330099 0, #330099 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #330099 0, #330099 1px, transparent 1px, transparent 60px)',
        }} />
      </div>

      {/* Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.06] pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(circle, #00CCFF 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full h-full section-padding flex flex-col items-start pt-28 pb-20">
        {/* Section label */}
        <div className="absolute top-12 left-0 section-padding z-20">
          <div className="flex items-center gap-4">
            <span className="font-display text-[#00CCFF] text-sm tracking-[0.3em]">ABOUT</span>
            <div className="gold-line" />
          </div>
        </div>

        {/* Steps container */}
        <div ref={containerRef} className="flex w-full h-screen overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {steps.map((step, i) => (
            <div key={i} className="flex-shrink-0 w-screen h-screen flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-16 snap-start">
              {/* Text column */}
              <div className="flex-1">
                <div className="about-chapter font-display text-[#00CCFF]/20 text-[7rem] leading-none mb-2 select-none">{step.chapter}</div>
                <h2 className="about-title font-display text-[clamp(2.2rem,5vw,4rem)] text-[#FFFFFF] leading-tight mb-5">{step.title}</h2>
                <p className="about-body font-body text-[#E4F3F7]/90 text-[1rem] leading-[1.85] max-w-lg">{step.content}</p>
              </div>
              {/* Visual column */}
              <div className="about-visual flex-1 w-full max-w-sm lg:max-w-md">{step.visual}</div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-[#E4F3F7]/10 bg-[#060214]/80 backdrop-blur-xl">
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
      </div>
    </section>
  );
}
