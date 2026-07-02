// FILE: app/danh-sach/page.tsx
// Anime Listing Page - Full filtering and pagination

import { Metadata } from 'next'
import { Suspense } from 'react'
import AnimeListingClient from './AnimeListingClient'

export const metadata: Metadata = {
  title: 'Danh Sách Anime Mới Nhất | Anime VietSub',
  description: 'Danh sách anime mới nhất, đầy đủ thể loại, chất lượng cao, vietsub nhanh nhất',
  openGraph: {
    title: 'Danh Sách Anime Mới Nhất',
    description: 'Xem anime mới nhất với đầy đủ bộ lọc và phân trang',
  }
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
    </div>
  )
}

export default function AnimeListingPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AnimeListingClient />
    </Suspense>
  )
}
