'use client'
import Link from 'next/link'
import Image from 'next/image'
import { User, Menu } from 'lucide-react'
import { useState } from 'react'
import SearchBar from './SearchBar'
import DropdownMenu from './DropdownMenu'
import MobileDrawer from './MobileDrawer'
import { AnimatedThemeToggle } from './ThemeToggle'
import { SignInButton, useUser, UserButton } from '@clerk/nextjs'

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { isLoaded, isSignedIn } = useUser()

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-[#0f172a] border-b border-white/10 h-[70px] flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-6 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/anime/poster/logoz.png"
                alt="Anime Website Logo"
                width={140}
                height={45}
                priority
                className="object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-[15px] font-medium whitespace-nowrap">
            <Link
              href="/"
              className="text-white hover:text-[#60a5fa] transition-colors whitespace-nowrap"
            >
              TRANG CHỦ
            </Link>

            <DropdownMenu
              trigger="DẠNG ANIME"
              items={[
                { label: "TV/Series", href: "/category/tv-series" },
                { label: "Movies/OVA", href: "/category/movies-ova" },
                { label: "HH Trung Quốc", href: "/category/hh-trung-quoc" },
                { label: "Anime Sắp Chiếu", href: "/category/sap-chieu" },
                { label: "Anime Trọn Bộ", href: "/category/tron-bo" },
              ]}
            />

            <DropdownMenu
              trigger="TOP ANIME"
              items={[
                { label: "Theo Ngày", href: "/top/theo-ngay" },
                { label: "Theo Tháng", href: "/top/theo-thang" },
                { label: "Theo Năm", href: "/top/theo-nam" },
                { label: "Theo Mùa", href: "/top/theo-mua" },
                { label: "Yêu Thích", href: "/top/yeu-thich" },
              ]}
            />

            <DropdownMenu
              trigger="THỂ LOẠI"
              items={[
                { label: "Action", href: "/genre/action" },
                { label: "Romance", href: "/genre/romance" },
                { label: "Fantasy", href: "/genre/fantasy" },
                { label: "Comedy", href: "/genre/comedy" },
                { label: "Drama", href: "/genre/drama" },
                { label: "Cartoon", href: "/genre/cartoon" },
                { label: "Ecchi", href: "/genre/ecchi" },
                { label: "Harem", href: "/genre/harem" },
                { label: "Demons", href: "/genre/demons" },
                { label: "Horror", href: "/genre/horror" },
                { label: "Shounen", href: "/genre/shounen" },
                { label: "Yuri", href: "/genre/yuri" },
                { label: "Sports", href: "/genre/sports" },
                { label: "Historical", href: "/genre/historical" },
                { label: "Isekai", href: "/genre/isekai" },
              ]}
            />

            <DropdownMenu
              trigger="SEASON"
              items={[
                { label: "Mùa Đông 2026", href: "/season/dong-2026" },
                { label: "Mùa Xuân 2026", href: "/season/xuan-2026" },
                { label: "Mùa Hạ 2026", href: "/season/ha-2026" },
                { label: "Mùa Thu 2026", href: "/season/thu-2026" },
                { label: "Mùa Đông 2025", href: "/season/dong-2025" },
                { label: "Mùa Xuân 2025", href: "/season/xuan-2025" },
                { label: "Mùa Hạ 2025", href: "/season/ha-2025" },
                { label: "Mùa Thu 2025", href: "/season/thu-2025" },
                { label: "Mùa Đông 2024", href: "/season/dong-2024" },
                { label: "Mùa Xuân 2024", href: "/season/xuan-2024" },
                { label: "Mùa Hạ 2024", href: "/season/ha-2024" },
                { label: "Mùa Thu 2024", href: "/season/thu-2024" },
                { label: "Mùa Đông 2023", href: "/season/dong-2023" },
                { label: "Mùa Xuân 2023", href: "/season/xuan-2023" },
                { label: "Mùa Hạ 2023", href: "/season/ha-2023" },
              ]}
            />

            <Link href="/thu-vien" prefetch={false} className="text-white hover:text-[#60a5fa] transition-colors whitespace-nowrap">
              THƯ VIỆN
            </Link>
            <Link href="/lich-chieu" prefetch={false} className="text-white hover:text-[#60a5fa] transition-colors whitespace-nowrap">
              LỊCH CHIẾU
            </Link>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Animated Theme Toggle - Thay thế phần cũ */}
            <AnimatedThemeToggle />

            {/* Search Bar */}
            <SearchBar />

            {/* Auth Section */}
            {!isLoaded ? (
              // Skeleton loader while Clerk is loading - matches both signed in/out states
              <div className="hidden sm:flex items-center gap-2 bg-red-600/50 text-white font-medium px-5 py-2 rounded-lg text-sm whitespace-nowrap opacity-50">
                <User size={18} />
                <span>Đăng nhập</span>
              </div>
            ) : isSignedIn ? (
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                    userButtonPopoverCard: "bg-[#1e293b] border border-white/10",
                    userButtonPopoverActionButton: "hover:bg-white/5",
                    userButtonPopoverActionButtonText: "text-slate-300",
                    userButtonPopoverFooter: "hidden"
                  }
                }}
              />
            ) : (
              <SignInButton mode="modal">
                <button className="hidden sm:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-lg transition-colors text-sm whitespace-nowrap">
                  <User size={18} />
                  <span>Đăng nhập</span>
                </button>
              </SignInButton>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsDrawerOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </>
  )
}