'use client'

import { useState, useRef } from 'react'
import { Play } from 'lucide-react'
import Image from 'next/image'
import { Anime } from '@/lib/data'
import { ServerType } from '@/hooks/useWatchFeatures'

interface VideoPlayerProps {
  anime: Anime
  currentEpisode: number
  selectedServer: ServerType
  isServerLoading: boolean
  videoPlayerRef: React.RefObject<HTMLDivElement>
  videoRef: React.RefObject<HTMLVideoElement>
}

export default function VideoPlayer({ 
  anime, 
  currentEpisode, 
  selectedServer,
  isServerLoading,
  videoPlayerRef,
  videoRef
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div 
      ref={videoPlayerRef}
      className="relative w-full aspect-video bg-[#0f172a] rounded-xl overflow-hidden border border-white/10 shadow-2xl group"
    >
      {/* Thumbnail/Poster */}
      {!isPlaying && (
        <div className="absolute inset-0 z-10">
          <Image
            src={anime.banner || anime.poster || '/images/anime/poster/logoz.png'}
            alt={`${anime.title} - Tập ${currentEpisode}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(true)}
              className="flex items-center justify-center w-20 h-20 rounded-full bg-red-600 hover:bg-red-500 text-white transition-all hover:scale-110 shadow-2xl"
              aria-label="Phát video"
            >
              <Play className="w-10 h-10 ml-1" fill="currentColor" />
            </button>
          </div>

          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <h1 className="text-white text-2xl font-bold mb-2">
              {anime.title} - Tập {currentEpisode}
            </h1>
            <p className="text-slate-300 text-sm">
              {anime.description.slice(0, 150)}...
            </p>
          </div>
        </div>
      )}

      {/* Video Player Placeholder */}
      {isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-white text-lg">
              {isServerLoading ? 'Đang chuyển server...' : 'Đang tải video...'}
            </p>
            <p className="text-slate-400 text-sm">
              Server: <span className="text-red-500 font-bold uppercase">{selectedServer}</span>
            </p>
            <p className="text-slate-500 text-xs">
              Video player sẽ được tích hợp ở đây
            </p>
          </div>
          {/* Hidden video element for screenshot functionality */}
          <video
            ref={videoRef}
            className="hidden"
            crossOrigin="anonymous"
          />
        </div>
      )}

      {/* Quality Badge */}
      <div className="absolute top-4 right-4 z-20 bg-red-600 px-3 py-1 rounded-full text-white text-sm font-bold">
        {anime.quality || 'FHD'}
      </div>
    </div>
  )
}
