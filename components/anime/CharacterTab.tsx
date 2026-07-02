// FILE: components/anime/CharacterTab.tsx
// Character tab component - lazy loaded

import type { Anime } from '@/lib/data'

export default function CharacterTab({ anime }: { anime: Anime }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        👥 Nhân vật chính
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {(anime.cast ?? []).map((name, index) => (
          <div key={index} className="flex flex-col items-center group">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border-2 border-white/20 group-hover:border-[#22c55e] transition-colors overflow-hidden">
              <div className="text-5xl opacity-40">👤</div>
            </div>
            <p className="mt-3 text-center text-slate-200 font-medium text-sm">
              {name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
