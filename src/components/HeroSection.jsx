import { useState, useEffect, useCallback } from 'react'
import Header from './Header'
import Hero from './Hero'
import HeroBackground from './HeroBackground'

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [])

  /* Sync body class for CSS selectors (burger bars, nav display, backdrop) */
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  /* Escape key closes menu */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeMenu() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeMenu])

  /* Resize >=901px closes menu */
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 901px)')
    const handler = (e) => { if (e.matches) closeMenu() }
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [closeMenu])

  /* Animation fallback: add .is-in if animations aren't running */
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const appears = document.querySelectorAll('.appear')
        let anyRunning = false
        appears.forEach((el) => {
          if (el.getAnimations) {
            const anims = el.getAnimations()
            for (const a of anims) {
              if (a.playState === 'running' || a.playState === 'finished') {
                anyRunning = true
                return
              }
            }
          }
        })
        if (!anyRunning) {
          appears.forEach((el) => el.classList.add('is-in'))
          const hp = document.querySelector('.hero-photo')
          if (hp) hp.classList.add('is-in')
        }
      })
    })
  }, [])

  /* animationend → .is-in on each .appear */
  useEffect(() => {
    const appears = document.querySelectorAll('.appear')
    const handlers = []
    appears.forEach((el) => {
      const handler = () => el.classList.add('is-in')
      el.addEventListener('animationend', handler, { once: true })
      handlers.push({ el, handler })
    })
    return () => {
      handlers.forEach(({ el, handler }) => {
        el.removeEventListener('animationend', handler)
      })
    }
  }, [])

  /* Google Fonts fallback */
  useEffect(() => {
    if (!document.fonts || !document.fonts.check('1em Inter')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href =
        'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900&family=Instrument+Serif:ital@1&display=swap'
      document.head.appendChild(link)
    }
  }, [])

  return (
    <section className="hero-section" id="home">
      {/* Menu backdrop (mobile) */}
      <div className="menu-backdrop" aria-hidden="true" onClick={closeMenu} />

      <HeroBackground />

      <Header
        menuOpen={menuOpen}
        onToggleMenu={toggleMenu}
        onCloseMenu={closeMenu}
      />
      <Hero />
    </section>
  )
}
