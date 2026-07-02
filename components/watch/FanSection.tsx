'use client'

import { Users } from 'lucide-react'
import Image from 'next/image'

const sampleFans = [
  { id: 1, name: 'Nao0711', avatar: '/images/anime/banner/user1.jpg' },
  { id: 2, name: 'ANIME_53', avatar: '/images/anime/poster/logoz.png' },
  { id: 3, name: 'Hiếu Hoàng', avatar: '/images/anime/poster/logoz.png' },
  { id: 4, name: 'God_Wibu', avatar: '/images/anime/poster/logoz.png' },
]

export default function FanSection() {
  return (
    <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-lg border border-white/10 p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-red-600 rounded-lg">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            Fan cùng phim này: 
            <span className="text-red-500">4 người</span>
          </h3>
          <p className="text-slate-400 text-xs">
            💬 Bình luận hợp lệ ≥ 15 + theo dõi phim — Fan cùng
          </p>
        </div>
      </div>

      {/* Fan Avatars */}
      <div className="flex items-center gap-3 flex-wrap">
        {sampleFans.map(fan => (
          <div 
            key={fan.id}
            className="flex flex-col items-center gap-1.5 group cursor-pointer"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-red-500 transition-all">
              <Image
                src={fan.avatar}
                alt={fan.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs text-slate-400 group-hover:text-white transition-colors max-w-[60px] truncate">
              {fan.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
