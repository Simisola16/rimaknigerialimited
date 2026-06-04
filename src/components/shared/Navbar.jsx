import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#divisions', label: 'Divisions' },
  { href: '#team', label: 'Team' },
  { href: '#projects', label: 'Projects' },
  { href: '#values', label: 'Values' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setIsOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#060214]/95 backdrop-blur-xl border-b border-[#00CCFF]/20 shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="section-padding flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 relative">
              <div className="absolute inset-0 border-2 border-[#00CCFF] rotate-45 group-hover:rotate-90 transition-transform duration-500" />
              <div className="absolute inset-[6px] bg-[#00CCFF] rotate-45 group-hover:rotate-0 transition-transform duration-500" />
            </div>
            <div>
              <span className="font-display text-lg text-[#F5F2EE] tracking-widest leading-none block">
                RIMAK
              </span>
              <span className="text-[0.6rem] text-[#E4F3F7] tracking-[0.2em] leading-none block">
                NIGERIA LIMITED
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[0.8rem] font-body font-medium tracking-[0.15em] text-[#E4F3F7] hover:text-[#00CCFF] transition-colors duration-300 uppercase relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00CCFF] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="btn-primary text-sm py-3 px-6"
            >
              Get In Touch
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2 z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            id="nav-hamburger"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-[2px] bg-[#F5F2EE]"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-[2px] bg-[#F5F2EE]"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-[2px] bg-[#F5F2EE]"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ background: 'rgba(6, 2, 20, 0.98)', backdropFilter: 'blur(20px)' }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-display text-5xl text-[#F5F2EE] hover:text-[#00CCFF] transition-colors duration-300 tracking-widest"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="btn-primary mt-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4, delay: navLinks.length * 0.06 }}
              >
                Get In Touch
              </motion.a>
            </nav>

            <p className="absolute bottom-10 text-[#E4F3F7] text-xs tracking-widest">
              RC 9484253
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
