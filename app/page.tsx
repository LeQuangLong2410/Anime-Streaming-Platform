'use client'

import { useState, useMemo, memo, useCallback } from 'react'
import HeroSlider from '@/components/HeroSlider'
import Section from '@/components/Section'
import AnimeGrid from '@/components/AnimeGrid'
import SapChieuGrid from '@/components/SapChieuGrid'
import Sidebar from '@/components/Sidebar'
import LazySection from '@/components/LazySection'
import { trendingAnime, popularAnime, latestAnime, animes } from '@/lib/data'

// Helper function to shuffle an array
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Memoized Section Components
const LatestSection = memo(({ filter, onTabClick, tabs, filteredData }: any) => (
  <Section
    title="MỚI CẬP NHẬT"
    href="/danh-sach"
    tabs={tabs}
    onTabClick={onTabClick}
  >
    <AnimeGrid items={filteredData} showTabs={false} viewMoreLink="/danh-sach" maxCols={5} priorityCount={5} />
  </Section>
))

const TrendingSection = memo(({ filter, onTabClick, tabs, filteredData }: any) => (
  <Section
    title="ĐỀ CỬ"
    href="/danh-sach"
    tabs={tabs}
    onTabClick={onTabClick}
  >
    <AnimeGrid items={filteredData} showTabs={false} viewMoreLink="/danh-sach" maxCols={5} priorityCount={0} />
  </Section>
))

const PopularSection = memo(({ filter, onTabClick, tabs, filteredData }: any) => (
  <Section
    title="SẮP CHIẾU"
    href="/danh-sach"
    tabs={tabs}
    onTabClick={onTabClick}
  >
    <SapChieuGrid items={filteredData} viewMoreLink="/danh-sach" />
  </Section>
))

LatestSection.displayName = 'LatestSection'
TrendingSection.displayName = 'TrendingSection'
PopularSection.displayName = 'PopularSection'

