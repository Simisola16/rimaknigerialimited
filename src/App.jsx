import { useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useLenis } from './hooks/useLenis'
import { useIsMobile } from './hooks/useIsMobile'

// Shared
import Navbar from './components/shared/Navbar'
import ScrollProgress from './components/shared/ScrollProgress'
import MobileSlideLayout from './components/MobileSlideLayout'

// Sections
import HeroSection from './components/Hero/HeroSection'
import AboutSection from './components/About/AboutSection'
import ServicesSection from './components/Services/ServicesSection'
import DivisionsSection from './components/Divisions/DivisionsSection'
import StrategySection from './components/Strategy/StrategySection'
import TeamSection from './components/Team/TeamSection'
import ProjectsSection from './components/Projects/ProjectsSection'
import EquipmentSection from './components/Equipment/EquipmentSection'
import ValuesSection from './components/Values/ValuesSection'
import ContactSection from './components/Contact/ContactSection'
import Footer from './components/Footer/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const isMobile = useIsMobile(768)

  // Initialize Lenis smooth scroll (synced with GSAP) — only for desktop
  useLenis()

  useGSAP(() => {
    if (isMobile) return

    let mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const sections = gsap.utils.toArray('main > section, footer')

      // Helper ScrollTriggers to capture exact snap positions after pinned sections insert padding
      const triggers = sections.map((sec) => {
        return ScrollTrigger.create({
          trigger: sec,
          start: 'top top',
        })
      })

      const getScrollPositions = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
        if (scrollHeight <= 0) return [0]
        return triggers.map((t) => t.start / scrollHeight)
      }

      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        snap: {
          snapTo: (value) => {
            const positions = getScrollPositions()
            const closest = positions.reduce((prev, curr) =>
              Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev,
              0
            )
            return closest
          },
          duration: { min: 0.3, max: 0.7 },
          delay: 0.08,
          ease: 'power1.out',
        },
      })
    })

    return () => mm.revert()
  }, [isMobile])

  useEffect(() => {
    // Refresh ScrollTrigger after all components mount — only on desktop
    if (!isMobile) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [isMobile])

  const sections = [
    HeroSection,
    AboutSection,
    ServicesSection,
    DivisionsSection,
    StrategySection,
    TeamSection,
    ProjectsSection,
    EquipmentSection,
    ValuesSection,
    ContactSection,
  ]

  // Mobile slide layout
  if (isMobile) {
    return (
      <div className="relative">
        <MobileSlideLayout sections={sections} />
      </div>
    )
  }

  // Desktop scroll layout
  return (
    <div className="relative">
      {/* Fixed UI */}
      <ScrollProgress />
      <Navbar />

      {/* Main content */}
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <DivisionsSection />
        <StrategySection />
        <TeamSection />
        <ProjectsSection />
        <EquipmentSection />
        <ValuesSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}

export default App
