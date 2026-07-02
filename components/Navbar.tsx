import Link from 'next/link'
import { Search, Menu, User } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-primary tracking-tighter uppercase">
            Anime<span className="text-white">Viet</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-white hover:text-primary transition-colors">Home</Link>
            <Link href="/movies" className="text-sm font-medium text-muted hover:text-white transition-colors">Movies</Link>
            <Link href="/series" className="text-sm font-medium text-muted hover:text-white transition-colors">Series</Link>
            <Link href="/genres" className="text-sm font-medium text-muted hover:text-white transition-colors">Genres</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-muted hover:text-white transition-colors" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          <button className="hidden sm:flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-full font-medium transition-colors text-sm border border-primary/20">
            <User className="w-4 h-4" />
            <span>Login</span>
          </button>
          <button className="md:hidden p-2 text-muted hover:text-white transition-colors" aria-label="Menu">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
