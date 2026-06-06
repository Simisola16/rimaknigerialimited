import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const coreValues = [
  {
    icon: '⬟',
    title: 'Integrity',
    desc: 'We uphold honesty, transparency, and ethical conduct in every engagement — from project scoping to final delivery.',
    color: '#00CCFF',
  },
  {
    icon: '◈',
    title: 'Teamwork',
    desc: 'Collaboration across disciplines — engineers, surveyors, managers, and tradespeople — drives our collective excellence.',
    color: '#E4F3F7',
  },
  {
    icon: '◉',
    title: 'Innovation',
    desc: 'We embrace modern construction methodologies, materials, and technology to deliver smarter, faster, better results.',
    color: '#00CCFF',
  },
  {
    icon: '◆',
    title: 'Excellence',
    desc: 'From groundbreaking to handover, we pursue the highest standards in quality, safety, and professionalism.',
    color: '#E4F3F7',
  },
  {
    icon: '❖',
    title: 'Passion',
    desc: 'We are genuinely passionate about building Nigeria\'s future — every project is a contribution to national development.',
    color: '#00CCFF',
  },
]

export default function ValuesSection() {
  const sectionRef = useRef()

  useGSAP(() => {
    gsap.from('.values-header', {
      opacity: 0, y: 60, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.values-header', start: 'top 80%' },
    })

    ScrollTrigger.batch('.value-card', {
      onEnter: (els) => {
        gsap.from(els, {
          opacity: 0, y: 60, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        })
      },
      start: 'top 85%',
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="values" className="relative bg-[#0D0524] py-28 section-base overflow-hidden lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00CCFF]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00CCFF]/20 to-transparent" />
      </div>

      <div className="section-padding relative z-10">
        {/* Vision & Mission */}
        <div className="values-header mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-display text-[#00CCFF] text-sm tracking-[0.3em]">OUR PURPOSE</span>
            <div className="gold-line" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
            {/* Vision */}
            <div className="glass-card gold-border rounded-sm p-10 relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 font-display text-[10rem] text-[#00CCFF]/5 leading-none select-none">V</div>
              <div className="w-10 h-10 bg-[#00CCFF]/10 border border-[#00CCFF]/30 rounded-sm flex items-center justify-center mb-6">
                <span className="font-display text-[#00CCFF] text-sm">VIS</span>
              </div>
              <h3 className="font-display text-3xl text-[#FFFFFF] mb-4">VISION</h3>
              <div className="gold-line mb-6" />
              <p className="font-body text-[#E4F3F7] leading-relaxed">To be a leading construction company renowned for delivering innovative, sustainable, and high-quality projects that transform communities and exceed client expectations.{' '}
              </p>
            </div>

            {/* Mission */}
            <div className="glass-card rounded-sm p-10 relative overflow-hidden border border-[#E4F3F7]/10 group hover:border-[#E4F3F7]/20 transition-colors">
              <div className="absolute -right-8 -top-8 font-display text-[10rem] text-[#E4F3F7]/5 leading-none select-none">M</div>
              <div className="w-10 h-10 bg-[#E4F3F7]/10 border border-[#E4F3F7]/20 rounded-sm flex items-center justify-center mb-6">
                <span className="font-display text-[#E4F3F7] text-sm">MIS</span>
              </div>
              <h3 className="font-display text-3xl text-[#FFFFFF] mb-4">MISSION</h3>
              <div className="w-10 h-[3px] rounded-sm bg-[#E4F3F7] mb-6" />
              <p className="font-body text-[#E4F3F7] leading-relaxed">
                To deliver exceptional construction and engineering solutions through professionalism, innovation, technical excellence and unwavering commitment to safety, integrity, client satisfaction and contributing to the growth of the nation."
              </p>
            </div>
          </div>

          {/* Core Values header */}
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[#FFFFFF] leading-none">
            CORE<br /><span className="text-gradient-gold">VALUES</span>
          </h2>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {coreValues.map((value, i) => (
            <motion.div
              key={i}
              className="value-card glass-card rounded-sm p-6 relative overflow-hidden group cursor-default"
              whileHover={{
                y: -10,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
            >
              {/* Icon */}
              <div
                className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ color: value.color }}
              >
                {value.icon}
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl text-[#FFFFFF] mb-3">{value.title}</h3>

              <div className="w-6 h-[2px] mb-4 rounded-sm" style={{ background: value.color }} />

              {/* Description */}
              <p className="font-body text-[#E4F3F7] text-xs leading-relaxed">{value.desc}</p>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${value.color}, transparent)` }}
              />

              {/* Background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${value.color}08, transparent 70%)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
