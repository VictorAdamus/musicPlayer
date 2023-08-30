import './globals.css'

export const metadata = {
  title: 'Music Player',
  description: 'Only prime music',
}

export default function RootLayout({ children }) {
  return (
    <html  lang="en">
      <body className='m-0 p-0 h-[100%] overflow-hidden'>{children}</body>
    </html>
  )
}