export default function Home() {
  // --- MỚI CẬP NHẬT STATE ---
  const [latestFilter, setLatestFilter] = useState('Tất Cả')
  const [latestSeed, setLatestSeed] = useState(0)

  // --- ĐỀ CỬ STATE ---
  const [trendingFilter, setTrendingFilter] = useState('Xem nhiều hôm nay')
  const [trendingSeed, setTrendingSeed] = useState(0)

  // --- SẮP CHIẾU STATE ---
  const [popularFilter, setPopularFilter] = useState('Tất Cả')
  const [popularSeed, setPopularSeed] = useState(0)

  // --- MỚI CẬP NHẬT TABS DEFINITION ---
  const latestTabs = useMemo(() => {
    const labels = ['Tất Cả', 'Mùa Xuân - 2026', 'Anime Bộ', 'Anime Lẻ', 'HH Trung Quốc']
    return labels.map(label => ({
      label,
      active: latestFilter === label
    }))
  }, [latestFilter])

  // --- ĐỀ CỬ TABS DEFINITION ---
  const trendingTabs = useMemo(() => {
    const labels = ['Xem nhiều hôm nay', 'Xem nhiều trong mùa', 'Yêu Thích', 'Tháng']
    return labels.map(label => ({
      label,
      active: trendingFilter === label
    }))
  }, [trendingFilter])

  // --- SẮP CHIẾU TABS DEFINITION ---
  const popularTabs = useMemo(() => {
    const labels = ['Tất Cả', 'Mùa Xuân - 2026', 'Anime Bộ', 'Anime Lẻ', 'HH Trung Quốc']
    return labels.map(label => ({
      label,
      active: popularFilter === label
    }))
  }, [popularFilter])

  // --- MỚI CẬP NHẬT FILTER LOGIC ---
  const filteredLatest = useMemo(() => {
    if (latestFilter === 'Tất Cả') {
      return latestAnime.slice(0, 10)
    }

    let base = [...animes]
    if (latestFilter === 'Mùa Xuân - 2026') {
      base = animes.filter(
        a => a.year === 2026 || a.year === '2026' || a.releaseDate?.includes('2026') || a.type === 'xuan'
      )
    } else if (latestFilter === 'Anime Bộ') {
      base = animes.filter(a => a.type === 'bo' || a.id.startsWith('l') || a.id.startsWith('t'))
    } else if (latestFilter === 'Anime Lẻ') {
      base = animes.filter(
        a => a.type === 'le' || a.genre.includes('Movie') || a.description.toLowerCase().includes('movie')
      )
    } else if (latestFilter === 'HH Trung Quốc') {
      base = animes.filter(
        a => a.type === 'hh' || a.title.toLowerCase().includes('trung quốc') || a.genre.includes('HH Trung Quốc')
      )
    }

    // Pad with random items from latestAnime if we have less than 10 items
    if (base.length < 10) {
      const remaining = latestAnime.filter(a => !base.find(b => b.id === a.id))
      base = [...base, ...remaining]
    }

    return shuffle(base).slice(0, 10)
  }, [latestFilter, latestSeed])

  // --- ĐỀ CỬ FILTER LOGIC ---
  const filteredTrending = useMemo(() => {
    if (trendingFilter === 'Xem nhiều hôm nay') {
      return trendingAnime.slice(0, 10)
    }

    let base = [...trendingAnime]
    if (trendingFilter === 'Xem nhiều trong mùa') {
      base = [...trendingAnime]
    } else if (trendingFilter === 'Yêu Thích') {
      base = animes.filter(a => a.rating >= 4.8)
    } else if (trendingFilter === 'Tháng') {
      base = [...trendingAnime, ...latestAnime.slice(0, 5)]
    }

    if (base.length < 10) {
      base = [...base, ...trendingAnime]
    }

    return shuffle(base).slice(0, 10)
  }, [trendingFilter, trendingSeed])

  // --- SẮP CHIẾU FILTER LOGIC ---
  const filteredPopular = useMemo(() => {
    if (popularFilter === 'Tất Cả') {
      return popularAnime.slice(0, 10)
    }

    let base = [...popularAnime]
    if (popularFilter === 'Mùa Xuân - 2026') {
      base = popularAnime.filter(
        a => a.year === 2026 || a.year === '2026' || a.releaseDate?.includes('2026')
      )
      if (base.length < 10) {
        const globalMatches = animes.filter(
          a => (a.year === 2026 || a.year === '2026' || a.releaseDate?.includes('2026')) && !base.find(b => b.id === a.id)
        )
        base = [...base, ...globalMatches]
      }
    } else if (popularFilter === 'Anime Bộ') {
      base = popularAnime.filter(a => a.type === 'bo')
      if (base.length < 10) {
        const globalMatches = animes.filter(a => a.type === 'bo' && !base.find(b => b.id === a.id))
        base = [...base, ...globalMatches]
      }
    } else if (popularFilter === 'Anime Lẻ') {
      base = popularAnime.filter(a => a.type === 'le')
      if (base.length < 10) {
        const globalMatches = animes.filter(a => (a.type === 'le' || a.genre.includes('Movie')) && !base.find(b => b.id === a.id))
        base = [...base, ...globalMatches]
      }
    } else if (popularFilter === 'HH Trung Quốc') {
      base = popularAnime.filter(a => a.type === 'hh')
      if (base.length < 10) {
        const globalMatches = animes.filter(a => (a.type === 'hh' || a.title.toLowerCase().includes('trung quốc')) && !base.find(b => b.id === a.id))
        base = [...base, ...globalMatches]
      }
    }

    // Fallback padding if we still have less than 10 items
    if (base.length < 10) {
      const remaining = popularAnime.filter(a => !base.find(b => b.id === a.id))
      base = [...base, ...remaining]
    }

    return shuffle(base).slice(0, 10)
  }, [popularFilter, popularSeed])

  const handleLatestTabClick = useCallback((label: string) => {
    setLatestFilter(label)
    setLatestSeed(s => s + 1)
  }, [])

  const handleTrendingTabClick = useCallback((label: string) => {
    setTrendingFilter(label)
    setTrendingSeed(s => s + 1)
  }, [])

  const handlePopularTabClick = useCallback((label: string) => {
    setPopularFilter(label)
    setPopularSeed(s => s + 1)
  }, [])

  return (
    <main className="flex-grow w-full max-w-[1400px] mx-auto pt-[80px] pb-12 px-4 lg:px-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content (Left) - Homepage sections */}
        <div className="w-full lg:w-[72%] flex-shrink-0 min-w-0">
          <div className="flex flex-col min-h-screen">
            {/* Hero Slider - Always visible, above the fold */}
            <HeroSlider />

            {/* First Section - Render immediately (above the fold) */}
            <LatestSection 
              filter={latestFilter}
              onTabClick={handleLatestTabClick}
              tabs={latestTabs}
              filteredData={filteredLatest}
            />

            {/* Second Section - Lazy load when scrolling */}
            <LazySection>
              <TrendingSection 
                filter={trendingFilter}
                onTabClick={handleTrendingTabClick}
                tabs={trendingTabs}
                filteredData={filteredTrending}
              />
            </LazySection>

            {/* Third Section - Lazy load when scrolling */}
            <LazySection>
              <PopularSection 
                filter={popularFilter}
                onTabClick={handlePopularTabClick}
                tabs={popularTabs}
                filteredData={filteredPopular}
              />
            </LazySection>
          </div>
        </div>

        {/* Sidebar (Right) - Only for Homepage */}
        <div className="w-full lg:w-[28%] flex-shrink-0">
          <Sidebar />
        </div>
      </div>
    </main>
  )
}
export const dynamic = 'force-static' 
export const revalidate = 3600         