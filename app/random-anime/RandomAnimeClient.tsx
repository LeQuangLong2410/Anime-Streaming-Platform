// FILE: app/random-anime/RandomAnimeClient.tsx
// Client component cho random anime logic

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shuffle, Play, Star, Calendar, Film, Users, Eye, Home, ChevronRight } from 'lucide-react'
import { animes, Anime } from '@/lib/data'
import Sidebar from '@/components/Sidebar'

export default function RandomAnimeClient() {
  const [randomAnime, setRandomAnime] = useState<Anime | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Get random anime
  const getRandomAnime = () => {
    const randomIndex = Math.floor(Math.random() * animes.length)
    return animes[randomIndex]
  }

  // Initial random anime on mount
  useEffect(() => {
    setRandomAnime(getRandomAnime())
  }, [])

  // Handle random button click
  const handleRandomClick = () => {
    setIsLoading(true)
    setIsAnimating(true)

    // Simulate loading for smooth animation
    setTimeout(() => {
      setRandomAnime(getRandomAnime())
      setIsLoading(false)
      
      // Remove animation class after animation completes
      setTimeout(() => {
        setIsAnimating(false)
      }, 500)
    }, 300)
  }

  if (!randomAnime) {
    return (
      <main className="flex-grow w-full max-w-[1400px] mx-auto pt-[80px] pb-12 px-4 lg:px-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-grow w-full max-w-[1400px] mx-auto pt-[80px] pb-12 px-4 lg:px-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content (Left) - 72% width */}
        <div className="w-full lg:w-[72%] flex-shrink-0 min-w-0">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="flex items-center gap-1.5 hover:text-[#e50914] transition-colors">
              <Home className="w-4 h-4" />
              <span className="font-medium">Trang chủ</span>
            </Link>
            
            <ChevronRight className="w-4 h-4 text-slate-600" />
            
            <span className="text-slate-200 font-semibold">
              Random Anime
            </span>
          </nav>

          {/* Title Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-red-700">
                <Shuffle className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-black text-white">
                🎲 Random Anime
              </h1>
            </div>
            <p className="text-slate-400 text-base">
              Khám phá anime ngẫu nhiên — quay nhanh phim bất kỳ.
            </p>
          </div>

          {/* Random Anime Card */}
          <div 
            className={`bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 ${
              isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-6">
              {/* Poster */}
              <div className="relative aspect-[2/3] md:aspect-auto md:h-[450px] rounded-lg overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={randomAnime.poster}
                  alt={randomAnime.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Rating badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/75 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  <span className="text-white font-bold text-sm">{randomAnime.rating}</span>
                </div>

                {/* Quality badge */}
                {randomAnime.quality && (
                  <div className="absolute top-3 right-3 bg-red-600 px-3 py-1 rounded-lg">
                    <span className="text-white font-bold text-xs">{randomAnime.quality}</span>
                  </div>
                )}

                {/* Episode badge */}
                <div className="absolute bottom-3 left-3 bg-green-600 px-3 py-1.5 rounded-lg">
                  <span className="text-white font-bold text-sm">{randomAnime.episode}</span>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">
                      {randomAnime.title}
                    </h2>
                    {randomAnime.engTitle && (
                      <p className="text-slate-400 text-sm font-medium">
                        {randomAnime.engTitle}
                      </p>
                    )}
                  </div>

                  {/* Meta info */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5 text-yellow-400">
                      <Star className="w-4 h-4" fill="currentColor" />
                      <span className="font-bold">{randomAnime.rating}</span>
                    </div>
                    
                    {randomAnime.year && (
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-sm">{randomAnime.year}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 text-slate-300">
                      <span className="text-sm font-medium">{randomAnime.episode}</span>
                    </div>

                    {randomAnime.views && (
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Eye className="w-4 h-4 text-slate-400" />
                        <span className="text-sm">{randomAnime.views}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {randomAnime.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-3 pt-2">
                    {randomAnime.studio && (
                      <div className="flex items-start gap-2">
                        <Film className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                        <div className="text-sm">
                          <span className="text-slate-400">Studio: </span>
                          <span className="text-slate-200 font-medium">{randomAnime.studio}</span>
                        </div>
                      </div>
                    )}

                    {randomAnime.genre && randomAnime.genre.length > 0 && (
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                        <div className="text-sm">
                          <span className="text-slate-400">Thể loại: </span>
                          <span className="text-slate-200">{randomAnime.genre.join(', ')}</span>
                        </div>
                      </div>
                    )}

                    {randomAnime.cast && randomAnime.cast.length > 0 && (
                      <div className="flex items-start gap-2">
                        <Eye className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                        <div className="text-sm">
                          <span className="text-slate-400">Diễn viên: </span>
                          <span className="text-slate-200">{randomAnime.cast.join(', ')}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
                  <Link
                    href={`/watch/${randomAnime.slug}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg"
                  >
                    <Play className="w-5 h-5" fill="currentColor" />
                    Xem Phim
                  </Link>

                  <button
                    onClick={handleRandomClick}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Shuffle className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Quay phim khác</span>
                    <span className="sm:hidden">Quay lại</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Random Info Section */}
          <div className="mt-8 bg-[#1e293b] rounded-lg border border-white/10 p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Shuffle className="w-5 h-5 text-red-500" />
              Random nâng cao
            </h3>
            
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Chọn thể loại, sẽ lượng và bộ lọc để tìm kiếm QUAY.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Genre filters - Coming soon */}
              <div className="bg-[#0f172a] rounded-lg p-3 border border-white/5">
                <div className="text-xs text-slate-400 mb-1">Loại phim</div>
                <div className="text-sm text-slate-300 font-medium">Không chọn - tất cả</div>
              </div>

              <div className="bg-[#0f172a] rounded-lg p-3 border border-white/5">
                <div className="text-xs text-slate-400 mb-1">Đang chiếu</div>
                <div className="text-sm text-slate-300 font-medium">Anime Bộ</div>
              </div>

              <div className="bg-[#0f172a] rounded-lg p-3 border border-white/5">
                <div className="text-xs text-slate-400 mb-1">Hoàn tất</div>
                <div className="text-sm text-slate-300 font-medium">Anime Lẻ</div>
              </div>

              <div className="bg-[#0f172a] rounded-lg p-3 border border-white/5">
                <div className="text-xs text-slate-400 mb-1">Sắp chiếu</div>
                <div className="text-sm text-slate-300 font-medium">AND lớn đa 5 thể loại</div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors text-sm">
                QUAY
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar (Right) - 28% width */}
        <div className="w-full lg:w-[28%] flex-shrink-0">
          <Sidebar />
        </div>
      </div>
    </main>
  )
}
