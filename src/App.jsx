import { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Works from './components/Works'
import Gallery from './components/Gallery'
import Experience from './components/Experience'
import Contact from './components/Contact'

export default function App() {
  // Global scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    // Observe elements not inside specific sections (those have their own observers)
    document.querySelectorAll('.hero-content > *').forEach(el => {
      el.classList.add('visible') // Hero is immediately visible
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Works />
        <Gallery />
        <Experience />
        <Contact />
      </main>
      <footer className="footer">
        <p>© 2026 <span>강지혜</span> · 웹 퍼블리셔 & UI/UX 디자이너 · All rights reserved.</p>
      </footer>
    </>
  )
}
