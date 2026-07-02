'use client'

import { Search, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
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
  const [isFocused, setIsFocused] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`
    }
  }

  // Fetch search results
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([])
      setIsOpen(false)
      return
    }

    const fetchResults = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedQuery)}`
        )
        const data = await response.json()
        setResults(data)
        setIsOpen(true)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [debouncedQuery])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setTimeout(() => {
          setIsOpen(false)
        }, 150)
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

  const highlightQuery = (text: string): React.ReactNode => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-300 dark:bg-yellow-500 font-bold">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    )
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-sm hidden md:block">
      <form onSubmit={handleSearch} className="relative group">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setIsFocused(true)
            if (query && results.length > 0) {
              setIsOpen(true)
            }
          }}
          onBlur={() => setIsFocused(false)}
          placeholder="Tìm anime..."
          className="w-full px-4 py-2 pl-4 pr-10 text-sm rounded-full transition-all duration-300 bg-slate-100 dark:bg-[#2d3748] border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 dark:focus:ring-[#8b5cf6]/30"
        />

        {/* Search / Clear Button */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
              aria-label="Clear search"
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
        isOpen={isOpen && (isFocused || query !== '')}
        onClose={() => setIsOpen(false)}
        onSelectItem={(slug) => {
          setQuery('')
          setResults([])
          setIsOpen(false)
        }}
        highlightQuery={highlightQuery}
      />
    </div>
  )
}