import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedCounter from '../shared/AnimatedCounter'

gsap.registerPlugin(ScrollTrigger)

const owned = [
  'Concrete Mixers',
  'Tippers',
  'Dumpers',
  'Pickup Van',
  'Road Rollers',
  'Vibrators',
  'Block Making Machines',
  'Wheelbarrows',
  'Tool Box (Electrical)',
  'Tool Box (Mechanical)',
  'Tool Box (General)',
  'Scaffolding Sets',
  'Water Tanker',
  'Water Pump',
  'Surveying Instruments',
  'Levelling Equipment',
  '4WD Toyota Hilux',
  'Hand Roller',
  'Drilling Machine',
  'Generator (Small)',
]

const onHire = [
  'Atlas Excavator',
  'Rig Machine',
  'Crane Lorry',
  'Pumping Machine',
  'Generator (Heavy Duty)',
  'Road Rollers (Heavy)',
]

export default function EquipmentSection() {
  const sectionRef = useRef()
  const [activeTab, setActiveTab] = useState('owned')

  useGSAP(() => {
    gsap.from('.equipment-title', {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.equipment-title', start: 'top 80%' },
    })
  }, { scope: sectionRef })

  const currentItems = activeTab === 'owned' ? owned : onHire

  return (
    <section ref={sectionRef} id="equipment" className="relative bg-[#060214] py-28 section-base lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #00CCFF 0, #00CCFF 1px, transparent 0, transparent 80px), repeating-linear-gradient(90deg, #00CCFF 0, #00CCFF 1px, transparent 0, transparent 80px)',
        }}
      />

      <div className="section-padding relative z-10">
        {/* Header */}
        <div className="equipment-title mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-display text-[#00CCFF] text-sm tracking-[0.3em]">RESOURCES</span>
            <div className="gold-line" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[#FFFFFF] leading-none mb-4">
                MACHINERY &<br /><span className="text-gradient-gold">EQUIPMENT</span>
              </h2>
              <p className="font-body text-[#E4F3F7]/80 max-w-lg text-[1rem] leading-relaxed">
                Rimak maintains a comprehensive fleet of construction equipment — 20 owned items and 6 available on hire — ensuring full operational readiness for every project scale.
              </p>
            </div>

            {/* Total badge */}
            <div className="flex gap-6 flex-shrink-0">
              <div className="text-center">
                <AnimatedCounter end={20} className="block font-display text-5xl text-[#00CCFF]" trigger="#equipment" />
                <div className="font-body text-[#E4F3F7]/60 text-xs tracking-widest uppercase">Owned</div>
              </div>
              <div className="w-px h-16 bg-[#E4F3F7]/10 self-center" />
              <div className="text-center">
                <AnimatedCounter end={6} className="block font-display text-5xl text-[#00CCFF]" trigger="#equipment" />
                <div className="font-body text-[#E4F3F7]/60 text-xs tracking-widest uppercase">On Hire</div>
              </div>
              <div className="w-px h-16 bg-[#E4F3F7]/10 self-center" />
              <div className="text-center">
                <AnimatedCounter end={26} className="block font-display text-5xl text-[#FFFFFF]" trigger="#equipment" />
                <div className="font-body text-[#E4F3F7]/60 text-xs tracking-widest uppercase">Total</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content container */}
        

      </div>
    </section>
  )
}
