import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'

import { auth } from '~/auth'
import { QueryProvider } from '~/components/providers/query'
import { SessionProvider } from '~/components/providers/session'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Ignite Call',
    default: 'Ignite Call',
  },
  description: 'Conecte seu calendário e permita que pessoas marquem agendamentos no seu tempo livre.',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth()

  return (
    <html className="bg-zinc-900 text-zinc-100 antialiased" lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <QueryProvider>{children}</QueryProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
