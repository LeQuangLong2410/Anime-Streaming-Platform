'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import CompactAnimeCard from './CompactAnimeCard'
import { Anime } from '@/lib/data'

interface AnimeCarouselProps {
  animeList: Anime[]
  viewMoreLink?: string
}

export default function AnimeCarousel({
  animeList,
  viewMoreLink,
}: AnimeCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current
      const scrollAmount = clientWidth * 0.85

      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="w-full">
      {/* Carousel với nút mũi tên */}
      <div className="group relative">
        {/* Nút điều hướng - chỉ hiện trên desktop khi hover */}
        <div className="absolute top-[40%] -translate-y-1/2 left-0 right-0 pointer-events-none z-20 hidden md:block">
          <div className="flex justify-between items-center w-full">
            <button
              onClick={() => scroll('left')}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-black/80 hover:bg-[#8b5cf6] text-white opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 border border-white/10 shadow-xl -ml-5"
              aria-label="Cuộn trái"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>

            <button
              onClick={() => scroll('right')}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-black/80 hover:bg-[#8b5cf6] text-white opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 border border-white/10 shadow-xl -mr-5"
              aria-label="Cuộn phải"
            >
              <ChevronRight size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Danh sách card scroll ngang với fixed width */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory"
        >
          {animeList.map((anime) => (
            <div
              key={anime.id}
              className="w-[160px] sm:w-[180px] md:w-[200px] flex-shrink-0 snap-start"
            >
              <CompactAnimeCard anime={anime} />
            </div>
          ))}
        </div>
      </div>

      {/* Nút Xem Thêm - đồng bộ với AnimeGrid */}
      {viewMoreLink && (
        <div className="flex justify-center mt-8">
          <Link
            href={viewMoreLink}
            className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#8b5cf6]/50 rounded-xl text-white font-semibold text-sm transition-all uppercase tracking-wide"
          >
            Xem thêm
          </Link>
        </div>
      )}
    </div>
  )
}