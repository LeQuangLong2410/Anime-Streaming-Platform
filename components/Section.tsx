'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ReactNode } from 'react'

interface SectionTab {
  label: string
  href?: string
  active?: boolean
}

interface SectionProps {
  title: string
  href?: string
  children: ReactNode
  tabs?: SectionTab[]
  onTabClick?: (label: string) => void
}

export default function Section({ title, href = '#', children, tabs, onTabClick }: SectionProps) {
  return (
    <section className="w-full mb-10">
      <div className="flex items-center gap-4 mb-5 flex-wrap">
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 bg-[#e50914] hover:bg-[#b20710] px-4 py-2 rounded font-bold text-white text-sm uppercase tracking-wide transition-colors shrink-0"
        >
          {title}
          <ChevronRight size={16} strokeWidth={3} className="text-white" />
        </Link>
        {tabs && tabs.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            {tabs.map((tab, i) =>
              tab.href ? (
                <Link
                  key={i}
                  href={tab.href}
                  className={`px-3 py-1.5 rounded text-sm transition-colors ${tab.active
                      ? 'text-[#e50914] font-semibold'
                      : 'text-slate-400 hover:text-white'
                    }`}
                >
                  {tab.label}
                </Link>
              ) : (
                <button
                  key={i}
                  onClick={() => onTabClick?.(tab.label)}
                  className={`px-3 py-1.5 rounded text-sm transition-colors ${tab.active
                      ? 'text-[#e50914] font-semibold'
                      : 'text-slate-400 hover:text-white'
                    }`}
                >
                  {tab.label}
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* Nội dung section */}
      {children}
    </section>
  )
}

