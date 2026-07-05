import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2, trigger, className = 'stat-number' }) {
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

    const triggerEl = typeof trigger === 'string' ? document.querySelector(trigger) : (trigger || el)

    ScrollTrigger.create({
      trigger: triggerEl,
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
    <span ref={counterRef} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
