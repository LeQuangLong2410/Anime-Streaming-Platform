import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { animes } from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';
import EpisodeWatchClient from '@/components/watch/EpisodeWatchClient';
import EpisodeGrid from '@/components/watch/EpisodeGrid';
import FanSection from '@/components/watch/FanSection';
import CommentSection from '@/components/watch/CommentSection';
import Sidebar from '@/components/Sidebar';
import AnimeCarousel from '@/components/AnimeCarousel';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string; episodeId: string }> 
}): Promise<Metadata> {
  const { slug, episodeId } = await params;
  const anime = animes.find((a) => a.slug === slug);
  
  if (!anime) return { title: 'Not Found' };
  
  const ogImage = anime.banner || anime.poster || '/images/anime/poster/logoz.png';
  
  return {
    title: `${anime.title} - Tập ${episodeId} | Xem Anime Online`,
    description: `Xem ${anime.title} Tập ${episodeId} vietsub online chất lượng cao miễn phí`,
    openGraph: {
      title: `${anime.title} - Tập ${episodeId}`,
      description: anime.description,
      images: [ogImage],
    }
  };
}

export default async function EpisodeWatchPage({
  params,
}: {
  params: Promise<{ slug: string; episodeId: string }>;
}) {
  const { slug, episodeId } = await params;
  const anime = animes.find((a) => a.slug === slug);

  if (!anime) {
    notFound();
  }

  // Parse episode number
  const currentEpisode = parseInt(episodeId) || 1;
  
  // Generate episode list based on anime.episode string
  const totalEpisodes = parseInt(anime.episode.replace(/\D/g, '')) || 12;
  
  // Get related and recommended anime
  const relatedAnime = animes
    .filter(a => 
      a.id !== anime.id && 
      a.genre.some(g => anime.genre.includes(g))
    )
    .slice(0, 10);
    
  const recommendedAnime = animes
    .filter(a => a.id !== anime.id && a.rating >= 4.7)
    .slice(0, 10);

  return (
    <main className="flex-grow w-full pt-[80px] pb-12">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        {/* Breadcrumb */}
        <Breadcrumb 
          title={anime.title}
          episodeNumber={currentEpisode}
        />

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Main Content (Left) - 72% width */}
          <div className="w-full lg:w-[72%] flex-shrink-0 min-w-0">
            <div className="flex flex-col gap-6">
              {/* Advertisement Area */}
              <div className="w-full h-[90px] bg-gradient-to-r from-[#1e293b] to-[#0f172a] rounded-lg border border-white/5 flex items-center justify-center">
                <p className="text-slate-500 text-sm">Advertisement Space</p>
              </div>

              {/* Episode Watch Client - handles video player, actions, and server selection */}
              <EpisodeWatchClient
                anime={anime}
                currentEpisode={currentEpisode}
                totalEpisodes={totalEpisodes}
              />

              {/* Episode List */}
              <EpisodeGrid 
                anime={anime}
                totalEpisodes={totalEpisodes}
                currentEpisode={currentEpisode}
              />

              {/* Fan Section */}
              <FanSection />

              {/* Comment Section */}
              <CommentSection />

              {/* Related Anime Section */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                  <span className="text-[#e50914]">|</span> Phim liên quan
                </h2>
                <AnimeCarousel animeList={relatedAnime} />
              </div>

              {/* Recommended Anime Section */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                  <span className="text-[#e50914]">|</span> Gợi ý cùng người xem
                </h2>
                <AnimeCarousel animeList={recommendedAnime} />
              </div>
            </div>
          </div>

          {/* Right Sidebar - 28% width */}
          <div className="w-full lg:w-[28%] flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>
    </main>
  );
}
