import type { Anime } from '@/lib/data'

export default function AnimeEpisodeParts({ anime }: { anime: Anime }) {
  const parts = [
    { key: 'tv', label: 'Phần TV Series' },
    { key: 'm1', label: 'Movie 1' },
    { key: 'm2', label: 'Movie 2' },
  ]

  return (
    <section className="rounded-2xl border border-white/10 bg-[#0f172a]/60 shadow-xl p-5">
      <h2 className="text-lg font-black mb-4">Phần</h2>

      <div className="flex flex-wrap gap-3">
        {parts.map((p, idx) => (
          <button
            key={p.key}
            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all hover:border-[#8b5cf6]/70 hover:text-white hover:bg-white/5 ${
              idx === 0
                ? 'border-[#8b5cf6]/60 bg-[#8b5cf6]/20 text-white'
                : 'border-white/10 bg-white/5 text-slate-200'
            }`}
            onClick={() => {
              // placeholder
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-4 text-xs text-slate-400">
        Anime type hiện có thể được mở rộng qua data (type / parts) để map đúng TV Series/Movie.
      </div>
    </section>
  )
}

