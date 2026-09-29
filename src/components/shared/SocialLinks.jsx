import { motion } from 'framer-motion'

export const socialPlatforms = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/rimak-nigeria-limited',
    ariaLabel: 'Visit Rimak Nigeria Limited on LinkedIn',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
      </svg>
    ),
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    href: 'https://x.com/rimaknigeria',
    ariaLabel: 'Visit Rimak Nigeria Limited on X (Twitter)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: 'facebook',
    name: 'Facebook',
    href: 'https://facebook.com/rimaknigerialimited',
    ariaLabel: 'Visit Rimak Nigeria Limited on Facebook',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.69c0-2.47 1.47-3.83 3.72-3.83 1.08 0 2.2.19 2.2.19v2.42h-1.24c-1.23 0-1.61.76-1.61 1.54V12h2.72l-.43 3H13v6.8c4.56-.93 8-4.96 8-9.8z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    name: 'Instagram',
    href: 'https://instagram.com/rimaknigerianlimited',
    ariaLabel: 'Visit Rimak Nigeria Limited on Instagram',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    href: 'https://wa.me/2348167713129?text=Hello%20Rimak%20Nigeria%20Limited,%20I%20would%20like%20to%20make%20an%20enquiry.',
    ariaLabel: 'Chat with Rimak Nigeria Limited on WhatsApp',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    ),
  },
  {
    id: 'youtube',
    name: 'YouTube',
    href: 'https://youtube.com/@rimaknigerialimited',
    ariaLabel: 'Visit Rimak Nigeria Limited on YouTube',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

export default function SocialLinks({ variant = 'footer', className = '' }) {
  if (variant === 'contact') {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 ${className}`}>
        {socialPlatforms.map((platform) => (
          <motion.a
            key={platform.id}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform.ariaLabel}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-3 p-3 rounded bg-[#00CCFF]/5 border border-[#00CCFF]/20 hover:border-[#00CCFF]/60 hover:bg-[#00CCFF]/12 transition-all duration-300 group"
          >
            <span className="text-[#00CCFF] group-hover:text-[#F5F2EE] transition-colors duration-300 flex-shrink-0">
              {platform.icon}
            </span>
            <span className="font-body text-xs text-[#E4F3F7]/90 font-medium tracking-wide group-hover:text-[#FFFFFF] transition-colors duration-300">
              {platform.name}
            </span>
          </motion.a>
        ))}
      </div>
    )
  }

  if (variant === 'nav') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        {socialPlatforms.map((platform) => (
          <motion.a
            key={platform.id}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform.ariaLabel}
            whileHover={{ scale: 1.1, y: -1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 border border-[#00CCFF]/25 rounded-md flex items-center justify-center text-[#E4F3F7]/80 hover:text-[#00CCFF] hover:border-[#00CCFF]/60 hover:bg-[#00CCFF]/10 transition-all duration-200"
            title={platform.name}
          >
            {platform.icon}
          </motion.a>
        ))}
      </div>
    )
  }

  // Default: Footer variant
  return (
    <div className={`flex flex-wrap gap-2.5 ${className}`}>
      {socialPlatforms.map((platform) => (
        <motion.a
          key={platform.id}
          href={platform.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={platform.ariaLabel}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.92 }}
          className="relative group w-9 h-9 border border-[#C4B8A8]/20 rounded-md flex items-center justify-center text-[#C4B8A8]/70 hover:text-[#D4861A] hover:border-[#D4861A]/60 hover:bg-[#D4861A]/10 transition-all duration-200 shadow-sm"
          title={platform.name}
        >
          {platform.icon}

          {/* Tooltip */}
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#060214] text-[#F5F2EE] text-[0.65rem] font-body rounded border border-[#D4861A]/40 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 shadow-lg">
            {platform.name}
          </span>
        </motion.a>
      ))}
    </div>
  )
}
