'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ChevronLeft, ChevronRight, Play,
  Star, Clock, Calendar, Video, Grid2x2,
  User, MoreHorizontal
} from 'lucide-react'
import { trendingAnime } from '@/lib/data'

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const sliderItems = trendingAnime.slice(0, 5)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === sliderItems.length - 1 ? 0 : prev + 1))
  }, [sliderItems.length])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? sliderItems.length - 1 : prev - 1))
  }

  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [isHovered, nextSlide])

  const anime = sliderItems[currentIndex]

  return (
    <div
      className="relative w-full h-[280px] sm:h-[340px] lg:h-[390px] overflow-hidden mb-8 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {sliderItems.map((item, idx) => {
        // Only render current, previous, and next slides
        const shouldRender = 
          idx === currentIndex || 
          idx === (currentIndex - 1 + sliderItems.length) % sliderItems.length ||
          idx === (currentIndex + 1) % sliderItems.length

        if (!shouldRender) return null

        return (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <Image
              src={item.banner || item.poster || '/images/anime/poster/logoz.png'}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1400px"
              className="object-cover object-center"
              priority={idx === 0}
              loading={idx === 0 ? undefined : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] from-30% via-[#0f172a]/75 via-55% to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent" />
          </div>
        )
      })}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-10 lg:px-12 max-w-[56%]">

        <h1 className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-white leading-tight mb-2 line-clamp-2">
          {anime.title}
        </h1>

        <div className="flex items-center gap-3 flex-wrap mb-3">
          <span className="flex items-center gap-1 text-yellow-400 font-bold text-sm">
            <Star className="w-4 h-4" fill="currentColor" />
            {anime.rating}
          </span>
          <span className="flex items-center gap-1.5 text-slate-300 text-sm">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {anime.episode}
          </span>
          {anime.year && (
            <span className="flex items-center gap-1.5 text-slate-300 text-sm">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {anime.year}
            </span>
          )}
          {anime.quality && (
            <span className="bg-[#e50914] text-white text-[11px] font-bold px-2 py-0.5 rounded">
              {anime.quality}
            </span>
          )}
        </div>

        <p className="text-slate-300 text-sm line-clamp-2 leading-relaxed mb-3">
          {anime.description}
        </p>

        <div className="space-y-1.5 mb-4">
          {anime.studio && (
            <div className="flex items-center gap-2 text-sm">
              <Video className="w-4 h-4 text-green-400 shrink-0" />
              <span className="text-slate-300">
                <span className="text-slate-400">Studio: </span>
                {anime.studio}
              </span>
            </div>
          )}
          {anime.genre && anime.genre.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <Grid2x2 className="w-4 h-4 text-green-400 shrink-0" />
              <span className="text-slate-300 line-clamp-1">
                <span className="text-slate-400">Thể Loại: </span>
                {anime.genre.join(', ')}, ...
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Avatar người */}
          <div className="flex -space-x-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-slate-700/80 border-2 border-[#0f172a] flex items-center justify-center"
              >
                <User className="w-4 h-4 text-slate-400" />
              </div>
            ))}
          </div>

          <button className="w-9 h-9 rounded-sm border-2 border-green-400 flex items-center justify-center text-green-400 hover:bg-green-400/10 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>

          <Link
            href={`/watch/${anime.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e50914] hover:bg-[#b20710] text-white rounded font-bold text-sm uppercase tracking-wide transition-colors shadow-lg"
          >
            <Play size={15} fill="currentColor" />
            Xem Phim
          </Link>
        </div>
      </div>

      <button
        onClick={prevSlide}
        aria-label="Trước"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-[#e50914] text-white transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Tiếp"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-[#e50914] text-white transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-3 left-6 md:left-10 z-20 flex gap-1.5">
        {sliderItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'w-6 bg-[#e50914]' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
          />
        ))}
      </div>
    </div>
  )
}
