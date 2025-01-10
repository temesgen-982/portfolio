import Nav from './components/Nav'
import Hero from './components/Hero'
import Features from './components/Features'
import Stats from './components/Stats'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Projects from './components/Projects'
import Skills from './components/Skills'

function App() {
  return (
    <div className="bg-neutral-950 min-h-screen">
      <div className="px-16">
        <Hero />
        <Nav />
        <div className="bg-neutral-900 rounded-lg overflow-hidden mt-8">
          <Features />
          <Projects />
          <Stats />
          <Skills />
          <CTA />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default App