import { useEffect } from 'react'

export default function Contact() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('#contact .animate-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const copy = (text) => {
    navigator.clipboard.writeText(text).catch(() => {})
  }

  return (
    <section id="contact">
      <div className="divider" />
      <div className="section">
        <div className="contact-layout">
          <div className="animate-in">
            <p className="section-label">Contact</p>
            <h2 className="section-title">
              함께 일하고<br />
              <span>싶으신가요?</span>
            </h2>
            <p className="contact-desc">
              웹 퍼블리싱, UI/UX 디자인, 마케팅 등 어떤 프로젝트든 편하게 연락 주세요.
              정규직·계약직·프리랜서 모두 열려 있습니다.<br /><br />
              <strong style={{ color: 'var(--white)' }}>희망 근무지:</strong> 경기 용인시 기흥구, 성남시 분당구, 용인시 수지구·처인구
            </p>
          </div>

          <div className="animate-in delay-2">
            <div className="contact-cards">
              <a
                className="contact-card"
                href="mailto:happykeren@naver.com"
              >
                <div className="contact-icon">✉️</div>
                <div>
                  <p className="contact-card-label">Email</p>
                  <p className="contact-card-value">happykeren@naver.com</p>
                </div>
                <span className="contact-arrow">→</span>
              </a>

              <div
                className="contact-card"
                onClick={() => copy('010-3701-3721')}
                title="클릭하여 복사"
              >
                <div className="contact-icon">📱</div>
                <div>
                  <p className="contact-card-label">Phone</p>
                  <p className="contact-card-value">010-3701-3721</p>
                </div>
                <span className="contact-arrow">⧉</span>
              </div>

              <div className="contact-card" style={{ cursor: 'default' }}>
                <div className="contact-icon">📍</div>
                <div>
                  <p className="contact-card-label">Location</p>
                  <p className="contact-card-value">경기 용인시 기흥구</p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}
