'use client'

import { useEffect, useRef, useState } from 'react'
import CompactAnimeCard from './CompactAnimeCard'
import { Anime } from '@/lib/data'

export default function RelatedAnime({ items }: { items: Anime[] }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '200px', // Load 200px before entering viewport
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="mt-8 pt-8 border-t border-white/10">
      <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
        <span className="text-[#e50914]">|</span> Có thể bạn sẽ thích
      </h2>
      {isVisible ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {items.map((anime) => (
            <CompactAnimeCard key={anime.id} anime={anime} priority={false} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-slate-800 rounded-lg animate-pulse" />
          ))}
        </div>
      )}
    </div>
  )
}
