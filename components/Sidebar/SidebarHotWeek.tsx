// FILE: components/Sidebar/SidebarHotWeek.tsx
// Lazy-loaded hot week section for Sidebar

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { popularAnime } from "@/lib/data";

export default function SidebarHotWeek() {
  const [tab, setTab] = useState("HOT");
  const tabs = ["HOT", "TV/Series", "Movie/OVA"];
  const hotList = popularAnime.slice(0, 5);

  return (
    <div className="bg-[#1e293b] p-4 rounded-lg border border-white/5">
      <div className="flex gap-4 mb-4 text-sm font-semibold">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative ${
              tab === t
                ? "text-red-500"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t}
            {tab === t && (
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-500"></span>
            )}
          </button>
        ))}
      </div>

      {(() => {
        let filteredList = hotList;

        if (tab === "TV/Series") {
          filteredList = popularAnime
            .filter((anime) => anime.type === "bo")
            .slice(0, 5);
        }

        if (tab === "Movie/OVA") {
          filteredList = popularAnime
            .filter((anime) => anime.type === "le")
            .slice(0, 5);
        }

        return (
          <div className="flex flex-col gap-4">
            {filteredList.map((anime, index) => (
              <Link
                href={`/watch/${anime.slug}`}
                key={anime.id}
                className="flex gap-3 group"
              >
                <div className="relative w-16 h-20 flex-shrink-0 rounded overflow-hidden">
                  <Image
                    src={anime.poster || '/images/anime/poster/logoz.png'}
                    alt={anime.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-0 left-0 bg-green-500 text-black text-xs font-bold px-1.5 py-0.5">
                    #{index + 1}
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <h4 className="text-sm font-semibold text-white group-hover:text-red-500 transition line-clamp-2">
                    {anime.title}
                  </h4>

                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span className="text-green-400">★ {anime.rating}</span>
                    <span>•</span>
                    <span>{anime.year || "2024"}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] bg-red-600 text-white px-2 py-[2px] rounded">
                      {anime.quality || "FHD"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        );
      })()}
    </div>
  );
}
