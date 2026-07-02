// FILE: app/danh-sach/AnimeListingClient.tsx
// Client component cho anime listing với filtering và pagination
// Optimized with lazy loading

'use client'

import { useState, useEffect, useMemo, lazy, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Home, ChevronRight, Filter, ChevronDown, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react'
import { animes } from '@/lib/data'
import AnimeCard from '@/components/AnimeCard'
import Sidebar from '@/components/Sidebar'

// Lazy load the filter panel
const FilterPanel = lazy(() => import('./FilterPanel'))

const ITEMS_PER_PAGE = 25

// Genres list
const GENRES = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance',
  'School', 'Sci-Fi', 'Sports', 'Supernatural', 'Slice of Life', 'Mystery',
  'Thriller', 'Historical', 'Mecha', 'Music', 'Psychological', 'Shounen',
  'Shoujo', 'Seinen', 'Josei', 'Isekai', 'Ecchi', 'Harem', 'Demons', 'Vampire',
  'Yuri', 'Yaoi', 'Kids', 'Martial Arts', 'Military', 'Parody', 'Police',
  'Samurai', 'Space', 'Super Power', 'Game', 'Cars', 'Dementia'
]

// Seasons list
const SEASONS = ['Đông(Winter)', 'Xuân(Spring)', 'Hạ(Summer)', 'Thu(Autumn)']

// Years list
const YEARS = Array.from({ length: 30 }, (_, i) => 2026 - i)

