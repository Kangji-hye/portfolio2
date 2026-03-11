import { useEffect } from 'react'

const stats = [
  { num: '17년+', label: '총 실무 경력' },
  { num: '50+', label: '완료 프로젝트' },
  { num: '8+', label: '주요 기관' },
  { num: '현재', label: 'React 개발 학습 중' },
]

const doCards = [
  { icon: '💻', title: '웹 퍼블리싱', desc: 'HTML5 · CSS3 · JS 반응형 웹 · 웹표준 · 접근성' },
  { icon: '🎨', title: 'UI·UX 디자인', desc: 'Photoshop · 인터페이스 설계 · GUI 디자인' },
  { icon: '📢', title: '디지털 마케팅', desc: 'SNS 마케팅 · SEO · 콘텐츠 기획 · Google Analytics' },
  { icon: '📄', title: '문서 디자인', desc: 'PowerPoint · 제안서 · 기획서 · 보고서' },
]

export default function About() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('#about .animate-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about">
      <div className="section">
        <div className="section-header animate-in">
          <p className="section-label">About Me</p>
          <h2 className="section-title">
            웹의 처음부터 끝까지,<br />
            <span>직접 경험했습니다</span>
          </h2>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <p className="animate-in delay-1">
              국내 최대 B2B 플랫폼 <strong>(주)EC21</strong>에서 약 10년간 홈페이지 제작·운영을 담당하며
              유럽연합 EU-Gateway 프로그램, 한국무역협회, 지방자치단체 등 다양한 사이트를 경험했습니다.
            </p>
            <p className="animate-in delay-2">
              이후 프리랜서로 전환하여 <strong>SK C&C, 국군의무사령부, 금융보안원, 용인대학교</strong> 등
              공공기관·대학에서 웹 퍼블리싱 전문가로 활동했습니다.
              특히 용인대학교에서 학사 종합정보시스템의 디자인 및 반응형 웹 코딩을 2년 6개월간 전담했습니다.
            </p>
            <p className="animate-in delay-3">
              현재 <span className="highlight">KT 구름 React 기반 프론트엔드 개발자 과정</span>을 수강하며
              기술 스택을 확장 중입니다. 웹 기획·디자인·퍼블리싱·마케팅을 아우르는 폭넓은 경험을 바탕으로
              현업에서 바로 기여할 수 있는 멀티플레이어를 지향합니다.
            </p>
          </div>

          <div className="about-right">
            <div className="stat-cards animate-in delay-2">
              {stats.map((s, i) => (
                <div className="stat-card" key={i}>
                  <span className="stat-card-num">{s.num}</span>
                  <span className="stat-card-label">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="animate-in delay-3">
              <p className="what-i-do-title">무엇을 합니까</p>
              <div className="what-i-do">
                {doCards.map((c, i) => (
                  <div className="do-card" key={i}>
                    <div className="do-icon">{c.icon}</div>
                    <div>
                      <p className="do-card-title">{c.title}</p>
                      <p className="do-card-desc">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
