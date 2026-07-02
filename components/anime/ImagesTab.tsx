// FILE: components/anime/ImagesTab.tsx
// Images tab component - lazy loaded

import Image from 'next/image'
import type { Anime } from '@/lib/data'

export default function ImagesTab({ anime }: { anime: Anime }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">🖼️ Hình ảnh</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Poster lớn */}
        {anime.poster && (
          <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/10">
            <Image
              src={anime.poster}
              alt={anime.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
        )}
        {/* Banner */}
        {anime.banner && (
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
            <Image
              src={anime.banner}
              alt={`${anime.title} banner`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  )
}
