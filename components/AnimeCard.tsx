import Link from 'next/link'
import Image from 'next/image'
import { Play, Star, Calendar, Users, Film, Eye } from 'lucide-react'
import { Anime } from '@/lib/data'

interface AnimeCardProps {
  anime: Anime
  priority?: boolean
}

export default function AnimeCard({ anime, priority = false }: AnimeCardProps) {
  return (
    <div className="group relative flex flex-col">
      {/* ── Poster Card ── */}
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
          loading={priority ? undefined : 'lazy'}
          priority={priority}
        />

        {/* Gradient đáy */}
        <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Badge rating + tập */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10 pointer-events-none">
          <span className="flex items-center gap-1 rounded bg-black/75 backdrop-blur-sm px-2 py-0.5 text-[11px] font-bold text-yellow-400">
            <Star className="w-3 h-3 shrink-0" fill="currentColor" />
            {anime.rating}
          </span>
          <span className="rounded bg-[#e50914] px-2 py-0.5 text-[11px] font-bold text-white whitespace-nowrap">
            {anime.episode}
          </span>
        </div>

        {/* Icon Play nhỏ ở giữa khi hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60">
            <Play className="h-5 w-5 text-white ml-0.5" fill="currentColor" />
          </div>
        </div>
      </Link>

      <div className="absolute inset-x-0 top-0 z-30 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 scale-95 group-hover:scale-100 origin-top">
        <div
          className="absolute left-full ml-2 top-0 w-[240px] bg-[#0f172a] border border-white/15 rounded-lg shadow-2xl overflow-hidden"
          style={{ minHeight: '100%' }}
        >
          {/* Banner - Only load on hover */}
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={anime.banner || anime.poster || '/images/anime/poster/logoz.png'}
              alt={anime.title}
              fill
              sizes="240px"
              className="object-cover"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60">
                <Play className="h-4 w-4 text-white ml-0.5" fill="currentColor" />
              </div>
            </div>
          </div>

          <div className="p-3 space-y-2.5">
            <h3 className="text-white font-bold text-[13px] leading-tight line-clamp-2">
              {anime.title}
            </h3>

            <div className="flex items-center gap-1.5 flex-wrap">
              {anime.quality && (
                <span className="bg-[#e50914] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {anime.quality}
                </span>
              )}
              <span className="flex items-center gap-0.5 text-yellow-400 text-[11px] font-bold">
                <Star className="w-3 h-3" fill="currentColor" /> {anime.rating}
              </span>
              <span className="text-slate-400 text-[11px]">•</span>
              <span className="text-slate-300 text-[11px] font-medium">{anime.episode}</span>
            </div>

            {anime.year && (
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>{anime.year}</span>
              </div>
            )}

            <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-3">
              {anime.description}
            </p>

            <div className="border-t border-white/10" />

            {anime.studio && (
              <div className="flex items-start gap-1.5 text-[11px]">
                <Film className="w-3.5 h-3.5 shrink-0 text-yellow-500 mt-0.5" />
                <span>
                  <span className="text-slate-400">Studio: </span>
                  <span className="text-slate-200">{anime.studio}</span>
                </span>
              </div>
            )}

            {anime.genre && anime.genre.length > 0 && (
              <div className="flex items-start gap-1.5 text-[11px]">
                <Users className="w-3.5 h-3.5 shrink-0 text-yellow-500 mt-0.5" />
                <span>
                  <span className="text-slate-400">Thể loại: </span>
                  <span className="text-slate-200">{anime.genre.join(', ')}</span>
                </span>
              </div>
            )}

            {anime.cast && anime.cast.length > 0 && (
              <div className="flex items-start gap-1.5 text-[11px]">
                <Eye className="w-3.5 h-3.5 shrink-0 text-yellow-500 mt-0.5" />
                <span>
                  <span className="text-slate-400">Diễn viên: </span>
                  <span className="text-slate-200 line-clamp-1">{anime.cast.join(', ')}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <Link href={`/watch/${anime.slug}`} className="mt-2 px-0.5 min-h-[3.4rem]">
        <h3 className="text-[13px] font-semibold text-slate-200 line-clamp-2 leading-snug group-hover:text-[#8b5cf6] transition-colors">
          {anime.title}
        </h3>
        {anime.views && (
          <p className="text-[11px] text-slate-500 mt-0.5">
            Lượt xem: {anime.views}
          </p>
        )}
      </Link>
    </div>
  )
}