import { useState, useEffect, useRef, useCallback } from 'react'

const roles = ['웹 퍼블리셔', 'UI·UX 디자이너', '프론트엔드 개발자', '웹 디자이너']

function HeroStat({ to, suffix, label }) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    const delay = setTimeout(() => {
      const fps = 60
      const duration = 1800
      const totalFrames = Math.ceil(duration / (1000 / fps))
      let frame = 0
      const timer = setInterval(() => {
        frame++
        const eased = 1 - Math.pow(1 - frame / totalFrames, 3)
        setVal(Math.floor(to * Math.min(eased, 1)))
        if (frame >= totalFrames) { setVal(to); clearInterval(timer) }
      }, 1000 / fps)
      return () => clearInterval(timer)
    }, 800)
    return () => clearTimeout(delay)
  }, [to])

  return (
    <div className="hero-stat">
      <span className="hero-stat-num">{val}{suffix}</span>
      <span className="hero-stat-label">{label}</span>
    </div>
  )
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  // Typing animation
  useEffect(() => {
    const target = roles[roleIndex]
    let timer
    if (!isDeleting && text.length < target.length) {
      timer = setTimeout(() => setText(target.slice(0, text.length + 1)), 100)
    } else if (!isDeleting && text.length === target.length) {
      timer = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && text.length > 0) {
      timer = setTimeout(() => setText(text.slice(0, -1)), 55)
    } else {
      setIsDeleting(false)
      setRoleIndex(i => (i + 1) % roles.length)
    }
    return () => clearTimeout(timer)
  }, [text, isDeleting, roleIndex])

  // Canvas particle network with mouse repulsion
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const isMobile = window.innerWidth < 768
    const count = isMobile ? 22 : 50
    const maxDist = isMobile ? 80 : 120
    const repelRadius = 90

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.3 + 0.5,
      alpha: Math.random() * 0.3 + 0.08,
    }))

    let animId
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse repulsion
        const dx = p.x - mouseRef.current.x
        const dy = p.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < repelRadius && dist > 0) {
          const force = (repelRadius - dist) / repelRadius
          p.vx += (dx / dist) * force * 0.6
          p.vy += (dy / dist) * force * 0.6
        }

        // Velocity damping & limits
        p.vx *= 0.98
        p.vy *= 0.98
        const maxV = 2.5
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > maxV) { p.vx = (p.vx / speed) * maxV; p.vy = (p.vy / speed) * maxV }

        p.x += p.vx
        p.y += p.vy

        // Wrap edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const cx = p.x - p2.x
          const cy = p.y - p2.y
          const d = Math.sqrt(cx * cx + cy * cy)
          if (d < maxDist) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.07 * (1 - d / maxDist)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    const handleResize = () => resize()
    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 }
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-bg">
        <div className="hero-dots" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      <div className="hero-content">
        <p className="hero-greeting">안녕하세요, 반갑습니다</p>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <h1 className="hero-name">강지혜</h1>
          <span className="hero-name-glow" aria-hidden="true">강지혜</span>
        </div>

        <div className="hero-role-wrap">
          <span className="hero-role-prefix">저는</span>
          <span className="hero-role">{text}</span>
          <span className="hero-cursor" aria-hidden="true" />
          <span className="hero-role-prefix">입니다</span>
        </div>

        <p className="hero-desc">
          웹 기획부터 디자인, 퍼블리싱, 마케팅까지 — 웹사이트 운영의
          전 과정을 경험한 <strong style={{ color: 'var(--white)', fontWeight: 700 }}>17년 경력</strong>의
          멀티플레이어입니다. 현재 React 기반 프론트엔드 개발자로 성장 중입니다.
        </p>

        <div className="hero-stats">
          <HeroStat to={17} suffix="년+" label="실무 경력" />
          <HeroStat to={50} suffix="+" label="프로젝트" />
          <HeroStat to={8} suffix="+" label="기관·기업" />
        </div>

        <div className="hero-cta">
          <button className="btn btn-primary" onClick={() => scrollTo('experience')}>
            경력 보기 →
          </button>
          <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
            연락하기
          </button>
        </div>
      </div>

      <div className="scroll-hint">
        <div className="scroll-hint-line" />
        <span>scroll</span>
      </div>
    </section>
  )
}
