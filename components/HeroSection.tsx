import Image from 'next/image'
import Link from 'next/link'
import { Star, Calendar, Play } from 'lucide-react'
import type { Anime } from '@/lib/data'

interface HeroSectionProps {
  featuredAnime: Anime
}

export default function HeroSection({ featuredAnime }: HeroSectionProps) {
  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={featuredAnime.banner || featuredAnime.poster || ''}
          alt={featuredAnime.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      <div className="container mx-auto px-6 pb-16 relative z-10">
        <div className="max-w-3xl space-y-5">
          {/* Meta Info */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 bg-black/60 px-4 py-1 rounded-full">
              <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
              <span className="font-bold text-white">{featuredAnime.rating}</span>
            </div>
            
            <div className="bg-black/60 px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <span>📺</span>
              {featuredAnime.episode}
            </div>

            <div className="bg-black/60 px-4 py-1 rounded-full text-sm font-medium">
              {featuredAnime.year}
            </div>

            {featuredAnime.quality && (
              <div className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                {featuredAnime.quality}
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tighter">
            {featuredAnime.title}
          </h1>

          {featuredAnime.engTitle && (
            <p className="text-2xl text-white/70 font-medium">
              {featuredAnime.engTitle}
            </p>
          )}

          {/* Description */}
          <p className="text-lg text-slate-200 line-clamp-3 max-w-2xl">
            {featuredAnime.description}
          </p>

          {/* Studio & Genres */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            {featuredAnime.studio && (
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">🎬</span>
                <span><strong>Studio:</strong> {featuredAnime.studio}</span>
              </div>
            )}
            
            {featuredAnime.genre && featuredAnime.genre.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">🏷️</span>
                <span><strong>Thể loại:</strong> {featuredAnime.genre.slice(0, 4).join(', ')}</span>
              </div>
            )}
          </div>

          {/* Buttons - XEM PHIM goes to episode 1, Chi tiết goes to anime detail */}
          <div className="flex items-center gap-4 pt-4">
            <Link
              href={`/watch/${featuredAnime.slug}/episode/1`}
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white font-bold px-10 py-4 rounded-2xl transition-all text-lg shadow-lg shadow-red-600/30 active:scale-95"
            >
              <Play className="w-6 h-6" fill="currentColor" />
              XEM PHIM
            </Link>

            <Link
              href={`/watch/${featuredAnime.slug}`}
              className="inline-flex items-center gap-3 border border-white/30 hover:bg-white/10 text-white font-medium px-8 py-4 rounded-2xl transition-all backdrop-blur-sm"
            >
              Chi tiết
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}