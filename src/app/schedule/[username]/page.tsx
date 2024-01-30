import type { Metadata } from 'next'
import Image from 'next/image'

import { auth } from '~/auth'

export async function generateMetadata(): Promise<Metadata | null> {
  const session = await auth()

  if (!session) return null

  return {
    title: `Agendar com ${session.user.name} | Ignite Call`,
  }
}

export default async function Schedule() {
  const session = await auth()

  if (!session) return null

  return (
    <main className="mx-auto mb-4 mt-16 flex w-full max-w-4xl flex-col items-center px-4">
      <header className="mb-8 flex flex-col items-center justify-center">
        <Image
          alt={session.user.name ?? ''}
          className="mb-2 h-24 w-24 rounded-full"
          height={200}
          priority
          src={session.user.image ?? ''}
          width={200}
        />
        <h2 className="text-xl font-medium">{session.user.name}</h2>
        <span className="mt-1 text-xs text-zinc-400">{session.user.bio}</span>
      </header>
      <div className="flex flex-col gap-4 rounded-lg border border-zinc-200/10 bg-zinc-600/20 p-4">
        <Schedule />
      </div>
    </main>
  )
}
