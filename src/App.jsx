import Nav from './components/Nav'
import Hero from './components/Hero'
import Background from './components/Background'
import Stats from './components/Stats'
import ResumeCTA from './components/ResumeCTA'
import Footer from './components/Footer'
import Projects from './components/Projects'
import Skills from './components/Skills'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div className="bg-neutral-950 min-h-screen">
      <div className="px-16">
        <Hero />
        <Nav />
        <div className="bg-neutral-900 rounded-lg overflow-hidden mt-8">
          <Background />
          <Projects />
          <Stats />
          <Skills />
          <ResumeCTA />
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  )
}

export default App