'use client'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface DropdownItem {
  label: string
  href: string
}

interface DropdownMenuProps {
  trigger: string
  items: DropdownItem[]
  className?: string
}

export default function DropdownMenu({ trigger, items, className = "" }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      className={`relative ${className}`}
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 font-medium text-slate-300 hover:text-white transition-colors py-2"
      >
        {trigger}
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#8b5cf6]' : ''}`}
        />
      </button>

      <div
        className={`absolute top-full left-0 mt-2 w-[420px] bg-[#1e293b]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-5 transition-all duration-300 origin-top-left z-50 ${isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
          }`}
      >
        <div className="grid grid-cols-3 gap-2">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              prefetch={false}
              className="px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-[#334155] rounded-lg transition-colors block"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}