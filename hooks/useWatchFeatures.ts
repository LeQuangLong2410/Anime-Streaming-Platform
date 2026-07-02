'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Anime } from '@/lib/data'

// Server type definition
export type ServerType = 'duf' | 'bh' | 'dx'

// Follow/Favorite system
export const useFollow = (animeId: string, userId?: string) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Load follow state from localStorage
  useEffect(() => {
    const storageKey = userId ? `follow_${userId}` : 'follow_guest'
    const followedAnime = JSON.parse(localStorage.getItem(storageKey) || '[]')
    setIsFollowing(followedAnime.includes(animeId))
  }, [animeId, userId])

  const toggleFollow = useCallback(() => {
    setIsLoading(true)
    const storageKey = userId ? `follow_${userId}` : 'follow_guest'
    const followedAnime = JSON.parse(localStorage.getItem(storageKey) || '[]')
    
    let updatedFollows: string[]
    if (followedAnime.includes(animeId)) {
      updatedFollows = followedAnime.filter((id: string) => id !== animeId)
      setIsFollowing(false)
    } else {
      updatedFollows = [...followedAnime, animeId]
      setIsFollowing(true)
    }
    
    localStorage.setItem(storageKey, JSON.stringify(updatedFollows))
    
    // Simulate network delay for better UX
    setTimeout(() => setIsLoading(false), 300)
  }, [animeId, userId])

  return { isFollowing, toggleFollow, isLoading }
}

// Server selection with persistence
export const useServerSelection = (animeSlug: string, episodeId: number) => {
  const [selectedServer, setSelectedServer] = useState<ServerType>('duf')
  const [isLoading, setIsLoading] = useState(false)

  // Load saved server preference
  useEffect(() => {
    const storageKey = `server_${animeSlug}_${episodeId}`
    const savedServer = localStorage.getItem(storageKey) as ServerType
    if (savedServer && ['duf', 'bh', 'dx'].includes(savedServer)) {
      setSelectedServer(savedServer)
    }
  }, [animeSlug, episodeId])

  const changeServer = useCallback((server: ServerType) => {
    setIsLoading(true)
    const storageKey = `server_${animeSlug}_${episodeId}`
    localStorage.setItem(storageKey, server)
    setSelectedServer(server)
    
    // Simulate server switching delay
    setTimeout(() => setIsLoading(false), 500)
  }, [animeSlug, episodeId])

  return { selectedServer, changeServer, isLoading }
}

// Cinema mode (lights off)
export const useCinemaMode = () => {
  const [isCinemaMode, setIsCinemaMode] = useState(false)

  const toggleCinemaMode = useCallback(() => {
    setIsCinemaMode(prev => !prev)
  }, [])

  return { isCinemaMode, toggleCinemaMode }
}

// Fullscreen handler
export const useFullscreen = (elementRef: React.RefObject<HTMLElement>) => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = useCallback(async () => {
    if (!elementRef.current) return

    try {
      if (!document.fullscreenElement) {
        await elementRef.current.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (error) {
      console.error('Fullscreen error:', error)
    }
  }, [elementRef])

  return { isFullscreen, toggleFullscreen }
}

// Screenshot handler
export const useScreenshot = (videoRef: React.RefObject<HTMLVideoElement>, anime: Anime, episode: number) => {
  const [isCapturing, setIsCapturing] = useState(false)

  const captureScreenshot = useCallback(() => {
    if (!videoRef.current) {
      alert('Không thể chụp màn hình video')
      return
    }

    setIsCapturing(true)

    try {
      const video = videoRef.current
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth || 1920
      canvas.height = video.videoHeight || 1080

      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Canvas context not available')

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) {
          alert('Không thể tạo ảnh')
          setIsCapturing(false)
          return
        }

        const timestamp = Math.floor(video.currentTime || 0)
        const filename = `${anime.slug}_episode-${episode}_${timestamp}s.png`
        
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        link.click()
        
        URL.revokeObjectURL(url)
        setIsCapturing(false)
      }, 'image/png')
    } catch (error) {
      console.error('Screenshot error:', error)
      alert('Lỗi khi chụp màn hình')
      setIsCapturing(false)
    }
  }, [videoRef, anime, episode])

  return { captureScreenshot, isCapturing }
}

// Scroll to comments
export const useScrollToComments = () => {
  const scrollToComments = useCallback(() => {
    const commentSection = document.getElementById('comment-section')
    if (commentSection) {
      commentSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
      
      // Focus on comment input if exists
      setTimeout(() => {
        const commentInput = commentSection.querySelector('textarea, input[type="text"]') as HTMLElement
        commentInput?.focus()
      }, 600)
    }
  }, [])

  return { scrollToComments }
}
