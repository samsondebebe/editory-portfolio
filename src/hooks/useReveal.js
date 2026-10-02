import { useEffect, useRef, useState } from 'react'

const checkReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Global reveal animation system using IntersectionObserver.
 * Adds 'visible' class when element enters viewport.
 */
export function useReveal(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(checkReducedMotion)

  useEffect(() => {
    const element = ref.current
    if (!element || checkReducedMotion()) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin])

  return [ref, isVisible]
}

/**
 * Hook for staggered reveals — returns multiple refs.
 */
export function useStaggerReveal(count, options = {}) {
  const [visibleItems, setVisibleItems] = useState(() =>
    checkReducedMotion() ? new Set(Array.from({ length: count }, (_, i) => i)) : new Set()
  )
  const refs = useRef([])

  useEffect(() => {
    if (checkReducedMotion()) return

    const observers = []
    const baseDelay = options.staggerDelay || 100

    refs.current.forEach((el, index) => {
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]))
            }, index * baseDelay)
            observer.unobserve(el)
          }
        },
        {
          threshold: options.threshold || 0.1,
          rootMargin: options.rootMargin || '0px 0px -30px 0px',
        }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [count, options.staggerDelay, options.threshold, options.rootMargin])

  const setRef = (index) => (el) => {
    refs.current[index] = el
  }

  return { setRef, isVisible: (index) => visibleItems.has(index) }
}
