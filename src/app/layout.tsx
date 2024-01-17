import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'
import { ControlProvider } from '@/hooks/useControl'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nonogram',
  description: 'Jogo nonogram..',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={'pt-br'}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ControlProvider>{children}</ControlProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
