import { useState, useEffect, useRef } from 'react'

const skills = [
  { name: 'HTML5', level: 96 },
  { name: 'CSS3 / SCSS', level: 95 },
  { name: '반응형 웹', level: 93 },
  { name: '웹 표준 / 접근성', level: 90 },
  { name: 'JavaScript', level: 78 },
  { name: 'React', level: 62, badge: '학습중' },
  { name: 'UI / UX 디자인', level: 85 },
  { name: 'Photoshop', level: 83 },
  { name: 'SEO 최적화', level: 80 },
  { name: 'SNS 마케팅', level: 75 },
  { name: 'Google Analytics', level: 72 },
  { name: 'PowerPoint 디자인', level: 86 },
]

const techTags = [
  'HTML5', 'CSS3', 'CSS Grid', 'Flexbox', 'SCSS',
  'JavaScript', 'React', 'Vite', '반응형 웹', '크로스브라우징',
  '웹표준', '웹접근성', 'SEO', 'Photoshop', 'Google Analytics',
  'Splunk UI', 'GitHub', 'PowerPoint', 'SNS 마케팅', '콘텐츠 기획',
]

export default function Skills() {
  const [animated, setAnimated] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const skillObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
          skillObserver.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) skillObserver.observe(sectionRef.current)

    const animObserver = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('#skills .animate-in').forEach(el => animObserver.observe(el))

    return () => {
      skillObserver.disconnect()
      animObserver.disconnect()
    }
  }, [])

  return (
    <section id="skills">
      <div className="divider" />
      <div className="section">
        <div className="section-header animate-in">
          <p className="section-label">Skills</p>
          <h2 className="section-title">
            기술 스택 &<br />
            <span>역량</span>
          </h2>
        </div>

        <div ref={sectionRef} className="skills-grid animate-in delay-1">
          {skills.map((skill, i) => (
            <div className="skill-item" key={skill.name}>
              <div className="skill-header">
                <span className="skill-name">
                  {skill.name}
                  {skill.badge && <span className="skill-badge">{skill.badge}</span>}
                </span>
                <span className="skill-pct">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div
                  className={`skill-fill${animated ? ' animated' : ''}`}
                  style={{
                    '--w': `${skill.level}%`,
                    transitionDelay: animated ? `${i * 0.06}s` : '0s',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="tech-tags-section animate-in delay-2">
          <p className="tech-tags-title">보유 기술 · 툴</p>
          <div className="tech-tags-grid">
            {techTags.map(tag => (
              <span className="tech-tag" key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
