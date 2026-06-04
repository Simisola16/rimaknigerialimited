import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const management = [
  {
    name: 'Adigun M.A.',
    role: 'Managing Director',
    quals: 'Dip (Const Mgnt)',
    phone: '08033175515',
    initial: 'AM',
    color: '#D4861A',
  },
  {
    name: 'Rafiu Idris',
    role: 'Executive Director',
    quals: 'HND · PGD · MNIQS · RQS',
    phone: '08167713129',
    initial: 'RI',
    color: '#C4B8A8',
  },
  {
    name: 'Engr. Bello Amodu Ademola',
    role: 'Technical Director',
    quals: 'B.Tech (Civil) · MASCE · MICE · COREN',
    phone: null,
    initial: 'BA',
    color: '#D4861A',
  },
  {
    name: 'Oni Ademola',
    role: 'Financial Director',
    quals: 'HND Accountancy · ACA · MNIM',
    phone: null,
    initial: 'OA',
    color: '#C4B8A8',
  },
  {
    name: 'Babalola Gabriel',
    role: 'Contract Manager',
    quals: 'BSc · MNIQS · RQS',
    phone: '07035078730',
    initial: 'BG',
    color: '#D4861A',
  },
]

const technical = [
  {
    name: 'Engr. Bello Amodu Ademola',
    quals: 'B.Tech Civil · MASCE · MICE · COREN',
    years: 18,
    role: 'Project Manager',
    badge: 'Senior',
  },
  {
    name: 'Fashola Kolapo',
    quals: 'BSc Building Tech · NIOB · CORBON',
    years: 15,
    role: 'Site Manager',
    badge: 'Senior',
  },
  {
    name: 'Engr. Lawal A.A.',
    quals: 'B.Tech Civil · MSc Civil · MNSE · COREN · MNICE',
    years: 7,
    role: 'Project Engineer',
    badge: 'Mid',
  },
  {
    name: 'Akinyode Samuel',
    quals: 'HND · MNIQS · RQS',
    years: 10,
    role: 'Procurement Manager',
    badge: 'Senior',
  },
  {
    name: 'Shuaib Lukman',
    quals: 'HND · MNIQS · RQS',
    years: 10,
    role: 'Senior Quantity Surveyor',
    badge: 'Senior',
  },
  {
    name: 'Ehis Odunayo',
    quals: 'BSc Quantity Surveying',
    years: 7,
    role: 'Quantity Surveyor',
    badge: 'Mid',
  },
]

function ManagementCard({ person, index }) {
  return (
    <motion.div
      className="management-card glass-card gold-border rounded-sm p-6 relative overflow-hidden group"
      whileHover={{
        y: -8,
        boxShadow: '0 24px 60px rgba(212,134,26,0.15)',
        transition: { duration: 0.3 },
      }}
    >
      {/* Avatar */}
      <div className="mb-5">
        <div
          className="w-16 h-16 rounded-sm flex items-center justify-center font-display text-2xl transition-transform duration-300 group-hover:rotate-3"
          style={{
            background: `linear-gradient(135deg, ${person.color}30, ${person.color}15)`,
            border: `1px solid ${person.color}50`,
            color: person.color,
          }}
        >
          {person.initial}
        </div>
      </div>

      {/* Info */}
      <h3 className="font-display text-lg text-[#F5F2EE] leading-tight mb-1">{person.name}</h3>
      <p className="font-body text-[#D4861A] text-xs tracking-wider uppercase mb-3">{person.role}</p>
      <div className="gold-line mb-3" style={{ width: '30px', background: person.color }} />
      <p className="font-body text-[#C4B8A8] text-xs leading-relaxed mb-4">{person.quals}</p>

      {person.phone && (
        <a
          href={`tel:${person.phone}`}
          className="flex items-center gap-2 text-[#D4861A] text-xs font-body hover:text-[#E8A040] transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.17 6.17l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15v1.92z" />
          </svg>
          {person.phone}
        </a>
      )}

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-sm"
        style={{ background: `radial-gradient(circle at 30% 30%, ${person.color}08, transparent 60%)` }}
      />
    </motion.div>
  )
}

