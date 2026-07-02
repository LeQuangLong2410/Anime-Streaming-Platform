import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbProps {
  title: string
  episodeNumber?: number
}

export default function Breadcrumb({ title, episodeNumber }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
      <Link href="/" className="flex items-center gap-1.5 hover:text-[#e50914] transition-colors">
        <Home className="w-4 h-4" />
        <span className="font-medium">Trang chủ</span>
      </Link>
      
      <ChevronRight className="w-4 h-4 text-slate-600" />
      
      <Link href="/danh-sach" className="hover:text-[#e50914] transition-colors font-medium">
        Anime bộ
      </Link>
      
      <ChevronRight className="w-4 h-4 text-slate-600" />
      
      <span className="text-slate-200 font-semibold truncate max-w-[150px] sm:max-w-[250px]">
        {title}
      </span>
      
      {episodeNumber !== undefined && (
        <>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <span className="text-slate-200 font-semibold">
            Xem phim
          </span>
        </>
      )}
    </nav>
  )
}
