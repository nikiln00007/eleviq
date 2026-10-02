import { techStack } from '../data/techStack'

const MarqueeRow = ({ direction = 'left', speed = 40 }) => {
  const items = [...techStack, ...techStack]
  return (
    <div className="overflow-hidden relative group">
      <div
        className="flex gap-3 w-max"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
        onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
        onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
      >
        {items.map((tech, i) => (
          <div
            key={`${tech.id}-${i}`}
            className="flex items-center gap-2.5 px-3.5 py-1.5 bg-white rounded-full border border-edge shadow-[0_1px_3px_rgba(0,0,0,0.03)] whitespace-nowrap hover:border-primary/30 hover:shadow-[0_2px_10px_rgba(79,115,232,0.08)] transition-all duration-300"
          >
            <span className="text-[10px] font-bold text-primary/50 tabular-nums">{tech.id}</span>
            <span className="text-xs font-medium text-dark">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TechMarquee() {
  return (
    <section className="py-6 md:py-8 bg-soft border-y border-edge overflow-hidden">
      <p className="text-center text-[10px] font-semibold tracking-[0.2em] text-body/40 mb-3.5 uppercase">
        Built with Modern Technology
      </p>
      <div className="flex flex-col gap-2.5">
        <MarqueeRow direction="left" speed={50} />
        <MarqueeRow direction="right" speed={55} />
      </div>
    </section>
  )
}
