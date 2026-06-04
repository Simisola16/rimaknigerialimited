import { useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useLenis } from './hooks/useLenis'

// Shared
import Navbar from './components/shared/Navbar'
import ScrollProgress from './components/shared/ScrollProgress'

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
  // Initialize Lenis smooth scroll (synced with GSAP)
  useLenis()

  useEffect(() => {
    // Refresh ScrollTrigger after all components mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)
    return () => clearTimeout(timer)
  }, [])

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
