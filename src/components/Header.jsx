import { useRef } from 'react'

const NAV_ITEMS = [
  { label: 'Services', href: '#services', anim: 'appear--scale', delay: '0.16s' },
  { label: 'Approach', href: '#approach', anim: 'appear--soft', delay: '0.24s' },
  { label: 'Work', href: '#work', anim: 'appear--scale', delay: '0.32s' },
  { label: 'About', href: '#about', anim: 'appear--soft', delay: '0.40s' },
  { label: 'FAQ', href: '#faq', anim: 'appear--scale', delay: '0.48s' },
]

export default function Header({ menuOpen, onToggleMenu, onCloseMenu }) {
  const burgerRef = useRef(null)

  return (
    <header className="header">
      {/* Logo */}
      <a className="logo appear appear--scale" href="#home" aria-label="eleviq" style={{ '--d': '0.08s' }}>
        <img src="/logo-white.png" alt="eleviq logo" className="w-7 h-7 object-contain" />
        <span className="font-bold tracking-tight text-white text-lg lowercase">eleviq</span>
      </a>

      {/* Nav */}
      <nav className="site-nav" aria-label="Primary">
        {NAV_ITEMS.map(({ label, href, anim, delay }) => (
          <a
            key={label}
            className={`nav-link appear ${anim}`}
            href={href}
            style={{ '--d': delay }}
            onClick={onCloseMenu}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Header CTA */}
      <a className="btn btn-solid header-cta appear appear--scale" href="#contact" style={{ '--d': '0.34s' }}>
        Get in Touch
      </a>

      {/* Burger */}
      <button
        ref={burgerRef}
        className="burger appear appear--scale"
        style={{ '--d': '0.34s' }}
        aria-controls="site-nav"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={onToggleMenu}
      >
        <div className="burger-lines">
          <span />
          <span />
          <span />
        </div>
      </button>
    </header>
  )
}
