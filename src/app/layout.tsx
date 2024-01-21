import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppWrapper } from '../context/StatusContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Panel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  )
}
