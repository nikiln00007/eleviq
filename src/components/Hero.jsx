import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-6 relative z-10 py-8 min-h-[70vh]">
      <div className="flex flex-col items-center max-w-4xl mx-auto my-auto w-full">
        {/* Custom Stylized ELEVIQ Wordmark */}
        <div className="relative w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl flex justify-center items-center py-4">
          <img
            src="/eleviq-wordmark.png"
            alt="ELEVIQ"
            className="w-full h-auto max-h-20 sm:max-h-28 md:max-h-36 lg:max-h-44 object-contain select-none drop-shadow-[0_12px_40px_rgba(255,255,255,0.22)] appear appear--scale"
            style={{ '--d': '0.2s' }}
          />
        </div>

        {/* Tagline */}
        <p
          className="mt-6 sm:mt-8 text-base sm:text-xl md:text-2xl text-white/75 font-light tracking-wide max-w-xl mx-auto appear appear--soft"
          style={{ '--d': '0.4s' }}
        >
          Build Smarter. Automate Faster. Scale Further.
        </p>

        {/* Explore link / scroll down prompt */}
        <a
          href="#services"
          className="mt-12 sm:mt-16 inline-flex flex-col items-center gap-2.5 text-white/50 hover:text-white transition-colors duration-300 group appear appear--soft"
          style={{ '--d': '0.6s' }}
          aria-label="Scroll to explore services"
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-medium text-white/60 group-hover:text-white transition-colors">
            Explore Services
          </span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 group-hover:bg-white/10 transition-all duration-300 animate-bounce">
            <ChevronDown size={16} />
          </div>
        </a>
      </div>
    </div>
  )
}
