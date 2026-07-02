// FILE: components/Sidebar.tsx
// Optimized Sidebar with lazy-loaded sections

"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";
import Link from "next/link";

// Lazy load heavy sidebar sections
const SidebarComments = lazy(() => import("./Sidebar/SidebarComments"));
const SidebarLatest = lazy(() => import("./Sidebar/SidebarLatest"));
const SidebarHotWeek = lazy(() => import("./Sidebar/SidebarHotWeek"));

// Loading skeleton component
function SidebarSkeleton() {
  return (
    <div className="bg-[#1e293b] p-4 rounded-lg border border-white/5 animate-pulse">
      <div className="h-6 bg-slate-700 rounded w-3/4 mb-2"></div>
      <div className="w-10 h-[3px] bg-slate-700 mt-2 mb-4"></div>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 bg-slate-700 rounded"></div>
        ))}
      </div>
    </div>
  );
}

// Lazy Video Banner Component
function LazyVideoBanner() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={videoRef} className="rounded-lg overflow-hidden border border-white/5">
      {shouldLoad ? (
        <video
          src="/videos/banner.mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <div className="w-full aspect-video bg-slate-800 animate-pulse" />
      )}
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="sticky top-[80px] flex flex-col gap-6 pb-6">
      {/* 1. RANDOM ANIME - Always visible, lightweight */}
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-4 rounded-lg border border-white/5">
        <h3 className="text-white font-semibold text-lg">
          Hôm nay xem gì?
        </h3>
        <div className="w-10 h-[3px] bg-green-500 mt-2 mb-3"></div>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          Nếu bạn buồn phiền không biết xem gì hôm nay. Hãy để chúng tôi chọn cho bạn
        </p>
        <Link 
          href="/random-anime"
          prefetch={false}
          className="w-full bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold py-2.5 rounded flex items-center justify-center gap-2"
        >
          ▶ Xem Anime Ngẫu Nhiên
        </Link>
      </div>

      {/* 2. VIDEO BANNER - Lazy load when visible */}
      <LazyVideoBanner />

      {/* 3. COMMENT SECTION - Lazy loaded */}
      <Suspense fallback={<SidebarSkeleton />}>
        <SidebarComments />
      </Suspense>

      {/* 4. LATEST UPDATED - Lazy loaded */}
      <Suspense fallback={<SidebarSkeleton />}>
        <SidebarLatest />
      </Suspense>

      {/* 5. HOT WEEK - Lazy loaded */}
      <Suspense fallback={<SidebarSkeleton />}>
        <SidebarHotWeek />
      </Suspense>
    </aside>
  );
}