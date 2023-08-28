import './globals.css'

export const metadata = {
  title: 'Music Player',
  description: 'Only prime music',
}

export default function RootLayout({ children }) {
  return (
    <html  lang="en">
      <body>{children}</body>
    </html>
  )
}
