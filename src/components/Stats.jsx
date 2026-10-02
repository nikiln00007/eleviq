export default function Stats() {
  return (
    <footer className="stats">
      {/* Stat 1: workflows */}
      <div className="stat appear appear--stat" style={{ '--d': '1.12s' }}>
        <svg className="stat-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="g1" x1="3" y1="2" x2="14" y2="22">
              <stop offset="0.38" stopColor="#ffffff" />
              <stop offset="0.62" stopColor="#3a3a3a" />
            </linearGradient>
            <linearGradient id="g2" x1="3" y1="2" x2="14" y2="22">
              <stop offset="0.38" stopColor="#3a3a3a" />
              <stop offset="0.62" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <rect x="3.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#g1)" />
          <rect x="13.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#g2)" />
          <rect x="9.2" y="10.9" width="5.6" height="2.2" rx="1.1" fill="#4a4a4a" />
        </svg>
        4.2M+ workflows automated
      </div>

      {/* Stat 2: reduction */}
      <div className="stat appear appear--stat" style={{ '--d': '1.28s' }}>
        <svg className="stat-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="6.2" fill="#ffffff" />
          <g stroke="#111" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="7.1" x2="12" y2="14.5" />
            <polyline points="8.15 12.35 12 16.2 15.85 12.35" />
          </g>
        </svg>
        92% reduction in manual operations
      </div>

      {/* Stat 3: teams */}
      <div className="stat appear appear--stat" style={{ '--d': '1.44s' }}>
        <svg className="stat-icon-wide" viewBox="0 0 40 22" fill="none" aria-hidden="true">
          {/* Avatar 1: dark */}
          <circle cx="10.2" cy="11" r="9.2" fill="#2b2b2b" />
          <ellipse cx="10.2" cy="12.1" rx="4.15" ry="3.7" fill="#f4f4f4" />
          <polygon points="6.05,8.4 6.05,12.1 8.2,10.2" fill="#f4f4f4" />
          <polygon points="14.35,8.4 14.35,12.1 12.2,10.2" fill="#f4f4f4" />
          <circle cx="8.8" cy="9.2" r="0.7" fill="#1a1a1a" />
          <circle cx="11.6" cy="9.2" r="0.7" fill="#1a1a1a" />
          {/* Avatar 2: white */}
          <circle cx="20.2" cy="11" r="9.2" fill="#ffffff" />
          <circle cx="18.5" cy="9.5" r="1.7" fill="#111" />
          <circle cx="21.9" cy="9.5" r="1.7" fill="#111" />
          <ellipse cx="20.2" cy="12.8" rx="1.4" ry="0.9" fill="#ddd" />
          <path d="M17.8 15.2 Q20.2 17.5 22.6 15.2" stroke="#111" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          {/* Avatar 3: orange */}
          <circle cx="30.2" cy="11" r="9.2" fill="#f26b1d" />
          <text x="30.2" y="15.1" fontFamily="Inter, sans-serif" fontSize="12.5" fontWeight="700" fill="white" textAnchor="middle">e</text>
        </svg>
        180+ operational teams onboarded
      </div>
    </footer>
  )
}
