'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, Loader2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface SearchResult {
  id: string
  title: string
  engTitle?: string
  poster: string
  quality: string
  slug: string
  rating: number
  episode: string
}

interface SearchDropdownProps {
  results: SearchResult[]
  isLoading: boolean
  query: string
  isOpen: boolean
  onClose: () => void
  onSelectItem?: (slug: string) => void
  highlightQuery: (text: string) => React.ReactNode
}

export default function SearchDropdown({
  results,
  isLoading,
  query,
  isOpen,
  onClose,
  onSelectItem,
  highlightQuery,
}: SearchDropdownProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]) // ✅ FIX

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : 0
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : results.length - 1
          )
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && results[selectedIndex]) {
            const slug = results[selectedIndex].slug
            onSelectItem?.(slug)
            window.location.href = `/watch/${slug}`
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, onClose, onSelectItem])

  // Auto-scroll to selected item
  useEffect(() => {
    if (selectedIndex >= 0 && itemsRef.current[selectedIndex]) {
      itemsRef.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
      })
    }
  }, [selectedIndex])

  if (!isOpen) return null

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 z-50 mt-2 w-full bg-white dark:bg-[#1f2937] border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
    >
      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-8 text-slate-600 dark:text-slate-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Đang tìm kiếm...</span>
        </div>
      )}

      {/* No Results */}
      {!isLoading && results.length === 0 && query && (
        <div className="py-8 px-4 text-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Không tìm thấy kết quả cho "{query}"
          </p>
        </div>
      )}

      {/* Results List */}
      {!isLoading && results.length > 0 && (
        <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
          {results.map((result, index) => (
            <Link
              key={result.id}
              href={`/watch/${result.slug}`}
              ref={(el) => {
                if (el) itemsRef.current[index] = el // ✅ FIX
              }}
              onClick={() => onSelectItem?.(result.slug)}
              className={`flex gap-3 px-4 py-3 border-b border-slate-100 dark:border-slate-800 last:border-b-0 transition-colors cursor-pointer group ${
                selectedIndex === index
                  ? 'bg-slate-100 dark:bg-slate-700'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {/* Poster */}
              <div className="relative w-12 h-16 rounded overflow-hidden flex-shrink-0 bg-slate-200 dark:bg-slate-700">
                <Image
                  src={result.poster}
                  alt={result.title}
                  fill
                  className="object-cover"
                  sizes="48px"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 py-0.5">
                {/* Title */}
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1 group-hover:text-[#8b5cf6]">
                  {highlightQuery(result.title)}
                </h4>

                {/* Sub Info */}
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {result.quality && (
                    <span className="text-xs font-bold bg-red-500 text-white px-1.5 py-0.5 rounded">
                      {result.quality}
                    </span>
                  )}
                  <span className="text-xs text-yellow-500 font-semibold flex items-center gap-0.5">
                    <Star className="w-3 h-3" fill="currentColor" />
                    {result.rating}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {result.episode}
                  </span>
                </div>

                {/* English Title */}
                {result.engTitle && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-1">
                    {result.engTitle}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* View All Results */}
      {!isLoading && results.length > 0 && (
        <Link
          href={`/search?q=${encodeURIComponent(query)}`}
          className="block px-4 py-3 text-center text-sm font-semibold text-[#8b5cf6] hover:bg-slate-50 dark:hover:bg-slate-800 border-t border-slate-100 dark:border-slate-800 transition-colors"
        >
          Xem tất cả kết quả ({results.length}+)
        </Link>
      )}
    </div>
  )
}