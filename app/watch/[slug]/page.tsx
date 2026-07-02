import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { animes } from '@/lib/data';

import AnimeHero from '@/components/anime/AnimeHero';
import AnimeTabs from '@/components/anime/AnimeTabs';
import Sidebar from '@/components/Sidebar';
import RelatedAnime from '@/components/RelatedAnime';
import Breadcrumb from '@/components/Breadcrumb';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const anime = animes.find((a) => a.slug === slug);
  
  if (!anime) {
    return {
      title: 'Không tìm thấy anime',
      description: 'Anime bạn đang tìm không tồn tại hoặc đã bị xóa.',
    };
  }
  
  const ogImage = anime.banner || anime.poster || '/images/anime/poster/logoz.png';
  
  return {
    title: `${anime.title} | AnimeVietSub - Xem Anime Online`,
    description: anime.description?.slice(0, 160) || 'Xem anime online chất lượng cao với phụ đề tiếng Việt.',
    openGraph: {
      title: anime.title,
      description: anime.description,
      images: [{ url: ogImage }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: anime.title,
      description: anime.description,
      images: [ogImage],
    }
  };
}

export default async function AnimeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const anime = animes.find((a) => a.slug === slug);

  if (!anime) {
    notFound();
  }

  // Related anime - better filtering
  const relatedAnimeList = animes
    .filter(a => a.id !== anime.id)
    .filter(a => 
      a.genre?.some(g => anime.genre?.includes(g)) || 
      a.type === anime.type
    )
    .slice(0, 10);

  return (
    <main className="flex-grow w-full pt-[80px] pb-12 bg-[#0f172a]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        <Breadcrumb title={anime.title} />

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Main Content */}
          <div className="w-full lg:w-[72%] flex-shrink-0 min-w-0">
            <div className="flex flex-col gap-6">
              <AnimeHero anime={anime} />
              <AnimeTabs anime={anime} />
              <RelatedAnime items={relatedAnimeList} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[28%] flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>
    </main>
  );
}