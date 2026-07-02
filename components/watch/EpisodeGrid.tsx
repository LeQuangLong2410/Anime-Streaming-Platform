'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Anime } from '@/lib/data'

interface EpisodeGridProps {
  anime: Anime
  totalEpisodes: number
  currentEpisode: number
}

export default function EpisodeGrid({ 
  anime, 
  totalEpisodes, 
  currentEpisode 
}: EpisodeGridProps) {
  const [visibleEpisodes, setVisibleEpisodes] = useState(60) // Show 60 episodes initially

  // Generate episode array
  const episodes = useMemo(() => 
    Array.from({ length: totalEpisodes }, (_, i) => i + 1),
    [totalEpisodes]
  )

  const displayedEpisodes = episodes.slice(0, visibleEpisodes)
  const hasMore = visibleEpisodes < totalEpisodes

  return (
    <div className="bg-[#1e293b] rounded-lg border border-white/10 p-4">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <span className="text-red-600">|</span>
        Danh sách tập
        <span className="text-slate-400 text-sm font-normal ml-1">
          ({totalEpisodes} tập)
        </span>
      </h3>

      {/* Episode Grid */}
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-14 gap-2 mb-4">
        {displayedEpisodes.map(episodeNum => {
          const isCurrent = episodeNum === currentEpisode
          const isPast = episodeNum < currentEpisode

          return (
            <Link
              key={episodeNum}
              href={`/watch/${anime.slug}/episode/${episodeNum}`}
              className={`
                aspect-square flex items-center justify-center rounded-lg
                font-bold text-sm transition-all border-2
                ${isCurrent 
                  ? 'bg-red-600 border-red-600 text-white scale-105 shadow-lg' 
                  : isPast
                  ? 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20'
                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-red-600/50'
                }
              `}
            >
              {episodeNum}
            </Link>
          )
        })}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <button
          onClick={() => setVisibleEpisodes(prev => Math.min(prev + 60, totalEpisodes))}
          className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-semibold text-sm transition-all"
        >
          Xem thêm {Math.min(60, totalEpisodes - visibleEpisodes)} tập
        </button>
      )}
    </div>
  )
}
