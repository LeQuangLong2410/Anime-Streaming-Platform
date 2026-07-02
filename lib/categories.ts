export interface Category {
  slug: string
  label: string
  type: 'category' | 'genre' | 'season' | 'top'
}

// DẠNG ANIME categories
export const animeCategories: Category[] = [
  { slug: 'tv-series', label: 'TV/Series', type: 'category' },
  { slug: 'movies-ova', label: 'Movies/OVA', type: 'category' },
  { slug: 'hh-trung-quoc', label: 'HH Trung Quốc', type: 'category' },
  { slug: 'sap-chieu', label: 'Anime Sắp Chiếu', type: 'category' },
  { slug: 'tron-bo', label: 'Anime Trọn Bộ', type: 'category' },
]

// TOP ANIME categories
export const topCategories: Category[] = [
  { slug: 'theo-ngay', label: 'Theo Ngày', type: 'top' },
  { slug: 'theo-thang', label: 'Theo Tháng', type: 'top' },
  { slug: 'theo-nam', label: 'Theo Năm', type: 'top' },
  { slug: 'theo-mua', label: 'Theo Mùa', type: 'top' },
  { slug: 'yeu-thich', label: 'Yêu Thích', type: 'top' },
]

// THỂ LOẠI (Genres)
export const genres: Category[] = [
  { slug: 'action', label: 'Action', type: 'genre' },
  { slug: 'romance', label: 'Romance', type: 'genre' },
  { slug: 'fantasy', label: 'Fantasy', type: 'genre' },
  { slug: 'comedy', label: 'Comedy', type: 'genre' },
  { slug: 'drama', label: 'Drama', type: 'genre' },
  { slug: 'cartoon', label: 'Cartoon', type: 'genre' },
  { slug: 'ecchi', label: 'Ecchi', type: 'genre' },
  { slug: 'harem', label: 'Harem', type: 'genre' },
  { slug: 'demons', label: 'Demons', type: 'genre' },
  { slug: 'horror', label: 'Horror', type: 'genre' },
  { slug: 'shounen', label: 'Shounen', type: 'genre' },
  { slug: 'yuri', label: 'Yuri', type: 'genre' },
  { slug: 'sports', label: 'Sports', type: 'genre' },
  { slug: 'historical', label: 'Historical', type: 'genre' },
  { slug: 'isekai', label: 'Isekai', type: 'genre' },
]

// SEASON
export const seasons: Category[] = [
  { slug: 'dong-2026', label: 'Mùa Đông 2026', type: 'season' },
  { slug: 'xuan-2026', label: 'Mùa Xuân 2026', type: 'season' },
  { slug: 'ha-2026', label: 'Mùa Hạ 2026', type: 'season' },
  { slug: 'thu-2026', label: 'Mùa Thu 2026', type: 'season' },
  { slug: 'dong-2025', label: 'Mùa Đông 2025', type: 'season' },
  { slug: 'xuan-2025', label: 'Mùa Xuân 2025', type: 'season' },
  { slug: 'ha-2025', label: 'Mùa Hạ 2025', type: 'season' },
  { slug: 'thu-2025', label: 'Mùa Thu 2025', type: 'season' },
  { slug: 'dong-2024', label: 'Mùa Đông 2024', type: 'season' },
  { slug: 'xuan-2024', label: 'Mùa Xuân 2024', type: 'season' },
  { slug: 'ha-2024', label: 'Mùa Hạ 2024', type: 'season' },
  { slug: 'thu-2024', label: 'Mùa Thu 2024', type: 'season' },
  { slug: 'dong-2023', label: 'Mùa Đông 2023', type: 'season' },
  { slug: 'xuan-2023', label: 'Mùa Xuân 2023', type: 'season' },
  { slug: 'ha-2023', label: 'Mùa Hạ 2023', type: 'season' },
]

// Helper function để lấy category info từ slug
export function getCategoryBySlug(slug: string, type: Category['type']): Category | undefined {
  const allCategories = [...animeCategories, ...topCategories, ...genres, ...seasons]
  return allCategories.find(cat => cat.slug === slug && cat.type === type)
}

// Helper function để filter anime theo category
export function getAnimeByCategory(animes: any[], category: Category) {
  switch (category.type) {
    case 'category':
      if (category.slug === 'tv-series') {
        return animes.filter(a => a.type === 'bo')
      }
      if (category.slug === 'movies-ova') {
        return animes.filter(a => a.type === 'le' || a.genre.includes('Movie'))
      }
      if (category.slug === 'hh-trung-quoc') {
        return animes.filter(a => a.type === 'hh' || a.genre.includes('HH Trung Quốc'))
      }
      if (category.slug === 'sap-chieu') {
        return animes.filter(a => a.releaseDate && new Date(a.releaseDate) > new Date())
      }
      if (category.slug === 'tron-bo') {
        return animes.filter(a => a.episode && a.episode.includes('Full'))
      }
      return animes

    case 'genre':
      return animes.filter(a => 
        a.genre.some((g: string) => g.toLowerCase() === category.label.toLowerCase())
      )

    case 'season':
      // Extract year and season from slug (e.g., 'xuan-2026' -> 2026, 'xuan')
      const [seasonName, year] = category.slug.split('-')
      return animes.filter(a => {
        const animeYear = a.year?.toString() || a.releaseDate?.split('-')[0]
        return animeYear === year
      })

    case 'top':
      // Sort by rating/views depending on top type
      const sorted = [...animes].sort((a, b) => {
        if (category.slug === 'yeu-thich') {
          return (b.rating || 0) - (a.rating || 0)
        }
        // Default: sort by views
        const viewsA = parseInt(a.views?.replace(/,/g, '') || '0')
        const viewsB = parseInt(b.views?.replace(/,/g, '') || '0')
        return viewsB - viewsA
      })
      return sorted.slice(0, 20) // Top 20

    default:
      return animes
  }
}
