import { useState, useEffect, useRef } from 'react'

export default function CountUp({ to, suffix = '', duration = 1600 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        const fps = 60
        const totalFrames = Math.ceil(duration / (1000 / fps))
        let frame = 0
        const timer = setInterval(() => {
          frame++
          const eased = 1 - Math.pow(1 - frame / totalFrames, 3)
          setVal(Math.floor(to * Math.min(eased, 1)))
          if (frame >= totalFrames) {
            setVal(to)
            clearInterval(timer)
          }
        }, 1000 / fps)
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [to, duration])

  return <span ref={ref}>{val}{suffix}</span>
}
