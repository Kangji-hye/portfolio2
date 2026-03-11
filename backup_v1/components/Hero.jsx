import { useState, useEffect } from 'react'

const roles = ['웹 퍼블리셔', 'UI·UX 디자이너', '프론트엔드 개발자', '웹 디자이너']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

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

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
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
          <div className="hero-stat">
            <span className="hero-stat-num">17<span style={{ fontSize: '1rem' }}>년+</span></span>
            <span className="hero-stat-label">실무 경력</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">50<span style={{ fontSize: '1rem' }}>+</span></span>
            <span className="hero-stat-label">프로젝트</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">8<span style={{ fontSize: '1rem' }}>+</span></span>
            <span className="hero-stat-label">기관·기업</span>
          </div>
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
