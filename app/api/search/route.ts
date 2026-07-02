import { NextRequest, NextResponse } from 'next/server'
import { animes } from '@/lib/data' // Import data từ file data của bạn

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')?.trim().toLowerCase()

    // Nếu không có query, return empty
    if (!query || query.length < 1) {
      return NextResponse.json([])
    }

    // Search logic: match Vietnamese, English, Japanese names
    const results = animes
      .filter((anime) => {
        const titleMatch = anime.title.toLowerCase().includes(query)
        const enMatch = anime.engTitle?.toLowerCase().includes(query)
        const jpMatch = anime.jpTitle?.toLowerCase().includes(query)
        
        return titleMatch || enMatch || jpMatch
      })
      .slice(0, 8) // Limit to 8 results
      .map((anime) => ({
        id: anime.id,
        title: anime.title,
        engTitle: anime.engTitle,
        poster: anime.poster,
        quality: anime.quality,
        slug: anime.slug,
        rating: anime.rating,
        episode: anime.episode,
      }))

    return NextResponse.json(results)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json([], { status: 500 })
  }
}