import { useState, useEffect } from 'react'

const projects = [
  {
    category: 'React 프로젝트',
    color: 'cyan',
    icon: '🚀',
    title: '초등 스터디 플래너',
    client: 'KT Cloud × goorm 과정',
    year: '2026',
    desc: '바이브 코딩(AI 협업 개발)으로 제작한 React 기반 초등학생 학습 관리 플래너. Vite + React 구성.',
    tags: ['React', 'Vite', '바이브코딩', 'JavaScript'],
    link: 'https://studyplanner-tau.vercel.app/',
  },
  {
    category: '시스템 UI',
    color: 'orange',
    icon: '🏫',
    title: '용인대학교 학사 종합정보시스템',
    client: '용인대학교',
    year: '2016–2018',
    desc: '학생·교수·관리자용 학사 포털 UI 디자인 및 반응형 웹 코딩 100% 전담. PC·태블릿·모바일 3-screen 구현.',
    tags: ['반응형웹', 'UI디자인', 'CSS3', 'HTML5'],
  },
  {
    category: '시스템 UI',
    color: 'blue',
    icon: '🏥',
    title: '국군의무사령부 E-Demis',
    client: '국군의무사령부',
    year: '2015–2016',
    desc: '국군 전자 의무기록 시스템 E-Demis UI 개발 및 퍼블리셔팀 리딩. 의료정보 UX 설계.',
    tags: ['의료 UI', '웹표준', '팀 리딩', 'HTML코딩'],
  },
  {
    category: '시스템 UI',
    color: 'green',
    icon: '🦷',
    title: 'OSSTEM 업무환경시스템',
    client: '오스템임플란트',
    year: '2018–2019',
    desc: '오스템임플란트 CRM 기반 업무환경시스템 UI 개발. 영업 실적 대시보드, 목표관리, 보고서 등 데이터 시각화 UI 구현.',
    tags: ['CRM', '대시보드', 'UI·UX', '데이터시각화'],
  },
  {
    category: '시스템 UI',
    color: 'cyan',
    icon: '🇲🇳',
    title: 'SKC&C 몽골 국가등록제도 시스템',
    client: 'SKC&C · KOICA',
    year: '2011',
    desc: 'KOICA와 함께 몽골 국가등록제도 완비사업 진행. 포털사이트·법인정보시스템·자료구축서비스·자료관리사이트 등 4개 제품 UI 설계 및 디자인 전담.',
    tags: ['UI디자인', '인터페이스', 'Photoshop', 'UI·UX', '공공시스템'],
  },
  {
    category: '시스템 UI',
    color: 'purple',
    icon: '🔐',
    title: '금융보안원 통합보안관제시스템',
    client: '금융보안원',
    year: '2015',
    desc: '안랩/Splunk 기반 차세대 통합보안관제시스템 구축. Splunk 대시보드 UI 개발 전담.',
    tags: ['Splunk UI', '대시보드', 'UI·UX', '보안'],
  },
  {
    category: 'B2B 플랫폼',
    color: 'green',
    icon: '🌐',
    title: 'EC21 글로벌 B2B 플랫폼',
    client: '(주)이씨이십일',
    year: '2002–2011',
    desc: '국내 최대 B2B 플랫폼 한·영·중 홈페이지 제작·운영. 유럽연합 EU-Gateway 프로그램 홈페이지 구축. 지방자치단체 무역 홈페이지 다수 제작.',
    tags: ['다국어', 'SEO', '웹디자인', '퍼블리싱', 'B2B'],
  },
  {
    category: 'B2B 플랫폼',
    color: 'cyan',
    icon: '📊',
    title: 'BuyKorea · Gobizkorea SEO 사업',
    client: 'EC21 · 코트라 · 중진공',
    year: '2010',
    desc: '20여개 중소기업 영문 SEO 홈페이지 리뉴얼 코딩·디자인 100%. 한국관광공사·코트라 제안서 PPT 디자인.',
    tags: ['SEO', '웹디자인', 'PPT디자인', '영문사이트'],
  },
  {
    category: '기업 홈페이지',
    color: 'blue',
    icon: '🏢',
    title: '해외 기업 홈페이지',
    client: 'Miottica (이탈리아) · Mirae Laser Clinic (미국) 외',
    year: '2005–2011',
    desc: '이탈리아·미국 기업 대상 영문 홈페이지 제작. 글로벌 기업 홈페이지 기획·디자인·코딩 원스톱.',
    tags: ['영문사이트', '기업홈페이지', 'UI디자인', '다국어'],
  },
  {
    category: '기업 홈페이지',
    color: 'orange',
    icon: '📱',
    title: '국내 중소기업 홈페이지',
    client: 'ETERHI · iFeelu · KStech · Firesoft · EQ-ROBO 외',
    year: '2003–2011',
    desc: '전자·제조·교육 분야 중소기업 홈페이지 다수 제작. 제품 쇼케이스형 UI, 다국어 지원, SEO 최적화.',
    tags: ['기업홈페이지', 'Photoshop', 'CSS', 'HTML'],
  },
  {
    category: '디지털 마케팅',
    color: 'green',
    icon: '📣',
    title: 'DADAC&C 디지털 마케팅 총괄',
    client: '(주)다다씨앤씨',
    year: '2013–2014',
    desc: '소셜 마케팅·콘텐츠 기획·홈페이지 관리 PM 총괄. 영업 홈페이지 기획·제작 전담. 유니클로·나이키·아디다스 등 신규 바이어 대상 제안서 디자인 제작.',
    tags: ['소셜마케팅', '콘텐츠기획', 'PM', 'SNS', '제안서디자인'],
  },
  {
    category: '광고·디자인',
    color: 'purple',
    icon: '🎯',
    title: 'Samsung Medison 광고 배너',
    client: '삼성메디슨',
    year: '2010년대',
    desc: '"Beyond Plus" 캠페인 광고 배너 디자인. 세로형·가로형·정방형 등 다양한 포맷 제작.',
    tags: ['배너디자인', 'Photoshop', '광고', '인쇄물'],
  },
]

