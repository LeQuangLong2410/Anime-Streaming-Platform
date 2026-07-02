'use client'

import { useRef } from 'react'
import { Anime } from '@/lib/data'
import { useUser } from '@clerk/nextjs'
import {
  useServerSelection,
  useFollow,
  useCinemaMode,
  useFullscreen,
  useScreenshot,
  useScrollToComments,
} from '@/hooks/useWatchFeatures'

import VideoPlayer from './VideoPlayer'
import PlayerActionBar from './PlayerActionBar'
import ServerSelection from './ServerSelection'

interface EpisodeWatchClientProps {
  anime: Anime
  currentEpisode: number
  totalEpisodes: number
}

export default function EpisodeWatchClient({
  anime,
  currentEpisode,
  totalEpisodes,
}: EpisodeWatchClientProps) {
  const { user } = useUser()
  
  // Refs
  const videoPlayerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Custom hooks
  const { selectedServer, changeServer, isLoading: isServerLoading } = useServerSelection(
    anime.slug,
    currentEpisode
  )
  
  const { isFollowing, toggleFollow, isLoading: isFollowLoading } = useFollow(
    anime.id,
    user?.id
  )
  
  const { isCinemaMode, toggleCinemaMode } = useCinemaMode()
  const { toggleFullscreen } = useFullscreen(videoPlayerRef)
  const { captureScreenshot, isCapturing } = useScreenshot(videoRef, anime, currentEpisode)
  const { scrollToComments } = useScrollToComments()

  return (
    <>
      {/* Cinema Mode Overlay */}
      {isCinemaMode && (
        <div 
          className="fixed inset-0 bg-black/90 z-30 pointer-events-none transition-opacity duration-500"
          style={{ 
            maskImage: 'radial-gradient(ellipse at center, transparent 40%, black 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 40%, black 70%)'
          }}
        />
      )}

      {/* Video Player Section */}
      <div className={`relative ${isCinemaMode ? 'z-40' : ''}`}>
        <VideoPlayer
          anime={anime}
          currentEpisode={currentEpisode}
          selectedServer={selectedServer}
          isServerLoading={isServerLoading}
          videoPlayerRef={videoPlayerRef}
          videoRef={videoRef}
        />
      </div>

      {/* Player Action Bar */}
      <div className={`relative ${isCinemaMode ? 'z-40' : ''}`}>
        <PlayerActionBar
          anime={anime}
          currentEpisode={currentEpisode}
          totalEpisodes={totalEpisodes}
          isFollowing={isFollowing}
          isFollowLoading={isFollowLoading}
          isCinemaMode={isCinemaMode}
          isCapturing={isCapturing}
          onToggleFollow={toggleFollow}
          onScrollToComments={scrollToComments}
          onToggleCinemaMode={toggleCinemaMode}
          onToggleFullscreen={toggleFullscreen}
          onCaptureScreenshot={captureScreenshot}
        />
      </div>

      {/* Server Selection */}
      <div className={`relative ${isCinemaMode ? 'z-40' : ''}`}>
        <ServerSelection
          selectedServer={selectedServer}
          onServerChange={changeServer}
          isLoading={isServerLoading}
        />
      </div>
    </>
  )
}
