// FILE: app/season/[slug]/page.tsx
// Dynamic route cho SEASON

import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { animes } from '@/lib/data'
import { seasons, getCategoryBySlug, getAnimeByCategory } from '@/lib/categories'

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
  const season = getCategoryBySlug(slug, 'season')
  
  if (!season) return { title: 'Not Found' }
  
  return {
    title: `Anime ${season.label} | Anime VietSub`,
    description: `Xem anime ${season.label} mới nhất, vietsub chất lượng cao`,
  }
}

export default async function SeasonPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const season = getCategoryBySlug(slug, 'season')

  if (!season) {
    notFound()
  }

  // Filter anime theo season
  const filteredAnime = getAnimeByCategory(animes, season)

  return (
    <main className="flex-grow w-full max-w-[1400px] mx-auto pt-[80px] pb-12 px-4 lg:px-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content (Left) - 72% width */}
        <div className="w-full lg:w-[72%] flex-shrink-0 min-w-0">
          <div className="flex flex-col min-h-screen">
            {/* Breadcrumb */}
            <Breadcrumb title={season.label} />

            {/* Hero Section */}
            <div className="mb-8">
              <HeroSlider />
            </div>

            {/* Season Content */}
            <Section
              title={season.label.toUpperCase()}
              href={`/season/${slug}`}
            >
              <AnimeGrid 
                items={filteredAnime.slice(0, 20)} 
                showTabs={false} 
                viewMoreLink={`/season/${slug}`}
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

// Generate static params for all seasons
export async function generateStaticParams() {
  return seasons.map((season) => ({
    slug: season.slug,
  }))
}
