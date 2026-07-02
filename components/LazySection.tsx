// FILE: components/LazySection.tsx
// Lazy-loaded Section wrapper with Intersection Observer

'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

interface LazySectionProps {
  children: ReactNode
  fallback?: ReactNode
  rootMargin?: string
  threshold?: number
}

export default function LazySection({
  children,
  fallback,
  rootMargin = '200px',
  threshold = 0.01
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsVisible(true)
            setHasLoaded(true)
          }
        })
      },
      {
        rootMargin,
        threshold
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [hasLoaded, rootMargin, threshold])

  return (
    <div ref={sectionRef}>
      {isVisible ? children : (fallback || <SectionSkeleton />)}
    </div>
  )
}

function SectionSkeleton() {
  return (
    <section className="w-full mb-10">
      <div className="flex items-center gap-4 mb-5">
        <div className="h-10 w-40 bg-slate-700 rounded animate-pulse" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-24 bg-slate-700 rounded animate-pulse" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex flex-col">
            <div className="aspect-[2/3] bg-slate-700 rounded-lg animate-pulse" />
            <div className="h-4 bg-slate-700 rounded mt-2 animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  )
}
