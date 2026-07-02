'use client'

import { useMemo, useState, lazy, Suspense } from 'react'
import type { Anime } from '@/lib/data'

// Lazy load heavy tab components
const AnimeInfo = lazy(() => import('./AnimeInfo'))
const CharacterTab = lazy(() => import('./CharacterTab'))
const TrailerTab = lazy(() => import('./TrailerTab'))
const ImagesTab = lazy(() => import('./ImagesTab'))

type TabKey = 'info' | 'character' | 'trailer' | 'images'

type Tab = {
  key: TabKey
  label: string
  icon: string
}

// Loading skeleton
function TabSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-slate-700 rounded w-1/4"></div>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-6 bg-slate-700 rounded"></div>
        ))}
      </div>
    </div>
  )
}

export default function AnimeTabs({ anime }: { anime: Anime }) {
  const tabs: Tab[] = useMemo(
    () => [
      { key: 'info', label: 'Thông tin phim', icon: '📋' },
      { key: 'character', label: 'Nhân vật', icon: '👥' },
      { key: 'trailer', label: 'Trailer', icon: '🎬' },
      { key: 'images', label: 'Hình ảnh', icon: '🖼️' },
    ],
    []
  )

  const [active, setActive] = useState<TabKey>('info')

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f172a]/80 shadow-xl overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-1 p-4 border-b border-white/10 bg-black/40">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all border border-white/10 hover:border-white/30
              ${active === t.key
                ? 'bg-[#22c55e] text-black shadow-lg shadow-[#22c55e]/30'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content - Lazy loaded */}
      <div className="p-6">
        <Suspense fallback={<TabSkeleton />}>
          {active === 'info' && <AnimeInfo anime={anime} />}
          {active === 'character' && <CharacterTab anime={anime} />}
          {active === 'trailer' && <TrailerTab anime={anime} />}
          {active === 'images' && <ImagesTab anime={anime} />}
        </Suspense>
      </div>
    </div>
  )
}