const filters = ['전체', 'React', '시스템 UI', 'B2B 플랫폼', '기업 홈페이지', '광고·디자인', '디지털 마케팅']

const categoryMap = {
  'React': ['React 프로젝트'],
  '시스템 UI': ['시스템 UI'],
  'B2B 플랫폼': ['B2B 플랫폼'],
  '기업 홈페이지': ['기업 홈페이지'],
  '광고·디자인': ['광고·디자인'],
  '디지털 마케팅': ['디지털 마케팅'],
}

export default function Works() {
  const [active, setActive] = useState('전체')
  const [fading, setFading] = useState(false)
  const [displayed, setDisplayed] = useState(projects)

  const handleFilter = (f) => {
    if (f === active) return
    setFading(true)
    setTimeout(() => {
      setActive(f)
      setDisplayed(
        f === '전체' ? projects : projects.filter(p => (categoryMap[f] || []).includes(p.category))
      )
      setFading(false)
    }, 200)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    document.querySelectorAll('#works .animate-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="works">
      <div className="divider" />
      <div className="section">
        <div className="section-header animate-in">
          <p className="section-label">Works</p>
          <h2 className="section-title">
            다양한 산업,<br />
            <span>다양한 경험</span>
          </h2>
        </div>

        <div className="works-filters animate-in delay-1">
          {filters.map(f => (
            <button
              key={f}
              className={`works-filter${active === f ? ' active' : ''}`}
              onClick={() => handleFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className={`works-grid${fading ? ' fading' : ''}`}>
          {displayed.map((p) => (
            <div className="work-card" key={p.title}>
              <div className={`work-card-accent work-${p.color}`} />
              <div className="work-card-top">
                <span className="work-icon">{p.icon}</span>
                <span className={`work-category work-cat-${p.color}`}>{p.category}</span>
              </div>
              <h3 className="work-title">{p.title}</h3>
              <div className="work-meta">
                <span className="work-client">{p.client}</span>
                <span className="work-year">{p.year}</span>
              </div>
              <p className="work-desc">{p.desc}</p>
              <div className="work-tags">
                {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
              </div>
              {p.link && (
                <a
                  className="work-link"
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  사이트 보기 →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
