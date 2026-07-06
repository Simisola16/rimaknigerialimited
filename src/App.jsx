import { useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useLenis } from './hooks/useLenis'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Gallery from './pages/Gallery';
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

function RouteMetadata() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/gallery') {
      document.title = "Project Gallery | Rimak Nigeria Limited";
      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) {
        descMeta.setAttribute('content', 'Browse through the gallery of completed and ongoing construction, engineering, and infrastructure projects by Rimak Nigeria Limited.');
      }
    } else {
      document.title = "Rimak Nigeria Limited | Civil Engineering & Construction";
      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) {
        descMeta.setAttribute('content', 'Rimak Nigeria Limited is a premier civil engineering, building construction, MEP contracting, and project management company in Lagos, Nigeria. RC 9484253.');
      }
    }
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  // Initialize Lenis smooth scroll (synced with GSAP)
  useLenis()

  useGSAP(() => {
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
  })

  useEffect(() => {
    // Refresh ScrollTrigger after all components mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  return (
<BrowserRouter>
  <RouteMetadata />
  <div className="relative">
    {/* Fixed UI */}
    <ScrollProgress />
    <Navbar />
    <Routes>
      <Route path="/" element={
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
      } />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
    <Footer />
  </div>
</BrowserRouter>
  )
}

export default App
