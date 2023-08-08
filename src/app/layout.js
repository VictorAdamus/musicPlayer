import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Music Player',
  description: 'Only prime music',
}

export default function RootLayout({ children }) {
  return (
    <html  lang="en">
      <body className=' h-screen flex'>{children}</body>
    </html>
  )
}
