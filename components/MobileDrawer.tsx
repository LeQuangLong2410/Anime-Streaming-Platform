'use client'
import Link from 'next/link'
import { X, Search } from 'lucide-react'
import { useState, useEffect } from 'react'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Movies', path: '/movies' },
  { name: 'Series', path: '/series' },
  { name: 'Trending', path: '/trending' },
]

const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Romance', 'Sci-Fi']

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-[#0f172a] border-r border-white/10 z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <Link href="/" className="text-xl font-bold uppercase tracking-tighter" onClick={onClose}>
            Anime<span className="text-[#8b5cf6]">Viet</span>
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4">
          <div className="relative mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anime..."
              className="w-full bg-[#1e293b] text-white border border-[#334155] rounded-xl py-2.5 pl-4 pr-10 outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all duration-300"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search size={18} />
            </button>
          </div>

          <nav className="space-y-1 mb-8">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Menu</h3>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="block px-3 py-2.5 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors font-medium"
                onClick={onClose}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Top Genres</h3>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Link
                  key={genre}
                  href={`/genre/${genre.toLowerCase()}`}
                  className="px-3 py-1.5 bg-[#1e293b] text-slate-300 hover:text-white hover:bg-[#8b5cf6] rounded-full text-sm transition-colors"
                  onClick={onClose}
                >
                  {genre}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
