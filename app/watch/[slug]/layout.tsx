// FILE: app/watch/[slug]/layout.tsx
// WATCH PAGE LAYOUT - Override root layout structure
// Chỉ render Header + Footer, KHÔNG dùng Sidebar từ root layout

export default function WatchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* 
        QUAN TRỌNG: Layout này override root layout structure
        - Root layout vẫn render <Header /> và <Footer />
        - Nhưng chúng ta bỏ qua grid structure với Sidebar
        - Watch page tự quản lý layout riêng
      */}
      {children}
    </>
  )
}
