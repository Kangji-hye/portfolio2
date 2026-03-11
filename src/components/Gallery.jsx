import { useState, useEffect, useCallback } from 'react'
import Lightbox from './Lightbox'

const galleryItems = [
  { src: '/images/works/yongin-1.jpg',    title: '용인대학교 학사시스템', category: '시스템 UI' },
  { src: '/images/works/yongin-2.jpg',    title: '용인대학교 모바일',     category: '시스템 UI' },
  { src: '/images/works/ostem1.png',      title: 'OSSTEM 업무환경시스템', category: '시스템 UI' },
  { src: '/images/works/ostem2.png',      title: 'OSSTEM 영업 대시보드',  category: '시스템 UI' },
  { src: '/images/works/ec21-1.jpg',      title: 'EC21 B2B 플랫폼',      category: 'B2B 플랫폼' },
  { src: '/images/works/ec21-2.jpg',      title: 'EC21 서비스 페이지',    category: 'B2B 플랫폼' },
  { src: '/images/works/buykorea-1.jpg',  title: 'BuyKorea SEO 사업',    category: 'B2B 플랫폼' },
  { src: '/images/works/overseas-1.jpg',  title: 'MioTTICA (이탈리아)',   category: '기업 홈페이지' },
  { src: '/images/works/overseas-2.jpg',  title: 'Mirae Laser Clinic',   category: '기업 홈페이지' },
  { src: '/images/works/overseas-3.jpg',  title: 'Ace Tech Circuit',     category: '기업 홈페이지' },
  { src: '/images/works/domestic-1.jpg',  title: 'Firesoft',             category: '기업 홈페이지' },
  { src: '/images/works/domestic-2.jpg',  title: 'ETERHI',               category: '기업 홈페이지' },
  { src: '/images/works/domestic-3.jpg',  title: 'iFeelu',               category: '기업 홈페이지' },
  { src: '/images/works/domestic-4.jpg',  title: 'KStech',               category: '기업 홈페이지' },
  { src: '/images/works/domestic-5.jpg',  title: 'EQ-ROBO',              category: '기업 홈페이지' },
  { src: '/images/works/domestic-6.jpg',  title: 'TYM Bathco',           category: '기업 홈페이지' },
  { src: '/images/works/domestic-7.jpg',  title: 'SAMICK',               category: '기업 홈페이지' },
  { src: '/images/works/samsung-1.jpg',   title: 'Samsung Medison 배너', category: '광고·디자인' },
]

const allSrcs = galleryItems.map(g => g.src)

export default function Gallery() {
  const [lbIndex, setLbIndex] = useState(null)

  const openLb = useCallback((i) => setLbIndex(i), [])
  const closeLb = useCallback(() => setLbIndex(null), [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    document.querySelectorAll('#gallery .animate-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="gallery">
      <div className="divider" />
      <div className="section">
        <div className="section-header animate-in">
          <p className="section-label">Gallery</p>
          <h2 className="section-title">
            실제 작업물,<br />
            <span>직접 확인하세요</span>
          </h2>
        </div>

        <div className="gallery-grid animate-in delay-1">
          {galleryItems.map((item, i) => (
            <div
              key={item.src}
              className="gallery-item"
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={() => openLb(i)}
            >
              <img src={item.src} alt={item.title} loading="lazy" />
              <div className="gallery-overlay">
                <span className="gallery-zoom-icon">🔍</span>
                <span className="gallery-item-title">{item.title}</span>
                <span className="gallery-item-cat">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lbIndex !== null && (
        <Lightbox
          images={allSrcs}
          index={lbIndex}
          onClose={closeLb}
          onChange={setLbIndex}
        />
      )}
    </section>
  )
}
