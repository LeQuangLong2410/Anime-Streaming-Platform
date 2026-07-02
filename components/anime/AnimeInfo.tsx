import { Clock, Shield, Star, Languages, Tv, Calendar } from 'lucide-react'
import type { Anime } from '@/lib/data'

function Row({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon?: React.ReactNode
  label: string
  value: React.ReactNode
  highlight?: boolean
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-emerald-400">●</div>
      <div className="flex-1">
        <span className="font-semibold text-white">{label}:</span>{' '}
        <span className={`text-slate-200 ${highlight ? 'text-emerald-400 font-medium' : ''}`}>
          {value}
        </span>
      </div>
    </div>
  )
}

export default function AnimeInfo({ anime }: { anime: Anime }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Cột trái - Thông tin chính */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center gap-3">
          <div className="text-3xl">📋</div>
          <h2 className="text-2xl font-bold text-white">Thông tin phim</h2>
        </div>

        <div className="space-y-5 text-slate-300">
          {/* Tập mới */}
          <div className="flex items-start gap-3">
            <div className="mt-1 text-emerald-400">●</div>
            <div className="flex-1">
              <span className="font-semibold text-white">Tập mới:</span>{' '}
              <div className="inline-flex gap-2 mt-1">
                {[1161, 1160, 1159].map((ep, i) => (
                  <span
                    key={i}
                    className="bg-zinc-800 hover:bg-zinc-700 transition-colors px-4 py-1.5 rounded-lg font-mono text-sm font-medium"
                  >
                    {ep}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <Row label="Lịch chiếu" value="Chủ Nhật vào lúc 23 giờ 30 phút hàng tuần" />
          <Row label="Trạng thái" value="Phim đang chiếu / Cập Nhật Tập Mới VietSub" />
          <Row 
            label="Thể loại" 
            value={anime.genre?.join(', ') || 'Anime'} 
            highlight 
          />
          
          {/* Fix lỗi cspell */}
          <Row 
            label="Đạo diễn" 
            value="Uda Kounosuke, Ishitani Megumi" 
          />

          <Row label="Quốc gia" value="Nhật Bản" />
          <Row label="Số người theo dõi" value={anime.views || "233,182"} />
        </div>
      </div>

      {/* Cột phải - Chi tiết */}
      <div className="lg:col-span-5 space-y-5">
        <Row label="Thời lượng" value="1161/????" />
        
        <div className="flex items-center gap-3">
          <div className="text-emerald-400">●</div>
          <span className="font-semibold text-white">Chất lượng:</span>
          <span className="bg-red-600 text-white text-sm font-bold px-5 py-1 rounded">
            FHD
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-emerald-400">●</div>
          <span className="font-semibold text-white">Rating:</span>
          <span className="bg-red-600 text-white text-sm font-bold px-4 py-1 rounded">
            PG-13 - Teens 13 tuổi trở lên
          </span>
        </div>

        <Row label="Ngôn ngữ" value="VietSub" />
        <Row label="Studio" value={anime.studio || "Toei Animation"} />
        <Row label="Season" value={`Mùa Thu - ${anime.year}`} />
      </div>
    </div>
  )
}