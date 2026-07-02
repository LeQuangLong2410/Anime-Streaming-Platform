// FILE: app/danh-sach/FilterPanel.tsx
// Lazy-loaded filter panel component

'use client'

// Genres list
const GENRES = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance',
  'School', 'Sci-Fi', 'Sports', 'Supernatural', 'Slice of Life', 'Mystery',
  'Thriller', 'Historical', 'Mecha', 'Music', 'Psychological', 'Shounen',
  'Shoujo', 'Seinen', 'Josei', 'Isekai', 'Ecchi', 'Harem', 'Demons', 'Vampire',
  'Yuri', 'Yaoi', 'Kids', 'Martial Arts', 'Military', 'Parody', 'Police',
  'Samurai', 'Space', 'Super Power', 'Game', 'Cars', 'Dementia'
]

// Years list (dynamic)
const YEARS = Array.from({ length: 30 }, (_, i) => 2026 - i)

// Seasons
const SEASONS = ['Đông(Winter)', 'Xuân(Spring)', 'Hạ(Summer)', 'Thu(Autumn)']

interface FilterPanelProps {
  sortBy: string
  setSortBy: (value: string) => void
  animeType: string
  setAnimeType: (value: string) => void
  season: string
  setSeason: (value: string) => void
  selectedGenres: string[]
  toggleGenre: (genre: string) => void
  year: string
  setYear: (value: string) => void
  onApply: () => void
}

export default function FilterPanel({
  sortBy,
  setSortBy,
  animeType,
  setAnimeType,
  season,
  setSeason,
  selectedGenres,
  toggleGenre,
  year,
  setYear,
  onApply,
}: FilterPanelProps) {
  return (
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
        </div>
      </div>

      {/* Apply Button */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <button
          onClick={onApply}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-green-600/30"
        >
          ÁP DỤNG BỘ LỌC
        </button>
      </div>
    </div>
  )
}
