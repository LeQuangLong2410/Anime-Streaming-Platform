// FILE: app/top/[slug]/page.tsx
// Dynamic route cho TOP ANIME

import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { animes } from '@/lib/data'
import { topCategories, getCategoryBySlug, getAnimeByCategory } from '@/lib/categories'

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
  const topCategory = getCategoryBySlug(slug, 'top')
  
  if (!topCategory) return { title: 'Not Found' }
  
  return {
    title: `Top Anime ${topCategory.label} | Anime VietSub`,
    description: `Xem top anime ${topCategory.label} được yêu thích nhất`,
  }
}

export default async function TopPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const topCategory = getCategoryBySlug(slug, 'top')

  if (!topCategory) {
    notFound()
  }

  // Filter và sort anime theo top category
  const filteredAnime = getAnimeByCategory(animes, topCategory)

  return (
    <main className="flex-grow w-full max-w-[1400px] mx-auto pt-[80px] pb-12 px-4 lg:px-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content (Left) - 72% width */}
        <div className="w-full lg:w-[72%] flex-shrink-0 min-w-0">
          <div className="flex flex-col min-h-screen">
            {/* Breadcrumb */}
            <Breadcrumb title={`Top Anime ${topCategory.label}`} />

            {/* Hero Section */}
            <div className="mb-8">
              <HeroSlider />
            </div>

            {/* Top Content */}
            <Section
              title={`TOP ANIME ${topCategory.label.toUpperCase()}`}
              href={`/top/${slug}`}
            >
              <AnimeGrid 
                items={filteredAnime} 
                showTabs={false} 
                viewMoreLink={`/top/${slug}`}
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

// Generate static params for all top categories
export async function generateStaticParams() {
  return topCategories.map((category) => ({
    slug: category.slug,
  }))
}
