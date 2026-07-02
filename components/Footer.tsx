'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Facebook, Instagram, Twitter, Youtube, ArrowUp } from 'lucide-react'

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026) // Default year to avoid hydration mismatch
  
  useEffect(() => {
    // Set actual year on client side after hydration
    setCurrentYear(new Date().getFullYear())
  }, [])
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="mt-auto bg-[#1a2332] border-t border-white/10 pt-10 pb-8 text-sm text-slate-400">
      <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-6 border-b border-white/10 pb-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
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

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-base font-medium">
            <Link href="/xem-phim" prefetch={false} className="hover:text-white transition-colors">XEM PHIM</Link>
            <Link href="/donate" prefetch={false} className="hover:text-white transition-colors flex items-center gap-1">
              DONATE <span className="text-pink-500">♥</span>
            </Link>
            <Link href="/chat-anime" prefetch={false} className="hover:text-white transition-colors">CHAT ANIME/DISCORD</Link>
            <Link href="/thuat-ngu" prefetch={false} className="hover:text-white transition-colors">THUẬT NGỮ</Link>
            <Link href="/group" prefetch={false} className="hover:text-white transition-colors">GROUP THẢO LUẬN</Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/share/1BA9y2as9b/?mibextid=wwXIfr"
              target="_blank"
              className="w-8 h-8 bg-[#2a3749] hover:bg-[#3a4759] rounded flex items-center justify-center transition-colors text-white hover:text-[#1877f2]"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/lequanglong2410?igsh=OXZxM3I3c3Jobjhm&utm_source=qr"
              target="_blank"
              className="w-8 h-8 bg-[#2a3749] hover:bg-[#3a4759] rounded flex items-center justify-center transition-colors text-white hover:text-[#e1306c]"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://x.com/quang_long2410"
              target="_blank"
              className="w-8 h-8 bg-[#2a3749] hover:bg-[#3a4759] rounded flex items-center justify-center transition-colors text-white hover:text-white"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://www.youtube.com/@quanglong24"
              target="_blank"
              className="w-8 h-8 bg-[#2a3749] hover:bg-[#3a4759] rounded flex items-center justify-center transition-colors text-white hover:text-[#ff0000]"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </a>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 bg-[#22c55e] hover:bg-[#4ade80] text-black rounded flex items-center justify-center transition-colors text-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#22c55e]/50 active:scale-95"
              aria-label="Cuộn lên đầu trang"
              title="Cuộn lên đầu trang"
            >
              <ArrowUp size={20} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-6">
        <div className="text-center mb-8">
          <p className="text-slate-300">
            Liên Hệ Quảng Cáo: <a href="mailto:lequanglong2410@gmail.com" className="text-[#60a5fa] hover:underline">lequanglong2410@gmail.com</a>
          </p>
        </div>

        <div className="text-center mb-10">
          <p className="text-slate-300">© Copyright {currentYear} AnimeVietSub.TV. All rights reserved.</p>
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-4 text-xs leading-relaxed border-t border-white/10 pt-8">
          <h3 className="text-base font-semibold text-white mb-3">Miễn trừ trách nhiệm</h3>
          <p>
            Trang web này cung cấp nội dung anime chỉ với mục đích giải trí và không chịu trách nhiệm về bất kỳ nội dung quảng cáo, liên kết của bên thứ ba hiển thị trên trang web của chúng tôi.
          </p>
          <p>
            Tất cả thông tin và hình ảnh trên website đều được thu thập từ internet. Chúng tôi không chịu trách nhiệm về bất kỳ nội dung nào. Nếu bạn là tổ chức của bạn có vấn đề gì liên quan đến nội dung hiển thị trên website, vui lòng liên hệ với chúng tôi để được giải quyết.
          </p>
        </div>
      </div>
    </footer>
  )
}