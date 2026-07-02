// FILE: app/random-anime/page.tsx
// Random Anime Page - Xem anime ngẫu nhiên

import { Metadata } from 'next'
import RandomAnimeClient from './RandomAnimeClient'

export const metadata: Metadata = {
  title: 'Random Anime | Xem Anime Ngẫu Nhiên',
  description: 'Khám phá anime ngẫu nhiên - quay nhanh phim bất kỳ. Tìm anime mới để xem ngay hôm nay.',
  openGraph: {
    title: 'Random Anime | Xem Anime Ngẫu Nhiên',
    description: 'Khám phá anime ngẫu nhiên - quay nhanh phim bất kỳ',
  }
}

export default function RandomAnimePage() {
  return <RandomAnimeClient />
}
