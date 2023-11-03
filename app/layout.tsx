import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tasks Manager',
  description: 'Simple tasks manager',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="max-w-full max-h-full m-auto">{children}</body>
    </html>
  )
}