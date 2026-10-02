import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Approach', href: '#approach' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.85)

      const sections = NAV_LINKS.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)')
    const handler = () => { if (mql.matches) setMobileOpen(false) }
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: scrolled ? 0 : -100,
          opacity: scrolled ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[999] flex justify-center pointer-events-none"
        style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16 }}
      >
        <div className="pointer-events-auto flex items-center justify-between gap-3 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_32px_rgba(0,0,0,0.12)] max-w-4xl w-full text-slate-900">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 px-2.5 py-1.5 shrink-0 group"
          >
            <img src="/logo.png" alt="eleviq" className="w-7 h-7 object-contain" />
            <span
              className="font-bold tracking-tight text-base lowercase select-none"
              style={{ color: '#0f172a' }}
            >
              eleviq
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1)
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  style={{ color: isActive ? '#2563eb' : '#334155' }}
                  className={`relative px-3 py-1.5 text-[13.5px] rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50/90 font-semibold border border-blue-200/60 shadow-xs'
                      : 'hover:bg-slate-100 font-medium'
                  }`}
                >
                  {label}
                </a>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            style={{ color: '#ffffff' }}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow shrink-0 group"
          >
            <span>Get Started</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </a>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: '#0f172a' }}
            className="md:hidden ml-auto p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-20 left-4 right-4 bg-white rounded-2xl p-5 shadow-2xl border border-slate-200 text-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 pb-4 mb-3 border-b border-slate-100">
                <img src="/logo.png" alt="eleviq" className="w-6 h-6 object-contain" />
                <span className="font-bold text-slate-900 tracking-tight text-base lowercase" style={{ color: '#0f172a' }}>
                  eleviq
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {NAV_LINKS.map(({ label, href }) => {
                  const isActive = activeSection === href.slice(1)
                  return (
                    <a
                      key={href}
                      href={href}
                      onClick={(e) => handleNavClick(e, href)}
                      style={{ color: isActive ? '#2563eb' : '#1e293b' }}
                      className={`px-4 py-3 rounded-xl text-[15px] font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 font-semibold'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      {label}
                    </a>
                  )
                })}
              </div>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                style={{ color: '#ffffff' }}
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                <span>Get Started</span>
                <ArrowRight size={14} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
