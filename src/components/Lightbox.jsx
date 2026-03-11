import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function Lightbox({ images, index, onClose, onChange }) {
  const total = images.length
  const prev = (e) => { e.stopPropagation(); onChange((index - 1 + total) % total) }
  const next = (e) => { e.stopPropagation(); onChange((index + 1) % total) }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onChange((index - 1 + total) % total)
      if (e.key === 'ArrowRight') onChange((index + 1) % total)
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [index, total, onClose, onChange])

  return createPortal(
    <div className="lb-overlay" onClick={onClose}>
      <button className="lb-close" onClick={onClose}>✕</button>

      <div className="lb-content" onClick={e => e.stopPropagation()}>
        <img key={index} src={images[index]} alt={`작업물 ${index + 1}`} className="lb-img" />
      </div>

      {total > 1 && (
        <>
          <button className="lb-nav lb-prev" onClick={prev}>&#8249;</button>
          <button className="lb-nav lb-next" onClick={next}>&#8250;</button>
          <div className="lb-footer" onClick={e => e.stopPropagation()}>
            <div className="lb-dots">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`lb-dot${i === index ? ' active' : ''}`}
                  onClick={() => onChange(i)}
                />
              ))}
            </div>
            <span className="lb-counter">{index + 1} / {total}</span>
          </div>
        </>
      )}
    </div>,
    document.body
  )
}
