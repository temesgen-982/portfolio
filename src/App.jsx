import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Layout from './components/Layout'
import Hero from './components/Hero'
import Background from './components/Background'
import Projects from './components/Projects'
import Stats from './components/Stats'
import Skills from './components/Skills'
import Contact from './components/Contact'

function App() {
  return (
    <div className="bg-neutral-950 min-h-screen">
      <Nav />
      <Layout>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/background" element={<Background />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App