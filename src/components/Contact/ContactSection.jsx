import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Slider from '../shared/Slider'

gsap.registerPlugin(ScrollTrigger)

const serviceOptions = [
  'Construction & Rehabilitation',
  'MEP (Mechanical, Electrical & Plumbing)',
  'Project Management',
  'Supply of Materials',

 'General Enquiry',
]

const contactInfo = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Office Address',
    value: '6, Oyekunle Street, Off Shoretire Road\nOrile-Agege, Lagos State, Nigeria',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.17 6.17l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15v1.92z" />
      </svg>
    ),
    label: 'Phone Number',
    value: '+234 816 771 3129',
    href: 'tel:+2348167713129',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email Address',
    value: 'rimaknigerialimited@gmail.com',
    href: 'mailto:rimaknigerialimited@gmail.com',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    label: 'RC Number',
    value: '9484253 (CAC)',
  },
]

const fieldVariants = {
  idle: { borderColor: 'rgba(228, 243, 247, 0.15)' },
  focused: { borderColor: 'rgba(0, 204, 255, 0.8)', transition: { duration: 0.2 } },
}

function FormField({ label, id, children, className = '' }) {
  const [focused, setFocused] = useState(false)
  return (
    <motion.div className={`form-field ${className}`} animate={focused ? 'focused' : 'idle'}>
      <label htmlFor={id} className="text-[#E4F3F7]/70 text-xs tracking-wider uppercase mb-1 block">{label}</label>
      <motion.div
        animate={focused ? { scale: 1.005 } : { scale: 1 }}
        transition={{ duration: 0.15 }}
      >
        {typeof children === 'function'
          ? children({ onFocus: () => setFocused(true), onBlur: () => setFocused(false) })
          : children}
      </motion.div>
    </motion.div>
  )
}

export default function ContactSection() {
  const sectionRef = useRef()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', service: '', message: '',
  })

  useGSAP(() => {
    gsap.from('.contact-header', {
      opacity: 0, y: 60, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-header', start: 'top 80%' },
    })
    gsap.from('.contact-info-item', {
      opacity: 0, x: -40, stagger: 0.1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-info-item', start: 'top 85%' },
    })
  }, { scope: sectionRef })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section ref={sectionRef} id="contact" className="relative bg-[#060214] py-28 section-base lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00CCFF]/30 to-transparent" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #E4F3F7 0, #E4F3F7 1px, transparent 0, transparent 60px), repeating-linear-gradient(90deg, #E4F3F7 0, #E4F3F7 1px, transparent 0, transparent 60px)',
        }}
      />

      <div className="section-padding relative z-10">
        {/* Header */}
        <div className="contact-header mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-display text-[#00CCFF] text-sm tracking-[0.3em]">CONTACT</span>
            <div className="gold-line" />
          </div>
          <h2 className="font-display text-[clamp(3rem,7vw,6rem)] text-[#FFFFFF] leading-none">
            GET IN<br /><span className="text-gradient-gold">TOUCH</span>
          </h2>
        </div>

        <Slider className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <p className="font-body text-[#E4F3F7]/80 text-[1.05rem] leading-relaxed mb-10 max-w-md">
              Ready to start your next project? Contact Rimak Nigeria Limited for a consultation, cost estimate, or to discuss your construction and engineering needs.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item, i) => (
                <div key={i} className="contact-info-item flex items-start gap-5">
                  <div className="w-10 h-10 flex items-center justify-center text-[#00CCFF] border border-[#00CCFF]/30 rounded-sm flex-shrink-0 bg-[#00CCFF]/5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-body text-xs tracking-[0.15em] text-[#00CCFF] uppercase mb-1">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-body text-[#E4F3F7]/95 text-sm hover:text-[#00CCFF] transition-colors duration-200 whitespace-pre-line"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-body text-[#E4F3F7]/90 text-sm whitespace-pre-line">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="mt-10 glass-card gold-border rounded-sm p-6 relative overflow-hidden h-40">
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  {/* Simple map-like lines */}
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#00CCFF" strokeWidth="1" />
                  <line x1="200" y1="0" x2="200" y2="200" stroke="#00CCFF" strokeWidth="0.5" strokeDasharray="4,8" />
                  <circle cx="200" cy="100" r="8" fill="#00CCFF" />
                  <circle cx="200" cy="100" r="16" fill="none" stroke="#00CCFF" strokeWidth="1" />
                  <circle cx="200" cy="100" r="30" fill="none" stroke="#00CCFF" strokeWidth="0.5" strokeDasharray="3,6" />
                </svg>
              </div>
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="font-display text-[#00CCFF] text-sm tracking-[0.2em]">ORILE-AGEGE, LAGOS</div>
                  <div className="font-body text-[#E4F3F7]/70 text-xs mt-1">Lagos State, Nigeria</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="glass-card gold-border rounded-sm p-10 flex flex-col items-center justify-center text-center h-full min-h-[400px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'backOut' }}
                >
                  <div className="w-16 h-16 rounded-full bg-[#00CCFF]/20 border border-[#00CCFF]/40 flex items-center justify-center mb-6">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00CCFF" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-display text-3xl text-[#FFFFFF] mb-3">Message Sent!</h3>
                  <p className="font-body text-[#E4F3F7]/70 text-sm leading-relaxed max-w-xs">
                    Thank you for reaching out. A member of the Rimak team will be in touch with you shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="glass-card gold-border rounded-sm p-8 space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="font-display text-2xl text-[#FFFFFF]">Send Us a Message</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Full Name *" id="contact-name">
                      {({ onFocus, onBlur }) => (
                        <input
                          id="contact-name"
                          type="text"
                          placeholder="Your full name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          onFocus={onFocus}
                          onBlur={onBlur}
                        />
                      )}
                    </FormField>
                    <FormField label="Phone Number" id="contact-phone">
                      {({ onFocus, onBlur }) => (
                        <input
                          id="contact-phone"
                          type="tel"
                          placeholder="+234 XXX XXX XXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          onFocus={onFocus}
                          onBlur={onBlur}
                        />
                      )}
                    </FormField>
                  </div>

                  <FormField label="Email Address *" id="contact-email">
                    {({ onFocus, onBlur }) => (
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={onFocus}
                        onBlur={onBlur}
                      />
                    )}
                  </FormField>

                  <FormField label="Service Type" id="contact-service">
                    {({ onFocus, onBlur }) => (
                      <select
                        id="contact-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        onFocus={onFocus}
                        onBlur={onBlur}
                      >
                        <option value="">Select a service...</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )}
                  </FormField>

                  <FormField label="Message *" id="contact-message">
                    {({ onFocus, onBlur }) => (
                      <textarea
                        id="contact-message"
                        rows={5}
                        placeholder="Describe your project or enquiry..."
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        style={{ resize: 'vertical' }}
                      />
                    )}
                  </FormField>

                  <motion.button
                    type="submit"
                    className="btn-primary w-full justify-center"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    id="contact-submit"
                  >
                    Send Message
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </motion.button>

                  <p className="font-body text-[#E4F3F7]/40 text-xs text-center">
                    RC 9484253 · Rimak Nigeria Limited
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Slider>
      </div>
    </section>
  )
}
