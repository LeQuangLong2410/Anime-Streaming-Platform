'use client'

import { Search, X } from 'lucide-react'
import { useState, useRef, useEffect, useCallback } from 'react'
import SearchDropdown from './SearchDropdown'
import { useDebounce } from '@/hooks/useDebounce'

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

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const debouncedQuery = useDebounce(query, 250) // Giảm từ 300 xuống 250
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Tối ưu fetch với useCallback
  const fetchResults = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([])
      setIsOpen(false)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`, {
        method: 'GET',
        headers: { 'Cache-Control': 'no-cache' },
      })

      if (!response.ok) throw new Error('Search failed')

      const data = await response.json()
      setResults(data || [])
      setIsOpen(true)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Gọi API khi debouncedQuery thay đổi
  useEffect(() => {
    fetchResults(debouncedQuery)
  }, [debouncedQuery, fetchResults])

  // Click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleClear = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`
    }
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-sm hidden md:block">
      <form onSubmit={handleSubmit} className="relative group">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && results.length > 0 && setIsOpen(true)}
          placeholder="Tìm anime..."
          className="w-full px-4 py-2 pl-4 pr-10 text-sm rounded-full transition-all duration-300 
                     bg-slate-100 dark:bg-[#2d3748] border border-slate-300 dark:border-slate-600 
                     text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 
                     focus:outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20"
        />

        {/* Icons */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
              aria-label="Clear"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="submit"
            className="p-1 text-slate-400 dark:text-slate-500 group-hover:text-[#8b5cf6] transition-colors"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
        </div>
      </form>

      {/* Dropdown */}
      <SearchDropdown
        results={results}
        isLoading={isLoading}
        query={query}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelectItem={() => {
          setQuery('')
          setResults([])
          setIsOpen(false)
        }}
        highlightQuery={(text) => {
          if (!query.trim()) return text
          const regex = new RegExp(`(${query})`, 'gi')
          return text.split(regex).map((part, i) =>
            regex.test(part) ? (
              <span key={i} className="bg-yellow-300 dark:bg-yellow-500 font-bold">
                {part}
              </span>
            ) : (
              part
            )
          )
        }}
      />
    </div>
  )
}