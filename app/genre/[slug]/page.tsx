// FILE: app/genre/[slug]/page.tsx
// Dynamic route cho THỂ LOẠI (Genres)

import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { animes } from '@/lib/data'
import { genres, getCategoryBySlug, getAnimeByCategory } from '@/lib/categories'

import HeroSlider from '@/components/HeroSlider'
import Section from '@/components/Section'
import AnimeGrid from '@/components/AnimeGrid'
import Sidebar from '@/components/Sidebar'
import Breadcrumb from '@/components/Breadcrumb'

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const genre = getCategoryBySlug(slug, 'genre')
  
  if (!genre) return { title: 'Not Found' }
  
  return {
    title: `Anime ${genre.label} | Anime VietSub`,
    description: `Xem anime thể loại ${genre.label} mới nhất, vietsub chất lượng cao`,
  }
}

export default async function GenrePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const genre = getCategoryBySlug(slug, 'genre')

  if (!genre) {
    notFound()
  }

  // Filter anime theo genre
  const filteredAnime = getAnimeByCategory(animes, genre)

  return (
    <main className="flex-grow w-full max-w-[1400px] mx-auto pt-[80px] pb-12 px-4 lg:px-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content (Left) - 72% width */}
        <div className="w-full lg:w-[72%] flex-shrink-0 min-w-0">
          <div className="flex flex-col min-h-screen">
            {/* Breadcrumb */}
            <Breadcrumb title={`Thể loại: ${genre.label}`} />

            {/* Hero Section */}
            <div className="mb-8">
              <HeroSlider />
            </div>

            {/* Genre Content */}
            <Section
              title={`THỂ LOẠI: ${genre.label.toUpperCase()}`}
              href={`/genre/${slug}`}
            >
              <AnimeGrid 
                items={filteredAnime.slice(0, 20)} 
                showTabs={false} 
                viewMoreLink={`/genre/${slug}`}
                maxCols={5}
              />
            </Section>
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

// Generate static params for all genres
export async function generateStaticParams() {
  return genres.map((genre) => ({
    slug: genre.slug,
  }))
}
