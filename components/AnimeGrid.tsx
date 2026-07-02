'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import AnimeCard from './AnimeCard'
import { Anime } from '@/lib/data'

interface AnimeGridProps {
  children?: ReactNode
  items?: Anime[]
  showTabs?: boolean
  viewMoreLink?: string
  maxCols?: 5 | 6
  priorityCount?: number // Number of cards to load with priority
}

export default function AnimeGrid({
  children,
  items,
  showTabs = true,
  viewMoreLink = '/danh-sach',
  maxCols = 6,
  priorityCount = 5, // Default: first row gets priority
}: AnimeGridProps) {
  const gridCols =
    maxCols === 5
      ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
      : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'

  return (
    <div className="w-full">
      {showTabs && (
        <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-white/10">
          <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] px-5 py-2 rounded-lg font-semibold text-white text-sm transition-colors">
            Tất cả
          </button>
          <button className="hover:bg-white/10 px-5 py-2 rounded-lg text-slate-400 hover:text-white text-sm transition-colors">
            Mùa Xuân 2026
          </button>
          <button className="hover:bg-white/10 px-5 py-2 rounded-lg text-slate-400 hover:text-white text-sm transition-colors">
            Anime bộ
          </button>
          <button className="hover:bg-white/10 px-5 py-2 rounded-lg text-slate-400 hover:text-white text-sm transition-colors">
            Anime lẻ
          </button>
          <button className="hover:bg-white/10 px-5 py-2 rounded-lg text-slate-400 hover:text-white text-sm transition-colors">
            HH Trung Quốc
          </button>
        </div>
      )}

      <div className={`grid ${gridCols} gap-4 sm:gap-5`}>
        {items && items.length > 0
          ? items.map((item, index) => (
              <AnimeCard 
                key={item.id} 
                anime={item} 
                priority={index < priorityCount}
              />
            ))
          : children}
      </div>

      {viewMoreLink && (
        <div className="flex justify-center mt-10">
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