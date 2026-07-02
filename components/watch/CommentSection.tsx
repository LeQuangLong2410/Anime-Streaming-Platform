'use client'

import { useState } from 'react'
import { MessageSquare, ThumbsUp, MoreVertical } from 'lucide-react'
import Image from 'next/image'

const sampleComments = [
  {
    id: 1,
    user: {
      name: 'Tín quân trọng',
      avatar: '/images/anime/poster/logoz.png',
      badges: ['Câu Mys0', 'Gấn', 'Rõa'],
      level: 'Cao thủ'
    },
    content: 'AnimeVietHub hoàn toàn bất thành, đánh trẻ lại kiếm kính phí duy trì hoạt động. Vì vậy, quảng cáo sẽ được dặt trả lại. 😊',
    timestamp: '48 cách sức',
    likes: 1450,
    replies: 17,
    isPinned: true
  },
  {
    id: 2,
    user: {
      name: 'Phương Mi',
      avatar: '/images/anime/poster/logoz.png',
      badges: ['Mod', 'Legend'],
      level: 'Admin'
    },
    content: 'Tập mới mỗi Chủ Nhật hằng tuần nhé, tầm 23h - 23h30 sẽ có vietsub!!!',
    timestamp: '1 tháng trước',
    likes: 21,
    replies: 0,
    isPinned: false
  }
]

export default function CommentSection() {
  const [sortBy, setSortBy] = useState('newest')

  return (
    <div id="comment-section" className="bg-[#1e293b] rounded-lg border border-white/10 p-5 scroll-mt-24">{/* scroll-mt-24 for header offset */}
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-bold text-xl flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-red-600" />
          Bình luận ({sampleComments.length + 360})
        </h3>
        
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:border-red-600/50"
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
          <option value="popular">Phổ biến</option>
        </select>
      </div>

      {/* Login Notice */}
      <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4 mb-6">
        <p className="text-red-400 text-sm text-center">
          <span className="font-semibold">Đăng nhập</span> để tham gia bình luận
        </p>
      </div>

      {/* Comment List */}
      <div className="space-y-4">
        {sampleComments.map(comment => (
          <div 
            key={comment.id}
            className={`
              bg-white/5 rounded-lg p-4 border transition-all
              ${comment.isPinned 
                ? 'border-red-600/50 bg-red-600/5' 
                : 'border-white/10'
              }
            `}
          >
            {/* User Info */}
            <div className="flex items-start gap-3 mb-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/20">
                <Image
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-white font-semibold">
                    {comment.user.name}
                  </span>
                  
                  {comment.user.badges.map((badge, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 bg-red-600 text-white text-[10px] rounded font-bold"
                    >
                      {badge}
                    </span>
                  ))}

                  {comment.isPinned && (
                    <span className="text-red-500 text-xs font-semibold">
                      🔴 Đã ghim bởi Admin
                    </span>
                  )}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-2">
                  {comment.content}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>{comment.timestamp}</span>
                  
                  <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{comment.likes}</span>
                  </button>

                  {comment.replies > 0 && (
                    <button className="hover:text-white transition-colors">
                      {comment.replies} trả lời
                    </button>
                  )}
                </div>
              </div>

              <button className="text-slate-400 hover:text-white transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <button className="w-full mt-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-semibold text-sm transition-all">
        🔴 200 trả lời
      </button>
    </div>
  )
}
