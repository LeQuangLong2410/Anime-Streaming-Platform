'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { Anime } from '@/lib/data'

interface SapChieuGridProps {
  items: Anime[]
  viewMoreLink?: string
}

export default function SapChieuGrid({ items, viewMoreLink = '/popular' }: SapChieuGridProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
        {items.map(anime => (
          <SapChieuCard key={anime.id} anime={anime} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          href={viewMoreLink}
          className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#8b5cf6]/50 rounded-xl text-white font-semibold text-sm transition-all uppercase tracking-wide"
        >
          Xem thêm
        </Link>
      </div>
    </div>
  )
}

function SapChieuCard({ anime }: { anime: Anime }) {
  return (
    <div className="group relative flex flex-col">
      <Link
        href={`/watch/${anime.slug}`}
        className="relative block aspect-[2/3] w-full overflow-hidden rounded-lg bg-[#1e293b] border border-white/10 shadow-lg"
      >
        <Image
          src={anime.poster || '/images/anime/poster/logoz.png'}
          alt={anime.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-2 left-2 z-10 pointer-events-none">
          <span className="flex items-center gap-1 rounded-full bg-black/70 backdrop-blur-sm px-2.5 py-1 text-[12px] font-bold text-yellow-400">
            <Star className="w-3.5 h-3.5 shrink-0" fill="currentColor" />
            {anime.rating}
          </span>
        </div>

        {anime.releaseDate && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-white font-black text-2xl sm:text-3xl leading-tight text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] px-2">
              {anime.releaseDate}
            </span>
          </div>
        )}

        <div className="absolute bottom-0 inset-x-0 bg-[#e50914] py-1.5 text-center z-10">
          <span className="text-white font-bold text-[11px] uppercase tracking-widest">
            Sắp Chiếu
          </span>
        </div>
      </Link>

      <div className="mt-2 px-0.5 min-h-[3.2rem]">
        <h3 className="text-[13px] font-semibold text-slate-200 line-clamp-2 leading-snug group-hover:text-[#8b5cf6] transition-colors">
          {anime.title}
        </h3>
        {anime.views && (
          <p className="text-[11px] text-slate-500 mt-0.5">Lượt xem: {anime.views}</p>
        )}
      </div>
    </div>
  )
}