export default function AnimeListingClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Filter states
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('latest')
  const [animeType, setAnimeType] = useState('all')
  const [season, setSeason] = useState('all')
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [year, setYear] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  // Initialize from URL params
  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1')
    const sort = searchParams.get('sort') || 'latest'
    const type = searchParams.get('type') || 'all'
    const seasonParam = searchParams.get('season') || 'all'
    const yearParam = searchParams.get('year') || 'all'
    const genresParam = searchParams.get('genres')

    setCurrentPage(page)
    setSortBy(sort)
    setAnimeType(type)
    setSeason(seasonParam)
    setYear(yearParam)
    if (genresParam) {
      setSelectedGenres(genresParam.split(','))
    }
  }, [searchParams])

  // Filter and sort anime
  const filteredAnime = useMemo(() => {
    let result = [...animes]

    // Filter by type
    if (animeType !== 'all') {
      if (animeType === 'movie') {
        result = result.filter(a => a.type === 'le' || a.genre.includes('Movie'))
      } else if (animeType === 'tv') {
        result = result.filter(a => a.type === 'bo')
      } else if (animeType === 'ongoing') {
        result = result.filter(a => !a.episode.toLowerCase().includes('full') && !a.episode.toLowerCase().includes('end'))
      } else if (animeType === 'completed') {
        result = result.filter(a => a.episode.toLowerCase().includes('full') || a.episode.toLowerCase().includes('end'))
      } else if (animeType === 'upcoming') {
        result = result.filter(a => a.releaseDate && new Date(a.releaseDate) > new Date())
      }
    }

    // Filter by season
    if (season !== 'all') {
      // Simple season filter (can be enhanced)
      result = result.filter(a => {
        if (season.includes('Đông')) return a.releaseDate?.includes('-01-') || a.releaseDate?.includes('-02-') || a.releaseDate?.includes('-12-')
        if (season.includes('Xuân')) return a.releaseDate?.includes('-03-') || a.releaseDate?.includes('-04-') || a.releaseDate?.includes('-05-')
        if (season.includes('Hạ')) return a.releaseDate?.includes('-06-') || a.releaseDate?.includes('-07-') || a.releaseDate?.includes('-08-')
        if (season.includes('Thu')) return a.releaseDate?.includes('-09-') || a.releaseDate?.includes('-10-') || a.releaseDate?.includes('-11-')
        return true
      })
    }

    // Filter by genres
    if (selectedGenres.length > 0) {
      result = result.filter(a =>
        selectedGenres.some(genre => a.genre.includes(genre))
      )
    }

    // Filter by year
    if (year !== 'all') {
      if (year === 'older') {
        result = result.filter(a => {
          const animeYear = parseInt(a.year?.toString() || '0')
          return animeYear < 1996
        })
      } else {
        result = result.filter(a => a.year?.toString() === year)
      }
    }

    // Sort
    if (sortBy === 'latest') {
      result.sort((a, b) => {
        const yearA = parseInt(a.year?.toString() || '0')
        const yearB = parseInt(b.year?.toString() || '0')
        return yearB - yearA
      })
    } else if (sortBy === 'a-z') {
      result.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === 'z-a') {
      result.sort((a, b) => b.title.localeCompare(a.title))
    } else if (sortBy === 'views') {
      result.sort((a, b) => {
        const viewsA = parseInt(a.views?.replace(/,/g, '') || '0')
        const viewsB = parseInt(b.views?.replace(/,/g, '') || '0')
        return viewsB - viewsA
      })
    } else if (sortBy === 'favorite') {
      result.sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [animeType, season, selectedGenres, year, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAnime.length / ITEMS_PER_PAGE)
  const paginatedAnime = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredAnime.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredAnime, currentPage])

  // Update URL when filters change
  const updateURL = () => {
    const params = new URLSearchParams()
    if (currentPage > 1) params.set('page', currentPage.toString())
    if (sortBy !== 'latest') params.set('sort', sortBy)
    if (animeType !== 'all') params.set('type', animeType)
    if (season !== 'all') params.set('season', season)
    if (year !== 'all') params.set('year', year)
    if (selectedGenres.length > 0) params.set('genres', selectedGenres.join(','))

    const queryString = params.toString()
    router.push(`/danh-sach${queryString ? `?${queryString}` : ''}`, { scroll: false })
  }

  // Handle filter apply
  const handleApplyFilters = () => {
    setCurrentPage(1)
    updateURL()
    setShowFilters(false)
  }

  // Handle genre toggle
  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    )
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      pages.push(totalPages)
    }

    return pages
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
              Danh sách Anime mới nhất
            </span>
          </nav>

          {/* Title and Filter Toggle */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wide">
              DANH SÁCH ANIME MỚI NHẤT
            </h1>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-2.5 px-5 rounded-lg transition-all shadow-lg"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Lọc Anime</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl border border-white/10 p-6 mb-6 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sort */}
                <div>
                  <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
                    <span className="w-1 h-4 bg-green-500 rounded"></span>
                    Sắp xếp theo
                  </h3>
                  <div className="space-y-2">
                    {[
                      { value: 'latest', label: 'Mới nhất' },
                      { value: 'a-z', label: 'Tên A-Z' },
                      { value: 'z-a', label: 'Tên Z-A' },
                      { value: 'views', label: 'Xem nhiều nhất' },
                      { value: 'favorite', label: 'Nhiều lượt thích' },
                    ].map(option => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="sort"
                          value={option.value}
                          checked={sortBy === option.value}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-4 h-4 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Type */}
                <div>
                  <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
                    <span className="w-1 h-4 bg-green-500 rounded"></span>
                    Loại
                  </h3>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'Tất cả' },
                      { value: 'movie', label: 'Anime lẻ(Movie/OVA)' },
                      { value: 'tv', label: 'Anime bộ (TV-Series)' },
                      { value: 'ongoing', label: 'Anime đang chiếu' },
                      { value: 'completed', label: 'Anime đã hoàn thành' },
                      { value: 'upcoming', label: 'Anime sắp chiếu' },
                    ].map(option => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="type"
                          value={option.value}
                          checked={animeType === option.value}
                          onChange={(e) => setAnimeType(e.target.value)}
                          className="w-4 h-4 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Season */}
                <div>
                  <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
                    <span className="w-1 h-4 bg-green-500 rounded"></span>
                    Mùa
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="season"
                        value="all"
                        checked={season === 'all'}
                        onChange={(e) => setSeason(e.target.value)}
                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                        Tất cả
                      </span>
                    </label>
                    {SEASONS.map(s => (
                      <label key={s} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="season"
                          value={s}
                          checked={season === s}
                          onChange={(e) => setSeason(e.target.value)}
                          className="w-4 h-4 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                          {s}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Genres */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
                  <span className="w-1 h-4 bg-green-500 rounded"></span>
                  Thể loại
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {GENRES.map(genre => (
                    <label key={genre} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedGenres.includes(genre)}
                        onChange={() => toggleGenre(genre)}
                        className="w-4 h-4 text-green-600 focus:ring-green-500 rounded"
                      />
                      <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                        {genre}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Year */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
                  <span className="w-1 h-4 bg-green-500 rounded"></span>
                  Năm phát hành
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="year"
                      value="all"
                      checked={year === 'all'}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                      Tất cả
                    </span>
                  </label>
                  {YEARS.map(y => (
                    <label key={y} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="year"
                        value={y.toString()}
                        checked={year === y.toString()}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                        {y}
                      </span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="year"
                      value="older"
                      checked={year === 'older'}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                      Cũ hơn
                    </span>
                  </label>
                </div>
              </div>

              {/* Apply Button */}
              <div className="mt-6 pt-6 border-t border-white/10 flex justify-center">
                <button
                  onClick={handleApplyFilters}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-12 rounded-lg transition-all shadow-lg uppercase tracking-wide"
                >
                  LỌC ANIME
                </button>
              </div>
            </div>
          )}

          {/* Info Banner */}
          <div className="bg-gradient-to-r from-pink-600/20 to-red-600/20 border border-pink-500/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-slate-200">
              <span className="font-bold text-pink-400">MỚI SỬ DỤNG</span> Sử dụng chức năng{' '}
              <span className="font-bold text-white">Lọc Anime</span> trên thanh công cụ để lọc những phim bạn đang cần xem chính xác nhất!
            </p>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-slate-400 text-sm">
              Trang <span className="text-white font-bold">{currentPage}</span> của{' '}
              <span className="text-white font-bold">{totalPages}</span>
            </p>
            <p className="text-slate-400 text-sm">
              Tìm thấy <span className="text-white font-bold">{filteredAnime.length}</span> anime
            </p>
          </div>

          {/* Anime Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 mb-8">
            {paginatedAnime.map(anime => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                {/* Previous */}
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-[#1e293b] hover:bg-[#334155] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page, index) => (
                  typeof page === 'number' ? (
                    <button
                      key={index}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        currentPage === page
                          ? 'bg-red-600 text-white'
                          : 'bg-[#1e293b] hover:bg-[#334155] text-slate-300'
                      }`}
                    >
                      {page}
                    </button>
                  ) : (
                    <span key={index} className="px-2 text-slate-500">
                      {page}
                    </span>
                  )
                ))}

                {/* Next */}
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 bg-[#1e293b] hover:bg-[#334155] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </button>

                {/* Last Page */}
                {currentPage < totalPages - 2 && (
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className="px-4 py-2 bg-[#1e293b] hover:bg-[#334155] text-slate-300 rounded-lg font-semibold transition-colors"
                  >
                    Trang cuối
                  </button>
                )}
              </div>

              <p className="text-slate-400 text-sm">
                Trang {currentPage} / {totalPages}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar (Right) - 28% width */}
        <div className="w-full lg:w-[28%] flex-shrink-0">
          <Sidebar />
        </div>
      </div>
    </main>
  )
}
