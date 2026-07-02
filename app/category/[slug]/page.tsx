// FILE: app/category/[slug]/page.tsx
// Dynamic route cho DẠNG ANIME categories

import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { animes } from '@/lib/data'
import { animeCategories, getCategoryBySlug, getAnimeByCategory } from '@/lib/categories'

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
  const category = getCategoryBySlug(slug, 'category')
  
  if (!category) return { title: 'Not Found' }
  
  return {
    title: `${category.label} | Anime VietSub`,
    description: `Xem anime ${category.label} mới nhất, vietsub chất lượng cao`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = getCategoryBySlug(slug, 'category')

  if (!category) {
    notFound()
  }

  // Filter anime theo category
  const filteredAnime = getAnimeByCategory(animes, category)

  return (
    <main className="flex-grow w-full max-w-[1400px] mx-auto pt-[80px] pb-12 px-4 lg:px-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content (Left) - 72% width */}
        <div className="w-full lg:w-[72%] flex-shrink-0 min-w-0">
          <div className="flex flex-col min-h-screen">
            {/* Breadcrumb */}
            <Breadcrumb title={category.label} />

            {/* Hero Section - Reuse HeroSlider với filtered data */}
            <div className="mb-8">
              <HeroSlider />
            </div>

            {/* Category Content */}
            <Section
              title={category.label.toUpperCase()}
              href={`/category/${slug}`}
            >
              <AnimeGrid 
                items={filteredAnime.slice(0, 20)} 
                showTabs={false} 
                viewMoreLink={`/category/${slug}`}
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

// Generate static params for all categories
export async function generateStaticParams() {
  return animeCategories.map((category) => ({
    slug: category.slug,
  }))
}
