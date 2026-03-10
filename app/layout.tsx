import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MRZ Lab Tool',
  description: 'Professional MRZ passport testing and validation tool',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  )
}
