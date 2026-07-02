// FILE: components/Sidebar/SidebarComments.tsx
// Lazy-loaded comments section for Sidebar

"use client";

import { useState } from "react";

interface Comment {
  id: number;
  name: string;
  time: string;
  content: string;
  likes: number;
  dislikes: number;
}

const mockComments: Comment[] = Array.from({ length: 50 }).map((_, i) => ({
  id: i,
  name: ["Phong Trần", "Huy Trần", "Lily Shing", "trần huy prime 2026"][i % 4],
  time: `${i % 12} giờ trước`,
  content:
    [
      "hiện tại , web vẫn chưa thể nói là ổn đâu nhé, mn vẫn nên chuẩn bị tinh thần web bị đóng đi , nếu ai là thành viên discord thì sẽ bt",
      "cứ bi quan đi rồi mọi chuyện sẽ tốt đẹp sau cơn mưa trời lại sáng:))))",
      "web đừng sập nhé, em yêu web lắm =(((",
      "mong web sống đến khi trái đất k còn nước biển",
    ][i % 4],
  likes: 0,
  dislikes: 0,
}));

export default function SidebarComments() {
  const [filter, setFilter] = useState("Mới nhất");
  const [visibleCount, setVisibleCount] = useState(7);

  const filters = ["Mới nhất", "Cũ nhất", "Nổi bật"];

  const sortedComments = [...mockComments].sort((a, b) => {
    if (filter === "Mới nhất") return b.id - a.id;
    if (filter === "Cũ nhất") return a.id - b.id;
    return b.likes - a.likes;
  });

  const visibleComments = sortedComments.slice(0, visibleCount);

  return (
    <div className="bg-[#1e293b] p-4 rounded-lg border border-white/5">
      <h3 className="text-white font-semibold text-lg">
        Hỏi/đáp anime
      </h3>
      <div className="w-10 h-[3px] bg-green-500 mt-2 mb-4"></div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-white font-semibold">
          <span className="text-red-500 text-lg">💬</span>
          Bình luận (1305)
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-[#0f172a] border border-red-500/40 text-sm text-slate-300 px-3 py-2 rounded cursor-pointer"
        >
          {filters.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
      </div>

      {/* COMMENT LIST */}
      <div className="flex flex-col gap-4">
        {visibleComments.map((c) => (
          <div
            key={c.id}
            className="bg-gradient-to-br from-[#0f172a] to-[#020617] border border-white/10 rounded-xl p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center text-white font-bold">
                {c.name.charAt(0)}
              </div>
              <div>
                <div className="text-blue-400 font-semibold text-sm">
                  {c.name}
                  <span className="text-slate-400 font-normal ml-2 text-xs">
                    | {c.time}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-slate-200 text-sm mb-3 leading-relaxed">
              {c.content}
            </p>

            <div className="flex items-center gap-3 text-slate-400 text-sm">
              <button className="flex items-center gap-1 border border-white/10 px-3 py-1 rounded hover:text-white">
                👍 {c.likes}
              </button>
              <button className="flex items-center gap-1 border border-white/10 px-3 py-1 rounded hover:text-white">
                👎 {c.dislikes}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* LOAD MORE */}
      <div className="mt-6 text-center text-slate-400 text-sm">
        Hiển thị {visibleCount}/{1305} bình luận
      </div>

      <button
        onClick={() => setVisibleCount((prev) => prev + 5)}
        className="mt-3 w-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all py-3 rounded-lg font-semibold"
      >
        Tải thêm bình luận
      </button>
    </div>
  );
}
