import { Metadata } from 'next'
import LibraryClient from './LibraryClient'
import { animes } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Thư Viện Anime A-Z | AnimeVietSub',
  description: 'Thư viện anime đầy đủ từ A-Z. Tìm kiếm anime theo chữ cái đầu tiên.',
  openGraph: {
    title: 'Thư Viện Anime A-Z',
    description: 'Thư viện anime đầy đủ từ A-Z với hơn 100+ bộ anime',
  }
}

export default function LibraryPage() {
  return <LibraryClient animeList={animes} />
}
