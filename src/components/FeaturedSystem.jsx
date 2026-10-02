import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'

const nodes = [
  { id: 'user', label: 'USER', x: 50, y: 8, color: '#4F73E8' },
  { id: 'app', label: 'APPLICATION', x: 50, y: 22, color: '#6C8EF5' },
  { id: 'engine', label: 'AI ENGINE', x: 50, y: 38, color: '#4F73E8' },
  { id: 'agents', label: 'AGENTS', x: 28, y: 54, color: '#3A5BD4' },
  { id: 'data', label: 'DATA', x: 72, y: 54, color: '#6C8EF5' },
  { id: 'auto', label: 'AUTOMATION', x: 28, y: 72, color: '#7C5CE0' },
  { id: 'analytics', label: 'ANALYTICS', x: 72, y: 72, color: '#4F73E8' },
]

const connections = [
  [0, 1], [1, 2], [2, 3], [2, 4], [3, 5], [4, 6],
]

const sideLabels = [
  { text: 'LLM', x: 15, y: 32 },
  { text: 'RAG', x: 85, y: 32 },
  { text: 'API', x: 15, y: 48 },
  { text: 'VECTOR STORE', x: 85, y: 48 },
  { text: 'DATABASE', x: 50, y: 86 },
  { text: 'WORKFLOW', x: 15, y: 72 },
]

export default function FeaturedSystem() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-soft">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="AI ENGINEERING"
          title={"From Idea to\nIntelligent Product"}
          description="We combine product thinking, software engineering, and AI expertise to build systems that work in the real world."
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="relative bg-white rounded-3xl border border-edge shadow-[0_4px_40px_rgba(0,0,0,0.04)] p-8 md:p-12 overflow-hidden">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'linear-gradient(#4F73E8 1px, transparent 1px), linear-gradient(90deg, #4F73E8 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />

            <svg viewBox="0 0 100 95" className="w-full relative z-10" fill="none">
              {/* Connection lines */}
              {connections.map(([from, to], i) => (
                <motion.line
                  key={i}
                  x1={nodes[from].x}
                  y1={nodes[from].y + 4}
                  x2={nodes[to].x}
                  y2={nodes[to].y - 2}
                  stroke="#E5EAF2"
                  strokeWidth="0.4"
                  strokeDasharray="2 2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                />
              ))}

              {/* Animated pulses along connections */}
              {connections.map(([from, to], i) => (
                <motion.circle
                  key={`pulse-${i}`}
                  r="0.8"
                  fill="#4F73E8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: [0, 1, 1, 0] }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 2,
                    delay: 1 + i * 0.3,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    begin={`${1 + i * 0.3}s`}
                    path={`M${nodes[from].x},${nodes[from].y + 4} L${nodes[to].x},${nodes[to].y - 2}`}
                  />
                </motion.circle>
              ))}

              {/* Nodes */}
              {nodes.map((node, i) => (
                <motion.g
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <rect
                    x={node.x - 12}
                    y={node.y - 3}
                    width="24"
                    height="8"
                    rx="4"
                    fill={node.color}
                    opacity="0.1"
                  />
                  <rect
                    x={node.x - 11}
                    y={node.y - 2.2}
                    width="22"
                    height="6.4"
                    rx="3.2"
                    fill="white"
                    stroke={node.color}
                    strokeWidth="0.3"
                  />
                  <text
                    x={node.x}
                    y={node.y + 2.2}
                    textAnchor="middle"
                    fill={node.color}
                    fontSize="2.5"
                    fontWeight="700"
                    fontFamily="Inter, sans-serif"
                    letterSpacing="0.08em"
                  >
                    {node.label}
                  </text>
                </motion.g>
              ))}

              {/* Side labels */}
              {sideLabels.map((l, i) => (
                <motion.text
                  key={i}
                  x={l.x}
                  y={l.y}
                  textAnchor="middle"
                  fill="#9CA3AF"
                  fontSize="1.8"
                  fontWeight="500"
                  fontFamily="Inter, sans-serif"
                  letterSpacing="0.1em"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.5 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
                >
                  {l.text}
                </motion.text>
              ))}
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
