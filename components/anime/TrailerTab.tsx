// FILE: components/anime/TrailerTab.tsx
// Trailer tab component - lazy loaded

import type { Anime } from '@/lib/data'

export default function TrailerTab({ anime }: { anime: Anime }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">🎬 Trailer</h2>
      <div className="aspect-video bg-black rounded-2xl flex items-center justify-center border border-white/10">
        <div className="text-center">
          <div className="text-6xl mb-4">▶️</div>
          <p className="text-slate-400">Trailer sẽ được nhúng sau</p>
        </div>
      </div>
    </div>
  )
}
