import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import type { ReactNode } from 'react'

import { SessionProvider } from '~/components/providers/session'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession()

  return (
    <html className="bg-zinc-900 text-zinc-100 antialiased" lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  )
}
