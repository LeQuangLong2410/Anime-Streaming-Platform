'use client'

import { ServerType } from '@/hooks/useWatchFeatures'
import { Loader2 } from 'lucide-react'

const servers = [
  { id: 'duf' as ServerType, name: 'DUF', hasAds: false },
  { id: 'bh' as ServerType, name: 'BH', hasAds: false },
  { id: 'dx' as ServerType, name: 'DX', hasAds: true },
]

interface ServerSelectionProps {
  selectedServer: ServerType
  onServerChange: (server: ServerType) => void
  isLoading?: boolean
}

export default function ServerSelection({ 
  selectedServer, 
  onServerChange, 
  isLoading = false 
}: ServerSelectionProps) {
  return (
    <div className="bg-[#1e293b] rounded-lg border border-white/10 p-4">
      <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
        <span className="text-red-600">|</span>
        Chọn Server
        {isLoading && (
          <Loader2 className="w-4 h-4 animate-spin text-red-600" />
        )}
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {servers.map(server => (
          <button
            key={server.id}
            onClick={() => onServerChange(server.id)}
            disabled={isLoading}
            className={`
              px-5 py-2.5 rounded-lg font-semibold text-sm transition-all border-2 disabled:opacity-50 disabled:cursor-not-allowed
              ${selectedServer === server.id 
                ? 'bg-red-600 border-red-600 text-white' 
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
              }
            `}
          >
            {server.name}
            {server.hasAds && (
              <span className="ml-1.5 text-xs opacity-75">(ADS)</span>
            )}
          </button>
        ))}
      </div>

      <p className="text-slate-400 text-xs mt-3">
        Nếu server hiện tại không hoạt động, vui lòng chọn server khác
      </p>
    </div>
  )
}
