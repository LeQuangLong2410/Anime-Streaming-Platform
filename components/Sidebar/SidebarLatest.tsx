// FILE: components/Sidebar/SidebarLatest.tsx
// Lazy-loaded latest anime section for Sidebar

"use client";

import Link from "next/link";
import { latestAnime } from "@/lib/data";

export default function SidebarLatest() {
  const latestList = latestAnime.slice(0, 10);

  return (
    <div className="bg-[#1e293b] p-4 rounded-lg border border-white/5">
      <h3 className="text-white font-semibold text-lg uppercase tracking-wide">
        ANIME MỚI CẬP NHẬT
      </h3>
      <div className="w-10 h-[3px] bg-green-500 mt-2 mb-4"></div>

      <ul className="flex flex-col">
        {latestList.map((anime) => (
          <li
            key={anime.id}
            className="border-b border-white/5 last:border-0 py-2"
          >
            <Link
              href={`/watch/${anime.slug}`}
              className="flex justify-between items-center group"
            >
              <span className="text-sm text-slate-300 group-hover:text-red-500 transition-colors truncate pr-2">
                {anime.title}
              </span>
              <span className="text-xs italic text-slate-400">
                {anime.episode}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
