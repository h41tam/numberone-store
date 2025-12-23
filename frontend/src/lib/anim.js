import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function usePageEnter() {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
  }, [])
  return ref
}

export function useStagger(ref, childSelector) {
  useEffect(() => {
    if (!ref.current) return
    const targets = ref.current.querySelectorAll(childSelector)
    gsap.fromTo(targets, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.06 })
  }, [])
}
