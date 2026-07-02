import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'AnimeVietSub - Xem Anime Online Miễn Phí',
  description: 'Website xem anime online miễn phí',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="vi" className="dark scroll-smooth">
        <head>
          {/* Script để load theme từ localStorage trước rendering */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
            }}
          />
        </head>
        <body className={`${inter.variable} font-sans bg-[#0f172a] text-white overflow-x-hidden transition-colors duration-300`}>
          <div className="relative min-h-screen flex flex-col">
            <Header />
            {}
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}