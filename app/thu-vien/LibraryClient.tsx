'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Home, ChevronRight, Star, Info } from 'lucide-react'
import { Anime } from '@/lib/data'

interface LibraryClientProps {
  animeList: Anime[]
}

const ITEMS_PER_PAGE = 20

// A-Z filter characters
const ALPHABET = ['0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

export default function LibraryClient({ animeList }: LibraryClientProps) {
  const [selectedLetter, setSelectedLetter] = useState<string>('0-9')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter anime by selected letter
  const filteredAnime = useMemo(() => {
    return animeList.filter(anime => {
      const firstChar = anime.title.charAt(0).toUpperCase()
      
      if (selectedLetter === '0-9') {
        return /[0-9]/.test(firstChar)
      }
      
      return firstChar === selectedLetter
    }).sort((a, b) => a.title.localeCompare(b.title))
  }, [animeList, selectedLetter])

  // Pagination
  const totalPages = Math.ceil(filteredAnime.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentAnime = filteredAnime.slice(startIndex, endIndex)

  // Handle letter change
  const handleLetterChange = (letter: string) => {
    setSelectedLetter(letter)
    setCurrentPage(1) // Reset to page 1 when filter changes
  }

  // Get status label
  const getStatus = (anime: Anime): string => {
    if (anime.type === 'le') return 'Movie'
    if (anime.episode.includes('Full')) return 'Full'
    return 'Ongoing'
  }

  return (
    <main className="flex-grow w-full pt-[80px] pb-12">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
          <Link href="/" className="flex items-center gap-1.5 hover:text-[#e50914] transition-colors">
            <Home className="w-4 h-4" />
            <span className="font-medium">Trang chủ</span>
          </Link>
          
          <ChevronRight className="w-4 h-4 text-slate-600" />
          
          <span className="text-slate-200 font-semibold">
            A-Z List
          </span>
        </nav>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="bg-[#60a5fa] px-3 py-1 rounded text-white text-lg">
              THƯ VIỆN ANIME
            </span>
          </h1>
          
          {/* Info Banner */}
          <div className="bg-gradient-to-r from-pink-500/20 to-red-500/20 border border-pink-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-pink-100 space-y-1">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  Sử dụng chức năng lọc Anime trên thanh công cụ đi tìm chính xác các phim bạn muốn xem
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  Hướng dẫn truy cập khi xem bị lỗi <span className="text-yellow-300 font-semibold">tại đây!</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* A-Z Filter */}
        <div className="bg-[#1e293b] rounded-lg border border-white/10 p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {ALPHABET.map(letter => (
              <button
                key={letter}
                onClick={() => handleLetterChange(letter)}
                className={`
                  px-3 py-1.5 rounded font-semibold text-sm transition-all min-w-[42px]
                  ${selectedLetter === letter
                    ? 'bg-[#9ef01a] text-black'
                    : 'bg-[#2a3749] text-slate-300 hover:bg-[#3a4759]'
                  }
                `}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-4 text-slate-400 text-sm">
          Tìm thấy <span className="text-white font-semibold">{filteredAnime.length}</span> anime
          {filteredAnime.length > 0 && (
            <span> - Trang {currentPage} / {totalPages}</span>
          )}
        </div>

        {/* Anime Table */}
        <div className="bg-[#1e293b] rounded-lg border border-white/10 overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0f172a] border-b border-white/10">
                  <th className="px-4 py-3 text-left text-slate-300 font-semibold text-sm w-12">#</th>
                  <th className="px-4 py-3 text-left text-slate-300 font-semibold text-sm w-16">Poster</th>
                  <th className="px-4 py-3 text-left text-slate-300 font-semibold text-sm">Tên Anime</th>
                  <th className="px-4 py-3 text-left text-slate-300 font-semibold text-sm w-20">Năm</th>
                  <th className="px-4 py-3 text-left text-slate-300 font-semibold text-sm w-24">Status</th>
                  <th className="px-4 py-3 text-left text-slate-300 font-semibold text-sm">Thể loại</th>
                  <th className="px-4 py-3 text-left text-slate-300 font-semibold text-sm w-24">Đánh giá</th>
                </tr>
              </thead>
              <tbody>
                {currentAnime.length > 0 ? (
                  currentAnime.map((anime, index) => (
                    <tr
                      key={anime.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      {/* Index */}
                      <td className="px-4 py-3 text-slate-400 text-sm">
                        {startIndex + index + 1}
                      </td>
                      
                      {/* Poster */}
                      <td className="px-4 py-3">
                        <Link href={`/watch/${anime.slug}`}>
                          <div className="relative w-12 h-16 rounded overflow-hidden border border-white/10 group cursor-pointer">
                            <Image
                              src={anime.poster || '/images/anime/poster/logoz.png'}
                              alt={anime.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                              sizes="48px"
                            />
                          </div>
                        </Link>
                      </td>
                      
                      {/* Title */}
                      <td className="px-4 py-3">
                        <Link
                          href={`/watch/${anime.slug}`}
                          className="text-white hover:text-[#60a5fa] transition-colors font-medium line-clamp-2"
                        >
                          {anime.title}
                        </Link>
                        {anime.engTitle && (
                          <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">
                            {anime.engTitle}
                          </p>
                        )}
                      </td>
                      
                      {/* Year */}
                      <td className="px-4 py-3 text-slate-300 text-sm">
                        {anime.year || 'N/A'}
                      </td>
                      
                      {/* Status */}
                      <td className="px-4 py-3">
                        <span className={`
                          px-2 py-1 rounded text-xs font-semibold
                          ${getStatus(anime) === 'Full' ? 'bg-green-600/20 text-green-400' : 
                            getStatus(anime) === 'Movie' ? 'bg-blue-600/20 text-blue-400' :
                            'bg-yellow-600/20 text-yellow-400'}
                        `}>
                          {getStatus(anime)}
                        </span>
                      </td>
                      
                      {/* Genres */}
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {anime.genre.slice(0, 3).map((genre, idx) => (
                            <span
                              key={idx}
                              className="text-slate-400 text-xs"
                            >
                              {genre}{idx < Math.min(anime.genre.length, 3) - 1 ? ',' : ''}
                            </span>
                          ))}
                        </div>
                      </td>
                      
                      {/* Rating */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                          <span className="text-yellow-400 font-semibold text-sm">
                            {anime.rating}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                      Không tìm thấy anime nào với chữ cái "{selectedLetter}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-white/5">
            {currentAnime.length > 0 ? (
              currentAnime.map((anime, index) => (
                <Link
                  key={anime.id}
                  href={`/watch/${anime.slug}`}
                  className="flex gap-3 p-4 hover:bg-white/5 transition-colors"
                >
                  {/* Index & Poster */}
                  <div className="flex-shrink-0">
                    <div className="text-slate-500 text-xs mb-1">#{startIndex + index + 1}</div>
                    <div className="relative w-16 h-20 rounded overflow-hidden border border-white/10">
                      <Image
                        src={anime.poster || '/images/anime/poster/logoz.png'}
                        alt={anime.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                      {anime.title}
                    </h3>
                    {anime.engTitle && (
                      <p className="text-slate-500 text-xs mb-2 line-clamp-1">
                        {anime.engTitle}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-slate-400 text-xs">{anime.year || 'N/A'}</span>
                      <span className="text-slate-600">•</span>
                      <span className={`
                        px-1.5 py-0.5 rounded text-xs font-semibold
                        ${getStatus(anime) === 'Full' ? 'bg-green-600/20 text-green-400' : 
                          getStatus(anime) === 'Movie' ? 'bg-blue-600/20 text-blue-400' :
                          'bg-yellow-600/20 text-yellow-400'}
                      `}>
                        {getStatus(anime)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {anime.genre.slice(0, 2).map((genre, idx) => (
                          <span key={idx} className="text-slate-500 text-xs">
                            {genre}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
                        <span className="text-yellow-400 font-semibold text-xs">
                          {anime.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-4 py-12 text-center text-slate-400">
                Không tìm thấy anime nào với chữ cái "{selectedLetter}"
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#1e293b] hover:bg-[#2a3749] disabled:bg-[#1e293b] disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 rounded text-white text-sm font-medium transition-colors"
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`
                      w-10 h-10 rounded font-semibold text-sm transition-colors
                      ${currentPage === pageNum
                        ? 'bg-[#60a5fa] text-white'
                        : 'bg-[#1e293b] hover:bg-[#2a3749] border border-white/10 text-slate-300'
                      }
                    `}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#1e293b] hover:bg-[#2a3749] disabled:bg-[#1e293b] disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 rounded text-white text-sm font-medium transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
