import { motion } from 'framer-motion'
import { ArrowUp, Mail, ArrowUpRight } from 'lucide-react'
import { LinkedInIcon, GitHubIcon, TwitterIcon } from './Icons'

const FOOTER_LINKS = {
  solutions: [
    { label: 'AI Engineering', href: '#services' },
    { label: 'Agentic Workflows', href: '#services' },
    { label: 'Full-Stack Development', href: '#services' },
    { label: 'Enterprise Automation', href: '#services' },
    { label: 'Data & Analytics', href: '#services' },
    { label: 'AI Strategy & Advisory', href: '#services' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Approach', href: '#approach' },
    { label: 'Case Studies', href: '#work' },
    { label: 'Frequently Asked Questions', href: '#faq' },
    { label: 'Get in Touch', href: '#contact' },
  ],
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-dark text-white border-t border-white/10 pt-20 pb-12 px-6 md:px-12 lg:px-20 relative overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <img src="/logo-white.png" alt="eleviq" className="w-8 h-8 object-contain" />
              <span className="text-xl font-bold tracking-tight text-white lowercase">eleviq</span>
            </div>

            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              Architecting intelligent AI infrastructure, automated agent workflows, and high-performance software
              for forward-thinking startups and enterprises.
            </p>

            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Operational · Systems 100% Active
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
                aria-label="GitHub"
              >
                <GitHubIcon size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
                aria-label="Twitter / X"
              >
                <TwitterIcon size={16} />
              </a>
              <a
                href="mailto:hello@eleviq.com"
                className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-white/40 mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.solutions.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/65 hover:text-white transition-colors duration-150 inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-white/40 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/65 hover:text-white transition-colors duration-150 inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact Prompt */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-wider uppercase text-white/40 mb-4">
              Let&apos;s Connect
            </h4>
            <p className="text-sm text-white/60 leading-relaxed">
              Have an enterprise project or AI roadmap in mind?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-light transition-all shadow-md shadow-primary/20 group"
            >
              <span>Schedule a Call</span>
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/45">
          <div className="flex flex-wrap items-center gap-6">
            <span>&copy; {new Date().getFullYear()} Eleviq AI Technologies Inc.</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all text-xs"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  )
}
