import { motion } from 'framer-motion'

const quickLinks = [
  { href: '#about', label: 'About Us' },
  { href: '#services', label: 'Services' },
  { href: '#divisions', label: 'Our Divisions' },
  { href: '#team', label: 'Management Team' },
  { href: '#projects', label: 'Past Projects' },
  { href: '#equipment', label: 'Equipment' },
  { href: '#values', label: 'Vision & Values' },
  { href: '#contact', label: 'Contact Us' },
]

const services = [
  'Construction & Rehabilitation',
  'MEP Works',
  'Project Management',
  'Supply of Materials',
  'Supply & Installation',
]

export default function Footer() {
  const handleClick = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-[#040912] border-t border-[#D4861A]/20">
      {/* Top decorative line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#D4861A]/40 to-transparent" />

      {/* Main footer */}
      <div className="section-padding pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/rimak logo.png"
                alt="RIMAK NIGERIA LIMITED Logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <span className="font-display text-lg text-[#F5F2EE] tracking-widest leading-none block">RIMAK</span>
                <span className="text-[0.6rem] text-[#C4B8A8] tracking-[0.2em] leading-none block">NIGERIA LIMITED</span>
              </div>
            </div>

            <p className="font-body text-[#C4B8A8] text-sm leading-relaxed mb-6">
              Civil, Building, MEP, Project Management and General Contractors — building Nigeria's future with precision, integrity, and excellence.
            </p>

            <div className="space-y-1">
              <p className="font-body text-xs text-[#C4B8A8]/60 tracking-wider">RC 9484253</p>
              <p className="font-body text-xs text-[#C4B8A8]/60 tracking-wider">Lagos State, Nigeria</p>
            </div>

            {/* Social placeholders */}
            <div className="flex gap-3 mt-6">
              {['LI', 'FB', 'TW', 'IG'].map((social) => (
                <div
                  key={social}
                  className="w-8 h-8 border border-[#C4B8A8]/20 rounded-sm flex items-center justify-center text-[#C4B8A8]/40 text-[0.6rem] font-body tracking-wider cursor-pointer hover:border-[#D4861A]/40 hover:text-[#D4861A] transition-colors duration-200"
                >
                  {social}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm tracking-[0.2em] text-[#D4861A] uppercase mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="font-body text-sm text-[#C4B8A8] hover:text-[#F5F2EE] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[#D4861A] group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm tracking-[0.2em] text-[#D4861A] uppercase mb-5">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => handleClick(e, '#services')}
                    className="font-body text-sm text-[#C4B8A8] hover:text-[#F5F2EE] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[#D4861A] group-hover:w-4 transition-all duration-300" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm tracking-[0.2em] text-[#D4861A] uppercase mb-5">Contact</h4>
            <div className="space-y-4">
              <div>
                <p className="font-body text-xs text-[#D4861A]/60 tracking-widest uppercase mb-1">Address</p>
                <p className="font-body text-sm text-[#C4B8A8] leading-relaxed">
                  6, Oyekunle Street, Off Shoretire Road<br />
                  Orile-Agege, Lagos State
                </p>
              </div>
              <div>
                <p className="font-body text-xs text-[#D4861A]/60 tracking-widest uppercase mb-1">Phone</p>
                <a href="tel:+2348167713129" className="font-body text-sm text-[#C4B8A8] hover:text-[#D4861A] transition-colors">
                  +234 816 771 3129
                </a>
              </div>
              <div>
                <p className="font-body text-xs text-[#D4861A]/60 tracking-widest uppercase mb-1">Email</p>
                <a href="mailto:rimaknigerialimited@gmail.com" className="font-body text-xs text-[#C4B8A8] hover:text-[#D4861A] transition-colors break-all">
                  rimaknigerialimited@gmail.com
                </a>
              </div>
            </div>

            <motion.a
              href="#contact"
              onClick={(e) => handleClick(e, '#contact')}
              className="btn-primary text-sm py-3 px-5 mt-6 inline-flex"
              whileHover={{ scale: 1.02 }}
            >
              Start a Project
            </motion.a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#C4B8A8]/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-[#C4B8A8]/40 tracking-wider">
            © {year} Rimak Nigeria Limited. All rights reserved. RC 9484253.
          </p>
          <p className="font-body text-xs text-[#C4B8A8]/30 tracking-wider text-center">
            Civil · Building · MEP · Project Management · General Contractors
          </p>
          <p className="font-body text-xs text-[#C4B8A8]/30 tracking-wider">
            Lagos State, Nigeria
          </p>
        </div>
      </div>
    </footer>
  )
}
