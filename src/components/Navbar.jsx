import { useState, useEffect } from 'react'

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'works', label: 'Works' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'experience', label: '경력' },
  { id: 'contact', label: '연락처' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 50)

      // Progress bar
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0)

      // Active section
      const sections = navLinks.map(l => document.getElementById(l.id)).filter(Boolean)
      let current = ''
      for (const section of sections) {
        if (scrollY >= section.offsetTop - 220) current = section.id
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="progress-bar" style={{ width: `${progress}%` }} />

      <div className="navbar-inner">
        <div
          className="navbar-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="logo-bracket">&lt;</span>
          강지혜
          <span className="logo-bracket">/&gt;</span>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="메뉴"
        >
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.id}>
              <button
                className={activeSection === link.id ? 'active' : ''}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
