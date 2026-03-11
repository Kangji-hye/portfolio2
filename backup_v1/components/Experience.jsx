import { useEffect } from 'react'

const experiences = [
  {
    period: '2016.05 — 2018.10',
    duration: '2년 6개월',
    company: '용인대학교',
    role: '정보전산실 프리랜서',
    desc: '학부 종합정보시스템 웹디자인 및 반응형 웹 코딩 전담. 학생용·교수용·관리자용 홈페이지 디자인과 HTML/CSS 코딩 100% 담당.',
    tags: ['반응형웹', '웹퍼블리셔', 'CSS', 'HTML', 'UI·UX'],
  },
  {
    period: '2015.12 — 2016.01',
    duration: '2개월',
    company: '국군의무사령부',
    role: '의무사령부 E-Demis 퍼블리셔팀 리딩',
    desc: '국군 의무사령부 의료시스템(E-Demis) UI 개발 및 퍼블리셔팀 리딩.',
    tags: ['웹퍼블리셔', '웹표준', 'HTML코딩', 'UI·UX'],
  },
  {
    period: '2015.11 — 2015.12',
    duration: '2개월',
    company: '금융보안원',
    role: '통합보안관제시스템 제작부서 과장 팀원',
    desc: '차세대 통합보안관제시스템 구축 (안랩/Splunk). Splunk 대시보드 UI 개발 전담.',
    tags: ['웹퍼블리셔', 'Splunk UI', 'HTML코딩', 'UI·UX'],
  },
  {
    period: '2015.06 — 2015.09',
    duration: '4개월',
    company: '용인대학교',
    role: '대학원 과장(선임연구원)',
    desc: '용인대학교 대학원 홈페이지 개발 프로젝트 퍼블리싱 전담 (웹접근성 준수).',
    tags: ['웹접근성', 'HTML5', 'CSS', '웹퍼블리셔'],
  },
  {
    period: '2013.04 — 2014.10',
    duration: '1년 7개월',
    company: 'DADAC&C',
    role: '마케팅지원부',
    desc: '소셜마케팅, 컨텐츠 기획, 홈페이지 관리 PM. 영업홈페이지 기획·제작 총괄. 유니클로·나이키·아디다스 등 신규 바이어 제안서 제작.',
    tags: ['소셜마케팅', '컨텐츠기획', 'PM', 'SNS'],
  },
  {
    period: '2012.01 — 2013.02',
    duration: '1년 2개월',
    company: '명지대학교 (K2webtech)',
    role: '디자인팀',
    desc: '명지대학교 홈페이지 운영 및 학과 홈페이지 제작·관리. 웹표준 코딩 및 UI 디자인.',
    tags: ['웹표준코딩', 'UI디자인', '홈페이지운영'],
  },
  {
    period: '2011.09 — 2011.12',
    duration: '4개월',
    company: 'SKC&C',
    role: '몽골국가등록제도 완비사업팀 대리',
    desc: 'KOICA와 함께 몽골 국가등록제도 완비사업 진행. 포탈사이트·법인정보시스템·자료구축서비스·자료관리사이트 등 4개 제품 UI 설계 및 디자인 전담.',
    tags: ['UI디자인', '인터페이스', '포토샵', 'UI·UX'],
  },
  {
    period: '2002.01 — 2011.06',
    duration: '9년 6개월',
    company: '이씨이십일 (EC21)',
    role: '뉴미디어마케팅본부 대리(주임연구원)',
    desc: '국내 최대 B2B 플랫폼 EC21 홈페이지 제작·운영 수년간 전담. 유럽연합 EU-Gateway 프로그램 홈페이지 구축, 한국무역협회·지자체 등 다수 사이트 제작. 다국어(영·한·중) 뉴스레터 운영.',
    tags: ['웹디자인', '웹표준코딩', 'SEO', '다국어', 'CSS', 'HTML'],
  },
]

export default function Experience() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    document.querySelectorAll('#experience .animate-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience">
      <div className="divider" />
      <div className="section">
        <div className="section-header animate-in">
          <p className="section-label">Experience</p>
          <h2 className="section-title">
            17년의 <span>커리어</span>
          </h2>
        </div>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <div className={`timeline-item animate-in delay-${Math.min(i + 1, 7)}`} key={i}>
              <div className="timeline-dot" />
              <div className="timeline-card">
                <div className="timeline-meta">
                  <span className="timeline-period">{exp.period}</span>
                  <span className="timeline-duration">{exp.duration}</span>
                </div>
                <p className="timeline-company">{exp.company}</p>
                <p className="timeline-role">{exp.role}</p>
                <p className="timeline-desc">{exp.desc}</p>
                <div className="timeline-tags">
                  {exp.tags.map(tag => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
