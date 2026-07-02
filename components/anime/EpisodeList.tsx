import type { Anime } from '@/lib/data'

export default function EpisodeList({ anime }: { anime: Anime }) {
  const episodes = [
    { key: 'ep-new', label: 'Tập mới', value: anime.episode },
    { key: 'ep-1', label: 'Tập 1', value: 'Ep 1' },
    { key: 'ep-2', label: 'Tập 2', value: 'Ep 2' },
    { key: 'ep-3', label: 'Tập 3', value: 'Ep 3' },
    { key: 'ep-4', label: 'Tập 4', value: 'Ep 4' },
  ]

  return (
    <section className="rounded-2xl border border-white/10 bg-[#0f172a]/60 shadow-xl p-5">
      <h2 className="text-lg font-black mb-4">Tập mới • Danh sách tập</h2>

      <div className="flex flex-wrap gap-3">
        {episodes.map((e, idx) => (
          <button
            key={e.key}
            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all hover:border-[#8b5cf6]/70 hover:text-white hover:bg-white/5 ${
              idx === 0
                ? 'border-[#8b5cf6]/60 bg-[#8b5cf6]/20 text-white'
                : 'border-white/10 bg-white/5 text-slate-200'
            }`}
            onClick={() => {
              // Placeholder: after wiring player, this will navigate / play episode
            }}
          >
            {e.value}
          </button>
        ))}
      </div>

      <div className="mt-4 text-xs text-slate-400">
        Danh sách tập hiện là placeholder. Khi tích hợp API episode, component sẽ nhận danh sách từ data.
      </div>
    </section>
  )
}

