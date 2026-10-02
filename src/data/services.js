import { Brain, Globe, Zap, Code2, BarChart3, Lightbulb } from 'lucide-react'

export const services = [
  {
    id: 1,
    num: '01',
    title: 'AI Engineering',
    description: 'Build intelligent applications using modern AI models, RAG systems, agents, and custom AI pipelines.',
    features: ['AI Agents', 'RAG Systems', 'LLM Integration', 'AI APIs'],
    Icon: Brain,
  },
  {
    id: 2,
    num: '02',
    title: 'Web & App Development',
    description: 'High-performance web and mobile applications designed around real business requirements.',
    features: ['React / Next.js', 'Full-stack Development', 'SaaS Platforms', 'Mobile Applications'],
    Icon: Globe,
  },
  {
    id: 3,
    num: '03',
    title: 'AI Automation',
    description: 'Automate repetitive operations using intelligent workflows and AI-powered decision systems.',
    features: ['Workflow Automation', 'n8n', 'Make', 'Zapier'],
    Icon: Zap,
  },
  {
    id: 4,
    num: '04',
    title: 'Custom Software',
    description: 'Purpose-built software engineered around your organization\'s workflows.',
    features: ['Backend Systems', 'APIs', 'Dashboards', 'Internal Tools'],
    Icon: Code2,
  },
  {
    id: 5,
    num: '05',
    title: 'Data & Analytics',
    description: 'Turn operational data into useful insights and automated decisions.',
    features: ['Data Pipelines', 'Analytics', 'Dashboards', 'AI Reporting'],
    Icon: BarChart3,
  },
  {
    id: 6,
    num: '06',
    title: 'AI Consulting',
    description: 'Define the right AI strategy, architecture, roadmap, and implementation plan.',
    features: ['AI Strategy', 'Technical Architecture', 'Automation Audit', 'Implementation Roadmap'],
    Icon: Lightbulb,
  },
]
