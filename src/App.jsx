import Grain from './components/Grain'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import TechMarquee from './components/TechMarquee'
import Services from './components/Services'
import Process from './components/Process'
import Team from './components/Team'
import CaseStudies from './components/CaseStudies'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white">
      <Grain />
      <Navbar />
      <main>
        {/* Untouched Hero Section */}
        <HeroSection />

        {/* Eleviq Agency Sections */}
        <div className="bg-white text-body">
          <TechMarquee />
          <Services />
          <Process />
          <Team />
          <CaseStudies />
          <FAQ />
          <CTA />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  )
}
