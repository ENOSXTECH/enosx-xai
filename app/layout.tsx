import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'ENOSX AI - Advanced Windows Assistant',
  description: 'ENOSX AI Assistant. Control your Windows apps with cutting-edge AI capabilities. Streaming responses, app launching, and intelligent assistance.',
  generator: 'ENOSX Technologies',
  keywords: ['AI Assistant', 'Windows', 'Chat', 'AI Control', 'App Launcher'],
  openGraph: {
    title: 'ENOSX AI - Windows Assistant',
    description: 'Advanced AI assistant for Windows with app control and real-time chat',
    images: [
      {
        url: '/enosx-logo.jpg',
        width: 500,
        height: 500,
        alt: 'ENOSX AI Logo',
      },
    ],
    type: 'website',
  },
  icons: {
    icon: '/enosx-logo.jpg',
    apple: '/enosx-logo.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-black text-white dark">
      <body className="font-sans antialiased bg-black">
        {children}
      </body>
    </html>
  )
}