export default function TeamSection() {
  const sectionRef = useRef()
  const mgmtRef = useRef()
  const techRef = useRef()

  useGSAP(() => {
    // Staggered batch animation for management cards
    ScrollTrigger.batch('.management-card', {
      onEnter: (els) => {
        gsap.from(els, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        })
      },
      start: 'top 85%',
    })

    // Technical staff rows
    ScrollTrigger.batch('.tech-row', {
      onEnter: (els) => {
        gsap.from(els, {
          opacity: 0,
          x: -40,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
        })
      },
      start: 'top 90%',
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="team" className="relative bg-[#060D1A] py-28 section-base">
      <div className="section-padding relative z-10">

        {/* Management Team */}
        <div ref={mgmtRef} className="mb-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-display text-[#D4861A] text-sm tracking-[0.3em]">LEADERSHIP</span>
            <div className="gold-line" />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[#F5F2EE] leading-none mb-4">
            MANAGEMENT<br /><span className="text-gradient-gold">TEAM</span>
          </h2>
          <p className="font-body text-[#C4B8A8] max-w-xl mb-14 text-[1rem] leading-relaxed">
            Rimak is led by a seasoned team of construction professionals, engineers, and business managers — each bringing deep domain expertise and industry-recognised credentials.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {management.map((person, i) => (
              <ManagementCard key={i} person={person} index={i} />
            ))}
          </div>
        </div>

        {/* Technical Staff */}
        <div ref={techRef}>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-display text-[#D4861A] text-sm tracking-[0.3em]">TECHNICAL</span>
            <div className="gold-line" />
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-[#F5F2EE] leading-none mb-10">
            TECHNICAL<br /><span className="text-gradient-concrete">STAFF</span>
          </h2>

          {/* Table */}
          <div className="overflow-x-auto rounded-sm border border-[#C4B8A8]/10">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-[#C4B8A8]/10">
                  <th className="text-left py-4 px-6 font-body text-xs tracking-[0.2em] text-[#D4861A] uppercase">Name</th>
                  <th className="text-left py-4 px-6 font-body text-xs tracking-[0.2em] text-[#D4861A] uppercase">Qualifications</th>
                  <th className="text-left py-4 px-6 font-body text-xs tracking-[0.2em] text-[#D4861A] uppercase">Experience</th>
                  <th className="text-left py-4 px-6 font-body text-xs tracking-[0.2em] text-[#D4861A] uppercase">Role</th>
                  <th className="text-left py-4 px-6 font-body text-xs tracking-[0.2em] text-[#D4861A] uppercase">Level</th>
                </tr>
              </thead>
              <tbody>
                {technical.map((staff, i) => (
                  <tr
                    key={i}
                    className="tech-row border-b border-[#C4B8A8]/5 hover:bg-[#D4861A]/5 transition-colors duration-200"
                  >
                    <td className="py-5 px-6 font-body font-medium text-[#F5F2EE] text-sm">{staff.name}</td>
                    <td className="py-5 px-6 font-body text-[#C4B8A8] text-xs leading-relaxed max-w-[200px]">{staff.quals}</td>
                    <td className="py-5 px-6 font-display text-[#D4861A] text-xl">{staff.years}yrs</td>
                    <td className="py-5 px-6 font-body text-[#C4B8A8] text-sm">{staff.role}</td>
                    <td className="py-5 px-6">
                      <span
                        className="text-xs font-body tracking-wider px-3 py-1 rounded-full"
                        style={{
                          background: staff.badge === 'Senior' ? 'rgba(212,134,26,0.15)' : 'rgba(196,184,168,0.1)',
                          color: staff.badge === 'Senior' ? '#D4861A' : '#C4B8A8',
                          border: `1px solid ${staff.badge === 'Senior' ? 'rgba(212,134,26,0.3)' : 'rgba(196,184,168,0.2)'}`,
                        }}
                      >
                        {staff.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
