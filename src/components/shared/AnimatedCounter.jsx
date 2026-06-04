import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2, trigger }) {
  const counterRef = useRef(null)
  const hasRun = useRef(false)

  useGSAP(() => {
    if (hasRun.current) return
    const el = counterRef.current
    if (!el) return

    const obj = { val: 0 }
    const tween = gsap.to(obj, {
      val: end,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = prefix + Math.round(obj.val) + suffix
      }
    })

    ScrollTrigger.create({
      trigger: trigger || el,
      start: 'top 85%',
      onEnter: () => {
        if (!hasRun.current) {
          hasRun.current = true
          tween.play(0)
        }
      },
    })

    tween.pause()
  }, { scope: counterRef })

  return (
    <span ref={counterRef} className="stat-number">
      {prefix}0{suffix}
    </span>
  )
}
