'use client'

import Link from 'next/link'
import { 
  MessageSquare, 
  Lightbulb, 
  Eye, 
  Maximize, 
  Camera, 
  Download,
  ChevronRight,
  Loader2,
  EyeOff
} from 'lucide-react'
import { Anime } from '@/lib/data'

interface PlayerActionBarProps {
  anime: Anime
  currentEpisode: number
  totalEpisodes: number
  isFollowing: boolean
  isFollowLoading: boolean
  isCinemaMode: boolean
  isCapturing: boolean
  onToggleFollow: () => void
  onScrollToComments: () => void
  onToggleCinemaMode: () => void
  onToggleFullscreen: () => void
  onCaptureScreenshot: () => void
}

export default function PlayerActionBar({ 
  anime, 
  currentEpisode, 
  totalEpisodes,
  isFollowing,
  isFollowLoading,
  isCinemaMode,
  isCapturing,
  onToggleFollow,
  onScrollToComments,
  onToggleCinemaMode,
  onToggleFullscreen,
  onCaptureScreenshot
}: PlayerActionBarProps) {
  const hasNextEpisode = currentEpisode < totalEpisodes

  return (
    <div className="bg-[#1e293b] rounded-lg border border-white/10 p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {hasNextEpisode && (
            <Link
              href={`/watch/${anime.slug}/episode/${currentEpisode + 1}`}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-lg transition-all"
            >
              <span>Tập tiếp</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
          
          <button 
            onClick={onScrollToComments}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-all border border-white/10"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Bình luận</span>
          </button>

          <button 
            onClick={onToggleCinemaMode}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all border ${
              isCinemaMode 
                ? 'bg-yellow-600/20 border-yellow-600/50 text-yellow-400' 
                : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span className="hidden sm:inline">
              {isCinemaMode ? 'Bật đèn' : 'Tắt đèn'}
            </span>
          </button>

          <button 
            onClick={onToggleFollow}
            disabled={isFollowLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all border disabled:opacity-50 ${
              isFollowing 
                ? 'bg-green-600/20 border-green-600/50 text-green-400' 
                : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
            }`}
          >
            {isFollowLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isFollowing ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">
              {isFollowing ? 'Đã theo dõi' : 'Theo dõi'}
            </span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleFullscreen}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white p-2 rounded-lg transition-all border border-white/10"
            title="Phóng to"
          >
            <Maximize className="w-4 h-4" />
          </button>

          <button 
            onClick={onCaptureScreenshot}
            disabled={isCapturing}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white p-2 rounded-lg transition-all border border-white/10 disabled:opacity-50"
            title="Chụp ảnh"
          >
            {isCapturing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Camera className="w-4 h-4" />
            )}
          </button>

          <button 
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white p-2 rounded-lg transition-all border border-white/10"
            title="Tải về"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
