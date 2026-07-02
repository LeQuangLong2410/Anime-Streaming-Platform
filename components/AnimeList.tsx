'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import AnimeCard from './AnimeCard'

interface AnimeGridProps {
  children?: ReactNode
  items?: any[]
  title?: string
  showTabs?: boolean
  viewMoreLink?: string
}

export default function AnimeGrid({
  children,
  items,
  title = "MỚI CẬP NHẬT",
  showTabs = true,
  viewMoreLink = "/danh-sach"
}: AnimeGridProps) {

  return (
    <section className="py-8">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {title}
          </h2>
        </div>

        {/* Tabs */}
        {showTabs && (
          <div className="flex flex-wrap gap-2 pb-6 border-b border-white/10 mb-8">
            <button className="bg-red-600 hover:bg-red-700 px-6 py-2.5 rounded-lg font-medium text-white transition-colors">
              Tất cả
            </button>
            <button className="hover:bg-white/10 px-6 py-2.5 rounded-lg text-slate-300 hover:text-white transition-colors">
              Mùa Xuân - 2026
            </button>
            <button className="hover:bg-white/10 px-6 py-2.5 rounded-lg text-slate-300 hover:text-white transition-colors">
              Anime bộ
            </button>
            <button className="hover:bg-white/10 px-6 py-2.5 rounded-lg text-slate-300 hover:text-white transition-colors">
              Anime lẻ
            </button>
            <button className="hover:bg-white/10 px-6 py-2.5 rounded-lg text-slate-300 hover:text-white transition-colors">
              HH Trung Quốc
            </button>
          </div>
        )}

        {/* Grid Content */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {items && items.length > 0 ? (
            items.map((item) => (
              <AnimeCard key={item.id} anime={item} />
            ))
          ) : (
            children
          )}
        </div>

        {viewMoreLink && (
          <div className="flex justify-center mt-12">
            <Link
              href={viewMoreLink}
              className="px-10 py-3.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-2xl text-white font-medium transition-all hover:border-white/40"
            >
              XEM THÊM..
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}