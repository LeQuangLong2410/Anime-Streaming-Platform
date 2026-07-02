import Link from 'next/link'
import Image from 'next/image'
import { Play, Star } from 'lucide-react'
import { Anime } from '@/lib/data'

interface CompactAnimeCardProps {
  anime: Anime
  priority?: boolean
}

export default function CompactAnimeCard({ anime, priority = false }: CompactAnimeCardProps) {
  return (
    <div className="group relative flex flex-col w-full h-full">
      {/* ── Compact Poster Card with Fixed Aspect Ratio ── */}
      <Link
        href={`/watch/${anime.slug}`}
        className="relative block w-full aspect-[2/3] overflow-hidden rounded-lg bg-[#1e293b] border border-white/10 shadow-lg flex-shrink-0"
      >
        <Image
          src={anime.poster || '/images/anime/poster/logoz.png'}
          alt={anime.title}
          fill
          sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, 200px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading={priority ? undefined : 'lazy'}
          priority={priority}
        />

        {/* Gradient overlay */}
        <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Badges: rating + episode count */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10 pointer-events-none">
          <span className="flex items-center gap-1 rounded bg-black/75 backdrop-blur-sm px-2 py-0.5 text-[11px] font-bold text-yellow-400">
            <Star className="w-3 h-3 shrink-0" fill="currentColor" />
            {anime.rating}
          </span>
          <span className="rounded bg-[#e50914] px-2 py-0.5 text-[11px] font-bold text-white whitespace-nowrap">
            {anime.episode}
          </span>
        </div>

        {/* Quality badge (HD/FHD) if available */}
        {anime.quality && (
          <div className="absolute bottom-2 left-2 z-10 pointer-events-none">
            <span className="rounded bg-green-600 px-2 py-0.5 text-[10px] font-bold text-white">
              {anime.quality}
            </span>
          </div>
        )}

        {/* Play icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60">
            <Play className="h-5 w-5 text-white ml-0.5" fill="currentColor" />
          </div>
        </div>
      </Link>

      {/* Title with Fixed Height */}
      <Link href={`/watch/${anime.slug}`} className="mt-2 px-0.5 h-[42px] flex items-start">
        <h3 className="text-[13px] font-semibold text-slate-200 line-clamp-2 leading-[1.35] group-hover:text-[#8b5cf6] transition-colors">
          {anime.title}
        </h3>
      </Link>
    </div>
  )
}
