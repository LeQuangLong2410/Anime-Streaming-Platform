import Image from 'next/image'
import Link from 'next/link'
import { Star, Film, Calendar, Eye, Play } from 'lucide-react'
import type { Anime } from '@/lib/data'

export default function AnimeHero({ anime }: { anime: Anime }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl h-[620px] md:h-[680px]">
      {/* Background Banner */}
      <div className="absolute inset-0">
        <Image
          src={anime.banner || anime.poster || '/images/default-banner.jpg'}
          alt={anime.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex items-end p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 items-end w-full">
          {/* Poster bên trái */}
          <div className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-2xl bg-[#0f172a] border border-white/10 shadow-xl group">
              <Image
                src={anime.poster || '/images/anime/poster/default.jpg'}
                alt={anime.title}
                width={400}
                height={580}
                className="w-full aspect-[2/3] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
              
              {/* Rating badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-xl">
                <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                <span className="font-bold text-white">{anime.rating}</span>
              </div>
            </div>

            {/* Nút xem phim - Go to episode 1 */}
            <Link
              href={`/watch/${anime.slug}/episode/1`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 transition-all font-bold text-lg shadow-lg shadow-violet-500/30 active:scale-95"
            >
              <Play className="w-5 h-5" fill="currentColor" />
              XEM PHIM NGAY
            </Link>
          </div>

          {/* Nội dung chính bên phải */}
          <div className="space-y-6 pb-6">
            {/* Title */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none tracking-tighter">
                {anime.title}
              </h1>
              {anime.engTitle && (
                <p className="text-2xl text-white/70 mt-2 font-medium">
                  {anime.engTitle}
                </p>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm">
              {anime.year && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>{anime.year}</span>
                </div>
              )}
              {anime.quality && (
                <div className="bg-red-600 text-white px-4 py-2 rounded-2xl font-bold text-sm">
                  {anime.quality}
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-lg text-slate-200 leading-relaxed line-clamp-4 max-w-3xl">
              {anime.description}
            </p>

            {/* Genres */}
            {anime.genre && anime.genre.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {anime.genre.map((g, i) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-2xl text-sm text-slate-300"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <Film className="w-5 h-5 text-violet-400" />
                <div>
                  <p className="text-xs text-slate-400">Tập phim</p>
                  <p className="font-semibold text-white">{anime.episode}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-violet-400" />
                <div>
                  <p className="text-xs text-slate-400">Lượt xem</p>
                  <p className="font-semibold text-white">{anime.views}</p>
                </div>
              </div>

              {anime.studio && (
                <div className="flex items-center gap-3">
                  <span className="text-violet-400">🎬</span>
                  <div>
                    <p className="text-xs text-slate-400">Studio</p>
                    <p className="font-semibold text-white">{anime.studio}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}