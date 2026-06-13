import { useState, useEffect, useRef, useCallback } from 'react'
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
  const [activeHash, setActiveHash] = useState('')
  const drawerRef = useRef(null)
  const hamburgerRef = useRef(null)
  const firstFocusableRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Focus trap inside drawer
  useEffect(() => {
    if (!isOpen) return
    // Focus the close button when drawer opens
    setTimeout(() => {
      firstFocusableRef.current?.focus()
    }, 50)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        hamburgerRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const drawer = drawerRef.current
      if (!drawer) return
      const focusable = drawer.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleLinkClick = useCallback((e, href) => {
    e.preventDefault()
    setIsOpen(false)
    setActiveHash(href)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const closeDrawer = useCallback(() => {
    setIsOpen(false)
    hamburgerRef.current?.focus()
  }, [])

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
            <img
              src="/rimak logo.png"
              alt="RIMAK NIGERIA LIMITED Logo"
              className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div>
              <span className="font-display text-xl text-[#F5F2EE] tracking-widest leading-none block mb-[2px]">
                RIMAK
              </span>
              <span className="text-[0.65rem] text-[#E4F3F7] tracking-[0.2em] leading-none block">
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
                className={`text-[0.8rem] font-body font-medium tracking-[0.15em] transition-colors duration-300 uppercase relative group ${
                  activeHash === link.href
                    ? 'text-[#00CCFF]'
                    : 'text-[#E4F3F7] hover:text-[#00CCFF]'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] bg-[#00CCFF] transition-all duration-300 ${
                    activeHash === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
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
            ref={hamburgerRef}
            className="lg:hidden flex flex-col gap-[5px] p-2 z-50 min-w-[48px] min-h-[48px] items-center justify-center"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-drawer"
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

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer-overlay"
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ background: 'rgba(6, 2, 20, 0.6)', backdropFilter: 'blur(4px)' }}
            onClick={closeDrawer}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sliding Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="mobile-drawer"
            id="mobile-nav-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed top-0 left-0 h-full z-50 lg:hidden flex flex-col"
            style={{
              width: 'min(80vw, 320px)',
              background: 'rgba(6, 2, 20, 0.98)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRight: '1px solid rgba(0, 204, 255, 0.15)',
              boxShadow: '8px 0 40px rgba(0, 0, 0, 0.6)',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#00CCFF]/10">
              <a
                href="#hero"
                onClick={(e) => handleLinkClick(e, '#hero')}
                className="flex items-center gap-3 group"
              >
                <img
                  src="/rimak logo.png"
                  alt="RIMAK NIGERIA LIMITED Logo"
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <span className="font-display text-base text-[#F5F2EE] tracking-widest leading-none block mb-[2px]">
                    RIMAK
                  </span>
                  <span className="text-[0.55rem] text-[#E4F3F7] tracking-[0.2em] leading-none block">
                    NIGERIA LIMITED
                  </span>
                </div>
              </a>

              {/* Close button */}
              <button
                ref={firstFocusableRef}
                onClick={closeDrawer}
                aria-label="Close navigation menu"
                className="flex items-center justify-center w-10 h-10 rounded-full text-[#E4F3F7] hover:text-[#00CCFF] hover:bg-[#00CCFF]/10 transition-all duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col flex-1 px-6 py-8 gap-1 overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative flex items-center gap-4 px-4 py-4 rounded-lg text-[0.95rem] font-body font-medium tracking-[0.12em] uppercase transition-all duration-200 min-h-[48px] group ${
                    activeHash === link.href
                      ? 'text-[#00CCFF] bg-[#00CCFF]/10'
                      : 'text-[#E4F3F7] hover:text-[#00CCFF] hover:bg-[#00CCFF]/8'
                  }`}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.045, ease: 'easeOut' }}
                >
                  {/* Accent bar */}
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-[#00CCFF] transition-all duration-200 ${
                      activeHash === link.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                    }`}
                  />
                  <span className="ml-2">{link.label}</span>
                </motion.a>
              ))}
            </nav>

            {/* Drawer footer CTA */}
            <div className="px-6 py-6 border-t border-[#00CCFF]/10">
              <motion.a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="btn-primary w-full justify-center text-sm py-3 px-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.38, ease: 'easeOut' }}
              >
                Get In Touch
              </motion.a>
              <p className="text-center text-[#E4F3F7]/40 text-[0.65rem] tracking-widest uppercase mt-4">
                RC 9484253
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
